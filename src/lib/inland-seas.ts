/**
 * The inland seas (Day 5 audit, 14 November 2026), in a module of their own with no data import, so the client pages
 * (place-profile `waterLines`, used by the restored GuideLoader) can work the inland sea out for a water setting that
 * lacks it: the setting is serialised for the client, and a setting stored before 14 November 2026 has no `inlandSea`,
 * so Nanaimo, Vancouver, Victoria and Seattle still read "surf beaches" from one (place-profile fell back to the open
 * sea). water-setting.ts re-exports both.
 */

import type { WaterSetting } from "./water-setting";

type Box = { minLat: number; maxLat: number; minLon: number; maxLon: number };
const inBox = (b: Box, lat: number, lon: number) => lat >= b.minLat && lat <= b.maxLat && lon >= b.minLon && lon <= b.maxLon;
/** The same flat-earth distance as water-setting.ts, in km. */
const dist = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  const x = (d - b) * r * Math.cos(((a + c) / 2) * r);
  return Math.hypot(x, (c - a) * r) * 6371;
};

/**
 * Inland seas: salt water that Natural Earth draws as ocean and that is not the open sea (Day 5 audit, 14 November 2026).
 * Seattle, Vancouver, Nanaimo and Victoria read "the open sea, from beach, rock and boat", "The open coast, within about
 * 10 km", "surf beaches", "Sea coast" and "The sea is the main fishery". Their salt water is the Salish Sea, which "extends
 * from the north end of the Strait of Georgia to the south end of Puget Sound" and "west to the mouth of the Strait of Juan
 * de Fuca where it meets the Pacific Ocean" (US EPA); "Puget Sound is the largest estuary, by water volume, in the
 * contiguous United States" (Puget Sound Partnership). Worked out from coordinates, the mouth of the Strait of Juan de Fuca
 * (Cape Flattery, 48.38 N, 124.72 W) is about 100 km from Victoria and further from the other three towns.
 *
 * Unlike a tidal reach, the town still has salt-water shore within about 10 km (`coast` stays "on", so the rock, harbour
 * and boat fish of the Salish Sea, lingcod and the salmon, keep their section); the rule takes away what is false: the
 * words "open sea" and "open coast", and the surf beaches (the habitat is dropped). The box is the EPA's extent, from Puget
 * Sound's south end (about 47.0 N) to the north end of the Strait of Georgia (about 50.2 N) and west to the strait's mouth;
 * Vancouver Island's open Pacific shore (Tofino, 125.9 W; Ucluelet, 125.5 W) is west of it. `water` is the part the town
 * stands on, from the town's coordinates; the first whose circle holds the town is used (smallest first), else the Salish Sea.
 */
export type InlandSea = { water: string; says: string };
export const INLAND_SEAS: { box: Box; parts: { lat: number; lon: number; km: number; water: string; says: string }[]; water: string; says: string; source: string }[] = [
  {
    box: { minLat: 46.95, maxLat: 50.3, minLon: -124.75, maxLon: -122.0 },
    water: "the Salish Sea",
    says: "salt water that meets the open Pacific only at the mouth of the Strait of Juan de Fuca",
    parts: [
      // Victoria's shore is on the Strait of Juan de Fuca (EPA: one of the Salish Sea's three ecosystems).
      { lat: 48.3, lon: -123.6, km: 30, water: "the Strait of Juan de Fuca", says: "part of the Salish Sea, about 100 km in from where it meets the open Pacific" },
      // Vancouver and Nanaimo: the Strait of Georgia (EPA), into which Burrard Inlet and the Fraser open.
      { lat: 49.3, lon: -123.6, km: 90, water: "the Strait of Georgia", says: "part of the Salish Sea, which meets the open Pacific only at the mouth of the Strait of Juan de Fuca" },
      // Puget Sound: the PSP's "largest estuary, by water volume, in the contiguous United States". Its circle (about 110 km
      // round the main basin off Seattle) reaches south to Olympia and stops short of the Strait of Juan de Fuca's mouth.
      { lat: 47.6, lon: -122.45, km: 110, water: "Puget Sound", says: "an estuary of the Salish Sea, which meets the open Pacific only at the mouth of the Strait of Juan de Fuca" },
    ],
    source: "https://19january2025snapshot.epa.gov/salish-sea/executive-summary-health-salish-sea-report ; https://psp.wa.gov/NEP-puget-sound-estuary.php",
  },
];

/** The inland sea the town's salt water belongs to, where the grid calls the town coastal, with the part it stands on. */
export function inlandSeaAt(lat: number, lon: number): InlandSea | null {
  const s = INLAND_SEAS.find((x) => inBox(x.box, lat, lon));
  if (!s) return null;
  const p = s.parts.find((x) => dist(lat, lon, x.lat, x.lon) <= x.km);
  return p ? { water: p.water, says: p.says } : { water: s.water, says: s.says };
}

/**
 * A setting with its inland sea worked out where it lacks the field (settings stored before 14 November 2026): the
 * same rule as waterSetting (a coastal town not on a tidal reach, inside an INLAND_SEAS box), and the surf beaches
 * dropped with it. Day 5 audit: such a setting printed "The open sea, within about 10 km: surf beaches" at Nanaimo,
 * Vancouver, Victoria and Seattle.
 */
export function withInlandSea(w: WaterSetting, lat: number, lon: number): WaterSetting {
  if (w.inlandSea !== undefined) return w;
  const inlandSea = w.coast && !w.tidal ? inlandSeaAt(lat, lon) : null;
  if (!inlandSea) return { ...w, inlandSea };
  return { ...w, inlandSea, habitats: (w.habitats ?? []).filter((h) => h !== "surf") };
}
