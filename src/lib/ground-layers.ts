/**
 * What the geologic map says is under a point, as two layers: the cover (loose
 * deposits such as till, marine clay, alluvium and sand, and rock weathered
 * where it lies, such as saprolite) and the bedrock (the first unit of a
 * detailed map that is neither). Pure functions, no network, so
 * scripts/check-ground.ts can test them on a stored Macrostrat answer.
 *
 * Source: Macrostrat's geologic map units for a point
 * (https://macrostrat.org/api/v2/geologic_units/map?lat=&lng=&response=long).
 * Each unit comes from one published map, at that map's scale (the `scale`
 * field: large, medium, small, tiny); the API lists the most detailed map
 * first. The units are NOT a vertical stack: they are what several maps say
 * about the same spot, so only the best cover units and the best bedrock unit
 * are used, and the rest are listed as other maps of the same spot.
 *
 * Ages: a unit's own age range (`b_age` older, `t_age` younger, Ma) is printed
 * as a range. It is the range the map's author gave the unit, not the age of a
 * particular deposit, and the top of the range is never read as "the age".
 * Where the range is only that of a named interval (Quaternary, Cenozoic,
 * Precambrian to Paleozoic), only the interval is named; see `spanName`. So too
 * where it equals or contradicts the unit's own interval (`unitFromMacrostrat`),
 * and for every Quaternary deposit (`viewOf`).
 */
import {
  bedrockRockFor,
  depositRockFor,
  dominantInList,
  FAMILY_ITEM,
  isAlphabeticalList,
  isLooseItem,
  isLooseLithology,
  majorItems,
  rockForLithology,
  type LithSource,
  type Rock,
} from "./rocks";

/** One map unit at a point, after `unitFromMacrostrat`. */
export type RockUnit = {
  /** The map's name for the unit ("Carlsbad", "Alluvial Silt"). */
  name: string;
  /** Macrostrat's lithology list, as given: the dominant lithology is listed first. May be empty. */
  lith: string;
  /** The unit's own age range, Ma: older end. Null where the map gives none. */
  bAge: number | null;
  /** Younger end, Ma (0 = still forming). */
  tAge: number | null;
  /**
   * "unit" = the unit's own range; "interval" = only the range of the interval the map assigned it (also where the
   * unit's own range is that interval's, or lies outside it: see `unitFromMacrostrat`).
   */
  ageBasis: "unit" | "interval" | null;
  /** The interval the unit's base falls in, as Macrostrat names it. */
  bIntName: string;
  /** The interval its top falls in ("Holocene"); absent on units stored before ROCKS_VERSION 3. */
  tIntName?: string;
  /** The span of the interval(s) the map assigns the unit, Ma (Macrostrat's b_int_age, t_int_age); absent before v3. */
  bIntAge?: number | null;
  tIntAge?: number | null;
  /** The map's own description of the unit (verbatim), or null. */
  description: string | null;
  /** The scale of the source map: "large" is the most detailed. */
  scale: string;
  mapId: number | null;
  sourceId: number | null;
};

/** The fields of a Macrostrat map unit that are read. */
export type MacrostratUnit = {
  map_id?: number;
  source_id?: number;
  name?: string | null;
  lith?: string | null;
  descrip?: string | null;
  b_age?: number | null;
  t_age?: number | null;
  b_int_age?: number | null;
  t_int_age?: number | null;
  b_int_name?: string | null;
  t_int_name?: string | null;
  scale?: string | null;
};

/**
 * Bump when the shape of RockUnit changes (cache key `rock:v<N>`, and the `rocksV` stamp on stored ground records).
 * v3 (11 November 2026) keeps the interval's span and the top interval's name, so a range that is only the interval's
 * can be told from the unit's own.
 */
export const ROCKS_VERSION = 3;

/** The Macrostrat query for the map units at a point (the long response carries the descriptions and the map scale). */
export const macrostratUrl = (lat: number, lon: number) => `https://macrostrat.org/api/v2/geologic_units/map?lat=${lat}&lng=${lon}&response=long`;

/**
 * Audit of 11 November 2026 (Day 3 regions):
 * - A unit whose own range is exactly its interval's was printed as dated to that range wherever the interval was not
 *   in `spanName`'s table: Asheville's and Columbus's "129,000 to 11,700 years ago" (the Late Pleistocene), Pittsburgh's
 *   and Little Rock's "129,000 years ago to the present", St. Louis's loess "774,000 years ago to the present"
 *   (Chibanian to Holocene), Little Rock's Jackfork Sandstone "323.4 to 315.2" (the Bashkirian), St. Louis's
 *   "346.7 to 330.3" (the Visean). Now a unit whose b_age and t_age equal its own b_int_age and t_int_age (in any
 *   edition of the scale) is dated by its interval only, whatever the interval.
 * - A unit's own range can lie outside its own interval: Indianapolis's outwash (Macrostrat 4134198) "1.8 to 0.65
 *   million years ago" in a Late Pleistocene unit (the White River outwash was laid down after about 22,000 years ago,
 *   Indiana Geological and Water Survey, https://legacy.igws.indiana.edu/MarionCounty/LateWisGlacial), and Houston's
 *   Delta Silt And Clay (4045763) "653,800 to 11,700" in a Late Pleistocene unit. Such a range contradicts the map's own
 *   interval, so the interval is used.
 */
export function unitFromMacrostrat(u: MacrostratUnit): RockUnit {
  const own = u.b_age != null && u.t_age != null;
  const inter = u.b_int_age != null && u.t_int_age != null;
  const same = own && inter && sameAge(u.b_age!, u.b_int_age!) && sameAge(u.t_age!, u.t_int_age!);
  // Outside by more than the slack between editions of the scale (541 is the Cambrian base written 538.8).
  const outside =
    own && inter && !same && (canonical(u.b_age!) > canonical(u.b_int_age!) + slack(u.b_int_age!) || canonical(u.t_age!) < canonical(u.t_int_age!) - slack(u.t_int_age!));
  const byInterval = inter && (!own || same || outside);
  return {
    name: (u.name ?? "").trim(),
    lith: (u.lith ?? "").trim(),
    bAge: byInterval ? u.b_int_age! : own ? u.b_age! : null,
    tAge: byInterval ? u.t_int_age! : own ? u.t_age! : null,
    ageBasis: byInterval ? "interval" : own ? "unit" : null,
    bIntName: (u.b_int_name ?? "").trim(),
    tIntName: (u.t_int_name ?? "").trim(),
    bIntAge: inter ? u.b_int_age! : null,
    tIntAge: inter ? u.t_int_age! : null,
    description: u.descrip?.trim() || null,
    scale: u.scale ?? "",
    mapId: u.map_id ?? null,
    sourceId: u.source_id ?? null,
  };
}

// ---------------------------------------------------------------- time

/** ICS base of the Quaternary, Ma. Macrostrat's older scale writes 2.588. */
const QUATERNARY_BASE_MA = 2.6;

type Rank = "eon" | "era" | "period" | "subperiod" | "epoch" | "";

/**
 * Named intervals, [name, base Ma, top Ma, rank], from the International
 * Chronostratigraphic Chart v2023/09 (https://stratigraphy.org/ICSchart/ChronostratChart2023-09.pdf,
 * read 2 Nov 2026). Eons to epochs only: stage boundaries move between
 * editions and add nothing a reader can use. "Precambrian" is the chart's
 * informal name for everything before the Cambrian; Macrostrat uses it as an
 * interval (Atlanta's schist and gneiss, Macrostrat 2719114, is assigned
 * "Precambrian" to "Paleozoic").
 */
const INTERVALS: [string, number, number, Rank][] = [
  ["Precambrian", 4031, 538.8, ""],
  ["Phanerozoic", 538.8, 0, "eon"],
  ["Proterozoic", 2500, 538.8, "eon"],
  ["Archean", 4031, 2500, "eon"],
  ["Cenozoic", 66, 0, "era"],
  ["Mesozoic", 251.902, 66, "era"],
  ["Paleozoic", 538.8, 251.902, "era"],
  ["Neoproterozoic", 1000, 538.8, "era"],
  ["Mesoproterozoic", 1600, 1000, "era"],
  ["Paleoproterozoic", 2500, 1600, "era"],
  ["Quaternary", 2.58, 0, "period"],
  ["Neogene", 23.03, 2.58, "period"],
  ["Paleogene", 66, 23.03, "period"],
  ["Cretaceous", 145, 66, "period"],
  ["Jurassic", 201.4, 145, "period"],
  ["Triassic", 251.902, 201.4, "period"],
  ["Permian", 298.9, 251.902, "period"],
  ["Carboniferous", 358.9, 298.9, "period"],
  ["Devonian", 419.2, 358.9, "period"],
  ["Silurian", 443.8, 419.2, "period"],
  ["Ordovician", 485.4, 443.8, "period"],
  ["Cambrian", 538.8, 485.4, "period"],
  ["Ediacaran", 635, 538.8, "period"],
  ["Cryogenian", 720, 635, "period"],
  ["Tonian", 1000, 720, "period"],
  ["Stenian", 1200, 1000, "period"],
  ["Ectasian", 1400, 1200, "period"],
  ["Calymmian", 1600, 1400, "period"],
  ["Statherian", 1800, 1600, "period"],
  ["Orosirian", 2050, 1800, "period"],
  ["Rhyacian", 2300, 2050, "period"],
  ["Siderian", 2500, 2300, "period"],
  ["Holocene", 0.0117, 0, "epoch"],
  ["Pleistocene", 2.58, 0.0117, "epoch"],
  // The Pleistocene's parts, as Macrostrat's map units name them (Late Pleistocene 0.129, Chibanian 0.774): the chart's
  // Upper Pleistocene (0.129 to 0.0117 Ma), Chibanian (0.774 to 0.129, the Middle Pleistocene) and Gelasian plus
  // Calabrian (2.58 to 0.774, the Early Pleistocene). Added after the audit of 11 November 2026, so that "129,000 years
  // ago to the present" is named as the Late Pleistocene to Holocene span it is.
  ["Late Pleistocene", 0.129, 0.0117, ""],
  ["Middle Pleistocene", 0.774, 0.129, ""],
  ["Early Pleistocene", 2.58, 0.774, ""],
  ["Pliocene", 5.333, 2.58, "epoch"],
  ["Miocene", 23.03, 5.333, "epoch"],
  ["Oligocene", 33.9, 23.03, "epoch"],
  ["Eocene", 56, 33.9, "epoch"],
  ["Paleocene", 66, 56, "epoch"],
  ["Late Cretaceous", 100.5, 66, "epoch"],
  ["Early Cretaceous", 145, 100.5, "epoch"],
  ["Late Jurassic", 161.5, 145, "epoch"],
  ["Middle Jurassic", 174.7, 161.5, "epoch"],
  ["Early Jurassic", 201.4, 174.7, "epoch"],
  ["Pennsylvanian", 323.2, 298.9, "subperiod"],
  ["Mississippian", 358.9, 323.2, "subperiod"],
  ["Late Devonian", 382.7, 358.9, "epoch"],
  ["Middle Devonian", 393.3, 382.7, "epoch"],
  ["Early Devonian", 419.2, 393.3, "epoch"],
  ["Late Ordovician", 458.4, 443.8, "epoch"],
  ["Middle Ordovician", 470, 458.4, "epoch"],
  ["Early Ordovician", 485.4, 470, "epoch"],
];

