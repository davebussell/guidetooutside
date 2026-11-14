/**
 * What sets the year for a place.
 *
 * Frost frames the garden in Toronto; in Cape Town it is the winter rains, in
 * Nairobi the two rainy seasons, in Lagos heat and rain all year. The regime
 * reads the place's twelve monthly means and totals (ERA5, src/lib/climate)
 * as a Köppen–Geiger climate and then as a gardener would: which months are
 * wet, which are dry, and whether the frost dates or the rains run the
 * season.
 *
 * Dry months: outside the tropics, Gaussen's rule (rain under twice the mean
 * temperature, Bagnouls & Gaussen 1957); in the tropics, Köppen's own dry-
 * month line of 60 mm, which is what separates Af from Aw/As (Nairobi's hot
 * January at 54 mm and its cool July at 20 mm are both dry; the Gaussen rule
 * passed January); in deserts and semi-arid climates every month, since a B
 * climate is by definition one where evaporation outruns the rain (Köppen).
 * Frost-led: the frost dates frame the garden where winters are real —
 * continental and subarctic regimes; humid-subtropical ones whose typical
 * coldest night kills the hardy crops (HARDY_CROPS_KILLED_C: Memphis, Little
 * Rock, Atlanta); the highland, semi-arid and desert ones with a frost-free
 * season under 240 days (Denver, Calgary, Johannesburg); and any place with
 * under 190 frost-free days (Edinburgh) — not where frost is a few nights a
 * winter (London ≈ 228 frost-free days; Houston, Phoenix 325; Lisbon none).
 */
import type { Climate, RainPattern, Regime, RegimeId } from "./types";

export type { Regime, RegimeId, RainPattern } from "./types";

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "May–Aug", "Mar and Oct–Jan", "all year". Runs that wrap December are kept whole. */
export function monthSpans(months: number[], short = true): string {
  if (!months.length) return "";
  if (months.length === 12) return "all year";
  const set = new Set(months);
  const runs: [number, number][] = [];
  // Start a run at a month whose predecessor is not in the set, so runs that wrap December are kept whole.
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || set.has(((m + 10) % 12) + 1)) continue;
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) end = (end % 12) + 1;
    runs.push([m, end]);
  }
  const name = short ? SHORT : MONTHS;
  return runs.map(([a, b]) => (a === b ? name[a - 1] : `${name[a - 1]}–${name[b - 1]}`)).join(" and ");
}

/** How many separate runs of months a set makes, counting a run across December once. */
function runCount(months: number[]): number {
  if (months.length === 12) return 1;
  const set = new Set(months);
  let n = 0;
  for (let m = 1; m <= 12; m++) if (set.has(m) && !set.has(((m + 10) % 12) + 1)) n++;
  return n;
}

const means = (c: Climate) => c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
/**
 * A humid subtropical winter frames the garden when its typical coldest night (the mean annual extreme minimum, counted at
 * the station where there is one) reaches the point that kills the hardy crops: −8 °C in the site's hardiness table
 * (src/lib/crops.ts HARDINESS: hardy crops "take −4 to −6 °C", dead at −8 °C), and the point to which the fig record says
 * the tree is hardy. Below it only the very hardy crops stand through winter, and the year runs between the frost dates.
 * It replaces a frost-free season under 240 days, which the Day 3 audit (11 Nov 2026) found splitting Little Rock (245 days
 * from pooled stations) from Memphis (230), towns with the same typical coldest night (−10.2 °C). Little Rock was then told
 * frost there is "a matter of nights rather than a season" (NOAA's 1991–2020 normals for Adams Field, cited by the audit:
 * 50 nights at or below 0 °C) and given figs and pomegranates to plant in November, where the University of Arkansas plants
 * figs "late February through early April" and notes that "fig trees got frozen back even in central Arkansas"
 * (https://www.uaex.uada.edu/yard-garden/in-the-garden/reference-desk/fruits/fig.aspx, read 11 Nov 2026). On the 264 towns
 * it moves only Little Rock; Dallas (−7.2 °C), Savannah, Austin, Houston and New Orleans stay as they were.
 */
const HARDY_CROPS_KILLED_C = -8;
const round1 = (x: number) => Math.round(x * 10) / 10;

