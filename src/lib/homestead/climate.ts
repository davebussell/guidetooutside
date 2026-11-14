/**
 * The homestead numbers for one place, worked out from what the place pages
 * already know: the latitude and longitude, the climate normals (monthly mean
 * daily highs and lows, monthly precipitation, frost dates), the Köppen regime
 * and, where a weather station is in reach, its daily record of cold nights and
 * hot days (src/lib/extremes.ts).
 * Every function is pure and documents its method; the place page prints the
 * method in one sentence under each number. Thresholds and rules of thumb come
 * from the sources in src/data/homestead/SOURCES.md, cited at each constant.
 *
 * Dates are days of a 365-day year (1 = 1 January), read in the place's own
 * calendar; runs of days may wrap past 31 December.
 */
import type { Climate, Regime } from "@/lib/types";
import { sunTimes } from "@/lib/sun";
import { dateToDoy, doyToLabel, tempStationOf } from "@/lib/climate-fallback";
import { celsius, countedFrom, longDate, perYear, type PlaceExtremes } from "@/lib/extremes";
import { stationName } from "@/lib/zone-label";

export type HomesteadInput = {
  lat: number;
  lon: number;
  climate: Climate | null;
  regime: Regime | null;
  /** Today's date where the place is, "2026-10-12". */
  today: string;
  /** Counts of cold nights and hot days from the nearest station with a complete daily record, when there is one (src/lib/extremes.ts). */
  extremes?: PlaceExtremes | null;
};

export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_START = MONTH_DAYS.reduce<number[]>((a, d, i) => [...a, i === 0 ? 1 : a[i - 1] + MONTH_DAYS[i - 1]], []);
/** The middle day of each month (non-leap), where a monthly average is anchored. */
const MONTH_MID = MONTH_START.map((s, i) => s + (MONTH_DAYS[i] - 1) / 2);

export const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Wrap any day number onto 1–365. */
export const wrapDoy = (d: number) => ((((Math.round(d) - 1) % 365) + 365) % 365) + 1;

/** "Mar 18", the site's frost-date style. */
export const dayLabel = (doy: number) => doyToLabel(wrapDoy(doy));

/** The month (1–12) a day falls in. */
export function monthOf(doy: number): number {
  const d = wrapDoy(doy);
  let m = 0;
  while (m < 11 && d >= MONTH_START[m + 1]) m++;
  return m + 1;
}

export const monthStart = (m: number) => MONTH_START[m - 1];
export const monthEnd = (m: number) => MONTH_START[m - 1] + MONTH_DAYS[m - 1] - 1;

/** Today's day of the year (29 February counts as 28 February). */
export function todayDoy(today: string): number {
  return Math.min(365, dateToDoy(today.replace(/-02-29$/, "-02-28")));
}

// ---- day by day from monthly normals --------------------------------------

/**
 * Twelve monthly averages spread over 365 days: each average sits on the
 * middle day of its month and the days between are interpolated in a
 * straight line, December running on into January.
 */
export function daily(monthly: number[]): number[] {
  const out: number[] = [];
  for (let d = 1; d <= 365; d++) {
    let i = 11;
    for (let m = 0; m < 12; m++) if (MONTH_MID[m] <= d) i = m;
    const j = (i + 1) % 12;
    const a = MONTH_MID[i];
    let b = MONTH_MID[j];
    let x = d;
    if (b <= a) b += 365;
    if (x < a) x += 365;
    const t = (x - a) / (b - a);
    out.push(monthly[i] + (monthly[j] - monthly[i]) * t);
  }
  return out;
}

export type Run = { start: number; end: number; days: number };

/** The runs of consecutive days where `mask` holds, a run across New Year kept whole. Longest first. */
export function runs(mask: boolean[]): Run[] {
  const n = mask.length;
  if (mask.every(Boolean)) return [{ start: 1, end: n, days: n }];
  if (!mask.some(Boolean)) return [];
  const out: Run[] = [];
  for (let i = 0; i < n; i++) {
    if (!mask[i] || mask[(i - 1 + n) % n]) continue;
    let len = 0;
    while (mask[(i + len) % n] && len < n) len++;
    out.push({ start: i + 1, end: wrapDoy(i + len), days: len });
  }
  return out.sort((a, b) => b.days - a.days);
}

export type Span = { days: number; main: Run | null };

const span = (mask: boolean[]): Span => {
  const r = runs(mask);
  return { days: mask.filter(Boolean).length, main: r[0] ?? null };
};

/** Whether a day falls inside a run (or a window) that may wrap past 31 December. */
export function inRun(doy: number, start: number, end: number): boolean {
  const d = wrapDoy(doy);
  return start <= end ? d >= start && d <= end : d >= start || d <= end;
}

// ---- daylight ---------------------------------------------------------------

/** Day length (minutes, sunrise to sunset) on each day of the year. */
export function daylightYear(lat: number, lon: number, year = 2026): number[] {
  const out: number[] = [];
  for (let d = 1; d <= 365; d++) {
    const t = sunTimes(lat, lon, new Date(Date.UTC(year, 0, d, 12)));
    out.push(t.dayLengthMin as number);
  }
  return out;
}

export type Crossing = { doy: number; dir: "up" | "down" };

/** The days a series passes a threshold, rising or falling (the first day on the new side). */
export function crossings(series: number[], threshold: number): Crossing[] {
  const out: Crossing[] = [];
  const n = series.length;
  for (let i = 0; i < n; i++) {
    const prev = series[(i - 1 + n) % n];
    const cur = series[i];
    if (prev < threshold && cur >= threshold) out.push({ doy: i + 1, dir: "up" });
    if (prev >= threshold && cur < threshold) out.push({ doy: i + 1, dir: "down" });
  }
  return out;
}

