/**
 * Checks the conservation library (src/data/conservation/*) and prints how
 * well it covers the pre-built towns.
 *
 * 1. Every record against the schema and the house rules: unique slug and
 *    slug format, topics from TOPICS, area kinds with real codes (ISO
 *    countries, CA/US admin1, the 34 ecoregion slugs, sane radius and box),
 *    https URLs that parse, `verified` a real date, `sources` non-empty,
 *    `asks` at most three, a blurb of at most two sentences, species and
 *    place slugs the site knows. Errors fail the run (exit 1); warnings are
 *    printed and do not. A site's own ask (`localAsks`) is copied from
 *    `asks` and tied to a province, ecoregion, circle or box; a `places`
 *    town sits inside the body's box or within 75 km of its circle's centre;
 *    the place table names every town without a legal form ("City of …"),
 *    and src/data/place-names.json carries the same labels. An ecoregion
 *    corridor is a line of real points and a band of at most 100 km.
 *    Source notes (src/lib/conservation/sources.ts), for every record: a
 *    `waters` entry prints only when the record's name or blurb names it or
 *    `waterSources` gives the page (unsourced ones are listed, and fail a
 *    record checked on or after SOURCE_NOTES_FROM); a `places` town prints
 *    "Works in" only with a `placeSources` page, reads "Works around" where
 *    its own circle or box reaches it (listed), and fails the run anywhere
 *    else. An ask naming a place or site sits in `localAsks` (or in
 *    ASK_NOT_A_SITE with the reason), unless the body's every area is a home
 *    patch.
 *    Then the pins of the 5, 10, 11 and 13 November 2026 audits: matches,
 *    lines and asks the audits found wrong, which may not come back; no match
 *    anywhere saying "Nearby"; and across the 264 towns no "Works in" line
 *    without its page and no "Covers" or "Works on" line for an unsourced water.
 * 2. Coverage: for each of the 264 pre-built towns and the six main topics,
 *    the best tier the matcher reaches for a topical organisation (3 named
 *    water or home radius, 2 province/state or ecoregion, 1 national,
 *    0 international, - nothing), then a per-topic summary and the gaps.
 * 3. Counts by country and topic.
 * Food (round three): a record with the `food` topic needs at least one
 *    `foodRoles` entry and every role needs the topic; every record in
 *    food-na.ts / food-ea.ts is a food record; the tags (slug → roles) name
 *    real records with real roles; food invitations carry the `food` topic;
 *    the food-ways and seafood-guide tables name real records; and
 *    src/data/place-gardens.json has the shape the food bands read. The
 *    coverage adds, per town, the best tier for each food role, and a summary.
 * 4. With --links, GETs every URL (links, registry, sources) through the
 *    proxy with curl, one request per host at a time, and lists anything
 *    that is not 2xx/3xx: failures (404, 5xx, no answer) fail the run;
 *    refusals (401/403/429, usually bot protection) are listed apart.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-conservation.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/check-conservation.mjs --log-level=warning \
 *     && node /tmp/check-conservation.mjs [flags]
 *
 * Flags:
 *   --file=global|north-america|europe|africa   validate (and link-check) one data file only
 *   --country=GB[,IE]   coverage rows for those countries only
 *   --summary           coverage summary and gaps without the per-town table
 *   --no-coverage       skip coverage and counts (validation only)
 *   --links             also GET every URL; --links-only skips coverage
 *   --sources           with --links, include `sources` URLs (off by default: registers rate-limit)
 */
import { execFile } from "node:child_process";
import { AFRICA_ORGS } from "../src/data/conservation/africa";
import { EUROPE_ORGS } from "../src/data/conservation/europe";
import { GLOBAL_ORGS } from "../src/data/conservation/global";
import { NORTH_AMERICA_ORGS } from "../src/data/conservation/north-america";
import { TOPICS, type Organisation, type ServiceArea, type Topic } from "../src/data/conservation/types";
import { EXTRA_IV_ORGS } from "../src/data/conservation/extra-iv";
import { EXTRA_ST_ORGS } from "../src/data/conservation/extra-st";
import { FOOD_NA_ORGS, FOOD_NA_TAGS } from "../src/data/conservation/food-na";
import { FOOD_EA_ORGS, FOOD_EA_TAGS } from "../src/data/conservation/food-ea";
import { INVITATIONS_FOOD } from "../src/data/conservation/invitations-food";
import { FOOD_ROLES, type FoodRole } from "../src/data/conservation/types";
import GARDENS from "../src/data/place-gardens.json";
import { FOOD_WAYS } from "../src/lib/conservation/food-ways";
import { SEAFOOD_GUIDES } from "../src/lib/conservation/seafood";
import CREATURES from "../src/data/creatures.json";
import SPECIES from "../src/data/species.json";
import { ECOREGIONS } from "../src/lib/ecoregions";
import { countryServed } from "../src/lib/scope";
import KNOWN from "../src/lib/known-places.json";
import PLACE_NAMES from "../src/data/place-names.json";
import type { Place } from "../src/lib/types";
import { countryWords } from "../src/lib/conservation/geo-words";
import { waterSourced } from "../src/lib/conservation/sources";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const value = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

const FILES: Record<string, Organisation[]> = {
  global: GLOBAL_ORGS,
  "north-america": NORTH_AMERICA_ORGS,
  europe: EUROPE_ORGS,
  africa: AFRICA_ORGS,
  "extra-iv": EXTRA_IV_ORGS,
  "extra-st": EXTRA_ST_ORGS,
  "food-na": FOOD_NA_ORGS,
  "food-ea": FOOD_EA_ORGS,
};
const onlyFile = value("file");
if (onlyFile && !FILES[onlyFile]) {
  console.error(`--file must be one of ${Object.keys(FILES).join(", ")}`);
  process.exit(2);
}

// ---- reference sets -----------------------------------------------------------

/** ISO 3166-1 alpha-2, plus XK (Kosovo, user-assigned but universal). */
const ISO = new Set(
  (
    "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ " +
    "DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT " +
    "JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG " +
    "NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH " +
    "TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW XK"
  ).split(" "),
);
const ADMIN1: Record<string, Set<string>> = {
  CA: new Set("AB BC MB NB NL NS NT NU ON PE QC SK YT".split(" ")),
  US: new Set(
    "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(" "),
  ),
};
type Eco = { slug: string; name: string; continent?: string };
const ECO = new Set((ECOREGIONS as Eco[]).map((e) => e.slug));
const PLACES = KNOWN as Place[];
const PLACE_SLUGS = new Set(PLACES.map((p) => p.slug));
type Slugged = { slug: string };
const SPECIES_SLUGS = new Set<string>([
  ...(SPECIES as unknown as { species: Slugged[] }).species.map((s) => s.slug),
  ...(CREATURES as unknown as { fish: Slugged[]; garden: Slugged[] }).fish.map((s) => s.slug),
  ...(CREATURES as unknown as { fish: Slugged[]; garden: Slugged[] }).garden.map((s) => s.slug),
]);
const SCOPES = new Set(["local", "regional", "national", "international"]);
const CONTINENTS = new Set(["north-america", "europe", "africa"]);
const KINDS = new Set(["charity", "agency", "network", "programme"]);
const LINK_KEYS = new Set(["home", "volunteer", "events", "join", "donate", "shop", "feed", "youth"]);
const MARKETING = ["amazing", "passionate", "dedicated", "incredible", "world-class", "world class", "leading", "premier", "best-in-class", "unique", "vibrant", "award-winning"];
const TODAY = new Date().toISOString().slice(0, 10);
/** How far a `places` town may sit from the centre of the body's own circle (see validate). */
const PLACE_HOME_KM = 75;
/** Great-circle distance in km. */
function km(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * r) / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

// ---- sentence counting ----------------------------------------------------------

/** Full stops that do not end a sentence: "St. Lawrence", "U.S.", "e.g.", "No. 4", initials. */
const ABBREV = /\b(?:St|Ste|Mt|Ft|Dr|Mr|Mrs|Ms|Prof|No|Nos|Inc|Ltd|Co|Corp|Jr|Sr|vs|etc|approx|ca|cf|e\.g|i\.e|U\.S|U\.K|D\.C|N\.Y|[A-Z])\.$/;
function sentences(text: string): string[] {
  const out: string[] = [];
  let cur = "";
  const parts = text.trim().split(/(?<=[.!?])\s+(?=["“‘(]?[A-Z0-9À-Ý])/);
  for (const p of parts) {
    cur = cur ? `${cur} ${p}` : p;
    if (!ABBREV.test(cur)) {
      out.push(cur);
      cur = "";
    }
  }
  if (cur) out.push(cur);
  return out;
}

// ---- validation -----------------------------------------------------------------

type Issue = { slug: string; file: string; level: "error" | "warn"; msg: string };
const issues: Issue[] = [];

/** Sites checked on 22 October 2026 to serve no https at all (the http pages answer 200). */
const HTTP_ONLY_HOSTS = new Set(["www.nessandbeauly.org.uk", "www.federation-peche-paris.fr"]);

function httpsUrl(u: unknown): string | null {
  if (typeof u !== "string" || !u) return "missing";
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && HTTP_ONLY_HOSTS.has(parsed.hostname))) return `not https: ${u}`;
    if (!parsed.hostname.includes(".")) return `no host: ${u}`;
    return null;
  } catch {
    return `does not parse: ${u}`;
  }
}