/** Köppen–Geiger code from twelve monthly means (°C) and totals (mm). */
export function koppen(t: number[], p: number[], lat: number): string {
  const tAnn = t.reduce((a, b) => a + b, 0) / 12;
  const pAnn = p.reduce((a, b) => a + b, 0);
  const hot = Math.max(...t);
  const cold = Math.min(...t);
  // The summer half: April to September in the north, October to March in the south.
  const summer = lat >= 0 ? [3, 4, 5, 6, 7, 8] : [9, 10, 11, 0, 1, 2];
  const winter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter((i) => !summer.includes(i));
  const pSummer = summer.reduce((a, i) => a + p[i], 0);
  const pWinter = winter.reduce((a, i) => a + p[i], 0);
  const pThreshold = pSummer >= 0.7 * pAnn ? 2 * tAnn + 28 : pWinter >= 0.7 * pAnn ? 2 * tAnn : 2 * tAnn + 14;

  if (hot < 10) return hot > 0 ? "ET" : "EF";
  if (pAnn < 10 * pThreshold) return `${pAnn < 5 * pThreshold ? "BW" : "BS"}${tAnn >= 18 ? "h" : "k"}`;
  if (cold >= 18) {
    const dry = Math.min(...p);
    if (dry >= 60) return "Af";
    if (dry >= 100 - pAnn / 25) return "Am";
    return summer.includes(p.indexOf(dry)) ? "As" : "Aw";
  }
  const sDry = Math.min(...summer.map((i) => p[i]));
  const sWet = Math.max(...summer.map((i) => p[i]));
  const wDry = Math.min(...winter.map((i) => p[i]));
  const wWet = Math.max(...winter.map((i) => p[i]));
  const second = wDry < sWet / 10 ? "w" : sDry < 40 && sDry < wWet / 3 ? "s" : "f";
  const warmMonths = t.filter((x) => x > 10).length;
  const third = hot >= 22 ? "a" : warmMonths >= 4 ? "b" : cold < -38 ? "d" : "c";
  return `${cold > 0 ? "C" : "D"}${second}${third}`;
}

type RegimeText = Pick<Regime, "name" | "short" | "runsOn" | "limit"> & { summary: (wet: number[], dry: number[], rain: RainPattern, frostLed: boolean, range: number) => string };

