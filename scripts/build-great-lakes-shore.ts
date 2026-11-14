/**
 * Builds src/data/great-lakes-shore.json: the shoreline of the five Great
 * Lakes and Lake St. Clair as a short list of points, for
 * greatLakesDistanceKm() in src/lib/great-lakes.ts.
 *
 * Source: Natural Earth, "Lakes + Reservoirs" at 1:10 m (ne_10m_lakes), public
 * domain — https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-lakes/
 * (GeoJSON copy: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_lakes.geojson).
 * The features kept are the polygons named Lake Superior, Lake Michigan, Lake
 * Huron, Georgian Bay (the Lake Huron basin's eastern arm, a separate polygon
 * in Natural Earth), Lake Erie, Lake Ontario and Lake Saint Clair. Each
 * polygon's outer ring is the shore of the mainland; its inner rings are
 * islands, kept when they are large enough to be a place (Manitoulin, Isle
 * Royale, Beaver, Pelee, Wolfe...: bounding box over ISLAND_MIN_KM).
 *
 * Natural Earth's Lake Ontario polygon carries on down the St. Lawrence River
 * through the Thousand Islands to Brockville, which is river, not lake (the
 * lake ends at its outlet between Kingston and Cape Vincent), so vertices
 * north-east of that outlet (RIVER_REACH) and the islands in the river
 * (Howe, the Thousand Islands) are dropped, leaving a straight cut across the
 * outlet; without it Ottawa would read 102 km from "the lake" (a point on the
 * river at Brockville) instead of about 140 km (Kingston, Wolfe Island). Lake
 * Erie's polygon does the same up the Detroit River, and is cut at its mouth.
 *
 * Each ring is simplified with Douglas-Peucker (planar, on a local
 * equirectangular projection) to TOLERANCE_KM; no point of the original
 * shoreline is then further than that from the simplified one, which the
 * script checks and prints. 2 km is far inside the 50 km question the site
 * asks of the file (lake-effect snow falls within roughly 40-50 km of a lake).
 *
 * Run (no tsx in this project; esbuild bundles it). Behind the agent proxy
 * Node's fetch does not use the proxy, so download the GeoJSON with curl and
 * pass it with --file:
 *
 *   curl -sS -A "guidetooutside-data-build/1.0" -o /tmp/ne_10m_lakes.geojson \
 *     https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_lakes.geojson
 *   npx esbuild scripts/build-great-lakes-shore.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/build-great-lakes-shore.mjs --log-level=warning \
 *     && node /tmp/build-great-lakes-shore.mjs --file /tmp/ne_10m_lakes.geojson
 *
 * Without --file the script fetches the same URL itself.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const URL_NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_lakes.geojson";
const OUT = path.join(process.cwd(), "src/data/great-lakes-shore.json");
const TOLERANCE_KM = 2;
const ISLAND_MIN_KM = 15;
const NAMES = ["Lake Superior", "Lake Michigan", "Lake Huron", "Georgian Bay", "Lake Erie", "Lake Ontario", "Lake Saint Clair"];
/**
 * Lake Ontario's polygon runs on down the St. Lawrence River from its outlet
 * between Kingston (44.25 N, 76.44 W) and Cape Vincent (44.13 N, 76.36 W):
 * outer-ring vertices north-east of that, and islands centred there, are river.
 */
const ST_LAWRENCE = (lat: number, lon: number) => lat > 44.2 && lon > -76.41;
/**
 * Lake Erie's polygon runs on up the Detroit River from its mouth between Bar Point (42.06 N, 83.11 W) and
 * Pointe Mouillee (42.03 N, 83.19 W) to the foot of Lake St. Clair at Detroit: vertices north of the mouth and
 * west of 83.0 W, and islands centred there (Grosse Ile, Fighting Island), are river. Without it Detroit read
 * 3.9 km from "Lake Erie", a point on the river at its own waterfront (5 Nov 2026 audit).
 */
const DETROIT_RIVER = (lat: number, lon: number) => lat > 42.05 && lon < -83.0 && lon > -83.3;
/** The river reach cut from each lake's polygon. */
const RIVER_REACH: Record<string, (lat: number, lon: number) => boolean> = { "Lake Ontario": ST_LAWRENCE, "Lake Erie": DETROIT_RIVER };
const R = 6371.0088;
const RAD = Math.PI / 180;

type Pt = [number, number]; // [lon, lat] in the source, [lat, lon] in the output
type Feature = { properties: { name?: string }; geometry: { type: string; coordinates: number[][][] | number[][][][] } };

/** Planar distance (km) of p from the segment a-b, on an equirectangular projection around a. */
function planarDist(p: Pt, a: Pt, b: Pt): number {
  const k = Math.cos(a[1] * RAD);
  const px = (p[0] - a[0]) * RAD * R * k;
  const py = (p[1] - a[1]) * RAD * R;
  const bx = (b[0] - a[0]) * RAD * R * k;
  const by = (b[1] - a[1]) * RAD * R;
  const len2 = bx * bx + by * by;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, (px * bx + py * by) / len2));
  return Math.hypot(px - t * bx, py - t * by);
}

