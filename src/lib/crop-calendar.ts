/**
 * The sowing calendar for a place: for every crop and every month, whether a
 * sowing made early in that month would grow to harvest inside the crop's own
 * temperature limits and clear of frost, whether it would need watering through
 * dry months, when to start it in trays, and when it would be picked.
 *
 * Worked out from the place's ten-year monthly climate (src/lib/climate), its
 * regime (src/lib/regime) and its latitude (day length). Months are 1–12
 * throughout. The rules, and where each number comes from (full citations in
 * src/data/crop-grow.json `sources`):
 *
 * - The sowing month: its late-month mean (the average of this month's and the
 *   next's) may sit 1 °C under the crop's minimum (3 °C for a transplant that
 *   goes out as a plant) and 1 °C over its optimum, and must reach the seed's
 *   germination minimum `sowMinSoilC` (Alabama Extension ANR-1061). Tender crops
 *   go in a week after the average last frost (RHS; the crop records' own "1–2
 *   weeks after the last frost"), so a month qualifies when its second half is
 *   past that date.
 * - Growth: the crop needs its `days` of growing weather. Days under ten hours of
 *   daylight in a month below the crop's optimum do not count — growth all but
 *   stops (Coleman's Persephone period; University of Maryland Extension) — and
 *   nothing but an overwinter crop is sown into such a month. A sowing may wait out
 *   at most three months of them (a Mediterranean winter, not an oceanic northern
 *   one). A sowing that would mature in autumn
 *   needs 14 more days, the short-day factor every fall-planting calculator adds
 *   (Maryland, Virginia Tech). Each month it sits in must stay under the crop's
 *   maximum and, from the second month, at or above its minimum; at least half
 *   the growing months (one, for a short crop) must be within 2 °C of its optimum
 *   range. Half-hardy crops need every growing month's mean night at 2 °C or
 *   more, tender ones 7 °C.
 * - Only `overwinter` crops (garlic, broad beans, overwintering peas and onion
 *   sets, spinach, rocket) may sit out months below their minimum, for up to five
 *   months, and only where the mean annual extreme minimum is within what the
 *   standing crop takes (`overwinterMinC`). Everything else must finish before the
 *   first month under its minimum.
 * - Frost: with the picking period added (four weeks for crops picked over weeks),
 *   a tender sowing must be done two weeks before the average first frost (Virginia
 *   Tech's frost-tender factor), a half-hardy one by the frost and a hardy one
 *   within two weeks of it (the site's own hardiness table: "takes −4 to −6 °C");
 *   very hardy crops are limited by the cold months and the light, not the date.
 * - The earliest day (added after the 2 Nov 2026 Ottawa audit, which found sowing windows
 *   read from the 1st of each month and so harvests that no calendar allows): where frost
 *   frames the year, a tender crop goes out no sooner than a week after the average last
 *   frost and any other crop that does not overwinter no sooner than three weeks before it
 *   (Just Food Ottawa: brassica transplants "no more than 3 weeks before the last frost";
 *   Seeds of Diversity: cold-tolerant crops 3–4 weeks before). A month is marked when a
 *   sowing can be made on any day of it, from its first open day to the last day that
 *   still finishes in time, and the sowing is worked from those days. The harvest bar
 *   runs from the earliest sowing's first picking (earliest sowing day + `days`, plus the
 *   short-day factor) to the last sowing's picking, and never starts before the earliest
 *   day plus `days`. It ends at the first fall frost for tender and half-hardy crops and
 *   two weeks after it for hardy ones; a crop left standing (`stands`: carrot, cabbage, kale,
 *   leek ...) runs on to the last month with unfrozen ground (a mean daytime high of 0 °C or
 *   more, nights above what kills it); a crop not worth picking before frost
 *   (`harvestAfterFrost`: Brussels sprouts, parsnip) starts no earlier than the first frost.
 *   Harvest months of perennials are the library's, not worked out here.
 * - Warm-season crops (minimum 12 °C or more) are not sown when a growing month
 *   would average under eleven hours of daylight: the autumn tomato sowings that
 *   no Lisbon or Cape Town calendar lists (Calendário da Horta; Gardenate SA). Where
 *   the shortest day is ten hours or more, only such a month that is also under the
 *   crop's optimum stops them (the Rio Grande Valley's fall tomatoes; WARM_SEASON_HOURS).
 * - A sowing is "with watering" when a month it actively grows in is one of the
 *   regime's dry months (for a crop that needs little water, more than half of
 *   them); a harvest month it barely enters does not count.
 * - Transplants are started in trays `ceil(nurseryWeeks / 4.33)` months before a
 *   month they can be planted out.
 * - Garlic outside the tropics is planted in autumn and lifted the next summer:
 *   where frost frames the year, in the two months before the soil goes cold
 *   (monthly mean under 5 °C: Toronto Master Gardeners, OMAFRA, Denver Urban
 *   Gardens, NC State, RHS); elsewhere in the first two months after the warmest
 *   whose mean is 20 °C or less and 3 °C under the warmest (Lisbon's Calendário da
 *   Horta Oct–Nov, Gardenate South Africa Mar–Jun). It is lifted in the month after
 *   the first month averaging 18 °C (July in Toronto and Denver, June in Lisbon,
 *   December in Cape Town — the months those calendars give).
 * - Perennials are listed when the place suits them all year: the mean annual
 *   extreme minimum within what the dormant plant takes (`winterMinC`, from the
 *   extension services' zone ratings), the warmest month no more than 3 °C over
 *   the crop's maximum (or its own `maxWarmestMonthC`) and at least its optimum,
 *   a cool enough or warm enough coldest month where the record asks for one, its
 *   winter chill, and one of the climates the record names (`regimes`) where it
 *   names any. Where frost frames the year they are set out in spring only.
 * - Added after the 10 Nov 2026 audit of the Acadian Forest, Northeast Coast and
 *   Southeastern towns (each rule's sources at its constant): an overwinter sowing
 *   goes in two weeks before the average first frost; bulb onions are planted by
 *   day length; tomatoes and sweet potatoes wait for the warm nights and warm soil
 *   their records ask for (`plantMinNightC`, `plantMinSoilC`);
 *   a quick cool-season crop sown in spring must be picked before the heat.
 * - Added after the Day 3 audit (11 Nov 2026) of the Appalachian, Central Hardwoods and Gulf Coast towns: a crop left
 *   standing runs on into winter only from a sowing that comes in as the weather cools (STANDING_*); a crop whose
 *   frost damage ends its season (potato) is held to the frost dates where the typical coldest night reaches that
 *   damage; short-day onions are planted in autumn only where the days never fall below 10 hours; a perennial whose
 *   record plants it at the start of the rains (mango, moringa) is set out then and at no other time.
 * - Added after the Day 4 audit (13 Nov 2026) of the Florida, desert and California towns: where an extension service
 *   publishes a planting calendar for the town's region (src/data/extension-calendars.json), that calendar decides the
 *   sowing windows for the months it covers, and the rules above only fill the months it does not (EXTENSION below).
 *   Brassicas sown as the weather warms are picked before the heat, like the quick cool-season crops.
 */
import EXTENSION_DATA from "@/data/extension-calendars.json";
import type { Crop, CropGrow, Hardiness } from "./crop-types";
import { ALL_CROPS, frostLimits } from "./crops";
import KNOWN_PLACES from "./served-places";
import { monthSpans } from "./regime";
import type { Climate, Regime, RegimeId } from "./types";
import { stationName } from "./zone-label";

/**
 * The extension service's calendar behind a row, for the page to say whose dates they are: the source, the region it
 * gives with the boundary in its own words, the months it decides here, and (for a crop it lists) its row as printed.
 */
export type CalendarSource = {
  /** The region's id in src/data/extension-calendars.json. */
  id: string;
  publisher: string;
  title: string;
  url: string;
  published: string;
  /** The day the source was read (ISO). */
  read: string;
  /** The region and its boundary as the source gives it ("South Florida", "all of Florida below State Road 70"). */
  name: string;
  boundary: string;
  /** The months whose sowings the source decides here; the rest are the model's. */
  covers: number[];
  /** The source's row for this crop and its dates as printed, where it lists the crop. */
  row?: string;
  printed?: string;
};

export type CropFit = {
  crop: Crop;
  /** Months to sow (or plant out) without help. */
  sow: number[];
  /** Months it can go in with regular watering: it would grow into the dry months. */
  watered: number[];
  /** Months to start it in trays, for planting out once it can go in. */
  trays: number[];
  /** Months it comes in. */
  harvest: number[];
  perennial: boolean;
  /** A staple of this climate. */
  staple: boolean;
  /** Sowing months (a subset of sow + watered) made to stand through winter and finish in spring or summer. */
  overwinter: number[];
  /** Plain reasons the calendar reads as it does for this crop here, for hover text and screen readers. */
  why: string[];
  /**
   * The same windows as days of the year (1–365, a 365-day year), for "today": the first and last day a
   * sowing (or planting out) can be made in each month of `sow` and `watered`, and the days trays can be
   * started for those plantings. A span may run below 1 or past 365 (trays in late December for February).
   */
  windows: {
    sow: [number, number][];
    watered: [number, number][];
    trays: [number, number][];
    /**
     * For each sowing month (annuals only): the days it is picked, and the days a sowing of that month is in the
     * ground (its first sowing day to its last picking day). Read by the week's panels (src/lib/forces) so that frost,
     * rain and pollination advice names only crops this calendar has in the ground on the day.
     */
    pick?: [number, number][];
    grown?: [number, number][];
  };
  /** The extension calendar that decides some or all of this row's sowing months, where one is loaded for the town. */
  from?: CalendarSource;
};

/**
 * Fields of crop-grow.json added after the 10 Nov 2026 audit, read here until src/lib/crop-types.ts `CropGrow`
 * carries them (each value's source is in src/data/crop-grow.json `fieldSources`):
 * - `plantMinSoilC`, `plantMinNightC`: the day's mean, and the day's mean night, a transplant or slip is set out at
 *   (sweet potato: soil above 18 °C; tomato: nights above 10 °C; both from the crop records).
 * - `bulbs`: a bulb onion, planted by day length (see BULB_* below).
 * - `regimes`: the only climates (src/lib/regime ids) a perennial is listed in (FAO ECOCROP's climate zones).
 * - `winterAnnualAboveC`: where frost does not frame the year and the warmest month averages over this, the crop is
 *   grown as a winter annual and is not listed as a perennial (strawberry; UF/IFAS).
 * - `frostEndsSeason`: the frost that damages the crop ends its season (potato: "−1 to −2 °C blackens the leaves … it
 *   just ends the season"), so its season is held to the frost dates wherever the typical coldest night reaches its
 *   damage point, not its kill point (FROST_ENDS_SEASON below).
 * - `plantAtRains`: a perennial whose record plants it "at the start of the rains" and names no other time (mango,
 *   moringa); see perennialPlanting.
 */
type Grow = CropGrow & {
  plantMinSoilC?: number;
  plantMinNightC?: number;
  bulbs?: boolean;
  regimes?: string[];
  winterAnnualAboveC?: number;
  /** A perennial that needs hot summers: the warmest month's mean daytime high must reach this (°C). See perennialSuits. */
  hotSummerMaxC?: number;
  frostEndsSeason?: boolean;
  plantAtRains?: boolean;
};

export type CalendarOptions = {
  /** The place's latitude, for day length. Without it the calendar assumes a mid-latitude or tropical place from the climate. */
  lat?: number;
  /**
   * The town (its slug, and its longitude), to find the extension calendar for its region. Without a slug the town is
   * found by its latitude (and longitude, where given) among the known towns, as every caller passes `place.lat`.
   */
  slug?: string;
  lon?: number;
  /** false: the model alone, without any extension calendar (for checking the model against the calendars). */
  extension?: boolean;
};