const REGIMES: Record<RegimeId, RegimeText> = {
  "tropical-humid": {
    name: "Tropical humid",
    short: "heat and rain nearly all year",
    runsOn: "heat and rain",
    limit: "heat, pests and leaching rain",
    summary: () =>
      "Hot and wet nearly all year. Growth never stops — and neither do pests, disease and the rain that washes nutrients out of the soil. Mounds, mulch and shade are the gardener's tools.",
  },
  "tropical-wet-dry": {
    name: "Tropical wet and dry",
    short: "heat all year, with a rainy season and a dry one",
    runsOn: "the rainy season",
    limit: "the length of the rainy season",
    summary: (wet, dry) =>
      `Hot all year, with a rainy season${wet.length ? ` (${monthSpans(wet)})` : ""} and a long dry one${dry.length ? ` (${monthSpans(dry)})` : ""}. Planting follows the first good rains; the dry season belongs to watered beds and tree crops.`,
  },
  "tropical-highland": {
    name: "Tropical highland",
    short: "mild weather all year at altitude",
    runsOn: "the rains",
    limit: "the timing of the rains",
    summary: (wet, _dry, rain) =>
      `Altitude keeps it mild all year — warm days, cool nights, no frost to speak of. ${
        rain === "two-rainy-seasons"
          ? `There are two rainy seasons (${monthSpans(wet)}), and each one is a planting season.`
          : wet.length
            ? `The rains come ${monthSpans(wet)}, and planting follows them.`
            : "Planting follows the rains."
      }`,
  },
  "subtropical-highland": {
    name: "Highland, summer rain",
    short: "warm, wet summers and dry, sunny winters",
    runsOn: "the summer rains",
    limit: "the dry winter and its frosty nights",
    summary: (wet) =>
      `Warm, wet summers and dry, sunny winters with cold — sometimes frosty — nights.${wet.length ? ` The rain comes ${monthSpans(wet)}.` : ""} Plant with the summer rains and water through the dry season.`,
  },
  desert: {
    name: "Desert",
    short: "almost no rain and fierce summer heat",
    runsOn: "the cool months and irrigation",
    limit: "heat and lack of water",
    summary: () =>
      "Almost no rain and fierce summer heat. The growing season is the cool half of the year, under shade and on drip water; midsummer is for resting the ground.",
  },
  // "Wide swings between day and night" was printed for every semi-arid town; the Day 4 audit (13 Nov 2026) found it at San
  // Diego, where NOAA's 1991–2020 normals put the day–night range at 5.5 °C (August) to 9 °C (January), under the median of
  // the site's 264 towns (8.6 °C on the grid). So the summary gives the town's own average range (`range`, the mean of its
  // twelve monthly highs less lows) instead of an adjective, and the short form says only what every semi-arid town shares.
  "semi-arid": {
    name: "Semi-arid",
    short: "little rain",
    runsOn: "scarce rain",
    limit: "water",
    summary: (wet, _dry, _rain, frostLed, range) =>
      frostLed
        ? `Little and unreliable rain,${wet.length ? ` most of it ${monthSpans(wet)},` : ""} with cold winters, afternoons about ${Math.round(range)} °C warmer than the nights on average, and a growing season framed by the frost dates. Every bed is irrigated: mulch, drip lines and windbreaks matter as much as the calendar.`
        : `Little and unreliable rain,${wet.length ? ` most of it ${monthSpans(wet)},` : ""} with afternoons about ${Math.round(range)} °C warmer than the nights on average. Every crop depends on water you can supply, so beds are mulched, sunken or shaded and planted for the cooler months.`,
  },
  mediterranean: {
    name: "Mediterranean",
    short: "mild, wet winters and long, dry summers",
    runsOn: "the winter rains",
    limit: "summer drought",
    summary: (wet) =>
      `Mild, wet winters and long, dry summers${wet.length ? ` — the rain falls mostly ${monthSpans(wet)}` : ""}. The dry summer sets the limit: start summer crops in spring, water deeply through the dry months, and sow cool-season crops as the rain returns in autumn.`,
  },
  "humid-subtropical": {
    name: "Humid subtropical",
    short: "hot, humid summers and mild winters",
    runsOn: "the seasons either side of summer",
    limit: "summer heat, humidity and storms",
    // "Spring and autumn are the main growing seasons" only where frost frames the year: the Day 3 audit (11 Nov 2026) found
    // it at Brownsville, whose season runs September to January (Texas A&M AgriLife's Rio Grande Valley guide,
    // https://agrilifeextension.tamu.edu/wp-content/uploads/2025/08/RGV-Homeowner-Vegetable-Guide-2022.pdf, read 11 Nov 2026).
    summary: (_wet, _dry, _rain, frostLed) =>
      frostLed
        ? "Hot, humid summers and mild winters. Midsummer heat and disease are the hard part; spring and autumn are the main growing seasons and the cool months grow leafy crops well."
        : "Hot, humid summers and mild winters. Midsummer heat and disease are the hard part, and the cool months grow leafy crops well.",
  },
  maritime: {
    name: "Mild maritime",
    short: "mild, damp and changeable weather",
    runsOn: "a long, cool season",
    limit: "cool summers and wet winters",
    summary: () =>
      "Mild, damp and changeable — winters rarely bite and summers rarely bake. The season is long but cool: leafy and root crops do well, heat-lovers want the sunniest wall or cover, and slugs never really go away.",
  },
  continental: {
    name: "Cold-winter temperate",
    short: "cold winters and warm summers",
    runsOn: "the frost dates",
    limit: "winter cold and the frost dates",
    summary: () =>
      "Winters with real frost, summers warm enough for most crops. The frost dates frame the season: tender crops go out after the last spring frost and come in before the first autumn one.",
  },
  subarctic: {
    name: "Subarctic",
    short: "long, hard winters and a short, bright summer",
    runsOn: "the short frost-free summer",
    limit: "a short frost-free season",
    summary: () =>
      "Long, hard winters and a short, bright summer. Everything is timed to the frost-free window, and quick crops are the reliable ones.",
  },
};

