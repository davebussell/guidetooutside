/**
 * Community gardens and allotments near each pre-built town, from
 * OpenStreetMap, written to src/data/place-gardens.json for the food panels
 * ("Community gardens near Ottawa"). A static file: pages never call Overpass
 * for this.
 *
 * For each of the towns in src/lib/known-places.json, one Overpass query for
 * the named features within 15 km of the town centre that are
 *   leisure=garden with garden:type=community, or with community_garden=* (not "no"),
 *   landuse=allotments, or garden:type=allotments,
 * keeping the ten nearest per town as
 *   { name, kind: "community" | "allotment", lat, lon, km, website?, operator?, osm: "way/123" }.
 * Features whose name is only the kind itself ("Allotments", "Community
 * Garden") are left out, and one garden mapped twice (a node and an area, or
 * an allotment split into parcels) is kept once, at its nearest point.
 *
 * Polite by design: one request at a time against the public endpoint, a
 * pause between towns, back-off and retry on 429, 5xx and dropped
 * connections, and a stop when the service keeps refusing (run it again
 * later: it resumes). The User-Agent is the site's own, with no address in it.
 * The file is written after every town, so an interrupted run loses nothing.
 *
 * With --sites, a second pass GETs each garden's website (one request per
 * host, a few hosts at a time) and keeps it only when it answers 200; a
 * garden without a working website links to its OpenStreetMap page instead.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias;
 * Node's fetch needs NODE_USE_ENV_PROXY=1 to use the proxy):
 *   npx esbuild scripts/fetch-place-gardens.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/fetch-place-gardens.mjs --log-level=warning \
 *     && NODE_USE_ENV_PROXY=1 node /tmp/fetch-place-gardens.mjs [flags]
 *
 * Flags:
 *   --only=slug[,slug]   just these towns (refetched even when present)
 *   --refresh            refetch every town (default: only the ones missing or failed)
 *   --limit=N            stop after N towns this run
 *   --pause=SECONDS      pause between towns (default 6)
 *   --sites              check the gardens' websites (after the Overpass pass, or alone with --sites-only)
 *   --sites-only         skip Overpass, check websites only
 *   --out=PATH           write somewhere else (default src/data/place-gardens.json)
 *   --endpoint=URL       another Overpass interpreter, only one whose coverage you have checked (default overpass-api.de)
 */
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import KNOWN from "../src/lib/known-places.json";
import { OSM_USER_AGENT } from "../src/lib/site";

type Kind = "community" | "allotment";
export type Garden = { name: string; kind: Kind; lat: number; lon: number; km: number; website?: string; operator?: string; osm: string };
export type GardensFile = {
  /** The date (UTC) the most recent town was fetched. */
  fetched: string | null;
  /** The date the websites were last checked, when they were. */
  sitesChecked?: string | null;
  source: string;
  radiusKm: number;
  /** Town slug → its gardens, nearest first; an empty list is a town fetched with none. */
  towns: Record<string, Garden[]>;
  /** Towns whose fetch failed on the last run. */
  failed: string[];
};

const DEFAULT_ENDPOINT = "https://overpass-api.de/api/interpreter";
const RADIUS_M = 15000;
const KEEP = 10;

// The site's own User-Agent, never with anyone's email in it.
const UA = `${OSM_USER_AGENT.replace(/\s*\([^)]*@[^)]*\)/g, "").trim()} (+https://guidetooutside.com; community gardens list)`;
if (UA.includes("@")) throw new Error("User-Agent must not carry an email address");

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const opt = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);

const OUT = resolve(opt("out") ?? "src/data/place-gardens.json");
/** The public endpoint; another only when it carries the whole planet and is current (check its status and a known garden first). */
const ENDPOINT = opt("endpoint") ?? DEFAULT_ENDPOINT;
/** --from-blobs: read each town's raw Overpass answer that netlify/functions/overpass-gardens-background.mts stored (needs NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID). */
const FROM_BLOBS = flag("from-blobs");
/**
 * --qlever: one query to the QLever OpenStreetMap SPARQL endpoint (University of Freiburg,
 * https://qlever.dev/osm-planet) for every named community garden and allotment on the planet,
 * the same tag rules as the Overpass query, centroids computed there; each town then takes the
 * ones within the radius. Used when the public Overpass servers refuse this workspace.
 */