// ---- extension calendars ------------------------------------------------------------------------------------------
/**
 * The extension services' planting calendars (src/data/extension-calendars.json, every value with its source, page and
 * the day it was read). The Day 4 audit (13 Nov 2026) found the monthly-mean rules invert the subtropical season: at Fort
 * Myers, Fort Lauderdale and Miami warm crops were sown through the summer and refused from November to January, because a
 * month's mean cannot show the summer heat that stops fruit set (UF/IFAS VH021 South Florida: tomatoes, peppers and
 * eggplant Aug–Feb, sweet corn Oct–Mar, watermelon Dec–Mar), and lettuce, radish, spinach, peas and potatoes were cut to
 * a month or missing because their narrow optimum ranges were read against monthly means; Orlando and Tampa got summer
 * tomato and pepper windows; Las Vegas was sown into November (UNR: fall vegetables Aug 10 to Oct 10), Phoenix ran past
 * the University of Arizona's Maricopa cut-offs (kale Aug 15–Dec 15 only), Sacramento's autumn came a month late (UC:
 * August) and San Diego and Los Angeles were given all-year or summer sowings. So where a calendar is published for the
 * town's region, it decides the sowing windows in the months it covers: a crop it lists is sown on its dates, and a crop
 * it does not list is not sown then (`others` "none": the calendar says less, and the model is not trusted where it has
 * been shown to fail). Harvests are still worked out from each crop's days to maturity and the frost dates. Months a
 * calendar does not cover (UNR's checklist is for the autumn, UC Los Angeles's for spring and summer) keep the rules.
 */
type ExtCrop = { row: string; printed: string; sow: [string, string][]; note?: string };
type ExtRegion = { id: string; source: string; name: string; boundary: string; towns: string[]; covers: number[]; others: "none" | "model"; crops: Record<string, ExtCrop> };
type ExtSource = { publisher: string; title: string; url: string; published: string; read: string };
const EXTENSION = EXTENSION_DATA as unknown as { sources: Record<string, ExtSource>; regions: ExtRegion[] };
const REGION_OF_TOWN = new Map<string, ExtRegion>(EXTENSION.regions.flatMap((r) => r.towns.map((s) => [s, r] as const)));
const TOWNS_WITH_CALENDARS = (KNOWN_PLACES as { slug: string; lat: number; lon: number }[]).filter((p) => REGION_OF_TOWN.has(p.slug));

/** The extension calendar region a town lies in, or null. */
export function extensionRegion(opts: CalendarOptions): (ExtRegion & { src: ExtSource }) | null {
  if (opts.extension === false) return null;
  let r: ExtRegion | undefined;
  if (opts.slug) r = REGION_OF_TOWN.get(opts.slug);
  else if (opts.lat != null) {
    const p = TOWNS_WITH_CALENDARS.find((t) => Math.abs(t.lat - opts.lat!) < 1e-6 && (opts.lon == null || Math.abs(t.lon - opts.lon) < 1e-6));
    r = p && REGION_OF_TOWN.get(p.slug);
  }
  return r ? { ...r, src: EXTENSION.sources[r.source] } : null;
}

/** "08-15" → day of the year (a 365-day year). */
const doyOfMonthDay = (md: string) => {
  const [m, d] = md.split("-").map(Number);
  return MONTH_START[m - 1] + Math.min(d, DAYS_IN[m - 1]);
};

/** A source's windows as day spans; one that runs over New Year ends past 365. */
export const extensionSpans = (c: ExtCrop): [number, number][] =>
  c.sow.map(([a, b]) => {
    const from = doyOfMonthDay(a);
    const to = doyOfMonthDay(b);
    return [from, to < from ? to + 365 : to];
  });

/** The first and last day of month m inside any of the spans (days of the year), or null. */
function spansInMonth(spans: [number, number][], m: number): [number, number] | null {
  const s = MONTH_START[m - 1] + 1;
  const e = MONTH_START[m - 1] + DAYS_IN[m - 1];
  let from = Infinity;
  let to = -Infinity;
  for (const [a, b] of spans) {
    for (const k of [0, 365]) {
      const lo = Math.max(a, s + k);
      const hi = Math.min(b, e + k);
      if (lo <= hi) {
        from = Math.min(from, lo - k);
        to = Math.max(to, hi - k);
      }
    }
  }
  return from <= to ? [from, to] : null;
}

/** The page's reference for a row decided (wholly or in part) by a region's calendar. */
const sourceRef = (r: ExtRegion & { src: ExtSource }, c?: ExtCrop): CalendarSource => ({
  id: r.id,
  publisher: r.src.publisher,
  title: r.src.title,
  url: r.src.url,
  published: r.src.published,
  read: r.src.read,
  name: r.name,
  boundary: r.boundary,
  covers: r.covers,
  ...(c ? { row: c.row, printed: c.printed } : {}),
});

/** "Sowing dates for Aug–Dec: University of Nevada, Reno Extension, Fall Gardening Checklist … (Southern Nevada): Roots: Beets, Aug 10 – Oct 10." */
const sourceLine = (r: ExtRegion & { src: ExtSource }, c: ExtCrop) =>
  `Sowing dates${r.covers.length < 12 ? ` for ${monthSpans(r.covers)}` : ""}: ${r.src.publisher}, ${r.src.title}, ${regionWords(r)}: ${c.row}, ${c.printed}.`;

/** "South Florida (all of Florida below State Road 70)", or the boundary alone where it already names the region. */
export const regionWords = (r: { name: string; boundary: string }) => (r.boundary.toLowerCase().startsWith(r.name.toLowerCase()) ? r.boundary : `${r.name} (${r.boundary})`);

type Month = {
  m: number;
  /** Monthly mean, and the late-month mean (this month's and the next's averaged). */
  t: number;
  tLate: number;
  /** Mean night, and the late-month mean night. */
  min: number;
  minLate: number;
  max: number;
  rain: number;
  dry: boolean;
  /** Mean hours of daylight. */
  dayHours: number;
};

type Ctx = {
  months: Month[];
  south: boolean;
  tropical: boolean;
  frostLed: boolean;
  /** Frost-calendar days of the year (from 2 July south of the equator); null where frost is rare. */
  lastFrost: number | null;
  firstFrost: number | null;
  lastFrostLabel: string;
  firstFrostLabel: string;
  extMin: number;
  dryMonths: number[];
  /** The regime's wet months (all twelve where it rains all year), for perennials planted at the start of the rains. */
  wetMonths: number[];
  /** Latitude (degrees, signed) and the longest day of the year there (hours). */
  lat: number;
  longestDay: number;
  /** The regime's id, for perennials that name the climates they are grown in. */
  regimeId: string | null;
  /** Whether transplants and slips wait for their warm-soil and warm-night days (off where that leaves no window: see cropCalendar). */
  warmGate: boolean;
  /** For each day (index doy − 1): daylight of ten hours or more. */
  long: boolean[];
  /** Months whose mean daylight is under ten hours, and under eleven. */
  dark10: number[];
  dark11: number[];
  /** Where the monthly temperatures come from, to follow a figure: " in the ERA5 reanalysis" or " at Portland Intl AP, 9.8 km away". */
  tempsAt: string;
};

const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const DAYS_IN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** The coldest mean night of any growing month. */
const GROWING_NIGHT: Partial<Record<Hardiness, number>> = { tender: 7, "half-hardy": 2 };
/**
 * Crops whose own record names a warmer night than their hardiness class (GROWING_NIGHT): the growing months' mean
 * nights must reach it. Cowpea: "it wants nights above 15 °C" (the site's crop record, src/data/crops.json, frostNote).
 * Day 5 audit, 14 November 2026: cowpeas were sown in June at Grand Forks, International Falls and Laramie, where no
 * extension service lists them (UW Extension: no warm-season crops above 6,500 ft) and July nights average 12–15 °C.
 */
const CROP_NIGHT_C: Record<string, number> = { cowpea: 15 };
/** Fallback for a perennial record without `winterMinC`: the coldest month's mean night it takes. */
const PERENNIAL_NIGHT: Record<Hardiness, number> = { tender: 4, "half-hardy": 2, hardy: -4, "very-hardy": -12 };
/**
 * Days past the average first frost by which a sowing (with its picking period) must be
 * finished: tender crops two weeks before it (Virginia Tech's frost-tender factor); hardy
 * crops take the light frosts of the next fortnight (HARDINESS in src/lib/crops.ts: "takes
 * −4 to −6 °C"); very hardy crops ("takes −8 °C and below; overwinters") take the month after
 * it, by which the hard freezes have arrived where the winter brings them (HARD_FREEZE_C): the
 * 5 Nov 2026 audit found kale, spinach and Brussels sprouts offered for November sowing in
 * Oklahoma City and Dallas, two to three months past the OSU and AgriLife dates, because
 * nothing cut them off.
 */
const FROST_ALLOWANCE: Record<Hardiness, number> = { tender: -14, "half-hardy": 0, hardy: 14, "very-hardy": 28 };
/**
 * A winter whose typical coldest night reaches this ends the season for every annual, however hardy:
 * the frost allowance above applies once the mean annual extreme minimum is at or under the crop's
 * kill temperature or this, whichever is warmer. Without it a kale (killed at −15 °C) in a −12 °C
 * winter had no autumn cut-off at all.
 */
const HARD_FREEZE_C = -5;
/**
 * Growing days an overwinter sowing needs before its first dormant month: a plant that goes into
 * winter smaller than this is lost, not overwintered (UMass on overwintering spinach: sow in
 * September so plants are established before hard frost; RHS: autumn-sown onions and broad beans
 * go in from October for roots before winter).
 */
const ESTABLISH_DAYS = 28;
/** The most months an overwinter crop sits dormant. */
const MAX_DORMANT = 5;
/** Hardy crops are not sown into a month whose mean night is below this: the ground is frozen or unworkable. */
const SOW_NIGHT_HARDY = -1;
/** A sowing may finish in a month under its minimum if it needs no more than this many days of it. */
const COLD_FINISH_DAYS = 10;
/**
 * The most short days (under ten hours) a sowing may wait out unless it is an overwinter
 * crop: three months covers a Mediterranean winter (Lisbon's runs 16 Nov–22 Jan, Rome's
 * about 82 days), not an oceanic northern one (London's 28 Oct–13 Feb, 108 days) — so a
 * kale or sprout plant set out in a London October is not shown as a sowing.
 */
const MAX_STALL_DAYS = 90;
/** Days after the average last frost before a tender crop goes out (RHS; the crop records). */
const AFTER_LAST_FROST = 7;
/**
 * Days before the average last frost that a crop which does not overwinter may first go out: Just Food
 * Ottawa's guide ("brassica transplants no more than 3 weeks before the last frost") and Seeds of Diversity
 * ("cold-tolerant crops 3–4 weeks before"); the shorter of the two, since this bounds the earliest harvest.
 */
const BEFORE_LAST_FROST = 21;
/**
 * Days before the average last frost that a very hardy crop, or one that overwinters, may first go
 * out ("as soon as the soil can be worked": Seeds of Diversity's 3–4 weeks for the cold-tolerant
 * crops; the longer figure, since these take −8 °C and below). Before this fix an overwinter crop
 * had no gate at all, and Fargo, Winnipeg and Quebec City were given 1 April sowings of spinach and
 * onions into ground still frozen.
 */
const BEFORE_LAST_FROST_VERY_HARDY = 28;
/**
 * A month whose mean daytime high is under 0 °C has frozen ground and snow: nothing is lifted from it. The
 * City of Ottawa's frost advisory puts the start of continuously sub-zero daytime highs at the first week of
 * December, and Ottawa's December mean high is −0.8 °C.
 */
const GROUND_FROZEN_MAX_C = 0;
/** The most months after the first frost that a crop left standing is counted as lifted. */
const STANDING_MONTHS = 6;
/** The short-day factor added to autumn-maturing sowings (Maryland, Virginia Tech). */
const SHORT_DAY_FACTOR = 14;
/** The picking period kept clear of frost for crops picked over weeks (Virginia Tech: "add the average harvest period"). */
const PICK_DAYS = 28;
/** Daylight under which growth all but stops (Coleman; Maryland). */
const PERSEPHONE_HOURS = 10;
/**
 * Warm-season crops are not grown through a month of under eleven hours' daylight (Lisbon's and Cape Town's autumn
 * tomatoes, which no calendar there lists). Where even the shortest day is ten hours or more, the days never fall into the
 * short days under which growth all but stops (PERSEPHONE_HOURS; University of Maryland: "very limited when daylight drops
 * below 10 hours"), and only a short-day month that is also under the crop's optimum stops them. The Day 3 audit (11 Nov
 * 2026) found the rule removing the fall tomatoes and squash of the Rio Grande Valley (shortest day 10.5 hours; November and
 * December average 22 and 19 °C): Texas A&M AgriLife's Rio Grande Valley Homeowner
 * Vegetable Guide (https://agrilifeextension.tamu.edu/wp-content/uploads/2025/08/RGV-Homeowner-Vegetable-Guide-2022.pdf,
 * read 11 Nov 2026) sets out tomatoes mid-September to mid-October and summer squash late August to mid-September, and
 * AgriLife's fall guide (https://agrilifeextension.tamu.edu/wp-content/uploads/2023/09/fall-vegetable-gardening-guide-texas.pdf,
 * read 11 Nov 2026) plants tomatoes to Aug 1 and summer squash to Oct 10 in its region V.
 */
