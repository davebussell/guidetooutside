/**
 * The kinds of rock and surface deposit (/ground/rocks/<slug>), and the
 * lithology matching that names the rock under a place on /ground/<town>.
 *
 * Extracted from the captured /ground/rocks pages (index order) and
 * /ground/rocks/<slug> pages: every section of each page, the RockTester
 * client props (grainClass, streakHex, mohs, gcc, soak, fizz, swatch, texture
 * — the live field names), and the family panels. `soilEffect` is the
 * three-way value behind the "What it does to the soil" sentence and the
 * ground pages' pH badge (SOIL_EFFECT). The text of each ground-page layer
 * ("What it is", "Weathering", "Effect on soil and vegetation") is the rock's
 * `what`, `wears` and `above`.
 *
 * Matching (changed Nov 2026 after the Ottawa audit): the rock is the one the
 * map lists FIRST where the list is in order of dominance (not alphabetical),
 * tested with LITHOLOGY_RULES; a minor or later lithology never names the rock. Surface
 * deposits are matched separately (DEPOSIT_RULES) by what the map calls them.
 * A unit no rule matches is shown by its map name with no rock page.
 */

import data from "@/data/rocks.json";

export type RockFamily = "igneous" | "sedimentary" | "metamorphic" | "deposit";
export type SoilEffect = "acid" | "neutral" | "alkaline";

export type Rock = {
  slug: string;
  name: string;
  family: RockFamily;
  /** The header badge, "Soil pH usually 4.5–5.5". */
  ph: string;
  tagline: string;
  /** "How it forms" */
  forms: string;
  /** Facts: "What type of rock" */
  type: string;
  /** "What it's made of" */
  madeOf: string;
  /** "Grain size" */
  grain: string;
  grainClass: "coarse" | "medium" | "fine" | "mixed" | "loose";
  colour: string;
  luster: string;
  streak: string;
  streakHex: string;
  hardness: string;
  /** Mohs hardness range, for the tester (none for loose or very variable material). */
  mohs?: [number, number];
  density: string;
  /** Density range, g/cm³. */
  gcc?: [number, number];
  porosity: string;
  /** How readily a drop of water soaks in, 0–2. */
  soak: number;
  /** "Does it fizz in acid?" */
  acid: string;
  fizz: "no" | "some" | "yes" | "powdered";
  /** "What it forms from" */
  formsFrom: string;
  /** "What it turns into" */
  becomes: string;
  /** "How long it takes to form" */
  howLong?: string;
  /** "Where in the world" */
  world: string;
  /** "What it is" */
  what: string;
  /** "How to know it" */
  identify: string;
  /** "How it wears" (ground pages: "Weathering") */
  wears: string;
  /** "What it means above ground" (ground pages: "Effect on soil and vegetation") */
  above: string;
  /** "Where you stand on it" */
  where: string;
  /** "What lives on it" */
  lives: string;
  /** "What it's used for" */
  uses: string;
  soilEffect: SoilEffect;
  /** Tester drawing colour and surface. */
  swatch: string;
  texture: string;
  faqs: { q: string; a: string }[];
  /** "Next to it in the cycle" */
  next: { slug: string; note: string }[];
  sources: { label: string; url: string }[];
};

export const ROCKS = data as unknown as Rock[];
export const getRock = (slug: string) => ROCKS.find((r) => r.slug === slug);

/** The family panel on each rock page, and the family badge label. */
export const ROCK_FAMILIES: Record<RockFamily, { label: string; title: string; blurb: string }> = {
  igneous: {
    label: "Igneous",
    title: "Igneous — cooled from molten",
    blurb: "Rock that was liquid. Cooled slowly at depth it grows crystals big enough to see; cooled fast at the surface the crystals never get the chance, and the rock comes out fine and dark. Everything else on this page started as one of these.",
  },
  sedimentary: {
    label: "Sedimentary",
    title: "Sedimentary — laid down in layers",
    blurb: "Rock built from the wreckage of older rock, or from the remains of things that lived — sand, mud, shell and skeleton, settled in flat beds and buried until the weight turned them to stone. Where nearly all fossils are found.",
  },
  metamorphic: {
    label: "Metamorphic",
    title: "Metamorphic — changed by heat and pressure",
    blurb: "Rock taken deep, squeezed and heated until its minerals regrew in new forms, without ever melting. The new minerals line up under the pressure, which is why so many of these split in sheets or come out in stripes.",
  },
  deposit: {
    label: "Surface deposits",
    title: "Surface deposits — not yet rock",
    blurb: "Not rock at all — the loose material lying on top of it, dropped by ice or rivers within the last couple of million years. It is what most people actually dig in, and in a lot of North America it is metres thick.",
  },
};

