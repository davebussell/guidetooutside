/**
 * Checks the fish accuracy rules for ALL 264 towns in src/data/place-normals.json
 * and exits non-zero on any violation (accuracy audit, 2 November 2026):
 *
 *  1. No fish is listed as in season (`fish`), closed, in "other months"
 *     (`later`) or active on the Day page unless the town has it as "recorded"
 *     (src/lib/fish-presence.ts); the "regional" list holds only "regional" fish
 *     and carries no months or tactic.
 *  2. A fish the regulator has closed on the day is never in `fish` or active.
 *  3. No "in the salt" wording outside the sea and estuary sections, none at a
 *     town with no sea or estuary water, and none in the library's base fish text.
 *  4. The footer says "as read on" only where a closed-season row applies to
 *     the town; where none does, it says "No regulator rules are loaded for
 *     <province, state or country> yet"; where only a no-closed-season note does,
 *     it says neither.
 *  5. A fish with basis "typical" has the month in its typical angling months.
 *  And the Ottawa and Vancouver acceptance cases for 2 April and 2 November 2026.
 *
 * Added for the audit of 10 November 2026 (fish package):
 *  7. A sea or sea-run fish is in season only in a month its records near the town bear out (fish-presence
 *     monthsRecorded), unless an agency's or a cited region's months apply; one whose records bear out none of its
 *     months is listed apart (`undated`) with no months.
 *  8. No fish is in season on a day a regulator's row makes catch and release only (`noKeep`); such a fish is set apart
 *     with "Catch and release only" and the regulator.
 *  9. Evidence: no recorded fish rests on records only in the box's corners, on one record (or a few rows in one month),
 *     on fewer than five records none nearer than 30 km, or on a few records none since 2005; the words call the area a
 *     box, never "within 60 km of town".
 * 10. Names: a fish's bracketed names are only those its record gives for the page's region (no "elf, shad" in America).
 * 11. Stored weekly guides (the live store's backup): after the vet, no fishing entry names a fish the page's own list
 *     rejects, every entry says where, none is listed twice, no water is a database code, the headline names no fish the
 *     page does not list; and every stored wild food that names a library species carries the library's look-alike text.
 *  Pins: the audit's cases (Boston cod and mullet, Charlottetown and Moncton cod, Boston and Portland bluefish, Savannah
 *  tarpon, Philadelphia bluefish, Fredericton largemouth, Charlottetown smallmouth).
 *
 * Follow-ups to the water and fish fixes (11 November 2026):
 * 12. The Day page offers a fish (active or resting) only when this page lists it as in season that day (it was a
 *     warning, 188 entries, while rhythm.ts used the library's months); the guide's fallback list likewise, and with a
 *     water setting it lists only fish the water sections have in season.
 * 13. A tidal estuary reach's estuary line names the water, never "the river mouths along the shore".
 * 14. Where the open coast is 10 to 30 km away, the sea section is titled and tagged so; surf and rock tags only in the
 *     sea section.
 *  Static pins: the guide's Waters block uses place-profile waterLines; GuideLoader's client fish names follow the
 *  library (no "Bluefish (elf, shad)"); the refresh route has a "waters" kind with a 60-second budget behind the same
 *  secret check as the other kinds.
 *
 * Day 3 audit (Appalachian, Central Hardwoods and Gulf Coast towns, 11 November 2026):
 * 15. A failed map look-up hides no fish recorded within 10 km of town: with an "unavailable" list, every such fish the
 *     region admits is in some section of the page, and the rivers and lakes lines say the list did not load.
 * 16. Inland (no sea or estuary water), a fish of both waters with fresh-water months takes them, with their source, and
 *     never the sea tactic; no fish ever carries its sea tactic outside the sea and estuary sections.
 * 17. A fish of salt water alone (tarpon) is never in a rivers or lakes section.
 * 18. Duplicate rows: no recorded fish with no record within 30 km rests on fewer than 5 distinct records, counting a
 *     month's likely single event once (fish-presence eventRows).
 * 19. Fish-consumption advisories: every row has an https source, a date read and library species, and applies to a
 *     town; each section where one applies carries it, and each card of a fish it names.
 * 20. Months widened from records belong to fresh-water fish only, and each added month has the rows to show it.
 * 21. A fish with no record since 2005 is listed with no season ("undated", why "old").
 * 22. LOCAL_MONTHS rows have https sources and apply to a town.
 * 23. No rivers line names a river twice ("the Rio Grande and Rio Grande").
 * 24. The stored-guide vet holds each kept entry's "Where" to the page's waters for its fish (guide-vet whereFault).
 *  Pins: Asheville's trout after a failed look-up (page and stored guide), Pittsburgh's advisories and rivers line,
 *  St. Louis's winter trout, Mississippi advice and Benton Park Lake walleye, Little Rock's inland striped bass, Houston's
 *  tarpon, bass months, ship-channel advice and salt-water guide waters, Brownsville's lagoon, bluefish and tarpon.
 *
 * Day 4 audit (Florida Peninsula, Deserts and Mediterranean California towns, 13 November 2026):
 * 25. Agencies' trout waters (water-setting TROUT_WATERS): every row has an https source, a date read and library fish,
 *     and applies to a town; there, every trout it names that is recorded near the town is in the rivers section, with a
 *     named map list and after a failed look-up; a trout it names in the river alone is never in a warm town's lakes.
 * 26. One survey dataset's rows (fish-presence SURVEY_ROWS): every row has an https query and a date run; a fish whose
 *     rows were taken off never gives a nearest distance, and its count is the table's less the survey's.
 * 27. Region text: no fish on a Mediterranean California page carries Atlantic surf text ("blitz", "on the Atlantic") or
 *     Florida's FWC months.
 * 28. LOCAL_MONTHS rows limited to kinds of water apply only there (Boise's river trout months are not its ponds').
 * 29. A stored fishing headline that names another month is replaced (guide-vet otherMonth).
 *  Pins: Boise's and Albuquerque's trout, Tampa Bay, Biscayne Bay, Fort Lauderdale's estuary after a failed look-up, San
 *  Jose's bay, Santa Barbara's and San Jose's survey rows, Sacramento's Chinook months and advice, striped bass wording,
 *  the dry rivers and the show lake, the client fishing page's Waters block and the menu's "Bluefish".
 *
 * Day 5 audit (the last 25 towns, 14 November 2026):
 * 30. A note shown with a section that says, in a clause naming a fish, that it is closed or may not be kept, beside a card
 *     that lists that fish in season (fishing-waters noteSaysClosed): printed as a warning list, not a failure, since prose
 *     is not data (the fix is a row with dates, package A1).
 * 31. Months: a card never prints "Year-round" beside a closed season (typicalLine); the "Other months" list gives a
 *     regulator's open season for a fish the rows govern (laterWords); a sea or sea-run card whose records peak outside the
 *     months shown says where they peak (recordsPeak).
 * 32. Presence: every row of one calendar month is one event; EXCLUDED and RANGE_GAPS rows have https queries, a date read
 *     and library fish; no recorded fish rests on a pair EXCLUDED names.
 * 33. The regional list: no sea-run fish where the town has no sea, estuary or big lake, or sits above a dam that cut the run
 *     off (SEA_RUN_BLOCKED); none that RANGE_GAPS shows absent from GBIF's 150 km box.
 * 34. Above Grand Coulee a salmon is a lake fish: never in a rivers section, and no steelhead at all.
 * 35. Day-page fish lines: no "rising freely to a hatch", no bluegill "on the beds", no "rest" phase for Chinook or coho.
 *  Pins: Victoria's largemouth bass, Nanaimo's carp, Austin's brown trout, Bozeman's walleye and Grand Rapids' lake trout
 *  not recorded; Spokane's Chinook in the lakes; Bozeman's trout in the rivers after a failed look-up; Grand Rapids' walleye
 *  months; Kingston's bluegill season; Portland's Chinook peak; the regional lists the audit read.
 *
 * Run (esbuild bundles it and resolves the @/ alias; from the project root):
 *   npx esbuild scripts/check-fish.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/check-fish.mjs --log-level=warning && node /tmp/check-fish.mjs [-v]
 */
import { existsSync, readFileSync } from "node:fs";
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import { classifyEcoregion } from "../src/lib/ecoregions";
import { LOCAL_MONTHS, RELEASE_ALL_YEAR, fishByWater, habitatTags, laterWords, localName, noteSaysClosed, recordsPeak, regionText, seasonHere, typicalLine, type WaterSection } from "../src/lib/fishing-waters";
import { agencyNote, tidalRegsFor } from "../src/lib/region-regs";
import { EXCLUDED } from "../src/lib/fish-presence";
import { GAP_BELOW, RANGE_GAPS, rangeGap } from "../src/lib/fish-range-gaps";
import { FISH_ADVISORIES } from "../src/data/fish-advisories";
import { creatureAt } from "../src/lib/nature";
import { placeProfile, riverKey, waterLines } from "../src/lib/place-profile";
import { regimeOf } from "../src/lib/regime";
import { rulesFishing } from "../src/lib/guide-rules";
import { SURVEY_ROWS, distinctRecords, monthsRecorded, presentFish, recordedNote } from "../src/lib/fish-presence";
import PRESENCE_FILE from "../src/data/place-presence-fish.json";
import { dayKey, inRange, isClosed, regulatorFor, rulesFooterText, rulesFor, rulesNaming } from "../src/lib/closed-seasons";
import { habitatsOf, waterOf } from "../src/lib/fish-habitats";
import { entryFault, fishNamed, otherMonth, pageFish, vetStoredFishing } from "../src/lib/guide-vet";
import { isCodedWaterName, libraryLookalikes } from "../src/lib/guide-check";
import { guideId } from "../src/lib/guide-id";
import { matchSpecies } from "../src/lib/species";
import { creaturesInPhase } from "../src/lib/rhythm";
import { DAY_PHASES, DAY_RHYTHMS, type DayPhase } from "../src/data/day-stories";
import { FISH, getCreature, inLocalMonths } from "../src/lib/nature";
import { TROUT_WATERS, habitatsAt, troutWatersAt, waterSetting } from "../src/lib/water-setting";
import { isInfrastructureWater, unavailableWaters } from "../src/lib/waters";
import type { Climate, Guide, LocalData, Place, WaterBody } from "../src/lib/types";

const verbose = process.argv.includes("-v");
type Entry = { place: Place; climate: Climate };
const TOWNS = NORMALS as unknown as Entry[];

// Named waters from the live store's backup, where this machine has it (more habitats, a stricter test); and its stored guides.
const BACKUP = "/home/claude/rebuild/blobs-guides.jsonl";
const cached = new Map<string, WaterBody[]>();
const storedGuides = new Map<string, Guide>();
if (existsSync(BACKUP)) {
  for (const line of readFileSync(BACKUP, "utf8").split("\n")) {
    if (line.startsWith('{"k":"rec:v1:guide:')) {
      try {
        const o = JSON.parse(line) as { k: string; v: unknown };
        const v = (typeof o.v === "string" ? JSON.parse(o.v) : o.v) as { value?: { value?: Guide } };
        if (v.value?.value?.fishing) storedGuides.set(o.k.slice("rec:v1:guide:".length), v.value.value);
      } catch {}
      continue;
    }
    if (!line.startsWith('{"k":"waters:v2:')) continue;
    try {
      const o = JSON.parse(line) as { k: string; v: unknown };
      const v = typeof o.v === "string" ? JSON.parse(o.v) : o.v;
      // As getNearbyWaters serves them: plumbing (storm ponds, settling basins, drainage) filtered out.
      cached.set(o.k, (((v as { value?: WaterBody[] }).value ?? []) as WaterBody[]).filter((w) => !isInfrastructureWater(w.name)));
    } catch {}
  }
}

