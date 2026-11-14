/**
 * The whole conservation library in one list, checked once at import for
 * duplicate slugs. Continent files are owned by the data agents; the matcher
 * and every page import from here only.
 */
import { AFRICA_ORGS } from "./africa";
import { EUROPE_ORGS } from "./europe";
import { GLOBAL_ORGS } from "./global";
import { NORTH_AMERICA_ORGS } from "./north-america";
import { EXTRA_IV_ORGS } from "./extra-iv";
import { EXTRA_ST_ORGS } from "./extra-st";
import { FOOD_NA_ORGS, FOOD_NA_TAGS } from "./food-na";
import { FOOD_EA_ORGS, FOOD_EA_TAGS } from "./food-ea";
import type { Organisation, ServiceArea } from "./types";
import { classifyEcoregion, getEcoregion } from "@/lib/ecoregions";
import { continentServed, countryServed } from "@/lib/scope";

export * from "./types";

const FOOD_TAGS: Record<string, Organisation["foodRoles"]> = { ...FOOD_NA_TAGS, ...FOOD_EA_TAGS };

/** Round-one records tagged as food organisations get the topic and roles added here (see food-na.ts / food-ea.ts). */
const withFoodTags = (o: Organisation): Organisation => {
  const roles = FOOD_TAGS[o.slug];
  if (!roles?.length) return o;
  return { ...o, topics: o.topics.includes("food") ? o.topics : [...o.topics, "food"], foodRoles: [...new Set([...(o.foodRoles ?? []), ...roles])] };
};

/** The whole library, parked organisations included: the integrity checks below and the build checks read this. */
export const ALL_ORGANISATIONS: Organisation[] = [...GLOBAL_ORGS, ...NORTH_AMERICA_ORGS, ...EUROPE_ORGS, ...AFRICA_ORGS, ...EXTRA_IV_ORGS, ...EXTRA_ST_ORGS, ...FOOD_NA_ORGS, ...FOOD_EA_ORGS].map(withFoodTags);

/**
 * Is an organisation shown (src/lib/scope.ts)? One based in a served country is. One that works across borders
 * (international scope, or no home country) is, unless its record ties it to a parked continent. Either way, when the
 * record lists the areas it works in, one of them must reach a served country. Everything else is parked: no page, no
 * place in a list, and its name is off the allow-list the guide check uses.
 */
export const orgServed = (o: Organisation): boolean =>
  (o.countryCode && o.scope !== "international" ? countryServed(o.countryCode) : !o.continent || continentServed(o.continent)) && areasServed(o.areas);

/** Does a service area reach a served country or continent? */
function areaServed(a: ServiceArea): boolean {
  if (a.kind === "world") return true;
  if (a.kind === "continent") return continentServed(a.continent);
  if (a.kind === "country") return a.countries.some(countryServed);
  if (a.kind === "admin1") return countryServed(a.countryCode);
  if (a.kind === "ecoregion") return a.ecoregions.some((r) => continentServed((getEcoregion(r) as { continent?: string } | undefined)?.continent));
  // A circle or a box: where its centre falls.
  const [lat, lon] = a.kind === "radius" ? [a.lat, a.lon] : [(a.latMin + a.latMax) / 2, (a.lonMin + a.lonMax) / 2];
  return continentServed((classifyEcoregion(lat, lon) as { continent?: string } | null)?.continent);
}
/** An organisation or invitation with no areas listed is not limited by them; one with areas needs a served one. */
const areasServed = (areas?: ServiceArea[]): boolean => !areas?.length || areas.some(areaServed);

/** The organisations the site serves. */
export const ORGANISATIONS: Organisation[] = ALL_ORGANISATIONS.filter(orgServed);

for (const slug of Object.keys(FOOD_TAGS)) if (!ALL_ORGANISATIONS.some((o) => o.slug === slug)) throw new Error(`conservation food tags: no organisation "${slug}"`);

const seen = new Set<string>();
for (const o of ALL_ORGANISATIONS) {
  if (seen.has(o.slug)) throw new Error(`conservation library: duplicate slug "${o.slug}"`);
  seen.add(o.slug);
}

