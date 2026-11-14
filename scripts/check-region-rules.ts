/**
 * Pins for the regulator rows and fish-consumption advisories fixed after the audit of 10 November 2026 (checkers of 14 November;
 * package A1): each pin is a finding that came back true, so the fault cannot return silently. Plus invariants every row must keep.
 *
 * Run (esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-region-rules.ts --bundle --platform=node --format=esm --alias:@=./src \
 *     --outfile=/tmp/check-region-rules.mjs --log-level=warning && node /tmp/check-region-rules.mjs
 */
import KNOWN from "../src/lib/served-places";
import { CLOSED_SEASONS } from "../src/data/closed-seasons";
import { FISH_ADVISORIES } from "../src/data/fish-advisories";
import { getCreature } from "../src/lib/nature";
import { closureOf, inRange, ruleApplies, rulesFor, rulesNaming, type PlaceScope } from "../src/lib/closed-seasons";
import type { WaterGroup } from "../src/lib/fish-habitats";

const faults: string[] = [];
const fail = (m: string) => faults.push(m);
const town = (slug: string): PlaceScope => {
  const p = (KNOWN as (PlaceScope & { slug: string })[]).find((x) => x.slug === slug);
  if (!p) throw new Error(`no served town ${slug}`);
  return p;
};
const day = (mmdd: string) => `2026-${mmdd}`;
const closed = (slug: string, fish: string, mmdd: string, water: WaterGroup) => closureOf(town(slug), fish, day(mmdd), water) !== null;
const noKeep = (slug: string, fish: string, mmdd: string, water: WaterGroup) =>
  rulesNaming(town(slug), fish, water).some((r) => (r.noKeep ?? []).some((x) => inRange(mmdd, x)));
/** Every row at a town, notes included. */
const ids = (slug: string) => CLOSED_SEASONS.filter((r) => ruleApplies(r, town(slug))).map((r) => r.id);

function pin(ok: boolean, what: string) {
  if (!ok) fail(`pin: ${what}`);
}