/** Hens keep laying on about 14 hours of light; below 12 hours laying falls and often stops (Virginia Cooperative Extension). */
export const LAYING_HOURS = 14;
export const LAYING_STOPS_HOURS = 12;
/** Added light should hold the day at no more than 16 hours (University of Arizona Extension). */
export const MAX_LIGHT_HOURS = 16;

export type Daylight = {
  todayMin: number;
  /** Change over the coming seven days (minutes). */
  weekChangeMin: number;
  shortestMin: number;
  shortestDoy: number;
  longestMin: number;
  longestDoy: number;
  /** The days daylight falls below / rises back above 14 h and 12 h; null when it never crosses. */
  below14: { down: number | null; up: number | null; days: number };
  below12: { down: number | null; up: number | null; days: number };
  /** Light to add on the shortest day to reach 14 hours (minutes; 0 if never needed). */
  addOnShortestMin: number;
  /** Days with no sunrise, and with no sunset, and when those runs fall. */
  polarNightDays: number;
  midnightSunDays: number;
  polarNight: Run | null;
  midnightSun: Run | null;
};

/**
 * Day length from the NOAA solar equations (sunrise and sunset with the sun's
 * centre 0.833° below the horizon, which allows for refraction and the size of
 * the disc), for each day of the year at the place's coordinates.
 */
export function daylight(input: Pick<HomesteadInput, "lat" | "lon" | "today">): Daylight {
  const year = Number(input.today.slice(0, 4)) || 2026;
  const s = daylightYear(input.lat, input.lon, year);
  const t = todayDoy(input.today);
  const at = (d: number) => s[wrapDoy(d) - 1];
  const crossing = (h: number) => {
    const c = crossings(s, h * 60);
    return {
      down: c.find((x) => x.dir === "down")?.doy ?? null,
      up: c.find((x) => x.dir === "up")?.doy ?? null,
      days: s.filter((m) => m < h * 60).length,
    };
  };
  const shortestMin = Math.min(...s);
  const longestMin = Math.max(...s);
  return {
    todayMin: at(t),
    weekChangeMin: at(t + 7) - at(t),
    shortestMin,
    shortestDoy: s.indexOf(shortestMin) + 1,
    longestMin,
    longestDoy: s.indexOf(longestMin) + 1,
    below14: crossing(LAYING_HOURS),
    below12: crossing(LAYING_STOPS_HOURS),
    addOnShortestMin: Math.max(0, LAYING_HOURS * 60 - shortestMin),
    polarNightDays: s.filter((m) => m === 0).length,
    midnightSunDays: s.filter((m) => m >= 1440).length,
    polarNight: runs(s.map((m) => m === 0))[0] ?? null,
    midnightSun: runs(s.map((m) => m >= 1440))[0] ?? null,
  };
}

export const hoursMinutes = (min: number) => `${Math.floor(min / 60)} h ${String(Math.round(min % 60)).padStart(2, "0")} min`;

// ---- cold nights and hot days ---------------------------------------------

/** Hens' comfort ends and body temperature rises above 27 °C; laying may fall above 32–35 °C (OMAFRA). Rabbits stretch out above 25–30 °C and suffer heat prostration at 35 °C (FAO). */
export const HOT_DAY_C = 30;
export const VERY_HOT_DAY_C = 35;
/**
 * A long freezing season, for the breed lists: this many nights a year below 0 °C. A hot one: this many days a year
 * at 30 °C or hotter, a month of them: Ottawa's 15 such days (ECCC 1991–2020) made it a "hot season" town at the
 * old 14, so its breed list read like Dallas's (5 Nov 2026 audit).
 */
export const LONG_FREEZE_NIGHTS = 30;
export const HOT_SEASON_DAYS = 30;

export type ColdHeat = {
  /** Days whose average night (interpolated mean daily low) is below each threshold. */
  below0: Span;
  belowMinus10: Span;
  belowMinus20: Span;
  /** Days whose average afternoon (interpolated mean daily high) is above each threshold. */
  above30: Span;
  above35: Span;
  coldest: { month: number; minC: number };
  warmest: { month: number; maxC: number };
};

/**
 * Counted from the climate normals spread day by day (see `daily`). These are
 * average nights and afternoons, not counts of nights and days: a straight
 * line between monthly means can never pass a threshold the means do not
 * reach, so a span of zero days says nothing about whether the threshold is
 * ever met (Ottawa's average January night is -13 °C and the airport station
 * still counts fifteen nights a year at -20 °C or colder). A span of
 * more than zero days is a true statement about the averages; the real number
 * of cold nights and hot days comes only from a station's daily record
 * (`extremeFigures`), and the pages print these spans only as timing ("average
 * nights freeze from Nov 3"), never as counts and never as "none".
 */
export function coldHeat(c: Climate): ColdHeat {
  const lo = daily(c.monthlyMeanMin);
  const hi = daily(c.monthlyMeanMax);
  const coldestMonth = c.monthlyMeanMin.indexOf(Math.min(...c.monthlyMeanMin));
  const warmestMonth = c.monthlyMeanMax.indexOf(Math.max(...c.monthlyMeanMax));
  return {
    below0: span(lo.map((t) => t < 0)),
    belowMinus10: span(lo.map((t) => t < -10)),
    belowMinus20: span(lo.map((t) => t < -20)),
    above30: span(hi.map((t) => t > HOT_DAY_C)),
    above35: span(hi.map((t) => t > VERY_HOT_DAY_C)),
    coldest: { month: coldestMonth + 1, minC: c.monthlyMeanMin[coldestMonth] },
    warmest: { month: warmestMonth + 1, maxC: c.monthlyMeanMax[warmestMonth] },
  };
}

