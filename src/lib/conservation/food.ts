/**
 * The food band ("Grow, share and eat well") for a section of the site: the
 * best open food invitation for the place, for the gardening and resources
 * pages the community gardens near the town (from OpenStreetMap) with the
 * body that helps people get a plot, then the food organisations for the
 * section's roles grouped by role, and their latest articles.
 *
 * Server-side: it reads the library and returns plain props, which the
 * presentational `FoodBandView` draws (and the client `NearbyFood` draws from
 * /conservation/food.json on pages rendered once for everyone). Returns null
 * when there is nothing for the place, so a page never carries an empty band.
 */
import { orgBySlug, FOOD_ROLE_LABEL, type FoodRole, type Organisation } from "@/data/conservation";
import { FOOD_NA_ORGS } from "@/data/conservation/food-na";
import { FOOD_EA_ORGS } from "@/data/conservation/food-ea";
import type { CardOrg } from "@/components/conservation/OrgCard";
import { DISCLOSURE } from "@/components/conservation/OrgsPanel";
import { withExtras, type PanelCard } from "./cards";
import { gardensFor, kmLabel, GARDEN_KIND_LABEL, GARDENS_FETCHED, GARDENS_RADIUS_KM, osmFeatureUrl, osmMapUrl } from "./gardens";
import { countryWords } from "./geo-words";
import { invitationsFor, toFeature, type FeatureInvitation } from "./invitations";
import { foodWayFor } from "./food-ways";
import { foodAnywhere, foodRoleOf, foodRoleRank, orgsFor, SECTION_FOOD, type MatchPlace, type OrgMatch } from "./match";
import { orgNews } from "./news";
import type { NewsCard } from "./news-types";
import { seafoodLookups, type SeafoodLookup } from "./seafood";

/** The site sections, plus two gardening presets: `seeds` (seed libraries first) and `kitchen` (the crops, preserving and recipe pages: local food, markets, food rescue). */
export type FoodSection = "gardening" | "seeds" | "kitchen" | "foraging" | "fishing" | "homesteading" | "learn" | "resources";

export const FOOD_SECTIONS: FoodSection[] = ["gardening", "seeds", "kitchen", "foraging", "fishing", "homesteading", "learn", "resources"];

export type FoodGroup = { role: FoodRole; label: string; cards: PanelCard[] };

export type GardenItem = { name: string; kind: string; distance: string; href: string; onOsm: boolean; osm: string };

export type GardensBlock = {
  town: string;
  items: GardenItem[];
  /** How many named gardens the file lists (at most ten), of which `items` shows up to six. */
  total: number;
  radiusKm: number;
  mapUrl: string;
  /** The body that helps people get a plot: the card's one button. */
  body: { org: CardOrg; why: string } | null;
  fetched: string | null;
};

export type FoodBandData = {
  id: string;
  eyebrow: string;
  heading: string;
  lede: string;
  feature: FeatureInvitation | null;
  gardens: GardensBlock | null;
  groups: FoodGroup[];
  news: NewsCard[];
  /** "Look up Atlantic cod in …" links to the guides' own search pages, for a fish page. */
  lookups: SeafoodLookup[];
  place: { name: string; countryCode: string } | null;
  compact: boolean;
};

export type FoodOptions = {
  section: FoodSection;
  /** The roles to ask for, most wanted first (default: the section's). */
  roles?: FoodRole[];
  /** Show the community gardens near the town (default: gardening and resources). */
  gardens?: boolean;
  /** Organisation slugs the page already shows. */
  exclude?: string[];
  /** A fish page: its name and slug, for the seafood guides' look-up links. */
  fish?: { slug: string; name: string; water?: string };
  /** A fruit species page: lead with gleaning and fruit-tree groups. */
  fruit?: boolean;
  id?: string;
  heading?: string;
  lede?: string;
  /** Cards without the asks checklist (Learn pages). */
  compact?: boolean;
  /** How many organisation cards in all (default 3). */
  cards?: number;
};

export const FOOD_EYEBROW = "Grow, share and eat well";

