import type { Place } from "./types";

/**
 * Towns whose 0.1° keys collide and so key on their slug instead. Detroit and Windsor, either side of the Detroit River,
 * shared one stored guide, so Detroit's pages printed "Fishing in Windsor" (audit, 5 November 2026). check-day.ts fails
 * if any other pair of towns shares a key.
 */
export const GUIDE_KEY_BY_SLUG = new Set(["detroit-michigan", "windsor-ontario"]);

/** The stored guide's id: version 2 (grounded) guides, on a 0.1° grid, or by slug for the towns above. */
export const guideId = (place: Pick<Place, "lat" | "lon"> & { slug?: string }) =>
  place.slug && GUIDE_KEY_BY_SLUG.has(place.slug) ? `v2_${place.slug}` : `v2_${place.lat.toFixed(1)}_${place.lon.toFixed(1)}`;
