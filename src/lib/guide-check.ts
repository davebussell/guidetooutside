/**
 * The vetting gate for an AI-written guide section: anything not grounded in
 * the place's own lists is dropped, wild foods with a dangerous look-alike
 * must carry the look-alike text, and a section left with nothing useful is
 * rejected so the rules guide stands in for it.
 *
 * Round two of the regional-accuracy work (14 October 2026) added the fact
 * sheet (`GuideFacts`) the model is handed and must respect, and three harder
 * rejections drawn from the audited failures in
 * /home/claude/rebuild/audit/RF-findings.md §0 and §7 L9:
 *   - a fishing section that names a water flagged "do not recommend" (a
 *     closed drinking-water reservoir, a canalised urban drain, a sewage
 *     works) or that offers a species in its closed season as a target is
 *     rejected outright (Cape Town's Molteno and Table Mountain reservoirs,
 *     Toronto's October lake trout, Oslofjord cod);
 *   - a gardening section whose season words contradict the regime is
 *     rejected: "rain arrives mid-October" in Cape Town (the rains end in
 *     September), "start of the long rains" in a Nairobi October (Kenya Met:
 *     long rains March–May, short rains October–December), "October spring
 *     planting" at 1° S;
 *   - a hemisphere error — the opposite temperate season named for the
 *     month — is rejected in every section.
 * It also repairs the stored-string bug seen on Lagos, where the model
 * returned an item whose `name` was the JSON of the whole array.
 *
 * Conservation wave one (22 October 2026): the site names only organisations
 * in its verified library (src/data/conservation). A section that names
 * anything that looks like an organisation — capitalised words ending in
 * Society, Trust, Foundation, Alliance, Association, Conservancy, Institute,
 * Federation, Fund, Club, Riverkeeper, Waterkeeper, Baykeeper, Lakekeeper,
 * Keeper or Unlimited, or a name led by Audubon or BirdLife — that is not in
 * the library (or part of a library name) is rejected (`unknownOrganisation`).
 * The allow-list arrives in the context (`ctx.orgNames`, built by guide-ai
 * from ORG_NAMES), so this module, which the client GuideLoader also
 * imports, never pulls the library into a browser bundle.
 *
 * // source: Kenya Meteorological Department, March–May 2024 seasonal forecast —
 * //   "The March to May period is the major rainfall season (long rains)";
 * //   "October-December 'Short-Rains'". https://meteo.go.ke/documents/10/MAM_2024_Forecast.pdf
 * // source: Ontario MNRF, Fishing Regulations Summary FMZ 20 — lake trout open
 * //   "January 1 to September 30 and December 1 to December 31".
 * //   https://www.ontario.ca/document/ontario-fishing-regulations-summary/fisheries-management-zone-20
 * // source: Fiskeridirektoratet, Sak 30/2022 — cod fishing banned inside the baseline from
 * //   Telemark to the Swedish border since 15 June 2019.
 * //   https://www.fiskeridir.no/Yrkesfiske/Dokumenter/Reguleringsmoetet2/november-2022/saksdokumenter/Sak-30-2022-Evaluering-tiltak-Oslofjorden.pdf
 */
import type { Species } from "./species";
import type { Guide, GuideItem, LocalData } from "./types";
import { agencyNote, tidalRegsFor } from "./region-regs";

export type GuideSection = "gardening" | "fishing" | "foraging";
export const GUIDE_SECTIONS: GuideSection[] = ["gardening", "fishing", "foraging"];

/**
 * A stored guide: the three sections plus, since round two, the list of the
 * sections that fell back to the rules guide because the model's text failed
 * the check. A section in `fallback` is labelled "Seasonal guide", not
 * "AI-written". (The `Guide` type lives in src/lib/types.ts, a shared file;
 * the field is optional so older records read unchanged.)
 */
export type StoredGuide = Guide & { fallback?: GuideSection[] };