const WARM_SEASON_HOURS = 11;
/**
 * A month averaging under this no longer grows garlic roots: the planting window has closed before it
 * (Toronto Master Gardeners: 4–6 weeks before the soil freezes; OMAFRA: "plant in the fall, two to
 * three weeks before the ground freezes"). It was 5 °C, which closed the window a month early in
 * Vermont, New Hampshire and Wisconsin while their extension services said plant now (5 Nov 2026 audit).
 */
const GARLIC_COLD_C = 2;
/** A hardy perennial is not set out in a month averaging under this: the soil has gone cold for roots. */
const PERENNIAL_SOIL_COLD_C = 5;
/** Mild climates plant garlic as the heat breaks: a month at or under this and 3 °C under the warmest. */
const GARLIC_PLANT_C = 21;
/** The planting window is this many months, ending with the last month the cloves can still root. */
const GARLIC_WINDOW_MONTHS = 2;
/** Garlic is lifted in the first month at or over this. */
const GARLIC_HARVEST_C = 18;
/**
 * An overwinter sowing (one that stands through winter) goes in at least this many days before the average first
 * frost, so the plants have rooted before the frosts. The 10 Nov 2026 audit found spinach "to stand through winter"
 * offered Nov–Dec at Richmond and Oct–Dec at Washington, and onions Aug–Dec ("sow now" on 10 Nov) at Atlanta: the
 * frost test skipped overwintered sowings, so nothing closed them in autumn. Virginia Tech SPES-673P, Virginia's home
 * garden planting guide (https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/426/426-331/SPES-673.pdf, read
 * 11 Nov 2026), ends fall spinach on Oct 10 in zone 7a, Oct 20 in 7b and Nov 1 in 8a/8b, about two weeks before each
 * zone's first frost; UGA Circular 943, Vegetable Garden Calendar (https://fieldreport.caes.uga.edu/publications/C943/
 * vegetable-garden-calendar, read 11 Nov 2026), plants onions September–October in middle Georgia and about two weeks
 * earlier in the north.
 */
const OVERWINTER_SOW_BEFORE_FIRST_FROST = 14;
/**
 * Where frost is dated but does not frame the year (of the served towns, Seattle, Portland, Vancouver, Victoria and
 * Nanaimo grow these crops), broad beans and peas to stand through winter go in late: WSU Snohomish County Extension, "Fall
 * and Winter Vegetable Gardens for Western Washington" (https://extension.wsu.edu/snohomish/fall-and-winter-vegetable-
 * gardens-for-western-washington, read 14 Nov 2026): fava "the second week of November for June harvest", peas "in early
 * November for an early June crop". The Day 5 audit (14 November 2026) found fava "to stand through winter" Aug–Sep and
 * peas Sep–Oct at Seattle, whose first frost is Nov 17. Earliest day: six weeks before the first frost; the latest stays
 * two weeks before it (OVERWINTER_SOW_BEFORE_FIRST_FROST), a little earlier than WSU's dates.
 */
const OVERWINTER_MILD_EARLIEST = 42;
/** The crops WSU's page times for overwintering; other crops keep their windows until a source for them is read. */
const OVERWINTER_LATE_CROPS = ["broad-bean", "peas"];
/**
 * Bulb onions bulb when the days reach a set length, whatever the planting date (NC State, Bulb Onions,
 * https://content.ces.ncsu.edu/bulb-onions, read 11 Nov 2026: short-day types at about 10–12 hours, intermediate 12–14,
 * long-day 14–16). The 10 Nov 2026 audit found onions planted Mar–Jun and lifted to November in New York, Philadelphia,
 * Washington and Baltimore; Virginia Tech SPES-673P plants bulbing onions in spring only, to May 1 in zone 7a and May 10
 * in zones 6a–6b, and "not recommended" in autumn.
 * - Where the longest day reaches BULB_SHORT_DAY_ZONE_H (north of about 35°), a planting made while the days lengthen
 *   goes in no later than BULB_LONG_DAY_LEAD days before the longest day: May 10, Virginia Tech's latest date.
 * - Where it does not (Georgia and Florida; NC State puts short-day types in eastern North Carolina), a planting made
 *   while the days lengthen goes in before they reach BULB_SHORT_DAY_H hours, the middle of the short-day range (NC
 *   State's late-winter sowings in eastern North Carolina run to Feb 25, when the day there is about 11 hours). Autumn
 *   plantings are the main crop there: UGA C943 plants onions September–October, and UF/IFAS's Fall Vegetable Planting
 *   Guide for North Florida (https://sfyl.ifas.ufl.edu/media/sfylifasufledu/baker/docs/pdf/horticulture/
 *   FallVegetablePlantingGuideforNorthFlorida.pdf, read 11 Nov 2026) bulbing onions September–December.
 * Not applied in the tropics, where the days barely change.
 */
const BULB_SHORT_DAY_ZONE_H = 14.5;
const BULB_LONG_DAY_LEAD = 42;
const BULB_SHORT_DAY_H = 11;
/**
 * Where even the shortest day is this long, the days never leave the 10–12 hours at which short-day onions start to bulb
 * (NC State, above), so a planting made after the shortest day bulbs before it has grown: onions go in in autumn only.
 * The Day 3 audit (11 Nov 2026) found plantings to mid-February at Brownsville (26° N, shortest day 10.5 h); every source
 * for these latitudes plants in autumn: the Rio Grande Valley guide (bulbing onions mid-October to mid-December; 1015Y,
 * "approximately 150 days to be ready", not after the end of October), AgriLife's fall guide (onion seed to Dec 1 in region
 * IV, Dec 15 in region V), LSU AgCenter (sets "until early December": Dan Gill, "It's time to start cool-season vegetable
 * gardening", 5 Sep 2014, https://apps.lsuagcenter.com/news_archive/2014/September/get-it-growing/Its-time-to-start-coolseason-vegetable-gardening-.htm,
 * read 11 Nov 2026) and UF/IFAS North Florida (September–December). Houston, New Orleans, Jacksonville, Austin, San Antonio
 * and the Florida towns lie south of it; Dallas (9.99 h), Atlanta and Little Rock keep their late-winter plantings.
 */
const BULB_SHORT_DAY_MIN_H = 10;
/**
 * A quick cool-season crop (minimum under 10 °C, picked within QUICK_DAYS of sowing: beet, turnip, radish, kale, chard,
 * lettuce, spinach, rocket, dill, coriander) sown as the weather warms must be first picked before the daily mean
 * passes the top of its optimum range by this much. The 10 Nov 2026 audit found kale and beets sown into May at Richmond
 * and Washington (and turnips at Washington) where Virginia Tech SPES-673P (zone 7b) ends kale on Apr 10, beets on Apr 20
 * and turnips on Apr 10, and kale into April at Jacksonville where UF/IFAS North Florida's fall guide ends it in February.
 * Two degrees over the optimum (the margin the growth test already allows under it) puts the last spring kale sowing at
 * Richmond on about Apr 13, turnips Apr 10, beets Apr 13 and spinach Apr 6, within a few days of Virginia Tech's dates.
 * The longer crops (peas, carrots, cabbages, broccoli, leeks, parsnips, potatoes) run into the summer and are held by
 * their own maximum, as before: with peas in, nine towns (Fargo, Denver and Oklahoma City among them) lost their spring
 * peas altogether.
 */
const HEAT_MARGIN_C = 2;
const QUICK_DAYS = 60;
/**
 * A crop left standing (`stands`: carrot, cabbage, kale, leek, rutabaga) is held in the ground into winter only from a
 * sowing that comes in as the weather cools: one whose first picking falls after the warmest point of the year, on a day
 * no more than HEAT_MARGIN_C over the top of the crop's optimum range (the margin the quick cool-season crops are held to
 * in spring). So a cabbage set out in late May matures into a cooling August at Fargo and Concord and stands to October,
 * as before, while at Pittsburgh (22.5 °C on the day) it does not. A rutabaga sown in May, the only month the calendar gives
 * it in most northern towns, matures in early August over 20 °C and is no longer shown standing to October (75 towns). The Day 3 audit (11 Nov 2026) found cabbage sown Mar–May shown
 * harvested from June right through the winter at Pittsburgh, Columbus, Indianapolis, Nashville and St. Louis, and spring
 * carrots at St. Louis picked May to February. The extension calendars it cites give these crops a spring planting and a
 * separate late-summer one, and the winter harvest is the late one's: University of Missouri Extension G6201
 * (https://extension.missouri.edu/publications/g6201/3), cabbage Mar 20–Apr 20 and Jul 20–Aug 5, carrots Mar 15–Apr 5
 * and Jul 25–30 in central Missouri; University of Tennessee W346-B (https://uthort.tennessee.edu/wp-content/uploads/
 * sites/228/2023/11/W346-B.pdf), fall cabbage Aug 1–Sep 1. A head cut in early summer is not left to stand through the
 * heat to winter. Crops picked only after frost (`harvestAfterFrost`: parsnips, Brussels sprouts) are sown in spring to
 * stand, and keep their standing harvest.
 */
const standsFromSowing = (crop: Crop, ctx: Ctx, d1: number) =>
  !!crop.grow?.harvestAfterFrost || (meanOn(ctx.months, d1 + 15) < meanOn(ctx.months, d1 - 15) && meanOn(ctx.months, d1) <= crop.grow!.temp[2] + HEAT_MARGIN_C);
/**
 * The night that ends a crop's season: its kill point, or for a crop whose frost damage ends the season (`frostEndsSeason`)
 * its damage point. The Day 3 audit (11 Nov 2026) found potatoes offered for planting in November at Houston and New
 * Orleans, whose typical coldest nights (−2.0 and −1.6 °C) are above the half-hardy kill point (−3 °C), so no frost date
 * held them: LSU AgCenter plants fall potatoes in September (Dan Gill, 5 Sep 2014, above) and AgriLife's fall guide by Oct 1
 * in region IV ("the duration of these crops depends on the date of the first killing frost"). The potato record says
 * −1 to −2 °C blackens the tops and ends the season, so the potato is held to the frost dates from −1 °C.
 */
const seasonEndsC = (crop: Crop) => ((crop.grow as Grow | undefined)?.frostEndsSeason ? frostLimits(crop).damageC : frostLimits(crop).deadC);

/** Day of the year in the place's frost calendar (from 2 July south of the equator). */
const frostDoy = (doy: number, south: boolean) => (south ? ((doy - 184 + 365) % 365) + 1 : doy);
const wrapDoy = (d: number) => ((((d - 1) % 365) + 365) % 365) + 1;
const monthOfDoy = (doy: number) => {
  const d = wrapDoy(doy);
  let m = 11;
  while (m > 0 && MONTH_START[m] >= d) m--;
  return m + 1;
};

/** Calendar day of the year of a day in the frost calendar (the inverse of frostDoy). */
const calDoy = (fd: number, south: boolean) => (south ? ((fd + 182) % 365) + 1 : wrapDoy(fd));

/** The day of a northern year matching a day (so the longest day is day 172 north and south of the equator). */
const northDoy = (doy: number, south: boolean) => (south ? wrapDoy(doy - 182) : wrapDoy(doy));

/** The mean temperature (or, with `key` "min", the mean night) on a day of the year, read between the monthly means (each taken at mid-month). */
function meanOn(months: Month[], doy: number, key: "t" | "min" = "t"): number {
  const d = wrapDoy(doy);
  const mid = (i: number) => MONTH_START[i] + DAYS_IN[i] / 2;
  let i = 11;
  while (i > 0 && mid(i) > d) i--;
  if (mid(i) > d) i = 11;
  const j = (i + 1) % 12;
  const a = mid(i);
  const span = (mid(j) - a + 365) % 365;
  const k = (((d - a + 365) % 365) / span);
  return months[i][key] + (months[j][key] - months[i][key]) * k;
}

