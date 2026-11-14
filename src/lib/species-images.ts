/** Photographs of the wild edibles (src/data/species-images.json), research-grade iNaturalist observations. */
import manifest from "@/data/species-images.json";

export type SpeciesImage = { src: string; author: string; license: string; licenseUrl: string; source: string; taxon?: string };
const IMAGES = manifest as Record<string, SpeciesImage>;

export const speciesImage = (slug: string): SpeciesImage | null => IMAGES[slug] ?? null;
