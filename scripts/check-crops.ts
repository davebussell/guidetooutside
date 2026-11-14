/**
 * Checks the crop calendar and its "now" widgets against physics, for all 264 towns in
 * src/data/place-normals.json on 12 dates (the 15th of each month of 2026). It exits non-zero when any
 * rule is broken and prints a count per rule.
 *
 * Why: the 2 Nov 2026 audit of the Ottawa gardening page found harvests no calendar allows (Brussels
 * sprouts picked in July, cauliflower in June, beets in May, tomatoes planted out in June only and
 * picked in August only), trays started in February for April planting, and "sow now" advice that ignored
 * the date (Plant garlic on 2 Nov, "cool-season seeds germinate" in a town where nothing sown in November
 * reaches harvest, haskap as the one thing to plant in November).
 *
 * The rules below are written here from their sources and do not read the calendar's own constants, so a
 * change to src/lib/crop-calendar.ts cannot quietly redefine them. They are bounds ("cannot be earlier
 * than"), not predictions:
 *
 *  1 sow-before-earliest        a month marked for sowing lies wholly before the crop's earliest sowing day
 *                               (tender: average last frost + 7 d; very hardy crops and those that overwinter:
 *                               last frost - 28 d, "as soon as the soil can be worked"; the rest: last frost - 21 d;
 *                               RHS / Just Food Ottawa / Seeds of Diversity)
 *  2 trays-too-early            a tray month whose plantings-out would all fall before that earliest day
 *  3 harvest-before-maturity    a harvest month that no sowing can reach: earliest sowing day + days to
 *                               maturity (crop-grow.json `days`) lies after the month's end; or a
 *                               harvest bar for a crop with no maturity figure
 *  4 tender-harvest-past-frost  a frost-tender crop harvested in a month wholly after the average first fall
 *                               frost + 7 d (or wholly before the last frost)
 *  5 frost-improved-early       Brussels sprouts or parsnip (`harvestAfterFrost`) harvested in a month
 *                               wholly before the average first fall frost
 *  6 sow-now-not-sowable        a crop in the "sow/plant now" lists on a date that cannot be sown then:
 *                               before its earliest day; too late to be ready before it is killed
 *                               (tender and half-hardy: first frost; hardy: first frost + 14 d; very hardy:
 *                               first frost + 28 d where the winter brings hard freezes of −5 °C or colder,
 *                               OSU and Texas AgriLife fall-planting dates; or the last month with unfrozen
 *                               ground); a hardy perennial set out in cold or frozen soil
 *  7 trays-now-too-early        a crop in the "start in trays now" list whose planting-out, nursery weeks
 *                               on, would fall before its earliest day
 *  8 closed-window-leads        the garden-year task list or the autumn planting cards lead with garlic
 *                               while the town's garlic window is not open
 *  9 soil-card-says-sow         a date when the soil is warm enough for seed (proxy, below) but no crop can
 *                               be sown, and the soil card's sowing sentence still lists crops (or, in the
 *                               old card, says seeds germinate without a date)
 * 10 strip-task-not-sowable     the garden-year strip's sowing tasks (phases start, sow, grow) name a crop that
 *                               cannot be sown (or started in trays) that day by rules 6 and 7. The strip's
 *                               old static lists ("Peas, spinach, onions", "Sow autumn carrots and brassicas")
 *                               are read the same way: every annual crop of the town they name must be sowable
 *
 * 11 audit-pin                 a town whose window the 5 Nov or 10 Nov 2026 audit checked against its extension service
 *                               (PINS and PINS_10_NOV below, each with the page read) no longer shows what the service says
 *
 * Added after the 10 Nov 2026 audit of the Acadian Forest, Northeast Coast and Southeastern towns:
 * 12 overwinter-late            a sowing made to stand through winter later than two weeks before the average first frost,
 *                               where the winter brings frost that matters to the crop (Virginia Tech SPES-673P: fall spinach
 *                               to Oct 10 in zone 7a, Oct 20 in 7b, Nov 1 in 8a/8b; UGA C943: onions September–October).
 *                               Garlic keeps its own pinned windows (rule 11)
 * 13 onion-day-length           a bulb onion planted while the days lengthen later than six weeks before the longest day,
 *                               where the longest day reaches 14.5 hours (Virginia Tech: to May 1 in zone 7a, May 10 in 6), or
 *                               once the day has passed 11 hours where it does not (NC State: short-day onions bulb at 10–12 h)
 * 14 perennial-autumn           where frost frames the year (the regime's frostLed), a hardy perennial set out between the
 *                               warmest month and the coldest: the crop records plant in spring ("early spring"; "early spring to
 *                               September")
 * 15 panel-date-blind           the week's panels (src/lib/forces, src/lib/garden-year) given a frost night, a heavy week of
 *                               rain, a dry week and no flying days on each date: the frost tile names a frost-tender crop the
 *                               town's calendar does not grow in that month, or names any after the first frost + 7 d and
 *                               before the last frost; the pollination tile names a crop not picked that month; the rain tile
 *                               names blight on a tomato or potato not grown that month, or gives watering advice in a month no
 *                               annual is sown or picked; the garden-year strip says "Harvest tender crops before frost" after
 *                               the average first frost
 *
 * Added after the Day 3 audit (11 Nov 2026) of the Appalachian, Central Hardwoods and Gulf Coast towns:
 * 16 standing-from-spring      a crop left standing (`stands`, not picked after frost) harvested in a month wholly a month past the
 *                               average first frost, where no sowing month matures after the warmest month of the year: the winter
 *                               harvest is the late planting's (MU G6201: cabbage Mar 20–Apr 20 and Jul 20–Aug 5, carrots Mar 15–Apr 5
 *                               and Jul 25–30; UT W346-B: fall cabbage Aug 1–Sep 1)
 * 17 potato-frost              potatoes in the sowing list on a date whose 100 days run past the average first frost, or before three
 *                               weeks ahead of the last, where the typical coldest night reaches −1 °C (the potato record: "−1 to −2 °C
 *                               blackens the leaves … it just ends the season"; LSU: fall potatoes in September; AgriLife: by Oct 1 in
 *                               region IV)
 * 18 stored-guide-stale        a stored weekly guide's gardening section, put through the vet (src/lib/guide-vet-garden) on each date,
 *                               still offers a crop to sow, plant or start in trays that the town's "sow now" lists do not have, a
 *                               crop to pick that is not being picked, a countdown to a frost, frost-timed advice after the average
 *                               first frost, a soil reading from another day, or a headline naming another month; and the audit's own
 *                               stored texts (STORED_PINS) come out without the claims it found
 * 19 regime-words              "rain through the year" beside dry months; Little Rock and Memphis in different regimes; "spring and
 *                               autumn are the main growing seasons" where frost does not frame the year (Brownsville: Sep–Jan)
 * 20 zone-tooltip              a crop's frost note on a town's page keeps a sentence naming hardiness zones the town is not in
 * 21 plant-at-rains            a perennial whose record plants it only "at the start of the rains" (mango, moringa) set out in a month
 *                               that does not open a wet run
 * Rule 13 now also counts any planting after the shortest day where that day is 10 hours or more (Brownsville, Houston, New
 * Orleans, Jacksonville): the RGV guide, AgriLife's fall guide, LSU and UF/IFAS plant onions there in autumn only.
 *
 * Added after the Day 4 audit (13 Nov 2026) of the Florida, desert and California towns, which found the monthly-mean
 * rules inverting the subtropical season (src/data/extension-calendars.json has the sources, each opened 13 Nov 2026):
 * 22 extension-calendar        wherever an extension service's calendar is loaded for the town's region, the page's sowing
 *                               windows in the months it covers are not the calendar's: a listed crop sown on other days (or
 *                               missing), a crop the calendar does not list still sown then, or a row without the calendar named
 * 23 brassica-heat             where frost does not frame the year, no frost gate holds the spring sowing and no calendar
 *                               decides, broccoli, cabbage or cauliflower
 *                               sown in a month whose first picking (the month's first sowing day + days to maturity) falls as
 *                               the days warm and over the top of the crop's optimum by more than 2 °C (UC San Diego: brassica
 *                               plants Sep–Feb; UA Maricopa: January only in spring; UF/IFAS: to Feb in North and Central
 *                               Florida, to Jan in the South)
 * Added after the same audit for the week's panels, the climate words and the stored guides' text:
 * 24 panel-reads-calendar      on each date, with a dry week and a wet one: the soil tile names a crop outside its sowing window or
 *                               trays today; the heat tile names a crop the calendar does not have in the ground that month; the
 *                               rains tile gives a month outside the wet months a wet-season label ("Rainy season · rains May–Oct"
 *                               in a Fort Lauderdale November), or a wet week (a week's share of the month's average and 5 mm)
 *                               "Dry season", "due next month" or "lowest"; the gardening page's season line (towns where frost
 *                               does not frame the year) names a frost-tender crop not in the ground, says "tender crops are out",
 *                               or says the rains are due or the dry season is on beside a wet week; the overview's garden card
 *                               leaves out a crop open today "with watering" or names one that is not open (Tampa)
 * 25 climate-words             a "Wet months" row beside a "Dry months" row that shares its months ("Wet months Jul–Aug" beside
 *                               "Dry months: all year" at Tucson); "wide swings between day and night" (San Diego, NOAA 5.5–9 °C);
 *                               in a town whose every month is dry, an annual offered to sow without watering (cowpeas at Phoenix,
 *                               Las Vegas, Los Angeles, San Diego and San Jose); "for planting out in all year" (San Jose); the
 *                               Köppen pins (San Jose prints Csb beside BSk; a class is never printed without its own code)
 * The stored texts of the Day 4 audit are STORED_PINS_13_NOV (rule 18).
 *
 * The sowing rules (1, 2, 6, 7, 12, 13, 17, and the strip and soil-card tests that use rule 6) are bounds written for the
 * model; where an extension calendar gives the date, its date stands and rule 22 holds the page to it. The pins of the audit
 * are PINS_13_NOV. The run also prints, as information, how far the model alone (without the calendars) is from each
 * calendar it can be checked against: the extension windows as a check on the model.
 *
 * Rule 9 has no soil reading to hand for 264 towns, so it takes the mean of this month's and last month's
 * mean air temperature (soil lags the air) and counts 5 °C or more as "warm enough for seed" (the soil card
 * said "Cool-season crops" from 5 °C).
 *
 * The towns' climates are read through placeNormals (src/lib/climate-fallback.ts), as the pages read them, so
 * the station coldest night stands in for the grid's where one was counted.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-crops.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/check-crops.mjs --log-level=warning && node /tmp/check-crops.mjs [--show slug ...]
 * `--show slug` prints that town's calendar rows (sow / trays / harvest months) before the counts.
 */
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import type { Climate, LocalData, Place } from "../src/lib/types";
import { regimeOf, monthSpans } from "../src/lib/regime";
import { ALL_CROPS, cropName, frostLimits, type Crop } from "../src/lib/crops";
import { cropCalendar, dayLengthHours, extensionRegion, pickedOn, sowNow, type CropFit } from "../src/lib/crop-calendar";
import EXTENSION from "../src/data/extension-calendars.json";
import { rainWords } from "../src/lib/regime";
import { zoneScoped } from "../src/lib/zone-scope";
import { vetStoredGardeningWhy } from "../src/lib/guide-vet-garden";
import type { Guide, GuideItem } from "../src/lib/types";
import { forcesFor } from "../src/lib/forces";
import { autumnPlantings, bulbsOpen, garlicState } from "../src/lib/autumn-planting";
import { soilSowing, sowingTasks } from "../src/lib/soil-sowing";
import { frostDatesOf, gardenYear } from "../src/lib/garden-year";
import { placeNormals } from "../src/lib/climate-fallback";
import { localCrops } from "../src/lib/crops";
import { climateMonthRows, overviewSowing, seasonLine } from "../src/lib/garden-season";
import { koppenText, koppenWithin } from "../src/lib/regime";
import { rulesGuide } from "../src/lib/guide-rules";
import { mainSowingMonths } from "../src/lib/crop-calendar";
import { frostNights } from "../src/lib/extremes";
import { cropsNamed, heldText } from "../src/lib/guide-vet-garden";

type Entry = { place: Place; climate: Climate };
const TABLE = NORMALS as unknown as Entry[];

const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const DAYS_IN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ---- the spec (sources in the header) ----------------------------------------------------------------------
const TENDER_AFTER_LAST_FROST = 7;
const OTHER_BEFORE_LAST_FROST = 21;
const VERY_HARDY_BEFORE_LAST_FROST = 28;
const FIRST_FROST_SLACK = 7;
const HARDY_AFTER_FIRST_FROST = 14;
const VERY_HARDY_AFTER_FIRST_FROST = 28;
/** A typical coldest night at or under this is a hard-freeze winter: it ends the season for every annual within its allowance. */
const HARD_FREEZE_C = -5;
const GROUND_FROZEN_MAX_C = 0;
const SOIL_COLD_C = 5;
/** How long after the first frost a frost-improved crop may still be harvested (days, wrapped): well past the ground freezing. */
const AFTER_FROST_SPAN = 240;
/** A harvest more than this many days after the sowing (beyond `days`) is not the same season's crop, unless the crop stands or overwinters. */
const SAME_SEASON_SLACK = 240;
const SOIL_WARM_ENOUGH_C = 5;
/** Rule 12: an overwinter sowing goes in this many days before the average first frost (Virginia Tech SPES-673P; UGA C943). */
const OVERWINTER_BEFORE_FIRST_FROST = 14;
/** Rule 13: where the longest day reaches this, long-day onions are planted at least ONION_LEAD days before it (Virginia Tech, NC State). */
const ONION_SHORT_DAY_ZONE_H = 14.5;
const ONION_LEAD = 42;
const ONION_SHORT_DAY_H = 11;
/** Rule 13: a shortest day this long keeps short-day onions in their 10–12 h bulbing range all winter (NC State). */
const ONION_AUTUMN_ONLY_H = 10;