/**
 * Whether a bulb onion may be planted on this day (see BULB_* above): a planting while the days lengthen (after the
 * shortest day, up to the longest) must come six weeks before the longest day where long-day types are grown, and
 * before the day reaches eleven hours where short-day types are.
 */
/** The shortest day of the year at the place (hours). */
const shortestDay = (ctx: Ctx) => dayLengthHours(Math.abs(ctx.lat), 355);

function bulbPlantingOpen(ctx: Ctx, doy: number): boolean {
  if (ctx.tropical) return true;
  const nd = northDoy(doy, ctx.south);
  const lengthening = nd <= 172 || nd >= 356;
  if (!lengthening) return true;
  if (ctx.longestDay >= BULB_SHORT_DAY_ZONE_H) return nd >= 356 || nd <= 172 - BULB_LONG_DAY_LEAD;
  if (shortestDay(ctx) >= BULB_SHORT_DAY_MIN_H) return false;
  if (nd >= 356) return true;
  return dayLengthHours(Math.abs(ctx.lat), nd) < BULB_SHORT_DAY_H;
}

/**
 * The frost-calendar day before which a crop is not sown or planted out, or null where frost does not frame
 * its year: a week after the average last frost for a tender crop, four weeks before it for a very hardy
 * crop or one that overwinters, three weeks before it for the rest.
 */
function sowGate(crop: Crop, ctx: Ctx): number | null {
  if (ctx.lastFrost == null || ctx.firstFrost == null) return null;
  if (ctx.extMin > seasonEndsC(crop)) return null;
  if (crop.hardiness === "tender") return ctx.lastFrost + AFTER_LAST_FROST;
  if (crop.hardiness === "very-hardy" || crop.grow?.overwinter) return ctx.lastFrost - BEFORE_LAST_FROST_VERY_HARDY;
  return ctx.lastFrost - BEFORE_LAST_FROST;
}

/**
 * Frost ends the season for this crop here: dated frosts, and a typical coldest night that reaches what kills
 * the crop or a hard freeze (HARD_FREEZE_C), whichever is warmer. Phoenix's light December frosts do not stop
 * its winter lettuce, and London's do not stop its kale; Oklahoma City's −12 °C does stop its kale.
 */
const frostMatters = (crop: Crop, ctx: Ctx) =>
  ctx.firstFrost != null && ctx.lastFrost != null && ctx.extMin <= Math.max(seasonEndsC(crop), HARD_FREEZE_C);

/**
 * The days of month m (day of the year) on which the gate is open: [first open day, last day of the month], or null.
 * `warm`, where given, must also hold on the first open day (the warm-soil test for transplants and slips).
 */
function openRange(gate: number | null, south: boolean, m: number, warm?: (d: number) => boolean): [number, number] | null {
  const start = MONTH_START[m - 1] + 1;
  const end = MONTH_START[m - 1] + DAYS_IN[m - 1];
  for (let d = start; d <= end; d++) if ((gate == null || frostDoy(d, south) >= gate) && (!warm || warm(d))) return [d, end];
  return null;
}

/** Is a day of the year inside any of these spans (which may run below 1 or past 365)? */
export const inSpans = (spans: [number, number][], doy: number) =>
  spans.some(([a, b]) => (doy >= a && doy <= b) || (doy + 365 >= a && doy + 365 <= b) || (doy - 365 >= a && doy - 365 <= b));

/** Day of the year (a 365-day year, 29 February counted as the 28th) of an ISO date, "2026-11-02" → 306. */
export function doyOfIso(iso: string): number {
  const [, m, d] = iso.split("-").map(Number);
  return MONTH_START[m - 1] + Math.min(d, DAYS_IN[m - 1]);
}

/** "Apr 19" for a day of the year. */
export function doyLabel(doy: number): string {
  const d = wrapDoy(doy);
  const m = monthOfDoy(d);
  return `${SHORT[m - 1]} ${d - MONTH_START[m - 1]}`;
}

/**
 * Hours of daylight (sunrise to sunset) at a latitude on a day of the year: the sunrise
 * equation at the standard 90.833° zenith (refraction and the sun's disc) with Cooper's
 * declination. London reads ten hours on 28 October and 13 February, as the tables do.
 */
export function dayLengthHours(lat: number, doy: number): number {
  const rad = Math.PI / 180;
  const decl = rad * 23.44 * Math.sin(rad * (360 / 365) * (284 + doy));
  const phi = rad * lat;
  const x = (Math.cos(rad * 90.833) - Math.sin(phi) * Math.sin(decl)) / (Math.cos(phi) * Math.cos(decl));
  if (x <= -1) return 24;
  if (x >= 1) return 0;
  return (2 * Math.acos(x)) / rad / 15;
}

const means = (c: Climate) => c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
/** "−22 °C": a rounded temperature with a true minus sign. */
const deg = (t: number) => `${Math.round(t) < 0 ? "−" : ""}${Math.abs(Math.round(t))} °C`;

/**
 * Without a latitude, read the climate: a place whose coldest month is 18 °C or more, or
 * whose year swings less than 5 °C, is treated as tropical (no day-length limits); the rest
 * as mid-latitude (45°), which reads the winter stall right for the temperate towns.
 */
function guessLat(c: Climate): number {
  const t = means(c);
  const coldest = Math.min(...t);
  const range = Math.max(...t) - coldest;
  const tropical = coldest >= 18 || range < 5;
  return (c.south ? -1 : 1) * (tropical ? 10 : 45);
}

function contextOf(c: Climate, regime: Regime | null, opts: CalendarOptions): Ctx {
  const lat = opts.lat ?? (regime as { lat?: number } | null)?.lat ?? guessLat(c);
  const south = c.south ?? lat < 0;
  const dry = new Set(regime?.dryMonths ?? []);
  const t = means(c);
  const long: boolean[] = [];
  const hoursByMonth = new Array(12).fill(0) as number[];
  for (let d = 1; d <= 365; d++) {
    const h = dayLengthHours(lat, d);
    long.push(h >= PERSEPHONE_HOURS);
    hoursByMonth[monthOfDoy(d) - 1] += h;
  }
  const months: Month[] = c.monthlyMeanMax.map((max, i) => {
    const j = (i + 1) % 12;
    return {
      m: i + 1,
      t: t[i],
      tLate: (t[i] + t[j]) / 2,
      min: c.monthlyMeanMin[i],
      minLate: (c.monthlyMeanMin[i] + c.monthlyMeanMin[j]) / 2,
      max,
      rain: c.monthlyRainMm?.[i] ?? 0,
      dry: dry.has(i + 1),
      dayHours: hoursByMonth[i] / DAYS_IN[i],
    };
  });
  // Frost dates count only as a pair: a place with one "Rare" is read as frost-free (the frost record requires both or neither).
  const dated =
    c.frostSource !== ("none" as string) &&
    c.lastSpringFrost !== "Rare" &&
    c.firstFallFrost !== "Rare" &&
    c.lastSpringFrostDoy > 0 &&
    c.firstFallFrostDoy > 0 &&
    // 366 is the "no first frost" sentinel; a first frost after New Year is stored past 365 (Day 5 audit, 14 November
    // 2026: NOAA puts New Orleans' first frost on 2 January, doy 367, and Jacksonville's on 5 January, doy 370; read as
    // frost-free, New Orleans was told to sow potatoes Oct–Jan).
    c.firstFallFrostDoy !== 366 &&
    c.firstFallFrostDoy > c.lastSpringFrostDoy;
  return {
    months,
    south,
    lat,
    longestDay: dayLengthHours(Math.abs(lat), 172),
    regimeId: regime?.id ?? null,
    warmGate: true,
    tropical: Math.abs(lat) < 23.5,
    frostLed: regime ? regime.frostLed : c.frostFreeDays < 300,
    lastFrost: dated ? c.lastSpringFrostDoy : null,
    firstFrost: dated ? c.firstFallFrostDoy : null,
    lastFrostLabel: c.lastSpringFrost,
    firstFrostLabel: c.firstFallFrost,
    extMin: c.meanAnnualExtremeMinC,
    dryMonths: regime?.dryMonths ?? [],
    wetMonths: regime?.wetMonths ?? [],
    long,
    dark10: months.filter((m) => m.dayHours < PERSEPHONE_HOURS).map((m) => m.m),
    dark11: months.filter((m) => m.dayHours < WARM_SEASON_HOURS).map((m) => m.m),
    tempsAt: tempsAt(c),
  };
}

/** Whether a day of the year falls in the autumn quarter, when the short-day factor applies. */
const inAutumn = (doy: number, south: boolean) => {
  const d = wrapDoy(doy);
  return south ? d >= 60 && d <= 181 : d >= 244;
};

/** A quick cool-season crop: minimum under 10 °C, picked within QUICK_DAYS of sowing; not a bulb onion (day length decides it). */
const quickCool = (crop: Crop) => {
  const g = crop.grow as Grow;
  return g.temp[0] < 10 && g.days <= QUICK_DAYS && !g.bulbs && g.start !== "perennial";
};

/**
 * Crops held to the spring heat stop (HEAT_MARGIN_C): the quick cool-season crops, and the brassicas (broccoli, cabbage,
 * cauliflower), which run past QUICK_DAYS but bolt or button in the heat just the same. The Day 4 audit (13 Nov 2026)
 * found broccoli, cabbage and cauliflower sown Sep–Jun at San Diego and to February or March at Phoenix, because their
 * 70–80 days kept them out of the rule: UC Master Gardeners of San Diego County set brassica plants out Sep–Feb and sow
 * seed Aug–Dec, with no spring or summer sowing; the University of Arizona's Maricopa calendar plants them in January only
 * in spring; UF/IFAS VH021 ends them in February (North and Central) and January (South). All read 13 Nov 2026. Brussels
 * sprouts, sown in spring to be picked after frost (`harvestAfterFrost`), keep their spring sowing. Only where frost does
 * not frame the year: there nothing else bounds a spring sowing but the crop's maximum. Where it does, the frost gate puts
 * spring brassicas out early enough for the early-summer cut the extension calendars give (University of Missouri G6201:
 * cabbage Mar 20–Apr 20 in central Missouri; Virginia Tech SPES-673P: spring cabbage to Apr 10 in zone 7b), and the stop
 * took cabbage or cauliflower out of 30 frost-led towns, Richmond, Nashville and Denver among them, when tried. Nor where a
 * frost gate holds the spring sowing (sowGate): that gate is the date the rules give, and the stop took Austin's and San
 * Antonio's only cauliflower window when tried.
 */
const heatStopped = (crop: Crop, ctx: Ctx) =>
  quickCool(crop) || (!ctx.frostLed && crop.group === "brassica" && !crop.grow?.harvestAfterFrost && sowGate(crop, ctx) == null);

/** Crops picked over weeks rather than cut once: their picking period is kept clear of frost. */
const pickedOverWeeks = (crop: Crop) =>
  (crop.hardiness === "tender" || crop.hardiness === "half-hardy") && ["fruiting", "squash", "legume", "herb"].includes(crop.group);

/** Months in trays before planting out. */
export const trayLead = (g: { nurseryWeeks?: number }) => Math.max(1, Math.ceil((g.nurseryWeeks ?? 6) / 4.33));

type Sowing = {
  /** The months the sowing grows in (those it sits in for ten days or more, and the harvest month). */
  grow: number[];
  /** The months it actively grew in for ten days or more: the ones that decide whether it needs watering. */
  active: number[];
  /** The month it comes in. */
  harvest: number;
  /** It sat dormant through a cold spell. */
  overwintered: boolean;
  /** The day it was sown (day of the year) and the first day it can be picked; past 365 runs into the next year. */
  d0: number;
  d1: number;
};

