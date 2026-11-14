/**
 * Which of the library's fish have been recorded near a town (accuracy
 * audit, 2 November 2026).
 *
 * creatures.json gives each fish `regions` and `months`; both are region-level
 * lists. Printed under a town's name they claimed "in season now" for fish that
 * do not live near the town (steelhead, coho and Chinook at Ottawa, where
 * Ontario's FMZ 12 page says Pacific salmon "are not present in this Zone").
 * The rule now: a fish may be put under a town's "in season now", "best now" or
 * "Fish active" only when it has been RECORDED near the town.
 *
 * The evidence is src/data/place-presence-fish.json, built by
 * scripts/build-place-presence.ts from GBIF occurrence records inside a box of
 * +-60 km around each of the 264 towns (observations, machine observations and
 * museum specimens since 1990; no fossils, aquaria or DNA samples bought in
 * shops). `presentFish(slug)` classifies every fish at a town:
 *
 *  - "recorded": records in the box that are not too thin (below); the only
 *    status that may be shown as in season, best now or active.
 *  - "regional": nothing can be said near here. Either the town is data-poor
 *    (few fish of ANY species recorded there, so no record of this one proves
 *    nothing: much of Africa and eastern Europe), or the town is not in the
 *    table, or the evidence is too thin (`thinness` below), or the species
 *    cannot be told apart from another (steelhead). It may be listed
 *    only as "Regional species, not checked near here", with no months, no
 *    tactics and no "in season".
 *  - "absent": no record in the box at a town with plenty of fish records. Not
 *    shown.
 *
 * Presence only ever narrows: a fish must also be in the region list
 * (`creatureAt`) before the page considers it.
 *
 * Audit of 10 November 2026: two records anywhere in the box counted as
 * "recorded". Boston's flathead grey mullet rested on 2 museum specimens from
 * June 2000 whose coordinates fall in Rhode Island, 60 to 85 km out in a
 * corner of the box; all of Philadelphia's bluefish came from the Mullica
 * River in New Jersey, 85 km away; Fredericton's largemouth bass is one USGS
 * record of 3 July 2020 held as three rows; Charlottetown's smallmouth bass is
 * two records across the strait in Nova Scotia. The table holds, per fish, the
 * count, the nearest ring with a record, the latest year and the count by
 * month, and no GBIF rebuild is possible from here, so `thinness` reads those:
 * a record only in the corners, a handful of records none nearer than 30 km,
 * a few records none since 2005, and up to three rows that all fall in one
 * calendar month (counted as one record, as GBIF often holds one specimen
 * several times) are all too thin to say the fish lives near the town.
 *
 * Audit of 11 November 2026 (Day 3): one specimen or one survey day is still held as several rows. Brownsville's 5
 * bluefish rows are 4 records (a 1 November 1995 Laguna Madre specimen held twice), which met the 5-record rule for a
 * fish with no record nearer than 30 km; its 7 November tarpon rows are one Fishes of Texas survey day, 19 November
 * 2003, which met the 2-records-a-month rule. The table holds counts only, so the rule is tightened on the counts
 * (`eventRows`): in a fish with fewer than 20 rows, a month holding 3 rows or more and more than a third of them may be
 * one event and counts as one record, both towards the record rules and towards the month rule. This is a floor, not a
 * cure: a rebuild of place-presence-fish.json should store each record's eventDate (and its coordinates or locality),
 * so that rows with the same date and place are counted once and the rules count distinct days, not rows.
 *
 * Day 4 audit (13 November 2026): one survey dataset's rows stood in for presence. At Santa Barbara the table held
 * 32,519 flathead grey mullet rows and put mullet "in season now"; 32,432 of them are rows of PISCO's kelp-forest diver
 * surveys, which in that box hold between 32,443 and 52,244 rows for each of its 40 commonest species, and 32,432 to
 * 32,461 for mullet, yellowtail and lingcod alike: one row per fish species per transect, so they count dives, not fish
 * near a harbour. The same dataset held 1,585 of San Jose's 1,601 mullet rows (Monterey Bay) and half of Los Angeles's.
 * With no rebuild possible here, SURVEY_ROWS holds, for each town and fish where the dataset has rows, its row count and
 * its rows by month, from GBIF facet queries (each stored with its URL and the date run); `classify` takes them off the
 * table's counts before any rule reads them, the nearest distance is no longer known (it may have been a survey row's),
 * and fewer than EVENT_N rows left is too thin to say the fish lives near here. The rebuild should store, per fish and
 * town, the rows by dataset (a datasetKey facet) and the distinct survey events (eventDate with locality), and leave out,
 * or count once per survey day, a dataset that lists every species on every transect.
 *
 * Day 5 audit (14 November 2026): the box crosses sea and borders. Victoria's largemouth bass were 20 rows of one December
 * 2006 survey of Washington State lakes, across the strait; Nanaimo's carp all lie on the mainland, across the Strait of
 * Georgia; Grand Rapids' lake trout are Lake Michigan's, 50 to 60 km west; Bozeman's walleye are 60 km out, the latest
 * from 2011; Austin's brown trout are a high-school record and two at Canyon Reservoir's tailrace, about 50 km away. The
 * table holds counts and the nearest ring only, so the rules read those, with the town's grid setting (water-setting
 * gridSetting), and a sourced table (EXCLUDED) holds the pairs no rule on counts can catch:
 *  - every row in one calendar month is one event, whatever the count (`distinctRecords`; it was up to 3 rows): a single
 *    survey says nothing about a fish living near the town in other months;
 *  - none within 30 km and none since 2015: too far and too old to say it lives near here now;
 *  - a fish of big and deep lakes alone (lake trout, whitefish) with none within 30 km, at a town with no big lake: its
 *    records are in a big lake beyond the town's reach;
 *  - a fresh-water fish with none within 30 km at a town on salt water: the box there is partly sea, and the records may lie
 *    across it.
 * Each moves the fish to "regional" with the reason; none deletes it. A rebuild with each record's coordinates and country
 * should replace the rules with a test on the record itself (same country, same side of the water, within 30 km).
 */
