/**
 * Is a wild edible actually found near this town? The gate every "in season",
 * "ready to pick" and "coming into season" list under a town's name passes.
 *
 * Why it exists: the library (src/data/species.json) lists a species for a
 * whole ecological region and the lists were printed under a town's name with
 * no check that anyone had ever recorded it there. Lingonberry (a boreal plant)
 * was "ready Sep-Nov near Ottawa" with no record within 40 km; hen of the woods
 * and lion's mane were "ready" in November with no November record.
 *
 * The rule (audit of 2 Nov 2026): a printed claim is (1) measured near the
 * town, (2) a regulator's rule for the jurisdiction with source and date, or
 * (3) labelled regional context and never used for "in season / legal / now".
 * For the plant lists that means:
 *
 *  - READY / IN SEASON NEAR YOU: the species is in the library's season for the
 *    month (speciesNow), has at least MIN_RECORDS records in the town's box (GBIF,
 *    about 50 km either side, 2000 on) and at least MIN_MONTH_RECORDS in that
 *    calendar month (one, until the audit of 5 Nov 2026).
 *    The month evidence is the month itself, not a neighbouring one: hen of the
 *    woods has records to 6 October near Ottawa and none in November, so on
 *    2 November it is not ready; a neighbouring month would have kept it on the
 *    list. (MONTH_WINDOW below, 0, is the one place to widen that.)
 *  - COMING INTO SEASON: the same, with the evidence in one of the next two
 *    months that the library gives for it.
 *  - ABSENT: a data-rich town with no record of the species in its box. Not shown.
 *  - UNCHECKED: the town has too few plant and fungus records to say (dataPoor),
 *    is not one of the towns the presence table was built for, or the species
 *    has no GBIF match. These go to a separately labelled "Regional list - not
 *    checked near here", with no "ready" or "in season" wording.
 *  - OUT OF RANGE: an unchecked species whose published native range (species.json `range`) does not reach the
 *    town is left off the regional list too (audit of 11 November 2026: wild pecans at Columbus, Indianapolis and
 *    Nashville). A town's own records are not overruled by a range: the checked list keeps what was recorded.
 *
 * The table is src/data/place-presence-plants.json, built by
 * scripts/build-place-plants.ts (method and date in its `meta`). Region and
 * home pages have no town, so everything they list is the regional kind.
 */
import PRESENCE from "@/data/place-presence-plants.json";
import { bansOn, type HarvestRule } from "@/data/harvest-bans";
import { SPECIES, speciesNow, speciesSoon, matchSpecies, inLocalMonths, inSeasonAt, inRange, monthName, placeAllows, type PlaceLike, type Species } from "./species";
import { classifyEcoregion } from "./ecoregions";
import { FLORA_RADIUS_KM, PRESENCE_BOX_KM, PRESENCE_FROM_YEAR } from "./plant-presence-info";

type Entry = { n: number; byMonth: number[] };
type Town = { total: number; dataPoor: boolean; box: [number, number, number, number]; species: Record<string, Entry> };
type Table = {
  meta: { built: string; boxHalfKm: number; dataPoorBelow: number; filters: string; source: string; towns: number };
  taxa: Record<string, unknown>;
  towns: Record<string, Town>;
};
const DATA = PRESENCE as unknown as Table;

/** How many neighbouring months may stand in for the month itself. 0: the month needs its own records. */
export const MONTH_WINDOW = 0;
/**
 * The fewest records that say anything (audit of 5 Nov 2026: one record was enough). A species with fewer in the whole box is
 * too thin to say it grows near here and is not listed, as the fish table sets a single far record aside; a month with fewer
 * is not a month it was found ready, since one stray observation (a leaf left in December, a misidentified photo) would
 * otherwise put it on the list.
 */
export const MIN_RECORDS = 2;
export const MIN_MONTH_RECORDS = 2;

export { FLORA_RADIUS_KM, PRESENCE_BOX_KM, PRESENCE_FROM_YEAR };
/** When the table was built (ISO date). */
export const PRESENCE_BUILT = DATA.meta.built;

