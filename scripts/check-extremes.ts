/**
 * Checks the cold-night, hot-day and hardiness-zone figures of every pre-built
 * town (src/data/place-normals.json, with the zones and station counts laid
 * over it) against the rules the pages must keep:
 *
 *  a. a zone worked out from a coldest-night average sits in the USDA band of
 *     that very figure, and no other temperature is printed beside a zone;
 *  b. a town whose station counted nights at -20 °C (or any other count above
 *     zero) is never shown as zero or "none", and a town with no station record
 *     prints no count at all, only that no daily record was within reach;
 *  c. every zone the pages print names its system (Canadian (NRCan), USDA,
 *     USDA-equivalent);
 *  d. the zone pages' lists of towns (src/data/zones.ts) agree with the zones;
 *  e. (audit of 10 November 2026) a station beyond 25 km reads within 4 °C of
 *     the town's coldest night, not 6 (St Margaret's Bay set Halifax's 5 °C
 *     colder); a town without a count says no station near it has 20 complete
 *     years, not that no record was "within reach" (Fredericton has two); a record
 *     whose file has gaps or stops early says so instead of "since 1946" alone
 *     (Saint John's record high stops before ECCC's 34.5 °C of 2024).
 *  f. (Day 5 audit, 14 November 2026) the station rule (src/lib/extremes-rule.ts): no town's counts, coldest night or
 *     USDA-equivalent zone come from an offshore station, from one beyond 20 km when the town has its own inside 15 km, or
 *     from one beyond 15 km more than 4 °C from the town's coldest night (Nanaimo's Entrance Island lighthouse, Whitehorse's
 *     Mayo Road, Kingston's Hartington IHD); and the stale record highs the audit found stay fixed (Victoria Gonzales 39.8 °C
 *     on 28 June 2021, Yellowknife A 32.6 °C on 2 August 2021, ECCC).
 *
 * Exits 1 and prints every failure when a check fails. Given town slugs, it
 * also prints what the pages would say for them.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-extremes.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/check-extremes.mjs --log-level=warning && node /tmp/check-extremes.mjs [slug ...]
 */
import { PLACE_NORMALS } from "../src/lib/climate-fallback";
import usdaRows from "../src/data/place-zones-usda.json";
import NORMALS_RAW from "../src/data/place-normals.json";
import zoneRows from "../src/data/place-zones.json";
import { ZONES } from "../src/data/zones";
import { extremesRejected, getExtremes, PLACE_EXTREMES_ALL, perYear, townStations } from "../src/lib/extremes";
import { OFFSHORE, STATION_RADIUS_KM, TOWN_RING_KM } from "../src/lib/extremes-rule";
import { extremeFigures } from "../src/lib/homestead/climate";
import { climateZoneLabel, usdaBandC, zoneBasis, zoneBasisShort, zoneFromExtremeMin, zoneNumberOf, zoneSystemHeading, type ZonedClimate, type ZoneSource } from "../src/lib/zone-label";

const TOL = 0.06;
const failures: string[] = [];
const fail = (slug: string, what: string) => failures.push(`${slug}: ${what}`);

const LABEL: Record<ZoneSource, RegExp> = {
  nrcan: /^Canadian \(NRCan\) zone \d{1,2}[ab]$/,
  "usda-2023": /^USDA zone \d{1,2}[ab]$/,
  "usda-station": /^USDA-equivalent zone \d{1,2}[ab]$/,
  "usda-era5": /^USDA-equivalent zone \d{1,2}[ab]$/,
};
const HEADING: Record<ZoneSource, string> = { nrcan: "Canadian (NRCan) zone", "usda-2023": "USDA zone", "usda-station": "USDA-equivalent zone", "usda-era5": "USDA-equivalent zone" };

type Band = { lo: number; hi: number };
/** Whether a zone's USDA band holds a temperature. */
const holds = (zone: string, minC: number) => {
  const b: Band | null = usdaBandC(zone);
  return !!b && minC >= b.lo - TOL && minC < b.hi + TOL;
};
/** Every "-27.7 °C" in a sentence, as numbers (the pages print a true minus sign). */
const temps = (s: string) => [...s.matchAll(/([−-]?)(\d+(?:\.\d+)?) °C/g)].map((m) => (m[1] ? -1 : 1) * Number(m[2]));

const USDA = usdaRows as unknown as Record<string, { zone: string; minC: number; basis: "station" | "era5" }>;
const OFFICIAL = zoneRows as unknown as Record<string, { zone: string; source: "nrcan" | "usda-2023" }>;

