/**
 * Frost dates.
 *
 * Weather stations measure frost where gardens are; a reanalysis grid cell
 * averages a 30 km square and runs warm on clear, still nights. So where
 * GHCN-Daily stations with long records lie within 20 km of a place (25 km
 * failing that), their 1991–2020 record is used (src/data/place-frost.json,
 * built by scripts/build-place-frost.ts); elsewhere the ERA5 daily minimum is
 * read against a grid threshold, or, with only monthly normals to hand, the
 * frost dates are modelled from the monthly mean minimum.
 *
 * One station, not a pool (audit of 10 November 2026): the first build pooled
 * every station within 20 km, so the town's own station was mixed with
 * suburban, hill and inland ones and the printed dates matched no station
 * (Boston Apr 19 / Oct 24 against Logan's Apr 4 / Nov 9; Washington 12–13 days
 * off Reagan National; New York and Atlanta's first frost 8 days early;
 * Baltimore and Jacksonville blends of two very different stations). The
 * dates now come from the town's own station (`townStation`): the nearest
 * first-order station with 20 complete frost seasons inside the town ring
 * (15 km), else the nearest such station of any network there, else the
 * nearest such station in the 20/25 km list. Only when no station has 20
 * complete seasons are the stations pooled, and the pages then say so.
 *
 * NOAA's own dates where they are published (Day 5 audit, 14 November 2026): the pooled frequency method gave Portland
 * Mar 30 – Nov 3 where Portland International's normals say Mar 13 – Nov 19, Fairbanks May 24 – Aug 29 against Fairbanks
 * International's May 13 – Sep 13, Spokane May 7 – Oct 2 against Felts Field's Apr 26 – Oct 15 and Austin Mar 3 – Nov 22
 * against Camp Mabry's Feb 20 – Dec 3; and at one station it ran 5–6 days early in the autumn against NOAA's own 50 %
 * date (Grand Rapids Oct 14 against Oct 20). So every US town (and Niagara-on-the-Lake, whose nearest station is
 * Youngstown, New York, 2.9 km off) now takes NOAA's published 1991–2020 dates for one station, the one `townStation`
 * picks among those with normals: the 50 % dates of the last spring and first autumn night at or below 32 °F (0 °C), and
 * NOAA's count of such nights a year (scripts/build-station-normals.ts; src/data/place-station-normals.json). Canadian
 * towns keep the GHCN-Daily reading below until ECCC's frost normals can be read.
 *
 * One method reads every daily record, complete or gappy (`frostFromDaily`):
 * the frost season is a year that starts at midsummer (2 July north of the
 * equator, 1 January south of it), so one winter's frosts fall in one season
 * and a January frost in Jacksonville or a June one in Johannesburg is not
 * split between two half-years; the pooled frequency of frost on each day of
 * the season is smoothed over ±7 days; the average first frost is the day by
 * which 1.2 expected frost days have accumulated from the season's start, the
 * average last the day after which 1.2 remain. (For independent days the
 * median would be ln 2 = 0.69; cold spells persist, and 1.2 is the value that
 * reproduces the median-of-years date on 324 complete GHCN stations within
 * ±3 days, with no bias; it holds at 30 % daily coverage.) A place with fewer
 * than three expected frost days a year is frost-free: both dates "Rare",
 * never one. Sources: GHCN-Daily (NCEI, ncei.noaa.gov/products/land-based-
 * station/global-historical-climatology-network-daily); the calibration is in
 * the header of scripts/build-place-frost.ts.
 *
 * The output keeps the site's conventions: north of the equator the doys are
 * calendar days (a first frost after New Year, as in Jacksonville, is 365 +
 * its January doy, so first − last is still the frost-free season); south of
 * it the doys are counted on a year that starts on 2 July (`south`).
 */
import stations from "@/data/place-frost.json";
import { doyToLabel } from "./climate-fallback";
import type { Climate } from "./types";
import { stationName } from "./zone-label";

/** Stations pooled within this distance of a place; failing that, within the far radius. */
export const STATION_RADIUS_KM = 20;
export const STATION_RADIUS_FAR_KM = 25;
/** Expected frost days a year below which a place is frost-free ("Rare"). */
export const MIN_FROST_DAYS = 3;
/** Expected frost days accumulated by the average first (and remaining after the average last) frost. */
export const CROSSING = 1.2;
/** Fewer days of record than this across the season and the daily method is not trusted. */
export const MIN_SEASON_DAYS = 3000;

export type FrostConfidence = NonNullable<Climate["frostConfidence"]>;