/** Every record by slug, for the integrity checks; SERVED_BY_SLUG is what pages may look up. */
const BY_SLUG = new Map(ALL_ORGANISATIONS.map((o) => [o.slug, o]));
const SERVED_BY_SLUG = new Map(ORGANISATIONS.map((o) => [o.slug, o]));

export const orgBySlug = (slug: string): Organisation | undefined => SERVED_BY_SLUG.get(slug);

/** Every organisation name and short name, lower-cased: the allow-list the AI guide check uses. */
export const ORG_NAMES: ReadonlySet<string> = new Set(ORGANISATIONS.flatMap((o) => [o.name, o.shortName, o.nativeName].filter(Boolean).map((n) => (n as string).toLowerCase())));

// ---- invitations and stories --------------------------------------------------

import { INVITATIONS as IV_INVITATIONS, type Invitation } from "./invitations";
import { INVITATIONS_ST } from "./invitations-st";
import { INVITATIONS_FOOD } from "./invitations-food";
import { STORIES as ALL_STORIES, type Story } from "./stories";

export type { Invitation, Photo, When, Effort } from "./invitations";
export type { Story, StoryStep } from "./stories";

const ALL_INVITATIONS: Invitation[] = [...IV_INVITATIONS, ...INVITATIONS_ST, ...INVITATIONS_FOOD];
const invSeen = new Set<string>();
for (const i of ALL_INVITATIONS) {
  if (invSeen.has(i.slug)) throw new Error(`conservation invitations: duplicate slug "${i.slug}"`);
  invSeen.add(i.slug);
  for (const s of [i.org, ...(i.partners ?? [])]) if (!BY_SLUG.has(s)) throw new Error(`conservation invitation "${i.slug}": no organisation "${s}"`);
}
for (const s of ALL_STORIES) {
  for (const o of s.orgs) if (!BY_SLUG.has(o)) throw new Error(`conservation story ${s.path}: no organisation "${o}"`);
  for (const i of s.invitations ?? []) if (!invSeen.has(i)) throw new Error(`conservation story ${s.path}: no invitation "${i}"`);
  for (const st of s.steps) {
    if (st.org && !BY_SLUG.has(st.org)) throw new Error(`conservation story ${s.path}: step names no organisation "${st.org}"`);
    if (st.invitation && !invSeen.has(st.invitation)) throw new Error(`conservation story ${s.path}: step names no invitation "${st.invitation}"`);
  }
}

/** The invitations of served organisations; a partner that is parked is dropped from the invitation. */
export const INVITATIONS: Invitation[] = ALL_INVITATIONS.filter((i) => SERVED_BY_SLUG.has(i.org) && areasServed(i.areas)).map((i) =>
  i.partners?.some((p) => !SERVED_BY_SLUG.has(p)) ? { ...i, partners: i.partners.filter((p) => SERVED_BY_SLUG.has(p)) } : i,
);
const INV_BY_SLUG = new Map(INVITATIONS.map((i) => [i.slug, i]));
export const invitationBySlug = (slug: string): Invitation | undefined => INV_BY_SLUG.get(slug);

/**
 * The stories, naming served organisations and invitations only: a parked organisation is taken off the story's
 * list, a step that sends the reader to one is dropped, and a story left with no organisation is not told.
 */
export const STORIES: Story[] = ALL_STORIES.map((s) => ({
  ...s,
  orgs: s.orgs.filter((o) => SERVED_BY_SLUG.has(o)),
  ...(s.invitations ? { invitations: s.invitations.filter((i) => INV_BY_SLUG.has(i)) } : {}),
  steps: s.steps.filter((st) => (!st.org || SERVED_BY_SLUG.has(st.org)) && (!st.invitation || INV_BY_SLUG.has(st.invitation))),
})).filter((s) => s.orgs.length > 0);

const STORY_BY_PATH = new Map(STORIES.map((s) => [s.path, s]));
export const storyFor = (path: string): Story | undefined => STORY_BY_PATH.get(path);