/**
 * Where the monthly temperatures behind a date or span come from. The audit of 10 November 2026 found the ERA5 grid's
 * average nights (ten years, a weather model's average over a square about 30 km across) 1.3–4.5 °C off the station
 * normals, so its "average nights below 0 °C" dates ran 7–17 days late in the Acadian towns, 3 weeks late at Richmond
 * and 2 weeks early at New York; the Day 5 audit (14 November 2026) found the freezing dates 1–5 weeks late (Kelowna 33
 * days, Thompson 19, Val-d'Or 18, Niagara-on-the-Lake 16). Station normals now replace the grid where they were read
 * (src/lib/climate-fallback.ts `tempStationOf`), so every sentence built from the months names its source: `tempWords`.
 * GRID_WORDS is the grid's name, for the towns that still have only the grid.
 */
export const GRID_WORDS = "the ERA5 weather-model grid";

/**
 * "NOAA's 1991–2020 normals for Portland Intl Airport, 9.8 km away", "the 1991–2014 monthly means of Thompson A, 6.7 km
 * away", or GRID_WORDS: the source of a climate record's monthly temperatures, to follow "on" or "from" in a sentence.
 */
export function tempWords(c: Climate | null | undefined): string {
  const t = tempStationOf(c);
  if (!t) return GRID_WORDS;
  const at = `${stationName(t.name)}, ${t.km} km away`;
  return t.basis === "noaa-normals" ? `NOAA's 1991–2020 normals for ${at}` : `the ${t.period.replace("-", "–")} monthly means of ${at}`;
}

/** Whether a climate record's monthly temperatures are a station's (true) or the grid's. */
export const tempsFromStation = (c: Climate | null | undefined) => tempStationOf(c) != null;

/** A temperature to one decimal with no "−0.0 °C" (Day 4 audit, 13 Nov 2026: Boise's "January −0 °C"; the sign was read before the rounding). */
export const degC = (x: number, digits = 1) => celsius(Number(x.toFixed(digits)) || 0, digits);

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export type ExtremeFigure = {
  id: "freezing" | "hard-cold" | "hot" | "very-hot";
  label: string;
  /** What is printed large: a count a year, "None counted" (a station counted none), or "Not counted" (no complete daily record). */
  value: string;
  note: string | null;
  /** How it was found, printed small under the figure. */
  method: string;
};

export type ExtremeFigures = {
  /** "station": at least one of the cold and hot figures is counted from a station record; "none": no daily record was in reach. */
  basis: "station" | "none";
  figures: ExtremeFigure[];
  /** The coldest night of an average year and the station's record low and high, or null. */
  records: string | null;
  /** The sentence under the figures on what the counts can and cannot say. */
  footnote: string;
  /** Whether the place has a long freezing season / a hot one, for the breed lists (30+ nights a year below 0 °C; 14+ days a year at 30 °C or hotter). */
  longFreeze: boolean;
  hot: boolean;
  /** The sentence that introduces the breed lists. */
  breedIntro: string;
  /** What "long freezing season" and "hot" mean here, for the small print under the breed lists. */
  breedRule: string;
};

const spanDates = (s: Span) => (s.main && s.days < 365 ? `${dayLabel(s.main.start)} to ${dayLabel(s.main.end)}` : null);

/**
 * The cold-night and hot-day figures for one place, as the text the page prints.
 *
 * With a station record (`ex`), every count is that station's mean a year over
 * 1991-2020 and the method line says which station, how far away and which
 * years. A figure the station could not count (fewer than 20 years of at least
 * 300 days of readings for that element, or a station beyond 25 km whose
 * climate does not agree with the town's: scripts/build-place-extremes.ts)
 * is "Not counted", never zero; a
 * count the station made and found to be zero is "None counted".
 *
 * Without one, nothing is counted: the figures read "Not counted", the page
 * says plainly that no daily record was in reach and that monthly averages hide
 * extremes, and only the monthly averages themselves (the coldest month's
 * average night, the warmest month's average afternoon) are given, labelled as
 * averages. The breed lists still use a long freeze or heat shown by the
 * averages, which can only understate them.
 */
