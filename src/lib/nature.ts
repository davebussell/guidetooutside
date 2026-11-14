/**
 * The creature library: 88 sport fish and 27 garden insects and soil
 * organisms (pollinators, beneficials, soil life and pests), with the queries
 * the place pages, region pages and /wildlife run over them.
 *
 * Extracted from client module 88643 (the restored GuideLoader.jsx): the fish
 * array as written and the three extra-range maps it passes to withRegions
 * (src/data/creatures.json `fish`, `fishExtraRegions`), then the `water` each
 * fish is given from its habitats (fish-habitats.ts), and the garden-life
 * array that follows the fish in 88643 `w` (`garden`). FISH reproduces 88643
 * `g` and CREATURES 88643 `w` exactly.
 *
 * creaturesNow's order was reconstructed from the live pages (/regions/<slug>
 * "Fish active this month" and "Garden insects and soil life", /wildlife):
 * by group (fish, pollinators, beneficials, soil life, pests), then the
 * creatures whose range was written for the place's continent, then the rest,
 * then those found everywhere, each in library order. It reproduces every
 * captured region list and the /wildlife count (83 active in October).
 *
 * Regional-accuracy audit, 14 October 2026 (agent RF): steelhead's
 * "appalachian" region removed in creatures.json (change list under `audit`
 * there). Asheville's fishing page listed steelhead among the river fish;
 * North Carolina has none.
 * // source: NC Wildlife Resources Commission / ncfishes.com, "Trout and Salmon
 * //   (Family Salmonidae) Diversity in North Carolina": rainbow, brown and brook
 * //   trout and landlocked kokanee are the state's salmonids.
 * //   https://ncfishes.com/trout-and-salmon-family-salmonidae-diversity-in-north-carolina/
 *
 * Round 2 (agent C, 14 October 2026): fish records may carry country and box
 * rules (`excludeCountries`, `onlyCountries`, `regionCountries`, `within`)
 * and per-region months (`monthsByRegion`), read by `creaturesNow` when it is
 * given the place (L7, L5). The freshwater records were extra-ranged by
 * continent, so London showed largemouth bass and wels, Lisbon roach, bream,
 * perch and channel catfish, Oslo wels, Nairobi tigerfish and vundu. Each
 * value is sourced in creatures.json `sources`; the ones that decide the
 * audited towns:
 * // source: IUCN GISD, Micropterus salmoides — alien range lists Portugal, Spain, France, Italy…; no United
 * //   Kingdom or Ireland record https://www.iucngisd.org/gisd/speciesname/Micropterus+salmoides
 * // source: Store norske leksikon, Malle — "I Norden forekommer den bare i Sør-Finland og Sørøst-Sverige"
 * //   https://snl.no/malle
 * // source: Angling Times / Environment Agency — wels "can be legally kept in the UK under permit in stillwaters
 * //   with no inlet or outlet streams"; fish found in a stream were removed
 * //   https://www.anglingtimes.co.uk/news/stories/two-big-catfish-found-in-tiny-park-stream
 * // source: Ribeiro & Veríssimo / KMAE 2015 — roach and perch are first records in Portugal (2014, Vale Longo
 * //   reservoir), common bream and channel catfish unrecorded; achigã and lúcio are the sport fish
 * //   https://www.kmae-journal.org/articles/kmae/pdf/2015/01/kmae140065.pdf
 * // source: FishBase, Hydrocynus forskahlii — "Nile River, including Lake Albert… Lake Turkana and Omo River"
 * //   https://fishbase.se/summary/4496
 * // source: FishBase, Heterobranchus longifilis — the Nile, Congo, Zambezi, Lakes Tanganyika and Edward,
 * //   West African basins; not Kenya's highlands https://fishbase.se/summary/Heterobranchus-longifilis.html
 * // source: FishBase, Sparus aurata — "Eastern Atlantic: British Isles, Strait of Gibraltar to Cape Verde…;
 * //   also in the Mediterranean" https://www.fishbase.se/summary/Sparus-aurata.html
 * // source: AZGFD — rainbow trout stocked in Community Fishing waters "from November to March"
 * //   https://www.azgfd.com/fishing/community/ and https://www.outdoorhub.com/?p=351634
 * // source: DFFE, Marine Living Resources Act Annexure 2 — elf/shad closed "1 September to 30 November"
 * //   https://source.acts.co.za/marine-living-resources-act-1998/r1111_annexure_2__closed_season.php
 */

import data from "@/data/creatures.json";
import { withRegions } from "@/lib/ecoregions";
import { waterOf } from "@/lib/fish-habitats";
import { continentOfRegion, inLocalMonths, inSeasonAt, placeAllows, recordServed, type PlaceLike, type Ranged } from "@/lib/species";

export { inLocalMonths } from "@/lib/species";
export type { PlaceLike } from "@/lib/species";

export type CreatureGroup = "fish" | "pollinator" | "beneficial" | "soil" | "pest";

