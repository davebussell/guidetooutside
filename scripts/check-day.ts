/**
 * Checks the day pages' accuracy rules against the 264 pre-built towns
 * (src/data/place-normals.json) on 12 sample dates, and exits non-zero on any
 * violation:
 *
 *  1. (The season plan's checks left with the teaching-at-home pages, 18 November 2026.)
 *  2. Region stories (src/data/day-stories.ts): the lake clauses (pieces marked
 *     `lake`) are printed only within 25 km of a Great Lake shore
 *     (src/lib/great-lakes.ts) and the leaf clauses (`leaf`) only inside the
 *     town's leaf-on window (src/lib/leaf-on.ts: last spring frost to 14 days
 *     after the first autumn frost; mirrored south of the equator), checked
 *     against a window rebuilt here from dates; what is left after a clause is
 *     dropped is still a clean sentence (under every combination of conditions
 *     and every month); the region description under a town's name
 *     (ecoregions TOWN_TEXT) loses "lake-effect weather around the largest
 *     freshwater system on Earth" beyond 25 km and keeps it within, is never
 *     empty, and holds only the region's own words.
 *  3. Phase captions: each weather character's land and water line, per phase
 *     (src/data/day-stories.ts DAY_CHARACTER_PHASES): all 8 phases map to
 *     distinct caption keys, and no midday-only wording ("Maximum
 *     photosynthesis", "Beds dry quickly", "transplants wilt", "midday"...)
 *     appears for First light, Sunrise, Morning or any other phase but Midday.
 *  4. End to end: dayPageData() for Ottawa, Toronto, Buffalo, Chicago,
 *     Milwaukee, Cleveland and Detroit, on 2 Nov 2026 and 15 Jun 2027.
 *  5. Where region prose holds (audit of 10 November 2026: region text printed
 *     as town fact). The scope facts behind it are pinned: the towns within
 *     reach of each named water or range (Bay of Fundy: Moncton and Saint John;
 *     the Chesapeake: Baltimore; Long Island Sound: New York; ...), on the
 *     Atlantic coastal plain, in the gopher tortoise's range, and so on, with
 *     the distances recomputed here. Then dayPageData() and the landscape line
 *     for all 264 towns on all 12 dates, with an overcast sky, against
 *     SCOPE_RULES: each scoped phrase appears only at towns (and in months)
 *     where it holds, recomputed here from the coast band, the pinned lists and
 *     the calendar; deleted sentences appear nowhere; "near N°" is the town's
 *     own solstice noon height; the overcast "transplanting and sowing" line
 *     appears exactly where a crop is in its sowing window that day.
 *  6. Audit of 11 November 2026 (Appalachian, Central Hardwoods and Gulf Coast
 *     towns): Southern Blue Ridge text only within reach of the Southern Blue
 *     Ridge (Asheville, not Pittsburgh); bats under hickory bark, the summer
 *     Milky Way and squall lines in summer, bears in autumn; cypress only in the
 *     bald cypress range (not Brownsville); the Louisiana land-loss figure only
 *     in Louisiana; "prairie remnants" only on the coastal prairie (Houston); the
 *     region card's "nearly frost-free" only where the town's stations count
 *     frost on fewer than 10 nights a year (not Memphis or Little Rock); the
 *     unsourced superlatives nowhere. The fish lines that name a kind of water
 *     (walleye on lake shoals, striped bass on the tide, trout and steelhead in
 *     current, muskellunge on deep points, chinook in the lake) only where the
 *     fishing page lists the fish in that water today, recomputed here from
 *     fishByWater on the towns' cached named waters; everywhere else the line
 *     without the water-bound words. The ground tile's "to the bedrock" only
 *     with a rock named.
 *  7. Audit of 13 November 2026 (Florida Peninsula, Deserts and Mediterranean
 *     California towns): the sky islands only in the Madrean sky islands
 *     (Tucson), the monsoon cell only in the monsoon's reach (not Boise),
 *     redwoods only within reach of the redwood belt (San Jose), chaparral and
 *     coast live oak off the Central Valley floor (not Sacramento), valley oak
 *     inside its range (not San Diego), spring-fed rivers in Florida's northern
 *     half and thousands of lakes in its lake district (not Miami, Fort
 *     Lauderdale or Fort Myers), rockland hammock at Miami, the Atlantic
 *     sunrise and sea turtles on Florida's Atlantic shore, sagebrush steppe on
 *     the Snake River Plain (Boise, not Albuquerque), big reservoirs within
 *     reach of one (not Tucson); lizards, snakes and rattlesnakes only in months
 *     whose average high at the town is at least REPTILE_HIGH_C, the dry-season
 *     line only in months under 5 mm, and the desert dusk's figure the town's
 *     own day range this month; the false or unsourced sentences (creosote
 *     "poisons the soil", "constant 22 °C", "eighty kilometres wide", the UV
 *     maximum, "forty degrees" inland) nowhere. Each town's landscape line is
 *     pinned.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-day.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/check-day.mjs --log-level=warning && node /tmp/check-day.mjs [--verbose]
 *
 * The towns' IANA zones are not on file (the forecast reports them), so each
 * town is given Etc/GMT±N from its longitude, and a real zone for the towns
 * named in ZONES; the check is the same under any zone.
 */
import { existsSync, readFileSync } from "node:fs";
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import PLACE_NAMES from "../src/data/place-names.json";
import { DAY_RHYTHMS, REGION_DAY, DAY_CHARACTERS, DAY_CHARACTER_PHASES, DAY_CHARACTER_SOWING, DAY_PHASES, captionKey, characterCaption, storyText, type DayPhase, type StoryPiece } from "../src/data/day-stories";
import { greatLakesDistanceKm, nearGreatLake, NEAR_GREAT_LAKE_KM } from "../src/lib/great-lakes";
import { leafOn, leafOnWindow } from "../src/lib/leaf-on";
import { regionOf } from "../src/lib/region";
import { TOWN_TEXT } from "../src/lib/ecoregions";
import { regionTextAt } from "../src/lib/region-text";
import { placeFacts, fishNowAt } from "../src/lib/place-scope";
import { BOXES, NEAR } from "../src/data/scope-places";
import { FEW_FROST_NIGHTS, REPTILE_HIGH_C, type PlaceFacts, type Piece, type Where } from "../src/lib/where";
import { fishByWater } from "../src/lib/fishing-waters";
import { isInfrastructureWater } from "../src/lib/waters";
import { waterSetting } from "../src/lib/water-setting";
import { regimeOf } from "../src/lib/regime";
import { fitsFor } from "../src/lib/soil-sowing";
import { doyOfIso, sowNow } from "../src/lib/crop-calendar";
import { dayPageData } from "../src/lib/day-page";
import { guideId } from "../src/lib/guide-id";
import type { Climate, LocalData, Place, WaterBody } from "../src/lib/types";

type Entry = { place: Place; climate: Climate };
const TABLE = NORMALS as unknown as Entry[];
const VERBOSE = process.argv.includes("--verbose");

const DATES = [
  "2026-11-02", "2026-11-23", "2026-12-21", "2027-01-18", "2027-02-14", "2027-03-20",
  "2027-04-25", "2027-05-10", "2027-06-15", "2027-07-21", "2027-08-30", "2027-09-27",
];
const PHASES = Object.keys(DAY_PHASES) as DayPhase[];
const ZONES: Record<string, string> = {
  "ottawa-ontario": "America/Toronto",
  "toronto-ontario": "America/Toronto",
  "buffalo-new-york": "America/New_York",
  "chicago-illinois": "America/Chicago",
  "milwaukee-wisconsin": "America/Chicago",
  "cleveland-ohio": "America/New_York",
  "detroit-michigan": "America/Detroit",
  "cape-town-south-africa": "Africa/Johannesburg",
  "johannesburg-south-africa": "Africa/Johannesburg",
  "bloemfontein-south-africa": "Africa/Johannesburg",
};
const zoneOf = (p: Place) => {
  if (ZONES[p.slug]) return ZONES[p.slug];
  const h = Math.round(p.lon / 15);
  return h === 0 ? "Etc/GMT" : `Etc/GMT${h > 0 ? "-" : "+"}${Math.abs(h)}`;
};

const fails: string[] = [];
let checks = 0;
function ok(cond: boolean, msg: string) {
  checks++;
  if (!cond && fails.length < 400) fails.push(msg);
  else if (!cond) fails.push("");
}
const say = (s: string) => console.log(s);

// ---- helpers independent of the code under test ---------------------------------