/** One sowing month of an annual: the months it grows in and when it comes in, or null when it would fail. */
function trySowing(crop: Crop, ctx: Ctx, m: number, startDay?: number): Sowing | null {
  const g = crop.grow! as Grow;
  const [lo, optLo, optHi, hi] = g.temp;
  const { months } = ctx;
  const mo = months[m - 1];
  const classNight = GROWING_NIGHT[crop.hardiness];
  const cropNight = CROP_NIGHT_C[crop.slug];
  const night = cropNight != null && (classNight == null || cropNight > classNight) ? cropNight : classNight;

  // The sowing (or planting-out) month, read at its late-month mean; a transplant goes out as a
  // plant, so its month may average 3 °C under the minimum as long as the late month is within 1 °C.
  if (mo.tLate < lo - 1 || mo.tLate > optHi + 1 || mo.t < lo - 3) return null;
  if (g.sowMinSoilC != null && mo.tLate < g.sowMinSoilC) return null;
  // Nothing but an overwinter crop is sown into a month of short days that is also cool for the
  // crop (under its optimum): it would not grow until spring.
  if (!g.overwinter && mo.dayHours < PERSEPHONE_HOURS && mo.t < optLo) return null;
  // Nights: tender and half-hardy crops by their growing-night limit; hardy crops are not sown
  // into a month whose nights average below −1 °C — the ground is frozen or unworkable
  // ("as soon as the soil can be worked": Toronto and Denver calendars start in April).
  if (night != null ? mo.minLate < night : mo.min < SOW_NIGHT_HARDY) return null;

  const frosty = frostMatters(crop, ctx);

  // The earliest day it can go out (a week after the average last frost for a tender crop, four weeks
  // before it for a very hardy or overwinter crop, three weeks before it for the rest): the sowing is made
  // on the first open day of the month, or on `startDay` (the last day of the window is found by trying later days).
  // A transplant or slip goes out once the day is warm enough by its own record: the day's mean (read between the
  // monthly means; the soil at planting depth tracks it) at `plantMinSoilC`, the day's mean night at `plantMinNightC`.
  // Added after the 10 Nov 2026 audit: tomatoes went out in March at Atlanta, and sweet potatoes from February at
  // Jacksonville, March at Savannah and April at Atlanta, on the last frost alone. The tomato record says "once nights
  // hold above 10 °C", which puts Atlanta on Apr 8 (UGA C943: April in middle Georgia, one to three weeks later further
  // north), Richmond on Apr 18 and Washington on Apr 27 (Virginia Tech SPES-673P: Apr 10 in 7b, Apr 20 in 7a), Boston on
  // May 16 and Halifax on Jun 7. The sweet potato record says "once the soil holds above 18 °C", which puts Atlanta on
  // Apr 25, Savannah on Mar 30 and Jacksonville on Mar 12 (UGA C1014 waits for 70 °F soil: early May in middle and north
  // Georgia, mid-April in the south; UF/IFAS North Florida plants them March–June).
  const warm =
    ctx.warmGate && (g.plantMinSoilC != null || g.plantMinNightC != null)
      ? (d: number) => (g.plantMinSoilC == null || meanOn(months, d) >= g.plantMinSoilC) && (g.plantMinNightC == null || meanOn(months, d, "min") >= g.plantMinNightC)
      : undefined;
  const open = openRange(sowGate(crop, ctx), ctx.south, m, warm);
  if (!open) return null;
  const d0 = Math.min(Math.max(startDay ?? open[0], open[0]), open[1]);
  if (warm && !warm(d0)) return null;
  if (g.bulbs && !bulbPlantingOpen(ctx, d0)) return null;

  // Growing days needed: the crop's own, plus the short-day factor for a sowing that would mature in autumn.
  let need = g.days;
  if (!ctx.tropical && inAutumn(d0 + g.days, ctx.south)) need += SHORT_DAY_FACTOR;

  const grow: number[] = [];
  /** The months it actively grew in (ten days or more with growing weather and long enough days). */
  const active: number[] = [];
  let acc = 0;
  let dormant = 0;
  let stalled = false;
  let stallDays = 0;
  /** Growing days the sowing had before its first month without growth, dormant or stalled (−1 when it never stopped). */
  let established = -1;
  let d1 = -1;
  for (let step = 0; step < 15 && d1 < 0; step++) {
    const idx = m - 1 + step;
    const i = idx % 12;
    const mon = months[i];
    if (step > 0 && mon.t > hi) return null;
    const segStart = step === 0 ? d0 : MONTH_START[i] + 1 + 365 * Math.floor(idx / 12);
    const segEnd = MONTH_START[i] + DAYS_IN[i] + 365 * Math.floor(idx / 12);
    const growing = step === 0 || mon.t >= lo;
    // Days the crop sits in this month, and the growing days among them, until it is ready: a day
    // grows the crop when it is long enough (ten hours) or the month is within the crop's optimum.
    const limit = growing ? segEnd : Math.min(segEnd, segStart + COLD_FINISH_DAYS - 1);
    const warm = mon.t >= optLo;
    let sat = 0;
    let lit = 0;
    for (let d = segStart; d <= limit; d++) {
      sat++;
      if (warm || ctx.long[wrapDoy(d) - 1]) lit++;
      if (acc + lit >= need) {
        // The sowing day is the first growing day, so the crop is ready the day after the last one (sown + days).
        d1 = d + 1;
        break;
      }
    }
    if (!growing && d1 < 0) {
      // A month under the crop's minimum: only an overwinter crop sits it out, where winter allows.
      if (!g.overwinter || ctx.extMin < (g.overwinterMinC ?? 0) || dormant >= MAX_DORMANT) return null;
      if (established < 0) established = acc;
      dormant++;
      continue;
    }
    // A month that grew the crop not at all (short days and cool): the plant stands as it was.
    if (lit === 0 && established < 0) established = acc;
    acc += lit;
    stallDays += sat - lit;
    if (growing && lit === 0) stalled = true;
    if (step === 0 || sat >= 10 || d1 > 0) grow.push(mon.m);
    if (growing && (step === 0 || (sat >= 10 && lit > 0))) active.push(mon.m);
  }
  if (d1 < 0) return null;
  if (!g.overwinter && stallDays > MAX_STALL_DAYS) return null;
  // It stood through winter: a dormant spell, or (for an overwinter crop) a month with no growing days.
  const overwintered = dormant > 0 || (!!g.overwinter && stalled);
  // A sowing that reached its dormant month with under four weeks of growth is lost to the winter, not overwintered.
  if (overwintered && established >= 0 && established < ESTABLISH_DAYS) return null;

  // At least half the months it actively grew in (one, for a short crop) within 2 °C of its optimum
  // range; the harvest month counts towards that even when the crop is in it only briefly.
  const good = grow.filter((mm) => {
    const t = months[mm - 1].t;
    return t >= optLo - 2 && t <= optHi;
  }).length;
  if (good < Math.max(1, Math.floor(active.length / 2))) return null;
  if (night != null && grow.slice(1).some((mm) => months[mm - 1].min < night)) return null;
  const darkLimits = (mm: number) => months[mm - 1].dayHours < WARM_SEASON_HOURS && (shortestDay(ctx) < PERSEPHONE_HOURS || months[mm - 1].t < optLo);
  if (lo >= 12 && grow.some(darkLimits)) return null;

  // A quick cool-season crop sown as the weather warms is picked before the heat (HEAT_MARGIN_C).
  if (heatStopped(crop, ctx) && !ctx.tropical && !overwintered && meanOn(months, d1 + 15) > meanOn(months, d1 - 15) && meanOn(months, d1) > optHi + HEAT_MARGIN_C) return null;

  // Frost: the sowing, with its picking period, must be finished within the crop's allowance of
  // the first frost, where the winter reaches what kills the crop or a hard freeze (frostMatters).
  if (frosty && ctx.firstFrost != null && !overwintered) {
    const f0 = frostDoy(d0, ctx.south);
    const f1 = f0 + (d1 - d0) + (pickedOverWeeks(crop) ? PICK_DAYS : 0);
    if (f1 > ctx.firstFrost + FROST_ALLOWANCE[crop.hardiness]) return null;
  }
  // A sowing that stands through winter goes in two weeks before the average first frost (OVERWINTER_SOW_BEFORE_FIRST_FROST).
  if (frosty && ctx.firstFrost != null && overwintered && frostDoy(d0, ctx.south) > ctx.firstFrost - OVERWINTER_SOW_BEFORE_FIRST_FROST) return null;
  // Where frost is dated but does not frame the year, broad beans and peas to stand through winter go in no earlier than
  // OVERWINTER_MILD_EARLIEST days before the first frost (WSU, at the constant).
  if (
    OVERWINTER_LATE_CROPS.includes(crop.slug) &&
    !ctx.frostLed &&
    ctx.firstFrost != null &&
    overwintered &&
    frostDoy(d0, ctx.south) < ctx.firstFrost - OVERWINTER_MILD_EARLIEST
  )
    return null;
  return { grow, active, harvest: monthOfDoy(d1), overwintered, d0, d1 };
}

/** The months a span of days (day of the year; may run below 1 or past 365) touches. */
function monthsOfSpan(from: number, to: number): number[] {
  const out = new Set<number>();
  for (let d = from; d < to; d += 7) out.add(monthOfDoy(d));
  out.add(monthOfDoy(to));
  return [...out];
}

/**
 * The last day (day of the year, past 365 into the next year) a crop left standing is lifted: the end of the
 * last month, counting on from the month of the first frost, whose mean daytime high is 0 °C or more (frozen
 * ground and snow below that) and whose cold nights stay above the temperature that kills the crop. A month's
 * cold nights are read as its mean night less half the gap between the coldest month's mean and the typical
 * year's extreme minimum, so that the harvest does not run on to a crop the first hard night has killed (the
 * 5 Nov 2026 audit: winter harvests ran on with no check against the crop's kill temperature). Where the
 * ground does not freeze it ends before the month in which the crop's next sowing opens, so that a crop
 * stood over from this autumn is never counted as the first picking of next spring's sowing.
 */
function standingEnd(crop: Crop, ctx: Ctx, ff: number): number {
  const dead = frostLimits(crop).deadC;
  const m0 = monthOfDoy(ff) - 1;
  const base = Math.floor((ff - 1) / 365) * 365;
  const gate = sowGate(crop, ctx);
  const nextSowMonth = gate == null ? -1 : monthOfDoy(calDoy(gate, ctx.south)) - 1;
  const coldestMean = Math.min(...ctx.months.map((mo) => mo.t));
  const spread = Math.max(0, coldestMean - ctx.extMin) / 2;
  let end = ff;
  for (let k = 0; k < STANDING_MONTHS; k++) {
    const i = (m0 + k) % 12;
    const mo = ctx.months[i];
    if (mo.max < GROUND_FROZEN_MAX_C || mo.min - spread < dead || (k > 0 && i === nextSowMonth)) break;
    end = base + 365 * Math.floor((m0 + k) / 12) + MONTH_START[i] + DAYS_IN[i];
  }
  return Math.max(end, ff);
}

/**
 * When the sowings of one month are picked, as days of the year: from the first picking of the earliest
 * sowing (its day + `days`) to the last picking of the latest one, held for the picking period by crops
 * picked over weeks. Where frost frames the year: tender and half-hardy crops stop at the average first
 * frost, hardy ones two weeks after it, a crop left standing at the last month with unfrozen ground (only from a
 * sowing that comes in as the weather cools: standsFromSowing); a crop not worth picking before frost starts no
 * earlier than the frost. Null when nothing is left to pick.
 */
function harvestSpan(crop: Crop, ctx: Ctx, a: Sowing, b: Sowing): [number, number] | null {
  let from = a.d1;
  let to = b.d1 + (pickedOverWeeks(crop) ? PICK_DAYS : 0);
  if (frostMatters(crop, ctx) && ctx.firstFrost != null && !a.overwintered) {
    const g = crop.grow!;
    // The first frost of this sowing's year, counted in the same days as `from` (already past, for a late sowing).
    const ff = Math.max(a.d0, a.d0 + (ctx.firstFrost - frostDoy(a.d0, ctx.south)));
    if (g.harvestAfterFrost) from = Math.max(from, ff);
    if (crop.hardiness === "tender" || crop.hardiness === "half-hardy") to = Math.min(to, ff);
    else if (g.stands && standsFromSowing(crop, ctx, b.d1)) to = standingEnd(crop, ctx, ff);
    else to = Math.min(to, crop.hardiness === "hardy" ? ff + FROST_ALLOWANCE.hardy : standingEnd(crop, ctx, ff));
  }
  return to >= from ? [from, to] : null;
}

type MonthWindow = {
  /** The first and last day of the month (day of the year) a sowing can be made. */
  from: number;
  to: number;
  /** The sowing on the first day, and on the last. */
  a: Sowing;
  b: Sowing;
  /** First and last day it is picked (null only for an extension calendar's sowing that the frost reaches first). */
  pick: [number, number] | null;
};