/** The gardener's regime for a Köppen code. */
function regimeId(k: string, lat: number, coldest: number): RegimeId {
  const tropics = Math.abs(lat) < 23.5;
  if (k === "Af" || k === "Am") return "tropical-humid";
  if (k.startsWith("A")) return "tropical-wet-dry";
  if (k.startsWith("BW")) return "desert";
  if (k.startsWith("BS")) return "semi-arid";
  if (k.startsWith("Cs")) return "mediterranean";
  if (k.startsWith("Cw")) return Math.abs(lat) < 15 ? "tropical-highland" : "subtropical-highland";
  if (k.startsWith("Cf")) {
    // In the tropics a temperate climate is a mountain one: Nairobi, Arusha, Asmara.
    if (tropics) return "tropical-highland";
    if (k === "Cfa") return coldest >= 5 ? "humid-subtropical" : "continental";
    return coldest >= 3 ? "maritime" : "continental";
  }
  if (k === "Dfc" || k === "Dfd" || k === "Dwc" || k === "Dwd" || k === "Dsc" || k === "Dsd" || k.startsWith("E")) return "subarctic";
  return "continental";
}

/** The place's regime, or null when its climate record has no rainfall (read before rain was recorded). */
export function regimeOf(c: Climate, lat: number): Regime | null {
  const p = c.monthlyRainMm;
  if (!p || p.length !== 12) return null;
  const t = means(c);
  const k = koppen(t, p, lat);
  const annual = p.reduce((a, b) => a + b, 0);
  const mean = annual / 12;
  // A month is wet when it has real rain (50 mm) and more than its share of the year's.
  const wetByAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((m) => p[m - 1] >= 50 && p[m - 1] >= 1.1 * mean);
  const summer = lat >= 0 ? [4, 5, 6, 7, 8, 9] : [10, 11, 12, 1, 2, 3];
  const summerShare = summer.reduce((a, m) => a + p[m - 1], 0) / Math.max(1, annual);
  const rain: RainPattern =
    annual < 250
      ? "little-rain"
      : Math.abs(lat) < 12 && runCount(wetByAmount) >= 2
        ? "two-rainy-seasons"
        : summerShare >= 0.65
          ? "summer-rain"
          : summerShare <= 0.35
            ? "winter-rain"
            : "year-round";
  const id = regimeId(k, lat, Math.min(...t));
  const tropical = id === "tropical-humid" || id === "tropical-wet-dry" || id === "tropical-highland";
  const arid = id === "desert" || id === "semi-arid";
  const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // In the tropics a month with its full share of the year's rain is wet when it opens or closes a rainy run (Nairobi's March, 79 mm against a 76 mm mean, opens the long rains: Kenya Met); a month between two runs stays a break (Lagos's August, NiMet's "little dry season").
  const wetTropical = ALL.filter((m) => {
    if (p[m - 1] < 50 || p[m - 1] < mean) return false;
    if (wetByAmount.includes(m)) return true;
    const prevWet = wetByAmount.includes(((m + 10) % 12) + 1);
    const nextWet = wetByAmount.includes((m % 12) + 1);
    return prevWet !== nextWet;
  });
  const wetMonths =
    rain === "little-rain" ? [] : rain === "year-round" && Math.min(...p) >= 40 ? ALL : tropical ? wetTropical : wetByAmount;
  const dryMonths = arid
    ? ALL
    : tropical
      ? ALL.filter((m) => p[m - 1] < 60)
      : // Gaussen's rule: a month is dry when its rain (mm) is under twice its mean temperature (°C).
        ALL.filter((m) => p[m - 1] < 2 * t[m - 1]);
  const coldestC = round1(Math.min(...t));
  const warmestC = round1(Math.max(...t));
  const frostDated = c.lastSpringFrost !== "Rare" && c.firstFallFrost !== "Rare";
  const frostLed =
    id === "continental" ||
    id === "subarctic" ||
    (id === "humid-subtropical" && frostDated && c.meanAnnualExtremeMinC <= HARDY_CROPS_KILLED_C) ||
    ((id === "subtropical-highland" || id === "semi-arid" || id === "desert") && frostDated && c.frostFreeDays < 240) ||
    // A maritime place with a frost-free season as short as Toronto's (Edinburgh, 166 days) still plants by the frost dates.
    (frostDated && c.frostFreeDays < 190);
  // A cold semi-arid or desert place (Denver, Calgary, Boise) runs on the frost dates and the hose, not on the cool months.
  const text: RegimeText =
    frostLed && (id === "semi-arid" || id === "desert")
      ? { ...REGIMES[id], short: "little rain, cold winters and warm, dry summers", runsOn: "the frost dates and irrigation", limit: "water and the frost dates" }
      : REGIMES[id];
  return {
    id,
    koppen: k,
    rain,
    wetMonths,
    dryMonths,
    coldestC,
    warmestC,
    annualRainMm: annual,
    short: text.short,
    runsOn: text.runsOn,
    name: text.name,
    limit: text.limit,
    summary: text.summary(wetMonths, dryMonths, rain, frostLed, c.monthlyMeanMax.reduce((a, mx, i) => a + mx - c.monthlyMeanMin[i], 0) / 12),
    frostLed,
  };
}

