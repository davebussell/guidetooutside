/**
 * The stored weekly guide's fishing section, held to the page's own fish lists when it is shown (audit of 10 November
 * 2026). A guide is written once and served from storage for a week or more, and the foraging section was gated on the
 * way out (guide-ai readGuide) while the fishing section was printed as stored. So the live pages showed tarpon "in local
 * streams" at Atlanta, rainbow trout at Doby Creek in Charlotte, muskellunge twice at Baltimore, cod at Boston in
 * November, lake trout and carp with no records at Fredericton and Halifax, smallmouth bass in the tidal Fore River at
 * Portland, bass "active" in November while the same page listed them under "Other months", and Pennsylvania's stream
 * code "Trib 00774 To Darby Creek" as a water.
 *
 * `vetStoredFishing` keeps an entry only when every library fish it names is on the page's own list for today
 * (src/lib/fishing-waters fishByWater: recorded near the town, in season by its months or its records' months, and open),
 * or set apart there as closed or catch-and-release only (the page marks those and moves them down, as before). An entry
 * must say where; a second entry for the same fish goes; a fresh-water fish placed in a water the guide itself calls tidal
 * goes; an entry or water named by a database code goes. A headline or summary that names a fish the page does not list
 * now is replaced by the rules guide's headline (src/lib/guide-rules). Pure: nothing is written back; the record is
 * rewritten at the weekly regeneration.
 *
 * readGuide receives only the place, while the page loads its data alongside it, so the vet runs where the two meet: the
 * guide's renderer (src/components/GuideSections GuideBody).
 *
 * Day 3 audit (11 November 2026): the vet read the fish and never the water. St. Louis kept walleye "in Benton Park Lake
 * and Fairground Park Lake", lakes the Missouri Department of Conservation stocks with no walleye; Houston kept "Galveston
 * Bay estuaries and lagoons" and "Gulf of Mexico coastal waters" though the town has no sea or estuary water, and "Kinder
 * Lake", a park pond whose rules say no fishing. Now each entry's "Where" is held to the page's own waters for that fish
 * (`whereFault`): a water the page names is read as the kind the page gives it (Lake Pontchartrain is New Orleans's
 * estuary, not a lake), any other words by what they say (lake, pond, reservoir; river, creek, bayou; bay, gulf, surf,
 * lagoon), and an entry goes when every kind of water it names is one where the page does not list the fish, when it
 * names salt water at a town with none, when it names a water its managing agency stocks without that fish
 * (fishing-waters MANAGED_WATERS), or when it names a water that is not fishing water (water-setting flagWater). The
 * guide's list of waters loses the same salt-water and no-fishing names. Where the map look-up failed, the words still
 * decide; the page's lists for that case come from the records (water-setting recordedHabitats), so the trout of
 * Asheville's streams are kept.
 */
import { regionOf as classifyEcoregion } from "./region";
import { fishByWater, inSeasonHere, managedWatersAt, type ManagedWater } from "./fishing-waters";
import { waterOf, type WaterGroup } from "./fish-habitats";
import { flagWater, type WaterSetting } from "./water-setting";
import { bigRiverNames } from "./place-profile";
import { lakeName, riverName } from "./water-names";
import { isRecorded } from "./fish-presence";
import { isClosed } from "./closed-seasons";
import { FISH, creatureAt, inLocalMonths, type Creature } from "./nature";
import { rulesGuide } from "./guide-rules";
import { isCodedWaterName } from "./guide-check";
import { heldText, type GardenStaleness } from "./guide-vet-garden";
import type { Guide, GuideItem, LocalData } from "./types";

const words = (s: string): string[] =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    // "Catfish (channel, flathead)" and "channel catfish"; "pikes" and "pike"; never "bass" to "bas".
    .map((w) => (w.length > 4 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));

const has = (hay: string[], needle: string[]) => needle.length > 0 && needle.every((w) => hay.includes(w));
const phrase = (hay: string[], needle: string[]) => {
  if (!needle.length) return false;
  for (let i = 0; i + needle.length <= hay.length; i++) if (needle.every((w, j) => hay[i + j] === w)) return true;
  return false;
};