export function extremeFigures(place: string, c: Climate, ex: PlaceExtremes | null): ExtremeFigures {
  const ch = coldHeat(c);
  const coldOk = !!ex && ex.nightsBelowZero != null && ex.nightsBelowMinus10 != null && ex.nightsBelowMinus20 != null && ex.nightsBelowMinus25 != null;
  const hotOk = !!ex && ex.daysAbove30 != null && ex.daysAbove35 != null;
  // Not "no record within reach": Fredericton has two stations 4 and 12 km off whose daily records fall short of the
  // 20 complete years (audit of 10 November 2026). What is true everywhere is that no station near enough passed.
  // "That can stand for": Nanaimo, Whitehorse and Kingston have long records 10–25 km off that the station rule sets aside
  // (an offshore lighthouse, a colder valley, a station inland beyond the town's own: src/lib/extremes-rule.ts, Day 5
  // audit, 14 November 2026), so "no station near" would not be true there.
  const noRecord = `No weather station that can stand for ${place} has 20 complete years of daily readings in 1991–2020, so nothing is counted here, and monthly averages hide extremes.`;
  const counted = (years: number, what: string) => `${countedFrom(ex!)} (${years} years with at least 300 days of ${what}).`;
  const coldMethod = coldOk ? counted(ex!.years, "night readings") : ex ? `${stationName(ex.station.name)}, ${ex.station.km} km away, gives no count of cold nights that can stand for ${place}, and monthly averages hide extremes.` : noRecord;
  const hotMethod = hotOk ? counted(ex!.yearsMax, "afternoon readings") : ex ? `${stationName(ex.station.name)}, ${ex.station.km} km away, gives no count of hot days that can stand for ${place}, and monthly averages hide extremes.` : noRecord;
  // The months' source is named: a station's normals where they were read, the grid elsewhere (Day 5 audit, 14 November 2026).
  const src = tempWords(c);
  const coldMonth = `On ${src}, the coldest month, ${MONTH_NAMES[ch.coldest.month - 1]}, averages ${degC(ch.coldest.minC)} at night.`;
  const warmMonth = `On ${src}, the warmest month, ${MONTH_NAMES[ch.warmest.month - 1]}, averages ${degC(ch.warmest.maxC)} in the afternoon.`;
  const aYear = (n: number) => `${perYear(n)} a year`;
  const none = "None counted";
  const notCounted = "Not counted";

  const figures: ExtremeFigure[] = [];
  // Nights below freezing.
  {
    const n = coldOk ? ex!.nightsBelowZero! : null;
    const window = spanDates(ch.below0);
    figures.push({
      id: "freezing",
      label: "Nights below 0 °C",
      value: n == null ? notCounted : n > 0 ? aYear(n) : none,
      note:
        n == null
          ? `${coldMonth}${window ? ` Its monthly averages put the typical night below 0 °C from ${window}; single nights freeze outside that stretch.` : ""}`
          : n >= 1
            ? "Water freezes: hens and ducks cannot break ice, so check it several times a day (University of Maryland Extension)."
            : coldMonth,
      method: coldMethod,
    });
  }
  // Hard cold.
  {
    const m10 = coldOk ? ex!.nightsBelowMinus10! : null;
    const m20 = coldOk ? ex!.nightsBelowMinus20! : null;
    const m25 = coldOk ? ex!.nightsBelowMinus25! : null;
    let value = notCounted;
    if (m10 != null && m20 != null && m25 != null) {
      const colder = `${m20 > 0 ? perYear(m20) : "none"} at −20 °C or colder${m25 > 0 ? `, ${perYear(m25)} at −25 °C or colder` : ""}`;
      value = m10 === 0 ? none : `${aYear(m10)} (${colder})`;
    }
    figures.push({
      id: "hard-cold",
      label: "Nights at −10 °C or colder",
      value,
      note: m10 != null && m10 > 0 ? "Large single combs are prone to frostbite; small rose, pea and cushion combs resist it (Livestock Conservancy)." : null,
      method: coldMethod,
    });
  }
  // Hot days.
  {
    const h = hotOk ? ex!.daysAbove30! : null;
    figures.push({
      id: "hot",
      label: "Days at 30 °C or hotter",
      value: h == null ? notCounted : h > 0 ? aYear(h) : none,
      note: h != null && h > 0 ? "Shade on the west side of runs, several shaded waterers, eggs collected often (University of Arizona Extension)." : warmMonth,
      method: hotMethod,
    });
  }
  // Very hot days.
  {
    const h = hotOk ? ex!.daysAbove35! : null;
    figures.push({
      id: "very-hot",
      label: "Days at 35 °C or hotter",
      value: h == null ? notCounted : h > 0 ? aYear(h) : none,
      note: h != null && h > 0 ? "Rabbits cannot control their temperature at 35 °C (FAO): hutches out of the sun, air moving through." : "Rabbits' heat limit is 35 °C (FAO).",
      method: hotMethod,
    });
  }

  // Records: the coldest night of an average year and the station's own extremes.
  // "Since 1946" claimed a record running to today. Saint John's station file stops years before ECCC's 34.5 °C of
  // 20 June 2024, which sits under the station's newer ID (audit of 10 November 2026). With the file's last year
  // known (builds from 11 November 2026) the span is given; without it, a station whose 1991–2020 years are not all
  // complete, beyond what a late start explains, is said to have gaps or to stop early.
  const bits: string[] = [];
  const recordSpan = (since: number, until: number | null | undefined) => (until != null ? `between ${since} and ${until}` : `since ${since}`);
  const gappy = (years: number, since: number | null, until: number | null | undefined) =>
    until == null && since != null && years < 30 - Math.max(0, since - 1991);
  if (coldOk && ex!.meanAnnualExtremeMinC != null) bits.push(`The coldest night of an average year is ${celsius(ex!.meanAnnualExtremeMinC)}.`);
  if (coldOk && ex!.recordLowC != null && ex!.recordLowDate && ex!.recordLowSince) bits.push(`The lowest reading at this station ${recordSpan(ex!.recordLowSince, ex!.recordLowUntil)} is ${celsius(ex!.recordLowC)} (${longDate(ex!.recordLowDate)}).`);
  if (hotOk && ex!.recordHighC != null && ex!.recordHighDate && ex!.recordHighSince)
    bits.push(`The highest ${bits.some((b) => b.startsWith("The lowest")) ? "" : "reading at this station "}${recordSpan(ex!.recordHighSince, ex!.recordHighUntil)} is ${celsius(ex!.recordHighC)} (${longDate(ex!.recordHighDate)}).`);
  const gapYears = coldOk && gappy(ex!.years, ex!.recordLowSince, ex!.recordLowUntil) ? ex!.years : hotOk && gappy(ex!.yearsMax, ex!.recordHighSince, ex!.recordHighUntil) ? ex!.yearsMax : null;
  if (bits.length && gapYears != null) bits.push(`Only ${gapYears} of the 30 years 1991–2020 are complete in this station's file: it has gaps or stops early, so a more recent extreme may be missing.`);

  const longFreeze = coldOk ? ex!.nightsBelowZero! >= LONG_FREEZE_NIGHTS : ch.below0.days >= LONG_FREEZE_NIGHTS;
  const hot = hotOk ? ex!.daysAbove30! >= HOT_SEASON_DAYS : ch.above30.days >= HOT_SEASON_DAYS;
  const freezeText = coldOk ? `${aYear(ex!.nightsBelowZero!)} below 0 °C` : `average nights below 0 °C on ${src} from ${spanDates(ch.below0) ?? "autumn to spring"}`;
  const hotText = hotOk ? `${aYear(ex!.daysAbove30!)} at 30 °C or hotter` : `average afternoons above 30 °C on ${src} from ${spanDates(ch.above30) ?? "early summer"}`;
  const breedIntro =
    longFreeze && hot
      ? `${place} has both a freezing season (${freezeText}) and a hot one (${hotText}). Breeds whose sources call them both cold-hardy and heat-tolerant:`
      : longFreeze
        ? `${place} has a freezing season (${freezeText}). Breeds whose sources call them cold-hardy:`
        : hot
          ? `${place} has a hot season (${hotText}). Breeds whose sources call them heat-tolerant:`
          : coldOk && hotOk
            ? "Neither a long freezing season nor a hot one shows in the station's counts here: the breed lists on each topic page give each breed's climate fit."
            : "Not enough is counted here to call the freezing season long or the heat long: the breed lists on each topic page give each breed's climate fit.";
  const breedRule = coldOk || hotOk
    ? `a long freezing season here means ${LONG_FREEZE_NIGHTS} or more nights a year below 0 °C, a hot one ${HOT_SEASON_DAYS} or more days a year at 30 °C or hotter, counted at the station where it has a complete record, otherwise read from the monthly averages of ${src} (which can only understate them)`
    : `a long freezing season here means monthly averages on ${src} that keep the typical night below 0 °C on ${LONG_FREEZE_NIGHTS} or more days, a hot one typical afternoons above 30 °C on ${HOT_SEASON_DAYS} or more days; real nights and days run colder and hotter than the averages, so these tests can only understate`;
  return {
    basis: coldOk || hotOk ? "station" : "none",
    figures,
    records: bits.length ? bits.join(" ") : null,
    footnote:
      coldOk || hotOk
        ? "Counts are means a year over the years named; days with missing readings are not filled in, so a count can run low, and readings that failed the station network's quality checks are left out."
        : `${noRecord} Single nights run colder and single days hotter than the monthly figures, so no count of nights below −10 °C or −20 °C, or of days above 30 °C or 35 °C, is printed.`,
    longFreeze,
    hot,
    breedIntro,
    breedRule,
  };
}