export type Creature = Ranged & {
  slug: string;
  name: string;
  latin: string;
  group: CreatureGroup;
  /** Active months, northern calendar unless southern-only. */
  months: number[];
  /** Ecoregion slugs, the first being the one the range was written from; "all" for the cosmopolitan. */
  regions: "all" | string[];
  where: string;
  identify: string;
  note: string;
  /** Fish: the method that usually takes it, worded for fresh water; a fish that is also fished in the sea carries `tacticSea` for the sea and estuary sections. */
  tactic?: string;
  /** Fish: the tactic and range where the fish is fished in salt water (used only for a sea or estuary section). */
  tacticSea?: string;
  whereSea?: string;
  caution?: string;
  /** Fish: salt, fresh or both, from its habitats. */
  water?: "salt" | "both" | "fresh";
};

const D = data as unknown as { fish: Creature[]; fishExtraRegions: Record<string, string[]>[]; garden: Creature[] };

/** The 88 sport fish in the library, parked ones included: for the build checks only. */
export const ALL_FISH: Creature[] = (withRegions(D.fish, ...D.fishExtraRegions) as Creature[]).map((e) => ({ ...e, water: waterOf(e.slug) }));
/** The sport fish the site serves: those written for a served continent (src/lib/scope.ts). */
export const FISH: Creature[] = ALL_FISH.filter((f) => recordServed(f.regions));
/** The 27 pollinators, beneficial insects, soil organisms and pests of the garden. */
export const GARDEN_LIFE: Creature[] = D.garden;
/** Every creature: the fish, then the garden life. */
export const CREATURES: Creature[] = [...FISH, ...GARDEN_LIFE];

const BY_SLUG = new Map(CREATURES.map((c) => [c.slug, c]));
export const getCreature = (slug: string) => BY_SLUG.get(slug);

/** How each group is named on a creature card ("Fish", "Pollinator", "Soil life"…). */
export const GROUP_LABEL: Record<CreatureGroup, string> = {
  fish: "Fish",
  pollinator: "Pollinator",
  beneficial: "Beneficial",
  soil: "Soil life",
  pest: "Pest",
};

const GROUP_ORDER: CreatureGroup[] = ["fish", "pollinator", "beneficial", "soil", "pest"];

/** Whether a creature's range includes the region and, with a place, its country and box rules. */
export const creatureAt = (c: Creature, regionSlug?: string, place?: PlaceLike | null): boolean =>
  (!regionSlug || c.regions === "all" || c.regions.includes(regionSlug)) && placeAllows(c, regionSlug, place);

/**
 * The creatures of `list` active in `month` in `regionSlug` (any region if
 * none), in their local months: by group, then those written for the place's
 * continent, then the rest, then the cosmopolitan, each in library order.
 * With `place`, a record's country and box rules are applied too (a fish
 * extra-ranged to a continent is dropped where its record says it is absent).
 */
export function creaturesNow<T extends Creature>(list: T[], month: number, regionSlug?: string, place?: PlaceLike | null): T[] {
  const continent = regionSlug ? continentOfRegion(regionSlug) : null;
  const tier = (c: Creature) => (c.regions === "all" ? 2 : continent && continentOfRegion(c.regions[0]) === continent ? 0 : 1);
  return list
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => creatureAt(c, regionSlug, place) && inSeasonAt(c, month, regionSlug))
    .sort((a, b) => GROUP_ORDER.indexOf(a.c.group) - GROUP_ORDER.indexOf(b.c.group) || tier(a.c) - tier(b.c) || a.i - b.i)
    .map(({ c }) => inLocalMonths(c, regionSlug));
}

/**
 * `list` in the order creaturesNow gives, with no month asked: those the
 * region and place admit, by group, then those written for the place's
 * continent, then the rest, then the cosmopolitan, each in library order, with
 * their months in the place's calendar.
 */
export function orderCreatures<T extends Creature>(list: T[], regionSlug?: string, place?: PlaceLike | null): T[] {
  const continent = regionSlug ? continentOfRegion(regionSlug) : null;
  const tier = (c: Creature) => (c.regions === "all" ? 2 : continent && continentOfRegion(c.regions[0]) === continent ? 0 : 1);
  return list
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => creatureAt(c, regionSlug, place))
    .sort((a, b) => GROUP_ORDER.indexOf(a.c.group) - GROUP_ORDER.indexOf(b.c.group) || tier(a.c) - tier(b.c) || a.i - b.i)
    .map(({ c }) => inLocalMonths(c, regionSlug));
}

/** "Also active in <month>" on a creature page: the first `n` others of its kind (fish, or garden life) written for its continent. */
export function alsoActive(c: Creature, month: number, n = 3): Creature[] {
  const home = (x: Creature) => (x.regions === "all" ? "north-america" : continentOfRegion(x.regions[0]));
  const pool = c.group === "fish" ? FISH : GARDEN_LIFE;
  return pool.filter((o) => o.slug !== c.slug && o.regions !== "all" && home(o) === home(c) && o.months.includes(month)).slice(0, n);
}
