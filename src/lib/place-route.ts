/**
 * Shared plumbing for the place pages (/guide, /gardening, /fishing,
 * /foraging, /ground, /resources, /the-day under a town's slug).
 */
import { placeFromSlug } from "./geocode";
import type { Place } from "./types";

export type PlaceParams = { slug: string };
export type PlaceSearch = { lat?: string; lon?: string };

/**
 * The place for a slug. The finder redirects with the searched point's exact
 * coordinates; those are trusted when they fall within about 60 km of the town.
 */
export async function resolvePlace(slug: string, search: PlaceSearch = {}): Promise<Place | null> {
  const place = await placeFromSlug(slug);
  if (!place) return null;
  const lat = Number(search.lat);
  const lon = Number(search.lon);
  if (search.lat && search.lon && Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat - place.lat) < 0.5 && Math.abs(lon - place.lon) < 0.7) {
    return { ...place, lat, lon };
  }
  return place;
}