/** A place as the gate needs it: its slug (the table's key), else its coordinates. */
export type PlaceRef = PlaceLike & { slug?: string };

/** Within this many degrees of a table town's centre, a place without a slug is that town. */
const SAME_PLACE_DEG = 0.03;

const centre = (t: Town) => [(t.box[0] + t.box[1]) / 2, (t.box[2] + t.box[3]) / 2] as const;

/** The table's entry for a place: by slug, else by coordinates. */
export function townOf(place?: PlaceRef | null): Town | null {
  if (!place) return null;
  if (place.slug && DATA.towns[place.slug]) return DATA.towns[place.slug];
  if (place.lat == null || place.lon == null) return null;
  for (const t of Object.values(DATA.towns)) {
    const [la, lo] = centre(t);
    if (Math.abs(la - place.lat) <= SAME_PLACE_DEG && Math.abs(lo - place.lon) <= SAME_PLACE_DEG) return t;
  }
  return null;
}

/** True when the place is in the table and has enough records to call a species absent. */
export const isChecked = (place?: PlaceRef | null): boolean => {
  const t = townOf(place);
  return !!t && !t.dataPoor;
};

export type Presence =
  /**
   * A regulator bans taking it here (src/data/harvest-bans.ts). Checked before any record: a ban holds however often
   * the food has been recorded (audit of 10 November 2026: mussels "in season" on the Bay of Fundy, where DFO
   * prohibits mussel fishing).
   */
  | { state: "banned"; bans: HarvestRule[] }
  /** Recorded in the box, and in the month asked about. */
  | { state: "ready"; n: number; inMonth: number }
  /** Recorded in the box but not in the month asked about. */
  | { state: "not-this-month"; n: number }
  /** A data-rich town with no record in the box. */
  | { state: "absent" }
  /** Fewer than MIN_RECORDS in the box of a data-rich town: too thin to say it grows near here, so not listed (as `absent`). */
  | { state: "thin"; n: number }
  /** Cannot be checked here: why. */
  | { state: "unchecked"; why: "no-table" | "data-poor" | "no-match" };

const circ = (m: number) => ((((m - 1) % 12) + 12) % 12) + 1;

/** Records in the month and, with MONTH_WINDOW, the months beside it. */
const inMonths = (e: Entry, month: number) => {
  let c = 0;
  for (let d = -MONTH_WINDOW; d <= MONTH_WINDOW; d++) c += e.byMonth[circ(month + d) - 1] ?? 0;
  return c;
};

/** What the table says about one species at one place in one (calendar) month. */
export function presenceOf(place: PlaceRef | null | undefined, speciesSlug: string, month: number): Presence {
  const bans = bansOn(speciesSlug, place, month);
  if (bans.length) return { state: "banned", bans };
  const t = townOf(place);
  if (!t) return { state: "unchecked", why: "no-table" };
  if (t.dataPoor) return { state: "unchecked", why: "data-poor" };
  if (!(speciesSlug in DATA.taxa)) return { state: "unchecked", why: "no-match" };
  const e = t.species[speciesSlug];
  if (!e || e.n < 1) return { state: "absent" };
  if (e.n < MIN_RECORDS) return { state: "thin", n: e.n };
  const here = inMonths(e, month);
  return here >= MIN_MONTH_RECORDS ? { state: "ready", n: e.n, inMonth: here } : { state: "not-this-month", n: e.n };
}

/** The evidence for a species coming into season: a record in one of the next two months that the species is in season. */
export function presenceSoon(place: PlaceRef | null | undefined, s: Pick<Species, "slug" | "months">, month: number): Presence {
  const next = [circ(month + 1), circ(month + 2)].filter((m) => s.months.includes(m));
  // Banned in the months it would come into season: not "coming".
  const bans = [...new Set(next.flatMap((m) => bansOn(s.slug, place, m)))];
  if (bans.length) return { state: "banned", bans };
  const first = presenceOf(place, s.slug, month);
  if (first.state !== "ready" && first.state !== "not-this-month") return first;
  const t = townOf(place)!;
  const e = t.species[s.slug];
  // Each month on its own terms: one of the next two months the species is in season holds MIN_MONTH_RECORDS.
  const best = Math.max(0, ...next.map((m) => inMonths(e, m)));
  return best >= MIN_MONTH_RECORDS ? { state: "ready", n: e.n, inMonth: best } : { state: "not-this-month", n: e.n };
}