/** Local calendar date of an instant, read with Intl directly (not src/lib/tz). */
function localDateOf(d: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(d);
  const g = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${g("year")}-${g("month")}-${g("day")}`;
}

/** Leaf-on, rebuilt from calendar dates: the window starts on the last-frost date and ends 14 days after the first-frost date. */
function leafOnRef(c: Climate, iso: string, south: boolean): boolean {
  if (c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare") return true;
  const y = Number(iso.slice(0, 4));
  const t = new Date(`${iso}T12:00:00Z`).getTime();
  for (const yy of [y - 1, y]) {
    // North: doy 1 is 1 January. South: doy 1 is 2 July (the frost calendar starts at midwinter; frost.ts seasonToOutput).
    const origin = south ? Date.UTC(yy, 6, 2, 12) : Date.UTC(yy, 0, 1, 12);
    const start = origin + (c.lastSpringFrostDoy - 1) * 86400000;
    const end = origin + (c.firstFallFrostDoy - 1 + 14) * 86400000;
    if (t >= start && t <= end) return true;
  }
  return false;
}

// ---- 2. region stories ----------------------------------------------------------

/** The rule: lake text only within 25 km of a Great Lakes shore (a working rule, kept short). Written out here, not imported, so changing the module's constant is caught. */
const NEAR_KM = 25;
ok(NEAR_GREAT_LAKE_KM === NEAR_KM, `NEAR_GREAT_LAKE_KM is ${NEAR_GREAT_LAKE_KM}, the rule is ${NEAR_KM}`);
const DIST = new Map<string, number>(TABLE.map((e) => [e.place.slug, greatLakesDistanceKm(e.place.lat, e.place.lon)]));
const REF_LAKE = ["toronto-ontario", "buffalo-new-york", "chicago-illinois", "milwaukee-wisconsin", "cleveland-ohio"];
/** On the Detroit River, near only shallow Lake St. Clair (about 3.4 m deep), which does not count (5 Nov 2026 audit): no lake text. */
const REF_RIVER = ["detroit-michigan", "windsor-ontario"];
{
  const d = (s: string) => DIST.get(s)!;
  ok(d("ottawa-ontario") > 130 && d("ottawa-ontario") < 150, `Ottawa is ${d("ottawa-ontario").toFixed(1)} km from the nearest Great Lakes shore (expected about 143: Kingston)`);
  for (const s of REF_LAKE) ok(d(s) <= NEAR_KM, `${s} is ${d(s).toFixed(1)} km from a shore, should be within ${NEAR_KM}`);
  for (const s of REF_RIVER) ok(d(s) > NEAR_KM, `${s} is ${d(s).toFixed(1)} km from a Great Lakes shore; Lake St. Clair should not count`);
  say(`great lakes: Ottawa ${d("ottawa-ontario").toFixed(0)} km; ${REF_LAKE.map((s) => `${s.split("-")[0]} ${d(s).toFixed(0)}`).join(", ")}; ${[...DIST.values()].filter((x) => x <= NEAR_KM).length} of ${TABLE.length} towns within ${NEAR_KM} km`);
}

const piecesOf = (t: unknown): ({ t: string } & Where)[] =>
  Array.isArray(t) ? (t as StoryPiece[]).map((p) => (typeof p === "string" ? { t: p } : p)) : [];
let lakePieces = 0;
let leafPieces = 0;
let scopedPieces = 0;
let storiesChecked = 0;
let inlandRegionTowns = 0;
let nearRegionTowns = 0;
const BANNED_FAR = [/lake-effect/i, /not over the lakes/i, /largest freshwater/i, /over the lake first/i, /far shore/i, /lake breeze/i, /thermocline/i, /snow machine/i];
const CLEAN_START = /^[A-Z0-9“"‘']/;
const CLEAN_END = /[.!?”"’']$/;
const MONTHS12 = Array.from({ length: 12 }, (_, i) => i + 1);
const FISH_IN_STORIES = [...new Set(Object.values(REGION_DAY).flatMap((ph) => Object.values(ph).flatMap((f) => [f.light, f.micro, f.macro].flatMap((t) => piecesOf(t).map((p) => p.fish).filter((x): x is string => !!x)))))];
const ALL_AREAS = ["atlantic-coastal-plain", "fall-line", "gopher-tortoise-range", "water-tupelo-range", ...Object.keys(BOXES)];
const ADMIN1_IN_STORIES = [...new Set(Object.values(REGION_DAY).flatMap((ph) => Object.values(ph).flatMap((f) => [f.light, f.micro, f.macro].flatMap((t) => piecesOf(t).map((p) => p.admin1).filter((x): x is string => !!x)))))];
/**
 * The states, provinces and territories the stories name. Until 14 November 2026 there was one (Louisiana) and a synthetic
 * town could be in all of them; the Day 5 audit keyed the white nights, the high towns' thin air and BC's lightning to
 * theirs, so the rendering test below runs once for each.
 */
ok(ADMIN1_IN_STORIES.length === 7, `the stories name ${ADMIN1_IN_STORIES.length} admin1s (7 expected): ${ADMIN1_IN_STORIES.join(", ")}`);
/** Synthetic towns for the rendering test: every condition true, or every one false, in a given month. */
const synth = (lake: boolean, leaf: boolean, all: boolean, month: number, admin1?: string): PlaceFacts => ({
  lake, leaf, month, south: false, noon: 70, winterNoon: 22,
  coast: all ? "on" : null, tidal: all, salt: all, near: all ? Object.keys(NEAR) : [], areas: all ? ALL_AREAS : [],
  bigLake: all, bigRiver: all ? "Mississippi" : null, fishNow: all ? FISH_IN_STORIES : [], sowing: all,
  admin1: all ? admin1 : undefined, frostNights: all ? 0 : 99,
  monthHigh: all ? 40 : 0, monthLow: all ? 20 : -5, monthRain: all ? 0 : 200,
  fishWaters: all ? Object.fromEntries(Object.keys(DAY_RHYTHMS).map((k) => [k, ["sea", "estuary", "rivers", "lakes"]])) : {},
});

// Every story renders cleanly under every combination of conditions, in every month.
for (const [slug, phases] of Object.entries(REGION_DAY)) {
  for (const ph of PHASES) {
    for (const f of ["light", "micro", "macro"] as const) {
      const t = phases[ph][f];
      for (const lake of [true, false]) {
        for (const leaf of [true, false]) {
          for (const all of [true, false]) {
            for (const m of MONTHS12) for (const a of all ? ADMIN1_IN_STORIES : [undefined]) {
              const s = storyText(t, synth(lake, leaf, all, m, a));
              if (s == null) continue;
              storiesChecked++;
              const tag = `${slug}/${ph}/${f} (lake ${lake}, leaf ${leaf}, conditions ${all}, month ${m}, admin1 ${a})`;
              ok(CLEAN_START.test(s) && CLEAN_END.test(s), `${tag}: does not read as a sentence: "${s}"`);
              ok(!/ {2}| [.,;:]|\.\.|[{}]/.test(s) && s === s.trim(), `${tag}: stray space, punctuation or token: "${s}"`);
            }
          }
        }
      }
      piecesOf(t).forEach((p) => {
        if (p.lake !== undefined) lakePieces++;
        if (p.leaf !== undefined) leafPieces++;
        if (Object.keys(p).length > 1) scopedPieces++;
        ok(!(p.lake !== undefined && p.leaf !== undefined), `${slug}/${ph}/${f}: a piece carries both lake and leaf`);
      });
    }
  }
}
// 11 November 2026: one more leaf piece (cove frost, leaf: false) and 20 more scoped pieces (Southern Blue Ridge, seasons,
// bald cypress, Louisiana).
// 13 November 2026: nine more scoped pieces (the sky islands twice, the monsoon cell, the Atlantic sunrise, rockland
// hammock, the redwood belt, chaparral dew and fire off the valley floor, the dry season, the rattlesnakes) and one
// fewer (the bats leaving the caves, deleted).
// 14 November 2026 (Day 5): sixteen more scoped pieces: the white nights (2 lines x 3 territories and states), the thin
// air (2 states), the long boreal afternoon, the marine layer (5 Pacific pieces, the golden hour in two), BC's lightning.
ok(lakePieces === 11 && leafPieces === 50 && scopedPieces === 213, `flagged pieces changed: ${lakePieces} lake (11), ${leafPieces} leaf (50), ${scopedPieces} with any condition (213)`);

// ---- the scope facts, recomputed and pinned ------------------------------------

/** Great-circle km, written out here (not imported). */
const hav = (a: [number, number], b: [number, number]) => {
  const r = Math.PI / 180;
  const h = Math.sin(((b[0] - a[0]) * r) / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(((b[1] - a[1]) * r) / 2) ** 2;
  return 2 * 6371.0088 * Math.asin(Math.sqrt(h));
};
/** The towns each named water or range takes in (audit of 10 November 2026: the Bay of Fundy belongs to Moncton and Saint John only, the Chesapeake to Baltimore, Long Island Sound to New York). */
const PIN_NEAR: Record<string, string[]> = {
  "bay-of-fundy": ["moncton-new-brunswick", "saint-john-new-brunswick"],
  "chesapeake-bay": ["baltimore-maryland"],
  "long-island-sound": ["new-york-new-york"],
  "gulf-coast-belt": ["houston-texas", "new-orleans-louisiana", "brownsville-texas", "fort-myers-florida", "tampa-florida"],
  everglades: ["fort-lauderdale-florida", "miami-florida"],
  "salish-sea": ["nanaimo-british-columbia", "vancouver-british-columbia", "victoria-british-columbia", "seattle-washington"],
  "great-smoky-mountains": ["asheville-north-carolina"],
  // Audit of 11 November 2026: the Southern Blue Ridge text belongs to Asheville, not Pittsburgh.
  "southern-blue-ridge": ["asheville-north-carolina"],
  "lake-victoria": ["kisumu-kenya", "kampala-uganda", "mwanza-tanzania"],
  "nile-valley": ["cairo-egypt", "alexandria-egypt", "luxor-egypt", "aswan-egypt", "khartoum-sudan"],
  // Audit of 13 November 2026: the redwoods belong to San Jose (19 km from the Sanborn grove), not Sacramento, Los
  // Angeles, Santa Barbara or San Diego; the lake district to Orlando, not Tampa (50 km from Lakeland); the big desert
  // reservoirs to Las Vegas (Lake Mead), Phoenix (Lake Pleasant) and Boise (Lucky Peak), not Tucson or Albuquerque.
  "redwood-belt": ["san-jose-california"],
  "central-florida-lakes": ["orlando-florida"],
  "desert-reservoirs": ["las-vegas-nevada", "phoenix-arizona", "boise-idaho"],
};
/** The towns in each area (the coastal plain is south-east of the fall line; Raleigh is 37 km on the Piedmont side). */
const PIN_AREA: Record<string, string[]> = {
  "atlantic-coastal-plain": ["richmond-virginia", "washington-district-of-columbia", "jacksonville-florida", "savannah-georgia", "fort-myers-florida", "orlando-florida", "tampa-florida", "fort-lauderdale-florida", "miami-florida"],
  "fall-line": ["philadelphia-pennsylvania", "richmond-virginia", "washington-district-of-columbia", "baltimore-maryland"],
  "gopher-tortoise-range": ["jacksonville-florida", "savannah-georgia", "fort-myers-florida", "orlando-florida", "tampa-florida", "fort-lauderdale-florida", "miami-florida"],
  "water-tupelo-range": ["little-rock-arkansas", "memphis-tennessee", "houston-texas", "new-orleans-louisiana", "savannah-georgia"],
  "saguaro-range": ["tucson-arizona", "phoenix-arizona"],
  "hot-deserts": ["las-vegas-nevada", "tucson-arizona", "phoenix-arizona"],
  // Bald cypress west of the Appalachians (Koeser 2017): not Brownsville. The coastal prairie (USGS FS-019-00): Houston
  // (and Austin, whose region prints no prairie), not New Orleans, Memphis, Little Rock or Brownsville.
  "bald-cypress-west": ["little-rock-arkansas", "memphis-tennessee", "austin-texas", "houston-texas", "new-orleans-louisiana", "san-antonio-texas"],
  "coastal-prairie": ["austin-texas", "houston-texas"],
  // Audit of 13 November 2026 (sources in src/data/scope-places.ts). The sky islands: Tucson, not Phoenix, Las Vegas,
  // Albuquerque or Boise. The monsoon (NWS): Arizona and New Mexico, not Boise or Las Vegas. Sagebrush steppe: the Snake
  // River Plain, Boise. Valley oak (FEIS): not San Diego. The Central Valley floor: Sacramento, not San Jose. Florida's
  // northern half (most of its springs, USGS). Rockland hammock (FNAI): Miami, not Fort Lauderdale. Florida's Atlantic
  // shore: Miami and Fort Lauderdale, not Fort Myers, Tampa or Orlando.
  "madrean-sky-islands": ["tucson-arizona"],
  "north-american-monsoon": ["albuquerque-new-mexico", "tucson-arizona", "phoenix-arizona"],
  "snake-river-plain": ["boise-idaho"],
  "valley-oak-range": ["sacramento-california", "san-jose-california", "los-angeles-california", "santa-barbara-california"],
  "central-valley": ["sacramento-california"],
  "florida-northern-half": ["orlando-florida", "tampa-florida", "jacksonville-florida"],
  "rockland-hammock": ["miami-florida"],
  "florida-atlantic-coast": ["miami-florida", "fort-lauderdale-florida", "jacksonville-florida"],
};
const pinned = (list: Record<string, string[]>, id: string, slug: string) => list[id].includes(slug);
const inBoxRef = (id: string, lat: number, lon: number) => BOXES[id as keyof typeof BOXES].boxes.some((b) => lat >= b.minLat && lat <= b.maxLat && lon >= b.minLon && lon <= b.maxLon);
type Ref = { slug: string; region: string; lat: number; lon: number; coast: "on" | "near" | null; tidal: boolean; salt: boolean; near: Set<string>; areas: Set<string>; bigLake: boolean; bigRiver: string | null; admin1: string; frostNights: number | undefined; high: number[]; low: number[]; rain: number[] | undefined };
const REF = new Map<string, Ref>();
for (const e of TABLE) {
  const { slug, lat, lon } = e.place;
  const w = waterSetting(lat, lon, []);
  const near = new Set(Object.keys(NEAR).filter((id) => NEAR[id as keyof typeof NEAR].pts.some((p) => hav([lat, lon], p) <= NEAR[id as keyof typeof NEAR].km)));
  const areas = new Set([...Object.keys(PIN_AREA).filter((id) => pinned(PIN_AREA, id, slug)), ...(inBoxRef("microtidal-seas", lat, lon) ? ["microtidal-seas"] : [])]);
  const micro = areas.has("microtidal-seas");
  REF.set(slug, { slug, region: regionOf(lat, lon).slug, lat, lon, coast: w.coast, tidal: !!w.tidal || (w.coast === "on" && !micro), salt: w.coast !== null || w.tidal?.kind === "estuary", near, areas, bigLake: !!w.bigLake, bigRiver: w.bigRiver, admin1: e.place.admin1, frostNights: e.climate.frostDaysPerYear, high: e.climate.monthlyMeanMax, low: e.climate.monthlyMeanMin, rain: e.climate.monthlyRainMm });
  // The module's facts agree with the ones recomputed here.
  const f = placeFacts(e.place);
  for (const id of Object.keys(NEAR)) ok(near.has(id) === pinned(PIN_NEAR, id, slug) && !!f.near?.includes(id) === near.has(id), `${slug}: near ${id}: recomputed ${near.has(id)}, pinned ${pinned(PIN_NEAR, id, slug)}, module ${f.near?.includes(id)}`);
  for (const id of Object.keys(PIN_AREA)) ok(!!f.areas?.includes(id) === pinned(PIN_AREA, id, slug), `${slug}: area ${id}: module ${f.areas?.includes(id)}, pinned ${pinned(PIN_AREA, id, slug)}`);
  ok(!!f.areas?.includes("microtidal-seas") === micro, `${slug}: microtidal-seas disagrees`);
  ok(FEW_FROST_NIGHTS === 10, `FEW_FROST_NIGHTS is ${FEW_FROST_NIGHTS}, the rule is 10`);
  ok(f.coast === w.coast && f.tidal === REF.get(slug)!.tidal && f.salt === REF.get(slug)!.salt && f.bigLake === !!w.bigLake, `${slug}: coast/tidal/salt/bigLake facts disagree with water-setting`);
  const noon = Math.round(90 - Math.abs(Math.abs(lat) - 23.44));
  ok(f.noon === noon && f.winterNoon === Math.round(90 - Math.abs(lat) - 23.44), `${slug}: solstice noon ${f.noon}/${f.winterNoon}, expected ${noon}`);
}
{
  const d = (a: string, b: [number, number]) => hav([REF.get(a)!.lat, REF.get(a)!.lon], b);
  // Halifax is 57 km from the Bay of Fundy's Avon estuary at Windsor; Fredericton 85 km up the Saint John River from it.
  ok(d("halifax-nova-scotia", [44.99, -64.14]) > 50 && d("fredericton-new-brunswick", [45.25, -66.07]) > 70, "Halifax or Fredericton within reach of the Bay of Fundy");
  ok(d("washington-district-of-columbia", [38.97, -76.48]) > 40, "Washington within reach of the Chesapeake at Annapolis");
  say(`scope facts: ${Object.keys(PIN_NEAR).map((k) => `${k} ${PIN_NEAR[k].length}`).join(", ")}; ${Object.keys(PIN_AREA).map((k) => `${k} ${PIN_AREA[k].length}`).join(", ")}`);
}

/** Whether a piece holds at a town on a date, from the facts recomputed here (sowing is not known to stories). */
function holdsRef(p: Where, r: Ref, lake: boolean, leaf: boolean, month: number, fish: string[]): boolean {
  const season = (m: number) => (m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter");
  const m = r.lat < 0 ? ((month + 5) % 12) + 1 : month;
  if (p.lake !== undefined && p.lake !== lake) return false;
  if (p.leaf !== undefined && p.leaf !== leaf) return false;
  if (p.coast === "on" && r.coast !== "on") return false;
  if (p.coast === "near" && r.coast === null) return false;
  if (p.coast === false && r.coast !== null) return false;
  if (p.tidal !== undefined && p.tidal !== r.tidal) return false;
  if (p.salt !== undefined && p.salt !== r.salt) return false;
  if (p.near !== undefined && !r.near.has(p.near)) return false;
  if (p.area !== undefined && !r.areas.has(p.area)) return false;
  if (p.outside !== undefined && r.areas.has(p.outside)) return false;
  if (p.bigLake !== undefined && p.bigLake !== r.bigLake) return false;
  if (p.river !== undefined && p.river !== r.bigRiver) return false;
  if (p.fish !== undefined && !fish.includes(p.fish)) return false;
  if (p.season !== undefined && !(Array.isArray(p.season) ? p.season : [p.season]).includes(season(m))) return false;
  if (p.months !== undefined && !p.months.includes(m)) return false;
  if (p.sowing !== undefined) return false;
  if (p.admin1 !== undefined && p.admin1 !== r.admin1) return false;
  if (p.fewFrosts !== undefined && (r.frostNights === undefined || r.frostNights < 10 !== p.fewFrosts)) return false;
  // The stories never name a fish's water (only the creature lines do, checked in section 6).
  if (p.fishIn !== undefined) return false;
  // The town's own normals for the calendar month (either hemisphere), audit of 13 November 2026.
  if (p.highAtLeast !== undefined && !(r.high[month - 1] >= p.highAtLeast)) return false;
  if (p.rainBelow !== undefined && !(r.rain !== undefined && r.rain[month - 1] < p.rainBelow)) return false;
  return true;
}
const noonOf = (lat: number) => Math.round(90 - Math.abs(Math.abs(lat) - 23.44));
/** `{dayRange}`: the month's average high less its average low at the town, rounded (written out here). */
const rangeOf = (r: Ref, month: number) => Math.round(r.high[month - 1] - r.low[month - 1]);
const fillRef = (t: string, lat: number, r?: Ref, month?: number) =>
  t.replace(/\{noon\}/g, String(noonOf(lat))).replace(/\{winterNoon\}/g, String(Math.round(90 - Math.abs(lat) - 23.44))).replace(/\{dayRange\}/g, r && month ? String(rangeOf(r, month)) : "{dayRange}");

// Every town, every date.
let leafOnDays = 0;
let leafOffDays = 0;
let lakeChecks = 0;
let leafChecks = 0;
for (const e of TABLE) {
  const eco = regionOf(e.place.lat, e.place.lon);
  const stories = REGION_DAY[eco.slug];
  const dist = DIST.get(e.place.slug)!;
  const near = dist <= NEAR_KM;
  const r = REF.get(e.place.slug)!;
  ok(nearGreatLake(e.place.lat, e.place.lon) === near, `${e.place.slug}: nearGreatLake disagrees with the ${NEAR_KM} km rule at ${dist.toFixed(1)} km`);
  const south = !!e.climate.south;
  ok(south === e.place.lat < 0, `${e.place.slug}: climate.south ${south} but lat ${e.place.lat}`);
  const w = leafOnWindow(e.climate);
  ok((w === null) === (e.climate.lastSpringFrost === "Rare"), `${e.place.slug}: leaf-on window ${JSON.stringify(w)} for frost ${e.climate.lastSpringFrost}`);
  if (eco.slug === "great-lakes-st-lawrence") {
    if (near) nearRegionTowns++;
    else inlandRegionTowns++;
    // The description under the town's name.
    const text = regionTextAt(eco as never, "landscape", e.place.lat, e.place.lon);
    ok(/lake-effect/.test(text) === near, `${e.place.slug}: landscape "${text}" with ${dist.toFixed(0)} km to a shore`);
    ok(/largest freshwater/.test(text) === near, `${e.place.slug}: freshwater clause ${near ? "missing" : "present"} at ${dist.toFixed(0)} km`);
    ok(near || text === "Maple-beech-oak forests and farmland.", `${e.place.slug}: inland landscape "${text}"`);
    const garden = regionTextAt(eco as never, "gardening", e.place.lat, e.place.lon);
    ok(/lake moderation/.test(garden) === near, `${e.place.slug}: gardening line "${garden}" at ${dist.toFixed(0)} km`);
  }
  for (const date of DATES) {
    const leaf = leafOn(e.climate, date, e.place.lat);
    const ref = leafOnRef(e.climate, date, south);
    ok(leaf === ref, `${e.place.slug} ${date}: leafOn ${leaf}, window rebuilt from dates says ${ref}`);
    if (leaf) leafOnDays++;
    else leafOffDays++;
    if (!stories) continue;
    const facts = placeFacts(e.place, { climate: e.climate, date });
    ok(facts.lake === near && facts.leaf === ref, `${e.place.slug} ${date}: placeFacts lake ${facts.lake} leaf ${facts.leaf}, expected ${near} ${ref}`);
    const month = Number(date.slice(5, 7));
    const fish = fishNowAt(e.place.slug, month);
    for (const ph of PHASES) {
      for (const f of ["light", "micro", "macro"] as const) {
        const t = stories[ph][f];
        const s = storyText(t, facts);
        const tag = `${e.place.slug} ${date} ${eco.slug}/${ph}/${f}`;
        const shown = s ?? "";
        for (const p of piecesOf(t)) {
          const txt = fillRef(p.t, e.place.lat).trim();
          const only = Object.keys(p).length === 2;
          // A piece that holds only near a lake / in leaf is shown iff the town is; one with further conditions only if it is.
          if (p.lake === true) {
            lakeChecks++;
            ok(only ? shown.includes(txt) === near : !shown.includes(txt) || near, `${tag}: lake piece "${txt.slice(0, 50)}..." ${shown.includes(txt) ? "shown" : "hidden"} at ${dist.toFixed(0)} km`);
          }
          if (p.leaf === true) {
            leafChecks++;
            ok(only ? shown.includes(txt) === ref : !shown.includes(txt) || ref, `${tag}: leaf piece "${txt.slice(0, 50)}..." ${shown.includes(txt) ? "shown" : "hidden"} with leaf-on ${ref}`);
          }
        }
        // The whole story is exactly the pieces whose conditions hold, by the facts recomputed here.
        const expected = piecesOf(t).length
          ? piecesOf(t).filter((p) => holdsRef(p, r, near, ref, month, fish)).map((p) => fillRef(p.t, e.place.lat, r, month)).join("").trim() || null
          : t == null ? null : fillRef(t as string, e.place.lat, r, month);
        ok(s === expected, `${tag}: renders "${s}", expected "${expected}"`);
        if (eco.slug === "great-lakes-st-lawrence" && !near) {
          for (const re of BANNED_FAR) ok(!re.test(shown), `${tag}: lake wording ${re} at ${dist.toFixed(0)} km: "${shown}"`);
          ok(!/\blakes?\b/i.test(shown), `${tag}: the word lake in a story at ${dist.toFixed(0)} km: "${shown}"`);
        }
      }
    }
  }
}
say(`stories: ${storiesChecked} renderings clean; ${lakeChecks} lake and ${leafChecks} leaf piece checks over ${TABLE.length} towns x ${DATES.length} dates; Great Lakes region: ${nearRegionTowns} towns within ${NEAR_KM} km keep the lake text, ${inlandRegionTowns} inland drop it; ${leafOnDays} town-dates in leaf, ${leafOffDays} bare`);

// The landscape line under every town's name: never empty, a clean sentence, and only the region's own words and phrases.
{
  const words = (s: string) => s.toLowerCase().match(/[a-z0-9-]+/g) ?? [];
  const regions = new Set<string>();
  for (const e of TABLE) {
    const eco = regionOf(e.place.lat, e.place.lon) as unknown as { slug: string; landscape: string };
    regions.add(eco.slug);
    const text = regionTextAt(eco as never, "landscape", e.place.lat, e.place.lon);
    const tag = `${e.place.slug} landscape "${text}"`;
    ok(text.length > 10 && CLEAN_START.test(text) && /\.$/.test(text) && !/ {2}|,,|, and and/.test(text), `${tag}: empty or not a clean sentence`);
    const orig = new Set(words(eco.landscape));
    ok(words(text).every((x) => orig.has(x)), `${tag}: words not in the region's line "${eco.landscape}"`);
  }
  for (const slug of regions) {
    const t = (TOWN_TEXT as Record<string, { landscape?: { items: Piece[] } }>)[slug];
    ok(!!t?.landscape, `${slug}: no TOWN_TEXT landscape, so the whole region line is printed under its towns`);
    const full = (regionOf(TABLE.find((x) => regionOf(x.place.lat, x.place.lon).slug === slug)!.place.lat, TABLE.find((x) => regionOf(x.place.lat, x.place.lon).slug === slug)!.place.lon) as unknown as { landscape: string }).landscape.toLowerCase();
    // Day 5 audit (14 November 2026): a phrase narrowed by taking a word out (the tamarack at Whitehorse) is allowed by
    // name; its words are still the region's (checked above).
    const NARROWED = new Set(["open black-spruce forest"]);
    for (const it of t?.landscape?.items ?? []) {
      const s = typeof it === "string" ? it : it.t;
      ok(full.includes(s.toLowerCase()) || NARROWED.has(s), `${slug}: TOWN_TEXT item "${s}" is not a phrase of the region's line`);
    }
  }
}