/** What a rock does to the soil: the rock page's sentence and the ground page's badge. */
export const SOIL_EFFECT: Record<SoilEffect, { sentence: string; badge: string }> = {
  acid: { sentence: "Sours the soil above it — nothing in it neutralises rain, so the ground stays acid.", badge: "Lowers soil pH" },
  neutral: { sentence: "Neither sweetens nor sours — the soil above takes its pH from elsewhere.", badge: "Little effect on pH" },
  alkaline: { sentence: "Sweetens the soil above it — raises pH, and grows a lime-loving flora.", badge: "Raises soil pH" },
};

/**
 * Rock rules, tested against ONE lithology (the first-listed one, see
 * `dominantLithology`), first match wins: specific rocks before the bare
 * families. Only rocks: surface deposits are matched by DEPOSIT_RULES, because
 * a grain size alone ("silt", "sand", "clay") does not say how a deposit was
 * laid down, and a non-Quaternary "sand" is not a river deposit.
 */
export const LITHOLOGY_RULES: [slug: string, pattern: RegExp][] = [
  ["paragneiss", /paragneiss/],
  // Audit, 10 November 2026: "metavolcanics" (Washington's Chopawamsic Formation) and "Major: metavolcanic" (Portland)
  // matched /volcanic/ and were printed as volcanic rock. A "meta-" rock has been changed by heat and pressure, so it is
  // metamorphic rock, whatever it was before (amphibolite and greenstone, named in the same units, are metamorphic too).
  ["metamorphic-rock", /\bmeta-?(?!morphic\b)[a-z]+|\bamphibolite|\bgreenstone|\bgreenschist/],
  ["dolostone", /dolostone|dolomite/],
  ["quartzite", /quartzite/],
  ["marl", /marlstone/],
  // An oolite is a limestone of ooids (Miami's "Miami Oolite", Macrostrat 4072704: "crystalline, oolitic limestone"; the
  // Miami Limestone was formerly the Miami Oolite, Macrostrat 3923801). Not "oolitic", which also describes loose sand.
  ["limestone", /limestone|\boolite\b/],
  ["chalk", /chalk/],
  ["sandstone", /sandstone/],
  // "granitic" (Charlotte's Granitic rock, Macrostrat 3809670; the same unit on map 2778448 is "Major:{granite}").
  ["granite", /granit(?:e|ic|oid)/],
  ["gneiss", /gneiss/],
  ["schist", /schist/],
  ["marble", /marble/],
  ["shale", /shale|mudstone|claystone|siltstone/],
  ["slate", /slate/],
  ["marl", /\bmarl/],
  ["basalt", /basalt|mafic|diabase/],
  ["igneous-rock", /intrusive|plutonic|crystalline|igneous/],
  ["metamorphic-rock", /metamorphic/],
  ["sedimentary-rock", /sedimentary/],
  // The named lavas and ashes are volcanic rock too (Rome's and Naples' "Quaternary tephrite", Major:{tephrite, basanite}).
  ["volcanic-rock", /(?<!meta)volcanic|extrusive|tephrite|basanite|phonolite|trachyte|andesite|rhyolite|dacite|\btuffs?\b|\blavas?\b|pumice|scoria|ignimbrite|obsidian/],
];

/**
 * Surface-deposit rules, tested against the map's NAME for the unit and then
 * against its first-listed lithology: the map has to say what the deposit is
 * (outwash, till, marine clay, alluvium). The description is not searched, as
 * it lists what the unit merely "includes".
 *
 * "marine-clay" (added Nov 2026; src/data/rocks.json) is written from the
 * Geological Survey of Canada (Aylsworth and Hunter, Geohazards 2003; Gadd,
 * Paper 85-21), The Canadian Encyclopedia's Champlain Sea article and the
 * Macrostrat map unit "Marine Clay And Silt" (map source 504): see its
 * `sources`. "River deposits" is the alluvium entry the map's "Alluvial Silt"
 * and "Quaternary alluvium" units fall under.
 */
export const DEPOSIT_RULES: [slug: string, pattern: RegExp][] = [
  ["marine-clay", /marine\s+(clay|silt)|glaciomarine|champlain|\bleda\b/],
  ["glacial-outwash", /outwash|glaciofluvial|glacio-fluvial/],
  ["glacial-till", /\btill\b|moraine|diamict/],
  ["river-deposits", /alluvi|fluvial|floodplain/],
];