// ---- roof water -------------------------------------------------------------

/** 1 mm of rain on 1 m² is 1 litre; installers assume a roof delivers 75–90 % of it, and the Texas manual's worked example uses 85 % (TWDB). */
export const RUNOFF = { low: 0.75, mid: 0.85, high: 0.9 } as const;
/** First flush: divert 1–2 US gallons per 100 sq ft of roof per storm, 0.41–0.81 L/m² (TWDB). */
export const FIRST_FLUSH_L_PER_M2 = [0.41, 0.81] as const;
export const ROOF_M2 = 100;
/**
 * How far below 0 °C a month's mean must be before its roof water is left out as frozen. Where no station normal was read
 * the monthly means are ten years of the ERA5 weather-model grid, and the audits of 10 to 13 November 2026 found them a
 * degree or more from the nearest station's 1991–2020 normals in most towns they checked (the Day 5 audit, 14 November
 * 2026, found Grand Forks and International Falls counting November, Fairbanks October and Laramie March and November,
 * all frozen at the station: station normals now stand in those towns); the Day 4 audit found Boise's January dropped on a grid mean
 * of −0.05 °C where NOAA's normal for the Boise airport is +0.1 °C, which took about 3,060 litres, some 12 % of the year's
 * catch. The site has no monthly station counts of freezing nights to decide such a month (only yearly ones), so a month
 * within this margin of freezing, either side, is counted and the page says it is near freezing and what it adds.
 */
export const FROZEN_MARGIN_C = 1;

/**
 * The margin for one climate record: FROZEN_MARGIN_C on the grid, none on a station's 1991–2020 normals, which are the
 * station's own monthly means and need no allowance for a 30 km average (Day 5 audit, 14 November 2026: Laramie's March
 * and November, −0.1 and −1.0 °C at Laramie Airport, were counted as open water inside the grid's margin). A station month
 * below 0 °C is frozen; one at or above it is counted, as Boise's January (+0.1 °C at the airport) is.
 */
export const frozenMarginC = (c: Climate) => (tempsFromStation(c) ? 0 : FROZEN_MARGIN_C);

export type RoofWater = {
  areaM2: number;
  /** Total precipitation a year (rain and melted snow), mm. The name keeps "rain" for the stored field it is summed from. */
  annualRainMm: number;
  /** Litres a year at the 85 % collection efficiency, and the 75–90 % range. */
  annualL: number;
  annualRangeL: [number, number];
  /** Litres each month; 0 in a frozen month (see `frozenMonths`). */
  monthlyL: number[];
  /** Months whose mean temperature is below 0 °C by more than FROZEN_MARGIN_C: nothing runs off a roof under snow and the system is drained, so they count neither as catch nor as demand. */
  frozenMonths: number;
  /** Months (1–12) counted although their mean lies within FROZEN_MARGIN_C of 0 °C, with their means and their litres: the page says so. */
  nearFreezing: { month: number; meanC: number; litres: number }[];
  /** Days in the months above freezing, over which the yield is caught and drawn. */
  openDays: number;
  firstFlushL: [number, number];
  /** Storage to draw the roof's own average yield evenly all year (monthly water balance). */
  storage: {
    litres: number;
    /** The even daily draw the storage is sized for (litres a day). */
    dailyL: number;
    /** The months the tank runs down through, first and last (1–12); null when it never does. */
    from: number | null;
    to: number | null;
    months: number;
    /** Where the winter freezes: open months whose catch falls short of the draw while the tank is empty (after the thaw, or once it has run dry). */
    short: number[];
  };
};

