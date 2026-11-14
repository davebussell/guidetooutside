/**
 * The regulator's closed seasons for a place (round 2, L8): which of the
 * library's fish may not be fished for in a month, or on a day, and the
 * words the page and the writer use for it.
 *
 * `closedSeasons(place, month)` lists every rule that closes a species for
 * any part of the month; `isClosed(place, slug, date)` answers for one day;
 * `closureOf` gives the matching rule and range so the page can print
 * "Closed season until 30 November — Ontario MNRF (FMZ 20)". A row with no
 * closed range and named species is the regulator's "open all year" for those
 * species (it counts as a rule, so the season printed is the regulator's); a
 * row with no closed range and no species only documents the jurisdiction
 * (licence, "no closed season" in general) and is reached through
 * `jurisdictionNotes`.
 *
 * Scope is matched on the place alone: country, then province or state name
 * or code, ecoregion, and a box or circle on the map, all of which must agree
 * when the rule gives them. Dates are "MM-DD" and compared as strings, so a
 * range may wrap the new year ("12-16" to "06-19").
 */
import { CLOSED_SEASONS, type ClosedRange, type ClosedSeason } from "@/data/closed-seasons";
import { regulatorPageFor, tidalPageFor, type RegulatorPage } from "@/data/regulator-pages";
import { classifyEcoregion } from "@/lib/ecoregions";
import type { WaterGroup } from "@/lib/fish-habitats";

export type { ClosedRange, ClosedSeason } from "@/data/closed-seasons";

/** What a rule needs to know about the place. */
export type PlaceScope = { countryCode?: string; admin1?: string; admin1Code?: string; country?: string; lat?: number; lon?: number };

export type Closure = {
  rule: ClosedSeason;
  range: ClosedRange;
  species: string;
  /** "1 December" — the day it reopens (the day after the last closed day), in words. */
  until: string;
  /** "15 October" — the first closed day. */
  from: string;
  /** True when the whole year is closed (a standing ban). */
  allYear: boolean;
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const LAST = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  const x = (d - b) * r * Math.cos(((a + c) / 2) * r);
  return Math.hypot(x, (c - a) * r) * 6371;
};

const norm = (s: string) => s.trim().toLowerCase();

/** Whether a rule's scope includes the place. */
export function ruleApplies(rule: ClosedSeason, place: PlaceScope): boolean {
  if (!place.countryCode || place.countryCode.toUpperCase() !== rule.countryCode) return false;
  if (rule.admin1) {
    const mine = [place.admin1, place.admin1Code].filter((x): x is string => !!x).map(norm);
    if (!rule.admin1.some((a) => mine.includes(norm(a)))) return false;
  }
  if (rule.regionSlug) {
    if (place.lat == null || place.lon == null) return false;
    const eco = classifyEcoregion(place.lat, place.lon);
    if (!eco || !rule.regionSlug.includes(eco.slug)) return false;
  }
  if (rule.box) {
    if (place.lat == null || place.lon == null) return false;
    const b = rule.box;
    if (b.minLat != null && place.lat < b.minLat) return false;
    if (b.maxLat != null && place.lat > b.maxLat) return false;
    if (b.minLon != null && place.lon < b.minLon) return false;
    if (b.maxLon != null && place.lon > b.maxLon) return false;
  }
  if (rule.near) {
    if (place.lat == null || place.lon == null) return false;
    if (km(place.lat, place.lon, rule.near.lat, rule.near.lon) > rule.near.km) return false;
  }
  return true;
}

/** A row with no closed range that names species: the regulator's "open all year" for them (the 5 Nov 2026 audit: Toronto's perch and catfish fell back to typical months while the FMZ 20 table said open all year). */
export const namesOpenAllYear = (r: ClosedSeason): boolean => r.closed.length === 0 && r.species.length > 0 && !r.species.includes("*");

/** The rules in force at a place: rows with closed dates, and rows that name species as open all year. */
export function rulesFor(place: PlaceScope): ClosedSeason[] {
  return CLOSED_SEASONS.filter((r) => (r.closed.length > 0 || namesOpenAllYear(r)) && ruleApplies(r, place));
}

/** The rows that only document a jurisdiction (licence, "no closed season" in general) for a place: no closed range and no species named. */
export function jurisdictionNotes(place: PlaceScope): ClosedSeason[] {
  return CLOSED_SEASONS.filter((r) => r.closed.length === 0 && !namesOpenAllYear(r) && ruleApplies(r, place));
}