const wrap365 = (n: number) => ((n % 365) + 365) % 365;
/** The minimal circular difference, in (-182, 182]. */
const circ = (n: number) => {
  const w = wrap365(n);
  return w > 182 ? w - 365 : w;
};
const frostDoy = (doy: number, south: boolean) => (south ? ((doy - 184 + 365) % 365) + 1 : doy);
const monthEnd = (m: number) => MONTH_START[m - 1] + DAYS_IN[m - 1];
const monthStart = (m: number) => MONTH_START[m - 1] + 1;

/**
 * The extension calendar gives this crop's sowing in this month here (rule 22 holds the page to it), so the model's sowing
 * bounds do not apply: a crop the calendar lists, in a month the calendar covers.
 */
const sourced = (f: CropFit | undefined, month: number) => !!f?.from?.row && f.from.covers.includes(month);
/** The first sowing day (day of the year) of a fit's window in month m, from its day spans. */
const spanStartIn = (f: CropFit, m: number) => {
  const s = [...f.windows.sow, ...f.windows.watered].map(([a]) => wrap365(a - 1) + 1).filter((d) => d >= monthStart(m) && d <= monthEnd(m));
  return s.length ? Math.min(...s) : monthStart(m);
};

type Town = {
  place: Place;
  c: Climate;
  regime: ReturnType<typeof regimeOf>;
  fits: CropFit[];
  south: boolean;
  /** Frost-calendar days of the average last spring and first fall frost, when both are dated. */
  L: number | null;
  F: number | null;
  mean: number[];
};

function townOf(e: Entry): Town {
  const c = placeNormals(e.place) ?? e.climate;
  const dated =
    c.frostSource !== ("none" as string) &&
    c.lastSpringFrost !== "Rare" &&
    c.firstFallFrost !== "Rare" &&
    c.lastSpringFrostDoy > 0 &&
    c.firstFallFrostDoy > 0 &&
    // As src/lib/crop-calendar reads it: 366 is "no first frost"; New Orleans' Jan 2 is doy 367 (Day 5 audit, 14 Nov 2026).
    c.firstFallFrostDoy !== 366 &&
    c.firstFallFrostDoy > c.lastSpringFrostDoy;
  const regime = regimeOf(c, e.place.lat);
  const fits = c.monthlyRainMm ? cropCalendar(c, regime, ALL_CROPS, { lat: e.place.lat }) : [];
  return {
    place: e.place,
    c,
    regime,
    fits,
    south: c.south ?? e.place.lat < 0,
    L: dated ? c.lastSpringFrostDoy : null,
    F: dated ? c.firstFallFrostDoy : null,
    mean: c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2),
  };
}

/**
 * A frost-calendar day between the first frost (plus `slack`) and the last spring frost. A first frost after New Year is
 * stored past 365 (New Orleans 367, Jacksonville 370: Day 5 audit, 14 Nov 2026), so the days of January before it are
 * still in the frost-free season and only those after it are in the gap; for every other town this is the old test.
 */
const inFrostGap = (t: Town, fd: number, slack: number) => fd > t.F! + slack || (fd < t.L! && fd > t.F! - 365 + slack);

/** Frost matters to this crop here: dated frosts and a typical coldest night that reaches what kills it. */
const frosty = (t: Town, crop: Crop) => t.L != null && t.F != null && t.c.meanAnnualExtremeMinC <= frostLimits(crop).deadC;
/** The winter ends the crop's season: dated frosts and a typical coldest night at or under what kills it or a hard freeze. */
const hardFreeze = (t: Town, crop: Crop) => t.L != null && t.F != null && t.c.meanAnnualExtremeMinC <= Math.max(frostLimits(crop).deadC, HARD_FREEZE_C);

/** The frost-calendar day before which the crop is not sown or planted out, or null. */
function gateOf(t: Town, crop: Crop): number | null {
  if (!frosty(t, crop)) return null;
  if (crop.hardiness === "tender") return t.L! + TENDER_AFTER_LAST_FROST;
  if (crop.hardiness === "very-hardy" || crop.grow?.overwinter) return t.L! - VERY_HARDY_BEFORE_LAST_FROST;
  return t.L! - OTHER_BEFORE_LAST_FROST;
}

/** First day of month m on which the gate is open (day of the year), or null if none. */
function firstOpen(t: Town, crop: Crop, m: number): number | null {
  const gate = gateOf(t, crop);
  if (gate == null) return monthStart(m);
  for (let d = monthStart(m); d <= monthEnd(m); d++) if (frostDoy(d, t.south) >= gate) return d;
  return null;
}

/** The end (frost-calendar day) of the last month, counting on from the first frost, with unfrozen ground and nights above what kills the crop. */
function groundCap(t: Town, crop: Crop): number {
  const F = t.F!;
  const dead = frostLimits(crop).deadC;
  // The calendar month holding the first frost day.
  let cal = t.south ? ((F + 182) % 365) + 1 : F;
  cal = ((cal - 1) % 365) + 1;
  let m0 = 0;
  while (m0 < 11 && MONTH_START[m0 + 1] < cal) m0++;
  let end = F;
  for (let k = 0; k < 6; k++) {
    const i = (m0 + k) % 12;
    if (t.c.monthlyMeanMax[i] < GROUND_FROZEN_MAX_C || t.c.monthlyMeanMin[i] < dead) break;
    end = F + (MONTH_START[i] + DAYS_IN[i] + 365 * Math.floor((m0 + k) / 12) - cal);
  }
  return Math.max(end, F);
}

/** Months a hardy perennial may not be set out in: from the first one under 5 °C after the warmest until the first back over it. */
function coldMonths(t: Town): Set<number> {
  const w = t.mean.reduce((best, x, i) => (x > t.mean[best] ? i : best), 0);
  const out = new Set<number>();
  let start = -1;
  for (let j = 1; j < 12 && start < 0; j++) if (t.mean[(w + j) % 12] < SOIL_COLD_C) start = j;
  if (start > 0) for (let j = start; j < 12 && t.mean[(w + j) % 12] < SOIL_COLD_C; j++) out.add(((w + j) % 12) + 1);
  return out;
}

// ---- the audit's pins ----------------------------------------------------------------------------------------------
/**
 * Windows the 5 Nov 2026 audit of the Day 1 regions checked against the town's extension service. `sow` is the
 * exact sowing months; `sowHas` months the window must include; `notOn` dates (month, day of the year) on which the
 * crop may not be in the "sow now" list; `nothingOn` a date on which no annual may be in it.
 *  - OMAFRA trial (ONvegetables, 6 Mar 2024, https://www.fruitandveggie.com/omafra-when-is-best-to-plant-garlic/):
 *    garlic planted around the first fall frost does best (Ottawa 5 Oct, Toronto 21 Oct).
 *  - UVM Extension (J. Corven, 3 Nov 2023, https://www.uvm.edu/extension/news/its-time-plant-garlic-0): mid-October
 *    until late November, until the soil starts to freeze.
 *  - OSU Extension, Fall Gardening (https://extension.okstate.edu/fact-sheets/fall-gardening.html): garlic 1 Sep–15 Oct,
 *    kale 1 Sep, spinach 5–25 Sep, Brussels sprouts 15 Jul–15 Aug.
 *  - Dallas County Master Gardeners, Texas A&M AgriLife (https://dallascountymastergardeners.org/now-is-the-time-to-plant-garlic/):
 *    garlic mid-October through early November.
 *  - The audit's own findings: overwinter crops were given a 1 April sowing in Fargo, Winnipeg and Quebec City with the
 *    ground still frozen; kale, spinach and Brussels sprouts were offered for November sowing in Oklahoma City and Dallas.
 * All pages read 7 Nov 2026.
 */
const PINS: {
  slug: string;
  crop?: string;
  sow?: number[];
  sowHas?: number[];
  sowNot?: number[];
  harvestNot?: number[];
  absent?: boolean;
  notOn?: [number, number][];
  nothingOn?: [number, number][];
  /** Dates (month, day of the year) on which the crop must be in the sow (or sow-with-watering) list. */
  on?: [number, number][];
  /** Crops `nothingOn` lets through. */
  except?: string[];
}[] = [
  { slug: "ottawa-ontario", crop: "garlic", sow: [9, 10] },
  { slug: "toronto-ontario", crop: "garlic", sowHas: [10] },
  { slug: "burlington-vermont", crop: "garlic", sow: [10, 11] },
  { slug: "concord-new-hampshire", crop: "garlic", sowHas: [10, 11] },
  { slug: "milwaukee-wisconsin", crop: "garlic", sowHas: [10, 11] },
  { slug: "winnipeg-manitoba", crop: "garlic", sow: [9, 10] },
  { slug: "regina-saskatchewan", crop: "garlic", sow: [9, 10] },
  { slug: "dallas-texas", crop: "garlic", sow: [10, 11] },
  { slug: "oklahoma-city-oklahoma", crop: "garlic", sowHas: [10] },
  { slug: "oklahoma-city-oklahoma", crop: "kale", sowHas: [9], notOn: [[11, 319]] },
  { slug: "oklahoma-city-oklahoma", crop: "spinach", notOn: [[11, 319]] },
  { slug: "oklahoma-city-oklahoma", crop: "brussels-sprouts", notOn: [[11, 319]] },
  { slug: "dallas-texas", crop: "kale", notOn: [[11, 319]] },
  { slug: "dallas-texas", crop: "spinach", notOn: [[11, 319]] },
  { slug: "dallas-texas", crop: "brussels-sprouts", notOn: [[11, 319]] },
  { slug: "fargo-north-dakota", nothingOn: [[4, 91]] },
  { slug: "winnipeg-manitoba", nothingOn: [[4, 91]] },
  { slug: "quebec-city-quebec", nothingOn: [[4, 91]] },
];

/**
 * Windows the 10 Nov 2026 audit of the Acadian Forest, Northeast Coast and Southeastern towns checked (pages read
 * 11 Nov 2026). `absent`: the crop may not be in the calendar; `sowNot` / `harvestNot`: months the crop may not be
 * sown (or planted) / picked in; `notOn` also covers the perennials' "plant now" list.
 *  - Virginia Tech SPES-673P (https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/426/426-331/SPES-673.pdf), zone
 *    7b (Richmond) and 7a/7b (Washington): spinach Sep 10–Oct 20 in autumn; kale to Apr 10 (7a Apr 20), beets to Apr 20
 *    (7a May 1), turnips to Apr 10 (7a May 1); bulbing onions to May 1 (7a), May 10 (6a/6b), "not recommended" in autumn.
 *  - UGA C943 (https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar): onions September–October,
 *    none in spring; tomatoes set out in April (later further north). UGA C1014 (https://fieldreport.caes.uga.edu/
 *    publications/C1014/home-garden-sweet-potatoes/): sweet potatoes once the soil is 70 °F, mid-April in south Georgia,
 *    early May further north.
 *  - UF/IFAS North Florida spring and fall guides (https://sfyl.ifas.ufl.edu/media/sfylifasufledu/baker/docs/pdf/
 *    horticulture/SpringVegetablePlantingGuideforNorthFlorida.pdf and …FallVegetablePlantingGuideforNorthFlorida.pdf):
 *    sweet potatoes Mar–Jun, kale Sep–Feb, beets Sep–Mar; UF/IFAS Gardening Solutions (https://gardeningsolutions.ifas.ufl.edu/
 *    plants/edibles/fruits/strawberries/): strawberries are grown as annuals in Florida.
 *  - Oregon State (https://horticulture.oregonstate.edu/oregon-vegetables/artichoke-globe) and FAO ECOCROP
 *    (https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=847): globe artichokes lose their crowns under 15 °F even
 *    mulched, and are grown in dry-summer, semi-arid, oceanic and tropical wet-dry climates, not humid subtropical or
 *    continental ones.
 *  - The site's own crop records: apple, pear, raspberry and haskap are planted in spring ("early spring to September").
 */
const PINS_10_NOV: typeof PINS = [
  { slug: "richmond-virginia", crop: "spinach", notOn: [[10, 300], [11, 305], [11, 314]] },
  { slug: "washington-district-of-columbia", crop: "spinach", notOn: [[10, 300], [11, 305]] },
  { slug: "richmond-virginia", crop: "kale", notOn: [[4, 115], [5, 135]] },
  { slug: "richmond-virginia", crop: "beet", notOn: [[4, 120], [5, 135]] },
  { slug: "richmond-virginia", crop: "turnip", notOn: [[4, 115], [5, 135]] },
  { slug: "washington-district-of-columbia", crop: "kale", notOn: [[4, 120], [5, 135]] },
  { slug: "washington-district-of-columbia", crop: "beet", notOn: [[5, 125]] },
  { slug: "washington-district-of-columbia", crop: "turnip", notOn: [[5, 125]] },
  ...["new-york-new-york", "philadelphia-pennsylvania", "washington-district-of-columbia", "baltimore-maryland"].map((slug) => ({
    slug,
    crop: "onion",
    sowNot: [6, 7, 8, 9, 10, 11, 12],
    harvestNot: [10, 11],
    notOn: [[5, 140]] as [number, number][],
  })),
  { slug: "atlanta-georgia", crop: "onion", sowHas: [9, 10], sowNot: [3, 4, 11, 12], notOn: [[11, 305], [11, 314]] },
  { slug: "atlanta-georgia", crop: "tomato", sowNot: [3], sowHas: [4] },
  { slug: "atlanta-georgia", crop: "sweet-potato", notOn: [[4, 105]] },
  { slug: "savannah-georgia", crop: "sweet-potato", notOn: [[3, 80]] },
  { slug: "jacksonville-florida", crop: "sweet-potato", sowNot: [2], sowHas: [4, 5, 6] },
  { slug: "jacksonville-florida", crop: "kale", sowNot: [4] },
  { slug: "jacksonville-florida", crop: "beet", sowNot: [4] },
  { slug: "jacksonville-florida", crop: "strawberry", absent: true },
  { slug: "savannah-georgia", crop: "strawberry", absent: true },
  ...["philadelphia-pennsylvania", "richmond-virginia", "washington-district-of-columbia", "baltimore-maryland", "atlanta-georgia", "charlotte-north-carolina", "raleigh-north-carolina", "savannah-georgia"].map(
    (slug) => ({ slug, crop: "globe-artichoke", absent: true }),
  ),
  ...["boston-massachusetts", "new-york-new-york", "halifax-nova-scotia"].flatMap((slug) =>
    ["apple", "haskap", "pear", "raspberry"].map((crop) => ({ slug, crop, notOn: [[11, 314]] as [number, number][] })),
  ),
];