// ---- the data files themselves --------------------------------------------------------------------------
for (const [slug, u] of Object.entries(USDA)) {
  if (zoneFromExtremeMin(u.minC).zone !== u.zone) fail(slug, `place-zones-usda.json: ${u.zone} is not the USDA zone of ${u.minC} °C`);
  if (!holds(u.zone, u.minC)) fail(slug, `place-zones-usda.json: ${u.zone} does not hold ${u.minC} °C`);
  // The data file against the data file: the stored row, whether or not the station rule lets it stand (f checks that).
  const ex = PLACE_EXTREMES_ALL[slug];
  if (u.basis === "station" && ex?.meanAnnualExtremeMinC !== u.minC) fail(slug, `place-zones-usda.json: station minimum ${u.minC} is not place-extremes.json's ${ex?.meanAnnualExtremeMinC}`);
  if (u.basis === "era5" && ex?.meanAnnualExtremeMinC != null) fail(slug, "place-zones-usda.json: ERA5 used although the station record has a mean annual extreme minimum");
}
for (const [slug, e] of Object.entries(PLACE_EXTREMES_ALL)) {
  const o = [e.nightsBelowZero, e.nightsBelowMinus10, e.nightsBelowMinus20, e.nightsBelowMinus25];
  if (o.every((x) => x != null) && !(o[3]! <= o[2]! && o[2]! <= o[1]! && o[1]! <= o[0]!)) fail(slug, `place-extremes.json: cold counts not nested (${o.join(", ")})`);
  if (e.daysAbove30 != null && e.daysAbove35 != null && e.daysAbove35 > e.daysAbove30) fail(slug, "place-extremes.json: more days at 35 °C than at 30 °C");
  if ((e.nightsBelowZero == null) !== (e.meanAnnualExtremeMinC == null)) fail(slug, "place-extremes.json: cold counts and the mean annual extreme minimum are not null together");
}

// A station beyond the 25 km of the stored list must read like the town's own climate (scripts/build-place-extremes.ts --wide).
for (const { place, climate } of PLACE_NORMALS) {
  const e = getExtremes(place.slug);
  if (e && e.station.km > 25 && e.meanAnnualExtremeMinC != null && Math.abs(e.meanAnnualExtremeMinC - climate.meanAnnualExtremeMinC) > 4) fail(place.slug, `station ${e.station.name} (${e.station.km} km) coldest night ${e.meanAnnualExtremeMinC} is not within 4 °C of ERA5's ${climate.meanAnnualExtremeMinC}`);
  if (e && e.station.km > 40) fail(place.slug, `station ${e.station.name} is ${e.station.km} km away, beyond the 40 km limit`);
}

// ---- every town -----------------------------------------------------------------------------------------
const bySystem: Record<string, number> = {};
let withStation = 0;
const detail = process.argv.slice(2);
const detailLines: string[] = [];

