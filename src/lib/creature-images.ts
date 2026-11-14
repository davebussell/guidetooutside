/** Photographs of the fish and garden creatures (src/data/creature-images.json), research-grade iNaturalist observations. */
import manifest from "@/data/creature-images.json";

export type CreatureImage = { src: string; author: string; license: string; licenseUrl: string; source: string; taxon?: string };
const IMAGES = manifest as Record<string, CreatureImage>;

export const creatureImage = (slug: string): CreatureImage | null => IMAGES[slug] ?? null;