/**
 * Windows the Day 3 audit (11 Nov 2026) checked, read against the sources it cites and those read for the fix (11 Nov 2026):
 *  - MU Extension G6201 (https://extension.missouri.edu/publications/g6201/3) and UT W346-B (https://uthort.tennessee.edu/
 *    wp-content/uploads/sites/228/2023/11/W346-B.pdf): spring cabbage and carrots are picked in early summer; the winter
 *    harvest comes from the late-summer planting, which these towns' calendars do not have.
 *  - LSU AgCenter (Dan Gill, 5 Sep 2014, https://apps.lsuagcenter.com/news_archive/2014/September/get-it-growing/
 *    Its-time-to-start-coolseason-vegetable-gardening-.htm): fall potatoes in September; onion sets until early December.
 *    AgriLife's fall guide (https://agrilifeextension.tamu.edu/wp-content/uploads/2023/09/fall-vegetable-gardening-guide-texas.pdf):
 *    potatoes by Oct 1 in region IV; onion seed to Dec 1 (IV) and Dec 15 (V). UF/IFAS North Florida: bulbing onions Sep–Dec.
 *  - AgriLife's Rio Grande Valley guide (https://agrilifeextension.tamu.edu/wp-content/uploads/2025/08/RGV-Homeowner-Vegetable-
 *    Guide-2022.pdf): bulbing onions mid-October to mid-December; tomatoes mid-September to mid-October as well as in spring;
 *    summer squash late August to mid-September.
 *  - Texas A&M mango fact sheet (https://aggie-horticulture.tamu.edu/fruit-nut/fact-sheets/mango): June to August; no
 *    planting month.
 *  - University of Arkansas, fig (https://www.uaex.uada.edu/yard-garden/in-the-garden/reference-desk/fruits/fig.aspx): plant
 *    "late February through early April". Pomegranates, half-hardy perennials like figs in the crop records, are pinned with them.
 */
const PINS_11_NOV: typeof PINS = [
  ...["pittsburgh-pennsylvania", "columbus-ohio", "indianapolis-indiana", "nashville-tennessee", "st-louis-missouri"].map((slug) => ({ slug, crop: "cabbage", harvestNot: [12, 1, 2] })),
  { slug: "st-louis-missouri", crop: "carrot", harvestNot: [12, 1, 2] },
  ...["houston-texas", "new-orleans-louisiana"].map((slug) => ({ slug, crop: "potato", sowNot: [10, 11, 12], notOn: [[11, 315]] as [number, number][] })),
  ...["houston-texas", "new-orleans-louisiana", "jacksonville-florida", "brownsville-texas"].map((slug) => ({ slug, crop: "onion", sowNot: [1, 2, 3] })),
  { slug: "brownsville-texas", crop: "tomato", sowHas: [9] },
  { slug: "brownsville-texas", crop: "zucchini", sowHas: [9] },
  { slug: "brownsville-texas", crop: "mango", harvestNot: [4, 5], notOn: [[11, 315]] },
  { slug: "little-rock-arkansas", crop: "fig", sowNot: [9, 10, 11, 12], notOn: [[11, 315]] },
  { slug: "little-rock-arkansas", crop: "pomegranate", sowNot: [9, 10, 11, 12], notOn: [[11, 315]] },
];

/**
 * Windows the Day 4 audit (13 Nov 2026) checked against the extension calendars (each in src/data/extension-calendars.json
 * with its page; all read 13 Nov 2026). Rule 22 holds every loaded calendar; these pin the audit's own claims, so that a
 * change to the data or to the code that loses them is named.
 *  - UF/IFAS VH021 South Florida (Fort Myers, Fort Lauderdale, Miami): tomatoes, peppers and eggplant Aug–Feb, sweet corn
 *    Oct–Mar, cucumbers Sep–Feb, bush beans Sep–Apr, watermelon Dec–Mar, winter squash Aug–Mar, southern peas Sep–Apr, okra
 *    Jan–Mar and Aug–Oct; in November lettuce, radish, spinach, English peas, Irish potatoes and broccoli. The code had warm
 *    crops sown through the summer and refused Nov–Jan, and no brassicas at all at Miami.
 *  - UF/IFAS Central (Orlando, Tampa): tomatoes Jan–Feb and Aug–Sep, peppers Jan–Mar and Aug–Sep, eggplant Jan–Feb and
 *    Aug–Sep, cucumbers Jan–Mar and Sep, winter squash Jan–Apr and Aug–Sep; English peas Nov–Feb, spinach Sep–Mar (Tampa had
 *    neither in November). Bulbing onions in October only in Central and South Florida (Fort Myers, Orlando, Tampa had Oct–Dec).
 *  - UNR FS-87-34: fall vegetables Aug 10 to Oct 10 (Las Vegas had beets, carrots, lettuce, radish, broccoli, cabbage and chard
 *    sown Oct–Nov).
 *  - UA az1005, Maricopa (Phoenix): kale Aug 15–Dec 15 only; lettuce to February; broccoli, cabbage and cauliflower in January in
 *    spring; black-eyed peas Apr 1 to Aug 15 (the code had kale Oct–Mar, lettuce to March, brassicas to February, cowpeas
 *    Mar–May and Sep).
 *  - UC Master Gardeners of Sacramento County: beets and carrots in August; nothing to plant in November but garlic (to mid
 *    December). The code had them Sep–Nov.
 *  - UC Master Gardeners of San Diego County, coastal: beets Sep–May, carrots and kale Sep–Apr, chard Sep–Jun, brassica plants
 *    Sep–Feb and seed Aug–Dec, okra and watermelon Apr–Jun; no cowpeas or peanuts (the code had all-year roots and greens,
 *    brassicas Sep–Jun, okra Jul–Aug, watermelon May–Jul).
 *  - UC Master Gardeners of Los Angeles County: okra May–Jul, peanuts Mar–May (the code had Jun–Aug and Apr–Jun); no cowpeas.
 */
const NOV13 = 317;
const SOUTH_FL = ["fort-myers-florida", "fort-lauderdale-florida", "miami-florida"];
const PINS_13_NOV: typeof PINS = [
  ...SOUTH_FL.flatMap((slug) => [
    { slug, crop: "tomato", sowHas: [8, 11, 12, 1, 2], sowNot: [3, 4, 5, 6, 7] },
    { slug, crop: "pepper", sowHas: [8, 11, 12, 1, 2], sowNot: [3, 4, 5, 6, 7] },
    { slug, crop: "eggplant", sowHas: [8, 11, 12, 1, 2], sowNot: [3, 4, 5, 6, 7] },
    { slug, crop: "sweet-corn", sowHas: [10, 11, 12, 1, 2, 3], sowNot: [4, 5, 6, 7, 8, 9] },
    { slug, crop: "cucumber", sowHas: [9, 11, 12, 1, 2], sowNot: [3, 4, 5, 6, 7, 8] },
    { slug, crop: "green-beans", sowHas: [9, 11, 12, 1, 4], sowNot: [5, 6, 7, 8] },
    { slug, crop: "watermelon", sowHas: [12, 1, 2, 3], sowNot: [4, 5, 6, 7, 8, 9, 10, 11] },
    { slug, crop: "winter-squash", sowHas: [8, 11, 12, 1, 3], sowNot: [4, 5, 6, 7] },
    { slug, crop: "cowpea", sowHas: [9, 11, 12, 1, 4], sowNot: [5, 6, 7, 8] },
    { slug, crop: "okra", sow: [1, 2, 3, 8, 9, 10] },
    { slug, crop: "onion", sow: [10] },
    ...["lettuce", "radish", "spinach", "peas", "potato", "broccoli", "cabbage", "cauliflower", "tomato", "sweet-corn"].map((crop) => ({ slug, crop, on: [[11, NOV13]] as [number, number][] })),
  ]),
  ...["orlando-florida", "tampa-florida"].flatMap((slug) => [
    { slug, crop: "tomato", sow: [1, 2, 8, 9] },
    { slug, crop: "pepper", sow: [1, 2, 3, 8, 9] },
    { slug, crop: "eggplant", sow: [1, 2, 8, 9] },
    { slug, crop: "cucumber", sow: [1, 2, 3, 9] },
    { slug, crop: "winter-squash", sow: [1, 2, 3, 4, 8, 9] },
    { slug, crop: "onion", sow: [10] },
    { slug, crop: "peas", on: [[11, NOV13]] as [number, number][] },
    { slug, crop: "spinach", on: [[11, NOV13]] as [number, number][] },
  ]),
  ...["beet", "carrot", "lettuce", "radish", "broccoli", "cabbage", "chard"].map((crop) => ({
    slug: "las-vegas-nevada",
    crop,
    sowHas: [8, 9],
    sowNot: [11, 12],
    notOn: [[10, 288], [11, NOV13]] as [number, number][],
  })),
  { slug: "phoenix-arizona", crop: "kale", sow: [8, 9, 10, 11, 12] },
  { slug: "phoenix-arizona", crop: "lettuce", sowNot: [3, 4, 5, 6, 7], sowHas: [1, 2, 8] },
  ...["broccoli", "cabbage", "cauliflower"].map((crop) => ({ slug: "phoenix-arizona", crop, sowNot: [2, 3, 4, 5, 6, 7], sowHas: [1, 8] })),
  { slug: "phoenix-arizona", crop: "cowpea", sow: [4, 5, 6, 7, 8] },
  { slug: "sacramento-california", crop: "beet", sowHas: [8], sowNot: [11, 12] },
  { slug: "sacramento-california", crop: "carrot", sowHas: [8], sowNot: [11, 12] },
  { slug: "sacramento-california", nothingOn: [[11, 319], [12, 349]], except: ["garlic"] },
  { slug: "san-diego-california", crop: "beet", sowNot: [6, 7, 8] },
  { slug: "san-diego-california", crop: "carrot", sowNot: [5, 6, 7, 8] },
  { slug: "san-diego-california", crop: "kale", sowNot: [5, 6, 7, 8] },
  { slug: "san-diego-california", crop: "chard", sowNot: [7, 8] },
  ...["broccoli", "cabbage", "cauliflower"].map((crop) => ({ slug: "san-diego-california", crop, sowNot: [3, 4, 5, 6, 7], sowHas: [8, 9, 2] })),
  { slug: "san-diego-california", crop: "okra", sow: [4, 5, 6] },
  { slug: "san-diego-california", crop: "watermelon", sow: [4, 5, 6] },
  { slug: "san-diego-california", crop: "cowpea", absent: true },
  { slug: "san-diego-california", crop: "groundnut", absent: true },
  { slug: "los-angeles-california", crop: "okra", sowHas: [5, 6, 7], sowNot: [8] },
  { slug: "los-angeles-california", crop: "groundnut", sowHas: [3, 4, 5], sowNot: [6] },
  { slug: "los-angeles-california", crop: "cowpea", sowNot: [3, 4, 5, 6, 7, 8] },
];

/**
 * The Day 5 audit (14 Nov 2026): at Austin and San Antonio the monthly-mean model left out the Texas autumn season for warm
 * crops and started the cool season one to two months late. San Antonio now takes the Bexar County Master Gardeners'
 * calendar (src/data/extension-calendars.json "bcmg-bexar", read 14 Nov 2026): tomatoes, peppers and eggplant go out again
 * in July (to Jul 25), summer squash, cucumbers and bush beans are sown from Aug 13, broccoli and carrots from Aug 20, turnips
 * from Aug 20 and radishes from Aug 13; English peas Jan to Feb 15 only. Austin has no dated calendar on file (the AgriLife
 * fall guide gives one date per crop and region, and no text puts Austin in a region), so it keeps the model and is not pinned.
 */
const PINS_14_NOV: typeof PINS = [
  ...["tomato", "pepper", "eggplant"].map((crop) => ({ slug: "san-antonio-texas", crop, sowHas: [3, 7], sowNot: [8, 9, 10, 11, 12, 1, 2] })),
  ...["zucchini", "cucumber", "green-beans"].map((crop) => ({ slug: "san-antonio-texas", crop, sowHas: [3, 8, 9], sowNot: [6, 10, 11, 12, 1] })),
  ...["broccoli", "carrot", "turnip", "radish"].map((crop) => ({ slug: "san-antonio-texas", crop, sowHas: [8, 9, 10] })),
  { slug: "san-antonio-texas", crop: "peas", sow: [1, 2] },
  { slug: "san-antonio-texas", crop: "spinach", on: [[11, NOV13]] as [number, number][] },
];

/**
 * The Day 5 climate checkers (14 Nov 2026), package B2, each fix against the source it was read from (all read 14 Nov 2026):
 *  - Garlic in the north and on the prairies: Saskatchewan Ministry of Agriculture (saskatchewan.ca, garlic): fall plantings
 *    "in mid to late September", digging "common in August"; UAF Cooperative Extension HGA-00047: plant "between
 *    mid-September and mid-October", harvest "usually in August or early September". The page said "sow Aug–Sep; harvest Dec".
 *    The windows earlier checkers confirmed (Madison, Albany, Grand Rapids, Grand Forks, International Falls, Bozeman, Seattle,
 *    Portland, Austin, San Antonio) are pinned as they stand.
 *  - WSU Snohomish County Extension, Fall and Winter Vegetable Gardens for Western Washington: fava "the second week of
 *    November", peas "early November"; the page had fava to stand through winter Aug–Sep and peas Sep–Oct at Seattle, and
 *    broad beans and peas picked all year at Vancouver and Nanaimo.
 *  - Cowpea needs nights above 15 °C (its own record); UW Extension: no warm-season crops above 6,500 ft (Laramie).
 *  - Oregon State Ask an Expert: olives and pomegranates only "in years with mild winters and hot summers" (Portland,
 *    Seattle); University of Minnesota Extension: pears "best suited to USDA zone 4" (Thompson, Yellowknife, Fairbanks).
 *  - New Orleans' first frost is 2 January (doy 367): read as frost-free, potatoes were sown Oct–Jan (PINS_11_NOV holds it).
 */