const mmdd = (d: Date) => `${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;

/** "MM-DD" of a date, an ISO string, or today. */
export function dayKey(date?: Date | string): string {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}/.test(date)) return date.slice(5, 10);
  return mmdd(date instanceof Date ? date : new Date());
}

/** Whether a "MM-DD" day falls in an inclusive range that may wrap the year. */
export function inRange(day: string, r: ClosedRange): boolean {
  return r.from <= r.to ? day >= r.from && day <= r.to : day >= r.from || day <= r.to;
}

/** Whether any day of a month (1–12) falls in the range. */
export function monthTouches(month: number, r: ClosedRange): boolean {
  const first = `${String(month).padStart(2, "0")}-01`;
  const last = `${String(month).padStart(2, "0")}-${LAST[month - 1]}`;
  // A range that wraps the year covers the month if it starts in or before it this year, or ends in or after it.
  if (r.from <= r.to) return !(r.to < first || r.from > last);
  return r.from <= last || r.to >= first;
}

/** Whether the whole month is closed. */
export function monthWithin(month: number, r: ClosedRange): boolean {
  const first = `${String(month).padStart(2, "0")}-01`;
  const last = `${String(month).padStart(2, "0")}-${LAST[month - 1]}`;
  return inRange(first, r) && inRange(last, r);
}

/** "30 November" for "11-30"; "the last day of February" for "02-29". */
export function dayWords(key: string): string {
  const [m, d] = key.split("-").map(Number);
  if (m === 2 && d === 29) return "the last day of February";
  return `${d} ${MONTHS[m - 1]}`;
}

/** The "MM-DD" after a day: "11-30" → "12-01", "02-29" (the last day of February) → "03-01", "12-31" → "01-01". */
export function dayAfter(key: string): string {
  const [m, d] = key.split("-").map(Number);
  if (d < LAST[m - 1]) return `${String(m).padStart(2, "0")}-${String(d + 1).padStart(2, "0")}`;
  return `${String((m % 12) + 1).padStart(2, "0")}-01`;
}

const speciesMatch = (rule: ClosedSeason, slug: string) => rule.species.includes("*") || rule.species.includes(slug);
const waterMatch = (rule: ClosedSeason, water?: WaterGroup) => !water || !rule.water || rule.water.includes(water);

function closure(rule: ClosedSeason, range: ClosedRange, species: string): Closure {
  return {
    rule,
    range,
    species,
    until: dayWords(dayAfter(range.to)),
    from: dayWords(range.from),
    allYear: range.from === "01-01" && range.to === "12-31",
  };
}

/**
 * Every closure touching `month` at the place: one per rule, range and
 * species, standing bans first, then by first closed day. `water` limits it
 * to the rules for one kind of water.
 */
export function closedSeasons(place: PlaceScope, month: number, water?: WaterGroup): Closure[] {
  const out: Closure[] = [];
  for (const rule of rulesFor(place)) {
    if (!waterMatch(rule, water)) continue;
    for (const range of rule.closed) {
      if (!monthTouches(month, range)) continue;
      for (const s of rule.species) out.push(closure(rule, range, s));
    }
  }
  return out.sort((a, b) => Number(b.allYear) - Number(a.allYear) || a.range.from.localeCompare(b.range.from));
}

/** The rule and range closing a species at the place on `date` (today if none), or null. */
export function closureOf(place: PlaceScope, slug: string, date?: Date | string, water?: WaterGroup): Closure | null {
  const day = dayKey(date);
  for (const rule of rulesFor(place)) {
    if (!speciesMatch(rule, slug) || !waterMatch(rule, water)) continue;
    for (const range of rule.closed) if (inRange(day, range)) return closure(rule, range, slug);
  }
  return null;
}

/** Whether a species is closed at the place on `date` (today if none). */
export const isClosed = (place: PlaceScope, slug: string, date?: Date | string, water?: WaterGroup): boolean =>
  closureOf(place, slug, date, water) !== null;

/**
 * The closure that opens later in `month` for a species that is open on
 * `date` (a galjoen on 10 October: closed from the 15th), or null.
 */
export function closingSoon(place: PlaceScope, slug: string, month: number, date?: Date | string, water?: WaterGroup): Closure | null {
  const day = dayKey(date);
  const last = `${String(month).padStart(2, "0")}-${LAST[month - 1]}`;
  for (const rule of rulesFor(place)) {
    if (!speciesMatch(rule, slug) || !waterMatch(rule, water)) continue;
    for (const range of rule.closed) if (range.from > day && range.from <= last) return closure(rule, range, slug);
  }
  return null;
}

/**
 * With no day to judge by: the closure covering the whole of `month` for a
 * species (`wholeMonth: true`), else the first that touches the month
 * (`wholeMonth: false` — it opens or closes within it), else null.
 */
export function monthClosure(place: PlaceScope, slug: string, month: number, water?: WaterGroup): { closure: Closure; wholeMonth: boolean } | null {
  let partial: Closure | null = null;
  for (const rule of rulesFor(place)) {
    if (!speciesMatch(rule, slug) || !waterMatch(rule, water)) continue;
    for (const range of rule.closed) {
      if (monthWithin(month, range)) return { closure: closure(rule, range, slug), wholeMonth: true };
      if (!partial && monthTouches(month, range)) partial = closure(rule, range, slug);
    }
  }
  return partial ? { closure: partial, wholeMonth: false } : null;
}

/** "Closed season until 30 November — Ontario MNRF (FMZ 20)"; "No fishing here — Fiskeridirektoratet (nullfiskeområde)" for a standing ban. */
export function closureLabel(c: Closure): string {
  if (c.allYear) return `${c.rule.species.includes("*") ? "No fishing here" : "Closed all year"} — ${c.rule.regulator}`;
  return `Closed season until ${c.until} — ${c.rule.regulator}`;
}

/** "Closes 15 October until the last day of February — DFFE (…)". */
export const closingLabel = (c: Closure): string => `Closes ${c.from} until ${c.until} — ${c.rule.regulator}`;

// ---- What the page may say about the rules (accuracy audit, 2 November 2026) ----------------------

/** Whether a closed-season row names the species at the place, so that the regulator's season decides what is open there. */
export function ruleCovers(place: PlaceScope, slug: string, water?: WaterGroup): boolean {
  return rulesFor(place).some((r) => r.species.includes(slug) && waterMatch(r, water));
}

const YEAR_DAYS = (() => {
  const out: string[] = [];
  for (let m = 1; m <= 12; m++) for (let d = 1; d <= LAST[m - 1]; d++) out.push(`${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  return out;
})();