/**
 * The items of a lithology list (or the opening of a description) in the order
 * the map gives them: "shale, limestone, dolostone, siltstone" is four items;
 * Macrostrat lists the dominant lithology first. Handles "a & b" and the
 * "Major:{limestone}, Minor{claystone,sandstone}" form, and "family: rock".
 */
export function lithologyItems(text: string | null | undefined): string[] {
  if (!text) return [];
  let t = text.toLowerCase();
  const major = t.match(/major:\s*\{([^}]*)\}/);
  if (major) t = major[1];
  else {
    // "metamorphic and undivided crystalline: paragneiss": the family, then the rock itself.
    const colon = t.match(/^[^:,{}]+:\s*(.+)$/);
    if (colon) t = colon[1];
  }
  return t
    .split(/[,;&/]|\band\b|\bwith\b|\bplus\b/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** The dominant lithology: the first item not marked minor. Never a later one. */
export function dominantLithology(text: string | null | undefined): string | null {
  return lithologyItems(text).find((i) => !/^(minor|lesser|trace|rare|some)\b/.test(i)) ?? null;
}

/** The items of a lithology list that are not marked minor (a "Major:{...}" list gives only its major items). */
export const majorItems = (text: string | null | undefined) => lithologyItems(text).filter((i) => !/^(minor|lesser|trace|rare|some|incidental)\b/.test(i));

/**
 * Is the list in alphabetical order, so that its order says nothing about which lithology dominates? Two or more bare
 * words in alphabetical order, and not a "Major:{...}" list.
 */
export function isAlphabeticalList(text: string | null | undefined): boolean {
  if (/major:\s*\{/i.test(text ?? "")) return false;
  const items = majorItems(text);
  // Two items count only as a bare comma list ("clay, sand"), Macrostrat's own list form; a phrase the map wrote
  // ("sedimentary and volcaniclastic", "limestone & dolostone") keeps its order.
  if (items.length === 2 && !/^\s*[a-z-]+\s*,\s*[a-z-]+\s*$/i.test(text ?? "")) return false;
  return items.length >= 2 && items.every((x) => /^[a-z-]+$/.test(x)) && items.every((x, i) => i === 0 || items[i - 1].localeCompare(x) <= 0);
}

/**
 * The dominant item of a map unit's lithology LIST, only where the order means something. Audit, 5 November 2026:
 * Macrostrat often gives the list in alphabetical order ("clay, gravel, sand, silt" for Minneapolis alluvium), which
 * says nothing about which dominates. Audit, 10 November 2026: the same holds for two items. Jacksonville's
 * "clay, sand" (Macrostrat 3925298) was read as clay, while the same unit on the USGS state compilation lists sand
 * first as its major lithology (Macrostrat 2906965), and the ground page and the gardening strip disagreed. A list of
 * two or more bare words in alphabetical order gives no answer here; a "Major:{...}" list, a single item, a
 * descriptive phrase, or a list in another order is read as before.
 */
export function dominantInList(text: string | null | undefined): string | null {
  const items = majorItems(text);
  if (!items.length) return null;
  return isAlphabeticalList(text) ? null : items[0];
}

/**
 * Loose material in Macrostrat's lithology words: sand, not sandstone; clay, not claystone. Audit, 10 November 2026:
 * Richmond's Bacons Castle Formation ("Major:{gravel}") and its "Gravel" unit are Pliocene gravel and sand the map
 * itself calls surficial deposits, yet they were taken as bedrock because they began before the Quaternary.
 */
const LOOSE_ITEM =
  /^(?:(?:fine|coarse|sandy|silty|clayey|gravelly|pebbly|muddy|organic|unconsolidated)\s+)*(?:sands?|gravels?|silts?|clays?|muds?|muck|boulders?|cobbles?|pebbles?|peat|alluvium|colluvium|till|loess|outwash|regolith|saprolite|residuum|lag|shells?|ice|sediments?|unconsolidated(?:\s+\w+)*)$/;

/** Is one lithology item loose material ("sand", "coarse alluvium", "unconsolidated")? */
export const isLooseItem = (item: string) => LOOSE_ITEM.test(item);

/** Is every main item of the list loose material (sand, gravel, clay...)? False for an empty list. */
export function isLooseLithology(text: string | null | undefined): boolean {
  const items = majorItems(text);
  return items.length > 0 && items.every((x) => LOOSE_ITEM.test(x));
}

/**
 * A lithology item that names only a family of rock ("sedimentary", "sedimentary rocks", "crystalline"), not a rock.
 * Audit of 13 November 2026 (Day 4): Boise's "Sediments and sedimentary rocks" (Macrostrat 4548175) lists
 * "sedimentary, gravel, sand, silt", and the family word made the gravel, sand and silt the town's "sedimentary rock".
 */
export const FAMILY_ITEM = /^(?:(?:undivided|undifferentiated|mixed)\s+)?(?:sedimentary|igneous|metamorphic|volcanic|plutonic|intrusive|extrusive|crystalline)(?:\s+rocks?)?$/;

/** The rock a single lithology item names. */
export function rockForLithology(item: string | null | undefined): Rock | undefined {
  if (!item) return undefined;
  const hit = LITHOLOGY_RULES.find(([, re]) => re.test(item));
  return hit ? getRock(hit[0]) : undefined;
}

type MapUnitText = { name?: string | null; lith?: string | null; description?: string | null };

/** Where the rock was read: this map's lithology list, another map's list for the same unit, the description, the name. */
export type LithSource = "lith" | "other-map" | "description" | "name";

/** A unit name without the words maps add to it ("Manhattan Formation, undivided" = "Manhattan"). */
const unitKey = (name: string | null | undefined) =>
  (name ?? "")
    .toLowerCase()
    .replace(/\b(formation|group|member|complex|undivided|undifferentiated|unit|rocks?)\b/g, "")
    .replace(/[^a-z]+/g, " ")
    .trim();

/**
 * The rock a bedrock unit is, from its DOMINANT lithology only: the map's
 * lithology list where its order means something, else the list another map
 * at the same spot gives for the unit of the same name, else the opening of
 * its description, else its name. A rock is never taken from a later, minor
 * item, and when the dominant item names no rock in the rock pages there is no
 * rock (no fallback to the next item).
 *
 * Audit, 10 November 2026: New York's Manhattan Formation lists "amphibolite, gneiss, granite, schist" in alphabetical
 * order (Macrostrat 3733243), so the list was passed over and the description's opening words named no rock; the
 * USGS state compilation of the same unit gives "Major:{pelitic schist,gneiss,amphibolite}" (Macrostrat 2744519).
 */
export function bedrockRockFor(u: MapUnitText, sameSpot: MapUnitText[] = []): { rock: Rock | undefined; item: string | null; from: LithSource | null } {
  const own = dominantInList(u.lith);
  if (own) return { rock: rockForLithology(own), item: own, from: "lith" };
  const key = unitKey(u.name);
  if (key) {
    for (const o of sameSpot) {
      if (o === u || unitKey(o.name) !== key) continue;
      const item = dominantInList(o.lith);
      const rock = rockForLithology(item);
      if (rock) return { rock, item, from: "other-map" };
    }
  }
  for (const [from, text] of [["description", u.description], ["name", u.name]] as const) {
    const item = dominantLithology(text);
    if (!item) continue;
    const rock = rockForLithology(item);
    if (rock || from !== "name") return { rock, item, from };
  }
  return { rock: undefined, item: null, from: null };
}

/**
 * Deposits the maps name that have no page here: wind-blown silt (loess) and slope debris (colluvium). Audit, 11 November
 * 2026: Memphis's "Loess And Loessial Colluvium And Alluvium" (Macrostrat 4051550), mainly wind-blown silt, was labelled
 * "River deposits" because /alluvi/ matched the last word of its name. These words now count, and name no page.
 */
const NO_PAGE_DEPOSITS: RegExp[] = [/\bloess|\beolian|\baeolian|wind-?blown/, /colluvi/];

/**
 * The surface-deposit type a Quaternary unit is, from its name, else its first-listed lithology. In a name, the deposit
 * word that comes FIRST decides ("Loess And ... Alluvium" is loess, not river deposits); a word with no page stops the
 * search, so no page is shown.
 */
export function depositRockFor(u: MapUnitText): Rock | undefined {
  const test = (text: string): Rock | null | undefined => {
    const t = text.toLowerCase();
    let best: { at: number; slug: string | null } | null = null;
    for (const [slug, re] of [...DEPOSIT_RULES, ...NO_PAGE_DEPOSITS.map((re) => [null, re] as const)]) {
      const at = t.search(re);
      if (at >= 0 && (!best || at < best.at)) best = { at, slug };
    }
    return !best ? undefined : best.slug ? getRock(best.slug) : null;
  };
  const byName = test(u.name ?? "");
  if (byName !== undefined) return byName ?? undefined;
  return test(dominantInList(u.lith) ?? "") ?? undefined;
}