const NORTH_GARLIC = ["thompson-manitoba", "whitehorse-yukon", "yellowknife-northwest-territories", "fairbanks-alaska", "saskatoon-saskatchewan"];
const PINS_14_NOV_B2: typeof PINS = [
  ...NORTH_GARLIC.map((slug) => ({ slug, crop: "garlic", sowHas: [9], sowNot: [7, 8], harvestNot: [10, 11, 12, 1, 2, 3, 4, 5, 6] })),
  { slug: "madison-wisconsin", crop: "garlic", sow: [10, 11] },
  { slug: "albany-new-york", crop: "garlic", sow: [10, 11] },
  { slug: "grand-rapids-michigan", crop: "garlic", sow: [10, 11] },
  { slug: "grand-forks-north-dakota", crop: "garlic", sow: [9, 10] },
  { slug: "international-falls-minnesota", crop: "garlic", sow: [9, 10] },
  { slug: "bozeman-montana", crop: "garlic", sow: [9, 10] },
  { slug: "seattle-washington", crop: "garlic", sow: [9, 10] },
  { slug: "portland-oregon", crop: "garlic", sow: [9, 10] },
  { slug: "austin-texas", crop: "garlic", sow: [10, 11] },
  { slug: "san-antonio-texas", crop: "garlic", sow: [8, 9, 10] },
  { slug: "seattle-washington", crop: "broad-bean", sowNot: [7, 8, 9] },
  // Peas sown in August with watering are an autumn crop, not one to stand through winter: the pin is on Sep–Oct.
  { slug: "seattle-washington", crop: "peas", sowNot: [9, 10] },
  ...["vancouver-british-columbia", "nanaimo-british-columbia"].flatMap((slug) => [
    { slug, crop: "broad-bean", harvestNot: [12, 1, 2, 3] },
    { slug, crop: "peas", harvestNot: [12, 1, 2, 3] },
  ]),
  ...["laramie-wyoming", "international-falls-minnesota", "grand-forks-north-dakota"].map((slug) => ({ slug, crop: "cowpea", absent: true })),
  ...["portland-oregon", "seattle-washington"].flatMap((slug) => [
    { slug, crop: "olive", absent: true },
    { slug, crop: "pomegranate", absent: true },
  ]),
  ...["thompson-manitoba", "yellowknife-northwest-territories", "fairbanks-alaska"].map((slug) => ({ slug, crop: "pear", absent: true })),
];

function checkPins(t: Town) {
  for (const pin of [...PINS, ...PINS_10_NOV, ...PINS_11_NOV, ...PINS_13_NOV, ...PINS_14_NOV, ...PINS_14_NOV_B2]) {
    if (pin.slug !== t.place.slug) continue;
    const f = pin.crop ? t.fits.find((x) => x.crop.slug === pin.crop) : undefined;
    if (pin.absent) {
      if (f) hit("audit-pin", t, `${pin.crop} is in the calendar (${f.perennial ? "perennial" : "annual"}), pinned absent`);
      continue;
    }
    if (pin.crop && !f) {
      // A crop the calendar does not offer here at all cannot be offered on the wrong date.
      if (pin.sow || pin.sowHas || pin.on) hit("audit-pin", t, `${pin.crop} is not in the calendar`);
      continue;
    }
    const sown = f ? [...new Set([...f.sow, ...f.watered])].sort((a, b) => a - b) : [];
    if (pin.sow && sown.join() !== pin.sow.join()) hit("audit-pin", t, `${pin.crop} sown ${monthSpans(sown) || "never"}, pinned ${monthSpans(pin.sow)}`);
    if (pin.sowHas) for (const m of pin.sowHas) if (!sown.includes(m)) hit("audit-pin", t, `${pin.crop} sown ${monthSpans(sown) || "never"}, pinned to include ${MONTH[m - 1]}`);
    for (const m of pin.sowNot ?? []) if (sown.includes(m)) hit("audit-pin", t, `${pin.crop} sown ${monthSpans(sown)}, pinned not in ${MONTH[m - 1]}`);
    for (const m of pin.harvestNot ?? []) if (f?.harvest.includes(m)) hit("audit-pin", t, `${pin.crop} picked ${monthSpans(f.harvest)}, pinned not in ${MONTH[m - 1]}`);
    for (const [month, doy] of pin.notOn ?? []) {
      const now = sowNow(t.fits, month, doy);
      if ([...now.sow, ...now.sowWatered, ...now.plant].some((x) => x.crop.slug === pin.crop)) hit("audit-pin", t, `${pin.crop} in the sow/plant-now list on ${MONTH[month - 1]} ${doy - MONTH_START[month - 1]}`);
    }
    for (const [month, doy] of pin.nothingOn ?? []) {
      const now = sowNow(t.fits, month, doy);
      const names = [...now.sow, ...now.sowWatered].map((x) => x.crop.slug).filter((s) => !pin.except?.includes(s));
      if (names.length) hit("audit-pin", t, `sow-now list on ${MONTH[month - 1]} ${doy - MONTH_START[month - 1]}: ${names.join(", ")}`);
    }
    for (const [month, doy] of pin.on ?? []) {
      const now = sowNow(t.fits, month, doy);
      if (![...now.sow, ...now.sowWatered].some((x) => x.crop.slug === pin.crop)) hit("audit-pin", t, `${pin.crop} not in the sow-now list on ${MONTH[month - 1]} ${doy - MONTH_START[month - 1]}`);
    }
  }
}

// ---- counting --------------------------------------------------------------------------------------------------
type Rule = { id: string; text: string; n: number; towns: Set<string>; examples: string[] };
const RULES: Rule[] = [
  ["sow-before-earliest", "month marked for sowing wholly before the crop's earliest sowing day"],
  ["trays-too-early", "tray month whose plantings-out would all fall before the earliest sowing day"],
  ["harvest-before-maturity", "harvest month no sowing can reach (earliest sowing day + days to maturity), or a bar with no maturity figure"],
  ["tender-harvest-past-frost", "frost-tender harvest in a month wholly after the first fall frost + 7 d (or before the last frost)"],
  ["frost-improved-early", "Brussels sprouts or parsnip harvested in a month wholly before the first fall frost"],
  ["sow-now-not-sowable", "crop in a 'sow/plant now' list that cannot be sown that day"],
  ["trays-now-too-early", "crop in the 'start in trays now' list that would be planted out before its earliest day"],
  ["closed-window-leads", "task list or autumn cards lead with garlic while its window is not open"],
  ["soil-card-says-sow", "soil card lists sowings (or says seeds germinate) when no crop can be sown"],
  ["strip-task-not-sowable", "garden-year strip task names a crop that cannot be sown (or started in trays) that day"],
  ["audit-pin", "a window the 5, 10, 11 or 13 Nov 2026 audit checked against the town's extension service no longer matches it"],
  ["overwinter-late", "a sowing to stand through winter later than two weeks before the average first frost"],
  ["onion-day-length", "a bulb onion planted while the days lengthen too close to bulbing (six weeks before the longest day; 11 h days)"],
  ["perennial-autumn", "a hardy perennial set out in autumn where frost frames the year (the crop records plant in spring)"],
  ["panel-date-blind", "a week's panel names a crop the town's calendar does not have that month, or the strip says harvest before a frost that has passed"],
  ["standing-from-spring", "a crop left standing picked through winter where no sowing matures after the warmest month"],
  ["potato-frost", "potatoes to plant on a date whose season runs into the frosts, where the typical coldest night blackens their tops"],
  ["stored-guide-stale", "a stored guide's gardening section, vetted, still offers what the town's lists do not, or a stale countdown, frost, soil reading or month"],
  ["regime-words", "rain words beside dry months, Little Rock and Memphis apart, or 'spring and autumn' where frost does not frame the year"],
  ["zone-tooltip", "a frost-note tooltip keeps a sentence naming hardiness zones the town is not in"],
  ["plant-at-rains", "a perennial planted 'at the start of the rains' set out in a month that opens no wet run"],
  ["extension-calendar", "where an extension calendar is loaded, a sowing window in a month it covers is not the calendar's (or the row does not name it)"],
  ["brassica-heat", "where frost does not frame the year and neither a frost gate nor a calendar sets the date, a broccoli, cabbage or cauliflower sowing first picked in the rising heat"],
  ["panel-reads-calendar", "a week's soil, heat or rains tile, the season line or the overview's garden card says what the town's calendar, month or week does not"],
  ["climate-words", "wet and dry rows that share months, 'wide swings', rain-fed sowings where every month is dry, 'planting out in all year', or a Köppen pin"],
  ["sowing-window-words", "'the main sowing window' outside the town's own main sowing months, or 'frost is not what sets the year' where frost is dated"],
  ["garlic-lift-winter", "garlic lifted in one of the three coldest months, or planted in the month right after the warmest where frost frames the year"],
  ["frost-nights-figure", "a light-frost tile whose frost-night count is not the one figure, with its station, that extremes frostNights gives"],
].map(([id, text]) => ({ id, text, n: 0, towns: new Set<string>(), examples: [] }));
const rule = (id: string) => RULES.find((r) => r.id === id)!;
function hit(id: string, t: Town, detail: string) {
  const r = rule(id);
  r.n++;
  r.towns.add(t.place.slug);
  if (r.examples.length < 4) r.examples.push(`${t.place.slug}: ${detail}`);
}

// ---- calendar-level rules (no date) --------------------------------------------------------------------------------
function checkCalendar(t: Town) {
  for (const f of t.fits) {
    if (f.perennial) continue;
    const crop = f.crop;
    const g = crop.grow!;
    const sowMonths = [...new Set([...f.sow, ...f.watered])];
    // A month an extension calendar gives opens on the calendar's first day, not the frost gate's.
    const opens = sowMonths.map((m) => ({ m, d: sourced(f, m) ? spanStartIn(f, m) : firstOpen(t, crop, m) }));
    // 1: wholly before the earliest day.
    for (const o of opens) if (o.d == null) hit("sow-before-earliest", t, `${crop.slug} sown in ${MONTH[o.m - 1]}, before its earliest day`);
    const live = opens.filter((o): o is { m: number; d: number } => o.d != null);
    // 2: trays.
    if (g.start === "transplant" && !sowMonths.every((m) => sourced(f, m))) {
      const lead = (g.nurseryWeeks ?? 6) * 7;
      for (const M of f.trays) {
        const ok = live.some((o) => circ(monthEnd(M) + lead - o.d) >= 0 && circ(monthStart(M) + lead - monthEnd(o.m)) <= 0);
        if (!ok && live.length) hit("trays-too-early", t, `${crop.slug} trays in ${MONTH[M - 1]} (${g.nurseryWeeks ?? 6} weeks), planted out ${monthSpans(sowMonths)}`);
      }
    }
    // 3: harvest bar vs maturity.
    if (f.harvest.length && !(g.days > 0)) hit("harvest-before-maturity", t, `${crop.slug} has a harvest bar and no maturity figure`);
    else {
      for (const M of f.harvest) {
        const reach = live.some((o) => {
          const delta = wrap365(monthEnd(M) - o.d);
          if (delta >= g.days && (g.stands || g.overwinter || delta <= g.days + SAME_SEASON_SLACK)) return true;
          // A crop left standing is picked on into the next calendar year where the ground stays open: the month
          // is reachable when it is within the standing span after the first frost (the sowing matured before it).
          if (g.stands && t.F != null && wrap365(frostDoy(monthEnd(M), t.south) - t.F) <= AFTER_FROST_SPAN && wrap365(t.F - o.d) >= g.days) return true;
          // An overwinter sowing finishes in the next calendar year: the same slack, counted past New Year.
          return !!g.overwinter && delta + 365 <= g.days + SAME_SEASON_SLACK;
        });
        if (!reach && live.length) {
          const earliest = live.map((o) => o.d).sort((a, b) => a - b)[0];
          hit("harvest-before-maturity", t, `${crop.slug} harvested in ${MONTH[M - 1]}; earliest sowing day ${MONTH[0]}+${earliest} plus ${g.days} d`);
        }
      }
    }
    // 4: tender harvest outside the frost-free season.
    if (crop.hardiness === "tender" && frosty(t, crop)) {
      for (const M of f.harvest) {
        const days = [monthStart(M), monthStart(M) + 14, monthEnd(M)];
        if (days.every((d) => inFrostGap(t, frostDoy(d, t.south), FIRST_FROST_SLACK))) {
          hit("tender-harvest-past-frost", t, `${crop.slug} harvested in ${MONTH[M - 1]}; frost-free ${t.c.lastSpringFrost} to ${t.c.firstFallFrost}`);
        }
      }
    }
    // 5: frost-improved crops.
    if (g.harvestAfterFrost && frosty(t, crop)) {
      for (const M of f.harvest) {
        if (wrap365(frostDoy(monthEnd(M), t.south) - t.F!) > AFTER_FROST_SPAN) hit("frost-improved-early", t, `${crop.slug} harvested in ${MONTH[M - 1]}; first frost ${t.c.firstFallFrost}`);
      }
    }
  }
}

