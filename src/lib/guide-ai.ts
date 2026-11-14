/**
 * The weekly guide for a place, written by Claude (Anthropic SDK; on Netlify
 * the AI Gateway supplies the key and base URL) from the place's own data, and
 * stored as a record (`rec:v1:guide:v2_<lat1>_<lon1>`, src/lib/records) so it
 * is written once and then served straight from storage with a freshness stamp
 * until someone asks for a refresh.
 *
 * The model is grounded: it is handed a numbered fact sheet (hemisphere and
 * the regime's season words and wet/dry months, the frost record and its
 * source, the units and season vocabulary of the reader's region, the
 * regulator and its closed seasons, the waters it must not recommend) and the
 * place's own lists (the crops the sowing calendar says go in this month,
 * the fish of each of the place's waters, the library's wild foods in
 * season), and told to write about those and nothing else. Each section is a
 * separate small call, vetted by src/lib/guide-check; a section that fails
 * falls back to the rules guide and is recorded in `fallback`, so the page
 * labels it "Seasonal guide" rather than "AI-written".
 *
 * Round two of the regional-accuracy work (14 October 2026) added the fact
 * sheet and the rules after the audit found stored guides placing tigerfish
 * in Nairobi's urban drains, yellowfish in Cape Town's closed reservoirs,
 * "rain arrives mid-October" in Cape Town and "start of the long rains" in a
 * Nairobi October (/home/claude/rebuild/audit/RF-findings.md §0, §7 L9).
 */
import Anthropic from "@anthropic-ai/sdk";
import { regionOf as classifyEcoregion } from "./region";
import { regionContext } from "./region-context";
import { cropCalendar, doyOfIso, sowNow } from "./crop-calendar";
import { localCrops } from "./crops";
import { fishByWater, type SectionFish, type WaterSection } from "./fishing-waters";
import { foragingNow, foragingSoon, gateGuideForaging, type LiveEvidence } from "./plant-presence";
import { matchSpecies } from "./species";
import { floraEvidence } from "./local-flora";
import { monthSpans } from "./regime";
import { rulesGuide } from "./guide-rules";
import { checkSectionWhy, cleanGuide, libraryLookalikes, vetSafety, GUIDE_SECTIONS, type GuideContext, type GuideFacts, type GuideSection, type StoredGuide, type AvoidWater, type ClosedNow, type FishWater } from "./guide-check";
import { rainRuns, seasonLabelFor } from "./season-label";
import { readRecord, writeRecord, type StoredRecord } from "./records";
import { ORG_NAMES } from "@/data/conservation";
import { orgsFor } from "./conservation/match";
import { pageWaters } from "./conservation/waters";
import { climateZoneLabel } from "./zone-label";
import { getLocalData } from "./local-data";
import { vetStoredGardening } from "./guide-vet-garden";
import type { Guide, LocalData, Place } from "./types";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
/** A guide counts as fresh for a week: local advice turns with the season, not the hour. */
export const GUIDE_FRESH_SECONDS = 7 * 24 * 3600;

/**
 * The day the fact-sheet prompt and the harder check shipped. A stored guide
 * written before it was written without them, so the weekly warm-up rewrites
 * it whatever its age (netlify/functions/warm-guides-background.mts), the
 * worst-audited places first (`GUIDE_REGENERATE_FIRST`). Bumped on 22 October
 * 2026 for the organisations fact (20) and the library-only names rule.
 */
export const PROMPT_VERSION = "2026-10-22";
export const PROMPT_VERSION_MS = Date.parse(`${PROMPT_VERSION}T00:00:00Z`);

/** The stored guides the audit found worst, in the order to regenerate them after deploy. */
export const GUIDE_REGENERATE_FIRST = ["cape-town-south-africa", "nairobi-kenya", "lagos-nigeria", "lisbon-portugal", "toronto-ontario", "oslo-norway"];

export { GUIDE_KEY_BY_SLUG, guideId } from "./guide-id";
export { vetStoredFishing } from "./guide-vet";
import { guideId } from "./guide-id";

/**
 * The stored guide for a place, if one has been written. Records written
 * before the check learned to unwrap a JSON string posing as an item (the
 * Lagos "Harvest and storage" bug) are repaired on the way out, and the
 * gardening section is held to the town's calendar and frost dates today
 * (src/lib/guide-vet-garden; Day 3 audit, 11 November 2026). `data` is the
 * place's data where the caller has it; otherwise it is loaded here (the pages
 * load it alongside, and getLocalData is cached for the request).
 */
