/**
 * The crop library: 41 temperate garden crops and 23 world crops, their
 * growing parameters, the tested preserving recipes and the preserving methods.
 *
 * Extracted from:
 * - crops (src/data/crops.json): the two crop arrays inlined in client module
 *   54475 (src/components/here/GardenHere.jsx before it imported this module);
 *   CROPS/ALL_CROPS reproduce data-recovered/54475.json `__x0` exactly.
 * - CROP_GROW (src/data/crop-grow.json `crops`): 54475 `r` plus the world crops' inline
 *   parameters and the round-2 audit fields (overwinter, sowMinSoilC, winterMinC …, each
 *   sourced in the JSON); withGrow is 54475 `s`.
 * - HARDINESS: 54475 `n`.
 * - recipes (src/data/recipes.json): the 41 captured /gardening/recipes/<slug>
 *   pages, in the order the live /gardening/preserving page passed them to PutItUp;
 *   `alsoFor` is the order each crop page lists the recipes it is a secondary crop in.
 * - METHODS, GROUP_LABEL, SEED_KIND: the captured /gardening/preserving,
 *   /gardening/crops/<slug> and /gardening/seeds pages.
 * - localCrops / cropName: verbatim from the recovered src/lib/crops.ts tail.
 */

import cropData from "@/data/crops.json";
import growData from "@/data/crop-grow.json";
import recipeData from "@/data/recipes.json";
import type { Crop, CropGroup, CropGrowEntry, Hardiness, PreserveMethod, PreserveMethodId, Recipe, SeedKind } from "./crop-types";

export type { Crop, CropGroup, CropGrow, CropGrowEntry, CropStore, Hardiness, PreserveMethod, PreserveMethodId, Recipe, SeedKind } from "./crop-types";

/**
 * Growing parameters for every crop, merged onto each crop as `grow` (over a world crop's
 * inline `grow`). The JSON also carries `sources`, `fieldSources` and `fieldNotes` for the
 * round-2 fields; CROP_GROW_SOURCES exposes them for the credits.
 */
export const CROP_GROW = (growData as unknown as { crops: Record<string, CropGrowEntry> }).crops;
export const CROP_GROW_SOURCES = (growData as unknown as { sources: Record<string, string>; fieldSources: Record<string, string[]> });

/** Merge a crop's CROP_GROW entry into `grow`, and its staple regimes into `staple` unless the crop names its own. */
export const withGrow = (c: Crop): Crop => {
  const g = CROP_GROW[c.slug];
  if (!g) return c;
  const { staple, ...grow } = g;
  return { ...c, grow: { ...c.grow, ...grow }, staple: c.staple ?? staple };
};

const DATA = cropData as unknown as { temperate: Crop[]; world: Crop[] };

/** The 41 temperate crops, frost-calendar crops of a northern garden. */
export const CROPS: Crop[] = DATA.temperate.map(withGrow);
/** CROPS plus the 23 world crops (cassava … watermelon). */
export const ALL_CROPS: Crop[] = [...CROPS, ...DATA.world.map(withGrow)];

const R = recipeData as unknown as { recipes: Recipe[]; alsoFor: Record<string, string[]> };
export const RECIPES: Recipe[] = R.recipes;

export const getCrop = (slug: string) => ALL_CROPS.find((c) => c.slug === slug);
export const getRecipe = (slug: string) => RECIPES.find((r) => r.slug === slug);

/** A crop's recipes: those filed under it first, then those it is a secondary crop in, in the order its page lists them. */
export function recipesFor(slug: string): Recipe[] {
  const own = RECIPES.filter((r) => r.crop === slug);
  const also = (R.alsoFor[slug] ?? []).map((s) => getRecipe(s)).filter((r): r is Recipe => !!r);
  return [...own, ...also];
}

/** Up to `n` recipes for crops harvested in `month`: the first recipe of each crop, in recipe order. */
export function recipesInSeason(month: number, n = 6): Recipe[] {
  const seen = new Set<string>();
  const out: Recipe[] = [];
  for (const r of RECIPES) {
    if (seen.has(r.crop)) continue;
    const c = getCrop(r.crop);
    if (!c?.harvestMonths.includes(month)) continue;
    seen.add(r.crop);
    out.push(r);
    if (out.length >= n) break;
  }
  return out;
}

/** Crops harvested in `month` (northern calendar): shortest harvest first, then by name. */
export function cropsInMonth(month: number, crops: Crop[] = CROPS): Crop[] {
  return crops
    .filter((c) => c.harvestMonths.includes(month))
    .sort((a, b) => a.harvestMonths.length - b.harvestMonths.length || a.name.localeCompare(b.name));
}