/**
 * A sowing on a day an extension calendar gives: in the ground for the crop's days to maturity (plus the short-day factor
 * for one that matures in autumn), as the rules count it, so that its harvest, watering and trays are worked out the same
 * way. Garlic is the only one that stands through winter.
 */
function extSowing(crop: Crop, ctx: Ctx, d0: number): Sowing {
  const g = crop.grow!;
  const d1 = d0 + g.days + (!ctx.tropical && inAutumn(d0 + g.days, ctx.south) ? SHORT_DAY_FACTOR : 0);
  const days = new Map<number, number>();
  for (let d = d0; d < d1; d++) days.set(monthOfDoy(d), (days.get(monthOfDoy(d)) ?? 0) + 1);
  const first = monthOfDoy(d0);
  const active = [...days].filter(([m, n]) => m === first || n >= 10).map(([m]) => m);
  const harvest = monthOfDoy(d1);
  return { grow: active.includes(harvest) ? active : [...active, harvest], active, harvest, overwintered: crop.slug === "garlic", d0, d1 };
}

/** Month m of an extension calendar's windows: its first and last sowing day, those sowings and their picking. */
function extWindow(crop: Crop, ctx: Ctx, spans: [number, number][], m: number): MonthWindow | null {
  const r = spansInMonth(spans, m);
  if (!r) return null;
  const a = extSowing(crop, ctx, r[0]);
  const b = extSowing(crop, ctx, r[1]);
  let pick = harvestSpan(crop, ctx, a, b);
  // A tender crop sown on the calendar's late dates is picked until the average first frost wherever frost is dated, even
  // where the typical coldest night stays above its kill point (frostMatters): the rules never grow a tender crop into
  // those weeks (GROWING_NIGHT), and the week's frost tile would otherwise name it there (UA's winter squash to Aug 31 at
  // Phoenix, picked into January).
  if (pick && crop.hardiness === "tender" && ctx.firstFrost != null && !frostMatters(crop, ctx)) {
    const ff = Math.max(a.d0, a.d0 + (ctx.firstFrost - frostDoy(a.d0, ctx.south)));
    pick = Math.min(pick[1], ff) >= pick[0] ? [pick[0], Math.min(pick[1], ff)] : null;
  }
  return { from: r[0], to: r[1], a, b, pick };
}

/**
 * One sowing month worked day by day: the first open day, the last day that still finishes in time (found by
 * halving the month, since a later sowing only finishes later), and what is picked. Null when no day of the
 * month will do.
 */
function monthWindow(crop: Crop, ctx: Ctx, m: number): MonthWindow | null {
  const a = trySowing(crop, ctx, m);
  if (!a) return null;
  const end = MONTH_START[m - 1] + DAYS_IN[m - 1];
  let b = a;
  if (end > a.d0) {
    const atEnd = trySowing(crop, ctx, m, end);
    if (atEnd) b = atEnd;
    else {
      let lo = a.d0;
      let hi = end;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        const t = trySowing(crop, ctx, m, mid);
        if (t) {
          lo = mid;
          b = t;
        } else hi = mid;
      }
    }
  }
  const pick = harvestSpan(crop, ctx, a, b);
  return pick ? { from: a.d0, to: b.d0, a, b, pick } : null;
}

/** The span of days of the year covering whole months. */
const monthSpan = (m: number): [number, number] => [MONTH_START[m - 1] + 1, MONTH_START[m - 1] + DAYS_IN[m - 1]];

/** Index of the warmest month (0-based). */
const warmestIndex = (months: Month[]) => months.reduce((best, mo, i) => (mo.t > months[best].t ? i : best), 0);

/**
 * Garlic outside the tropics: autumn-planted, lifted the next summer. Returns the planting
 * window (two months), the harvest (two months) and the reason, or null where it will not grow.
 */
function garlicYear(ctx: Ctx, days: number): { plant: number[]; harvest: number[]; why: string } | null {
  const { months } = ctx;
  const w = warmestIndex(months);
  const at = (k: number) => months[(w + k) % 12];
  let plant: number[] | null = null;
  let how = "";
  const limit = Math.min(GARLIC_PLANT_C, months[w].t - 3);
  if (ctx.frostLed) {
    // The months after the warmest that are cool enough to plant into (read at the late-month mean, which
    // tracks the soil), up to the first month whose mean is under the rooting minimum or whose daytime highs
    // average below freezing. The window is the last two of them; where the stop month has frozen ground, the
    // month before it is dropped too, since the cloves need four to six weeks of open soil to root.
    const open: Month[] = [];
    let stop: Month | null = null;
    for (let k = 1; k <= 11 && !stop; k++) {
      const mo = at(k);
      if (mo.t < GARLIC_COLD_C || mo.max < GROUND_FROZEN_MAX_C) stop = mo;
      else if (mo.tLate <= limit) open.push(mo);
    }
    if (stop) {
      const frozen = stop.max < GROUND_FROZEN_MAX_C;
      if (frozen && open.length && (open[open.length - 1].m % 12) + 1 === stop.m) open.pop();
      // Never the month right after the warmest: the soil is still at its summer warmth, and cloves planted into it put up
      // leaves that the winter kills (UAF Cooperative Extension HGA-00047, read 14 Nov 2026: "If leafy shoots emerge from
      // the ground in the autumn, they will be killed by winter cold"; plant mid-September to mid-October in Alaska).
      // Day 5 audit, 14 November 2026: Thompson, Whitehorse, Yellowknife, Saskatoon and Fairbanks were told Aug–Sep, where
      // Saskatchewan's Ministry of Agriculture (saskatchewan.ca, garlic, read 14 Nov 2026) says mid to late September.
      const summerSoil = at(1).m;
      while (open.length && open[0].m === summerSoil) open.shift();
      if (!open.length) return null;
      plant = open.slice(-GARLIC_WINDOW_MONTHS).map((mo) => mo.m);
      how = frozen
        ? `Planted in autumn, in the last months with open soil before the ground freezes (${SHORT[stop.m - 1]}'s daytime highs average below freezing), so the cloves root before winter and stand through it.`
        : `Planted in autumn, in the two months before the soil goes cold (${SHORT[stop.m - 1]} averages under ${GARLIC_COLD_C} °C), so the cloves root before winter and stand through it.`;
    }
  }
  if (!plant) {
    for (let k = 1; k <= 10 && !plant; k++) {
      if (at(k).tLate <= limit && at(k + 1).tLate <= limit) {
        plant = [at(k).m, at(k + 1).m];
        how = `Planted as the heat breaks, in the first two months averaging ${Math.round(limit)} °C or less, for a long cool season; it stands through the coolest months.`;
      }
    }
  }
  if (!plant) return null;
  const harvest = garlicLift(ctx, plant, days);
  return { plant, harvest, why: `${how} Lifted in ${monthSpans(harvest, false)}, once the lower leaves brown.` };
}

/**
 * When garlic planted in these months (in the order of the season, from the month after the warmest) is lifted: in the
 * month after the first warm month (18 °C) that follows the last planting month; where no month reaches it, the month
 * after the warmest. Never before the crop can have matured: the month `days` after the first planting day (garlic's 150
 * days is the figure in src/data/crop-grow.json). Orlando's heat arrives in February, ten weeks after a December planting.
 */
function garlicLift(ctx: Ctx, plant: number[], days: number, pastColdest = false): number[] {
  const { months } = ctx;
  const w = warmestIndex(months);
  const at = (k: number) => months[(w + k) % 12];
  const first = plant[0];
  const last = plant[plant.length - 1];
  let after = (last - 1 + 12 - w) % 12;
  // An extension calendar's planting can come while the months are still warm (UA's Maricopa garlic, Oct 1–15, with
  // November over 18 °C): the warm month that lifts it is the first one after the coldest, not the first after planting.
  if (pastColdest) {
    let coldest = after + 1;
    for (let k = after + 1; k < 12; k++) if (at(k).t < at(coldest).t) coldest = k;
    after = coldest;
  }
  let harvest: number[] | null = null;
  for (let k = after + 1; k <= after + 10 && !harvest; k++) if (at(k).t >= GARLIC_HARVEST_C) harvest = [at(k + 1).m];
  if (!harvest) harvest = [at(1).m];
  const earliest = monthOfDoy(MONTH_START[first - 1] + 1 + days);
  // A lift in the planting month is the next year's, twelve months on, never the same month: the Day 5 audit (14 November
  // 2026) found "sow Aug–Sep; harvest Dec" at Thompson, Whitehorse, Yellowknife and Fairbanks, where no month reaches
  // GARLIC_HARVEST_C, the August lift counted as 0 months after an August planting, and the maturity guard moved it into
  // the winter. Saskatchewan Agriculture: digging is common in August; UAF HGA-00047: August or early September.
  if (((harvest[0] - first + 11) % 12) + 1 < (earliest - first + 12) % 12) harvest = [earliest];
  return harvest;
}

/**
 * Where the monthly temperatures come from, after a figure. The 10 Nov 2026 audit found the strawberry line's "coldest
 * month (here −6 °C)" 1–3 °C warmer than ECCC's and NOAA's station normals at the Acadian towns, so the figures say where
 * they come from. Day 5 audit, 14 November 2026: 74 towns now read a station's normals (scripts/build-station-normals.ts)
 * and were still told "in the ERA5 reanalysis"; they name the station (the fields climate-fallback tempStationOf reads,
 * read here directly so this module stays free of the town tables).
 */
function tempsAt(c: Climate): string {
  if (c.tempSource !== "station" || !c.tempStation || c.tempStationKm == null) return " in the ERA5 reanalysis";
  return ` at ${stationName(c.tempStation)}, ${c.tempStationKm} km away`;
}

/** Does a perennial do well here, all year round? The reasons when it does, or null. */
function perennialSuits(crop: Crop, ctx: Ctx): string[] | null {
  const g = crop.grow! as Grow;
  // A record that names the climates it is grown in is listed only in those (globe artichoke: FAO ECOCROP).
  if (g.regimes && !(ctx.regimeId != null && g.regimes.includes(ctx.regimeId))) return null;
  // Grown as a winter annual where the winter is mild and the summer hot (strawberry: UF/IFAS; the 10 Nov 2026 audit
  // found strawberries listed as perennials that do well at Jacksonville and Savannah).
  if (g.winterAnnualAboveC != null && !ctx.frostLed && Math.max(...ctx.months.map((mo) => mo.t)) > g.winterAnnualAboveC) return null;
  const [, optLo, , hi] = g.temp;
  const { months } = ctx;
  const coldest = Math.min(...months.map((m) => m.t));
  const coldestNight = Math.min(...months.map((m) => m.min));
  const warmest = Math.max(...months.map((m) => m.t));
  const why: string[] = [];
  if (g.winterMinC != null) {
    if (ctx.extMin < g.winterMinC) return null;
    if (ctx.extMin < 5) why.push(`Takes winter lows to about ${deg(g.winterMinC)}; here the coldest night of a typical year is about ${deg(ctx.extMin)}.`);
  } else if (coldestNight < PERENNIAL_NIGHT[crop.hardiness]) return null;
  const ceiling = g.maxWarmestMonthC ?? hi + 3;
  if (warmest > ceiling || warmest < optLo) return null;
  // Day 5 audit, 14 November 2026: olives and pomegranates "do well" at Portland and Seattle; Oregon State's Ask an Expert
  // ("What exotic fruits do well in Oregon?", https://extension.oregonstate.edu/ask-expert/featured/what-exotic-fruits-do-
  // well-oregon, read 14 Nov 2026) lists them only "in years with mild winters and hot summers", against figs that "do well
  // most years". A hot summer is the site's hot day (homestead HOT_DAY_C): the warmest month's afternoons averaging 30 °C.
  // Asked only where the typical coldest night reaches the crop's own damage line (crops.json frostLimits.damageC, −2 °C
  // for both), as OSU asks the two together; the near frost-free coast of California keeps them on its mild winters.
  // The olive's winter limit is its own record's (crops.json: "trees are damaged below about −5.6 °C"), and the pear's is
  // USDA zone 4, −34.4 °C (University of Minnesota Extension, Growing pears in the home garden, read 14 Nov 2026: "Most are
  // best suited to USDA zone 4"), not the −45 °C that put pears at Thompson, Yellowknife and Fairbanks.
  if (g.hotSummerMaxC != null && ctx.extMin <= (crop.frostLimits?.damageC ?? HARD_FREEZE_C)) {
    const hottestAfternoon = Math.max(...months.map((m) => m.max));
    if (hottestAfternoon < g.hotSummerMaxC) return null;
    why.push(`Needs hot summers: afternoons averaging ${deg(g.hotSummerMaxC)} or more in the warmest month (here ${deg(hottestAfternoon)}${ctx.tempsAt}).`);
  }
  if (g.coolestMonthMaxC != null) {
    if (coldest > g.coolestMonthMaxC) return null;
    why.push(`Needs a cool season: a coldest month under ${deg(g.coolestMonthMaxC)} (here ${deg(coldest)}${ctx.tempsAt}).`);
  }
  if (g.coldestMonthMinC != null) {
    if (coldest < g.coldestMonthMinC) return null;
    why.push(`Needs warmth all year: a coldest month of ${deg(g.coldestMonthMinC)} or more (here ${deg(coldest)}${ctx.tempsAt}).`);
  }
  if (g.chill) {
    const n = months.filter((m) => m.t < g.chill!.belowC).length;
    if (n < g.chill.months) return null;
    why.push(`Needs ${g.chill.months} month${g.chill.months === 1 ? "" : "s"} averaging under ${deg(g.chill.belowC)} to fruit (here ${n}${ctx.tempsAt}).`);
  }
  why.push(`Warmest month ${deg(warmest)}${ctx.tempsAt}, within its ${deg(ceiling)} limit.`);
  return why;
}