const HEADING: Record<FoodSection, (town?: string) => string> = {
  gardening: () => "Grow food with your neighbours",
  seeds: () => "Grow food with your neighbours",
  kitchen: () => "Local food, markets and food rescue",
  foraging: () => "Forage fairly, share the harvest",
  fishing: () => "Fish to eat, and fish that will still be there",
  homesteading: () => "Farm and grow with others nearby",
  learn: () => "Gardens for children",
  resources: (town) => (town ? `Food and growing near ${town}` : "Food and growing"),
};

/**
 * The opening sentence: what the band is for, then where — "near Ottawa,
 * closest first" with a town, "country by country" without one (the town
 * search sits right under it). It only names what the band shows.
 */
function ledeFor(section: FoodSection, town: string | undefined, o: { fruit?: boolean; gardens?: boolean; country?: string; shown: Set<FoodRole> }): string {
  const ones = town ? `the ones near ${town}, closest first` : "the national ones, country by country";
  const groups = town ? `the groups near ${town}, closest first` : "the national networks, country by country";
  switch (section) {
    case "gardening":
      return o.gardens && town
        ? `The named community gardens and allotments within ${GARDENS_RADIUS_KM} km of ${town}, and the groups that help people find a plot, share seed and grow food together nearby. ${DISCLOSURE}`
        : `Somewhere to grow, seed to grow from and people to learn with: ${groups}. ${DISCLOSURE}`;
    case "seeds":
      return `Seed libraries and swaps, and the gardens and growers who keep seed going: ${ones}. ${DISCLOSURE}`;
    case "kitchen":
      return `The farmers' markets, local food networks and food-rescue groups that say where to buy what is grown nearby and where good surplus goes: ${ones}. ${DISCLOSURE}`;
    case "foraging":
      return o.fruit
        ? `The groups that pick fruit nobody else does and share it out, and the codes for taking only what a tree or a patch can spare: ${ones}. ${DISCLOSURE}`
        : `The codes for taking only what a plant or a patch can spare, and the groups that pick and share fruit that would otherwise go to waste: ${ones}. ${DISCLOSURE}`;
    case "fishing": {
      const guide = o.country ? `the guide for ${o.country}` : town ? "the guides that rate them" : "the guides that rate them, country by country";
      const local = town && (o.shown.has("local-food") || o.shown.has("markets")) ? `, and where to buy food grown and caught near ${town}` : "";
      return `Which fish to buy and which to leave, from ${guide}${local}. ${DISCLOSURE}`;
    }
    case "homesteading":
      return `Farms that take volunteers, local food networks and markets, and seed to swap: ${groups}. ${DISCLOSURE}`;
    case "learn":
      return town
        ? `School gardens, and the community gardens and farms that welcome families, near ${town}: somewhere children can sow, water and weed alongside other people.`
        : "School gardens, and the community gardens and farms that welcome families: somewhere children can sow, water and weed alongside other people. The national networks, country by country.";
    case "resources":
      return town
        ? `Community gardens and allotments, community farms, seed libraries, food rescue and markets: the ways to grow and share food with other people around ${town}, closest first. ${DISCLOSURE}`
        : `Community gardens and allotments, community farms, seed libraries, food rescue and markets. ${DISCLOSURE}`;
  }
}

/** A fruit page leads with the pickers and the fruit-tree groups. */
const FRUIT_ROLES: FoodRole[] = ["gleaning", "community-farms", "foraging-code", "local-food", "seed-library"];

const ownRoles = (org: Pick<Organisation, "slug">) => orgBySlug(org.slug)?.foodRoles ?? [];

/**
 * The best open food invitation for the place whose organisation (or a
 * partner) has one of the roles; not one run by a body another panel on the
 * page already shows (`exclude`), whose card may carry it as its button.
 */
export function foodFeature(place: MatchPlace | null, roles: FoodRole[], exclude: string[] = []): FeatureInvitation | null {
  const list = invitationsFor(place, { topics: ["food"] });
  const best = list.find((m) => !exclude.includes(m.invitation.org) && [m.invitation.org, ...(m.invitation.partners ?? [])].some((s) => foodRoleRank({ foodRoles: orgBySlug(s)?.foodRoles }, roles) >= 0));
  return best ? toFeature(best, { showWhere: !place }) : null;
}