/** A list under a town's name: what is checked and what is only regional context. */
export type Gated = {
  /** Recorded near the place in the month: may be called in season / ready. */
  checked: Species[];
  /** Not checkable near here: shown only as a labelled regional list. */
  regional: Species[];
  /** Why the regional list is regional, when it is. */
  why: "none" | "no-place" | "no-table" | "data-poor";
  /** In the library's list but banned here by a regulator: in neither list, printed with the ban instead. */
  banned: { species: Species; bans: HarvestRule[] }[];
  /** Left off the regional list because the place is outside the species' published native range (Species `range`). */
  outOfRange: Species[];
};

function split(
  list: Species[],
  place: PlaceRef | null | undefined,
  regionSlug: string | undefined,
  test: (s: Species) => Presence,
  bansFor: (s: Species) => HarvestRule[],
): Gated {
  // A regulator's ban comes out of both lists, wherever the place is and whatever the records say.
  const banned: Gated["banned"] = [];
  const open: Species[] = [];
  for (const s of list) {
    const b = bansFor(s);
    if (b.length) banned.push({ species: s, bans: b });
    else open.push(s);
  }
  // The regional list keeps to each species' published native range; records near the town are not overruled by it
  // (audit of 11 November 2026: wild pecans on the regional list at Columbus, Indianapolis and Nashville).
  const outOfRange: Species[] = [];
  const regionalOf = (xs: Species[]) =>
    xs.filter((s) => {
      if (inRange(s, regionSlug, place)) return true;
      outOfRange.push(s);
      return false;
    });
  const t = townOf(place);
  if (!place || !t) return { checked: [], regional: regionalOf(open), why: place ? "no-table" : "no-place", banned, outOfRange };
  if (t.dataPoor) return { checked: [], regional: regionalOf(open), why: "data-poor", banned, outOfRange };
  const checked: Species[] = [];
  const unchecked: Species[] = [];
  for (const s of open) {
    const p = test(s);
    if (p.state === "ready") checked.push(s);
    else if (p.state === "unchecked") unchecked.push(s);
  }
  return { checked, regional: regionalOf(unchecked), why: "none", banned, outOfRange };
}

/** speciesNow, then the gate: the wild edibles in season near the place in the month. */
export function foragingNow(month: number, regionSlug: string | undefined, zone: number | undefined, opts: { coast?: boolean; place?: PlaceRef | null } = {}): Gated {
  const list = speciesNow(month, regionSlug, zone, opts);
  return split(list, opts.place, regionSlug, (s) => presenceOf(opts.place, s.slug, month), (s) => bansOn(s.slug, opts.place, month));
}

/** speciesSoon, then the gate: the wild edibles coming into season near the place. */
export function foragingSoon(month: number, regionSlug: string | undefined, zone: number | undefined, opts: { coast?: boolean; place?: PlaceRef | null } = {}): Gated {
  const list = speciesSoon(month, regionSlug, zone, opts);
  return split(list, opts.place, regionSlug, (s) => presenceSoon(opts.place, s, month), (s) => {
    const p = presenceSoon(opts.place, s, month);
    return p.state === "banned" ? p.bans : [];
  });
}

// ------------------------------------------------------------ stored guides

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
/** The counts a headline states, in digits or words ("Six wild foods", "12 plants"); "a dozen" counts as 12. */
export function headlineCounts(text: string): number[] {
  const out: number[] = [];
  for (const m of text.matchAll(/\b(\d{1,3})\b/g)) out.push(Number(m[1]));
  const words = text.toLowerCase().match(/[a-z]+/g) ?? [];
  for (const w of words) {
    const i = NUMBER_WORDS.indexOf(w);
    if (i >= 2) out.push(i);
  }
  if (/\ba dozen\b/i.test(text)) out.push(12);
  return out;
}