/**
 * When a perennial goes in: tender ones in a warm month, the rest while it is cool; and where frost frames the year,
 * the rest in spring only, from the coldest month to the warmest. The perennial fruit and herb records written for frost
 * gardens set plants out in spring: apple ("bare-root trees in early spring … potted trees any time until early
 * September"), pear, raspberry, rhubarb and strawberry ("early spring"), haskap ("early spring to September"), the hardy
 * herbs ("after the last frost"); fig, olive, citrus and pomegranate in late winter or spring. The 10 Nov 2026 audit found
 * apples, haskap, pears and raspberries offered for planting now in November at Boston, New York and Halifax, against
 * those records. "Frost frames the year" is the regime's frostLed, read from the station frost dates, so Halifax's
 * November no longer rests on the reanalysis grid's warm November. Autumn planting stays where frost does not frame the
 * year (fig and pomegranate: "in the dormant season"; globe artichoke: "in mild climates … in autumn").
 */
function perennialPlanting(crop: Crop, months: Month[], frostLed: boolean, wet: number[] = []): number[] {
  const g = crop.grow! as Grow;
  const [lo, optLo, optHi] = g.temp;
  const k = Math.max(1, Math.round(g.days / 30.4));
  // Hardy plants are not set out once the soil has gone cold in autumn: the months from the first one under
  // 5 °C after the warmest until the first spring month back over it are closed (Toronto Master Gardeners:
  // roots need 4–6 weeks before the ground freezes; the crop record for haskap: "early spring to September").
  const closed = new Set<number>();
  if (crop.hardiness !== "tender") {
    const w = warmestIndex(months);
    let start = -1;
    for (let j = 1; j < 12 && start < 0; j++) if (months[(w + j) % 12].t < PERENNIAL_SOIL_COLD_C) start = j;
    if (start > 0) {
      for (let j = start; j < 12 && months[(w + j) % 12].t < PERENNIAL_SOIL_COLD_C; j++) closed.add(months[(w + j) % 12].m);
    }
    if (frostLed) {
      // Autumn, from the month after the warmest to the month before the coldest, is closed.
      const c = months.reduce((best, mo, i) => (mo.t < months[best].t ? i : best), 0);
      for (let j = (w + 1) % 12; j !== c; j = (j + 1) % 12) closed.add(months[j].m);
    }
  }
  const byWarmth = months
    .filter((mo, i) => {
      if (closed.has(mo.m)) return false;
      if (crop.hardiness !== "tender") return mo.t >= lo && mo.t < optLo;
      if (mo.t < optLo || mo.t > optHi) return false;
      const ahead = k <= 3 ? k : 2;
      for (let j = 1; j < ahead; j++) if (months[(i + j) % 12].t < lo) return false;
      return true;
    })
    .map((mo) => mo.m);
  // A record that plants only "at the start of the rains" (mango: "so they root in before the dry season"; moringa) is set
  // out in the first month of each wet run, and not at all where the year has no rainy season; where it rains all year
  // the rains do not set the date. The Day 3 audit (11 Nov 2026) found mangoes "plant out now" at Brownsville on 11
  // November with no source: Texas A&M's mango fact sheet (https://aggie-horticulture.tamu.edu/fruit-nut/fact-sheets/mango,
  // read 11 Nov 2026) gives no planting month and banks young trunks with soil from early December to early March.
  if (!g.plantAtRains || wet.length === 12) return byWarmth;
  const isWet = new Set(wet);
  return byWarmth.filter((m) => isWet.has(m) && !isWet.has(((m + 10) % 12) + 1));
}

/** Months, in the place's calendar, a crop's library harvest months fall in. */
const localHarvest = (crop: Crop, south: boolean) => crop.harvestMonths.map((m) => (south ? ((m + 5) % 12) + 1 : m));

/** The plain reasons behind an annual's row. */
function annualWhy(crop: Crop, ctx: Ctx, fit: Pick<CropFit, "sow" | "watered" | "overwinter" | "harvest">, coldStart = false): string[] {
  const g = crop.grow! as Grow;
  const [lo, , optHi, hi] = g.temp;
  const why: string[] = [];
  const first = ctx.firstFrostLabel;
  // The hardiness line only where frost ends this crop's season here (frostMatters, as the sowing rules read it). The Day 4
  // audit (13 Nov 2026) found "Half-hardy: … must be finished by the first [frost]" at Phoenix, Las Vegas, Sacramento, San
  // Jose and Santa Barbara beside rows that run the crop through winter, where the typical coldest night is above the
  // crop's kill point and the frost dates hold nothing.
  if (ctx.firstFrost != null && frostMatters(crop, ctx)) {
    const hardFreeze = ctx.extMin <= HARD_FREEZE_C;
    const line: Record<Hardiness, string> = {
      tender: `Tender: goes in a week after the average last frost (${ctx.lastFrostLabel}) and must be finished two weeks before the first (${first}).`,
      "half-hardy": `Half-hardy: can go in before the last frost (${ctx.lastFrostLabel}) but must be finished by the first (${first}).`,
      hardy: `Hardy: takes the light frosts of the fortnight after the average first frost (${first}), and finishes before the months under ${lo} °C.`,
      "very-hardy": hardFreeze
        ? `Very hardy: takes the frosts of the month after the average first frost (${first}), and finishes before the hard freezes and the months under ${lo} °C${g.overwinter ? ", or stands through them" : ""}.`
        : `Very hardy: frost does not stop it here; it is sown to finish before the months under ${lo} °C${g.overwinter ? ", or to stand through them" : ""}.`,
    };
    why.push(line[crop.hardiness]);
  } else {
    why.push(`Sown when the month warms to ${deg(lo)} and finishes before any month over ${deg(hi)}.`);
  }
  if (g.sowMinSoilC != null && g.sowMinSoilC > lo) why.push(`Seed needs soil at ${deg(g.sowMinSoilC)} to germinate.`);
  if (coldStart) {
    why.push(
      g.plantMinSoilC != null
        ? `The soil here warms to ${deg(g.plantMinSoilC)} too late to finish before the frost, so it goes out after the last frost into soil warmed under black plastic.`
        : `The nights here reach ${deg(g.plantMinNightC ?? 0)} too late to finish before the frost, so it goes out a week after the last frost.`,
    );
  } else {
    if (g.plantMinSoilC != null) why.push(`Set out once the days average ${deg(g.plantMinSoilC)} or more, for soil that warm.`);
    if (g.plantMinNightC != null) why.push(`Set out once the nights average ${deg(g.plantMinNightC)} or more.`);
  }
  if (g.bulbs && !ctx.tropical) {
    why.push(
      ctx.longestDay >= BULB_SHORT_DAY_ZONE_H
        ? "Bulbs form as the days lengthen towards midsummer, whenever it was planted: a spring planting goes in at least six weeks before the longest day."
        : shortestDay(ctx) >= BULB_SHORT_DAY_MIN_H
          ? "Short-day onions here: they start to bulb as the days pass 10 to 12 hours, and the days here never fall below 10, so they are planted in autumn, before the shortest day."
          : "Short-day onions here: they start to bulb as the days pass 10 to 12 hours, so they are planted in autumn, or in winter before the days pass 11 hours.",
    );
  }
  if (heatStopped(crop, ctx) && !ctx.tropical && Math.max(...ctx.months.map((mo) => mo.t)) > optHi + HEAT_MARGIN_C) why.push(`Sown in spring only early enough to be picked before the days average over ${deg(optHi + HEAT_MARGIN_C)}.`);
  if (fit.overwinter.length) {
    why.push(
      `Sown ${monthSpans(fit.overwinter)} it stands through winter (it takes about ${deg(g.overwinterMinC ?? 0)}; here the coldest night of a typical year is about ${deg(ctx.extMin)}) and finishes in spring or summer.`,
    );
    if (ctx.firstFrost != null) why.push(`A sowing to stand through winter goes in at least two weeks before the average first frost (${first}), so it has rooted before the frosts.`);
  }
  if (fit.watered.length) why.push(`With watering when sown ${monthSpans(fit.watered)}: it would grow into the dry months (${monthSpans(ctx.dryMonths)}).`);
  const darkCool = shortestDay(ctx) < PERSEPHONE_HOURS ? ctx.dark11 : ctx.dark11.filter((m) => ctx.months[m - 1].t < g.temp[1]);
  // The short days stop growth only in a month under the crop's optimum (trySowing counts a day when it is long enough or
  // the month is within the optimum). The Day 4 audit (13 Nov 2026) found "Growth all but stops … (Dec)" at Los Angeles
  // and Santa Barbara, whose December averages about 14 °C, over the optimum floor of the crops it was printed beside.
  const darkStill = ctx.dark10.filter((m) => ctx.months[m - 1].t < g.temp[1]);
  if (lo >= 12 && darkCool.length) why.push(`Not sown to grow through ${monthSpans(darkCool)}, when days are under eleven hours${darkCool.length < ctx.dark11.length ? " and it is cool for it" : ""}.`);
  else if (darkStill.length) why.push(`Growth all but stops in months with days under ten hours that are cool for it (${monthSpans(darkStill)} here).`);
  if (g.start === "transplant") why.push(`Started in trays ${g.nurseryWeeks ?? 6} weeks before planting out.`);
  if (ctx.lastFrost != null && ctx.extMin <= seasonEndsC(crop)) {
    if (g.frostEndsSeason) why.push(`Frost on the leaves ends its season (about ${deg(frostLimits(crop).damageC)}; here the coldest night of a typical year is about ${deg(ctx.extMin)}), so it is grown between the frost dates.`);
    if (crop.hardiness === "tender") why.push(`Not planted out before a week after the average last frost (${ctx.lastFrostLabel}).`);
    else if (crop.hardiness === "very-hardy" || g.overwinter) why.push(`Not sown before four weeks ahead of the average last frost (${ctx.lastFrostLabel}), when the soil can be worked; first picking is that day plus ${g.days} days.`);
    else why.push(`Not sown or planted out before three weeks ahead of the average last frost (${ctx.lastFrostLabel}); first picking is that day plus ${g.days} days.`);
    if (g.harvestAfterFrost) why.push(`Picked after the first frost (${ctx.firstFrostLabel}): not worth eating before it.`);
  }
  return why;
}

/** The reasons behind a row whose every sowing month an extension calendar gives (its own line comes first). */
function extensionWhy(crop: Crop, ctx: Ctx, fit: Pick<CropFit, "watered">): string[] {
  const g = crop.grow!;
  const why: string[] = [];
  if (fit.watered.length) why.push(`With watering when sown ${monthSpans(fit.watered)}: it would grow into the dry months (${monthSpans(ctx.dryMonths)}).`);
  if (g.start === "transplant") why.push(`Started in trays ${g.nurseryWeeks ?? 6} weeks before planting out.`);
  why.push(`Picking worked out from its ${g.days} days to maturity${frostMatters(crop, ctx) ? " and the frost dates" : ""}.`);
  return why;
}

