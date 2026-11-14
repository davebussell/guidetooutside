/**
 * Builds src/data/place-presence-plants.json: for every town in
 * src/data/place-normals.json and every curated wild edible in
 * src/data/species.json that the library's own region and country rules would
 * admit there, how many occurrence records of the species GBIF holds in a box
 * about 50 km either side of the town, and in which months of the year.
 *
 * Why: the library lists a species for a whole ecological region ("Great Lakes
 * and St. Lawrence Lowlands") and the place pages then said it was "ready"
 * under a town's name with no check that anyone had ever found it there
 * (lingonberry "ready Sep-Nov near Ottawa": zero records within 40 km). The gate
 * in src/lib/plant-presence.ts reads this file. See that file for the rule.
 *
 * Method (all of it is in the JSON `meta` too):
 *  - Source: GBIF occurrence search, https://api.gbif.org/v1/occurrence/search,
 *    all datasets (iNaturalist research-grade observations dominate), one request
 *    per town and species: taxonKey=<key>, hasCoordinate=true,
 *    hasGeospatialIssue=false, occurrenceStatus=PRESENT, year=2000,*,
 *    decimalLatitude/decimalLongitude = the town +/- 50 km (a box, ~100 km square,
 *    which is 2x the area of the "within about 40 km" circle the live panels use),
 *    limit=0, facet=month. The facet gives the records by calendar month of the
 *    observation, so a southern-hemisphere town's months are its own.
 *  - taxonKey: resolved once per species from GBIF /v1/species/match on the
 *    library's scientific name (genus for "Genus spp."); the accepted usage key
 *    is used when the name is a synonym. A few species name several taxa
 *    (NAME_OVERRIDES). Species GBIF cannot match exactly are listed in
 *    `meta.unresolved` and are never called "ready" anywhere.
 *  - dataPoor: one more request per town counts all plant + fungi records
 *    (kingdomKey 6 and 5) in the same box, same filters. Fewer than
 *    DATA_POOR_BELOW means an absence is weak evidence, so the town's lists
 *    become a labelled regional list rather than a claim.
 *  - Only species the library admits at the town (region, country and box
 *    rules; not zone, not month, not coast) are requested: anything else can
 *    never be listed there. Species with no record in the box are omitted from
 *    the town's `species` map (absent).
 *  - nearestKm is not collected: it needs a record-level query per pair.
 *  - Raw responses are cached outside the repo (PRESENCE_CACHE, default the
 *    session scratchpad), so a re-run only asks for what is missing and the JSON
 *    can be rebuilt (a different DATA_POOR_BELOW, say) without the network.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias;
 * NODE_USE_ENV_PROXY=1 makes node's fetch honour HTTPS_PROXY where there is one):
 *   npx esbuild scripts/build-place-plants.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/build-place-plants.mjs --log-level=warning \
 *   && NODE_USE_ENV_PROXY=1 node /tmp/build-place-plants.mjs [--plan] [--resolve] [--pilot] [--all] [--delay=150] [slug ...]
 *
 *   --plan     print how many requests are needed and stop
 *   --resolve  resolve the taxon keys only and print them
 *   --pilot    the five pilot towns (ottawa, vancouver, halifax, dublin, cape town)
 *   --all      every town (default when no slug is given and --pilot is absent)
 *   slug ...   only these towns
 * Requests are sequential, with a pause between them (--delay, ms) and a
 * descriptive User-Agent. Progress goes to stdout; the JSON is rewritten every
 * ten towns and at the end, from whatever towns are complete.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import NORMALS from "../src/data/place-normals.json";
import { classifyEcoregion } from "../src/lib/ecoregions";
import { SPECIES, placeAllows, type Species } from "../src/lib/species";
import type { Place } from "../src/lib/types";

const CACHE = process.env.PRESENCE_CACHE ?? "/tmp/claude-0/-home-claude/386500bd-d369-5b6d-812e-371425850393/scratchpad/presence-plants-cache";
/** Run from the project root: the bundle lives elsewhere, so the output path cannot be taken from the script's own location. */
const OUT = join(process.cwd(), "src/data/place-presence-plants.json");
const API = "https://api.gbif.org/v1";
const UA = "guidetooutside-presence-build/1.0 (+https://guidetooutside.com; GBIF API client for a nature-guide site; sequential requests)";

/** Half the side of the box around a town, km. */
export const BOX_HALF_KM = 50;
/** Records since this year only (the live observation platforms are 2008 on; older herbarium points are placed by locality, often loosely). */
const YEAR_FROM = 2000;
/** Fewer plant + fungi records than this in the box and a town is "dataPoor": an absence says little. */
export const DATA_POOR_BELOW = 2000;

