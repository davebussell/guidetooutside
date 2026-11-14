/**
 * Checks the foraging accuracy rules for ALL 264 towns in src/data/place-normals.json
 * and every month, and exits non-zero (printing each failure) on a violation:
 *
 *  1. No species is listed "in season" / "ready" (foragingNow, foragingSoon: the
 *     lists every town page, guide card and weekly guide is built from) unless the
 *     presence table, read here independently of src/lib/plant-presence.ts, holds at
 *     least one record of it in the town's box AND at least one record in that
 *     calendar month (for "coming into season": in one of the next two months the
 *     library gives for it). A data-poor town, or one missing from the table, lists
 *     nothing as in season: its species can appear only in the labelled regional list.
 *  2. No taxon that is not a curated edible appears under a food heading: the lists
 *     contain only species of the curated library; the "Wild edibles recorded nearby"
 *     selection (knownAmong) is fed black knot, alder buckthorn and the crust and
 *     bracket fungi of the Ottawa audit and must return none of them; and the library
 *     itself holds none of those taxa.
 *  3. Every town page carries a loaded land rule or the generic line, the generic
 *     line names no law, and the foraging page component renders the block.
 *  4. Ottawa, 2 November: lingonberry is in no list in any month, hen of the woods
 *     and lion's mane are not ready in November, and the Ottawa-Gatineau circle gets
 *     the NCC, City, Ontario Parks, conservation authority and Quebec rules.
 *  5. Butternut carries its Endangered status wherever the curated data names it.
 *  6. Regulators' harvest bans (src/data/harvest-bans.ts; audit of 10 November 2026): no banned food is in any list
 *     (ready, coming, regional, the live panel, the stored weekly guide) where its ban applies, every banned food is
 *     named with its rule, and each row has a regulator, a source and a reading date. Pinned: mussels banned on the
 *     Bay of Fundy at Saint John and Moncton, not at Halifax (where DFO's limit and closures are printed instead).
 *  7. The stored-guide gate keeps nothing outside the library's own season and region (staghorn sumac and beechnuts
 *     were kept in November at Fredericton, Saint John and Halifax).
 *  8. The weekly headline and the live panel agree under the two-records rule: a town outside the presence table
 *     never reads "no wild food is listed as in season"; given the panel's evidence, the gate keeps exactly the
 *     in-season foods with two or more records and its headline counts them; the panel drops single records.
 *  9. Region-specific names and text print only in their region, for every species listed at every town in every
 *     month and every hazard on every continent, and for records stored before the text was scoped (floraHere).
 * 10. Labels: every radius printed on the foraging page names its source, and the live counts say they cover every
 *     year on record.
 * 11. Audit of 11 November 2026, the headline over the panel: for every town with a stored flora record in the backup
 *     (/home/claude/rebuild/blobs-guides.jsonl), the stored-guide gate given that record's evidence never writes
 *     "nothing", "none" or "not checked" where the panel lists foods with two or more records, counts the panel's foods
 *     when its own list keeps none, and stays within the 140 characters the guide check keeps. The audit's stored
 *     headlines (Asheville, Pittsburgh, St. Louis, Nashville, Columbus, Indianapolis) are pinned, and the rules
 *     headline is the gate's own sentence.
 * 12. Published native ranges (species.json `range`): no species on any town's regional list in any month lies outside
 *     its range there; every range is sourced; pecans are off Columbus, Indianapolis, Nashville and the Southeast and on
 *     at St. Louis; a range never overrules a town's own records (black walnut stays in Montreal's September list).
 * 13. Brownsville: what the regional list prints, and a label that names the region's breadth and what narrows it.
 * 14. The live panel matches a recorded taxon to a library species by its full name, or to a record written for the
 *     whole genus ("Rosa spp."): comb tooth and bear's head are not counted as lion's mane (Houston, November).
 * Day 4 audit (10 November 2026, fixed 13 November):
 * 15. The live panel lists a library species only where its record is written for the place (a listed region, or one
 *     on the same continent and side of the equator), for every species at every town in every month and on every
 *     stored record, and its text passes the region-text rules (9). Pinned: the Cape's sour fig is not a food at Santa
 *     Barbara or San Diego in any month (an old stored entry is named and counted with the other species), and is one at
 *     Cape Town.
 * 16. Every panel entry matched at genus level says what its records are of (species.json `recordOf`), and every nut,
 *     fruit, berry, root or tree entry says its records are of the plant: Orlando's 206 oak records read "records of oak
 *     trees (Quercus, all species)", not acorns.
 * 17. The rosary pea's per-seed risk is BfR's (one seed severe in an adult, one or two fatal in a child, low risk
 *     swallowed whole), with its source in hazards.ts; the unsourced "a single seed, well chewed, can kill an adult" is gone.
 * 18. A tree recorded outside its native range (`range`, and the whole-range `nativeBounds`, each sourced) keeps its
 *     records and carries the likely-planted note on the panel and on a checked list: pecans at Sacramento and Richmond,
 *     black walnut at Boise, Sudbury and Montreal; not pecans at St. Louis, black walnut at Memphis, persimmon at Orlando.
 *
 * Run (esbuild bundles it and resolves the @/ alias; from the project root):
 *   npx esbuild scripts/check-foraging.ts --bundle --platform=node --format=esm \
 *     --alias:@=./src --outfile=/tmp/check-foraging.mjs --log-level=warning \
 *   && node /tmp/check-foraging.mjs [--require-complete] [--verbose]
 * --require-complete also fails when the presence table does not yet cover all 264
 * towns (a run in progress); without it that is a warning, since an uncovered town
 * can only show the labelled regional list.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import PRESENCE from "../src/data/place-presence-plants.json";
import SPECIES_JSON from "../src/data/species.json";
import { classifyEcoregion } from "../src/lib/ecoregions";
import { SPECIES, speciesNow, type Species, ALL_SPECIES } from "../src/lib/species";
import { HEADLINE_MAX, NOTHING_HERE, foragingNow, foragingSoon, gateGuideForaging, liveFoods, liveForagingHeadline, townOf, type LiveEvidence } from "../src/lib/plant-presence";
import { AT_RISK, findForTaxon, floraHere, floraId, knownAmong, recordedAs, type LocalFlora, type Taxon } from "../src/lib/local-flora";
import { GENERIC_LAND_RULE, LAND_RULES, landRulesFor } from "../src/data/land-rules";
import { FLORA_RADIUS_KM, PRESENCE_BOX_KM, PRESENCE_FROM_YEAR } from "../src/lib/plant-presence-info";
import { HARVEST_RULES, bansOn, harvestNotesOn, ruleCovers } from "../src/data/harvest-bans";
import { HAZARDS, hazardHere, type Hazard } from "../src/data/hazards";
import { continentOfRegion, getSpecies, inRange, inSeasonAt, matchSpecies, speciesHere, writtenFor } from "../src/lib/species";
import type { Climate, Place } from "../src/lib/types";

type Entry = { place: Place; climate: Climate };
const TABLE = NORMALS as unknown as Entry[];
type Town = { total: number; dataPoor: boolean; species: Record<string, { n: number; byMonth: number[] }> };
const P = PRESENCE as unknown as { meta: { boxHalfKm: number; filters: string }; taxa: Record<string, unknown>; towns: Record<string, Town> };

const args = process.argv.slice(2);
const strict = args.includes("--require-complete");
const verbose = args.includes("--verbose");
const failures: string[] = [];
const warnings: string[] = [];
const fail = (m: string) => failures.push(m);
let checkedLists = 0;
let readyItems = 0;
let soonItems = 0;
let bannedItems = 0;
let textItems = 0;

// ------------------------------------------------ 9. what must not print outside its region (audit of 10 Nov 2026)
// Words and names written for one part of the world, by where they may print. Checked on every species listed at every
// town in every month, on every hazard card for every continent, and on old stored records shown through floraHere.
const NOT_OUTSIDE: { where: string; holds: (continent: string, cc?: string) => boolean; rx: RegExp }[] = [
  // The Cape's sour fig (audit of 10 Nov 2026, Day 4): its Afrikaans name, snakes, permit and range.
  { where: "Africa", holds: (c) => c === "africa", rx: /suurvy|CapeNature|puff adder|Cape cobra|vygie|Namaqualand|Western Cape|South Africa|Namibia|DFFE|morogo|maize fields|naboom|tickberry|syringa|braai|George district|Eastern Cape|KwaZulu|Choromytilus|Perna perna|African euphorbias|across Africa|southern Africa|tropical Africa|parts of Africa|rock mussels/i },
  { where: "Europe", holds: (c) => c === "europe", rx: /Brittany|Mattilsynet|Britain and the EU|Norway publishes|St George/i },
  { where: "North America", holds: (c) => c === "north-america", rx: /Newfoundland|Nunavik|\bBC\b|Pacific yew|Canada yew is|Midwest|Maine, New Hampshire|California|Alaska|Washington State|Minnesota|desert Southwest|American South|introduced from Europe|bakeapple|Lingonberry \(partridgeberry|partridgeberry pie|Skunk currant|rare in Canada|endangered in Canada|DFO/i },
  // Canada's own names and statuses, not in the United States ("partridgeberry" there is Mitchella repens, which the
  // wintergreen record names as its look-alike).
  { where: "Canada", holds: (c, cc) => c !== "north-america" || cc !== "US", rx: /bakeapple|Lingonberry \(partridgeberry|partridgeberry pie|rare in Canada|endangered in Canada|DFO lists/i },
];
const textFails = new Set<string>();
function checkText(what: string, text: string, continent: string, cc?: string) {
  textItems++;
  for (const r of NOT_OUTSIDE) {
    if (r.holds(continent, cc)) continue;
    const m = text.match(r.rx);
    if (m) {
      const key = `${what}|${m[0]}`;
      if (!textFails.has(key)) {
        textFails.add(key);
        fail(`${what} (${continent}${cc ? ", " + cc : ""}) prints "${m[0]}", which holds only in ${r.where}`);
      }
    }
  }
}
const speciesText = (s: Species) => [s.name, s.latin, s.habitat, s.identify, s.use, s.lookalikes, s.caution ?? ""].join(" | ");
const hazardText = (h: Hazard) => [h.name, h.confusedWith, h.tell, h.effect].join(" | ");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const circ = (m: number) => ((((m - 1) % 12) + 12) % 12) + 1;
const CURATED = new Set(SPECIES.map((s) => s.slug));

if (P.meta.boxHalfKm !== PRESENCE_BOX_KM) fail(`plant-presence-info says ${PRESENCE_BOX_KM} km but the table was built on ${P.meta.boxHalfKm} km`);
if (!P.meta.filters.includes(`year>=${PRESENCE_FROM_YEAR}`)) fail(`plant-presence-info says records from ${PRESENCE_FROM_YEAR} but the table's filters are "${P.meta.filters}"`);

// ------------------------------------------------------------ 1. and 2. per town, per month
const covered = TABLE.filter((e) => P.towns[e.place.slug]).length;
if (covered < TABLE.length) {
  (strict ? failures : warnings).push(`presence table covers ${covered} of ${TABLE.length} towns; the rest can show only the labelled regional list`);
}

for (const { place, climate } of TABLE) {
  const eco = classifyEcoregion(place.lat, place.lon) as { slug: string } | null;
  if (!eco) {
    fail(`${place.slug}: no ecoregion`);
    continue;
  }
  const town = P.towns[place.slug];
  const usable = !!town && !town.dataPoor;
  for (let month = 1; month <= 12; month++) {
    const opts = { place };
    const now = foragingNow(month, eco.slug, climate.zoneNumber, opts);
    const soon = foragingSoon(month, eco.slug, climate.zoneNumber, opts);
    checkedLists += 2;

    for (const [kind, g] of [["ready", now], ["coming", soon]] as const) {
      // The gate and the table agree on whether the town can be checked.
      if (!usable && g.checked.length > 0) fail(`${place.slug} ${MONTHS[month - 1]}: ${g.checked.length} species listed ${kind} though the town is ${town ? "dataPoor" : "not in the table"}`);
      if (usable && g.why !== "none") fail(`${place.slug} ${MONTHS[month - 1]}: usable town reported as regional (${g.why})`);
      if (!usable && g.why === "none") fail(`${place.slug} ${MONTHS[month - 1]}: unusable town reported as checked`);
      // Regional items are curated species and are never also "checked".
      const seen = new Set(g.checked.map((s) => s.slug));
      for (const s of g.regional) if (seen.has(s.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} in both the checked and the regional list`);
      if (g.why === "none" && g.regional.length > 0) fail(`${place.slug} ${MONTHS[month - 1]}: regional list on a checked town`);
      for (const s of [...g.checked, ...g.regional]) if (!CURATED.has(s.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} under a food heading is not a curated edible`);
    }

    // 6. A banned food is in no list, and is named with its ban.
    const continent = continentOfRegion(eco.slug);
    for (const [kind, g] of [["ready", now], ["coming", soon]] as const) {
      for (const s of [...g.checked, ...g.regional]) {
        const months = kind === "ready" ? [month] : [circ(month + 1), circ(month + 2)].filter((m) => s.months.includes(m));
        if (months.some((m) => bansOn(s.slug, place, m).length)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed ${kind} though a regulator bans it here`);
        checkText(`${place.slug} ${s.slug}`, speciesText(s), continent, place.countryCode);
      }
      for (const b of g.banned) {
        bannedItems++;
        if (!b.bans.length || b.bans.some((r) => !r.regulator || !/^https:\/\//.test(r.source.url) || !/^\d{4}-\d{2}-\d{2}$/.test(r.checked))) fail(`${place.slug} ${MONTHS[month - 1]}: ${b.species.slug} banned without a regulator, source and date`);
        checkText(`${place.slug} ${b.species.slug}`, speciesText(b.species), continent, place.countryCode);
      }
    }
    // Poison sumac in Canada grows only in southern Ontario and Quebec (NRCan factsheet 483).
    if (month === 9 && place.countryCode === "CA" && !["ON", "QC"].includes(place.admin1Code ?? "")) {
      for (const s of now.checked.concat(now.regional)) if (s.slug === "staghorn-sumac" && /grows in swamps/.test(s.lookalikes)) fail(`${place.slug}: staghorn sumac says poison sumac "grows in swamps" outside Ontario and Quebec`);
    }

    for (const s of now.checked) {
      readyItems++;
      const e = town?.species[s.slug];
      // Two records, not one (audit of 5 Nov 2026): in the box, and in the month. Written out here, not imported.
      if (!e || e.n < 2) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed ready with ${e?.n ?? 0} record(s) in the box`);
      else if ((e.byMonth[month - 1] ?? 0) < 2) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed ready with ${e.byMonth[month - 1] ?? 0} record(s) in ${MONTHS[month - 1]} (records by month ${e.byMonth.join(",")})`);
      if (!(s.slug in P.taxa)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed ready without a GBIF match`);
    }
    for (const s of soon.checked) {
      soonItems++;
      const e = town?.species[s.slug];
      if (!e || e.n < 2) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed coming with ${e?.n ?? 0} record(s) in the box`);
      else {
        const next = [circ(month + 1), circ(month + 2)].filter((m) => s.months.includes(m));
        if (!next.some((m) => (e.byMonth[m - 1] ?? 0) >= 2)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed coming with no record in ${next.map((m) => MONTHS[m - 1]).join("/") || "its months"}`);
      }
    }
    // Everything the library lists for the region either passes the gate or is held back; nothing is invented.
    const base = new Set(speciesNow(month, eco.slug, climate.zoneNumber, opts).map((s) => s.slug));
    for (const s of [...now.checked, ...now.regional]) if (!base.has(s.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} listed but not in the library's own list for the month`);
  }
}

// ------------------------------------------------ 2b. observed-only taxa never come through as foods
// The taxa the audit found under a food heading on the Ottawa page, plus a few more of the same kind.
const OBSERVED_ONLY: [string, string][] = [
  ["Apiosporina morbosa", "black knot"],
  ["Frangula alnus", "alder buckthorn"],
  ["Rhamnus cathartica", "common buckthorn"],
  ["Trametes gibbosa", "Lumpy Bracket"],
  ["Phlebia radiata", "Wrinkled Crust"],
  ["Merulius tremellosus", "Trembling Crust"],
  ["Phyllotopsis nidulans", "Stinking Orange Oyster"],
  ["Fomitopsis betulina", "birch polypore"],
  ["Dacrymyces chrysospermus", "Orange Jelly Spot"],
  ["Trametes versicolor", "turkey-tail"],
  ["Schizophyllum commune", "splitgill mushroom"],
  ["Ischnoderma resinosum", "Resinous Polypore"],
  ["Juglans cinerea", "Butternut"],
  ["Tsuga canadensis", "eastern hemlock"],
];
const photo = null;
const taxa: Taxon[] = OBSERVED_ONLY.map(([latin, common], i) => ({ id: 9_000_000 + i, group: "Plantae", latin, common, count: 20, wikipedia: null, photo }));
const finds = taxa.map(findForTaxon);
for (let month = 1; month <= 12; month++) {
  for (const region of ["great-lakes-st-lawrence", "pacific-maritime", "atlantic-europe", "cape-fynbos"]) {
    const known = knownAmong(finds, month, region);
    for (const f of known) fail(`observed-only taxon ${f.taxon.latin} came through as a food (${MONTHS[month - 1]}, ${region}) as ${f.species?.slug}`);
  }
}
for (const [latin, common] of OBSERVED_ONLY) {
  const hit = SPECIES.find((s: Species) => s.latin.toLowerCase().replace(/\s+spp?\.$/, "") === latin.toLowerCase());
  if (hit) fail(`the curated library holds ${hit.slug} (${latin}, ${common}), a taxon the audit found is not a food`);
}

// ------------------------------------------------------------------- 3. land rules, every town
const LAW_WORDS = /\b(act|by-?law|regulation|reg\.|statute|code|ordinance|legislation|illegal|prohibited|fine)\b/i;
if (LAW_WORDS.test(GENERIC_LAND_RULE)) fail(`the generic land line names a law or makes a legal claim: "${GENERIC_LAND_RULE}"`);
if (GENERIC_LAND_RULE !== "Whether you may pick depends on who owns or manages the land; parks and reserves often ban it. Ask the landowner or manager first.") fail("the generic land line is not the agreed sentence");
let withRules = 0;
let withGeneric = 0;
for (const { place } of TABLE) {
  const rules = landRulesFor(place);
  if (rules.length > 0) withRules++;
  else if (GENERIC_LAND_RULE.length > 0) withGeneric++;
  else fail(`${place.slug}: neither a loaded land rule nor the generic line`);
}
for (const r of LAND_RULES) {
  if (!/^https:\/\//.test(r.source.url) || !/^\d{4}-\d{2}-\d{2}$/.test(r.checked) || !r.rule || !r.title) fail(`land rule ${r.id} lacks a source url, a checked date, a title or a rule`);
}
const section = readFileSync(join(process.cwd(), "src/components/LocalFloraSections.tsx"), "utf8");
const renders = (section.match(/<LandRules place=\{place\} \/>/g) ?? []).length;
if (renders < 2) fail(`LocalFloraSections renders the land-rules block ${renders} time(s); it must appear on the live-record page and on the fallback page`);

// ------------------------------------------------------------------- 4. Ottawa
const ottawa = TABLE.find((e) => e.place.slug === "ottawa-ontario");
if (!ottawa) fail("ottawa-ontario is not in place-normals.json");
else {
  const eco = classifyEcoregion(ottawa.place.lat, ottawa.place.lon) as { slug: string };
  const ids = landRulesFor(ottawa.place).map((r) => r.id);
  for (const need of ["ncc", "city-of-ottawa-parks", "ontario-provincial-parks", "ontario-conservation-areas", "quebec-wild-leek"]) if (!ids.includes(need)) fail(`Ottawa lacks the land rule ${need}`);
  for (let month = 1; month <= 12; month++) {
    const n = foragingNow(month, eco.slug, ottawa.climate.zoneNumber, { place: ottawa.place });
    const s = foragingSoon(month, eco.slug, ottawa.climate.zoneNumber, { place: ottawa.place });
    for (const g of [n, s]) for (const sp of [...g.checked, ...g.regional]) if (sp.slug === "lingonberry") fail(`Ottawa ${MONTHS[month - 1]}: lingonberry is in a list`);
  }
  const nov = foragingNow(11, eco.slug, ottawa.climate.zoneNumber, { place: ottawa.place });
  for (const slug of ["hen-of-the-woods", "lions-mane"]) if (nov.checked.some((x) => x.slug === slug)) fail(`Ottawa November: ${slug} is ready`);
  if (nov.checked.length === 0) fail("Ottawa November: nothing ready at all (expected acorns, juniper berries and others)");
  for (const slug of ["acorn", "juniper-berries"]) if (!nov.checked.some((x) => x.slug === slug)) fail(`Ottawa November: ${slug} should be ready (records in the month) and is not`);
  // The weekly guide path: a stored guide that still lists the region's foods is cut back.
  const stored = { headline: "x", inSeasonNow: ["Acorns", "Hen of the woods (maitake)", "Highbush cranberry", "Juniper berries", "Lingonberry (partridgeberry)", "Lion's mane"].map((name) => ({ name })), comingSoon: [] as { name: string }[] };
  const gated = gateGuideForaging(stored, ottawa.place, 11);
  const kept = gated.inSeasonNow.map((i) => i.name);
  for (const bad of ["Hen of the woods (maitake)", "Lingonberry (partridgeberry)", "Lion's mane"]) if (kept.includes(bad)) fail(`stored guide gate kept ${bad} for Ottawa in November`);
  // A headline whose count is not the list's own is rewritten, even when the list itself passes (5 Nov 2026 audit).
  {
    const ok2 = gated.inSeasonNow;
    const miscount = gateGuideForaging({ headline: "Eight wild foods are ready to pick this week.", inSeasonNow: ok2, comingSoon: [] }, ottawa.place, 11);
    if (/eight/i.test(miscount.headline)) fail(`stored guide headline still says "${miscount.headline}" over ${ok2.length} foods`);
    const right = gateGuideForaging({ headline: `${ok2.length} wild foods to look for this week.`, inSeasonNow: ok2, comingSoon: [] }, ottawa.place, 11);
    if (right.headline !== `${ok2.length} wild foods to look for this week.`) fail(`stored guide headline with the right count was rewritten: ${right.headline}`);
  }
  if (verbose) {
    console.log(`Ottawa November ready (${nov.checked.length}): ${nov.checked.map((x) => x.name).join("; ")}`);
    console.log(`Ottawa November regional: ${nov.regional.length}; stored-guide gate kept: ${kept.join(", ") || "none"}`);
  }
}
if (!townOf({ slug: "ottawa-ontario" })) warnings.push("Ottawa is not in the presence table yet");

// ------------------------------------------------------------------- 5. butternut
// Day 5 audit (14 November 2026): the Ontario and Canada caution was printed at Grand Forks, where butternut does not
// grow (Silvics: west only to central Iowa and Minnesota), and at Madison, citing foreign law. Now the Canadian status
// is printed in Ontario, Quebec and New Brunswick, the US towns inside butternut's range get Silvics' "uncommon and
// declining", and elsewhere butternut is not named.
const textAt = (slug: string, sp: string) => {
  const e = TABLE.find((x) => x.place.slug === slug);
  if (!e) return null;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  const s = speciesHere(getSpecies(sp)!, eco.slug, e.place);
  return `${s.habitat} ${s.lookalikes} ${s.caution ?? ""}`;
};
const butternutAt = (slug: string) => {
  const e = TABLE.find((x) => x.place.slug === slug);
  if (!e) return null;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  const s = speciesHere(getSpecies("black-walnut")!, eco.slug, e.place);
  return `${s.lookalikes} ${s.caution ?? ""} ${s.habitat}`;
};
{
  const kingston = butternutAt("kingston-ontario");
  if (kingston !== null && (!kingston.includes("Endangered in Ontario and federally") || !kingston.includes("ontario.ca/page/butternut-species-risk"))) fail("Kingston: black walnut's caution does not carry butternut's Endangered status and the Ontario source");
  const madison = butternutAt("madison-wisconsin");
  if (madison !== null && (/Ontario|Canada/.test(madison) || !/uncommon and declining/.test(madison))) fail(`Madison: the butternut caution should be Silvics' "uncommon and declining", with no Ontario or Canadian law: ${madison}`);
  const gf = butternutAt("grand-forks-north-dakota");
  if (gf !== null && (/[Bb]utternut|river bottoms/.test(gf))) fail(`Grand Forks: butternut (outside its range) or "river bottoms" (black walnut planted) in: ${gf}`);
  const base = getSpecies("black-walnut")!;
  if (/Ontario|Canada|[Bb]utternut/.test(`${base.lookalikes} ${base.caution}`)) fail("black walnut's own text names butternut or Canadian law: it is printed wherever no local entry matches");
  // Habitat written for one shore: Newfoundland's barrens (lingonberry) and the Atlantic dunes (rose hips).
  for (const slug of ["fairbanks-alaska", "whitehorse-yukon", "saguenay-quebec", "yellowknife-northwest-territories"]) {
    const x = textAt(slug, "lingonberry");
    if (x && /Newfoundland/.test(x)) fail(`${slug}: lingonberry's Newfoundland habitat: ${x}`);
  }
  for (const s of SPECIES) if (s.slug === "rose-hips" && /dune/i.test(s.habitat)) fail("rose hips: coastal dunes in the habitat printed at every inland town");
}
if (!AT_RISK["juglans cinerea"]?.sources.some((s) => s.url === "https://ontario.ca/page/butternut-species-risk")) fail("AT_RISK lacks butternut and its Ontario source");
const facts = readFileSync(join(process.cwd(), "src/data/edible-facts.ts"), "utf8");
if (/butternut is endangered in ontario/i.test(facts) || /It is endangered in Ontario because/i.test(facts)) fail("edible-facts still says butternut is only 'endangered in Ontario'");
const risk = readFileSync(join(process.cwd(), "src/components/LocalFloraPanels.tsx"), "utf8");
if (!risk.includes("atRiskFor(t.latin)")) fail("the observed-taxon card does not look up the at-risk note");

// ------------------------------------------------------------------- 6. harvest bans
const town = (slug: string) => TABLE.find((e) => e.place.slug === slug);
for (const r of HARVEST_RULES) {
  if (!/^https:\/\//.test(r.source.url) || !/^\d{4}-\d{2}-\d{2}$/.test(r.checked) || !r.regulator || !r.rule || !r.scope.label) fail(`harvest rule ${r.id} lacks a source url, a reading date, a regulator, a rule or a scope`);
  for (const sl of r.species) if (!getSpecies(sl)) fail(`harvest rule ${r.id} names ${sl}, which is not in the library`);
}
const FUNDY = HARVEST_RULES.find((r) => r.id === "dfo-maritimes-bay-of-fundy-mussels");
const MARITIMES = HARVEST_RULES.find((r) => r.id === "dfo-maritimes-mussels");
if (!FUNDY?.ban || !FUNDY.rule.includes("Bay of Fundy is prohibited") || !FUNDY.source.url.includes("maritimes/invert-eng.html")) fail("the Bay of Fundy mussel ban is not loaded with DFO's wording and page");
const covers: [string, boolean, boolean][] = [
  // town, inside the Bay of Fundy ban, inside DFO Maritimes
  ["saint-john-new-brunswick", true, true],
  ["moncton-new-brunswick", true, true],
  ["halifax-nova-scotia", false, true],
  ["fredericton-new-brunswick", false, false],
  ["charlottetown-prince-edward-island", false, false],
  ["portland-maine", false, false],
];
for (const [slug, fundy, maritimes] of covers) {
  const e = town(slug);
  if (!e) {
    fail(`${slug} is not in place-normals.json`);
    continue;
  }
  if (FUNDY && ruleCovers(FUNDY, e.place) !== fundy) fail(`${slug}: the Bay of Fundy mussel ban ${fundy ? "does not cover" : "covers"} it`);
  if (MARITIMES && ruleCovers(MARITIMES, e.place) !== maritimes) fail(`${slug}: DFO Maritimes' mussel rule ${maritimes ? "does not cover" : "covers"} it`);
}
// Only those two towns of all 264 fall inside the Bay of Fundy outline.
const inFundy = TABLE.filter((e) => FUNDY && ruleCovers(FUNDY, e.place)).map((e) => e.place.slug);
if (inFundy.join(",") !== "moncton-new-brunswick,saint-john-new-brunswick" && inFundy.sort().join(",") !== "moncton-new-brunswick,saint-john-new-brunswick") fail(`the Bay of Fundy ban covers ${inFundy.join(", ")}`);
for (const slug of ["saint-john-new-brunswick", "moncton-new-brunswick"]) {
  const e = town(slug)!;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  for (let month = 1; month <= 12; month++) {
    const g = foragingNow(month, eco.slug, e.climate.zoneNumber, { place: e.place, coast: true });
    const listed = [...g.checked, ...g.regional].some((s) => s.slug === "mussels");
    if (listed) fail(`${slug} ${MONTHS[month - 1]}: mussels listed though DFO bans them in the Bay of Fundy`);
    if (speciesNow(month, eco.slug, e.climate.zoneNumber, { place: e.place, coast: true }).some((s) => s.slug === "mussels") && !g.banned.some((b) => b.species.slug === "mussels")) fail(`${slug} ${MONTHS[month - 1]}: mussels are not named as banned`);
  }
  // The stored weekly guide and the live panel drop them too.
  const gated = gateGuideForaging({ headline: "Mussels are in season.", inSeasonNow: [{ name: "Mussels (rock mussels)" }, { name: "Blue mussels" }], comingSoon: [] }, e.place, 11);
  if (gated.inSeasonNow.length) fail(`${slug}: the stored-guide gate kept ${gated.inSeasonNow.map((i) => i.name).join(", ")}`);
  const mussel: Taxon = { id: 1, group: "Plantae", latin: "Mytilus edulis", common: "blue mussel", count: 50, wikipedia: null, photo: null };
  if (knownAmong([findForTaxon(mussel)], 11, eco.slug, e.place).length) fail(`${slug}: the live panel lists mussels`);
}
{
  const e = town("halifax-nova-scotia")!;
  if (bansOn("mussels", e.place, 11).length) fail("Halifax: mussels banned, but the Bay of Fundy ban does not reach the Atlantic coast");
  if (!harvestNotesOn("mussels", e.place, 11).length) fail("Halifax: DFO Maritimes' mussel limit and closures are not loaded");
}

// ------------------------------------------- 7. the stored-guide gate keeps the library's season and region
const ALL_NAMES = SPECIES.map((s) => ({ name: s.name }));
for (const { place } of TABLE) {
  if (!P.towns[place.slug] || P.towns[place.slug].dataPoor) continue;
  const eco = classifyEcoregion(place.lat, place.lon) as { slug: string };
  for (let month = 1; month <= 12; month++) {
    const g = gateGuideForaging({ headline: "x", inSeasonNow: ALL_NAMES, comingSoon: ALL_NAMES }, place, month);
    for (const it of g.inSeasonNow) {
      const sp = matchSpecies(it.name)!;
      if (!inSeasonAt(sp, month, eco.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: stored-guide gate kept ${sp.slug} outside the library's season`);
      if (sp.regions !== "all" && !sp.regions.includes(eco.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: stored-guide gate kept ${sp.slug}, which the library does not give for ${eco.slug}`);
    }
    for (const it of g.comingSoon) {
      const sp = matchSpecies(it.name)!;
      if (inSeasonAt(sp, month, eco.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: stored-guide gate kept ${sp.slug} as coming though it is in season`);
    }
  }
}
for (const slug of ["fredericton-new-brunswick", "saint-john-new-brunswick", "halifax-nova-scotia"]) {
  const e = town(slug);
  if (!e) continue;
  const g = gateGuideForaging({ headline: "x", inSeasonNow: [{ name: "Staghorn sumac" }, { name: "Beechnuts" }], comingSoon: [] }, e.place, 11);
  if (g.inSeasonNow.length) fail(`${slug} November: the stored-guide gate kept ${g.inSeasonNow.map((i) => i.name).join(", ")} (library seasons Aug-Oct and Sep-Oct)`);
}

// --------------------------------------- 8. the weekly headline and the live panel agree (two records each)
// "nothing", "none" or "not checked" (plant-presence NOTHING_HERE) never stands over a panel of recorded foods.
const CONTRADICTION = NOTHING_HERE;
let untabled = 0;
for (const { place } of TABLE) {
  if (P.towns[place.slug] && !P.towns[place.slug].dataPoor) continue;
  untabled++;
  const g = gateGuideForaging({ headline: "Six wild foods are ready.", inSeasonNow: [{ name: "Acorns" }], comingSoon: [] }, place, 11);
  if (CONTRADICTION.test(g.headline)) fail(`${place.slug}: the weekly headline still says "${g.headline}" over a panel that lists recorded foods`);
  if (!g.headline.includes(`${FLORA_RADIUS_KM} km`)) fail(`${place.slug}: the unchecked headline does not point to the ${FLORA_RADIUS_KM} km records`);
}
for (const slug of ["boston-massachusetts", "new-york-new-york", "atlanta-georgia", "savannah-georgia"]) {
  const e = town(slug);
  if (!e) continue;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  const counts: Record<string, number> = {};
  const lib = speciesNow(11, eco.slug, e.climate.zoneNumber, { place: e.place });
  // Two in-season foods with 2+ records, one with a single record, and two out of season with plenty.
  if (lib[0]) counts[lib[0].slug] = 41;
  if (lib[1]) counts[lib[1].slug] = 2;
  if (lib[2]) counts[lib[2].slug] = 1;
  counts["staghorn-sumac"] = 9;
  counts["beechnut"] = 6;
  const names = [...lib.slice(0, 3), getSpecies("staghorn-sumac")!, getSpecies("beechnut")!].map((s) => ({ name: s.name }));
  const g = gateGuideForaging({ headline: "Five wild foods are ready.", inSeasonNow: names, comingSoon: [] }, e.place, 11, { month: 11, counts });
  const kept = g.inSeasonNow.map((i) => matchSpecies(i.name)!.slug);
  const want = Object.entries(counts)
    .filter(([sl, c]) => c >= 2 && inSeasonAt(getSpecies(sl)!, 11, eco.slug) && (getSpecies(sl)!.regions === "all" || (getSpecies(sl)!.regions as string[]).includes(eco.slug)))
    .map(([sl]) => sl);
  if (kept.sort().join(",") !== want.sort().join(",")) fail(`${slug} November with the panel's evidence: the gate kept [${kept.join(", ")}], expected [${want.join(", ")}]`);
  if (!headlineCountsOk(g.headline, kept.length)) fail(`${slug}: the headline "${g.headline}" does not count the ${kept.length} kept`);
  if (CONTRADICTION.test(g.headline)) fail(`${slug}: the headline contradicts the panel: "${g.headline}"`);
  // The panel itself: a single record is not enough.
  const finds = lib.slice(0, 3).map((s, i) => findForTaxon({ id: i + 1, group: "Plantae", latin: s.latin, common: s.name, count: counts[s.slug] ?? 0, wikipedia: null, photo: null }));
  for (const f of knownAmong(finds, 11, eco.slug, e.place)) if (f.taxon.count < 2) fail(`${slug}: the live panel lists ${f.species?.slug} on ${f.taxon.count} record`);
}
function headlineCountsOk(h: string, n: number): boolean {
  if (n === 0) return /^None of/.test(h);
  return new RegExp(`^${n} wild food`).test(h);
}

// --------------------------------------- 9. hazard text by continent, and records stored before it was scoped
for (const h of HAZARDS) {
  for (const continent of ["north-america", "europe", "africa"]) {
    const here = hazardHere(h, continent);
    if (!here) fail(`hazard ${h.latin} does not resolve`);
    else checkText(`hazard ${h.latin}`, hazardText(here), continent);
  }
}
{
  // An old record: the hazard objects as they were stored before 5 November (Africa text in "Mistaken for", Africa
  // names), and the old mussel species object. Shown at Boston it must lose all of it; at Cape Town keep the Africa text.
  const old = (latin: string, name: string, extra: string): Hazard => ({ ...HAZARDS.find((h) => h.latin === latin)!, name, confusedWith: `${HAZARDS.find((h) => h.latin === latin)!.confusedWith} ${extra}` });
  const oldHazards = [
    old("Euphorbia", "Euphorbias (milk bushes, naboom, pencil tree)", "Many African euphorbias are spiny, leafless succulents that look exactly like cacti."),
    old("Melia azedarach", "Chinaberry (syringa)", "It has run wild in South Africa, where it is called syringa."),
    old("Lantana camara", "Lantana (tickberry)", "It smothers forest edges across East and southern Africa."),
    old("Datura", "Thorn apple (Datura)", "In southern and East Africa it grows among amaranth (morogo) in maize fields."),
    old("Senecio", "Ragworts and groundsels (Senecio)", "Senecio in home-grown wheat flour poisoned whole families in South Africa's George district in 1918."),
    old("Ricinus communis", "Castor oil plant", "It is a common weed across Africa."),
  ];
  const oldMussels = { ...getSpecies("mussels")!, local: undefined };
  const oldRecord: LocalFlora = {
    known: [{ taxon: { id: 1, group: "Plantae", latin: "Quercus rubra", common: "red oak", count: 30, wikipedia: null, photo: null }, species: getSpecies("acorn") ?? null, hazard: null }],
    alsoFungi: [],
    alsoPlants: [],
    comingSoon: [oldMussels],
    hazards: oldHazards.map((hazard) => ({ hazard, count: 3 })),
    trees: [],
    recorded: 200,
    live: true,
  };
  for (const [slug, continent, cc] of [["boston-massachusetts", "north-america", "US"], ["new-york-new-york", "north-america", "US"], ["cape-town-south-africa", "africa", "ZA"]] as const) {
    const e = town(slug);
    if (!e) continue;
    const shown = floraHere(oldRecord, e.place, 11);
    if (shown.hazards.length !== oldHazards.length) fail(`${slug}: floraHere lost hazard cards (${shown.hazards.length} of ${oldHazards.length})`);
    for (const { hazard } of shown.hazards) checkText(`${slug} stored hazard ${hazard.latin}`, hazardText(hazard), continent, cc);
    for (const s of shown.comingSoon) checkText(`${slug} stored ${s.slug}`, speciesText(s), continent, cc);
    for (const f of shown.known) checkText(`${slug} stored ${f.species?.slug}`, speciesText(f.species!), continent, cc);
    if (continent === "africa" && !shown.hazards.some((x) => x.hazard.name.includes("naboom"))) fail(`${slug}: the Africa name of the euphorbias is not shown in Africa`);
  }
}
// Saint John's mussels, before the ban took them out, printed South African names: the text for Canada has none.
{
  const e = town("saint-john-new-brunswick")!;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  const m = foragingNow(11, eco.slug, e.climate.zoneNumber, { place: e.place, coast: true }).banned.find((b) => b.species.slug === "mussels")?.species;
  if (!m || m.latin !== "Mytilus spp." || /Mediterranean|Choromytilus|Perna/.test(speciesText(m))) fail(`Saint John: mussels print "${m?.latin}" / "${m?.identify}"`);
}

// ----------------------------------------------------------------------- 10. labels
const panels = readFileSync(join(process.cwd(), "src/components/LocalFloraPanels.tsx"), "utf8");
if (/within (about )?40 km this month|within about 40 km/.test(panels)) fail("LocalFloraPanels still prints a 40 km count as 'this month' or 'about 40 km'");
if (!panels.includes("all years on record") || !panels.includes("FLORA_RADIUS_KM") || !panels.includes("GBIF records since {PRESENCE_FROM_YEAR} within about {PRESENCE_BOX_KM} km")) fail("LocalFloraPanels does not say its counts cover every year, or that the in-season lists count differently");
const floraSrc = readFileSync(join(process.cwd(), "src/lib/local-flora.ts"), "utf8");
if (!floraSrc.includes("radius=${FLORA_RADIUS_KM}")) fail("local-flora's observation search does not use FLORA_RADIUS_KM, the radius the labels print");
if (!section.includes("floraHere(")) fail("LocalFloraSections does not apply floraHere to the stored record");
const seasonal = readFileSync(join(process.cwd(), "src/components/SeasonalForaging.tsx"), "utf8");
for (const m of seasonal.matchAll(/within about \{?\$?\{?PRESENCE_BOX_KM\}? km[\s\S]{0,200}/g)) if (!/GBIF/.test(m[0])) fail(`SeasonalForaging prints a ${PRESENCE_BOX_KM} km radius without its source: "${m[0].slice(0, 80)}"`);

// ------------------------------- 11. the headline over the panel, on the stored records (audit of 11 Nov 2026)
// The stored flora records in the live store's backup are the panel's evidence (local-flora floraEvidence reads them
// the same way, through floraHere). The audit's stored headlines, over lists the gate had already emptied, must come out
// saying what the panel shows.
const BACKUP = "/home/claude/rebuild/blobs-guides.jsonl";
const storedFlora = new Map<string, LocalFlora>();
if (existsSync(BACKUP)) {
  for (const line of readFileSync(BACKUP, "utf8").split("\n")) {
    if (!line.startsWith('{"k":"rec:v1:flora:')) continue;
    try {
      const o = JSON.parse(line) as { k: string; v: unknown };
      const v = (typeof o.v === "string" ? JSON.parse(o.v) : o.v) as { value?: { value?: LocalFlora } };
      if (v.value?.value?.known) storedFlora.set(o.k.slice("rec:v1:flora:".length), v.value.value);
    } catch {}
  }
} else warnings.push(`no backup at ${BACKUP}: the headline-over-panel check ran on the pins only`);
const evidenceOf = (place: Place, month: number): LiveEvidence | null => {
  const r = storedFlora.get(floraId(place.lat, place.lon, month));
  if (!r?.live) return null;
  return { month, counts: Object.fromEntries(floraHere(r, place, month).known.map((f) => [f.species!.slug, f.taxon.count])) };
};
const AUDIT_HEADLINES = (name: string) => [
  "Not checked against local observations: this place is not one we have checked, so no wild food is listed as in season.",
  `Fall foraging: nothing has been recorded near ${name} this month`,
  `Fall foraging: nothing has been recorded in season near ${name} this month`,
  "Acorns and rose hips are the finds this week.",
];
let headlineRecords = 0;
let headlinePanels = 0;
for (const { place } of TABLE) {
  const untabledHere = !P.towns[place.slug] || P.towns[place.slug].dataPoor;
  for (const month of [9, 10, 11]) {
    const ev = evidenceOf(place, month);
    if (!ev) continue;
    headlineRecords++;
    const k = liveFoods(ev).length;
    if (k) headlinePanels++;
    // The panel itself lists only foods with two records or more (the two-records rule).
    if (Object.values(ev.counts).some((c) => c < 2)) fail(`${place.slug} ${MONTHS[month - 1]}: the panel lists a food on a single record`);
    for (const h of AUDIT_HEADLINES(place.name)) {
      const g = gateGuideForaging({ headline: h, inSeasonNow: [], comingSoon: [] }, place, month, ev);
      if (g.headline.length > HEADLINE_MAX) fail(`${place.slug} ${MONTHS[month - 1]}: the gate's headline runs to ${g.headline.length} characters, past the ${HEADLINE_MAX} the guide check keeps: "${g.headline}"`);
      if (k && NOTHING_HERE.test(g.headline)) fail(`${place.slug} ${MONTHS[month - 1]}: the headline "${g.headline}" stands over a panel of ${k} foods with two or more records`);
      // A stored "nothing" or "not checked" headline is rewritten from the panel; a headline that says neither stands.
      // A town in the presence table counts its table's foods instead, so only the "never nothing" rule holds there.
      if (!untabledHere || !NOTHING_HERE.test(h)) continue;
      if (k && !g.headline.startsWith(`${k} wild food`)) fail(`${place.slug} ${MONTHS[month - 1]}: the headline "${g.headline}" does not count the panel's ${k} foods`);
      if (!k && !/^None of/.test(g.headline)) fail(`${place.slug} ${MONTHS[month - 1]}: no food on the panel, yet the headline is "${g.headline}"`);
    }
    // The rules guide's sentence for a place the table cannot speak for is the gate's own.
    if (untabledHere && k && NOTHING_HERE.test(liveForagingHeadline(ev, month))) fail(`${place.slug} ${MONTHS[month - 1]}: the rules headline says nothing is there over ${k} foods`);
  }
}
// Pins: the audit's towns, given a panel of nine November foods, and with no evidence at all.
for (const slug of ["asheville-north-carolina", "pittsburgh-pennsylvania", "st-louis-missouri", "nashville-tennessee", "columbus-ohio", "indianapolis-indiana"]) {
  const e = town(slug);
  if (!e) {
    fail(`${slug} is not in place-normals.json`);
    continue;
  }
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  const nine = speciesNow(11, eco.slug, e.climate.zoneNumber, { place: e.place }).slice(0, 9);
  const ev: LiveEvidence = { month: 11, counts: Object.fromEntries(nine.map((s, i) => [s.slug, 40 - i * 4])) };
  for (const h of AUDIT_HEADLINES(e.place.name).filter((x) => NOTHING_HERE.test(x))) {
    const g = gateGuideForaging({ headline: h, inSeasonNow: [], comingSoon: [] }, e.place, 11, ev);
    const want = `${nine.length} wild foods in the guide have two or more records within ${FLORA_RADIUS_KM} km in November (iNaturalist, all years); the foraging page lists them.`;
    if (g.headline !== want) fail(`${slug} November, stored "${h.slice(0, 40)}…": the headline is "${g.headline}", expected "${want}"`);
    const none = gateGuideForaging({ headline: h, inSeasonNow: [], comingSoon: [] }, e.place, 11, null);
    if (NOTHING_HERE.test(none.headline) || !none.headline.includes(`${FLORA_RADIUS_KM} km`)) fail(`${slug} November with no evidence: "${none.headline}"`);
  }
}
// Every sentence the gate and the rules guide can write for an unchecked place fits the 140 characters, in every month.
for (let month = 1; month <= 12; month++) {
  const many: LiveEvidence = { month, counts: Object.fromEntries(SPECIES.slice(0, 19).map((s) => [s.slug, 5])) };
  for (const h of [liveForagingHeadline(null, month), liveForagingHeadline(many, month), liveForagingHeadline(many, month, 19), liveForagingHeadline({ month, counts: {} }, month)])
    if (h.length > HEADLINE_MAX || NOTHING_HERE.test(h) !== h.startsWith("None of")) fail(`${MONTHS[month - 1]}: the unchecked-place headline "${h}" (${h.length} characters)`);
}
{
  // The code only, not the comments that quote what the audit found.
  const rules = readFileSync(join(process.cwd(), "src/lib/guide-rules.ts"), "utf8")
    .split("\n")
    .filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l))
    .join("\n");
  if (/Not checked against local observations|so no wild food is listed as in season/.test(rules)) fail("guide-rules still writes the 'Not checked … no wild food is listed as in season' headline");
  if (!/why !== "none"\) return `\$\{liveForagingHeadline\(live, d\.month\)\}/.test(rules)) fail("guide-rules' foraging headline for an unchecked place is not the gate's liveForagingHeadline");
  const panel = readFileSync(join(process.cwd(), "src/components/LocalFloraPanels.tsx"), "utf8");
  if (!panel.includes("flora.known.slice(9)")) fail("the live panel shows nine cards and does not name the rest, though the headline counts them all");
}

// ------------------------------------------- 12. published native ranges (audit of 11 Nov 2026)
let rangeChecks = 0;
let leftOut = 0;
const RANGE_SOURCES = (SPECIES_JSON as unknown as { sources: { changes?: { slug: string; field: string; source: string }[] }[] }).sources.flatMap((s) => s.changes ?? []).filter((c) => c.field === "range");
for (const s of SPECIES) {
  if (!s.range) continue;
  for (const r of Object.keys(s.range)) if (s.regions === "all" || !s.regions.includes(r)) fail(`${s.slug}: a range for ${r}, which the record does not list`);
  if (!RANGE_SOURCES.some((c) => c.slug === s.slug && /https:\/\//.test(c.source) && /read 2026-\d\d-\d\d/.test(c.source))) fail(`${s.slug}: a range with no source and reading date in species.json sources`);
}
for (const { place, climate } of TABLE) {
  const eco = classifyEcoregion(place.lat, place.lon) as { slug: string } | null;
  if (!eco) continue;
  for (let month = 1; month <= 12; month++) {
    for (const g of [foragingNow(month, eco.slug, climate.zoneNumber, { place }), foragingSoon(month, eco.slug, climate.zoneNumber, { place })]) {
      rangeChecks++;
      leftOut += g.outOfRange.length;
      for (const s of g.regional) if (!inRange(getSpecies(s.slug)!, eco.slug, place)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} on the regional list outside its published range`);
      for (const s of g.outOfRange) if (g.checked.some((c) => c.slug === s.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: ${s.slug} both checked and out of range`);
    }
  }
}
const regionalAnyMonth = (slug: string, sp: string) => {
  const e = town(slug);
  if (!e) return null;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  return Array.from({ length: 12 }, (_, i) => foragingNow(i + 1, eco.slug, e.climate.zoneNumber, { place: e.place })).some((g) => g.regional.some((s) => s.slug === sp));
};
for (const slug of ["columbus-ohio", "indianapolis-indiana", "nashville-tennessee", "atlanta-georgia", "charlotte-north-carolina", "raleigh-north-carolina", "jacksonville-florida", "savannah-georgia"]) {
  if (regionalAnyMonth(slug, "pecan")) fail(`${slug}: pecans on the regional list, beyond the native range (Silvics: east to western Tennessee)`);
}
if (regionalAnyMonth("st-louis-missouri", "pecan") === false) fail("St. Louis: pecans left off the regional list, inside the native range");
for (const slug of ["boston-massachusetts", "columbus-ohio", "indianapolis-indiana"]) if (regionalAnyMonth(slug, "persimmon")) fail(`${slug}: persimmon on the regional list beyond its range (Silvics)`);
for (const slug of ["boston-massachusetts", "jacksonville-florida"]) if (regionalAnyMonth(slug, "black-walnut")) fail(`${slug}: black walnut on the regional list beyond its range (Seed Manual)`);
// Day 5 audit (14 November 2026): pinyon, pawpaw and staghorn sumac had no range and passed everywhere (FEIS).
for (const slug of ["kelowna-british-columbia", "spokane-washington", "bozeman-montana", "laramie-wyoming"]) if (regionalAnyMonth(slug, "pinyon")) fail(`${slug}: pinyon on the regional list, outside its range (FEIS)`);
for (const slug of ["kingston-ontario", "albany-new-york"]) if (regionalAnyMonth(slug, "pawpaw")) fail(`${slug}: pawpaw on the regional list, outside its range (FEIS)`);
for (const slug of ["kelowna-british-columbia", "spokane-washington"]) if (regionalAnyMonth(slug, "miners-lettuce")) fail(`${slug}: miner's lettuce on the regional list with the winter-wet coast's December to May season`);
for (const [slug, sp, inside] of [
  ["albuquerque-new-mexico", "pinyon", true],
  ["denver-colorado", "pinyon", true],
  ["kelowna-british-columbia", "pinyon", false],
  ["spokane-washington", "pinyon", false],
  ["grand-rapids-michigan", "pawpaw", true],
  ["niagara-on-the-lake-ontario", "pawpaw", true],
  ["kingston-ontario", "pawpaw", false],
  ["albany-new-york", "pawpaw", false],
  ["toronto-ontario", "staghorn-sumac", true],
  ["minneapolis-minnesota", "staghorn-sumac", true],
  ["kelowna-british-columbia", "staghorn-sumac", false],
  ["vancouver-british-columbia", "staghorn-sumac", false],
  ["spokane-washington", "staghorn-sumac", false],
  ["portland-oregon", "staghorn-sumac", false],
  ["seattle-washington", "staghorn-sumac", false],
  ["regina-saskatchewan", "black-walnut", false],
  ["denver-colorado", "black-walnut", false],
  ["omaha-nebraska", "black-walnut", true],
  ["montreal-quebec", "sassafras", false],
  ["toronto-ontario", "sassafras", true],
  ["houston-texas", "sassafras", true],
  ["brownsville-texas", "sassafras", false],
  ["brownsville-texas", "persimmon", false],
  ["brownsville-texas", "beechnut", false],
  ["houston-texas", "persimmon", true],
  ["minneapolis-minnesota", "beechnut", false],
  ["jacksonville-florida", "hickory-nut", false],
  ["savannah-georgia", "hickory-nut", true],
  ["new-york-new-york", "persimmon", true],
  ["pittsburgh-pennsylvania", "persimmon", true],
] as const) {
  const e = town(slug);
  if (!e) continue;
  const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
  if (inRange(getSpecies(sp)!, eco.slug, e.place) !== inside) fail(`${slug}: ${sp} ${inside ? "falls outside" : "falls inside"} its published range`);
}
// A range never overrules a town's own records: Montreal's September list keeps black walnut, recorded there.
{
  const e = town("montreal-quebec");
  if (e && P.towns["montreal-quebec"] && (P.towns["montreal-quebec"].species["black-walnut"]?.byMonth[8] ?? 0) >= 2) {
    const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
    if (!foragingNow(9, eco.slug, e.climate.zoneNumber, { place: e.place }).checked.some((s) => s.slug === "black-walnut")) fail("Montreal September: black walnut, recorded there, was dropped by its range");
  }
}

// ------------------------------------------- 13. Brownsville's regional list and its label (audit of 11 Nov 2026)
{
  const e = town("brownsville-texas");
  if (e) {
    const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
    const nov = foragingNow(11, eco.slug, e.climate.zoneNumber, { place: e.place });
    if (nov.why === "none") warnings.push("Brownsville is now in the presence table: its list is checked, not regional");
    for (const sp of ["pecan", "persimmon", "beechnut", "sassafras", "pawpaw", "spicebush"]) if (nov.regional.some((s) => s.slug === sp)) fail(`Brownsville November: ${sp} on the regional list`);
    if (verbose) console.log(`Brownsville November regional: ${nov.regional.map((s) => s.slug).join(", ")}; out of range: ${nov.outOfRange.map((s) => s.slug).join(", ") || "none"}`);
  }
  if (!/kept to the hardiness zone here and to \$\{range\}/.test(seasonal) || !seasonal.includes("region.examples") || !seasonal.includes("left out here")) fail("SeasonalForaging's regional label does not say how the list is narrowed at the place, what the ranges left out, and how wide the region is");
}

// ------------------------------------------- 14. taxon matching in the live panel (audit of 11 Nov 2026)
{
  const t = (latin: string, count: number, id: number): Taxon => ({ id, group: "Fungi", latin, common: null as unknown as string, count, wikipedia: null, photo: null });
  for (const latin of ["Hericium coralloides", "Hericium americanum", "Hericium abietis", "Hericium"]) {
    const f = findForTaxon(t(latin, 4, 1));
    if (f.species?.slug === "lions-mane") fail(`${latin} is counted as lion's mane (Hericium erinaceus)`);
  }
  if (findForTaxon(t("Hericium erinaceus", 1, 2)).species?.slug !== "lions-mane") fail("Hericium erinaceus does not match lion's mane");
  // Houston, November: one lion's mane record and four comb tooth are not two records of lion's mane.
  const h = town("houston-texas");
  if (h) {
    const eco = classifyEcoregion(h.place.lat, h.place.lon) as { slug: string };
    const known = knownAmong([findForTaxon(t("Hericium erinaceus", 1, 3)), findForTaxon(t("Hericium coralloides", 4, 4))], 11, eco.slug, h.place);
    if (known.some((f) => f.species?.slug === "lions-mane")) fail("Houston November: lion's mane listed on one record plus another Hericium's");
  }
  // Every record written for one species matches that species only: a congener never comes through as it.
  for (const s of SPECIES) {
    const l = s.latin.replace(/\s+(spp?\.|sp\.)$/i, "").trim();
    if (!/\s/.test(l)) continue;
    const congener = `${l.split(/\s+/)[0]} zzcongener`;
    if (findForTaxon(t(congener, 3, 5)).species?.slug === s.slug) fail(`${s.slug} (${s.latin}) is matched by another species of its genus`);
  }
}

// ------------------------------- 15. the live panel prints only text written for the place (audit of 10 Nov 2026, Day 4)
// "Sour fig (suurvy)" at Santa Barbara and San Diego carried the Cape's name, habitat, puff adders, CapeNature permit and
// southern-summer months. Every library species, fed to the panel's selection at every town in every month with plenty of
// records, comes through only where its record is written for the place (writtenFor: listed region, or one on the same
// continent and in the same hemisphere), with text that passes the region-text rules (9).
let panelTextChecks = 0;
{
  const fake = (s: Species, count: number, id: number): Taxon | null => {
    const l = s.latin.replace(/\s+(spp?\.|sp\.)$/i, "").trim();
    if (/,/.test(l)) return null; // mussels: three names in one record, and animals, which the panel never fetches
    const latin = /\s/.test(l) ? l : `${l} zzexample`;
    return { id, group: s.kind === "mushroom" ? "Fungi" : "Plantae", latin, common: null, count, wikipedia: null, photo: null };
  };
  const SOUTH = new Set(["southern-savanna", "highveld-drakensberg", "namib-karoo", "cape-fynbos", "madagascar-islands"]);
  for (const { place } of TABLE) {
    const eco = classifyEcoregion(place.lat, place.lon) as { slug: string } | null;
    if (!eco) continue;
    const continent = continentOfRegion(eco.slug);
    const finds = SPECIES.map((s, i) => fake(s, 30, 8_000_000 + i))
      .filter((t): t is Taxon => !!t)
      .map(findForTaxon);
    for (let month = 1; month <= 12; month++) {
      for (const f of knownAmong(finds, month, eco.slug, place)) {
        panelTextChecks++;
        const lib = getSpecies(f.species!.slug)!;
        if (!writtenFor(lib, eco.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: the panel lists ${lib.slug}, whose record is written for ${(lib.regions as string[]).join(", ")}`);
        // Written out here, not imported: a listed region, or one on the same continent and side of the equator.
        if (lib.regions !== "all" && !lib.regions.includes(eco.slug) && !lib.regions.some((r) => continentOfRegion(r) === continent && SOUTH.has(r) === SOUTH.has(eco.slug)))
          fail(`${place.slug} ${MONTHS[month - 1]}: the panel lists ${lib.slug}, written for another continent or across the equator`);
        checkText(`${place.slug} panel ${lib.slug}`, speciesText(f.species!), continent, place.countryCode);
      }
    }
  }
  // Pins: the audit's two towns, every month, with the audit's record counts; and an old stored record that still lists it.
  for (const [slug, n] of [["santa-barbara-california", 16], ["san-diego-california", 35]] as const) {
    const e = town(slug);
    if (!e) {
      fail(`${slug} is not in place-normals.json`);
      continue;
    }
    const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
    const fig: Taxon = { id: 77_001, group: "Plantae", latin: "Carpobrotus edulis", common: "Hottentot-fig", count: n, wikipedia: null, photo: null };
    for (let month = 1; month <= 12; month++) if (knownAmong([findForTaxon(fig)], month, eco.slug, e.place).length) fail(`${slug} ${MONTHS[month - 1]}: the panel lists the Cape's sour fig`);
    // The record as an old store holds it: the species object written before the Cape's species were parked
    // (src/lib/scope.ts), so it is read from the whole library, not the served one.
    const sourFig = ALL_SPECIES.find((x) => x.slug === "sour-fig")!;
    const old: LocalFlora = { known: [{ taxon: fig, species: sourFig, hazard: null }], alsoFungi: [], alsoPlants: [], comingSoon: [sourFig], hazards: [], trees: [], recorded: 200, live: true };
    const shown = floraHere(old, e.place, 11);
    if (shown.known.length || shown.comingSoon.length) fail(`${slug}: a stored record still shows the Cape's sour fig as a food`);
    if (!shown.alsoPlants.some((f) => f.taxon.id === fig.id && f.taxon.count === n)) fail(`${slug}: the stored sour-fig records are not named and counted with the other species`);
  }
  {
    const ct = town("cape-town-south-africa");
    if (ct) {
      const eco = classifyEcoregion(ct.place.lat, ct.place.lon) as { slug: string };
      const fig: Taxon = { id: 77_002, group: "Plantae", latin: "Carpobrotus edulis", common: "sour fig", count: 40, wikipedia: null, photo: null };
      if (!knownAmong([findForTaxon(fig)], 1, eco.slug, ct.place).length) fail("Cape Town January: the sour fig, written for the Cape, is not on the panel");
    }
  }
  // Every stored record, as it is shown now: the panel's foods and the coming list are written for the place.
  for (const { place } of TABLE) {
    const eco = classifyEcoregion(place.lat, place.lon) as { slug: string } | null;
    if (!eco) continue;
    for (const month of [9, 10, 11]) {
      const r = storedFlora.get(floraId(place.lat, place.lon, month));
      if (!r?.live) continue;
      const shown = floraHere(r, place, month);
      for (const s of [...shown.known.map((f) => f.species!), ...shown.comingSoon]) {
        panelTextChecks++;
        if (!writtenFor(getSpecies(s.slug)!, eco.slug)) fail(`${place.slug} ${MONTHS[month - 1]}: the stored record shows ${s.slug}, not written for ${eco.slug}`);
        checkText(`${place.slug} stored panel ${s.slug}`, speciesText(s), continentOfRegion(eco.slug), place.countryCode);
      }
    }
  }
}

// ------------------------------- 16. what the panel's records are records of (audit of 10 Nov 2026, Day 4)
// "Acorns: 206 records within 40 km this month" at Orlando counted oak trees. Every entry matched at genus level names
// what its records are; every nut, fruit, berry, root or tree entry says its records are of the plant.
{
  for (const s of SPECIES) {
    const l = s.latin.replace(/\s+(spp?\.|sp\.)$/i, "").trim();
    if (/,/.test(l)) continue;
    const genusLevel = !/\s/.test(l);
    if (genusLevel && !s.recordOf) fail(`${s.slug} (${s.latin}) is matched at genus level and does not say what its records are of (recordOf)`);
    const t: Taxon = { id: 1, group: s.kind === "mushroom" ? "Fungi" : "Plantae", latin: genusLevel ? `${l} zzexample` : l, common: null, count: 5, wikipedia: null, photo: null };
    const of = recordedAs(findForTaxon(t));
    if ((genusLevel || ["nut", "fruit", "berry", "root", "tree"].includes(s.kind)) && !of) fail(`${s.slug}: the panel's count does not say what was recorded`);
    if (of && of.toLowerCase() === s.name.toLowerCase()) fail(`${s.slug}: the records are said to be of "${of}", the food's own name`);
  }
  const orl = town("orlando-florida");
  if (orl) {
    const eco = classifyEcoregion(orl.place.lat, orl.place.lon) as { slug: string };
    const oaks = [["Quercus virginiana", 120], ["Quercus laurifolia", 50], ["Quercus nigra", 36]] as const;
    const known = knownAmong(oaks.map(([latin, count], i) => findForTaxon({ id: 60 + i, group: "Plantae", latin, common: null, count, wikipedia: null, photo: null })), 11, eco.slug, orl.place);
    const acorns = known.find((f) => f.species?.slug === "acorn");
    if (!acorns || acorns.taxon.count !== 206 || recordedAs(acorns) !== "oak trees (Quercus, all species)") fail(`Orlando November: acorns read "${acorns ? `${acorns.taxon.count} records of ${recordedAs(acorns)}` : "missing"}", expected 206 records of oak trees (Quercus, all species)`);
  }
  if (/\{find\.taxon\.count\} record\{plural\(find\.taxon\.count\)\}\s*within/.test(panels) || !panels.includes("recordedAs(find)")) fail("the panel's card still prints its count without saying what the records are of");
}

// ------------------------------- 17. rosary pea: the per-seed risk as the toxicology source gives it (Day 4)
{
  const rp = HAZARDS.find((h) => h.latin === "Abrus precatorius");
  const src = readFileSync(join(process.cwd(), "src/data/hazards.ts"), "utf8");
  if (!rp) fail("rosary pea is not on the hazard roster");
  else {
    if (/single seed, well chewed, can kill an adult|far more potent/i.test(rp.effect)) fail(`rosary pea still says "${rp.effect}"`);
    if (!/one seed holds enough to poison an adult severely, and one or two can kill a child/.test(rp.effect) || !/swallowed whole/.test(rp.effect)) fail("rosary pea's effect is not BfR's per-seed wording");
  }
  if (!src.includes("https://www.bfr.bund.de/cm/349/jequirity-bean-castor-oil-plant-and-co-exotic-souvenirs-can-contain-poisonous-plant-seeds.pdf")) fail("hazards.ts does not cite the BfR source for the rosary pea's per-seed risk");
}

// ------------------------------- 18. trees outside their native range, on the panel and the checked list (Day 4)
// "Wild pecans" at Sacramento on 6 records: the records stand (a town's records are not overruled by a range map), and
// both the panel and a checked list say the trees are likely planted. The whole-range boxes (nativeBounds) cover regions
// the record does not list.
let plantedNotes = 0;
{
  // Day 5 audit (14 November 2026): pinyon, pawpaw and staghorn sumac (FEIS, USDA Forest Service).
  const TREES_WITH_RANGE = new Set(["pecan", "persimmon", "hickory-nut", "sassafras", "beechnut", "black-walnut", "pinyon", "pawpaw", "staghorn-sumac"]);
  const NB_SOURCES = (SPECIES_JSON as unknown as { sources: { changes?: { slug: string; field: string; source: string }[] }[] }).sources.flatMap((s) => s.changes ?? []).filter((c) => c.field === "nativeBounds");
  for (const s of SPECIES) {
    if ((s.range || s.nativeBounds) && !TREES_WITH_RANGE.has(s.slug)) fail(`${s.slug} has a native range but is not on the list of trees the "trees recorded here are likely planted" note is written for`);
    if (s.nativeBounds && !NB_SOURCES.some((c) => c.slug === s.slug && /https:\/\//.test(c.source) && /read 2026-\d\d-\d\d/.test(c.source))) fail(`${s.slug}: nativeBounds with no source and reading date in species.json sources`);
  }
  const panelAt = (slug: string, sp: string, month: number, n: number) => {
    const e = town(slug);
    if (!e) return null;
    const eco = classifyEcoregion(e.place.lat, e.place.lon) as { slug: string };
    const s = getSpecies(sp)!;
    return knownAmong([findForTaxon({ id: 5, group: "Plantae", latin: s.latin, common: null, count: n, wikipedia: null, photo: null })], month, eco.slug, e.place)[0] ?? null;
  };
  for (const [slug, sp, month, planted] of [
    ["sacramento-california", "pecan", 10, true],
    ["richmond-virginia", "pecan", 10, true],
    ["boise-idaho", "black-walnut", 9, true],
    ["sudbury-ontario", "black-walnut", 9, true],
    ["montreal-quebec", "black-walnut", 9, true],
    ["st-louis-missouri", "pecan", 10, false],
    ["memphis-tennessee", "black-walnut", 10, false],
    ["orlando-florida", "persimmon", 10, false],
    ["kansas-city-missouri", "hickory-nut", 9, false],
    // Day 5 audit: staghorn sumac's records in the west are of planted shrubs (FEIS: native west only to Minnesota).
    ["kelowna-british-columbia", "staghorn-sumac", 9, true],
    ["seattle-washington", "staghorn-sumac", 9, true],
    ["toronto-ontario", "staghorn-sumac", 9, false],
  ] as const) {
    const f = panelAt(slug, sp, month, 6);
    if (f === null && town(slug)) fail(`${slug} ${MONTHS[month - 1]}: ${sp} on 6 records is not on the panel`);
    else if (f && !!f.outsideRange !== planted) fail(`${slug} ${MONTHS[month - 1]}: ${sp} on the panel ${planted ? "without" : "with"} the likely-planted note`);
  }
  // Montreal's checked September list keeps black walnut (its records) and prints the note under it.
  const mtl = town("montreal-quebec");
  if (mtl && P.towns["montreal-quebec"]) {
    const eco = classifyEcoregion(mtl.place.lat, mtl.place.lon) as { slug: string };
    const g = foragingNow(9, eco.slug, mtl.climate.zoneNumber, { place: mtl.place });
    if (g.checked.some((s) => s.slug === "black-walnut") && inRange(getSpecies("black-walnut")!, eco.slug, mtl.place)) fail("Montreal September: black walnut is inside its native range by the boxes, though the Seed Manual stops at western Vermont");
  }
  if (!/<Planted list=\{list\}/.test(seasonal) || !/<Planted list=\{soon\.checked\}/.test(seasonal) || !seasonal.includes("OUTSIDE_RANGE_NOTE")) fail("SeasonalForaging does not print the likely-planted note under its checked lists");
  if (!panels.includes("find.outsideRange &&")) fail("the panel's card does not print the likely-planted note");
  // Every stored record as shown: the note is set exactly where the place is outside the range.
  for (const { place } of TABLE) {
    const eco = classifyEcoregion(place.lat, place.lon) as { slug: string } | null;
    if (!eco) continue;
    for (const month of [9, 10, 11]) {
      const r = storedFlora.get(floraId(place.lat, place.lon, month));
      if (!r?.live) continue;
      for (const f of floraHere(r, place, month).known) {
        const out = !inRange(getSpecies(f.species!.slug)!, eco.slug, place);
        if (out) plantedNotes++;
        if (!!f.outsideRange !== out) fail(`${place.slug} ${MONTHS[month - 1]}: ${f.species!.slug} on the panel ${out ? "without" : "with"} the likely-planted note`);
      }
    }
  }
}

// ------------------------------------------------------------------- report
const dataPoor = TABLE.filter((e) => P.towns[e.place.slug]?.dataPoor).length;
console.log(`towns ${TABLE.length}; in the presence table ${covered}; dataPoor ${dataPoor}; months 12`);
console.log(`lists checked ${checkedLists}; species-month items verified: ${readyItems} ready, ${soonItems} coming`);
// Day 5 audit (14 November 2026): Albany had no land rule; 9 NYCRR 375.1(e) covers New York's state parks statewide.
for (const slug of ["albany-new-york", "buffalo-new-york"]) {
  const e = TABLE.find((x) => x.place.slug === slug);
  if (e && !landRulesFor(e.place).some((r) => r.id === "gl-ny-state-parks" || r.id === "nec-ny-state-parks")) fail(`${slug}: no New York state parks land rule (9 NYCRR 375.1(e))`);
}
console.log(`land rules: ${withRules} towns with loaded rules, ${withGeneric} with the generic line`);
console.log(`harvest rules: ${HARVEST_RULES.length} (${HARVEST_RULES.filter((r) => r.ban).length} bans); banned items kept out of lists: ${bannedItems}; untabled towns checked for the headline: ${untabled}`);
console.log(`region-text checks: ${textItems}`);
console.log(`stored flora records read: ${headlineRecords} (${headlinePanels} with foods on the panel); range checks: ${rangeChecks} lists, ${leftOut} species left out of a regional list by their range`);
console.log(`panel entries checked for text written for the place: ${panelTextChecks}; stored panel entries with the likely-planted note: ${plantedNotes}`);
for (const w of warnings) console.log(`WARNING: ${w}`);
if (failures.length) {
  console.log(`\n${failures.length} FAILURE(S):`);
  for (const f of failures.slice(0, 200)) console.log(`  FAIL ${f}`);
  if (failures.length > 200) console.log(`  … and ${failures.length - 200} more`);
  process.exit(1);
}
console.log("OK: all foraging checks pass");