type Named = Creature & { localNames?: { name: string; regions: string[] | "all" }[] };
const baseWords = (c: Creature) => words(c.name.replace(/\(.*?\)/g, ""));
const latinWords = (c: Creature) => words(c.latin.replace(/ (spp\.?|[a-z]+idae|[a-z]+ini)$/i, ""));

/**
 * The library fish a written name or line refers to: its binomial; every word of its name ("Catfish (channel, flathead)"
 * names channel catfish); one of its alternative names used in `region` ("Elf" in South Africa, never "American shad" in
 * Georgia); or, with `heads`, the last word of its name alone ("cod", "tarpon") when no fish in `keep` shares that word
 * ("bass" says nothing where largemouth bass is listed).
 */
export function fishNamed(text: string, opts: { heads?: boolean; keep?: Set<string>; region?: string } = {}): Creature[] {
  const t = words(text);
  if (!t.length) return [];
  const keptHeads = new Set(FISH.filter((f) => opts.keep?.has(f.slug)).map((f) => baseWords(f).pop()));
  return FISH.filter((f) => {
    const lw = latinWords(f);
    if (lw.length > 1 && phrase(t, lw)) return true;
    const bw = baseWords(f);
    if (bw.length > 1 ? has(t, bw) : phrase(t, bw)) return true;
    const used = ((f as Named).localNames ?? []).filter((n) => n.regions === "all" || (!!opts.region && n.regions.includes(opts.region)));
    if (used.some((n) => phrase(t, words(n.name)))) return true;
    if (opts.heads) {
      const head = bw[bw.length - 1];
      if (head && head.length >= 3 && !keptHeads.has(head) && t.includes(head)) return true;
    }
    return false;
  });
}

/** Water names the guide's own text calls tidal: "the Fore River estuary", "tidal Hillsborough River", "X River (tidal reaches". */
function tidalWaters(text: string, d: LocalData): string[] {
  const out: string[] = [];
  const NAME = "((?:[A-Z][\\w'’-]+\\s+){0,3}(?:River|Creek|Brook|Stream|Harbou?r|Bay|Cove|Inlet))";
  for (const re of [new RegExp(`${NAME}\\s+(?:estuary|tidal)`, "g"), new RegExp(`\\b[Tt]idal\\s+(?:reaches\\s+of\\s+(?:the\\s+)?)?${NAME}`, "g"), new RegExp(`${NAME}\\s*\\(tidal`, "g")])
    for (const m of text.matchAll(re)) out.push(m[1].trim());
  const est = d.water?.estuary?.replace(/^the\s+/i, "").replace(/\s+estuary$/i, "");
  if (est) out.push(est);
  return [...new Set(out.map((x) => x.toLowerCase().replace(/^the\s+/, "")))].filter((x) => x.split(/\s+/).length > 1);
}

type FishingSection = Guide["fishing"];

/** The rules guide's fishing headline (src/lib/guide-rules), which names only the page's own fish. */
function rulesHeadline(d: LocalData): string {
  try {
    return rulesGuide(d).fishing.headline;
  } catch {
    return `Fishing around ${d.place.name} this week`;
  }
}
type Entry = GuideItem & { where: string };

/** The page's own waters for the "Where" test: which kinds of water list each fish today, and the named waters by kind. */
export type WhereContext = {
  /** The kinds of water whose section lists the fish today (open or set apart). */
  groupsOf: Map<string, Set<WaterGroup>>;
  /** The town has sea or estuary water. */
  marine: boolean;
  /** The town has a big lake (a "bay" may be one of its bays: Georgian Bay, the Bay of Quinte). */
  bigLake: boolean;
  /** The waters the page names, each with its kind. */
  named: { name: string; group: WaterGroup }[];
  /** Waters whose agency lists the fish it stocks, at this place. */
  managed: ManagedWater[];
  lat: number;
  lon: number;
};

