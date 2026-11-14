/**
 * The facts about a town that decide which region prose holds there
 * (src/lib/where.ts `PlaceFacts`): the Great Lakes shore, the leaf-on season,
 * the open coast and tidal water (src/lib/water-setting), named waters and
 * ranges, the coastal plain and species ranges (src/data/scope-places), the
 * fish recorded near the town this month (src/lib/fish-presence), the season,
 * the sun's solstice heights here, the town's state or province, its frost
 * nights a year, the kinds of water its fishing page lists each fish in, and
 * the town's own normals (high, low, rain) for the month.
 *
 * Audit of 10 November 2026: the region text was printed as the town's own
 * fact everywhere but at the Great Lakes shore. Each fact here comes from the
 * site's own geography or from a sourced entry in src/data/scope-places.ts.
 *
 * Server-only: water-setting reads the 0.05° water grid.
 */
import { BOXES, FALL_LINE, FALL_LINE_KM, NEAR, type BoxId, type LatLon, type NearId } from "@/data/scope-places";
import { waterSetting } from "./water-setting";
import { nearGreatLake } from "./great-lakes";
import { leafOn } from "./leaf-on";
import { monthsRecorded, presentFish } from "./fish-presence";
import type { PlaceFacts } from "./where";
import type { Climate } from "./types";

export type AreaId = BoxId | "atlantic-coastal-plain" | "fall-line" | "gopher-tortoise-range" | "water-tupelo-range";

const RAD = Math.PI / 180;
/** Great-circle distance in km. */
export function kmBetween(a: LatLon, b: LatLon): number {
  const dLat = (b[0] - a[0]) * RAD;
  const dLon = (b[1] - a[1]) * RAD;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * RAD) * Math.cos(b[0] * RAD) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371.0088 * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** The named waters and ranges whose reach takes in (lat, lon). */
export function nearAt(lat: number, lon: number): NearId[] {
  return (Object.keys(NEAR) as NearId[]).filter((id) => NEAR[id].pts.some((p) => kmBetween([lat, lon], p) <= NEAR[id].km));
}

/**
 * The fall line at (lat, lon): the distance to it in km, and whether the town lies on its south-east (coastal plain)
 * side. Worked on a flat projection about the town (the line runs within a few hundred km of every town that asks).
 * A town whose nearest point is one of the line's two ends lies beyond it (New York, Boston; Mississippi and
 * Louisiana): `coastalPlain` is then false, since the line says nothing there.
 */
export function fallLineAt(lat: number, lon: number): { km: number; coastalPlain: boolean } {
  const kx = 111.32 * Math.cos(lat * RAD);
  const ky = 110.57;
  const xy = ([a, b]: LatLon) => [(b - lon) * kx, (a - lat) * ky] as const;
  let best = { km: Infinity, cross: 0, end: false };
  for (let i = 0; i < FALL_LINE.length - 1; i++) {
    const [ax, ay] = xy(FALL_LINE[i]);
    const [bx, by] = xy(FALL_LINE[i + 1]);
    const dx = bx - ax;
    const dy = by - ay;
    const t = Math.max(0, Math.min(1, (-ax * dx - ay * dy) / (dx * dx + dy * dy)));
    const d = Math.hypot(ax + t * dx, ay + t * dy);
    if (d < best.km) {
      // The line runs north-east to south-west, so the south-east side is on the left: a positive cross product.
      const cross = dx * -ay - dy * -ax;
      const end = (i === 0 && t === 0) || (i === FALL_LINE.length - 2 && t === 1);
      best = { km: d, cross, end };
    }
  }
  // The side test means nothing far from the line (a flat projection from Cape Town puts it on the "south-east"): only
  // the Atlantic and eastern Gulf seaboard, Florida included, is asked.
  const seaboard = lat >= 24 && lat <= 41 && lon >= -88 && lon <= -70;
  return { km: best.km, coastalPlain: seaboard && !best.end && best.cross > 0 };
}

const inBoxes = (id: BoxId, lat: number, lon: number) => BOXES[id].boxes.some((b) => lat >= b.minLat && lat <= b.maxLat && lon >= b.minLon && lon <= b.maxLon);

/** The areas (lat, lon) lies in. */
export function areasAt(lat: number, lon: number): AreaId[] {
  const out: AreaId[] = (Object.keys(BOXES) as BoxId[]).filter((id) => inBoxes(id, lat, lon));
  const fl = fallLineAt(lat, lon);
  if (fl.coastalPlain) out.push("atlantic-coastal-plain");
  if (fl.km <= FALL_LINE_KM) out.push("fall-line");
  // The gopher tortoise: the coastal plain of the six states (scope-places "gopher-tortoise-states").
  if (fl.coastalPlain && inBoxes("gopher-tortoise-states", lat, lon)) out.push("gopher-tortoise-range");
  // Water tupelo: the Atlantic coastal plain from south-eastern Virginia to the Georgia coast, and the Gulf and the
  // Mississippi valley west of 87.5° W (scope-places "water-tupelo-west"); not peninsular Florida.
  if ((fl.coastalPlain && lat <= 37.2 && lat >= 30.7) || inBoxes("water-tupelo-west", lat, lon)) out.push("water-tupelo-range");
  return out;
}