export type Frost = Pick<
  Climate,
  | "lastSpringFrost"
  | "firstFallFrost"
  | "lastSpringFrostDoy"
  | "firstFallFrostDoy"
  | "frostFreeDays"
  | "frostSource"
  | "frostConfidence"
  | "frostSpreadDays"
  | "frostStations"
  | "frostStationKm"
  | "frostDaysPerYear"
> & { south?: boolean };

/** One station's own reading, kept per station by the build so the choice of station can be checked and redone offline. */
export type StationReading = {
  id: string;
  name: string;
  km: number;
  /** A national first-order station (US Weather Bureau/NWS "W" series, ECCC and other national networks): see scripts/build-place-frost.ts `firstOrder`. */
  firstOrder: boolean;
  /** Frost seasons (2 July to 1 July north of the equator, calendar years south of it) in 1991–2020 with at least 300 days of TMIN. */
  seasons: number;
  lastSpringFrost: string;
  firstFallFrost: string;
  lastSpringFrostDoy: number;
  firstFallFrostDoy: number;
  frostDaysPerYear: number;
};

/** The town ring: a station this close stands for the town itself. */
export const TOWN_RING_KM = 15;
/** Complete frost seasons a station needs before its own dates are printed for a town. */
export const MIN_TOWN_SEASONS = 20;

/**
 * The station whose own frost dates stand for the town: the nearest first-order
 * station with MIN_TOWN_SEASONS complete seasons inside TOWN_RING_KM; else the
 * nearest station of any network with that record inside the ring; else the
 * nearest such station anywhere in the list (first-order first). Null when no
 * station has a long enough record: the build then pools them and says so.
 * Against the audit of 10 November 2026 this picks Logan for Boston, Central Park
 * (not the World Trade Center co-op) for New York, Reagan National for Washington
 * and Philadelphia International (not the Franklin Institute roof) for Philadelphia.
 */
export function townStation(readings: StationReading[]): StationReading | null {
  const long = readings.filter((r) => r.seasons >= MIN_TOWN_SEASONS).sort((a, b) => a.km - b.km);
  const ring = long.filter((r) => r.km <= TOWN_RING_KM);
  return ring.find((r) => r.firstOrder) ?? ring[0] ?? long.find((r) => r.firstOrder) ?? long[0] ?? null;
}

/** Complete frost seasons (at least 300 days of TMIN) in a station's daily record. */
export function frostSeasons(days: DailyMin[], south: boolean): number {
  const n = new Map<number, number>();
  for (const { date, tmin } of days) {
    if (tmin == null || !Number.isFinite(tmin)) continue;
    const y = Number(date.slice(0, 4));
    const m = Number(date.slice(5, 7));
    const d = Number(date.slice(8, 10));
    const season = south ? y : m > 7 || (m === 7 && d >= 2) ? y : y - 1;
    n.set(season, (n.get(season) ?? 0) + 1);
  }
  return [...n.values()].filter((k) => k >= 300).length;
}

type StationFrost = {
  /** The station whose own dates these are (builds from 11 November 2026 on); absent on a pooled entry. */
  station?: { id: string; name: string; km: number };
  stations?: { id: string; name: string; km: number }[];
  lat: number;
  lon: number;
  lastSpringFrost: string;
  firstFallFrost: string;
  lastSpringFrostDoy: number;
  firstFallFrostDoy: number;
  frostFreeDays: number;
  frostSpreadDays: number | null;
  frostStations: number | null;
  frostStationKm?: number;
  frostDaysPerYear?: number;
  frostConfidence?: FrostConfidence;
  /** How the dates were read: GHCN-Daily pooled frequency, or NOAA's published normals ("NOAA NCEI 1991–2020 normals: ..."). */
  method?: string;
};
const STATIONS = Object.values(stations as Record<string, StationFrost>);

const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  return Math.hypot((d - b) * r * Math.cos(((a + c) / 2) * r), (c - a) * r) * 6371;
};

/** Station frost normals for a point, when a pre-built place with long-record stations lies within 10 km of it (its record pools the stations within 20 km). */
export function stationFrost(lat: number, lon: number): Frost | null {
  let best: StationFrost | null = null;
  let bestKm = 10;
  for (const s of STATIONS) {
    const d = km(lat, lon, s.lat, s.lon);
    if (d <= bestKm) {
      best = s;
      bestKm = d;
    }
  }
  if (!best) return null;
  return {
    lastSpringFrost: best.lastSpringFrost,
    firstFallFrost: best.firstFallFrost,
    lastSpringFrostDoy: best.lastSpringFrostDoy,
    firstFallFrostDoy: best.firstFallFrostDoy,
    frostFreeDays: best.frostFreeDays,
    frostSource: "stations",
    frostConfidence: best.frostConfidence ?? "medium",
    frostSpreadDays: best.frostSpreadDays,
    frostStations: best.frostStations,
    frostStationKm: best.frostStationKm,
    frostDaysPerYear: best.frostDaysPerYear,
  };
}