/**
 * The cards, grouped by role: the page's lead role (the first with a body
 * at national level or nearer) always, then the role whose best body is
 * nearest of the rest; at most two roles and `n` cards, each role's best
 * first, then the nearest of what is left, shown in the page's role order.
 */
function groupCards(matches: OrgMatch[], roles: FoodRole[], n: number): { role: FoodRole; matches: OrgMatch[] }[] {
  const byRole = new Map<FoodRole, OrgMatch[]>();
  for (const m of matches) {
    const r = foodRoleOf({ foodRoles: ownRoles(m.org) }, roles);
    if (!r) continue;
    byRole.set(r, [...(byRole.get(r) ?? []), m]);
  }
  const present = roles.filter((r) => byRole.has(r));
  if (!present.length || n < 1) return [];
  const best = (r: FoodRole) => Math.max(...byRole.get(r)!.map((m) => m.tier));
  const lead = present.find((r) => best(r) >= 1) ?? present[0];
  const second = present.filter((r) => r !== lead).sort((a, b) => best(b) - best(a) || roles.indexOf(a) - roles.indexOf(b))[0];
  const chosen = second && n > 1 ? [lead, second] : [lead];
  // Each role's best card first; the places left go to the nearest of the rest (the lead role on a tie).
  const picks = new Map<FoodRole, OrgMatch[]>(chosen.map((r) => [r, [byRole.get(r)![0]]]));
  const rest = chosen
    .flatMap((r) => byRole.get(r)!.slice(1).map((m) => ({ r, m })))
    .sort((a, b) => b.m.tier - a.m.tier || chosen.indexOf(a.r) - chosen.indexOf(b.r));
  for (const { r, m } of rest.slice(0, n - chosen.length)) picks.get(r)!.push(m);
  return chosen.map((r) => ({ role: r, matches: picks.get(r)! })).sort((a, b) => roles.indexOf(a.role) - roles.indexOf(b.role));
}

/** The gardens near the town, with the body that helps people get a plot. */
function gardensBlock(place: MatchPlace & { name?: string }, body: OrgMatch | undefined): Omit<GardensBlock, "body"> & { bodyMatch: OrgMatch | null } | null {
  const list = gardensFor(place);
  if (!list.length || !place.name) return null;
  return {
    town: place.name,
    items: list.slice(0, 6).map((g) => ({
      name: g.name,
      kind: GARDEN_KIND_LABEL[g.kind],
      distance: kmLabel(g.km),
      href: g.website ?? osmFeatureUrl(g.osm),
      onOsm: !g.website,
      osm: g.osm,
    })),
    total: list.length,
    radiusKm: GARDENS_RADIUS_KM,
    mapUrl: osmMapUrl(place.lat, place.lon),
    bodyMatch: body ?? null,
    fetched: GARDENS_FETCHED,
  };
}

