/**
 * Community gardens and allotments near a town, from the static file
 * scripts/fetch-place-gardens.ts writes from OpenStreetMap
 * (src/data/place-gardens.json): the named gardens within 15 km of each
 * pre-built town, nearest first. Nothing here calls the network.
 *
 * A town that is not pre-built borrows from a pre-built town within 10 km of
 * it, with the distances measured again from the town itself, so most of its
 * own 15 km circle is covered; further out it has no list.
 *
 * Wherever a list shows, it carries "© OpenStreetMap contributors" linking to
 * the copyright page, and a garden without a website links to its
 * OpenStreetMap page.
 */
import DATA from "@/data/place-gardens.json";
import KNOWN from "@/lib/served-places";
import { kmBetween } from "./geo-words";

export type GardenKind = "community" | "allotment";

export type Garden = {
  name: string;
  kind: GardenKind;
  lat: number;
  lon: number;
  /** From the town centre, one decimal. */
  km: number;
  website?: string;
  operator?: string;
  /** "way/123", "node/456", "relation/789". */
  osm: string;
};

type GardensFile = {
  fetched: string | null;
  sitesChecked?: string | null;
  source: string;
  radiusKm: number;
  towns: Record<string, Garden[]>;
  failed: string[];
};

const FILE = DATA as unknown as GardensFile;
const TOWNS = KNOWN as { slug: string; name: string; lat: number; lon: number }[];

/** The date the list was read from OpenStreetMap ("2026-10-26"), or null before the first fetch. */
export const GARDENS_FETCHED: string | null = FILE.fetched ?? null;
export const GARDENS_RADIUS_KM: number = FILE.radiusKm ?? 15;

export { OSM_ATTRIBUTION, OSM_COPYRIGHT_URL } from "./gardens-words";

/** A feature's own page on OpenStreetMap. */
export const osmFeatureUrl = (osm: string) => `https://www.openstreetmap.org/${osm}`;

/** The map centred on a town (zoom 13 shows about a 15 km radius on a phone). */
export const osmMapUrl = (lat: number, lon: number, zoom = 13) => `https://www.openstreetmap.org/#map=${zoom}/${lat.toFixed(4)}/${lon.toFixed(4)}`;

export const GARDEN_KIND_LABEL: Record<GardenKind, string> = { community: "Community garden", allotment: "Allotments" };

/** "2.3 km", "800 m". */
export const kmLabel = (km: number) => (km < 1 ? `${Math.max(100, Math.round((km * 1000) / 100) * 100)} m` : `${km.toFixed(1)} km`);

/** Whether the town was fetched at all (an empty list means fetched, none found). */
export const gardensKnown = (slug: string) => Array.isArray(FILE.towns[slug]);

/** The pre-built town's gardens, nearest first; [] when none or not fetched. */
export const gardensOf = (slug: string): Garden[] => FILE.towns[slug] ?? [];

/** How many named gardens the file lists for a pre-built town (at most ten). */
export const gardenCount = (slug: string): number => FILE.towns[slug]?.length ?? 0;

const BORROW_KM = 10;

/** The gardens near any place: its own list when pre-built, else one borrowed from a pre-built town within 10 km. */
export function gardensFor(place: { slug?: string; lat: number; lon: number }, limit = 10): Garden[] {
  if (place.slug && gardensKnown(place.slug)) return gardensOf(place.slug).slice(0, limit);
  const near = TOWNS.map((t) => ({ t, d: kmBetween(t.lat, t.lon, place.lat, place.lon) }))
    .filter((x) => x.d <= BORROW_KM && gardensKnown(x.t.slug))
    .sort((a, b) => a.d - b.d);
  if (!near.length) return [];
  const seen = new Set<string>();
  const out: Garden[] = [];
  for (const { t } of near) {
    for (const g of gardensOf(t.slug)) {
      if (seen.has(g.osm)) continue;
      seen.add(g.osm);
      const km = Math.round(kmBetween(place.lat, place.lon, g.lat, g.lon) * 10) / 10;
      if (km <= GARDENS_RADIUS_KM) out.push({ ...g, km });
    }
  }
  return out.sort((a, b) => a.km - b.km || a.name.localeCompare(b.name)).slice(0, limit);
}

/** Summary for the check script and reports. */
export function gardensSummary() {
  const lists = Object.values(FILE.towns);
  return {
    fetched: FILE.fetched,
    sitesChecked: FILE.sitesChecked ?? null,
    towns: lists.length,
    withGardens: lists.filter((l) => l.length).length,
    gardens: lists.reduce((n, l) => n + l.length, 0),
    failed: FILE.failed ?? [],
  };
}
