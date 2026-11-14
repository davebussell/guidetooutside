/**
 * The stored weekly guide's gardening section, held to the town's own calendar and frost dates when it is shown (Day 3
 * audit, 11 November 2026). A guide is written once and served from storage until it is rewritten, and the fishing and
 * foraging sections are vetted on the way out (src/lib/guide-vet, src/lib/guide-ai readGuide) while the gardening section
 * was printed as stored. So on 11 November the live pages showed "five days to frost" at Pittsburgh, "nine days to frost" at
 * Nashville and the first frost "eight days away" at St. Louis, weeks after each town's average first frost (Oct 24, Oct 28,
 * Oct 27); "plant garlic and strawberries before Oct 24" and "harvest sweet corn before frost" at Pittsburgh; sweet corn in
 * Nashville's sowing list, kale "in trays now" at Memphis (UT W346-B: fall kale Aug 1–Sep 15) and sweet potatoes "coming in
 * now … dig before the first frost" there after the frost; spinach to sow at Asheville and apples, pears and haskap to
 * plant at Columbus; soil readings of 17 °C at Memphis and 26 °C at Houston from the week the guide was written; and an
 * "October 19–25" headline at Brownsville.
 *
 * `vetStoredGardening` keeps:
 *  - a sowing, planting or tray item only when every crop it names has its window open today in the town's calendar
 *    (src/lib/crop-calendar: the day's own windows, as the page's "sow now" lists read them), and an item naming no crop of
 *    the calendar not at all;
 *  - a harvest item only when every crop it names is being picked today (an annual's picking days, a perennial's months);
 *  - a task that sows or plants, or picks, a crop only when the calendar has it open, or being picked, today;
 *  - no sentence that counts down to a date (written on another day, the count is wrong by the time it is read), no
 *    frost-timed advice ("before frost", "prepare for frost", "the first frost is coming") once the town's average first frost
 *    has passed or where frost is rare, no "before Oct 24" whose date has gone, and no soil reading from another day (the page
 *    shows today's) or the week's weather as it was forecast then; no "through October" or "by Oct 24" once it has gone.
 * A headline or summary that no longer holds (a countdown, frost-timed advice after the frost, a month or a week that is not
 * this one) is replaced by the rules guide's headline (src/lib/guide-rules), or where that is itself frost-timed after the
 * frost, by "Gardening in <town> this week"; the summary is rebuilt from the three headlines. A section left with nothing to
 * sow, plant, pick or do is replaced by the rules guide's and marked as such (`fallback`). Pure: nothing is written back; the
 * record is rewritten at the weekly regeneration.
 *
 * Day 4 audit (13 November 2026): October text was still printed in November at Las Vegas, Santa Barbara, San Diego, Tucson,
 * Los Angeles and Phoenix, in body sentences the vet did not read for months ("October is prime planting time", "Fall planting
 * begins as October rains approach", "a rare rain event on October 22"), and in fish entries ("Cooler October water moves
 * them"); San Diego's "Nights dropping into the low 20s°C" slipped past the soil and weather patterns, whose figure must
 * touch the degree sign; and Orlando's guide said "Frost never occurs here", where NOAA's 1991–2020 normals count 1.6
 * freezing nights a year at Orlando International and the site's own station record low is −7.8 °C. So a sentence also goes
 * when it names a month, or a date, that has passed (PAST_MONTHS, PAST_DAYS; a sentence about averages is kept, since an
 * average date stays true), when it gives the week's temperatures in the forms "the low 20s°C", "highs near 38 °C", "by
 * mid-week", and when it says frost never comes to a town whose records show frost (`frostRecorded`). The fishing vet
 * (src/lib/guide-vet) holds its entries' text to the same test (`heldText`).
 */
import { cropCalendar, doyOfIso, inSpans, pickedOn, sowNow, type CropFit } from "./crop-calendar";
import { ALL_CROPS, cropName, localCrops } from "./crops";
import { rulesGuide } from "./guide-rules";
import type { StoredGuide } from "./guide-check";
import { getExtremes } from "./extremes";
import type { Climate, Guide, GuideItem, LocalData } from "./types";