/** Douglas-Peucker on an open polyline; returns the kept indices. */
function dp(pts: Pt[], tol: number): number[] {
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const stack: [number, number][] = [[0, pts.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop()!;
    let worst = -1;
    let at = -1;
    for (let m = i + 1; m < j; m++) {
      const d = planarDist(pts[m], pts[i], pts[j]);
      if (d > worst) {
        worst = d;
        at = m;
      }
    }
    if (worst > tol) {
      keep[at] = true;
      stack.push([i, at], [at, j]);
    }
  }
  return keep.flatMap((k, i) => (k ? [i] : []));
}

/** A closed ring simplified: split at the point furthest from the first so the closing edge is simplified too. */
function simplifyRing(ring: Pt[], tol: number): Pt[] {
  const pts = ring.slice(0, -1); // drop the repeated closing point
  let far = 0;
  let best = -1;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot((pts[i][0] - pts[0][0]) * Math.cos(pts[0][1] * RAD), pts[i][1] - pts[0][1]);
    if (d > best) {
      best = d;
      far = i;
    }
  }
  const a = pts.slice(0, far + 1);
  const b = [...pts.slice(far), pts[0]];
  const ka = dp(a, tol).map((i) => a[i]);
  const kb = dp(b, tol).map((i) => b[i]);
  return [...ka, ...kb.slice(1, -1)];
}

/** Largest distance (km) of any original vertex from the simplified closed ring. */
function maxDeviation(orig: Pt[], simp: Pt[]): number {
  let worst = 0;
  for (const p of orig) {
    let best = Infinity;
    for (let i = 0; i < simp.length; i++) best = Math.min(best, planarDist(p, simp[i], simp[(i + 1) % simp.length]));
    worst = Math.max(worst, best);
  }
  return worst;
}

function bboxKm(ring: Pt[]): number {
  const lons = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2;
  return Math.hypot((Math.max(...lons) - Math.min(...lons)) * RAD * R * Math.cos(lat0 * RAD), (Math.max(...lats) - Math.min(...lats)) * RAD * R);
}

const round4 = (x: number) => Math.round(x * 1e4) / 1e4;

async function main() {
  const fileArg = process.argv.indexOf("--file");
  const text = fileArg > 0 ? await readFile(process.argv[fileArg + 1], "utf8") : await (await fetch(URL_NE, { headers: { "User-Agent": "guidetooutside-data-build/1.0" } })).text();
  const features = (JSON.parse(text) as { features: Feature[] }).features;
  const rings: { name: string; island?: true; pts: [number, number][] }[] = [];
  let before = 0;
  for (const name of NAMES) {
    const f = features.find((x) => x.properties.name === name);
    if (!f) throw new Error(`${name} not in the file`);
    const polys = (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates) as number[][][][];
    for (const poly of polys) {
      poly.forEach((ring, k) => {
        let r = ring as unknown as Pt[];
        if (k > 0 && bboxKm(r) < ISLAND_MIN_KM) return;
        const river = RIVER_REACH[name];
        if (river) {
          if (k > 0) {
            const c = r.reduce((a, p) => [a[0] + p[0] / r.length, a[1] + p[1] / r.length], [0, 0]);
            if (river(c[1], c[0])) return;
          } else {
            const open = r.slice(0, -1).filter((p) => !river(p[1], p[0]));
            r = [...open, open[0]];
          }
        }
        const simp = simplifyRing(r, TOLERANCE_KM);
        before += r.length;
        const dev = maxDeviation(r, simp);
        if (dev > TOLERANCE_KM + 0.05) throw new Error(`${name} ring ${k}: deviation ${dev.toFixed(2)} km`);
        rings.push({ name, ...(k > 0 ? { island: true as const } : {}), pts: simp.map((p) => [round4(p[1]), round4(p[0])]) });
        console.log(`${name}${k > 0 ? " island" : ""}: ${r.length} -> ${simp.length} points, max deviation ${dev.toFixed(2)} km`);
      });
    }
  }
  const total = rings.reduce((n, r) => n + r.pts.length, 0);
  const out = {
    source: "Natural Earth ne_10m_lakes (public domain), naturalearthdata.com; scripts/build-great-lakes-shore.ts",
    toleranceKm: TOLERANCE_KM,
    note: "Shoreline rings of Lakes Superior, Michigan, Huron (with Georgian Bay), Erie, Ontario and Saint Clair as [lat, lon] points; island rings are marked.",
    rings: rings.map((r) => ({ name: r.name, ...(r.island ? { island: true } : {}), pts: r.pts })),
  };
  // One ring per line keeps the file small and a diff readable.
  const body = `{\n"source":${JSON.stringify(out.source)},\n"toleranceKm":${out.toleranceKm},\n"note":${JSON.stringify(out.note)},\n"rings":[\n${out.rings.map((r) => JSON.stringify(r)).join(",\n")}\n]\n}\n`;
  await writeFile(OUT, body);
  console.log(`\n${rings.length} rings, ${before} -> ${total} points, ${(body.length / 1024).toFixed(0)} KB -> ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