// ---- how sure the Köppen class is ------------------------------------------------------------------------------

/**
 * The margins a Köppen class is read within: half a degree on every monthly mean, and 10 % on precipitation from a station
 * record (20 % on the grid's, the 15–25 % the climate figure's own caption gives for the reanalysis on coasts, in mountains
 * and deserts). Where no station normal was read the monthly means are ten years of the ERA5 weather-model grid, and the audits found them a
 * degree or more from the nearest station's normals in most towns they checked (10 and 13 November 2026: Albuquerque and
 * Boise, the Florida towns). The Day 4 audit (13 Nov 2026) found the class flip on them: San Jose reads BSk on the grid
 * (annual mean 16.0 °C, 306 mm in 22 years of GHCN-Daily, against a dry line of 320 mm), where NOAA's 1991–2020 normals
 * (15.9 °C, 342 mm) make it Csb. A class that a shift within these margins changes is printed with the one it may be (71 of
 * the 264 towns when this was written). Santa Barbara's Csa rests on an ERA5 August of 24.1 °C where the station 1.8 km
 * away averages 20.6 °C: 2.1 °C over the 22 °C line, far outside any such margin, so only the caption's "read from" the
 * grid's temperatures says where it comes from; the fix there is station normals.
 * Day 5 audit (14 November 2026): the grid also gave Kelowna Dfa/BSk/Cfa (the station: Dfb or BSk), Thompson Dfb (Dfc),
 * Kingston Dfa (Dfb), Spokane Dsa (Dsb) and Grand Forks a class off its station's, and put Bozeman's and Seattle's coldest
 * month in February where the station's is December. Station normals now stand in 74 towns (src/data/place-station-
 * normals.json; `tempSource` "station" on the record), and the class is read from them; the margins stay, since nearby
 * stations' normals differ by about as much.
 */
export const KOPPEN_MARGIN_C = 0.5;
export const KOPPEN_RAIN_MARGIN = { station: 0.1, grid: 0.2 } as const;

/** The Köppen classes within the margins of the grid's reading, the grid's own first; one entry where the class is settled. */
export function koppenWithin(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin" | "monthlyRainMm" | "rainSource">, lat: number): string[] {
  const p = c.monthlyRainMm;
  if (!p || p.length !== 12) return [];
  const t = means(c as Climate);
  const own = koppen(t, p, lat);
  const e = c.rainSource === "station" ? KOPPEN_RAIN_MARGIN.station : KOPPEN_RAIN_MARGIN.grid;
  const out = new Set<string>([own]);
  for (const dt of [-KOPPEN_MARGIN_C, 0, KOPPEN_MARGIN_C])
    for (const f of [1 - e, 1, 1 + e])
      out.add(
        koppen(
          t.map((x) => x + dt),
          p.map((x) => x * f),
          lat,
        ),
      );
  return [...out];
}

/** "Köppen Csa", or "Köppen BSk or Csb" where the class is within the margins of another (koppenWithin). */
export function koppenText(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin" | "monthlyRainMm" | "rainSource">, lat: number, own: string): string {
  const all = koppenWithin(c, lat);
  const others = all.filter((k) => k !== own);
  return others.length ? `Köppen ${own} or ${others.join(" or ")}` : `Köppen ${own}`;
}

// ---- the state of the rains in a month --------------------------------------------------------------------------

/** The regime's dry and semi-arid climates, where every month counts as dry for watering (Köppen's B climates). */
export const isArid = (r: Pick<Regime, "id">) => r.id === "desert" || r.id === "semi-arid";