/** The closed-season rows that name the species at the place (and, when asked, the kind of water). */
export function rulesNaming(place: PlaceScope, slug: string, water?: WaterGroup): ClosedSeason[] {
  return rulesFor(place).filter((r) => r.species.includes(slug) && waterMatch(r, water));
}

/**
 * The days a species may be fished at the place, from the closed ranges of
 * the rows that name it: "15 May to 31 March", "19 June to 15 December", or
 * two spans joined by "and"; "all year" when the rows naming it close
 * nothing. Null when no row names it, or when it is closed all year.
 */
export function openWords(place: PlaceScope, slug: string, water?: WaterGroup): string | null {
  const closedRanges: ClosedRange[] = [];
  let named = false;
  for (const rule of rulesFor(place)) {
    if (!speciesMatch(rule, slug) || !waterMatch(rule, water)) continue;
    named = true;
    closedRanges.push(...rule.closed);
  }
  if (!named) return null;
  if (!closedRanges.length) return "all year";
  const open = YEAR_DAYS.map((d) => !closedRanges.some((r) => inRange(d, r)));
  if (open.every(Boolean)) return "all year";
  if (!open.some(Boolean)) return null;
  const n = open.length;
  const spans: string[] = [];
  for (let i = 0; i < n; i++) {
    if (!open[i] || open[(i + n - 1) % n]) continue;
    let j = i;
    while (open[(j + 1) % n]) j = (j + 1) % n;
    spans.push(`${dayWords(YEAR_DAYS[i])} to ${dayWords(YEAR_DAYS[j])}`);
  }
  return spans.join(" and ");
}

/** The months (1–12) with at least one day of the library's typical months open at the place; the months a closed season covers entirely are dropped. */
export function monthsLessClosed(place: PlaceScope, slug: string, months: number[], water?: WaterGroup): number[] {
  return months.filter((m) => !monthClosure(place, slug, m, water)?.wholeMonth);
}

export type RegulatorInfo = {
  /** What the footer says: closed seasons are loaded, only a no-closed-season note is, or nothing is. */
  kind: "rules" | "note" | "none";
  /** The province, state or country the line names: "Ontario", "Western Cape", "Ireland". */
  jurisdiction: string;
  /** The regulators of the rows in force, with the page each was read from. */
  regulators: { name: string; source: string }[];
  /** The most recent date a row in force was read, ISO. */
  checked: string | null;
  /** Species slugs the closed seasons cover at the place. */
  species: string[];
  /** The regulator's own page for the place, when it has been verified (src/data/regulator-pages.ts). */
  page: RegulatorPage | null;
  /** The regulator of its tidal (salt) waters, where that is a different body and its page has been verified. */
  tidalPage: RegulatorPage | null;
};

/** The jurisdiction a place's rules belong to, as the page names it. */
export function jurisdictionOf(place: PlaceScope): string {
  const cc = place.countryCode?.toUpperCase();
  if ((cc === "CA" || cc === "US") && place.admin1) return place.admin1;
  return place.country ?? place.admin1 ?? place.countryCode ?? "this place";
}

