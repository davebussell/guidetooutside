/**
 * Which conservation organisations a page should name, and in what order.
 *
 * `orgsFor(place, { topic, waters, limit })` ranks the library for a place:
 * the organisation whose named water or home radius covers the town first,
 * then the province or state and ecoregion bodies, then the national partner,
 * then the continental and world networks. Within a geography tier, an
 * organisation that works on the page's topic outranks a general one, one
 * matched by name (the page's water, or the town itself) outranks one matched
 * by a circle on the map, one registered in the reader's country outranks one
 * from abroad whose region reaches it, one that fits more of the page's
 * topics (the first counts most) outranks one that fits fewer, and a narrower
 * remit outranks a wider one. Every
 * result carries a one-line `why` the page can print ("Covers the Ottawa
 * River", "Works across Ontario", "Canada's BirdLife partner").
 *
 * With a `limit`, a panel whose places are all taken by local bodies still
 * keeps one place for the national partner (the best topical tier-1 match),
 * so a reader always meets their country's body once.
 *
 * Each match's `org` carries only the asks that happen where the place is
 * (`asksAt`): an ask tied to one site (`localAsks`) is left out elsewhere.
 *
 * Only what the body's own pages back is printed (src/lib/conservation/sources.ts):
 * a named water counts only when sourced, and a town in `places` reads "Works in"
 * only with a `placeSources` page; without one, its own circle or box may still
 * give "Works around <town>".
 *
 * The library is the only source of names: nothing here invents, geocodes or
 * fetches. `regionOf` is the site's own ecoregion classifier, so the ecoregion
 * a visitor is matched to here is the same one the rest of their page uses.
 */
import { FOOD_ROLES, ORGANISATIONS, TOPIC_LABEL, type FoodRole, type Organisation, type ServiceArea, type Topic } from "@/data/conservation";
import { regionOf } from "@/lib/region";
import { admin1Name, countryWords, kmBetween, withArticle } from "./geo-words";
import { placeSourced, sourcedWaters } from "./sources";

export type MatchPlace = {
  lat: number;
  lon: number;
  /** ISO alpha-2; "" when unknown (only geometric, ecoregion and world matches then apply). */
  countryCode: string;
  admin1Code?: string;
  /** The province or state's name ("Ontario"), when known; the code is named from a table otherwise. */
  admin1?: string;
  slug?: string;
  name?: string;
  country?: string;
};

export type OrgMatch = {
  org: Organisation;
  /** 0 = world/continent, 1 = national, 2 = ecoregion or province/state, 3 = named water or home radius. */
  tier: 0 | 1 | 2 | 3;
  topical: boolean;
  why: string;
};

export type MatchOptions = {
  /** The page's subject; organisations working on it rank first within a tier. */
  topic?: Topic | Topic[];
  /** Named waters or landscapes on the page ("Ottawa River"); an organisation listing one is a tier-3 match. */
  waters?: string[];
  /** Species slugs on the page; an organisation listing one is treated as topical. */
  species?: string[];
  limit?: number;
  /** Leave out world and continental networks (regional guides list them separately). */
  localOnly?: boolean;
  /**
   * Only food organisations (topic `food`) with one of these roles; at the same
   * tier, one whose role is listed earlier ranks above one listed later.
   */
  foodRoles?: FoodRole[];
  /** Organisation slugs to leave out (shown elsewhere on the page). */
  exclude?: string[];
};

const SCOPE_RANK: Record<Organisation["scope"], number> = { local: 3, regional: 2, national: 1, international: 0 };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * Whether an organisation's circle, box or ecoregion may reach a place in another country. A radius drawn round
 * Windsor crosses the Detroit River, and an ecoregion straddles the border, but a group registered in one country
 * works in it unless it says otherwise: a country or province area names its countries, and `places` names towns,
 * so those carry a cross-border claim; a circle, a box or an ecoregion does not (the 5 Nov 2026 audit found Windsor's
 * community gardens and naturalists listed for Detroit, and Pollinator Partnership Canada on US pages). A body with
 * no country of its own, an international one, or one marked `acrossBorders` (all-island, binational) keeps its
 * geometry everywhere.
 */