const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_RE = "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
const monthIndex = (m: string) => MONTH_NAMES.findIndex((n) => n.slice(0, 3).toLowerCase() === m.slice(0, 3).toLowerCase());

// ---- what the stored text may no longer say ------------------------------------------------------------------------

/** Numbers as figures or words, for countdowns ("five days to frost", "11 Days to Go"). */
const NUM = "(?:\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty)";
const UNIT = "(?:days?|weeks?|nights?)";
const FROST = "(?:(?:the|your|our)\\s+)?(?:(?:average|expected|likely|first|autumn|fall|killing|hard)\\s+){0,3}(?:frost|freeze)";

/** A count of days to a frost or a deadline: wrong on any day but the one it was written. */
const COUNTDOWN: RegExp[] = [
  new RegExp(`\\b${NUM}\\s+(?:more\\s+)?${UNIT}\\s+(?:to|until|till|from|away\\s+from)\\s+${FROST}`, "i"),
  // "You have 83 frost-free days to grow cool-season crops before the first freeze".
  new RegExp(`\\b(?:you\\s+have|you've\\s+got|there\\s+are|only)\\s+(?:about\\s+)?\\d+\\s+(?:frost-free\\s+|growing\\s+)?${UNIT}\\b`, "i"),
  // "past the last spring frost by 85 days".
  new RegExp(`\\bby\\s+\\d+\\s+${UNIT}\\b`, "i"),
  // "245 frost-free days behind you", "40 days since the last frost": a count from the day it was written.
  new RegExp(`\\b\\d+\\s+(?:frost-free\\s+)?${UNIT}\\s+(?:behind\\s+you|since\\s+(?:the\\s+|your\\s+)?(?:last\\s+)?(?:spring\\s+)?frost)`, "i"),
  // "Spring frost (May 22) was 109 days ago": counted from the day it was written (Day 4 audit, 13 Nov 2026).
  new RegExp(`\\b${NUM}\\s+${UNIT}\\s+ago\\b`, "i"),
  new RegExp(`\\b(?:frost|freeze)\\s+(?:is\\s+|arrives\\s+|comes\\s+|due\\s+|expected\\s+)?(?:in|within)\\s+(?:about\\s+|roughly\\s+|around\\s+)?${NUM}\\s+${UNIT}`, "i"),
  new RegExp(`\\b(?:frost|freeze)\\b[^.]{0,40}?\\b${NUM}\\s+${UNIT}\\s+(?:away|off|out)\\b`, "i"),
  new RegExp(`\\b${NUM}\\s+${UNIT}\\s+(?:left\\s+)?to\\s+go\\b`, "i"),
  new RegExp(`\\b${UNIT}\\s+(?:left\\s+)?(?:to|until|before)\\s+${FROST}`, "i"),
  /\bfrost[- ]free\s+(?:days|weeks)\s+(?:left|remain)/i,
];

/** Advice timed to the coming autumn frost: moot once it has passed, and where frost is rare. "Before the last frost" is spring advice and is not matched. */
const FROST_TIMED: RegExp[] = [
  new RegExp(`\\b(?:before|ahead\\s+of|until|till|prior\\s+to)\\s+${FROST}s?\\b`, "i"),
  new RegExp(`\\b(?:race|beat|outrun|outpace)\\s+${FROST}`, "i"),
  new RegExp(`\\b(?:prepare|prep|get\\s+ready|ready)\\s+for\\s+${FROST}`, "i"),
  /\bfirst\s+(?:autumn\s+|fall\s+)?(?:frost|freeze)\s+(?:is\s+|will\s+be\s+)?(?:coming|approaching|expected|due|near|nears|looms|imminent|arrives|falls|this|next|soon)\b/i,
  /\b(?:frost|freeze)\s+(?:is\s+)?(?:coming|approaching|looms|nears|imminent|on\s+the\s+way)\b/i,
  /\bfrost\s+window\b/i,
  /\blast\s+frost-free\b/i,
];