import PRESENCE from "@/data/place-presence-fish.json";
import { habitatsOf, waterOf } from "./fish-habitats";
import { gridSetting } from "./water-setting";

export type PresenceStatus = "recorded" | "regional" | "absent";

export type FishPresenceInfo = {
  slug: string;
  status: PresenceStatus;
  /** Rows of a survey dataset taken off the counts (SURVEY_ROWS): how many, and the dataset's name. */
  survey?: { rows: number; dataset: string };
  /** Records in the box (0 when none). */
  n: number;
  /** The smallest circle (10, 30, 60 km; 85 = only in a corner of the box) around the town with a record. */
  withinKm?: number;
  lastYear?: number;
  /** Records by calendar month (January first). */
  byMonth?: number[];
  /** Why, in a few words, for the page and the checks. */
  reason: string;
};

export type PlacePresence = {
  /** The town is in the table. */
  checked: boolean;
  /** Fewer fish records of any species than DATA_POOR_BELOW within the box: absence proves nothing. */
  dataPoor: boolean;
  /** Fish records of any species in the box. */
  totalFish: number;
  fish: Record<string, FishPresenceInfo>;
};

type FishRec = { n: number; withinKm?: number; lastYear?: number; byMonth?: number[] };
type PresenceFile = {
  meta: { boxKm: number; since: number; ladderKm: number[]; builtAt: string; dataPoorBelow: number; dataPoorNote: string; source: string; method: string };
  taxa: Record<string, { latin: string; key: number | null }>;
  towns: Record<string, { lat: number; lon: number; totalFish: number; dataPoor: boolean; fish: Record<string, FishRec> }>;
};
const FILE = PRESENCE as unknown as PresenceFile;

/** What the page says about the method: the box, the years, the source and the build date. */
export const PRESENCE_METHOD = {
  boxKm: FILE.meta.boxKm,
  since: FILE.meta.since,
  builtAt: FILE.meta.builtAt,
  source: "GBIF occurrence records",
  dataPoorBelow: FILE.meta.dataPoorBelow,
};