export async function readGuide(place: Pick<Place, "lat" | "lon"> & { slug?: string }, data?: LocalData): Promise<StoredRecord<StoredGuide> | null> {
  const r = await readRecord<StoredGuide>("guide", guideId(place));
  if (!r?.value?.gardening) return r;
  const cleaned = cleanGuide(r.value);
  // A guide stored before the presence gate lists the region's wild foods as in season; keep only what is
  // recorded near the place this month (plant-presence). The month is the server's, which is the week's.
  // For a town outside the presence table, the gate counts the foraging panel's own nearby records (two or more within
  // 40 km this month), so the headline and the panel agree (audit, 10 November 2026: ten US towns said "not checked"
  // above a panel listing foods recorded nearby).
  const month = new Date().getUTCMonth() + 1;
  const live = cleaned.foraging ? await floraEvidence(place, month).catch(() => null) : null;
  const gated = cleaned.foraging ? gateGuideForaging(cleaned.foraging, place, month, live) : cleaned.foraging;
  // Foraging safety lines are the site's own (guide-check.ts foragingSafety); a model-written hazard in an older stored guide is dropped.
  const safety = gated ? vetSafety(gated.safety) : undefined;
  const safe = gated && safety && JSON.stringify(safety) !== JSON.stringify(gated.safety) ? { ...gated, safety } : gated;
  // The library's look-alike text replaces the model's in a stored guide too, not only when a guide is written (audit,
  // 10 November 2026: Charlottetown's stored guide had lingonberry "larger" than cranberry and "both edible", and no word of
  // winterberry holly; Halifax's had yew and juniper needles the wrong way round). The fishing section needs the page's own
  // lists, which readGuide does not have; GuideSections runs vetStoredFishing (src/lib/guide-vet) where they meet.
  const fo = safe ? withLibraryLookalikes(safe) : safe;
  const foraged = fo === cleaned.foraging ? cleaned : { ...cleaned, foraging: fo };
  // The gardening section was printed as stored: frost countdowns weeks after the first frost, sweet corn and kale trays in
  // November, soil readings from the week it was written, an "October 19–25" headline (Day 3 audit, 11 November 2026).
  const d = data ?? (await placeData(place));
  const value = d ? vetStoredGardening(foraged, d, { writtenAt: r.savedAt }) : foraged;
  return value === r.value ? r : { ...r, value };
}

/** The place's data for vetting a stored guide, when the caller passed a whole place; null when it cannot be read. */
async function placeData(place: Pick<Place, "lat" | "lon"> & { slug?: string }): Promise<LocalData | null> {
  const p = place as Partial<Place>;
  if (!p.slug || !p.name || !p.label) return null;
  try {
    return await getLocalData(place as Place);
  } catch {
    return null;
  }
}

/** A stored foraging section with the library's look-alike text on every item that names a library species (the same object when nothing changes). */
function withLibraryLookalikes<F extends Guide["foraging"]>(fo: F): F {
  const now = libraryLookalikes(fo.inSeasonNow ?? [], matchSpecies);
  const soon = libraryLookalikes(fo.comingSoon ?? [], matchSpecies);
  const changed = now.some((x, i) => x !== fo.inSeasonNow[i]) || soon.some((x, i) => x !== fo.comingSoon[i]);
  return changed ? { ...fo, inSeasonNow: now, comingSoon: soon } : fo;
}

/** Whether an AI guide can be written in this environment (the Netlify AI Gateway sets the key). */
export const aiEnabled = () => !!process.env.ANTHROPIC_API_KEY;

type Section = GuideSection;

const item = {
  type: "object",
  properties: {
    name: { type: "string", description: "One crop, fish or wild food from the lists, by its listed name. Never a list, never JSON." },
    detail: { type: "string" },
    caution: { type: "string" },
  },
  required: ["name", "detail"],
};