/**
 * Litres from a roof footprint of `areaM2` (eave to eave, not the sloping
 * surface): monthly precipitation (mm) × area (m²) × the collection efficiency.
 * The monthly figures are total precipitation, snow counted as its melted
 * water. A month whose mean temperature is below 0 °C is left out: its snow
 * sits on the roof and the gutters, pipes and tank are drained for the winter
 * (the 5 Nov 2026 audit found Winnipeg's and Fort McMurray's January snow
 * counted as litres in the tank).
 *
 * Storage follows the Texas manual's monthly water balance: the tank is
 * filled by each month's catch and drawn down by an even daily demand. Here
 * the demand is the roof's own average yield (the open months' total spread
 * evenly over their days), so the result is the smallest tank that carries the
 * year's water from the wet months through the dry ones, in an average year. The
 * deepest draw-down of the running balance, followed through two years so a
 * dry season across New Year is kept whole, is the storage; the months between
 * the balance's high point and its low point are the dry stretch.
 */
export function roofWater(c: Climate, areaM2 = ROOF_M2): RoofWater | null {
  const rain = c.monthlyRainMm;
  if (!rain || rain.length !== 12) return null;
  const mean = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
  // Frozen only beyond the margin; a month within it is counted and named on the page (FROZEN_MARGIN_C on the grid, none on a station's normals).
  const margin = frozenMarginC(c);
  const frozen = mean.map((t) => t < -margin);
  const openMm = rain.map((mm, i) => (frozen[i] ? 0 : mm));
  const frozenMonths = frozen.filter(Boolean).length;
  const openDays = MONTH_DAYS.reduce((a, d, i) => a + (frozen[i] ? 0 : d), 0);
  if (!openDays) return null;
  const annualRainMm = openMm.reduce((a, b) => a + b, 0);
  const monthlyL = openMm.map((mm) => mm * areaM2 * RUNOFF.mid);
  const annualL = monthlyL.reduce((a, b) => a + b, 0);
  const dailyL = annualL / openDays;
  const demand = MONTH_DAYS.map((d, i) => (frozen[i] ? 0 : d * dailyL));
  // Running balance started from each month in turn and followed for a year; the deepest
  // fall from an earlier high within any such year is the storage. Where the winter freezes,
  // the system is drained and refilled each spring, so the balance runs from the first month
  // after the frozen run and stops at the next frozen month: no water is carried through the
  // winter (the first version said Winnipeg's tank carried autumn water "through September to
  // April", across five drained months).
  let best = 0;
  let from = -1;
  let to = -1;
  /** Open months (1–12) whose catch, with what the tank holds, falls short of the draw: the tank starts each spring empty. */
  const short = new Set<number>();
  if (frozenMonths > 0) {
    for (const s0 of [...Array(12).keys()].filter((i) => !frozen[i] && frozen[(i + 11) % 12])) {
      let tank = 0;
      let peak = 0;
      let peakAt = s0 - 1;
      for (let k = s0; k < s0 + 12; k++) {
        const i = k % 12;
        if (frozen[i]) break;
        tank += monthlyL[i] - demand[i];
        if (tank > peak) {
          peak = tank;
          peakAt = k;
        }
        const drop = peak - Math.max(tank, 0);
        if (drop > best + 1e-6) {
          best = drop;
          from = peakAt + 1;
          to = k;
        }
        // An empty tank cannot go below empty: the rest of the month's draw goes unmet.
        if (tank < 0) {
          short.add(i + 1);
          tank = 0;
          peak = 0;
          peakAt = k;
        }
      }
    }
  } else {
    for (let s0 = 0; s0 < 12; s0++) {
      let bal = 0;
      let peak = 0;
      let peakAt = s0 - 1;
      for (let k = s0; k < s0 + 12; k++) {
        const i = k % 12;
        bal += monthlyL[i] - demand[i];
        if (bal > peak) {
          peak = bal;
          peakAt = k;
        }
        if (peak - bal > best + 1e-6) {
          best = peak - bal;
          from = peakAt + 1;
          to = k;
        }
      }
    }
  }
  const months = best > 0 ? to - from + 1 : 0;
  const nearFreezing = mean.flatMap((t, i) => (!frozen[i] && t < margin ? [{ month: i + 1, meanC: t, litres: monthlyL[i] }] : []));
  return {
    areaM2,
    nearFreezing,
    annualRainMm,
    annualL,
    annualRangeL: [annualRainMm * areaM2 * RUNOFF.low, annualRainMm * areaM2 * RUNOFF.high],
    monthlyL,
    frozenMonths,
    openDays,
    firstFlushL: [FIRST_FLUSH_L_PER_M2[0] * areaM2, FIRST_FLUSH_L_PER_M2[1] * areaM2],
    storage: {
      litres: best,
      dailyL,
      from: best > 0 ? (from % 12) + 1 : null,
      to: best > 0 ? (to % 12) + 1 : null,
      months,
      short: [...short].sort((x, y) => x - y),
    },
  };
}

// ---- heating degree days ---------------------------------------------------

export const HDD_BASE_C = 18;

/**
 * One day's heating degree days by the UK Met Office equations (as tabulated
 * by Deroubaix et al. 2021), from the day's high and low: a day wholly below
 * the base counts base − mean; a day that crosses it counts a share of the
 * cold part, weighted by where the mean falls. Kept for reference; the page's
 * figures use `erbsHdd`, which allows for days colder and warmer than normal.
 */