/** Fish that share a species with another and cannot be told apart in the records: steelhead are rainbow trout that run to a lake or the sea. */
const SAME_RECORDS: Record<string, string> = { steelhead: "rainbow-trout" };

/** With no record nearer than this (km), FAR_N records or more are needed; the ladder's rings are 10, 30 and 60 km. */
const NEAR_KM = 30;
/** Records needed when none lies within NEAR_KM of town (Charlottetown's 2 smallmouth bass across the strait). */
const FAR_N = 5;
/** The rung the build gives a fish recorded only in the corners of the box, beyond the 60 km circle. */
const CORNER_KM = 85;
/** A fish whose latest record is older than this year, with fewer than OLD_N records, is not shown as living here now. */
const OLD_BEFORE = 2006;
const OLD_N = 10;
/** Up to this many rows, all in one calendar month, are counted as one record (one specimen held several times). */
const SAME_EVENT_N = 3;

/** Records that are surely separate: rows in different months are; a few rows all in one month may be one record. */
export function distinctRecords(rec: { n: number; byMonth?: number[] }): number {
  const months = (rec.byMonth ?? []).filter((x) => x > 0).length;
  if (rec.n <= SAME_EVENT_N && months <= 1) return Math.min(rec.n, 1);
  // Day 5 audit: rows all in one month are one event at any count (Victoria's 20 December 2006 largemouth bass rows).
  if (months === 1) return 1;
  // A month that may hold one event several times (eventRows) is one record, not its row count.
  const bm = rec.byMonth ?? [];
  const once = eventRows(rec);
  return rec.n - bm.reduce((s, x, i) => s + (x - once[i]), 0);
}

/** Below this many rows of a fish, one month's cluster of rows may be one specimen or one survey day (Day 3 audit). */
export const EVENT_N = 20;
/** The smallest cluster counted as one event: a month with this many rows or more, and more than a third of the fish's rows. */
const EVENT_ROWS = 3;

/**
 * The month counts with a likely single event counted once: in a fish with fewer than EVENT_N rows, a month holding
 * EVENT_ROWS rows or more and more than a third of all its rows counts as 1 (Brownsville's 7 November tarpon rows, one
 * survey day of 2003; its 3 November bluefish rows, a 1995 specimen held twice and one 2019 record). Counts cannot tell a
 * survey day from a busy month; a rebuild with eventDate can (see the header).
 */
export function eventRows(rec: { n: number; byMonth?: number[] }): number[] {
  const bm = rec.byMonth ?? [];
  if (rec.n >= EVENT_N) return [...bm];
  return bm.map((x) => (x >= EVENT_ROWS && x * 3 > rec.n ? 1 : x));
}

/** Why the records of a fish at a town are too thin to call it recorded there, or null when they are enough. */
function thinness(rec: FishRec): string | null {
  const km = rec.withinKm ?? 0;
  const one = distinctRecords(rec);
  const months = (rec.byMonth ?? []).filter((x) => x > 0).length;
  if (one < 2 && months === 1 && rec.n > SAME_EVENT_N)
    return `${rec.n} records, all in one month${rec.lastYear ? ` (latest ${rec.lastYear})` : ""}, perhaps one survey: too thin to say it lives near here.`;
  if (km >= CORNER_KM) return `${rec.n === 1 ? "1 record" : `${rec.n} records`}, all 60 to 85 km away in the corners of the area searched: too far to say it lives near here.`;
  if (one < 2) return rec.n > 1 ? `${rec.n} records, all in one month and perhaps one record held more than once: too thin to say it lives near here.` : `1 record ${within(km)}: too thin to say it lives near here.`;
  if (km > NEAR_KM && one < FAR_N)
    return one < rec.n
      ? `${rec.n} records, none nearer than 30 km, and some may be one record held more than once: too thin to say it lives near here.`
      : `${rec.n} records, none nearer than 30 km: too thin to say it lives near here.`;
  if (rec.lastYear != null && rec.lastYear < OLD_BEFORE && rec.n < OLD_N) return `${rec.n} records, none since ${rec.lastYear}: too old to say it lives near here now.`;
  return null;
}