/** A soil temperature quoted as a reading ("Soil at 17°C", "soil temperature is 26 °C", "17 °C soil"). */
const SOIL_READING: RegExp[] = [
  /\bsoil(?:\s+temperatures?)?\s+(?:is\s+|are\s+|at\s+|of\s+|reads?\s+|sits?\s+at\s+|near\s+|around\s+|about\s+)*(?:about\s+|around\s+|near\s+)?-?\d{1,2}(?:\.\d)?\s*[°º]\s*[CF]\b/i,
  /\b-?\d{1,2}(?:\.\d)?\s*[°º]\s*[CF]\s+(?:soil|in\s+the\s+soil)\b/i,
];

/** The week's weather as it was forecast when the guide was written ("this week's dry forecast", "gusts to 15 km/h this week"). */
const OLD_WEATHER: RegExp[] = [
  /\bforecast\b/i,
  /\d\s*(?:km\/h|mm|°\s*C)\b[^.]*\bthis\s+week\b|\bthis\s+week\b[^.]*\d\s*(?:km\/h|mm|°\s*C)\b/i,
  // "the low 20s°C", "low 70s°F", "the mid-teens": the week's temperatures as the writer saw them (Day 4 audit).
  /\b\d0s\s*[°º]\s*[CF]\b|\b(?:low|mid|high|upper)[- ](?:\d0s|teens)\b/i,
  // "highs near 38 °C", "lows of 12 °C", "highs 26–40°C": a reading, not a crop's need ("wants highs under 24 °C" stays).
  /\b(?:highs?|lows?)\s+(?:of\s+|near\s+|around\s+|about\s+|at\s+|in\s+the\s+|reaching\s+|hitting\s+)?(?:low\s+|mid\s+|high\s+|upper\s+)?-?\d{1,2}(?:\s*[–-]\s*\d{1,2})?\s*[°º]\s*[CF]\b/i,
  /\b(?:early|mid|late)[- ]?week\b|\bthis\s+weekend\b|\b(?:next|coming)\s+few\s+days\b/i,
];

/** "Frost never occurs here", "never sees a frost", "frost-free all year": false wherever the town's records show frost. */
const NO_FROST =
  /\bfrost\s+(?:never|rarely\s+if\s+ever|does\s+not|doesn't|won't|will\s+not)\s+(?:occurs?|happens?|comes?|reach(?:es)?|forms?|strikes?)\b|\bnever\s+(?:sees?|gets?|has|have)\s+(?:a\s+)?(?:frost|freeze)|\bno\s+(?:risk\s+of\s+)?frost\s+(?:ever|here|at\s+all)\b|\bfrost[- ]free\s+(?:all\s+year|year[- ]round)\b|\bnever\s+freezes\b/i;

/** A sentence about averages or normals: an average date ("averaged Oct 22") stays true after it has passed. */
const AVERAGES = /\b(?:average|averages|averaged|on\s+average|typical|typically|usually|normal|normally|median)\b/i;

/**
 * A deadline by month alone ("succession-sow through October", "produce into October"), or a part of a month ("rain arrives
 * mid-October", "late September"): passed once the month has gone.
 */
const MONTH_DEADLINE =
  /\b(?:(?:before|by|until|till|through|into)\s+(?:early\s+|mid-?\s*|late\s+|the\s+end\s+of\s+)?|(?:early|mid|late)[- ]?)(January|February|March|April|May|June|July|August|September|October|November|December)\b(?!\s+\d)/gi;

/** A deadline with a date: "before Oct 24", "by September 30". */
const DEADLINE = new RegExp(`\\b(?:before|by|until|till|through|no\\s+later\\s+than)\\s+(?:the\\s+)?${MONTH_RE}\\.?\\s+(\\d{1,2})(?!\\d)`, "gi");
/** A dated mention in a headline: "October 19–25", "Week of October 7", "October 2–8". */
const DATED = new RegExp(`\\b${MONTH_RE}\\.?\\s+(\\d{1,2})(?:\\s*[–-]\\s*(?:${MONTH_RE}\\.?\\s+)?(\\d{1,2}))?(?!\\d)`, "g");
/** A month named in a headline (full names; the short forms only before a day, as DATED reads them). */
const MONTH_WORD = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g;