export type RainsNow = {
  /** The month is one of the wet months, and the last of its run. */
  inRains: boolean;
  last: boolean;
  /** Not a wet month, and next to one: the rains come next month, or ended last month. */
  dueNext: boolean;
  afterRains: boolean;
  /**
   * Dry by the month's own rain: the regime's dry months, except that in a dry climate (where every month counts as dry for
   * watering) the season words follow Gaussen's rule on the month itself, so a 31 mm November at San Jose is not called "the
   * dry season" (Day 4 audit, 13 Nov 2026).
   */
  dry: boolean;
  /** The month's average precipitation, mm (null without a record). */
  monthMm: number | null;
};

export function rainsNow(r: Regime, c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin" | "monthlyRainMm"> | null, month: number): RainsNow {
  const next = (month % 12) + 1;
  const prev = ((month + 10) % 12) + 1;
  const inRains = r.wetMonths.includes(month);
  const p = c?.monthlyRainMm && c.monthlyRainMm.length === 12 ? c.monthlyRainMm[month - 1] : null;
  const t = c ? (c.monthlyMeanMax[month - 1] + c.monthlyMeanMin[month - 1]) / 2 : null;
  const dry = r.dryMonths.includes(month) && (!isArid(r) || p == null || t == null || p < 2 * t);
  return {
    inRains,
    last: inRains && !r.wetMonths.includes(next),
    dueNext: !inRains && r.wetMonths.includes(next),
    afterRains: !inRains && r.wetMonths.includes(prev),
    dry,
    monthMm: p,
  };
}

/**
 * Whether the week's forecast is a wet week for the month: at least a week's share of the month's average and at least 5 mm
 * (under 5 mm the rain tile calls the week dry). The Day 4 audit (13 Nov 2026) found "The rains are due next month" and "Dry
 * season" at Sacramento, San Jose and Santa Barbara beside 40.9 mm and 114.5 mm forecast for the week.
 */
export const wetWeek = (weekMm: number, monthMm: number | null) => weekMm >= 5 && weekMm >= ((monthMm ?? 0) * 7) / 30;

/**
 * "rain in winter", "rain through the year", "two rainy seasons"; in the tropics, where there is no summer, "a rainy season
 * and a dry one". With the place's dry months, "rain through the year" is said only where no month is dry (empty
 * otherwise): the Day 3 audit (11 Nov 2026) found it printed beside "Dry months: Jul–Aug and Dec–Apr" at Brownsville, and it
 * stood beside dry months at 27 towns (Boise, Tucson and Madrid dry all year).
 */
export function rainWords(rain: RainPattern, tropical = false, dryMonths?: number[]): string {
  if (tropical && (rain === "summer-rain" || rain === "winter-rain")) return "a rainy season and a dry one";
  if (rain === "year-round" && dryMonths?.length) return "";
  return {
    "year-round": "rain through the year",
    "summer-rain": "rain in summer",
    "winter-rain": "rain in winter",
    "two-rainy-seasons": "two rainy seasons",
    "little-rain": "very little rain",
  }[rain];
}

// ---- the seasons of a tropical year ----------------------------------------------

export type RegimeSeason = { id: "long-rains" | "short-rains" | "wet" | "dry" | "cool-dry" | "between"; label: string };

/** East African usage: "long rains" and "short rains" (Kenya Meteorological Department; TMA; UNMA). */
const LONG_SHORT_RAINS = new Set(["KE", "TZ", "UG", "RW", "BI", "SO", "ET"]);

/** The wet runs of a year, each as its months in order, longest and wettest first. */
function wetRuns(wet: number[], p: number[]): number[][] {
  if (!wet.length) return [];
  const set = new Set(wet);
  const runs: number[][] = [];
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || (set.has(((m + 10) % 12) + 1) && wet.length < 12)) continue;
    const run = [m];
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) {
      end = (end % 12) + 1;
      run.push(end);
    }
    runs.push(run);
  }
  const total = (r: number[]) => r.reduce((a, m) => a + p[m - 1], 0);
  return runs.sort((a, b) => b.length - a.length || total(b) - total(a));
}

/**
 * The season a month belongs to in a place that has rainy and dry seasons:
 * the words a reader uses inside the tropics (|lat| < 23.5°), where spring
 * and autumn mean nothing (`seasonLabel` in src/lib/local-data applies them
 * there), and the state of the rains anywhere whose rain is seasonal (the
 * "Rains" force tile). Null for a year-round-rain place outside the tropics.
 * Months between the seasons go with the rains
 * they open or close (Nairobi's March with the long rains); a month that is
 * neither wet nor dry and touches no rainy run is between the rains (Cape
 * Town's October); a dry month in the cooler half of the year's range is the
 * cool dry season (Nairobi's June–September), the rest the dry season.
 */