for (const { place, climate } of PLACE_NORMALS) {
  const slug = place.slug;
  const c = climate as ZonedClimate;
  const src = c.zoneSystem;
  const ex = getExtremes(slug);
  if (ex) withStation++;

  // ---- a and c: the zone ----
  if (!src) {
    fail(slug, "zone has no system");
    continue;
  }
  bySystem[src] = (bySystem[src] ?? 0) + 1;
  const label = climateZoneLabel(c);
  if (!LABEL[src].test(label)) fail(slug, `zone label "${label}" does not name its system`);
  if (!label.endsWith(` ${c.zone}`)) fail(slug, `zone label "${label}" is not zone ${c.zone}`);
  if (zoneSystemHeading(src) !== HEADING[src]) fail(slug, `zone heading "${zoneSystemHeading(src)}" is not "${HEADING[src]}"`);
  if (zoneNumberOf(c.zone) !== c.zoneNumber) fail(slug, `zoneNumber ${c.zoneNumber} is not zone ${c.zone}`);
  const derived = src === "usda-station" || src === "usda-era5";
  let allowed: number[] = [];
  let eqZone: string | null = null;
  if (derived) {
    if (c.zoneMinC == null) fail(slug, "derived zone carries no minimum");
    else {
      allowed = [c.zoneMinC];
      eqZone = c.zone;
      if (!holds(c.zone, c.zoneMinC)) fail(slug, `${label} does not hold the ${c.zoneMinC} °C it was derived from`);
      if (zoneFromExtremeMin(c.zoneMinC).zone !== c.zone) fail(slug, `${label} is not the USDA zone of ${c.zoneMinC} °C`);
      if (src === "usda-station" && ex?.meanAnnualExtremeMinC !== c.zoneMinC) fail(slug, `station zone minimum ${c.zoneMinC} is not the station record's ${ex?.meanAnnualExtremeMinC}`);
      if (src === "usda-era5" && c.zoneMinC !== c.meanAnnualExtremeMinC) fail(slug, "ERA5 zone minimum is not the ERA5 record's");
      if (src === "usda-era5" && ex?.meanAnnualExtremeMinC != null) fail(slug, "ERA5 zone used although the station record has a mean annual extreme minimum");
    }
  } else {
    if (c.zoneMinC != null) fail(slug, `official zone ${label} carries a minimum (${c.zoneMinC} °C) as if it were its band`);
    const row = OFFICIAL[slug];
    if (!row || row.source !== src || row.zone !== c.zone) fail(slug, `official zone ${label} is not in place-zones.json`);
    if (src === "nrcan" && place.countryCode !== "CA") fail(slug, "NRCan zone on a town outside Canada");
    if (src === "usda-2023" && place.countryCode !== "US") fail(slug, "USDA 2023 zone on a town outside the United States");
    const eq = c.usdaEquivalent;
    if (eq) {
      allowed = [eq.minC];
      eqZone = eq.zone;
      if (!holds(eq.zone, eq.minC) || zoneFromExtremeMin(eq.minC).zone !== eq.zone) fail(slug, `USDA-equivalent zone ${eq.zone} does not hold the ${eq.minC} °C beside it`);
    }
  }
  if (place.countryCode === "CA" && src !== "nrcan") fail(slug, `Canadian town on ${src}, not the NRCan map`);
  // No temperature in the sentences under a zone but the one it was derived from, or the one labelled USDA-equivalent.
  for (const text of [zoneBasis(c, place.name), zoneBasisShort(c)]) {
    for (const t of temps(text)) if (!allowed.some((a) => Math.abs(a - t) < 0.051)) fail(slug, `"${text}" prints ${t} °C beside ${label}, which is not the minimum behind it`);
    for (const m of text.matchAll(/USDA-equivalent zone (\d{1,2}[ab])/g)) if (m[1] !== eqZone) fail(slug, `"${text}" names USDA-equivalent zone ${m[1]}, not ${eqZone}`);
    if (!/USDA|Canada|NRCan|ERA5|station|weather|reanalysis/.test(text)) fail(slug, `"${text}" does not say where the zone came from`);
  }

  // ---- b: the counts ----
  const f = extremeFigures(place.name, c, ex);
  const fig = (id: string) => f.figures.find((x) => x.id === id)!;
  const text = [...f.figures.flatMap((x) => [x.label, x.value, x.note ?? "", x.method]), f.records ?? "", f.footnote, f.breedIntro, f.breedRule].join("\n");
  const zeroish = (v: string) => /^(none|not counted|0\b|no\b)/i.test(v.trim());
  const coldOk = !!ex && ex.nightsBelowZero != null && ex.nightsBelowMinus10 != null && ex.nightsBelowMinus20 != null && ex.nightsBelowMinus25 != null;
  const hotOk = !!ex && ex.daysAbove30 != null && ex.daysAbove35 != null;
  if (coldOk) {
    const z0 = ex!.nightsBelowZero!;
    const m10 = ex!.nightsBelowMinus10!;
    const m20 = ex!.nightsBelowMinus20!;
    const m25 = ex!.nightsBelowMinus25!;
    if (z0 > 0 && (zeroish(fig("freezing").value) || !fig("freezing").value.startsWith(perYear(z0)))) fail(slug, `station counts ${z0} nights below 0 °C, shown as "${fig("freezing").value}"`);
    if (m10 > 0 && (zeroish(fig("hard-cold").value) || !fig("hard-cold").value.startsWith(perYear(m10)))) fail(slug, `station counts ${m10} nights at -10 °C, shown as "${fig("hard-cold").value}"`);
    if (m20 > 0 && !fig("hard-cold").value.includes(`${perYear(m20)} at −20 °C or colder`)) fail(slug, `station counts ${m20} nights at -20 °C, shown as "${fig("hard-cold").value}"`);
    if (m25 > 0 && !fig("hard-cold").value.includes(`${perYear(m25)} at −25 °C or colder`)) fail(slug, `station counts ${m25} nights at -25 °C, shown as "${fig("hard-cold").value}"`);
    if (m20 === 0 && /none counted/i.test(fig("hard-cold").value) && m10 > 0) fail(slug, "hard-cold shown as none although nights at -10 °C were counted");
    if (!fig("freezing").method.startsWith("Counted from ") || !/ km away, \d{4}–\d{4}/.test(fig("freezing").method)) fail(slug, `cold figures do not say station, distance and period: "${fig("freezing").method}"`);
  }
  if (hotOk) {
    const h30 = ex!.daysAbove30!;
    const h35 = ex!.daysAbove35!;
    if (h30 > 0 && (zeroish(fig("hot").value) || !fig("hot").value.startsWith(perYear(h30)))) fail(slug, `station counts ${h30} days at 30 °C, shown as "${fig("hot").value}"`);
    if (h35 > 0 && (zeroish(fig("very-hot").value) || !fig("very-hot").value.startsWith(perYear(h35)))) fail(slug, `station counts ${h35} days at 35 °C, shown as "${fig("very-hot").value}"`);
    if (!fig("hot").method.startsWith("Counted from ") || !/ km away, \d{4}–\d{4}/.test(fig("hot").method)) fail(slug, `hot figures do not say station, distance and period: "${fig("hot").method}"`);
  }
  // An element with no complete record is "Not counted", with the plain reason, and never a count.
  for (const id of ["freezing", "hard-cold"]) if (!coldOk && fig(id).value !== "Not counted") fail(slug, `${id} printed "${fig(id).value}" with no complete night record`);
  for (const id of ["hot", "very-hot"]) if (!hotOk && fig(id).value !== "Not counted") fail(slug, `${id} printed "${fig(id).value}" with no complete afternoon record`);
  for (const x of f.figures) if (x.value === "Not counted" && !x.method.includes("monthly averages hide extremes")) fail(slug, `"${x.label}" not counted without saying that monthly averages hide extremes`);
  if (!coldOk && !hotOk) {
    if (f.basis !== "none") fail(slug, "basis is not none with no station record");
    if (!text.includes(`No weather station that can stand for ${place.name} has 20 complete years of daily readings in 1991–2020`)) fail(slug, "no-record town does not say plainly that no station that can stand for it has 20 complete years");
    if (/within reach/.test(text)) fail(slug, "no-record town says no record was within reach");
    if (/none counted|\b0 (a year|nights|days)\b|\bno (nights|days)\b|\bnever\b/i.test(text)) fail(slug, "no-record town prints a zero or 'none' count");
  }
  if (ex && !coldOk && !hotOk) fail(slug, "place-extremes.json holds a station with neither element counted");
  // A record "since" a year runs to today only if the file does: a station whose 1991–2020 years are not all complete
  // (beyond what a late start explains) and whose last year is unknown must say its file has gaps or stops early.
  if (ex && f.records && /since \d{4}/.test(f.records)) {
    const gappy = (years: number, since: number | null, until: number | null | undefined) => until == null && since != null && years < 30 - Math.max(0, since - 1991);
    const cold = coldOk && gappy(ex.years, ex.recordLowSince, ex.recordLowUntil);
    const hot = hotOk && gappy(ex.yearsMax, ex.recordHighSince, ex.recordHighUntil);
    if ((cold || hot) && !/has gaps or stops early/.test(f.records)) fail(slug, `records "since" a year from a file with gaps, without saying so: "${f.records}"`);
  }
  // The old fault: a monthly-average window can never be the reason for a zero.
  if (/\bnever\b/i.test(text)) fail(slug, "text says 'never'");

  if (detail.includes(slug)) {
    detailLines.push(
      `\n=== ${place.label}  (${slug})`,
      `  zone: ${label}   heading "${zoneSystemHeading(src)}"`,
      `    ${zoneBasisShort(c)}`,
      `    ${zoneBasis(c, place.name)}`,
      ...f.figures.map((x) => `  ${x.label}: ${x.value}\n    ${x.method}${x.note ? `\n    ${x.note}` : ""}`),
      `  records: ${f.records ?? "-"}`,
      `  footnote: ${f.footnote}`,
      `  breeds: ${f.breedIntro}`,
    );
  }
}