export function cropCalendar(c: Climate, regime: Regime | null, crops: Crop[] = ALL_CROPS, opts: CalendarOptions = {}): CropFit[] {
  const ctx = contextOf(c, regime, opts);
  const { months } = ctx;
  const regimeId: RegimeId | undefined = regime?.id;
  const region = extensionRegion(opts);
  const out: (CropFit & { n: number })[] = [];
  for (const crop of crops) {
    const g = crop.grow;
    if (!g) continue;
    // No "staple" where an extension calendar is loaded: the calendars name none, and the Day 4 audit (13 Nov 2026) found
    // cowpeas, groundnuts, okra and watermelon marked staples at Los Angeles and San Diego, which UC's calendars do not.
    const staple = !region && !!regimeId && !!crop.staple?.includes(regimeId);
    if (g.start === "perennial") {
      const why = perennialSuits(crop, ctx);
      if (!why) continue;
      const plant = perennialPlanting(crop, months, ctx.frostLed, ctx.wetMonths);
      if ((g as Grow).plantAtRains && ctx.wetMonths.length < 12)
        why.push(plant.length ? `Planted at the start of the rains (${monthSpans(plant)} here), so it roots in before the dry season.` : "Planted at the start of the rains, and the year here has no rainy season to plant it at.");
      out.push({
        crop,
        sow: plant,
        watered: [],
        trays: [],
        harvest: localHarvest(crop, ctx.south),
        perennial: true,
        staple,
        overwinter: [],
        why,
        windows: { sow: plant.map(monthSpan), watered: [], trays: [] },
        n: 0,
      });
      continue;
    }
    // Where an extension calendar is loaded, it decides the months it covers: a crop it lists is sown on its dates there,
    // and one it does not list (with `others` "none") is not sown then (EXTENSION above).
    const ext = region?.crops[crop.slug];
    const extSp = ext ? extensionSpans(ext) : null;
    const decided = (m: number) => !!region && region.covers.includes(m) && (!!ext || region.others === "none");
    if (crop.slug === "garlic" && !ctx.tropical) {
      const y = garlicYear(ctx, g.days);
      const extMonths = extSp ? region!.covers.filter((m) => !!spansInMonth(extSp, m)) : [];
      const modelPlant = (y?.plant ?? []).filter((m) => !decided(m));
      const w = warmestIndex(months);
      const plant = [...new Set([...extMonths, ...modelPlant])].sort((a, b) => ((a - 1 - w + 12) % 12) - ((b - 1 - w + 12) % 12));
      if (!plant.length) continue;
      const lift = extMonths.length ? garlicLift(ctx, plant, g.days, true) : y!.harvest;
      const daySpans = plant.map((m) => (extMonths.includes(m) ? spansInMonth(extSp!, m)! : monthSpan(m)));
      const dry = plant.every((m) => months[m - 1].dry);
      const why = extMonths.length
        ? [sourceLine(region!, ext!), `Lifted in ${monthSpans(lift, false)}, once the lower leaves brown.`, ...(modelPlant.length ? [y!.why] : [])]
        : [y!.why];
      out.push({
        crop,
        sow: dry ? [] : plant,
        watered: dry ? plant : [],
        trays: [],
        harvest: lift,
        perennial: false,
        staple,
        overwinter: plant,
        why: [...why, ...(dry ? [`With watering: the planting months are dry here (${monthSpans(ctx.dryMonths)}).`] : [])],
        windows: { sow: dry ? [] : daySpans, watered: dry ? daySpans : [], trays: [] },
        ...(extMonths.length ? { from: sourceRef(region!, ext) } : {}),
        n: 2,
      });
      continue;
    }
    const sow: number[] = [];
    const watered: number[] = [];
    const overwinter: number[] = [];
    const harvest = new Set<number>();
    const sowSpans: [number, number][] = [];
    const wateredSpans: [number, number][] = [];
    const pickSpans: [number, number][] = [];
    const grownSpans: [number, number][] = [];
    // Where waiting for warm soil or warm nights leaves no time to finish before the frost (tomatoes at Fredericton,
    // Saint John, Sherbrooke and Saskatoon; sweet potatoes in 61 towns, Boston, Chicago and Paris among them), the crop goes out on the frost rule alone: the sweet
    // potato record's own cold-country rule ("after the last frost, into soil warmed under black plastic"), and the
    // tomato record's "1–2 weeks after the last frost".
    let windows = Array.from({ length: 12 }, (_, i) => monthWindow(crop, ctx, i + 1));
    const gx = g as Grow;
    const coldStart = !windows.some(Boolean) && (gx.plantMinSoilC != null || gx.plantMinNightC != null);
    if (coldStart) windows = Array.from({ length: 12 }, (_, i) => monthWindow(crop, { ...ctx, warmGate: false }, i + 1));
    /** The model's sowing months that an extension calendar not listing the crop takes away. */
    const removed = region && !ext ? windows.flatMap((w, i) => (w && decided(i + 1) ? [i + 1] : [])) : [];
    if (region) windows = windows.map((w, i) => (decided(i + 1) ? (extSp ? extWindow(crop, ctx, extSp, i + 1) : null) : w));
    for (let m = 1; m <= 12; m++) {
      const w = windows[m - 1];
      if (!w) continue;
      if (w.pick) {
        pickSpans.push(w.pick);
        grownSpans.push([w.from, w.pick[1]]);
        for (const mm of monthsOfSpan(w.pick[0], w.pick[1])) harvest.add(mm);
      } else grownSpans.push([w.from, w.b.d1]);
      const dry = w.a.active.filter((x) => months[x - 1].dry).length;
      // "More than half" for a crop that needs little water: twice the dry months over the months it grows in. It read
      // `dry > ceil(n / 2)`, which no one-month sowing can pass: the Day 4 audit (13 Nov 2026) found cowpeas (35 days, low
      // water) offered to "sow or plant out" without watering in the driest months at Phoenix (May 0.13 in, NOAA), Las Vegas,
      // Los Angeles (June–July 0.09 and 0.02 in), San Diego and San Jose.
      const thirsty = g.water === "low" ? dry * 2 > w.a.active.length : dry > 0;
      (thirsty ? watered : sow).push(m);
      (thirsty ? wateredSpans : sowSpans).push([w.from, w.to]);
      if (w.a.overwintered) overwinter.push(m);
    }
    if (!sow.length && !watered.length) continue;
    // Trays are started the nursery weeks before the day each planting-out window opens and closes.
    const trays: number[] = [];
    const traySpans: [number, number][] = [];
    if (g.start === "transplant") {
      const lead = (g.nurseryWeeks ?? 6) * 7;
      const goes = new Set([...sow, ...watered]);
      for (const [from, to] of [...sowSpans, ...wateredSpans]) {
        traySpans.push([from - lead, to - lead]);
        for (const mm of monthsOfSpan(from - lead, to - lead)) if (!goes.has(mm) && !trays.includes(mm)) trays.push(mm);
      }
      trays.sort((x, y) => x - y);
    }
    const fit = { sow, watered, overwinter, harvest: [...harvest].sort((a, b) => a - b) };
    const why = ext
      ? [sourceLine(region!, ext), ...(region!.covers.length === 12 ? extensionWhy(crop, ctx, fit) : annualWhy(crop, ctx, fit, coldStart))]
      : [
          ...annualWhy(crop, ctx, fit, coldStart),
          ...(removed.length ? [`No sowing is shown for ${monthSpans(removed)}: ${region!.src.publisher}, ${region!.src.title}, does not list it.`] : []),
        ];
    out.push({
      crop,
      ...fit,
      trays,
      perennial: false,
      staple,
      why,
      windows: { sow: sowSpans, watered: wateredSpans, trays: traySpans, pick: pickSpans, grown: grownSpans },
      ...(ext ? { from: sourceRef(region!, ext) } : removed.length ? { from: sourceRef(region!) } : {}),
      n: sow.length + watered.length,
    });
  }
  out.sort((a, b) => Number(b.staple) - Number(a.staple) || b.n - a.n || a.crop.name.localeCompare(b.crop.name));
  return out.map(({ n: _n, ...f }) => {
    void _n;
    return f;
  });
}

/**
 * What goes in now: sown, planted out (perennials), sown with watering, and started in trays.
 *
 * With `doy` (today's day of the year, see doyOfIso) only a crop whose window includes that day is listed: a
 * month with a window that has closed, or has yet to open, lists nothing. Without it the whole month counts,
 * as the calendar's bars do.
 */
export function sowNow(fits: CropFit[], month: number, doy?: number) {
  if (doy != null) {
    return {
      sow: fits.filter((f) => !f.perennial && inSpans(f.windows.sow, doy)),
      plant: fits.filter((f) => f.perennial && inSpans(f.windows.sow, doy)),
      sowWatered: fits.filter((f) => !f.perennial && inSpans(f.windows.watered, doy)),
      trays: fits.filter((f) => !f.perennial && f.crop.grow?.start === "transplant" && inSpans(f.windows.trays, doy)),
    };
  }
  const next = (m: number, lead: number) => ((m - 1 + lead) % 12) + 1;
  return {
    sow: fits.filter((f) => !f.perennial && f.sow.includes(month)),
    plant: fits.filter((f) => f.perennial && f.sow.includes(month)),
    sowWatered: fits.filter((f) => !f.perennial && f.watered.includes(month)),
    trays: fits.filter((f) => {
      if (f.perennial || f.crop.grow?.start !== "transplant") return false;
      const m = next(month, trayLead(f.crop.grow));
      return f.sow.includes(m) || f.watered.includes(m);
    }),
  };
}

/** A month is one of the town's main sowing months when it opens at least this share of the busiest month's sowings. */
export const MAIN_SOWING_SHARE = 2 / 3;

/**
 * The town's main sowing months, from its own calendar: the months in which the most annuals can be sown (with or
 * without watering), every month with at least MAIN_SOWING_SHARE of the busiest month's count. Day 5 audit, 14 November
 * 2026: "The winter rains are here: the main sowing window of the year" in October at Nanaimo, Vancouver, Victoria,
 * Portland and Seattle, whose calendars sow 4 or 5 annuals in October against 30 to 35 in May and June (OSU and WSU list
 * almost no October sowing). Wording about the main sowing window reads these months, never the regime's wet months.
 */
export function mainSowingMonths(fits: CropFit[]): { months: number[]; counts: number[] } {
  const counts = Array.from({ length: 12 }, (_, i) => fits.filter((f) => !f.perennial && (f.sow.includes(i + 1) || f.watered.includes(i + 1))).length);
  const peak = Math.max(...counts);
  return { months: peak > 0 ? counts.flatMap((n, i) => (n >= peak * MAIN_SOWING_SHARE ? [i + 1] : [])) : [], counts };
}

/**
 * When the next sowing window opens after `doy`, from the same windows sowNow reads: the day it opens, the days
 * to wait, and the crops that open within a week of the first (staples first). Null when no annual has a window.
 */
export function nextSowing(fits: CropFit[], doy: number): { doy: number; month: number; days: number; fits: CropFit[] } | null {
  const waits: { fit: CropFit; wait: number }[] = [];
  for (const f of fits) {
    if (f.perennial) continue;
    const spans = [...f.windows.sow, ...f.windows.watered];
    if (!spans.length || inSpans(spans, doy)) continue;
    waits.push({ fit: f, wait: Math.min(...spans.map(([a]) => (((a - doy) % 365) + 365) % 365)) });
  }
  if (!waits.length) return null;
  const first = Math.min(...waits.map((w) => w.wait));
  const close = waits
    .filter((w) => w.wait <= first + 6)
    .sort((a, b) => Number(b.fit.staple) - Number(a.fit.staple) || a.wait - b.wait || a.fit.crop.name.localeCompare(b.fit.crop.name))
    .map((w) => w.fit);
  const day = wrapDoy(doy + first);
  return { doy: day, month: monthOfDoy(day), days: first, fits: close };
}

/**
 * Is an annual in the ground on a day of the year by this calendar: between a sowing (or planting out) and the last
 * picking of that sowing? Perennials, and fits without day spans, are not counted.
 */
export function inGround(f: CropFit, doy: number): boolean {
  return !f.perennial && !!f.windows.grown && inSpans(f.windows.grown, doy);
}

/** Is an annual being picked on a day of the year by this calendar? */
export function pickedOn(f: CropFit, doy: number): boolean {
  return !f.perennial && !!f.windows.pick && inSpans(f.windows.pick, doy);
}