/** The regulator behind a place's fishing page: the rows in force and the date read, or the page to check when none is loaded. */
export function regulatorFor(place: PlaceScope): RegulatorInfo {
  const closing = rulesFor(place);
  const notes = jurisdictionNotes(place);
  const rows = [...closing, ...notes];
  const regulators = [...new Map(rows.map((r) => [r.regulator, { name: r.regulator, source: r.source }])).values()];
  const checked = rows.map((r) => r.checked).sort().pop() ?? null;
  return {
    kind: closing.length ? "rules" : notes.length ? "note" : "none",
    jurisdiction: jurisdictionOf(place),
    regulators,
    checked,
    species: [...new Set(closing.flatMap((r) => r.species).filter((x) => x !== "*"))],
    page: regulatorPageFor(place),
    tidalPage: tidalPageFor(place),
  };
}

const ISO_MONTHS = MONTHS;
/** "2 November 2026" for "2026-11-02". */
export function dateWords(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${ISO_MONTHS[m - 1]} ${y}`;
}

/** A piece of the footer line: plain text, or text that links to a page. */
export type FooterPart = string | { text: string; href: string };

/**
 * The sentence under the fishing page about the rules. "Seasons are the
 * regulator's, as read on <date>" appears only where a rule row (a closed
 * season, or an open-all-year row naming species) applies to the place; where
 * the table has only a note it says the regulator was read and that no closed
 * seasons are loaded; where it has nothing it says no rules are loaded and
 * points to the regulator's own page (src/data/regulator-pages.ts).
 */
const PROPER_FIRST_WORD = /^(Atlantic|Arctic|Pacific|European|American|Chinook|Coho|Sockeye|Murray|Nile|Mediterranean|Japanese|Asian|African|Australian|Baltic|Caspian|Alaska|Alaskan|Greenland|Dolly|Cape|Mozambique)\b/;
/** A fish's name as it reads inside a sentence: lower case, except a proper name ("Atlantic cod", "Nile tilapia"). */
function inSentence(name: string): string {
  const [first, ...rest] = name.split(" ");
  const head = PROPER_FIRST_WORD.test(first) ? first : first.toLowerCase();
  return [head, ...rest.map((w) => (/^[A-Z][a-z]/.test(w) && !/^(Bass|Trout|Salmon|Perch|Pike|Char|Cod|Carp)$/.test(w) ? w : w.toLowerCase()))].join(" ");
}

export function rulesFooterParts(reg: RegulatorInfo, nameOf: (slug: string) => string | undefined = () => undefined, tidal = false): FooterPart[] {
  const parts = footerBase(reg, nameOf);
  // Tidal waters are a different regulator's where a verified page for it is held, said only when the page shows a sea or estuary water.
  if (tidal && reg.tidalPage) parts.push(" For tidal waters, check ", { text: reg.tidalPage.name, href: reg.tidalPage.url }, ".");
  return parts;
}

function footerBase(reg: RegulatorInfo, nameOf: (slug: string) => string | undefined): FooterPart[] {
  const keep = "Seasons, size limits and protected areas change — check the rules before you fish.";
  const links = (): FooterPart[] => reg.regulators.flatMap((r, i): FooterPart[] => [...(i > 0 ? ["; "] : []), { text: r.name, href: r.source }]);
  if (reg.kind === "rules" && reg.checked) {
    // Lower-case in running text, but not proper names ("Atlantic cod", not "atlantic cod").
    const named = reg.species.map(nameOf).filter((x): x is string => !!x).map(inSentence);
    return [
      `Seasons are the regulator's, as read on ${dateWords(reg.checked)} (`,
      ...links(),
      `)${named.length ? `, for ${named.join(", ")}` : ""}. For every other fish the months shown are typical angling months, not legal seasons. ${keep}`,
    ];
  }
  if (reg.kind === "note" && reg.checked) {
    return ["The regulator (", ...links(), `) was opened on ${dateWords(reg.checked)} for the notes above. No closed seasons are loaded from it for these waters, so the months shown are typical angling months, not legal seasons. ${keep}`];
  }
  return [
    `No regulator rules are loaded for ${reg.jurisdiction} yet. `,
    ...(reg.page ? ["Check ", { text: reg.page.name, href: reg.page.url }, " before you fish."] : ["Check the local fishing regulator before you fish."]),
    " The months shown are typical angling months, not legal seasons.",
  ];
}

/** The footer as plain text (for checks). */
export const rulesFooterText = (reg: RegulatorInfo, nameOf?: (slug: string) => string | undefined, tidal = false): string =>
  rulesFooterParts(reg, nameOf, tidal)
    .map((p) => (typeof p === "string" ? p : p.text))
    .join("");
