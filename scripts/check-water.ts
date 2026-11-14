/**
 * Checks the water setting for ALL 264 towns in src/data/place-normals.json and exits non-zero on any violation
 * (audit of the Day 2 regions, 10 November 2026: C10, the coarse coast grid, and the empty named-waters look-up).
 *
 *  1. The open sea ("on") only where the town's own grid cell is within 10 km of the coastline and no tidal reach
 *     applies; a tidal reach never reads as the open coast.
 *  2. A fresh or merely tidal reach with no open coast near has no sea or estuary water; an estuary reach has one.
 *  3. "The open sea, from beach, rock and boat" (fishing line), "on the sea coast" (climate line) and "The open sea,
 *     within about 10 km" (Water column) only where the coast is "on".
 *  4. A failed map look-up never prints "No named river is mapped"; it says the map service did not answer.
 *  5. An Overpass answer with a timeout or error remark, or one cut at its output limit, is a failure, not "no water".
 *  6. Every tidal reach and water fix has an https source and fires at a town; reach boxes do not overlap.
 *  7. Prince Edward Island's tidal waters go to DFO's Gulf Region; Nova Scotia's and New Brunswick's to the Maritimes.
 *  And pins for the towns the audit read.
 *
 * Day 3 audit (11 November 2026):
 *  8. A failed map look-up keeps every kind of fresh water the town's records vouch for: a lake where a fish recorded within
 *     10 km takes to lakes, a cold stream where a cold-stream fish is recorded within 10 km in a climate cool enough for
 *     trout streams (Asheville showed no trout at all).
 *  9. A reach 10 to 30 km out (TIDAL_REACHES `away`) is never the water the town is on: no "A tidal-river place", no
 *     "on the tidal …", and every line that names it says how far it is.
 * 10. A confluence (WATER_FIXES `confluence`) is named whole in the Water column, the climate line and the fishing line,
 *     and a named river that is one of the great rivers is not listed again.
 *  Pins: Pittsburgh's three rivers, Brownsville's Lower Laguna Madre, Asheville's cold streams after a failed look-up,
 *  Houston's Kinder Lake.
 *
 * Day 4 audit (13 November 2026):
 * 11. A failed look-up at a coastal town where a fish of estuaries is recorded within 10 km keeps the estuary (Tampa,
 *     Miami and Fort Lauderdale read only "The sea").
 * 12. An answer that names no still water keeps the lakes and ponds that still-water fish recorded within 10 km vouch for
 *     (Albuquerque, on the Rio Grande, had no still water at all).
 * 13. A bay reach is never "A tidal-river place", and no reach-town line calls it the open sea.
 *  Pins: Tampa Bay, San Jose's South San Francisco Bay, Biscayne Bay at Miami, Albuquerque's ponds after an empty answer,
 *  and the dry rivers and show lake (Salt, Rillito, Santa Cruz, Lake of Dreams) and the Los Angeles River's soft flag.
 *
 * Day 5 audit (14 November 2026):
 * 14. Salt water inside an inland sea (water-setting INLAND_SEAS, the Salish Sea) is never the open sea: no "open sea",
 *     "open coast", "Sea coast", "The sea is the main fishery" or surf beaches at a town whose setting has `inlandSea`; and
 *     every town whose own cell is coastal inside an INLAND_SEAS box gets it.
 * 15. Lake names: never "Lake X Lake", "Lake X Bay" or "Lake X Channel"; every lake of the grid that English names "X Lake"
 *     reads so; a lake's area says whose measure it is.
 * 16. Every water fix has an https source and changes at least one town.
 *  Pins: Seattle on Puget Sound, Vancouver and Nanaimo on the Strait of Georgia, Victoria on the Strait of Juan de Fuca;
 *  Halifax and Boston, on the open coast, unchanged; Great Slave Lake, Rainy Lake and the Rainy River; Okanagan Lake at
 *  Kelowna, the Yukon at Whitehorse, the Fraser at Vancouver, the Willamette and the Columbia at Portland, the Red River at
 *  Grand Forks; Spokane above Grand Coulee.
 *
 * Run (from the project root):
 *   npx esbuild scripts/check-water.ts --bundle --platform=node --format=esm --alias:@=./src \
 *     --outfile=/tmp/check-water.mjs --log-level=warning && node /tmp/check-water.mjs [-v]
 * With -v it prints every town whose setting the tidal reaches change.
 */