const PILOT = ["ottawa-ontario", "vancouver-british-columbia", "halifax-nova-scotia", "dublin-ireland", "cape-town-south-africa"];

/** Species that stand for several taxa, or whose library name is not the one GBIF accepts. */
const NAME_OVERRIDES: Record<string, { names: string[]; kingdom?: string }> = {
  mussels: { names: ["Mytilus", "Choromytilus meridionalis", "Perna perna"], kingdom: "Animalia" },
  // GBIF treats the feral apple of North America as Malus domestica; "Malus pumila" only matches the genus there.
  "wild-apple": { names: ["Malus domestica"], kingdom: "Plantae" },
  // The library's "Dovyalis afra" is not a name GBIF knows; the kei apple is Dovyalis caffra.
  "kei-apple": { names: ["Dovyalis caffra"], kingdom: "Plantae" },
  // GBIF's accepted name for sea purslane is Halimione portulacoides.
  "sea-purslane": { names: ["Halimione portulacoides"], kingdom: "Plantae" },
  // "Ulva" alone is ambiguous in GBIF (several homonym genera), so the common sea lettuces are named.
  "sea-lettuce": { names: ["Ulva lactuca", "Ulva rigida", "Ulva intestinalis", "Ulva compressa"], kingdom: "Plantae" },
};

type Entry = { place: Place; climate: unknown };
const TABLE = NORMALS as unknown as Entry[];

type Match = { slug: string; names: string[]; keys: number[]; rank: string[]; status: "ok" | "unresolved"; note?: string };
type Occ = { count: number; byMonth: number[] };
/** The parts of a GBIF response this script reads. */
type Gbif = { count: number; facets?: { counts: { name: string; count: number }[] }[]; [k: string]: unknown };
type GbifMatch = { usageKey?: number; acceptedUsageKey?: number; matchType?: string; rank?: string; status?: string; canonicalName?: string; scientificName?: string; confidence?: number; species?: string };

const args = process.argv.slice(2);
const flag = (f: string) => args.includes(f);
const opt = (name: string, d: number) => Number(args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? d);
const DELAY = opt("delay", 150);
const wantedSlugs = args.filter((a) => !a.startsWith("--"));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let requests = 0;

async function getJson<T = Gbif>(url: string): Promise<T> {
  let wait = 2000;
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(60_000) });
      requests++;
      if (res.ok) {
        await sleep(DELAY);
        return (await res.json()) as T;
      }
      // GBIF (or the proxy in front of it) now and then answers a valid request with a 404 or 408: ask again.
      if (res.status === 404 || res.status === 408 || res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      throw new Error(`HTTP ${res.status} (not retried): ${url}`);
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.includes("not retried") || attempt >= 6) throw e;
      console.log(`  retry ${attempt} in ${wait} ms: ${msg}`);
      await sleep(wait);
      wait = Math.min(wait * 2, 60_000);
    }
  }
}

function cached<T>(file: string): T | null {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}
function save(file: string, value: unknown) {
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, JSON.stringify(value));
  renameSync(tmp, file);
}

// ---------------------------------------------------------------- taxon keys

const cleanName = (latin: string) => latin.replace(/\s+spp?\.?$/i, "").trim();
const kingdomOf = (s: Species) => (s.kind === "mushroom" ? "Fungi" : s.kind === "coastal" ? undefined : "Plantae");

async function resolveOne(s: Species): Promise<Match> {
  const file = join(CACHE, "match", `${s.slug}.json`);
  const hit = cached<Match>(file);
  if (hit) return hit;
  const ov = NAME_OVERRIDES[s.slug];
  const names = ov ? ov.names : [cleanName(s.latin)];
  const kingdom = ov ? ov.kingdom : kingdomOf(s);
  const keys: number[] = [];
  const rank: string[] = [];
  let note: string | undefined;
  for (const name of names) {
    const q = `${API}/species/match?name=${encodeURIComponent(name)}${kingdom ? `&kingdom=${kingdom}` : ""}`;
    const m = await getJson<GbifMatch>(q);
    // A bare genus name that lands on that genus is a match even where GBIF says HIGHERRANK (homonym genera).
    const genusHit = !/\s/.test(name) && m.rank === "GENUS" && m.canonicalName === name;
    const exact = genusHit || (m.matchType === "EXACT" && !["KINGDOM", "PHYLUM", "CLASS", "ORDER", "FAMILY"].includes(m.rank ?? ""));
    const key = m.acceptedUsageKey ?? m.usageKey;
    if (!exact || key == null) {
      note = `${name}: ${m.matchType ?? "NONE"} ${m.rank ?? ""} ${m.scientificName ?? ""} (${m.confidence ?? "-"})`;
      continue;
    }
    keys.push(key);
    rank.push(m.rank ?? "");
    if (m.status !== "ACCEPTED") note = `${name}: ${m.status} -> ${m.species ?? m.canonicalName}`;
  }
  const out: Match = { slug: s.slug, names, keys, rank, status: keys.length === names.length ? "ok" : "unresolved", ...(note ? { note } : {}) };
  save(file, out);
  return out;
}

