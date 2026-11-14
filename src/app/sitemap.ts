import type { MetadataRoute } from "next";
import { POPULAR_LOCATIONS, SITE } from "@/lib/site";
import { SERVED_ECOREGIONS as ECOREGIONS } from "@/lib/ecoregions";
import HOME from "@/components/home/home-data.json";
import REF from "./_sitemap/reference.json";
import { TOPICS as HOMESTEAD_TOPICS } from "@/data/homestead/topics";
import { INDEXED_PLACE_SECTIONS, indexedTowns, regionIndexed } from "@/lib/seo/indexing";
import { getSpecies } from "@/lib/species";
import { getCreature } from "@/lib/nature";

/*
 * TODO(F→D): the species and creature slugs come from the homepage's snapshot
 * of the recovered libraries, and the rock, crop, recipe, kids, lesson and
 * game slugs from the live sitemap (./_sitemap/reference.json). Switch each to
 * the data layer's exports (SPECIES, creatures, CROPS, RECIPES, rocks, kids
 * stories, LESSONS, games) once they exist, keeping this order.
 */

/** When the reference content was last revised. */
const CONTENT_UPDATED = new Date("2026-10-02T12:00:00.000Z");
/**
 * When the place pages' template last changed in a way that matters to a
 * reader. A fixed date, moved by hand: stamping every build as "now" told
 * Google that some 2,100 town pages changed with every deploy.
 */
const PLACES_UPDATED = new Date("2026-10-27T12:00:00.000Z");

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
const ZONES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
/**
 * The place sections listed for each town: only those asked to be indexed
 * (src/lib/seo/indexing.ts). /the-day, /resources and /homesteading under a
 * town, and the organisation pages, still work but are left out.
 */
const PLACE_SECTIONS = INDEXED_PLACE_SECTIONS;

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, changeFrequency: Freq, priority: number, lastModified = CONTENT_UPDATED) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  const many = (prefix: string, slugs: string[], changeFrequency: Freq, priority: number) =>
    slugs.map((s) => page(`${prefix}/${s}`, changeFrequency, priority));
  const reference = (paths: string[]) => paths.map((p) => page(p, "monthly", 0.9));

  return [
    page("", "weekly", 1),
    page("/ground/rocks", "yearly", 0.7),
    ...many("/ground/rocks", REF.rocks, "yearly", 0.6),
    page("/about", "yearly", 0.4),
    page("/privacy", "yearly", 0.2),
    ...reference([
      "/gardening",
      "/gardening/crops",
      "/gardening/preserving",
      "/gardening/recipes",
      "/gardening/seeds",
      "/fishing",
      "/fishing/regulations",
      "/foraging",
      "/almanac",
      "/regions",
      "/zones/map",
      "/foraging/calendar",
      "/foraging/medicinal",
      "/wildlife",
      "/the-day",
      "/learn",
      "/learn/lessons",
      "/learn/ecology",
      "/learn/patterns",
      "/learn/count",
      "/learn/plan",
      "/learn/progress",
      "/learn/journal",
      "/how-it-works",
      "/newsletter",
    ]),
    // The kids' picture books are held out of the index at launch (src/lib/seo/indexing.ts).
    ...many("/learn/lessons", REF.lessons, "yearly", 0.7),
    // The snapshot keeps the order; a species or creature that is parked (src/lib/scope.ts) has no page to list.
    ...many("/foraging", HOME.species.map((s) => s.slug).filter((slug) => !!getSpecies(slug)), "monthly", 0.7),
    ...many("/gardening/crops", REF.crops, "monthly", 0.7),
    ...many("/gardening/recipes", REF.recipes, "yearly", 0.6),
    ...many("/wildlife", HOME.creatures.map((c) => c.slug).filter((slug) => !!getCreature(slug)), "monthly", 0.7),
    // Regions and towns: the launch scope only (Canada first; src/lib/seo/indexing.ts).
    ...many("/regions", (ECOREGIONS as { slug: string }[]).map((r) => r.slug).filter(regionIndexed), "monthly", 0.8),
    page("/zones", "monthly", 0.9),
    ...many("/zones", ZONES.map(String), "monthly", 0.8),
    ...indexedTowns().flatMap((r) => {
      const popular = POPULAR_LOCATIONS.some((l) => l.slug === r.slug);
      return PLACE_SECTIONS.map((s) => page(`/${s}/${r.slug}`, "weekly", popular ? 0.8 : 0.7, PLACES_UPDATED));
    }),
    // Homesteading: the landing, the calendar and the topics (the town pages are not indexed).
    ...reference(["/homesteading", "/homesteading/calendar"]),
    ...many("/homesteading", HOMESTEAD_TOPICS.map((t) => t.slug), "monthly", 0.7),
    // Conservation: the hub (the organisation pages are not indexed).
    page("/conservation", "weekly", 0.9, PLACES_UPDATED),
  ];
}