const SCHEMAS: Record<Section, Anthropic.Tool["input_schema"]> = {
  gardening: {
    type: "object",
    properties: {
      headline: { type: "string" },
      zoneNotes: { type: "string", description: "What the climate, the season named in the fact sheet, the frost record (if any) and today's soil temperature mean for the garden now." },
      sowOutdoorsNow: { type: "array", items: item, maxItems: 5 },
      startIndoorsNow: { type: "array", items: item, maxItems: 3 },
      harvestNow: { type: "array", items: item, maxItems: 4 },
      tasksThisWeek: { type: "array", items: { type: "string" }, maxItems: 5 },
      watchOut: { type: "array", items: { type: "string" }, maxItems: 3 },
    },
    required: ["headline", "zoneNotes", "sowOutdoorsNow", "startIndoorsNow", "harvestNow", "tasksThisWeek", "watchOut"],
  },
  fishing: {
    type: "object",
    properties: {
      headline: { type: "string" },
      species: {
        type: "array",
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            where: { type: "string", description: "Which of the place's waters from the fact sheet's fish-by-water list, and where in them" },
            detail: { type: "string", description: "Tactics and baits for this week" },
            caution: { type: "string" },
          },
          required: ["name", "where", "detail"],
        },
      },
      bestTimes: { type: "string" },
      waters: { type: "array", items: { type: "string" }, maxItems: 6 },
      regulationsNote: { type: "string" },
    },
    required: ["headline", "species", "bestTimes", "waters", "regulationsNote"],
  },
  foraging: {
    type: "object",
    properties: {
      headline: { type: "string" },
      inSeasonNow: {
        type: "array",
        maxItems: 6,
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            where: { type: "string" },
            detail: { type: "string", description: "How to recognise it and how to pick and use it" },
            lookalikes: { type: "string", description: "Its dangerous look-alikes and how to tell them apart" },
            caution: { type: "string" },
          },
          required: ["name", "where", "detail"],
        },
      },
      comingSoon: { type: "array", items: item, maxItems: 3 },
      safety: { type: "array", items: { type: "string" }, maxItems: 4 },
    },
    required: ["headline", "inSeasonNow", "comingSoon", "safety"],
  },
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ---- the fact sheet ---------------------------------------------------------------------

/**
 * The waters the model must not recommend: agent C's flags on the water
 * sections and on each named water (src/lib/water-setting: treatment works,
 * pools, canals and drains, closed drinking-water reservoirs), plus a
 * defensive read of the raw OpenStreetMap list for the plain cases
 * (RF-findings L13: "ETAR da Mutela", "Swimmimg pool", "Ziggies Pool").
 */
const NOT_A_FISHERY_NAME = /\b(ETAR|WWTP|STP|sewage|treatment|wastewater|waste water|effluent|sump|tailings|pool|piscin[ae]|swimm?ing|lido|wash|storage|wetlands?|fountain|reflecting)\b/i;
const NOT_A_FISHERY_KIND = /^(wastewater|basin|canal|drain|ditch|reflecting_pool|pool|moat|lock)$/i;

function avoidWatersOf(d: LocalData, sections: WaterSection[]): AvoidWater[] {
  const out = new Map<string, string>();
  for (const w of d.waters) {
    if (NOT_A_FISHERY_KIND.test(w.kind)) out.set(w.name, `${w.kind.replace(/_/g, " ")}, not a fishery`);
    else if (NOT_A_FISHERY_NAME.test(w.name)) out.set(w.name, "not a fishing water (a works, pool, canal or wetland by name)");
  }
  for (const w of d.water?.avoid ?? []) if (w.avoid) out.set(w.name, w.avoid.reason);
  for (const s of sections) {
    for (const w of s.waters ?? []) if (w.avoid) out.set(w.name, w.avoid.reason);
    // A whole kind of water closed or unfishable here (the inner Oslofjord's zero-fishing zone, Nairobi's urban rivers): the kind itself is off limits.
    if (s.avoid && !out.has(s.title)) out.set(s.title, s.avoid.reason);
  }
  return [...out].map(([name, reason]) => ({ name, reason }));
}

/** A fish's closed-season mark as agent C's fishByWater writes it, when it is closed now. */
function closedMark(f: SectionFish, water: string): ClosedNow | null {
  const c = f.closure;
  if (!c || !c.closedNow) return null;
  return { species: f.name, water, until: c.until, note: `${c.label}${c.note ? `. ${c.note}` : ""}`, ...(c.release ? { release: true } : {}) };
}

/**
 * The regulator's closed seasons for the place this month: the fish each
 * water section sets apart as closed (src/lib/closed-seasons through
 * fishByWater), one entry per species.
 */
function closedFromRegulator(sections: WaterSection[]): ClosedNow[] {
  const out: ClosedNow[] = [];
  for (const s of sections) {
    for (const f of [...s.closed, ...s.fish]) {
      const m = closedMark(f, s.title);
      if (m && !out.some((x) => x.species === m.species)) out.push(m);
    }
  }
  return out;
}

/** The fish of each water, with the place for the country rules and the regulator's closed seasons. */
const fishByWaterFor = (d: LocalData, regionSlug: string): WaterSection[] =>
  d.water ? fishByWater(d.month, regionSlug, d.water, { place: d.place, today: d.today }) : [];