const QLEVER = flag("qlever");
const PAUSE_S = FROM_BLOBS || flag("qlever") ? 0 : Number(opt("pause") ?? 6);
const LIMIT = opt("limit") ? Number(opt("limit")) : Infinity;
const ONLY = opt("only")?.split(",").filter(Boolean);

type Town = { slug: string; name: string; lat: number; lon: number };
const TOWNS = (KNOWN as Town[]).map(({ slug, name, lat, lon }) => ({ slug, name, lat, lon }));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);

function load(): GardensFile {
  if (existsSync(OUT)) {
    const f = JSON.parse(readFileSync(OUT, "utf8")) as GardensFile;
    return { fetched: f.fetched ?? null, sitesChecked: f.sitesChecked ?? null, source: f.source, radiusKm: f.radiusKm ?? RADIUS_M / 1000, towns: f.towns ?? {}, failed: f.failed ?? [] };
  }
  return { fetched: null, sitesChecked: null, source: "OpenStreetMap contributors, via the Overpass API", radiusKm: RADIUS_M / 1000, towns: {}, failed: [] };
}

/** Towns in the file's order (the known-places order), so diffs stay small. */
function save(f: GardensFile) {
  const towns: Record<string, Garden[]> = {};
  for (const t of TOWNS) if (f.towns[t.slug]) towns[t.slug] = f.towns[t.slug];
  const body = JSON.stringify({ ...f, towns, failed: [...new Set(f.failed)].sort() }, null, 1) + "\n";
  writeFileSync(`${OUT}.tmp`, body);
  renameSync(`${OUT}.tmp`, OUT);
}

