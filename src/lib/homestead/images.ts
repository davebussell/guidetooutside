/** Photographs for the Homesteading section (src/data/homestead/images.json): CC0, CC BY and CC BY-SA only, from iNaturalist and Wikimedia Commons, credited where shown. */
import manifest from "@/data/homestead/images.json";

export type HomesteadImage = {
  src: string;
  alt: string;
  /** A plain caption: what and where. */
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  /** Where the photograph was published. */
  via: "iNaturalist" | "Wikimedia Commons";
  taxon?: string;
};

const IMAGES = manifest as Record<string, HomesteadImage>;

export const homesteadImage = (key: string): HomesteadImage | null => IMAGES[key] ?? null;