// Named acceptance cases.
{
  const at = (slug: string) => TABLE.find((e) => e.place.slug === slug)!;
  const show = (slug: string, date: string) => ({ lake: DIST.get(slug)! <= NEAR_KM, leaf: leafOn(at(slug).climate, date, at(slug).place.lat) });
  const gl = REGION_DAY["great-lakes-st-lawrence"];
  const morningMacro = gl.morning.macro;
  const o = (d: string) => show("ottawa-ontario", d);
  ok(storyText(morningMacro, o("2027-06-15")) === null, "Ottawa still has the cloud-over-the-lakes clause");
  ok(!o("2026-11-02").leaf, "Ottawa is in leaf on 2 November");
  ok(o("2027-06-15").leaf, "Ottawa is bare on 15 June");
  ok(storyText(gl.morning.light, o("2026-11-02")) === "The sun climbs steeply.", `Ottawa 2 Nov morning light: ${storyText(gl.morning.light, o("2026-11-02"))}`);
  ok(storyText(gl.morning.micro, o("2026-11-02")) === null, "Ottawa 2 Nov morning micro still has the maple leaf");
  ok(/maple canopy has closed/.test(storyText(gl.morning.light, o("2027-06-15")) ?? ""), "Ottawa 15 Jun morning light lost the canopy clause");
  ok(/full stomatal opening/.test(storyText(gl.morning.micro, o("2027-06-15")) ?? ""), "Ottawa 15 Jun morning micro lost the maple leaf");
  ok(!!storyText(gl.sunrise.light, o("2027-06-15"))?.startsWith("The sun rises well north of east"), `Ottawa sunrise light: ${storyText(gl.sunrise.light, o("2027-06-15"))}`);
  for (const s of REF_RIVER) ok(!show(s, "2027-06-15").lake, `${s} has the lake text (thermocline, far shore) from Lake St. Clair`);
  for (const s of REF_LAKE) {
    const sh = show(s, "2027-06-15");
    ok(sh.lake, `${s} lost the lake text`);
    ok(/not over the lakes/.test(storyText(morningMacro, sh) ?? ""), `${s} 15 Jun morning macro lost the cloud-over-the-lakes line`);
    ok(/lake-effect/.test(regionTextAt(regionOf(at(s).place.lat, at(s).place.lon) as never, "landscape", at(s).place.lat, at(s).place.lon)), `${s} lost lake-effect in its landscape line`);
  }
  // Southern hemisphere: Cape Town is frost-free (in leaf all year); Johannesburg and Bloemfontein have their own windows.
  // (Run only while South Africa is served: src/lib/scope.ts. A parked town is not in the table.)
  if (TABLE.some((e) => e.place.slug === "cape-town-south-africa")) {
    const cpt = at("cape-town-south-africa").climate;
    ok(leafOnWindow(cpt) === null && DATES.every((d) => leafOn(cpt, d, -33.9)), "Cape Town (frost-free) should be in leaf all year");
    const jnb = at("johannesburg-south-africa").climate; // last spring frost Aug 16, first autumn frost May 30
    ok(leafOn(jnb, "2027-01-18", -26.2) && leafOn(jnb, "2026-11-23", -26.2), "Johannesburg should be in leaf in November and January");
    ok(!leafOn(jnb, "2027-07-21", -26.2) && !leafOn(jnb, "2027-06-15", -26.2), "Johannesburg should be bare in its winter (21 July, 15 June)");
    ok(leafOn(jnb, "2027-06-10", -26.2) && !leafOn(jnb, "2027-06-14", -26.2), "Johannesburg leaf-on should end 14 days after 30 May (13 June)");
    const blm = at("bloemfontein-south-africa").climate; // last spring frost Sep 23, first autumn frost Apr 28
    ok(!leafOn(blm, "2026-09-20", -29.1) && leafOn(blm, "2026-09-25", -29.1) && leafOn(blm, "2027-05-10", -29.1) && !leafOn(blm, "2027-05-13", -29.1), "Bloemfontein leaf-on should run 23 Sep to 12 May");
  }
  // Northern: Ottawa (last frost May 10, first Oct 5): in leaf 10 May to 19 October.
  const ott = TABLE.find((e) => e.place.slug === "ottawa-ontario")!.climate;
  ok(!leafOn(ott, "2027-05-09", 45.4) && leafOn(ott, "2027-05-10", 45.4) && leafOn(ott, "2026-10-19", 45.4) && !leafOn(ott, "2026-10-20", 45.4), "Ottawa leaf-on should run 10 May to 19 October");
  // A first frost after New Year (Jacksonville): the window runs past 31 December.
  const jax = TABLE.find((e) => e.climate.firstFallFrostDoy > 365 && e.climate.firstFallFrostDoy < 366 + 60);
  if (jax) {
    const c = jax.climate;
    ok(leafOn(c, "2027-12-31", jax.place.lat) && leafOnRef(c, "2027-12-31", false), `${jax.place.slug}: leaf-on across New Year`);
  }
}