// ---- date-level rules ---------------------------------------------------------------------------------------------
function checkDate(t: Town, month: number) {
  const doy = MONTH_START[month - 1] + 15;
  const iso = `2026-${String(month).padStart(2, "0")}-15`;
  const now = sowNow(t.fits, month, doy);
  const fd = frostDoy(doy, t.south);
  const cold = coldMonths(t);
  const label = `${MONTH[month - 1]} 15`;

  /** Why a crop cannot be sown on this day, or null (never where an extension calendar gives the day: rule 22). */
  const whyNot = (crop: Crop, perennial: boolean): string | null => {
    const g = crop.grow!;
    if (!perennial && sourced(t.fits.find((x) => x.crop.slug === crop.slug), month)) return null;
    if (perennial) {
      if (crop.hardiness === "tender") return null;
      if (t.c.monthlyMeanMax[month - 1] < GROUND_FROZEN_MAX_C) return "ground frozen";
      if (cold.has(month)) return "soil gone cold";
      return null;
    }
    // The spring gate applies wherever the winter reaches what kills the crop; the autumn finish only where it
    // brings a hard freeze (a kale in Albuquerque's −9 °C winter has a gate but no cut-off).
    const gate = gateOf(t, crop);
    if (gate != null && fd < gate) return `before its earliest day (gate day ${gate}, today ${fd})`;
    if (!hardFreeze(t, crop) || g.overwinter) return null;
    const finish = fd + g.days;
    const limit =
      crop.hardiness === "tender" || crop.hardiness === "half-hardy"
        ? t.F!
        : crop.hardiness === "hardy"
          ? Math.max(t.F! + HARDY_AFTER_FIRST_FROST, g.stands ? groundCap(t, crop) : 0)
          : Math.max(t.F! + VERY_HARDY_AFTER_FIRST_FROST, g.stands ? groundCap(t, crop) : 0);
    return finish > limit ? `cannot be ready (${g.days} d) before day ${limit}` : null;
  };

  for (const f of [...now.sow, ...now.sowWatered, ...now.plant]) {
    const why = whyNot(f.crop, f.perennial);
    if (why) hit("sow-now-not-sowable", t, `${f.crop.slug} on ${label}: ${why}`);
  }
  for (const f of now.trays) {
    const g = f.crop.grow!;
    if (sourced(f, monthOf(doy + (g.nurseryWeeks ?? 6) * 7))) continue;
    const gate = gateOf(t, f.crop);
    if (gate != null && fd + (g.nurseryWeeks ?? 6) * 7 < gate) hit("trays-now-too-early", t, `${f.crop.slug} on ${label}: planted out ${g.nurseryWeeks ?? 6} weeks on, before day ${gate}`);
  }

  // 8: the garden-year task list and the autumn cards.
  const frost = frostDatesOf(t.c);
  if (frost && t.c.frostFreeDays < 330 && t.c.frostFreeDays > 0) {
    const gs = garlicState(t.fits, doy);
    const tropical = Math.abs(t.place.lat) < 23.5;
    const y = gardenYear(new Date(`${iso}T12:00:00`), frost, { south: t.south, tropical, garlic: gs });
    const phase = y.phase.id as string;
    // The strip's sowing tasks, given the town's windows for the day, may name only crops that can be sown that day.
    const ys = gardenYear(new Date(`${iso}T12:00:00`), frost, { south: t.south, tropical, garlic: gs, sowing: sowingTasks(t.fits, month, doy) });
    for (const w of ys.phase.work as string[]) {
      const sown = w.startsWith("Sow now: ");
      const trays = w.startsWith("Start in trays now: ");
      const phaseId = ys.phase.id as string;
      if (!sown && !trays) {
        // A static line: every annual crop it names (by the crop's first word, as a word start) must be sowable that day.
        if (!["start", "sow", "grow"].includes(phaseId) || /^(order|prune|harden|check|first|no |trays to)/i.test(w)) continue;
        const words = w.toLowerCase().split(/[^a-z]+/);
        const startsTrays = /^start /i.test(w);
        for (const f of t.fits) {
          if (f.perennial) continue;
          const stem = f.crop.name.toLowerCase().split(/[ ,(]/)[0];
          if (stem.length < 3 || !words.some((x) => x.startsWith(stem))) continue;
          const why = whyNot(f.crop, false);
          if (why && !startsTrays) hit("strip-task-not-sowable", t, `${f.crop.slug} on ${label}: strip says "${w}": ${why}`);
          if (startsTrays && !f.trays.length) hit("strip-task-not-sowable", t, `${f.crop.slug} on ${label}: strip says "${w}", but no tray window`);
          else if (startsTrays && !now.trays.includes(f)) hit("strip-task-not-sowable", t, `${f.crop.slug} on ${label}: strip says "${w}", not in its tray window`);
        }
        continue;
      }
      for (const nm of w.slice(w.indexOf(": ") + 2).split(", ")) {
        const f = t.fits.find((x) => x.crop.name.replace(/\s*\(.*\)/, "").toLowerCase() === nm);
        if (!f) {
          hit("strip-task-not-sowable", t, `${label}: strip names "${nm}", which is not in this town's calendar`);
          continue;
        }
        if (sown) {
          const why = whyNot(f.crop, f.perennial);
          if (why) hit("strip-task-not-sowable", t, `${f.crop.slug} on ${label}: ${why}`);
        } else {
          const gate = gateOf(t, f.crop);
          if (gate != null && fd + (f.crop.grow!.nurseryWeeks ?? 6) * 7 < gate) hit("strip-task-not-sowable", t, `${f.crop.slug} on ${label}: trays planted out before day ${gate}`);
        }
      }
    }
    if (y.phase.work[0] === "Plant garlic" && gs !== "open") hit("closed-window-leads", t, `${label} (${phase}): task list leads with "Plant garlic", garlic window ${gs}`);
    // 15: no "harvest before frost" once the average first frost has passed.
    if ((y.toFirst as number) <= 0 && (y.phase.work as string[]).includes("Harvest tender crops before frost"))
      hit("panel-date-blind", t, `${label} (${phase}): strip says "Harvest tender crops before frost"; first frost ${t.c.firstFallFrost}`);
    if (phase === "harvest" || phase === "bed") {
      const groundOpen = t.c.monthlyMeanMax[month - 1] >= GROUND_FROZEN_MAX_C;
      const coverOpen = frost.firstDoy - frostDoy(doy, t.south) >= 21;
      const lead = autumnPlantings({ garlic: gs, bulbsOpen: bulbsOpen(gs, groundOpen, phase), coverOpen }).open[0];
      if (lead === "garlic" && gs !== "open") hit("closed-window-leads", t, `${label} (${phase}): autumn planting cards lead with garlic, window ${gs}`);
    }
  }

  checkPanels(t, month, iso, fd);

  // 9: the soil card.
  const soil = (t.mean[month - 1] + t.mean[(month + 10) % 12]) / 2;
  if (soil >= SOIL_WARM_ENOUGH_C) {
    const physically = [...now.sow, ...now.sowWatered].filter((f) => !whyNot(f.crop, false));
    if (!physically.length) {
      const note = soilSowing(t.fits, month, doy);
      if (!Array.isArray(note.open) || note.open.length) hit("soil-card-says-sow", t, `${label}: soil about ${soil.toFixed(1)} °C, nothing sowable, card says: ${note.text}`);
    }
  }
}

// ---- rules 12–14: overwinter cut-off, onion day length, perennials in autumn ----------------------------------------
const northDay = (d: number, south: boolean) => (south ? wrap365(d - 182 - 1) + 1 : wrap365(d - 1) + 1);

function checkSeasonRules(t: Town) {
  const lat = Math.abs(t.place.lat);
  for (const f of t.fits) {
    const crop = f.crop;
    const spans = [...f.windows.sow, ...f.windows.watered];
    // 12: overwinter sowings two weeks before the first frost (garlic keeps its own pinned windows).
    if (!f.perennial && crop.slug !== "garlic" && f.overwinter.length && t.F != null && hardFreeze(t, crop)) {
      for (const [from, to] of spans) {
        const m = monthOf(from);
        if (!f.overwinter.includes(m) || sourced(f, m)) continue;
        const fd = frostDoy(wrap365(to - 1) + 1, t.south);
        if (fd > t.F - OVERWINTER_BEFORE_FIRST_FROST && fd < t.F + 120)
          hit("overwinter-late", t, `${crop.slug} sown to stand through winter until day ${fd}; first frost day ${t.F} (${t.c.firstFallFrost})`);
      }
    }
    // 13: bulb onions by day length.
    if (crop.slug === "onion" && lat >= 23.5) {
      const longDay = dayLengthHours(lat, 172) >= ONION_SHORT_DAY_ZONE_H;
      // Where the shortest day is 10 hours or more, onions are planted in autumn only (RGV guide, AgriLife, LSU, UF/IFAS).
      const autumnOnly = !longDay && dayLengthHours(lat, 355) >= ONION_AUTUMN_ONLY_H;
      for (const [from, to] of spans) {
        if (sourced(f, monthOf(from))) continue;
        for (let d = from; d <= to; d++) {
          const nd = northDay(d, t.south);
          if (nd > 172 && nd < 356) continue;
          if (nd >= 356 && !autumnOnly) continue;
          const late = autumnOnly || (longDay ? nd > 172 - ONION_LEAD : dayLengthHours(lat, nd) >= ONION_SHORT_DAY_H);
          if (late) {
            hit("onion-day-length", t, `onion planted on day ${wrap365(d - 1) + 1} (${longDay ? "long-day" : "short-day"} zone)`);
            break;
          }
        }
      }
    }
    // 14: hardy perennials in spring only where frost frames the year.
    if (f.perennial && crop.hardiness !== "tender" && t.regime?.frostLed) {
      const w = t.mean.reduce((best, x, i) => (x > t.mean[best] ? i : best), 0);
      const c = t.mean.reduce((best, x, i) => (x < t.mean[best] ? i : best), 0);
      for (let j = (w + 1) % 12; j !== c; j = (j + 1) % 12) {
        if (f.sow.includes(j + 1)) hit("perennial-autumn", t, `${crop.slug} planted in ${MONTH[j]}`);
      }
    }
  }
}
const monthOf = (doy: number) => {
  const d = wrap365(doy - 1) + 1;
  let m = 11;
  while (m > 0 && MONTH_START[m] >= d) m--;
  return m + 1;
};

// ---- rule 15: the week's panels on each date ---------------------------------------------------------------------
/** The months a crop is in the ground by its calendar row: from each sowing month on to its next picking months. */
function seasonMonths(f: CropFit): Set<number> {
  const out = new Set<number>([...f.sow, ...f.watered, ...f.harvest]);
  for (const s0 of [...f.sow, ...f.watered]) {
    for (let k = 1; k < 12; k++) {
      const m = ((s0 - 1 + k) % 12) + 1;
      if (f.harvest.includes(m)) break;
      out.add(m);
    }
  }
  return out;
}

/** A week with a frost night every night and no flying days; wet (12 mm a day) or dry. */
function fakeWeek(t: Town, iso: string, month: number, wet: boolean): LocalData {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(`${iso}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + i);
    return { date: d.toISOString().slice(0, 10), tMin: 0, tMax: 6, precip: wet ? 12 : 0, windMax: 40 };
  });
  return {
    place: t.place,
    climate: t.c,
    regime: t.regime,
    today: iso,
    month,
    forecast: { days, soilTemp6cm: 6, current: { wind: 5 } },
    daysToFirstFrost: null,
    daysSinceLastFrost: null,
  } as unknown as LocalData;
}

function checkPanels(t: Town, month: number, iso: string, fd: number) {
  if (!t.fits.length || !t.regime) return;
  const cc = t.place.countryCode;
  const plain = (c: Crop) => cropName(c, cc).replace(/\s*\(.*\)/, "").toLowerCase();
  /** The crops a text names, longest name first, each name struck out once matched ("african eggplant" is not also "eggplant"). */
  const names = (text: string, fs: CropFit[]) => {
    let rest = text.toLowerCase();
    const out: CropFit[] = [];
    for (const f of [...annualAll].sort((a, b) => plain(b.crop).length - plain(a.crop).length)) {
      const re = new RegExp(`\\b${plain(f.crop)}\\b`);
      if (!re.test(rest)) continue;
      rest = rest.replace(re, "#");
      if (fs.includes(f)) out.push(f);
    }
    return out;
  };
  const annual = t.fits.filter((f) => !f.perennial);
  const annualAll = annual;
  const label = `${MONTH[month - 1]} 15`;
  const frostSeason = t.L != null && t.F != null && inFrostGap(t, fd, FIRST_FROST_SLACK);
  for (const wet of [true, false]) {
    const forces = forcesFor(fakeWeek(t, iso, month, wet), "gardening", new Date(`${iso}T12:00:00Z`));
    const byId = Object.fromEntries(forces.map((x) => [x.id, x.text]));
    const frost = byId.frost;
    if (frost) {
      for (const f of names(frost, annual.filter((x) => x.crop.hardiness === "tender"))) {
        if (frostSeason) hit("panel-date-blind", t, `${label}: frost tile names ${f.crop.slug} between the first frost (${t.c.firstFallFrost}) and the last (${t.c.lastSpringFrost})`);
        else if (!seasonMonths(f).has(month)) hit("panel-date-blind", t, `${label}: frost tile names ${f.crop.slug}, not in the ground in ${MONTH[month - 1]}`);
      }
    }
    const poll = byId.pollination;
    if (poll) for (const f of names(poll, annual)) if (!f.harvest.includes(month)) hit("panel-date-blind", t, `${label}: pollination tile names ${f.crop.slug}, not picked in ${MONTH[month - 1]}`);
    const squashFamily = annual.filter((f) => f.crop.group === "squash" || f.crop.slug === "cucumber" || f.crop.slug === "watermelon");
    if (poll && /hand pollination/.test(poll) && !squashFamily.some((f) => f.harvest.includes(month)))
      hit("panel-date-blind", t, `${label}: pollination tile asks for hand pollination with no squash, cucumber or melon picked in ${MONTH[month - 1]}`);
    const rain = byId.rain;
    if (rain && wet && /blight/.test(rain)) {
      for (const f of names(rain, annual.filter((x) => x.crop.slug === "tomato" || x.crop.slug === "potato")))
        if (!seasonMonths(f).has(month)) hit("panel-date-blind", t, `${label}: rain tile names blight on ${f.crop.slug}, not in the ground in ${MONTH[month - 1]}`);
    }
    if (rain && !wet && /\bwater\b/i.test(rain) && !annual.some((f) => seasonMonths(f).has(month)))
      hit("panel-date-blind", t, `${label}: rain tile gives watering advice with no annual in the ground in ${MONTH[month - 1]}`);
  }
}

// ---- the Day 5 climate checkers (14 Nov 2026), package B2 -----------------------------------------------------------
/**
 * Invariants for the Day 5 fixes, over every town and month:
 *  - sowing-window-words: the rules guide's headline and the week's rains tile say "the main sowing window" only in one of
 *    the town's own main sowing months (crop-calendar mainSowingMonths); the zone note never says frost is "not what sets
 *    the year" where frost is dated (the coast towns have 10 to 32 frost nights a year and sow mainly in spring).
 *  - garlic-lift-winter: garlic is never lifted in one of the town's three coldest months (Thompson's "harvest Dec"), and
 *    where frost frames the year it is never planted in the month right after the warmest (UAF: leaves up in autumn die).
 *  - frost-nights-figure: the light-frost tile prints extremes frostNights' figure and its source (Nanaimo's 41 against 5.5).
 */
function checkB2(t: Town) {
  if (!t.regime || !t.fits.length) return;
  const pageMain = mainSowingMonths(localFits(t)).months;
  for (let m = 1; m <= 12; m++) {
    const iso = `2026-${String(m).padStart(2, "0")}-15`;
    const d = { ...dayData(t, iso), moon: { phaseName: "Full moon", fishingRating: "Good", nextFull: "2026-12-24", age: 15, illumination: 100 } } as unknown as LocalData;
    const g = rulesGuide(d).gardening;
    if (/main sowing window/.test(g.headline) && !pageMain.includes(m)) hit("sowing-window-words", t, `${MONTH[m - 1]}: headline "${g.headline}"; main sowing months ${monthSpans(pageMain)}`);
    if (/not what sets the year/.test(g.zoneNotes) && t.c.lastSpringFrost !== "Rare") hit("sowing-window-words", t, `${MONTH[m - 1]}: zone note "${g.zoneNotes}" with frost dated ${t.c.lastSpringFrost}–${t.c.firstFallFrost}`);
    const rains = forcesFor(fakeWeek(t, iso, m, true), "gardening", new Date(`${iso}T12:00:00Z`)).find((x) => x.id === "rains");
    if (rains && /main sowing window|final rain-fed sowings/.test(rains.text) && !pageMain.includes(m)) hit("sowing-window-words", t, `${MONTH[m - 1]}: rains tile "${rains.text.slice(0, 80)}"; main sowing months ${monthSpans(pageMain)}`);
    const frost = forcesFor(fakeWeek(t, iso, m, false), "gardening", new Date(`${iso}T12:00:00Z`)).find((x) => x.id === "frost");
    const fn = frostNights(t.place.slug, t.c);
    if (frost && /nights a year/.test(frost.text) && fn && fn.nights >= 1 && !frost.text.includes(fn.words)) hit("frost-nights-figure", t, `${MONTH[m - 1]}: "${frost.text.slice(0, 90)}", not ${fn.nights} ${fn.words}`);
  }
  const garlic = t.fits.find((f) => f.crop.slug === "garlic");
  if (garlic) {
    const coldest = [...t.mean.keys()].sort((a, b) => t.mean[a] - t.mean[b]).slice(0, 3).map((i) => i + 1);
    for (const m of garlic.harvest) if (coldest.includes(m)) hit("garlic-lift-winter", t, `garlic lifted ${monthSpans(garlic.harvest)}, in one of the coldest months (${monthSpans(coldest)})`);
    const warm = t.mean.reduce((b, x, i) => (x > t.mean[b] ? i : b), 0);
    const after = ((warm + 1) % 12) + 1;
    if (t.regime.frostLed && [...garlic.sow, ...garlic.watered].includes(after)) hit("garlic-lift-winter", t, `garlic planted ${monthSpans([...garlic.sow, ...garlic.watered])}, in ${MONTH[after - 1]}, the month after the warmest`);
  }
}

// ---- rules 16–21: the Day 3 audit (11 Nov 2026) --------------------------------------------------------------------
/** Rule 16: a winter harvest of a standing crop needs a sowing that matures after the warmest month (MU G6201; UT W346-B). */
function checkStanding(t: Town) {
  if (t.F == null) return;
  const warm = t.mean.reduce((best, x, i) => (x > t.mean[best] ? i : best), 0);
  const warmMid = frostDoy(MONTH_START[warm] + 15, t.south);
  for (const f of t.fits) {
    const g = f.crop.grow!;
    if (f.perennial || !g.stands || g.harvestAfterFrost || !frosty(t, f.crop)) continue;
    // Picked in a month wholly between a month past the first frost and the last spring frost: the winter.
    const winter = f.harvest.filter((M) => [monthStart(M), monthEnd(M)].every((d) => wrap365(frostDoy(d, t.south) - (t.F! + 30)) < wrap365(t.L! - (t.F! + 30))));
    if (!winter.length) continue;
    const late = [...f.sow, ...f.watered].some((M) => frostDoy(monthEnd(M), t.south) + g.days > warmMid);
    if (!late) hit("standing-from-spring", t, `${f.crop.slug} sown ${monthSpans([...f.sow, ...f.watered])} only, picked ${monthSpans(winter)} (first frost ${t.c.firstFallFrost})`);
  }
}

/** Rule 17: potatoes and the frost dates, where the typical coldest night reaches −1 °C. */
const POTATO_TOPS_C = -1;
function checkPotato(t: Town, month: number) {
  if (t.L == null || t.F == null || t.c.meanAnnualExtremeMinC > POTATO_TOPS_C) return;
  const f = t.fits.find((x) => x.crop.slug === "potato");
  if (!f || sourced(f, month)) return;
  const doy = MONTH_START[month - 1] + 15;
  const now = sowNow(t.fits, month, doy);
  if (![...now.sow, ...now.sowWatered].includes(f)) return;
  const fd = frostDoy(doy, t.south);
  const days = f.crop.grow!.days;
  if (fd < t.L - OTHER_BEFORE_LAST_FROST || fd + days > t.F) hit("potato-frost", t, `potato to plant on ${MONTH[month - 1]} 15: ${days} days from day ${fd}; frost-free ${t.c.lastSpringFrost} to ${t.c.firstFallFrost}`);
}

/** Rule 18: the stored guide's gardening section on a date. */
const COUNTDOWN_WORDS = /\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty)\s+(?:days?|weeks?)\s+(?:to|until|away|to go)\b/i;
const BEFORE_FROST = /\b(?:before|ahead of|until|prepare for|race)\s+(?:the\s+)?(?:first\s+)?(?:autumn\s+|fall\s+)?(?:frost|freeze)\b/i;
const SOIL_WORDS = /\bsoil[^.]{0,25}?\d{1,2}\s*°\s*C|\d{1,2}\s*°\s*C\s+soil/i;
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function dayData(t: Town, iso: string): LocalData {
  const month = Number(iso.slice(5, 7));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(`${iso}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + i);
    return { date: d.toISOString().slice(0, 10), tMin: 5, tMax: 12, precip: 1, windMax: 15 };
  });
  return {
    place: t.place,
    climate: t.c,
    regime: t.regime,
    today: iso,
    month,
    season: "autumn",
    forecast: { days, soilTemp6cm: 9, current: { wind: 5 }, timezone: "UTC" },
    water: null,
    waters: [],
    regs: null,
    forageLaw: null,
    daysToFirstFrost: null,
    daysSinceLastFrost: null,
  } as unknown as LocalData;
}