/**
 * The species the regulator closes at this place today, for the page: a
 * stored guide written before the closed seasons were known is shown with
 * those species marked closed and moved below the open ones until it is
 * regenerated (Toronto's October lake trout, Oslofjord cod).
 */
export function closedSpeciesNow(d: LocalData): ClosedNow[] {
  const eco = classifyEcoregion(d.place.lat, d.place.lon);
  return closedFromRegulator(fishByWaterFor(d, eco.slug));
}

/** The fact sheet for a place today. */
export function guideFacts(d: LocalData, sections: WaterSection[]): GuideFacts {
  const ctx = regionContext(d.place);
  const r = d.regime;
  // Agent A's `frostSource: "station" | "grid" | "none"` and `frostConfidence` once they land; the older "stations" | "grid" until then.
  const c = d.climate as (Omit<NonNullable<LocalData["climate"]>, "frostSource"> & { frostSource?: string; frostConfidence?: string }) | null;
  const runs = rainRuns(r, ctx.countryCode);
  const frostLed = r ? r.frostLed : !!c && c.lastSpringFrost !== "Rare";
  const closed = closedFromRegulator(sections);
  return {
    hemisphere: ctx.hemisphere,
    tropical: ctx.tropical,
    season: d.season,
    seasonLabel: seasonLabelFor(d, ctx),
    autumn: ctx.autumn,
    imperial: ctx.imperial,
    countryCode: ctx.countryCode,
    regime: r ? { id: r.id, name: r.name, koppen: r.koppen, rain: r.rain, wetMonths: r.wetMonths, dryMonths: r.dryMonths, runsOn: r.runsOn, frostLed: r.frostLed } : null,
    rainRuns: runs,
    frost: c
      ? {
          lastSpringFrost: c.lastSpringFrost,
          firstFallFrost: c.firstFallFrost,
          source: c.frostSource === "stations" || c.frostSource === "station" ? "station normals" : c.frostSource === "none" ? "none" : c.frostSource === "grid" ? "ERA5 grid" : "unknown",
          confidence: c.frostConfidence ?? (c.frostSource === "stations" || c.frostSource === "station" ? "high" : "low"),
          frostLed,
        }
      : null,
    avoidWaters: avoidWatersOf(d, sections),
    closed,
    regulator: d.regs ? `${d.regs.agency} — ${d.regs.url}` : null,
  };
}

/** What the model may write about: the place's own lists, worked out here. */
export function guideContext(d: LocalData): GuideContext {
  const eco = classifyEcoregion(d.place.lat, d.place.lon);
  const fits = d.climate?.monthlyRainMm && d.regime ? cropCalendar(d.climate, d.regime, localCrops(d.place.countryCode), { lat: d.place.lat }) : [];
  // Only crops whose sowing window includes the place's own date, not every crop with a window this month.
  const now = sowNow(fits, d.month, doyOfIso(d.today));
  const coast = d.water ? d.water.coast !== null : undefined;
  const sections = fishByWaterFor(d, eco.slug);
  const facts = guideFacts(d, sections);
  // Only wild foods recorded near the place this month may be named as in season or coming (plant-presence).
  const wildNow = foragingNow(d.month, eco.slug, d.climate?.zoneNumber, { coast, place: d.place }).checked;
  const wildSoon = foragingSoon(d.month, eco.slug, d.climate?.zoneNumber, { coast, place: d.place }).checked;
  const fish: FishWater[] = sections.map((s) => ({
    water: s.title,
    // Open now; a fish that closes later this month stays listed, its note travels in `closed` below only once it is closed.
    fish: s.fish.map((f) => f.name),
    closed: [...s.closed, ...s.fish].map((f) => closedMark(f, s.title)).filter((x): x is ClosedNow => !!x),
    // Open now but closing later this month: the writer may say so.
    closing: s.fish.filter((f) => f.closure && !f.closure.closedNow).map((f) => `${f.name}: ${f.closure!.label}`),
    ...(s.avoid ? { avoid: s.avoid.reason } : {}),
  }));
  return {
    region: eco,
    sow: [...now.sow, ...now.plant].map((f) => f.crop.name),
    watered: now.sowWatered.map((f) => f.crop.name),
    trays: now.trays.map((f) => f.crop.name),
    harvest: fits.filter((f) => f.harvest.includes(d.month)).map((f) => f.crop.name),
    fish,
    wild: wildNow,
    soon: wildSoon.map((s) => s.name),
    facts,
    // The conservation library's best four for the place, across subjects: the only organisations the guide may name.
    orgs: orgsFor(d.place, { waters: pageWaters(d.water), limit: 4 }).map((m) => ({ name: m.org.name, why: m.why, url: m.org.links.home })),
    orgNames: ORG_NAMES,
  };
}