function geometryAtHome(org: Pick<Organisation, "countryCode" | "scope" | "acrossBorders">, p: MatchPlace): boolean {
  return !org.countryCode || !p.countryCode || org.countryCode === p.countryCode || org.scope === "international" || !!org.acrossBorders;
}

/**
 * The distance in km from a point to a line drawn through `line`'s points in order, on a flat projection of each
 * segment (good to well under 1% at the tens of kilometres a corridor is drawn to).
 */
export function kmToLine(lat: number, lon: number, line: [number, number][]): number {
  const R = 6371;
  let best = Infinity;
  for (let i = 0; i < line.length; i++) {
    const [aLat, aLon] = line[i];
    const [bLat, bLon] = line[Math.min(i + 1, line.length - 1)];
    const k = Math.cos((((aLat + bLat) / 2) * Math.PI) / 180);
    // Kilometres east and north of the segment's start.
    const bx = ((bLon - aLon) * Math.PI * R * k) / 180;
    const by = ((bLat - aLat) * Math.PI * R) / 180;
    const px = ((lon - aLon) * Math.PI * R * k) / 180;
    const py = ((lat - aLat) * Math.PI * R) / 180;
    const len = bx * bx + by * by;
    const t = len ? Math.max(0, Math.min(1, (px * bx + py * by) / len)) : 0;
    best = Math.min(best, Math.hypot(px - t * bx, py - t * by));
  }
  return best;
}

function areaTier(area: ServiceArea, p: MatchPlace, ecoregion: string | undefined, continent: string | undefined, atHome = true): 0 | 1 | 2 | 3 | -1 {
  switch (area.kind) {
    case "world":
      return 0;
    case "continent":
      return continent === area.continent ? 0 : -1;
    case "country":
      return !!p.countryCode && area.countries.includes(p.countryCode) ? 1 : -1;
    case "admin1":
      return !!p.countryCode && area.countryCode === p.countryCode && !!p.admin1Code && area.admin1Codes.includes(p.admin1Code) ? 2 : -1;
    case "ecoregion":
      if (!atHome || !ecoregion || !area.ecoregions.includes(ecoregion)) return -1;
      return !area.corridor || kmToLine(p.lat, p.lon, area.corridor.line) <= area.corridor.km ? 2 : -1;
    case "radius":
      return atHome && kmBetween(area.lat, area.lon, p.lat, p.lon) <= area.km ? 3 : -1;
    case "box":
      return atHome && p.lat >= area.latMin && p.lat <= area.latMax && p.lon >= area.lonMin && p.lon <= area.lonMax ? 3 : -1;
  }
}

/**
 * The asks a town page may print for an organisation: every ask, except a site's own ask (`localAsks`) whose areas do
 * not reach the place. A country-wide body keeps its country-wide asks everywhere, and its one farm's workshop only
 * near that farm (the 10 Nov 2026 audit found Rodale's Kutztown workshop and market asks on ten towns' pages from
 * Portland, Maine to Savannah, and Canadian Organic Growers' Ontario-only school programme in the Maritimes).
 */
export function asksAt(org: Pick<Organisation, "asks" | "localAsks" | "countryCode" | "scope" | "acrossBorders">, place: MatchPlace, eco = regionOf(place.lat, place.lon)): string[] {
  if (!org.localAsks?.length) return org.asks;
  const where = new Map(org.localAsks.map((l) => [l.ask, l.areas]));
  const atHome = geometryAtHome(org, place);
  return org.asks.filter((a) => {
    const areas = where.get(a);
    return !areas || areas.some((x) => areaTier(x, place, eco?.slug as string | undefined, eco?.continent as string | undefined, atHome) >= 0);
  });
}

/** The organisation as a town page prints it: the same record, with only the asks that happen where the town is. */
function atPlace(org: Organisation, place: MatchPlace, eco: ReturnType<typeof regionOf>): Organisation {
  if (!org.localAsks?.length) return org;
  const asks = asksAt(org, place, eco);
  return asks.length === org.asks.length ? org : { ...org, asks };
}

