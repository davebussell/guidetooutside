/**
 * Region imagery: each ecological region's landscape plant (the photograph its
 * region page opens on, src/data/landscape-images.json). Recovered from the live
 * /regions pages; hero-images.ts falls back to it for a region without a hero.
 */
import landscape from "@/data/landscape-images.json";

export type LandscapeImage = { src: string; name: string; taxon?: string; author: string; license: string; licenseUrl: string; source: string };
export type RegionTile = { kind: "landscape"; slug: string };

const IMAGES = landscape as Record<string, LandscapeImage>;

/** The landscape plant of each region. */
export const REGION_LANDSCAPE: Record<string, string> = {
  "acadian-forest": "balsam-fir",
  "alpine-europe": "european-larch",
  "appalachian": "eastern-hemlock",
  "atlantic-europe": "common-heather",
  "boreal-europe": "scots-pine",
  "boreal-forest": "paper-birch",
  "boreal-north": "tamarack",
  "cape-fynbos": "king-protea",
  "central-hardwoods": "shagbark-hickory",
  "congo-basin": "umbrella-tree",
  "continental-europe": "european-beech",
  "deserts": "joshua-tree",
  "east-african-highlands": "fever-tree",
  "florida-peninsula": "sabal-palmetto",
  "great-lakes-st-lawrence": "sugar-maple",
  "great-plains": "big-bluestem",
  "guinean-forest": "oil-palm",
  "gulf-coast": "bald-cypress",
  "hawaii-tropics": "ohia-lehua",
  "highveld-drakensberg": "red-grass",
  "madagascar-islands": "grandidier-baobab",
  "mediterranean-california": "california-poppy",
  "mediterranean-europe": "olive-tree",
  "namib-karoo": "quiver-tree",
  "north-africa-mediterranean": "atlas-cedar",
  "northeast-coast": "beach-grass",
  "pacific-maritime": "western-redcedar",
  "pannonian-steppe": "feather-grass",
  "sahara-nile": "date-palm",
  "sahel-savanna": "umbrella-thorn",
  "southeastern": "longleaf-pine",
  "southern-savanna": "mopane",
  "swahili-coast": "coconut-palm",
  "western-mountains": "quaking-aspen",
};

export const landscapeImage = (slug: string): LandscapeImage | null => IMAGES[slug] ?? null;

/** The picture tiles for a region; today its landscape plant. */
export function tilesFor(regionSlug: string): RegionTile[] {
  const slug = REGION_LANDSCAPE[regionSlug];
  return slug ? [{ kind: "landscape", slug }] : [];
}