export function regimeSeason(
  r: Regime,
  month: number,
  lat: number,
  opts: { countryCode?: string; climate?: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin" | "monthlyRainMm"> | null } = {},
): RegimeSeason | null {
  const tropics = Math.abs(lat) < 23.5;
  if (r.rain === "year-round" && !tropics) return null;
  const c = opts.climate;
  const p = c?.monthlyRainMm && c.monthlyRainMm.length === 12 ? c.monthlyRainMm : new Array<number>(12).fill(0);
  const runs = wetRuns(r.wetMonths.length === 12 ? [] : r.wetMonths, p);
  const names = (i: number): RegimeSeason => {
    if (runs.length >= 2 && opts.countryCode && LONG_SHORT_RAINS.has(opts.countryCode)) {
      return i === 0 ? { id: "long-rains", label: "Long rains" } : { id: "short-rains", label: "Short rains" };
    }
    return { id: "wet", label: r.id === "mediterranean" ? "Wet season" : "Rainy season" };
  };
  const runOf = (m: number) => runs.findIndex((run) => run.includes(m));
  const own = runOf(month);
  if (own >= 0) return names(own);
  if (r.wetMonths.length === 12) return { id: "wet", label: "Rainy season" };
  const prev = ((month + 10) % 12) + 1;
  const next = (month % 12) + 1;
  if (!r.dryMonths.includes(month)) {
    const n = runOf(next);
    if (n >= 0) return names(n);
    const pv = runOf(prev);
    if (pv >= 0) return names(pv);
  }
  if (!r.dryMonths.includes(month) && r.dryMonths.length < 12) return { id: "between", label: "Between the rains" };
  if (tropics && c && coolDry(c, month)) return { id: "cool-dry", label: "Cool dry season" };
  return { id: "dry", label: "Dry season" };
}

/** Whether a tropical dry month is a cool one: its mean sits in the cooler half of the year's range. */
export function coolDry(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin">, month: number): boolean {
  const t = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
  const lo = Math.min(...t);
  const hi = Math.max(...t);
  return hi - lo >= 2 && t[month - 1] < lo + (hi - lo) / 2;
}

// ---- gear ---------------------------------------------------------------------

export type Gear = { label: string; query: string };

/**
 * The gardening equipment list for a place's regime: frost cloth and garlic
 * for planting only where frost frames the year; shade cloth and drip line
 * where the dry season does; mulch everywhere the rains are seasonal.
 */
export function gardenGear(r: Regime | null, c: Pick<Climate, "lastSpringFrost" | "firstFallFrost"> | null): Gear[] {
  const frostFree = !c || (c.lastSpringFrost === "Rare" && c.firstFallFrost === "Rare");
  const out: Gear[] = [{ label: "Soil thermometer", query: "soil thermometer garden" }];
  if (r?.frostLed) {
    out.push({ label: "Frost cloth / row cover", query: "floating row cover frost blanket" });
    out.push({ label: "Seed starting trays", query: "seed starting tray kit with dome" });
    out.push({ label: "Garlic for planting", query: "hardneck garlic bulbs for planting" });
    return out;
  }
  if (!frostFree) out.push({ label: "Fleece for cold nights", query: "horticultural fleece frost protection" });
  if (r && (r.rain === "winter-rain" || r.rain === "little-rain" || r.id === "desert" || r.id === "semi-arid")) {
    out.push({ label: "Drip irrigation kit", query: "drip irrigation kit garden" });
    out.push({ label: "Shade cloth", query: "shade cloth 40 percent garden" });
  } else if (r && (r.rain === "two-rainy-seasons" || r.rain === "summer-rain" || r.id === "tropical-humid")) {
    out.push({ label: "Mulch and shade netting", query: "garden shade netting mulch" });
    out.push({ label: "Watering can and hose", query: "watering can garden hose" });
  } else {
    out.push({ label: "Seed starting trays", query: "seed starting tray kit with dome" });
    out.push({ label: "Cloches and fleece", query: "garden cloche fleece" });
  }
  return out.slice(0, 4);
}
