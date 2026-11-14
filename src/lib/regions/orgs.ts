/**
 * The conservation organisations active in a region, computed from the
 * library (src/data/conservation) and the region's pre-built towns:
 *
 *   in the region   organisations naming the region as an ecoregion area, with
 *                   a radius or box that holds one of its towns (or is centred
 *                   in it), listing one of its towns in `places`, or working
 *                   across a province or state that has towns here;
 *   national        for each country with a town here (and, where the towns
 *                   are few, each country the region's examples name), the
 *                   bodies whose area is that country, BirdLife partner first;
 *   international   the world and continental bodies that serve the region,
 *                   the BirdLife and Waterkeeper finders first, then by how
 *                   well their subjects fit the region's own description;
 *   towns           for each town, what `orgsFor` gives it at tier 2 and 3 —
 *                   the count and the best body for each subject — so the town
 *                   table and the compare widget can set the towns side by side.
 *
 * Every name comes from a library record; nothing here writes one. Server-only
 * (it reads the whole library); the per-town rows are plain data for the client.
 */
import { ORGANISATIONS, TOPICS, TOPIC_LABEL, orgBySlug, type Organisation, type ServiceArea, type Topic } from "@/data/conservation";
import { orgsFor, type MatchPlace } from "@/lib/conservation/match";
import { classifyEcoregion, getEcoregion } from "@/lib/ecoregions";
import KNOWN from "@/lib/served-places";
import { lakeName } from "@/lib/water-names";
import { nameList } from "./format";
import { townsInRegion } from "./towns";
import type { OrgRef, TownOrgs, TownRow } from "./types";

export type { OrgRef, TownOrgs } from "./types";

/** How an organisation belongs to the region. */
export type RegionOrgHow = "local" | "region" | "admin1";

export type RegionOrg = {
  org: Organisation;
  /** "local": its water, radius, box or listed towns are here; "region": it names the region; "admin1": it works across a province or state with towns here. */
  how: RegionOrgHow;
  /** The region's town slugs it covers (empty for a body whose home is in the region but holds no pre-built town). */
  towns: string[];
  /** The line above the name on its card: "Ottawa River · Ottawa", "Across Ontario", "Across the region". */
  why: string;
};

export type CountryOrgs = {
  countryCode: string;
  country: string;
  /** Pre-built towns of the region in this country (0 for a country only the examples name). */
  towns: number;
  orgs: { org: Organisation; why: string }[];
};

export type TopicNames = { topic: Topic; label: string; orgs: { slug: string; name: string }[]; more: number };

export type RegionOrgs = {
  slug: string;
  /** "rich": three or more in the region; "thin": fewer, with national bodies; "empty": fewer, and no national body either. */
  state: "rich" | "thin" | "empty";
  inRegion: RegionOrg[];
  national: CountryOrgs[];
  international: { org: Organisation; why: string }[];
  /** Subject by subject: the names a reader looks for first, in the region before national before international. */
  byTopic: TopicNames[];
  /** Town slug → its counts and best body per subject. */
  towns: Record<string, TownOrgs>;
  /** Towns with no tier 2 or 3 organisation in the library yet. */
  townsWithout: string[];
};

export type RegionOrgSummary = { inRegion: number; national: number; youth: number };

type RegionRecord = { slug: string; name: string; continent?: string; summary: string; landscape: string; fishing: string; foraging: string; level1: string; examples: string[] };

const PLACES = KNOWN as { country: string; countryCode: string }[];

/** Country name → ISO code, from the pre-built places, plus the forms the region examples use. */
const COUNTRY_CODE = new Map<string, string>([
  ...PLACES.map((p) => [p.country, p.countryCode] as [string, string]),
  ["UK", "GB"],
  ["DR Congo", "CD"],
  ["Central African Republic", "CF"],
  ["Réunion", "RE"],
  ["Seychelles", "SC"],
]);
const COUNTRY_NAME = new Map<string, string>(PLACES.map((p) => [p.countryCode, p.country]));
const CA_CODES = new Set(["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"]);