function km(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Names that only say what the thing is. */
const GENERIC = new Set(
  [
    "allotment", "allotments", "allotment garden", "allotment gardens", "allotment site", "allotments site",
    "community garden", "community gardens", "garden", "gardens", "communal garden",
    "jardin communautaire", "jardins communautaires", "jardin collectif", "jardins collectifs", "jardin partage", "jardins partages",
    "jardins familiaux", "jardin familial", "jardins ouvriers",
    "kleingarten", "kleingarten anlage", "kleingartenanlage", "kleingartenverein", "schrebergarten", "schrebergaerten", "kleingaerten", "gemeinschaftsgarten",
    "volkstuin", "volkstuinen", "volkstuincomplex", "moestuin", "huerto urbano", "huertos urbanos", "huerto", "huertos", "orti urbani", "orto urbano", "orti", "horta", "hortas", "hortas urbanas",
    "kolonihave", "kolonihaver", "koloniträdgård", "koloniträdgårdar", "rod", "ogrody dzialkowe", "ogrodki dzialkowe", "zahradkarska kolonie", "kertek",
  ].map(fold),
);

function websiteOf(tags: Record<string, string>): string | undefined {
  const raw = (tags.website || tags["contact:website"] || tags.url || "").split(";")[0].trim();
  if (!raw) return undefined;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(raw) ? `https://${raw}` : "";
  try {
    const u = new URL(withScheme);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

type El = { type: "node" | "way" | "relation"; id: number; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> };

function query(lat: number, lon: number): string {
  // A bounding box around the town (the radius is applied afterwards in toGardens): far cheaper for
  // the Overpass servers than several around() filters, and every clause is anchored on a tag value.
  const dLat = RADIUS_M / 111_320;
  const dLon = RADIUS_M / (111_320 * Math.cos((lat * Math.PI) / 180));
  const bb = [lat - dLat, lon - dLon, lat + dLat, lon + dLon].map((x) => x.toFixed(5)).join(",");
  return `[out:json][timeout:60][bbox:${bb}];
(
  nwr["leisure"="garden"]["garden:type"="community"]["name"];
  nwr["leisure"="garden"]["community_garden"]["community_garden"!="no"]["name"];
  nwr["landuse"="allotments"]["name"];
  nwr["leisure"="garden"]["garden:type"="allotments"]["name"];
);
out tags center;`;
}

function toGardens(town: Town, els: El[]): Garden[] {
  const all: Garden[] = [];
  for (const el of els) {
    const t = el.tags ?? {};
    // The English name where the map has one (the site is in English), else the name as signed.
    const name = (t["name:en"] || t.name || "").trim();
    if (!name || GENERIC.has(fold(name)) || !/[\p{L}]/u.test(name)) continue;
    // Not a garden's name: plot labels ("Bed H01"), plain descriptions ("vegetable garden", "rose garden"),
    // and the names of private garden features that the allotment tags sometimes catch.
    if (/^(bed|plot|parcel|lot)\s*[a-z]?\d+$/i.test(name) || /^(community\s+)?(vegetable|veggie|food|kitchen|rose|herb|flower|school|demonstration)\s+gardens?$/i.test(name)) continue;
    const c = el.center ?? (el.lat != null && el.lon != null ? { lat: el.lat, lon: el.lon } : null);
    if (!c) continue;
    const d = km(town.lat, town.lon, c.lat, c.lon);
    if (d > RADIUS_M / 1000 + 0.05) continue;
    const allotment = t.landuse === "allotments" || /allotment/.test(t["garden:type"] ?? "");
    const website = websiteOf(t);
    const operator = (t.operator ?? "").trim();
    all.push({
      name,
      kind: allotment ? "allotment" : "community",
      lat: Math.round(c.lat * 1e5) / 1e5,
      lon: Math.round(c.lon * 1e5) / 1e5,
      km: Math.round(d * 10) / 10,
      ...(website ? { website } : {}),
      ...(operator && operator.length <= 120 ? { operator } : {}),
      osm: `${el.type}/${el.id}`,
    });
  }
  all.sort((a, b) => a.km - b.km || a.name.localeCompare(b.name));
  // One garden mapped twice (or split into parcels) is kept once: the same name within 2 km.
  const kept: Garden[] = [];
  for (const g of all) {
    const twin = kept.find((k) => fold(k.name) === fold(g.name) && km(k.lat, k.lon, g.lat, g.lon) < 2);
    if (twin) {
      if (!twin.website && g.website) twin.website = g.website;
      if (!twin.operator && g.operator) twin.operator = g.operator;
      continue;
    }
    kept.push(g);
  }
  return kept.slice(0, KEEP);
}

class Refused extends Error {
  constructor(
    public status: number,
    public retryAfter: number | null,
  ) {
    super(`overpass ${status}`);
  }
}

async function overpass(q: string): Promise<El[]> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({ data: q }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) {
    const ra = Number(res.headers.get("retry-after"));
    throw new Refused(res.status, Number.isFinite(ra) && ra > 0 ? ra : null);
  }
  const text = await res.text();
  const j = JSON.parse(text) as { elements?: El[]; remark?: string };
  // A query that ran out of time or memory says so in `remark` and returns what it had: treat it as a failure.
  if (j.remark && /runtime error|timed out|out of memory/i.test(j.remark)) throw new Refused(504, null);
  return j.elements ?? [];
}

/** One town, with back-off: 429 → Retry-After or 60 s, doubling; 5xx and dropped connections → 30 s, doubling. */
const QLEVER_ENDPOINT = "https://qlever.dev/api/osm-planet";
const QLEVER_QUERY = `PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
SELECT ?osm ?name ?nameen ?web ?cweb ?url ?op ?landuse ?gtype (geof:centroid(?g) AS ?c) WHERE {
  { ?osm osmkey:leisure "garden" ; osmkey:garden:type "community" . }
  UNION { ?osm osmkey:leisure "garden" ; osmkey:community_garden ?cg . FILTER(?cg != "no") }
  UNION { ?osm osmkey:landuse "allotments" . }
  UNION { ?osm osmkey:leisure "garden" ; osmkey:garden:type "allotments" . }
  ?osm osmkey:name ?name ; geo:hasGeometry/geo:asWKT ?g .
  OPTIONAL { ?osm osmkey:name:en ?nameen }
  OPTIONAL { ?osm osmkey:website ?web }
  OPTIONAL { ?osm osmkey:contact:website ?cweb }
  OPTIONAL { ?osm osmkey:url ?url }
  OPTIONAL { ?osm osmkey:operator ?op }
  OPTIONAL { ?osm osmkey:landuse ?landuse }
  OPTIONAL { ?osm osmkey:garden:type ?gtype }
}`;

let planet: El[] | null = null;
/** Every candidate on the planet, once, as Overpass-shaped elements. */
async function loadPlanet(): Promise<El[]> {
  if (planet) return planet;
  console.log("QLever: fetching every named community garden and allotment …");
  const res = await fetch(`${QLEVER_ENDPOINT}?query=${encodeURIComponent(QLEVER_QUERY)}`, {
    headers: { "User-Agent": UA, Accept: "application/sparql-results+json" },
    signal: AbortSignal.timeout(300_000),
  });
  if (!res.ok) throw new Error(`qlever ${res.status}`);
  const j = (await res.json()) as { results: { bindings: Record<string, { value: string }>[] } };
  const byId = new Map<string, El>();
  for (const b of j.results.bindings) {
    const m = /openstreetmap\.org\/(node|way|relation)\/(\d+)/.exec(b.osm?.value ?? "");
    const pt = /POINT\(([-\d.]+) ([-\d.]+)\)/.exec(b.c?.value ?? "");
    if (!m || !pt) continue;
    const key = `${m[1]}/${m[2]}`;
    const tags: Record<string, string> = { name: b.name.value };
    if (b.nameen) tags["name:en"] = b.nameen.value;
    if (b.web) tags.website = b.web.value;
    if (b.cweb) tags["contact:website"] = b.cweb.value;
    if (b.url) tags.url = b.url.value;
    if (b.op) tags.operator = b.op.value;
    if (b.landuse) tags.landuse = b.landuse.value;
    if (b.gtype) tags["garden:type"] = b.gtype.value;
    const prev = byId.get(key);
    if (prev) Object.assign(prev.tags!, tags);
    else byId.set(key, { type: m[1] as El["type"], id: Number(m[2]), center: { lat: Number(pt[2]), lon: Number(pt[1]) }, tags });
  }
  planet = [...byId.values()];
  console.log(`QLever: ${planet.length} candidates`);
  return planet;
}

async function fromQlever(town: Town): Promise<Garden[]> {
  const all = await loadPlanet();
  const near = all.filter((e) => e.center && Math.abs(e.center.lat - town.lat) < 0.2 && Math.abs(e.center.lon - town.lon) < 0.4);
  return toGardens(town, near);
}

let rawStore: { get(key: string, o: { type: "json" }): Promise<unknown> } | null = null;
async function fromBlobs(town: Town): Promise<Garden[]> {
  if (!rawStore) {
    const { getStore } = await import("@netlify/blobs");
    rawStore = getStore({ name: "guides", siteID: process.env.NETLIFY_SITE_ID!, token: process.env.NETLIFY_AUTH_TOKEN! }) as unknown as typeof rawStore;
  }
  const raw = (await rawStore!.get(`gardens-raw:v1:${town.slug}`, { type: "json" })) as { elements?: El[] } | null;
  if (!raw?.elements) throw new Error("no stored answer");
  return toGardens(town, raw.elements);
}

async function fetchTown(town: Town): Promise<Garden[]> {
  if (FROM_BLOBS) return fromBlobs(town);
  if (QLEVER) return fromQlever(town);
  const delays = [30, 60, 120, 240];
  for (let attempt = 0; ; attempt++) {
    try {
      return toGardens(town, await overpass(query(town.lat, town.lon)));
    } catch (e) {
      const status = e instanceof Refused ? e.status : 0;
      const retryable = status === 0 || status === 429 || status >= 500;
      if (!retryable || attempt >= delays.length) throw e;
      const wait = e instanceof Refused && e.retryAfter ? Math.min(600, e.retryAfter) : status === 429 ? delays[attempt] * 2 : delays[attempt];
      console.log(`  ${town.slug}: ${status || (e as Error).message} — waiting ${wait}s (attempt ${attempt + 2} of ${delays.length + 1})`);
      await sleep(wait * 1000);
    }
  }
}

async function overpassPass(f: GardensFile) {
  const want = ONLY ? TOWNS.filter((t) => ONLY.includes(t.slug)) : flag("refresh") ? TOWNS : TOWNS.filter((t) => !f.towns[t.slug] || f.failed.includes(t.slug));
  console.log(`Overpass (${ENDPOINT}): ${want.length} town(s) to fetch, ${Object.keys(f.towns).length} already in the file; pause ${PAUSE_S}s; UA "${UA}"`);
  let done = 0;
  let streak = 0;
  for (const town of want) {
    if (done >= LIMIT) break;
    const t0 = Date.now();
    try {
      const gardens = await fetchTown(town);
      f.towns[town.slug] = gardens;
      f.failed = f.failed.filter((s) => s !== town.slug);
      f.fetched = today();
      streak = 0;
      console.log(`${String(++done).padStart(3)} ${town.slug}: ${gardens.length} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
    } catch (e) {
      if (!f.failed.includes(town.slug)) f.failed.push(town.slug);
      streak++;
      done++;
      console.log(`${String(done).padStart(3)} ${town.slug}: FAILED (${(e as Error).message})`);
      if (streak >= 4 && !FROM_BLOBS && !QLEVER) {
        save(f);
        console.log("Four towns in a row failed after retries: the service is refusing or down. Stopping; run again later to resume.");
        process.exitCode = 2;
        return;
      }
    }
    save(f);
    await sleep(PAUSE_S * 1000);
  }
}

/** GET a site the way a browser would ask, following redirects; the final status. */
async function status(url: string): Promise<number> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,*/*;q=0.8" }, redirect: "follow", signal: AbortSignal.timeout(20_000) });
    await res.body?.cancel().catch(() => {});
    return res.status;
  } catch {
    return 0;
  }
}

/** Keep a garden's website only when it answers 200; one request per host, four hosts at a time. */
async function sitesPass(f: GardensFile) {
  const byUrl = new Map<string, Garden[]>();
  for (const list of Object.values(f.towns)) for (const g of list) if (g.website) byUrl.set(g.website, [...(byUrl.get(g.website) ?? []), g]);
  const byHost = new Map<string, string[]>();
  for (const u of byUrl.keys()) {
    const h = new URL(u).hostname;
    byHost.set(h, [...(byHost.get(h) ?? []), u]);
  }
  const hosts = [...byHost.keys()];
  console.log(`Websites: ${byUrl.size} URL(s) on ${hosts.length} host(s)`);
  let dropped = 0;
  const worker = async () => {
    for (let h = hosts.shift(); h; h = hosts.shift()) {
      for (const u of byHost.get(h)!) {
        const s = await status(u);
        if (s !== 200) {
          dropped++;
          console.log(`  ${s || "no answer"} ${u} — linking OpenStreetMap instead`);
          for (const g of byUrl.get(u)!) delete g.website;
        }
        await sleep(1000);
      }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  f.sitesChecked = today();
  save(f);
  console.log(`Websites: kept ${byUrl.size - dropped}, dropped ${dropped}`);
}

async function main() {
  const f = load();
  if (!flag("sites-only")) await overpassPass(f);
  if ((flag("sites") || flag("sites-only")) && process.exitCode !== 2) await sitesPass(f);
  save(f);
  const towns = Object.values(f.towns);
  console.log(`\n${Object.keys(f.towns).length} of ${TOWNS.length} towns fetched; ${towns.filter((l) => l.length).length} with at least one garden; ${towns.reduce((n, l) => n + l.length, 0)} gardens; failed: ${f.failed.join(", ") || "none"}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
