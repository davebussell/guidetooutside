/**
 * Prints the homestead numbers for a handful of towns from the pre-built
 * climate table (src/data/place-normals.json), to sanity-check
 * src/lib/homestead against published figures.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias):
 *   npx esbuild scripts/check-homestead.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/check-homestead.mjs --log-level=warning && node /tmp/check-homestead.mjs [slug ...]
 *
 * Then it checks every town against the pins below and exits 1 on a failure
 * (added after the audit of 10 November 2026):
 *  - heating degree days: Erbs, Klein and Beckman's method run on NOAA's own
 *    1991–2020 monthly mean temperatures gives NOAA's heating degree days
 *    (NCEI normals, read 11 November 2026) within 2 % at nine stations and 6 % at
 *    Jacksonville; the pages' figures for the six towns the audit found right stay
 *    within 10 % of NOAA; no town reads below the old normal-day sum;
 *  - the "average nights below 0 °C / 4 °C" lines and the freezing jobs say they
 *    come from the ERA5 weather-model grid;
 *  - frost provenance: no "within 15 km", a pooled reading says it is pooled and
 *    how far its stations reach, place-frost.json and place-normals.json agree;
 *  - the town-station rule picks the audit's stations on fixed cases;
 *  - the season plan names a frost week only from one station or stations that agree;
 *  - the raw-manure rule names both the US and the Canadian standard.
 * Added after the Day 3 audit (11 November 2026):
 *  - the season with covers never runs past the year and never falls short of the frost-free season (it read
 *    "362 to 390 days" at Houston and "352 to 380 days" at New Orleans).
 * Added after the Day 4 audit (13 November 2026):
 *  - roof water leaves out a month as frozen only when its grid mean is more than FROZEN_MARGIN_C below 0 °C, and names every
 *    month within the margin (Boise's January, −0.05 °C on the grid and +0.1 °C at the airport, was dropped on that knife
 *    edge, about 12 % of the year's catch);
 *  - no "−0 °C" or "−0.0 °C" in the extremes lines (Boise's "January −0 °C");
 *  - no word run into a month in the task lines ("The wet season here starts inDec.", Santa Barbara).
 * Added after the Day 5 audit (14 November 2026), with station normals in place of the grid where they were read
 * (src/data/place-station-normals.json, scripts/build-station-normals.ts):
 *  - every US town has its station normals, and place-normals.json, place-rain.json and place-frost.json carry them
 *    unchanged; every town on station normals names the station in its sentences (`tempWords`), and a freezing line that
 *    still names the ERA5 grid for such a town fails (src/lib/homestead/signals.ts must say `tempWords(c)`);
 *  - pins: Portland's frost dates are Portland International's (Mar 13, Nov 19), Fairbanks's Fairbanks International's
 *    (May 13, Sep 13), Spokane's Felts Field's (Apr 26, Oct 15), Austin's Camp Mabry's (Feb 20, Dec 3), Grand Rapids's
 *    autumn NOAA's Oct 20; Köppen Dfb at Kelowna (BSk within the margins, not Cfa or Dfa first), Dfc at Thompson, Dfb at
 *    Kingston and Grand Forks, Dsb at Spokane; the coldest month December at Bozeman and Seattle; Kelowna's average nights
 *    freeze in November, not December; roof water leaves out November at Grand Forks and International Falls, October at
 *    Fairbanks and March and November at Laramie; Niagara-on-the-Lake's precipitation is Youngstown's 873 mm, not 707.
 * Towns whose frost dates are still pooled (waiting for scripts/build-place-frost.ts
 * to run with station data) are listed, not failed.
 */
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import type { Climate, Place } from "../src/lib/types";
import { regimeOf } from "../src/lib/regime";
import FROST from "../src/data/place-frost.json";
import { frostSeason, homesteadNumbers, dayLabel, hoursMinutes, SHORT_MONTHS, erbsHdd, erbsSigma, heatingNeed, daily, metOfficeHdd, monthlyMeans, MONTH_DAYS, roofWater, extremeFigures, FROZEN_MARGIN_C, frozenMarginC, tempsFromStation, tempWords, coldHeat } from "../src/lib/homestead/climate";
import { koppen } from "../src/lib/regime";
import STATION_NORMALS from "../src/data/place-station-normals.json";
import RAIN from "../src/data/place-rain.json";
import { getExtremes } from "../src/lib/extremes";
import { signalDates, tasksInMonth, tasksFor, windowLabel } from "../src/lib/homestead/signals";
import { TASKS, SIGNAL_FAMILIES } from "../src/data/homestead/calendar";
import { exampleTowns, SIGNAL_ROWS } from "../src/lib/homestead/examples";
import { TOPICS } from "../src/data/homestead/topics";
import { frostProvenance, frostSourceWords, townStation, type StationReading } from "../src/lib/frost";
import { frostWeekDatable } from "../src/lib/frost-week";

type Entry = { place: Place; climate: Climate };
const TABLE = NORMALS as unknown as Entry[];

