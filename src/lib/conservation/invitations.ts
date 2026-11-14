/**
 * Open invitations, in time and on the map: whether one is open today, the
 * words for its window ("Open now · until 30 April", "Starts 14 December",
 * "Every Wednesday morning", "All year"), and which ones a page should
 * feature for a place and its subjects.
 *
 * Time: a dated invitation is open from its start to its end inclusive and
 * "soon" from 60 days before it starts; a `months` invitation is open in those
 * months and soon within 60 days of the next one; a `recurring` one honours
 * its months the same way; an `ongoing` one is always open. "Today" is the
 * site's own calendar date (Ottawa time), unless a caller passes one — a
 * page render may be cached for up to an hour, which is fine for windows
 * that are days long.
 *
 * Place: an invitation reaches a place through its own `areas`, or, when it
 * has none, through its organisation's (the same `servesTier` the "where they
 * work" lists use). With no place known, only the world- or continent-wide
 * invitations and the ones done from home are offered.
 */
import { INVITATIONS, orgBySlug, type Effort, type Invitation, type Organisation, type Topic } from "@/data/conservation";
import { servesTier, type MatchPlace } from "./match";
import KNOWN from "@/lib/served-places";
import { admin1Name, countryWords, ecoregionName, nearestTown, withArticle } from "./geo-words";
import { sourcedWaters } from "./sources";

export type WindowState = "open" | "soon" | "closed";
export type InvitationWindow = { state: WindowState; label: string };