/** The sun's noon height at the June and December solstices, in whole degrees (the summer one first, either hemisphere). */
export function solsticeNoon(lat: number): { summer: number; winter: number } {
  const a = Math.abs(lat);
  return { summer: Math.round(90 - Math.abs(a - 23.44)), winter: Math.round(90 - (a + 23.44)) };
}

type Fixed = Omit<PlaceFacts, "leaf" | "fishNow" | "month" | "sowing">;
const FIXED = new Map<string, Fixed>();

/** The facts that do not change with the date, worked out once per place. */
function fixedFacts(lat: number, lon: number): Fixed {
  const key = `${lat},${lon}`;
  const hit = FIXED.get(key);
  if (hit) return hit;
  // coast, tidal and bigLake do not depend on the named waters or the climate.
  const w = waterSetting(lat, lon, []);
  const areas = areasAt(lat, lon);
  const micro = areas.includes("microtidal-seas");
  const sun = solsticeNoon(lat);
  const f: Fixed = {
    lake: nearGreatLake(lat, lon),
    coast: w.coast,
    tidal: !!w.tidal || (w.coast === "on" && !micro),
    salt: w.coast !== null || w.tidal?.kind === "estuary",
    near: nearAt(lat, lon),
    areas,
    bigLake: !!w.bigLake,
    bigRiver: w.bigRiver,
    south: lat < 0,
    noon: sun.summer,
    winterNoon: sun.winter,
  };
  FIXED.set(key, f);
  return f;
}

/** The fish recorded near a town with records in `month` (fish-presence: "recorded", and the month among those recorded). */
export function fishNowAt(slug: string | undefined, month: number): string[] {
  if (!slug) return [];
  const fish = presentFish(slug).fish;
  return Object.keys(fish).filter((k) => fish[k].status === "recorded" && !!monthsRecorded(fish[k])?.includes(month));
}

/**
 * The facts for a town. `date` is the town's local calendar date ("2026-11-10"); without it the season, the leaf-on
 * window and this month's fish are unknown, and prose that depends on them is dropped. `sowing` is whether a crop is
 * in its sowing window there today (src/lib/soil-sowing); unknown when left out.
 */
export function placeFacts(
  place: { lat: number; lon: number; slug?: string; admin1?: string },
  opts: { climate?: Climate | null; date?: string; sowing?: boolean; fishWaters?: Record<string, string[]> } = {},
): PlaceFacts {
  const fixed = fixedFacts(place.lat, place.lon);
  const month = opts.date ? Number(opts.date.slice(5, 7)) : undefined;
  // The town's own normals for its local month (calendar months, either hemisphere): stories that describe warmth or
  // rain are gated on them, not on a named season (audit of 13 November 2026).
  const c = opts.climate;
  const at = (xs: number[] | undefined) => (month !== undefined && xs && typeof xs[month - 1] === "number" ? xs[month - 1] : undefined);
  return {
    monthHigh: at(c?.monthlyMeanMax),
    monthLow: at(c?.monthlyMeanMin),
    monthRain: at(c?.monthlyRainMm),
    ...fixed,
    leaf: opts.date ? leafOn(opts.climate, opts.date, place.lat) : false,
    month,
    fishNow: month ? fishNowAt(place.slug, month) : undefined,
    sowing: opts.sowing,
    admin1: place.admin1,
    frostNights: typeof opts.climate?.frostDaysPerYear === "number" ? opts.climate.frostDaysPerYear : undefined,
    fishWaters: opts.fishWaters,
  };
}

/**
 * For each fish the fishing page lists in season today (its `fish` list, in a water the page does not mark to stay away
 * from), the kinds of water it is listed in: the same sections as /fishing/<town> (src/lib/fishing-waters `fishByWater`).
 * The Day page's fish lines that name a kind of water (walleye "on the shoals and weed edges", striped bass "through the
 * tide change") print only where the page lists the fish in that water (audit of 11 November 2026).
 */
export function fishWatersAt(sections: { id: string; fish: { slug: string }[]; avoid?: unknown }[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const s of sections) {
    if (s.avoid) continue;
    for (const f of s.fish) (out[f.slug] ??= []).push(s.id);
  }
  return out;
}