export const HARDINESS: Record<Hardiness, { label: string; minC: number; deadC: number; short: string }> = {
  tender: { label: "Tender", minC: 1, deadC: 0, short: "Finished by the first frost" },
  "half-hardy": { label: "Half-hardy", minC: -1, deadC: -3, short: "Scorched by a light frost, killed at −3 °C" },
  hardy: { label: "Hardy", minC: -5, deadC: -8, short: "Takes −4 to −6 °C and often sweetens" },
  "very-hardy": { label: "Very hardy", minC: -9, deadC: -15, short: "Takes −8 °C and below; overwinters" },
};

/** The temperatures at which frost damages and kills a crop. */
export const frostLimits = (c: Crop) => c.frostLimits ?? { damageC: HARDINESS[c.hardiness].minC, deadC: HARDINESS[c.hardiness].deadC };

export type FrostAction = "harvest" | "cover" | "leave";

/**
 * What a forecast low means for one crop. Forecast lows are measured at head
 * height; at bed level on a still, clear night it is a degree or two colder.
 */
export function cropFrostCall(c: Crop, tMin: number): FrostAction {
  const bed = tMin - 1;
  const l = frostLimits(c);
  return bed <= l.deadC ? "harvest" : bed <= l.damageC ? "cover" : "leave";
}

/**
 * The crops in the ground in `month`, sorted as cropsInMonth, split by what a
 * night down to `tMin` °C means for them: harvest before dark, cover overnight,
 * or leave in the ground. For a southern place pass the month read on the
 * northern calendar.
 */
export function frostCall(tMin: number, month: number, crops: Crop[] = CROPS): Record<FrostAction, Crop[]> {
  const out: Record<FrostAction, Crop[]> = { harvest: [], cover: [], leave: [] };
  for (const c of cropsInMonth(month, crops)) out[cropFrostCall(c, tMin)].push(c);
  return out;
}

export const GROUP_LABEL: Record<CropGroup, string> = {
  fruiting: "Fruiting vegetables",
  squash: "Squash and pumpkins",
  root: "Roots",
  allium: "Onions and garlic",
  brassica: "Cabbages and kin",
  leafy: "Leafy greens",
  legume: "Peas and beans",
  grain: "Corn",
  "tree-fruit": "Tree fruit",
  perennial: "Perennials",
  berry: "Berries",
  herb: "Herbs",
};

/** The preserving methods, in the order /gardening/preserving describes them. */
export const METHODS: Record<PreserveMethodId, PreserveMethod> = {
  freeze: {
    name: "Freezing",
    short: "The fastest route and the one that keeps flavour best.",
    equipment: "Freezer bags or boxes, a tray, a pot for blanching.",
    goodFor: "Berries, blanched beans, peas, corn, broccoli, kale; whole tomatoes; roasted peppers; pesto; squash purée.",
    never: "Cucumbers, lettuce, radishes or raw potatoes — they go to mush — and never leave garlic or herbs in oil at room temperature.",
  },
  "water-bath": {
    name: "Water-bath canning",
    short: "Jars boiled in a big pot — for high-acid food only.",
    equipment: "A deep pot with a rack, canning jars and new lids, a jar lifter.",
    goodFor: "Tomatoes with added acid, fruit, jams, pickles and relishes, salsa from a tested recipe.",
    never: "Plain vegetables, meat, soups, squash purée or anything low-acid — those need a pressure canner, whatever a grandmother did.",
  },
  pickle: {
    name: "Pickling",
    short: "Vinegar does the preserving; the canner just seals the jar.",
    equipment: "5% vinegar, pickling salt, fresh produce, a water-bath canner.",
    goodFor: "Cucumbers, beans, beets, carrots, peppers, cauliflower, relishes, chutneys.",
    never: "Weakening the vinegar, adding more vegetables than the recipe, or using leftover brine — the acid ratio is the safety.",
  },
  pressure: {
    name: "Pressure canning",
    short: "Jars heated above boiling under pressure — the only safe way to can plain vegetables.",
    equipment: "A pressure canner (not a pressure cooker), tested yearly if it has a dial gauge.",
    goodFor: "Green beans, carrots, potatoes, corn, peas, beets, squash cubes, dry beans.",
    never: "Thickened or puréed food — pumpkin butter, mashed squash, refried beans — because heat cannot reach the centre of a thick jar.",
  },
  ferment: {
    name: "Fermenting",
    short: "Salt and time; the bacteria make the acid for you.",
    equipment: "A crock or wide jar, a weight, pickling salt, a cool corner (15–21 °C).",
    goodFor: "Sauerkraut, brined dill pickles, hot sauce, kimchi-style vegetables.",
    never: "Guessing the salt — 2–2.5% by weight for kraut, 3.5–5% brine for pickles — or ignoring a pink, slimy or soft batch.",
  },
  dry: {
    name: "Drying",
    short: "A dehydrator or a low oven; light, keeps for a year.",
    equipment: "A dehydrator or an oven that holds 55–60 °C, airtight jars.",
    goodFor: "Apple rings, fruit leather, herbs, hot peppers, cherry and paste tomatoes, dry beans.",
    never: "Storing dried tomatoes or herbs in oil on the shelf; and basil, which dries black and tasteless.",
  },
  "cold-store": {
    name: "Cold storage",
    short: "The oldest method: the right cold, the right damp, and darkness.",
    equipment: "A cold room, root cellar, unheated porch, garage or fridge crisper — and a thermometer.",
    goodFor: "Carrots, beets, potatoes, cabbage, apples, squash (warm and dry), onions and garlic (cold and dry).",
    never: "Apples beside potatoes or carrots — the ethylene sprouts the one and makes the other bitter.",
  },
  cure: {
    name: "Curing",
    short: "Two weeks of warmth and air that turn a fresh crop into a keeper.",
    equipment: "A warm, airy, dry spot out of the sun — a porch, a greenhouse bench, the garage with the door open.",
    goodFor: "Winter squash and pumpkins, onions, garlic, potatoes, sweet potatoes.",
    never: "Curing in the sun or in a damp basement, or washing anything before it goes into storage.",
  },
};

