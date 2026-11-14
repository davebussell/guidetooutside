/**
 * Named waters near a place, from OpenStreetMap (Overpass): lakes,
 * reservoirs, rivers and streams, nearest first. Cached a year under
 * `waters:v3:<lat2>:<lon2>`.
 *
 * Audit, 5 November 2026: the query ended "out tags center 60", which keeps the first 60 features in id order, not the
 * nearest, so the town's main river or lake was missing in nine of ten Great Plains towns (the Red at Fargo, the Trinity
 * at Dallas, the Kansas at Kansas City). A river is mapped as many ways, and the first way seen gave its distance. Now
 * every feature is read, each name takes its nearest way, and the list keeps every named river within reach before
 * filling with lakes and streams. v2 entries (which cached the cut lists for a year) are no longer read.
 *
 * Audit, 10 November 2026: every one of the 17 big cities read (Boston, Philadelphia, Atlanta, Charlotte, Raleigh…)
 * came back with no named water at all. The query asked for every named water body and every named stream within
 * 20 km — thousands of ways in a city — and either ran out of the 12-second budget or hit Overpass's own timeout. An
 * Overpass timeout is not an error: it answers 200 with a "runtime error … timed out" remark and no elements, which was
 * taken as "no water here", cached for an hour, and printed as "No named water is mapped close by" at Atlanta,
 * Charlotte and Raleigh, all of which have rivers through them. Now:
 *  - the query is two small requests: named rivers within 20 km, and named lakes and reservoirs within 10 km with named
 *    streams within 5 km (`WATER_RADII_KM`); each uses a bounding box, which Overpass answers far faster than "around",
 *    and skips the water types that are plumbing (basins, wastewater, fountains, pools) on the server;
 *  - a remark that reports an error or a timeout is a failure, and so is a part cut short by its output limit;
 *  - a fetch that fails returns a list marked `unavailable` (`watersUnavailable`), never cached, so the page can say
 *    the map service did not answer instead of "no named water"; when only one part answers, what it found is used,
 *    cached for an hour only, and an empty partial answer counts as unavailable.
 * The cache key stays v3: the lists already stored are named waters, nearest first, from the same source.
 */
import { cacheGet, cacheSet } from "./cache";
import { OSM_USER_AGENT } from "./site";
import type { WaterBody } from "./types";
import { WATER_RADII_KM } from "./water-radii";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

type OsmElement = { tags?: Record<string, string>; center?: { lat: number; lon: number }; lat?: number; lon?: number };

/**
 * Water that is plumbing, not a fishery: storm-water and detention ponds, settling and aeration basins, culverts,
 * municipal drainage and irrigation ditches, fountains and model-boat ponds. The 5 Nov 2026 audit found "Settling
 * Basin" among Toronto's lakes, storm ponds at Fort McMurray and Calgary, and "Intercity drainage" first among
 * Thunder Bay's streams. "Drain" alone is kept: the fenland drains of England are fished; so is a lake or park that
 * is only named after a fountain (Fountain Lake). Day 3 audit (11 November 2026): a "Reflection Pool" is a reflecting pool
 * by another name (Houston listed one among its lakes).
 */
const INFRASTRUCTURE_NAME =
  /\b(storm\s*water|stormwater|storm (?:retention )?ponds?|detention|retention|settling|aeration|bioreactor|debris basin|culvert|drainage|ditch|sewage|wastewater|reflecting pool|reflection pool|model yacht)\b|\bfountains?\b(?!\s+(?:park|lake))|^pond \d+$/i;
const INFRASTRUCTURE_TAG: Record<string, RegExp> = {
  water: /^(wastewater|basin|reflecting_pool|fountain)$/,
  basin: /^(retention|detention|infiltration|settling|evaporation)$/,
  landuse: /^basin$/,
  man_made: /^(wastewater_plant|reservoir_covered)$/,
};
export function isInfrastructureWater(name: string, tags: Record<string, string> = {}): boolean {
  if (INFRASTRUCTURE_NAME.test(name)) return true;
  return Object.entries(INFRASTRUCTURE_TAG).some(([k, re]) => !!tags[k] && re.test(tags[k]));
}

/**
 * The waters to keep from an Overpass answer: one entry per name at the distance of its nearest way, every named river
 * (up to six), then the nearest lakes and reservoirs (up to six) and streams (up to four), nearest first.
 */
export function pickWaters(elements: OsmElement[], lat: number, lon: number): WaterBody[] {
  const byName = new Map<string, WaterBody>();
  for (const el of elements) {
    const name = el.tags?.name;
    if (!name || isInfrastructureWater(name, el.tags)) continue;
    const c = el.center ?? (el.lat != null && el.lon != null ? { lat: el.lat, lon: el.lon } : null);
    if (!c) continue;
    const water = el.tags?.water;
    const kind = el.tags?.waterway ? el.tags.waterway : water === "reservoir" ? "reservoir" : water === "river" ? "river" : "lake";
    const distanceKm = Math.round(haversine(lat, lon, c.lat, c.lon) * 10) / 10;
    const had = byName.get(name);
    // A river named on one way and a lake of the same name: the river wins, as the bigger feature.
    if (!had || (had.kind !== "river" && kind === "river") || (had.kind === kind && distanceKm < had.distanceKm)) byName.set(name, { name, kind, distanceKm });
  }
  const all = [...byName.values()].sort((a, b) => a.distanceKm - b.distanceKm);
  const take = (kinds: string[], n: number) => all.filter((w) => kinds.includes(w.kind)).slice(0, n);
  return [...take(["river"], 6), ...take(["lake", "reservoir"], 6), ...take(["stream"], 4)].sort((a, b) => a.distanceKm - b.distanceKm);
}