const list = (xs: string[]) => (xs.length ? xs.join(", ") : "none");
const spans = (ms: number[]) => monthSpans(ms) || "none";

/** The numbered fact sheet and the rules, then the lists. */
export function buildPrompt(d: LocalData, ctx: GuideContext): string {
  const c = d.climate;
  const r = d.regime;
  const fc = d.forecast;
  const f = ctx.facts;
  const week = fc.days.map((x) => `${x.date}: ${Math.round(x.tMin)}–${Math.round(x.tMax)}°C, ${x.precip} mm, wind to ${Math.round(x.windMax)} km/h`).join("\n");
  const month = MONTHS[d.month - 1];
  const seasonTemperate = f.season === "Fall" ? f.autumn : f.season.toLowerCase();

  const hemisphereLine = f.tropical
    ? `${f.hemisphere === "south" ? "Southern" : "Northern"} hemisphere, tropical latitude: there is no spring, summer, autumn or winter here. The seasons are the rains and the dry season; use the names in 3 and 4.`
    : `${f.hemisphere === "south" ? "Southern hemisphere: the seasons run six months from the northern calendar, so " : "Northern hemisphere: "}${month} is ${seasonTemperate} here.`;

  const seasonLine = `Season word for the page: "${f.seasonLabel}".${f.tropical ? "" : ` Say "${f.autumn}", never "${f.autumn === "fall" ? "autumn" : "fall"}".`}`;

  const starts = f.rainRuns
    .filter((x) => x.months.length < 12)
    .map((x) => `${x.label}: ${spans(x.months)} (they start in ${MONTHS[x.months[0] - 1]} and end in ${MONTHS[x.months[x.months.length - 1] - 1]})`)
    .join("; ");
  const climateLine = r
    ? `${r.name} (Köppen ${r.koppen}), ${r.rain.replace(/-/g, " ")}. ${r.summary} Wet months: ${spans(r.wetMonths)}. Dry months: ${spans(r.dryMonths)}. ${starts ? `${starts}. ` : ""}Average precipitation (rain and melted snow) this month: ${c?.monthlyRainMm ? `${Math.round(c.monthlyRainMm[d.month - 1])} mm` : "unknown"}. The garden year here turns on ${r.runsOn}.${
        r.rain !== "year-round" && r.rain !== "little-rain" ? ` Never say the rains or the dry season are arriving, beginning or starting in a month other than the ones named here.` : ""
      }`
    : "unknown";

  const frostLine = !c
    ? "unknown"
    : !f.frost?.frostLed || c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare"
      ? `Frost ${c.lastSpringFrost === "Rare" && c.firstFallFrost === "Rare" ? "does not occur at this place" : "is rare and does not set the gardening year"} (frost record: ${f.frost?.source ?? "unknown"}). Do not mention frost dates, days to frost, frost windows or frost protection.${
          f.tropical ? "" : ` Hardiness zone: ${climateZoneLabel(c)}; always name the system if you mention the zone.`
        }`
      : `Hardiness zone: ${climateZoneLabel(c)} (always name the system if you mention the zone). Average last spring frost ${c.lastSpringFrost}, first ${f.autumn} frost ${c.firstFallFrost} (${c.frostFreeDays} frost-free days; source: ${f.frost?.source ?? "unknown"}, confidence ${f.frost?.confidence ?? "unknown"}). Frost sets the gardening year here. Days to the average first frost: ${d.daysToFirstFrost ?? "n/a"}; days since the average last frost: ${d.daysSinceLastFrost ?? "n/a"}.${
          f.frost?.confidence === "low" ? " The dates are a grid estimate: say \"around\" and do not count days to the day." : ""
        }`;

  const unitsLine = f.imperial
    ? `US reader: give °F, inches, feet and miles first, metric in brackets. Say "fall".`
    : f.tropical
      ? `Metric only: °C, mm, cm, m, km, kg. Season words: the rains and the dry season, by the names in 4; never spring, autumn or fall.`
      : `Metric only: °C, mm, cm, m, km, kg. Say "${f.autumn}".`;

  const closedLine = f.closed.length
    ? f.closed.map((x) => `${x.species}${x.water ? ` (${x.water})` : ""}: ${x.note.replace(/\.$/, "")}${x.until && !/until/i.test(x.note) ? `, until ${x.until}` : ""}`).join("; ") +
      ". Do not offer these as targets; you may say they are closed and send readers to the regulator."
    : "none recorded for this month. Still never give season dates or bag limits: send readers to the regulator.";

  // Grouped by reason: a city's dozen drains share one sentence.
  const byReason = new Map<string, string[]>();
  for (const w of f.avoidWaters) byReason.set(w.reason, [...(byReason.get(w.reason) ?? []), w.name]);
  const avoidLine = byReason.size ? [...byReason].map(([reason, names]) => `${names.join(", ")} (${reason.replace(/\.$/, "")})`).join("; ") + ". Do not name them." : "none flagged.";

  const fishLines = ctx.fish.length
    ? ctx.fish
        .map(
          (s) =>
            `   - ${s.water}${s.avoid ? ` [NO FISHING WATER OF THIS KIND HERE: ${s.avoid} Do not recommend this kind of water or name any of its waters; the fish listed may only be mentioned as fish of this kind of water elsewhere in the region, or left out]` : ""}: ${list(s.fish)}${s.closed.length ? ` (closed now: ${s.closed.map((x) => x.species).join(", ")})` : ""}${
              s.closing?.length ? ` (closing later this month: ${s.closing.join("; ")})` : ""
            }`,
        )
        .join("\n")
    : "   no fishing water mapped";

  const avoidNames = new Set(f.avoidWaters.map((w) => w.name));
  const named = d.waters.filter((w) => !avoidNames.has(w.name));
  const watersLine = named.length
    ? named.map((w) => `${w.name} (${w.kind}${w.kind === "reservoir" ? ", may be closed to angling: say so if you name it" : ""}, ${w.distanceKm} km)`).join("; ")
    : "none";

  return `You write the weekly local field guide for guidetooutside.com: gardening, fishing and foraging for one place. Plain, exact, adult prose in sentence case; no exclamation marks; no filler. Keep every "detail" to one or two sentences.

FACT SHEET. Every statement you make must agree with it; where your general knowledge differs, the fact sheet wins.
1. Place: ${d.place.label}${d.place.label.includes(d.place.country) ? "" : `, ${d.place.country}`} (lat ${d.place.lat.toFixed(2)}, lon ${d.place.lon.toFixed(2)}); region ${ctx.region.name}. ${hemisphereLine}
2. Date: ${d.today}, ${month}.
3. ${seasonLine}
4. Climate: ${climateLine}
5. Frost: ${frostLine}
6. Units and words: ${unitsLine}
7. Fishing regulator (fishing only; never point readers to it, or to any regulator, for plants, wild food, land access or harvesting rules): ${f.regulator ?? "unknown; tell readers to check the national or regional fishing authority"}.
8. Closed seasons now: ${closedLine}
9. Waters you must not recommend: ${avoidLine}
10. Fish in season, by water (the only fish you may name, and the only kind of water each may be placed in):
${fishLines}
11. Other named waters within 20 km (name one only where a fish list in 10 fits its kind): ${watersLine}
12. Crops to sow or plant now: ${list(ctx.sow)}
13. Crops possible now with watering: ${list(ctx.watered)}
14. Crops to start in trays now: ${list(ctx.trays)}
15. Crops coming in now: ${list(ctx.harvest)}
16. Wild foods recorded within about 50 km this month and in season (the only wild foods you may call in season): ${ctx.wild.length ? ctx.wild.map((s) => `${s.name}${s.deadlyDouble ? " (has a dangerous look-alike)" : ""}`).join(", ") : "none"}
17. Wild foods recorded nearby and coming soon (the only wild foods you may call coming soon): ${list(ctx.soon)}
18. Now: ${Math.round(fc.current.temp)}°C, wind ${Math.round(fc.current.wind)} km/h; soil at 6 cm ${fc.soilTemp6cm != null ? `${Math.round(fc.soilTemp6cm)}°C` : "unknown"}. Moon: ${d.moon.phaseName}, ${d.moon.illumination}% lit; next full ${d.moon.nextFull}, next new ${d.moon.nextNew}.
19. Forecast:
${week}
20. Conservation organisations working here (the only organisations you may name): ${ctx.orgs?.length ? ctx.orgs.map((o) => `${o.name} — ${o.why} — ${o.url}`).join("; ") : "none"}

RULES
- If 16 is none, list no wild food as in season and say in the headline that nothing in the guide has been recorded near here this month; never fill the list from general knowledge of the region.
- Write only about the crops, fish and wild foods in 10 to 17. They come from the place's own climate, waters and ecological region. If a list is short, write fewer items; never add a species from general knowledge.
- Never name a species in a named water unless that water's kind in 10 lists it. A river or stream that runs through the town is not a trout water, a tigerfish water or a yellowfish water unless 10 says so under "Rivers and streams".
- Never recommend a water in 9, and never present a reservoir as open to angling without saying it may be closed.
- Never offer a species in 8 as a target.
- Never say the rains or the dry season are starting, arriving or beginning unless 4 names this month or the next as their start; call the rains by the names in 4.
- Use the hemisphere and season in 1 and 3. South of the equator ${month} is not the northern season; in the tropics there is no spring or autumn.
- ${f.imperial ? "Imperial first, metric in brackets." : "Metric first and only."}${f.tropical ? "" : ` "${f.autumn}", not "${f.autumn === "fall" ? "autumn" : "fall"}".`}
- Each "name" is one crop, fish or wild food, written as in the lists. Never put a list, a sentence or JSON into a name.
- Name an organisation only if it is listed in 20, and only by the name given there. Do not name any other charity, society, trust, foundation, alliance, association, club, keeper or agency, even one you know works here.`;
}