/**
 * The calendar months whose records bear out a sea or sea-run fish being near the town: two records in the month, or one
 * with two or more in each month beside it. Null when the table holds no month counts for it. (Audit, 10 November 2026: the
 * library's months are the union of every region's, so Atlantic cod's "Oct-Apr", written for Norway and the UK, put cod in
 * season in November at Charlottetown and Moncton, where every record is from July to October; bluefish's "Jun-Mar" put
 * Boston's bluefish in season in November on 27 October records and none in November. A neighbouring month alone would have
 * kept both, so it only fills a gap between two recorded months, as the plants' gate keeps to the month itself.)
 */
export const MONTH_MIN = 2;
export function monthsRecorded(info: (Pick<FishPresenceInfo, "byMonth"> & { n?: number }) | undefined): number[] | null {
  if (!info?.byMonth || !info.byMonth.some((x) => x > 0)) return null;
  // A month whose rows may be one survey day counts as one record (eventRows, Day 3 audit).
  const bm = info.n != null ? eventRows({ n: info.n, byMonth: info.byMonth }) : info.byMonth;
  const at = (m: number) => bm[((((m - 1) % 12) + 12) % 12)] ?? 0;
  const out: number[] = [];
  for (let m = 1; m <= 12; m++) if (at(m) >= MONTH_MIN || (at(m) >= 1 && at(m - 1) >= MONTH_MIN && at(m + 1) >= MONTH_MIN)) out.push(m);
  return out;
}

const SLUGS = Object.keys(FILE.taxa);

/** A survey dataset that holds a row for every species on its list on every transect (Day 4 audit). */
const PISCO = { key: "f84538b9-5488-48af-a668-a45cdd0fc558", name: "PISCO kelp-forest diver surveys" };

/**
 * The survey dataset's rows for a fish in a town's box, from GBIF facet queries run on 13 November 2026 (the box is the
 * build's: +-60 km, 1990 to 2026). `rows` is the dataset's count; `byMonth` its rows by month (January first). `query` is
 * the month facet run, with `datasetKey`; the datasetKey facet run without it gave the totals in the comment.
 */
type SurveyRows = { dataset: typeof PISCO; rows: number; byMonth: number[]; query: string; read: string };
const Q = (taxon: number, box: string) =>
  `https://api.gbif.org/v1/occurrence/search?datasetKey=${PISCO.key}&taxonKey=${taxon}&${box}&year=1990,2026&limit=0&facet=month`;
const SB = "decimalLatitude=33.88,34.96&decimalLongitude=-120.36,-119.05";
const SJ = "decimalLatitude=36.80,37.88&decimalLongitude=-122.57,-121.21";
const LA = "decimalLatitude=33.51,34.59&decimalLongitude=-118.89,-117.59";
const MULLET = 8189568;
const LINGCOD = 2336521;
const byM = (o: Record<number, number>) => Array.from({ length: 12 }, (_, i) => o[i + 1] ?? 0);
export const SURVEY_ROWS: Record<string, Record<string, SurveyRows>> = {
  // datasetKey facets (occurrenceStatus PRESENT): mullet 32,526 rows, 32,432 PISCO; lingcod 32,841, 32,461 PISCO;
  // yellowtail 32,456, 32,433 PISCO (yellowtail is not a fish of this region's list).
  "santa-barbara-california": {
    "flathead-grey-mullet": { dataset: PISCO, rows: 32432, byMonth: byM({ 6: 190, 7: 650, 8: 8478, 9: 11700, 10: 7561, 11: 2997, 12: 856 }), query: Q(MULLET, SB), read: "2026-11-13" },
    lingcod: { dataset: PISCO, rows: 32461, byMonth: byM({ 6: 190, 7: 651, 8: 8481, 9: 11713, 10: 7568, 11: 3001, 12: 857 }), query: Q(LINGCOD, SB), read: "2026-11-13" },
  },
  // datasetKey facets: mullet 1,601 rows, 1,585 PISCO; lingcod 1,879, 1,587 PISCO; yellowtail 1,585, all PISCO.
  "san-jose-california": {
    "flathead-grey-mullet": { dataset: PISCO, rows: 1585, byMonth: byM({ 7: 252, 8: 705, 9: 440, 10: 125, 11: 63 }), query: Q(MULLET, SJ), read: "2026-11-13" },
    lingcod: { dataset: PISCO, rows: 1587, byMonth: byM({ 7: 252, 8: 707, 9: 440, 10: 125, 11: 63 }), query: Q(LINGCOD, SJ), read: "2026-11-13" },
  },
  // datasetKey facets: mullet 750 rows, 375 PISCO and 370 iNaturalist; lingcod 460, 376 PISCO; yellowtail 408, 375 PISCO.
  // San Diego's 457 mullet rows hold no PISCO row (446 are iNaturalist observations, many observers, not one survey).
  "los-angeles-california": {
    "flathead-grey-mullet": { dataset: PISCO, rows: 375, byMonth: byM({ 9: 127, 10: 148, 12: 100 }), query: Q(MULLET, LA), read: "2026-11-13" },
    lingcod: { dataset: PISCO, rows: 376, byMonth: byM({ 9: 127, 10: 149, 12: 100 }), query: Q(LINGCOD, LA), read: "2026-11-13" },
  },
};