// ------------------------------------------------------------------ requests

const box = (lat: number, lon: number) => {
  const dLat = BOX_HALF_KM / 111.32;
  const dLon = BOX_HALF_KM / (111.32 * Math.max(0.2, Math.cos((lat * Math.PI) / 180)));
  const f = (x: number) => x.toFixed(3);
  return { minLat: +f(lat - dLat), maxLat: +f(lat + dLat), minLon: +f(Math.max(-180, lon - dLon)), maxLon: +f(Math.min(180, lon + dLon)) };
};

const filters = (p: Place) => {
  const b = box(p.lat, p.lon);
  return `hasCoordinate=true&hasGeospatialIssue=false&occurrenceStatus=PRESENT&year=${YEAR_FROM},*&decimalLatitude=${b.minLat},${b.maxLat}&decimalLongitude=${b.minLon},${b.maxLon}&limit=0`;
};

const readOcc = (r: Gbif): Occ => {
  const byMonth = Array(12).fill(0) as number[];
  for (const c of r.facets?.[0]?.counts ?? []) byMonth[Number(c.name) - 1] = c.count;
  return { count: r.count as number, byMonth };
};

async function occFor(p: Place, sp: string, taxonKeys: number[]): Promise<Occ> {
  const file = join(CACHE, "occ", p.slug, `${sp}.json`);
  const hit = cached<Gbif>(file);
  if (hit) return readOcc(hit);
  const keys = taxonKeys.map((k) => `taxonKey=${k}`).join("&");
  const r = await getJson(`${API}/occurrence/search?${keys}&${filters(p)}&facet=month&facetLimit=12`);
  save(file, r);
  return readOcc(r);
}

async function totalFor(p: Place): Promise<number> {
  const file = join(CACHE, "occ", p.slug, "_total.json");
  const hit = cached<Gbif>(file);
  if (hit) return hit.count;
  const r = await getJson(`${API}/occurrence/search?kingdomKey=6&kingdomKey=5&${filters(p)}`);
  save(file, r);
  return r.count as number;
}

// ---------------------------------------------------------------------- plan

/** The species the library would admit at this town, ignoring zone, month and coast. */
function candidates(p: Place): Species[] {
  const eco = classifyEcoregion(p.lat, p.lon) as { slug: string } | null;
  return SPECIES.filter((s) => (s.regions === "all" || (!!eco && s.regions.includes(eco.slug))) && placeAllows(s, eco?.slug, p));
}