/** How a match was made, for the `why` line and the tie-break. */
type Via = "water" | "place" | "geo" | "admin1" | "ecoregion" | "country" | "wide";

const AREA_VIA: Record<ServiceArea["kind"], Via> = {
  world: "wide",
  continent: "wide",
  country: "country",
  admin1: "admin1",
  ecoregion: "ecoregion",
  radius: "geo",
  box: "geo",
};

/** ", from the US" when the organisation is registered outside the reader's country. */
const fromAbroad = (org: Organisation, p: MatchPlace) => (org.countryCode && p.countryCode && org.countryCode !== p.countryCode ? `, from ${countryWords(org.countryCode)}` : "");

function whyFor(org: Organisation, tier: number, via: Via, p: MatchPlace, water?: string): string {
  if (water) return `Covers ${withArticle(water)}`;
  if (via === "place") return p.name ? `Works in ${p.name}` : "Works in your area";
  if (tier === 3) return p.name ? `Works around ${p.name}` : "Works in your area";
  // A province, state or ecoregion match says the body works across it, whatever its scope: "Nearby" claimed a nearness
  // nothing measured. The 11 Nov 2026 audit found Texas Stream Team, a statewide programme based at San Marcos,
  // "Nearby, in Texas" at Houston.
  if (tier === 2) {
    if (via === "admin1" && p.admin1Code && p.countryCode) {
      // The table's name first: it carries the article ("Works across the District of Columbia", found in Washington while
      // fixing the 10 Nov 2026 audit), and the place's own admin1 string where the table has none.
      const table = admin1Name(p.countryCode, p.admin1Code);
      const name = table !== p.admin1Code ? table : p.admin1 || table;
      return `Works across ${name}`;
    }
    return `Covers your region${fromAbroad(org, p)}`;
  }
  if (tier === 1) {
    const country = p.countryCode ? countryWords(p.countryCode) : (p.country ?? "");
    if (org.network === "BirdLife International") return `${country ? `${country.replace(/^the /, "The ")}’s` : "Your country’s"} BirdLife partner`;
    return country ? `Across ${country}${fromAbroad(org, p)}` : "National";
  }
  return org.kind === "network" ? "International network" : "International";
}

type Ranked = OrgMatch & { named: boolean; home: boolean; fit: number; role: number };

/** The position of the organisation's first food role in `roles` (-1 when it has none of them). */
export function foodRoleRank(org: Pick<Organisation, "foodRoles">, roles: readonly FoodRole[]): number {
  const own = org.foodRoles ?? [];
  const i = roles.findIndex((r) => own.includes(r));
  return i;
}

/** The organisation's first food role in `roles`' order, for grouping cards under a role heading. */
export const foodRoleOf = (org: Pick<Organisation, "foodRoles">, roles: readonly FoodRole[]): FoodRole | undefined => roles[foodRoleRank(org, roles)];

const isFoodOrg = (org: Organisation) => org.topics.includes("food") && !!org.foodRoles?.length;

/**
 * Whether a named-water hit may count for this organisation at this place. A
 * long river or a Great Lake runs past many towns, so a group whose patch is a
 * circle or box (a city's oyster project, a stretch of a river) only claims its
 * water inside that patch, in its own country: the circle is how far the group
 * says it works. A group defined by province, country or ecoregion must already
 * serve the place. "Hudson River" on an Albany page then no longer surfaces a
 * New York harbour project, "Seine" never reaches Winnipeg, and Friends of the
 * Detroit River no longer "covers Lake Erie" at Cleveland, 140 km from its
 * 45 km circle (5 Nov 2026 audit).
 */
function waterReach(org: Organisation, place: MatchPlace, tier: number): boolean {
  const patches = org.areas.filter((a) => a.kind === "radius" || a.kind === "box");
  if (!patches.length) return tier >= 1;
  if (!geometryAtHome(org, place)) return false;
  return patches.some((a) =>
    a.kind === "radius"
      ? kmBetween(a.lat, a.lon, place.lat, place.lon) <= a.km
      : a.kind === "box" && place.lat >= a.latMin && place.lat <= a.latMax && place.lon >= a.lonMin && place.lon <= a.lonMax,
  );
}