const violations: string[] = [];
const fail = (msg: string) => {
  violations.push(msg);
  // The presence-table gaps (Europe and Africa wait on GBIF) are many and known; show them last so new violations are never hidden.
  if (!msg.endsWith("not in place-presence-fish.json") && violations.length <= 200) console.log(`VIOLATION ${msg}`);
};

/** Whether an advisory row applies to a place, a kind of water and the town's great rivers (independently of fishing-waters). */
const advisoryTowns = new Set<string>();
function advisoryApplies(a: (typeof FISH_ADVISORIES)[number], place: Place, w: ReturnType<typeof waterSetting>, group: string): boolean {
  const mine = [place.admin1, (place as { admin1Code?: string }).admin1Code].filter(Boolean).map((x) => x!.toLowerCase());
  const r = Math.PI / 180;
  const kmTo = (c: { lat: number; lon: number }) => Math.hypot((place.lon - c.lon) * r * Math.cos(((place.lat + c.lat) / 2) * r), (place.lat - c.lat) * r) * 6371;
  const km = a.near ? kmTo(a.near) : 0;
  const rivers = [...(w.confluence ? [...w.confluence.rivers, w.confluence.forms ?? ""] : []), w.bigRiver ?? ""].filter(Boolean).map(riverKey);
  const ok =
    a.countryCode === (place.countryCode ?? "").toUpperCase() &&
    (!a.admin1 || a.admin1.some((x) => mine.includes(x.toLowerCase()))) &&
    (!a.near || km <= a.near.km) &&
    !(a.notNear ?? []).some((c) => kmTo(c) <= c.km) &&
    (!a.water || a.water.includes(group as never)) &&
    (!a.rivers || a.rivers.some((x) => rivers.includes(riverKey(x))));
  if (ok) advisoryTowns.add(a.id);
  return ok;
}
const shortMonths = (ms: number[]) => ms.join(",");


// A date in every month, and the two audit dates.
const DATES = [...Array.from({ length: 12 }, (_, i) => `2026-${String(i + 1).padStart(2, "0")}-15`), "2026-04-02", "2026-11-02", "2026-11-10"];
const SALT = /\bin the salt\b/i;
const PHASES = Object.keys(DAY_PHASES) as DayPhase[];

// 6. Plumbing is not a fishery (5 Nov 2026 audit): the names the audit found are dropped, real waters with similar words kept.
for (const n of ["Settling Basin", "Intercity drainage", "Carteret Drive Storm Pond", "Country Hills Storm Pond", "Hackett Stormwater Pond", "Pond 66", "Buckingham Fountain", "Junction Creek Box Culvert"])
  if (!isInfrastructureWater(n)) fail(`waters: "${n}" is plumbing but would be listed as a fishing water`);
for (const n of ["Fountain Lake", "The Pond at Fountain Park", "Sixteen Foot Drain", "Canal de Lachine", "Kaministiquia River", "Grand Union Canal"])
  if (isInfrastructureWater(n)) fail(`waters: "${n}" is a real water but would be dropped as plumbing`);

// 3 (library): the base text is fresh-safe.
for (const f of FISH) for (const k of ["tactic", "where"] as const) if (SALT.test(f[k] ?? "")) fail(`library: ${f.slug}.${k} has "in the salt" outside the sea variants: ${f[k]}`);

const bySlugName = new Map(FISH.map((f) => [f.name, f.slug]));
let listed = 0;
let sectionsSeen = 0;
let withRules = 0;
let withTidal = 0;
let asRead = 0;
let noRules = 0;
let noteOnly = 0;
let noLink = 0;
let dayFish = 0;
// 12. Day-page and fallback-guide fish that the fishing page does not list as in season that day (a warning until rhythm.ts
// and guide-rules.ts asked inSeasonOnPage on 11 November 2026; 188 entries then, now a failure).
const dayOff = new Set<string>();
const fallbackOff = new Set<string>();
let fallbackFish = 0;
let nearSeas = 0;
let estuaryReaches = 0;
const dayActive = new Map<string, Set<string>>();
const fallbackOf = new Map<string, string[]>();
const sectionsOf = new Map<string, Map<string, WaterSection[]>>();
const settingsOf = new Map<string, ReturnType<typeof waterSetting>>();

