/**
 * Builds src/data/place-presence-fish.json: for each of the 264 towns in
 * src/data/place-normals.json, which of the library's sport fish have been
 * RECORDED near the town, from GBIF occurrence records.
 *
 * Why: the fishing pages used to list a fish as "in season now" because its
 * region (creatures.json `regions`) said so, with no check that the fish lives
 * near the town. Ottawa showed steelhead, coho and Chinook, which are Lake
 * Ontario tributary fish; Ontario's FMZ 12 page says Pacific salmon "are not
 * present in this Zone". A fish may now lead a town's list only when it has
 * been recorded near the town (src/lib/fish-presence.ts reads this file).
 *
 * Method (all of it is printed on the site's fishing page, so keep it true):
 *  - Species: each fish's scientific name in creatures.json is resolved to a
 *    GBIF taxonKey with /v1/species/match (the accepted usage when the name is
 *    a synonym). steelhead and rainbow-trout are one species (Oncorhynchus
 *    mykiss); GBIF cannot tell the sea-run or lake-run form from the resident
 *    one, so both slugs read the same count and fish-presence.ts never lets
 *    records alone make steelhead "recorded".
 *  - Box: a square of +-BOX_KM km around the town (decimalLatitude and
 *    decimalLongitude ranges), hasCoordinate=true, hasGeospatialIssue=false,
 *    year >= SINCE, occurrenceStatus=PRESENT, and basisOfRecord observations,
 *    machine observations and preserved (museum) specimens only: no fossils, no
 *    aquaria or zoos (LIVING_SPECIMEN), no MATERIAL_SAMPLE (Ottawa's Atlantic
 *    salmon "records" were three supermarket DNA-barcoding samples).
 *  - One facet=speciesKey request per town counts every fish at once. Each fish
 *    with at least one record then gets a month facet and a year facet (byMonth,
 *    lastYear) and a short ladder of circles (10, 30, 60 km) for `withinKm`,
 *    the smallest circle around the town that holds a record: 85 means only in
 *    a corner of the box. GBIF cannot sort by distance, so this is a bound,
 *    not the nearest record's exact distance.
 *  - dataPoor: the town's total records of ANY fish (same box and filters) is
 *    under DATA_POOR_BELOW. The GBIF backbone no longer has a class for the
 *    ray-finned fishes (Actinopterygii returns no occurrences; Perciformes sits
 *    directly under Chordata), so the fish count is the Chordata records minus
 *    the records of every chordate class the backbone does name (birds,
 *    mammals, reptiles, amphibians, lampreys...), one taxonKey=Chordata request
 *    with facet=classKey. Where few
 *    fish of any kind have been recorded (much of Africa and eastern Europe),
 *    no record of one species proves nothing, so absence is "not checked", not
 *    "absent". The number was chosen from the distribution of `totalFish`
 *    across the 264 towns; see the note it writes into `meta.dataPoorNote`.
 *
 * Raw responses are cached outside the repo, one file per request URL, so a run
 * can be repeated, and the threshold changed, without touching GBIF again.
 * Requests go one at a time with a pause between them and a User-Agent that
 * names the site; no personal address is sent.
 *
 * Run (no tsx in this project; esbuild bundles it; the proxy needs NODE_USE_ENV_PROXY):
 *   npx esbuild scripts/build-place-presence.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/build-place-presence.mjs --log-level=warning && \
 *   NODE_USE_ENV_PROXY=1 node /tmp/build-place-presence.mjs [--pilot | --all | slug ...] [--force] [--offline] [--data-poor-below N] [--out file]
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import NORMALS from "../src/data/place-normals.json";
import CREATURES from "../src/data/creatures.json";

const CACHE_DIR = "/tmp/claude-0/-home-claude/386500bd-d369-5b6d-812e-371425850393/scratchpad/presence-fish-cache";
const DEFAULT_OUT = join(process.cwd(), "src/data/place-presence-fish.json");
const API = "https://api.gbif.org/v1";
const UA = "guidetooutside-presence-build/1.0 (+https://guidetooutside.com; fish presence near towns from GBIF occurrence counts)";
const PAUSE_MS = 150;

/** Half the side of the box around the town, in km. */
const BOX_KM = 60;
/** Records from this year on. */
const SINCE = 1990;
/**
 * Towns with fewer fish records than this in the box are data-poor (see `meta.dataPoorNote`). Chosen from the
 * distribution: the number of the library's fish recorded at a town climbs with the records until about 2,000
 * (median 8 species under 500 records, 12 under 2,000, 14 from 2,000, 16+ from 3,000, and no town from 2,000 up
 * has fewer than 10), after which more records add little. Below it, a species not recorded is as likely a gap
 * in the recording as an absence, so it is named as regional rather than dropped.
 */