// ---- 3. phase captions ---------------------------------------------------------

const MIDDAY_ONLY = /maximum photosynthesis|beds dry quickly|transplants wilt|midday|middle of the day|\bnoon\b/i;
{
  const chars = Object.keys(DAY_CHARACTERS);
  ok(chars.length === 7, `${chars.length} weather characters`);
  ok(PHASES.length === 8 && new Set(PHASES).size === 8, "DAY_PHASES does not have 8 distinct phases");
  let keyed = 0;
  for (const c of chars) {
    for (const kind of ["land", "water"] as const) {
      const keys = PHASES.map((p) => captionKey(c, kind, p));
      const whole = DAY_CHARACTERS[c][kind];
      const perPhase = DAY_CHARACTER_PHASES[c]?.[kind];
      if (perPhase) {
        keyed++;
        ok(new Set(keys).size === 8, `${c}.${kind}: the 8 phases map to ${new Set(keys).size} caption keys`);
        ok(PHASES.every((p) => p in perPhase), `${c}.${kind}: a phase has no entry`);
        ok(Object.keys(perPhase).length === 8, `${c}.${kind}: ${Object.keys(perPhase).length} entries`);
      } else {
        ok(new Set(keys).size === 1, `${c}.${kind}: no per-phase lines but ${new Set(keys).size} keys`);
        // A whole-day line with midday-only wording must have per-phase lines.
        ok(!MIDDAY_ONLY.test(whole), `${c}.${kind}: whole-day line has midday wording and no per-phase lines: ${whole}`);
      }
      for (const p of PHASES) {
        const cap = characterCaption(c, kind, p);
        if (cap != null && p !== "midday") ok(!MIDDAY_ONLY.test(cap), `${c}.${kind} at ${p} shows midday wording: ${cap}`);
        ok(cap === null || cap.length > 0, `${c}.${kind} at ${p}: empty caption`);
      }
      // Midday keeps the character's own line (a sowing line only where a crop is in its sowing window).
      const mid = characterCaption(c, kind, "midday", { sowing: true });
      ok(mid === whole || (perPhase !== undefined && mid != null && whole.startsWith(mid.replace(/ through the middle of the day\.$/, "")) ), `${c}.${kind} at midday: ${mid} is not the character's line: ${whole}`);
    }
  }
  const bl = DAY_CHARACTER_PHASES.bluebird.land!;
  ok(bl.midday === DAY_CHARACTERS.bluebird.land, "bluebird midday land line changed");
  for (const p of ["first-light", "sunrise", "morning"] as DayPhase[]) {
    ok(!MIDDAY_ONLY.test(`${characterCaption("bluebird", "land", p)} ${characterCaption("bluebird", "water", p)} ${characterCaption("overcast", "water", p)}`), `${p} shows midday wording`);
  }
  say(`captions: ${chars.length} characters x 2 lines x 8 phases; ${keyed} lines are per-phase, each with 8 distinct keys; none has midday wording outside Midday (bluebird land at Morning: "${characterCaption("bluebird", "land", "morning")}")`);
}

// ---- 4. dayPageData end to end -------------------------------------------------

{
  const pageFor = (slug: string, iso: string) => {
    const e = TABLE.find((x) => x.place.slug === slug)!;
    const tz = zoneOf(e.place);
    const now = new Date(iso);
    const today = localDateOf(now, tz);
    const data = {
      place: e.place,
      climate: e.climate,
      forecast: {
        timezone: tz,
        current: { temp: 8, code: 0, wind: 5, humidity: 55 },
        soilTemp6cm: null,
        pressureTrend: 0,
        cloudCover: 0,
        days: [{ date: today, tMax: 12, tMin: 3, precip: 0, windMax: 10, sunrise: "", sunset: "", code: 0 }],
      },
      month: Number(today.slice(5, 7)),
      today,
      waters: [],
      water: null,
      moon: {},
      regs: null,
      forageLaw: null,
      regime: null,
      season: "Fall",
      daysToFirstFrost: null,
      daysSinceLastFrost: null,
      fetchedAt: iso,
    } as unknown as LocalData;
    return dayPageData(data, now);
  };
  const TOWNS: [string, string][] = [
    ["ottawa-ontario", "America/Toronto"], ["toronto-ontario", ""], ["buffalo-new-york", ""], ["chicago-illinois", ""],
    ["milwaukee-wisconsin", ""], ["cleveland-ohio", ""], ["detroit-michigan", ""],
  ];
  const nov = "2026-11-02T14:30:00Z"; // 09:30 in the east: Morning
  const jun = "2027-06-15T13:30:00Z";
  const rows: string[] = [];
  for (const [slug] of TOWNS) {
    for (const [label, iso] of [["2 Nov 2026", nov], ["15 Jun 2027", jun]] as const) {
      const page = pageFor(slug, iso);
      // Ottawa is inland; Detroit is on the Detroit River, near only shallow Lake St. Clair, which does not count.
      const lakeTown = slug !== "ottawa-ontario" && !REF_RIVER.includes(slug);
      const leafAt = leafOn(TABLE.find((x) => x.place.slug === slug)!.climate, label === "2 Nov 2026" ? "2026-11-02" : "2027-06-15");
      const tag = `${slug} ${label}`;
      ok(page.slides.length === 8 && new Set(page.slides.map((s) => s.phase)).size === 8, `${tag}: ${page.slides.length} slides, ${new Set(page.slides.map((s) => s.phase)).size} distinct phases`);
      const by = (p: DayPhase) => page.slides.find((s) => s.phase === p)!;
      const all = page.slides.flatMap((s) => [s.light, s.micro, s.macro]).filter(Boolean).join(" ");
      ok(lakeTown ? /not over the lakes/.test(all) : !/lake|freshwater/i.test(all), `${tag}: lake text ${lakeTown ? "missing" : "present"}: ${all.match(/[^.]*lake[^.]*\./i)?.[0] ?? ""}`);
      ok(/maple canopy has closed|full stomatal opening/.test(all) === leafAt, `${tag}: maple-leaf text ${leafAt ? "missing" : "present"}`);
      ok(by("morning").captionLand == null || !MIDDAY_ONLY.test(by("morning").captionLand!), `${tag}: Morning shows a midday caption`);
      for (const p of ["first-light", "sunrise", "morning"] as DayPhase[]) {
        ok(!MIDDAY_ONLY.test(`${by(p).captionLand} ${by(p).captionWater}`), `${tag}: ${p} captions: ${by(p).captionLand} / ${by(p).captionWater}`);
      }
      if (VERBOSE && slug === "ottawa-ontario") {
        for (const sl of page.slides) say(`  [${label}] ${sl.label} ${sl.from}-${sl.to}: garden ${JSON.stringify(sl.garden.map((g) => g.name))} water ${JSON.stringify(sl.water.map((g) => g.name))} resting ${JSON.stringify(sl.resting)} | land ${JSON.stringify(sl.captionLand)} | water ${JSON.stringify(sl.captionWater)}`);
      }
      if (slug === "ottawa-ontario") rows.push(`${label} (${page.currentPhase}): Morning light "${by("morning").light}" | micro ${JSON.stringify(by("morning").micro)} | macro ${JSON.stringify(by("morning").macro)} | land caption ${JSON.stringify(by("morning").captionLand)}`);
    }
  }
  const o = pageFor("ottawa-ontario", nov);
  ok(o.currentPhase === "morning", `Ottawa at 09:30 on 2 Nov is ${o.currentPhase}`);
  say("ottawa the-day:\n  " + rows.join("\n  "));
}