/** "the United States", "the Netherlands", "Canada". */
export const theCountry = (name: string) => (/^(United|Netherlands|Democratic|Republic|Central African)\b/.test(name) ? `the ${name}` : name);

/** The countries a region's examples name: "Cairo, Egypt" → EG, "Thunder Bay, ON" → CA. */
function exampleCountries(r: RegionRecord): { code: string; name: string }[] {
  const out = new Map<string, string>();
  for (const e of r.examples) {
    const tail = e.slice(e.lastIndexOf(", ") + 2);
    if (/^[A-Z]{2}$/.test(tail)) {
      const code = CA_CODES.has(tail) ? "CA" : "US";
      out.set(code, COUNTRY_NAME.get(code) ?? code);
    } else {
      const code = COUNTRY_CODE.get(tail);
      if (code) out.set(code, COUNTRY_NAME.get(code) ?? tail);
    }
  }
  return [...out.entries()].map(([code, name]) => ({ code, name }));
}

/** Below this many towns the countries the examples name are read too. */
const FEW_TOWNS = 6;

const TOPIC_ORDER: Topic[] = ["water", "fish", "birds", "pollinators", "plants", "forests", "land", "wildlife", "soil-seeds", "ground", "youth", "food"];
const topicRank = (o: Organisation) => Math.min(...o.topics.map((t) => TOPIC_ORDER.indexOf(t)).filter((i) => i >= 0), 99);
/** The organisation's own first subject, in the site's subject order. */
const primary = (o: Organisation) => TOPIC_ORDER.indexOf(o.topics[0]);
const SCOPE_RANK: Record<Organisation["scope"], number> = { local: 0, regional: 1, national: 2, international: 3 };

const inBox = (a: Extract<ServiceArea, { kind: "box" }>, lat: number, lon: number) => lat >= a.latMin && lat <= a.latMax && lon >= a.lonMin && lon <= a.lonMax;
const EARTH_KM = 6371;
function km(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(a));
}
const regionAt = (lat: number, lon: number) => classifyEcoregion(lat, lon)?.slug as string | undefined;

/** Whether, and how, an organisation belongs to the region, and the region's towns it covers. */
function membership(org: Organisation, slug: string, towns: TownRow[]): { how: RegionOrgHow; towns: TownRow[]; admin1: string[] } | null {
  const local = new Set<TownRow>();
  let home = false;
  let names = false;
  const admin1Towns = new Set<TownRow>();
  for (const a of org.areas) {
    if (a.kind === "ecoregion" && a.ecoregions.includes(slug)) names = true;
    else if (a.kind === "radius") {
      for (const t of towns) if (km(a.lat, a.lon, t.lat, t.lon) <= a.km) local.add(t);
      if (regionAt(a.lat, a.lon) === slug) home = true;
    } else if (a.kind === "box") {
      for (const t of towns) if (inBox(a, t.lat, t.lon)) local.add(t);
      if (regionAt((a.latMin + a.latMax) / 2, (a.lonMin + a.lonMax) / 2) === slug) home = true;
    } else if (a.kind === "admin1") {
      for (const t of towns) if (t.countryCode === a.countryCode && t.admin1Code && a.admin1Codes.includes(t.admin1Code)) admin1Towns.add(t);
    }
  }
  if (org.places?.length) for (const t of towns) if (org.places.includes(t.slug)) local.add(t);
  const admin1 = [...new Set([...admin1Towns].map((t) => t.admin1))];
  if (local.size || home) return { how: "local", towns: [...local], admin1 };
  if (names) return { how: "region", towns: [...new Set([...local, ...admin1Towns])], admin1 };
  if (admin1Towns.size) return { how: "admin1", towns: [...admin1Towns], admin1 };
  return null;
}