const DEFAULT = ["toronto-ontario", "cape-town-south-africa", "nairobi-kenya", "lisbon-portugal", "oslo-norway", "troms-norway", "phoenix-arizona", "aswan-egypt"];
// TABLE holds the served towns (src/lib/scope.ts); a default town that is parked is left out.
const slugs = (process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT).filter((s) => TABLE.some((e) => e.place.slug === s));
const failures: string[] = [];
const fail = (slug: string, what: string) => failures.push(`${slug}: ${what}`);
const TODAY = "2026-10-12";

const n0 = (x: number) => Math.round(x).toLocaleString("en");
const span = (s: { days: number; main: { start: number; end: number } | null }) =>
  s.days === 0 ? "none" : s.main ? `${s.days} d (${dayLabel(s.main.start)}–${dayLabel(s.main.end)})` : `${s.days} d`;

for (const slug of slugs) {
  const e = TABLE.find((x) => x.place.slug === slug);
  if (!e) {
    console.log(`\n${slug}: not in place-normals.json`);
    continue;
  }
  const { place, climate: c } = e;
  const regime = regimeOf(c, place.lat);
  const input = { lat: place.lat, lon: place.lon, climate: c, regime, today: TODAY };
  const h = homesteadNumbers(input);
  const d = h.daylight;
  console.log(`\n=== ${place.label}  (${place.lat.toFixed(2)}, ${place.lon.toFixed(2)})  ${regime?.name ?? "?"} ${regime?.koppen ?? ""}`);
  console.log(`  normals: mean max ${c.monthlyMeanMax.map((t) => t.toFixed(0)).join(" ")}`);
  console.log(`           mean min ${c.monthlyMeanMin.map((t) => t.toFixed(0)).join(" ")}`);
  console.log(`           rain mm  ${(c.monthlyRainMm ?? []).map((t) => t.toFixed(0)).join(" ")}  (${n0((c.monthlyRainMm ?? []).reduce((a, b) => a + b, 0))} mm/yr)`);
  console.log(
    `  daylight: today ${hoursMinutes(d.todayMin)} (${d.weekChangeMin >= 0 ? "+" : ""}${d.weekChangeMin} min/wk); shortest ${hoursMinutes(d.shortestMin)} ${dayLabel(d.shortestDoy)}, longest ${hoursMinutes(d.longestMin)} ${dayLabel(d.longestDoy)}`,
  );
  console.log(
    `            <14 h: down ${d.below14.down ? dayLabel(d.below14.down) : "never"}, up ${d.below14.up ? dayLabel(d.below14.up) : "never"} (${d.below14.days} d); <12 h: down ${d.below12.down ? dayLabel(d.below12.down) : "never"}, up ${d.below12.up ? dayLabel(d.below12.up) : "never"} (${d.below12.days} d); add on shortest day ${hoursMinutes(d.addOnShortestMin)}; polar night ${d.polarNightDays} d, midnight sun ${d.midnightSunDays} d`,
  );
  if (h.coldHeat) {
    const k = h.coldHeat;
    console.log(`  nights <0 °C ${span(k.below0)}; <-10 °C ${span(k.belowMinus10)}; <-20 °C ${span(k.belowMinus20)}`);
    console.log(`  days >30 °C ${span(k.above30)}; >35 °C ${span(k.above35)}; coldest ${SHORT_MONTHS[k.coldest.month - 1]} ${k.coldest.minC} °C, warmest ${SHORT_MONTHS[k.warmest.month - 1]} ${k.warmest.maxC} °C`);
  }
  if (h.roof) {
    const r = h.roof;
    console.log(
      `  roof 100 m²: ${n0(r.annualL)} L/yr (range ${n0(r.annualRangeL[0])}–${n0(r.annualRangeL[1])}); monthly ${r.monthlyL.map((l) => n0(l)).join(" ")}; first flush ${n0(r.firstFlushL[0])}–${n0(r.firstFlushL[1])} L`,
    );
    console.log(
      `             storage ${n0(r.storage.litres)} L for an even ${n0(r.storage.dailyL)} L/day; dry stretch ${r.storage.from ? `${SHORT_MONTHS[r.storage.from - 1]}–${SHORT_MONTHS[r.storage.to! - 1]} (${r.storage.months} mo)` : "none"}${r.storage.short.length ? `; short ${r.storage.short.map((m) => SHORT_MONTHS[m - 1]).join(", ")}` : ""}${r.frozenMonths ? `; ${r.frozenMonths} frozen months left out` : ""}`,
    );
  }
  if (h.heating) {
    const t = h.heating;
    console.log(
      `  HDD18 ${n0(t.annual)} °C·d; monthly ${t.monthly.map((x) => n0(x)).join(" ")}; season ${t.season ? `${SHORT_MONTHS[t.season.from - 1]}–${SHORT_MONTHS[t.season.to - 1]}` : "none"}`,
    );
  }
  if (h.frost) {
    const f = h.frost;
    console.log(
      f.rare
        ? "  frost: rare"
        : `  frost: last ${f.lastSpringLabel} (doy ${f.lastSpringDoy}), first ${f.firstFallLabel} (doy ${f.firstFallDoy}), ${f.frostFreeDays} frost-free days [${f.source}]; covers from ${dayLabel(f.coverFrom![0])}–${dayLabel(f.coverFrom![1])}, until ${dayLabel(f.coverUntil![0])}–${dayLabel(f.coverUntil![1])}; season ${f.extendedDays![0]}–${f.extendedDays![1]} d`,
    );
  }
  if (h.bees) {
    const b = h.bees;
    console.log(`  bees: forage (≥13 °C highs) ${span(b.forage)}; full (≥18 °C) ${span(b.full)}; confined (<10 °C) ${span(b.confined)}; months ${b.forageMonths.map((m) => SHORT_MONTHS[m - 1]).join(" ")}`);
  }
  const sd = signalDates(input);
  const now = tasksInMonth(sd, 10);
  console.log(`  October tasks: ${now.map((t) => `${t.task.id} [${windowLabel(t.window)}]`).join("; ") || "none"}`);
}