let DATA_POOR_BELOW = 2000;
/** Circles tried, smallest first, for `withinKm`. */
const LADDER = [10, 30, 60];
/** No FOSSIL_SPECIMEN, LIVING_SPECIMEN (aquaria, zoos) or MATERIAL_SAMPLE: Ottawa's Atlantic salmon "records" were three supermarket DNA-barcoding samples (T and T, Costco, Loblaws). */
const BASIS = ["HUMAN_OBSERVATION", "MACHINE_OBSERVATION", "OBSERVATION", "PRESERVED_SPECIMEN", "OCCURRENCE"];
const PILOT = ["ottawa-ontario", "vancouver-british-columbia", "halifax-nova-scotia", "dublin-ireland", "cape-town-south-africa"];

/** Where the site's scientific name is not the one the GBIF backbone accepts. The site (fish-facts.ts) uses Micropterus nigricans, the newer name; GBIF lists M. salmoides. */
const GBIF_NAME: Record<string, string> = { "largemouth-bass": "Micropterus salmoides" };

type Place = { slug: string; label: string; lat: number; lon: number; countryCode: string };
type Entry = { place: Place };
const TOWNS = (NORMALS as unknown as Entry[]).map((e) => e.place);
const FISH = (CREATURES as unknown as { fish: { slug: string; latin: string }[] }).fish;

type FishPresence = { n: number; withinKm?: number; lastYear?: number; byMonth?: number[] };
type TownPresence = { lat: number; lon: number; totalFish: number; dataPoor: boolean; fish: Record<string, FishPresence> };
type Taxon = { latin: string; key: number | null; matched: string | null; matchType: string; status: string; acceptedName?: string };
type Out = {
  meta: {
    source: string;
    method: string;
    boxKm: number;
    since: number;
    ladderKm: number[];
    builtAt: string;
    dataPoorBelow: number;
    dataPoorNote: string;
  };
  taxa: Record<string, Taxon>;
  towns: Record<string, TownPresence>;
};

const args = process.argv.slice(2);
const flag = (f: string) => args.includes(f);
const opt = (f: string) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};
if (opt("--data-poor-below")) DATA_POOR_BELOW = Number(opt("--data-poor-below"));
const OUT = opt("--out") ?? DEFAULT_OUT;
const OFFLINE = flag("--offline");
const skipValues = new Set(["--out", "--data-poor-below"]);
const positional = args.filter((a, i) => !a.startsWith("--") && !skipValues.has(args[i - 1] ?? ""));

mkdirSync(join(CACHE_DIR, "raw"), { recursive: true });

let lastCall = 0;
let fetched = 0;
let cached = 0;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** GET a GBIF URL as JSON through the on-disk cache, one request at a time, with retries. */
async function get<T>(url: string): Promise<T> {
  const file = join(CACHE_DIR, "raw", `${createHash("sha1").update(url).digest("hex")}.json`);
  if (existsSync(file)) {
    cached++;
    return JSON.parse(readFileSync(file, "utf8")).body as T;
  }
  if (OFFLINE) throw new Error(`offline: not cached: ${url}`);
  let lastErr: unknown;
  for (let attempt = 0; attempt < 7; attempt++) {
    const wait = lastCall + PAUSE_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastCall = Date.now();
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
      const body = (await res.json()) as T;
      writeFileSync(file, JSON.stringify({ url, at: new Date().toISOString(), body }));
      fetched++;
      return body;
    } catch (e) {
      lastErr = e;
      const msg = String((e as Error).message ?? e);
      if (/HTTP 4\d\d/.test(msg) && !/HTTP 429/.test(msg)) throw e;
      await sleep(Math.min(60000, 1500 * 2 ** attempt));
    }
  }
  throw new Error(`gave up on ${url}: ${String((lastErr as Error)?.message ?? lastErr)}`);
}

type Match = { usageKey?: number; acceptedUsageKey?: number; canonicalName?: string; scientificName?: string; matchType: string; status?: string; rank?: string };