function regionWhy(org: Organisation, m: { how: RegionOrgHow; towns: TownRow[]; admin1: string[] }): string {
  if (m.how === "region") return "Across the region";
  if (m.how === "admin1") return `Across ${nameList(m.admin1, 3)}`;
  const at = m.towns.length ? nameList(m.towns.map((t) => t.name), 3) : "";
  const water = org.waters?.[0];
  if (water && at) return `${water} · ${at}`;
  if (water) return water;
  return at ? `Around ${at}` : "Based in the region";
}

/** The subjects a region's own description speaks to; every region also has birds, wildlife, land, gardens, food and young people. */
function character(r: RegionRecord | undefined): Set<Topic> {
  const set = new Set<Topic>(["birds", "wildlife", "land", "plants", "pollinators", "soil-seeds", "youth", "food"]);
  if (!r) return set;
  const text = `${r.summary} ${r.landscape} ${r.level1}`;
  if (/river|lake|coast|wetland|delta|estuar|marsh|swamp|sea|bay|stream|reef|lagoon|ocean/i.test(`${text} ${r.fishing}`)) set.add("water").add("fish");
  if (/forest|wood|taiga|rainforest|mangrove|spruce|pine|oak|beech|tree/i.test(text)) set.add("forests");
  if (/desert|sand|stony|mountain|alpine|karst|tundra|volcan|plateau|canyon|range|peak/i.test(text)) set.add("ground");
  return set;
}

/** The short form where it is a name a reader knows ("Birds Canada"); an acronym ("ERCA") gives way to the full name. */
export const readableName = (o: Organisation) => (o.shortName && /[a-z]/.test(o.shortName) ? o.shortName : o.name);