// ---- pins (audit of 10 November 2026) --------------------------------------------------------------------

/**
 * NOAA NCEI U.S. Climate Normals 1991–2020, monthly (normals-monthly-1991-2020: MLY-TAVG-NORMAL in °F and
 * MLY-HTDD-NORMAL in °F-days at base 65 °F), read 11 November 2026 through the NCEI access-data service.
 */
const NOAA: Record<string, { id: string; t: number[]; hdd: number[] }> = {
  "boston-massachusetts": { id: "USW00014739", t: [29.9, 31.8, 38.3, 48.6, 58.4, 68.0, 74.1, 72.7, 65.6, 54.8, 44.7, 35.7], hdd: [1086.4, 929.6, 828.2, 496.1, 233.9, 49.8, 4.0, 4.8, 71.3, 325.5, 607.8, 908.3] },
  "new-york-new-york": { id: "USW00094728", t: [33.7, 35.9, 42.8, 53.7, 63.2, 72.0, 77.5, 76.1, 69.2, 57.9, 48.0, 39.1], hdd: [970.1, 816.2, 687.8, 354.3, 122.0, 14.7, 0.1, 0.9, 31.9, 240.1, 510.9, 804.4] },
  "philadelphia-pennsylvania": { id: "USW00013739", t: [33.7, 35.9, 43.6, 54.5, 64.3, 73.5, 78.7, 76.8, 69.9, 58.2, 47.4, 38.6], hdd: [971.7, 814.7, 665.6, 329.7, 104.1, 9.9, 0, 0.6, 28.4, 236.5, 530.0, 818.3] },
  "washington-district-of-columbia": { id: "USW00013743", t: [37.5, 40.0, 47.6, 58.2, 67.2, 76.3, 81.0, 79.4, 72.4, 60.8, 49.9, 41.7], hdd: [853.9, 698.7, 543.8, 236.4, 62.6, 4.0, 0, 0.1, 15.6, 175.2, 454.9, 724.0] },
  "baltimore-maryland": { id: "USW00093721", t: [34.3, 36.6, 44.3, 55.0, 64.4, 73.5, 78.3, 76.2, 69.2, 57.4, 46.9, 38.6], hdd: [951.4, 793.6, 641.9, 317.6, 108.8, 11.2, 0, 0.5, 35.7, 259.7, 543.9, 819.9] },
  "atlanta-georgia": { id: "USW00013874", t: [44.8, 48.5, 55.6, 63.2, 71.2, 77.9, 80.9, 80.2, 74.9, 64.7, 54.2, 47.3], hdd: [626.7, 462.5, 308.5, 119.7, 21.9, 1.1, 0, 0.1, 5.4, 98.6, 335.9, 550.5] },
  "richmond-virginia": { id: "USW00013740", t: [38.3, 41.0, 48.4, 58.4, 66.7, 75.0, 79.4, 77.5, 71.2, 60.0, 49.6, 41.8], hdd: [827.7, 672.4, 519.4, 235.1, 72.0, 6.1, 0, 0.2, 21.5, 196.9, 465.0, 719.9] },
  "charlotte-north-carolina": { id: "USW00013881", t: [42.1, 45.7, 52.7, 61.1, 69.0, 76.6, 80.1, 78.6, 72.7, 61.9, 51.4, 44.7], hdd: [711.6, 540.5, 391.5, 162.6, 39.3, 1.9, 0.1, 0.1, 13.1, 151.5, 415.1, 630.6] },
  "raleigh-north-carolina": { id: "USC00317079", t: [41.7, 44.2, 51.3, 60.6, 69.0, 76.6, 80.4, 78.7, 72.7, 61.7, 51.5, 44.8], hdd: [724.2, 583.1, 431.2, 180.3, 40.5, 3.0, 0.2, 0.1, 12.1, 153.7, 409.1, 627.7] },
  "savannah-georgia": { id: "USW00003822", t: [50.7, 54.0, 60.0, 66.7, 74.1, 80.1, 83.0, 82.1, 77.7, 68.8, 59.1, 53.2], hdd: [450.0, 319.5, 196.4, 63.0, 6.7, 0.2, 0, 0, 0.9, 46.1, 213.1, 379.4] },
  "jacksonville-florida": { id: "USW00013889", t: [54.2, 57.5, 62.4, 68.1, 74.9, 80.3, 82.5, 82.1, 78.8, 71.2, 62.3, 56.7], hdd: [349.5, 234.3, 142.8, 43.4, 3.7, 0, 0, 0, 0.1, 24.7, 143.7, 285.3] },
};
const F2C = (f: number) => ((f - 32) * 5) / 9;
const BASE65 = F2C(65);
/** The towns the audit of 10 November 2026 found right on heating degree days; they must stay within 10 % of NOAA. */
const HDD_RIGHT = ["boston-massachusetts", "new-york-new-york", "philadelphia-pennsylvania", "washington-district-of-columbia", "baltimore-maryland", "atlanta-georgia"];
const hddLines: string[] = [];
for (const [slug, n] of Object.entries(NOAA)) {
  const noaaC = (n.hdd.reduce((a, b) => a + b, 0) * 5) / 9;
  // 1. The method on NOAA's own monthly means.
  const tc = n.t.map(F2C);
  const yr = tc.reduce((a, b) => a + b, 0) / 12;
  const sYr = Math.sqrt(tc.reduce((a, t) => a + (t - yr) ** 2, 0) / 12);
  const erbs = tc.reduce((a, t, m) => a + erbsHdd(t, erbsSigma(t, sYr), MONTH_DAYS[m], BASE65), 0);
  const tol = slug === "jacksonville-florida" ? 0.06 : slug === "savannah-georgia" ? 0.03 : 0.02;
  if (Math.abs(erbs / noaaC - 1) > tol) fail(slug, `Erbs on NOAA's monthly means gives ${Math.round(erbs)} °C·d, not within ${tol * 100} % of NOAA's ${Math.round(noaaC)}`);
  // 2. The page's figure (ERA5 monthly means), at NOAA's base for the comparison.
  const e = TABLE.find((x) => x.place.slug === slug);
  if (!e) continue;
  const page = heatingNeed(e.climate, BASE65).annual;
  hddLines.push(`  ${slug}: NOAA ${n.id} ${Math.round(noaaC)} °C·d; method on NOAA means ${Math.round(erbs)}; page (${tempWords(e.climate)}) ${Math.round(page)} (${Math.round((page / noaaC - 1) * 100)} %)`);
  // On the grid the page must come within 10 % of NOAA's figure at the pinned station. A town on station normals is held to its
  // own station's normals instead (pin 3 below: the page's figure is Erbs's on those means); a different station from the pin's
  // (Baltimore's Maryland Science Center, not BWI; Atlanta's Fulton County airport, not Hartsfield) is another place's figure.
  const own = (e.climate as Climate & { tempStation?: string }).tempStation;
  const pinStation = (STATION_NORMALS as unknown as { towns: Record<string, { station: { id: string } }> }).towns[slug]?.station.id;
  if (HDD_RIGHT.includes(slug) && (!own || pinStation === n.id) && Math.abs(page / noaaC - 1) > 0.1) fail(slug, `heating degree days ${Math.round(page)} not within 10 % of NOAA's ${Math.round(noaaC)}`);
}
// 3. Degree days are counted on the day's mean temperature (NOAA's and ECCC's definition), and days colder than
// normal only add to them: no town may read below the sum over its normal days' means. (The Met Office day formula the
// pages used before also counts the cold part of days whose mean is above 18 °C, so it reads higher in highland and
// desert towns, Nairobi 330 against 197; it is a different quantity, not the one NOAA's normals give.)
let underMetOffice = 0;
for (const { place, climate: c } of TABLE) {
  const hi = daily(c.monthlyMeanMax);
  const lo = daily(c.monthlyMeanMin);
  const meanSum = hi.reduce((a, t, i) => a + Math.max(0, 18 - (t + lo[i]) / 2), 0);
  const now = heatingNeed(c).annual;
  // The pages' figure is Erbs's method month by month, not the old sum over normal days.
  const { means, sigmaYr } = monthlyMeans(c);
  const erbsSum = means.reduce((a, t, m) => a + erbsHdd(t, erbsSigma(t, sigmaYr), MONTH_DAYS[m]), 0);
  if (Math.abs(now - erbsSum) > 0.5) fail(place.slug, `heating degree days ${Math.round(now)} are not Erbs's ${Math.round(erbsSum)}`);
  if (now < meanSum - 1) fail(place.slug, `heating degree days ${Math.round(now)} below the sum over normal days' means ${Math.round(meanSum)}`);
  if (now < hi.reduce((a, t, i) => a + metOfficeHdd(t, lo[i]), 0)) underMetOffice++;
}