/** The site's own time zone: "today" for an invitation is the date in Ottawa. */
export const SITE_TIME_ZONE = "America/Toronto";
const SOON_DAYS = 60;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-10-26": today's date where the site is, or the date of `now` there. */
export function siteToday(now?: Date | string): string {
  if (typeof now === "string" && /^\d{4}-\d{2}-\d{2}$/.test(now)) return now;
  const d = now instanceof Date ? now : typeof now === "string" ? new Date(now) : new Date();
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: SITE_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

const ms = (iso: string) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
const daysBetween = (a: string, b: string) => Math.round((ms(b) - ms(a)) / 86_400_000);
const isoOf = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

/** "30 April", with the year when it is not this year's (or next year's within eleven months). */
function dayMonth(iso: string, today: string): string {
  const y = Number(iso.slice(0, 4));
  const label = `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
  const far = Math.abs(daysBetween(today, iso)) > 330;
  return far || (y !== Number(today.slice(0, 4)) && y < Number(today.slice(0, 4))) ? `${label} ${y}` : label;
}

/** The months as a sorted set, ignoring anything outside 1–12. */
const monthSet = (months: number[]) => new Set(months.filter((m) => Number.isInteger(m) && m >= 1 && m <= 12));

/** The last month of the run of consecutive months (wrapping December → January) that contains `m`. */
function runEnd(set: Set<number>, m: number): number {
  let end = m;
  for (let i = 0; i < 11; i++) {
    const next = (end % 12) + 1;
    if (!set.has(next) || next === m) break;
    end = next;
  }
  return end;
}

/** The first day of the next month in the set after today, as ISO, or null. */
function nextStart(set: Set<number>, today: string): string | null {
  const y = Number(today.slice(0, 4));
  const m = Number(today.slice(5, 7));
  for (let k = 1; k <= 12; k++) {
    const mm = ((m - 1 + k) % 12) + 1;
    if (set.has(mm)) return isoOf(y + Math.floor((m - 1 + k) / 12), mm, 1);
  }
  return null;
}

/** For months-based windows: open in the months, soon within 60 days of the next one. */
function monthsWindow(months: number[], today: string, openLabel: (endMonth: number, allYear: boolean) => string, soonPrefix = "Starts"): InvitationWindow & { endsOn: string } {
  const set = monthSet(months);
  const m = Number(today.slice(5, 7));
  const y = Number(today.slice(0, 4));
  if (set.size === 12) return { state: "open", label: openLabel(0, true), endsOn: "9999-12-31" };
  if (set.has(m)) {
    const end = runEnd(set, m);
    const endYear = end < m ? y + 1 : y;
    return { state: "open", label: openLabel(end, false), endsOn: isoOf(endYear, end, lastDay(endYear, end)) };
  }
  const start = nextStart(set, today);
  if (start && daysBetween(today, start) <= SOON_DAYS) return { state: "soon", label: `${soonPrefix} ${dayMonth(start, today)}`, endsOn: "9999-12-31" };
  return { state: "closed", label: start ? `${soonPrefix} ${dayMonth(start, today)}` : "Closed", endsOn: "0000-01-01" };
}

function windowWithEnd(inv: Pick<Invitation, "when">, now?: Date | string): InvitationWindow & { endsOn: string } {
  const today = siteToday(now);
  const w = inv.when;
  switch (w.kind) {
    case "dates": {
      const { start, end } = w;
      if (daysBetween(end, today) > 0) return { state: "closed", label: `Ended ${dayMonth(end, today)}`, endsOn: end };
      if (daysBetween(start, today) >= 0) {
        if (start === end) return { state: "open", label: "Today", endsOn: end };
        return { state: "open", label: end === today ? "Open now · last day today" : `Open now · until ${dayMonth(end, today)}`, endsOn: end };
      }
      const label = start === end ? `On ${dayMonth(start, today)}` : `Starts ${dayMonth(start, today)}`;
      return { state: daysBetween(today, start) <= SOON_DAYS ? "soon" : "closed", label, endsOn: end };
    }
    case "months":
      return monthsWindow(w.months, today, (end, all) => (all ? "All year" : `Open now · until the end of ${MONTHS[end - 1]}`));
    case "recurring": {
      // A chip carries the rule's first clause ("Once a month, on the Sunday nearest the 15th …" → "Once a month").
      const rule = w.rule.length > 36 ? (w.rule.split(/[,;(]/)[0].trim() || w.rule) : w.rule;
      if (!w.months?.length) return { state: "open", label: rule, endsOn: "9999-12-31" };
      const r = monthsWindow(w.months, today, (end, all) => (all ? rule : `${rule} · until ${MONTHS[end - 1]}`), "From");
      return r.state === "open" ? r : { ...r, label: `${rule} · ${r.label.replace(/^From \d+ /, "from ")}` };
    }
    case "ongoing":
      return { state: "open", label: "All year", endsOn: "9999-12-31" };
  }
}

/** Open, soon or closed today, with the words for the window. */
export function windowFor(inv: Pick<Invitation, "when">, now?: Date | string): InvitationWindow {
  const { state, label } = windowWithEnd(inv, now);
  return { state, label };
}

export function isOpen(inv: Pick<Invitation, "when">, now?: Date | string): boolean {
  return windowFor(inv, now).state === "open";
}

// ---- matching ------------------------------------------------------------------

export type InvitationMatch = {
  invitation: Invitation;
  org: Organisation;
  window: InvitationWindow;
  /** How locally it reaches the place: 3 radius/box/town, 2 province/ecoregion, 1 country, 0 world/continent. With no place: 2 world, 1 continent, 0 narrower. */
  tier: number;
};

export type InvitationQuery = {
  /** The page's subjects; an invitation must share at least one, and the first counts most. */
  topics?: Topic[];
  now?: Date | string;
  limit?: number;
  /** Only the ones done from home (a window, a phone). */
  fromHome?: boolean;
  /** Only the ones fine for children with an adult. */
  family?: boolean;
  /** Only this organisation's (as runner or partner). */
  org?: string;
  /** Open ones only (no "soon"). */
  openOnly?: boolean;
  /** Invitation slugs to leave out (one already featured on the page). */
  exclude?: string[];
  /** With no place: every invitation, wherever it runs (the hub's full list, an organisation's own page). */
  anywhere?: boolean;
};

const isWide = (inv: Invitation, org: Organisation) => (inv.areas ?? org.areas).some((a) => a.kind === "world" || a.kind === "continent");

/** How the invitation's own areas (or its organisation's) reach a place; -1 not at all. */
function reachTier(inv: Invitation, org: Organisation, place: MatchPlace): number {
  return inv.areas?.length ? servesTier({ ...org, areas: inv.areas, places: undefined }, place) : servesTier(org, place);
}

function topicFit(inv: Invitation, topics: Topic[]): number {
  let fit = 0;
  topics.forEach((t, i) => {
    if (inv.topics.includes(t)) fit += topics.length - i;
  });
  return fit;
}

/**
 * The open and soon invitations for a place (or none: `null`), best first:
 * open before soon, local before national before international, then the
 * closest fit to the page's subjects, then free before paid (with no place:
 * free first, then the closest fit, then the widest-reaching), then the one
 * ending soonest.
 */
export function invitationsFor(place: MatchPlace | null, q: InvitationQuery = {}): InvitationMatch[] {
  const topics = q.topics ?? [];
  const exclude = new Set(q.exclude ?? []);
  const out: (InvitationMatch & { fit: number; endsOn: string })[] = [];
  for (const inv of INVITATIONS) {
    if (exclude.has(inv.slug)) continue;
    if (q.org && inv.org !== q.org && !inv.partners?.includes(q.org)) continue;
    if (q.fromHome && !inv.fromHome) continue;
    if (q.family && !inv.family) continue;
    const fit = topics.length ? topicFit(inv, topics) : 0;
    if (topics.length && fit === 0) continue;
    const org = orgBySlug(inv.org);
    if (!org) continue;
    const w = windowWithEnd(inv, q.now);
    if (w.state === "closed" || (q.openOnly && w.state !== "open")) continue;
    let tier: number;
    if (place) {
      tier = reachTier(inv, org, place);
      if (tier < 0) continue;
    } else {
      if (!q.anywhere && !isWide(inv, org) && !inv.fromHome) continue;
      // With no place, the wider an invitation reaches the more readers it suits: world, then continent, then one country.
      const areas = inv.areas ?? org.areas;
      tier = areas.some((a) => a.kind === "world") ? 2 : areas.some((a) => a.kind === "continent") ? 1 : 0;
    }
    out.push({ invitation: inv, org, window: { state: w.state, label: w.label }, tier, fit, endsOn: w.endsOn });
  }
  out.sort((a, b) => {
    if (a.window.state !== b.window.state) return a.window.state === "open" ? -1 : 1;
    // With a place, the most local first; with none, the free ones (anyone can join them), then the closest to the
    // page's subjects, then the widest-reaching.
    if (place && b.tier !== a.tier) return b.tier - a.tier;
    if (!place && a.invitation.free !== b.invitation.free) return a.invitation.free ? -1 : 1;
    // Something on this season (a count with dates, a month's challenge) before an all-year one:
    // the timely invitation is the one worth featuring; the app that is always there can wait.
    const seasonal = (x: typeof a) => x.invitation.when.kind !== "ongoing";
    if (seasonal(a) !== seasonal(b)) return seasonal(a) ? -1 : 1;
    if (b.fit !== a.fit) return b.fit - a.fit;
    if (b.tier !== a.tier) return b.tier - a.tier;
    if (a.invitation.free !== b.invitation.free) return a.invitation.free ? -1 : 1;
    if (a.endsOn !== b.endsOn) return a.endsOn < b.endsOn ? -1 : 1;
    return a.invitation.title.localeCompare(b.invitation.title);
  });
  const trimmed = out.map(({ fit: _f, endsOn: _e, ...m }) => {
    void _f;
    void _e;
    return m;
  });
  return typeof q.limit === "number" ? trimmed.slice(0, q.limit) : trimmed;
}

/**
 * Named invitations (a story's), in the order given, open before soon, the
 * closed ones dropped; with a place, only the ones that reach it. `undefined`
 * place (a static page) keeps them all.
 */
export function invitationsBySlug(slugs: string[], place: MatchPlace | null | undefined, now?: Date | string): InvitationMatch[] {
  const out: InvitationMatch[] = [];
  for (const slug of slugs) {
    const inv = INVITATIONS.find((i) => i.slug === slug);
    const org = inv && orgBySlug(inv.org);
    if (!inv || !org) continue;
    const w = windowFor(inv, now);
    if (w.state === "closed") continue;
    const tier = place ? reachTier(inv, org, place) : 0;
    if (tier < 0) continue;
    out.push({ invitation: inv, org, window: w, tier });
  }
  return out.sort((a, b) => (a.window.state === b.window.state ? 0 : a.window.state === "open" ? -1 : 1));
}

/** One organisation's own open invitation that reaches the place (or any, with no place), for its card's button. */
export function openInvitationOf(orgSlug: string, place: MatchPlace | null, opts: { exclude?: string[]; now?: Date | string; topics?: Topic[]; only?: string[] } = {}): InvitationMatch | null {
  // With topics given, a card only carries an invitation about the page's subject: the
  // Livestock Conservancy's rabbit census is not the button on a page about ducks.
  const own = INVITATIONS.filter((i) => i.org === orgSlug && !opts.exclude?.includes(i.slug) && (!opts.topics?.length || i.topics.some((t) => opts.topics!.includes(t))) && (!opts.only || opts.only.includes(i.slug)));
  if (!own.length) return null;
  const org = orgBySlug(orgSlug);
  if (!org) return null;
  for (const inv of own) {
    const w = windowFor(inv, opts.now);
    if (w.state !== "open") continue;
    const tier = place ? reachTier(inv, org, place) : 0;
    if (tier < 0) continue;
    return { invitation: inv, org, window: w, tier };
  }
  return null;
}

// ---- the trimmed shape the components (and the client panel) draw ---------------

export const EFFORT_LABEL: Record<Effort, string> = {
  minutes: "A few minutes",
  "an hour": "An hour",
  "an afternoon": "An afternoon",
  "a day": "A day",
  "all season": "All season",
};

export type FeatureInvitation = {
  /** Where it runs, for a reader whose place is not known ("In Canada and the US", "Around Cape Town"); absent for world-wide ones. */
  where?: string;
  slug: string;
  org: { slug: string; name: string };
  title: string;
  name?: string;
  summary: string;
  effort: string;
  family: boolean;
  fromHome: boolean;
  free: boolean;
  cost?: string;
  url: string;
  cta: string;
  topics: Topic[];
  photo?: Invitation["photo"];
  window: InvitationWindow;
};

export const orgDisplayName = (o: Pick<Organisation, "name" | "shortName">) => (o.shortName && o.name.length > 44 ? o.shortName : o.name);

const listWords = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const CONTINENT_WORD: Record<string, string> = { "north-america": "North America", europe: "Europe", africa: "Africa" };

/** Where an invitation runs, in a few words, or undefined when it runs worldwide. */
export function whereWords(inv: Invitation, org: Organisation): string | undefined {
  const areas = inv.areas?.length ? inv.areas : org.areas;
  if (areas.some((a) => a.kind === "world")) return undefined;
  const parts: string[] = [];
  const geo = areas.find((a) => a.kind === "radius" || a.kind === "box");
  if (geo && (geo.kind === "radius" || geo.kind === "box")) {
    // The organisation's own water or town names a local patch better than the nearest town to a circle's centre.
    const own = !inv.areas?.length;
    const town = own && org.places?.length ? (KNOWN as { slug: string; name: string }[]).find((p) => p.slug === org.places![0]) : undefined;
    // The first water its own pages name (sources.ts), not the first on the list.
    const ownWater = own ? sourcedWaters(org)[0] : undefined;
    if (ownWater) {
      const w = ownWater;
      parts.push(`${/\b(river|lake|creek|brook|bay|harbou?r|estuary|sound|canal|stream|lac|loch|lough|reservoir|coast|shore|rivière|fleuve)\b/i.test(w) ? "On" : "In"} ${withArticle(w)}`);
    }
    else if (town) parts.push(`Around ${town.name}`);
    else if (geo.kind === "box" || geo.km < 300) {
      const lat = geo.kind === "radius" ? geo.lat : (geo.latMin + geo.latMax) / 2;
      const lon = geo.kind === "radius" ? geo.lon : (geo.lonMin + geo.lonMax) / 2;
      const near = nearestTown(lat, lon);
      if (near && near.km < 60) parts.push(`Around ${near.name}`);
    }
  }
  const admin = areas.flatMap((a) => (a.kind === "admin1" ? a.admin1Codes.map((c) => admin1Name(a.countryCode, c)) : []));
  if (!parts.length && admin.length) parts.push(admin.length > 3 ? `In ${admin.length} ${areas.some((a) => a.kind === "admin1" && a.countryCode === "CA") ? "provinces" : "states"}` : `In ${listWords(admin)}`);
  const countries = areas.flatMap((a) => (a.kind === "country" ? a.countries : []));
  if (!parts.length && countries.length) {
    const words = countries.map(countryWords);
    parts.push(countries.length > 3 ? `In ${countries.length} countries` : `In ${listWords(words)}`);
  }
  const ecos = areas.flatMap((a) => (a.kind === "ecoregion" ? a.ecoregions : []));
  if (!parts.length && ecos.length) parts.push(ecos.length > 2 ? `In ${ecos.length} regions` : `In the ${listWords(ecos.map(ecoregionName))}`);
  const conts = areas.flatMap((a) => (a.kind === "continent" ? [CONTINENT_WORD[a.continent] ?? a.continent] : []));
  if (!parts.length && conts.length) parts.push(`In ${listWords(conts)}`);
  if (!parts.length && org.countryCode) parts.push(`In ${countryWords(org.countryCode)}`);
  return parts[0];
}

/** The trimmed shape; `showWhere` adds where it runs, for a page that does not know the reader's place. */
export function toFeature(m: InvitationMatch, opts: { showWhere?: boolean } = {}): FeatureInvitation {
  const i = m.invitation;
  const where = opts.showWhere ? whereWords(i, m.org) : undefined;
  return {
    ...(where ? { where } : {}),
    slug: i.slug,
    org: { slug: m.org.slug, name: orgDisplayName(m.org) },
    title: i.title,
    ...(i.name ? { name: i.name } : {}),
    summary: i.summary,
    effort: EFFORT_LABEL[i.effort] ?? i.effort,
    family: i.family,
    fromHome: !!i.fromHome,
    free: i.free,
    ...(i.cost ? { cost: i.cost } : {}),
    url: i.url,
    cta: i.cta,
    topics: i.topics,
    ...(i.photo ? { photo: i.photo } : {}),
    window: m.window,
  };
}

/** The best invitation to feature for a place and a panel's subjects, as the components draw it. */
export function featureFor(place: MatchPlace | null, topics: Topic[] | undefined, q: Omit<InvitationQuery, "topics" | "limit"> = {}): FeatureInvitation | null {
  const best = invitationsFor(place, { ...q, topics, limit: 1 })[0];
  return best ? toFeature(best, { showWhere: !place }) : null;
}