import { existsSync, readFileSync } from "node:fs";
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import { lakeName } from "../src/lib/water-names";
import { INLAND_SEAS, TIDAL_REACHES, WATER_FIXES, gridSetting, flagWater, troutWatersAt, waterSetting, type TidalKind, type WaterSetting } from "../src/lib/water-setting";
import { habitatsOf } from "../src/lib/fish-habitats";
import { presentFish } from "../src/lib/fish-presence";
import { riverKey } from "../src/lib/place-profile";
import { isInfrastructureWater, overpassElements, pickWaters, unavailableWaters, watersQueries } from "../src/lib/waters";
import { placeProfile, waterLines, waterTitle } from "../src/lib/place-profile";
import { regimeOf } from "../src/lib/regime";
import { tidalPageFor } from "../src/data/regulator-pages";
import grid from "../src/data/water-grid.json";
import type { Climate, LocalData, Place, WaterBody } from "../src/lib/types";

const verbose = process.argv.includes("-v");
type Entry = { place: Place; climate: Climate };
const TOWNS = NORMALS as unknown as Entry[];

const violations: string[] = [];
const fail = (msg: string) => {
  violations.push(msg);
  console.log(`VIOLATION ${msg}`);
};

// Named waters from the live store's backup, as check-fish reads them.
const BACKUP = "/home/claude/rebuild/blobs-guides.jsonl";
const cached = new Map<string, WaterBody[]>();
if (existsSync(BACKUP)) {
  for (const line of readFileSync(BACKUP, "utf8").split("\n")) {
    if (!line.startsWith('{"k":"waters:v2:')) continue;
    try {
      const o = JSON.parse(line) as { k: string; v: unknown };
      const v = typeof o.v === "string" ? JSON.parse(o.v) : o.v;
      cached.set(o.k, (((v as { value?: WaterBody[] }).value ?? []) as WaterBody[]).filter((w) => !isInfrastructureWater(w.name)));
    } catch {}
  }
}

// The grid's own coast band at the town's cell, read the way water-setting reads it.
const G = grid as unknown as { step: number; lat0: number; lon0: number; rows: number; cols: number; coast: number[][] };
function band(lat: number, lon: number): number {
  const r = Math.floor((lat - G.lat0) / G.step);
  const c = Math.floor((lon - G.lon0) / G.step);
  if (r < 0 || r >= G.rows || c < 0 || c >= G.cols) return 0;
  const row = G.coast[r];
  let end = -1;
  for (let i = 0; i < row.length; i += 3) {
    const start = end + 1 + row[i];
    end = start + row[i + 1] - 1;
    if (c < start) return 0;
    if (c <= end) return row[i + 2];
  }
  return 0;
}