export type GardenStaleness = {
  /** Today where the town is, as an ISO date. */
  today: string;
  /** The day the guide was written (ISO date), or null when unknown. */
  written: string | null;
  /** The town's average first frost has passed and its last spring frost has not come, or frost is rare there. */
  frostGone: boolean;
  /** The town's records show frost (dated frosts, a station count of freezing nights, or a station low at or under 0 °C). */
  frostRecorded?: boolean;
  /** The town's hardiness zone number (Climate.zoneNumber), to hold a zone range against it. */
  zone?: number | null;
};

/**
 * A range of hardiness zones: "zones 3–6", "zones 3 to 6", "zone 4b–7a". Day 5 audit, 14 November 2026: the stored
 * guides at Portland and Seattle (zone 9a) said garlic goes in "across zones 3–6"; advice scoped to zones the town is not
 * in does not hold for it.
 */
const ZONE_RANGE = /\bzones?\s+(\d{1,2})[ab]?\s*(?:–|-|to|through)\s*(\d{1,2})[ab]?\b/i;

/**
 * Whether the town's records show frost: dated average frosts, a station count of nights below 0 °C, a station record low at
 * or under 0 °C, or a typical coldest night at or under 0 °C.
 */
export function frostRecorded(d: Pick<LocalData, "climate" | "place">): boolean {
  const c = d.climate;
  if (c && ((c.lastSpringFrost !== "Rare" && c.firstFallFrost !== "Rare") || (c.frostDaysPerYear ?? 0) > 0 || c.meanAnnualExtremeMinC <= 0)) return true;
  const ex = d.place?.slug ? getExtremes(d.place.slug) : null;
  return !!ex && ((ex.nightsBelowZero ?? 0) > 0 || (ex.recordLowC != null && ex.recordLowC <= 0));
}

/** The frost-calendar day of an ISO date (from 2 July south of the equator), as src/lib/local-data frostCountdown counts it. */
const frostDay = (iso: string, south?: boolean) => {
  const d = doyOfIso(iso);
  return south ? ((d - 184 + 365) % 365) + 1 : d;
};

/**
 * Whether the town's average first autumn frost has passed and its average last spring frost is still to come (the frost
 * season), or frost is rare there: either way, advice timed to the coming first frost no longer holds.
 */
