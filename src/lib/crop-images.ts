/** Photographs of the crops (src/data/crop-images.json): open-licensed, credited where shown. */
import manifest from "@/data/crop-images.json";

export type CropImage = { src: string; author: string; license: string; licenseUrl: string; source: string; where?: string; taxon?: string };
const IMAGES = manifest as Record<string, CropImage>;

export const cropImage = (slug: string): CropImage | null => IMAGES[slug] ?? null;
/** "on Flickr", "on Wikimedia Commons", "via Openverse". */
export const cropImageWhere = (img: CropImage): string => img.where ?? "";