function validDate(s: unknown): boolean {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

// ---- source notes ------------------------------------------------------------------

/**
 * A `waters` entry prints "Covers <water>" and a `places` town prints "Works in <town>", so each must come from the body's
 * own site. The audit of 11 November 2026 found Wolf River Conservancy "Covers the Mississippi River" at Memphis, Friends
 * of the Lower Olentangy Watershed listing the Scioto River and Alum Creek, Audubon Delta "Works in New Orleans" and Texas
 * Stream Team "Works in Brownsville": none named on their sites. The 11 Nov fix made the rule hard only for records
 * checked from 12 November, so the audit of 13 November 2026 still found Native Seeds/SEARCH "Works in Phoenix" and
 * "Works in Albuquerque", Audubon Florida "Works in Fort Myers" and CDFW "Works in San Jose" (all last checked in
 * October), and a circle or box counted as the source: St. Johns Riverkeeper "Works in Orlando" and Save The Bay "Works in
 * San Jose" from shapes whose sites never name the towns. The rule is now one rule for every record, whatever its checked
 * date, and src/lib/conservation/sources.ts applies it where the lines are printed:
 *  - a water prints only when the record's name or blurb names it, or `waterSources` gives the page that does (gaps are
 *    listed; they print nothing, and fail the run for a record checked since SOURCE_NOTES_FROM);
 *  - a town prints "Works in" only with a `placeSources` page. A town without one reads "Works around <town>" where the
 *    body's own box, or a circle within PLACE_HOME_KM of its centre, reaches it (listed); anywhere else it would print
 *    nothing true, and fails the run.
 */
const SOURCE_NOTES_FROM = "2026-11-12";
const waterGaps: { slug: string; file: string; items: string[] }[] = [];
const aroundTowns: { slug: string; file: string; items: string[] }[] = [];
const deadTowns: { slug: string; file: string; items: string[] }[] = [];

/** Whether the body's own circle or box reaches a town, as the matcher reads it (in its own country unless it says otherwise). */
function ownShapeReaches(o: Organisation, geo: ServiceArea[], p: Place): boolean {
  const atHome = !o.countryCode || !p.countryCode || o.countryCode === p.countryCode || o.scope === "international" || !!o.acrossBorders;
  return (
    atHome &&
    geo.some((a) =>
      a.kind === "box" ? p.lat >= a.latMin && p.lat <= a.latMax && p.lon >= a.lonMin && p.lon <= a.lonMax : a.kind === "radius" && km(a.lat, a.lon, p.lat, p.lon) <= Math.min(a.km, PLACE_HOME_KM),
    )
  );
}

function sourceGaps(o: Organisation, file: string, geo: ServiceArea[]) {
  const waters = (o.waters ?? []).filter((w) => !waterSourced(o, w));
  const around: string[] = [];
  const dead: string[] = [];
  for (const s of o.places ?? []) {
    if (o.placeSources?.[s]) continue;
    const p = PLACES.find((x) => x.slug === s);
    if (p) (ownShapeReaches(o, geo, p) ? around : dead).push(s);
  }
  const checkedSince = typeof o.verified === "string" && o.verified >= SOURCE_NOTES_FROM;
  if (waters.length) {
    waterGaps.push({ slug: o.slug, file, items: waters });
    if (checkedSince) issues.push({ slug: o.slug, file, level: "error", msg: `checked ${o.verified}, but waters ${waters.map((w) => `"${w}"`).join(", ")} have no source: name each in the blurb or give the page in waterSources` });
  }
  if (around.length) aroundTowns.push({ slug: o.slug, file, items: around });
  if (dead.length) {
    deadTowns.push({ slug: o.slug, file, items: dead });
    issues.push({
      slug: o.slug,
      file,
      level: "error",
      msg: `places ${dead.join(", ")}: no placeSources page on its own site, and its own circle (within ${PLACE_HOME_KM} km of the centre) or box does not reach ${dead.length > 1 ? "them" : "it"}; give the page that names its centre, office or programme there, or take the town off`,
    });
  }
}

// ---- asks that name a place or site ---------------------------------------------------------

/**
 * An ask that names a place or a site ("Volunteer with the seed bank in Tucson", "Visit the Rio Salado Audubon Center",
 * "Join the monthly McCoys Creek cleanup") happens there, so it sits in `localAsks` with the area where it happens and a
 * town page shows it only there (match.ts asksAt). The audit of 13 November 2026 found such asks hundreds of kilometres
 * from the site: Life Lab's Santa Cruz Garden Classroom at Los Angeles and San Diego, Native Seeds/SEARCH's Tucson seed bank
 * at Albuquerque, Audubon Southwest's Phoenix centre at Tucson, Audubon California's Debs Park and Richardson Bay at
 * Sacramento, St. Johns Riverkeeper's Jacksonville creek cleanup at Orlando. A body whose every area is a home patch (a
 * circle of at most PLACE_HOME_KM, or a box at most twice that on its longer side) is let off: its asks already show only
 * near home. The detector reads the ask after its first word (the verb): a town of the place table, a capitalised name
 * ending in a site word ("Corkscrew Swamp", "Kathryn Albertson Park", "Center for Birds of Prey"), or "in/at/near" a
 * capitalised name that is not a month, a weekday, the body's own country or a programme. ASK_NOT_A_SITE lists the asks it
 * flags that name no place, each with the reason.
 */
const SITE_NOUN = "Park|Parks|Center|Centre|Sanctuary|Farm|Ranch|Creek|River|Lake|Preserve|Garden|Gardens|Island|Bay|Beach|Marsh|Reserve|Swamp|Canyon|Wetland|Wetlands|Refuge|Forest|Arboretum|Hatchery|Woods|Valley|Shoreline|Observatory|Nursery|Estuary|Heide|Niederung";
const CAP = String.raw`[A-ZÀ-Þ][\p{L}'’.&-]*`;
const SITE_PHRASE = new RegExp(String.raw`\b(${CAP}(?:\s+(?:(?:of|de|del|du|la|le|the|and|on)\s+)?${CAP})*\s+(?:${SITE_NOUN})|(?:Center|Centre) (?:for|of) ${CAP}(?:\s+(?:of\s+)?${CAP})*)\b`, "u");
const AT_NAME = new RegExp(String.raw`\b(?:in|at|near)\s+(?:the\s+)?(${CAP}(?:\s+(?:(?:of|de|del|du|la|le|and)\s+)?${CAP})*)`, "u");
const NOT_A_PLACE = /^(January|February|March|April|May|June|July|August|September|October|November|December|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Your|Its)$/;
const PROGRAMME_WORD = /\b(Count|Census|Watch|Birdwatch|BirdWatch|Survey|Week|Day|Days|Guide|App|app|Atlas|Club|Fund|Challenge|Blitz|Festival|Fair|Conference|Programme|Program|programme|project|Mapper|Exchange|Network|Hub|Competition|Classroom|Database|Hunt|Finder|Clean|Cleanup|Clean-Up|Mania|Share|portal|web|Tuinvogeltelling|dag)\b/;
const TOWN_NAME = new RegExp(String.raw`\b(${[...new Set(PLACES.map((p) => p.name))].map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\b`, "u");

/** Asks the detector flags that name no place or site, each with the reason (a programme, a certificate, the body's own region). */
const ASK_NOT_A_SITE: { org: string; ask: RegExp; reason: string }[] = [
  { org: "birds-georgia", ask: /Wildlife Sanctuary/, reason: "a garden certificate, not a site" },
  { org: "watershed-management-group", ask: /River Run Network/, reason: "its network, which runs across its own area" },
  { org: "saskatchewan-fish-and-wildlife", ask: /Turn in Poachers/, reason: "the province's reporting line" },
  { org: "alaska-department-of-fish-and-game", ask: /Alaska Lake Database/, reason: "an online database" },
  { org: "galveston-bay-foundation", ask: /Marsh Mania/, reason: "its planting event across the bay, not one site" },
  { org: "farm-to-cafeteria-canada", ask: /Farm to School/, reason: "an online resource centre" },
  { org: "nofa-ny", ask: /Farm Share/, reason: "a programme with partner farms across the state" },
  { org: "cen-ile-de-france", ask: /GéoNat/, reason: "an online database" },
  { org: "hellenic-botanical-society", ask: /Flora of Greece/, reason: "an online flora" },
  { org: "lpo", ask: /Refuge LPO/, reason: "a garden label" },
  { org: "society-for-the-conservation-of-nature-of-liberia", ask: /in Liberia/, reason: "its own country" },
  { org: "cheetah-conservation-fund", ask: /in Namibia/, reason: "its own country, where its one centre is" },
  { org: "wetlands-international-sahel", ask: /Niger basin/, reason: "its own region" },
  { org: "save-foundation", ask: /Alps, the Balkans/, reason: "its own regions" },
  { org: "anac-mozambique", ask: /or another conservation area/, reason: "the country's conservation areas, one named as an example" },
  { org: "banques-alimentaires", ask: /Collecte Nationale/, reason: "the national food collection, held in shops across France" },
  { org: "banco-alimentare", ask: /Colletta Alimentare/, reason: "the national food collection, held in shops across Italy" },
  { org: "fesbal", ask: /Gran Recogida/, reason: "the national food collection, held in shops across Spain" },
  { org: "terra-cypria", ask: /Environmental Studies Centre/, reason: "its one centre, for school groups from across Cyprus, an island about 220 km long" },
  { org: "endangered-wildlife-trust", ask: /such as Medike/, reason: "its destinations across South Africa, one named as an example" },
  { org: "nature-uganda", ask: /such as its outing/, reason: "its nature walks in general, one outing named as an example" },
  { org: "jgi-congo-tchimpounga", ask: /Symbolically adopt/, reason: "a symbolic adoption, made from anywhere" },
  { org: "second-harvest-canada", ask: /or remotely/, reason: "it offers remote volunteering" },
  { org: "ecological-farming-association", ask: /EcoFarm Conference/, reason: "the association's statewide conference, which people travel to" },
  { org: "botsoc-algoa", ask: /about 40 km west of the city/, reason: "within its own 80 km circle, and the ask says how far it is" },
];

const askLint: { slug: string; file: string; ask: string; hit: string }[] = [];

function siteIn(ask: string, o: Organisation): string | undefined {
  const rest = ask.replace(/^\S+\s+/, "");
  const country = o.countryCode ? countryWords(o.countryCode).replace(/^the /, "") : "";
  const town = rest.match(TOWN_NAME)?.[1];
  if (town && town !== country) return town;
  for (const m of rest.matchAll(new RegExp(SITE_PHRASE.source, "gu"))) {
    const site = m[1];
    const end = (m.index ?? 0) + m[0].length;
    if (!PROGRAMME_WORD.test(rest.slice(end, end + 12))) return site;
  }
  for (const m of rest.matchAll(new RegExp(AT_NAME.source, "gu"))) {
    const at = m[1];
    if (!NOT_A_PLACE.test(at.split(/\s+/)[0]) && at !== country && !PROGRAMME_WORD.test(rest.slice(m.index ?? 0, (m.index ?? 0) + m[0].length + 12))) return at;
  }
  return undefined;
}

function lintAsks(o: Organisation, file: string) {
  const homePatch = (o.areas ?? []).every(
    (a) => (a.kind === "radius" && a.km <= PLACE_HOME_KM) || (a.kind === "box" && Math.max(km(a.latMin, a.lonMin, a.latMax, a.lonMin), km(a.latMin, a.lonMin, a.latMin, a.lonMax), km(a.latMax, a.lonMin, a.latMax, a.lonMax)) <= 2 * PLACE_HOME_KM),
  );
  if (homePatch) return;
  const local = new Set((o.localAsks ?? []).map((l) => l.ask));
  for (const a of o.asks ?? []) {
    if (local.has(a) || ASK_NOT_A_SITE.some((x) => x.org === o.slug && x.ask.test(a))) continue;
    const hit = siteIn(a, o);
    if (hit) {
      askLint.push({ slug: o.slug, file, ask: a, hit });
      issues.push({ slug: o.slug, file, level: "error", msg: `ask "${a}" names ${hit}: put it in localAsks with the area where it happens, or in ASK_NOT_A_SITE with the reason it names no place` });
    }
  }
}

function validate(o: Organisation, file: string) {
  const err = (msg: string) => issues.push({ slug: o.slug, file, level: "error", msg });
  const warn = (msg: string) => issues.push({ slug: o.slug, file, level: "warn", msg });

  if (typeof o.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(o.slug)) err(`slug format: "${o.slug}"`);
  if (!o.name?.trim()) err("name missing");
  if (o.shortName !== undefined && !o.shortName.trim()) err("shortName empty");
  if (!SCOPES.has(o.scope)) err(`scope "${o.scope}"`);
  if (!KINDS.has(o.kind)) err(`kind "${o.kind}"`);
  if (o.continent !== undefined && !CONTINENTS.has(o.continent)) err(`continent "${o.continent}"`);
  if (o.countryCode !== undefined && !ISO.has(o.countryCode)) err(`countryCode "${o.countryCode}" is not ISO 3166-1 alpha-2`);
  if (o.scope !== "international" && !o.countryCode) warn(`${o.scope} organisation without countryCode`);

  if (!Array.isArray(o.topics) || !o.topics.length) err("topics empty");
  for (const t of o.topics ?? []) if (!TOPICS.includes(t)) err(`topic "${t}" not in TOPICS`);
  if (new Set(o.topics).size !== o.topics?.length) warn("duplicate topics");

  if (!Array.isArray(o.areas) || !o.areas.length) err("areas empty");
  for (const a of o.areas ?? []) {
    switch (a.kind) {
      case "world":
        break;
      case "continent":
        if (!CONTINENTS.has(a.continent)) err(`continent area "${a.continent}"`);
        break;
      case "country":
        if (!a.countries?.length) err("country area with no countries");
        for (const c of a.countries ?? []) if (!ISO.has(c)) err(`country area code "${c}" is not ISO 3166-1 alpha-2`);
        break;
      case "admin1": {
        const set = ADMIN1[a.countryCode];
        if (!set) err(`admin1 area for "${a.countryCode}" (only CA and US)`);
        if (!a.admin1Codes?.length) err("admin1 area with no codes");
        for (const c of a.admin1Codes ?? []) if (set && !set.has(c)) err(`admin1 code "${c}" not in ${a.countryCode}`);
        break;
      }
      case "ecoregion":
        if (!a.ecoregions?.length) err("ecoregion area with no slugs");
        for (const e of a.ecoregions ?? []) if (!ECO.has(e)) err(`ecoregion "${e}" is not one of the 34`);
        if (a.corridor) {
          const { km: w, line } = a.corridor;
          if (!(w > 0 && w <= 100)) err(`ecoregion corridor ${w} km (a corridor is a band along a trail or river, at most 100 km either side)`);
          if (!(line?.length >= 2)) err("ecoregion corridor needs a line of at least two points");
          for (const [la, lo] of line ?? []) if (!(Math.abs(la) <= 90 && Math.abs(lo) <= 180)) err(`ecoregion corridor point out of range (${la}, ${lo})`);
          for (let i = 1; i < (line?.length ?? 0); i++) if (km(line[i - 1][0], line[i - 1][1], line[i][0], line[i][1]) > 150) warn(`ecoregion corridor points ${i - 1} and ${i} are more than 150 km apart; the band follows the straight line between them`);
        }
        break;
      case "radius":
        if (!(Math.abs(a.lat) <= 90 && Math.abs(a.lon) <= 180)) err(`radius centre out of range (${a.lat}, ${a.lon})`);
        if (!(a.km > 0)) err(`radius km ${a.km}`);
        else if (a.km > 1500) warn(`radius ${a.km} km is wider than most countries; a country or ecoregion area may say it better`);
        break;
      case "box":
        if (!(a.latMin < a.latMax && a.lonMin < a.lonMax)) err("box inverted (min ≥ max)");
        if (!(Math.abs(a.latMin) <= 90 && Math.abs(a.latMax) <= 90 && Math.abs(a.lonMin) <= 180 && Math.abs(a.lonMax) <= 180)) err("box out of range");
        break;
      default:
        err(`area kind "${(a as { kind: string }).kind}"`);
    }
  }

  for (const w of o.waters ?? []) if (typeof w !== "string" || !w.trim()) err("empty entry in waters");

  if (typeof o.blurb !== "string" || !o.blurb.trim()) err("blurb missing");
  else {
    const n = sentences(o.blurb).length;
    if (n > 2) err(`blurb has ${n} sentences (at most 2)`);
    const lower = o.blurb.toLowerCase();
    for (const w of MARKETING) if (new RegExp(`\\b${w}\\b`).test(lower)) warn(`blurb uses "${w}"`);
    if (/[!]/.test(o.blurb)) warn("blurb has an exclamation mark");
  }
  if (!Array.isArray(o.asks)) err("asks missing");
  else {
    if (o.asks.length > 3) err(`asks has ${o.asks.length} entries (at most 3)`);
    for (const a of o.asks) if (typeof a !== "string" || !a.trim()) err("empty ask");
  }
  // A site's own ask names where it happens and is shown only where its areas reach (src/lib/conservation/match.ts asksAt).
  for (const l of o.localAsks ?? []) {
    if (!o.asks?.includes(l.ask)) err(`localAsks "${l.ask}" is not copied exactly from asks`);
    if (!l.areas?.length) err(`localAsks "${l.ask}" has no areas`);
    for (const a of l.areas ?? []) {
      if (a.kind === "admin1") {
        for (const c of a.admin1Codes ?? []) if (!ADMIN1[a.countryCode]?.has(c)) err(`localAsks admin1 code "${a.countryCode}-${c}"`);
      } else if (a.kind === "radius") {
        if (!(a.km > 0 && a.km <= 300 && Math.abs(a.lat) <= 90 && Math.abs(a.lon) <= 180)) err(`localAsks circle (${a.lat}, ${a.lon}, ${a.km} km)`);
      } else if (a.kind === "box") {
        if (!(a.latMin < a.latMax && a.lonMin < a.lonMax)) err("localAsks box inverted");
      } else if (a.kind === "ecoregion") {
        for (const e of a.ecoregions ?? []) if (!ECO.has(e)) err(`localAsks ecoregion "${e}"`);
      } else err(`localAsks area kind "${a.kind}": a site's ask belongs to a province, ecoregion, circle or box, not a country or the world`);
    }
  }
  // A town in `places` prints "Works in <town>" only with a page on its own site (sourceGaps): the 10 Nov 2026 audit found
  // Hawk Mountain, at Kempton, listed for Philadelphia 104 km away inside a 110 km circle drawn to reach it (and River
  // Keepers of Fargo for Grand Forks, 118 km); without a page, the town must sit in its own box or circle, near its centre.
  const geo = (o.areas ?? []).filter((a) => a.kind === "radius" || a.kind === "box");
  // Source notes (src/data/conservation/types.ts `waterSources`, `placeSources`): each keyed by an entry the record carries,
  // each a page on the organisation's own site.
  const own = (u: string) => {
    const host = (x: string) => {
      try {
        return new URL(x).hostname.replace(/^www\./, "");
      } catch {
        return "";
      }
    };
    const h = host(u);
    const home = o.links?.home ? host(o.links.home) : "";
    return !!h && !!home && (h === home || h.endsWith(`.${home}`) || home.endsWith(`.${h}`));
  };
  for (const [w, u] of Object.entries(o.waterSources ?? {})) {
    if (!o.waters?.includes(w)) err(`waterSources "${w}" is not in waters`);
    const bad = httpsUrl(u);
    if (bad) err(`waterSources "${w}" ${bad}`);
    else if (!own(u)) err(`waterSources "${w}" is ${u}, not a page on the organisation's own site`);
  }
  for (const [t, u] of Object.entries(o.placeSources ?? {})) {
    if (!o.places?.includes(t)) err(`placeSources "${t}" is not in places`);
    const bad = httpsUrl(u);
    if (bad) err(`placeSources "${t}" ${bad}`);
    else if (!own(u)) err(`placeSources "${t}" is ${u}, not a page on the organisation's own site`);
  }
  sourceGaps(o, file, geo);
  lintAsks(o, file);

  if (!o.links || typeof o.links !== "object") err("links missing");
  else {
    for (const [k, u] of Object.entries(o.links)) {
      if (!LINK_KEYS.has(k)) err(`links.${k} is not a known way in`);
      if (u === undefined && k !== "home") continue;
      const bad = httpsUrl(u);
      if (bad) err(`links.${k} ${bad}`);
    }
    if (!o.links.home) err("links.home missing");
  }

  if (o.registry) {
    if (!o.registry.body?.trim() || !o.registry.id?.trim()) err("registry needs body and id");
    if (o.registry.url !== undefined) {
      const bad = httpsUrl(o.registry.url);
      if (bad) err(`registry.url ${bad}`);
    }
  } else if (o.kind === "charity") warn("charity without registry (needs a // comment and a second source)");

  // Food: the topic and the roles go together.
  const roles = o.foodRoles ?? [];
  for (const r of roles) if (!FOOD_ROLES.includes(r)) err(`food role "${r}" not in FOOD_ROLES`);
  if (roles.length && !o.topics?.includes("food")) err('food roles without the "food" topic');
  if (o.topics?.includes("food") && !roles.length) err('"food" topic without a food role');
  if (new Set(roles).size !== roles.length) warn("duplicate food roles");
  if ((file === "food-na" || file === "food-ea") && !o.topics?.includes("food")) err(`a ${file}.ts record without the "food" topic`);

  for (const s of o.species ?? []) if (!SPECIES_SLUGS.has(s)) err(`species "${s}" is not a slug in species.json or creatures.json`);
  for (const p of o.places ?? []) if (!PLACE_SLUGS.has(p)) err(`place "${p}" is not a pre-built town`);

  if (o.founded !== undefined && !(Number.isInteger(o.founded) && o.founded >= 1600 && o.founded <= Number(TODAY.slice(0, 4)))) err(`founded ${o.founded}`);
  if (!validDate(o.verified)) err(`verified "${o.verified}" is not a YYYY-MM-DD date`);
  else if (o.verified > TODAY) err(`verified ${o.verified} is in the future`);
  if (!Array.isArray(o.sources) || !o.sources.length) err("sources empty");
  for (const s of o.sources ?? []) {
    const bad = httpsUrl(s);
    if (bad) err(`source ${bad}`);
  }
  if (o.sources?.length === 1 && o.kind !== "agency") warn("one source only (a second source — register or network list — is required)");
}

const seen = new Map<string, string>();
let checked = 0;
for (const [file, orgs] of Object.entries(FILES)) {
  for (const o of orgs) {
    const prev = seen.get(o.slug);
    if (prev) issues.push({ slug: o.slug, file, level: "error", msg: `duplicate slug (also in ${prev})` });
    seen.set(o.slug, file);
    if (onlyFile && file !== onlyFile) continue;
    validate(o, file);
    checked++;
  }
}
// Same name twice is almost always the same body entered by two agents.
const byName = new Map<string, string>();
for (const [file, orgs] of Object.entries(FILES))
  for (const o of orgs) {
    const k = o.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const prev = byName.get(k);
    if (prev && (!onlyFile || file === onlyFile)) issues.push({ slug: o.slug, file, level: "warn", msg: `same name as ${prev}` });
    byName.set(k, `${o.slug} (${file})`);
  }

// ---- food: tags, invitations, the tables the bands read, the gardens file -------------

const ALL_SLUGS = new Set(Object.values(FILES).flatMap((l) => l.map((o) => o.slug)));
const FOOD_RECORDS = new Set([...FOOD_NA_ORGS, ...FOOD_EA_ORGS].map((o) => o.slug));
for (const [file, tags] of [["food-na", FOOD_NA_TAGS], ["food-ea", FOOD_EA_TAGS]] as const) {
  if (onlyFile && file !== onlyFile) continue;
  for (const [slug, roles] of Object.entries(tags)) {
    const err = (msg: string) => issues.push({ slug, file: `${file} tags`, level: "error", msg });
    if (!ALL_SLUGS.has(slug)) err("tags a slug that is not in the library");
    if (FOOD_RECORDS.has(slug)) issues.push({ slug, file: `${file} tags`, level: "warn", msg: "tags a round-three food record (give it its roles on the record instead)" });
    if (!roles.length) err("no roles");
    for (const r of roles) if (!FOOD_ROLES.includes(r)) err(`food role "${r}" not in FOOD_ROLES`);
  }
}
for (const inv of INVITATIONS_FOOD) if (!inv.topics.includes("food")) issues.push({ slug: inv.slug, file: "invitations-food", level: "error", msg: 'a food invitation without the "food" topic' });
const TAGGED = new Set([...Object.keys(FOOD_NA_TAGS), ...Object.keys(FOOD_EA_TAGS)]);
const rolesOf = (slug: string): FoodRole[] => [...(Object.values(FILES).flat().find((o) => o.slug === slug)?.foodRoles ?? []), ...(FOOD_NA_TAGS[slug] ?? []), ...(FOOD_EA_TAGS[slug] ?? [])];
for (const [slug, ways] of Object.entries(FOOD_WAYS)) {
  const err = (msg: string) => issues.push({ slug, file: "lib food-ways", level: "error", msg });
  if (!ALL_SLUGS.has(slug)) err("names a slug that is not in the library");
  else if (!TAGGED.has(slug) && !FOOD_RECORDS.has(slug)) issues.push({ slug, file: "lib food-ways", level: "warn", msg: "not a food body (no tag, no food record): its way is never shown" });
  for (const [role, w] of Object.entries(ways ?? {})) {
    if (!rolesOf(slug).includes(role as FoodRole)) issues.push({ slug, file: "lib food-ways", level: "warn", msg: `has a way for "${role}", a role it does not carry` });
    const bad = httpsUrl(w?.href);
    if (bad) err(`way ${role} ${bad}`);
    if (!validDate(w?.checked)) err(`way ${role} checked "${w?.checked}"`);
  }
}
for (const [slug, g] of Object.entries(SEAFOOD_GUIDES)) {
  const err = (msg: string) => issues.push({ slug, file: "lib seafood", level: "error", msg });
  if (!ALL_SLUGS.has(slug)) err("names a slug that is not in the library");
  else if (!rolesOf(slug).includes("sustainable-seafood")) err('a seafood guide without the "sustainable-seafood" role');
  for (const [fish, url] of Object.entries(g.pages)) {
    if (!SPECIES_SLUGS.has(fish)) err(`page for "${fish}", not a fish slug`);
    const bad = httpsUrl(url);
    if (bad) err(`page for ${fish} ${bad}`);
  }
}

type GardenRow = { name?: unknown; kind?: unknown; lat?: unknown; lon?: unknown; km?: unknown; website?: unknown; operator?: unknown; osm?: unknown };
const G = GARDENS as unknown as { fetched?: unknown; sitesChecked?: unknown; source?: unknown; radiusKm?: unknown; towns?: Record<string, GardenRow[]>; failed?: unknown };
const gErr = (slug: string, msg: string) => issues.push({ slug, file: "place-gardens.json", level: "error", msg });
if (G.fetched !== null && !validDate(G.fetched)) gErr("-", `fetched "${String(G.fetched)}" is not a date or null`);
if (G.sitesChecked != null && !validDate(G.sitesChecked)) gErr("-", `sitesChecked "${String(G.sitesChecked)}" is not a date or null`);
if (typeof G.radiusKm !== "number" || G.radiusKm <= 0) gErr("-", "radiusKm missing");
if (typeof G.source !== "string" || !/openstreetmap/i.test(G.source)) gErr("-", "source must name OpenStreetMap");
if (!G.towns || typeof G.towns !== "object") gErr("-", "towns missing");
if (!Array.isArray(G.failed)) gErr("-", "failed must be a list");
else for (const s of G.failed as unknown[]) if (typeof s !== "string" || !PLACE_SLUGS.has(s)) gErr(String(s), "failed: not a pre-built town");
let gardenRows = 0;
for (const [slug, list] of Object.entries(G.towns ?? {})) {
  if (!PLACE_SLUGS.has(slug)) gErr(slug, "not a pre-built town");
  if (!Array.isArray(list)) {
    gErr(slug, "not a list");
    continue;
  }
  if (list.length > 10) gErr(slug, `${list.length} gardens (at most 10)`);
  const osm = new Set<string>();
  let lastKm = -1;
  for (const g of list) {
    gardenRows++;
    const where = `${slug} "${String(g.name)}"`;
    if (typeof g.name !== "string" || !g.name.trim()) gErr(slug, "garden without a name");
    if (g.kind !== "community" && g.kind !== "allotment") gErr(where, `kind "${String(g.kind)}"`);
    if (typeof g.lat !== "number" || typeof g.lon !== "number" || Math.abs(g.lat) > 90 || Math.abs(g.lon) > 180) gErr(where, "lat/lon");
    if (typeof g.km !== "number" || g.km < 0 || g.km > (typeof G.radiusKm === "number" ? G.radiusKm : 15) + 0.1) gErr(where, `km ${String(g.km)}`);
    else {
      if (g.km < lastKm) gErr(where, "not sorted nearest first");
      lastKm = g.km;
    }
    if (typeof g.osm !== "string" || !/^(node|way|relation)\/\d+$/.test(g.osm)) gErr(where, `osm "${String(g.osm)}"`);
    else if (osm.has(g.osm)) gErr(where, `${g.osm} twice`);
    else osm.add(g.osm);
    if (g.website !== undefined) {
      try {
        const u = new URL(String(g.website));
        if (u.protocol !== "https:" && u.protocol !== "http:") gErr(where, `website "${String(g.website)}"`);
      } catch {
        gErr(where, `website "${String(g.website)}" does not parse`);
      }
    }
    if (g.operator !== undefined && (typeof g.operator !== "string" || !g.operator.trim())) gErr(where, "operator empty");
  }
}

// ---- the town names every page prints ----------------------------------------------------------
/**
 * The place table names a town as people say it, not by its legal form: the 10 Nov 2026 audit found "Works in City of
 * Saint John" and "What kind of place City of Moncton is" because src/lib/known-places.json carried the municipality's
 * legal name. src/data/place-names.json (the loading screens) must carry the same labels.
 */
const LEGAL_FORM = /^(City|Town|Village|Municipality|County|Township|District|Borough|Region|Ville|Municipalité|Cité|Comune|Stadt|Gemeinde) (of|de|du|des|di|der) /i;
const NAMES = PLACE_NAMES as Record<string, string>;
for (const p of PLACES) {
  const err = (msg: string) => issues.push({ slug: p.slug, file: "known-places", level: "error", msg });
  if (LEGAL_FORM.test(p.name)) err(`name "${p.name}" is the legal form; print the town's name`);
  if (LEGAL_FORM.test(p.label)) err(`label "${p.label}" starts with a legal form`);
  if (p.label !== p.name && !p.label.startsWith(`${p.name}, `)) err(`label "${p.label}" does not start with the name "${p.name}"`);
  // The loading-screen names hold the served towns only (scripts/build-place-names.mjs): a parked town has no name there.
  const wanted = countryServed((p as { countryCode?: string }).countryCode) ? p.label : undefined;
  if (NAMES[p.slug] !== wanted) issues.push({ slug: p.slug, file: "place-names.json", level: "error", msg: `label ${JSON.stringify(NAMES[p.slug])}, expected ${JSON.stringify(wanted)} (known-places.json has "${p.label}")` });
}
for (const s of Object.keys(NAMES)) if (!PLACE_SLUGS.has(s)) issues.push({ slug: s, file: "place-names.json", level: "error", msg: "not a pre-built town" });

const errors = issues.filter((i) => i.level === "error");
const warns = issues.filter((i) => i.level === "warn");
console.log(`\n== Validation: ${checked} records${onlyFile ? ` in ${onlyFile}.ts` : ""} · ${errors.length} errors · ${warns.length} warnings`);
for (const i of [...errors, ...warns]) console.log(`  ${i.level === "error" ? "ERROR" : "warn "} ${i.file}/${i.slug}: ${i.msg}`);

// The source notes (see sourceGaps) and the ask lint (lintAsks); their errors are counted above.
const nWater = waterGaps.reduce((n, g) => n + g.items.length, 0);
const nAround = aroundTowns.reduce((n, g) => n + g.items.length, 0);
const nDead = deadTowns.reduce((n, g) => n + g.items.length, 0);
console.log(
  `\n== Source notes: ${nWater} waters in ${waterGaps.length} records with no source on the body's own site (not printed); ${nAround} places towns in ${aroundTowns.length} records with no page, reading "Works around" from the body's own circle or box; ${nDead} places towns that would print nothing true (errors); ${askLint.length} asks naming a place or site outside localAsks (errors)`,
);
if (!flag("summary")) {
  for (const g of deadTowns) console.log(`  places (error) ${g.file}/${g.slug}: ${g.items.join(", ")}`);
  for (const g of waterGaps) console.log(`  waters ${g.file}/${g.slug}: ${g.items.join(", ")}`);
}
const dupSlugs = errors.some((e) => e.msg.startsWith("duplicate slug"));

// ---- the 5 November 2026 audit's pins ---------------------------------------------------------
/**
 * Matches the audit of the Day 1 regions found wrong, each with the reason, kept as errors so the matcher and the
 * data cannot drift back: an organisation named here may not be matched at the town, on any page topic and in the
 * section panels, unless the town is in its own `places` list.
 */
const AUDIT_PINS: { slug: string; org: string; reason: string }[] = [
  { slug: "detroit-michigan", org: "windsor-community-gardens", reason: "a Windsor circle crossing the river; Ontario gardens are not Detroit's" },
  { slug: "detroit-michigan", org: "essex-county-field-naturalists-club", reason: "an Ontario naturalists' circle crossing the river" },
  { slug: "detroit-michigan", org: "pollinator-partnership-canada", reason: "a Canadian body's ecoregion crossing the border" },
  { slug: "buffalo-new-york", org: "pollinator-partnership-canada", reason: "a Canadian body's ecoregion crossing the border" },
  { slug: "regina-saskatchewan", org: "pollinator-partnership", reason: "the US body's ecoregion crossing the border" },
  { slug: "cleveland-ohio", org: "friends-of-the-detroit-river", reason: "\"Covers Lake Erie\" 140 km from its circle" },
  { slug: "minneapolis-minnesota", org: "great-lakes-fishery-commission", reason: "the whole of Minnesota for a Great Lakes body" },
  { slug: "minneapolis-minnesota", org: "alliance-for-the-great-lakes", reason: "the whole of Minnesota for a Great Lakes body" },
  { slug: "buffalo-new-york", org: "appalachian-trail-conservancy", reason: "the whole of New York for the trail" },
  { slug: "montreal-quebec", org: "atlantic-salmon-federation", reason: "the whole of Quebec for the salmon rivers" },
  { slug: "fort-mcmurray-alberta", org: "leftovers-foundation", reason: "the whole of Alberta for Calgary and Edmonton routes" },
  { slug: "duluth-minnesota", org: "minnesota-state-horticultural-society", reason: "the whole of Minnesota for a Twin Cities project" },
  { slug: "des-moines-iowa", org: "missouri-river-relief", reason: "a Missouri River box reaching the Des Moines River" },
];

async function auditPins() {
  const { orgsFor, orgsForSections, SECTION_TOPICS } = await import("../src/lib/conservation/match");
  const { ORGANISATIONS } = await import("../src/data/conservation/index");
  const known = new Set(ORGANISATIONS.map((o) => o.slug));
  let n = 0;
  for (const pin of AUDIT_PINS) {
    const p = PLACES.find((x) => x.slug === pin.slug);
    if (!p) {
      issues.push({ slug: pin.org, file: "audit-pin", level: "error", msg: `town ${pin.slug} is not a known place` });
      continue;
    }
    if (!known.has(pin.org)) {
      issues.push({ slug: pin.org, file: "audit-pin", level: "error", msg: `organisation is not in the library (pinned at ${pin.slug})` });
      continue;
    }
    const topics = [undefined, ...Object.values(SECTION_TOPICS)] as (Topic[] | undefined)[];
    const hits = new Set<string>();
    for (const t of topics) for (const m of orgsFor(p, { topic: t })) if (m.org.slug === pin.org) hits.add(`${t ? t.join("+") : "any"}: ${m.why}`);
    for (const s of orgsForSections(p)) for (const m of s.matches) if (m.org.slug === pin.org) hits.add(`section ${s.section}: ${m.why}`);
    for (const h of hits) issues.push({ slug: pin.org, file: "audit-pin", level: "error", msg: `matched at ${pin.slug} (${h}); the audit found ${pin.reason}` });
    n++;
  }
  console.log(`\n== Audit pins: ${n} town/organisation pairs checked`);
}

// ---- the 10 November 2026 audit's pins (Acadian Forest, Northeast Coast, Southeastern) ----------------------
const ACADIAN_CA = ["charlottetown-prince-edward-island", "fredericton-new-brunswick", "moncton-new-brunswick", "saint-john-new-brunswick", "halifax-nova-scotia"];
const RODALE_TOWNS = ["portland-maine", "boston-massachusetts", "richmond-virginia", "washington-district-of-columbia", "baltimore-maryland", "atlanta-georgia", "charlotte-north-carolina", "raleigh-north-carolina", "jacksonville-florida", "savannah-georgia"];

/**
 * Per town, on every page topic, the section panels and the food bands: `absent` (the body is not matched at all),
 * `notWhy` (it may be matched, but its line must not say this), `mustWhy` (it must be matched, with this line: the fix
 * kept the local body), `notAsk` (none of the asks printed for it there may say this).
 */
type TownPin = { towns: string[]; org: string; reason: string; absent?: true; notWhy?: RegExp; mustWhy?: RegExp; notAsk?: RegExp; waters?: string[] };
const DAY2_PINS: TownPin[] = [
  { towns: ["philadelphia-pennsylvania"], org: "hawk-mountain-sanctuary", absent: true, reason: '"Works in Philadelphia" for a sanctuary at Kempton, 104 km away' },
  { towns: ["grand-forks-north-dakota"], org: "river-keepers", absent: true, reason: '"Works in Grand Forks" for a Fargo-Moorhead group, 118 km away (same shape as Hawk Mountain)' },
  { towns: ["baltimore-maryland"], org: "potomac-riverkeeper-network", absent: true, reason: "a Potomac box reaching the Patapsco" },
  { towns: ["savannah-georgia"], org: "concrete-jungle", absent: true, reason: '"Works across Georgia" and its Atlanta fruit picks for a group that picks in Atlanta and Athens' },
  { towns: ["boston-massachusetts"], org: "society-of-st-andrew", absent: true, reason: '"Across the US" for a gleaning network with no office in Massachusetts' },
  { towns: ["savannah-georgia"], org: "birds-georgia", notWhy: /^Works in/, mustWhy: /^Works across Georgia$/, reason: '"Works in Savannah" for an Atlanta society with no Savannah programme' },
  { towns: ["saint-john-new-brunswick"], org: "hammond-river-angling-association", notWhy: /^Works in|City of/, mustWhy: /^Works around Saint John$/, reason: '"Works in City of Saint John" for a group at Nauwigewauk' },
  { towns: ["washington-district-of-columbia"], org: "audubon-mid-atlantic", notWhy: /^Works in/, notAsk: /tour|habitat/i, reason: '"Works in Washington" above Baltimore and Philadelphia tours' },
  { towns: RODALE_TOWNS, org: "rodale-institute", notAsk: /Kutztown|Spring Organic Market|Composting/i, reason: "Kutztown-only asks under \"Across the US\"" },
  { towns: ACADIAN_CA, org: "canadian-organic-growers", notAsk: /Growing Up Organic/, reason: "an Ontario school programme shown across Canada" },
  { towns: ACADIAN_CA, org: "north-american-native-plant-society", notAsk: /plant sale|staff a table/i, reason: "the Toronto sale and volunteer table under \"Across Canada\"" },
  { towns: ["fredericton-new-brunswick", "moncton-new-brunswick", "saint-john-new-brunswick"], org: "pollinator-partnership-canada", notWhy: /region/, notAsk: /planting guide/i, reason: "an ecoregional guide ask (and \"Covers your region\") in a province with no guide" },
];

/** Asks and blurbs the audit found stale or wrong in the record itself, each with the day the organisation's page said otherwise. */
const DAY2_RECORD_PINS: { org: string; field: "asks" | "blurb"; not: RegExp; reason: string }[] = [
  { org: "farm-to-cafeteria-canada", field: "asks", not: /\bgrants?\b/i, reason: "no grants open on 11 November 2026" },
  { org: "virginia-society-of-ornithology", field: "asks", not: /report .*atlas/i, reason: "atlas fieldwork over; published 31 October 2025" },
  { org: "friends-of-casco-bay", field: "asks", not: /sample water/i, reason: "no volunteer water sampling on its volunteer page, 11 November 2026" },
  { org: "nova-scotia-nature-trust", field: "asks", not: /beach cleanup|trail-building/i, reason: "neither on its volunteer page, 11 November 2026" },
  { org: "charles-river-watershed-association", field: "asks", not: /Meet Your Watershed/i, reason: "not on its volunteer page, 11 November 2026" },
  { org: "pollinator-partnership-canada", field: "blurb", not: /\b28\b/, reason: "its guide page lists 23 Canadian guides" },
];

const pinIssue = (org: string, msg: string) => issues.push({ slug: org, file: "audit-pin", level: "error", msg });

/**
 * Runs town pins: per town, every page topic, the section panels and the food bands, with the pin's `waters` as the page's
 * named waters (a "Covers <water>" line only shows when the page lists the water). Returns the town/organisation pairs checked.
 */
async function runTownPins(pins: TownPin[], day: string): Promise<number> {
  const { orgsFor, orgsForSections, SECTION_TOPICS, SECTION_FOOD } = await import("../src/lib/conservation/match");
  const { ORGANISATIONS } = await import("../src/data/conservation/index");
  const bySlug = new Map(ORGANISATIONS.map((o) => [o.slug, o]));
  let n = 0;
  for (const pin of pins) {
    if (!bySlug.has(pin.org)) {
      pinIssue(pin.org, `organisation is not in the library (${day} pin)`);
      continue;
    }
    for (const slug of pin.towns) {
      const p = PLACES.find((x) => x.slug === slug);
      if (!p) {
        pinIssue(pin.org, `town ${slug} is not a known place`);
        continue;
      }
      const seen: { where: string; why: string; asks: string[] }[] = [];
      const add = (where: string, ms: { org: Organisation; why: string }[]) => {
        for (const m of ms) if (m.org.slug === pin.org) seen.push({ where, why: m.why, asks: m.org.asks });
      };
      const waters = pin.waters;
      for (const t of [undefined, ...Object.values(SECTION_TOPICS)] as (Topic[] | undefined)[]) add(t ? t.join("+") : "any", orgsFor(p, { topic: t, waters }));
      for (const s of orgsForSections(p, { waters })) add(`section ${s.section}`, s.matches);
      for (const [section, roles] of Object.entries(SECTION_FOOD)) add(`food ${section}`, orgsFor(p, { foodRoles: roles }));
      const where = (s: (typeof seen)[number]) => `${s.where}: ${s.why}`;
      if (pin.absent) for (const s of seen) pinIssue(pin.org, `matched at ${slug} (${where(s)}); the audit found ${pin.reason}`);
      if (pin.notWhy) for (const s of seen.filter((x) => pin.notWhy!.test(x.why))) pinIssue(pin.org, `at ${slug} says "${s.why}" (${s.where}); the audit found ${pin.reason}`);
      if (pin.mustWhy && !seen.some((x) => pin.mustWhy!.test(x.why))) pinIssue(pin.org, `not matched at ${slug} with a line like ${pin.mustWhy}; the fix should keep it (${seen.map(where).join("; ") || "no match"})`);
      if (pin.notAsk) for (const s of seen) for (const a of s.asks.filter((x) => pin.notAsk!.test(x))) pinIssue(pin.org, `at ${slug} asks "${a}" (${s.where}); the audit found ${pin.reason}`);
      n++;
    }
  }
  return n;
}

async function day2Pins() {
  const { ORGANISATIONS, INVITATIONS } = await import("../src/data/conservation/index");
  const { invitationsBySlug, windowFor } = await import("../src/lib/conservation/invitations");
  const bySlug = new Map(ORGANISATIONS.map((o) => [o.slug, o]));
  const n = await runTownPins(DAY2_PINS, "10 Nov");
  for (const pin of DAY2_RECORD_PINS) {
    const o = bySlug.get(pin.org);
    if (!o) pinIssue(pin.org, "organisation is not in the library (10 Nov record pin)");
    else for (const text of pin.field === "asks" ? o.asks : [o.blurb]) if (pin.not.test(text)) pinIssue(pin.org, `${pin.field}: "${text}"; ${pin.reason}`);
  }
  // Seedy Saturdays: late-winter events, none listed in New Brunswick or Prince Edward Island for 2026–27.
  const seedy = INVITATIONS.find((i) => i.slug === "seedy-saturdays-canada");
  if (!seedy) pinIssue("seeds-of-diversity", "invitation seedy-saturdays-canada is missing");
  else {
    if (seedy.when.kind === "ongoing" || windowFor(seedy, "2026-11-10").label === "All year") pinIssue("seeds-of-diversity", 'Seedy Saturdays shown "All year"; they are late-winter events');
    for (const slug of ["charlottetown-prince-edward-island", "fredericton-new-brunswick", "moncton-new-brunswick", "saint-john-new-brunswick"]) {
      const p = PLACES.find((x) => x.slug === slug)!;
      if (invitationsBySlug([seedy.slug], p, "2027-02-20").length) pinIssue("seeds-of-diversity", `Seedy Saturdays offered at ${slug}, where the listing had none on 11 November 2026`);
    }
    const halifax = PLACES.find((x) => x.slug === "halifax-nova-scotia")!;
    if (!invitationsBySlug([seedy.slug], halifax, "2027-02-20").length) pinIssue("seeds-of-diversity", "Seedy Saturdays no longer reach Halifax (Nova Scotia had two listed)");
  }
  console.log(`== 10 Nov audit pins: ${n} town/organisation pairs, ${DAY2_RECORD_PINS.length} record pins, the Seedy Saturday window`);
}

// ---- the 11 November 2026 audit's pins (Appalachian Hardwoods and Gulf Coast towns) ----------------------
const GLFC_OHIO_BASIN = ["pittsburgh-pennsylvania", "columbus-ohio", "indianapolis-indiana"];

const DAY3_PINS: TownPin[] = [
  { towns: ["memphis-tennessee"], org: "wolf-river-conservancy", waters: ["Mississippi River", "Wolf River"], notWhy: /Mississippi|Harbor/, mustWhy: /Wolf River|Memphis/, reason: '"Covers the Mississippi River" for a Wolf River group whose site names no Mississippi work' },
  { towns: ["columbus-ohio"], org: "friends-of-the-lower-olentangy-watershed", waters: ["Scioto River", "Alum Creek", "Olentangy River"], notWhy: /Scioto|Alum/, mustWhy: /Olentangy|Columbus/, reason: "the Scioto River and Alum Creek on an Olentangy group's water list, named nowhere on its site" },
  { towns: ["new-orleans-louisiana"], org: "audubon-delta", notWhy: /^Works in/, mustWhy: /^Works across Louisiana$/, notAsk: /Little Rock|volunteer at a cent/i, reason: '"Works in New Orleans" over Little Rock and centre asks; its page names no New Orleans centre or work' },
  { towns: ["little-rock-arkansas"], org: "audubon-delta", mustWhy: /^Works in Little Rock$/, reason: "the Little Rock Audubon Center is on its page (the fix keeps it)" },
  { towns: ["houston-texas"], org: "texas-stream-team", notWhy: /^Nearby/, mustWhy: /^Works across Texas$/, reason: '"Nearby, in Texas" for a statewide programme at San Marcos' },
  { towns: ["brownsville-texas"], org: "texas-stream-team", notWhy: /^Works in/, reason: '"Works in Brownsville" for a programme whose pages name no Brownsville group' },
  { towns: ["pittsburgh-pennsylvania"], org: "appalachian-trail-conservancy", absent: true, reason: "the whole Appalachian ecoregion taking in Pittsburgh, 228 km from the trail" },
  { towns: ["asheville-north-carolina"], org: "appalachian-trail-conservancy", mustWhy: /^Covers your region$/, reason: "Asheville is about 40 km from the trail (the corridor keeps it)" },
  { towns: ["st-louis-missouri"], org: "missouri-river-relief", absent: true, reason: "a box edge at 90.0° W just taking in St. Louis, where its pages name no work" },
  { towns: ["kansas-city-missouri"], org: "missouri-river-relief", mustWhy: /Missouri River|Kansas City/, reason: "its Big Muddy Clean Sweep starts at Kansas City (the fix keeps it)" },
  { towns: ["columbus-ohio", "indianapolis-indiana"], org: "audubon-great-lakes", notAsk: /marsh|shoreline/i, reason: "a marsh or shoreline volunteer ask its page does not list" },
  { towns: ["indianapolis-indiana"], org: "audubon-great-lakes", notAsk: /Grange|Aullwood/, reason: "Ohio centres' visits shown in Indiana" },
  { towns: ["houston-texas", "brownsville-texas"], org: "audubon-texas", notAsk: /workday|Volunteer at the/i, reason: "a habitat-workday ask its pages do not name, and centre volunteering far from the centres" },
  { towns: ["brownsville-texas"], org: "audubon-texas", mustWhy: /^Works in Brownsville$/, reason: "the Sabal Palm Audubon Sanctuary is on its page (the fix keeps it)" },
  ...GLFC_OHIO_BASIN.map((t): TownPin => ({ towns: [t], org: "great-lakes-fishery-commission", absent: true, reason: "a Great Lakes body at an Ohio-basin town" })),
];

/** Asks, blurbs and waters the 11 Nov 2026 audit found unsupported in the record itself, with what the body's page said on 11 November 2026. */
const DAY3_RECORD_PINS: { org: string; field: "asks" | "blurb" | "waters"; not: RegExp; reason: string }[] = [
  { org: "wolf-river-conservancy", field: "waters", not: /Mississippi|Harbor/, reason: "its site names the Wolf River only" },
  { org: "missouri-confluence-waterkeeper", field: "waters", not: /Meramec|des Peres|Coldwater/, reason: 'its site names no river by name ("Covers the Meramec River" at St. Louis, found while fixing the audit)' },
  { org: "friends-of-the-lower-olentangy-watershed", field: "waters", not: /Scioto|Alum|Adena/, reason: "its site names the Olentangy and its tributaries, not these" },
  { org: "audubon-delta", field: "blurb", not: /Pascagoula/, reason: "its page names the Little Rock and Strawberry Plains centres only" },
  { org: "audubon-texas", field: "asks", not: /workday/i, reason: "no habitat workday on its pages" },
  { org: "audubon-texas", field: "blurb", not: /workday/i, reason: "no habitat workday on its pages" },
  { org: "audubon-great-lakes", field: "asks", not: /marsh|shoreline/i, reason: "no volunteer project on its page" },
  { org: "growing-places-indy", field: "asks", not: /farm tour|farm stand|Winter Farmers Market/i, reason: "home page frozen at 'early 2025', no post after October 2024" },
  { org: "growing-to-green", field: "asks", not: /cooking/i, reason: "the cooking classes are the Conservatory's, not Growing to Green's" },
  { org: "grow-pittsburgh", field: "asks", not: /Community Garden Network/, reason: "its volunteer page lists the general and volunteer mailing lists only" },
];

async function day3Pins() {
  const { ORGANISATIONS } = await import("../src/data/conservation/index");
  const { orgsFor, SECTION_TOPICS } = await import("../src/lib/conservation/match");
  const bySlug = new Map(ORGANISATIONS.map((o) => [o.slug, o]));
  const n = await runTownPins(DAY3_PINS, "11 Nov");
  for (const pin of DAY3_RECORD_PINS) {
    const o = bySlug.get(pin.org);
    if (!o) pinIssue(pin.org, "organisation is not in the library (11 Nov record pin)");
    else for (const text of pin.field === "asks" ? o.asks : pin.field === "waters" ? (o.waters ?? []) : [o.blurb]) if (pin.not.test(text)) pinIssue(pin.org, `${pin.field}: "${text}"; ${pin.reason}`);
  }
  // No match anywhere says "Nearby": a province, state or ecoregion is not near (Texas Stream Team at Houston).
  let nearby = 0;
  for (const p of PLACES) {
    for (const t of [undefined, ...Object.values(SECTION_TOPICS)] as (Topic[] | undefined)[]) {
      for (const m of orgsFor(p, { topic: t })) {
        if (/^Nearby\b/.test(m.why)) {
          nearby++;
          if (nearby <= 5) pinIssue(m.org.slug, `"${m.why}" at ${p.slug}; a province, state or ecoregion match says "Works across" or "Covers your region"`);
        }
      }
    }
  }
  console.log(`== 11 Nov audit pins: ${n} town/organisation pairs, ${DAY3_RECORD_PINS.length} record pins, "Nearby" across ${PLACES.length} towns (${nearby} found)`);
}

// ---- the 13 November 2026 audit's pins (Florida Peninsula, Deserts, Mediterranean California) ----------------------
const DAY4_TOWNS = [
  "miami-florida", "fort-lauderdale-florida", "fort-myers-florida", "tampa-florida", "orlando-florida",
  "las-vegas-nevada", "phoenix-arizona", "tucson-arizona", "albuquerque-new-mexico", "boise-idaho",
  "sacramento-california", "san-jose-california", "los-angeles-california", "santa-barbara-california", "san-diego-california",
];
const DAY4_PINS: TownPin[] = [
  { towns: ["phoenix-arizona", "albuquerque-new-mexico"], org: "native-seeds-search", notWhy: /^Works in/, notAsk: /Tucson/, reason: '"Works in Phoenix" and "Works in Albuquerque" with a Tucson seed-bank ask; its pages name only its Tucson farm' },
  { towns: ["tucson-arizona"], org: "native-seeds-search", mustWhy: /^Works in Tucson$/, reason: "its Conservation Center Farm is in Tucson (the fix keeps it)" },
  { towns: ["orlando-florida"], org: "st-johns-riverkeeper", absent: true, reason: '"Works in Orlando" and the Jacksonville McCoys Creek cleanup; its pages name no Orlando work' },
  { towns: ["jacksonville-florida"], org: "st-johns-riverkeeper", mustWhy: /St\. Johns River|McCoys Creek|^Works in Jacksonville$/, reason: "its monthly McCoys Creek cleanup is in Jacksonville (the fix keeps it)" },
  { towns: ["fort-myers-florida"], org: "audubon-florida", notWhy: /^Works in/, mustWhy: /^Works across Florida$/, reason: '"Works in Fort Myers"; its page names Corkscrew Swamp (Naples) and Maitland only' },
  { towns: ["miami-florida", "fort-lauderdale-florida", "tampa-florida"], org: "audubon-florida", notAsk: /Corkscrew|Birds of Prey/, reason: "the Corkscrew and Maitland visits far from both" },
  { towns: ["orlando-florida"], org: "audubon-florida", mustWhy: /^Works in Orlando$/, reason: "the Center for Birds of Prey at Maitland, beside Orlando (the audit found it true)" },
  { towns: ["san-jose-california"], org: "california-department-of-fish-and-wildlife", notWhy: /^Works in/, mustWhy: /^Works across California$/, reason: '"Works in San Jose"; the Bay Delta Region\'s offices are at Fairfield and Stockton' },
  { towns: ["san-jose-california"], org: "save-the-bay", waters: ["Coyote Creek", "Guadalupe River", "Alameda Creek"], notWhy: /^Works in|Coyote|Guadalupe|Alameda/, reason: '"Works in San Jose" and unsourced creeks; its volunteer page names only the Oakland shoreline' },
  { towns: ["sacramento-california", "los-angeles-california", "santa-barbara-california", "san-diego-california", "san-jose-california"], org: "life-lab", notAsk: /Santa Cruz/, reason: "Santa Cruz volunteering and field trips under \"Works across California\"" },
  { towns: ["albuquerque-new-mexico", "tucson-arizona"], org: "audubon-southwest", notAsk: /Rio Salado/, reason: "the Phoenix centre's visit at Albuquerque and Tucson" },
  { towns: ["sacramento-california", "san-jose-california", "santa-barbara-california", "san-diego-california"], org: "audubon-california", notAsk: /Debs Park|Richardson Bay/, reason: "the Los Angeles and Tiburon centres' visits far from both" },
  { towns: DAY4_TOWNS, org: "pollinator-partnership", notWhy: /region/, reason: '"Covers your region" for a national body whose guides are found by ZIP code' },
  { towns: ["fort-lauderdale-florida", "miami-florida"], org: "miami-waterkeeper", waters: ["New River", "Stranahan River"], notWhy: /New River|Stranahan/, reason: "waters no page of the body names" },
  { towns: ["fort-myers-florida"], org: "calusa-waterkeeper", waters: ["Orange River"], notWhy: /Orange/, reason: "a water named only in a 2019 news item" },
  { towns: ["tucson-arizona"], org: "watershed-management-group", waters: ["Sabino Creek"], notWhy: /Sabino/, reason: "a water no page of the body names" },
];

/** Asks the 13 Nov 2026 audit found stale or unconfirmed on the body's own page, with what the page said on 13 November 2026. */
const DAY4_RECORD_PINS: { org: string; field: "asks" | "blurb"; not: RegExp; reason: string }[] = [
  { org: "tampa-bay-waterkeeper", field: "asks", not: /patrol/i, reason: "the patrol programme was still 'expected by March 2022'" },
  { org: "golden-eagle-audubon", field: "asks", not: /restoration day|work day/i, reason: "no work day listed from August to November 2026" },
  { org: "boise-river-enhancement-network", field: "asks", not: /Boise River Night|river cleanup/i, reason: "the night was on 8 October; no cleanup programme described" },
  { org: "boise-river-enhancement-network", field: "blurb", not: /Boise River Night|cleanups/i, reason: "the same" },
  { org: "calusa-waterkeeper", field: "asks", not: /Train as a Ranger/i, reason: "academy enrolment closed for Fall 2026" },
  { org: "fleet-farming", field: "asks", not: /class/i, reason: "its home page describes no classes" },
  { org: "iskashitaa-refugee-network", field: "asks", not: /workshop/i, reason: "no workshop on its harvest page" },
  { org: "st-johns-riverkeeper", field: "blurb", not: /Orlando|Sanford/, reason: "its pages name no Orlando or Sanford work" },
];

// ---- the 14 November 2026 audit's pins (Day 5: the last 25 towns) -----------------------------------------------------
// Each area narrowed to the body's own stated service area (sources in the records' comments).
const DAY5_PINS: TownPin[] = [
  { towns: ["val-d-or-quebec"], org: "ottawa-riverkeeper", absent: true, reason: "Val-d'Or's water is the Harricana's, which runs to James Bay" },
  { towns: ["ottawa-ontario"], org: "ottawa-riverkeeper", mustWhy: /./, reason: "the Ottawa River at Ottawa (the fix keeps it)" },
  { towns: ["thompson-manitoba"], org: "lake-winnipeg-foundation", absent: true, reason: "Thompson's Burntwood River joins the Nelson below Lake Winnipeg" },
  { towns: ["winnipeg-manitoba"], org: "lake-winnipeg-foundation", mustWhy: /./, reason: "Winnipeg is in the lake's watershed (the fix keeps it)" },
  { towns: ["kelowna-british-columbia", "nanaimo-british-columbia", "victoria-british-columbia"], org: "fraser-basin-council", absent: true, reason: "outside its five Fraser Basin regions" },
  { towns: ["vancouver-british-columbia", "prince-george-british-columbia"], org: "fraser-basin-council", mustWhy: /./, reason: "inside its regions (the fix keeps it)" },
  { towns: ["nanaimo-british-columbia"], org: "swim-drink-fish", notWhy: /^Works around|^Works in/, reason: "an 80 km circle round Vancouver crossed the Strait" },
  { towns: ["vancouver-british-columbia"], org: "swim-drink-fish", mustWhy: /Vancouver|Fraser/, reason: "Fraser Riverkeeper's own shore (the fix keeps it)" },
  { towns: ["bozeman-montana"], org: "gallatin-river-task-force", absent: true, reason: "its site names only Big Sky and the upper Gallatin" },
  { towns: ["grand-rapids-michigan"], org: "alliance-for-the-great-lakes", absent: true, reason: "inland, 50 km from Lake Michigan; its site names no Grand Rapids" },
  { towns: ["grand-rapids-michigan"], org: "great-lakes-fishery-commission", absent: true, reason: "inland, 50 km from Lake Michigan" },
  { towns: ["kingston-ontario", "niagara-on-the-lake-ontario"], org: "great-lakes-fishery-commission", notWhy: /^Works around/, mustWhy: /region/, reason: '"Works around <town>", the local tier, for a binational commission at Ann Arbor' },
  { towns: ["chicago-illinois", "cleveland-ohio"], org: "alliance-for-the-great-lakes", mustWhy: /./, reason: "lakeshore towns (the fix keeps it)" },
  { towns: ["spokane-washington"], org: "tilth-alliance", notAsk: /class|youth programme/, reason: "its classes are at the Rainier Beach farm in Seattle, 370 km away" },
  { towns: ["seattle-washington"], org: "tilth-alliance", mustWhy: /./, reason: "its Seattle farm (the fix keeps it)" },
  { towns: ["san-antonio-texas"], org: "audubon-texas", notAsk: /Trinity River|Dogwood/, reason: "the two Dallas-area centres named at San Antonio" },
  { towns: ["dallas-texas"], org: "audubon-texas", notAsk: /Mitchell Lake/, reason: "the San Antonio centre named at Dallas" },
];
const DAY5_RECORD_PINS: { org: string; field: "asks" | "blurb"; not: RegExp; reason: string }[] = [
  { org: "clean-lakes-alliance", field: "asks", not: /planting|seed-collection/i, reason: "its volunteer page lists no planting or seed-collection days" },
  { org: "clean-lakes-alliance", field: "blurb", not: /plant and collect native seed/i, reason: "the same" },
  { org: "pollinator-partnership-canada", field: "blurb", not: /seven provinces/, reason: "its guide page lists 23 guides across eight provinces" },
];

async function day5Pins() {
  const { ORGANISATIONS } = await import("../src/data/conservation/index");
  const bySlug = new Map(ORGANISATIONS.map((o) => [o.slug, o]));
  const n = await runTownPins(DAY5_PINS, "14 Nov");
  for (const pin of DAY5_RECORD_PINS) {
    const o = bySlug.get(pin.org);
    if (!o) pinIssue(pin.org, "organisation is not in the library (14 Nov record pin)");
    else for (const text of pin.field === "asks" ? o.asks : [o.blurb]) if (pin.not.test(text)) pinIssue(pin.org, `${pin.field}: "${text}"; ${pin.reason}`);
  }
  // P2C's localAsk lists the provinces its guides cover; the blurb's count must be the list's.
  const p2c = bySlug.get("pollinator-partnership-canada");
  const codes = p2c?.localAsks?.flatMap((l) => l.areas.flatMap((a) => (a.kind === "admin1" ? a.admin1Codes : []))) ?? [];
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  if (p2c && !p2c.blurb.includes(`parts of ${words[new Set(codes).size]} provinces`)) pinIssue("pollinator-partnership-canada", `blurb's province count is not the ${new Set(codes).size} its guide ask lists`);
  console.log(`== 14 Nov audit pins: ${n} town/organisation pairs, ${DAY5_RECORD_PINS.length} record pins`);
}

async function day4Pins() {
  const { ORGANISATIONS } = await import("../src/data/conservation/index");
  const { orgsFor, SECTION_TOPICS, SECTION_FOOD } = await import("../src/lib/conservation/match");
  const { scopeLine, withArticle } = await import("../src/lib/conservation/geo-words");
  const bySlug = new Map(ORGANISATIONS.map((o) => [o.slug, o]));
  const n = await runTownPins(DAY4_PINS, "13 Nov");
  for (const pin of DAY4_RECORD_PINS) {
    const o = bySlug.get(pin.org);
    if (!o) pinIssue(pin.org, "organisation is not in the library (13 Nov record pin)");
    else for (const text of pin.field === "asks" ? o.asks : [o.blurb]) if (pin.not.test(text)) pinIssue(pin.org, `${pin.field}: "${text}"; ${pin.reason}`);
  }
  // Invariants across the 264 towns, every topic and food role: "Works in <town>" only with a placeSources page, and no
  // "Covers <water>" for a water its own pages do not name (the page given every unsourced water in the library).
  const unsourced = new Map<string, Set<string>>();
  for (const o of ORGANISATIONS) {
    const ws = (o.waters ?? []).filter((w) => !waterSourced(o, w));
    if (ws.length) unsourced.set(o.slug, new Set(ws.map((w) => `Covers ${withArticle(w)}`)));
  }
  const allUnsourced = [...new Set(ORGANISATIONS.flatMap((o) => (o.waters ?? []).filter((w) => !waterSourced(o, w))))];
  let worksIn = 0;
  let bad = 0;
  for (const p of PLACES) {
    const lists = [
      ...([undefined, ...Object.values(SECTION_TOPICS)] as (Topic[] | undefined)[]).map((t) => orgsFor(p, { topic: t })),
      ...Object.values(SECTION_FOOD).map((roles) => orgsFor(p, { foodRoles: roles })),
      orgsFor(p, { waters: allUnsourced }),
    ];
    for (const ms of lists) {
      for (const m of ms) {
        if (m.why === `Works in ${p.name}`) {
          worksIn++;
          if (!m.org.placeSources?.[p.slug] && bad++ < 5) pinIssue(m.org.slug, `"${m.why}" at ${p.slug} with no placeSources page`);
        }
        if (unsourced.get(m.org.slug)?.has(m.why) && bad++ < 5) pinIssue(m.org.slug, `"${m.why}" at ${p.slug}, a water its own pages do not name`);
      }
    }
  }
  // The organisation's own page: its "Works on …" line names only sourced waters.
  for (const o of ORGANISATIONS) {
    const line = scopeLine(o);
    for (const w of o.waters ?? []) if (!waterSourced(o, w) && line.includes(withArticle(w)) && !(o.waters ?? []).some((x) => x !== w && waterSourced(o, x) && withArticle(x).includes(withArticle(w)))) pinIssue(o.slug, `scope line "${line}" names ${w}, a water its own pages do not name`);
  }
  console.log(`== 13 Nov audit pins: ${n} town/organisation pairs, ${DAY4_RECORD_PINS.length} record pins; ${worksIn} "Works in" lines across ${PLACES.length} towns and the lines for ${allUnsourced.length} unsourced waters checked (${bad} printed without a page)`);
}

// ---- coverage and counts -----------------------------------------------------------

const MAIN: Topic[] = ["water", "fish", "birds", "pollinators", "plants", "land"];
const NEED_LOCAL: Topic[] = ["water", "fish", "birds"];

async function coverage() {
  if (dupSlugs) {
    console.log("\n(coverage skipped: the library index throws on a duplicate slug — fix that first)");
    return;
  }
  const { orgsFor } = await import("../src/lib/conservation/match");
  const { ORGANISATIONS } = await import("../src/data/conservation/index");
  const { regionOf } = await import("../src/lib/region");
  const total = Object.values(FILES).reduce((n, l) => n + l.length, 0);
  if (ORGANISATIONS.length !== total) console.log(`\nNOTE: index.ts merges ${ORGANISATIONS.length} records, the four data files hold ${total}: is there a data file this script does not read?`);

  const countries = value("country")?.toUpperCase().split(",");
  const towns = countries ? PLACES.filter((p) => countries.includes(p.countryCode)) : PLACES;
  const table: string[] = [];
  const tally: Record<Topic, number[]> = Object.fromEntries(MAIN.map((t) => [t, [0, 0, 0, 0, 0]])) as Record<Topic, number[]>;
  const gaps: string[] = [];
  const noNational: string[] = [];
  for (const p of towns) {
    const cells: string[] = [];
    for (const t of MAIN) {
      const ms = orgsFor(p, { topic: t }).filter((m) => m.topical);
      const best = ms.reduce((b, m) => Math.max(b, m.tier), -1);
      tally[t][best + 1]++;
      cells.push(best < 0 ? "-" : String(best));
      if (NEED_LOCAL.includes(t) && best < 2) gaps.push(`${p.slug} ${t}: best tier ${best < 0 ? "none" : best}`);
    }
    if (!orgsFor(p).some((m) => m.tier >= 1)) noNational.push(`${p.slug} (${p.countryCode})`);
    const eco = regionOf(p.lat, p.lon)?.slug ?? "?";
    table.push(`  ${p.slug.padEnd(40)} ${p.countryCode.padEnd(3)} ${String(eco).padEnd(28)} ${cells.map((c) => c.padStart(3)).join(" ")}`);
  }
  const head = `  ${"town".padEnd(40)} ${"cc".padEnd(3)} ${"ecoregion".padEnd(28)} ${MAIN.map((t) => t.slice(0, 3).padStart(3)).join(" ")}`;
  console.log(`\n== Coverage: ${towns.length} towns × ${MAIN.length} topics (best tier of a topical match: 3 water/home, 2 province-state/ecoregion, 1 national, 0 international, - none)`);
  if (!flag("summary")) {
    console.log(head);
    for (const r of table) console.log(r);
  }
  console.log(`\n  ${"topic".padEnd(12)} ${["none", "t0", "t1", "t2", "t3"].map((s) => s.padStart(5)).join("")}   local (t2+)`);
  for (const t of MAIN) {
    const c = tally[t];
    const local = c[3] + c[4];
    console.log(`  ${t.padEnd(12)} ${c.map((n) => String(n).padStart(5)).join("")}   ${local}/${towns.length} (${Math.round((100 * local) / Math.max(1, towns.length))}%)`);
  }
  console.log(`\n  Towns with no national (tier 1+) body at all: ${noNational.length}${noNational.length ? `\n    ${noNational.join(", ")}` : ""}`);
  console.log(`  Water/fish/birds gaps (no tier 2+ topical match): ${gaps.length}`);
  if (!flag("summary") || countries) for (const g of gaps) console.log(`    ${g}`);

  // counts
  const byCountry = new Map<string, Organisation[]>();
  for (const o of ORGANISATIONS) {
    const c = o.countryCode ?? "INTL";
    byCountry.set(c, [...(byCountry.get(c) ?? []), o]);
  }
  console.log(`\n== Counts: ${ORGANISATIONS.length} organisations in ${[...byCountry.keys()].filter((c) => c !== "INTL").length} countries (+ international)`);
  const T = [...TOPICS];
  console.log(`  ${"cc".padEnd(5)} ${"all".padStart(4)} ${T.map((t) => t.slice(0, 4).padStart(5)).join("")}`);
  const rows = [...byCountry.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
  for (const [c, list] of rows) console.log(`  ${c.padEnd(5)} ${String(list.length).padStart(4)} ${T.map((t) => String(list.filter((o) => o.topics.includes(t)).length || "·").padStart(5)).join("")}`);
  console.log(`  ${"all".padEnd(5)} ${String(ORGANISATIONS.length).padStart(4)} ${T.map((t) => String(ORGANISATIONS.filter((o) => o.topics.includes(t)).length).padStart(5)).join("")}`);
  const pre = new Set(PLACES.map((p) => p.countryCode));
  const missing = [...pre].filter((c) => !byCountry.has(c)).sort();
  console.log(`\n  Countries with pre-built towns and no organisation registered there: ${missing.length ? missing.join(" ") : "none"}`);

  // food coverage: per town, the best tier for each food role
  const food = ORGANISATIONS.filter((o) => o.topics.includes("food"));
  const ROLE_ABBR: Record<FoodRole, string> = {
    "community-gardens": "gdn", "community-farms": "frm", "school-gardens": "sch", "seed-library": "sed", gleaning: "gln", "food-rescue": "rsc",
    "local-food": "loc", markets: "mkt", "sustainable-seafood": "sea", "foraging-code": "cod", "growing-advice": "adv",
  };
  const ftally: Record<FoodRole, number[]> = Object.fromEntries(FOOD_ROLES.map((r) => [r, [0, 0, 0, 0, 0]])) as Record<FoodRole, number[]>;
  const ftable: string[] = [];
  const noLocalFood: string[] = [];
  for (const p of towns) {
    const cells: string[] = [];
    let local = false;
    for (const r of FOOD_ROLES) {
      const best = orgsFor(p, { foodRoles: [r] }).reduce((b, m) => Math.max(b, m.tier), -1);
      ftally[r][best + 1]++;
      if (best >= 2) local = true;
      cells.push(best < 0 ? "-" : String(best));
    }
    if (!local) noLocalFood.push(p.slug);
    const g = (G.towns ?? {})[p.slug];
    ftable.push(`  ${p.slug.padEnd(40)} ${p.countryCode.padEnd(3)} ${cells.map((c) => c.padStart(4)).join("")}   ${g ? String(g.length).padStart(2) : " ?"}`);
  }
  console.log(`\n== Food: ${food.length} food bodies (${[...FOOD_RECORDS].length} round-three records, ${TAGGED.size} tagged round-one records); best tier per role per town (gardens: named within 15 km, ? = not fetched)`);
  if (!flag("summary")) {
    console.log(`  ${"town".padEnd(40)} ${"cc".padEnd(3)} ${FOOD_ROLES.map((r) => ROLE_ABBR[r].padStart(4)).join("")}   gdns`);
    for (const r of ftable) console.log(r);
  }
  console.log(`\n  ${"role".padEnd(20)} ${"bodies".padStart(6)} ${["none", "t0", "t1", "t2", "t3"].map((s) => s.padStart(5)).join("")}   local (t2+)`);
  for (const r of FOOD_ROLES) {
    const c = ftally[r];
    const local = c[3] + c[4];
    console.log(`  ${r.padEnd(20)} ${String(food.filter((o) => o.foodRoles?.includes(r)).length).padStart(6)} ${c.map((n) => String(n).padStart(5)).join("")}   ${local}/${towns.length} (${Math.round((100 * local) / Math.max(1, towns.length))}%)`);
  }
  console.log(`  Towns with no food body at tier 2+ for any role: ${noLocalFood.length}`);
  const gl = Object.values(G.towns ?? {});
  console.log(`  Community gardens file: fetched ${String(G.fetched)}, ${gl.length}/${PLACES.length} towns fetched, ${gl.filter((l) => l.length).length} with at least one, ${gardenRows} gardens, ${Array.isArray(G.failed) ? G.failed.length : "?"} failed`);
}

// ---- links ------------------------------------------------------------------------

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
function curl(url: string): Promise<{ status: string; final: string }> {
  return new Promise((resolve) => {
    execFile("curl", ["-sS", "-L", "--max-redirs", "8", "-m", "40", "-o", "/dev/null", "-A", UA, "-H", "Accept-Language: en", "-w", "%{http_code} %{url_effective}", url], { encoding: "utf8" }, (_e, stdout) => {
      const [status, ...rest] = (stdout || "000 -").trim().split(" ");
      resolve({ status, final: rest.join(" ") });
    });
  });
}

async function links() {
  const urls = new Map<string, string[]>();
  const add = (u: string | undefined, who: string) => {
    if (!u || httpsUrl(u)) return;
    urls.set(u, [...(urls.get(u) ?? []), who]);
  };
  for (const [file, orgs] of Object.entries(FILES)) {
    if (onlyFile && file !== onlyFile) continue;
    for (const o of orgs) {
      for (const [k, u] of Object.entries(o.links)) add(u, `${o.slug}.${k}`);
      add(o.registry?.url, `${o.slug}.registry`);
      if (flag("sources")) for (const s of o.sources) add(s, `${o.slug}.source`);
    }
  }
  // One request at a time per host, up to eight hosts at once.
  const byHost = new Map<string, string[]>();
  for (const u of urls.keys()) {
    const h = new URL(u).host;
    byHost.set(h, [...(byHost.get(h) ?? []), u]);
  }
  const queues = [...byHost.values()];
  const results: { url: string; status: string; final: string }[] = [];
  let done = 0;
  async function worker() {
    for (;;) {
      const q = queues.shift();
      if (!q) return;
      for (const u of q) {
        results.push({ url: u, ...(await curl(u)) });
        done++;
        if (done % 50 === 0) console.error(`  … ${done}/${urls.size}`);
        if (q.length > 1) await new Promise((r) => setTimeout(r, 800));
      }
    }
  }
  console.log(`\n== Links: GET ${urls.size} URLs on ${byHost.size} hosts${onlyFile ? ` (${onlyFile}.ts)` : ""}${flag("sources") ? " including sources" : ""}`);
  await Promise.all(Array.from({ length: 8 }, worker));
  const bad = results.filter((r) => !/^[23]\d\d$/.test(r.status));
  // 401/403/405/429/999 are usually a site's bot protection turning curl away, not a dead page: listed apart, to check in a browser.
  const refused = bad.filter((r) => /^(401|403|405|429|999)$/.test(r.status));
  const failed = bad.filter((r) => !refused.includes(r));
  const line = (b: (typeof results)[number]) => `  ${b.status} ${b.url} ← ${urls.get(b.url)!.join(", ")}${b.final && b.final !== b.url && b.final !== "-" ? ` (ended at ${b.final})` : ""}`;
  console.log(`  ${results.length - bad.length} answered 2xx/3xx · ${failed.length} failed (4xx/5xx, or 000 = no answer) · ${refused.length} refused the checker`);
  if (failed.length) console.log("  Failed:");
  for (const b of failed.sort((a, c) => a.url.localeCompare(c.url))) console.log(line(b));
  if (refused.length) console.log("  Refused (bot protection, most likely; open them in a browser):");
  for (const b of refused.sort((a, c) => a.url.localeCompare(c.url))) console.log(line(b));
  return failed.length;
}

(async () => {
  if (!dupSlugs) {
    await auditPins();
    await day2Pins();
    await day3Pins();
    await day4Pins();
    await day5Pins();
  }
  const pinErrors = issues.filter((i) => i.file === "audit-pin");
  for (const i of pinErrors) console.log(`  ERROR ${i.file}/${i.slug}: ${i.msg}`);
  if (!flag("no-coverage") && !flag("links-only")) await coverage();
  let badLinks = 0;
  if (flag("links") || flag("links-only")) badLinks = await links();
  process.exit(errors.length || pinErrors.length || badLinks ? 1 : 0);
})();
