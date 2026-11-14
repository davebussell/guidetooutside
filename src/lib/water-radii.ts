/**
 * How far the map look-up searches for each kind of named water, in km (src/lib/waters.ts queries with these, and the
 * overview's "nothing mapped" sentence quotes them).
 *
 * A module of its own, with no imports, so that a client component can quote the radii (Day 4 audit, 13 November 2026:
 * the restored client fishing page, GuideLoader.jsx, still printed "No named water is mapped within 20 km" because it
 * could not import place-profile's `waterLines`, which reached waters.ts and its server-only cache through this constant).
 */
export const WATER_RADII_KM = { river: 20, lake: 10, stream: 5 } as const;