async function main() {
  mkdirSync(CACHE, { recursive: true });
  const towns = TABLE.map((e) => e.place);
  const order = flag("--pilot")
    ? PILOT
    : wantedSlugs.length
      ? wantedSlugs
      : [...PILOT, ...towns.map((t) => t.slug).filter((s) => !PILOT.includes(s))];
  const list = order.map((slug) => {
    const p = towns.find((t) => t.slug === slug);
    if (!p) throw new Error(`not in place-normals.json: ${slug}`);
    return p;
  });

  if (flag("--plan")) {
    const pairs = list.reduce((n, p) => n + candidates(p).length, 0);
    console.log(`${list.length} towns, ${pairs} town-species requests + ${list.length} totals + ${SPECIES.length} taxon matches; at ~0.7 s each ≈ ${((pairs + list.length) * 0.85 / 3600).toFixed(1)} h sequential`);
    return;
  }

  console.log(`resolving ${SPECIES.length} taxon keys…`);
  const matches = new Map<string, Match>();
  for (const s of SPECIES) matches.set(s.slug, await resolveOne(s));
  const unresolved = [...matches.values()].filter((m) => m.status !== "ok");
  console.log(`  resolved ${matches.size - unresolved.length}; unresolved ${unresolved.length}: ${unresolved.map((m) => `${m.slug} [${m.note}]`).join("; ")}`);
  if (flag("--resolve")) {
    for (const m of matches.values()) console.log(`  ${m.slug.padEnd(24)} ${m.names.join(" + ").padEnd(40)} ${m.keys.join(",")} ${m.rank.join(",")}${m.note ? `  <- ${m.note}` : ""}`);
    return;
  }

  const t0 = Date.now();
  const failed: string[] = [];
  let done = 0;
  for (const p of list) {
    const cands = candidates(p);
    let total: number;
    try {
      total = await totalFor(p);
    } catch (e) {
      failed.push(`${p.slug}/_total: ${(e as Error).message.slice(0, 120)}`);
      console.log(`  FAILED ${p.slug}/_total: ${(e as Error).message.slice(0, 120)}`);
      done++;
      continue;
    }
    for (const s of cands) {
      const m = matches.get(s.slug)!;
      if (m.status !== "ok") continue;
      try {
        await occFor(p, s.slug, m.keys);
      } catch (e) {
        // A request that still fails after its retries is left uncached: the town stays out of the JSON until a re-run fills it.
        failed.push(`${p.slug}/${s.slug}: ${(e as Error).message.slice(0, 120)}`);
        console.log(`  FAILED ${p.slug}/${s.slug}: ${(e as Error).message.slice(0, 120)}`);
      }
    }
    done++;
    console.log(`[${done}/${list.length}] ${p.slug}: ${cands.length} species asked, ${total} plant+fungi records, ${requests} requests, ${((Date.now() - t0) / 60000).toFixed(1)} min`);
    if (done % 10 === 0) writeOut(matches, unresolved);
  }
  writeOut(matches, unresolved);
  if (failed.length) console.log(`${failed.length} request(s) failed and are not cached; run again to fill them:\n  ${failed.join("\n  ")}`);
}

/** Assemble the JSON from the cache: every town whose requests are all cached. */
function writeOut(matches: Map<string, Match>, unresolved: Match[]) {
  const towns: Record<string, unknown> = {};
  let complete = 0;
  let poor = 0;
  for (const e of TABLE) {
    const p = e.place;
    const tot = cached<Gbif>(join(CACHE, "occ", p.slug, "_total.json"));
    if (!tot) continue;
    const species: Record<string, { n: number; byMonth: number[] }> = {};
    let ok = true;
    for (const s of candidates(p)) {
      const m = matches.get(s.slug)!;
      if (m.status !== "ok") continue;
      const hit = cached<Gbif>(join(CACHE, "occ", p.slug, `${s.slug}.json`));
      if (!hit) {
        ok = false;
        break;
      }
      const o = readOcc(hit);
      if (o.count > 0) species[s.slug] = { n: o.count, byMonth: o.byMonth };
    }
    if (!ok) continue;
    const b = box(p.lat, p.lon);
    const dataPoor = (tot.count as number) < DATA_POOR_BELOW;
    complete++;
    if (dataPoor) poor++;
    towns[p.slug] = { total: tot.count, dataPoor, box: [b.minLat, b.maxLat, b.minLon, b.maxLon], species };
  }
  const taxa: Record<string, unknown> = {};
  for (const m of matches.values()) if (m.status === "ok") taxa[m.slug] = { names: m.names, keys: m.keys, rank: m.rank };
  const json = {
    meta: {
      source: "GBIF occurrence search (api.gbif.org/v1/occurrence/search), all datasets; iNaturalist research-grade observations dominate",
      built: new Date().toISOString().slice(0, 10),
      boxHalfKm: BOX_HALF_KM,
      boxNote: "a box of +/- boxHalfKm of latitude and of longitude (scaled by cos latitude) around the town: about 100 km square",
      filters: `hasCoordinate=true, hasGeospatialIssue=false, occurrenceStatus=PRESENT, year>=${YEAR_FROM}, facet=month`,
      dataPoorBelow: DATA_POOR_BELOW,
      dataPoorRule: "a town is dataPoor when GBIF holds fewer than dataPoorBelow plant + fungi records (kingdomKey 6, 5) in its box with the same filters",
      speciesMap: "per town, the library species admitted there by region, country and box rules with at least one record in the box: n records, byMonth = records by calendar month (Jan..Dec). A species admitted there but not listed has no record in the box. nearestKm is not collected.",
      towns: complete,
      dataPoorTowns: poor,
      unresolved: unresolved.map((m) => ({ slug: m.slug, names: m.names, note: m.note })),
    },
    taxa,
    towns,
  };
  save(OUT, json);
  if (!existsSync(OUT)) throw new Error("write failed");
  console.log(`  wrote ${OUT}: ${complete} towns (${poor} dataPoor)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