const HINTS: Record<Section, string> = {
  gardening: "Write ONLY the gardening section, from the crop lists (12 to 15). Tie timing to this week's weather, the season word in 3 and the climate in 4; mention frost only as 5 allows.",
  fishing: "Write ONLY the fishing section, from the fish listed by water in 10. Place each species only in a water of the kind 10 lists it under; use the named waters in 11 where their kind fits; never the waters in 9 or the species in 8.",
  foraging:
    "Write ONLY the foraging section, from the wild foods in 16 and 17. Every item with a dangerous look-alike must say what it is and how to tell them apart. Return an empty safety array: the page prints its own safety lines, so do not write hazards, harvesting rules or where picking is allowed.",
};

async function writeSection<T>(client: Anthropic, section: Section, prompt: string): Promise<T> {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: section === "foraging" ? 2000 : 1500,
    temperature: 0.4,
    tools: [{ name: `publish_${section}`, description: `Publish the ${section} section of the guide.`, input_schema: SCHEMAS[section] }],
    tool_choice: { type: "tool", name: `publish_${section}` },
    messages: [{ role: "user", content: `${prompt}\n\n${HINTS[section]}` }],
  });
  if (msg.stop_reason === "max_tokens") throw new Error(`${section}: truncated`);
  const tool = msg.content.find((b) => b.type === "tool_use");
  if (!tool || tool.type !== "tool_use") throw new Error(`${section}: no tool output`);
  return tool.input as T;
}