/** Both mirrors carry the whole planet and both want a real User-Agent. */
const ENDPOINTS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];

/** How far each kind of named water is looked for, in km (src/lib/water-radii.ts, which a client page can import). */
export { WATER_RADII_KM };

/** Output limits per request: far above any real town's count, so reaching one means the answer was cut short. */
const LIMIT = { rivers: 3000, still: 4000 } as const;

/** A list of named waters; `unavailable` when the map service did not answer, so nothing can be said either way. */
export type NearbyWaters = WaterBody[] & { unavailable?: true };

/** An empty list marked as "the map service did not answer". */
export const unavailableWaters = (): NearbyWaters => Object.assign([] as WaterBody[], { unavailable: true as const });

/** True when the list stands for a failed fetch, not for a place with no named water. */
export const watersUnavailable = (w: readonly WaterBody[] | null | undefined): boolean => !!w && (w as NearbyWaters).unavailable === true;

/** South, west, north, east of a square of half-side `km` around the point. */
function bbox(lat: number, lon: number, km: number): string {
  const dLat = km / 111.32;
  const dLon = km / (111.32 * Math.max(0.1, Math.cos((lat * Math.PI) / 180)));
  return [lat - dLat, lon - dLon, lat + dLat, lon + dLon].map((x) => x.toFixed(4)).join(",");
}

/** Water types that are plumbing, dropped on the server (isInfrastructureWater drops them again on the way out). */
const NOT_FISHING = "^(basin|wastewater|reflecting_pool|fountain|pool|swimming_pool)$";

/** The two Overpass queries: rivers, then still waters and streams. `timeoutS` is the server's own limit. */
export function watersQueries(lat: number, lon: number, timeoutS: number): { rivers: string; still: string } {
  const r = bbox(lat, lon, WATER_RADII_KM.river);
  const l = bbox(lat, lon, WATER_RADII_KM.lake);
  const st = bbox(lat, lon, WATER_RADII_KM.stream);
  return {
    rivers: `[out:json][timeout:${timeoutS}];way["waterway"="river"]["name"](${r});out tags center qt ${LIMIT.rivers};`,
    still: `[out:json][timeout:${timeoutS}];(way["natural"="water"]["name"]["water"!~"${NOT_FISHING}"](${l});relation["natural"="water"]["name"]["water"!~"${NOT_FISHING}"](${l});way["waterway"="stream"]["name"](${st}););out tags center qt ${LIMIT.still};`,
  };
}

/**
 * The elements of an Overpass answer, or an error when the answer is not a whole one: Overpass reports its own
 * timeouts and memory limits in `remark` with an HTTP 200, and an answer that reaches the output limit was cut short.
 */
export function overpassElements(j: { elements?: OsmElement[]; remark?: string }, limit: number): OsmElement[] {
  if (j.remark && /error|timed out|timeout|out of memory|too busy/i.test(j.remark)) throw new Error(`overpass remark: ${j.remark}`);
  const els = j.elements ?? [];
  if (els.length >= limit) throw new Error(`overpass answer cut at ${limit}`);
  return els;
}

/**
 * Named waters near a place, nearest first, or an `unavailable` list when the map service did not answer. Callers
 * that can afford to wait (a warm-up run) may ask for a longer budget.
 */
export async function getNearbyWaters(lat: number, lon: number, opts: { budgetMs?: number } = {}): Promise<NearbyWaters> {
  const { budgetMs = 12000 } = opts;
  const key = `waters:v3:${lat.toFixed(2)}:${lon.toFixed(2)}`;
  const hit = await cacheGet<WaterBody[]>(key);
  // Lists cached before the plumbing filter keep their year: the filter is applied on the way out.
  if (hit?.length) return hit.filter((w) => !isInfrastructureWater(w.name));
  // The server gives up a second before the page does, so a slow answer comes back as a remark, not an abort.
  const q = watersQueries(lat, lon, Math.max(5, Math.floor(budgetMs / 1000) - 1));

  const ask = async (endpoint: string, data: string, limit: number): Promise<OsmElement[]> => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "User-Agent": OSM_USER_AGENT, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ data }),
      signal: AbortSignal.timeout(budgetMs),
    });
    if (!res.ok) throw new Error(`overpass ${res.status}`);
    return overpassElements((await res.json()) as { elements?: OsmElement[]; remark?: string }, limit);
  };
  // Each part races both mirrors; first whole answer wins.
  const part = (data: string, limit: number) => Promise.any(ENDPOINTS.map((e) => ask(e, data, limit)));
  const [rivers, still] = await Promise.allSettled([part(q.rivers, LIMIT.rivers), part(q.still, LIMIT.still)]);
  const got = [rivers, still].filter((p): p is PromiseFulfilledResult<OsmElement[]> => p.status === "fulfilled");
  if (!got.length) return unavailableWaters();
  const waters = pickWaters(got.flatMap((p) => p.value), lat, lon);
  const whole = got.length === 2;
  // Half an answer with nothing in it says nothing about the place.
  if (!whole && !waters.length) return unavailableWaters();
  // A year for a whole answer, an hour for half of one; an empty whole answer is not stored, so the next visit asks again.
  if (waters.length) await cacheSet(key, waters, whole ? 365 * 24 * 3600 : 3600).catch(() => {});
  return waters;
}