/** Which source wrote one section of a guide. */
export function sectionSource(guide: Pick<StoredGuide, "source" | "fallback">, section: GuideSection | "overview"): "ai" | "rules" | "mixed" {
  if (guide.source !== "ai") return "rules";
  const fb = Array.isArray(guide.fallback) ? guide.fallback : [];
  if (section === "overview") return fb.length === 0 ? "ai" : fb.length >= 3 ? "rules" : "mixed";
  return fb.includes(section) ? "rules" : "ai";
}

/** The small source note beside a section's title. */
export function sectionLabel(guide: Pick<StoredGuide, "source" | "fallback">, section: GuideSection | "overview"): string {
  const s = sectionSource(guide, section);
  return s === "ai" ? "AI-written from local data · updated weekly" : s === "mixed" ? "Part AI-written, part seasonal guide" : "Seasonal guide";
}

/** A named water the model must not recommend, and why. */
export type AvoidWater = { name: string; reason: string };
/** A species in its closed season here, as the regulator states it; `release` when it may be fished but not kept (a `noKeep` period). */
export type ClosedNow = { species: string; water?: string; until: string; note: string; release?: boolean };

/**
 * A water's "name" that is a database code, not a name anglers use: "Trib 00774 To Darby Creek" (Pennsylvania's stream
 * codes, printed in Philadelphia's weekly guide, audit of 10 November 2026), "Unnamed Tributary", a run of four or more digits.
 */
export const isCodedWaterName = (name: string): boolean => /\btrib\.?\s+\d/i.test(name) || /^unnamed\b/i.test(name.trim()) || /\b\d{4,}\b/.test(name);

/**
 * The items with the library's look-alike text in place of the model's, wherever the item names a library species that has
 * one: model lines named the wrong look-alike (poison ivy for wild grape, "none dangerous" for hawthorn and rose hips) on
 * the 5 November audit, and on the 10 November audit stored guides still printed theirs (Charlottetown: lingonberry "larger"
 * than cranberry and "both edible", with no word of winterberry holly; Halifax: yew and juniper needles the wrong way round).
 * Used when a guide is written and when a stored one is read. `find` maps an item's name to its library species.
 */
export function libraryLookalikes<T extends { name: string; lookalikes?: string }>(items: T[], find: (name: string) => { lookalikes?: string } | undefined): T[] {
  return items.map((it) => {
    const s = find(it.name);
    return s?.lookalikes && s.lookalikes !== it.lookalikes ? { ...it, lookalikes: s.lookalikes } : it;
  });
}
/** One of the place's waters with its fish in season, the closed ones set apart. */
export type FishWater = { water: string; fish: string[]; closed: ClosedNow[]; closing?: string[]; avoid?: string };

/**
 * The facts the model is handed and the check holds it to. Worked out in
 * src/lib/guide-ai guideContext from the regime (agent A's climate truth),
 * the water lists (agent C's closed seasons and avoid flags) and the region
 * context (units and season vocabulary).
 */
export type GuideFacts = {
  hemisphere: "north" | "south";
  /** Within 23.5° of the equator: no temperate seasons. */
  tropical: boolean;
  /** The site's temperate season for the month in the place's hemisphere ("Fall"). */
  season: string;
  /** The season word the page shows: "Autumn", "Spring", "Short rains", "Dry season". */
  seasonLabel: string;
  /** "autumn" outside the US, "fall" inside it. */
  autumn: "autumn" | "fall";
  /** Only the US reads °F and inches first. */
  imperial: boolean;
  countryCode: string | null;
  regime: {
    id: string;
    name: string;
    koppen: string;
    rain: string;
    wetMonths: number[];
    dryMonths: number[];
    runsOn: string;
    frostLed: boolean;
  } | null;
  /** The runs of wet months, each with its local name ("Long rains", "Winter rains"). */
  rainRuns: { months: number[]; label: string }[];
  frost: { lastSpringFrost: string; firstFallFrost: string; source: string; confidence: string; frostLed: boolean } | null;
  avoidWaters: AvoidWater[];
  closed: ClosedNow[];
  regulator: string | null;
};