// ---- the freezing jobs say where their dates come from --------------------------------------------------
const GRID = /ERA5 weather-model grid/;
const freezing = TASKS.filter((t) => t.signal.kind === "nights-below");
// The "when" tags print on the all-towns calendar, so they name no one source; each town's trigger line does (below).
// Day 5 audit, 14 November 2026: they said "on the weather-model grid" for the 74 towns on station normals too.
for (const t of freezing) {
  if (!/monthly averages/.test(t.when)) fail(t.id, `"${t.when}" does not say the date is from monthly averages`);
  if (/grid|station/.test(t.when)) fail(t.id, `"${t.when}" names one source for every town`);
}
const freezingText = SIGNAL_FAMILIES.find((f) => f.id === "freezing")!.text;
if (!/ERA5/.test(freezingText) || !/weather station/.test(freezingText)) fail("calendar", "the freezing family text does not name both sources (a station's normals, the ERA5 grid)");
for (const t of freezing) if (/weather model's grid, not a weather station/.test(t.detail)) fail(t.id, "the task detail calls every town's date the grid's");
// The "same signal, six towns" table: each freezing date says whether it is a station's or the grid's (Fairbanks and
// Phoenix are on station normals; the row was headed "weather-model grid" for all six).
const freezeRow = SIGNAL_ROWS.find((r) => /nights fall below 0/.test(r.label));
if (!freezeRow || /grid/.test(freezeRow.label)) fail("examples", "the freezing row's label names one source for every column");
else
  for (const town of exampleTowns(undefined, TODAY)) {
    const v = freezeRow.value(town.dates);
    if (v !== "not on average" && !v.endsWith(town.dates.tempsFromStation ? "(station)" : "(model grid)")) fail(town.place.slug, `freezing row "${v}" does not say ${town.dates.tempsFromStation ? "station" : "model grid"}`);
  }
let groundTruthed = 0;
// Day 5 audit (14 November 2026): a town on station normals must not be told its freezing dates come from the grid. The
// lines are written in src/lib/homestead/signals.ts (outside package B1), so the towns are gathered into one failure.
const gridNamedOnStation: string[] = [];
for (const { place, climate } of TABLE) {
  const regime = regimeOf(climate, place.lat);
  const sd = signalDates({ lat: place.lat, lon: place.lon, climate, regime, today: TODAY });
  for (const d of tasksFor(sd, freezing)) {
    if (tempsFromStation(climate)) {
      if (!d.trigger || !d.trigger.includes(tempWords(climate))) {
        if (!gridNamedOnStation.includes(place.slug)) gridNamedOnStation.push(place.slug);
      }
    } else if (!d.trigger || !GRID.test(d.trigger)) fail(place.slug, `${d.task.id}: "${d.trigger}" does not name the grid`);
    if (d.task.id === "barrels-drain" && climate.frostSource === "stations" && !/(at the weather station|pooled from \d+ nearby weather stations), the average first frost is/.test(d.trigger ?? "")) fail(place.slug, "barrels-drain gives no station first frost beside the grid date");
    if (d.task.id === "barrels-drain" && /average first frost is/.test(d.trigger ?? "")) groundTruthed++;
  }
}

if (gridNamedOnStation.length)
  fail("signals.ts", `${gridNamedOnStation.length} towns on station normals get freezing lines that do not name their station (src/lib/homestead/signals.ts must use tempWords(c), not GRID_WORDS): ${gridNamedOnStation.slice(0, 6).join(" ")}…`);

// ---- frost provenance -----------------------------------------------------------------------------------
type FrostEntry = { lastSpringFrostDoy: number; firstFallFrostDoy: number; frostStations: number; station?: { name: string; km: number }; stations: { id: string; name: string; km: number }[] };
const FROSTS = FROST as unknown as Record<string, FrostEntry>;
const pooled: string[] = [];
for (const { place, climate: c } of TABLE) {
  const f = FROSTS[place.slug];
  if (c.frostSource === "stations" && !f) fail(place.slug, "station frost dates in place-normals.json with no entry in place-frost.json");
  if (!f) continue;
  if (f.lastSpringFrostDoy !== c.lastSpringFrostDoy || f.firstFallFrostDoy !== c.firstFallFrostDoy || f.frostStations !== c.frostStations)
    fail(place.slug, "place-frost.json and place-normals.json disagree (run scripts/build-place-frost.ts --apply)");
  const line = frostProvenance(place.slug) ?? "";
  const words = frostSourceWords(c);
  if (/within 15 km/.test(line)) fail(place.slug, `"${line}" claims a 15 km radius`);
  if (f.station) {
    if (f.frostStations !== 1) fail(place.slug, "a one-station entry counts more than one station");
    if (!/^(Average frost dates at |Frost dates at |Frost is rare at )/.test(line) || !line.includes(" km away")) fail(place.slug, `"${line}" does not name its station and distance`);
  } else if (f.stations.length > 1) {
    pooled.push(place.slug);
    const far = Math.max(...f.stations.map((x) => x.km));
    if (!line.includes(`pooled from ${f.stations.length} weather stations`)) fail(place.slug, `"${line}" does not say it is pooled from ${f.stations.length} stations`);
    if (!line.includes(`${far < 10 ? far.toFixed(1).replace(/\.0$/, "") : Math.round(far)} km away`)) fail(place.slug, `"${line}" does not say how far the farthest station is (${far} km)`);
    if (!/^pooled from \d+ weather stations, the nearest /.test(words)) fail(place.slug, `caption "${words}" gives one distance for ${f.stations.length} stations`);
  } else if (!line.includes(" km away")) fail(place.slug, `"${line}" gives no distance`);
}

// ---- the town-station rule on fixed cases ---------------------------------------------------------------
const R = (id: string, km: number, firstOrder: boolean, seasons: number): StationReading => ({ id, name: id, km, firstOrder, seasons, lastSpringFrost: "", firstFallFrost: "", lastSpringFrostDoy: 0, firstFallFrostDoy: 0, frostDaysPerYear: 0 });
const cases: [string, StationReading[], string | null][] = [
  // Boston: Logan (first-order, 4 km) over Jamaica Plain and the Blue Hill, Hingham and Reading co-ops.
  ["boston", [R("LOGAN", 4, true, 30), R("JAMAICA PLAIN", 8.3, false, 30), R("BLUE HILL", 16.9, true, 30), R("READING", 19.2, false, 30)], "LOGAN"],
  // New York: Central Park (first-order, 8 km) over the World Trade Center co-op 0.7 km off.
  ["new-york", [R("WORLD TRADE CTR", 0.7, false, 25), R("CENTRAL PARK", 8, true, 30), R("LAGUARDIA", 12.9, true, 30)], "CENTRAL PARK"],
  // Raleigh: no first-order station within 15 km, so the State University co-op (5.5 km), not the airport at 17.9 km.
  ["raleigh", [R("STATE UNIV", 5.5, false, 30), R("RALEIGH 4 SW", 7, false, 22), R("RDU", 17.9, true, 30)], "STATE UNIV"],
  // Savannah: Hunter Field's record is too short, so the international airport.
  ["savannah", [R("HUNTER FLD", 7.9, true, 14), R("SAVANNAH INTL", 11.9, true, 30)], "SAVANNAH INTL"],
  // Nothing with 20 complete seasons: pooled.
  ["short", [R("A", 3, true, 12), R("B", 9, false, 18)], null],
];
for (const [what, readings, want] of cases) {
  const got = townStation(readings)?.id ?? null;
  if (got !== want) fail(`townStation ${what}`, `picked ${got}, expected ${want}`);
}

// ---- the plan's frost week ----------------------------------------------------------------------------------
if (frostWeekDatable({ frostSource: "stations", frostStations: 9, frostSpreadDays: 10 })) fail("plan", "a frost week named from 9 stations 10 days apart (New York, audit of 10 November 2026)");
if (!frostWeekDatable({ frostSource: "stations", frostStations: 1, frostSpreadDays: null })) fail("plan", "no frost week from a single station");
if (frostWeekDatable({ frostSource: "grid", frostStations: null, frostSpreadDays: null })) fail("plan", "a frost week named from the grid estimate");

// ---- raw manure: both standards -----------------------------------------------------------------------------
const manureTexts = [TASKS.find((t) => t.id === "manure-autumn")!.detail, ...TOPICS.flatMap((t) => [...[...t.facts, ...t.glance].map((f) => `${f.label}: ${f.value}`), ...t.sections.flatMap((g) => g.paragraphs ?? [])]).filter((x) => /raw manure/i.test(x) && /120\s+days/.test(x))];
if (manureTexts.length < 3) fail("manure", `only ${manureTexts.length} raw-manure texts found to check`);
for (const x of manureTexts) if (!/US organic standard/.test(x) || !/CAN\/CGSB-32\.310/.test(x)) fail("manure", `"${x.slice(0, 90)}…" does not name both the US and the Canadian standard`);

// The season with covers (src/lib/homestead/climate.ts frostSeason): within the year and at least the frost-free season.
for (const { place, climate: c } of TABLE) {
  const f = frostSeason(c);
  if (!f.extendedDays) continue;
  const [a, b] = f.extendedDays;
  if (b > 365 || a > b || a < (f.frostFreeDays ?? 0)) fail(place.slug, `season with covers ${a} to ${b} days against ${f.frostFreeDays} frost-free`);
}
for (const slug of ["houston-texas", "new-orleans-louisiana"]) {
  const e = TABLE.find((x) => x.place.slug === slug);
  const f = e ? frostSeason(e.climate) : null;
  if (!f?.extendedDays || f.extendedDays[1] !== 365) fail(slug, `season with covers ${f?.extendedDays?.join(" to ") ?? "missing"}: the covers reach across its short frost season, so it is all year (audit pin)`);
}

// ---- Day 4 audit (13 November 2026): roof water's frozen months, "−0 °C", words run together ----------------------
let nearTowns = 0;
for (const { place, climate: c } of TABLE) {
  const r = roofWater(c);
  if (r) {
    const mean = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
    const near = new Set(r.nearFreezing.map((x) => x.month));
    if (near.size) nearTowns++;
    // The margin is the grid's (FROZEN_MARGIN_C); a station's normals have none (Day 5 audit, 14 November 2026).
    const margin = frozenMarginC(c);
    mean.forEach((t, i) => {
      if (t >= -margin && r.monthlyL[i] === 0 && c.monthlyRainMm![i] > 0) fail(place.slug, `${SHORT_MONTHS[i]} (${t.toFixed(2)} °C) left out of roof water inside the ${margin} °C margin`);
      if (t < -margin && r.monthlyL[i] !== 0) fail(place.slug, `${SHORT_MONTHS[i]} (${t.toFixed(2)} °C) counted as open`);
      if (Math.abs(t) < margin && t >= -margin && !near.has(i + 1)) fail(place.slug, `${SHORT_MONTHS[i]} (${t.toFixed(2)} °C) within a degree of freezing but not named`);
    });
  }
  const ex = getExtremes(place.slug);
  const x = extremeFigures(place.name, c, ex);
  if (/−0(?:\.0)?\s*°C/.test(JSON.stringify(x))) fail(place.slug, `a "−0 °C" in the extremes lines`);
  const regime = regimeOf(c, place.lat);
  const sd = signalDates({ lat: place.lat, lon: place.lon, climate: c, regime, today: "2026-11-13" });
  for (const d of tasksFor(sd)) if (/\b(?:in|from|to|by)(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/.test(d.trigger ?? "")) fail(place.slug, `${d.task.id}: words run together in "${d.trigger}"`);
}
{
  const e = TABLE.find((x) => x.place.slug === "boise-idaho")!;
  const r = roofWater(e.climate)!;
  // On NOAA's normals (+0.1 °C) January is open water; on the grid (−0.05 °C) it must be counted and named as near freezing.
  if (r.monthlyL[0] === 0 || (!tempsFromStation(e.climate) && !r.nearFreezing.some((x) => x.month === 1))) fail("boise-idaho", "January is dropped from roof water, or not named as near freezing on the grid (audit pin: NOAA's January normal is +0.1 °C)");
}

// ---- Day 5 audit (14 November 2026): station normals in place of the grid --------------------------------------------
type SN = { station: { id: string; name: string; km: number }; source: string; monthlyMeanMaxC: number[]; monthlyMeanMinC: number[]; monthlyPrcpMm: number[]; frost?: { lastSpring: string | null; firstFall: string | null; nightsAtOrBelow0C: number } };
const SNT = (STATION_NORMALS as unknown as { towns: Record<string, SN> }).towns;
const RAINT = RAIN as unknown as Record<string, { stationId: string; monthlyRainMm: number[] }>;
let onStation = 0;
for (const { place, climate: c } of TABLE) {
  const sn = SNT[place.slug];
  if (place.countryCode === "US" && !sn) fail(place.slug, "a US town without its NOAA station normals");
  if (!sn) {
    if (tempsFromStation(c)) fail(place.slug, "says its temperatures are a station's, with no entry in place-station-normals.json");
    if (tempWords(c) !== "the ERA5 weather-model grid") fail(place.slug, `grid town's temperatures named "${tempWords(c)}"`);
    continue;
  }
  onStation++;
  const r1 = (x: number) => Math.round(x * 10) / 10;
  if (sn.monthlyMeanMaxC.some((x, i) => r1(x) !== c.monthlyMeanMax[i]) || sn.monthlyMeanMinC.some((x, i) => r1(x) !== c.monthlyMeanMin[i])) fail(place.slug, "place-normals.json monthly means are not the station normals (run scripts/build-station-normals.ts)");
  if (sn.monthlyPrcpMm.some((x, i) => Math.round(x) !== c.monthlyRainMm?.[i]) || c.rainSource !== "station") fail(place.slug, "place-normals.json precipitation is not the station normal");
  if (RAINT[place.slug]?.stationId !== sn.station.id || RAINT[place.slug].monthlyRainMm.join() !== c.monthlyRainMm!.join()) fail(place.slug, "place-rain.json does not hold the station normal place-normals.json uses");
  if (!tempWords(c).includes(` ${sn.station.km} km away`)) fail(place.slug, `temperatures named "${tempWords(c)}", not the station ${sn.station.km} km away`);
  if (sn.frost) {
    const f = FROSTS[place.slug] as FrostEntry & { method?: string };
    if (f?.station?.name !== sn.station.name || !f.method?.startsWith("NOAA")) fail(place.slug, "frost dates are not NOAA's for the town's station");
  }
}
const at = (slug: string) => TABLE.find((x) => x.place.slug === slug);
const frostPin = (slug: string, last: string, first: string) => {
  const e = at(slug);
  if (e && (e.climate.lastSpringFrost !== last || e.climate.firstFallFrost !== first)) fail(slug, `frost dates ${e.climate.lastSpringFrost} – ${e.climate.firstFallFrost}, pinned to NOAA's ${last} – ${first} (Day 5 audit)`);
};
frostPin("portland-oregon", "Mar 13", "Nov 19");
frostPin("fairbanks-alaska", "May 13", "Sep 13");
frostPin("spokane-washington", "Apr 26", "Oct 15");
frostPin("austin-texas", "Feb 20", "Dec 3");
if (at("grand-rapids-michigan") && at("grand-rapids-michigan")!.climate.firstFallFrost !== "Oct 20") fail("grand-rapids-michigan", "first frost is not NOAA's Oct 20 (Day 5 audit)");
const stationPin: [string, string][] = [
  ["portland-oregon", "PORTLAND INTL AP"],
  ["fairbanks-alaska", "FAIRBANKS INTL AP"],
  ["spokane-washington", "SPOKANE FELTS FLD"],
  ["austin-texas", "AUSTIN-CAMP MABRY"],
  ["kelowna-british-columbia", "KELOWNA MWS0"],
  ["thompson-manitoba", "THOMPSON A"],
  ["niagara-on-the-lake-ontario", "YOUNGSTOWN 1S"],
];
for (const [slug, name] of stationPin) if (at(slug) && (at(slug)!.climate as Climate & { tempStation?: string }).tempStation !== name) fail(slug, `temperatures are not ${name}'s (Day 5 audit pin)`);
const means = (c: Climate) => c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
const koppenPin: [string, string][] = [
  ["kelowna-british-columbia", "Dfb"],
  ["thompson-manitoba", "Dfc"],
  ["kingston-ontario", "Dfb"],
  ["spokane-washington", "Dsb"],
  ["grand-forks-north-dakota", "Dfb"],
];
for (const [slug, k] of koppenPin) {
  const e = at(slug);
  if (e && koppen(means(e.climate), e.climate.monthlyRainMm!, e.place.lat) !== k) fail(slug, `Köppen ${koppen(means(e.climate), e.climate.monthlyRainMm!, e.place.lat)}, pinned ${k} (Day 5 audit)`);
}
for (const slug of ["bozeman-montana", "seattle-washington"]) {
  const e = at(slug);
  if (e && coldHeat(e.climate).coldest.month !== 12) fail(slug, `coldest month ${SHORT_MONTHS[coldHeat(e.climate).coldest.month - 1]}, pinned December (Day 5 audit)`);
}
{
  const e = at("kelowna-british-columbia");
  const start = e ? coldHeat(e.climate).below0.main?.start : null;
  // ERA5 put Kelowna's average nights below 0 °C 33 days late, into December; Kelowna MWS0's normals put it in November.
  if (e && (start == null || start < 305 || start > 334)) fail("kelowna-british-columbia", `average nights freeze from ${start ? dayLabel(start) : "never"}, pinned to November (Day 5 audit)`);
}
const frozenPin: [string, number[]][] = [
  ["grand-forks-north-dakota", [11]],
  ["international-falls-minnesota", [11]],
  ["fairbanks-alaska", [10]],
  ["laramie-wyoming", [3, 11]],
];
for (const [slug, months] of frozenPin) {
  const e = at(slug);
  const r = e ? roofWater(e.climate) : null;
  for (const m of months) if (r && r.monthlyL[m - 1] !== 0) fail(slug, `roof water counts ${SHORT_MONTHS[m - 1]}, frozen at the station (Day 5 audit)`);
}
{
  const e = at("niagara-on-the-lake-ontario");
  const mm = e?.climate.monthlyRainMm?.reduce((a, b) => a + b, 0) ?? 0;
  if (e && (mm < 860 || mm > 890)) fail("niagara-on-the-lake-ontario", `${mm} mm a year, not Youngstown 1S's 873 (NOAA 1991–2020; Day 5 audit)`);
}
console.log(`\nTowns on station normals: ${onStation} of ${TABLE.length}`);

console.log(`\nTowns with a month counted in roof water within ${FROZEN_MARGIN_C} °C of freezing, and named on the page: ${nearTowns}`);
console.log(`\nHeating degree days against NOAA 1991–2020 (base 65 °F = 18.3 °C):\n${hddLines.join("\n")}`);
console.log(`\nTowns now below the old Met Office day-formula figure (a different definition, see pin 3): ${underMetOffice}`);
console.log(`barrels-drain lines with the station's first frost beside the grid date: ${groundTruthed}`);
console.log(`Frost dates still pooled from several stations, waiting for scripts/build-place-frost.ts to run with station data (${pooled.length}): ${pooled.join(" ")}`);
if (failures.length) {
  console.log(`\nFAILED (${failures.length}):\n${failures.map((x) => "  " + x).join("\n")}`);
  process.exit(1);
}
console.log("All homestead checks passed.");