// ---- f: the station rule (Day 5 audit, 14 November 2026) -------------------------------------------------------
// The ERA5 coldest night each town was built with (place-normals.json as stored, before a station's is laid over it).
const GRID_MIN = new Map((NORMALS_RAW as unknown as { place: { slug: string }; climate: { meanAnnualExtremeMinC: number } }[]).map((e) => [e.place.slug, e.climate.meanAnnualExtremeMinC]));
let setAside = 0;
for (const { place, climate } of PLACE_NORMALS) {
  const slug = place.slug;
  const c = climate as ZonedClimate;
  const why = extremesRejected(slug);
  const e = getExtremes(slug);
  if (why) {
    setAside++;
    if (e) fail(slug, `getExtremes gives a station the rule sets aside: ${why}`);
    if (c.extremeMinSource === "station" || c.usdaEquivalent?.basis === "station" || c.zoneSystem === "usda-station") fail(slug, `the zone or coldest night still rests on a station the rule sets aside: ${why}`);
  }
  if (!e) continue;
  const own = townStations(slug);
  // The rule restated, so a change to src/lib/extremes-rule.ts that loosens it is named here.
  if (OFFSHORE.test(e.station.name) && own.some((x) => !OFFSHORE.test(x.name))) fail(slug, `counts from offshore station ${e.station.name}`);
  if (e.station.km > STATION_RADIUS_KM && own.some((x) => x.km <= TOWN_RING_KM)) fail(slug, `counts from ${e.station.name} ${e.station.km} km away though the town has its own station within ${TOWN_RING_KM} km`);
  const grid = GRID_MIN.get(slug);
  if (e.station.km > TOWN_RING_KM && e.meanAnnualExtremeMinC != null && grid != null && Math.abs(e.meanAnnualExtremeMinC - grid) > 4) fail(slug, `counts from ${e.station.name} ${e.station.km} km away, whose coldest night ${e.meanAnnualExtremeMinC} °C is more than 4 °C from the town's ${grid} °C`);
}
const PIN_SET_ASIDE = ["nanaimo-british-columbia", "whitehorse-yukon", "kingston-ontario"];
for (const slug of PIN_SET_ASIDE) if (PLACE_NORMALS.some((e) => e.place.slug === slug) && (!extremesRejected(slug) || getExtremes(slug))) fail(slug, "the audit's unrepresentative station (Day 5 audit, 14 November 2026) is counted again");
const RECORD_PINS: [string, number, string][] = [
  ["victoria-british-columbia", 39.8, "2021-06-28"],
  ["yellowknife-northwest-territories", 32.6, "2021-08-02"],
];
for (const [slug, c, d] of RECORD_PINS) {
  const e = PLACE_EXTREMES_ALL[slug];
  if (e && (e.recordHighC == null || e.recordHighC < c)) fail(slug, `record high ${e.recordHighC} °C (${e.recordHighDate}), below ECCC's ${c} °C of ${d} (Day 5 audit pin)`);
}
console.log(`Station rule: ${setAside} towns' stored station set aside (${PLACE_NORMALS.filter((e) => extremesRejected(e.place.slug)).map((e) => e.place.slug).join(" ")})`);