/** In the frost season (first frost passed, last spring frost to come) or where frost is rare. */
const frostPassedOn = (t: Town, iso: string) => {
  if (t.c.lastSpringFrost === "Rare" || t.c.firstFallFrost === "Rare") return true;
  if (t.L == null || t.F == null) return false;
  const fd = frostDoy(doyOfIsoDate(iso), t.south);
  return wrap365(fd - t.F) < wrap365(t.L - t.F);
};
const doyOfIsoDate = (iso: string) => MONTH_START[Number(iso.slice(5, 7)) - 1] + Math.min(Number(iso.slice(8, 10)), DAYS_IN[Number(iso.slice(5, 7)) - 1]);

/** A guide written a week before the date that offers every crop to sow, start and pick, with every kind of stale line. */
function staleGuide(t: Town, iso: string): { guide: Guide; slugOf: Map<string, string> } {
  const slugOf = new Map<string, string>();
  const items = (verb: string): GuideItem[] =>
    ALL_CROPS.map((c) => {
      const name = cropName(c, t.place.countryCode);
      slugOf.set(name, c.slug);
      return { name, detail: `${verb} now.` };
    });
  const other = MONTH_NAMES[(Number(iso.slice(5, 7)) + 9) % 12];
  return {
    slugOf,
    guide: {
      summary: `${t.place.name} Garden: Late ${other} — nine days to frost.`,
      gardening: {
        headline: `${t.place.name} Garden: Late ${other} — Nine Days to Frost`,
        zoneNotes: `The average first frost is nine days away. Soil at 17 °C is warm. Mulch the beds.`,
        sowOutdoorsNow: items("Sow"),
        startIndoorsNow: items("Start in trays"),
        harvestNow: items("Pick"),
        tasksThisWeek: ["Harvest everything tender before the first frost", "Prepare for frost", "Spread compost on cleared beds"],
        watchOut: ["First frost is five days away: cover tender crops.", "Slugs in wet weather."],
      },
      fishing: { headline: "Fishing this week", species: [], bestTimes: "", waters: [], regulationsNote: "" },
      foraging: { headline: "Foraging this week", inSeasonNow: [], comingSoon: [], safety: [] },
      source: "ai",
      generatedAt: iso,
    },
  };
}

function checkStoredGuide(t: Town, month: number) {
  if (!t.fits.length) return;
  const iso = `2026-${String(month).padStart(2, "0")}-15`;
  const doy = MONTH_START[month - 1] + 15;
  const written = `2026-${String(month).padStart(2, "0")}-08`;
  const { guide, slugOf } = staleGuide(t, iso);
  const { guide: out } = vetStoredGardeningWhy(guide, dayData(t, iso), { writtenAt: written, fits: t.fits });
  const g = out.gardening;
  const label = `${MONTH[month - 1]} 15`;
  const now = sowNow(t.fits, month, doy);
  const sowable = new Set([...now.sow, ...now.plant, ...now.sowWatered].map((f) => f.crop.slug));
  const trays = new Set(now.trays.map((f) => f.crop.slug));
  const picked = new Set(t.fits.filter((f) => (f.perennial ? f.harvest.includes(month) : pickedOn(f, doy))).map((f) => f.crop.slug));
  if ((out as { fallback?: string[] }).fallback?.includes("gardening")) return; // the rules guide's own section, checked by the rules above
  for (const it of g.sowOutdoorsNow) if (!sowable.has(slugOf.get(it.name) ?? "")) hit("stored-guide-stale", t, `${label}: vetted guide still sows ${it.name}`);
  for (const it of g.startIndoorsNow) {
    const slug = slugOf.get(it.name) ?? "";
    const transplant = t.fits.find((f) => f.crop.slug === slug)?.crop.grow?.start === "transplant";
    if (!trays.has(slug) && (transplant || !sowable.has(slug))) hit("stored-guide-stale", t, `${label}: vetted guide still starts ${it.name} in trays`);
  }
  for (const it of g.harvestNow) if (!picked.has(slugOf.get(it.name) ?? "")) hit("stored-guide-stale", t, `${label}: vetted guide still picks ${it.name}`);
  const text = [g.headline, g.zoneNotes, ...g.tasksThisWeek, ...g.watchOut, out.summary].join(" | ");
  if (COUNTDOWN_WORDS.test(text)) hit("stored-guide-stale", t, `${label}: a countdown survives ("${text.match(COUNTDOWN_WORDS)![0]}")`);
  if (frostPassedOn(t, iso) && BEFORE_FROST.test(text)) hit("stored-guide-stale", t, `${label}: frost-timed advice after the first frost ("${text.match(BEFORE_FROST)![0]}")`);
  if (SOIL_WORDS.test(text)) hit("stored-guide-stale", t, `${label}: a soil reading from the week it was written survives`);
  for (const m of MONTH_NAMES) if (m !== MONTH_NAMES[month - 1] && new RegExp(`\\b${m}\\b`).test(g.headline)) hit("stored-guide-stale", t, `${label}: headline names ${m} ("${g.headline}")`);
}

/**
 * The stored texts the Day 3 audit found on 11 November 2026, as the guides held them (Pittsburgh, Nashville, St. Louis, Memphis,
 * Houston, Brownsville, Asheville, Columbus). Each must come out of the vet without the claims listed.
 */