/** The table's record with a survey dataset's rows taken off (SURVEY_ROWS); the nearest ring is then unknown. */
function lessSurvey(townSlug: string, slug: string, rec: FishRec): { rec: FishRec; survey?: SurveyRows } {
  const sv = SURVEY_ROWS[townSlug]?.[slug];
  if (!sv) return { rec };
  const bm = (rec.byMonth ?? []).map((x, i) => Math.max(0, x - (sv.byMonth[i] ?? 0)));
  return { rec: { n: Math.max(0, rec.n - sv.rows), lastYear: rec.lastYear, byMonth: bm }, survey: sv };
}

const within = (n: number) => (n >= 85 ? "in the outer corner of the area" : `within ${n} km`);

/** None within 30 km and none since this year: too far and too old (Day 5 audit: Bozeman's walleye, 60 km out, latest 2011). */
const FAR_OLD_BEFORE = 2016;

/**
 * Town and fish pairs whose records a GBIF query shows are not the town's (Day 5 audit, 14 November 2026), where no rule on
 * the table's counts can tell: each with the query run and what it returned.
 */
export const EXCLUDED: { town: string; fish: string; reason: string; query: string; read: string }[] = [
  // The three records (gbifID 4104915984, 2273104073, 2609220402): Westlake High School, Austin, 15 May 2013 (Fishes of
  // Texas); "Canyon Reservoir Tailrace", 31 December 2017; River Cliff Dr, Canyon Lake, 24 March 2019 (iNaturalist). The
  // tailrace is the Guadalupe below Canyon Lake, the one Texas water TPWD says trout survive in (fishing-waters LOCAL_MONTHS).
  {
    town: "austin-texas",
    fish: "brown-trout",
    reason: "3 records: one at a high school in Austin, two at the Canyon Reservoir tailrace on the Guadalupe, about 50 km away: not a fish of Austin's waters.",
    query: "https://api.gbif.org/v1/occurrence/search?decimalLatitude=29.73,30.81&decimalLongitude=-98.37,-97.12&year=1990,2026&taxonKey=8215487&limit=5",
    read: "2026-11-14",
  },
  // The table's 87 rows, the nearest 30 to 60 km out; the same query over Vancouver Island's side of the Strait of Georgia,
  // from Nanaimo to Qualicum and Ladysmith (48.9 to 49.6 N, 124.6 to 123.75 W), returned 0: they lie across the strait.
  {
    town: "nanaimo-british-columbia",
    fish: "common-carp",
    reason: "87 records, all 30 to 60 km away across the Strait of Georgia on the mainland; none on Vancouver Island near Nanaimo.",
    query: "https://api.gbif.org/v1/occurrence/search?decimalLatitude=48.9,49.6&decimalLongitude=-124.6,-123.75&year=1990,2026&taxonKey=4286975&limit=0",
    read: "2026-11-14",
  },
];