// ---- Invariants: every row --------------------------------------------------------------------------------------
const MMDD = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const seen = new Set<string>();
for (const r of CLOSED_SEASONS) {
  if (seen.has(r.id)) fail(`row ${r.id}: id used twice`);
  seen.add(r.id);
  if (!/^https:\/\//.test(r.source)) fail(`row ${r.id}: source is not https`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.checked)) fail(`row ${r.id}: no date read`);
  for (const x of [...r.closed, ...(r.noKeep ?? [])]) if (!MMDD.test(x.from) || !MMDD.test(x.to)) fail(`row ${r.id}: bad range ${x.from}-${x.to}`);
  // A note (no species) carries no dates; release-only days need named fish.
  if (!r.species.length && (r.closed.length || r.noKeep?.length)) fail(`row ${r.id}: dates on a note with no species`);
}
const seenA = new Set<string>();
for (const a of FISH_ADVISORIES) {
  if (seenA.has(a.id)) fail(`advisory ${a.id}: id used twice`);
  seenA.add(a.id);
  for (const sp of a.species) if (sp !== "*" && !getCreature(sp)) fail(`advisory ${a.id}: "${sp}" is not a library fish`);
}

// ---- Pins: the findings of 14 November 2026 ----------------------------------------------------------------------
// 2. BC fresh-water salmon: zero limits are release-only rows; Vancouver's named rivers are closed to chinook all year.
pin(noKeep("nanaimo-british-columbia", "chinook-salmon", "10-14", "rivers"), "Nanaimo river chinook are release-only in October");
pin(noKeep("nanaimo-british-columbia", "coho-salmon", "06-01", "rivers") && !noKeep("nanaimo-british-columbia", "coho-salmon", "11-01", "rivers"), "Nanaimo river coho release-only to 15 October, keepable on the town stretch after");
pin(noKeep("victoria-british-columbia", "chinook-salmon", "10-14", "rivers") && noKeep("victoria-british-columbia", "coho-salmon", "10-14", "rivers"), "Victoria river chinook and coho are release-only");
pin(closed("vancouver-british-columbia", "chinook-salmon", "10-14", "rivers"), "Vancouver river chinook closed (tidal Fraser and unlisted streams)");
pin(!closed("vancouver-british-columbia", "chinook-salmon", "10-14", "sea"), "Vancouver sea chinook still open in Area 28");
pin(!/closed to all fishing from 15 July/.test(CLOSED_SEASONS.find((r) => r.id === "ca-bc-dfo-area17-nanaimo")?.note ?? ""), "Nanaimo tidal river 15 Jul-25 Oct is a salmon closure, not all fishing");
// 3. Kelowna: bass and perch closed in streams (zero quota), not in the listed lakes.
pin(closed("kelowna-british-columbia", "yellow-perch", "10-14", "rivers") && !closed("kelowna-british-columbia", "yellow-perch", "10-14", "lakes"), "Kelowna perch closed in creeks, open on Okanagan Lake");
// 4. Seattle: fresh-water salmon closed until 20 August, Chinook released after; Marine Area 10 closed in May.
pin(closed("seattle-washington", "coho-salmon", "07-01", "rivers") && !closed("seattle-washington", "coho-salmon", "10-14", "rivers"), "Seattle river coho closed until 20 August (Duwamish opens)");
pin(closed("seattle-washington", "chinook-salmon", "07-01", "rivers") && noKeep("seattle-washington", "chinook-salmon", "10-14", "rivers"), "Seattle river chinook closed, then release-only");
pin(closed("seattle-washington", "coho-salmon", "05-15", "sea") && closed("seattle-washington", "chinook-salmon", "05-15", "sea"), "Marine Area 10 salmon closed in May");
pin(!closed("seattle-washington", "coho-salmon", "04-15", "sea"), "Marine Area 10 April (Wed-Sat) not written as closed");
// 5. Portland: notes, with the hatchery-tag wording.
pin(/Hatchery Harvest Tags/.test(CLOSED_SEASONS.find((r) => r.id === "us-or-portland-willamette-zone")?.note ?? ""), "Willamette note gives the Hatchery Harvest Tag rule");
// 6. Ontario zones: Kingston and Niagara-on-the-Lake rivers carry no FMZ 20 rows; Kingston's lakes no FMZ 20-only rows; FMZ 20 brook trout; bass early C&R.
pin(!ids("kingston-ontario").some((id) => id.startsWith("ca-on-fmz20-") || id.startsWith("ca-on-fmz16-fmz20-all-year")), "Kingston carries no FMZ 20-only or FMZ 16 row");
pin(closed("kingston-ontario", "walleye", "05-05", "rivers"), "Kingston streams (FMZ 18) walleye closed until the second Saturday in May");
pin(!closed("kingston-ontario", "brook-trout", "10-14", "rivers"), "Kingston streams (FMZ 18) brook trout open all year");
pin(closed("kingston-ontario", "walleye", "04-15", "lakes") && !closed("kingston-ontario", "walleye", "05-05", "lakes"), "Kingston lakes closed only on days both zones close walleye");
pin(!rulesFor(town("niagara-on-the-lake-ontario")).some((r) => r.id.startsWith("ca-on-fmz20-") && r.water?.includes("rivers")), "Niagara-on-the-Lake rivers carry no FMZ 20-only row");
pin(closed("toronto-ontario", "brook-trout", "07-14", "lakes"), "FMZ 20 brook trout closed all year in Lake Ontario");
pin(noKeep("toronto-ontario", "smallmouth-bass", "02-14", "lakes") && noKeep("toronto-ontario", "largemouth-bass", "02-14", "lakes"), "FMZ 20 bass catch and release 1 January to 10 May");
// 7. Saskatoon and Val-d'Or.
pin(closed("saskatoon-saskatchewan", "walleye", "04-15", "rivers") && !closed("saskatoon-saskatchewan", "walleye", "05-06", "rivers"), "Saskatoon (Southern Zone) closed 1 April to 4 May");
pin(closed("val-d-or-quebec", "walleye", "05-10", "lakes") && !closed("val-d-or-quebec", "walleye", "05-16", "lakes"), "Val-d'Or (zone 13) walleye closed to 14 May");
pin(ids("saguenay-quebec").includes("ca-qc-z28-saguenay-notes"), "Saguenay has its zone 28 note");
// 8. International Falls has Minnesota rules.
pin(ids("international-falls-minnesota").length > 0, "International Falls has Minnesota rows");
// 9. Madison trout by water, bass southern zone.
pin(closed("madison-wisconsin", "brook-trout", "01-14", "lakes") && !closed("madison-wisconsin", "brook-trout", "01-14", "rivers"), "Madison lake trout closed to May; streams have the January release season");
pin(noKeep("madison-wisconsin", "largemouth-bass", "04-14", "lakes") && !noKeep("madison-wisconsin", "largemouth-bass", "06-14", "lakes"), "Madison bass (southern zone) release-only 8 March to 1 May");
// 10. Albany lake brook trout.
pin(closed("albany-new-york", "brook-trout", "11-14", "lakes"), "Albany lake brook trout closed 16 October to 31 March");
// 11. Grand Forks shore-licence wording.
pin(!/state they stand in/.test(CLOSED_SEASONS.find((r) => r.id === "us-nd-open")?.note ?? ""), "Grand Forks licence note keeps to the guide's words");
// 13. Advisories loaded for the eight towns.
for (const id of [
  "ny-hudson-troy-catskill-perch", "ny-hudson-troy-catskill-all-other", "or-lower-willamette-crappie", "or-lower-willamette-resident-fish",
  "wa-spokane-river-upriver-dam-idaho", "wa-spokane-river-nine-mile-upriver", "wa-lower-duwamish", "wa-lake-washington-carp",
  "wi-yahara-pfas-do-not-eat", "tx-adv-42-leon-creek", "bc-r1-smallmouth-mercury-victoria", "bc-r1-smallmouth-mercury-nanaimo", "nt-yellowknife-arsenic-lakes",
])
  pin(FISH_ADVISORIES.some((a) => a.id === id), `advisory ${id} is loaded`);

if (faults.length) {
  for (const f of faults) console.log(`VIOLATION ${f}`);
  console.log(`\n${faults.length} violation(s).`);
  process.exit(1);
}
console.log(`Region rules: ${CLOSED_SEASONS.length} rows and ${FISH_ADVISORIES.length} advisories checked; all pins hold.`);
