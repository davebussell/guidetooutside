/**
 * One fishing film per fish for a place's fishing guide: the film for this
 * region and this season first, then one from a neighbouring region in this
 * season, then one from this region in another season. Each carries the tag
 * printed beside it ("Great Lakes & St. Lawrence Lowlands · autumn") and
 * whether it shows the season we are in (`now`).
 *
 * The ranking is the one FishFilms uses on /wildlife/<fish> (restored client
 * module 96978); the result is the `films` prop the live fishing pages passed
 * to GuideLoader.
 */
import { FISH_FILMS, type FishFilm } from "@/data/videos";
import { getEcoregion } from "@/lib/ecoregions";

export type GuideFilm = FishFilm & { tag: string; now: boolean };

type SeasonId = FishFilm["seasons"][number];

const seasonOf = (month: number): SeasonId => (month === 12 || month <= 2 ? "winter" : month <= 5 ? "spring" : month <= 8 ? "summer" : "fall");
const WORD: Record<SeasonId, string> = { spring: "spring", summer: "summer", fall: "autumn", winter: "winter" };

/** Neighbouring regions, as FishFilms reads them. */
const NEAR: Record<string, string[]> = {
  "boreal-north": ["boreal-forest", "western-mountains"],
  "boreal-forest": ["great-lakes-st-lawrence", "boreal-north", "acadian-forest"],
  "acadian-forest": ["northeast-coast", "great-lakes-st-lawrence", "boreal-forest"],
  "great-lakes-st-lawrence": ["boreal-forest", "northeast-coast", "appalachian", "central-hardwoods"],
  "northeast-coast": ["acadian-forest", "great-lakes-st-lawrence", "appalachian"],
  appalachian: ["great-lakes-st-lawrence", "central-hardwoods", "northeast-coast", "southeastern"],
  "central-hardwoods": ["appalachian", "great-lakes-st-lawrence", "southeastern", "great-plains"],
  southeastern: ["gulf-coast", "central-hardwoods", "florida-peninsula", "appalachian"],
  "gulf-coast": ["southeastern", "florida-peninsula", "great-plains"],
  "florida-peninsula": ["gulf-coast", "southeastern"],
  "great-plains": ["central-hardwoods", "western-mountains", "boreal-forest"],
  "western-mountains": ["pacific-maritime", "great-plains", "boreal-north", "deserts"],
  "pacific-maritime": ["western-mountains", "mediterranean-california"],
  "mediterranean-california": ["pacific-maritime", "deserts", "western-mountains"],
  deserts: ["mediterranean-california", "western-mountains"],
  "hawaii-tropics": ["mediterranean-california"],
};

function best(films: FishFilm[], region: string, season: SeasonId): FishFilm | undefined {
  return films
    .map((v) => {
      const inSeason = v.seasons.includes(season);
      const here = v.regions.includes(region);
      const near = v.regions.some((r) => NEAR[region]?.includes(r));
      return { v, s: here && inSeason ? 5 : near && inSeason ? 3 : here ? 1 : 0 };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || (b.v.date ?? "").localeCompare(a.v.date ?? ""))[0]?.v;
}

/** The film for each fish that has one for this region, keyed by fish slug. */
export function fishFilms(regionSlug: string, month: number): Record<string, GuideFilm> | undefined {
  const season = seasonOf(month);
  const out: Record<string, GuideFilm> = {};
  for (const [slug, films] of Object.entries(FISH_FILMS)) {
    const v = best(films, regionSlug, season);
    if (!v) continue;
    const now = v.seasons.includes(season);
    const where = v.regions.includes(regionSlug) ? regionSlug : (v.regions.find((r) => NEAR[regionSlug]?.includes(r)) ?? v.regions[0]);
    const tag = `${getEcoregion(where)?.name ?? where} · ${WORD[now ? season : v.seasons[0]]}`;
    out[slug] = { ...v, tag, now };
  }
  return out;
}