/** The headlines, joined, as the overview's lead. */
const summaryOf = (g: Pick<Guide, "gardening" | "fishing" | "foraging">) =>
  [g.gardening.headline, g.fishing.headline, g.foraging.headline].map((h) => h.trim().replace(/[.!]+$/, "")).join(". ") + ".";

/**
 * Writes a new guide for the place and stores it. Without an AI key (local
 * development), or when every section fails, the rules guide is returned and
 * nothing is stored. Sections that failed the check are written from the
 * rules guide and listed in `fallback`.
 */
export async function writeGuide(d: LocalData, previous?: StoredRecord<Guide> | null): Promise<StoredRecord<StoredGuide> | null> {
  if (!aiEnabled()) return null;
  const fallback = rulesGuide(d, await floraEvidence(d.place, d.month).catch(() => null));
  const ctx = guideContext(d);
  const prompt = buildPrompt(d, ctx);
  const client = new Anthropic({ timeout: 25_000, maxRetries: 0 });
  const t0 = Date.now();
  const [g, f, fo] = await Promise.allSettled([
    writeSection<Guide["gardening"]>(client, "gardening", prompt),
    writeSection<Guide["fishing"]>(client, "fishing", prompt),
    writeSection<Guide["foraging"]>(client, "foraging", prompt),
  ]);
  const vet = <K extends Section>(name: K, r: PromiseSettledResult<Guide[K]>): Guide[K] | null => {
    if (r.status !== "fulfilled") {
      console.error(`[guide-ai] ${name} failed:`, r.reason);
      return null;
    }
    const res = checkSectionWhy(name, r.value, ctx, d);
    if (!res.ok) console.error(`[guide-ai] ${name} rejected by the check: ${res.reason}`);
    // With no wild food recorded near the place this month (ctx.wild), a headline that names a species is
    // calling a regional species "in season" here: use the rules guide for the section instead.
    if (res.ok && name === "foraging" && !ctx.wild.length) {
      const named = matchSpecies((res.ok as Guide["foraging"]).headline);
      if (named) {
        console.error(`[guide-ai] foraging rejected: headline names ${named.name} though no wild food is recorded near here this month`);
        return null;
      }
    }
    return res.ok;
  };
  const vetted: { [K in Section]: Guide[K] | null } = { gardening: vet("gardening", g), fishing: vet("fishing", f), foraging: vet("foraging", fo) };
  const fell = GUIDE_SECTIONS.filter((s) => !vetted[s]);
  const written = 3 - fell.length;
  console.log(`[guide-ai] ${written}/3 sections in ${Date.now() - t0}ms (${MODEL})${fell.length ? `; fallback: ${fell.join(", ")}` : ""}`);
  if (!written) return null;
  const sections = {
    gardening: vetted.gardening ?? fallback.gardening,
    fishing: vetted.fishing ?? fallback.fishing,
    foraging: vetted.foraging ?? fallback.foraging,
  };
  const guide: StoredGuide = { summary: summaryOf(sections), ...sections, source: "ai", generatedAt: new Date().toISOString(), ...(fell.length ? { fallback: fell } : {}) };
  return writeRecord<StoredGuide>("guide", guideId(d.place), guide, {
    source: "ai",
    freshFor: GUIDE_FRESH_SECONDS,
    season: d.season,
    previous: previous ?? null,
  });
}