// ---- the frost season ---------------------------------------------------------

const MS_DAY = 86400000;

/** Day of the frost season (1-based) for a calendar date: the season starts 2 July north of the equator, 1 January south of it. */
export function seasonDoy(iso: string, south: boolean): number {
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  const t = Date.UTC(y, m - 1, d);
  if (south) return Math.floor((t - Date.UTC(y, 0, 1)) / MS_DAY) + 1;
  const startYear = m > 7 || (m === 7 && d >= 2) ? y : y - 1;
  return Math.floor((t - Date.UTC(startYear, 6, 2)) / MS_DAY) + 1;
}

/**
 * Season days of the average first and last frost, into the site's doys:
 * north, calendar days with a post-New-Year first frost carried past 365;
 * south, days of a year that starts on 2 July.
 */
export function seasonToOutput(first: number, last: number, south: boolean): { lastDoy: number; firstDoy: number } {
  const conv = south ? (cal: number) => (cal >= 183 ? cal - 182 : cal + 183) : (s: number) => (s <= 183 ? s + 182 : s - 183);
  let f = conv(first);
  const l = conv(last);
  if (f < l) f += 365;
  // 366 is the "no autumn frost" sentinel the site has always used, so a first frost on 1 January is kept a day early.
  if (f === 366) f = 365;
  return { lastDoy: l, firstDoy: f };
}

const labelFor = (doy: number, south: boolean) => doyToLabel(south ? doy + 182 : doy);

const RARE = (source: Frost["frostSource"], confidence: FrostConfidence, south: boolean, days: number): Frost => ({
  lastSpringFrost: "Rare",
  firstFallFrost: "Rare",
  lastSpringFrostDoy: 0,
  firstFallFrostDoy: 366,
  frostFreeDays: 366,
  frostSource: source,
  frostConfidence: confidence,
  frostSpreadDays: null,
  frostStations: null,
  frostDaysPerYear: Math.round(days * 10) / 10,
  ...(south ? { south: true } : {}),
});

export type DailyMin = { date: string; tmin: number | null };
export type FrostThreshold = number | { spring: number; autumn: number };

/**
 * The frost dates from daily minima (°C), one array per station or grid
 * cell, pooled. Days may be missing. `threshold` is the minimum at or below
 * which a screen-level frost is counted: 0 °C for a station, the grid
 * threshold for a reanalysis cell (a different one for autumn and spring).
 */
export function frostFromDaily(series: DailyMin[][], south: boolean, threshold: FrostThreshold = 0): { frost: Frost; expectedDays: number; days: number } {
  const t = typeof threshold === "number" ? { spring: threshold, autumn: threshold } : threshold;
  // Pooled counts by season day: autumn frosts are read against the autumn threshold in the first half of the season, spring ones against the spring threshold in the second.
  const n = new Array<number>(367).fill(0);
  const kAutumn = new Array<number>(367).fill(0);
  const kSpring = new Array<number>(367).fill(0);
  let days = 0;
  for (const s of series) {
    for (const { date, tmin } of s) {
      if (tmin == null || !Number.isFinite(tmin)) continue;
      const d = seasonDoy(date, south);
      if (d < 1 || d > 365) continue;
      n[d]++;
      days++;
      if (tmin <= t.autumn) kAutumn[d]++;
      if (tmin <= t.spring) kSpring[d]++;
    }
  }
  const smooth = (k: number[]) => {
    const p = new Array<number>(367).fill(0);
    for (let d = 1; d <= 365; d++) {
      let kk = 0;
      let nn = 0;
      for (let o = -7; o <= 7; o++) {
        let j = d + o;
        if (j < 1) j += 365;
        if (j > 365) j -= 365;
        kk += k[j];
        nn += n[j];
      }
      p[d] = nn ? kk / nn : 0;
    }
    return p;
  };
  const pA = smooth(kAutumn);
  const pS = smooth(kSpring);
  // Expected frost days a year: the autumn count up to midseason, the spring count after it.
  let expected = 0;
  for (let d = 1; d <= 365; d++) expected += d <= 183 ? pA[d] : pS[d];
  if (expected < MIN_FROST_DAYS) return { frost: RARE("grid", "medium", south, expected), expectedDays: expected, days };
  let acc = 0;
  let first = 183;
  for (let d = 1; d <= 365; d++) {
    acc += pA[d];
    if (acc >= CROSSING) {
      first = d;
      break;
    }
  }
  acc = 0;
  let last = 184;
  for (let d = 365; d >= 1; d--) {
    acc += pS[d];
    if (acc >= CROSSING) {
      last = d;
      break;
    }
  }
  if (last <= first) {
    // Frost in a single short spell: the dates meet.
    last = first + 1;
  }
  const { lastDoy, firstDoy } = seasonToOutput(first, last, south);
  return {
    frost: {
      lastSpringFrost: labelFor(lastDoy, south),
      firstFallFrost: labelFor(firstDoy, south),
      lastSpringFrostDoy: lastDoy,
      firstFallFrostDoy: firstDoy,
      frostFreeDays: firstDoy - lastDoy,
      frostSource: "grid",
      frostConfidence: "low",
      frostSpreadDays: null,
      frostStations: null,
      frostDaysPerYear: Math.round(expected * 10) / 10,
      ...(south ? { south: true } : {}),
    },
    expectedDays: expected,
    days,
  };
}