export function frostGone(c: Pick<Climate, "lastSpringFrost" | "firstFallFrost" | "lastSpringFrostDoy" | "firstFallFrostDoy" | "south"> | null, today: string): boolean {
  if (!c) return false;
  if (c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare") return true;
  if (!(c.firstFallFrostDoy > 0) || !(c.lastSpringFrostDoy > 0)) return false;
  const fd = frostDay(today, c.south);
  const since = (((fd - c.firstFallFrostDoy) % 365) + 365) % 365;
  const season = (((c.lastSpringFrostDoy - c.firstFallFrostDoy) % 365) + 365) % 365;
  return since < season;
}

/**
 * How far back a date or a month in stored text is read as passed rather than next year's: a stored guide is weeks or a
 * few months old, so "by May 1" read in November is next May, and "through October" is last month.
 */
const PAST_DAYS = 100;
const PAST_MONTHS = 3;

/** Why a sentence of stored text no longer holds today, or null. With `headline`, a month or week that is not this one counts too. */
export function staleWhy(text: string, s: GardenStaleness, headline = false): string | null {
  const t = text.replace(/\s+/g, " ");
  const old = s.written == null || s.written < s.today;
  if (old) {
    const c = COUNTDOWN.find((re) => re.test(t));
    if (c) return `counts down from the day it was written ("${t.match(c)![0]}")`;
    const soil = SOIL_READING.find((re) => re.test(t));
    if (soil) return `a soil reading from the day it was written ("${t.match(soil)![0]}")`;
    const w = OLD_WEATHER.find((re) => re.test(t));
    if (w) return `the week's weather as forecast when it was written ("${t.match(w)![0]}")`;
  }
  if (s.frostGone) {
    const f = FROST_TIMED.find((re) => re.test(t));
    if (f) return `timed to a first frost that has passed ("${t.match(f)![0]}")`;
  }
  if (s.frostRecorded && NO_FROST.test(t)) return `says frost never comes, where the town's records show frost ("${t.match(NO_FROST)![0]}")`;
  const zr = s.zone != null ? t.match(ZONE_RANGE) : null;
  if (zr && s.zone != null && (s.zone < Number(zr[1]) || s.zone > Number(zr[2]))) return `scoped to zones the town is not in ("${zr[0]}"; this town is in zone ${s.zone})`;
  const today = doyOfIso(s.today);
  for (const m of t.matchAll(DEADLINE)) {
    const i = monthIndex(m[1]);
    if (i < 0) continue;
    const ago = (((today - (MONTH_START[i] + Number(m[2]))) % 365) + 365) % 365;
    if (ago > 0 && ago <= PAST_DAYS) return `a date that has passed ("${m[0]}")`;
  }
  for (const m of t.matchAll(MONTH_DEADLINE)) {
    const i = monthIndex(m[1]);
    const ago = (((Number(s.today.slice(5, 7)) - 1 - i) % 12) + 12) % 12;
    if (i >= 0 && ago >= 1 && ago <= PAST_MONTHS) return `a month that has passed ("${m[0]}")`;
  }
  // A month, or a date, named in the body that has passed: "October is prime planting time", "a rare rain event on October
  // 22", read in November. Not in a sentence about averages, and not "May" as a sentence's first word (the verb).
  if (!headline && !AVERAGES.test(t)) {
    const month = Number(s.today.slice(5, 7));
    for (const m of t.matchAll(DATED)) {
      const i = monthIndex(m[1]);
      if (i < 0) continue;
      const j = m[3] ? monthIndex(m[3]) : i;
      const ago = (((today - (MONTH_START[j < 0 ? i : j] + Number(m[4] ?? m[2]))) % 365) + 365) % 365;
      if (ago > 0 && ago <= PAST_DAYS) return `a date that has passed ("${m[0]}")`;
    }
    for (const m of t.matchAll(MONTH_WORD)) {
      if (m[1] === "May" && (m.index ?? 0) === 0) continue;
      const ago = (((month - 1 - monthIndex(m[1])) % 12) + 12) % 12;
      if (ago >= 1 && ago <= PAST_MONTHS) return `names ${m[1]}, a month that has passed`;
    }
  }
  if (headline) {
    const month = Number(s.today.slice(5, 7));
    for (const m of t.matchAll(DATED)) {
      const i = monthIndex(m[1]);
      if (i < 0) continue;
      const j = m[3] ? monthIndex(m[3]) : i;
      const end = MONTH_START[j < 0 ? i : j] + Number(m[4] ?? m[2]);
      const ago = (((today - end) % 365) + 365) % 365;
      // A week that ended more than a day ago.
      if (ago > 1 && ago <= PAST_DAYS) return `names a week that has passed ("${m[0]}")`;
    }
    for (const m of t.matchAll(MONTH_WORD)) if (monthIndex(m[1]) !== month - 1) return `names ${m[1]}, not this month`;
  }
  return null;
}

/** Sentences of a paragraph. */
const sentences = (text: string): string[] =>
  text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'‘“(])/)
    .map((x) => x.trim())
    .filter(Boolean);

/** A stored text's sentences that still hold today, joined (the fishing vet's entries, src/lib/guide-vet); empty when none do. */
export function heldText(text: string, s: GardenStaleness): string {
  return keepSentences(text, s, [], "");
}

/** The sentences that still hold, joined; empty when none do. */
function keepSentences(text: string, s: GardenStaleness, dropped: string[], where: string): string {
  const kept: string[] = [];
  for (const x of sentences(text)) {
    const why = staleWhy(x, s);
    if (why) dropped.push(`${where}: ${why}`);
    else kept.push(x);
  }
  return kept.join(" ");
}

// ---- which crops a line names ---------------------------------------------------------------------------------------

const singular = (w: string) => (w.length > 3 ? w.replace(/ies$/, "y").replace(/(oes|ches|shes|xes)$/, (m) => m.slice(0, -2)).replace(/([^s])s$/, "$1") : w);
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(singular)
    .join(" ");

/** Words that end a crop's name but say nothing alone ("passion fruit", "drumstick tree", "garden egg", "leaf amaranth"). */
const VAGUE_HEADS = new Set(["fruit", "tree", "egg", "leaf", "herb", "green", "sprout"]);

type Variant = { slug: string; v: string };
const variantCache = new Map<string, Variant[]>();
/** Every name of every crop of the library, in the country's words and the library's, longest first. */
function variants(cc?: string): Variant[] {
  const key = cc ?? "";
  const hit = variantCache.get(key);
  if (hit) return hit;
  const out: Variant[] = [];
  for (const c of ALL_CROPS) {
    const seen = new Set<string>();
    for (const name of [c.name, cropName(c, cc)]) {
      const base = name.replace(/\(.*?\)/g, " ");
      const alts = (name.match(/\((.*?)\)/)?.[1] ?? "").split(",");
      for (const part of [base, ...base.split(/,|\band\b/), ...alts]) {
        const v = norm(part);
        if (v && !seen.has(v)) {
          seen.add(v);
          out.push({ slug: c.slug, v });
        }
      }
    }
  }
  out.sort((a, b) => b.v.length - a.v.length);
  variantCache.set(key, out);
  return out;
}

/**
 * The library crops a line names: each name as whole words, longest first and struck out once matched ("sweet potatoes" is
 * not also "potatoes"); then each word left over that ends crops' names ("Peppers", "Beans", "Squash and pumpkin") names a
 * group, any one of which it may mean.
 */
export function cropsNamed(text: string, cc?: string): { exact: string[]; loose: string[][] } {
  let rest = ` ${norm(text)} `;
  const exact = new Set<string>();
  for (const { slug, v } of variants(cc)) {
    const needle = ` ${v} `;
    if (rest.includes(needle)) {
      exact.add(slug);
      rest = rest.split(needle).join(" # ");
    }
  }
  const loose: string[][] = [];
  for (const w of new Set(rest.split(" ").filter((x) => x.length > 2 && x !== "#" && !VAGUE_HEADS.has(x)))) {
    const group = [...new Set(variants(cc).filter(({ v }) => v.split(" ").pop() === w).map(({ slug }) => slug))];
    if (group.length) loose.push(group);
  }
  return { exact: [...exact], loose };
}

/** The crops a line names that are not allowed today: every exact name must be, and one crop of each loose group. */
function shutOf(named: { exact: string[]; loose: string[][] }, ok: (slug: string) => boolean): string[] {
  return [...named.exact.filter((x) => !ok(x)), ...named.loose.filter((g) => !g.some(ok)).map((g) => g.join("/"))];
}

// ---- the vet --------------------------------------------------------------------------------------------------------

export type GardenToday = { sow: Set<string>; trays: Set<string>; picked: Set<string>; transplant: Set<string>; calendar: boolean };

/** What the town's calendar has open, and in picking, on the day. */
export function gardenToday(d: LocalData, fits?: CropFit[]): GardenToday {
  const f = fits ?? (d.climate?.monthlyRainMm && d.regime ? cropCalendar(d.climate, d.regime, localCrops(d.place.countryCode), { lat: d.place.lat }) : []);
  const doy = doyOfIso(d.today);
  const now = sowNow(f, d.month, doy);
  return {
    sow: new Set(f.filter((x) => inSpans(x.windows.sow, doy) || inSpans(x.windows.watered, doy)).map((x) => x.crop.slug)),
    trays: new Set(now.trays.map((x) => x.crop.slug)),
    picked: new Set(f.filter((x) => (x.perennial ? x.harvest.includes(d.month) : pickedOn(x, doy))).map((x) => x.crop.slug)),
    transplant: new Set(ALL_CROPS.filter((c) => c.grow?.start === "transplant").map((c) => c.slug)),
    calendar: f.length > 0,
  };
}

const SOW_VERB = /\b(?:sow|sowing|sown|plant|planting|set\s+out|transplant|transplanting|direct[- ]sow|start|seed)\b/i;
/** Picking words; not "cut back" or "lift and divide", which are the gardener's work on a plant, not its harvest. */
const PICK_VERB = /\b(?:harvest|harvesting|pick|picking|dig)\b/i;

/** The rules guide's gardening headline where it holds today, or a plain one. */
function headlineFor(d: LocalData, s: GardenStaleness, rules: Guide | null): string {
  const h = rules?.gardening.headline;
  return h && !staleWhy(h, s, true) ? h : `Gardening in ${d.place.name} this week`;
}

function rulesOf(d: LocalData): Guide | null {
  try {
    return rulesGuide(d);
  } catch {
    return null;
  }
}

/** The stored gardening section held to today, with what was dropped and why (for the checks). */
export function vetStoredGardeningWhy<G extends Guide & Partial<Pick<StoredGuide, "fallback">>>(
  guide: G,
  d: LocalData,
  opts: { writtenAt?: string | null; fits?: CropFit[] } = {},
): { guide: G; dropped: string[] } {
  const g = guide.gardening;
  if (!g) return { guide, dropped: [] };
  const s: GardenStaleness = { today: d.today, written: opts.writtenAt ? opts.writtenAt.slice(0, 10) : null, frostGone: frostGone(d.climate, d.today), frostRecorded: frostRecorded(d), zone: d.climate?.zoneNumber ?? null };
  const open = gardenToday(d, opts.fits);
  const cc = d.place.countryCode;
  const dropped: string[] = [];

  const itemsHeld = <T extends GuideItem>(xs: T[] | undefined, allowed: (slug: string) => boolean, list: string): T[] => {
    const out: T[] = [];
    for (const it of xs ?? []) {
      if (open.calendar) {
        const named = cropsNamed(it.name, cc);
        if (!named.exact.length && !named.loose.length) {
          dropped.push(`${list} "${it.name}": names no crop of the town's calendar`);
          continue;
        }
        const shut = shutOf(named, allowed);
        if (shut.length) {
          dropped.push(`${list} "${it.name}": ${shut.join(", ")} not ${list === "harvestNow" ? "being picked" : "open"} today`);
          continue;
        }
      }
      const detail = keepSentences(it.detail ?? "", s, dropped, `${list} "${it.name}"`);
      if (!detail) {
        dropped.push(`${list} "${it.name}": nothing left of its text`);
        continue;
      }
      out.push(detail === it.detail ? it : { ...it, detail });
    }
    return out;
  };

  const sowOutdoorsNow = itemsHeld(g.sowOutdoorsNow, (x) => open.sow.has(x), "sowOutdoorsNow");
  // A transplant is started in trays only in its tray window (the page's "start in trays now" list); a crop sown where it
  // grows may be started indoors while its sowing window is open.
  const startIndoorsNow = itemsHeld(g.startIndoorsNow, (x) => open.trays.has(x) || (open.sow.has(x) && !open.transplant.has(x)), "startIndoorsNow");
  const harvestNow = itemsHeld(g.harvestNow, (x) => open.picked.has(x), "harvestNow");

  const lineHeld = (list: string) => (line: string) => {
    const why = staleWhy(line, s);
    if (why) {
      dropped.push(`${list} "${line}": ${why}`);
      return false;
    }
    if (!open.calendar) return true;
    const named = cropsNamed(line, cc);
    if (!named.exact.length && !named.loose.length) return true;
    const sows = SOW_VERB.test(line);
    const picks = PICK_VERB.test(line);
    const ok = (x: string) => (sows && picks ? open.sow.has(x) || open.trays.has(x) || open.picked.has(x) : sows ? open.sow.has(x) || open.trays.has(x) : picks ? open.picked.has(x) : true);
    const shut = shutOf(named, ok);
    if (shut.length) {
      dropped.push(`${list} "${line}": ${shut.join(", ")} not ${sows ? "open" : "being picked"} today`);
      return false;
    }
    return true;
  };
  const tasksThisWeek = (g.tasksThisWeek ?? []).filter(lineHeld("tasksThisWeek"));
  const watchOut = (g.watchOut ?? []).filter((line) => {
    const why = staleWhy(line, s);
    if (why) dropped.push(`watchOut "${line}": ${why}`);
    return !why;
  });

  let rules: Guide | null | undefined;
  const rulesNow = () => (rules === undefined ? (rules = rulesOf(d)) : rules);

  const headWhy = staleWhy(g.headline ?? "", s, true);
  if (headWhy) dropped.push(`headline "${g.headline}": ${headWhy}`);
  let zoneNotes = keepSentences(g.zoneNotes ?? "", s, dropped, "zoneNotes");
  if (!zoneNotes && g.zoneNotes) zoneNotes = rulesNow()?.gardening.zoneNotes ?? "";

  // Nothing left to sow, plant, pick or do: the rules guide's section stands in, labelled as the rules guide's.
  if (!sowOutdoorsNow.length && !startIndoorsNow.length && !harvestNow.length && !tasksThisWeek.length) {
    const r = rulesNow();
    if (r) {
      dropped.push("gardening: nothing left; the rules guide's section stands in");
      const gardening = { ...r.gardening, headline: headlineFor(d, s, r) };
      const fallback = [...new Set([...(guide.fallback ?? []), "gardening" as const])];
      return { guide: { ...guide, gardening, fallback, summary: summaryAfter(guide, g.headline, gardening.headline, s) }, dropped };
    }
  }

  const headline = headWhy ? headlineFor(d, s, rulesNow()) : g.headline;
  const same =
    headline === g.headline &&
    zoneNotes === g.zoneNotes &&
    sowOutdoorsNow.length === (g.sowOutdoorsNow ?? []).length &&
    startIndoorsNow.length === (g.startIndoorsNow ?? []).length &&
    harvestNow.length === (g.harvestNow ?? []).length &&
    tasksThisWeek.length === (g.tasksThisWeek ?? []).length &&
    watchOut.length === (g.watchOut ?? []).length &&
    [...sowOutdoorsNow, ...startIndoorsNow, ...harvestNow].every((it, i) => it === [...(g.sowOutdoorsNow ?? []), ...(g.startIndoorsNow ?? []), ...(g.harvestNow ?? [])][i]);
  const summary = summaryAfter(guide, g.headline, headline, s);
  if (same && summary === guide.summary) return { guide, dropped };
  const gardening: Guide["gardening"] = { ...g, headline, zoneNotes, sowOutdoorsNow, startIndoorsNow, harvestNow, tasksThisWeek, watchOut };
  return { guide: { ...guide, gardening, summary }, dropped };
}

/**
 * The overview's lead after the gardening headline changes: the old headline swapped for the new one, and a summary that
 * still does not hold (a countdown, a frost that has passed, another month) rebuilt from the three headlines.
 */
function summaryAfter(guide: Guide, oldHead: string, newHead: string, s: GardenStaleness): string {
  let summary = guide.summary ?? "";
  if (oldHead && newHead !== oldHead) summary = summary.split(oldHead).join(newHead);
  if (summary && staleWhy(summary, s, true)) {
    summary = [newHead, guide.fishing?.headline, guide.foraging?.headline]
      .filter(Boolean)
      .map((h) => h!.replace(/[.!]+$/, ""))
      .join(". ") + ".";
  }
  return summary;
}

/** The stored gardening section held to the town's calendar and frost dates today (see the header). */
export function vetStoredGardening<G extends Guide & Partial<Pick<StoredGuide, "fallback">>>(guide: G, d: LocalData, opts: { writtenAt?: string | null; fits?: CropFit[] } = {}): G {
  return vetStoredGardeningWhy(guide, d, opts).guide;
}