const settings = new Map<string, { place: Place; w: WaterSetting; d: LocalData }>();
const fired = new Set<string>();
for (const { place, climate } of TOWNS) {
  const waters = cached.get(`waters:v2:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`) ?? [];
  const w = waterSetting(place.lat, place.lon, waters, climate);
  const d = { place, climate, water: w, regime: climate ? regimeOf(climate, place.lat) : null } as unknown as LocalData;
  settings.set(place.slug, { place, w, d });
  if (w.tidal) fired.add(w.tidal.water);
  const b = band(place.lat, place.lon);
  const p = placeProfile(d);
  const lines = waterLines(w);
  const marine = w.groups.includes("sea") || w.groups.includes("estuary");

  // 1.
  if (w.coast === "on" && b < 2) fail(`${place.slug}: coast "on" but its own cell is band ${b}`);
  if (w.tidal && w.coast === "on") fail(`${place.slug}: on a tidal reach (${w.tidal.water}) but reads as the open coast`);
  // 2.
  if (w.tidal && w.tidal.kind !== "estuary" && !w.coast && marine) fail(`${place.slug}: ${w.tidal.kind} reach with no open coast near, but has ${w.groups.join(", ")}`);
  if (w.tidal?.kind === "estuary" && !w.groups.includes("estuary")) fail(`${place.slug}: estuary reach without the estuary water group`);
  // 3.
  if (/open sea/.test(p.fishing) && w.coast !== "on") fail(`${place.slug}: fishing line says the open sea, coast is ${w.coast}: ${p.fishing}`);
  if (/sea coast/.test(p.setting) && w.coast !== "on") fail(`${place.slug}: climate line says the sea coast, coast is ${w.coast}`);
  if (lines.some((x) => /open sea/.test(x)) && w.coast !== "on") fail(`${place.slug}: Water column says the open sea, coast is ${w.coast}`);
  if (w.tidal && waterTitle(w) === "Inland water") fail(`${place.slug}: on ${w.tidal.water} but titled "Inland water"`);
  if (w.groups.includes("sea") && !w.coast) fail(`${place.slug}: sea water group with no coast`);
  // 9. A reach 10 to 30 km out.
  if (w.tidal?.away) {
    if (waterTitle(w) === "A tidal-river place") fail(`${place.slug}: titled "A tidal-river place", but ${w.tidal.water} is ${w.tidal.away}`);
    if (/on the tidal/.test(p.setting)) fail(`${place.slug}: climate line puts the town on a reach ${w.tidal.away}: ${p.setting}`);
    for (const x of [p.fishing, ...lines.filter((l) => l.includes(w.tidal!.water) || l.includes(w.tidal!.water.replace(/^the /, "The ")))])
      if (x.includes(w.tidal.water.replace(/^the /, "")) && !x.includes(w.tidal.away)) fail(`${place.slug}: "${x}" names ${w.tidal.water} without its distance`);
    if (lines.some((l) => /at the town/.test(l))) fail(`${place.slug}: a reach ${w.tidal.away} is called water at the town`);
  }
  // 10. A confluence named whole, and no great river listed twice.
  if (w.confluence) {
    const all = [...w.confluence.rivers, ...(w.confluence.forms ? [w.confluence.forms] : [])];
    for (const r of all) {
      if (!p.fishing.includes(r)) fail(`${place.slug}: fishing line leaves out the ${r}: ${p.fishing}`);
      if (!lines.some((l) => l.includes(r))) fail(`${place.slug}: Water column leaves out the ${r}`);
    }
    if (/its feeder rivers/.test(p.fishing)) fail(`${place.slug}: a confluence town reads "its feeder rivers"`);
  }
  const bigKeys = new Set([w.bigRiver, ...(w.confluence?.rivers ?? []), w.confluence?.forms].filter(Boolean).map((x) => riverKey(x!)));
  const riversLine = lines.find((l) => l.startsWith("Rivers: "));
  if (riversLine && riversLine.slice(8).replace(/\.$/, "").split(/, | and /).some((x) => bigKeys.has(riverKey(x)))) fail(`${place.slug}: "${riversLine}" repeats a great river`);

  // 8. A failed map look-up: the kinds of fresh water the records vouch for are kept.
  const wu = waterSetting(place.lat, place.lon, unavailableWaters(), climate);
  const pres = presentFish(place.slug);
  if (pres.checked && !pres.dataPoor)
    for (const f of Object.values(pres.fish)) {
      if (f.status !== "recorded" || (f.withinKm ?? 99) > 10) continue;
      const hs = habitatsOf(f.slug);
      for (const h of hs) if (["lake", "pond", "river"].includes(h) && !wu.habitats.includes(h)) fail(`${place.slug}: a failed look-up loses ${h}, vouched for by ${f.slug} within 10 km`);
      if (hs[0] === "cold-stream" && wu.coldStreams && !wu.habitats.includes("cold-stream")) fail(`${place.slug}: a failed look-up loses cold streams, vouched for by ${f.slug} within 10 km`);
    }
  if (!wu.habitats.includes("pond") || !wu.habitats.includes("river")) fail(`${place.slug}: a failed look-up lost the pond and river fallback`);

  // 11, 12. Day 4: the estuary after a failed look-up, and still water after an answer that names none.
  const near = pres.checked && !pres.dataPoor ? Object.values(pres.fish).filter((f) => f.status === "recorded" && (f.withinKm ?? 99) <= 10) : [];
  if (wu.coast && near.some((f) => habitatsOf(f.slug)[0] === "estuary") && !wu.groups.includes("estuary")) fail(`${place.slug}: a failed look-up at the coast deletes the estuary`);
  const stillOnly = near.filter((f) => habitatsOf(f.slug).every((h) => ["big-lake", "lake", "pond"].includes(h)));
  const we = waterSetting(place.lat, place.lon, [], climate);
  if (stillOnly.length && !we.groups.includes("lakes")) fail(`${place.slug}: an empty answer drops the lakes, vouched for by ${stillOnly.map((f) => f.slug).join(", ")} within 10 km`);
  const stillNamed = waters.some((x) => x.kind === "lake" || x.kind === "reservoir");
  if (!stillNamed && !w.bigLake && w.namedWaters !== "unavailable" && stillOnly.length && !w.groups.includes("lakes")) fail(`${place.slug}: no named still water, and the lakes are dropped`);
  // (The old pond fallback, for a town with no water at all, adds a pond, not a lake: Nairobi.)
  if (stillNamed && !w.lakes.length && !w.bigLake && w.habitats.includes("lake") && !troutWatersAt(place.lat, place.lon).some((t) => t.still.length))
    fail(`${place.slug}: every named still water is unfit, yet a lakes section is added`);
  // 14. An inland sea is not the open sea (Day 5 audit).
  const inSeaBox = INLAND_SEAS.some((x) => place.lat >= x.box.minLat && place.lat <= x.box.maxLat && place.lon >= x.box.minLon && place.lon <= x.box.maxLon);
  if (inSeaBox && w.coast && !w.tidal && !w.inlandSea) fail(`${place.slug}: coastal inside an inland sea's box, but no inlandSea`);
  if (w.inlandSea) {
    const said = [p.setting, p.turnsOn, p.fishing, ...p.facts, ...lines];
    for (const x of said) if (/open sea|open coast|surf|Sea coast|The sea is the main fishery/.test(x)) fail(`${place.slug}: on ${w.inlandSea.water}, yet reads "${x}"`);
    if (w.habitats.includes("surf")) fail(`${place.slug}: on ${w.inlandSea.water}, yet has surf beaches`);
    if (!lines.some((l) => l.includes(w.inlandSea!.says))) fail(`${place.slug}: the Water column does not say what ${w.inlandSea.water} is`);
    // Package D (Day 5): a setting stored before 14 November 2026 has no inlandSea (and still has the surf). With the place,
    // place-profile works it out at render time, so the stored setting reads the same as a fresh one.
    const stored = { ...w, habitats: [...w.habitats, "surf"] } as WaterSetting;
    delete (stored as { inlandSea?: unknown }).inlandSea;
    const sp = placeProfile({ ...(d as object), water: stored } as LocalData);
    const storedSaid = [sp.setting, sp.turnsOn, sp.fishing, ...sp.facts, ...waterLines(stored, place)];
    for (const x of storedSaid) if (/open sea|open coast|surf|Sea coast|The sea is the main fishery/.test(x)) fail(`${place.slug}: a stored setting without inlandSea reads "${x}"`);
    if (waterLines(stored, place).join(" ") !== lines.join(" ")) fail(`${place.slug}: a stored setting's Water column differs from a fresh one's`);
  }
  // 13. A bay is not a river.
  if (w.tidal?.bay && waterTitle(w) === "A tidal-river place") fail(`${place.slug}: ${w.tidal.water} is a bay, titled "A tidal-river place"`);
}