async function resolveTaxa(): Promise<{ taxa: Record<string, Taxon>; chordataKey: number }> {
  const taxa: Record<string, Taxon> = {};
  const byLatin = new Map<string, Taxon>();
  for (const f of FISH) {
    const name = GBIF_NAME[f.slug] ?? f.latin;
    let t = byLatin.get(name);
    if (!t) {
      const m = await get<Match>(`${API}/species/match?name=${encodeURIComponent(name)}&kingdom=Animalia&strict=false`);
      const exact = m.matchType === "EXACT" && m.rank === "SPECIES";
      // Only an exact species match is used (the accepted usage when the name is a synonym); anything else is reported and left out.
      t = {
        latin: name,
        key: exact ? (m.acceptedUsageKey ?? m.usageKey ?? null) : null,
        matched: m.canonicalName ?? m.scientificName ?? null,
        matchType: m.matchType,
        status: m.status ?? "",
      };
      if (exact && m.acceptedUsageKey && m.acceptedUsageKey !== m.usageKey) {
        const a = await get<{ canonicalName?: string }>(`${API}/species/${m.acceptedUsageKey}`);
        t.acceptedName = a.canonicalName;
      }
      byLatin.set(name, t);
    }
    taxa[f.slug] = t;
  }
  const c = await get<Match>(`${API}/species/match?name=Chordata&rank=PHYLUM&kingdom=Animalia`);
  if (!c.usageKey || c.rank !== "PHYLUM") throw new Error("could not resolve phylum Chordata");
  return { taxa, chordataKey: c.usageKey };
}

const box = (lat: number, lon: number) => {
  const dLat = BOX_KM / 111.195;
  const dLon = BOX_KM / (111.195 * Math.max(0.05, Math.cos((lat * Math.PI) / 180)));
  const f = (x: number) => x.toFixed(4);
  return `decimalLatitude=${f(Math.max(-90, lat - dLat))},${f(Math.min(90, lat + dLat))}&decimalLongitude=${f(Math.max(-180, lon - dLon))},${f(Math.min(180, lon + dLon))}`;
};
const common = `hasCoordinate=true&hasGeospatialIssue=false&year=${SINCE},${new Date().getUTCFullYear()}&occurrenceStatus=PRESENT&${BASIS.map((b) => `basisOfRecord=${b}`).join("&")}`;

type Search = { count: number; facets?: { field: string; counts: { name: string; count: number }[] }[] };
const facetOf = (s: Search, field: string) => s.facets?.find((f) => f.field === field)?.counts ?? [];

async function town(p: Place, taxa: Record<string, Taxon>, chordataKey: number): Promise<TownPresence> {
  const where = `${box(p.lat, p.lon)}&${common}`;
  const chordates = await get<Search>(`${API}/occurrence/search?taxonKey=${chordataKey}&${where}&limit=0&facet=classKey&facetLimit=100`);
  const named = facetOf(chordates, "CLASS_KEY").reduce((a, c) => a + c.count, 0);
  const totalFish = Math.max(0, chordates.count - named);
  const keys = [...new Set(Object.values(taxa).map((t) => t.key).filter((k): k is number => k != null))];
  const sp = await get<Search>(`${API}/occurrence/search?${keys.map((k) => `taxonKey=${k}`).join("&")}&${where}&limit=0&facet=speciesKey&facetLimit=${keys.length + 20}`);
  const nByKey = new Map(facetOf(sp, "SPECIES_KEY").map((c) => [Number(c.name), c.count]));
  const fish: Record<string, FishPresence> = {};
  const done = new Map<number, FishPresence>();
  for (const [slug, t] of Object.entries(taxa)) {
    if (t.key == null) continue;
    const n = nByKey.get(t.key) ?? 0;
    if (!n) continue;
    let rec = done.get(t.key);
    if (!rec) {
      rec = { n };
      const mo = await get<Search>(`${API}/occurrence/search?taxonKey=${t.key}&${where}&limit=0&facet=month&facet=year&facetLimit=60`);
      const byMonth = new Array<number>(12).fill(0);
      for (const c of facetOf(mo, "MONTH")) byMonth[Number(c.name) - 1] = c.count;
      if (byMonth.some((x) => x)) rec.byMonth = byMonth;
      const years = facetOf(mo, "YEAR").map((c) => Number(c.name));
      if (years.length) rec.lastYear = Math.max(...years);
      let within = 0;
      for (const r of LADDER) {
        const c = await get<Search>(`${API}/occurrence/search?taxonKey=${t.key}&geoDistance=${p.lat.toFixed(4)},${p.lon.toFixed(4)},${r}km&${common}&limit=0`);
        if (c.count > 0) {
          within = r;
          break;
        }
      }
      rec.withinKm = within || Math.round(BOX_KM * Math.SQRT2);
      done.set(t.key, rec);
    }
    fish[slug] = rec;
  }
  return { lat: p.lat, lon: p.lon, totalFish, dataPoor: totalFish < DATA_POOR_BELOW, fish };
}

function readOut(): Out | null {
  try {
    return JSON.parse(readFileSync(OUT, "utf8")) as Out;
  } catch {
    return null;
  }
}
function writeOut(o: Out) {
  mkdirSync(dirname(OUT), { recursive: true });
  const tmp = `${OUT}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(o)}\n`);
  renameSync(tmp, OUT);
}

