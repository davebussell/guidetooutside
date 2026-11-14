/**
 * The one-line "Who looks after this" strips: the two best organisations for
 * a section of a place's guide, as plain items the strip component (and the
 * client GuideLoader, which cannot import the library) can render.
 */
import type { Topic } from "@/data/conservation";
import type { StripItem } from "@/components/conservation/OrgStrip";
import type { WaterSetting } from "@/lib/water-setting";
import { orgsFor, type MatchPlace, type OrgMatch } from "./match";
import { pageWaters } from "./waters";

export type GuideStripSection = "gardening" | "fishing" | "foraging";
export type GuideStrips = Record<GuideStripSection, StripItem[]>;

/** Each guide section's strip leads with its first subject (the panel lower on the page carries the full set). */
const STRIP_TOPICS: Record<GuideStripSection, Topic[]> = {
  gardening: ["pollinators", "birds"],
  fishing: ["fish", "water"],
  foraging: ["plants", "forests"],
};

export const toStrip = (m: OrgMatch): StripItem => ({ slug: m.org.slug, name: m.org.shortName && m.org.name.length > 44 ? m.org.shortName : m.org.name, why: m.why });

/** Two topical organisations for a topic set, best first. */
export function stripFor(place: MatchPlace, topic: Topic | Topic[], opts: { waters?: string[]; species?: string[]; limit?: number } = {}): StripItem[] {
  return orgsFor(place, { topic, waters: opts.waters, species: opts.species, limit: opts.limit ?? 2 })
    .filter((m) => m.topical)
    .map(toStrip);
}

/** One guide section's strip; the fishing strip reads the page's named waters. */
export function guideStrip(place: MatchPlace, section: GuideStripSection, water?: WaterSetting | null): StripItem[] {
  return stripFor(place, STRIP_TOPICS[section], section === "fishing" ? { waters: pageWaters(water) } : {});
}

/** All three strips, for the client GuideLoader (passed as a prop). */
export function guideStrips(place: MatchPlace, water?: WaterSetting | null): GuideStrips {
  return {
    gardening: guideStrip(place, "gardening", water),
    fishing: guideStrip(place, "fishing", water),
    foraging: guideStrip(place, "foraging", water),
  };
}