// 4. A failed look-up.
{
  const t = TOWNS.find((x) => x.place.slug === "atlanta-georgia") ?? TOWNS[0];
  const w = waterSetting(t.place.lat, t.place.lon, unavailableWaters(), t.climate);
  const lines = waterLines(w);
  if (w.namedWaters !== "unavailable") fail(`unavailable list read as "${w.namedWaters}"`);
  if (lines.some((x) => /No named/.test(x))) fail(`a failed look-up prints "no named water": ${lines.join(" | ")}`);
  if (!lines.some((x) => /did not answer/.test(x))) fail("a failed look-up does not say the map service did not answer");
  const none = waterSetting(t.place.lat, t.place.lon, [], t.climate);
  if (none.namedWaters !== "none") fail(`an empty answer read as "${none.namedWaters}"`);
}

// 5. Overpass answers.
const expectThrow = (label: string, f: () => unknown) => {
  try {
    f();
    fail(`overpass: ${label} was taken as an answer`);
  } catch {}
};
expectThrow("a timeout remark", () => overpassElements({ elements: [], remark: "runtime error: Query timed out in \"query\" at line 1 after 12 seconds." }, 100));
expectThrow("an out-of-memory remark", () => overpassElements({ elements: [], remark: "runtime error: Query run out of memory using about 2048 MB of RAM." }, 100));
expectThrow("an answer cut at its limit", () => overpassElements({ elements: Array.from({ length: 5 }, () => ({})) }, 5));
if (overpassElements({ elements: [{}] }, 5).length !== 1) fail("overpass: a whole answer was refused");
{
  const q = watersQueries(33.75, -84.39, 11);
  if (/around:/.test(q.rivers + q.still)) fail("overpass: the queries use around, which is slow over a city");
  if (!/waterway"="river"/.test(q.rivers) || /natural/.test(q.rivers)) fail("overpass: the river query asks for more than rivers");
  if (!/\[timeout:11\]/.test(q.rivers) || !/\[timeout:11\]/.test(q.still)) fail("overpass: the server timeout is not the one asked for");
  const picked = pickWaters(
    [
      { tags: { name: "Chattahoochee River", waterway: "river" }, center: { lat: 33.8, lon: -84.45 } },
      { tags: { name: "Peachtree Creek", waterway: "stream" }, center: { lat: 33.81, lon: -84.4 } },
      { tags: { name: "Settling Basin", natural: "water", water: "basin" }, center: { lat: 33.76, lon: -84.39 } },
    ],
    33.75,
    -84.39,
  );
  if (picked.map((x) => x.name).join("|") !== "Chattahoochee River|Peachtree Creek" && picked.map((x) => x.name).join("|") !== "Peachtree Creek|Chattahoochee River")
    fail(`pickWaters kept ${picked.map((x) => x.name).join(", ")}`);
}

// 6. The data fixes.
// A reach written for a parked town (src/lib/scope.ts) still has to be a reach of that town: the whole table is read
// for this one question, so the record is checked without the town being served.
for (const { place, climate } of (NORMALS_ALL as unknown as Entry[]).filter((e) => !townServed_(e.place.countryCode))) {
  const w = waterSetting(place.lat, place.lon, cached.get(`waters:v2:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`) ?? [], climate);
  if (w.tidal) fired.add(w.tidal.water);
}
for (const t of TIDAL_REACHES) {
  if (!t.source.split(" ; ").every((u) => /^https:\/\//.test(u.trim()))) fail(`reach ${t.water}: source is not https: ${t.source}`);
  if (!fired.has(t.water)) fail(`reach ${t.water} applies to no town`);
  for (const o of TIDAL_REACHES)
    if (o !== t && t.box.minLat < o.box.maxLat && o.box.minLat < t.box.maxLat && t.box.minLon < o.box.maxLon && o.box.minLon < t.box.maxLon) fail(`reaches ${t.water} and ${o.water} overlap`);
}

for (const f of WATER_FIXES) if (!f.source.split(" ; ").every((u) => /^https:\/\//.test(u.trim()))) fail(`water fix: source is not https: ${f.source}`);
for (const f of WATER_FIXES.filter((x) => x.confluence))
  if (![...settings.values()].some((x) => x.w.confluence === f.confluence)) fail(`confluence ${f.confluence!.rivers.join("/")} applies to no town`);

// 7. The tidal regulator.
const host = (cc: string, a: string) => {
  const p = tidalPageFor({ countryCode: cc, admin1: a });
  return p ? new URL(p.url).host : null;
};
if (host("CA", "Prince Edward Island") !== "www.glf.dfo-mpo.gc.ca") fail(`PEI tidal waters go to ${host("CA", "Prince Edward Island")}, not DFO Gulf Region`);
if (host("CA", "PE") !== "www.glf.dfo-mpo.gc.ca") fail("PE (code) tidal waters are not DFO Gulf Region");
for (const a of ["Nova Scotia", "New Brunswick"]) if (host("CA", a) !== "www.dfo-mpo.gc.ca") fail(`${a} tidal waters go to ${host("CA", a)}, not DFO Maritimes`);

// ---- Pins: the towns the audit read --------------------------------------------------------------------------------
type Pin = { coast?: WaterSetting["coast"]; tidal?: TidalKind | null; groups?: string[]; notGroups?: string[]; title?: string; river?: string };
const PINS: Record<string, Pin> = {
  "moncton-new-brunswick": { coast: "near", tidal: "estuary", groups: ["estuary"], title: "A tidal-river place" },
  "philadelphia-pennsylvania": { coast: null, tidal: "fresh", notGroups: ["sea", "estuary"], groups: ["rivers"], river: "Delaware" },
  "washington-district-of-columbia": { coast: null, tidal: "fresh", notGroups: ["sea", "estuary"], groups: ["rivers"], river: "Potomac" },
  "richmond-virginia": { coast: null, tidal: "fresh", notGroups: ["sea", "estuary"], groups: ["rivers"], river: "James" },
  "baltimore-maryland": { coast: null, tidal: "estuary", groups: ["estuary"], notGroups: ["sea"] },
  "savannah-georgia": { coast: "near", tidal: "estuary", groups: ["estuary", "rivers"] },
  "jacksonville-florida": { coast: "near", tidal: "estuary", groups: ["estuary", "rivers"], title: "A tidal-river place", river: "St. Johns" },
  // Not regressions: the open-coast towns stay on the sea.
  "halifax-nova-scotia": { coast: "on", tidal: null, groups: ["sea"] },
  "saint-john-new-brunswick": { coast: "on", tidal: null, groups: ["sea"] },
  "charlottetown-prince-edward-island": { coast: "on", tidal: null, groups: ["sea"] },
  "portland-maine": { coast: "on", tidal: null, groups: ["sea"] },
  "boston-massachusetts": { coast: "on", tidal: null, groups: ["sea"] },
  "new-york-new-york": { coast: "on", tidal: null, groups: ["sea"] },
  "fredericton-new-brunswick": { coast: null, tidal: null, river: "Saint John" },
  "atlanta-georgia": { coast: null, tidal: null },
};
for (const [slug, pin] of Object.entries(PINS)) {
  const s = settings.get(slug);
  if (!s) {
    fail(`pin: ${slug} is not among the towns`);
    continue;
  }
  const { w } = s;
  if (pin.coast !== undefined && w.coast !== pin.coast) fail(`pin ${slug}: coast ${w.coast}, expected ${pin.coast}`);
  if (pin.tidal !== undefined && (w.tidal?.kind ?? null) !== pin.tidal) fail(`pin ${slug}: tidal ${w.tidal?.kind ?? null}, expected ${pin.tidal}`);
  for (const g of pin.groups ?? []) if (!w.groups.includes(g as never)) fail(`pin ${slug}: missing water group ${g} (has ${w.groups.join(", ")})`);
  for (const g of pin.notGroups ?? []) if (w.groups.includes(g as never)) fail(`pin ${slug}: has water group ${g}`);
  if (pin.title && waterTitle(w) !== pin.title) fail(`pin ${slug}: titled "${waterTitle(w)}", expected "${pin.title}"`);
  if (pin.river && w.bigRiver !== pin.river) fail(`pin ${slug}: big river ${w.bigRiver}, expected ${pin.river}`);
}
{
  // Day 3 pins.
  const pit = settings.get("pittsburgh-pennsylvania");
  if (pit) {
    const lines = waterLines(pit.w);
    if (!lines.includes("The Allegheny and the Monongahela meet here to form the Ohio.")) fail(`pin pittsburgh: Water column reads ${lines.join(" | ")}`);
    if (placeProfile(pit.d).fishing !== "Fishing around Pittsburgh means the three rivers (the Allegheny, Monongahela and Ohio) and lakes, dams and ponds. Each holds its own fish.")
      fail(`pin pittsburgh: fishing line reads "${placeProfile(pit.d).fishing}"`);
    if (!/where the Allegheny and the Monongahela meet to form the Ohio/.test(placeProfile(pit.d).setting)) fail(`pin pittsburgh: climate line reads "${placeProfile(pit.d).setting}"`);
  }
  const bro = settings.get("brownsville-texas");
  if (bro) {
    const { w } = bro;
    if (w.coast !== null || w.groups.includes("sea")) fail(`pin brownsville: coast ${w.coast}, groups ${w.groups}; the open Gulf beach is about 36 km away`);
    if (w.tidal?.water !== "the Lower Laguna Madre and the Brownsville Ship Channel" || w.tidal.away !== "10 to 30 km away" || !w.groups.includes("estuary")) fail(`pin brownsville: reach ${JSON.stringify(w.tidal)}`);
    if (waterTitle(w) !== "A river place") fail(`pin brownsville: titled "${waterTitle(w)}"`);
    if (waterLines(w).some((l) => /open coast|Rivers: Rio Grande/.test(l))) fail(`pin brownsville: Water column reads ${waterLines(w).join(" | ")}`);
  }
  const ash = TOWNS.find((t) => t.place.slug === "asheville-north-carolina");
  if (ash) {
    const wu = waterSetting(ash.place.lat, ash.place.lon, unavailableWaters(), ash.climate);
    // Day 5 audit: the trout water is North Carolina's designation (TROUT_WATERS), not the climate threshold.
    for (const h of ["lake", "river"]) if (!wu.habitats.includes(h as never)) fail(`pin asheville: a failed look-up has no ${h} (${wu.habitats})`);
    if (!wu.habitats.includes("cold-stream") && !wu.habitats.includes("trout-river")) fail(`pin asheville: a failed look-up has no trout water (${wu.habitats})`);
    if (!waterLines(wu).some((l) => /did not answer/.test(l))) fail("pin asheville: a failed look-up does not say so");
  }
  if (flagWater({ name: "Kinder Lake", kind: "lake", distanceKm: 1 }, 29.7589, -95.3677)?.kind !== "no-fishing") fail("pin houston: Kinder Lake is offered as fishing water");
  if (flagWater({ name: "Kinder Lake", kind: "lake", distanceKm: 1 }, 45.0, -75.0)) fail("pin: a Kinder Lake far from Houston is flagged");
  if (!isInfrastructureWater("Reflection Pool")) fail("pin houston: a reflection pool is listed as a lake");
}
{
  // Day 4 pins.
  const tam = settings.get("tampa-florida");
  if (tam) {
    if (tam.w.coast !== null || tam.w.tidal?.water !== "Tampa Bay" || tam.w.groups.includes("sea") || !tam.w.groups.includes("estuary")) fail(`pin tampa: coast ${tam.w.coast}, reach ${JSON.stringify(tam.w.tidal)}, groups ${tam.w.groups}`);
    if (waterTitle(tam.w) !== "A bayside place" || !/on Tampa Bay/.test(placeProfile(tam.d).setting)) fail(`pin tampa: "${waterTitle(tam.w)}", "${placeProfile(tam.d).setting}"`);
  }
  const sj = settings.get("san-jose-california");
  if (sj) {
    if (sj.w.coast !== null || sj.w.groups.includes("sea") || sj.w.tidal?.water !== "South San Francisco Bay" || sj.w.tidal.away !== "10 to 30 km away") fail(`pin san jose: coast ${sj.w.coast}, reach ${JSON.stringify(sj.w.tidal)}`);
    if (sj.w.lakes.some((l) => /lagoon/i.test(l.name))) fail(`pin san jose: a lagoon on the bay is listed as a lake (${sj.w.lakes.map((l) => l.name).join(", ")})`);
  }
  const mia = settings.get("miami-florida");
  if (mia && (mia.w.coast !== "on" || mia.w.estuary !== "Biscayne Bay")) fail(`pin miami: coast ${mia.w.coast}, estuary ${mia.w.estuary}`);
  const abq = TOWNS.find((t) => t.place.slug === "albuquerque-new-mexico");
  if (abq) {
    const we = waterSetting(abq.place.lat, abq.place.lon, [], abq.climate);
    if (!we.groups.includes("lakes") || !we.habitats.includes("trout-river")) fail(`pin albuquerque: an empty answer gives ${we.habitats}`);
  }
  const flag = (name: string, kind: string, lat: number, lon: number) => flagWater({ name, kind, distanceKm: 1 }, lat, lon);
  if (flag("Salt River", "river", 33.4484, -112.0741)?.kind !== "dry-river") fail("pin phoenix: the Salt River is offered as fishing water");
  if (flag("Salt River", "river", -33.92, 18.47)?.kind === "dry-river") fail("pin: Cape Town's Salt River took Phoenix's reason");
  for (const n of ["Rillito River", "Santa Cruz River", "West Branch Santa Cruz River"]) if (!flag(n, "river", 32.2229, -110.9748)?.certain) fail(`pin tucson: ${n} is offered as fishing water`);
  if (flag("Santa Cruz River", "river", 36.97, -122.03)) fail("pin: the Santa Cruz River in California took Tucson's reason");
  if (flag("Lake of Dreams", "lake", 36.1674, -115.1484)?.kind !== "no-fishing") fail("pin las vegas: Lake of Dreams is offered as fishing water");
  const lar = flag("Los Angeles River", "river", 34.0537, -118.2428);
  if (!lar || lar.certain || !/Glendale Narrows/.test(lar.reason)) fail("pin los angeles: the river should be kept, with its concrete-channel reason");
  if (flag("Corrales Riverside Drain", "stream", 35.0841, -106.651)) fail("pin albuquerque: a stocked trout drain is dropped as a drainage channel");
}
{
  // Day 5 pins: the Salish Sea.
  const SALISH: Record<string, string> = {
    "seattle-washington": "Puget Sound",
    "vancouver-british-columbia": "the Strait of Georgia",
    "nanaimo-british-columbia": "the Strait of Georgia",
    "victoria-british-columbia": "the Strait of Juan de Fuca",
  };
  for (const [slug, water] of Object.entries(SALISH)) {
    const s = settings.get(slug);
    if (!s) {
      fail(`pin: ${slug} is not among the towns`);
      continue;
    }
    if (s.w.inlandSea?.water !== water) fail(`pin ${slug}: inland sea ${JSON.stringify(s.w.inlandSea)}, expected ${water}`);
    if (!placeProfile(s.d).setting.includes(`on ${water}`)) fail(`pin ${slug}: climate line reads "${placeProfile(s.d).setting}"`);
    if (!s.w.groups.includes("sea")) fail(`pin ${slug}: the Salish Sea's salt-water fish lost their section`);
  }
  for (const slug of ["halifax-nova-scotia", "boston-massachusetts"]) {
    const s = settings.get(slug);
    if (s && (s.w.inlandSea || !placeProfile(s.d).fishing.includes("the open sea, from beach, rock and boat"))) fail(`pin ${slug}: an open-coast town lost its open sea`);
  }
  for (const x of INLAND_SEAS) if (!x.source.split(" ; ").every((u) => /^https:\/\//.test(u.trim()))) fail(`inland sea ${x.water}: source is not https`);
}
{
  // Day 5: names and main waters.
  const G2 = grid as unknown as { lakes: { name: string }[] };
  for (const l of G2.lakes) {
    const n = lakeName(l.name);
    if (/^Lake .*\b(Lake|Bay|Channel|Sea)\b/.test(n)) fail(`lake name: "${l.name}" reads "${n}"`);
  }
  for (const [raw, want] of [["Great Slave", "Great Slave Lake"], ["Rainy", "Rainy Lake"], ["Woods", "Lake of the Woods"], ["Georgian Bay", "Georgian Bay"], ["Ontario", "Lake Ontario"]])
    if (lakeName(raw) !== want) fail(`pin: lakeName("${raw}") is "${lakeName(raw)}", expected "${want}"`);
  for (const { w } of settings.values()) {
    const line = waterLines(w).find((l) => /km² of open water/.test(l));
    if (line && !/as Natural Earth's map outlines it|\(the /.test(line)) fail(`lake area without its measure: ${line}`);
  }
  const yk = settings.get("yellowknife-northwest-territories");
  if (yk && !placeProfile(yk.d).setting.includes("Great Slave Lake")) fail(`pin yellowknife: "${placeProfile(yk.d).setting}"`);
  const intl = settings.get("international-falls-minnesota");
  if (intl && !/the Rainy River/.test(placeProfile(intl.d).fishing)) fail(`pin international falls: "${placeProfile(intl.d).fishing}"`);
  const MAIN: [string, (w: WaterSetting) => boolean, string][] = [
    ["kelowna-british-columbia", (w) => w.bigLake?.name === "Okanagan Lake", "Okanagan Lake"],
    ["whitehorse-yukon", (w) => w.bigRiver === "Yukon", "the Yukon"],
    ["vancouver-british-columbia", (w) => w.bigRiver === "Fraser", "the Fraser"],
    ["portland-oregon", (w) => !!w.confluence?.rivers.includes("Columbia") && !!w.confluence.rivers.includes("Willamette"), "the Willamette and the Columbia"],
    ["grand-forks-north-dakota", (w) => w.bigRiver === "Red River", "the Red River"],
  ];
  for (const [slug, ok, name] of MAIN) {
    const s = settings.get(slug);
    if (!s) fail(`pin: ${slug} is not among the towns`);
    else if (!ok(s.w)) fail(`pin ${slug}: ${name} is missing`);
  }
  // 16. Every fix changes a town (served or parked).
  for (const f of WATER_FIXES) {
    const hit = (NORMALS_ALL as unknown as Entry[]).some((e) => {
      const b = f.box;
      return e.place.lat >= b.minLat && e.place.lat <= b.maxLat && e.place.lon >= b.minLon && e.place.lon <= b.maxLon;
    });
    if (!hit) fail(`water fix ${f.source}: its box holds no town`);
  }
  const spo = settings.get("spokane-washington");
  if (spo && !spo.w.seaRunBlocked) fail("pin spokane: not above Grand Coulee");
  if (settings.get("kelowna-british-columbia")?.w.seaRunBlocked) fail("pin kelowna: the Okanagan joins below Chief Joseph Dam, yet is blocked");
  if (gridSetting(49.888, -119.496).bigLake?.name !== "Okanagan Lake") fail("pin: gridSetting does not apply the water fixes");
}
const moncton = settings.get("moncton-new-brunswick");
if (moncton && /sea coast/.test(placeProfile(moncton.d).setting)) fail("pin moncton: the climate line still says the sea coast");

// ---- Summary ------------------------------------------------------------------------------------------------------
const all = [...settings.values()];
const count = (f: (w: WaterSetting) => boolean) => all.filter((x) => f(x.w)).length;
console.log(
  `\n${all.length} towns: ${count((w) => w.coast === "on" && !w.inlandSea)} on the open coast, ${count((w) => !!w.inlandSea)} on an inland sea, ${count((w) => w.coast === "near")} within about 30 km of the coast, ` +
    `${count((w) => !!w.tidal)} on a tidal reach (${count((w) => w.tidal?.kind === "fresh")} fresh, ${count((w) => w.tidal?.kind === "estuary")} estuary, ${count((w) => w.tidal?.kind === "tidal")} tidal); ` +
    `${TIDAL_REACHES.length} tidal reaches.`,
);
if (verbose)
  for (const { place, w } of all.filter((x) => x.w.tidal))
    console.log(`  ${place.slug}: ${w.tidal!.water} (${w.tidal!.kind}), open coast ${w.coast ?? "beyond 30 km"}, waters ${w.groups.join(", ")} — "${placeProfile(settings.get(place.slug)!.d).setting}"`);
if (violations.length) {
  console.log(`\n${violations.length} violation(s).`);
  process.exit(1);
}
console.log("\nAll water checks passed.");