for (const { place, climate } of TOWNS) {
  const waters = cached.get(`waters:v2:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`) ?? [];
  const w = waterSetting(place.lat, place.lon, waters, climate);
  const eco = classifyEcoregion(place.lat, place.lon)!;
  const pres = presentFish(place.slug);
  if (!pres.checked) fail(`${place.slug}: not in place-presence-fish.json`);
  const marine = w.groups.includes("sea") || w.groups.includes("estuary");

  // 4. The footer.
  const reg = regulatorFor(place);
  const nRules = rulesFor(place).length;
  const text = rulesFooterText(reg, (s) => getCreature(s)?.name);
  // Tidal waters: named only on a page that shows a sea or estuary water, and only with a verified page for it.
  const tidalText = rulesFooterText(reg, (s) => getCreature(s)?.name, true);
  // The tidal sentence itself ("Maryland DNR (nontidal waters)" is a regulator's name, not the sentence).
  if (text.includes("For tidal waters, check")) fail(`${place.slug}: footer mentions tidal waters on a page without a sea or estuary water`);
  if (reg.tidalPage && !tidalText.includes(`For tidal waters, check ${reg.tidalPage.name}.`)) fail(`${place.slug}: tidal footer is missing the tidal regulator`);
  if (!reg.tidalPage && tidalText !== text) fail(`${place.slug}: tidal footer changed with no verified tidal page`);
  if (reg.tidalPage && !/^https:\/\//.test(reg.tidalPage.url)) fail(`${place.slug}: tidal regulator link is not https`);
  if (reg.tidalPage) withTidal++;
  if (nRules > 0) withRules++;
  if (text.includes("as read on")) asRead++;
  if (nRules > 0 !== text.includes("as read on")) fail(`${place.slug}: footer "as read on" = ${text.includes("as read on")} but ${nRules} closed-season rows apply`);
  if (nRules > 0 && reg.kind !== "rules") fail(`${place.slug}: rows apply but footer kind is ${reg.kind}`);
  if (reg.kind === "none") {
    noRules++;
    if (!text.includes(`No regulator rules are loaded for ${reg.jurisdiction} yet.`)) fail(`${place.slug}: no rows, but the footer does not say no rules are loaded: ${text}`);
    if (!reg.page) noLink++;
    if (reg.page && !/^https:\/\//.test(reg.page.url)) fail(`${place.slug}: regulator link is not https`);
  } else if (text.includes("No regulator rules are loaded")) fail(`${place.slug}: rows or a note apply but the footer says no rules are loaded`);
  if (reg.kind === "note") noteOnly++;
  if (reg.kind === "note" && text.includes("as read on")) fail(`${place.slug}: note-only town says "as read on"`);

  // 9. The evidence behind every recorded fish.
  for (const info of Object.values(pres.fish)) {
    if (info.status !== "recorded") continue;
    const rows = info.byMonth?.filter((x) => x > 0).length ?? 0;
    if ((info.withinKm ?? 0) >= 85) fail(`${place.slug} ${info.slug}: recorded on records only in the corners of the box`);
    if (info.n < 2 || (info.n <= 3 && rows <= 1)) fail(`${place.slug} ${info.slug}: recorded on one record (${info.n} rows in ${rows} month(s))`);
    if ((info.withinKm ?? 0) > 30 && info.n < 5) fail(`${place.slug} ${info.slug}: recorded on ${info.n} records none nearer than 30 km`);
    if (info.lastYear != null && info.lastYear < 2006 && info.n < 10) fail(`${place.slug} ${info.slug}: recorded on ${info.n} records, none since ${info.lastYear}`);
    if (/within \d+ km of town/.test(recordedNote(info))) fail(`${place.slug} ${info.slug}: evidence calls the box a circle: ${recordedNote(info)}`);
    // 18. Distinct records, a month's likely single event counted once.
    if ((info.withinKm ?? 0) > 30 && distinctRecords(info) < 5) fail(`${place.slug} ${info.slug}: recorded on ${distinctRecords(info)} distinct records none nearer than 30 km`);
  }

  // 15. A failed map look-up hides no fish recorded within 10 km of town.
  {
    const wu = waterSetting(place.lat, place.lon, unavailableWaters(), climate);
    const su = fishByWater(11, eco.slug, wu, { place, today: "2026-11-10" });
    const shown = new Set(su.flatMap((x) => [...x.fish, ...x.closed, ...x.later, ...x.undated].map((f) => f.slug)));
    for (const info of Object.values(pres.fish)) {
      if (info.status !== "recorded" || (info.withinKm ?? 99) > 10) continue;
      const lib = getCreature(info.slug);
      if (!lib || !creatureAt(lib, eco.slug, place)) continue;
      const hs = habitatsOf(info.slug);
      const vouched = hs.some((h) => ["lake", "pond", "river"].includes(h)) || (hs[0] === "cold-stream" && wu.coldStreams) || hs.some((h) => wu.habitats.includes(h));
      if (vouched && !shown.has(info.slug)) fail(`${place.slug}: a failed map look-up hides ${info.slug}, recorded within 10 km`);
    }
    for (const x of su) if ((x.id === "rivers" || x.id === "lakes") && !/did not load/.test(x.where)) fail(`${place.slug}: a failed look-up's ${x.id} line does not say the list did not load: ${x.where}`);
  }

  const perDate = new Map<string, WaterSection[]>();
  sectionsOf.set(place.slug, perDate);
  settingsOf.set(place.slug, w);
  for (const date of DATES) {
    const month = Number(date.slice(5, 7));
    const sections = fishByWater(month, eco.slug, w, { place, today: date });
    perDate.set(date, sections);
    sectionsSeen += sections.length;
    for (const s of sections) {
      // 14. The sea's distance: titled and tagged "10 to 30 km away" where the open coast is that far; surf and rock tags
      // only in the sea section (Moncton, Savannah and Jacksonville read "surf beaches · rocky shores" as if at the town).
      if (s.id === "sea") {
        if (w.coast === "near") {
          if (date === DATES[0]) nearSeas++;
          if (s.title !== "The sea, 10 to 30 km away" || s.away !== "10 to 30 km away") fail(`${place.slug}: the open coast is 10 to 30 km away but the sea section reads "${s.title}" (away: ${s.away})`);
          if (/within about 30 km|doorstep|within about 10 km/.test(s.where)) fail(`${place.slug}: sea line "${s.where}" at a coast 10 to 30 km away`);
        } else if (s.away || s.title !== "The sea") fail(`${place.slug}: coast "${w.coast}" but the sea section reads "${s.title}" (away: ${s.away})`);
      }
      for (const f of s.fish) {
        const tags = habitatTags(f, s);
        if (!tags) fail(`${place.slug} ${date} [${s.title}] ${f.slug}: card has no habitat tag`);
        if (s.id !== "sea" && /surf beaches|rocky shores/.test(tags)) fail(`${place.slug} [${s.title}] ${f.slug}: "${tags}" outside the sea section`);
        if (s.away ? !tags.endsWith(`, ${s.away}`) : /km away/.test(tags)) fail(`${place.slug} [${s.title}] ${f.slug}: tags "${tags}" do not match the coast's distance`);
      }
      // 13. A tidal estuary reach: the estuary line names the water, in the overview's words.
      if (s.id === "estuary" && w.tidal) {
        if (date === DATES[0]) estuaryReaches++;
        const name = `${w.tidal.water.charAt(0).toUpperCase()}${w.tidal.water.slice(1)}`;
        // A reach 10 to 30 km out (Brownsville's lagoon) is named with its distance and its source's words, never "at the town".
        const want = w.tidal.away ? `${name}, ${w.tidal.away}${w.tidal.says ? `: ${w.tidal.says}` : ""}.` : `${name}: tidal water at the town, part river and part sea.`;
        if (w.tidal.away && (s.away !== w.tidal.away || !s.title.endsWith(w.tidal.away))) fail(`${place.slug}: estuary section "${s.title}" does not say the water is ${w.tidal.away}`);
        if (/meet the tide/.test(s.where)) fail(`${place.slug}: estuary line "${s.where}" names a river as the tidal water at a tidal reach`);
        if (w.tidal.kind === "estuary" && s.where !== want) fail(`${place.slug}: estuary line "${s.where}", want "${want}"`);
        if (/river mouths along the shore/.test(s.where)) fail(`${place.slug}: estuary line "${s.where}" at a tidal reach`);
      }
      const salty = s.id === "sea" || s.id === "estuary";
      // 23. A river named twice.
      if (s.id === "rivers") {
        const keys = s.where.replace(/\. .*$/, "").replace(/\.$/, "").split(/, | and /).map(riverKey);
        if (new Set(keys).size !== keys.length) fail(`${place.slug}: rivers line names a river twice: ${s.where}`);
      }
      // 19. A section carries every advisory that applies to it.
      for (const a of FISH_ADVISORIES) {
        const scoped = !a.water || a.water.includes(s.id);
        if (scoped && s.advisories.some((x) => x.id === a.id) !== advisoryApplies(a, place, w, s.id)) fail(`${place.slug} [${s.title}]: advisory ${a.id} carried ${s.advisories.some((x) => x.id === a.id)}`);
      }
      for (const [list, fish] of [["fish", s.fish], ["closed", s.closed], ["later", s.later], ["undated", s.undated]] as const) {
        for (const f of fish) {
          listed++;
          // 10. Names as the region uses them.
          const lib = getCreature(f.slug);
          if (lib && f.name !== localName(lib, eco.slug)) fail(`${place.slug} [${s.title}] ${f.slug} is named "${f.name}", not "${localName(lib, eco.slug)}"`);
          // 7. A sea fish's months are the ones its records bear out.
          const rec = monthsRecorded(pres.fish[f.slug]);
          const cited = !!(lib as { monthsByRegion?: Record<string, number[]> } | undefined)?.monthsByRegion?.[eco.slug] || !!f.monthsNote || (Array.isArray(lib?.regions) && lib.regions.length === 1 && lib.regions[0] === eco.slug);
          if (waterOf(f.slug) !== "fresh" && !cited && f.seasonFrom !== "records" && f.undatedWhy !== "old") fail(`${place.slug} ${f.slug}: a sea fish whose months do not come from its records here`);
          if (f.seasonFrom === "records" && f.anglingMonths.some((m) => !rec?.includes(m))) fail(`${place.slug} ${date} ${f.slug}: months ${f.anglingMonths} include some its records do not bear out (${rec})`);
          if (list === "undated" && (f.anglingMonths.length || (f.seasonFrom !== "records" && f.undatedWhy !== "old"))) fail(`${place.slug} ${f.slug}: "undated" but carries months`);
          // 21. No record since 2005: no season.
          const info = pres.fish[f.slug];
          if (info?.lastYear != null && info.lastYear < 2006 && (list !== "undated" || f.undatedWhy !== "old") && list !== "closed") fail(`${place.slug} ${date} ${f.slug}: latest record ${info.lastYear}, but listed under "${list}"`);
          if (list !== "undated" && f.undatedWhy) fail(`${place.slug} ${f.slug}: carries undatedWhy under "${list}"`);
          // 16. Inland, a fish of both waters takes its fresh-water months with their source; the sea tactic only in salt sections.
          const freshM = (lib as { monthsFresh?: { months: number[]; source: string } } | undefined)?.monthsFresh;
          if (freshM && !marine && list !== "undated" && f.monthsNote?.source !== freshM.source && !f.monthsNote) fail(`${place.slug} ${f.slug}: inland, but its fresh-water months are not used`);
          if (freshM && !marine && f.seasonFrom === "records") fail(`${place.slug} ${f.slug}: inland, but treated as sea-run (months from records)`);
          if (lib?.tacticSea && !salty && f.tactic === lib.tacticSea) fail(`${place.slug} [${s.title}] ${f.slug}: sea tactic outside the sea and estuary sections`);
          // 17. A fish of salt water alone stays in the salt sections.
          if (waterOf(f.slug) === "salt" && (s.id === "rivers" || s.id === "lakes")) fail(`${place.slug} [${s.title}] ${f.slug}: a salt-water fish in fresh water`);
          // 20. Widened months: fresh-water fish only, each added month with the rows to show it.
          if (f.widened?.length) {
            if (waterOf(f.slug) !== "fresh") fail(`${place.slug} ${f.slug}: months widened from records, but it is not a fresh-water fish`);
            for (const m of f.widened) if ((info?.byMonth?.[m - 1] ?? 0) < 10) fail(`${place.slug} ${f.slug}: month ${m} added with ${info?.byMonth?.[m - 1] ?? 0} rows`);
            if (f.widened.some((m) => lib?.months.includes(m))) fail(`${place.slug} ${f.slug}: widened months repeat its usual ones`);
          }
          // 19. The advice that names the fish here is on its card.
          for (const a of s.advisories) if ((a.species.includes(f.slug) || a.species.includes("*")) && !f.advisories?.some((x) => x.id === a.id)) fail(`${place.slug} [${s.title}] ${f.slug}: advisory ${a.id} not on its card`);
          // 8. Catch-and-release-only days.
          const noKeep = rulesNaming(place, f.slug, s.id).some((r) => (r.noKeep ?? []).some((x) => inRange(dayKey(date), x)));
          if (list === "fish" && noKeep) fail(`${place.slug} ${date} [${s.title}] ${f.slug} is in season on a catch-and-release-only day`);
          if (list === "closed" && f.closure?.release && (!f.closure.label.startsWith("Catch and release only") || !f.closure.label.includes(f.closure.regulator))) fail(`${place.slug} ${f.slug}: release label "${f.closure.label}"`);
          if (list === "closed" && noKeep && !isClosed(place, f.slug, date, s.id) && !f.closure?.release) fail(`${place.slug} ${date} ${f.slug}: catch-and-release-only day not marked as such`);
          const st = pres.fish[f.slug]?.status;
          // 1. Only recorded fish are listed.
          if (st !== "recorded") fail(`${place.slug} ${date} [${s.title}] ${f.slug} is in "${list}" but its presence is "${st}"`);
          // 3. Salt wording only in the sea and estuary sections.
          for (const k of ["tactic", "where"] as const) if (SALT.test(f[k] ?? "") && (!salty || !marine)) fail(`${place.slug} ${date} [${s.title}] ${f.slug}.${k} says "in the salt": ${f[k]}`);
          if (list === "fish") {
            // 2. Not closed on the day.
            if (isClosed(place, f.slug, date, s.id)) fail(`${place.slug} ${date} [${s.title}] ${f.slug} is in season but the regulator has it closed`);
            if (f.closure?.closedNow) fail(`${place.slug} ${date} ${f.slug} in "fish" carries closedNow`);
            // 5. A typical-basis fish is in its typical months.
            if (f.basis === "typical" && !f.months.includes(month)) fail(`${place.slug} ${date} ${f.slug} typical basis but month ${month} is not in ${f.months}`);
            // 7. A sea fish in season only in a month its records bear out.
            if (f.seasonFrom === "records" && !rec?.includes(month)) fail(`${place.slug} ${date} [${s.title}] ${f.slug} in season in month ${month} with no records near here to bear it out (${rec})`);
            // An open-all-year season says nothing about when the fish is there: the months decide (Dallas's winter trout in July, 9 Nov 2026).
            if (f.openWords === "all year" && !f.months.includes(month)) fail(`${place.slug} ${date} ${f.slug} open all year but in season in month ${month}, outside ${f.months}`);
          }
          if (list === "closed" && !isClosed(place, f.slug, date, s.id) && !f.closure?.closedNow) fail(`${place.slug} ${date} ${f.slug} in "closed" but not closed`);
        }
      }
      for (const f of s.unchecked) {
        const lib = getCreature(f.slug);
        if (lib && f.name !== localName(lib, eco.slug)) fail(`${place.slug} [${s.title}] regional ${f.slug} is named "${f.name}"`);
        const st = pres.fish[f.slug]?.status;
        if (st !== "regional") fail(`${place.slug} ${date} [${s.title}] ${f.slug} is in "unchecked" but its presence is "${st}"`);
        if (Object.keys(f).some((k) => ["months", "tactic", "where", "anglingMonths", "closure"].includes(k))) fail(`${place.slug} ${f.slug}: unchecked entry carries months, tactic or season`);
      }
      if (salty && !marine) fail(`${place.slug}: sea or estuary section at a town with no marine water`);
    }

    // 12. What this page lists as in season today, in the waters it does not mark "Not here".
    const inSeasonToday = new Set(sections.flatMap((s) => (s.avoid ? [] : s.fish.map((f) => f.slug))));
    // Set apart today (closed, or catch and release only) in any of the place's waters the fish takes to. Rows are per water:
    // Fort McMurray's walleye row closes the lakes, and the town has only rivers, so its rivers' walleye are open (2 below
    // asked isClosed with no water until 11 November 2026, which counted rows for waters the town does not have).
    const apartToday = new Set(sections.flatMap((s) => s.closed.map((f) => f.slug)));
    const onDay = new Set<string>();
    dayActive.set(`${place.slug} ${date}`, onDay);

    // The Day page: "Fish active" and the resting fish.
    for (const phase of PHASES) {
      const who = creaturesInPhase(phase, month, eco.slug, w, place, date);
      for (const f of who.water) {
        dayFish++;
        onDay.add(f.slug);
        if (pres.fish[f.slug]?.status !== "recorded") fail(`${place.slug} ${date} ${phase}: Day page "Fish active" has ${f.slug}, presence "${pres.fish[f.slug]?.status}"`);
        if (apartToday.has(f.slug)) fail(`${place.slug} ${date} ${phase}: Day page "Fish active" has ${f.slug}, which the fishing page sets apart (closed or catch and release only)`);
        if (SALT.test(f.where) && !marine) fail(`${place.slug} ${date} ${phase}: Day page ${f.slug} says "in the salt"`);
        if (!inSeasonToday.has(f.slug)) dayOff.add(`${place.slug} ${date.slice(5)} ${f.slug}`);
      }
      for (const name of who.resting) {
        const slug = bySlugName.get(name);
        if (slug && pres.fish[slug]?.status !== "recorded") fail(`${place.slug} ${date} ${phase}: Day page "Inactive" lists fish ${slug}, presence "${pres.fish[slug]?.status}"`);
        if (slug) onDay.add(slug);
        if (slug && !inSeasonToday.has(slug)) dayOff.add(`${place.slug} ${date.slice(5)} ${slug} (resting)`);
        if (slug && apartToday.has(slug)) fail(`${place.slug} ${date} ${phase}: Day page "Inactive" lists ${slug}, which the fishing page sets apart`);
      }
    }

    // 12. The guide's fallback list: with the water setting, only fish the sections have in season; with none, only fish
    // recorded here, open and keepable on the day, and (a sea fish) in a month its records bear out.
    const slugOf = new Map(FISH.map((f) => [localName(f, eco.slug), f.slug]));
    const withWater = rulesFishing({ place, month, today: date, water: w }, eco.slug).species;
    fallbackOf.set(`${place.slug} ${date}`, withWater.map((it) => slugOf.get(it.name) ?? it.name));
    for (const it of withWater) {
      const slug = slugOf.get(it.name);
      if (!slug || !inSeasonToday.has(slug)) fallbackOff.add(`${place.slug} ${date.slice(5)} ${slug ?? it.name}`);
    }
    for (const it of rulesFishing({ place, month, today: date, water: null }, eco.slug).species) {
      fallbackFish++;
      const slug = slugOf.get(it.name);
      const lib = slug ? getCreature(slug) : undefined;
      const why = !slug || !lib
        ? "not a library name"
        : pres.fish[slug]?.status !== "recorded"
          ? "not recorded here"
          : isClosed(place, slug, date)
            ? "closed"
            : rulesNaming(place, slug).some((r) => (r.noKeep ?? []).some((x) => inRange(dayKey(date), x)))
              ? "catch and release only"
              : seasonHere(inLocalMonths(lib, eco.slug), eco.slug, place).from === "records" && !monthsRecorded(pres.fish[slug])?.includes(month)
                ? "no records near here in the month"
                : null;
      if (why) fallbackOff.add(`${place.slug} ${date.slice(5)} ${slug ?? it.name} (no water setting: ${why})`);
    }
  }
}

// ---- The audit's acceptance cases -----------------------------------------------------------------------------------
const names = (ss: WaterSection[], pick: "fish" | "closed" | "later") => ss.flatMap((s) => s[pick].map((f) => f.slug));
const ott = sectionsOf.get("ottawa-ontario");
if (!ott) fail("ottawa-ontario is not among the towns");
else {
  const apr = ott.get("2026-04-02")!;
  const nov = ott.get("2026-11-02")!;
  for (const [label, ss] of [["2 Apr", apr], ["2 Nov", nov]] as const)
    for (const s of ["steelhead", "coho-salmon", "chinook-salmon"]) {
      for (const pick of ["fish", "closed", "later"] as const) if (names(ss, pick).includes(s)) fail(`Ottawa ${label}: ${s} is listed under "${pick}"`);
      if (ss.some((x) => x.unchecked.some((f) => f.slug === s)) && s !== "steelhead") fail(`Ottawa ${label}: ${s} is in the regional list`);
    }
  for (const s of ["walleye", "northern-pike"]) {
    if (!names(apr, "closed").includes(s)) fail(`Ottawa 2 Apr: ${s} should be closed`);
    if (names(apr, "fish").includes(s)) fail(`Ottawa 2 Apr: ${s} should not be in season`);
    if (!names(nov, "fish").includes(s)) fail(`Ottawa 2 Nov: ${s} should be in season`);
  }
  for (const s of ["muskellunge", "smallmouth-bass", "largemouth-bass"]) if (!names(nov, "fish").includes(s)) fail(`Ottawa 2 Nov: ${s} should be in season`);
  const ottText = rulesFooterText(regulatorFor(TOWNS.find((t) => t.place.slug === "ottawa-ontario")!.place), (s) => getCreature(s)?.name);
  if (!ottText.includes("as read on 2 November 2026") || !ottText.includes("FMZ 12")) fail(`Ottawa footer should cite FMZ 12 and the date read: ${ottText}`);
  if (!nov.length) fail("Ottawa 2 Nov has no sections");
}
const van = TOWNS.find((t) => t.place.slug === "vancouver-british-columbia");
if (van) {
  const reg = regulatorFor(van.place);
  const text = rulesFooterText(reg);
  // Day 5 (14 November 2026): DFO and British Columbia rows are loaded for Vancouver (src/data/region-rules/pacific-maritime.ts).
  if (reg.kind === "none" || text.includes("No regulator rules are loaded")) fail(`Vancouver footer should cite the loaded rules: ${text}`);
  if (!/Fisheries and Oceans Canada/.test(text)) fail(`Vancouver footer should name Fisheries and Oceans Canada: ${text}`);
  if (!reg.page) fail("Vancouver has no verified regulator link");
}

// ---- The audit of 10 November 2026: pins ----------------------------------------------------------------------------
const at = (slug: string, date: string) => sectionsOf.get(slug)?.get(date) ?? [];
const inSeason = (slug: string, date: string, fish: string) => at(slug, date).some((s) => s.fish.some((f) => f.slug === fish));
for (const [slug, fish] of [
  ["charlottetown-prince-edward-island", "atlantic-cod"],
  ["moncton-new-brunswick", "atlantic-cod"],
  ["portland-maine", "atlantic-cod"],
  ["boston-massachusetts", "atlantic-cod"],
  ["charlottetown-prince-edward-island", "striped-bass"],
  ["boston-massachusetts", "bluefish"],
  ["portland-maine", "bluefish"],
  ["savannah-georgia", "atlantic-tarpon"],
  ["portland-maine", "striped-bass"],
] as const)
  for (const date of ["2026-11-02", "2026-11-10"]) if (inSeason(slug, date, fish)) fail(`pin: ${slug} ${date}: ${fish} is in season (audit of 10 November 2026)`);
for (const date of ["2026-11-02", "2026-11-10", "2026-11-15"]) {
  const cod = at("boston-massachusetts", date).flatMap((s) => s.closed).find((f) => f.slug === "atlantic-cod");
  if (!cod?.closure?.release || !cod.closure.label.includes("Catch and release only until 1 September — Massachusetts Division of Marine Fisheries"))
    fail(`pin: Boston ${date}: cod should be "Catch and release only until 1 September — Massachusetts Division of Marine Fisheries", got ${cod?.closure?.label}`);
}
if (!inSeason("boston-massachusetts", "2026-10-15", "atlantic-cod")) fail("pin: Boston 15 Oct: cod may be kept and has records; it should be in season");
for (const [slug, fish] of [
  ["boston-massachusetts", "flathead-grey-mullet"],
  ["philadelphia-pennsylvania", "bluefish"],
  ["fredericton-new-brunswick", "largemouth-bass"],
  ["charlottetown-prince-edward-island", "smallmouth-bass"],
] as const)
  if (presentFish(slug).fish[fish]?.status === "recorded") fail(`pin: ${slug}: ${fish} should not count as recorded (audit of 10 November 2026)`);
for (const slug of ["boston-massachusetts", "new-york-new-york", "philadelphia-pennsylvania", "washington-district-of-columbia", "baltimore-maryland", "jacksonville-florida", "savannah-georgia", "portland-maine"])
  for (const s of at(slug, "2026-11-10")) for (const f of [...s.fish, ...s.closed, ...s.later, ...s.undated, ...s.unchecked]) if (/\b(elf|shad|kurper|garrick|couta)\b/i.test(f.name)) fail(`pin: ${slug}: "${f.name}" carries a South African name`);
const elf = TOWNS.filter((t) => classifyEcoregion(t.place.lat, t.place.lon)?.slug === "cape-fynbos").flatMap((t) => at(t.place.slug, "2026-01-15").flatMap((s) => [...s.fish, ...s.closed, ...s.later, ...s.unchecked]));
if (elf.some((f) => f.slug === "bluefish") && !elf.some((f) => f.slug === "bluefish" && f.name === "Bluefish (elf, shad)")) fail("pin: the Cape's bluefish should still read \"Bluefish (elf, shad)\"");

// ---- Follow-ups of 11 November 2026: pins ---------------------------------------------------------------------------
// 4. The Day page and the guide's fallback list follow this page: no striped bass at Moncton or Portland in November.
for (const slug of ["moncton-new-brunswick", "portland-maine"])
  for (const date of ["2026-11-02", "2026-11-10", "2026-11-15"]) {
    if (dayActive.get(`${slug} ${date}`)?.has("striped-bass")) fail(`pin: ${slug} ${date}: the Day page offers striped bass, which the fishing page does not list`);
    if (fallbackOf.get(`${slug} ${date}`)?.includes("striped-bass")) fail(`pin: ${slug} ${date}: the guide's fallback list has striped bass`);
  }
// 1. The estuary line at a tidal estuary reach.
{
  const est = at("baltimore-maryland", "2026-07-15").find((s) => s.id === "estuary");
  if (est?.where !== "The Patapsco River: tidal water at the town, part river and part sea.") fail(`pin: Baltimore's estuary line reads "${est?.where}"`);
}
// 3. The sea 10 to 30 km away, titled and tagged so.
for (const slug of ["moncton-new-brunswick", "savannah-georgia", "jacksonville-florida"]) {
  const seas = DATES.flatMap((date) => at(slug, date)).filter((s) => s.id === "sea");
  if (!seas.length) fail(`pin: ${slug} has no sea section to check`);
  for (const s of seas) {
    if (s.title !== "The sea, 10 to 30 km away") fail(`pin: ${slug}: sea section titled "${s.title}"`);
    for (const f of s.fish) if (!habitatTags(f, s).endsWith(", 10 to 30 km away")) fail(`pin: ${slug} ${f.slug}: tags "${habitatTags(f, s)}"`);
  }
}
{
  const jax = at("jacksonville-florida", "2026-11-10").find((s) => s.id === "sea")?.fish.find((f) => f.slug === "striped-bass");
  const sea = at("jacksonville-florida", "2026-11-10").find((s) => s.id === "sea");
  if (jax && sea && habitatTags(jax, sea) !== "surf beaches · rocky shores, 10 to 30 km away") fail(`pin: Jacksonville's striped bass tags read "${habitatTags(jax, sea)}"`);
}
// 2, 5, 6. Static pins on the components and the route.
{
  const src = (p: string) => (existsSync(p) ? readFileSync(p, "utf8") : "");
  const sections = src("src/components/GuideSections.tsx");
  if (!sections) fail("pin: src/components/GuideSections.tsx not found (run from the project root)");
  // The words as code would print them (a string or JSX text), not as the comment that records the audit quotes them.
  if (/"The open sea: surf beaches|>\s*No named water is mapped|"No named water is mapped/.test(sections)) fail("pin: the guide's Waters block has its own sea or 'no named water' words again");
  // Day 5 audit: with the place, so a stored setting lacking its inland sea has it worked out (place-profile waterLines).
  if (!/waterLines\(w, data\.place\)/.test(sections)) fail("pin: the guide's Waters block no longer uses place-profile waterLines with the place");
  const loader = src("src/components/GuideLoader.jsx");
  if (/name: "[^"]*\(elf, shad\)"/.test(loader)) fail('pin: GuideLoader\'s client copy names the fish "Bluefish (elf, shad)"');
  for (const f of FISH as (typeof FISH[number] & { localNames?: unknown[] })[])
    if (f.localNames?.length && !new RegExp(`slug: "${f.slug}",\\s+name: ${JSON.stringify(f.name).replace(/[()]/g, "\\$&")},\\s+localNames:`).test(loader))
      fail(`pin: GuideLoader's client copy of ${f.slug} is not named "${f.name}" with its localNames`);
  if (!/localNameOf\(d, R\)/.test(loader)) fail("pin: GuideLoader no longer names fish by region");
  const route = src("src/app/api/refresh/route.ts");
  if (!/"waters"/.test(route) || !/WATERS_BUDGET_MS = 60_000/.test(route) || !/getNearbyWaters\(place\.lat, place\.lon, \{ budgetMs: WATERS_BUDGET_MS \}\)/.test(route))
    fail("pin: the refresh route lost its waters kind or its 60-second budget");
  if (!/req\.headers\.get\("x-warm-secret"\) !== secret/.test(route)) fail("pin: the refresh route's secret check changed");
  // The secret is read and compared, never logged or answered.
  if (/console\.[a-z]+\([^)]*secret/i.test(route) || /json\(\{[^)]*secret/i.test(route)) fail("pin: the refresh route may print the warm secret");
}

// ---- 11. Stored weekly guides, held to the page's lists -------------------------------------------------------------
let guidesSeen = 0;
let entriesKept = 0;
let entriesDropped = 0;
let headlinesReplaced = 0;
let lookalikesReplaced = 0;
for (const { place, climate } of TOWNS) {
  const g = storedGuides.get(guideId(place).replace(/^v2_/, ""));
  if (!g) continue;
  guidesSeen++;
  const waters = cached.get(`waters:v2:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`) ?? [];
  const w = waterSetting(place.lat, place.lon, waters, climate);
  for (const date of ["2026-04-02", "2026-07-15", "2026-11-10"]) {
    const d = { place, month: Number(date.slice(5, 7)), today: date, water: w, waters, climate } as unknown as LocalData;
    const v = vetStoredFishing(g, d);
    const { open, apart, region, ctx } = pageFish(d);
    const allowed = new Set([...open, ...apart]);
    const seen = new Set<string>();
    entriesKept += v.fishing.species.length;
    entriesDropped += g.fishing.species.length - v.fishing.species.length;
    for (const it of v.fishing.species) {
      // 24. With the page's waters for each fish.
      const why = entryFault(it as never, allowed, [], seen, region, ctx);
      if (why) fail(`${place.slug} ${date}: stored guide keeps "${it.name}" (${why})`);
    }
    for (const x of v.fishing.waters ?? []) if (isCodedWaterName(x)) fail(`${place.slug}: stored guide lists the coded water "${x}"`);
    if (v.fishing.headline !== g.fishing.headline) headlinesReplaced++;
    const strays = fishNamed(v.fishing.headline, { heads: true, keep: open, region }).filter((f) => !open.has(f.slug));
    if (strays.length) fail(`${place.slug} ${date}: stored headline "${v.fishing.headline}" names ${strays.map((f) => f.slug).join(", ")}`);
  }
  // The library's look-alike text, as readGuide applies it.
  const fo = g.foraging;
  for (const it of fo ? libraryLookalikes(fo.inSeasonNow ?? [], matchSpecies) : []) {
    const sp = matchSpecies(it.name);
    if (sp?.lookalikes && it.lookalikes !== sp.lookalikes) fail(`${place.slug}: stored wild food "${it.name}" keeps the model's look-alike text`);
    if (sp?.lookalikes && fo!.inSeasonNow.find((x) => x.name === it.name)?.lookalikes !== sp.lookalikes) lookalikesReplaced++;
  }
}
const ct = storedGuides.get("46.2_-63.1");
const cran = ct ? libraryLookalikes(ct.foraging.inSeasonNow, matchSpecies).find((x) => /cranberr/i.test(x.name)) : null;
if (ct && !/winterberry/i.test(cran?.lookalikes ?? "")) fail(`pin: Charlottetown's stored cranberry should carry the library's winterberry holly warning, got "${cran?.lookalikes}"`);
// A synthetic stored guide with every fault the audit found, held to Boston's page on 10 November.
{
  const bos = TOWNS.find((t) => t.place.slug === "boston-massachusetts")!;
  const waters = cached.get(`waters:v2:${bos.place.lat.toFixed(2)}:${bos.place.lon.toFixed(2)}`) ?? [];
  const d = { place: bos.place, month: 11, today: "2026-11-10", water: waterSetting(bos.place.lat, bos.place.lon, waters, bos.climate), waters, climate: bos.climate } as unknown as LocalData;
  const fake = {
    summary: "Garden. Striped bass, bluefish and cod in season. Wild food.",
    gardening: { headline: "Garden" },
    foraging: { headline: "Wild food", inSeasonNow: [], comingSoon: [], safety: [] },
    fishing: {
      headline: "Striped bass, bluefish and cod in season",
      species: [
        { name: "Striped bass", where: "Boston Harbor", detail: "x" },
        { name: "Striped bass", where: "Mystic River", detail: "x" },
        { name: "Atlantic cod", where: "Outer harbour", detail: "x" },
        { name: "Bluefish", where: "Outer harbour", detail: "x" },
        { name: "Yellow perch", where: "", detail: "x" },
        { name: "Tarpon", where: "local streams", detail: "x" },
      ],
      bestTimes: "",
      waters: ["Jamaica Pond", "Trib 00774 To Darby Creek"],
      regulationsNote: "",
    },
  } as unknown as Guide;
  const v = vetStoredFishing(fake, d);
  // Cod is set apart on the page (catch and release only), so the guide keeps it and FishingGuide marks it, as it marks a closed fish.
  const kept = v.fishing.species.map((x) => x.name).join(", ");
  if (kept !== "Striped bass, Atlantic cod") fail(`pin: synthetic Boston guide should keep one striped bass entry and the set-apart cod, kept: ${kept}`);
  if (!pageFish(d).apart.has("atlantic-cod")) fail("pin: Boston's cod should be set apart on 10 November");
  if (v.fishing.headline === fake.fishing.headline) fail("pin: synthetic Boston headline naming cod and bluefish in November should be replaced");
  if (v.summary.includes("cod in season")) fail(`pin: synthetic Boston summary still names cod: ${v.summary}`);
  if (v.fishing.waters.includes("Trib 00774 To Darby Creek")) fail("pin: a coded water name survived the vet");
}

// ---- Day 3 audit (11 November 2026): tables and pins ---------------------------------------------------------------
// 19. The advisory rows.
for (const a of FISH_ADVISORIES) {
  if (!/^https:\/\//.test(a.source)) fail(`advisory ${a.id}: source is not https`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.checked)) fail(`advisory ${a.id}: no date read`);
  for (const sp of a.species) if (sp !== "*" && !getCreature(sp)) fail(`advisory ${a.id}: "${sp}" is not a library fish`);
  if (!advisoryTowns.has(a.id)) fail(`advisory ${a.id} applies to no town`);
}
// 22. The agencies' own months.
for (const r of LOCAL_MONTHS) {
  if (!/^https:\/\//.test(r.source)) fail(`LOCAL_MONTHS ${r.species.join("/")} ${r.admin1[0]}: source is not https`);
  if (!TOWNS.some((t) => seasonHere(inLocalMonths(getCreature(r.species[0])!, classifyEcoregion(t.place.lat, t.place.lon)!.slug), classifyEcoregion(t.place.lat, t.place.lon)!.slug, t.place).local === r))
    fail(`LOCAL_MONTHS ${r.species.join("/")} ${r.admin1[0]} applies to no town`);
}
const sec = (slug: string, date: string, id: string) => at(slug, date).find((s) => s.id === id);
const listedIn = (ss: WaterSection | undefined, fish: string) => !!ss && [...ss.fish, ...ss.closed, ...ss.later, ...ss.undated].some((f) => f.slug === fish);
{
  // Fault 1. Asheville after a failed look-up: its trout are on the page, in its streams, and in season in November.
  const t = TOWNS.find((x) => x.place.slug === "asheville-north-carolina")!;
  const eco = classifyEcoregion(t.place.lat, t.place.lon)!.slug;
  const wu = waterSetting(t.place.lat, t.place.lon, unavailableWaters(), t.climate);
  // Day 5 audit (14 November 2026): the climate test lost Asheville's cold streams when its station's July mean became
  // 24.06 °C; the trout water now rests on North Carolina's designated Hatchery Supported waters (water-setting
  // TROUT_WATERS, 15A NCAC 10C .0205), so it is "trout water" whatever the map look-up or the threshold does.
  if (!wu.habitats.includes("cold-stream") && !wu.habitats.includes("trout-river")) fail(`pin: Asheville after a failed look-up has no trout water (${wu.habitats})`);
  if (!wu.troutWaters?.some((r) => r.agency === "North Carolina Wildlife Resources Commission")) fail("pin: Asheville has no designated trout-water row (15A NCAC 10C .0205)");
  const su = fishByWater(11, eco, wu, { place: t.place, today: "2026-11-10" });
  const riv = su.find((s) => s.id === "rivers");
  for (const f of ["rainbow-trout", "brown-trout"]) if (!riv?.fish.some((x) => x.slug === f)) fail(`pin: Asheville after a failed look-up: ${f} not in season in its rivers and streams on 10 November`);
  // The stored guide's correct trout survive the vet.
  const d = { place: t.place, month: 11, today: "2026-11-10", water: wu, waters: unavailableWaters(), climate: t.climate } as unknown as LocalData;
  const fake = {
    summary: "Garden. Trout. Wild food.",
    gardening: { headline: "Garden" },
    foraging: { headline: "Wild food", inSeasonNow: [], comingSoon: [], safety: [] },
    fishing: {
      headline: "Trout on the Swannanoa",
      species: [
        { name: "Rainbow trout", where: "Swannanoa River and Bent Creek", detail: "x" },
        { name: "Brown trout", where: "French Broad River tributaries", detail: "x" },
      ],
      bestTimes: "",
      waters: ["Swannanoa River"],
      regulationsNote: "",
    },
  } as unknown as Guide;
  const kept = vetStoredFishing(fake, d).fishing.species.map((x) => x.name).join(", ");
  if (kept !== "Rainbow trout, Brown trout") fail(`pin: Asheville's stored trout after a failed look-up should be kept, kept: ${kept}`);
}
{
  // Fault 2 and 4. Pittsburgh: three rivers, and their advice beside the fish.
  const riv = sec("pittsburgh-pennsylvania", "2026-11-10", "rivers");
  if (!riv || !/the Allegheny, the Monongahela, the Ohio/.test(riv.where)) fail(`pin: Pittsburgh's rivers line reads "${riv?.where}"`);
  for (const id of ["pa-ohio-river-pittsburgh", "pa-allegheny-pools-2-4", "pa-monongahela-pools-2-3", "pa-statewide"]) if (!riv?.advisories.some((a) => a.id === id)) fail(`pin: Pittsburgh's rivers lack advisory ${id}`);
  const wal = riv?.fish.find((f) => f.slug === "walleye");
  if (!wal?.advisories?.some((a) => a.id === "pa-ohio-river-pittsburgh")) fail("pin: Pittsburgh's walleye card lacks the Ohio River advice");
}
{
  // Fault 4 and 5, 9. St. Louis.
  const riv = sec("st-louis-missouri", "2026-11-10", "rivers");
  if (!riv?.advisories.some((a) => a.id === "mo-big-rivers-catfish")) fail("pin: St. Louis's rivers lack the Mississippi catfish advice");
  const lakes = sec("st-louis-missouri", "2026-11-10", "lakes");
  const trout = lakes?.fish.find((f) => f.slug === "rainbow-trout");
  if (!trout || !/Winter Trout Program/.test(trout.monthsNote?.text ?? "")) fail(`pin: St. Louis's stocked trout should be in season on 10 November with MDC's note (${trout?.monthsNote?.text})`);
  if (sec("st-louis-missouri", "2026-07-15", "lakes")?.fish.some((f) => f.slug === "rainbow-trout")) fail("pin: St. Louis's stocked trout in season in July");
  if (!lakes?.notes.some((n) => /urban fishing lakes/.test(n.note))) fail("pin: St. Louis's lakes lack MDC's note on its urban lakes");
  const t = TOWNS.find((x) => x.place.slug === "st-louis-missouri")!;
  const waters = cached.get(`waters:v2:${t.place.lat.toFixed(2)}:${t.place.lon.toFixed(2)}`) ?? [];
  for (const wv of [waterSetting(t.place.lat, t.place.lon, waters, t.climate), waterSetting(t.place.lat, t.place.lon, unavailableWaters(), t.climate)]) {
    const d = { place: t.place, month: 11, today: "2026-11-10", water: wv, waters, climate: t.climate } as unknown as LocalData;
    const fake = {
      summary: "x",
      gardening: { headline: "Garden" },
      foraging: { headline: "Wild food", inSeasonNow: [], comingSoon: [], safety: [] },
      fishing: { headline: "Walleye", species: [{ name: "Walleye", where: "Lakes including Benton Park Lake and Fairground Park Lake", detail: "x" }], bestTimes: "", waters: [], regulationsNote: "" },
    } as unknown as Guide;
    if (vetStoredFishing(fake, d).fishing.species.length) fail(`pin: St. Louis (${wv.namedWaters}): walleye "in Benton Park Lake" survives the vet`);
  }
}
{
  // Fault 6. Little Rock's striped bass: fresh-water months and tactic.
  const riv = sec("little-rock-arkansas", "2026-11-10", "rivers");
  const sb = riv?.fish.find((f) => f.slug === "striped-bass");
  if (!sb || sb.seasonFrom !== "library" || !/Live shad/.test(sb.tactic ?? "") || /eels/.test(sb.tactic ?? "")) fail(`pin: Little Rock's striped bass should be in season with the fresh-water tactic (${sb?.seasonFrom}, ${sb?.tactic})`);
  if (sb && shortMonths(sb.anglingMonths) !== "10,11,12,1,2,3,4,5") fail(`pin: Little Rock's striped bass months ${sb.anglingMonths}`);
  if (!sec("little-rock-arkansas", "2026-12-15", "lakes")?.fish.some((f) => f.slug === "rainbow-trout")) fail("pin: Little Rock's winter trout not in season in December");
  if (sec("little-rock-arkansas", "2026-04-15", "lakes")?.fish.some((f) => f.slug === "rainbow-trout")) fail("pin: Little Rock's winter trout in season in April");
}
{
  // Faults 7, 8, 10 and 9. Houston.
  for (const id of ["rivers", "lakes"]) if (listedIn(sec("houston-texas", "2026-09-15", id), "atlantic-tarpon")) fail(`pin: Houston's ${id} list tarpon`);
  if (presentFish("houston-texas").fish["atlantic-tarpon"]?.status === "recorded") fail("pin: Houston's tarpon (7 rows 45 to 60 km out, 4 of them in one October) should not count as recorded");
  const bass = sec("houston-texas", "2026-11-10", "rivers")?.fish.find((f) => f.slug === "largemouth-bass");
  if (!bass?.widened?.includes(11)) fail(`pin: Houston's largemouth bass should be in season in November, widened from its records (${bass?.widened})`);
  if (!sec("houston-texas", "2026-11-10", "rivers")?.advisories.some((a) => a.id === "tx-adv-55-houston-ship-channel")) fail("pin: Houston's rivers lack the ship channel advice");
  const t = TOWNS.find((x) => x.place.slug === "houston-texas")!;
  const waters = cached.get(`waters:v2:${t.place.lat.toFixed(2)}:${t.place.lon.toFixed(2)}`) ?? [];
  const d = { place: t.place, month: 11, today: "2026-11-10", water: waterSetting(t.place.lat, t.place.lon, waters, t.climate), waters, climate: t.climate } as unknown as LocalData;
  const fake = {
    summary: "x",
    gardening: { headline: "Garden" },
    foraging: { headline: "Wild food", inSeasonNow: [], comingSoon: [], safety: [] },
    fishing: {
      headline: "Bass",
      species: [{ name: "Largemouth bass", where: "Galveston Bay marshes", detail: "x" }, { name: "Largemouth bass", where: "Kinder Lake", detail: "x" }],
      bestTimes: "",
      waters: ["Galveston Bay estuaries and lagoons", "Gulf of Mexico coastal waters", "Kinder Lake", "Buffalo Bayou"],
      regulationsNote: "",
    },
  } as unknown as Guide;
  const v = vetStoredFishing(fake, d);
  if (v.fishing.species.length) fail(`pin: Houston's stored guide keeps ${v.fishing.species.map((x) => x.where).join("; ")}`);
  if (v.fishing.waters.join("|") !== "Buffalo Bayou") fail(`pin: Houston's stored guide waters after the vet: ${v.fishing.waters.join(", ")}`);
}
{
  // Faults 3, 7, 8. Brownsville.
  const est = sec("brownsville-texas", "2026-11-10", "estuary");
  if (!est || /Rio Grande/.test(est.where) || !/Lower Laguna Madre/.test(est.where)) fail(`pin: Brownsville's estuary line reads "${est?.where}"`);
  if (at("brownsville-texas", "2026-11-10").some((s) => s.id === "sea")) fail("pin: Brownsville has a sea section; the open Gulf beach is about 36 km away");
  if (listedIn(sec("brownsville-texas", "2026-11-10", "rivers"), "atlantic-tarpon")) fail("pin: Brownsville's rivers list tarpon");
  if (presentFish("brownsville-texas").fish["bluefish"]?.status === "recorded") fail("pin: Brownsville's bluefish (5 rows, 4 records) should not count as recorded");
  if (est?.fish.some((f) => f.slug === "atlantic-tarpon")) fail("pin: Brownsville's tarpon in season on 10 November (7 November rows are one survey day)");
}
{
  // 21. Old records.
  const dm = at("des-moines-iowa", "2026-07-15").flatMap((s) => s.undated).find((f) => f.slug === "largemouth-bass");
  if (presentFish("des-moines-iowa").fish["largemouth-bass"]?.status === "recorded" && dm?.undatedWhy !== "old") fail("pin: Des Moines's largemouth bass (none since 2005) should be listed with no season");
}


// ---- Day 4 audit (13 November 2026): tables, invariants and pins -----------------------------------------------------
const townOf = (slug: string) => TOWNS.find((x) => x.place.slug === slug)!;
const cachedOf = (t: Entry) => cached.get(`waters:v2:${t.place.lat.toFixed(2)}:${t.place.lon.toFixed(2)}`) ?? [];
/** A town's sections on a date, for a given list of named waters (the cached one, a failed look-up, an empty answer). */
const pageWith = (slug: string, date: string, waters: WaterBody[]) => {
  const t = townOf(slug);
  const w = waterSetting(t.place.lat, t.place.lon, waters, t.climate);
  return { w, ss: fishByWater(Number(date.slice(5, 7)), classifyEcoregion(t.place.lat, t.place.lon)!.slug, w, { place: t.place, today: date }) };
};
const profileOf = (slug: string, waters: WaterBody[]) => {
  const t = townOf(slug);
  const w = waterSetting(t.place.lat, t.place.lon, waters, t.climate);
  return { w, p: placeProfile({ place: t.place, climate: t.climate, water: w, regime: regimeOf(t.climate, t.place.lat) } as unknown as LocalData), lines: waterLines(w) };
};
const inSec = (ss: WaterSection[], id: string, list: "fish" | "later" | "closed" | "undated", fish: string) => !!ss.find((s) => s.id === id)?.[list].some((f) => f.slug === fish);
const anyIn = (ss: WaterSection[], id: string, fish: string) => listedIn(ss.find((s) => s.id === id), fish);

// 25. The agencies' trout waters.
for (const tw of TROUT_WATERS) {
  if (!/^https:\/\//.test(tw.source) || !/^\d{4}-\d{2}-\d{2}$/.test(tw.checked)) fail(`TROUT_WATERS ${tw.river}: no https source or date read`);
  for (const sp of [...tw.species, ...tw.still]) if (!getCreature(sp)) fail(`TROUT_WATERS ${tw.river}: "${sp}" is not a library fish`);
  const towns = TOWNS.filter((t) => troutWatersAt(t.place.lat, t.place.lon).includes(tw));
  if (!towns.length) fail(`TROUT_WATERS ${tw.river} applies to no town`);
  for (const t of towns) {
    const eco = classifyEcoregion(t.place.lat, t.place.lon)!.slug;
    for (const waters of [cachedOf(t), unavailableWaters()]) {
      const w = waterSetting(t.place.lat, t.place.lon, waters, t.climate);
      for (const date of ["2026-01-15", "2026-07-15", "2026-11-15"]) {
        const ss = fishByWater(Number(date.slice(5, 7)), eco, w, { place: t.place, today: date });
        for (const sp of tw.species) {
          const lib = getCreature(sp);
          if (presentFish(t.place.slug).fish[sp]?.status !== "recorded" || !lib || !creatureAt(lib, eco, t.place)) continue;
          if (!anyIn(ss, "rivers", sp)) fail(`${t.place.slug} ${date} (${w.namedWaters}): ${sp} is not in the rivers section beside ${tw.river}`);
          if (!w.coldStreams && !tw.still.includes(sp) && anyIn(ss, "lakes", sp)) fail(`${t.place.slug} ${date}: ${sp}, named only in ${tw.river}, is filed under the lakes`);
        }
        const riv = ss.find((s) => s.id === "rivers");
        if (riv && !riv.where.includes(tw.river.replace(/^the /, ""))) fail(`${t.place.slug} ${date} (${w.namedWaters}): the rivers line leaves out ${tw.river}: ${riv.where}`);
      }
    }
  }
}
// No town gets "trout water" without a row, and no fish but a row's takes it.
for (const t of TOWNS) {
  const w = waterSetting(t.place.lat, t.place.lon, cachedOf(t), t.climate);
  if (w.habitats.includes("trout-river") !== troutWatersAt(t.place.lat, t.place.lon).length > 0) fail(`${t.place.slug}: "trout water" habitat without a TROUT_WATERS row, or a row without it`);
  for (const f of FISH) if (habitatsAt(f.slug, w).includes("trout-river") && !(w.troutWaters ?? []).some((x) => x.species.includes(f.slug))) fail(`${t.place.slug}: ${f.slug} takes "trout water" that no row names it in`);
}

// 26. One survey dataset's rows.
{
  const towns = (PRESENCE_FILE as unknown as { towns: Record<string, { fish: Record<string, { n: number }> }> }).towns;
  for (const [town, rows] of Object.entries(SURVEY_ROWS))
    for (const [slug, sv] of Object.entries(rows)) {
      if (!/^https:\/\/api\.gbif\.org\//.test(sv.query) || !/^\d{4}-\d{2}-\d{2}$/.test(sv.read)) fail(`SURVEY_ROWS ${town} ${slug}: no GBIF query or date run`);
      if (sv.byMonth.reduce((a, b) => a + b, 0) !== sv.rows) fail(`SURVEY_ROWS ${town} ${slug}: the months do not add up to the rows`);
      const raw = towns[town]?.fish[slug];
      if (!raw) fail(`SURVEY_ROWS ${town} ${slug}: not in place-presence-fish.json`);
      const info = presentFish(town).fish[slug];
      if (raw && info.n !== Math.max(0, raw.n - sv.rows)) fail(`SURVEY_ROWS ${town} ${slug}: count ${info.n}, expected ${raw.n} less ${sv.rows}`);
      if (info.withinKm != null || /the nearest within/.test(recordedNote(info))) fail(`SURVEY_ROWS ${town} ${slug}: a nearest distance is given, which may be a survey row's`);
    }
  const sb = presentFish("santa-barbara-california").fish["flathead-grey-mullet"];
  if (sb.n > 1000 || !/diver survey/.test(recordedNote(sb))) fail(`pin: Santa Barbara's mullet still rests on the diver survey's rows: ${recordedNote(sb)}`);
  if (presentFish("san-jose-california").fish["flathead-grey-mullet"].status === "recorded") fail("pin: San Jose's mullet (15 rows besides 1,585 survey rows) should not count as recorded");
}

// 27. Region text on California pages.
for (const t of TOWNS) {
  const eco = classifyEcoregion(t.place.lat, t.place.lon)!.slug;
  if (eco !== "mediterranean-california") continue;
  for (const s of at(t.place.slug, "2026-11-15"))
    for (const f of [...s.fish, ...s.closed, ...s.later, ...s.undated]) {
      if (/blitz|on the Atlantic/i.test(`${f.where} ${f.tactic ?? ""}`)) fail(`${t.place.slug} [${s.id}]: ${f.slug} carries Atlantic text: ${f.where} ${f.tactic}`);
      if (/myfwc\.com/.test(f.monthsNote?.source ?? "")) fail(`${t.place.slug} [${s.id}]: ${f.slug} takes Florida FWC's months`);
    }
}
if (!regionText(getCreature("striped-bass")!, "mediterranean-california").tacticSea?.includes("anchov")) fail("pin: striped bass has no California sea tactic");

// 28. LOCAL_MONTHS limited to kinds of water.
for (const r of LOCAL_MONTHS.filter((x) => x.water)) {
  const t = TOWNS.find((x) => seasonHere(inLocalMonths(getCreature(r.species[0])!, classifyEcoregion(x.place.lat, x.place.lon)!.slug), classifyEcoregion(x.place.lat, x.place.lon)!.slug, x.place).local === r);
  if (!t) continue;
  const eco = classifyEcoregion(t.place.lat, t.place.lon)!.slug;
  for (const g of ["sea", "estuary", "rivers", "lakes"] as const)
    if (!r.water!.includes(g) && seasonHere(inLocalMonths(getCreature(r.species[0])!, eco), eco, t.place, { group: g }).local === r) fail(`LOCAL_MONTHS ${r.species[0]} ${r.admin1[0]}: applies in ${g}, outside its waters`);
}

// 29. Stale month words in a stored headline.
if (!otherMonth("Fall fishing in Tampa: October tides", 11) || otherMonth("November redfish on the flats", 11) || otherMonth("May brings the run", 11))
  fail("pin: guide-vet otherMonth misreads a headline's month");

{
  // Fault 1. Boise: trout on the Boise River, wild and stocked; brown trout not in the ponds.
  for (const [label, waters] of [["cached", cachedOf(townOf("boise-idaho"))], ["failed", unavailableWaters()]] as const) {
    const { ss } = pageWith("boise-idaho", "2026-11-13", waters);
    for (const f of ["rainbow-trout", "brown-trout"]) if (!inSec(ss, "rivers", "fish", f)) fail(`pin: Boise (${label}): ${f} not in season in the rivers on 13 November`);
    if (anyIn(ss, "lakes", "brown-trout")) fail(`pin: Boise (${label}): brown trout filed under the lakes`);
    const card = ss.find((s) => s.id === "rivers")?.fish.find((f) => f.slug === "rainbow-trout");
    if (!/idfg\.idaho\.gov/.test(card?.monthsNote?.source ?? "")) fail(`pin: Boise (${label}): river rainbow trout months not Idaho Fish and Game's`);
    if (!ss.find((s) => s.id === "rivers")?.notes.some((n) => /finest urban trout rivers/.test(n.note))) fail(`pin: Boise (${label}): the rivers section lacks IDFG's note`);
  }
  // Albuquerque: winter-stocked trout in the drains and ponds, November to March, after any answer.
  for (const [label, waters] of [["cached", cachedOf(townOf("albuquerque-new-mexico"))], ["failed", unavailableWaters()], ["empty", [] as WaterBody[]]] as const) {
    const nov = pageWith("albuquerque-new-mexico", "2026-11-13", waters).ss;
    for (const id of ["rivers", "lakes"]) if (!inSec(nov, id, "fish", "rainbow-trout")) fail(`pin: Albuquerque (${label}): rainbow trout not in season in its ${id} in November`);
    if (anyIn(pageWith("albuquerque-new-mexico", "2026-07-15", waters).ss, "rivers", "rainbow-trout") && inSec(pageWith("albuquerque-new-mexico", "2026-07-15", waters).ss, "rivers", "fish", "rainbow-trout"))
      fail(`pin: Albuquerque (${label}): stocked trout in season in July`);
    const card = nov.find((s) => s.id === "rivers")?.fish.find((f) => f.slug === "rainbow-trout");
    if (!/dgf\.nm\.gov/.test(card?.monthsNote?.source ?? "")) fail(`pin: Albuquerque (${label}): trout months are not NMDGF's`);
  }
  // Fault 2. Enclosed bays.
  const tampa = profileOf("tampa-florida", cachedOf(townOf("tampa-florida")));
  if (/open sea|sea coast|sea is the main/.test(`${tampa.p.fishing} ${tampa.p.setting} ${tampa.p.turnsOn} ${tampa.lines.join(" ")}`)) fail(`pin: Tampa still reads as the open sea: ${tampa.p.fishing}`);
  for (const waters of [cachedOf(townOf("tampa-florida")), unavailableWaters()]) {
    const { ss } = pageWith("tampa-florida", "2026-11-13", waters);
    if (ss.some((s) => s.id === "sea")) fail("pin: Tampa has a sea section; Clearwater Beach is about 37 km away");
    if (!ss.find((s) => s.id === "estuary")?.where.includes("Tampa Bay")) fail("pin: Tampa's estuary line does not name Tampa Bay");
  }
  for (const slug of ["miami-florida", "fort-lauderdale-florida", "tampa-florida"])
    if (!pageWith(slug, "2026-11-13", unavailableWaters()).ss.some((s) => s.id === "estuary")) fail(`pin: ${slug}: a failed look-up deletes the estuary`);
  const miami = pageWith("miami-florida", "2026-11-13", cachedOf(townOf("miami-florida")));
  if (!miami.ss.find((s) => s.id === "estuary")?.where.includes("Biscayne Bay")) fail("pin: Miami's estuary line does not name Biscayne Bay");
  if (!miami.ss.find((s) => s.id === "estuary")?.advisories.some((a) => a.id === "fl-biscayne-jack-barracuda")) fail("pin: Miami's estuary lacks Florida's Biscayne Bay jack and barracuda advice");
  const sj = pageWith("san-jose-california", "2026-11-13", cachedOf(townOf("san-jose-california")));
  if (sj.ss.some((s) => s.id === "sea")) fail("pin: San Jose has a sea section; the open Pacific is about 41 km away");
  if (!/South San Francisco Bay, 10 to 30 km away/.test(sj.ss.find((s) => s.id === "estuary")?.where ?? "")) fail("pin: San Jose's estuary line does not name South San Francisco Bay and its distance");
  const sjp = profileOf("san-jose-california", cachedOf(townOf("san-jose-california")));
  if (/within about 30 km|The coast, 10 to 30 km|open coast/.test(`${sjp.p.fishing} ${sjp.lines.join(" ")}`)) fail(`pin: San Jose still has an open coast within 30 km: ${sjp.p.fishing}`);
  // Fault 5. Dry, concrete and show waters.
  const where = (slug: string, id: string) => pageWith(slug, "2026-11-13", cachedOf(townOf(slug))).ss.find((s) => s.id === id)?.where ?? "";
  if (/Salt River/.test(where("phoenix-arizona", "rivers"))) fail("pin: Phoenix lists the dry Salt River as a fishing river");
  if (/Rillito|Santa Cruz/.test(where("tucson-arizona", "rivers"))) fail("pin: Tucson lists the Rillito or the Santa Cruz as a fishing river");
  if (/Lake of Dreams/.test(where("las-vegas-nevada", "lakes"))) fail("pin: Las Vegas lists the Wynn's Lake of Dreams as a fishing water");
  if (/Los Angeles River/.test(where("los-angeles-california", "rivers")) && !/Glendale Narrows/.test(where("los-angeles-california", "rivers"))) fail("pin: Los Angeles names its river without saying it is a concrete channel fished in the Glendale Narrows");
  // Fault 6. Sacramento's Chinook.
  const sac = pageWith("sacramento-california", "2026-11-13", cachedOf(townOf("sacramento-california"))).ss;
  const chin = sac.find((s) => s.id === "rivers")?.fish.find((f) => f.slug === "chinook-salmon");
  if (presentFish("sacramento-california").fish["chinook-salmon"]?.status === "recorded" && (!chin || !/wildlife\.ca\.gov/.test(chin.monthsNote?.source ?? "")))
    fail("pin: Sacramento's Chinook is not in season in November by CDFW's 2026 fall-run months");
  // Faults 7 and 8. Striped bass in California: wording, months and advice.
  const stb = sac.find((s) => s.id === "rivers") && [...sac.find((s) => s.id === "rivers")!.fish, ...sac.find((s) => s.id === "rivers")!.later].find((f) => f.slug === "striped-bass");
  if (stb && (!stb.advisories?.some((a) => a.id === "ca-sacramento-river-do-not-eat") || /myfwc/.test(stb.monthsNote?.source ?? ""))) fail("pin: Sacramento's striped bass lacks the Sacramento River advice or takes Florida's months");
  for (const slug of ["los-angeles-california", "santa-barbara-california"]) {
    const sea = pageWith(slug, "2026-11-13", cachedOf(townOf(slug))).ss.find((s) => s.id === "sea");
    const f = sea && [...sea.fish, ...sea.later, ...sea.undated].find((x) => x.slug === "striped-bass");
    if (f && !f.advisories?.some((a) => a.id === "ca-statewide-anadromous-striped-bass")) fail(`pin: ${slug}: striped bass lacks OEHHA's statewide advice`);
  }
  // Fault 3 and 7. Static pins: the client fishing page and the menu.
  const src = (p: string) => (existsSync(p) ? readFileSync(p, "utf8") : "");
  const loader = src("src/components/GuideLoader.jsx");
  if (/"The open sea: surf beaches|>\s*No named water is mapped|"No named water is mapped/.test(loader)) fail("pin: GuideLoader's fishing fallback prints its own sea or 'no named water' words again");
  if (!/waterLines\(e\.water\)/.test(loader)) fail("pin: GuideLoader's fishing fallback no longer uses place-profile waterLines");
  if (/label: "Bluefish \(elf\)"/.test(src("src/lib/nav.jsx"))) fail('pin: the menu reads "Bluefish (elf)"');
  // A stored headline naming October, read on 13 November.
  const t = townOf("tampa-florida");
  const w = waterSetting(t.place.lat, t.place.lon, cachedOf(t), t.climate);
  const d = { place: t.place, month: 11, today: "2026-11-13", water: w, waters: cachedOf(t), climate: t.climate } as unknown as LocalData;
  const fake = {
    summary: "Garden. Fall fishing in Tampa: October tides. Wild food.",
    gardening: { headline: "Garden" },
    foraging: { headline: "Wild food", inSeasonNow: [], comingSoon: [], safety: [] },
    fishing: { headline: "Fall fishing in Tampa: October tides", species: [], bestTimes: "", waters: [], regulationsNote: "" },
  } as unknown as Guide;
  if (/October/.test(vetStoredFishing(fake, d).fishing.headline)) fail("pin: Tampa's stored 'October tides' headline survives in November");
}

// ---- Day 5 audit (14 November 2026): invariants and pins ------------------------------------------------------------
const noteClash = new Set<string>();
{
  for (const [slug, perDate] of sectionsOf)
    for (const [date, secs] of perDate)
      for (const x of secs) {
        // 30. A shown note saying the fish is closed, beside an in-season card (a warning).
        for (const f of x.fish) if (x.notes.some((n) => noteSaysClosed(n.note, f))) noteClash.add(`${slug} ${x.id} ${f.slug}`);
        // 31. Months.
        for (const f of [...x.fish, ...x.closed]) {
          if (f.basis === "regulator" && f.openWords && f.openWords !== "all year" && f.openWords !== RELEASE_ALL_YEAR && /Year-round/.test(typicalLine(f, "Typical angling months, less the closed season")))
            fail(`${slug} ${date} ${f.slug}: "Year-round" beside a closed season (${f.openWords})`);
          if (f.seasonFrom === "records" && recordsPeak(presentFish(slug).fish[f.slug], f.anglingMonths) && !f.peakOutside && f.months.length)
            fail(`${slug} ${date} ${f.slug}: records peak outside its months, and the card does not say so`);
        }
        for (const f of x.later) if (f.basis === "regulator" && f.openWords && !laterWords(f).includes(`legally open ${f.openWords}`)) fail(`${slug} ${date} ${f.slug}: "Other months" hides the regulator's season`);
        // 33. The regional list.
        const w = settingsOf.get(slug);
        for (const u of x.unchecked) {
          if (rangeGap(slug, u.slug)) fail(`${slug} ${x.id}: regional list names ${u.slug}, which GBIF's 150 km box shows absent`);
          const seaRun = u.slug === "steelhead" || waterOf(u.slug) === "both";
          if (seaRun && w && (w.seaRunBlocked || !["surf", "rocks", "harbour", "offshore", "estuary", "big-lake"].some((h) => w.habitats.includes(h as never))))
            fail(`${slug} ${x.id}: regional list names the sea-run ${u.slug} where it cannot run`);
        }
        // 34. Above Grand Coulee.
        if (w?.seaRunBlocked) {
          if (x.id === "rivers" && [...x.fish, ...x.closed, ...x.later, ...x.undated].some((f) => ["chinook-salmon", "coho-salmon", "atlantic-salmon"].includes(f.slug))) fail(`${slug} ${date}: a landlocked salmon in the rivers`);
          if ([...x.fish, ...x.closed, ...x.later, ...x.undated, ...x.unchecked].some((f) => f.slug === "steelhead")) fail(`${slug} ${date}: steelhead above Grand Coulee`);
        }
      }
  // 32. Presence tables.
  for (const e of EXCLUDED) {
    if (!/^https:\/\//.test(e.query) || !/^\d{4}-\d{2}-\d{2}$/.test(e.read) || !getCreature(e.fish)) fail(`EXCLUDED ${e.town} ${e.fish}: bad row`);
    if (presentFish(e.town).fish[e.fish]?.status === "recorded") fail(`EXCLUDED ${e.town} ${e.fish}: still recorded`);
  }
  for (const g of RANGE_GAPS) if (!/^https:\/\/api\.gbif\.org\//.test(g.query) || !getCreature(g.fish) || !TOWNS.some((t) => t.place.slug === g.town)) fail(`RANGE_GAPS ${g.town} ${g.fish}: bad row`);
  for (const t of TOWNS)
    for (const f of Object.values(presentFish(t.place.slug).fish))
      if (f.status === "recorded" && (f.byMonth ?? []).filter((x) => x > 0).length === 1) fail(`${t.place.slug} ${f.slug}: recorded on rows all in one month`);
  // Pins.
  const st = (town: string, fish: string) => presentFish(town).fish[fish]?.status;
  for (const [town, fish] of [["victoria-british-columbia", "largemouth-bass"], ["nanaimo-british-columbia", "common-carp"], ["austin-texas", "brown-trout"], ["bozeman-montana", "walleye"], ["grand-rapids-michigan", "lake-trout"]])
    if (st(town, fish) === "recorded") fail(`pin ${town}: ${fish} is still recorded near the town`);
  for (const [town, fish] of [["bozeman-montana", "rainbow-trout"], ["bozeman-montana", "brown-trout"], ["victoria-british-columbia", "chinook-salmon"], ["kingston-ontario", "walleye"]])
    if (st(town, fish) !== "recorded") fail(`pin ${town}: ${fish}, a true local fish, is no longer recorded`);
  const sec = (town: string, date: string, id: string) => sectionsOf.get(town)?.get(date)?.find((x) => x.id === id);
  const all = (x: WaterSection | undefined) => (x ? [...x.fish, ...x.closed, ...x.later, ...x.undated] : []);
  if (!all(sec("spokane-washington", "2026-08-15", "lakes")).some((f) => f.slug === "chinook-salmon")) fail("pin spokane: the landlocked Chinook is not in the lakes");
  {
    const t = townOf("bozeman-montana");
    const su = fishByWater(6, "western-mountains", waterSetting(t.place.lat, t.place.lon, unavailableWaters(), t.climate), { place: t.place, today: "2026-06-15" });
    const riv = su.find((x) => x.id === "rivers");
    for (const f of ["rainbow-trout", "brown-trout"]) if (!all(riv).some((x) => x.slug === f)) fail(`pin bozeman: after a failed look-up ${f} is not in the rivers`);
  }
  const gr = sec("grand-rapids-michigan", "2026-11-15", "lakes")?.fish.find((f) => f.slug === "walleye");
  if (!gr || !/the whole year outside the closed season/.test(typicalLine(gr, "Typical angling months, less the closed season"))) fail(`pin grand rapids: walleye months read "${gr ? typicalLine(gr, "") : "none"}"`);
  const kb = all(sec("kingston-ontario", "2026-11-15", "lakes")).find((f) => f.slug === "bluegill");
  if (!kb || !/legally open all year/.test(laterWords(kb))) fail(`pin kingston: bluegill reads "${kb ? laterWords(kb) : "none"}"`);
  // Package D (Day 5): a whole-year noKeep range reads "Catch and release only all year", never "until 1 January", and a
  // fish that may never be kept is never "Open all year" bare. Every town, every date.
  for (const [slug, perDate] of sectionsOf)
    for (const [date, secs] of perDate)
      for (const x of secs)
        for (const f of all(x)) {
          if (f.closure?.release && f.closure.allYear && !/Catch and release only all year/.test(f.closure.label)) fail(`${slug} ${date} ${f.slug}: a whole-year release reads "${f.closure.label}"`);
          if (f.closure && /until 1 January/.test(f.closure.label) && f.closure.allYear) fail(`${slug} ${date} ${f.slug}: "${f.closure.label}"`);
          if (f.openWords === "all year" && f.keepWords === "never") fail(`${slug} ${date} ${f.slug}: "Open all year" on a fish that may never be kept`);
        }
  // Package D (Day 5): the Regulations box names the tidal regulator where the town has salt water and a verified tidal
  // page (Nanaimo, Vancouver, Victoria: Fisheries and Oceans Canada), and nowhere else.
  for (const { place } of TOWNS) {
    const w = settingsOf.get(place.slug);
    const tidal = tidalRegsFor({ place, water: w ?? null } as never);
    const salt = !!w && (w.coast !== null || w.tidal?.kind === "estuary");
    if (!!tidal !== (salt && !!regulatorFor(place).tidalPage)) fail(`${place.slug}: the Regulations box's tidal regulator (${tidal?.name}) disagrees with the footer's`);
  }
  for (const s of ["nanaimo-british-columbia", "vancouver-british-columbia", "victoria-british-columbia"]) {
    const t = townOf(s);
    if (!t) continue;
    const tidal = tidalRegsFor({ place: t.place, water: settingsOf.get(s) ?? null } as never);
    const note = agencyNote({ agency: "BC freshwater synopsis", url: "https://x" }, tidal);
    if (!tidal || !/Fisheries and Oceans Canada/.test(note) || !/for tidal water/.test(note)) fail(`pin ${s}: the Regulations note does not name the tidal regulator: "${note}"`);
  }
  for (const s of ["kelowna-british-columbia", "spokane-washington"]) {
    const t = townOf(s);
    if (t && tidalRegsFor({ place: t.place, water: settingsOf.get(s) ?? null } as never)) fail(`pin ${s}: a tidal regulator at an inland town`);
  }
  const pc = all(sec("portland-oregon", "2026-08-15", "rivers")).find((f) => f.slug === "chinook-salmon");
  if (!pc || pc.peakOutside !== 5) fail(`pin portland: Chinook's May peak is not said (${pc?.peakOutside})`);
  const NOT_REGIONAL: Record<string, string[]> = {
    "madison-wisconsin": ["steelhead", "chinook-salmon", "coho-salmon"],
    "albany-new-york": ["steelhead", "chinook-salmon", "coho-salmon"],
    "bozeman-montana": ["steelhead", "chinook-salmon", "coho-salmon"],
    "laramie-wyoming": ["steelhead", "chinook-salmon", "coho-salmon"],
    "spokane-washington": ["steelhead", "chinook-salmon", "coho-salmon"],
    "saskatoon-saskatchewan": ["striped-bass", "smallmouth-bass", "largemouth-bass", "bluegill", "black-crappie"],
    "thompson-manitoba": ["chinook-salmon", "coho-salmon", "arctic-char"],
    "yellowknife-northwest-territories": ["chinook-salmon", "coho-salmon", "arctic-char", "brook-trout", "rainbow-trout"],
    "whitehorse-yukon": ["walleye", "coho-salmon"],
    "kelowna-british-columbia": ["walleye", "northern-pike", "arctic-grayling", "steelhead"],
    "saguenay-quebec": ["muskellunge", "largemouth-bass", "bluegill"],
  };
  for (const [town, fish] of Object.entries(NOT_REGIONAL))
    for (const [date, secs] of sectionsOf.get(town) ?? new Map())
      for (const x of secs as WaterSection[]) for (const u of x.unchecked) if (fish.includes(u.slug)) fail(`pin ${town} ${date}: regional list names ${u.slug}`);
  // 35. Day-page fish lines.
  for (const [slug, phases] of Object.entries(DAY_RHYTHMS))
    for (const [ph, r] of Object.entries(phases)) {
      if (r === "rest" && (slug === "chinook-salmon" || slug === "coho-salmon")) fail(`${slug}/${ph}: a "rest" phase claims the salmon inactive`);
      if (r && r !== "rest" && [r.where, ...(r.at ?? []).map((p) => (typeof p === "string" ? p : p.t))].some((t) => /rising freely to a hatch|On the beds/i.test(t))) fail(`${slug}/${ph}: a fish line that ignores the date`);
    }
  if (GAP_BELOW < 1) fail("GAP_BELOW must be at least 1");
}

// 12. Once a warning (188 entries on 11 November 2026), now a failure.
for (const x of dayOff) fail(`${x}: on the Day page but not in season on the fishing page`);
for (const x of fallbackOff) fail(`${x}: in the guide's fallback list but not in season on the fishing page`);

// ---- Summary ------------------------------------------------------------------------------------------------------
console.log(
  `\n${TOWNS.length} towns x ${DATES.length} dates: ${sectionsSeen} water sections, ${listed} fish listed, ${dayFish} Day-page fish checked.\n` +
    `Stored guides: ${guidesSeen} checked at 3 dates; ${entriesKept} fishing entries kept, ${entriesDropped} dropped, ${headlinesReplaced} headlines replaced; ${lookalikesReplaced} wild-food look-alike lines replaced by the library's.\n` +
    `Day page and guide fallback (12): ${dayOff.size} Day-page and ${fallbackOff.size} fallback-guide town, date and fish entries the fishing page does not list as in season; ${fallbackFish} fish in the no-water fallback lists checked.\n` +
    `Water wording (13, 14): ${nearSeas} towns with the open coast 10 to 30 km away, ${estuaryReaches} tidal reaches with an estuary section.\n` +
    `Notes against cards (30, a warning): ${noteClash.size} town, water and fish entries where a note shown says the fish is closed beside an in-season card${noteClash.size ? `: ${[...noteClash].slice(0, 40).join("; ")}` : ""}.\n` +
    `Footer: ${withRules} towns have closed-season rows (${asRead} say "as read on"), ${noteOnly} have only a note, ${noRules} have none (${noRules - noLink} with a verified regulator link, ${noLink} without one); ${withTidal} towns also have a verified tidal-waters regulator page.`,
);
if (verbose) {
  const left = TOWNS.filter((t) => regulatorFor(t.place).kind === "none" && !regulatorFor(t.place).page).map((t) => `${t.place.admin1 || t.place.country}`);
  console.log(`Jurisdictions without a verified link: ${[...new Set(left)].join(", ")}`);
}
if (violations.length) {
  const presenceGaps = violations.filter((v) => v.endsWith("not in place-presence-fish.json")).length;
  console.log(`\n${violations.length} violation(s)${presenceGaps ? `, ${presenceGaps} of them towns not yet in place-presence-fish.json (${violations.filter((v) => v.endsWith("not in place-presence-fish.json")).slice(0, 5).map((v) => v.split(":")[0]).join(", ")} …)` : ""}.`);
  process.exit(1);
}
console.log("\nAll fish checks passed.");