// ---- 5. where region prose holds, end to end -----------------------------------
//
// Audit of 10 November 2026: region text printed as town fact. Each rule is a phrase and where it may appear,
// recomputed here (the coast band from water-setting, the pinned lists above, the town's local month). "deleted"
// phrases were false anywhere and must appear nowhere.
type RuleTown = Ref & { month: number };
const NORTH_MONTH = (t: RuleTown) => (t.lat < 0 ? ((t.month + 5) % 12) + 1 : t.month);
const inMonths = (ms: number[]) => (t: RuleTown) => ms.includes(NORTH_MONTH(t));
const SUMMER = inMonths([6, 7, 8]);
const SCOPE_RULES: { name: string; re: RegExp; ok: (t: RuleTown) => boolean }[] = [
  { name: "deleted (false anywhere or unplaceable)", ok: () => false, re: /out of the sea|still under the Atlantic|sea horizon|Arctic char|Gulf Stream and the Labrador|Labrador Current inshore|earliest sunrise on the continent|Coastal Nova Scotia|per square kilometre than anywhere outside Florida|The daily thunderstorm|sets into the water on the western Gulf|Two thirds of Florida|two and a half hours between the solstices|Atlantic salmon move into the river mouths|Seeds sown this morning|Tornado Alley|prairie chickens are on the leks|draining east off the Rockies|Twenty-five degrees between the night low|orchards are always by the water|three per cent is left|comes straight back at you|Moonlight matters here more than anywhere|The tide has turned|behind the dunes and the pines|redwood seedlings|Fog drip is a genuine water source here|Pronghorn|Kangaroo rats forage under the stars|Karst country|karst caves|The Ohio, the Wabash|Convection over the shield|build inland over the Piedmont|granite outcrops|chalk downs|the Danube delta|Lake Chad|Red Sea coast|soda lakes|welwitschia|high balds|redwood canyons|flattest large landscape|offshore rigs|between midnight and four|busiest bird migration|oldest mountain|more tree species than|more species than anywhere|wettest places|richest litter|thirty kilometres in a night|densest in North America|richest habitat here|largest edible fruit|foggiest place|hundred billion tonnes|among the oldest living|clearest, darkest skies|single most important|brightest night skies|richest on Earth|best light on the continent|largest gathering of cranes|biggest of those gaps|most reliable fish-finder|largest temperate rainforest|clearest case on the continent|most species-rich|largest known clone|no reservoir on the continent|most nocturnal trout|regrew after the farms|heart of the eastern deciduous|darkest skies|steepest temperature gradients|One of the best predators|than any other bee|rolling hardwood forest|world's largest hot desert|second-largest rainforest|continental maximum|entire water supply|eighty kilometres wide|constant 22|This whole peninsula is limestone|poisons the soil|twelve thousand years|Ten or fifteen degrees in three hours|almost certainly be a cloudless sky|rain here is a genuine surprise|Inland can be forty degrees|Caribbean forest|ten degrees cooler and much darker|evolving separately|sit exactly in it|Bats leave the caves|before they can hunt at all|east-facing bluff|barely south of east|half an hour to complete|which is why the permafrost|than the same area of open lake|five-hundred-year canopy|fastest wood decay|moves carbon and nitrogen|nine thousand feet|half again what it is at sea level|nearly every summer day|so firmly backwards|tamarack and the water|For much of winter there is nothing else|hunt the old growth|\bfjords\b(?! in Norway)|[Tt]amarack|coulees|Tall-, mixed/ },
  { name: "the Bay of Fundy (Moncton, Saint John)", re: /Fundy/, ok: (t) => t.near.has("bay-of-fundy") },
  { name: "the Chesapeake (Baltimore)", re: /Chesapeake/, ok: (t) => t.near.has("chesapeake-bay") },
  { name: "Long Island Sound (New York)", re: /Long Island Sound/, ok: (t) => t.near.has("long-island-sound") },
  { name: "the Salish Sea", re: /Salish Sea/, ok: (t) => t.near.has("salish-sea") },
  { name: "Shaconage (near the Smokies)", re: /Shaconage/, ok: (t) => t.near.has("great-smoky-mountains") },
  { name: "the Everglades at hand", re: /The Everglades is a (?:river|slow)|shallow water of the glades|^the Everglades|, the Everglades,|and the Everglades\.|over the Everglades on the other/i, ok: (t) => t.near.has("everglades") },
  { name: "the Nile valley", re: /Nile valley/, ok: (t) => t.near.has("nile-valley") },
  { name: "the great lakes of East Africa", re: /the great lakes/, ok: (t) => t.near.has("lake-victoria") },
  { name: "the Gulf of Mexico belt", re: /bayou|Spanish moss|Out in the Gulf|watches the Gulf|Louisiana loses|Alligators are hunting|Gulf of Mexico/, ok: (t) => t.near.has("gulf-coast-belt") },
  { name: "the Mississippi's mouth", re: /drain for forty per cent/, ok: (t) => t.near.has("gulf-coast-belt") && t.bigRiver === "Mississippi" },
  { name: "the open sea within about 10 km", re: /\bbeach\b|\bdunes?\b|sand fleas|beach plum|intertidal|harbour|[Hh]orseshoe crabs|\bsea breeze\b|rocky headlands|\bfjords\b(?! in Norway)|coral (islands|reefs)|long sandy beaches|Salt crystals|breeze runs offshore|breeze reverses again|Bioluminescent plankton flare in the wake|Bait balls|Striped bass that hunted|across open water and marsh with nothing in the way/, ok: (t) => t.coast === "on" },
  { name: "the open sea within about 30 km", re: /Salt fog|Labrador Current sits offshore|Fog forms over the cold water offshore|barrier-island|almost tideless sea|Steelhead and salmon wait/, ok: (t) => t.coast !== null },
  { name: "a tideless sea", re: /almost tideless sea/, ok: (t) => t.areas.has("microtidal-seas") },
  { name: "salt water (the sea within 30 km or an estuary)", re: /coastal marsh|salt marsh|mangrove|cordgrass|marsh grass|Marsh grass decays|on the flats|Shrimp move on the tide|plankton in the lagoons|Coho and chinook stage/i, ok: (t) => t.salt },
  { name: "tidal water", re: /salt wedge|tidal rivers|tidal flats|long estuaries|The tide is the moon made visible/, ok: (t) => t.tidal },
  { name: "the coastal plain (south-east of the fall line)", re: /longleaf|wiregrass|blackwater rivers|swamps and barrier|Fire is the keystone|heat comes off the sand|sand releases its heat/i, ok: (t) => t.areas.has("atlantic-coastal-plain") },
  { name: "the Piedmont's edge (within 25 km of the fall line)", re: /Coastal plain|rolling Piedmont/, ok: (t) => t.areas.has("fall-line") },
  { name: "the gopher tortoise's range", re: /[Gg]opher tortoise/, ok: (t) => t.areas.has("gopher-tortoise-range") },
  { name: "water tupelo's range", re: /[Cc]ypress-tupelo/, ok: (t) => t.areas.has("water-tupelo-range") },
  { name: "the saguaro's range", re: /saguaro|Night-blooming cereus|Lesser long-nosed bats/i, ok: (t) => t.areas.has("saguaro-range") },
  { name: "the hot deserts (creosote)", re: /[Cc]reosote/, ok: (t) => t.areas.has("hot-deserts") },
  { name: "a big lake at the town", re: /lake breathing|A hundred kilometres of lake surface|holds the frost off its own shoreline/, ok: (t) => t.bigLake },
  { name: "summer (June to August)", ok: SUMMER, re: /Warm, close and loud|Warm and loud\.|Warm and heavy\.|Afternoon convection is building|chuck-will's-widow|^Merciless|Almost nothing is above ground|summer dormancy|sea-breeze collision|two sea breezes|Dusk is short and warm|Heat and humidity peak|Heat peaks and the humidity|Fireflies come out of the grass|the towers go up|storm anvils|low-level jet|Strong, clear and dry|will not rain again for five months|oils volatilise|draws the marine air|golden hills|annual grasses have finished|haze of its own making|The night stays warm and heavy|Fire ants, mosquitoes|Leaves have closed down|kind of heat that dictates|heating the sand hard|marsh grass is at its most stressed|bayou can gain five degrees|shallow bayou|Convection builds towering cumulus|Thunderstorms fire over the burns|decay runs all night at these temperatures|heat index runs far above|deep and sullen|Salmon in the river are holding|Nighthawks and chimney swifts|Reptiles that have been in the burrows|bats roost in that gap|summer Milky Way stands up over the corn|Squall lines march east/ },
  { name: "the Gulf's storm season (June to September)", re: /The afternoon storm builds and breaks/, ok: inMonths([6, 7, 8, 9]) },
  { name: "the sea turtle nesting season (March to October), on the open coast", re: /Sea turtles come ashore/, ok: (t) => t.coast === "on" && t.areas.has("florida-atlantic-coast") && inMonths([3, 4, 5, 6, 7, 8, 9, 10])(t) },
  { name: "spring", re: /spring ephemerals/, ok: inMonths([3, 4, 5]) },
  { name: "spring and summer", re: /dryline|The dawn chorus peaks|Whip-poor-wills call/, ok: inMonths([3, 4, 5, 6, 7, 8]) },
  { name: "the snowmelt (March to June)", re: /Snowmelt is running/, ok: inMonths([3, 4, 5, 6]) },
  { name: "pika haying (July to September)", re: /Pika are working/, ok: inMonths([7, 8, 9]) },
  // Audit of 11 November 2026.
  {
    name: "the Southern Blue Ridge (Asheville, not Pittsburgh)",
    re: /long before the coves|Frost sits in the cove|Cold air has drained down the hollows|mountains are islands|east-facing cove|cove hardwood forest|four hundred metres apart|laurel hells|spruce-fir on the highest peaks|give the Blue Ridge its name|Orographic lifting: moist air pushed up the western slopes|a cove can lose the sun|whole range breathes downhill|Dusk comes up the mountain|call from the ridges|southern Appalachians|rhododendron hollows|(?<!dams and )clear mountain streams/,
    ok: (t) => t.near.has("southern-blue-ridge"),
  },
  { name: "the Smokies in June", re: /synchronous fireflies/, ok: (t) => t.near.has("great-smoky-mountains") && inMonths([6])(t) },
  { name: "autumn", re: /Black bears are moving/, ok: inMonths([9, 10, 11]) },
  { name: "the bald cypress range (not Brownsville)", re: /cypress knee|top third of the cypress|Bald cypress does/, ok: (t) => t.areas.has("bald-cypress-west") },
  { name: "Louisiana", re: /Louisiana loses/, ok: (t) => t.admin1 === "Louisiana" },
  { name: "the coastal prairie (Houston)", re: /prairie remnants/, ok: (t) => t.areas.has("coastal-prairie") },
  { name: "nearly frost-free (frost on fewer than 10 nights a year at the town's stations)", re: /frost-free/, ok: (t) => t.frostNights !== undefined && t.frostNights < 10 },
  // Audit of 13 November 2026.
  { name: "the Madrean sky islands (Tucson)", re: /Sky islands:|over the sky islands/, ok: (t) => t.areas.has("madrean-sky-islands") },
  { name: "the monsoon's reach (Arizona, New Mexico; not Boise)", re: /summer monsoon cell/, ok: (t) => t.areas.has("north-american-monsoon") },
  { name: "the redwood belt (San Jose)", re: /[Rr]edwoods grow wild/, ok: (t) => t.near.has("redwood-belt") },
  { name: "off the Central Valley floor (chaparral, coast live oak; not Sacramento)", re: /Dew on the chaparral|Chaparral shrubs|chaparral's oils|chaparral hills|manzanita and ceanothus|[Cc]oast live oak/, ok: (t) => !t.areas.has("central-valley") },
  { name: "valley oak's range (not San Diego)", re: /valley oak/i, ok: (t) => t.areas.has("valley-oak-range") },
  { name: "Florida's northern half (spring-fed rivers)", re: /spring-fed rivers/, ok: (t) => t.areas.has("florida-northern-half") },
  { name: "central Florida's lake district (Orlando)", re: /thousands of lakes/, ok: (t) => t.region !== "florida-peninsula" || t.near.has("central-florida-lakes") },
  { name: "rockland hammock (Miami)", re: /rockland hammock|Gumbo limbo/, ok: (t) => t.areas.has("rockland-hammock") },
  { name: "Florida's Atlantic shore (the Atlantic sunrise)", re: /out of the Atlantic on one coast|on the Atlantic beaches/, ok: (t) => t.coast === "on" && t.areas.has("florida-atlantic-coast") },
  { name: "the Snake River Plain (sagebrush steppe)", re: /sagebrush steppe/i, ok: (t) => t.areas.has("snake-river-plain") },
  { name: "a big desert reservoir within reach", re: /big reservoirs and tailwaters/, ok: (t) => t.near.has("desert-reservoirs") },
  { name: "reptiles about (an average high of at least 23 °C this month)", re: /Lizards come out|Lizards get a second|Snakes come out|rattlesnakes hunt them/, ok: (t) => t.high[t.month - 1] >= 23 },
  { name: "the dry season (under 5 mm this month)", re: /This is the dry season/, ok: (t) => t.rain !== undefined && t.rain[t.month - 1] < 5 },
  // Audit of 14 November 2026 (Day 5).
  // White nights: the June midnight sun no more than 6 degrees down (civil twilight all night), latitude + 23.44 - 90 >= -6.
  { name: "white nights (north of about 60.6 N)", re: /no night at all|never properly ends/, ok: (t) => Math.abs(t.lat) + 23.44 - 90 >= -6 },
  { name: "the marine layer (June to August)", re: /[Mm]arine layer/, ok: inMonths([6, 7, 8]) },
  { name: "the long boreal afternoon (May to July)", re: /long afternoon runs on into evening/, ok: inMonths([5, 6, 7]) },
  { name: "thin air (the high towns: Wyoming, Montana)", re: /thin air/i, ok: (t) => ["Wyoming", "Montana"].includes(t.admin1) },
  { name: "lightning's share of fires (British Columbia, summer)", re: /lightning starts about six wildfires in ten/, ok: (t) => t.admin1 === "British Columbia" && inMonths([6, 7, 8])(t) },
  { name: "not on the Salish Sea (an inland sea: no surf, dunes or Atlantic shore plants)", re: /\bbeach\b|\bdunes?\b|\bsurf\b|[Hh]orseshoe crabs|beach plum|[Pp]itch pine|open sea/, ok: (t) => !t.near.has("salish-sea") },
];
ok(REPTILE_HIGH_C === 23, `REPTILE_HIGH_C is ${REPTILE_HIGH_C}, the rule is 23 (Tucson's March high, 23.4 °C)`);
/** Fish lines that name a kind of water, and the water the fishing page must list the fish in (audit of 11 November 2026). */
const WATER_RULES: { re: RegExp; fish: string[]; waters: string[]; tidalWaters?: string[] }[] = [
  { re: /shoals and weed edges|two to four metres/, fish: ["walleye"], waters: ["lakes"] },
  // The tide: the sea or an estuary, or a river where the tide reaches the town (the Delaware at Philadelphia).
  { re: /tide change|in the rips/, fish: ["striped-bass"], waters: ["sea", "estuary"], tidalWaters: ["rivers"] },
  { re: /feeding lanes where current/, fish: ["rainbow-trout"], waters: ["rivers"] },
  { re: /tailouts/, fish: ["brown-trout", "steelhead"], waters: ["rivers"] },
  { re: /over deep points/, fish: ["muskellunge"], waters: ["lakes"] },
  { re: /top thirty metres of the lake/, fish: ["chinook-salmon"], waters: ["lakes"] },
];
// The line printed everywhere a creature shows (the guide's day band too) never names a kind of water; the scoped one
// is the same line with those words, and renders cleanly.
for (const [slug, phases] of Object.entries(DAY_RHYTHMS)) {
  for (const [ph, r] of Object.entries(phases)) {
    if (!r || r === "rest") continue;
    for (const w of WATER_RULES) ok(!w.re.test(r.where), `${slug}/${ph}: the line printed everywhere names a kind of water: "${r.where}"`);
    for (const p of r.at ?? []) {
      const piece = typeof p === "string" ? { t: p } : p;
      ok(!!piece.fishIn && piece.fishIn.fish === slug, `${slug}/${ph}: an "at" line without its own fish's water: "${piece.t}"`);
      const same = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));
      ok(WATER_RULES.some((w) => w.re.test(piece.t) && w.fish.includes(slug) && (same(piece.fishIn!.waters, w.waters) || (!!w.tidalWaters && same(piece.fishIn!.waters, w.tidalWaters) && piece.tidal === true))), `${slug}/${ph}: "at" line "${piece.t}" is not covered by a WATER_RULE with the same waters`);
      ok(CLEAN_START.test(piece.t) && CLEAN_END.test(piece.t), `${slug}/${ph}: "at" line not a clean sentence: "${piece.t}"`);
    }
  }
}
// Named waters from the live store's backup, as the fishing check reads them (scripts/check-fish.ts); none: the town's
// grid water only.
const CACHED = new Map<string, WaterBody[]>();
{
  const BACKUP = "/home/claude/rebuild/blobs-guides.jsonl";
  if (existsSync(BACKUP)) {
    for (const line of readFileSync(BACKUP, "utf8").split("\n")) {
      if (!line.startsWith('{"k":"waters:v2:')) continue;
      try {
        const o = JSON.parse(line) as { k: string; v: unknown };
        const v = typeof o.v === "string" ? JSON.parse(o.v) : o.v;
        CACHED.set(o.k, (((v as { value?: WaterBody[] }).value ?? []) as WaterBody[]).filter((w) => !isInfrastructureWater(w.name)));
      } catch {}
    }
  }
}
{
  const counts = new Map<string, number>(SCOPE_RULES.map((r) => [r.name, 0]));
  const waterCounts = new Map<string, number>(WATER_RULES.map((w) => [w.fish.join("/"), 0]));
  let fishLines = 0;
  let sowingDays = 0;
  let closedDays = 0;
  let pages = 0;
  for (const e of TABLE) {
    const tz = zoneOf(e.place);
    const r = REF.get(e.place.slug)!;
    const regime = regimeOf(e.climate, e.place.lat);
    const eco = regionOf(e.place.lat, e.place.lon);
    const land = regionTextAt(eco as never, "landscape", e.place.lat, e.place.lon);
    const summary = regionTextAt(eco as never, "summary", e.place.lat, e.place.lon, e.climate);
    ok(summary.length > 10 && CLEAN_START.test(summary) && /\.$/.test(summary), `${e.place.slug}: region card summary "${summary}" is empty or not a sentence`);
    const waters = CACHED.get(`waters:v2:${e.place.lat.toFixed(2)}:${e.place.lon.toFixed(2)}`) ?? [];
    const water = waterSetting(e.place.lat, e.place.lon, waters, e.climate);
    for (const date of DATES) {
      const now = new Date(`${date}T${String((12 - Math.round(e.place.lon / 15) + 24) % 24).padStart(2, "0")}:00:00Z`);
      const today = localDateOf(now, tz);
      const month = Number(today.slice(5, 7));
      const data = {
        place: e.place, climate: e.climate, regime,
        forecast: { timezone: tz, current: { temp: 8, code: 3, wind: 5, humidity: 90 }, soilTemp6cm: null, pressureTrend: 0, cloudCover: 100, days: [{ date: today, tMax: 12, tMin: 6, precip: 0, windMax: 10, sunrise: "", sunset: "", code: 3 }] },
        month, today, waters, water, moon: {}, regs: null, forageLaw: null, season: "", daysToFirstFrost: null, daysSinceLastFrost: null, fetchedAt: now.toISOString(),
      } as unknown as LocalData;
      const page = dayPageData(data, now);
      pages++;
      const t: RuleTown = { ...r, month };
      const texts = [...page.slides.flatMap((sl) => [sl.light, sl.micro, sl.macro]).filter((x): x is string => !!x), land];
      // The region card's summary describes the region by its parts ("the Mississippi delta and the Gulf shore", "the
      // great lakes Victoria, Tanganyika ..."), labelled as the region's; its climate words are the town's to bear out.
      for (const rule of SCOPE_RULES.filter((x) => /^deleted|frost-free/.test(x.name))) {
        if (!rule.re.test(summary)) continue;
        counts.set(rule.name, counts.get(rule.name)! + 1);
        ok(rule.ok({ ...r, month }), `${e.place.slug} ${today}: region card "${summary}" (${rule.name})`);
      }
      // The fish lines: the one that names a kind of water exactly where the fishing page lists the fish in it today
      // (recomputed here from fishByWater's sections), the plain one everywhere else.
      const listed: Record<string, string[]> = {};
      const r0 = r;
      for (const sec of fishByWater(month, eco.slug, water, { place: e.place, today })) if (!sec.avoid) for (const f of sec.fish) (listed[f.slug] ??= []).push(sec.id);
      for (const sl of page.slides) {
        for (const c of sl.water) {
          fishLines++;
          const r = DAY_RHYTHMS[c.slug]?.[sl.phase];
          if (!r || r === "rest") continue;
          const at = (r.at ?? []).map((p) => (typeof p === "string" ? { t: p } : p)).find((p) => !!p.fishIn && (listed[p.fishIn.fish] ?? []).some((x) => p.fishIn!.waters.includes(x)) && (p.tidal === undefined || p.tidal === r0.tidal));
          ok(c.where === (at ? at.t : r.where), `${e.place.slug} ${today} ${sl.phase}: ${c.slug} "${c.where}", expected "${at ? at.t : r.where}" (listed in ${JSON.stringify(listed[c.slug] ?? [])})`);
          for (const w of WATER_RULES) {
            if (!w.re.test(c.where)) continue;
            waterCounts.set(w.fish.join("/"), waterCounts.get(w.fish.join("/"))! + 1);
            const inW = (ws: string[]) => (listed[c.slug] ?? []).some((x) => ws.includes(x));
            ok(w.fish.includes(c.slug) && (inW(w.waters) || (!!w.tidalWaters && inW(w.tidalWaters) && r0.tidal)), `${e.place.slug} ${today}: ${c.slug} "${c.where}" where the page lists it in ${JSON.stringify(listed[c.slug] ?? [])} (tidal ${r0.tidal})`);
          }
        }
        for (const c of [...sl.water, ...sl.garden]) ok(!SCOPE_RULES[0].re.test(c.where), `${e.place.slug} ${today}: deleted wording in ${c.slug}: "${c.where}"`);
      }
      for (const tx of texts) {
        ok(!/[{}]/.test(tx), `${e.place.slug} ${today}: a token left in "${tx}"`);
        for (const rule of SCOPE_RULES) {
          if (!rule.re.test(tx)) continue;
          counts.set(rule.name, counts.get(rule.name)! + 1);
          ok(rule.ok(t), `${e.place.slug} ${today}: "${tx.match(rule.re)?.[0]}" (${rule.name}) printed outside its scope: "${tx.slice(0, 120)}"`);
        }
        // The sun's height is the town's own: 90 minus the distance of its latitude from the tropic, rounded.
        for (const m of tx.matchAll(/(?:tops out near|goes near|reaches about|peaks near) (\d+)°/g)) ok(Number(m[1]) === noonOf(e.place.lat), `${e.place.slug}: "${m[0]}" but the solstice noon here is ${noonOf(e.place.lat)}°`);
        // The desert dusk's figure is the town's own range this month (audit of 13 November 2026).
        for (const m of tx.matchAll(/the low is (\d+) °C below the high/g)) ok(Number(m[1]) === rangeOf(r, month), `${e.place.slug} ${today}: "${m[0]}" but the average range this month is ${rangeOf(r, month)} °C`);
      }
      // The overcast "transplanting and sowing" line and advice follow the town's own sowing window today.
      ok(page.character === "overcast", `${e.place.slug} ${today}: stub sky is ${page.character}, not overcast`);
      const fits = fitsFor(data);
      const n = fits.length ? sowNow(fits, month, doyOfIso(today)) : null;
      const open = !!n && n.sow.length + n.sowWatered.length + n.plant.length > 0;
      if (open) sowingDays++;
      else closedDays++;
      const lines = page.slides.map((sl) => sl.captionLand ?? "");
      ok(page.slides.every((sl) => /transplanting and sowing/.test(sl.captionLand ?? "") === (open && sl.phase !== "night")), `${e.place.slug} ${today}: overcast land lines ${JSON.stringify(lines)} with sowing ${open ? "open" : "closed"}`);
      ok(/for transplanting/.test(page.characterAdvice) === open, `${e.place.slug} ${today}: advice "${page.characterAdvice}" with sowing ${open ? "open" : "closed"}`);
    }
  }
  // The rules are live: each scoped phrase does print somewhere it holds (a rule that never matches checks nothing).
  // Three rules hold only at towns that are parked (src/lib/scope.ts): the Nile valley, the East African great lakes,
  // and the tideless Mediterranean and Baltic. With no such town served they have nowhere to print, and are not asked to.
  const PARKED_ONLY = new Set(["the Nile valley", "the great lakes of East Africa", "a tideless sea"]);
  const parkedNow = !townServed_("EG") && !townServed_("KE") && !townServed_("IT");
  for (const [name, c] of counts)
    if (name !== "deleted (false anywhere or unplaceable)" && !(parkedNow && PARKED_ONLY.has(name))) ok(c > 0, `scope rule "${name}" never matched: is the phrase gone, or the rule stale?`);
  ok(characterCaption("overcast", "land", "midday") === null && characterCaption("overcast", "land", "midday", { sowing: true }) === DAY_CHARACTER_SOWING.overcast.land, "overcast land line is shown without a sowing window (as on the guide page's DayBand)");
  say(`fish lines: ${fishLines} on the day pages; lines naming a kind of water: ${[...waterCounts].map(([k, v]) => `${k} ${v}`).join(", ")}`);
  say(`scope: ${pages} day pages (${TABLE.length} towns x ${DATES.length} dates, overcast); ${SCOPE_RULES.length} rules, matches ${[...counts].filter(([, c]) => c).map(([n, c]) => `${n.split(" (")[0]} ${c}`).join("; ")}; overcast sowing line on ${sowingDays} town-dates, off on ${closedDays}`);
}

// ---- 6. named cases, audit of 11 November 2026 ------------------------------------
{
  const at = (slug: string) => TABLE.find((e) => e.place.slug === slug)!;
  const line = (slug: string, field: "landscape" | "summary") => {
    const e = at(slug);
    return regionTextAt(regionOf(e.place.lat, e.place.lon) as never, field, e.place.lat, e.place.lon, e.climate);
  };
  const expectLine = (slug: string, field: "landscape" | "summary", want: string) => ok(line(slug, field) === want, `${slug} ${field}: "${line(slug, field)}", expected "${want}"`);
  expectLine("pittsburgh-pennsylvania", "landscape", "Mixed mesophytic and oak forests.");
  expectLine("asheville-north-carolina", "landscape", "Mixed mesophytic and oak forests, rhododendron hollows and clear mountain streams.");
  for (const s of ["columbus-ohio", "indianapolis-indiana", "nashville-tennessee", "st-louis-missouri"]) expectLine(s, "landscape", "Big warm rivers and reservoirs.");
  // The coastal prairie at Houston only (the coast and salt items follow water-setting, checked by the scope rules).
  ok(/^Cypress-tupelo swamps.*prairie remnants\.$/.test(line("houston-texas", "landscape")), `houston landscape: "${line("houston-texas", "landscape")}"`);
  for (const s of ["new-orleans-louisiana", "memphis-tennessee", "little-rock-arkansas", "brownsville-texas"]) ok(!/prairie/.test(line(s, "landscape")), `${s} landscape: "${line(s, "landscape")}"`);
  ok(!/ypress/.test(line("brownsville-texas", "landscape")), `brownsville landscape: "${line("brownsville-texas", "landscape")}"`);
  const gulf = "Bottomland hardwoods, bayous, the Mississippi delta and the Gulf shore: humid";
  for (const s of ["memphis-tennessee", "little-rock-arkansas"]) expectLine(s, "summary", `${gulf}.`);
  for (const s of ["brownsville-texas", "houston-texas", "new-orleans-louisiana"]) expectLine(s, "summary", `${gulf} and nearly frost-free.`);
  expectLine("pittsburgh-pennsylvania", "summary", "Mixed mesophytic and oak forest: coves, ridges and cold headwater streams.");
  // Without the town's climate, the frost words are dropped (the safe side).
  const no = at("brownsville-texas");
  ok(regionTextAt(regionOf(no.place.lat, no.place.lon) as never, "summary", no.place.lat, no.place.lon) === `${gulf}.`, "Brownsville summary without a climate still says frost-free");
  // The Day page's land-loss sentence: New Orleans only, not Houston or Brownsville.
  const night = REGION_DAY["gulf-coast"].night.macro;
  const story = (slug: string) => storyText(night, placeFacts(at(slug).place, { climate: at(slug).climate, date: "2026-11-11" })) ?? "";
  ok(/Louisiana loses/.test(story("new-orleans-louisiana")) && !/Louisiana/.test(story("houston-texas")) && !/Louisiana/.test(story("brownsville-texas")), `Gulf night macro: NO "${story("new-orleans-louisiana")}", Houston "${story("houston-texas")}", Brownsville "${story("brownsville-texas")}"`);
  // The ground tile says "to the bedrock" only when told a rock is named (src/lib/ground-layers digStopsAtCover).
  const nav = readFileSync("src/components/kids/LandSkyNav.jsx", "utf8");
  ok(/rockNamed = false/.test(nav) && /note: rockNamed \? "Dig down to the bedrock" : "Dig down through the layers"/.test(nav) && (nav.match(/"Dig down to the bedrock"/g) ?? []).length === 1, "LandSkyNav: the ground tile promises the bedrock without a rock named");
  say(`audit 11 Nov: land lines, region card summaries, the Louisiana sentence and the ground tile pinned`);
}

// ---- 7. named cases, audit of 13 November 2026 ------------------------------------
{
  const at = (slug: string) => TABLE.find((e) => e.place.slug === slug)!;
  const land = (slug: string) => regionTextAt(regionOf(at(slug).place.lat, at(slug).place.lon) as never, "landscape", at(slug).place.lat, at(slug).place.lon);
  const LAND: Record<string, string> = {
    "orlando-florida": "Pine flatwoods, hammocks, spring-fed rivers and thousands of lakes.",
    "tampa-florida": "Pine flatwoods, hammocks and spring-fed rivers.",
    "fort-myers-florida": "Pine flatwoods and hammocks.",
    "miami-florida": "Pine flatwoods, hammocks and the Everglades.",
    "fort-lauderdale-florida": "Pine flatwoods, hammocks and the Everglades.",
    "boise-idaho": "Sagebrush steppe, canyon country, ephemeral washes and a few big reservoirs and tailwaters.",
    "albuquerque-new-mexico": "Canyon country and ephemeral washes.",
    "las-vegas-nevada": "Canyon country, ephemeral washes and a few big reservoirs and tailwaters.",
    "phoenix-arizona": "Creosote and saguaro flats, canyon country, ephemeral washes and a few big reservoirs and tailwaters.",
    "tucson-arizona": "Creosote and saguaro flats, canyon country and ephemeral washes.",
    "sacramento-california": "Valley oak woodlands and irrigated valleys inland.",
    "san-jose-california": "Coast live oak and valley oak woodlands, chaparral hills and irrigated valleys inland.",
    "los-angeles-california": "Coast live oak and valley oak woodlands, chaparral hills and irrigated valleys inland.",
    "santa-barbara-california": "Coast live oak and valley oak woodlands, chaparral hills and irrigated valleys inland.",
    "san-diego-california": "Oak woodlands, chaparral hills and irrigated valleys inland.",
  };
  for (const [slug, want] of Object.entries(LAND)) ok(land(slug) === want, `${slug} landscape: "${land(slug)}", expected "${want}"`);
  // The day stories as each town reads them on a date: every phase, joined.
  const day = (slug: string, date: string) => {
    const e = at(slug);
    const f = placeFacts(e.place, { climate: e.climate, date });
    const st = REGION_DAY[regionOf(e.place.lat, e.place.lon).slug];
    return PHASES.flatMap((ph) => (["light", "micro", "macro"] as const).map((k) => storyText(st[ph][k], f) ?? "")).join(" ");
  };
  const NOV = "2026-11-13";
  const JUL = "2027-07-21";
  for (const s of ["boise-idaho", "albuquerque-new-mexico"]) {
    const d = day(s, NOV);
    ok(!/[Ll]izards|[Ss]nakes|[Ss]ky islands|Bats leave/.test(d) && (s !== "boise-idaho" || !/monsoon/.test(d)), `${s} ${NOV}: reptiles, sky islands or (Boise) the monsoon in "${d.slice(0, 300)}..."`);
    ok(/[Ll]izards come out/.test(day(s, JUL)), `${s} ${JUL}: no lizards in July`);
  }
  ok(!/monsoon/.test(day("boise-idaho", JUL)) && /summer monsoon cell/.test(day("albuquerque-new-mexico", JUL)), "the monsoon cell: Albuquerque, not Boise");
  ok(/Sky islands:/.test(day("tucson-arizona", NOV)) && /Lizards come out/.test(day("tucson-arizona", NOV)), "Tucson 13 Nov: the sky islands or its lizards (November high 23.9 °C) are missing");
  for (const s of ["phoenix-arizona", "las-vegas-nevada"]) ok(!/[Ss]ky islands/.test(day(s, JUL)), `${s}: sky islands`);
  ok(/estimated at 9,400 years old/.test(day("las-vegas-nevada", NOV)) && !/poisons/.test(day("las-vegas-nevada", NOV)), "Las Vegas: the creosote clone line");
  for (const s of ["sacramento-california", "los-angeles-california", "santa-barbara-california", "san-diego-california"]) ok(!/[Rr]edwood/.test(day(s, JUL)), `${s}: redwoods`);
  ok(/Redwoods grow wild/.test(day("san-jose-california", NOV)), "San Jose: the redwood line is missing");
  for (const date of [NOV, JUL]) ok(!/chaparral|[Cc]oast live oak|manzanita/.test(day("sacramento-california", date).replace(/desert and chaparral mammal/, "")), `Sacramento ${date}: chaparral or coast live oak`);
  for (const s of ["sacramento-california", "san-jose-california", "los-angeles-california", "santa-barbara-california", "san-diego-california"]) {
    ok(/^The sun climbs\. The sun comes|The sun climbs\. (?!This is the dry season)/.test(day(s, NOV)) && !/dry season|forty degrees/.test(day(s, NOV)), `${s} ${NOV}: the dry-season or forty-degree line in November`);
    ok(/This is the dry season/.test(day(s, JUL)), `${s} ${JUL}: no dry-season line in July`);
    ok(!/rattlesnakes/.test(day(s, "2027-01-18")), `${s}: rattlesnakes hunting in January`);
  }
  ok(!/Steelhead and salmon wait/.test(DATES.map((d) => day("san-jose-california", d)).join(" ")), "San Jose: steelhead waiting for the bar (the South Bay is not the open sea)");
  ok(!/Sea turtles/.test(day("tampa-florida", JUL)) && /on the Atlantic beaches/.test(day("miami-florida", JUL)), "Sea turtles: Miami, not Tampa");
  for (const s of ["orlando-florida", "tampa-florida", "fort-myers-florida"]) {
    ok(!/over the Everglades|hammock/.test(day(s, JUL)), `${s}: the Everglades sunrise or the tropical hammock`);
  }
  ok(/rockland hammock/.test(day("miami-florida", JUL)) && !/rockland hammock/.test(day("fort-lauderdale-florida", JUL)), "rockland hammock: Miami, not Fort Lauderdale");
  for (const s of ["orlando-florida", "miami-florida"]) ok(/about 24 °C in central Florida/.test(day(s, NOV)) && !/whole peninsula/.test(day(s, NOV)), `${s}: the springs and limestone line`);
  say(`audit 13 Nov: 15 land lines, the desert, Florida and California day stories pinned`);
}

// ---- 8. named cases, audit of 14 November 2026 (Day 5) -------------------------------
{
  const at = (slug: string) => TABLE.find((e) => e.place.slug === slug);
  const land = (slug: string) => {
    const e = at(slug)!;
    return regionTextAt(regionOf(e.place.lat, e.place.lon) as never, "landscape", e.place.lat, e.place.lon);
  };
  const day = (slug: string, date: string) => {
    const e = at(slug)!;
    const f = placeFacts(e.place, { climate: e.climate, date });
    const st = REGION_DAY[regionOf(e.place.lat, e.place.lon).slug];
    return PHASES.flatMap((ph) => (["light", "micro", "macro"] as const).map((k) => storyText(st[ph][k], f) ?? "")).join(" ");
  };
  const has = (slug: string) => !!at(slug);
  const NOV = "2026-11-14";
  const JUL = "2027-07-21";
  const LAND: Record<string, string> = {
    "austin-texas": "Prairie, river valleys, farmland almost everywhere.",
    "san-antonio-texas": "Prairie, river valleys, farmland almost everywhere.",
    "saskatoon-saskatchewan": "Prairie, river valleys, farmland almost everywhere.",
    "whitehorse-yukon": "Open black-spruce forest, muskeg, tundra beyond the treeline, and huge clear lakes and rivers.",
    "thompson-manitoba": "Open black-spruce forest, muskeg, tundra beyond the treeline, and huge clear lakes and rivers.",
  };
  for (const [slug, want] of Object.entries(LAND)) if (has(slug)) ok(land(slug) === want, `${slug} landscape: "${land(slug)}", expected "${want}"`);
  for (const s of ["nanaimo-british-columbia", "vancouver-british-columbia", "victoria-british-columbia", "seattle-washington"]) if (has(s)) ok(!/fjord/.test(land(s)), `${s}: fjords in the land line "${land(s)}"`);
  for (const s of ["kingston-ontario", "niagara-on-the-lake-ontario"]) if (has(s)) ok(!/east-facing/.test(day(s, JUL)), `${s}: the east-facing bluff at golden hour`);
  if (has("thompson-manitoba")) for (const d of [NOV, JUL]) ok(!/no night at all|never properly ends/.test(day("thompson-manitoba", d)), `Thompson ${d}: white nights at 55.7 N`);
  if (has("yellowknife-northwest-territories")) ok(/no night at all/.test(day("yellowknife-northwest-territories", JUL)), "Yellowknife: the white nights are missing");
  for (const s of ["thompson-manitoba", "whitehorse-yukon", "yellowknife-northwest-territories", "fairbanks-alaska"]) {
    if (!has(s)) continue;
    const n = day(s, NOV);
    ok(!/long afternoon|barely south of east|half an hour|holding the last of yesterday|open lake|tamarack and/.test(n), `${s} ${NOV}: a Day 5 boreal line in "${n.slice(0, 200)}..."`);
    ok(/insulate the ground/.test(n), `${s}: the permafrost line is missing`);
    // The sunrise geometry, recomputed (refraction 0.833 degrees): south-east or beyond in December, and the disc five
    // minutes or more clearing the horizon at both solstices.
    const lat = at(s)!.place.lat * (Math.PI / 180);
    const h0 = -0.833 * (Math.PI / 180);
    for (const decDeg of [-23.44, 23.44]) {
      const dec = decDeg * (Math.PI / 180);
      const H = Math.acos((Math.sin(h0) - Math.sin(lat) * Math.sin(dec)) / (Math.cos(lat) * Math.cos(dec)));
      const mins = (0.53 / (15 * Math.cos(lat) * Math.cos(dec) * Math.sin(H))) * 60;
      const az = (Math.acos((Math.sin(dec) - Math.sin(lat) * Math.sin(h0)) / (Math.cos(lat) * Math.cos(h0))) * 180) / Math.PI;
      ok(mins >= 5, `${s}: the disc clears in ${mins.toFixed(1)} min at declination ${decDeg}, under the "five minutes or more" printed`);
      if (decDeg < 0) ok(az >= 125, `${s}: December sunrise azimuth ${az.toFixed(0)} is not "well round to the south-east"`);
    }
  }
  for (const s of ["nanaimo-british-columbia", "vancouver-british-columbia", "victoria-british-columbia", "seattle-washington", "portland-oregon"]) {
    if (!has(s)) continue;
    const n = day(s, NOV);
    ok(!/[Mm]arine layer|five-hundred|fastest wood|mycorrhizal network|old growth and barred/.test(n), `${s} ${NOV}: a Day 5 Pacific line in "${n.slice(0, 200)}..."`);
    ok(/[Mm]arine layer/.test(day(s, JUL)), `${s} ${JUL}: the summer marine layer is missing`);
    ok(/Carpenter Lake/.test(n), `${s}: the spotted owl's range is missing`);
  }
  for (const s of ["kelowna-british-columbia", "spokane-washington"]) if (has(s)) ok(!/[Tt]hin air|nine thousand/.test(day(s, JUL)), `${s}: thin air at a valley town`);
  if (has("laramie-wyoming")) ok(/thin air/.test(day("laramie-wyoming", JUL)), "Laramie: the thin-air line is missing");
  for (const s of ["kelowna-british-columbia", "spokane-washington", "bozeman-montana", "laramie-wyoming"]) {
    if (!has(s)) continue;
    ok(!/thunderstorms fire|so firmly backwards|half again/.test(day(s, JUL) + day(s, NOV)), `${s}: a deleted Western Mountains line`);
    ok(/about ten per cent for every thousand metres/.test(day(s, NOV)), `${s}: the WHO UV line is missing`);
    ok(/six wildfires in ten/.test(day(s, JUL)) === (s === "kelowna-british-columbia") && !/six wildfires/.test(day(s, NOV)), `${s}: BC's lightning share printed outside BC or out of summer`);
  }
  say("audit 14 Nov: 6 land lines, the Boreal North, Pacific Maritime, Western Mountains and Great Lakes day stories pinned; sunrise geometry recomputed");
}

// ---- loading screens name the town from src/data/place-names.json (scripts/build-place-names.mjs) ----
{
  const names = PLACE_NAMES as Record<string, string>;
  // The names file holds the served towns only (scripts/build-place-names.mjs), as NORMALS does here.
  const towns = (NORMALS as { place: { slug: string; label: string } }[]).map((n) => n.place);
  for (const t of towns) ok(names[t.slug] === t.label, `place-names.json: ${t.slug} should be "${t.label}", is ${JSON.stringify(names[t.slug])}; run node scripts/build-place-names.mjs`);
  ok(Object.keys(names).length === towns.length, `place-names.json has ${Object.keys(names).length} towns, place-normals.json ${towns.length}`);
  say(`loading screens: ${towns.length} town names match place-normals.json`);
}

// ---- every town has its own stored weekly guide (src/lib/guide-id.ts): no two towns share a key ----
{
  const towns = (NORMALS as { place: { slug: string; lat: number; lon: number } }[]).map((n) => n.place);
  const byKey = new Map<string, string[]>();
  for (const t of towns) byKey.set(guideId(t), [...(byKey.get(guideId(t)) ?? []), t.slug]);
  for (const [key, slugs] of byKey) ok(slugs.length === 1, `guide key ${key} is shared by ${slugs.join(" and ")}: add them to GUIDE_KEY_BY_SLUG`);
  say(`weekly guides: ${towns.length} towns, ${byKey.size} distinct keys`);
}

if (fails.length) {
  console.error(`\n${fails.filter(Boolean).length} VIOLATIONS of ${checks} checks`);
  fails.filter(Boolean).slice(0, 60).forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
say(`\nall ${checks} checks passed`);