function ref(o: Organisation, tier: 2 | 3, t: TownRow): OrgRef {
  const across =
    tier === 2
      ? o.areas.some((a) => a.kind === "admin1" && a.countryCode === t.countryCode && !!t.admin1Code && a.admin1Codes.includes(t.admin1Code))
        ? t.admin1
        : "the region"
      : undefined;
  return { slug: o.slug, name: o.name, short: readableName(o), ...(o.network ? { network: o.network } : {}), tier, ...(across ? { across } : {}) };
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** The town's big water as the library writes it: "Lake Ontario", "Ottawa River". */
function townWaters(t: TownRow): string[] {
  if (!t.waterName) return [];
  if (t.water === "lake") return [lakeName(t.waterName)];
  if (t.water === "river") return [/\b(river|rio|rivière|fleuve)\b/i.test(t.waterName) ? t.waterName : `${t.waterName} River`];
  return [];
}

/**
 * What the matcher gives one town at tier 2 and 3. The town's geography alone
 * decides the matches: its big water is not passed to `orgsFor`, because a
 * river name alone would hand a group at one end of the Mississippi to every
 * town down it. The water only orders the tier-3 bodies, so the one named for
 * the town's own river or lake comes first for water and fish.
 */
function townOrgs(t: TownRow): TownOrgs {
  const place: MatchPlace = { lat: t.lat, lon: t.lon, countryCode: t.countryCode, admin1Code: t.admin1Code ?? undefined, slug: t.slug, name: t.name, country: t.country };
  const near = orgsFor(place, { localOnly: true }).filter((m) => m.tier >= 2);
  const own = townWaters(t).map(norm);
  const onOwnWater = (o: Organisation) => !!own.length && !!o.waters?.some((w) => own.some((x) => norm(w).includes(x) || x.includes(norm(w))));
  const best: TownOrgs["best"] = {};
  for (const topic of TOPICS) {
    // Within a tier, a body that lists the subject first or second before one that lists it further down
    // (a bird society that also plants natives is not the town's plant body while a botanical one is there).
    const main = (m: (typeof near)[number]) => (m.org.topics.indexOf(topic) <= 1 ? 0 : 1);
    const hits = near.filter((m) => m.org.topics.includes(topic)).sort((a, b) => b.tier - a.tier || main(a) - main(b));
    const hit = (topic === "water" || topic === "fish" ? hits.find((m) => m.tier === 3 && onOwnWater(m.org)) : undefined) ?? hits[0];
    if (hit) best[topic] = ref(hit.org, hit.tier as 2 | 3, t);
  }
  return { local: near.length, nearby: near.filter((m) => m.tier === 3).length, best };
}

const NETWORK_FIRST: Record<Organisation["kind"], number> = { network: 0, programme: 1, charity: 2, agency: 3 };

/** The network finders a reader with no local group listed goes to next: they lead the international group. */
const FINDER_SLUGS = ["birdlife-international", "waterkeeper-alliance"];

const CACHE = new Map<string, RegionOrgs>();

/** The organisations active in a region, in three groups, with the per-town rows. */
export function regionOrgs(slug: string): RegionOrgs {
  const hit = CACHE.get(slug);
  if (hit) return hit;
  const region = getEcoregion(slug) as RegionRecord | undefined;
  const continent = region?.continent ?? "north-america";
  const towns = townsInRegion(slug);
  const placed = new Set<string>();

  // (a) In the region.
  const inRegion: RegionOrg[] = [];
  for (const org of ORGANISATIONS) {
    if (org.scope === "national" || org.scope === "international") continue;
    const m = membership(org, slug, towns);
    if (!m) continue;
    inRegion.push({ org, how: m.how, towns: m.towns.map((t) => t.slug), why: regionWhy(org, m) });
    placed.add(org.slug);
  }
  const HOW: Record<RegionOrgHow, number> = { local: 0, region: 1, admin1: 2 };
  // Local first; then by the organisation's own first subject; then the one covering more of the region's towns.
  inRegion.sort(
    (a, b) =>
      HOW[a.how] - HOW[b.how] ||
      primary(a.org) - primary(b.org) ||
      b.towns.length - a.towns.length ||
      SCOPE_RANK[a.org.scope] - SCOPE_RANK[b.org.scope] ||
      a.org.name.localeCompare(b.org.name),
  );

  // (b) National partners, one row per country: the towns' countries, most towns first, then those the examples name.
  const townCount = new Map<string, { name: string; n: number }>();
  for (const t of towns) townCount.set(t.countryCode, { name: t.country, n: (townCount.get(t.countryCode)?.n ?? 0) + 1 });
  const countries = [...townCount.entries()].map(([code, v]) => ({ code, name: v.name, towns: v.n })).sort((a, b) => b.towns - a.towns || a.name.localeCompare(b.name));
  if (region && towns.length < FEW_TOWNS) for (const c of exampleCountries(region)) if (!townCount.has(c.code)) countries.push({ ...c, towns: 0 });

  const national: CountryOrgs[] = [];
  for (const c of countries) {
    const orgs = ORGANISATIONS.filter((o) => {
      if (placed.has(o.slug) || o.scope === "international") return false;
      if (o.areas.some((a) => a.kind === "country" && a.countries.includes(c.code))) return true;
      // A national body whose area is drawn as a box or radius (a nation within the UK, a programme's waters) belongs to its own country's row.
      return o.scope === "national" && o.countryCode === c.code && !!membership(o, slug, towns);
    });
    orgs.sort(
      (a, b) =>
        Number(b.network === "BirdLife International") - Number(a.network === "BirdLife International") ||
        SCOPE_RANK[b.scope] - SCOPE_RANK[a.scope] ||
        topicRank(a) - topicRank(b) ||
        a.name.localeCompare(b.name),
    );
    for (const o of orgs) placed.add(o.slug);
    national.push({
      countryCode: c.code,
      country: c.name,
      towns: c.towns,
      orgs: orgs.map((o) => ({ org: o, why: o.network === "BirdLife International" ? "National partner" : o.topics.slice(0, 2).map((t, i) => (i ? TOPIC_LABEL[t].toLowerCase() : TOPIC_LABEL[t])).join(", ") })),
    });
  }

  // (c) Across the continent and the world.
  const codes = new Set(countries.map((c) => c.code));
  const fit = character(region);
  const international = ORGANISATIONS.filter((o) => {
    if (placed.has(o.slug)) return false;
    const serves = o.areas.some(
      (a) =>
        a.kind === "world" ||
        (a.kind === "continent" && a.continent === continent) ||
        (o.scope === "international" && a.kind === "country" && a.countries.some((cc) => codes.has(cc))) ||
        (o.scope === "international" && a.kind === "ecoregion" && a.ecoregions.includes(slug)),
    );
    return serves && o.topics.some((t) => fit.has(t));
  })
    .map((o) => ({ o, score: o.topics.filter((t) => fit.has(t)).length, finder: FINDER_SLUGS.indexOf(o.slug) }))
    .sort(
      (a, b) =>
        (a.finder < 0 ? 99 : a.finder) - (b.finder < 0 ? 99 : b.finder) || b.score - a.score || NETWORK_FIRST[a.o.kind] - NETWORK_FIRST[b.o.kind] || a.o.name.localeCompare(b.o.name),
    )
    .map(({ o }) => ({ org: o, why: o.areas.some((a) => a.kind === "world") ? (o.kind === "network" ? "International network" : "International") : "Across the continent" }));

  // Subject by subject.
  // In the region before national before international; within each, a body that lists the subject first or
  // second before one that lists it third, a local body before a province-wide one, and the one covering more towns first.
  const byTopic: TopicNames[] = [];
  const at = (o: Organisation, topic: Topic) => o.topics.indexOf(topic);
  for (const topic of TOPIC_ORDER) {
    const main = (o: Organisation) => (at(o, topic) <= 1 ? 0 : 1);
    const local = inRegion.filter((r) => at(r.org, topic) >= 0).sort((a, b) => main(a.org) - main(b.org) || HOW[a.how] - HOW[b.how] || b.towns.length - a.towns.length);
    const nat = national.flatMap((n) => n.orgs.map((x) => x.org)).filter((o) => at(o, topic) >= 0);
    nat.sort((a, b) => main(a) - main(b));
    let list = [...local.map((r) => r.org), ...nat];
    if (!list.length) list = international.map((x) => x.org).filter((o) => o.topics.includes(topic));
    if (!list.length) continue;
    byTopic.push({ topic, label: TOPIC_LABEL[topic], orgs: list.slice(0, 4).map((o) => ({ slug: o.slug, name: readableName(o) })), more: Math.max(0, list.length - 4) });
  }

  const townRows: Record<string, TownOrgs> = {};
  for (const t of towns) townRows[t.slug] = townOrgs(t);

  const out: RegionOrgs = {
    slug,
    state: inRegion.length >= 3 ? "rich" : national.some((n) => n.orgs.length) ? "thin" : "empty",
    inRegion,
    national,
    international,
    byTopic,
    towns: townRows,
    townsWithout: towns.filter((t) => !townRows[t.slug].local).map((t) => t.slug),
  };
  CACHE.set(slug, out);
  return out;
}

const isYouth = (o: Organisation) => o.topics.includes("youth") || !!o.youthProgramme;

/** For the regions index: organisations listed in the region, national bodies of its countries, and how many of either run something for young people. */
export function regionOrgSummary(slug: string): RegionOrgSummary {
  const r = regionOrgs(slug);
  const nat = r.national.flatMap((n) => n.orgs.map((x) => x.org));
  return { inRegion: r.inRegion.length, national: nat.length, youth: [...r.inRegion.map((x) => x.org), ...nat].filter(isYouth).length };
}

/** The library's network finders, for the thin and empty states: the records themselves, so their names and links stay the library's. */
export function finders(): { org: Organisation; href: string; way: "join" | "volunteer"; what: string }[] {
  const out: { org: Organisation; href: string; way: "join" | "volunteer"; what: string }[] = [];
  const [blSlug, wkSlug] = FINDER_SLUGS;
  const bl = orgBySlug(blSlug);
  if (bl?.links.join) out.push({ org: bl, href: bl.links.join, way: "join", what: "partner list" });
  const wk = orgBySlug(wkSlug);
  if (wk?.links.volunteer) out.push({ org: wk, href: wk.links.volunteer, way: "volunteer", what: "finder" });
  return out;
}