/**
 * Slack on a boundary. ICS boundary ages carry uncertainties
 * of a million years or more in the Paleozoic, and the source maps use
 * different editions of the scale (Macrostrat writes the base of the Ordovician
 * 486.85, the chart 485.4), so a unit that overhangs a boundary by less than
 * this is still counted inside the interval.
 */
const BOUNDARY_SLACK_MA = 1.5;
/** 1% of a younger boundary (the Quaternary base is 2.58 in the chart and 2.588 in Macrostrat's scale); none at the present. */
const slack = (boundary: number) => (boundary >= 10 ? BOUNDARY_SLACK_MA : boundary * 0.01);

/**
 * The smallest named interval that contains the whole age range, or null.
 * "Late Ordovician" for 449 to 446.5 Ma; null for a range that straddles
 * boundaries wider than any named interval here, so no name is printed.
 */
export function intervalFor(bAge: number | null, tAge: number | null): string | null {
  if (bAge == null || tAge == null) return null;
  const hi = Math.max(bAge, tAge);
  const lo = Math.min(bAge, tAge);
  const range = hi - lo;
  let best: { name: string; span: number } | null = null;
  for (const [name, base, top] of INTERVALS) {
    if (hi > base + slack(base) || lo < top - slack(top)) continue;
    // The slack forgives a small overhang (two editions of the scale), never a range that lies mostly outside. Audit,
    // 5 November 2026: 458.4 to 457.1 Ma lies wholly in the Late Ordovician but was named Middle, the shorter interval it
    // touched only through the slack.
    const outside = Math.max(0, hi - base) + Math.max(0, top - lo);
    if (outside > 0 && (range === 0 || outside / range > 0.5)) continue;
    const span = base - top;
    if (!best || span < best.span) best = { name, span };
  }
  return best?.name ?? null;
}

/**
 * The values other editions of the time scale give the same boundaries, as Macrostrat's map units carry them (read
 * from the units at Richmond, Charlotte, Atlanta, Baltimore, Philadelphia and Jacksonville, 11 November 2026: 541 and
 * 486.85 for the Cambrian and Ordovician bases, 358.86 for the Carboniferous base, 4000 for the Precambrian base,
 * 2.588 for the Quaternary base, 23.04 for the Neogene base, 143.1 for the Cretaceous base, 443.1 for the Silurian base).
 */
const BOUNDARY_EDITIONS: Record<number, number[]> = {
  4031: [4000],
  538.8: [541],
  485.4: [486.85],
  443.8: [443.1, 443.4],
  419.2: [419.62],
  358.9: [358.86],
  323.2: [323.4],
  251.902: [252.17],
  201.4: [201.3, 201.36],
  145: [143.1],
  23.03: [23.04],
  2.58: [2.588],
};
const near = (x: number, b: number) => Math.abs(x - b) <= Math.max(1e-4, b * 1e-4);
const onBoundary = (x: number, b: number) => near(x, b) || (BOUNDARY_EDITIONS[b] ?? []).some((e) => near(x, e));
/** The chart's value for a boundary written in another edition (486.85 is 485.4), else the value itself. */
const canonical = (x: number) => Number(Object.keys(BOUNDARY_EDITIONS).find((b) => onBoundary(x, Number(b))) ?? x);
/** The same age, allowing for the editions of the scale (Charlotte's granite: 485.4 on one map, 486.85 as its interval). */
function sameAge(a: number, b: number): boolean {
  return near(a, b) || near(canonical(a), canonical(b));
}

/**
 * The named interval(s) an age range is exactly the span of, or null when it is a range of the unit's own.
 *
 * Audit, 10 November 2026: a map that dates a unit only to a period gives it that period's start and end as its age,
 * and the page printed them as the unit's own: Atlanta's gneiss "4,000 to 251.9 million years ago" (4,000 Ma is
 * Macrostrat's start of the Precambrian, not a date for the rock), New York's till "2.6 million years ago to the
 * present" (the Quaternary), and the Cenozoic "66 million years ago to the present" with the dig's "and still forming".
 * Both ends must sit on a boundary of the chart (in any edition Macrostrat uses); the name is the widest interval
 * starting at the older end and the widest ending at the younger: "Cenozoic", "Ordovician to Devonian",
 * "Precambrian to Paleozoic". A range that ends anywhere else is the unit's own and is printed as before.
 */
export function spanName(bAge: number | null, tAge: number | null): string | null {
  if (bAge == null || tAge == null) return null;
  const hi = Math.max(bAge, tAge);
  const lo = Math.min(bAge, tAge);
  if (hi === lo) return null;
  const starts = INTERVALS.filter(([, base, top]) => onBoundary(hi, base) && (top >= lo || onBoundary(lo, top)));
  const ends = INTERVALS.filter(([, base, top]) => onBoundary(lo, top) && (base <= hi || onBoundary(hi, base)));
  if (!starts.length || !ends.length) return null;
  const widest = (xs: typeof INTERVALS) => xs.reduce((a, b) => (b[1] - b[2] > a[1] - a[2] ? b : a));
  const s = widest(starts)[0];
  const e = widest(ends)[0];
  return s === e ? s : `${s} to ${e}`;
}

/** "the Cenozoic era", "the Quaternary period", "the Precambrian to the Paleozoic": an interval name in a sentence. */
export function spanPhrase(name: string): string {
  const parts = name.split(" to ");
  if (parts.length === 2) return `the ${parts[0]} to the ${parts[1]}`;
  const rank = INTERVALS.find(([n]) => n === name)?.[3] ?? "";
  return rank ? `the ${name} ${rank}` : `the ${name}`;
}

const RANK_ORDER: Rank[] = ["epoch", "subperiod", "period", "era", "eon"];
/** The shortest interval of the finest rank that holds a point just inside one end of a range (in the chart's edition). */
function intervalAtEnd(x: number, end: "older" | "younger"): string | null {
  const p = canonical(x) + (end === "older" ? -1e-6 : 1e-6);
  for (const rank of RANK_ORDER) {
    const hits = INTERVALS.filter(([, base, top, r]) => r === rank && p <= base && p >= top);
    if (hits.length) return hits.reduce((a, b) => (b[1] - b[2] < a[1] - a[2] ? b : a))[0];
  }
  return null;
}

/**
 * A range named by the intervals its two ends fall in: "Oligocene to Miocene" for 27.3 to 11.63 Ma, where the only
 * single interval that holds it is the Cenozoic. Added after the audit of 13 November 2026 (Day 4) for units whose maps
 * disagree on the age (see `jointDates`).
 */
export function endsName(bAge: number | null, tAge: number | null): string | null {
  if (bAge == null || tAge == null) return null;
  const a = intervalAtEnd(Math.max(bAge, tAge), "older");
  const b = intervalAtEnd(Math.min(bAge, tAge), "younger");
  if (!a || !b) return null;
  if (a === b) return a;
  // Where one period (or finer) holds both ends, it is named: Glasgow's Clackmannan Group is Carboniferous, not
  // "Mississippian to Pennsylvanian".
  const within = intervalFor(bAge, tAge);
  const rank = INTERVALS.find(([n]) => n === within)?.[3];
  return within && (rank === "period" || rank === "subperiod" || rank === "epoch") ? within : `${a} to ${b}`;
}

const num = (x: number, digits = 1) => {
  const f = 10 ** digits;
  return (Math.round(x * f) / f).toLocaleString("en", { maximumFractionDigits: digits });
};

/**
 * An age range the way a sentence says it, older end first:
 * "449 to 446.5 million years ago", "129,000 years ago to the present",
 * "1.6 to 1.0 billion years ago". Null where the map gives no range.
 */