export type GuideContext = {
  region: { slug: string; name: string };
  /** Crop names to sow or plant now. */
  sow: string[];
  watered: string[];
  trays: string[];
  /** Crop names coming in now. */
  harvest: string[];
  /** Fish in season, by water. */
  fish: FishWater[];
  /** The library's wild foods in season here. */
  wild: Species[];
  /** Wild foods coming into season. */
  soon: string[];
  facts: GuideFacts;
  /** The organisations the fact sheet offers the writer (orgsFor the place, top four): name, why, home page. */
  orgs?: { name: string; why: string; url: string }[];
  /** Every organisation name and short name in the library, lower-cased (ORG_NAMES): the only organisations a section may name. */
  orgNames?: ReadonlySet<string>;
};

// ---- organisation names ------------------------------------------------------------

const ORG_WORD = "(?:Society|Societies|Trusts?|Foundation|Alliance|Association|Conservancy|Institute|Federation|Fund|Club|Riverkeeper|Waterkeeper|Baykeeper|Lakekeeper|Keeper|Audubon|BirdLife|Unlimited)";
/** A capitalised word: "Ottawa", "St.", "Saint-Laurent", "O’Brien", "BirdLife". */
const CAP = "(?:\\p{Lu}[\\p{L}\\p{M}'’.\\-]*)";
/** The short words a name may carry between its capitalised ones ("Society for the Protection of Birds"); never "and", which joins two names. */
const LINK = "(?:of|for|the|on|de|du|des|la|le|del|&)";
/** Capitalised words followed by an organisation word, and any "of …" tail: "Ottawa Riverkeeper", "Royal Society for the Protection of Birds". */
const ORG_NAME_RE = new RegExp(`(?:${CAP}\\s+(?:${LINK}\\s+)*)+${ORG_WORD}\\b(?:\\s+(?:${LINK}\\s+)*${CAP})*`, "gu");
/** Names led by a network word: "BirdLife South Africa", "Audubon Society of Portland". */
const ORG_LED_RE = new RegExp(`\\b(?:Audubon|BirdLife|Riverkeeper|Waterkeeper)(?:\\s+(?:${LINK}\\s+)*${CAP})+`, "gu");

const ORG_KEYWORDS = new Set(ORG_WORD.slice(3, -1).replace("Trusts?", "Trust|Trusts").toLowerCase().split("|"));

const orgNorm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]s\b/g, "")
    .replace(/[^a-z0-9&]+/g, " ")
    .trim()
    .replace(/^the /, "");

let normCache: { from: ReadonlySet<string>; names: string[] } | null = null;
const normNames = (names: ReadonlySet<string>) => {
  if (normCache?.from !== names) normCache = { from: names, names: [...names].map((n) => ` ${orgNorm(n)} `) };
  return normCache.names;
};

/**
 * The first phrase in `t` that looks like an organisation's name and is not
 * one in the library, or null. A phrase passes when it, or what is left of it
 * after dropping words from the end it was not anchored on (a sentence's
 * opening "Join", a trailing "Canada", but never the organisation word), is a
 * whole-word part of a library name with at least two words left: "Join
 * Ottawa Riverkeeper" and "Ducks Unlimited" pass; "Bogus Riverkeeper" and
 * "the Rideau Trust" do not.
 */
export function unknownOrganisation(t: string, names: ReadonlySet<string>): string | null {
  const lib = normNames(names);
  const known = (words: string[]) => words.length >= 2 && lib.some((n) => n.includes(` ${words.join(" ")} `));
  for (const m of t.matchAll(ORG_NAME_RE)) {
    const w = orgNorm(m[0]).split(" ").filter(Boolean);
    const k = w.findIndex((x) => ORG_KEYWORDS.has(x));
    let ok = false;
    // Drop leading words (a sentence's first word is capitalised too) and the "of …" tail, never the organisation word itself.
    for (let i = 0; i <= k && !ok; i++) for (let j = w.length; j > k && !ok; j--) ok = known(w.slice(i, j));
    if (!ok) return m[0];
  }
  for (const m of t.matchAll(ORG_LED_RE)) {
    const w = orgNorm(m[0]).split(" ").filter(Boolean);
    let ok = false;
    for (let j = w.length; j >= 2 && !ok; j--) ok = known(w.slice(0, j));
    if (!ok) return m[0];
  }
  return null;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/(ies)$/, "y").replace(/(oes|ses|xes|ches|shes)$/, (m) => m.slice(0, -2)).replace(/s$/, ""))
    .join(" ");

