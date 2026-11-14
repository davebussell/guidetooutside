/**
 * Which pages Google is asked to index.
 *
 * After the Oct 20 2026 drop in search (see the SEO doc), the index is kept to
 * the pages that earn it: the five main place sections for the towns in the
 * sitemap, and the reference pages. Everything else still works for readers
 * and still passes links on (`follow`), but carries `noindex` and is left out
 * of the sitemap:
 *
 * - /the-day, /resources and /homesteading under a town: 792 URLs that drew
 *   80 impressions between them in the four weeks before the drop;
 * - any town outside the sitemap list (a page is made for whatever town a
 *   reader types in, so the set has no end);
 * - the organisation pages under /conservation (the hub stays indexed).
 *
 * To bring a page type back, add it here and to the sitemap together.
 *
 * Launch scope of guidetooutside.com (decided 14 November 2026): every page stays up for readers, but only
 * Canadian towns are indexed to start, and only those whose pages have been read against primary sources (the
 * town-by-town audit). The rest carry `noindex, follow` and stay out of the sitemap until they are added here:
 * a country joins INDEXED_COUNTRIES when its towns are audited; a town leaves HELD_BACK when its audit is done.
 * A region page is indexed while it holds at least one indexed town. The kids' picture-book section is held back
 * too. scripts/check-indexing.ts holds the sitemap and every page's robots line to this file.
 */
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { KNOWN_PLACES, knownPlace } from "@/lib/geocode";
import { classifyEcoregion } from "@/lib/ecoregions";
import type { PlaceSearch } from "@/lib/place-route";

export type PlaceSection = "guide" | "gardening" | "fishing" | "foraging" | "ground" | "the-day" | "resources" | "homesteading";

/** Place sections indexed for the towns in the sitemap. */
export const INDEXED_PLACE_SECTIONS: readonly PlaceSection[] = ["guide", "gardening", "fishing", "foraging", "ground"];

/** Kept out of the index, links still followed. */
export const NOINDEX: NonNullable<Metadata["robots"]> = { index: false, follow: true };

/** Countries whose towns are indexed. Canada first; others join as their towns are audited. */
export const INDEXED_COUNTRIES: readonly string[] = ["CA"];

/**
 * Towns in an indexed country whose own pages have not yet been read against sources. Empty since 14 November 2026,
 * when Day 5 audited and fixed the last twelve Canadian towns: every Canadian town is indexed.
 */
export const HELD_BACK: readonly string[] = [];

/** Whether a town's pages are in the index at all: a pre-built town, in an indexed country, already audited. */
export function townIndexed(slug: string): boolean {
  const p = knownPlace(slug);
  return !!p && INDEXED_COUNTRIES.includes((p.countryCode ?? "").toUpperCase()) && !HELD_BACK.includes(p.slug);
}

/** Whether Google is asked to index /<section>/<slug>. */
export function placeIndexed(section: PlaceSection, slug: string): boolean {
  return INDEXED_PLACE_SECTIONS.includes(section) && townIndexed(slug);
}

/** The pre-built towns whose pages are indexed, in their stored order. */
export const indexedTowns = () => KNOWN_PLACES.filter((p) => townIndexed(p.slug));

let REGIONS_WITH_TOWNS: Set<string> | null = null;
/** Whether /regions/<slug> is indexed: only while the region holds at least one indexed town. */
export function regionIndexed(regionSlug: string): boolean {
  REGIONS_WITH_TOWNS ??= new Set(indexedTowns().map((p) => (classifyEcoregion(p.lat, p.lon) as { slug: string } | null)?.slug ?? ""));
  return REGIONS_WITH_TOWNS.has(regionSlug);
}

/** The robots entry for a region page's metadata. */
export const regionRobots = (regionSlug: string): Pick<Metadata, "robots"> => (regionIndexed(regionSlug) ? {} : { robots: NOINDEX });

/** The robots entry for a place page's metadata: nothing when indexed, `noindex, follow` otherwise. */
export function placeRobots(section: PlaceSection, slug: string): Pick<Metadata, "robots"> {
  return placeIndexed(section, slug) ? {} : { robots: NOINDEX };
}

/**
 * A town reached by another spelling of its slug ("kamloops-bc") is sent on to
 * the canonical one, keeping the finder's exact point, so one town has one URL.
 */
export function redirectToCanonicalPlace(section: PlaceSection, askedSlug: string, canonicalSlug: string, search: PlaceSearch = {}): void {
  if (askedSlug === canonicalSlug) return;
  const q = search.lat && search.lon ? `?lat=${encodeURIComponent(search.lat)}&lon=${encodeURIComponent(search.lon)}` : "";
  permanentRedirect(`/${section}/${canonicalSlug}${q}`);
}