const STORED_PINS: { slug: string; written: string; gardening: Partial<Guide["gardening"]>; summary?: string; gone: [keyof Guide["gardening"] | "summary" | "all", RegExp][] }[] = [
  {
    slug: "pittsburgh-pennsylvania",
    written: "2026-10-19",
    summary: "Pittsburgh Garden: Five Days to Frost. Fishing this week. Foraging this week.",
    gardening: {
      headline: "Pittsburgh Garden: Five Days to Frost",
      tasksThisWeek: ["Plant garlic and strawberries before Oct 24", "Harvest sweet corn before frost", "Spread compost on cleared beds"],
      harvestNow: [{ name: "Sweet corn", detail: "Pick every ear that passes the milk test." }],
    },
    gone: [["all", /five days/i], ["all", /Oct 24/], ["all", /sweet corn/i], ["all", /strawberr/i]],
  },
  {
    slug: "nashville-tennessee",
    written: "2026-10-19",
    summary: "Nashville Gardening: nine days to frost. Fishing this week. Foraging this week.",
    gardening: {
      headline: "Nashville Gardening: Nine Days to Frost",
      sowOutdoorsNow: [{ name: "Sweet corn", detail: "Sow a last block now." }],
      harvestNow: [{ name: "Sweet corn", detail: "Pick as the silks brown." }],
      tasksThisWeek: ["Spread compost on cleared beds"],
    },
    gone: [["all", /nine days/i], ["all", /sweet corn/i]],
  },
  {
    slug: "st-louis-missouri",
    written: "2026-10-19",
    gardening: {
      headline: "Saint Louis Gardening: First Frost Eight Days Away",
      zoneNotes: "The average first frost is eight days away. Fall planting window before frost.",
      sowOutdoorsNow: [{ name: "Sweet corn", detail: "Sow now for a fall crop." }],
      tasksThisWeek: ["Spread compost on cleared beds"],
    },
    gone: [["all", /eight days/i], ["all", /before frost/i], ["all", /sweet corn/i]],
  },
  {
    slug: "memphis-tennessee",
    written: "2026-10-22",
    gardening: {
      headline: "Memphis Garden: Cool Crops and Fall Prep",
      zoneNotes: "Soil 17 °C at 6 cm. Mulch beds as the nights cool.",
      startIndoorsNow: [{ name: "Kale", detail: "In trays now; transplant in 3–4 weeks." }],
      harvestNow: [{ name: "Sweet potatoes", detail: "Coming in now. Dig before the first frost." }],
      tasksThisWeek: ["Sow cool-season crops before the first frost", "Spread compost on cleared beds"],
    },
    // "before the first frost" was pinned gone on Nov 11 when the pooled stations put Memphis's first frost on Nov 5. NOAA's
    // 1991–2020 normals for Memphis International (Day 5 audit, 14 Nov 2026) put it on Nov 16, so on Nov 11 it is still ahead.
    gone: [["startIndoorsNow", /kale/i], ["all", /sweet potato/i], ["all", /17 °C/]],
  },
  {
    slug: "houston-texas",
    written: "2026-10-21",
    gardening: {
      headline: "Houston Gardening: Plant Fall Crops",
      zoneNotes: "Soil at 26 °C is warm enough for quick germination. Mulch beds after sowing.",
      sowOutdoorsNow: [{ name: "Potatoes", detail: "Plant seed potatoes now." }],
      tasksThisWeek: ["Spread compost on cleared beds"],
    },
    gone: [["all", /26 °C/], ["sowOutdoorsNow", /potato/i]],
  },
  {
    slug: "brownsville-texas",
    written: "2026-10-19",
    gardening: { headline: "Brownsville Garden Guide: October 19–25", tasksThisWeek: ["Spread compost on cleared beds"] },
    gone: [["headline", /October/]],
  },
  {
    slug: "asheville-north-carolina",
    written: "2026-10-20",
    gardening: { headline: "Asheville Gardening", sowOutdoorsNow: [{ name: "Spinach", detail: "Sow for a winter crop." }], tasksThisWeek: ["Spread compost on cleared beds"] },
    gone: [["sowOutdoorsNow", /spinach/i]],
  },
  {
    slug: "columbus-ohio",
    written: "2026-10-20",
    gardening: {
      headline: "Columbus Gardening",
      sowOutdoorsNow: [
        { name: "Apples", detail: "Plant a tree now." },
        { name: "Pears", detail: "Plant a tree now." },
        { name: "Haskap (honeyberry)", detail: "Plant now." },
      ],
      tasksThisWeek: ["Spread compost on cleared beds"],
    },
    gone: [["sowOutdoorsNow", /apple|pear|haskap/i]],
  },
];

function checkStoredPins(t: Town) {
  for (const pin of STORED_PINS) {
    if (pin.slug !== t.place.slug) continue;
    const base = staleGuide(t, "2026-11-11").guide;
    const guide: Guide = {
      ...base,
      summary: pin.summary ?? `${pin.gardening.headline}. Fishing this week. Foraging this week.`,
      gardening: { headline: "", zoneNotes: "", sowOutdoorsNow: [], startIndoorsNow: [], harvestNow: [], tasksThisWeek: [], watchOut: [], ...pin.gardening },
    };
    const { guide: out } = vetStoredGardeningWhy(guide, dayData(t, "2026-11-11"), { writtenAt: pin.written, fits: t.fits });
    for (const [where, re] of pin.gone) {
      const text = where === "all" ? JSON.stringify(out.gardening) + out.summary : where === "summary" ? out.summary : JSON.stringify(out.gardening[where]);
      if (re.test(text)) hit("stored-guide-stale", t, `Nov 11 (audit pin): ${where} still says ${re} after the vet`);
    }
  }
}

/** Rule 19: rain words, the frost-led split, the regime summary. */
function checkRegimeWords(t: Town) {
  const r = t.regime;
  if (!r) return;
  if (r.dryMonths.length && /through the year/.test(rainWords(r.rain, false, r.dryMonths))) hit("regime-words", t, `"rain through the year" beside dry months ${monthSpans(r.dryMonths)}`);
  if (!r.frostLed && /spring and autumn are the main growing seasons/.test(r.summary)) hit("regime-words", t, `"spring and autumn are the main growing seasons" where frost does not frame the year`);
  if ((t.place.slug === "little-rock-arkansas" || t.place.slug === "memphis-tennessee") && !r.frostLed) hit("regime-words", t, "not frost-led (Little Rock and Memphis share a −10.2 °C coldest night; UA plants figs late Feb–early Apr)");
}

/** Rule 20: frost-note tooltips held to the town's zone. */
function checkZoneTooltips(t: Town) {
  const zone = t.c.zoneNumber;
  for (const c of ALL_CROPS) {
    const note = zoneScoped(c.frostNote, zone);
    for (const sentence of note.match(/[^.!?]+[.!?]*/g) ?? []) {
      if (/\b(?:hardy|hardiest|hardiness|overwinters?|overwintered)\b/i.test(sentence)) continue;
      // A sentence that names zones and none of them the town's ("in zone 5, and often in zone 4" holds in zone 4).
      const ranges = [...sentence.matchAll(/\bzones?\s+(\d{1,2})[ab]?(?:\s*(?:–|-|to|and|or)\s*(\d{1,2})[ab]?)?/gi)].map((m) => [Number(m[1]), m[2] ? Number(m[2]) : Number(m[1])].sort((x, y) => x - y));
      if (ranges.length && !ranges.some(([a, b]) => zone >= a && zone <= b)) hit("zone-tooltip", t, `${c.slug}: "${sentence.trim()}" in zone ${zone}`);
    }
  }
}

/** Rule 21: perennials planted at the start of the rains. */
function checkRains(t: Town) {
  const wet = new Set(t.regime?.wetMonths ?? []);
  if (wet.size === 12) return;
  for (const f of t.fits) {
    if (!f.perennial || !(f.crop.grow as { plantAtRains?: boolean }).plantAtRains) continue;
    for (const m of f.sow) if (!wet.has(m) || wet.has(((m + 10) % 12) + 1)) hit("plant-at-rains", t, `${f.crop.slug} planted in ${MONTH[m - 1]}, which opens no wet run (${monthSpans([...wet]) || "no wet months"})`);
  }
}

// ---- rules 22–23: the extension calendars, and brassicas in the heat ------------------------------------------------
type ExtData = {
  regions: { id: string; towns: string[]; covers: number[]; others: string; crops: Record<string, { sow: [string, string][] }> }[];
};
const EXT = EXTENSION as unknown as ExtData;
const KNOWN_CROPS = new Set(ALL_CROPS.map((c) => c.slug));
const mdDoy = (s: string) => {
  const [m, d] = s.split("-").map(Number);
  return MONTH_START[m - 1] + Math.min(d, DAYS_IN[m - 1]);
};
/** The first and last day of month m that the source's windows hold (read straight from the JSON), or null. */
function sourceInMonth(sow: [string, string][], m: number): [number, number] | null {
  const days: number[] = [];
  for (let d = monthStart(m); d <= monthEnd(m); d++) {
    if (sow.some(([a, b]) => (mdDoy(a) <= mdDoy(b) ? d >= mdDoy(a) && d <= mdDoy(b) : d >= mdDoy(a) || d <= mdDoy(b)))) days.push(d);
  }
  return days.length ? [days[0], days[days.length - 1]] : null;
}
const dayLabel = (d: number) => `${MONTH[monthOf(d) - 1]} ${wrap365(d - 1) + 1 - MONTH_START[monthOf(d) - 1]}`;

/** Rule 22: the page's windows agree with the extension calendar wherever one is loaded. */
function checkExtension(t: Town) {
  const r = EXT.regions.find((x) => x.towns.includes(t.place.slug));
  if (!r) return;
  // The pages pass only the latitude: the calendar module must find the town's region from it.
  if (extensionRegion({ lat: t.place.lat })?.id !== r.id) hit("extension-calendar", t, `the calendar module does not find ${r.id} from the town's latitude`);
  for (const slug of Object.keys(r.crops)) if (!KNOWN_CROPS.has(slug)) hit("extension-calendar", t, `${r.id} lists "${slug}", which is no crop of the library`);
  for (const crop of ALL_CROPS) {
    if (!crop.grow || crop.grow.start === "perennial") continue;
    const f = t.fits.find((x) => x.crop.slug === crop.slug);
    const c = r.crops[crop.slug];
    if (!c && r.others !== "none") continue;
    for (const m of r.covers) {
      const want = c ? sourceInMonth(c.sow, m) : null;
      const spans = f ? [...f.windows.sow, ...f.windows.watered].filter(([a]) => monthOf(a) === m) : [];
      const got: [number, number] | null = spans.length ? [Math.min(...spans.map(([a]) => wrap365(a - 1) + 1)), Math.max(...spans.map(([, b]) => wrap365(b - 1) + 1))] : null;
      const months = f ? [...f.sow, ...f.watered] : [];
      if (!want && (got || months.includes(m))) hit("extension-calendar", t, `${crop.slug} sown in ${MONTH[m - 1]}, which ${r.id} does not ${c ? "give" : "list"}`);
      else if (want && (!got || got[0] !== want[0] || got[1] !== want[1] || !months.includes(m)))
        hit("extension-calendar", t, `${crop.slug} in ${MONTH[m - 1]}: ${got ? `${dayLabel(got[0])}–${dayLabel(got[1])}` : "not sown"}, ${r.id} gives ${dayLabel(want[0])}–${dayLabel(want[1])}`);
    }
    if (c && f && (f.from?.id !== r.id || !f.from.row)) hit("extension-calendar", t, `${crop.slug}'s row does not name ${r.id}`);
    if (c && !f) hit("extension-calendar", t, `${crop.slug} is listed by ${r.id} but not in the calendar`);
  }
}

/** The mean temperature on a day of the year, read between the monthly means (each at mid-month). */
function meanOnDay(t: Town, doy: number) {
  const d = wrap365(doy - 1) + 1;
  const mid = (i: number) => MONTH_START[i] + DAYS_IN[i] / 2;
  let i = 11;
  while (i > 0 && mid(i) > d) i--;
  if (mid(i) > d) i = 11;
  const j = (i + 1) % 12;
  const k = wrap365(d - mid(i)) / wrap365(mid(j) - mid(i));
  return t.mean[i] + (t.mean[j] - t.mean[i]) * k;
}

/** Rule 23: brassicas picked before the heat where frost does not frame the year. */
function checkBrassicaHeat(t: Town) {
  if (t.regime?.frostLed !== false || Math.abs(t.place.lat) < 23.5) return;
  for (const f of t.fits) {
    // Where a frost gate holds the spring sowing (rule 1's earliest day), the gate gives the date.
    if (!["broccoli", "cabbage", "cauliflower"].includes(f.crop.slug) || gateOf(t, f.crop) != null) continue;
    const g = f.crop.grow!;
    for (const m of [...new Set([...f.sow, ...f.watered])]) {
      if (sourced(f, m) || f.overwinter.includes(m)) continue;
      const d1 = spanStartIn(f, m) + g.days;
      if (meanOnDay(t, d1 + 15) > meanOnDay(t, d1 - 15) && meanOnDay(t, d1) > g.temp[2] + 2)
        hit("brassica-heat", t, `${f.crop.slug} sown in ${MONTH[m - 1]}, first picked ${dayLabel(d1)} at ${meanOnDay(t, d1).toFixed(1)} °C and rising`);
    }
  }
}

/** The model alone against each calendar it can be checked against (information, not a failure). */
const modelVsCalendar: string[] = [];
function compareModel(t: Town) {
  const r = EXT.regions.find((x) => x.towns.includes(t.place.slug));
  if (!r || !t.c.monthlyRainMm) return;
  const model = cropCalendar(t.c, t.regime, ALL_CROPS, { lat: t.place.lat, extension: false });
  const differ: string[] = [];
  for (const [slug, c] of Object.entries(r.crops)) {
    const want = r.covers.filter((m) => sourceInMonth(c.sow, m));
    const f = model.find((x) => x.crop.slug === slug);
    const got = f ? [...new Set([...f.sow, ...f.watered])].filter((m) => r.covers.includes(m)).sort((a, b) => a - b) : [];
    if (want.join() !== got.join()) differ.push(`${slug} ${monthSpans(got) || "never"} (calendar ${monthSpans(want)})`);
  }
  const extra = model.filter((f) => !f.perennial && !r.crops[f.crop.slug] && r.others === "none" && [...f.sow, ...f.watered].some((m) => r.covers.includes(m))).length;
  const n = Object.keys(r.crops).length;
  modelVsCalendar.push(
    `${t.place.slug.padEnd(26)} ${r.id.padEnd(23)} ${String(differ.length).padStart(2)}/${n} listed crops differ, ${extra} unlisted crops sown; e.g. ${differ.slice(0, 3).join("; ") || "none"}`,
  );
}