// ---- d: the zone pages' town lists ----------------------------------------------------------------------
const zoneOf = new Map(PLACE_NORMALS.map((e) => [e.place.slug, e.climate.zoneNumber]));
let listed = 0;
// The zone pages run from their first to their last zone: a town one zone colder than the first page (the Canadian zone 1 towns) is listed on it, as src/data/zones.ts says.
const FIRST = Math.min(...ZONES.map((z) => z.zone));
const LAST = Math.max(...ZONES.map((z) => z.zone));
for (const z of ZONES) {
  for (const p of z.places) {
    const have = zoneOf.get(p.slug);
    if (have == null) continue;
    listed++;
    if (Math.min(LAST, Math.max(FIRST, have)) !== z.zone) fail(p.slug, `listed under zone ${z.zone} on the zone pages but its zone is ${have}`);
  }
}

// ---- Ottawa: the acceptance numbers, when the town is there ---------------------------------------------
const ottawa = getExtremes("ottawa-ontario");
if (ottawa) {
  const n = (x: number | null, lo: number, hi: number, what: string) => {
    if (x == null || x < lo || x > hi) fail("ottawa-ontario", `${what} is ${x}, expected ${lo} to ${hi}`);
  };
  n(ottawa.nightsBelowMinus20, 12, 18, "nights at -20 °C or colder a year");
  n(ottawa.daysAbove30, 12, 18, "days at 30 °C or hotter a year");
  n(ottawa.meanAnnualExtremeMinC, -29, -26, "mean annual extreme minimum");
}

console.log(detailLines.join("\n"));
console.log(`\n${PLACE_NORMALS.length} towns; zone systems ${Object.entries(bySystem).map(([k, v]) => `${k} ${v}`).join(", ")}; ${withStation} with a station record in place-extremes.json; ${listed} zone-page list entries compared`);
if (failures.length) {
  console.log(`\nFAILED (${failures.length}):\n${failures.map((x) => "  " + x).join("\n")}`);
  process.exit(1);
}
console.log("All checks passed.");