/** The waters the page names, each with the kind of water it belongs to. */
function namedWaters(w: WaterSetting): { name: string; group: WaterGroup }[] {
  const out: { name: string; group: WaterGroup }[] = [];
  if (w.tidal) out.push({ name: w.tidal.water, group: w.tidal.kind === "estuary" ? "estuary" : "rivers" });
  if (w.estuary) out.push({ name: w.estuary, group: "estuary" });
  if (w.bigLake) out.push({ name: lakeName(w.bigLake.name), group: "lakes" });
  for (const r of bigRiverNames(w)) out.push({ name: riverName(r), group: "rivers" });
  for (const x of w.lakes) out.push({ name: x.name, group: "lakes" });
  for (const x of [...w.rivers, ...w.streams]) out.push({ name: x.name, group: "rivers" });
  // "the Lower Laguna Madre and the Brownsville Ship Channel": each part is a name.
  return out.flatMap((x) => x.name.split(/\s+and\s+(?=the\s|[A-Z])/).map((n) => ({ name: n.replace(/^the\s+/i, "").trim(), group: x.group }))).filter((x) => x.name.length > 2);
}

/**
 * Words that name salt water and nothing else. Not "bay", "lagoon", "offshore" or "tidal" alone: lakes have shallow bays
 * and offshore water, Midwestern parks have lagoons, and Washington's Tidal Basin is fresh. A named bay ("Galveston Bay")
 * counts where the town has no big lake, whose bays it may be (Yellowknife Bay, the Bay of Quinte); a named sea always.
 * "Tidal" counts as the sea's or the estuary's only where the town has one; "river mouths" and "creek mouths" name no kind
 * (a creek may enter a lake).
 */