/** The foraging part of a weekly guide, as far as the gate needs it. */
type GuideForaging = { headline: string; inSeasonNow: { name: string }[]; comingSoon: { name: string }[] };

/**
 * The evidence the foraging page's live panel ("Wild edibles recorded nearby") shows: research-grade iNaturalist
 * records within FLORA_RADIUS_KM of the place in the calendar month, every year on record, by library species
 * (local-flora.ts floraEvidence reads it from the place's stored flora record).
 */
export type LiveEvidence = { month: number; counts: Record<string, number> };

/** The wild foods the live panel lists: the library species in the evidence with MIN_MONTH_RECORDS or more. */
export const liveFoods = (live: LiveEvidence): string[] => Object.keys(live.counts).filter((sl) => live.counts[sl] >= MIN_MONTH_RECORDS);

/**
 * Words a foraging headline uses to say nothing is there, or that nothing was looked at. Audit of 11 November 2026:
 * "Fall foraging: nothing has been recorded near Columbus this month" and "Not checked against local observations:
 * this place is not one we have checked, so no wild food is listed as in season" (Asheville, Pittsburgh, St. Louis,
 * Nashville; Indianapolis the same) stood above a panel listing nine foods with records this month. A stored headline
 * with any of them is always rewritten from the evidence; a written one never says them where the evidence lists foods.
 */
export const NOTHING_HERE = /\b(nothing|none|no wild foods?|not checked|unchecked|not one we have checked|no records?|not (?:been )?recorded)\b/i;

/** The longest headline the stored-guide check keeps whole (guide-check.ts cuts a headline at 140 characters). */
export const HEADLINE_MAX = 140;

const foodsHave = (k: number) => `${k} wild food${k === 1 ? "" : "s"} in the guide ${k === 1 ? "has" : "have"}`;

/**
 * The weekly foraging headline for a place the presence table cannot speak for (not in it, data-poor there, or holding
 * none this month while the panel lists foods), from the evidence the foraging page's live panel prints: the panel's own count of wild foods with two or more records within
 * FLORA_RADIUS_KM in the month, every year on record. `listed` is how many the guide's own list under the headline
 * keeps; when it keeps none, the headline counts the panel's and says where they are listed. Without evidence it says
 * where the records are, never that there are none. Used by the stored-guide gate below and the rules guide
 * (guide-rules.ts), so the two never disagree.
 */
export function liveForagingHeadline(live: LiveEvidence | null | undefined, month: number, listed = 0): string {
  const when = `within ${FLORA_RADIUS_KM} km in ${monthName(month)} (iNaturalist, all years)`;
  if (!live || live.month !== month)
    return `This week's list keeps only wild foods with records near here; the foraging page shows what has been recorded within ${FLORA_RADIUS_KM} km in ${monthName(month)}.`;
  const k = liveFoods(live).length;
  if (listed) return `${foodsHave(listed)} two or more records ${when}.`;
  if (k) return `${foodsHave(k)} two or more records ${when}; the foraging page lists ${k === 1 ? "it" : "them"}.`;
  return `None of the guide's wild foods has two or more records ${when}.`;
}

/**
 * A weekly guide's foraging section with the gate applied. An "in season" item is kept only where it is a library
 * species that grows in the place's region, is in the library's season for the month (audit of 10 November 2026:
 * staghorn sumac and beechnuts were kept in November though the library gives Aug-Oct and Sep-Oct, because the gate
 * checked records only), is not banned here by a regulator, and has two records near the place in the month:
 *  - in the presence table, where the town is in it and not data-poor (GBIF, about PRESENCE_BOX_KM km, since 2000);
 *  - else in `live`, the place's own flora record, the evidence the panel lower on the page prints (iNaturalist,
 *    FLORA_RADIUS_KM km, every year). Audit of 10 November 2026: in 10 of the 11 US towns the headline said the
 *    place "is not one we have checked, so no wild food is listed as in season" while the panel below it listed
 *    foods with nearby records this month. The two-records rule (5 November) holds for both.
 * "Coming into season" items need the same, in one of the next two months the library gives. Where there is no
 * evidence at all, nothing is kept and the headline says where the page's records are rather than that none exist.
 * Returns the same object when nothing changes.
 */