function rankAll(place: MatchPlace, opts: MatchOptions): Ranked[] {
  const topicList: Topic[] = Array.isArray(opts.topic) ? opts.topic : opts.topic ? [opts.topic] : [];
  const topics = new Set<Topic>(topicList);
  // Padded with spaces so a match is whole words: "Lea" is not in "Leamington Pond".
  const waters = (opts.waters ?? []).map(norm).filter(Boolean).map((w) => ` ${w} `);
  const species = new Set(opts.species ?? []);
  const eco = regionOf(place.lat, place.lon);
  const ecoregion = eco?.slug as string | undefined;
  const continent = eco?.continent as string | undefined;
  const roles = opts.foodRoles?.length ? opts.foodRoles : null;
  const exclude = new Set(opts.exclude ?? []);

  const out: Ranked[] = [];
  for (const org of ORGANISATIONS) {
    if (exclude.has(org.slug)) continue;
    let role = 0;
    if (roles) {
      if (!isFoodOrg(org)) continue;
      role = foodRoleRank(org, roles);
      if (role < 0) continue;
    }
    let tier: -1 | 0 | 1 | 2 | 3 = -1;
    let via: Via = "wide";
    const atHome = geometryAtHome(org, place);
    for (const a of org.areas) {
      const t = areaTier(a, place, ecoregion, continent, atHome);
      // Between two areas of the same tier, a province/state names the reader's place better than an ecoregion.
      if (t > tier || (t === tier && t === 2 && a.kind === "admin1")) {
        tier = t;
        via = AREA_VIA[a.kind];
      }
    }
    // A named-water hit only counts for an organisation that already serves the place's
    // geography or is registered in its country: "Seine" on a Paris page must not surface
    // Winnipeg's Save Our Seine, and "Red River" belongs to two continents.
    let water: string | undefined;
    // Only the waters its own pages name (sources.ts): the 13 Nov 2026 audit found Coyote Creek, the Guadalupe River,
    // the New River and the Orange River on lists that no page of the body names, each a "Covers" line in waiting.
    const ownWaters = org.waters?.length ? sourcedWaters(org) : [];
    if (waters.length && ownWaters.length && waterReach(org, place, tier)) {
      // The page lists its waters most prominent first (estuary, big lake, big river, then the
      // named rivers and lakes), so the reason names the biggest water the organisation covers.
      const own = ownWaters.map((w) => [w, ` ${norm(w)} `] as const);
      let hit: string | undefined;
      for (const pw of waters) {
        hit = own.find(([, nw]) => nw.trim() && (pw.includes(nw) || nw.includes(pw)))?.[0];
        if (hit) break;
      }
      if (hit) {
        water = hit;
        tier = 3;
        via = "water";
      }
    }
    // "Works in <town>" only with a page on the body's own site naming its presence there (`placeSources`). A listed
    // town with no such page keeps the "named for this town" rank where its own circle or box reaches it, and reads
    // "Works around <town>" from that circle; elsewhere the listing counts for nothing. The 13 Nov 2026 audit found
    // Native Seeds/SEARCH "Works in Phoenix", CDFW and Save The Bay "Works in San Jose" and St. Johns Riverkeeper
    // "Works in Orlando", none named on their sites.
    const listed = !!place.slug && !!org.places?.includes(place.slug);
    if (listed && placeSourced(org, place.slug)) {
      tier = 3;
      if (!water) via = "place";
    }
    if (tier < 0) continue;
    if (opts.localOnly && tier === 0) continue;
    const matched = tier as 0 | 1 | 2 | 3;
    const speciesHit = !!org.species?.some((s) => species.has(s));
    const topical = topics.size === 0 || org.topics.some((t) => topics.has(t)) || speciesHit;
    // How well it fits the page's subject: the first topic counts most, a species named on the page more still.
    let fit = speciesHit ? topicList.length + 1 : 0;
    topicList.forEach((t, i) => {
      if (org.topics.includes(t)) fit += topicList.length - i;
    });
    const home = !org.countryCode || !place.countryCode || org.countryCode === place.countryCode;
    out.push({ org: atPlace(org, place, eco), tier: matched, topical, why: whyFor(org, matched, via, place, water), named: via === "water" || via === "place" || (listed && via === "geo" && matched === 3), home, fit, role });
  }

  out.sort((a, b) => {
    if (b.tier !== a.tier) return b.tier - a.tier;
    // With food roles asked for, the role the page lists first leads within a tier.
    if (a.role !== b.role) return a.role - b.role;
    if (a.topical !== b.topical) return a.topical ? -1 : 1;
    // The body named for this water or this town before the one whose circle happens to reach it.
    if (a.named !== b.named) return a.named ? -1 : 1;
    // The reader's own country's body before one registered abroad whose region reaches it.
    if (a.home !== b.home) return a.home ? -1 : 1;
    if (a.fit !== b.fit) return b.fit - a.fit;
    const sr = SCOPE_RANK[b.org.scope] - SCOPE_RANK[a.org.scope];
    if (sr) return sr;
    return a.org.name.localeCompare(b.org.name);
  });

  // A page about fish should not list four bird societies before the keeper: when a topic
  // is given, non-topical organisations only fill in after every topical one.
  return topics.size ? [...out.filter((m) => m.topical), ...out.filter((m) => !m.topical)] : out;
}