function dataPoorNote(towns: Record<string, TownPresence>): string {
  const v = Object.values(towns).map((t) => t.totalFish).sort((a, b) => a - b);
  if (!v.length) return "";
  const q = (f: number) => v[Math.min(v.length - 1, Math.floor(f * v.length))];
  const poor = v.filter((x) => x < DATA_POOR_BELOW).length;
  return `Fish records (Chordata without a named class, ${SINCE} on) within +-${BOX_KM} km, across ${v.length} towns: min ${v[0]}, 10th percentile ${q(0.1)}, median ${q(0.5)}, 90th ${q(0.9)}, max ${v[v.length - 1]}. A town is data-poor under ${DATA_POOR_BELOW} records: ${poor} of ${v.length} towns.`;
}

async function main() {
  const wanted = flag("--all") ? TOWNS.map((t) => t.slug) : positional.length ? positional : flag("--pilot") || !flag("--offline") ? PILOT : [];
  const known = new Map(TOWNS.map((t) => [t.slug, t]));
  const missing = wanted.filter((s) => !known.has(s));
  if (missing.length) throw new Error(`not in place-normals.json: ${missing.join(", ")}`);

  const { taxa, chordataKey } = await resolveTaxa();
  const unresolved = Object.entries(taxa).filter(([, t]) => t.key == null);
  console.log(`taxa: ${Object.keys(taxa).length} fish, ${unresolved.length} without an exact GBIF species match: ${unresolved.map(([s, t]) => `${s} (${t.latin}: ${t.matchType}${t.matched ? ` -> ${t.matched}` : ""})`).join("; ") || "none"}`);
  const synonyms = Object.entries(taxa).filter(([, t]) => t.acceptedName);
  if (synonyms.length) console.log(`  names resolved to a different accepted name: ${synonyms.map(([s, t]) => `${s}: ${t.latin} -> ${t.acceptedName}`).join("; ")}`);

  const prev = readOut();
  const towns: Record<string, TownPresence> = prev?.towns ?? {};
  const todo = wanted.filter((s) => flag("--force") || !towns[s]);
  console.log(`towns: ${wanted.length} wanted, ${wanted.length - todo.length} already built, ${todo.length} to fetch (data-poor below ${DATA_POOR_BELOW})`);

  const save = () => {
    // The threshold may have changed: recompute dataPoor for every town from its stored count.
    for (const t of Object.values(towns)) t.dataPoor = t.totalFish < DATA_POOR_BELOW;
    const ordered = Object.fromEntries(TOWNS.filter((t) => towns[t.slug]).map((t) => [t.slug, towns[t.slug]]));
    writeOut({
      meta: {
        source: "GBIF occurrence search, https://api.gbif.org/v1/occurrence/search",
        method: `Records of the species within +-${BOX_KM} km of the town (a box), ${SINCE} on, with coordinates and no geospatial issue, observations and museum specimens only (no fossil, living-specimen or material-sample records). dataPoor: fewer than ${DATA_POOR_BELOW} fish records of any species in the box (Chordata records without a named class, which is how the GBIF backbone holds the fishes).`,
        boxKm: BOX_KM,
        since: SINCE,
        ladderKm: LADDER,
        builtAt: new Date().toISOString().slice(0, 10),
        dataPoorBelow: DATA_POOR_BELOW,
        dataPoorNote: dataPoorNote(ordered),
      },
      taxa,
      towns: ordered,
    });
  };

  let i = 0;
  for (const slug of todo) {
    const p = known.get(slug)!;
    // A GBIF outage (HTTP 5xx for minutes) is waited out, politely, rather than ending the run:
    // the town is retried every 5 minutes for up to 2 hours; what is built so far is kept either way.
    for (let outage = 0; ; outage++) {
      try {
        towns[slug] = await town(p, taxa, chordataKey);
        break;
      } catch (e) {
        if (outage >= 24 || !/gave up/.test(String((e as Error).message))) {
          save();
          throw e;
        }
        console.log(`GBIF is not answering (${slug}); waiting 5 minutes (${outage + 1}/24)`);
        await sleep(5 * 60 * 1000);
      }
    }
    i++;
    const t = towns[slug];
    console.log(`[${i}/${todo.length}] ${slug}: totalFish ${t.totalFish}${t.dataPoor ? " (data-poor)" : ""}, ${Object.keys(t.fish).length} of the library's fish recorded; fetched ${fetched}, cached ${cached}`);
    if (i % 5 === 0 || i === todo.length) save();
  }
  save();
  console.log(`done: ${Object.keys(towns).length} towns in ${OUT}; ${fetched} requests, ${cached} from cache`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