export function metOfficeHdd(tMax: number, tMin: number, base = HDD_BASE_C): number {
  const mean = (tMax + tMin) / 2;
  if (tMax <= base) return base - mean;
  if (mean <= base) return (base - tMin) / 2 - (tMax - base) / 4;
  if (tMin < base) return (base - tMin) / 4;
  return 0;
}

/**
 * Monthly heating degree days from the month's mean temperature, by Erbs,
 * Klein and Beckman's method (D. Erbs, W. Beckman, S. Klein, "Estimation of
 * degree-days and ambient temperature bin data from monthly-average
 * temperatures", ASHRAE Journal 25(6), 1983, 60–65):
 *
 *   HDD = σm · N^1.5 · [ h/2 + ln(e^(−a·h) + e^(a·h)) / (2a) ],  h = (Tb − Tm) / (σm · √N),  a = 1.698
 *   σm  = 1.45 − 0.0290 · Tm + 0.0664 · σyr   (°C)
 *
 * where Tm is the month's mean temperature, N its days, σm the spread of the
 * month's mean from year to year, and σyr the standard deviation of the twelve
 * monthly means about the year's. Days colder than the month's normal add
 * heating need that a normal-day sum misses, most of all in mild months: the
 * audit of 10 November 2026 found the old sum over normal highs and lows 13–44 %
 * under NOAA's 1991–2020 normals at Jacksonville, Savannah, Raleigh, Richmond and
 * Charlotte. Checked on NOAA's own 1991–2020 monthly mean temperatures (NCEI
 * normals-monthly-1991-2020, MLY-TAVG-NORMAL, read 11 November 2026) at base
 * 65 °F, the method gives NOAA's MLY-HTDD-NORMAL totals within 1 % at Boston,
 * New York, Philadelphia, Washington, Baltimore, Atlanta, Raleigh, Richmond and
 * Charlotte, 2 % at Savannah and 5 % at Jacksonville (scripts/check-homestead.ts
 * keeps those numbers as pins).
 */
export const ERBS_A = 1.698;
export function erbsSigma(meanC: number, sigmaYr: number): number {
  // The correlation runs to zero only past about 50 °C; it is held above 0.2 °C so a desert month cannot divide by zero.
  return Math.max(0.2, 1.45 - 0.029 * meanC + 0.0664 * sigmaYr);
}
export function erbsHdd(meanC: number, sigmaM: number, days: number, base = HDD_BASE_C): number {
  const h = (base - meanC) / (sigmaM * Math.sqrt(days));
  const x = Math.abs(ERBS_A * h);
  // ln(e^−x + e^x), written so a large x cannot overflow.
  const lnCosh2 = x + Math.log1p(Math.exp(-2 * x));
  return sigmaM * Math.pow(days, 1.5) * (h / 2 + lnCosh2 / (2 * ERBS_A));
}

/** The twelve monthly mean temperatures (°C) and their spread about the year's mean, σyr. */
export function monthlyMeans(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin">): { means: number[]; sigmaYr: number } {
  const means = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
  const yr = means.reduce((a, b) => a + b, 0) / 12;
  return { means, sigmaYr: Math.sqrt(means.reduce((a, t) => a + (t - yr) ** 2, 0) / 12) };
}

export type HeatingNeed = {
  base: number;
  annual: number;
  monthly: number[];
  /** Months that each hold at least 5 % of the year's heating need, as a run (1–12), or null. */
  season: { from: number; to: number } | null;
};

/**
 * Heating degree days to base 18 °C, month by month by Erbs, Klein and
 * Beckman's method (`erbsHdd`) from the monthly mean temperatures: a station's
 * 1991–2020 normals where they were read (`tempWords` names them), else the
 * ERA5 grid's, which read 1–2 °C off the station normals in some towns (Day 5
 * audit, 14 November 2026: Texas 17–33 % low, Kelowna 17 %), so a grid town's
 * figure carries the grid's error but no longer the method's.
 */
export function heatingNeed(c: Climate, base = HDD_BASE_C): HeatingNeed {
  const { means, sigmaYr } = monthlyMeans(c);
  const monthly = means.map((t, m) => erbsHdd(t, erbsSigma(t, sigmaYr), MONTH_DAYS[m], base));
  const annual = monthly.reduce((a, b) => a + b, 0);
  // The heating season: the longest run of months each carrying 5 % or more of the year's need.
  const big = monthly.map((h) => annual > 0 && h >= 0.05 * annual);
  let season: HeatingNeed["season"] = null;
  if (annual >= 100) {
    if (big.every(Boolean)) season = { from: 1, to: 12 };
    else {
      let best = 0;
      for (let m = 0; m < 12; m++) {
        if (!big[m] || big[(m + 11) % 12]) continue;
        let len = 0;
        while (big[(m + len) % 12] && len < 12) len++;
        if (len > best) {
          best = len;
          season = { from: m + 1, to: ((m + len - 1) % 12) + 1 };
        }
      }
    }
  }
  return { base, annual, monthly, season };
}

// ---- frost dates and season extension --------------------------------------

/** Covers, cold frames and tunnels add as much as 2–4 weeks at both ends of the season (WSU Extension). */
export const COVER_WEEKS = [2, 4] as const;