const strip = ({ named: _named, home: _home, fit: _fit, role: _role, ...m }: Ranked): OrgMatch => {
  void _named;
  void _home;
  void _fit;
  void _role;
  return m;
};

/** A country-wide body that may take the reserved place: national in scope, not a regional society whose area list happens to name the country. */
const isNationalPartner = (m: Ranked) => m.tier === 1 && m.topical && m.org.scope === "national";

/**
 * Cut a ranked list to `limit`, keeping one place for the national partner:
 * when every place went to tier-2/3 bodies and a topical national body exists,
 * it takes the last place. A limit of one keeps the single best match. Only a
 * body whose scope is national qualifies: the 5 Nov 2026 audit found the North
 * American Native Plant Society ("Across Canada", a regional society with a
 * country area) filling a local heading in Regina this way.
 */
function cut(ranked: Ranked[], limit: number | undefined): Ranked[] {
  if (typeof limit !== "number") return ranked;
  const head = ranked.slice(0, Math.max(0, limit));
  if (limit < 2 || ranked.length <= limit || head.some((m) => m.tier <= 1)) return head;
  const national = ranked.slice(limit).find(isNationalPartner);
  if (!national) return head;
  return [...head.slice(0, limit - 1), national];
}

/**
 * How an organisation's own areas reach a place (named waters aside): 3 radius,
 * box or a sourced town (`placeSources`), 2 province/state or ecoregion,
 * 1 country, 0 world or continent, -1 not at all. For "where they work" lists.
 */
export function servesTier(org: Organisation, place: MatchPlace): -1 | 0 | 1 | 2 | 3 {
  const eco = regionOf(place.lat, place.lon);
  let tier: -1 | 0 | 1 | 2 | 3 = -1;
  const atHome = geometryAtHome(org, place);
  for (const a of org.areas) {
    const t = areaTier(a, place, eco?.slug as string | undefined, eco?.continent as string | undefined, atHome);
    if (t > tier) tier = t;
  }
  if (placeSourced(org, place.slug)) tier = 3;
  return tier;
}

/** Organisations for a place, best match first. */
export function orgsFor(place: MatchPlace, opts: MatchOptions = {}): OrgMatch[] {
  return cut(rankAll(place, opts), opts.limit).map(strip);
}

/** The site sections an overview page sums up, with the topics each one's panel asks for. */
export type SectionKey = "fishing" | "gardening" | "foraging" | "homesteading" | "ground" | "young";

export const SECTION_TOPICS: Record<SectionKey, Topic[]> = {
  fishing: ["fish", "water"],
  gardening: ["pollinators", "birds", "plants", "soil-seeds"],
  foraging: ["plants", "land", "forests"],
  homesteading: ["soil-seeds", "water", "forests", "pollinators"],
  ground: ["ground", "land"],
  young: ["youth"],
};