export function gateGuideForaging<G extends GuideForaging>(fo: G, place: PlaceRef | null | undefined, month: number, live?: LiveEvidence | null): G {
  const t = townOf(place);
  const checked = !!t && !t.dataPoor;
  const useLive = !checked && !!live && live.month === month;
  const region = place?.lat != null && place?.lon != null ? (classifyEcoregion(place.lat, place.lon) as { slug: string } | null)?.slug : undefined;
  const liveCount = (slug: string, m: number) => (useLive && m === month ? (live!.counts[slug] ?? 0) : 0);
  // The library's own range and season, read in the place's calendar, before any record is looked at.
  const growsHere = (sp: Species) => (sp.regions === "all" || !region || sp.regions.includes(region)) && placeAllows(sp, region, place);
  const keepNow = (it: { name: string }) => {
    const sp = matchSpecies(it.name);
    if (!sp || !growsHere(sp) || !inSeasonAt(sp, month, region) || bansOn(sp.slug, place, month).length) return false;
    if (checked) return presenceOf(place, sp.slug, month).state === "ready";
    return liveCount(sp.slug, month) >= MIN_MONTH_RECORDS;
  };
  const keepSoon = (it: { name: string }) => {
    const sp = matchSpecies(it.name);
    if (!sp || !growsHere(sp) || inSeasonAt(sp, month, region)) return false;
    const local = inLocalMonths(sp, region);
    // Only the table holds months other than this one; the live record is this month's.
    return checked && presenceSoon(place, local, month).state === "ready";
  };
  const inSeasonNow = fo.inSeasonNow.filter(keepNow);
  const comingSoon = fo.comingSoon.filter(keepSoon);
  const n = inSeasonNow.length;
  // The model's headline stands only when nothing was taken out, any count it gives is the list's own (the 5 Nov 2026
  // audit found weekly headlines counting more wild foods than the list under them), and it does not say that nothing
  // is there or nothing was checked (NOTHING_HERE; audit of 11 November 2026). Before that rule a stored section with
  // both lists already empty and no numeral in its headline came back unchanged, so the rewrite below never ran.
  const counts = headlineCounts(fo.headline);
  if (
    inSeasonNow.length === fo.inSeasonNow.length &&
    comingSoon.length === fo.comingSoon.length &&
    (!counts.length || counts.includes(n)) &&
    !NOTHING_HERE.test(fo.headline)
  )
    return fo;
  let headline: string;
  if (checked) {
    // The list's own count; where the list keeps none, the table's count for the whole library, so "none" is said
    // only where the table holds none.
    const found =
      n ||
      SPECIES.filter((sp) => growsHere(sp) && inSeasonAt(sp, month, region) && !bansOn(sp.slug, place, month).length && presenceOf(place, sp.slug, month).state === "ready").length;
    // Where the table holds none but the panel lists foods (the panel counts differently: iNaturalist, FLORA_RADIUS_KM,
    // every year), the panel's count, not "none": Timmins in October, on the stored records of 7 November 2026.
    headline = found
      ? `${foodsHave(found)} been recorded within about ${PRESENCE_BOX_KM} km this month (GBIF records since ${PRESENCE_FROM_YEAR}).`
      : live && live.month === month && liveFoods(live).length
        ? liveForagingHeadline(live, month)
        : `None of the guide's wild foods has been recorded within about ${PRESENCE_BOX_KM} km of here this month (GBIF records since ${PRESENCE_FROM_YEAR}).`;
  } else headline = liveForagingHeadline(useLive ? live : null, month, n);
  return { ...fo, headline, inSeasonNow, comingSoon };
}