/** Why a fish's records at a town are not its own (Day 5 rules above), or null. */
function notHere(slug: string, rec: FishRec, townSlug: string, town: Town): string | null {
  const x = EXCLUDED.find((e) => e.town === townSlug && e.fish === slug);
  if (x) return x.reason;
  const km = rec.withinKm ?? 0;
  if (km <= NEAR_KM) return null;
  const n = `${rec.n} record${rec.n === 1 ? "" : "s"}`;
  if (rec.lastYear != null && rec.lastYear < FAR_OLD_BEFORE) return `${n}, none nearer than 30 km and none since ${rec.lastYear}: too far and too old to say it lives near here now.`;
  const g = gridSetting(town.lat, town.lon);
  // Only a fish of big and deep lakes alone (lake trout, whitefish); walleye, pike and bass list big lakes first but take rivers too.
  const hs = habitatsOf(slug);
  if (hs[0] === "big-lake" && hs.every((h) => h === "big-lake" || h === "lake") && !g.bigLake) return `${n}, none nearer than 30 km: a fish of big lakes, recorded in one beyond the town's reach.`;
  if (g.coast === "on" && waterOf(slug) === "fresh") return `${n}, none nearer than 30 km, in a search area that is partly sea: they may lie across the water.`;
  return null;
}

/**
 * How the page names the area searched: a box reaching 60 km north, south, east and west of town, whose corners are about
 * 85 km out. (Audit, 10 November 2026: "within 60 km of town" named a circle the count does not cover.)
 */
export const AREA = `in a box reaching ${FILE.meta.boxKm} km each way from town`;

type Town = PresenceFile["towns"][string];

function classify(slug: string, town: Town | undefined, townSlug = ""): FishPresenceInfo {
  if (!town) return { slug, status: "regional", n: 0, reason: "This town's fish records have not been checked." };
  const same = SAME_RECORDS[slug];
  const raw = town.fish[same ?? slug];
  if (same) {
    // Records of the species exist (or not), but they cannot say a sea-run or lake-run fish is here.
    if (raw?.n || town.dataPoor)
      return { slug, status: "regional", n: 0, reason: `Records cannot tell ${slug === "steelhead" ? "migratory steelhead from resident or stocked rainbow trout" : "this form from its species"}.` };
    return { slug, status: "absent", n: 0, reason: `No ${same.replace("-", " ")} records, so no steelhead, within the area.` };
  }
  if (!raw || raw.n < 1) {
    return town.dataPoor
      ? { slug, status: "regional", n: 0, reason: `No records, but fewer than ${PRESENCE_METHOD.dataPoorBelow.toLocaleString("en")} fish records of any kind lie ${AREA}, so a missing record proves little.` }
      : { slug, status: "absent", n: 0, reason: "No records within the area, where many other fish have been recorded." };
  }
  const { rec, survey } = lessSurvey(townSlug, slug, raw);
  const sv = survey ? { survey: { rows: survey.rows, dataset: survey.dataset.name } } : {};
  const info = { slug, n: rec.n, withinKm: rec.withinKm, lastYear: rec.lastYear, byMonth: rec.byMonth, ...sv };
  // With a survey's rows taken off, fewer than EVENT_N rows left say too little, and their nearest ring is not known.
  if (survey && rec.n < EVENT_N)
    return {
      ...info,
      status: "regional",
      reason: `${raw.n.toLocaleString("en")} records, but ${survey.rows.toLocaleString("en")} of them are rows of one diver survey (${survey.dataset.name}), which lists its species on every transect; the other ${rec.n} are too few to say it lives near here.`,
    };
  const thin = thinness(survey ? { ...rec, withinKm: 60 } : rec);
  if (thin) return { ...info, status: "regional", reason: thin };
  const away = survey ? null : notHere(slug, rec, townSlug, town);
  if (away) return { ...info, status: "regional", reason: away };
  if (survey)
    return { ...info, status: "recorded", reason: `${rec.n} records ${AREA}, besides ${survey.rows.toLocaleString("en")} rows of one diver survey (${survey.dataset.name})${rec.lastYear ? `, latest ${rec.lastYear}` : ""}.` };
  return { ...info, status: "recorded", reason: `${rec.n} records ${AREA}, the nearest ${within(rec.withinKm ?? 0)}${rec.lastYear ? `, latest ${rec.lastYear}` : ""}.` };
}