/** Does a written name refer to one of the listed names? ("Lake trout" answers to "lake trout"; "Aubergines (eggplant)" to "eggplant".) */
export function matches(name: string, list: string[]): string | null {
  const n = norm(name);
  if (!n) return null;
  for (const l of list) {
    const m = norm(l);
    if (!m) continue;
    if (n === m || n.includes(m) || m.includes(n)) return l;
    // "Aubergines (eggplant, brinjal)" also answers to "eggplant".
    const alt = (l.match(/\((.*?)\)/)?.[1] ?? "").split(",").map(norm).filter(Boolean);
    if (alt.some((a) => n.includes(a) || a.includes(n))) return l;
  }
  return null;
}

const text = (s: unknown, max = 600) => (typeof s === "string" ? s.replace(/!+/g, ".").replace(/\s+/g, " ").trim().slice(0, max) : "");
const strings = (xs: unknown, n: number) => (Array.isArray(xs) ? xs.map((x) => text(x, 300)).filter(Boolean).slice(0, n) : []);

/** A name that is really JSON, or far too long to be a name. */
const looksLikeJson = (s: string) => /^\s*[[{]/.test(s) || /"(name|detail|where)"\s*:/.test(s) || s.length > 90;

/**
 * The items as a list of objects, whatever shape the model returned: a JSON
 * string for the array, or one item whose `name` holds the JSON of the array
 * (the Lagos bug: "Harvest and storage" rendered as `[ { "name": …`).
 */
export function unwrapItems(xs: unknown): Record<string, unknown>[] {
  // Lenient: the model's string can be cut short (the Lagos record ends after
  // its last item without the closing bracket), so try the obvious repairs,
  // then fall back to lifting the "name"/"detail" pairs out of the text.
  const parse = (s: string): unknown => {
    for (const tail of ["", "]", "}]", "\"}]", "\"}"]) {
      try {
        return JSON.parse(s + tail);
      } catch {
        /* next repair */
      }
    }
    const pairs = [...s.matchAll(/"name"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*"detail"\s*:\s*"((?:[^"\\]|\\.)*)"(?:\s*,\s*"(where|caution|lookalikes)"\s*:\s*"((?:[^"\\]|\\.)*)")?/g)];
    if (!pairs.length) return null;
    const un = (t: string) => t.replace(/\\(["\\/bfnrt]|u[0-9a-fA-F]{4})/g, (m) => JSON.parse(`"${m}"`) as string);
    return pairs.map((m) => ({ name: un(m[1]), detail: un(m[2]), ...(m[3] ? { [m[3]]: un(m[4]) } : {}) }));
  };
  if (typeof xs === "string") {
    const p = parse(xs);
    return Array.isArray(p) ? unwrapItems(p) : [];
  }
  if (!Array.isArray(xs)) return [];
  const out: Record<string, unknown>[] = [];
  for (const x of xs) {
    if (!x || typeof x !== "object") continue;
    const it = x as Record<string, unknown>;
    if (typeof it.name === "string" && looksLikeJson(it.name)) {
      const p = parse(it.name);
      if (Array.isArray(p)) out.push(...unwrapItems(p));
      else if (p && typeof p === "object") out.push(p as Record<string, unknown>);
      continue;
    }
    out.push(it);
  }
  return out;
}

function items<T extends GuideItem>(xs: unknown, list: string[], n: number): T[] {
  const out: T[] = [];
  for (const x of unwrapItems(xs)) {
    if (typeof x.name !== "string" || looksLikeJson(x.name) || !matches(x.name, list)) continue;
    const it: Record<string, string> = { name: text(x.name, 80), detail: text(x.detail) };
    for (const k of ["where", "lookalikes", "caution"]) if (text(x[k])) it[k] = text(x[k]);
    if (it.detail) out.push(it as unknown as T);
    if (out.length >= n) break;
  }
  return out;
}

/**
 * A stored guide with the Lagos-style JSON strings unwrapped, for records
 * written before the check learned to repair them. Pure; the record itself is
 * rewritten only when its place is next regenerated.
 */
export function cleanGuide<G extends Guide>(guide: G): G {
  const fix = <T extends GuideItem>(xs: unknown): T[] =>
    unwrapItems(xs)
      .filter((x) => typeof x.name === "string" && !looksLikeJson(x.name) && typeof x.detail === "string")
      .map((x) => {
        const it: Record<string, string> = { name: text(x.name, 80), detail: text(x.detail) };
        for (const k of ["where", "lookalikes", "caution"]) if (text(x[k])) it[k] = text(x[k]);
        return it as unknown as T;
      });
  const g = guide.gardening;
  const f = guide.fishing;
  const fo = guide.foraging;
  const dirty = (xs: unknown) => typeof xs === "string" || (Array.isArray(xs) && xs.some((x) => x && typeof x === "object" && looksLikeJson(String((x as GuideItem).name ?? ""))));
  if (![g?.sowOutdoorsNow, g?.startIndoorsNow, g?.harvestNow, f?.species, fo?.inSeasonNow, fo?.comingSoon].some(dirty)) return guide;
  return {
    ...guide,
    gardening: { ...g, sowOutdoorsNow: fix(g.sowOutdoorsNow), startIndoorsNow: fix(g.startIndoorsNow), harvestNow: fix(g.harvestNow) },
    fishing: { ...f, species: fix(f.species) },
    foraging: { ...fo, inSeasonNow: fix(fo.inSeasonNow), comingSoon: fix(fo.comingSoon) },
  };
}

// ---- season and hemisphere rules -------------------------------------------------------

const SEASON_WORD = /\b(spring|summer|autumn|winter)\b/i;
/** "fall" only where it means the season, not the verb. */
const FALL_SEASON = /\b(?:this|early|late|mid|in|into|the|first|by|before|after)\s+fall\b|\bfall\s+(?:planting|sowing|harvest|garden|crops?|season|frost|turnover|colou?r)/i;
/**
 * A season named as the present one: "this autumn", "spring is here", "as
 * autumn sets in". A bare "spring harvest" or "early spring" is left alone:
 * "plant garlic now for an early spring harvest" is a future reference, and
 * a Toronto October guide that said so was right.
 */
const SEASON_NOW =
  /\bthis\s+(spring|summer|autumn|fall|winter)\b|\b(spring|summer|autumn|fall|winter)\s+(?:is\s+here|has\s+arrived|arrives|begins|is\s+under\s*way|is\s+in\s+full\s+swing|sets?\s+in|settles\s+in|is\s+(?:now\s+)?(?:upon|with)\s+us)\b|\b(?:as|now\s+that|with)\s+(spring|summer|autumn|fall|winter)\s+(?:is\s+)?(?:arrives|arriving|begins|beginning|here|under\s*way|sets\s+in|settles\s+in|comes|coming)\b/gi;

/** A season referred to ahead, not as now: "for a spring harvest", "until spring", "before winter". */
const FUTURE_SEASON = /\b(?:for|until|till|by|before|next|into|toward|towards|ahead\s+of|ready\s+(?:in|for|by))\s+(?:an?\s+|the\s+|next\s+|early\s+|late\s+|mid-?)*(?:spring|summer|autumn|fall|winter)\b/gi;

const OPPOSITE: Record<string, string[]> = {
  spring: ["autumn", "fall"],
  summer: ["winter"],
  fall: ["spring"],
  autumn: ["spring"],
  winter: ["summer"],
};

/** "The rains arrive / begin / set in", "start of the (long) rains". */
const RAINS_START =
  /\b(?:start|onset|beginning|arrival|return|first\s+(?:weeks?|days?))\s+of\s+(?:the\s+)?(?:long|short|main|first|second|big|small|spring|autumn|winter|summer)?\s*(?:rains|rainy\s+season|wet\s+season|monsoon)\b|\b(?:rains?|rainy\s+season|wet\s+season|monsoon)\s+(?:arrives?|arriving|begins?|beginning|starts?|starting|returns?|returning|breaks?|sets?\s+in|is\s+(?:here|coming|arriving|starting))\b/i;
/** "The dry season begins / sets in", "start of the dry season". */
const DRY_START =
  /\b(?:start|onset|beginning|arrival)\s+of\s+(?:the\s+)?dry\s+season\b|\bdry\s+season\s+(?:arrives?|begins?|starts?|sets?\s+in|is\s+(?:here|coming|starting))\b/i;

/** East African usage: the long rains are the March–May season, the short rains October–December (Kenya Met). */
const EAST_AFRICA = new Set(["KE", "TZ", "UG", "RW", "BI", "ET", "SO", "SS"]);
const LONG_RAINS_MONTHS = new Set([2, 3, 4, 5, 6]);
const SHORT_RAINS_MONTHS = new Set([9, 10, 11, 12, 1]);

const nextMonth = (m: number) => (m % 12) + 1;

/**
 * Why a stretch of text contradicts the place's season or hemisphere, or null.
 * `headline` applies the stricter rule for the one line the reader sees first.
 */
export function seasonConflict(t: string, facts: GuideFacts, month: number, headline = false): string | null {
  if (!t) return null;
  const season = facts.season.toLowerCase();
  if (facts.tropical) {
    const m = t.match(/\b(spring|autumn)\b/i) ?? t.match(FALL_SEASON);
    if (m) return `names a temperate season ("${m[0].trim()}") at a tropical latitude`;
  } else {
    const opp = OPPOSITE[season] ?? [];
    for (const m of t.matchAll(SEASON_NOW)) {
      const w = (m[1] ?? m[2] ?? m[3] ?? "").toLowerCase();
      if (opp.includes(w)) return `names ${w} as the present season in ${season === "fall" ? facts.autumn : season} (hemisphere error)`;
    }
    if (headline) {
      // The headline is the "now" line, so a bare season word counts — except
      // a forward reference ("garlic in now for a spring harvest", "until spring").
      const now = t.replace(FUTURE_SEASON, " ");
      const m = now.match(SEASON_WORD) ?? now.match(FALL_SEASON);
      const w = m ? (m[1] ?? "fall").toLowerCase() : null;
      if (w && opp.includes(w)) return `headline names ${w} in ${season === "fall" ? facts.autumn : season} (hemisphere error)`;
    }
  }
  const r = facts.regime;
  if (r && r.rain !== "year-round" && r.rain !== "little-rain") {
    const wetNow = r.wetMonths.includes(month);
    const wetNext = r.wetMonths.includes(nextMonth(month));
    if (RAINS_START.test(t) && !wetNow && !wetNext) return `says the rains are starting, but the regime's wet months are ${r.wetMonths.join(",") || "none"} and this is month ${month}`;
    if (DRY_START.test(t) && wetNow && wetNext) return `says the dry season is starting in a wet month (${month})`;
    if (facts.countryCode && EAST_AFRICA.has(facts.countryCode)) {
      if (/\blong rains\b/i.test(t) && !LONG_RAINS_MONTHS.has(month) && /\b(?:start|onset|beginning|arriv|begin|now|this|current|marks)/i.test(t))
        return `calls month ${month} the long rains (Kenya Met: long rains March–May, short rains October–December)`;
      if (/\bshort rains\b/i.test(t) && !SHORT_RAINS_MONTHS.has(month) && /\b(?:start|onset|beginning|arriv|begin|now|this|current|marks)/i.test(t))
        return `calls month ${month} the short rains (Kenya Met: short rains October–December)`;
    }
  }
  return null;
}

/** The whole text of a section, for the season rules. */
function sectionText(r: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const v of Object.values(r)) {
    if (typeof v === "string") parts.push(v);
    else if (Array.isArray(v))
      for (const x of v) {
        if (typeof x === "string") parts.push(x);
        else if (x && typeof x === "object") for (const y of Object.values(x as Record<string, unknown>)) if (typeof y === "string") parts.push(y);
      }
  }
  return parts.join(" ");
}

/** Does the text name one of the avoid waters? Whole-name match, case-insensitive. */
function namesWater(t: string, waters: AvoidWater[]): AvoidWater | null {
  const n = ` ${norm(t)} `;
  for (const w of waters) {
    const m = norm(w.name);
    if (m.length >= 4 && n.includes(` ${m} `)) return w;
  }
  return null;
}

export type CheckResult<K extends GuideSection> = { ok: Guide[K]; reason?: undefined } | { ok: null; reason: string };

/**
 * The section vetted, with the reason when it is rejected. `checkSection`
 * below keeps the older shape (the section or null).
 */
/**
 * The foraging safety lines. They are not model-written: a hazard a model names from general knowledge (a plant that does not grow at
 * the place, a pointer to a fishing regulator for plant-harvesting rules) is a claim with no source, and the fishing regulator in the
 * fact sheet is not the owner of the land. These lines are the identification, roadside and take-only-what-you-need basics, the
 * place's own average frost dates where the climate has them (source and confidence said in the fact sheet), and the sourced
 * harvesting law where one is loaded; otherwise the plain "the owner decides" line. The look-alike warnings travel with each
 * wild food in the section itself.
 */
export function foragingSafety(facts: GuideFacts | null, forageLaw: string | null): string[] {
  const out = [
    "Never eat anything you can't identify with 100% certainty — use at least two reliable field guides for your region.",
    "Avoid roadsides, railway lines, sprayed lawns and industrial sites.",
    "Take only what you'll use and leave plenty for wildlife and regrowth.",
  ];
  const fr = facts?.frost;
  if (facts && fr && fr.frostLed && fr.lastSpringFrost !== "Rare" && fr.firstFallFrost !== "Rare" && fr.source !== "none" && fr.source !== "unknown") {
    const around = fr.confidence === "low" ? "around " : "";
    out.push(`The average last spring frost here is ${around}${fr.lastSpringFrost} and the first ${facts.autumn} frost ${around}${fr.firstFallFrost}; frost can come outside these dates, so watch the forecast before foraging in early spring or late ${facts.autumn}.`);
  }
  out.push(forageLaw ?? "Know the rules for the land you are on: its owner decides what may be picked.");
  return out.slice(0, 5);
}

const SAFETY_KEEP = [
  /^Never eat anything you can't identify with 100% certainty/,
  /^Avoid roadsides, railway lines/,
  /^Take only what you'll use/,
  /^The average last spring frost here is /,
  /^Know the rules for the land you are on/,
];
/** A guide stored before the safety lines were fixed carries model-written hazards: keep only the lines the site itself writes. */
export function vetSafety(lines: unknown): string[] {
  const kept = Array.isArray(lines) ? lines.filter((l): l is string => typeof l === "string" && SAFETY_KEEP.some((r) => r.test(l))) : [];
  return kept.length ? kept : foragingSafety(null, null);
}

export function checkSectionWhy<K extends GuideSection>(name: K, raw: Guide[K], ctx: GuideContext, d: LocalData): CheckResult<K> {
  const r = raw as unknown as Record<string, unknown>;
  const headline = text(r?.headline, 140);
  if (!headline) return { ok: null, reason: "no headline" };
  const facts = ctx.facts;
  const month = d.month;

  const bad = seasonConflict(headline, facts, month, true) ?? seasonConflict(sectionText(r), facts, month);
  if (bad) return { ok: null, reason: bad };
  if (ctx.orgNames) {
    const org = unknownOrganisation(`${headline}. ${sectionText(r)}`, ctx.orgNames);
    if (org) return { ok: null, reason: `names an organisation that is not in the library ("${org}")` };
  }

  if (name === "gardening") {
    const sowOutdoorsNow = items(r.sowOutdoorsNow, [...ctx.sow, ...ctx.watered], 5);
    const startIndoorsNow = items(r.startIndoorsNow, ctx.trays.length ? ctx.trays : ctx.sow, 3);
    const harvestNow = items(r.harvestNow, ctx.harvest, 4);
    const tasksThisWeek = strings(r.tasksThisWeek, 5);
    if (!sowOutdoorsNow.length && !harvestNow.length && !tasksThisWeek.length) return { ok: null, reason: "nothing grounded left" };
    // A frost-free place is not told to race a frost that never comes.
    if (facts.frost && !facts.frost.frostLed && facts.frost.firstFallFrost === "Rare") {
      const t = sectionText(r);
      const m = t.match(/\b(\d+)\s*(?:days?|weeks?)\s+(?:to|until|before)\s+(?:the\s+)?(?:first\s+)?(?:autumn\s+|fall\s+)?frost\b/i) ?? t.match(/\bfirst\s+(?:autumn|fall)\s+frost\s+(?:around|about|on|is)\b/i);
      if (m) return { ok: null, reason: `counts down to a frost in a frost-free place ("${m[0]}")` };
    }
    return {
      ok: { headline, zoneNotes: text(r.zoneNotes), sowOutdoorsNow, startIndoorsNow, harvestNow, tasksThisWeek, watchOut: strings(r.watchOut, 3) } as Guide[K],
    };
  }

  if (name === "fishing") {
    const fish = [...new Set(ctx.fish.flatMap((s) => s.fish))];
    const species = items<GuideItem & { where: string }>(r.species, fish, 5).filter((s) => s.where);
    if (fish.length && !species.length) return { ok: null, reason: "no listed species named with a water" };
    // A water flagged "do not recommend" anywhere in the section rejects it.
    const whole = [headline, text(r.bestTimes), ...strings(r.waters, 6), ...species.flatMap((s) => [s.name, s.where, s.detail, s.caution ?? ""])].join(" ");
    const avoided = namesWater(whole, facts.avoidWaters);
    if (avoided) return { ok: null, reason: `recommends ${avoided.name} (${avoided.reason})` };
    // A species in its closed season offered as a target rejects it.
    const closedNames = facts.closed.map((c) => c.species);
    for (const s of species) {
      const hit = matches(s.name, closedNames);
      if (hit) {
        const c = facts.closed.find((x) => x.species === hit)!;
        return { ok: null, reason: `offers ${hit} as a target in its closed season (${c.note})` };
      }
    }
    return {
      ok: {
        headline,
        species,
        bestTimes: text(r.bestTimes),
        waters: strings(r.waters, 12).filter((w) => !isCodedWaterName(w)).slice(0, 6),
        // Day 5 audit (14 November 2026): with tidal water at the town, its regulator is named too (region-regs tidalRegsFor).
        regulationsNote: text(r.regulationsNote) || regsFallback(d),
      } as Guide[K],
    };
  }

  // Foraging: only the library's species, each with its look-alikes said. ctx.wild holds only the wild foods
  // recorded near the place this month (plant-presence); guide-ai also rejects a headline that names a species
  // when that list is empty.
  const names = ctx.wild.map((s) => s.name);
  // The library's look-alike text always wins over the model's (libraryLookalikes).
  const inSeasonNow = libraryLookalikes(
    items<GuideItem & { where: string; lookalikes?: string }>(r.inSeasonNow, names, 6).filter((it) => it.where),
    (name) => ctx.wild.find((w) => w.name === matches(name, names)),
  );
  if (names.length && !inSeasonNow.length) return { ok: null, reason: "no listed wild food named with a place" };
  return { ok: { headline, inSeasonNow, comingSoon: items(r.comingSoon, ctx.soon, 3), safety: foragingSafety(facts, d.forageLaw) } as Guide[K] };
}

/** The Regulations note when the guide gives none: the province's or state's page, and the tidal regulator where there is one. */
function regsFallback(d: LocalData): string {
  return d.regs ? agencyNote(d.regs, tidalRegsFor(d)) : "";
}

export function checkSection<K extends GuideSection>(name: K, raw: Guide[K], ctx: GuideContext, d: LocalData): Guide[K] | null {
  return checkSectionWhy(name, raw, ctx, d).ok;
}
