/**
 * What /regions and /regions/<slug> need beyond ECOREGIONS: the continent
 * sections, the link each example town gets, and where each region's
 * BiomeDial opens. All read from the captured pages.
 */
import { SERVED_ECOREGIONS } from "@/lib/ecoregions";
import { continentServed } from "@/lib/scope";
import { KNOWN_PLACES, slugify } from "@/lib/geocode";

export type Region = {
  slug: string;
  name: string;
  continent?: string;
  south?: boolean;
  level1: string;
  zones: string;
  summary: string;
  landscape: string;
  gardening: string;
  fishing: string;
  foraging: string;
  examples: string[];
};

/** The regions the site lists and serves (src/lib/scope.ts): a parked region has no page. */
export const REGIONS = SERVED_ECOREGIONS as Region[];
export const getRegion = (slug: string) => REGIONS.find((r) => r.slug === slug);

/** The sections of /regions, in ECOREGIONS order within each: the served continents only. */
export const CONTINENTS: { key: string; title: string }[] = [
  { key: "north-america", title: "North America" },
  { key: "europe", title: "Europe" },
  { key: "africa", title: "Africa" },
].filter((c) => continentServed(c.key));
export const continentOf = (r: Region) => r.continent ?? "north-america";

/** Where each region's BiomeDial opens (Hawaiʻi has no tropical setting on the dial, so it opens on the default). */
export const BIOME_START: Record<string, string | undefined> = {
  "acadian-forest": "mixedwood",
  "alpine-europe": "boreal",
  appalachian: "deciduous",
  "atlantic-europe": "deciduous",
  "boreal-europe": "boreal",
  "boreal-forest": "boreal",
  "boreal-north": "tundra",
  "cape-fynbos": "prairie",
  "central-hardwoods": "deciduous",
  "congo-basin": "rainforest",
  "continental-europe": "deciduous",
  deserts: "desert",
  "east-african-highlands": "prairie",
  "florida-peninsula": "deciduous",
  "great-lakes-st-lawrence": "mixedwood",
  "great-plains": "prairie",
  "guinean-forest": "rainforest",
  "gulf-coast": "deciduous",
  "highveld-drakensberg": "prairie",
  "madagascar-islands": "rainforest",
  "mediterranean-california": "prairie",
  "mediterranean-europe": "prairie",
  "namib-karoo": "desert",
  "north-africa-mediterranean": "prairie",
  "northeast-coast": "deciduous",
  "pacific-maritime": "rainforest",
  "pannonian-steppe": "prairie",
  "sahara-nile": "desert",
  "sahel-savanna": "prairie",
  southeastern: "deciduous",
  "southern-savanna": "prairie",
  "swahili-coast": "rainforest",
  "western-mountains": "boreal",
};

/** Pre-built places listed by their everyday name where the map's name is an administrative one (as PlaceFinder lists them). */
const LIST_NAME: Record<string, string> = {
  "fredericton-new-brunswick": "Fredericton",
  "moncton-new-brunswick": "Moncton",
  "saint-john-new-brunswick": "Saint John",
  "sudbury-ontario": "Sudbury",
  "montreal-quebec": "Montréal",
  "quebec-city-quebec": "Québec City",
  "st-louis-missouri": "St. Louis",
  "albany-new-york": "Albany",
};

/** "Thunder Bay, ON" for a Canadian or US place, its own label ("London, UK") elsewhere. */
const SHORT_LABEL = new Map(
  KNOWN_PLACES.map((p) => [
    p.countryCode === "CA" || p.countryCode === "US" ? `${LIST_NAME[p.slug] ?? p.name}, ${p.admin1Code}` : p.label,
    p.slug,
  ]),
);

/**
 * The guide an example town links to: the pre-built place when there is one,
 * otherwise the slug the live site made from the example itself ("Bangor, ME"
 * → bangor-me; "Kisangani, DR Congo" → kisangani-dr-congo-dr-congo).
 */
export function exampleSlug(example: string): string {
  const known = SHORT_LABEL.get(example);
  if (known) return known;
  const tail = example.slice(example.lastIndexOf(", ") + 2);
  return /^[A-Z]{2}$/.test(tail) ? slugify(example) : slugify(`${example} ${tail}`);
}