export const SECTION_TITLE: Record<SectionKey, string> = {
  fishing: "Water and fish",
  gardening: "Gardens, birds and pollinators",
  foraging: "Wild plants, woods and land",
  homesteading: "Soil, seed, water and trees",
  ground: "Rock, caves and dark skies",
  young: "Young people",
};

export type SectionOrgs = { section: SectionKey; title: string; topics: Topic[]; matches: OrgMatch[] };

/**
 * The best few organisations per site section, for an overview page's
 * four-up panel: each section's topical matches, best first, with no
 * organisation listed twice across the sections (a body that fits two goes
 * to the first). Sections with no topical match are left out. One national
 * partner is kept across the whole panel when the local bodies fill it.
 */
export function orgsForSections(
  place: MatchPlace,
  opts: { sections?: SectionKey[]; per?: number; waters?: string[]; localOnly?: boolean } = {},
): SectionOrgs[] {
  const sections = opts.sections ?? ["fishing", "gardening", "foraging", "young"];
  const per = opts.per ?? 2;
  const used = new Set<string>();
  const out: SectionOrgs[] = [];
  const pools = new Map<SectionKey, Ranked[]>();
  for (const s of sections) {
    const ranked = rankAll(place, { topic: SECTION_TOPICS[s], waters: s === "fishing" || s === "homesteading" ? opts.waters : undefined, localOnly: opts.localOnly }).filter((m) => m.topical);
    pools.set(s, ranked);
    const picks = ranked.filter((m) => !used.has(m.org.slug)).slice(0, per);
    for (const m of picks) used.add(m.org.slug);
    if (picks.length) out.push({ section: s, title: SECTION_TITLE[s], topics: SECTION_TOPICS[s], matches: picks.map(strip) });
  }
  // The national partner, once: if no section shows a tier-1 body, the last pick of the
  // first section that has a topical tier-1 candidate gives way to it.
  if (!out.some((s) => s.matches.some((m) => m.tier <= 1))) {
    for (const s of out) {
      const cand = pools.get(s.section)!.find((m) => isNationalPartner(m) && !used.has(m.org.slug));
      if (cand && s.matches.length >= per) {
        s.matches = [...s.matches.slice(0, per - 1), strip(cand)];
        break;
      }
    }
  }
  return out;
}

/**
 * With no place known: the world-wide bodies that work on the page's topic or
 * species, best fit first (a page with no reader's town still names the
 * international networks a reader anywhere can join).
 */
export function orgsAnywhere(opts: { topic?: Topic | Topic[]; species?: string[]; limit?: number } = {}): OrgMatch[] {
  const topicList: Topic[] = Array.isArray(opts.topic) ? opts.topic : opts.topic ? [opts.topic] : [];
  const species = new Set(opts.species ?? []);
  const scored = ORGANISATIONS.filter((o) => o.areas.some((a) => a.kind === "world"))
    .map((org) => {
      const speciesHit = !!org.species?.some((s) => species.has(s));
      let fit = speciesHit ? topicList.length + 1 : 0;
      topicList.forEach((t, i) => {
        if (org.topics.includes(t)) fit += topicList.length - i;
      });
      return { org, fit, topical: !topicList.length || fit > 0 };
    })
    .filter((m) => m.topical)
    .sort((a, b) => b.fit - a.fit || a.org.name.localeCompare(b.org.name));
  const out = scored.map(({ org }) => ({ org, tier: 0 as const, topical: true, why: org.kind === "network" ? "International network" : "International" }));
  return typeof opts.limit === "number" ? out.slice(0, opts.limit) : out;
}

/** Organisations working on a topic in a country (for hub and region pages). */
export function orgsByTopic(topic: Topic, countryCode?: string): Organisation[] {
  return ORGANISATIONS.filter((o) => o.topics.includes(topic) && (!countryCode || o.countryCode === countryCode || o.areas.some((a) => a.kind === "country" && a.countries.includes(countryCode))));
}

/** Every organisation that serves an ecoregion (by ecoregion area, by country within it is the region page's job). */
export function orgsInEcoregion(ecoregion: string): Organisation[] {
  return ORGANISATIONS.filter((o) => o.areas.some((a) => a.kind === "ecoregion" && a.ecoregions.includes(ecoregion)));
}