const CACHE = new Map<string, PlacePresence>();

/** The status of every fish of the library at a town (by place slug). A town not in the table has every fish "regional". */
export function presentFish(placeSlug: string | undefined | null): PlacePresence {
  const key = placeSlug ?? "";
  const hit = CACHE.get(key);
  if (hit) return hit;
  const town = placeSlug ? FILE.towns[placeSlug] : undefined;
  const fish: Record<string, FishPresenceInfo> = {};
  for (const s of SLUGS) fish[s] = classify(s, town, placeSlug ?? "");
  const out: PlacePresence = { checked: !!town, dataPoor: town?.dataPoor ?? true, totalFish: town?.totalFish ?? 0, fish };
  CACHE.set(key, out);
  return out;
}

/**
 * The presence table's entry for the town at (lat, lon), if the table has one there (within about 2 km of its centre).
 * For callers that know a place's coordinates but not its slug (the water setting, when the map look-up fails).
 */
export function presenceAt(lat: number, lon: number): PlacePresence | null {
  for (const [slug, t] of Object.entries(FILE.towns)) if (Math.abs(t.lat - lat) < 0.02 && Math.abs(t.lon - lon) < 0.025) return presentFish(slug);
  return null;
}

/**
 * A recorded fish whose latest record near the town is older than OLD_BEFORE: it is listed with its evidence, but no season
 * is claimed for it (Day 3 audit: Pittsburgh's 148 striped bass rows, none since 2004, passed the age rule, which looks only
 * at fish with fewer than OLD_N rows; once inland striped bass took fresh-water months they would have read "in season").
 */
export const tooOldForSeason = (info: Pick<FishPresenceInfo, "lastYear"> | undefined): boolean => info?.lastYear != null && info.lastYear < OLD_BEFORE;

/** The status of one fish at a town. */
export const fishStatus = (placeSlug: string | undefined | null, fishSlug: string): PresenceStatus => presentFish(placeSlug).fish[fishSlug]?.status ?? "regional";

/** Whether a fish may be shown as in season, best now or active at the town. */
export const isRecorded = (placeSlug: string | undefined | null, fishSlug: string): boolean => fishStatus(placeSlug, fishSlug) === "recorded";

/** The slugs of every fish recorded at a town. */
export const recordedSlugs = (placeSlug: string | undefined | null): string[] =>
  Object.values(presentFish(placeSlug).fish)
    .filter((f) => f.status === "recorded")
    .map((f) => f.slug);

/**
 * "481 GBIF records since 1990 in a box reaching 60 km each way from town, the nearest within 10 km, latest 2026": how a
 * recorded fish is evidenced on the page. The count is for the whole box; the distance is the nearest ring (a circle) with a
 * record. (Audit, 5 November 2026: the page printed the area's count as if it were the count within the nearest ring. Audit,
 * 10 November 2026: "within 60 km of town" called the box a circle; its corners are about 85 km out.)
 */
export function recordedNote(info: FishPresenceInfo): string {
  if (info.status !== "recorded") return info.reason;
  const nearest = info.withinKm == null ? "" : info.withinKm >= 85 ? ", the nearest in the outer corner of the box" : `, the nearest within ${info.withinKm} km`;
  // A survey's rows were taken off the count (SURVEY_ROWS): say so, and give no nearest distance, which is no longer known.
  const survey = info.survey ? `, besides ${info.survey.rows.toLocaleString("en")} rows of one diver survey (${info.survey.dataset}) left out` : "";
  return `${info.n} GBIF record${info.n === 1 ? "" : "s"} since ${PRESENCE_METHOD.since} ${AREA}${survey ? survey : nearest}${info.lastYear ? `, latest ${info.lastYear}` : ""}`;
}