// ---- the reanalysis grid --------------------------------------------------------

/**
 * The grid-minimum thresholds (°C) at or below which a screen-level frost is
 * counted, from the cell's mean diurnal range in its three coldest months.
 * Under clear, calm skies the surface cools far below a 30 km cell's 2 m
 * average (the nocturnal inversion), and a wide diurnal range is the mark of
 * such nights; cloudy, windy maritime air shows little range and little
 * difference between cell and screen. Values: the site's old 4.5 °C rule set
 * against GHCN stations within 20 km of 46 towns (scripts/build-place-frost.ts
 * header): with a range under 6 °C the grid read frost 2.2 °C too generously
 * in spring and 0.9 in autumn; with a wider range it was right in spring and
 * 2 °C too mild in autumn (ERA5 autumn nights over the continental interior
 * run warm against station frosts).
 */
export function gridThresholds(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin">): { spring: number; autumn: number; diurnalRange: number } {
  const means = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
  const cold = [...means.keys()].sort((a, b) => means[a] - means[b]).slice(0, 3);
  const diurnalRange = cold.reduce((s, i) => s + c.monthlyMeanMax[i] - c.monthlyMeanMin[i], 0) / 3;
  if (diurnalRange < 6) return { spring: 2.5, autumn: 3.5, diurnalRange };
  return { spring: 4.5, autumn: 6.5, diurnalRange };
}

/** Frost dates from a reanalysis cell's daily minima (one array, `DailyMin[]`), read against the grid thresholds. */
export function gridFrost(days: DailyMin[], c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin">, south: boolean): Frost {
  const { frost } = frostFromDaily([days], south, gridThresholds(c));
  return { ...frost, frostSource: "grid", frostConfidence: "low" };
}

// ---- from monthly normals only --------------------------------------------------

const MID = [15.5, 45, 74.5, 105, 135.5, 166, 196.5, 227.5, 258, 288.5, 319, 349.5];

/** The mean minimum on a calendar day, interpolated between the months' midpoints. */
function dailyMeanMin(monthlyMeanMin: number[], doy: number): number {
  const d = ((doy - 1 + 365) % 365) + 1;
  for (let i = 0; i < 12; i++) {
    const a = MID[i];
    const b = i === 11 ? MID[0] + 365 : MID[i + 1];
    const dd = i === 11 && d < MID[0] ? d + 365 : d;
    if (dd >= a && dd <= b) {
      const t = (dd - a) / (b - a);
      return monthlyMeanMin[i] * (1 - t) + monthlyMeanMin[(i + 1) % 12] * t;
    }
  }
  return monthlyMeanMin[0];
}

/**
 * Frost dates modelled from twelve monthly mean minima, for a place with no
 * station and no daily record. The average last spring frost falls where the
 * mean minimum rises through T* = 2.2 + 0.44 × (diurnal range of the three
 * coldest months) °C, the first autumn frost where it falls through
 * T* = 4.6 + 0.32 × range: fitted on 158 pre-built towns with pooled GHCN
 * stations within 15 km against their ERA5 monthly means (residual 1.5 °C,
 * about ±12 days; scripts/build-place-frost.ts header). The frost year is
 * frost-free when the curve never reaches T*, or dips under it for less than
 * two weeks.
 */
