/**
 * The photograph a place page opens on: a landscape of its ecological region,
 * chosen by hand from Wikimedia Commons (scripts/fetch-hero-images.py), or —
 * until one has been chosen — the region's landscape plant.
 *
 * RECOVERED 2026-10-08 (full file as of 2026-10-07).
 */

import heroManifest from "@/data/hero-images.json";
import { landscapeImage, tilesFor } from "./region-images";

export type Hero = {
  src: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  /** Wide enough to fill a screen. */
  wide: boolean;
};

type HeroEntry = { src: string; title: string; author: string; license: string; licenseUrl: string; source: string; description?: string };
const HEROES = heroManifest as Record<string, HeroEntry>;

export function heroFor(regionSlug: string): Hero | null {
  const h = HEROES[regionSlug];
  if (h) return { src: h.src, alt: h.description || h.title, author: h.author, license: h.license, licenseUrl: h.licenseUrl, source: h.source, wide: true };
  const tile = tilesFor(regionSlug).find((t) => t.kind === "landscape");
  const img = tile ? landscapeImage(tile.slug) : null;
  if (!img) return null;
  return { src: img.src, alt: img.name, author: img.author, license: img.license, licenseUrl: img.licenseUrl, source: img.source, wide: false };
}