/** The food band for a section and a place (null: the no-place version, with national and international bodies). */
export async function foodBand(place: (MatchPlace & { name?: string }) | null, opts: FoodOptions): Promise<FoodBandData | null> {
  const { section } = opts;
  const roles = opts.roles ?? (opts.fruit ? FRUIT_ROLES : SECTION_FOOD[section]);
  const n = opts.cards ?? 3;
  const exclude = opts.exclude ?? [];
  const ranked = place ? orgsFor(place, { foodRoles: roles, exclude }) : foodAnywhere(roles, { limit: 8, exclude });

  // The gardens near the town, and the community-gardens body (national or nearer) as the way to get a plot.
  const wantGardens = opts.gardens ?? (section === "gardening" || section === "resources");
  const gardenBody = ranked.find((m) => m.tier >= 1 && ownRoles(m.org).includes("community-gardens"));
  const g = place && wantGardens ? gardensBlock(place, gardenBody) : null;
  const pool = g?.bodyMatch ? ranked.filter((m) => m.org.slug !== g.bodyMatch!.org.slug) : ranked;

  const grouped = groupCards(pool, roles, n);
  const feature = foodFeature(place, roles, exclude);
  const flat = grouped.flatMap((x) => x.matches);
  const cards = await withExtras([...flat, ...(g?.bodyMatch ? [g.bodyMatch] : [])], place, feature, { topics: ["food"] });
  const bySlug = new Map(cards.map((c) => [c.org.slug, c]));
  // A tagged round-one record's button and asks are about its other work: in a food band its card opens the food page.
  const forRole = (c: PanelCard | undefined, role: FoodRole): PanelCard | undefined => {
    const w = c && foodWayFor(c.org.slug, role);
    return c && w ? { ...c, org: { ...c.org, primary: { href: w.href, label: w.label, way: "food" }, asks: w.hideAsks ? [] : c.org.asks, ...(w.blurb ? { blurb: w.blurb } : {}) } } : c;
  };
  const groups: FoodGroup[] = grouped.map((x) => ({ role: x.role, label: FOOD_ROLE_LABEL[x.role], cards: x.matches.map((m) => forRole(bySlug.get(m.org.slug), x.role)!).filter(Boolean) }));
  if (g?.bodyMatch) {
    const b = forRole(bySlug.get(g.bodyMatch.org.slug), "community-gardens");
    if (b) bySlug.set(b.org.slug, b);
  }

  // A fish page's look-ups: with a town, the guides shown for the reader's country; with none, any guide's (the reader's country is not known).
  const lookups = opts.fish ? seafoodLookups(opts.fish, (place ? flat : ranked).map((m) => m.org)) : [];
  if (!groups.length && !g && !feature) return null;

  const shownSlugs = [...flat.map((m) => m.org.slug), ...(g?.bodyMatch ? [g.bodyMatch.org.slug] : [])];
  const news = await orgNews(shownSlugs, { limit: 3 });
  const town = place?.name;
  const seafoodCountry = section === "fishing" && place?.countryCode && flat.some((m) => ownRoles(m.org).includes("sustainable-seafood") && m.tier >= 1) ? countryWords(place.countryCode) : undefined;
  const gardens: GardensBlock | null = g
    ? { town: g.town, items: g.items, total: g.total, radiusKm: g.radiusKm, mapUrl: g.mapUrl, fetched: g.fetched, body: g.bodyMatch ? (bySlug.get(g.bodyMatch.org.slug) ?? null) : null }
    : null;
  return {
    id: opts.id ?? "food-and-growing",
    eyebrow: FOOD_EYEBROW,
    heading: opts.heading ?? HEADING[section](town),
    lede: opts.lede ?? ledeFor(section, town, { fruit: opts.fruit, gardens: !!gardens, country: seafoodCountry, shown: new Set(groups.map((x) => x.role)) }),
    feature,
    gardens,
    groups,
    news,
    lookups,
    place: place ? { name: place.name ?? "", countryCode: place.countryCode } : null,
    compact: !!opts.compact || section === "learn",
  };
}

/** The round-three food records (not the round-one records tagged with food roles): a general panel beside a food band leaves them to it. */
export const FOOD_RECORD_SLUGS: string[] = [...FOOD_NA_ORGS, ...FOOD_EA_ORGS].map((o) => o.slug);

/**
 * For a page that carries a "who looks after this" panel and a food band:
 * the panel leaves the round-three food records to the band (`panelExclude`),
 * and the band leaves out what the panel shows (`bandExclude`), except a
 * tagged body whose food card opens a page of its own (Ocean Wise Seafood
 * beside its shoreline cleanups).
 */
export function splitWithPanel(panelSlugs: string[], roles: FoodRole[]): { panelExclude: string[]; bandExclude: string[] } {
  return { panelExclude: FOOD_RECORD_SLUGS, bandExclude: panelSlugs.filter((s) => !roles.some((r) => foodWayFor(s, r))) };
}

/** The organisation slugs a band shows, so another panel on the page can leave them out. */
export const bandSlugs = (b: FoodBandData | null): string[] => (b ? [...b.groups.flatMap((g) => g.cards.map((c) => c.org.slug)), ...(b.gardens?.body ? [b.gardens.body.org.slug] : [])] : []);