const SALT_WORDS = /\b(gulf|ocean|surf|estuar(?:y|ies)|salt ?marsh(?:es)?|salt ?water|brackish|coastal|jett(?:y|ies)|the sea|seawall|sea wall)\b/i;
const SEA_NAME = /\b[A-Z][\w'’-]+ Sea\b/;
const BAY_NAME = /\b[A-Z][\w'’-]+ Bay\b/;
const KIND_WORDS: { group: WaterGroup; re: RegExp }[] = [
  { group: "lakes", re: /\b(lakes?|ponds?|reservoirs?|dams?|resacas?|impoundments?|quarr(?:y|ies))\b/i },
  { group: "rivers", re: /\b(rivers?|creeks?|streams?|brooks?|runs?|bayous?|tailwaters?|tailraces?|branch|fork)\b/i },
];

/** Whether a water name or "Where" line names salt water, at a place with or without a big lake. */
export const saltWords = (text: string, bigLake: boolean): boolean => SALT_WORDS.test(text) || SEA_NAME.test(text) || (!bigLake && BAY_NAME.test(text));

/**
 * Why an entry's "Where" puts its fish somewhere the page does not, or null (Day 3 audit). `slugs` are the library fish
 * the entry names.
 */
export function whereFault(where: string, slugs: string[], ctx: WhereContext): string | null {
  const flagged = flagWater({ name: where.replace(/^(in|at|on)\s+/i, ""), kind: "lake", distanceKm: 0 }, ctx.lat, ctx.lon);
  if (flagged?.certain && (flagged.kind === "no-fishing" || flagged.kind === "urban-drain")) return `names a water that is not fishing water (${flagged.reason})`;
  for (const m of ctx.managed) {
    if (!m.names.test(where)) continue;
    const off = slugs.filter((x) => !m.species.includes(x));
    if (off.length) return `names a water ${m.agency} stocks without ${off.join(", ")}`;
  }
  // The kinds of water the line names: the page's own names first, read as the page reads them, then the words left.
  const kinds = new Set<WaterGroup>();
  let rest = where;
  for (const n of ctx.named) {
    const k = n.name.toLowerCase();
    const i = k ? rest.toLowerCase().indexOf(k) : -1;
    if (i >= 0) {
      kinds.add(n.group);
      rest = `${rest.slice(0, i)} ${rest.slice(i + k.length)}`;
    }
  }
  const salt = saltWords(rest, ctx.bigLake);
  if (salt && !ctx.marine) return "names salt water at a town with no sea or estuary water";
  if (salt || (ctx.marine && /\btidal\b/i.test(rest))) {
    kinds.add("estuary");
    kinds.add("sea");
  }
  // "River mouths" and "creek mouths" name no kind of water on their own.
  const plain = rest.replace(/\b(river|creek) mouths?\b/gi, " ");
  for (const kw of KIND_WORDS) if (kw.re.test(plain)) kinds.add(kw.group);
  if (!kinds.size) return null;
  const listed = (slug: string) => [...kinds].some((g) => ctx.groupsOf.get(slug)?.has(g));
  const off = slugs.filter((x) => !listed(x));
  return off.length ? `${off.join(", ")} placed in ${[...kinds].join(" or ")} water, where the page does not list it` : null;
}

/** What the page's own lists allow today: the fish in season and open, and those set apart as closed or catch-and-release only. */
export function pageFish(d: LocalData): { open: Set<string>; apart: Set<string>; region: string; ctx?: WhereContext } {
  const eco = classifyEcoregion(d.place.lat, d.place.lon);
  if (!d.water) {
    // No water setting: the rules guide's own fallback (the region's fish recorded near the town and not closed today), held
    // to the same months as the fishing page.
    const open = FISH.filter(
      (f) => creatureAt(f, eco.slug, d.place) && isRecorded(d.place.slug, f.slug) && inSeasonHere(inLocalMonths(f, eco.slug), d.month, eco.slug, d.place) && !isClosed(d.place, f.slug, d.today),
    );
    return { open: new Set(open.map((f) => f.slug)), apart: new Set(), region: eco.slug };
  }
  const sections = fishByWater(d.month, eco.slug, d.water, { place: d.place, today: d.today });
  const usable = sections.filter((s) => !s.avoid);
  const groupsOf = new Map<string, Set<WaterGroup>>();
  for (const s of usable) for (const f of [...s.fish, ...s.closed]) groupsOf.set(f.slug, new Set([...(groupsOf.get(f.slug) ?? []), s.id]));
  const w = d.water;
  return {
    open: new Set(usable.flatMap((s) => s.fish.map((f) => f.slug))),
    apart: new Set(usable.flatMap((s) => s.closed.map((f) => f.slug))),
    region: eco.slug,
    ctx: {
      groupsOf,
      marine: w.groups.includes("sea") || w.groups.includes("estuary"),
      bigLake: !!w.bigLake,
      named: namedWaters(w),
      managed: managedWatersAt(d.place),
      lat: d.place.lat,
      lon: d.place.lon,
    },
  };
}

/** Why a stored fishing entry may not be shown today, or null when it may. Exported for the checks. */
export function entryFault(it: Entry, allowed: Set<string>, tidal: string[], seen: Set<string>, region?: string, ctx?: WhereContext): string | null {
  const named = fishNamed(it.name, { region });
  if (!named.length) return "names no fish of the library";
  const out = named.filter((f) => !allowed.has(f.slug));
  if (out.length) return `${out.map((f) => f.slug).join(", ")} not on the page's list today`;
  const where = (it.where ?? "").trim();
  if (!where) return "says no water";
  if (isCodedWaterName(where)) return "names a water by its database code";
  const key = named
    .map((f) => f.slug)
    .sort()
    .join("+");
  if (seen.has(key)) return "listed twice";
  const w = where.toLowerCase();
  if (named.every((f) => waterOf(f.slug) === "fresh") && tidal.some((x) => w.includes(x))) return "a fresh-water fish placed in a water the guide calls tidal";
  // The water named is one the page lists this fish for (Day 3 audit).
  const off = ctx ? whereFault(where, named.map((f) => f.slug), ctx) : null;
  if (off) return off;
  seen.add(key);
  return null;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/**
 * Whether a stored headline names a month other than `month` (1-12). Whole, capitalised month names only; "May" as the
 * first word may be the verb, so it is read as a month only after the first word.
 */
export function otherMonth(text: string, month: number): boolean {
  for (const m of text.matchAll(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g)) {
    if (m[1] === "May" && (m.index ?? 0) === 0) continue;
    if (MONTHS.indexOf(m[1]) !== month - 1) return true;
  }
  return false;
}

/** The stored fishing section held to the page's lists today, with the headline and summary that go with it. */
export function vetStoredFishing<G extends Guide>(guide: G, d: LocalData): G {
  const f = guide.fishing;
  if (!f) return guide;
  const { open, apart, region, ctx } = pageFish(d);
  const allowed = new Set([...open, ...apart]);
  const all = [f.headline, f.bestTimes, f.regulationsNote, ...(f.waters ?? []), ...(f.species ?? []).flatMap((s) => [s.name, s.where ?? "", s.detail, s.caution ?? ""])].join(". ");
  const tidal = tidalWaters(all, d);
  const seen = new Set<string>();
  // The entries' own words are held to today as the gardening section's are (src/lib/guide-vet-garden staleWhy): the Day 4
  // audit (13 Nov 2026) found "Cooler October water moves them" and October tides in fish entries read in November, and
  // "water temperature drops into the low 20s°C" is the week it was written. A sentence naming a month or date that has
  // passed, or that week's weather, goes; the entry stays with what is left.
  const s: GardenStaleness = { today: d.today, written: guide.generatedAt ? guide.generatedAt.slice(0, 10) : null, frostGone: false };
  const held = (x: string | undefined) => (x ? heldText(x, s) : x);
  const species = (f.species ?? [])
    .filter((it) => !entryFault(it as Entry, allowed, tidal, seen, region, ctx))
    .map((it) => {
      const detail = held(it.detail) ?? "";
      const caution = held(it.caution);
      return detail === it.detail && caution === it.caution ? it : { ...it, detail, ...(it.caution != null ? { caution } : {}) };
    });
  const bestTimes = held(f.bestTimes) ?? "";
  // A coded name, a salt-water name at a town with none (Houston's "Galveston Bay estuaries and lagoons"), or a water
  // that is not fishing water (Kinder Lake) is not one of the town's fishing waters.
  const notFishing = (name: string) => {
    if (!ctx) return false;
    const a = flagWater({ name, kind: "lake", distanceKm: 0 }, ctx.lat, ctx.lon);
    // A river a source calls dry (Phoenix's Salt River, Day 4 audit) is not one either.
    return !!a?.certain && (a.kind === "no-fishing" || a.kind === "urban-drain" || a.kind === "dry-river");
  };
  const waters = (f.waters ?? []).filter((w) => !isCodedWaterName(w) && !(ctx && !ctx.marine && saltWords(w, ctx.bigLake)) && !notFishing(w));
  // A headline that names a fish the page does not list now (Atlanta's "tarpon in local streams", Boston's "cod in season" in November).
  const stray = (t: string) => fishNamed(t, { heads: true, keep: open, region }).some((x) => !open.has(x.slug));
  // Or that names another month (Day 4 audit, 13 November 2026: Tampa's stored "Fall fishing in Tampa: October tides" and
  // Las Vegas's October list, read in November).
  const headline = stray(f.headline ?? "") || otherMonth(f.headline ?? "", d.month) ? rulesHeadline(d) : f.headline;
  const same =
    species.length === f.species?.length && species.every((x, i) => x === f.species![i]) && bestTimes === (f.bestTimes ?? "") && waters.length === (f.waters ?? []).length && headline === f.headline;
  if (same) return guide;
  const fishing: FishingSection = { ...f, headline, species, waters, bestTimes };
  // The overview's lead is the summary: the old headline is swapped for the new one, and a summary still naming a fish the
  // page does not list is rebuilt from the three headlines.
  let summary = headline === f.headline ? guide.summary : (guide.summary ?? "").split(f.headline).join(headline);
  if (stray(summary ?? "")) summary = [guide.gardening?.headline, headline, guide.foraging?.headline].filter(Boolean).map((h) => h!.replace(/[.!]+$/, "")).join(". ") + ".";
  return { ...guide, fishing, summary };
}