// ---- rules 24–25: the Day 4 audit's panels and climate words (13 Nov 2026) ----------------------------------------
/** A week of seven like days: highs and lows, and the week's rain spread over it. */
function weekOf(t: Town, iso: string, month: number, tMin: number, tMax: number, rainMm: number, soil: number): LocalData {
  const d = dayData(t, iso);
  const days = Array.from({ length: 7 }, (_, i) => {
    const x = new Date(`${iso}T12:00:00Z`);
    x.setUTCDate(x.getUTCDate() + i);
    return { date: x.toISOString().slice(0, 10), tMin, tMax, precip: rainMm / 7, windMax: 15 };
  });
  return { ...d, month, forecast: { ...d.forecast, days, soilTemp6cm: soil } } as unknown as LocalData;
}
const WET_LABEL = /\b(?:Rainy season|Wet season|Long rains|Short rains|The rains are on)\b/;
const DRY_WORDS = /\b(?:Dry season|dry season|due next month|lowest)\b/;
const localFitsCache = new Map<string, CropFit[]>();
const localFits = (t: Town) => {
  let f = localFitsCache.get(t.place.slug);
  if (!f) localFitsCache.set(t.place.slug, (f = cropCalendar(t.c, t.regime, localCrops(t.place.countryCode), { lat: t.place.lat })));
  return f;
};

function checkPanelWords(t: Town, month: number) {
  const r = t.regime;
  if (!r || !t.c.monthlyRainMm) return;
  const fits = localFits(t);
  if (!fits.length) return;
  const cc = t.place.countryCode;
  /**
   * The crops a text names that `ok` does not allow, read as the stored-guide vet reads names (src/lib/guide-vet-garden
   * cropsNamed: plurals, the country's names, and a word that ends several crops' names, "beans" or "squash", as a group any
   * one of which may be meant).
   */
  const shut = (text: string, ok: (slug: string) => boolean) => {
    const n = cropsNamed(text, cc);
    return [...n.exact.filter((x) => !ok(x)), ...n.loose.filter((g) => !g.some(ok)).map((g) => g.join("/"))];
  };
  const bySlug = new Map(fits.map((f) => [f.crop.slug, f]));
  const inGroundIn = (slug: string, m: number) => {
    const f = bySlug.get(slug);
    return !!f && !f.perennial && seasonMonths(f).has(m);
  };
  const iso = `2026-${String(month).padStart(2, "0")}-15`;
  const doy = MONTH_START[month - 1] + 15;
  const label = `${MONTH[month - 1]} 15`;
  const now = sowNow(fits, month, doy);
  const open = new Set([...now.sow, ...now.sowWatered, ...now.trays, ...now.plant].map((f) => f.crop.slug));
  const monthMm = t.c.monthlyRainMm[month - 1];
  for (const [tMin, tMax] of [[0, 6], [8, 16], [16, 30], [26, 42]] as const) {
    for (const rain of [0, 60]) {
      const d = weekOf(t, iso, month, tMin, tMax, rain, (tMin + tMax) / 2);
      const forces = forcesFor(d, "gardening", new Date(`${iso}T12:00:00Z`));
      const by = Object.fromEntries(forces.map((x) => [x.id, x]));
      // The soil tile's germination sentence (before "In their sowing window") names no crop the calendar does not offer.
      const soilFact = (by.soil?.text ?? "").split(/ (?:In their sowing window|No crop is in its sowing window)/)[0];
      // "beans and maize germinate poorly" is a germination fact, not an offer to sow: the clause after the semicolon is not read.
      for (const x of shut(soilFact.split(";")[0], (slug) => open.has(slug))) hit("panel-reads-calendar", t, `${label}: soil tile names ${x}, not open today ("${soilFact}")`);
      for (const x of shut(by.heat?.text ?? "", (slug) => inGroundIn(slug, month))) hit("panel-reads-calendar", t, `${label}: heat tile names ${x}, not in the ground in ${MONTH[month - 1]} ("${by.heat?.text}")`);
      const rains = by.rains;
      if (rains) {
        const both = `${rains.value} — ${rains.text}`;
        if (!r.wetMonths.includes(month) && WET_LABEL.test(both)) hit("panel-reads-calendar", t, `${label}: rains tile in a month outside the wet months (${monthSpans(r.wetMonths)}): "${both}"`);
        if (rain >= 5 && rain >= (monthMm * 7) / 30 && DRY_WORDS.test(both)) hit("panel-reads-calendar", t, `${label}: rains tile beside ${rain} mm forecast (month ${Math.round(monthMm)} mm): "${both}"`);
      }
      if (!r.frostLed && tMin === 8) {
        const line = seasonLine(d, fits);
        for (const x of shut(line, (slug) => inGroundIn(slug, month) || bySlug.get(slug)?.crop.hardiness !== "tender")) hit("panel-reads-calendar", t, `${label}: season line names ${x}, not in the ground: "${line}"`);
        if (/tender crops are out/i.test(line)) hit("panel-reads-calendar", t, `${label}: season line says "tender crops are out": "${line}"`);
        if (rain >= 5 && rain >= (monthMm * 7) / 30 && /\bdue next month\b|\bin the dry season\b/.test(line)) hit("panel-reads-calendar", t, `${label}: season line beside ${rain} mm forecast: "${line}"`);
      }
    }
  }
  // The overview's garden card: every crop open today with watering is on it (up to five), and none it names is shut.
  const card = overviewSowing(fits, month, doy);
  const shown = new Set((card?.named ?? []).map((f) => f.crop.slug));
  for (const f of now.sowWatered.slice(0, 5)) if (!shown.has(f.crop.slug)) hit("panel-reads-calendar", t, `${label}: overview card leaves out ${f.crop.slug}, open with watering`);
  for (const slug of shown) if (!open.has(slug)) hit("panel-reads-calendar", t, `${label}: overview card names ${slug}, not open today`);
}

function checkClimateWords(t: Town) {
  const r = t.regime;
  if (!r) return;
  const rows = climateMonthRows(r);
  const wet = rows.find((x) => x.label === "Wet months");
  const dry = rows.find((x) => x.label === "Dry months");
  if (wet && dry && wet.months.some((m) => dry.months.includes(m))) hit("climate-words", t, `"Wet months ${wet.value}" beside "Dry months ${dry.value}"`);
  if (/wide swings/i.test(`${r.summary} ${r.short}`)) hit("climate-words", t, `"wide swings" in the regime text`);
  if (r.dryMonths.length === 12)
    for (const f of localFits(t)) if (!f.perennial && f.sow.length) hit("climate-words", t, `${f.crop.slug} offered to sow without watering (${monthSpans(f.sow)}) where every month is dry`);
  const k = koppenWithin(t.c, t.place.lat);
  if (k[0] !== r.koppen) hit("climate-words", t, `Köppen margins start from ${k[0]}, not the regime's ${r.koppen}`);
  const text = koppenText(t.c, t.place.lat, r.koppen);
  if (!text.startsWith(`Köppen ${r.koppen}`)) hit("climate-words", t, `"${text}" does not lead with the regime's class ${r.koppen}`);
  // San Jose: BSk on the grid, Csb on NOAA's 1991–2020 normals (Day 4 audit).
  if (t.place.slug === "san-jose-california" && !/Csb/.test(text)) hit("climate-words", t, `"${text}": the audit found Csb on NOAA's normals, within the margins`);
  for (const month of [1, 4, 7, 11]) {
    const day = { ...dayData(t, `2026-${String(month).padStart(2, "0")}-15`), moon: { phaseName: "Full moon", fishingRating: "Good", nextFull: "2026-12-24", age: 15, illumination: 100 } } as unknown as LocalData;
    const g = rulesGuide(day).gardening;
    for (const it of g.startIndoorsNow) if (/planting out in all year/.test(it.detail)) hit("climate-words", t, `${MONTH[month - 1]} 15: "${it.name}: ${it.detail}"`);
  }
}

/**
 * The stored texts the Day 4 audit found on 13 November 2026 (Orlando, Las Vegas, Santa Barbara, San Diego, Tucson), as
 * the guides held them: each must come out of the vet without the claims listed, and a sentence about averages stays.
 */
const STORED_PINS_13_NOV: (typeof STORED_PINS[number] & { kept?: RegExp[] })[] = [
  {
    slug: "orlando-florida",
    written: "2026-10-19",
    gardening: {
      headline: "Fall planting and harvest in Orlando",
      zoneNotes: "Frost never occurs here, so basil and peppers keep producing through the mild winter. Mulch the beds.",
      tasksThisWeek: ["Spread compost on cleared beds"],
    },
    gone: [["all", /Frost never occurs/i]],
    kept: [/Mulch the beds/],
  },
  {
    slug: "las-vegas-nevada",
    written: "2026-10-12",
    gardening: {
      headline: "Las Vegas Garden",
      zoneNotes: "October is prime planting time. The average first frost is Dec 2.",
      tasksThisWeek: ["Spread compost on cleared beds"],
    },
    gone: [["all", /prime planting time/i]],
    kept: [/average first frost is Dec 2/],
  },
  {
    slug: "santa-barbara-california",
    written: "2026-10-12",
    gardening: { headline: "Santa Barbara Garden", zoneNotes: "Fall planting begins as October rains approach. Mulch the beds.", tasksThisWeek: ["Spread compost on cleared beds"] },
    gone: [["all", /October rains/i]],
  },
  {
    slug: "san-diego-california",
    written: "2026-10-12",
    gardening: {
      headline: "San Diego Garden",
      zoneNotes: "Mulch the beds.",
      tasksThisWeek: ["Spread compost on cleared beds"],
      watchOut: ["Nights dropping into the low 20s°C mean the heat is breaking.", "Sudden temperature swings: highs near 38°C (100°F) early week.", "Slugs in wet weather."],
    },
    gone: [["all", /20s°C/], ["all", /highs near 38/]],
    kept: [/Slugs in wet weather/],
  },
  {
    slug: "tucson-arizona",
    written: "2026-10-19",
    gardening: { headline: "Tucson Garden", zoneNotes: "A rare rain event on October 22 will soak the beds. Mulch the beds.", tasksThisWeek: ["Spread compost on cleared beds"] },
    gone: [["all", /October 22/]],
  },
];

function checkStoredPins13(t: Town) {
  for (const pin of STORED_PINS_13_NOV) {
    if (pin.slug !== t.place.slug) continue;
    const base = staleGuide(t, "2026-11-13").guide;
    const guide: Guide = {
      ...base,
      summary: `${pin.gardening.headline}. Fishing this week. Foraging this week.`,
      gardening: { headline: "", zoneNotes: "", sowOutdoorsNow: [], startIndoorsNow: [], harvestNow: [], tasksThisWeek: [], watchOut: [], ...pin.gardening },
    };
    const { guide: out } = vetStoredGardeningWhy(guide, dayData(t, "2026-11-13"), { writtenAt: pin.written, fits: t.fits });
    const all = JSON.stringify(out.gardening) + out.summary;
    for (const [, re] of pin.gone) if (re.test(all)) hit("stored-guide-stale", t, `Nov 13 (audit pin): still says ${re} after the vet`);
    for (const re of pin.kept ?? []) if (!re.test(all)) hit("stored-guide-stale", t, `Nov 13 (audit pin): lost ${re}, which still holds`);
  }
}
// The fish entries' text (src/lib/guide-vet holds it with heldText): "Cooler October water moves them" read in November.
{
  const s = { today: "2026-11-13", written: "2026-10-19", frostGone: false };
  const kept = heldText("Cooler October water moves them inshore. Fish the drop-offs at dawn.", s);
  if (/October/.test(kept) || !/drop-offs/.test(kept)) {
    const r = rule("stored-guide-stale");
    r.n++;
    r.examples.push(`heldText: "${kept}" (expected the October sentence gone and the rest kept)`);
  }
}

// ---- run ---------------------------------------------------------------------------------------------------------
const argv = process.argv.slice(2);
const show = argv.flatMap((a, i) => (argv[i - 1] === "--show" ? [a] : []));
let towns = 0;
let crops = 0;
for (const e of TABLE) {
  const t = townOf(e);
  towns++;
  crops += t.fits.length;
  if (show.includes(t.place.slug)) {
    console.log(`\n=== ${t.place.label}: last frost ${t.c.lastSpringFrost}, first ${t.c.firstFallFrost}`);
    for (const f of t.fits) {
      console.log(
        `  ${f.crop.slug.padEnd(17)} ${f.crop.hardiness.padEnd(10)} ${f.perennial ? "plant" : "sow  "} ${monthSpans(f.sow) || "-"}${f.watered.length ? ` (+watered ${monthSpans(f.watered)})` : ""}; trays ${monthSpans(f.trays) || "-"}; harvest ${monthSpans(f.harvest) || "-"}`,
      );
    }
  }
  checkCalendar(t);
  for (let m = 1; m <= 12; m++) {
    checkDate(t, m);
    checkPotato(t, m);
    checkStoredGuide(t, m);
    checkPanelWords(t, m);
  }
  checkClimateWords(t);
  checkStoredPins13(t);
  checkPins(t);
  checkSeasonRules(t);
  checkStanding(t);
  checkStoredPins(t);
  checkRegimeWords(t);
  checkZoneTooltips(t);
  checkRains(t);
  checkExtension(t);
  checkBrassicaHeat(t);
  checkB2(t);
  compareModel(t);
}

console.log(`\nChecked ${towns} towns, ${crops} crop rows, 12 dates each (the 15th of each month of 2026).`);
let total = 0;
for (const r of RULES) {
  total += r.n;
  console.log(`${String(r.n).padStart(6)}  ${r.id.padEnd(27)} ${r.towns.size ? `(${r.towns.size} towns) ` : ""}${r.text}`);
  for (const x of r.examples) console.log(`          e.g. ${x}`);
}
console.log(`${String(total).padStart(6)}  TOTAL`);
console.log(`\nThe model alone (src/lib/crop-calendar, extension: false) against the extension calendars it can be checked against, months covered:`);
for (const line of modelVsCalendar) console.log(`  ${line}`);
if (total > 0) process.exit(1);