export function ageRangeText(bAge: number | null, tAge: number | null): string | null {
  if (bAge == null || tAge == null) return null;
  const hi = Math.max(bAge, tAge);
  const lo = Math.min(bAge, tAge);
  const years = (ma: number) => Math.round(ma * 1e6).toLocaleString("en");
  if (hi < 1) {
    if (lo === 0) return `${years(hi)} years ago to the present`;
    return years(hi) === years(lo) ? `${years(hi)} years ago` : `${years(hi)} to ${years(lo)} years ago`;
  }
  const bn = (x: number) => (x / 1000).toLocaleString("en", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  if (lo >= 1000) return `${bn(hi)} to ${bn(lo)} billion years ago`;
  if (lo === 0) return `${num(hi)} million years ago to the present`;
  // Audit of 13 November 2026 (Day 4): Sacramento's range was printed "4.4 to 0.01 million years ago"; its younger end is
  // 11,700 years (the end of the Pleistocene), which "0.01 million" hides. An end under a million years is given in years.
  if (lo < 1) return `${num(hi)} million to ${years(lo)} years ago`;
  if (num(hi) === num(lo)) return `${num(hi)} million years ago`;
  return `${num(hi)} to ${num(lo, lo < 1 ? 2 : 1)} million years ago`;
}

/**
 * The same range as an adjective phrase for a child's dig: "449 to 446.5 million years old". A range that reaches the
 * present reads "up to 129,000 years old": the map's range ends today, which does not make a deposit "still forming"
 * (audit, 10 November 2026: New York's till).
 */
export function ageRangeOld(bAge: number | null, tAge: number | null): string | undefined {
  const t = ageRangeText(bAge, tAge);
  if (!t) return undefined;
  return t.endsWith(" ago to the present") ? `up to ${t.replace(/ ago to the present$/, " old")}` : t.replace(/ ago$/, " old");
}

// ---------------------------------------------------------------- what a unit is

const SCALE_RANK: Record<string, number> = { large: 0, medium: 1, small: 2, tiny: 3 };

/**
 * The USGS Quaternary geologic map series of 4° x 6° quadrangles (Miscellaneous Investigations Series I-1420), drawn at
 * 1:1,000,000, by Macrostrat source id: every source whose name is "Quaternary geologic map of the ... 4° x 6°
 * quadrangle" in Macrostrat's list (https://macrostrat.org/api/v2/defs/sources?all=true&format=csv, read 14 November
 * 2026; the scale from the references of sources 504, 509, 521 and 531, "scale 1:1,000,000",
 * https://macrostrat.org/api/v2/defs/sources?source_id=504,509,521,531). Macrostrat files them "medium", the same as the
 * 1:500,000 state maps (Quaternary deposits of Illinois, 507; Quaternary geology of Wisconsin, 550; of Southern
 * Michigan, 541).
 *
 * Audit of 10 November 2026, checked 14 November: trusted as detailed, they printed regional map classes as the town's
 * ground. Niagara-on-the-Lake "alluvium" (the Lake Erie sheet, 530; the town sits on Glacial Lake Iroquois sand, silt and
 * clay over Halton Till), Madison "ground moraine" (the Chicago sheet, 506, where Wisconsin's 1:500,000 map, 550, gives
 * lake sediment), Grand Rapids "Henry Formation in Illinois; Atherton Formation in Indiana" (506's description of the
 * class), Austin "Deweyville Terrace, Beaumont, Lissie and Willis age" (509), and 506's "Thickness 2-30 m." as the
 * thickness of Madison's own ground. They now rank below the 1:500,000 maps, are labelled regional wherever they are
 * printed, and their descriptions (thickness included) are never printed or used: they describe a class across a sheet
 * of some 200,000 km², not the town's spot.
 */
export const REGIONAL_SOURCES: Record<number, string> = Object.fromEntries(
  [502, 503, 504, 505, 506, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 530, 531, 532, 533, 534, 535, 536, 537, 538].map((id) => [
    id,
    "a regional map of surface deposits (USGS, 1:1,000,000)",
  ]),
);
/** From one of the 1:1,000,000 Quaternary sheets (see `REGIONAL_SOURCES`). */
export const isRegional = (u: Pick<RockUnit, "sourceId">) => u.sourceId != null && u.sourceId in REGIONAL_SOURCES;
/** Map detail: large 0, medium 1, a 1:1,000,000 regional sheet 1.5 (below the 1:500,000 state maps), small 2, tiny 3. */
export const scaleRank = (u: Pick<RockUnit, "scale"> & { sourceId?: number | null }) => (u.sourceId != null && u.sourceId in REGIONAL_SOURCES ? 1.5 : (SCALE_RANK[u.scale] ?? 9));

/**
 * Macrostrat sources that map the buried Precambrian basement or the Precambrian surface, not the rock at the surface
 * (Sims 2001, Anderson 2006, Sims 1990 and the like). Audit, 5 November 2026: they ranked with the state bedrock maps,
 * so Denver, Omaha and Des Moines were put on billion-year-old rock lying a kilometre or more down. They are never
 * taken as the bedrock. Audit of 13 November 2026 (Day 4): Boise's "Extended continental crust, 4,031 to 251.9 million
 * years ago" (Macrostrat 3771006) is from source 462, the "Precambrian Crystalline Basement Map of Idaho - An
 * Interpretation of Aeromagnetic Anomalies" (https://macrostrat.org/api/v2/defs/sources?source_id=462, read 13 November
 * 2026): buried basement drawn from magnetic anomalies. It lost to the gravels only by Macrostrat's order.
 */
export const BASEMENT_SOURCES = new Set([460, 461, 462, 463, 465, 486, 487, 489]);

/**
 * Audit of 10 November 2026, checked 14 November: two more basement maps were filed "medium" and became the bedrock.
 * Bozeman was put on Archean rock from source 465, "Precambrian basement geologic map of Montana -- an interpretation of
 * aeromagnetic anomalies" (unit 3775937, whose description is the one word "Covered"); the town sits on Tertiary basin
 * fill, the Sixmile Creek Formation of the Montana map (542). Laramie was put on Mesoproterozoic rock from source 489,
 * "Preliminary Precambrian Basement Map Showing Geologic-Geophysical Domains, Wyoming" (unit 3901525, "Mapped from
 * aeromagnetic map of Wyoming"); the town sits on Permian Satanka shale and Casper sandstone. 465 and 489 are added, and
 * 487, "Precambrian Basement Terrane of South Dakota", which no town has met yet. Names from
 * https://macrostrat.org/api/v2/defs/sources?all=true&format=csv (read 14 November 2026); src/data/macrostrat-sources.json
 * keeps the names read, and scripts/check-ground.ts fails if any name there matching `BASEMENT_SOURCE_NAME` is missing
 * from the set. A unit from a source not yet listed is caught by its own words (`isBuriedBasement`).
 */
export const BASEMENT_SOURCE_NAME = /\b(basement|aeromagnetic|magnetic|buried|subsurface|precambrian surface)\b/i;
/**
 * A unit drawn from geophysics or under cover, by its own words: a description that is just "Covered", or that says it
 * was mapped from magnetic or gravity data; a name that calls it basement.
 */
const BURIED_WORDS = /\b(aeromagnetic|magnetic anomal\w*|gravity anomal\w*|geophysical)\b/i;
export const isBuriedBasement = (u: Pick<RockUnit, "name" | "description" | "sourceId">) =>
  (u.sourceId != null && BASEMENT_SOURCES.has(u.sourceId)) ||
  /^covered\.?$/i.test((u.description ?? "").trim()) ||
  BURIED_WORDS.test(leadOf(u)) ||
  /\bbasement\b/i.test(u.name);

/**
 * Maps drawn for a whole continent or the world, by Macrostrat source id (read from
 * https://macrostrat.org/api/v2/defs/sources?source_id=7,154, 11 November 2026). Audit, 10 November 2026: where the
 * detailed maps held only loose deposits, the bedrock was taken from these, and Philadelphia was put on the Geologic
 * Map of North America's "Cambrian-Ordovician sedimentary" rock (the city's Piedmont rock is mainly Wissahickon
 * schist, USGS), and Jacksonville and Savannah on the world map's "Cenozoic sedimentary rocks". They are never the
 * town's bedrock; where no detailed map unit came back at all, the rock they show is printed as the district's, and
 * labelled with the map it is from.
 */
const COARSE_SOURCES: Record<number, string> = {
  7: "a continent-scale map (the Geologic Map of North America)",
  154: "a world-scale map (Generalized Geology of the World)",
};
/** From a continent- or world-scale map, or any map Macrostrat files as small or tiny scale. */
export const isCoarse = (u: Pick<RockUnit, "scale" | "sourceId">) => (u.sourceId != null && u.sourceId in COARSE_SOURCES) || u.scale === "small" || u.scale === "tiny";
/**
 * "a continent-scale map (the Geologic Map of North America)", "a regional map of surface deposits (USGS, 1:1,000,000)":
 * what kind of map a coarse or regional unit comes from.
 */
export const coarseMapName = (u: Pick<RockUnit, "sourceId">) =>
  (u.sourceId != null ? (COARSE_SOURCES[u.sourceId] ?? REGIONAL_SOURCES[u.sourceId]) : undefined) ?? "a small-scale map";

/**
 * Polygons a geologic map draws that are not ground at all. Audit, 10 November 2026: Fredericton's point falls on the
 * Saint John River, a unit the map calls "Water" (Macrostrat 4141536, no age, no lithology), and the page printed a
 * bedrock card titled "Water".
 */
const NOT_GEOLOGY = /^(?:open )?(?:water|lakes?|ponds?|rivers?|streams?|ocean|seas?|bays?|reservoirs?|estuar(?:y|ies)|ice|glaciers?|permanent (?:ice|snow)|snowfields?|ice ?caps?|unmapped|not mapped|no data|unknown)$/i;
export const isNonGeologic = (u: RockUnit) =>
  NOT_GEOLOGY.test(u.name) || (!u.name && !u.lith && !u.description && u.bAge == null && !u.bIntName);

/**
 * Man-made ground: pits, quarries, fill. It passes the age test for a surface deposit but is not a natural one. Audit of 10
 * November 2026, checked 14 November: "fill" matched Seattle's "Alluvium" (Macrostrat 2752173), whose description is
 * "Mostly unconsolidated silt, sand, and gravel valley fill", and it was classed as fill, pits or quarries. Valley, basin,
 * channel, fan and trough fill are natural sediment.
 */
const MADE_GROUND = /\b((?<!\b(?:valley|basin|channel|fan|trough|cave|sinkhole|graben|rift)[- ])fill|made ground|surface mines?|mine dumps?|quarr(?:y|ies)|pits?|landfill|artificial|disturbed)\b/i;
export const isMadeGround = (u: RockUnit) => MADE_GROUND.test(u.name) || MADE_GROUND.test(u.description?.split(".")[0] ?? "");

/** Lithologies only a surface unit would list, for a unit with neither an age nor an interval name. */
const SURFICIAL_LITH = /\b(alluvium|till|outwash|loess|colluvium|peat|glaciofluvial|glaciolacustrine|glaciomarine|lacustrine|eolian|dune)\b/i;

/**
 * Is this a Quaternary surface deposit: a unit whose whole age range lies
 * inside the Quaternary (base 2.6 Ma or younger), or that the map puts in the
 * Quaternary with no age range at all? (Older loose and weathered material is
 * cover too: see `coverKind`.)
 */
export function isSurfaceDeposit(u: RockUnit): boolean {
  if (u.ageBasis === "unit" && u.bAge != null) return u.bAge <= QUATERNARY_BASE_MA;
  if (/^(quaternary|holocene|pleistocene|late pleistocene|middle pleistocene|early pleistocene)$/i.test(u.bIntName)) return true;
  if (u.bAge != null) return u.bAge <= QUATERNARY_BASE_MA;
  return SURFICIAL_LITH.test(u.lith);
}

/** Rock weathered where it lies (saprolite, residuum), named so by the map. */
const WEATHERED = /\b(saprolite|residuum|regolith|decomposition|laterite|lateritic)\b/i;
/**
 * Loose material, by the map's name for the unit: "Gravel", "colluvium", "Shelly sediments" (not "Sandstone"). Not the
 * bare word "deposit": the European map names limestone and siltstone units "transgressive deposit" or "mostly biogenic
 * deposit" (Paris, Nice), and "flysch (sediments)" is a rock.
 */
const LOOSE_NAME = /\b(colluvi\w*|alluvi\w*|surficial|unconsolidated|gravels?|sands?|clays?|silts?|muds?)\b|(?<!\()\bsediments\b/i;
/** Loose material, by the opening sentence of the map's description (never a sentence about what overlies it). */
const LOOSE_LEAD = /\b(saprolite|residuum|surficial|unconsolidated)\b/i;
const ABOUT_ANOTHER = /\b(overlain|underlain|overlies|underlies|beneath|below)\b/i;

/**
 * What kind of cover a unit is: a loose deposit, rock weathered where it lies, young volcanic rock (lava or ash whose
 * range runs to the present, as at Reykjavik and Rome), or not cover (null: rock).
 */
export type CoverKind = "deposit" | "weathered" | "volcanic";

const leadOf = (u: Pick<RockUnit, "description">) => (u.description ?? "").split(/(?<=\.)\s+(?=[A-Z])/)[0] ?? "";

/** The volcanic rock a young unit's main lithology names (basalt, volcanic rock), if any. */
function volcanicRockOf(u: RockUnit): Rock | undefined {
  const rock = rockForLithology(dominantInList(u.lith));
  return rock && (rock.slug === "basalt" || rock.slug === "volcanic-rock") ? rock : undefined;
}

/** A map name that calls the unit a deposit, so a rock word in its lithology names the stones in it, not the unit. */
const NAME_SAYS_DEPOSIT = /\b(deposits?|sediments?|alluvi\w*|colluvi\w*|till|outwash|loess|gravels?|sands?|clays?|silts?|muds?|surficial|unconsolidated|residuum|saprolite|fill)\b/i;
/** Rock words a formation's own name can carry ("Miami Limestone", "Miami Oolite", "Columbia River Basalt"). */
const ROCK_NAME_WORD = /\b(limestone|oolite|dolostone|dolomite|sandstone|siltstone|mudstone|claystone|shale|chalk|basalt|granite|gneiss|schist|slate|marble|quartzite|tuff|rhyolite|andesite|dacite)\b/;

/**
 * The rock a unit's main lithology names, whatever the unit's age: the dominant item of its lithology list where the list
 * has an order (not loose material, not a bare family word such as "sedimentary", not a soft "marl"), else, where the list
 * has no order or there is none, a rock word in the map's own name. Never where the name calls the unit a deposit
 * (Asheville's "Granitic ... Bouldery Colluvium" lists "granitic" first: the stones in it).
 *
 * Audit of 13 November 2026 (Day 4): age was tested before rock type, so the Miami Limestone and the Miami Oolite
 * (Macrostrat 3923801, 3003958 "Major:{limestone,sandstone}", 4072704: Pleistocene, at or near the surface, forming the
 * Atlantic Coastal Ridge and much of the Biscayne Aquifer) were read as loose cover, and Miami and Fort Lauderdale were
 * told the maps "name no bedrock" and the dig stopped in "loose clay, sand, gravel and stones".
 */
export function lithologyRock(u: Pick<RockUnit, "name" | "lith">): Rock | undefined {
  if (NAME_SAYS_DEPOSIT.test(u.name)) return undefined;
  const item = dominantInList(u.lith);
  if (item) {
    if (isLooseItem(item) || FAMILY_ITEM.test(item)) return undefined;
    const rock = rockForLithology(item);
    return rock && !(rock.slug === "marl" && !/marlstone/.test(item)) ? rock : undefined;
  }
  const word = u.name.toLowerCase().match(ROCK_NAME_WORD)?.[1];
  return word ? rockForLithology(word) : undefined;
}

/**
 * Is the unit cover (lying over the bedrock) rather than bedrock, and of which kind? Audit, 10 November 2026: the split
 * was on the start age alone, so anything older than the Quaternary was "bedrock". Richmond's "Sand And Clay
 * Decomposition Residuum" (Macrostrat 4179508, weathered sand 3 to 15 m thick), Charlotte's "Sandy Clay Saprolite"
 * (4076559) and Baltimore's "Clayey Saprolite" (4180699) were printed as Cenozoic bedrock "66 million years ago to the
 * present", and the dig called them "solid rock ... still forming". Now a unit is cover when:
 * - the map names it, or opens its description, as weathered material (saprolite, residuum): "weathered";
 * - its whole range lies in the Quaternary (as before), or its range runs to the present: no rock is still forming;
 * - the map names it as loose material ("Gravel", "colluvium", "Lowland deposits"), lists only loose material in its
 *   lithology ("Major:{gravel}"), or opens its description calling it surficial or unconsolidated.
 */
export function coverKind(u: RockUnit): CoverKind | null {
  const lead = leadOf(u);
  if (WEATHERED.test(u.name) || (WEATHERED.test(lead) && !ABOUT_ANOTHER.test(lead))) return "weathered";
  const young = isSurfaceDeposit(u) || u.tAge === 0;
  // A rock is rock whatever its age (audit of 13 November 2026: see `lithologyRock`). Young lava and ash stay the
  // "volcanic" cover they were. Not on a continent- or world-scale map, whose "sandstone-siltstone" for the Quaternary
  // Nile valley (Cairo, Luxor) is a generalisation of loose sediment, not a rock.
  const rock = isCoarse(u) ? undefined : lithologyRock(u);
  if (rock) return young && (rock.slug === "basalt" || rock.slug === "volcanic-rock") ? "volcanic" : null;
  // Audit of 10 November 2026, checked 14 November: Portland's "Quaternary surficial deposits; Alluvial deposits"
  // (Macrostrat 1548888, "Alluvium; 60m thick") lists "volcanic ash" first, and was printed as "volcanic rock at the
  // surface" and dug as "Young volcanic rock". A name that calls the unit a deposit decides, as in `lithologyRock`.
  if (young) return volcanicRockOf(u) && !NAME_SAYS_DEPOSIT.test(u.name) ? "volcanic" : "deposit";
  if (isLooseLithology(u.lith)) return "deposit";
  // "sedimentary, gravel, sand, silt" (Boise, Macrostrat 4548175): a family word, then only loose material.
  const items = majorItems(u.lith);
  if (items.length > 1 && FAMILY_ITEM.test(items[0]) && items.slice(1).every(isLooseItem)) return "deposit";
  // The name and the description count only where the map's main lithology is not a rock: "Post orogene sediments,
  // Dinarides" is listed as claystone (Sarajevo), and stays rock.
  if (rockForLithology(dominantInList(u.lith))) return null;
  if (LOOSE_NAME.test(u.name) || (LOOSE_LEAD.test(lead) && !ABOUT_ANOTHER.test(lead))) return "deposit";
  return null;
}
export const isCover = (u: RockUnit) => coverKind(u) !== null;

// ---------------------------------------------------------------- views

export type UnitView = {
  unit: RockUnit;
  /** The rock (bedrock) or deposit type the unit is, from its dominant lithology / its name; undefined where none fits. */
  rock: Rock | undefined;
  /** Where the rock was read: the map's own lithology list, another map's list for the same unit, its description, or its name. */
  lithFrom: LithSource | null;
  /** Named interval containing the whole age range (ICS), or the interval(s) the map dates it to; null if none. */
  interval: string | null;
  /** True where the map gives the unit only an interval (its range is just that interval's span): no range is printed. */
  periodOnly: boolean;
  /**
   * Where `periodOnly`: what the map dates the unit to, in a sentence ("the Late Pleistocene", "the Visean, part of the
   * Mississippian subperiod"); null otherwise.
   */
  datedTo: string | null;
  /** "449 to 446.5 million years ago"; null where the map gives no range of the unit's own. */
  ageRange: string | null;
  /** True where the maps of this spot disagree on the unit's age, so it is dated by the span all their intervals cover. */
  joint: boolean;
  /** Cover (a loose deposit, or rock weathered in place), or null for rock. */
  cover: CoverKind | null;
  /** From a continent-, world- or small-scale map. */
  coarse: boolean;
  /** The map's own sentence on thickness, verbatim, or null. */
  thickness: string | null;
  /** First sentence of the map's description (without the thickness sentence), verbatim. */
  lead: string | null;
  /** The rest of the description, verbatim. */
  rest: string | null;
};

const THICKNESS_SENTENCE = /^(?:(?:total|maximum|approximate|average)\s+)?thickness\b/i;

/** Split a map description into a first sentence, the thickness sentence, and the rest. */
export function splitDescription(text: string | null): { lead: string | null; thickness: string | null; rest: string | null } {
  if (!text) return { lead: null, thickness: null, rest: null };
  const sentences = text.split(/(?<=\.)\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean);
  const thickness = sentences.find((s) => THICKNESS_SENTENCE.test(s)) ?? null;
  const body = sentences.filter((s) => s !== thickness);
  return { lead: body[0] ?? null, thickness, rest: body.length > 1 ? body.slice(1).join(" ") : null };
}

/**
 * What the map says about a unit's thickness, verbatim: its thickness sentence, else a clause that gives one
 * ("...; thickness 0 to 150 feet" in Washington's Lowland deposits, Macrostrat 4484922; "as much as 24 m" after
 * "Total thickness"). Null where the description gives none.
 */
export function thicknessOf(text: string | null): string | null {
  const clause = (text ?? "").match(/(?:^|[;:]\s*|\.\s+)((?:(?:total|maximum|approximate|average)\s+)?thickness\b[^;]*?)(?=;|\.\s|\.$|$)/i);
  // Audit of 10 November 2026, checked 14 November: Grand Forks's River sediment (Macrostrat 3880196) says "as thick as
  // 10 meters (30 feet)", and the dig said "a depth the maps here do not give". A clause that gives a figure with its
  // unit ("as thick as 10 meters (30 feet)", "as much as 24 m thick", "60m thick") is the map's thickness too.
  const phrase = (text ?? "").match(
    /\b(as thick as\s+\d[\d.,]*\s*(?:m|meters?|metres?|ft|feet)\b(?:\s*\([^)]*\))?|(?:(?:as much as|up to|about)\s+)?\d[\d.,]*(?:\s*(?:-|–|to)\s*\d[\d.,]*)?\s*(?:m|meters?|metres?|ft|feet)\s+thick\b)/i,
  );
  const c = (splitDescription(text).thickness ?? clause?.[1] ?? phrase?.[1] ?? "").trim();
  if (!c) return null;
  return `${c.charAt(0).toUpperCase()}${c.slice(1)}${c.endsWith(".") ? "" : "."}`;
}

/**
 * The Quaternary interval a cover unit's own name dates it to ("Quaternary alluvium and marine deposits": the
 * Quaternary), where the map's interval for the unit overlaps it. Audit of 13 November 2026 (Day 4): Sacramento's
 * "Quaternary alluvium" (Macrostrat 2842894) was printed "4.4 to 0.01 million years ago", a range of Macrostrat's own
 * that begins in the Pliocene; the map's name says Quaternary, and the Geologic Map of California's copy of the same
 * unit (4551448, the same description) dates it Pleistocene to Holocene. The name is the map's own dating.
 */
const NAME_INTERVAL = /^(?:(?:undivided|undifferentiated)\s+)?((?:late|middle|early)\s+pleistocene|pleistocene|holocene|quaternary)\b/i;
function nameInterval(u: RockUnit): string | null {
  const m = u.name.match(NAME_INTERVAL)?.[1]?.toLowerCase().replace(/\s+/g, " ");
  const hit = m ? INTERVALS.find(([n]) => n.toLowerCase() === m) : undefined;
  if (!hit || u.bAge == null || u.tAge == null) return null;
  // Only where the dating would run outside the name's interval (Sacramento's Pliocene start); a narrower interval inside
  // it (Barcelona's "Quaternary sediments", Pleistocene) is the map's and is kept.
  const outside = canonical(u.bAge) > canonical(hit[1]) + slack(hit[1]) || canonical(u.tAge) < canonical(hit[2]) - slack(hit[2]);
  if (!outside) return null;
  // A map interval that does not touch the named one at all is a contradiction the name does not settle.
  const ib = u.bIntAge ?? u.bAge;
  const it = u.tIntAge ?? u.tAge;
  return u.bIntAge == null || Math.min(ib, hit[1]) > Math.max(it, hit[2]) ? hit[0] : null;
}

function viewOf(unit: RockUnit, sameSpot: RockUnit[], joint: string | null = null): UnitView {
  const cover = coverKind(unit);
  let rock: Rock | undefined;
  let lithFrom: UnitView["lithFrom"] = null;
  if (cover === "volcanic") {
    rock = volcanicRockOf(unit);
    lithFrom = rock ? "lith" : null;
  } else if (cover) {
    rock = depositRockFor(unit);
    lithFrom = rock ? "name" : null;
  } else {
    const named = nameRock(unit);
    const hit = named ? { rock: named, from: "name" as const } : bedrockRockFor(unit, sameSpot);
    rock = hit.rock;
    lithFrom = hit.rock ? hit.from : null;
  }
  // A regional sheet's description is the class's across the sheet, never printed as this spot's (see `REGIONAL_SOURCES`).
  const d = isRegional(unit) ? { lead: null, thickness: null, rest: null } : splitDescription(aboutThisUnit(unit.description));
  // An age taken from the map's interval (Quaternary, 2.58 Ma to the present) is the interval's span, not the deposit's own
  // age, so only the interval's name is printed (audit, 5 November 2026). The same holds where the map writes the
  // interval's span in as the unit's own age (audit, 10 November 2026; see `spanName`, and `unitFromMacrostrat` for the
  // audit of 11 November 2026).
  const span = spanName(unit.bAge, unit.tAge);
  // Audit, 11 November 2026: every Quaternary deposit whose own range differed from its map interval was wrong. Houston's
  // Beaumont Formation (Macrostrat 2735591, interval Pleistocene) "655,800 to 11,700 years ago", where the USGS lexicon
  // gives the Beaumont as late Pleistocene (https://ngmdb.usgs.gov/Geolex/UnitRefs/BeaumontRefs_6750.html), and
  // Indianapolis's outwash "1.8 to 0.65 million years ago". All the others equalled their interval. A Quaternary deposit
  // is therefore dated by its map interval only: it says less, and what it says is the map's.
  // Audit of 13 November 2026 (Day 4): the same holds for Quaternary rock. The Miami Limestone's own range in Macrostrat
  // is 527,000 to 269,300 years (3003958), where the Florida Keys map dates the same formation, as the Miami Oolite, to
  // the Late Pleistocene, with uranium-series ages of about 90,000 to 145,000 years (4072704). A Quaternary unit, rock or
  // cover, is dated by its map interval only.
  const quaternaryOwn = unit.ageBasis === "unit" && isSurfaceDeposit(unit);
  const byName = cover ? nameInterval(unit) : null;
  const fixed = byName ?? joint;
  const periodOnly = fixed != null || unit.ageBasis === "interval" || span != null || quaternaryOwn || (unit.ageBasis == null && !!unit.bIntName);
  const named = fixed ? { interval: fixed, datedTo: spanPhrase(fixed) } : periodOnly ? intervalNames(unit, quaternaryOwn ? null : span, quaternaryOwn) : null;
  const d2 = d.thickness && !hasThicknessUnit(d.thickness) ? { ...d, thickness: `${d.thickness} ${NO_UNIT}` } : d;
  return {
    unit,
    rock,
    lithFrom,
    interval: named ? named.interval : intervalFor(unit.bAge, unit.tAge),
    periodOnly,
    datedTo: named?.datedTo ?? null,
    ageRange: periodOnly ? null : ageRangeText(unit.bAge, unit.tAge),
    joint: !byName && joint != null,
    cover,
    coarse: isCoarse(unit) || isRegional(unit),
    ...d2,
  };
}

/**
 * The rock word in a bedrock unit's own name ("Austin Chalk", "Bayport Limestone"), where the map's lithology list or
 * description names that rock too (or gives none), so the name is the map's word for what the unit is. Audit of 10
 * November 2026, checked 14 November: Austin's bedrock was "Late Cretaceous marl bedrock" for the Austin Chalk, because
 * the State Geologic Map Compilation lists it "Major:{marlstone,chalk}" (Macrostrat 2831140), while the Geologic Map of
 * Texas lists the same unit "chalk" (3988815) and both descriptions open "Chalk and marl; chalk mostly microgranular
 * calcite". The unit's name names the rock; a list's order is only the compiler's.
 */
function nameRock(u: RockUnit): Rock | undefined {
  if (NAME_SAYS_DEPOSIT.test(u.name)) return undefined;
  // Only a formation's name ending in its one rock word ("Austin Chalk"), not a list of rocks ("Mica Schist/ Gneiss/
  // Amphibolite", Atlanta, whose map lists gneiss first: the order of the list then decides, as before).
  const words = u.name.toLowerCase().match(new RegExp(ROCK_NAME_WORD.source, "g")) ?? [];
  const word = words.length === 1 && new RegExp(`\\b${words[0]}\\s*$`).test(u.name.toLowerCase().trim()) ? words[0] : undefined;
  if (!word) return undefined;
  const rock = rockForLithology(word);
  if (!rock) return undefined;
  const text = `${u.lith} ${u.description ?? ""}`.toLowerCase();
  return !u.lith.trim() || text.includes(word) ? rock : undefined;
}

/**
 * A map description without the sentences and clauses that list the named members of the map's class ("Includes the
 * Sacred Heart (~2592, 2603 Ma) and Ortonville granites; Shannon Lake Granite (~2674), and other ..."). Audit of 10
 * November 2026, checked 14 November: International Falls's bedrock card printed that sentence (Macrostrat 3900114),
 * which names granites elsewhere in Minnesota, as if about the town's rock. What is left is about the unit itself.
 */
const INCLUDES = /^\s*(?:it\s+)?(?:includes?|including)\s+/i;
/** A clause that opens "Includes" and names something with a capital (a formation, a granite, a complex). */
const listsMembers = (clause: string) => INCLUDES.test(clause) && /\b[A-Z][A-Za-z-]{2,}/.test(clause.replace(INCLUDES, ""));
export function aboutThisUnit(text: string | null): string | null {
  if (!text) return text;
  const kept = text
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((sentence) => {
      // The list runs from the clause that opens it to the end of its sentence ("...; Shannon Lake Granite (~2674), and other").
      const clauses = sentence.split(/;\s*/);
      const at = clauses.findIndex(listsMembers);
      if (at < 0) return sentence;
      const left = clauses.slice(0, at).join("; ").trim();
      return left ? `${left.replace(/[,;:\s]+$/, "")}.` : "";
    })
    .filter((s) => /[A-Za-z]/.test(s));
  return kept.length ? kept.join(" ") : null;
}

/** Is every name in "A" or "A to B" one of the chart's intervals here? */
const inTable = (name: string) => name.split(" to ").every((n) => INTERVALS.some(([x]) => x === n));

/**
 * The interval a unit dated only by its map interval is named by. The chart's own names where the span is one the table
 * knows ("Late Pleistocene to Holocene", "Cenozoic", "Ordovician to Devonian"); else the map's interval names, with the
 * chart's interval that holds them ("the Visean, part of the Mississippian subperiod": St. Louis's Meramecian Stage,
 * Macrostrat 3728039); the badge and the headline then use that chart interval ("Mississippian").
 */
function intervalNames(u: RockUnit, ownSpan: string | null, ownDistrusted = false): { interval: string | null; datedTo: string | null } {
  const phrase = (interval: string | null) => ({ interval, datedTo: interval ? spanPhrase(interval) : null });
  if (ownSpan) return phrase(ownSpan);
  const ib = u.bIntAge ?? (u.ageBasis === "interval" ? u.bAge : null);
  const it = u.tIntAge ?? (u.ageBasis === "interval" ? u.tAge : null);
  const chart = spanName(ib, it);
  if (chart) return phrase(chart);
  const b = u.bIntName.trim();
  const t = (u.tIntName ?? "").trim();
  const map = b && t ? (b === t ? b : `${b} to ${t}`) : null;
  if (map) {
    if (inTable(map)) return phrase(map);
    const within = intervalFor(ib, it);
    return { interval: within ?? map, datedTo: within ? `the ${map}, part of ${spanPhrase(within)}` : `the ${map}` };
  }
  // No top interval name (units stored before v3): the interval that holds the range, never the base interval's name
  // alone, which can end before the unit does ("Pliocene" for a unit running into the Pleistocene). A Quaternary
  // deposit's own range is not trusted (see `viewOf`), so nothing narrower than the Quaternary is read from it.
  if (ownDistrusted) {
    // An own range that is exactly an interval's span is that interval; else the map's base interval where it holds the
    // range; else only the Quaternary, which every Quaternary deposit is in.
    const own = spanName(u.bAge, u.tAge);
    const holds = b && inTable(b) && intervalFor(u.bAge, u.tAge) != null && INTERVALS.some(([n, base, top]) => n === b && (u.bAge ?? 99) <= base + slack(base) && (u.tAge ?? -1) >= top - slack(top));
    return phrase(own ?? (holds ? b : "Quaternary"));
  }
  return phrase(spanName(u.bAge, u.tAge) ?? intervalFor(u.bAge, u.tAge) ?? (b || null));
}

/** Words after a thickness that say what it is measured in. */
const THICKNESS_UNIT = /\d\s*(?:m|cm|km|metres?|meters?|ft|feet|foot|inch(?:es)?|miles?)\b/i;
export const hasThicknessUnit = (s: string) => THICKNESS_UNIT.test(s);
/**
 * Audit, 11 November 2026: Indianapolis's bedrock card printed "Thickness 0-127 (0=erosional edge)." (Muscatatuck Group,
 * Macrostrat 3490712) with no unit. The map's sentence is kept, verbatim, and the card says it has no unit; the dig never
 * uses such a figure.
 */
const NO_UNIT = "(The map gives no unit for this figure.)";

// ---------------------------------------------------------------- layers

export type GroundLayers = {
  /** Cover units (loose deposits, weathered rock), most detailed map first, one per unit name (other maps' copies dropped). */
  surface: UnitView[];
  /** The first unit of a detailed map that is not cover; never a cover unit, never from a continent- or world-scale map. */
  bedrock: UnitView | null;
  /**
   * Only where NO detailed map unit came back for the point: the rock a continent-, world- or small-scale map shows in
   * the district, to be printed with the map it is from. Null wherever a detailed map covers the point, even when that
   * map shows only cover there (Philadelphia, Jacksonville): the coarse map's rock is then not the town's.
   */
  regionalBedrock: UnitView | null;
  /** The other units: other maps' versions of the same spot (some at the same scale, some coarser), not further layers. */
  others: UnitView[];
  /** Did any detailed (large- or medium-scale) map unit come back for the point? */
  detailed: boolean;
  /**
   * Only where no bedrock unit is named (neither `bedrock` nor `regionalBedrock`): the rock a cover unit's own description
   * says it lies on ("residuum on soft sandy limestone and shell-hash limestone"), verbatim, with the rock page it names.
   */
  beneath: Beneath | null;
};

/** What a cover unit's own description says it lies on: the unit, the words (verbatim) and the rock they name. */
export type Beneath = { unit: UnitView; text: string; rock: Rock | undefined };

/**
 * The keys that say two map units are one unit on two maps: the name (without a parenthesis: Boise's "Sediments and
 * sedimentary rocks (Pleistocene and Pliocene)" is the Idaho map's "Sediments and sedimentary rocks"); a member's own name
 * in a group's hierarchy (Tampa's "Hawthorn Group, Arcadia Formation, Tampa Member" is the state map's "Tampa Member");
 * a name the description says the unit formerly had (the Miami Limestone, "formerly the Miami Oolite"); and the
 * description itself where it is long enough to be the same text (Sacramento's two copies of "Alluvium, lake, playa, and
 * terrace deposits; unconsolidated and semi-consolidated..."). Unnamed units key on lithology. Audit of 13 November
 * 2026 (Day 4): each of these units was read as two, with two ages or two roles.
 */
function unitKeys(u: RockUnit): string[] {
  const norm = (s: string) => s.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  const keys: string[] = [];
  const n = norm(u.name);
  if (n) keys.push(`n:${n}`);
  const parts = u.name.split(",").map((s) => s.trim());
  if (parts.length > 1 && /\b(member|formation)$/i.test(parts[parts.length - 1]) && parts.slice(0, -1).every((p) => /\b(supergroup|group|subgroup|formation)$/i.test(p)))
    keys.push(`n:${norm(parts[parts.length - 1])}`);
  for (const m of (u.description ?? "").matchAll(/\bformerly (?:called |known as )?(?:the )?([A-Z][\w-]*(?: [A-Z][\w-]*)*)/g)) keys.push(`n:${norm(m[1])}`);
  const d = norm(u.description ?? "");
  if (d.length >= 60) keys.push(`d:${d}`);
  if (!n) keys.push(`l:${u.lith.toLowerCase()}`);
  return keys;
}
const sameUnit = (a: RockUnit, b: RockUnit) => a === b || unitKeys(a).some((k) => unitKeys(b).includes(k));

/** Does the unit's lithology list lead with a bare family word ("sedimentary, gravel, sand, silt")? */
const familyLed = (u: RockUnit) => FAMILY_ITEM.test(dominantInList(u.lith) ?? "");

/**
 * One cover unit per map unit. Audit, 11 November 2026: the same unit on two maps was shown as two surface layers,
 * because the key was the name AND the lithology, and each map words the lithology its own way: Memphis's "Loess"
 * ("silt" on one map, "Major:{silt}" on the other), New Orleans's "Natural Levees", Brownsville's "Alluvium in Rio
 * Grande". The most detailed map's copy is kept (or the first that carries an age, or, audit of 13 November 2026, a copy
 * at the same scale whose lithology list does not lead with a family word: Boise's state compilation
 * "Major:{gravel,sand,silt}" over the Idaho map's "sedimentary, gravel, sand, silt"). Units are matched by `unitKeys`.
 */
function dedupe(units: RockUnit[]): RockUnit[] {
  const out: RockUnit[] = [];
  for (const u of units) {
    const i = out.findIndex((x) => sameUnit(x, u));
    if (i < 0) out.push(u);
    else if (out[i].bAge == null && u.bAge != null) out[i] = u; // keep the copy that carries an age
    else if ((out[i].bAge != null) === (u.bAge != null) && scaleRank(u) === scaleRank(out[i]) && familyLed(out[i]) && !familyLed(u)) out[i] = u;
  }
  // Natural deposits first; man-made ground only when the map has nothing else.
  return out.sort((a, b) => Number(isMadeGround(a)) - Number(isMadeGround(b)));
}

/** 0 for a range of the unit's own, 1 for one dated only by an interval, 2 for no age. */
const ageRank = (u: RockUnit) => (u.ageBasis === "unit" && spanName(u.bAge, u.tAge) == null ? 0 : u.bAge != null || u.bIntName ? 1 : 2);

/**
 * The bedrock: the most detailed map's first unit that is not cover (Macrostrat lists its preferred map first); where
 * another map at the same scale gives the SAME unit (same name), the copy dated to a range of its own is taken before one
 * dated only by an interval. Audit, 11 November 2026: Columbus's two medium-scale maps both give the Columbus Limestone,
 * one with a range of its own (Middle Devonian, 392.4 to 388.4 Ma: Macrostrat 2826815) and one only the Early to Middle
 * Devonian span (3739146); which was printed depended on the order the units were stored in, and the ground page and
 * the strip disagreed. Units of different names keep the map's order.
 *
 * Audit of 13 November 2026 (Day 4): Boise's lake and river gravels were the surface card on one map's copy and the
 * "Pliocene to Pleistocene sedimentary rock" under them on the other's (Macrostrat 2991198, 4548175: the same unit and
 * description). A unit shown as cover is never also the bedrock, unless its own lithology names a rock. Copies are
 * matched by `unitKeys` (the Miami Limestone is the Miami Oolite).
 */
function pickBedrock(units: RockUnit[], cover: RockUnit[]): RockUnit | null {
  const rock = units.filter((u) => !isCover(u) && !(cover.some((c) => sameUnit(c, u)) && !lithologyRock(u)));
  if (!rock.length) return null;
  const best = Math.min(...rock.map(scaleRank));
  const first = rock.find((u) => scaleRank(u) === best)!;
  const copies = rock.filter((u) => scaleRank(u) === best && sameUnit(u, first));
  return [...copies].sort((a, b) => ageRank(a) - ageRank(b))[0];
}

/** A range the page would print as the unit's own (not an interval's span, not a Quaternary unit's: see `viewOf`). */
const printedOwn = (u: RockUnit) => u.ageBasis === "unit" && u.bAge != null && u.tAge != null && spanName(u.bAge, u.tAge) == null && !isSurfaceDeposit(u);
/** The span of the interval(s) a map assigns the unit, or its range where the map gives only that. */
const mapSpan = (u: RockUnit): [number, number] | null =>
  u.bIntAge != null && u.tIntAge != null ? [u.bIntAge, u.tIntAge] : u.bAge != null && u.tAge != null ? [u.bAge, u.tAge] : null;
const apart = (a: number, b: number) => Math.abs(canonical(a) - canonical(b)) > slack(Math.max(a, b));

/**
 * Where the maps of one spot give the same unit ages that cannot both be right, the date every copy is printed with: the
 * span all the copies' map intervals cover, named by its intervals ("Oligocene to Miocene"); no range is printed.
 *
 * Audit of 13 November 2026 (Day 4): Tampa's bedrock was "Oligocene limestone bedrock ... 24.3 to 23.7 million years
 * ago" (the state compilation's "Hawthorn Group, Arcadia Formation, Tampa Member", Macrostrat 2905140), where the Florida
 * state map's copy of the member (3923241) gives 24.1 to 17.1 Ma and the USGS lexicon has the Tampa as late Oligocene
 * (a strontium-isotope age of 25.4 Ma, Jones et al. 1993) to early Miocene (McCartan et al. 1995)
 * (https://ngmdb.usgs.gov/Geolex/UnitRefs/TampaRefs_4062.html, read 13 November 2026). Both maps assign the member to the
 * Chattian to the Middle Miocene, so "Oligocene to Miocene" is what they agree on, and it holds the lexicon's ages.
 * Copies disagree where two printed ranges differ by more than the slack between editions of the scale, or where one
 * printed range lies outside another copy's interval.
 */
function jointDates(units: RockUnit[]): Map<RockUnit, string> {
  const out = new Map<RockUnit, string>();
  const seen = new Set<RockUnit>();
  for (const u of units) {
    if (seen.has(u)) continue;
    const group = units.filter((x) => sameUnit(x, u));
    group.forEach((x) => seen.add(x));
    if (group.length < 2) continue;
    const disagree = group.some(
      (a) =>
        printedOwn(a) &&
        group.some((b) => {
          if (b === a) return false;
          if (printedOwn(b) && (apart(a.bAge!, b.bAge!) || apart(a.tAge!, b.tAge!))) return true;
          const s = mapSpan(b);
          return !!s && (canonical(a.bAge!) > canonical(s[0]) + slack(s[0]) || canonical(a.tAge!) < canonical(s[1]) - slack(s[1]));
        }),
    );
    if (!disagree) continue;
    const spans = group.map(mapSpan).filter((s): s is [number, number] => s != null);
    const hi = Math.max(...spans.map((s) => Math.max(...s)));
    const lo = Math.min(...spans.map((s) => Math.min(...s)));
    const name = spanName(hi, lo) ?? endsName(hi, lo);
    if (name) group.forEach((x) => out.set(x, name));
  }
  return out;
}

/**
 * What a cover unit's description says it lies on: "residuum on soft sandy limestone", "rests on", "overlies",
 * "underlain by", where the words name a rock. A terrace, a fan or a plain is not a rock and is not read (San Diego's
 * paralic deposits "rest on the 22-23 m Nestor terrace").
 */
const RESTS_ON =
  /\b(?:(?:residuum|saprolite|regolith|deposits?|sediments?|sand|clay|gravel|mantle|veneer)\s+(?:(?:developed|formed|lying|resting)\s+)?(?:on|upon)|(?:lies|lie|rests?|overlies|overlie)(?:\s+(?:on|upon))?|underlain\s+by)\s+([^.;]+)/gi;
function beneathOf(surface: UnitView[]): Beneath | null {
  for (const v of surface) {
    if (isRegional(v.unit)) continue; // a regional sheet's description is not about this spot (see `REGIONAL_SOURCES`)
    for (const m of (v.unit.description ?? "").matchAll(RESTS_ON)) {
      const text = m[1].trim();
      const word = text.toLowerCase().match(ROCK_NAME_WORD)?.[1];
      if (word) return { unit: v, text, rock: rockForLithology(word) };
    }
  }
  return null;
}

export function layersOf(units: RockUnit[]): GroundLayers {
  const usable = units.filter((u) => !isNonGeologic(u) && !isBuriedBasement(u));
  const ordered = [...usable].sort((a, b) => scaleRank(a) - scaleRank(b)); // stable: ties keep the API's order
  const detailedUnits = ordered.filter((u) => !isCoarse(u));
  const detailed = detailedUnits.length > 0;
  // With a detailed map, its cover and its rock; without one, the coarse maps' Quaternary deposits and their rock.
  const coverUnits = detailed ? detailedUnits.filter(isCover) : ordered.filter(isSurfaceDeposit);
  const surfaceUnits = dedupe(coverUnits);
  const bedrockUnit = detailed ? pickBedrock(detailedUnits, coverUnits) : null;
  const regionalUnit = detailed ? null : ordered.find((u) => !isCover(u)) ?? null;
  const shown = new Set<RockUnit>([...surfaceUnits, ...(bedrockUnit ? [bedrockUnit] : []), ...(regionalUnit ? [regionalUnit] : [])]);
  // Not listed again: a detailed map's cover unit that is a duplicate of one shown.
  const others = ordered.filter((u) => !shown.has(u) && !(isCover(u) && (detailed ? !isCoarse(u) : isSurfaceDeposit(u))));
  const joint = jointDates(detailedUnits);
  const view = (u: RockUnit) => viewOf(u, ordered, joint.get(u) ?? null);
  const surface = surfaceUnits.map(view);
  const bedrock = bedrockUnit ? view(bedrockUnit) : null;
  const regionalBedrock = regionalUnit ? view(regionalUnit) : null;
  return {
    surface,
    bedrock,
    regionalBedrock,
    others: others.map(view),
    detailed,
    beneath: bedrock || regionalBedrock ? null : beneathOf(surface),
  };
}

// ---------------------------------------------------------------- words

/**
 * The bedrock in a phrase, from what the map says: "Late Ordovician shale
 * bedrock", "Eocene sedimentary rock", "bedrock" (the rock is named only when
 * its dominant lithology is one of the rock pages').
 */
export function bedrockPhrase(v: UnitView): string {
  const noun = v.rock ? v.rock.name.toLowerCase() : "";
  const head = v.interval ? `${v.interval} ` : "";
  if (noun.endsWith("rock")) return `${head}${noun}`;
  return `${head}${noun ? `${noun} ` : ""}bedrock`;
}

/** Words that already say what a layer is, so "deposits" is not added after them (audit, 10 November 2026: "lowland deposits deposits"). */
const MATERIAL_END = /\b(deposits?|sediments?|saprolite|residuum|colluvium|alluvium|till|outwash|peat|loess|gravels?|regolith|fill|ground)$/;
/** The nouns that say what kind of deposit a map unit is, the first in its name. */
const DEPOSIT_NOUN = /\b(loess|colluvium|alluvium|till|outwash)\b/i;
const TIME_WORDS = /^(?:(?:quaternary|holocene|pleistocene|recent|tertiary|late|middle|early|young|younger|old|older)\s+)+/;

/**
 * "silt deposits", "alluvium", "clay and sand deposits", "weathered rock (saprolite)": the cover in a phrase, from the
 * map's dominant lithology where its list is in order, else both items of a two-item list (no order claimed), else
 * the unit's name.
 */
export function surfacePhrase(v: UnitView): string {
  if (isMadeGround(v.unit)) return "made ground (fill, pits or quarries)";
  if (v.cover === "weathered") {
    const what = `${v.unit.name} ${leadOf(v.unit)}`.match(/saprolite|residuum/i)?.[0]?.toLowerCase();
    return what ? `weathered rock (${what})` : "weathered rock";
  }
  if (v.cover === "volcanic" && v.rock) return v.rock.name.toLowerCase();
  // Audit, 11 November 2026: Asheville's "Granitic Or Arkosic Metasedimentary Bouldery Colluvium" (Macrostrat 4076556,
  // lithology "granitic, metasedimentary, clay") was printed as "granitic deposits": the first lithology word names the
  // stones in it, not what the deposit is. Where the map's name says what kind of deposit it is, that word is used: the
  // name itself if it is short and ends in it ("bouldery sandy colluvium"), else the word ("colluvium"; Memphis's "Loess
  // And Loessial Colluvium And Alluvium" is "loess").
  // Audit of 10 November 2026, checked 14 November: Portland's "Quaternary surficial deposits; Alluvial deposits" (whose
  // description opens "Alluvium") was printed from its lithology list as "volcanic ash deposits". Alluvial deposits are
  // alluvium.
  const kind = /\balluvial deposits?\b/i.test(v.unit.name) ? "alluvium" : v.unit.name.match(DEPOSIT_NOUN)?.[1]?.toLowerCase();
  if (kind) {
    // The name without the age words maps put in front ("Quaternary alluvium" is alluvium) or the qualifiers after a comma.
    // Audit of 13 November 2026 (Day 4): Sacramento's and Santa Barbara's "Quaternary alluvium and marine deposits" (a
    // statewide unit's name; Sacramento has no marine deposits at the surface) was printed whole. A name that joins two
    // materials is not used; the deposit word is.
    const words = v.unit.name.toLowerCase().split(/[,;(]/)[0].replace(TIME_WORDS, "").split(/\s+/).filter(Boolean);
    const joined = words.some((w, i) => (w === "and" || w === "or") && words.slice(0, i).some((x) => DEPOSIT_NOUN.test(x) || MATERIAL_END.test(x)));
    return words.length <= 5 && !joined && MATERIAL_END.test(words.join(" ")) && words.includes(kind) ? words.join(" ") : kind;
  }
  const items = majorItems(v.unit.lith);
  const pair = items.length === 2 && isAlphabeticalList(v.unit.lith) ? `${items[0]} and ${items[1]}` : null;
  // Audit of 13 November 2026: Tucson's lithology is one string, "sorted ash sand silt clay soil carbonate" (Macrostrat
  // 3662608), and was printed as a noun. A dominant item is used only where it is a material word (sand, coarse
  // alluvium), never a family word ("sedimentary").
  const dom = dominantInList(v.unit.lith);
  const material = dom && !FAMILY_ITEM.test(dom) && (isLooseItem(dom) || MATERIAL_END.test(dom) || dom.split(/\s+/).length <= 2) ? dom : null;
  // A family word alone ("sedimentary", "sedimentary rocks" on a small-scale map's Quaternary unit) says sedimentary deposits.
  const family = dom && FAMILY_ITEM.test(dom) ? dom.replace(/\s+rocks?$/, "") : null;
  const label = material ?? pair ?? family ?? namePhrase(v.unit.name) ?? "surface";
  return MATERIAL_END.test(label) ? label : `${label} deposits`;
}

/**
 * A cover unit's map name as a phrase: the words before a comma, a parenthesis or "of" ("Floodplain deposits of the Rio
 * Grande, Rio Puerco, and Jemez River" is floodplain deposits; "Old paralic deposits, Unit 6" is old paralic deposits),
 * without a leading period name, lower-cased only where the map writes every word with a capital (proper names written
 * inside a sentence-case name keep theirs). Audit of 13 November 2026 (Day 4): the whole name was lower-cased and
 * "deposits" added after it ("floodplain deposits of the rio grande, rio puerco, and jemez river deposits", "old
 * paralic deposits, unit 6 deposits", "miami oolite deposits").
 */
function namePhrase(name: string): string | null {
  const head = name.split(/[,;(]|\s+of\s+/i)[0].trim();
  const words = head.split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  const title = words.filter((w) => w.length > 2).every((w) => /^[A-Z]/.test(w));
  const out = words
    .map((w, i) => (title || i === 0 ? w.toLowerCase() : w))
    .join(" ")
    .replace(/^(?:(?:quaternary|holocene|pleistocene|tertiary|recent|undivided|undifferentiated)\s+)+/i, "");
  return out || null;
}

/** ", 449 to 446.5 million years ago" or ", dated by the map only to the Quaternary period": the age part of a fact line. */
const ageClause = (v: UnitView) =>
  v.ageRange ? `, ${v.ageRange}` : v.periodOnly && v.datedTo ? `, dated by the ${v.joint ? "maps of this spot" : "map"} only to ${v.datedTo}` : "";
const mapClause = (v: UnitView) => (v.coarse ? `; from ${coarseMapName(v.unit)}` : "");

/** The strip on the gardening, fishing and foraging pages: one line per layer, the map unit named so it can be checked. */
export const surfaceFact = (v: UnitView) => `${surfacePhrase(v)} (map unit: ${v.unit.name || "unnamed"}${mapClause(v)})${ageClause(v)}`;
export const bedrockFact = (v: UnitView) => `${bedrockPhrase(v)} (map unit: ${v.unit.name || "unnamed"}${mapClause(v)})${ageClause(v)}`;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * The sentence for a rock named only in a cover unit's description. Audit of 13 November 2026 (Day 4): Fort Myers was
 * told "The detailed maps here name no bedrock beneath it", while the page's own card for the Calcareous Sand Solution
 * Residuum (Macrostrat 4075116) says it is "residuum on soft sandy limestone and shell-hash limestone" and
 * "Thickness 1-3 m." No map draws that limestone as a unit, so it is given as the map's words, with its thickness.
 */
export function beneathSentence(b: Beneath, first?: UnitView): string {
  const t = b.unit.thickness && hasThicknessUnit(b.unit.thickness) ? ` The map says: ${b.unit.thickness}` : "";
  return b.unit === first || !first
    ? `No map here draws a bedrock unit beneath it, but the map's own description says it lies on ${b.text}.${t}`
    : `No map here draws a bedrock unit beneath it, but one of them describes the ${b.unit.unit.name || "cover"} here as lying on ${b.text}.${t}`;
}

/** The opening line of /ground/<town>, from the layers. Never claims more than the map returned. */
export function groundStandfirst(name: string, layers: GroundLayers): string {
  const { surface, bedrock, regionalBedrock: reg } = layers;
  const s = surface[0];
  // A coarse or regional map's cover is the district's, not the spot's (audit of 10 November 2026, checked 14 November:
  // Niagara-on-the-Lake's "alluvium" from a 1:1,000,000 sheet), so it is said to be in the district and never put "over"
  // a detailed map's bedrock as if the two were one stack.
  const shows = s
    ? s.coarse
      ? `${cap(coarseMapName(s.unit))} shows ${surfacePhrase(s)} in the district around ${name}${s.interval ? ` (${s.interval})` : ""}`
      : `The geologic map shows ${surfacePhrase(s)} at the surface at ${name}${s.interval ? ` (${s.interval})` : ""}`
    : "";
  if (s?.coarse && bedrock) return `The geologic map shows ${bedrockPhrase(bedrock)} at ${name}. ${shows}.`;
  if (s && bedrock) return `${shows}, over ${bedrockPhrase(bedrock)}.`;
  if (bedrock) return `The geologic map shows ${bedrockPhrase(bedrock)} at ${name}. It returned no surface-deposit unit for this point.`;
  if (s && layers.detailed && layers.beneath) return `${shows}. ${beneathSentence(layers.beneath, s)}`;
  if (s && layers.detailed) return `${shows}. The detailed maps here name no bedrock beneath it.`;
  if (reg) return `${s ? `${shows}. ` : ""}The detailed geologic maps show no rock or deposit at this point; ${coarseMapName(reg.unit)} shows ${bedrockPhrase(reg)} in the district.`;
  if (s) return `${shows}. It returned no bedrock unit for this point.`;
  return `The rock beneath ${name}, the soil it weathers into, and where the water goes when it leaves.`;
}

// ---------------------------------------------------------------- the child's dig

/** The cover the dig shows over the rock: its name, the map's own thickness words, and whether it is loose or weathered. */
export type DigCover = { name: string; thickness: string | null; kind: CoverKind };

/**
 * The cover for /ground/<town>/dig, or undefined where the maps show none: the page's own first cover unit, with the
 * thickness that unit's map gives (only a figure with a unit). Audit, 10 November 2026: the dig put the rock "about 2 m
 * down" under Richmond, Charlotte, Atlanta and Raleigh, where the maps show residuum or saprolite 3 to 15 m, under 5 m
 * and 1 to 15 m thick: the weathered material was not counted as cover. Audit, 11 November 2026: the dig took the first
 * cover unit that gave a thickness, not the page's, and named another unit ("Clay deposits" at New Orleans where the page
 * says silt deposits; "Sand deposits" at Brownsville where it says flood-plain alluvium).
 */
export function digCover(layers: GroundLayers): DigCover | undefined {
  const pick = layers.surface[0];
  // Audit of 10 November 2026, checked 14 November: a 1:1,000,000 regional sheet's unit is the district's, not the
  // spot's (see `REGIONAL_SOURCES`), so the dig does not draw it as the ground under the town, nor use its thickness.
  if (!pick || isRegional(pick.unit)) return undefined;
  const kind = pick.cover ?? "deposit";
  const name =
    kind === "weathered" ? "Weathered rock" : isMadeGround(pick.unit) ? "Made ground" : kind === "volcanic" ? "Young volcanic rock" : pick.rock?.name ?? cap(surfacePhrase(pick));
  const t = thicknessOf(pick.unit.description);
  return { name, thickness: t && hasThicknessUnit(t) ? t : null, kind };
}

/**
 * Does the dig stop at the cover? Yes where the maps name no rock at all: neither a detailed map's bedrock nor (with no
 * detailed map) the district's. Audit, 11 November 2026: the dig drew "Solid rock ... somewhere under the [cover]" at
 * Houston, New Orleans, Memphis and Brownsville, where the loose sediment runs hundreds to thousands of metres down
 * (Texas Gulf Coast: a few feet to more than 12,000 ft, https://pubs.usgs.gov/publication/ofr9164; Memphis: up to
 * 3,000 ft, https://www.usgs.gov/publications/hydrology-aquifer-systems-memphis-area-tennessee) and the ground page
 * itself says the maps name no bedrock.
 */
export const digStopsAtCover = (layers: GroundLayers) => !rockNamed(layers) && layers.surface.length > 0;

/**
 * Do the maps name a rock under the town: a detailed map's bedrock, the district's from a coarse map, or (audit of 13
 * November 2026, Fort Myers) the rock a cover unit's own description says it lies on.
 */
export const rockNamed = (layers: GroundLayers) => !!(layers.bedrock || layers.regionalBedrock || layers.beneath);

/**
 * The rock and its age for the dig: the bedrock, else (no detailed map) the district's rock from a coarse map, else the
 * rock a cover unit's description names beneath it (no age: the description gives none).
 */
export function digRock(layers: GroundLayers): { rock?: string; rockAge?: string } {
  const b = layers.bedrock ?? layers.regionalBedrock;
  if (!b) return layers.beneath?.rock ? { rock: layers.beneath.rock.name } : {};
  const rockAge = b.periodOnly ? (b.interval ? `from ${spanPhrase(b.interval)}` : undefined) : ageRangeOld(b.unit.bAge, b.unit.tAge);
  return { rock: b.rock?.name, rockAge };
}

/**
 * Does the map name caliche at the dig's cover: soil carbonate, caliche or calcrete in its lithology or description?
 * Audit of 13 November 2026 (Day 4): Tucson's map unit (Macrostrat 3662608, "Intermediate river deposits") lists "soil
 * carbonate", and the dig never named caliche; the USDA's Tucson soil series has a calcic horizon within 20 inches
 * (https://soilseries.sc.egov.usda.gov/OSD_Docs/T/TUCSON.html, read 13 November 2026).
 */
export function digCaliche(layers: GroundLayers): boolean {
  const u = layers.surface[0]?.unit;
  return !!u && /\b(soil carbonate|caliche|calcrete|petrocalcic)\b/i.test(`${u.lith} ${u.name} ${u.description ?? ""}`);
}