export type FrostSeason = {
  /** Frost is rare: no frost dates to plan from. */
  rare: boolean;
  lastSpringDoy: number | null;
  firstFallDoy: number | null;
  lastSpringLabel: string | null;
  firstFallLabel: string | null;
  frostFreeDays: number | null;
  source?: Climate["frostSource"];
  spreadDays?: number | null;
  /** Covers can go on 2–4 weeks before the last spring frost and keep crops 2–4 weeks past the first autumn one. */
  coverFrom: [number, number] | null;
  coverUntil: [number, number] | null;
  extendedDays: [number, number] | null;
};

/** South of the equator the climate's frost days are counted from 2 July; this turns them back into calendar days. */
export function calendarDoy(c: Climate, doy: number): number {
  return c.south ? ((doy + 182) % 365) + 1 : doy;
}

export function frostSeason(c: Climate): FrostSeason {
  // 366 is the "no autumn frost" sentinel; a first frost after New Year is 365 + its January day (Climate.firstFallFrostDoy),
  // so 367 and on are dated, not rare. Day 5 audit (14 Nov 2026): NOAA's normals put New Orleans Audubon's first frost on
  // Jan 2 and Jacksonville NAS's on Jan 5, and ">= 366" read both towns as frost-free.
  const rare = c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare" || c.lastSpringFrostDoy <= 0 || c.firstFallFrostDoy === 366;
  if (rare) {
    return {
      rare: true,
      lastSpringDoy: null,
      firstFallDoy: null,
      lastSpringLabel: null,
      firstFallLabel: null,
      frostFreeDays: null,
      source: c.frostSource,
      spreadDays: c.frostSpreadDays,
      coverFrom: null,
      coverUntil: null,
      extendedDays: null,
    };
  }
  const last = calendarDoy(c, c.lastSpringFrostDoy);
  const first = calendarDoy(c, c.firstFallFrostDoy);
  const [a, b] = COVER_WEEKS.map((w) => w * 7);
  return {
    rare: false,
    lastSpringDoy: last,
    firstFallDoy: first,
    lastSpringLabel: c.lastSpringFrost,
    firstFallLabel: c.firstFallFrost,
    frostFreeDays: c.frostFreeDays,
    source: c.frostSource,
    spreadDays: c.frostSpreadDays,
    coverFrom: [wrapDoy(last - b), wrapDoy(last - a)],
    coverUntil: [wrapDoy(first + a), wrapDoy(first + b)],
    // A season cannot run past the year: where the frost season is shorter than the covers' reach at both ends (Houston's
    // 31 days, New Orleans' 41), covers carry crops through all of it. The Day 3 audit (11 Nov 2026) found "362 to 390 days"
    // at Houston and "352 to 380 days" at New Orleans.
    extendedDays: [Math.min(365, c.frostFreeDays + 2 * a), Math.min(365, c.frostFreeDays + 2 * b)],
  };
}

// ---- bees -------------------------------------------------------------------

/** Honeybees only rarely fly below 55 °F (13 °C); foraging is at its fullest from 65 °F (18 °C) (Pacific Northwest Extension). */
export const BEE_FORAGE_C = 13;
export const BEE_FULL_C = 18;
/** Flight was recorded only above 9.3 °C in winter (Kang and Jung 2024); colonies are inspected only above 50 °F, 10 °C (UF/IFAS). */
export const BEE_FLIGHT_MIN_C = 10;

export type BeeSeason = {
  /** Days, and the main run, when the average afternoon reaches 13 °C. */
  forage: Span;
  /** Days when the average afternoon reaches 18 °C. */
  full: Span;
  /** Days when the average afternoon stays below 10 °C: the colony keeps to its cluster. */
  confined: Span;
  /** Months whose mean daily high reaches 13 °C. */
  forageMonths: number[];
};

/**
 * Bees fly in the warm part of the day, so the season is read from the mean
 * daily high (the warmest hours), spread day by day from the monthly normals,
 * against the thresholds above.
 */
export function beeSeason(c: Climate): BeeSeason {
  const hi = daily(c.monthlyMeanMax);
  return {
    forage: span(hi.map((t) => t >= BEE_FORAGE_C)),
    full: span(hi.map((t) => t >= BEE_FULL_C)),
    confined: span(hi.map((t) => t < BEE_FLIGHT_MIN_C)),
    forageMonths: c.monthlyMeanMax.map((t, i) => (t >= BEE_FORAGE_C ? i + 1 : 0)).filter(Boolean),
  };
}

// ---- seasons of rain ---------------------------------------------------------

/** The first month of the longest run of months in a set (1–12), or null. */
export function runStart(months: number[]): number | null {
  if (!months.length || months.length === 12) return null;
  const mask = Array.from({ length: 12 }, (_, i) => months.includes(i + 1));
  let best = 0;
  let start: number | null = null;
  for (let m = 0; m < 12; m++) {
    if (!mask[m] || mask[(m + 11) % 12]) continue;
    let len = 0;
    while (mask[(m + len) % 12] && len < 12) len++;
    if (len > best) {
      best = len;
      start = m + 1;
    }
  }
  return start;
}

// ---- everything at once ------------------------------------------------------

export type HomesteadNumbers = {
  daylight: Daylight;
  coldHeat: ColdHeat | null;
  /** The station record behind the cold-night and hot-day counts, or null when none was in reach. */
  extremes: PlaceExtremes | null;
  roof: RoofWater | null;
  heating: HeatingNeed | null;
  frost: FrostSeason | null;
  bees: BeeSeason | null;
};

export function homesteadNumbers(input: HomesteadInput): HomesteadNumbers {
  const c = input.climate;
  return {
    daylight: daylight(input),
    coldHeat: c ? coldHeat(c) : null,
    extremes: input.extremes ?? null,
    roof: c ? roofWater(c) : null,
    heating: c ? heatingNeed(c) : null,
    frost: c ? frostSeason(c) : null,
    bees: c ? beeSeason(c) : null,
  };
}