export function normalsFrost(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin">, south: boolean): Frost {
  const { diurnalRange } = gridThresholds(c);
  const tLast = 2.2 + 0.44 * diurnalRange;
  const tFirst = 4.6 + 0.32 * diurnalRange;
  const mins = c.monthlyMeanMin;
  // Walk the season from midsummer: the first day the curve falls under tFirst, the last day it is under tLast.
  const startCal = south ? 1 : 183;
  let first: number | null = null;
  let last: number | null = null;
  for (let s = 1; s <= 365; s++) {
    const cal = ((startCal - 1 + s - 1) % 365) + 1;
    const v = dailyMeanMin(mins, cal);
    if (first == null && v <= tFirst) first = s;
    if (v <= tLast) last = s;
  }
  if (first == null || last == null || last - first < 14) return RARE("grid", "low", south, 0);
  const { lastDoy, firstDoy } = seasonToOutput(first, last, south);
  return {
    lastSpringFrost: labelFor(lastDoy, south),
    firstFallFrost: labelFor(firstDoy, south),
    lastSpringFrostDoy: lastDoy,
    firstFallFrostDoy: firstDoy,
    frostFreeDays: firstDoy - lastDoy,
    frostSource: "grid",
    frostConfidence: "low",
    frostSpreadDays: null,
    frostStations: null,
    ...(south ? { south: true } : {}),
  };
}

/** Whether a climate record says frost is rare in both halves of the year. */
export const frostFree = (c: Pick<Climate, "lastSpringFrost" | "firstFallFrost"> | null | undefined): boolean =>
  !c || (c.lastSpringFrost === "Rare" && c.firstFallFrost === "Rare");

/** "4", "13", "6.8": a distance in km as the pages print it. */
export const kmText = (x: number) => (x < 10 ? x.toFixed(1).replace(/\.0$/, "") : String(Math.round(x)));

/**
 * Plain words for where the frost dates came from, for captions. A pooled
 * reading says it is pooled and gives the nearest station's distance as the
 * nearest (the audit of 10 November 2026 found "3 weather stations 13 km away"
 * when only the nearest was 13 km off), and every station reading gives a distance.
 */
export function frostSourceWords(c: Pick<Climate, "frostSource" | "frostConfidence" | "frostStations" | "frostStationKm">): string {
  if (c.frostSource === "stations") {
    const n = c.frostStations ?? 1;
    const km = c.frostStationKm != null ? kmText(c.frostStationKm) : null;
    if (n > 1) return km ? `pooled from ${n} weather stations, the nearest ${km} km away` : `pooled from ${n} nearby weather stations`;
    return km ? `from a weather station ${km} km away` : "from a nearby weather station";
  }
  return c.frostConfidence === "low" ? "estimated from the reanalysis grid" : "from the reanalysis grid";
}

const BY_SLUG = stations as Record<string, StationFrost>;

/**
 * The full sentence on where a pre-built town's frost dates come from, naming
 * the station (or every station of a pool) and its distance: "Average frost
 * dates at Boston Logan, 4 km away, 1991–2020." Null for a town with no station
 * entry. Server-side only (it reads place-frost.json).
 */
export function frostProvenance(slug: string): string | null {
  const e = BY_SLUG[slug];
  if (!e) return null;
  const spread = e.frostSpreadDays;
  if (e.station) {
    // NOAA's normals give the date by which half of years have had their last (or first) frost: say so, since "average" is not quite it.
    if (e.method?.startsWith("NOAA") && e.lastSpringFrost === "Rare")
      return `Frost is rare at ${stationName(e.station.name)}, ${kmText(e.station.km)} km away: NOAA's 1991–2020 normals count ${e.frostDaysPerYear ?? "under 3"} nights a year at or below 0 °C.`;
    if (e.method?.startsWith("NOAA")) return `Frost dates at ${stationName(e.station.name)}, ${kmText(e.station.km)} km away, from NOAA's 1991–2020 normals: in half of years the last spring frost comes earlier and the first autumn frost later.`;
    const others = spread ? `; the other stations within ${STATION_RADIUS_KM} km differ by up to ${spread} days` : "";
    return `Average frost dates at ${stationName(e.station.name)}, ${kmText(e.station.km)} km away, 1991–2020${others}.`;
  }
  const list = e.stations ?? [];
  if (list.length === 1) return `Average frost dates at ${stationName(list[0].name)}, ${kmText(list[0].km)} km away, 1991–2020.`;
  if (!list.length) return null;
  const kms = list.map((x) => x.km);
  const range = `${kmText(Math.min(...kms))}–${kmText(Math.max(...kms))} km away`;
  return `Average frost dates pooled from ${list.length} weather stations ${range} (${list.map((x) => stationName(x.name)).join(", ")}), 1991–2020${spread ? `, which disagree by up to ${spread} days` : ""}.`;
}