export const topicLabel = (t: Topic) => TOPIC_LABEL[t];

// ---- food and growing ------------------------------------------------------------

/**
 * The food roles each part of the site asks for, most wanted first: a
 * gardening page leads with community gardens, a foraging page with the codes
 * and the fruit-gleaning groups, a fishing page with the seafood guides.
 */
export const SECTION_FOOD: Record<string, FoodRole[]> = {
  gardening: ["community-gardens", "community-farms", "seed-library", "school-gardens", "growing-advice", "local-food"],
  /** /gardening/seeds: seed libraries first. */
  seeds: ["seed-library", "community-gardens", "community-farms", "growing-advice", "school-gardens"],
  /** /gardening/crops, /preserving, /recipes: where to buy local food and where surplus goes. */
  kitchen: ["local-food", "markets", "food-rescue", "community-farms"],
  foraging: ["foraging-code", "gleaning", "community-farms", "local-food", "seed-library"],
  // Seafood guides, then where to buy fish and food caught and grown nearby (not school meals or food banks).
  fishing: ["sustainable-seafood", "markets"],
  homesteading: ["community-farms", "local-food", "markets", "seed-library", "growing-advice", "food-rescue"],
  learn: ["school-gardens", "community-gardens", "community-farms"],
  young: ["school-gardens", "community-gardens", "community-farms"],
  resources: [...FOOD_ROLES],
};

const CONTINENT_NAME: Record<string, string> = { "north-america": "North America", europe: "Europe", africa: "Africa" };

/** "International network", "International", "Across Europe". */
function wideWhy(org: Organisation): string {
  if (org.areas.some((a) => a.kind === "world")) return org.kind === "network" ? "International network" : "International";
  const c = org.areas.find((a): a is Extract<ServiceArea, { kind: "continent" }> => a.kind === "continent");
  return c ? `Across ${CONTINENT_NAME[c.continent] ?? "the continent"}` : "International";
}

/** The countries a no-place panel names a national body for first (the site's biggest readerships), then the rest by name. */
const ANYWHERE_COUNTRIES = ["CA", "US", "GB", "IE", "ZA", "KE"];

/**
 * With no place known: the food bodies for these roles that a reader anywhere
 * can use (world-wide and continental first), then, to fill `limit`, one
 * national body per country, the biggest readerships first — each saying where
 * it works, so a reader can tell which is theirs.
 */
export function foodAnywhere(roles: FoodRole[], opts: { limit?: number; exclude?: string[] } = {}): OrgMatch[] {
  const limit = opts.limit ?? 3;
  const exclude = new Set(opts.exclude ?? []);
  const pool = ORGANISATIONS.filter((o) => isFoodOrg(o) && !exclude.has(o.slug) && foodRoleRank(o, roles) >= 0);
  const wide = pool
    .filter((o) => o.areas.some((a) => a.kind === "world" || a.kind === "continent"))
    .sort((a, b) => foodRoleRank(a, roles) - foodRoleRank(b, roles) || Number(b.areas.some((x) => x.kind === "world")) - Number(a.areas.some((x) => x.kind === "world")) || a.name.localeCompare(b.name))
    .map((org): OrgMatch => ({ org, tier: 0, topical: true, why: wideWhy(org) }));
  const out = wide.slice(0, limit);
  if (out.length >= limit) return out;
  const national = pool.filter((o) => o.scope === "national" && o.countryCode && o.areas.some((a) => a.kind === "country"));
  const countries = [...new Set(national.map((o) => o.countryCode!))].sort((a, b) => {
    const ia = ANYWHERE_COUNTRIES.indexOf(a);
    const ib = ANYWHERE_COUNTRIES.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || countryWords(a).localeCompare(countryWords(b));
  });
  for (const cc of countries) {
    if (out.length >= limit) break;
    const best = national.filter((o) => o.countryCode === cc).sort((a, b) => foodRoleRank(a, roles) - foodRoleRank(b, roles) || a.name.localeCompare(b.name))[0];
    if (best) out.push({ org: best, tier: 1, topical: true, why: `Across ${countryWords(cc)}` });
  }
  return out;
}