/** Seed-saving categories: the label on each crop page, and the section of /gardening/seeds, in page order. */
export const SEED_KIND: Record<SeedKind, { label: string; title: string; blurb: string }> = {
  easy: {
    label: "Easy to save: comes true from seed",
    title: "Crops that come true from seed",
    blurb: "Self-pollinating, or easily kept apart, so saved seed breeds true year after year. One packet of an open-pollinated variety can supply every following year.",
  },
  "not-seed": {
    label: "Grown from tubers, cloves, crowns or runners, not seed",
    title: "Propagated vegetatively",
    blurb: "Grown from tubers, cloves, crowns, runners or cuttings. The plant material itself is saved: the largest cloves, the healthiest tubers, the strongest runners.",
  },
  biennial: {
    label: "Biennial: flowers in its second year",
    title: "Biennials: seed in the second year",
    blurb: "These form a root or head in the first year and set seed in the second. In cold climates the plant must be stored over winter and replanted, or heavily mulched in place.",
  },
  "cross-prone": {
    label: "Cross-pollinates readily: needs isolation",
    title: "Cross-pollinating crops: isolation needed",
    blurb: "Insects or wind carry pollen between varieties, and between crops of the same species, so saved seed will not breed true unless only one variety is grown or the flowers are bagged.",
  },
  "hybrid-common": {
    label: "Most garden varieties are hybrids",
    title: "Usually hybrids: check the packet",
    blurb: "Most garden varieties of these are F1 hybrids, bred from two parent lines; their seed germinates but does not reproduce the parent plant. Choose ‘open-pollinated’ or ‘heirloom’ varieties for seed saving.",
  },
};

const INTL_NAMES: Record<string, string> = {
  zucchini: "Courgettes (zucchini)", eggplant: "Aubergines (eggplant, brinjal)", cilantro: "Coriander",
  rocket: "Rocket", beet: "Beetroot", rutabaga: "Swedes", "hot-pepper": "Chillies",
};
const localCache = new Map<string, Crop[]>();
/** All crops, named for the country. */
export function localCrops(countryCode?: string): Crop[] {
  const na = !countryCode || countryCode === "US" || countryCode === "CA";
  if (na) return ALL_CROPS;
  const hit = localCache.get("intl");
  if (hit) return hit;
  const words = (t: string) => t.replace(/\bcilantro\b/gi, "coriander").replace(/\bzucchini\b/gi, "courgettes").replace(/\beggplants?\b/gi, "aubergine").replace(/\brutabagas?\b/gi, "swede");
  const out = ALL_CROPS.map((c) => ({ ...c, name: INTL_NAMES[c.slug] ?? c.name, tagline: words(c.tagline) }));
  localCache.set("intl", out);
  return out;
}
/** One crop's name for the country. */
export const cropName = (c: { slug: string; name: string }, countryCode?: string) =>
  !countryCode || countryCode === "US" || countryCode === "CA" ? c.name : (INTL_NAMES[c.slug] ?? c.name);
