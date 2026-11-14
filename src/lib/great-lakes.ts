/**
 * How far a point is from the Great Lakes.
 *
 * Text about lake-effect weather, the lakes' own light and cloud, or "the
 * largest freshwater system on Earth" is true at a lakeshore and false a
 * hundred kilometres inland (Ottawa is 146 km from the nearest shore, Lake
 * Ontario at Kingston), so it is printed only within NEAR_GREAT_LAKE_KM of a
 * shore. The distance is a working rule, not a published one, so it is kept
 * short: the shore effects the text names (a lake breeze, the far shore, the
 * lakes' own cloud and light) belong to the shore itself. Lake-effect snow
 * reaches farther, into snowbelts such as London, Ontario (37 km) and Grand
 * Rapids (45 km), and those towns lose the lake text rather than carry a
 * distance nobody has cited.
 *
 * The shore is src/data/great-lakes-shore.json: the outlines of Lakes
 * Superior, Michigan, Huron (with Georgian Bay), Erie, Ontario and Saint Clair
 * from Natural Earth's 1:10 m lakes (public domain), simplified to within 2 km
 * by scripts/build-great-lakes-shore.ts. The distance is to the nearest point
 * of a shoreline segment on the sphere (not to the nearest vertex), in km.
 *
 * Lake Saint Clair is in the file but not counted: it averages about 3.4 m
 * deep, too shallow to hold a thermocline or to make the far-shore and
 * lake-effect weather the text describes, and it alone put Detroit and Windsor,
 * on the Detroit River, inside the rule (the 5 Nov 2026 audit).
 *
 * Server-side: the file is some 18 KB, so keep this out of client bundles.
 */
import shore from "@/data/great-lakes-shore.json";

/** A place within this distance of a Great Lake shore gets the lakes' text. */
export const NEAR_GREAT_LAKE_KM = 25;

/** Rings in the shore file that do not count as a Great Lake for the text (see above). */
const NOT_COUNTED = new Set(["Lake Saint Clair"]);

const RAD = Math.PI / 180;
const EARTH_KM = 6371.0088;

type V = [number, number, number];
type Ring = { a: V[]; n: (V | null)[] };

const unit = (lat: number, lon: number): V => {
  const c = Math.cos(lat * RAD);
  return [c * Math.cos(lon * RAD), c * Math.sin(lon * RAD), Math.sin(lat * RAD)];
};
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V): V => {
  const l = Math.hypot(a[0], a[1], a[2]);
  return [a[0] / l, a[1] / l, a[2] / l];
};
/** Angle (radians) between two unit vectors. */
const angle = (a: V, b: V) => Math.atan2(Math.hypot(...cross(a, b)), dot(a, b));

let RINGS: Ring[] | null = null;
function rings(): Ring[] {
  if (RINGS) return RINGS;
  const all = (shore as unknown as { rings: { name: string; pts: [number, number][] }[] }).rings;
  RINGS = all.filter((r) => !NOT_COUNTED.has(r.name)).map((r) => {
    const a = r.pts.map(([lat, lon]) => unit(lat, lon));
    // The unit normal of each closed ring's edge i -> i+1.
    const n = a.map((p, i) => {
      const q = a[(i + 1) % a.length];
      const c = cross(p, q);
      return Math.hypot(...c) < 1e-12 ? null : norm(c);
    });
    return { a, n };
  });
  return RINGS;
}

/** Great-circle distance (km) from p to the segment a-b, whose plane has unit normal n (null for a zero-length edge). */
function toSegment(p: V, a: V, b: V, n: V | null): number {
  if (n) {
    const h = dot(p, n);
    // The foot of the perpendicular on the great circle, and whether it lies between a and b.
    const foot = norm([p[0] - h * n[0], p[1] - h * n[1], p[2] - h * n[2]]);
    if (dot(cross(a, foot), n) >= 0 && dot(cross(foot, b), n) >= 0) return Math.abs(Math.asin(Math.max(-1, Math.min(1, h)))) * EARTH_KM;
  }
  return Math.min(angle(p, a), angle(p, b)) * EARTH_KM;
}

/** Distance in km from (lat, lon) to the nearest shoreline of the five Great Lakes (Georgian Bay with Huron); 0 on the shore. */
export function greatLakesDistanceKm(lat: number, lon: number): number {
  const p = unit(lat, lon);
  let best = Infinity;
  for (const r of rings()) {
    for (let i = 0; i < r.a.length; i++) {
      const d = toSegment(p, r.a[i], r.a[(i + 1) % r.a.length], r.n[i]);
      if (d < best) best = d;
    }
  }
  return best;
}

/** Whether a place is near enough a Great Lake for the lakes' own weather and light to be printed under its name. */
export const nearGreatLake = (lat: number, lon: number): boolean => greatLakesDistanceKm(lat, lon) <= NEAR_GREAT_LAKE_KM;