/** The guide to show: the stored one, else a newly written one, else the rules guide. */
/** A town whose guide was read in the last 30 days is "seen"; the weekly warm-up only rewrites seen and popular towns. */
export const SEEN_TTL_SECONDS = 30 * 24 * 3600;
export const seenKey = (slug: string) => `seen:v1:${slug}`;
export async function markSeen(slug: string): Promise<void> {
  try {
    const { cacheGet, cacheSet } = await import("./cache");
    if (await cacheGet<number>(seenKey(slug))) return; // one write per town per month, not per view
    await cacheSet(seenKey(slug), Date.now(), SEEN_TTL_SECONDS);
  } catch {
    /* best effort */
  }
}

/**
 * A stored guide as it may be shown today. Written text ages: "nine days to the first frost", "Fall fishing: October" and
 * soil readings frozen at writing were all found on November pages (audit, 5 November 2026). So a guide older than a week
 * is not shown at all (the rules guide stands in until the weekly rewrite), and a fresh one is put through the same check
 * a new guide passes, against today's lists: fish recorded near the town and open today, wild foods recorded this month,
 * the library's own look-alike text. A section that no longer passes is replaced by the rules guide's.
 */
export function guideAsOfToday(stored: StoredRecord<StoredGuide>, d: LocalData, now = Date.now(), live?: LiveEvidence | null): StoredGuide | null {
  const ageS = (now - Date.parse(stored.savedAt)) / 1000;
  if (!(ageS <= GUIDE_FRESH_SECONDS)) return null;
  const ctx = guideContext(d);
  const rules = rulesGuide(d, live);
  const out: StoredGuide = { ...stored.value };
  let replaced = 0;
  for (const name of GUIDE_SECTIONS) {
    const res = checkSectionWhy(name, stored.value[name] as never, ctx, d);
    if (res.ok) (out as Record<string, unknown>)[name] = res.ok;
    else {
      (out as Record<string, unknown>)[name] = rules[name];
      replaced++;
    }
  }
  if (replaced === GUIDE_SECTIONS.length) return null;
  return { ...out, summary: summaryOf(out) };
}

export async function guideFor(d: LocalData): Promise<{ guide: StoredGuide; record: StoredRecord<StoredGuide> | null }> {
  const stored = await readGuide(d.place, d);
  void markSeen(d.place.slug);
  // The foraging panel's own records (two or more within 40 km this month), so the rules guide's foraging headline
  // says what the panel shows (audit, 11 November 2026).
  const live = await floraEvidence(d.place, d.month).catch(() => null);
  if (stored?.value?.gardening) {
    const today = guideAsOfToday(stored, d, Date.now(), live);
    if (today) return { guide: today, record: stored };
    return { guide: rulesGuide(d, live), record: null };
  }
  const written = await writeGuide(d).catch((e) => {
    console.error("[guide-ai] write failed:", e);
    return null;
  });
  if (written) return { guide: written.value, record: written };
  return { guide: rulesGuide(d, live), record: null };
}
