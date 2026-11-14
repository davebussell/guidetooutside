/**
 * Checks the ground layers: what the geologic map says is at the surface and
 * in the bedrock at a point (src/lib/ground-layers.ts, src/lib/rocks.ts).
 *
 * Runs on stored Macrostrat answers (FIXTURES, snapshots of
 * https://macrostrat.org/api/v2/geologic_units/map?lat=&lng=&response=long taken
 * 2 Nov 2026; Ottawa is the audit fixture) and asserts the rules the page must
 * keep: the bedrock layer is never a Quaternary unit; surface deposits and
 * bedrock are separate layers; ages print as ranges; an interval name is
 * printed only if it contains the range; the rock is the first-listed
 * lithology, never a later one ("Dolostone" for a shale-first unit is the bug
 * this guards). Also scans the page sources for wording that was removed.
 *
 * Since the audit of 10 November 2026 (Day 2 regions) it also holds fixtures for
 * nine of its towns (read 11 Nov 2026) and sweeps all 264 towns on the cached map
 * units, soil and watershed: bedrock is never cover (loose, weathered or running to
 * the present), never a non-geologic polygon, never a continent- or world-scale
 * map's unit where a detailed map covers the point; an interval's span is never
 * printed as a unit's own age; no "deposits deposits"; the dig's pH word is the
 * ground page's; a seaboard is never "Drains to".
 *
 * Since the audit of 11 November 2026 (Day 3 regions) it holds fixtures for ten more towns and checks: where the maps
 * name no rock, the dig stops in the cover; a range that is its interval's, lies outside it, or belongs to a
 * Quaternary deposit is never printed as an age; US watershed codes are the USGS dataset's at the town's point
 * (src/data/usgs-huc6-towns.json); the texture class is the USDA triangle's (tested on a 0.5% grid); one surface layer
 * per map name; the dig's cover is the page's; the bedrock's dating does not depend on the order of the units; a
 * thickness with no unit says so. It prints the towns where the dig stops and those whose texture word changed.
 *
 * Since the audit of 13 November 2026 (Day 4: Florida Peninsula, Deserts, Mediterranean California) it holds fixtures for
 * nine more towns and checks: a rock lithology (limestone, sandstone, basalt) on a detailed map is rock whatever its age
 * (Miami, Fort Lauderdale); a rock named in a cover unit's own description is said (Fort Myers); one unit on two maps is
 * one unit, in one role and with one date (Boise, Tampa, Miami, Sacramento); a buried-basement map is never listed as
 * bedrock (source 462); surface phrases are short and from material words (Albuquerque, Tucson, San Diego, Sacramento);
 * every US watershed row carries the ocean its USGS region reaches, and region 0309 rows the unit checked at the point
 * (Fort Myers: the Gulf; Orlando: both coasts); the Colorado's towns drain toward the Gulf of California, and no line
 * says "west"; the dig draws desert ground in desert climates and names caliche where the map lists it. It prints the
 * desert towns and the towns where a rock is named only in a cover unit's words.
 *
 * With --live it also asks Macrostrat now for six places and prints what each
 * page would say (one polite request a second, with a User-Agent that names the
 * site), so odd answers can be read by eye. Exits non-zero on any failure.
 *
 * Run (no tsx in this project; esbuild bundles it and resolves the @/ alias),
 * from the project root:
 *   npx esbuild scripts/check-ground.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/check-ground.mjs --log-level=warning && node /tmp/check-ground.mjs [--live]
 */
import { KNOWN_PLACES } from "../src/lib/geocode";
import { existsSync, readFileSync } from "node:fs";
import {
  aboutThisUnit,
  ageRangeOld,
  ageRangeText,
  BASEMENT_SOURCE_NAME,
  BASEMENT_SOURCES,
  isBuriedBasement,
  isRegional,
  REGIONAL_SOURCES,
  scaleRank,
  bedrockFact,
  coverKind,
  digCover,
  digRock,
  digCaliche,
  digStopsAtCover,
  endsName,
  groundStandfirst,
  hasThicknessUnit,
  isCoarse,
  isMadeGround,
  isNonGeologic,
  spanName,
  intervalFor,
  isSurfaceDeposit,
  layersOf,
  lithologyRock,
  macrostratUrl,
  surfaceFact,
  surfacePhrase,
  unitFromMacrostrat,
  type GroundLayers,
  type MacrostratUnit,
  type RockUnit,
  type UnitView,
} from "../src/lib/ground-layers";
import NORMALS_ALL from "../src/data/place-normals.json";
import { countryServed as townServed_ } from "../src/lib/scope";
// The checks cover the towns the site serves (src/lib/scope.ts); a parked town has no page to check.
const NORMALS = (NORMALS_ALL as { place: { countryCode?: string } }[]).filter((e) => townServed_(e.place.countryCode)) as typeof NORMALS_ALL;
import { bedrockRockFor, dominantInList, dominantLithology, rockForLithology } from "../src/lib/rocks";
import {
  drainsTo,
  isDesertClimate,
  kidPh,
  OCEAN_TEXT,
  oceanText,
  PH_TEXT,
  phWord,
  SDA_NAME,
  suitedFor,
  textureClass,
  verifiedWatershed,
  watershedView,
  withTexture,
  workability,
  type Soil,
  type Watershed,
} from "../src/lib/ground";
import HUC6_TOWNS from "../src/data/usgs-huc6-towns.json";
import HUC6_NAMES from "../src/data/usgs-huc6-names.json";
import MACROSTRAT_SOURCES from "../src/data/macrostrat-sources.json";

let failed = 0;
function check(ok: boolean, what: string, got?: unknown) {
  if (!ok) failed++;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${what}${!ok && got !== undefined ? `  (got ${JSON.stringify(got)})` : ""}`);
}

// ---------------------------------------------------------------- fixtures

const FIXTURES = {
  ottawa: {
    label: "Ottawa, Ontario (site coordinates 45.4208777,-75.6901106; the audit fixture data/macrostrat_ottawa.json)",
    units: [
      {"map_id": 3293947, "source_id": 180, "name": "Carlsbad", "lith": "", "descrip": "interbedded dark grey shale, fossiliferous calcareous siltstone and silty bioclastic limestone", "b_age": 449, "t_age": 446.4667, "b_int_age": 486.85, "t_int_age": 443.1, "b_int_name": "Ordovician", "scale": "large"},
      {"map_id": 4017485, "source_id": 504, "name": "Alluvial Silt", "lith": "silt, clay, gravel, sand, minor peat", "descrip": "Yellowish-brown, reddish-brown, gray, or mottled silt and silty clay.  Noncalcareous or calcareous, depending on composition of bedrock and other surficial materials in drainage basin.  Poorly to well sorted; poorly to well stratified.  Commonly mottled by iron oxides.  Locally contains tests of indigenous freshwater molluscs; may contain redeposited fragments and tests of marine molluscs.  Slackwater deposits of abandoned fluvial systems and shallow-water deposits in abandoned lake basins.  Deposits elevated above present drainage; graded to former glacial lakes and Champlain Sea.  Includes extensive areas of landslide deposits composed of older lake and marine sediments and areas of reworked landslide deposits.  Also includes areas of lake and marine clay, silt, sand, and gravel (lca, lsa, mc, msg) and till (tdh, ts).  Locally overlain by dune sand (ed), peat (hp), or swamp deposits (hs).  Thickness generally 1-3 m.", "b_age": 0.129, "t_age": 0, "b_int_age": 0.129, "t_int_age": 0, "b_int_name": "Late Pleistocene", "scale": "medium"},
      {"map_id": 610107, "source_id": 1, "name": "Georgian Bay Formation; Blue Mountain Formation; Billings Formation; Collingwood Member; Eastview Member", "lith": "shale, limestone, dolostone, siltstone", "descrip": "", "b_age": 449.8333, "t_age": 449, "b_int_age": 458.2, "t_int_age": 443.1, "b_int_name": "Late Ordovician", "scale": "medium"},
      {"map_id": 949105, "source_id": 7, "name": "Early Ordovician sedimentary", "lith": "sedimentary", "descrip": "", "b_age": 485.4, "t_age": 470, "b_int_age": 486.85, "t_int_age": 471.3, "b_int_name": "Early Ordovician", "scale": "small"},
      {"map_id": 3187973, "source_id": 154, "name": "Paleozoic sedimentary rocks", "lith": "sedimentary rocks", "descrip": "", "b_age": 541, "t_age": 251.902, "b_int_age": 538.8, "t_int_age": 251.902, "b_int_name": "Paleozoic", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
  ottawaWest: {
    label: "Ottawa 45.42,-75.70 (a point a few hundred metres west, queried 2 Nov 2026)",
    units: [
      {"map_id": 3294565, "source_id": 180, "name": "Billings", "lith": "", "descrip": "dark brown to black shale, with laminations of calcareous siltstone", "b_age": 449.25, "t_age": 449, "b_int_age": 486.85, "t_int_age": 443.1, "b_int_name": "Ordovician", "scale": "large"},
      {"map_id": 609601, "source_id": 1, "name": "Ottawa Group; Simcoe Group; Shadow Lake Formation", "lith": "limestone, dolostone, shale, arkose, sandstone", "descrip": "", "b_age": 470, "t_age": 458.4, "b_int_age": 471.3, "t_int_age": 458.2, "b_int_name": "Middle Ordovician", "scale": "medium"},
      {"map_id": 4017531, "source_id": 504, "name": "Discontinuous Marine Clay And Silt", "lith": "clay, silt, limestone", "descrip": "Thin, discontinuous deposits of marine clay and silt (mc) separated by numerous or extensive bedrock outcrops.  Includes small areas of till and alluvium (al, asq, aln).  Karst features locally where bedrock is limestone or dolomite.  Thickness generally less than 1 m.", "b_age": 0.129, "t_age": 0, "b_int_age": 0.129, "t_int_age": 0, "b_int_name": "Late Pleistocene", "scale": "medium"},
      {"map_id": 949105, "source_id": 7, "name": "Early Ordovician sedimentary", "lith": "sedimentary", "descrip": "", "b_age": 485.4, "t_age": 470, "b_int_age": 486.85, "t_int_age": 471.3, "b_int_name": "Early Ordovician", "scale": "small"},
      {"map_id": 3187973, "source_id": 154, "name": "Paleozoic sedimentary rocks", "lith": "sedimentary rocks", "descrip": "", "b_age": 541, "t_age": 251.902, "b_int_age": 538.8, "t_int_age": 251.902, "b_int_name": "Paleozoic", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
  wakefield: {
    label: "Wakefield, Quebec 45.64,-75.93",
    units: [
      {"map_id": 4017802, "source_id": 504, "name": "Marine Clay And Silt", "lith": "clay, silt, gravel, sand, minor carbonate, minor ice, minor limestone, minor peat", "descrip": "Pink, burgundy-red, reddish-brown, yellowish-brown, olive-brown, grayish-brown, brown, yellowish-gray, brownish-gray, olive, olive-gray, bluish-gray, gray, black, or mottled silty clay, clayey silt, and clay containing minor laminae of fine sand.  Generally calcareous.  Typically massive or weakly bedded; weak to strong blocky structure.  Locally laminated.  In places intertongued or interbedded with marine sand and gravel (msg).  Stiff; plastic and slippery where damp, tough and intensely fractured where dry.  Generally clast free; local dropstones.  Calcium carbonate concretions common in places.  Tests of saline or brackish-water molluscs common Gullies common to abundant adjacent to major streams.  Very susceptible to landslide activity; mudflow deposits locally abundant.  Karst features common where deposit is thin over limestone or dolomite.  Includes many small areas of wave-and current-washed till (tic, tdh, ts) and some areas of outwash and ice-contact sand and gravel (gg, kg) and marine sand and gravel (msg, md).  Locally overlain by alluvium (al, asq, aln), dune sand (ed), peat (hp), or swamp deposits (hs).  Thickness generally 1-4 m, locally more than 70 m.", "b_age": 0.129, "t_age": 0, "b_int_age": 0.129, "t_int_age": 0, "b_int_name": "Late Pleistocene", "scale": "medium"},
      {"map_id": 944853, "source_id": 7, "name": "Mesoproterozoic metamorphic and undivided crystalline: paragneiss", "lith": "metamorphic and undivided crystalline: paragneiss", "descrip": "", "b_age": 1600, "t_age": 1000, "b_int_age": 1600, "t_int_age": 1000, "b_int_name": "Mesoproterozoic", "scale": "small"},
      {"map_id": 3185044, "source_id": 154, "name": "Mesoproterozoic sedimentary rocks", "lith": "marble", "descrip": "", "b_age": 1400, "t_age": 1200, "b_int_age": 1400, "t_int_age": 1200, "b_int_name": "Ectasian", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
  vancouver: {
    label: "Vancouver, BC 49.2608724,-123.113952 queried at 49.28,-123.12",
    units: [
      {"map_id": 3407704, "source_id": 205, "name": "Kitsilano Formation", "lith": "undivided sedimentary rocks", "descrip": "Conglomerate, sandstone, shale with thin lignite; lesser basalt flows, sills and minor pyroclastics", "b_age": 56, "t_age": 33.9, "b_int_age": 56, "t_int_age": 33.9, "b_int_name": "Eocene", "scale": "medium"},
      {"map_id": 3402100, "source_id": 206, "name": "Quaternary alluvium", "lith": "alluvium", "descrip": "", "b_age": 2.588, "t_age": 0, "b_int_age": 2.58, "t_int_age": 0, "b_int_name": "Quaternary", "scale": "medium"},
      {"map_id": 5207576, "source_id": 1092, "name": "Quaternary alluvium", "lith": "alluvium", "descrip": "", "b_age": null, "t_age": null, "b_int_age": 2.58, "t_int_age": 0, "b_int_name": "Quaternary", "scale": "medium"},
      {"map_id": 947432, "source_id": 7, "name": "Paleogene sedimentary", "lith": "sedimentary", "descrip": "", "b_age": 66, "t_age": 23.03, "b_int_age": 66, "t_int_age": 23.04, "b_int_name": "Paleogene", "scale": "small"},
      {"map_id": 3190171, "source_id": 154, "name": "Mesozoic intrusive rocks", "lith": "intrusive igneous rocks", "descrip": "", "b_age": 100.5, "t_age": 66, "b_int_age": 100.5, "t_int_age": 66, "b_int_name": "Late Cretaceous", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
  halifax: {
    label: "Halifax, NS 44.65,-63.58",
    units: [
      {"map_id": 2683165, "source_id": 118, "name": "Halifax Formation", "lith": "", "descrip": "Slope-outer shelf slate, siltstone, minor sandstone and Fe-Mn nodules (in places metamorphosed to schist), 500->4400 m (Tremadocian graptolites and acritarchs)", "b_age": 485.4, "t_age": 470, "b_int_age": 538.8, "t_int_age": 443.1, "b_int_name": "Cambrian", "scale": "medium"},
      {"map_id": 967688, "source_id": 7, "name": "Cambrian-Ordovician sedimentary", "lith": "sedimentary", "descrip": "", "b_age": 541, "t_age": 443.8, "b_int_age": 538.8, "t_int_age": 443.1, "b_int_name": "Cambrian", "scale": "small"},
      {"map_id": 3187973, "source_id": 154, "name": "Paleozoic sedimentary rocks", "lith": "sedimentary rocks", "descrip": "", "b_age": 541, "t_age": 251.902, "b_int_age": 538.8, "t_int_age": 251.902, "b_int_name": "Paleozoic", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
  dublin: {
    label: "Dublin 53.35,-6.26",
    units: [
      {"map_id": 4992282, "source_id": 1088, "name": "Lucan Formation", "lith": "dark limestone & shale", "descrip": "", "b_age": 358.86, "t_age": 330.3, "b_int_age": 358.86, "t_int_age": 330.3, "b_int_name": "Tournaisian", "t_int_name": "Visean", "scale": "large"},
      {"map_id": 4375182, "source_id": 1056, "name": "Sand, Holocene", "lith": "sand", "descrip": "", "b_age": 0.0117, "t_age": 0, "b_int_age": 0.0117, "t_int_age": 0, "b_int_name": "Holocene", "scale": "medium"},
      {"map_id": 3143524, "source_id": 147, "name": "Dinantian", "lith": "Major:{limestone}, Minor{claystone,sandstone}", "descrip": "", "b_age": 358.9, "t_age": 323.2, "b_int_age": 358.86, "t_int_age": 323.4, "b_int_name": "Early Carboniferous", "scale": "small"},
      {"map_id": 3192030, "source_id": 154, "name": "Paleozoic sedimentary rocks", "lith": "sedimentary rocks", "descrip": "", "b_age": 358.9, "t_age": 323.2, "b_int_age": 358.86, "t_int_age": 323.4, "b_int_name": "Early Carboniferous", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
  capeTown: {
    label: "Cape Town -33.92,18.42",
    units: [
      {"map_id": 2237553, "source_id": 41, "name": "Tygerberg Formation of Malmesbury Group", "lith": "", "descrip": "Shale, greywacke, quartzite, minor volcanic rocks", "b_age": 1000, "t_age": 541, "b_int_age": 1000, "t_int_age": 538.8, "b_int_name": "Neoproterozoic", "scale": "medium"},
      {"map_id": 3310891, "source_id": 190, "name": "", "lith": "sedimentary", "descrip": "", "b_age": 485.4, "t_age": 358.9, "b_int_age": 486.85, "t_int_age": 358.86, "b_int_name": "Ordovician", "scale": "small"},
      {"map_id": 3192872, "source_id": 154, "name": "Neoproterozoic sedimentary rocks", "lith": "sedimentary rocks", "descrip": "", "b_age": 1000, "t_age": 541, "b_int_age": 1000, "t_int_age": 538.8, "b_int_name": "Neoproterozoic", "scale": "tiny"},
    ] as MacrostratUnit[],
  },
};

const layersOfFixture = (k: keyof typeof FIXTURES) => layersOf(FIXTURES[k].units.map(unitFromMacrostrat));

/** The headline strings of a place: the standfirst and the two lines of the strip on the gardening, fishing and foraging pages. */
function headline(name: string, layers: GroundLayers): string {
  return [groundStandfirst(name, layers), layers.surface[0] ? surfaceFact(layers.surface[0]) : "", layers.bedrock ? bedrockFact(layers.bedrock) : ""].join(" | ");
}

/** Everything the page prints about the layers (headlines and cards), as one string, for the "never says" checks. */
function printed(name: string, layers: GroundLayers): string {
  const views: UnitView[] = [...layers.surface, ...(layers.bedrock ? [layers.bedrock] : []), ...(layers.regionalBedrock ? [layers.regionalBedrock] : []), ...layers.others];
  const rv = layers.regionalBedrock;
  const dig = digRock(layers);
  return [headline(name, layers), rv ? bedrockFact(rv) : "", dig.rock ?? "", dig.rockAge ?? "", ...views.flatMap((v) => [v.rock?.name ?? "", v.interval ?? "", v.ageRange ?? ""])].join(" | ");
}

const show = (v: UnitView | undefined | null) =>
  v ? `${v.unit.name || "(unnamed)"} · ${v.interval ?? "no interval name"} · ${v.ageRange ?? "no age range"} · rock: ${v.rock?.name ?? "none matched"} · lith: ${v.unit.lith || "(empty)"} · ${v.unit.scale || "?"}-scale` : "none";

// ---------------------------------------------------------------- Ottawa (the audit fixture)

console.log("Ottawa (audit fixture)");
{
  const L = layersOfFixture("ottawa");
  const text = printed("Ottawa", L);
  check(!!L.bedrock, "there is a bedrock layer");
  check(!!L.bedrock && !isSurfaceDeposit(L.bedrock.unit) && (L.bedrock.unit.bAge ?? 99) > 2.6, "the bedrock layer is never Quaternary (its range does not lie inside the last 2.6 million years)", L.bedrock?.unit);
  check(L.surface.length === 1 && L.surface[0].unit.name === "Alluvial Silt", "the surface layer is the Quaternary unit (Alluvial Silt)", L.surface.map((v) => v.unit.name));
  check(!!L.bedrock && L.surface.every((v) => v.unit !== L.bedrock!.unit), "surface and bedrock are separate units");
  check(L.bedrock?.unit.name === "Carlsbad", "the bedrock is the first non-Quaternary unit the API returned (Carlsbad)", L.bedrock?.unit.name);
  check(L.bedrock?.ageRange === "449 to 446.5 million years ago", "the bedrock age prints as a range", L.bedrock?.ageRange);
  // Audit, 11 November 2026: 0.129 Ma to the present is Alluvial Silt's own interval span (Late Pleistocene to Holocene), so
  // the interval is named and no range is printed (it was "129,000 years ago to the present").
  check(L.surface[0]?.ageRange === null && L.surface[0]?.interval === "Late Pleistocene to Holocene", "the surface is dated only by its interval (Late Pleistocene to Holocene), not printed as a range", [L.surface[0]?.ageRange, L.surface[0]?.interval]);
  check(L.bedrock?.interval === "Late Ordovician", "the interval named contains the range (Late Ordovician)", L.bedrock?.interval);
  check(L.bedrock?.rock?.slug === "shale", "the bedrock rock is the first-listed lithology (shale)", L.bedrock?.rock?.slug);
  check(!/dolostone/i.test(text), "no Dolostone anywhere the Ottawa page prints", text);
  check(!/129 thousand|129,000 years old|river deposits|\bbedrock: river/i.test(headline("Ottawa", L)), "no '129 thousand years' / 'river deposits' headline or strip", headline("Ottawa", L));
  check(!/129 thousand|129,000 years old/i.test(text), "no '129 thousand years old' anywhere", text);
  check(!/487|katian/i.test(text), "no 487 Ma and no stage name outside its range", text);
  check(/silt deposits/.test(groundStandfirst("Ottawa", L)) && /Late Ordovician shale bedrock/.test(groundStandfirst("Ottawa", L)), "the standfirst names silt deposits over Late Ordovician shale bedrock", groundStandfirst("Ottawa", L));
  // Audit of 10 November 2026, checked 14 November: Alluvial Silt is from the 1:1,000,000 Ottawa sheet (Macrostrat source
  // 504), whose "Thickness generally 1-3 m." describes the class across the sheet; it is never printed or dug as the town's.
  check(L.surface[0]?.thickness === null && L.surface[0]?.coarse && /regional map of surface deposits \(USGS, 1:1,000,000\)/.test(surfaceFact(L.surface[0])) && digCover(L) === undefined, "the 1:1,000,000 sheet's thickness is not printed as the town's; its unit is labelled regional and not dug", [L.surface[0]?.thickness, L.surface[0] && surfaceFact(L.surface[0])]);
  const georgian = L.others.find((v) => v.unit.name.startsWith("Georgian Bay"));
  check(georgian?.rock?.slug === "shale", "'shale, limestone, dolostone, siltstone' is shale (first-listed), not dolostone", georgian?.rock?.slug);
  check(L.others.length === 3, "the other three non-Quaternary maps are listed as coarser maps, not layers", L.others.length);
  const reversed = layersOf([...FIXTURES.ottawa.units].reverse().map(unitFromMacrostrat));
  check(reversed.bedrock?.unit.name === "Carlsbad", "the most detailed map wins whatever order the units arrive in", reversed.bedrock?.unit.name);
}

// ---------------------------------------------------------------- the other fixtures

console.log("Ottawa, a few hundred metres west (marine clay)");
{
  const L = layersOfFixture("ottawaWest");
  check(L.bedrock?.unit.name === "Billings" && L.bedrock.rock?.slug === "shale", "bedrock Billings, shale (description gives the rock; lith is empty)", L.bedrock?.rock?.slug);
  check(L.surface[0]?.rock?.slug === "marine-clay", "'Discontinuous Marine Clay And Silt' is the marine-clay deposit", L.surface[0]?.rock?.slug);
}
console.log("Wakefield, Quebec");
{
  const L = layersOfFixture("wakefield");
  check(L.surface[0]?.rock?.slug === "marine-clay" && L.surface[0].unit.name === "Marine Clay And Silt", "surface: Marine Clay And Silt", L.surface[0]?.unit.name);
  // Audit, 10 November 2026: the only rock here is on the Geologic Map of North America (source 7) and the world map (154),
  // and the detailed map shows marine clay: no bedrock is named for the town, and the coarse maps are listed as such.
  check(L.bedrock === null && L.regionalBedrock === null && /name no bedrock/.test(groundStandfirst("Wakefield", L)), "bedrock: none named under the marine clay (the paragneiss is from a continent-scale map)", [L.bedrock?.unit.name, L.regionalBedrock?.unit.name]);
  check(L.others.some((v) => v.coarse && v.rock?.slug === "paragneiss" && v.interval === "Mesoproterozoic" && v.ageRange === null), "the continent-scale paragneiss is listed with the other maps, dated only to the Mesoproterozoic", L.others.map((v) => [v.unit.name, v.interval, v.ageRange]));
}
console.log("Vancouver");
{
  const L = layersOfFixture("vancouver");
  check(L.surface.length === 1 && L.surface[0].rock?.slug === "river-deposits", "the two 'Quaternary alluvium' maps are one surface layer (alluvium)", L.surface.map((v) => v.unit.mapId));
  check(L.bedrock?.unit.name === "Kitsilano Formation" && L.bedrock.interval === "Eocene" && L.bedrock.rock?.slug === "sedimentary-rock", "bedrock: Kitsilano Formation, Eocene, sedimentary rock", [L.bedrock?.unit.name, L.bedrock?.interval, L.bedrock?.rock?.slug]);
  check(!L.bedrock || !isSurfaceDeposit(L.bedrock.unit), "bedrock is not Quaternary");
  // Audit, 10 November 2026: 2.588 to 0 Ma is only the Quaternary's span, so the period is named and no range is printed.
  check(L.surface[0]?.interval === "Quaternary" && L.surface[0].periodOnly && L.surface[0].ageRange === null, "surface: dated by the map only to the Quaternary (Macrostrat writes the base 2.588); no range printed", [L.surface[0]?.interval, L.surface[0]?.ageRange]);
}
console.log("Halifax (no surface unit returned)");
{
  const L = layersOfFixture("halifax");
  check(L.surface.length === 0 && /no surface-deposit unit/.test(groundStandfirst("Halifax", L)), "no surface layer is invented", groundStandfirst("Halifax", L));
  check(L.bedrock?.rock?.slug === "slate" && L.bedrock.interval === "Early Ordovician", "bedrock: Early Ordovician slate (first named in the description)", [L.bedrock?.rock?.slug, L.bedrock?.interval]);
}
console.log("Dublin");
{
  const L = layersOfFixture("dublin");
  check(L.surface[0]?.unit.name === "Sand, Holocene" && !L.surface[0].rock, "surface: Sand, Holocene (grain size alone is not 'river deposits')", L.surface[0]?.rock?.slug);
  check(L.bedrock?.unit.name === "Lucan Formation" && L.bedrock.rock?.slug === "limestone" && L.bedrock.interval === "Mississippian", "bedrock: Lucan Formation, limestone first ('dark limestone & shale'), Mississippian", [L.bedrock?.rock?.slug, L.bedrock?.interval]);
}
console.log("Cape Town (no surface unit returned)");
{
  const L = layersOfFixture("capeTown");
  check(L.surface.length === 0, "no surface layer is invented");
  check(L.bedrock?.interval === "Neoproterozoic" && L.bedrock.rock?.slug === "shale" && L.bedrock.periodOnly && L.bedrock.ageRange === null, "bedrock: Neoproterozoic shale, dated by the map only to the era (1,000 to 541 Ma is the era's span)", [L.bedrock?.interval, L.bedrock?.rock?.slug, L.bedrock?.ageRange]);
}

// ---------------------------------------------------------------- edge cases

console.log("Edge cases");
{
  const quat: MacrostratUnit = { map_id: 1, source_id: 1, name: "Till", lith: "till", b_age: 0.0117, t_age: 0, b_int_name: "Holocene", scale: "medium" };
  const only = layersOf([unitFromMacrostrat(quat)]);
  check(only.bedrock === null && /name no bedrock/.test(groundStandfirst("X", only)), "only a Quaternary unit returned: no bedrock is named", groundStandfirst("X", only));
  check(layersOf([]).bedrock === null && layersOf([]).surface.length === 0, "no units: no layers");
  // Reversed by the audit of 10 November 2026: a unit whose range runs to the present is never bedrock (Richmond's residuum,
  // Charlotte's and Baltimore's saprolite, all "66 million years ago to the present").
  const cenozoic = unitFromMacrostrat({ name: "Cenozoic sedimentary", lith: "sedimentary", b_age: 66, t_age: 0, b_int_name: "Cenozoic", scale: "medium" });
  check(!isSurfaceDeposit(cenozoic) && coverKind(cenozoic) === "deposit" && layersOf([unitFromMacrostrat(quat), cenozoic]).bedrock === null, "a unit whose range runs to the present (66 to 0 Ma) is cover, never the bedrock");
  const noAges = unitFromMacrostrat({ name: "Quaternary alluvium", lith: "alluvium", b_int_name: "Quaternary" });
  check(isSurfaceDeposit(noAges) && ageRangeText(noAges.bAge, noAges.tAge) === null, "a Quaternary unit with no ages is a surface deposit and prints no age");
  check(dominantLithology("shale, limestone, dolostone, siltstone") === "shale" && rockForLithology(dominantLithology("shale, limestone, dolostone, siltstone"))?.slug === "shale", "first-listed lithology: shale, not dolostone");
  check(rockForLithology(dominantLithology("dolostone, limestone"))?.slug === "dolostone", "dolostone when dolostone is listed first");
  check(rockForLithology(dominantLithology("limestone & dolostone"))?.slug === "limestone", "'a & b' splits");
  check(rockForLithology(dominantLithology("Major:{limestone}, Minor{claystone,sandstone}"))?.slug === "limestone", "'Major:{..}, Minor{..}' reads the major item");
  check(rockForLithology(dominantLithology("minor sandstone, shale"))?.slug === "shale", "a lithology marked minor is not the dominant one");
  check(rockForLithology(dominantLithology("conglomerate, sandstone, shale")) === undefined, "an unknown first item is not replaced by a later one (no sandstone)");
  check(rockForLithology(dominantLithology("metamorphic and undivided crystalline: paragneiss"))?.slug === "paragneiss", "'family: rock' reads the rock");
  check(dominantLithology("") === null && dominantLithology(null) === null, "no lithology, no rock");
  check(ageRangeText(449, 446.4667) === "449 to 446.5 million years ago", "ageRangeText: millions", ageRangeText(449, 446.4667));
  check(ageRangeText(485.4, 470) === "485.4 to 470 million years ago", "ageRangeText: millions, boundary values", ageRangeText(485.4, 470));
  check(ageRangeText(0.129, 0) === "129,000 years ago to the present", "ageRangeText: years to the present");
  check(ageRangeText(0.129, 0.0117) === "129,000 to 11,700 years ago", "ageRangeText: years", ageRangeText(0.129, 0.0117));
  check(ageRangeText(2.588, 0) === "2.6 million years ago to the present", "ageRangeText: Quaternary in millions", ageRangeText(2.588, 0));
  check(ageRangeText(null, 0) === null, "ageRangeText: no range, no text");
  check(ageRangeOld(449, 446.4667) === "449 to 446.5 million years old", "ageRangeOld for the child's dig", ageRangeOld(449, 446.4667));
  check(intervalFor(449, 446.4667) === "Late Ordovician", "intervalFor: Late Ordovician");
  check(intervalFor(0.129, 0) === "Quaternary", "intervalFor: Quaternary", intervalFor(0.129, 0));
  check(intervalFor(0.0117, 0) === "Holocene", "intervalFor: Holocene");
  check(intervalFor(56, 33.9) === "Eocene", "intervalFor: Eocene");
  check(intervalFor(1000, 541) === "Neoproterozoic", "intervalFor: a range inside the Neoproterozoic");
  check(intervalFor(487, 446.5) === "Paleozoic", "intervalFor: 487 to 446.5 Ma overhangs the Ordovician, so no Ordovician or stage name", intervalFor(487, 446.5));
  check(intervalFor(458, 449) !== "Katian" && intervalFor(null, 5) === null, "intervalFor never names a stage, and needs both ends");
}

// ---------------------------------------------------------------- wording that was removed

console.log("Page sources");
{
  const FILES = ["src/lib/ground.ts", "src/lib/ground-layers.ts", "src/components/GroundPage.tsx", "src/components/GroundSummary.tsx", "src/app/(site)/ground/page.tsx", "src/app/api/here/route.ts"];
  const BANNED: [RegExp, string][] = [
    [/Wading is easy/i, "'Wading is easy' (a safety claim generated from the flow figure)"],
    [/fish are spooky/i, "'fish are spooky' (clarity claim from the flow figure)"],
    [/of the ten-year median/i, "'% of the ten-year median'"],
    [/\blow for the date|\bhigh for the date|about normal for the date/i, "'low/high for the date' (a judgement the model's error does not support)"],
    [/\bIt is rising\b|\bIt is dropping\b/, "'rising/dropping' trend wording"],
    [/standingOn|headlineRock|eraOf|ageWords/, "the old 'smallest top age' headline helpers"],
  ];
  for (const f of FILES) {
    const src = readFileSync(f, "utf8");
    for (const [re, label] of BANNED) check(!re.test(src), `${f} has no ${label}`);
  }
  const page = readFileSync("src/components/GroundPage.tsx", "utf8");
  check(/does not print a flow figure/.test(page) && !/m³\/s/.test(page.replace(/\/\/.*$/gm, "")), "the ground page prints no river flow figure and says why");
  check(/No soil data came back for this place/.test(page), "the soil card says so when there is no soil data");
  const summary = readFileSync("src/components/GroundSummary.tsx", "utf8");
  check(!/m³\/s|todayM3s/.test(summary), "the summary strip prints no river flow figure");
}

// ---------------------------------------------------------------- live

/** One polite request (named User-Agent), retried twice with a growing pause; null if Macrostrat never answers. */
async function fetchUnits(name: string, lat: number, lon: number): Promise<MacrostratUnit[] | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(macrostratUrl(lat, lon), { headers: { "User-Agent": "guidetooutside-ground-check/1.0 (+https://guidetooutside.com)", Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { success?: { data?: MacrostratUnit[] } };
      return json.success?.data ?? [];
    } catch (e) {
      console.log(`  ${name}: ${(e as Error).message}; retrying`);
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
    }
  }
  return null;
}

if (process.argv.includes("--live")) {
  console.log("\nLive Macrostrat (what each page would say now)");
  const PLACES: [string, number, number][] = [
    ["Ottawa", 45.4208777, -75.6901106],
    ["Vancouver", 49.2608724, -123.113952],
    ["Halifax", 44.648618, -63.5859487],
    ["Dublin", 53.35, -6.26],
    ["Cape Town", -33.925, 18.424],
    ["Wakefield", 45.64, -75.93],
  ];
  for (const [name, lat, lon] of PLACES) {
    const raw = await fetchUnits(name, lat, lon);
    if (!raw) {
      failed++;
      console.log(`  FAIL ${name}: Macrostrat did not answer`);
      continue;
    }
    const units = raw.map(unitFromMacrostrat);
    const L = layersOf(units);
    console.log(`\n${name} (${lat}, ${lon}): ${units.length} map units`);
    console.log(`  standfirst: ${groundStandfirst(name, L)}`);
    L.surface.forEach((v) => console.log(`  surface:    ${show(v)}`));
    if (!L.surface.length) console.log("  surface:    none returned");
    console.log(`  bedrock:    ${show(L.bedrock)}`);
    L.others.forEach((v) => console.log(`  other map:  ${show(v)}`));
    if (L.bedrock) console.log(`  strip:      ${bedrockFact(L.bedrock)}`);
    // Since the audit of 13 November 2026 a Quaternary limestone can be the bedrock (Miami); a Quaternary deposit never.
    check(!L.bedrock || coverKind(L.bedrock.unit) === null, `${name}: the bedrock layer is never cover`);
    if (!units.length) console.log("  ODD: no map unit at this point");
    else if (!L.bedrock) console.log("  ODD: only surface units came back; no bedrock is named");
    if (L.bedrock && !L.bedrock.rock) console.log("  NOTE: the bedrock's first-listed lithology matches no rock page, so no rock is named");
    for (const v of L.bedrock ? [...L.surface, L.bedrock] : L.surface) if (!v.ageRange) console.log(`  NOTE: ${v.unit.name || "(unnamed)"} has no age range on the map`);
    await new Promise((r) => setTimeout(r, 1200));
  }
}

// ---- the 5 November audit of the Day 1 regions ------------------------------------------------------------------
console.log("Audit of the Day 1 regions (5 November 2026)");
{
  check(intervalFor(458.4, 457.1) === "Late Ordovician", "458.4 to 457.1 Ma is Late Ordovician, not Middle (Minneapolis)", intervalFor(458.4, 457.1));
  check(intervalFor(2.588, 0) === "Quaternary", "2.588 to 0 Ma is still Quaternary (Macrostrat's older base)", intervalFor(2.588, 0));
  check(dominantInList("clay, gravel, sand, silt") === null, "an alphabetical list of bare lithologies names no dominant one (Minneapolis alluvium)", dominantInList("clay, gravel, sand, silt"));
  check(dominantInList("shale, limestone, dolostone, siltstone") === "shale", "a list in source order still gives its first item", dominantInList("shale, limestone, dolostone, siltstone"));
  const basement = layersOf([
    unitFromMacrostrat({ map_id: 1, source_id: 460, name: "Biotite gneiss and migmatite", lith: "gneiss", descrip: "", b_age: 2500, t_age: 1600, scale: "medium" }),
  ]);
  check(basement.bedrock === null, "a buried-basement map (Macrostrat source 460) is never the bedrock (Denver)", basement.bedrock?.unit.name);
  const fill = layersOf([
    unitFromMacrostrat({ map_id: 2, source_id: 1, name: "Surface Mines", lith: "clay", descrip: "Pits, quarries and fill.", b_age: 0.0042, t_age: 0, scale: "large" }),
    unitFromMacrostrat({ map_id: 3, source_id: 1, name: "Lake Clay And Silt", lith: "clay, silt", descrip: "", b_age: 0.0042, t_age: 0, scale: "large" }),
  ]);
  check(fill.surface[0]?.unit.name === "Lake Clay And Silt", "a natural deposit comes before man-made ground (Chicago)", fill.surface[0]?.unit.name);
  check(surfacePhrase(fill.surface[1]) === "made ground (fill, pits or quarries)", "man-made ground is called that", surfacePhrase(fill.surface[1]));
  const byInterval = layersOf([unitFromMacrostrat({ map_id: 4, source_id: 1, name: "Till", lith: "till", descrip: "", b_int_age: 2.58, t_int_age: 0, b_int_name: "Quaternary", scale: "medium" })]);
  check(byInterval.surface[0]?.ageRange === null && byInterval.surface[0]?.interval === "Quaternary", "an age from the map's interval is not printed as the deposit's own age", [byInterval.surface[0]?.ageRange, byInterval.surface[0]?.interval]);
  check(!/Mississippi/.test(oceanText({ ocean: "Gulf of Mexico", system: "Gulf of Mexico Seaboard", river: "Trinity" }) ?? ""), "the Trinity's water is not sent down the Mississippi (Dallas)");
  check(/Mississippi/.test(oceanText({ ocean: "Gulf of Mexico", system: "Mississippi", river: "Missouri" }) ?? ""), "the Mississippi's own line where the system is the Mississippi's");
  check(!/kilometres|miles/.test(oceanText({ ocean: "Gulf of Mexico", system: "Mississippi", river: "Arkansas River" }) ?? ""), "the Mississippi line gives no unmeasured distance (Little Rock; audit of 11 November 2026)");
  check(!/fur trade|Sargasso/.test(oceanText({ ocean: "Atlantic Ocean", system: "Great Lakes", river: null }) ?? ""), "no Ottawa River history under every Atlantic-bound town (Detroit, Buffalo, Concord)");
  // The dig: where the maps show a loose deposit, the page passes it to the dig as `cover`, and the dig then gives the rock no
  // typical 2 m depth (Chicago's rock is 20 to 30 m down under glacial and lake deposits).
  const dig = readFileSync("src/app/(site)/ground/[slug]/dig/page.tsx", "utf8");
  const digUi = readFileSync("src/components/kids/SoilDig.jsx", "utf8");
  check(/digCover\(layers\)/.test(dig) && /cover=\{cover\}/.test(dig), "the dig page passes the map's cover (digCover) to the dig");
  check(/at a depth the maps here do not give/.test(digUi) && /a\.slice\(0, 4\)/.test(digUi), "under a deposit the dig gives the rock no depth and the ruler stops at 1 m");
}

// ---- the 10 November audit of the Day 2 regions -----------------------------------------------------------------
// Map units at the site's coordinates for each town, read from the same Macrostrat query on 11 November 2026. Where the
// reading tool would not copy a long description verbatim, only the sentences it did copy are kept (marked "(…)").
const DAY2: Record<string, MacrostratUnit[]> = {
  richmond: [
    {"map_id":3027552,"source_id":133,"name":"Bacons Castle Formation","lith":"Major:{gravel}, Minor:{silt,sand}, Incidental:{clay}","descrip":"Tb1/Tb2 Bacons Castle Formation (upper Pliocene, Coch, 1965). Gray, yellowish-orange, and reddish-brown sand, gravel, silt, and clay; constitutes surficial deposits of high plain extending from Richmond, eastward to the Surry scarp. Unit is subdivided into two members: Tb1, massive to thick-bedded pebble and cobble gravel grading upward into cross-bedded, pebbly sand and sandy and clayey silt, and Tb2, predominantly thin-bedded and laminated clayey silt and silty fine-grained sand. Tb2 is characterized by flaser, wavy, and lenticular bedding and rare to common clay-lined burrows including Ophiomorpha nodosa. Thickness is 0 to 70 feet.","b_age":3.6,"t_age":2.841,"b_int_age":66,"t_int_age":2.58,"b_int_name":"Tertiary","scale":"medium"},
    {"map_id":3871722,"source_id":476,"name":"Gravel","lith":"gravel, sand, silt","descrip":"Gravel grading upward into sand and sandy clayey silt","b_age":5.333,"t_age":2.58,"b_int_age":5.333,"t_int_age":2.58,"b_int_name":"Pliocene","scale":"medium"},
    {"map_id":4179508,"source_id":537,"name":"Sand And Clay Decomposition Residuum","lith":"clay, sand, gravel","descrip":"White to gray, light-yellow, yellowish-orange or grayish-red, commonly mottled, silty to clayey, fine to medium sand.  Contains small deposits of lag gravel and zones of light-gray to greenish-gray kaolinite.  Upper 3 m intensely weathered.  At depths of 10-15 m, residuum grades down into medium to coarse sand containing kaolinite, glauconite, and opaline silicate clays.  Thickness 3-15 m.","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Paleogene","scale":"medium"},
    {"map_id":953400,"source_id":7,"name":"Miocene sedimentary","lith":"sedimentary","descrip":"","b_age":23.03,"t_age":5.333,"b_int_age":23.04,"t_int_age":5.333,"b_int_name":"Miocene","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","scale":"tiny"},
  ],
  charlotte: [
    {"map_id":4076559,"source_id":522,"name":"Sandy Clay Saprolite","lith":"clay, igneous, metamorphic, sand","descrip":"Red, yellowish-red, strong-brown, yellow, light-gray, or greenish-gray, slightly clayey sand to sandy clay saprolite. (…). Developed on metamorphic or igneous rocks of intermediate composition. Thickness less than 5 m.","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Paleogene","scale":"medium"},
    {"map_id":3809670,"source_id":468,"name":"Granitic rock","lith":"granitic","descrip":"Locally pinkish gray, massive to weakly foliated; contains hornblende","b_age":486.85,"t_age":358.86,"b_int_age":486.85,"t_int_age":358.86,"b_int_name":"Ordovician","scale":"medium"},
    {"map_id":2778448,"source_id":133,"name":"Granitic Rock","lith":"Major:{granite}","descrip":"Locally pinkish gray, massive to weakly foliated; contains hornblende.","b_age":485.4,"t_age":358.9,"b_int_age":486.85,"t_int_age":358.86,"b_int_name":"Ordovician","scale":"medium"},
    {"map_id":949213,"source_id":7,"name":"Neoproterozoic volcanic: undivided volcanic rocks","lith":"volcanic: undivided volcanic rocks","descrip":"","b_age":1000,"t_age":541,"b_int_age":1000,"t_int_age":538.8,"b_int_name":"Neoproterozoic","scale":"small"},
    {"map_id":3191508,"source_id":154,"name":"Paleozoic intrusive rocks","lith":"intrusive igneous rocks","descrip":"","b_age":541,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","scale":"tiny"},
  ],
  baltimore: [
    {"map_id":4483775,"source_id":547,"name":"Lowland deposits","lith":"clay, gravel, sand, silt, minor boulders","descrip":"Gravel, sand, silt, and clay. (…); thickness 0 to 150 feet","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","scale":"large"},
    {"map_id":3024243,"source_id":133,"name":"Lowland Deposits","lith":"Major:{fine alluvium,coarse alluvium}","descrip":"","b_age":2.588,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","scale":"medium"},
    {"map_id":4180699,"source_id":537,"name":"Clayey Saprolite","lith":"clay, metamorphic, sand, silt, minor metavolcanic","descrip":"Greenish-gray, pale-yellowish-orange, moderate-yellow or dark-red, slightly micaceous to micaceous, clayey sand to (…). Thickness less than 1 m to as much as 15 m.","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Paleogene","scale":"medium"},
    {"map_id":953492,"source_id":7,"name":"Late Cretaceous sedimentary","lith":"sedimentary","descrip":"","b_age":100.5,"t_age":66,"b_int_age":100.5,"t_int_age":66,"b_int_name":"Late Cretaceous","scale":"small"},
    {"map_id":3191768,"source_id":154,"name":"Mesozoic sedimentary rocks","lith":"sandstone,shale,siltstone","descrip":"","b_age":145,"t_age":100.5,"b_int_age":143.1,"t_int_age":100.5,"b_int_name":"Early Cretaceous","scale":"tiny"},
  ],
  philadelphia: [
    {"map_id":3759158,"source_id":454,"name":"Trenton Gravel","lith":"gravel, clay, sand, silt","descrip":"Gray or pale-reddish-brown, very gravelly sand interstratified with crossbedded sand and clay-silt beds; includes areas of Holocene alluvium and swamp deposits","b_age":2.58,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","scale":"large"},
    {"map_id":4181638,"source_id":537,"name":"Alluvial And Estuarine Sand And Silt","lith":"sand, silt, clay, gravel","descrip":"Estuarine facies of Kent Island Formation of Maryland and Delaware on Delmarva Peninsula, part of Cape May Formation in New Jersey. (…). Thickness 1-25 m.","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":2951746,"source_id":133,"name":"Trenton Gravel","lith":"Major:{sand,clay}, Minor:{gravel,silt}","descrip":"Gray or pale-reddish-brown, very gravelly sand interstratified with crossbedded sand and clay-silt beds; includes areas of Holocene alluvium and swamp deposits.","b_age":2.588,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","scale":"medium"},
    {"map_id":953880,"source_id":7,"name":"Cambrian-Ordovician sedimentary","lith":"sedimentary","descrip":"","b_age":541,"t_age":443.8,"b_int_age":538.8,"t_int_age":443.1,"b_int_name":"Cambrian","scale":"small"},
    {"map_id":3191144,"source_id":154,"name":"Paleozoic volcanic rocks","lith":"volcanic rocks","descrip":"","b_age":541,"t_age":485.4,"b_int_age":538.8,"t_int_age":486.85,"b_int_name":"Cambrian","scale":"tiny"},
  ],
  fredericton: [
    {"map_id":4141536,"source_id":531,"name":"Water","lith":"","descrip":"","b_age":null,"t_age":null,"b_int_age":null,"t_int_age":null,"b_int_name":null,"scale":"medium"},
    {"map_id":951384,"source_id":7,"name":"Mississippian-Pennsylvanian sedimentary","lith":"sedimentary","descrip":"","b_age":358.9,"t_age":298.9,"b_int_age":358.86,"t_int_age":298.9,"b_int_name":"Mississippian","scale":"small"},
    {"map_id":3187973,"source_id":154,"name":"Paleozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":541,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","scale":"tiny"},
  ],
  atlanta: [
    {"map_id":2719114,"source_id":133,"name":"Mica Schist/ Gneiss/ Amphibolite","lith":"Major:{gneiss,mica schist,amphibolite}","descrip":"","b_age":4000,"t_age":251.902,"b_int_age":4031,"t_int_age":251.902,"b_int_name":"Precambrian","scale":"medium"},
    {"map_id":3934571,"source_id":494,"name":"Mica schist / Gneiss / amphibolite","lith":"amphibolite, gneiss, schist","descrip":"","b_age":4031,"t_age":251.902,"b_int_age":4031,"t_int_age":251.902,"b_int_name":"Precambrian","scale":"medium"},
    {"map_id":4068443,"source_id":518,"name":"Micaceous, Clayey, And Sandy Saprolite, Undifferentiated","lith":"boulders, clay, metagraywacke, sand, minor conglomerate, minor gneiss, minor marble, minor metamorphic, minor metavolcanic, minor mylonite, minor sandstone","descrip":"Grayish-red to moderate-reddish-brown micaceous clay, sandy clay, or clayey sand in areas too small to show at scale of map.  Deposit grades down into underlying bedrock through zone of relict thick, slabby boulders.  Deposit is developed on metagraywacke, feldspathic sandstone, conglomerate, fine grained biotite gneiss, other gneisses, marble, mylonite, and felsic metavolcanic rocks.  It is graphitic where underlain by carbonaceous metamorphic rocks.  Mapped areas include bedrock outcrops and thin mantle of locally derived colluvium.  Mapped only in Georgia.  Thickness less than 1 m to as much as 15 m.","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","scale":"medium"},
    {"map_id":958510,"source_id":7,"name":"Neoproterozoic-Cambrian volcanic: interlayered sedimentary and volcanic rocks","lith":"volcanic: interlayered sedimentary and volcanic rocks","descrip":"","b_age":1000,"t_age":485.4,"b_int_age":1000,"t_int_age":486.85,"b_int_name":"Neoproterozoic","scale":"small"},
    {"map_id":3190741,"source_id":154,"name":"Precambrian-Phanerozoic crystalline metamorphic rocks","lith":"felsic paragneiss; amphibolite grade paragneiss/metavolcanic gneiss","descrip":"","b_age":1000,"t_age":251.902,"b_int_age":1000,"t_int_age":251.902,"b_int_name":"Neoproterozoic","scale":"tiny"},
  ],
  jacksonville: [
    {"map_id":3925298,"source_id":493,"name":"Undifferentiated","lith":"clay, sand","descrip":"Undifferentiated Quaternary Sediments - Much of Florida's surface is covered by a varying thickness …","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Pleistocene","scale":"medium"},
    {"map_id":4076270,"source_id":521,"name":"Beach And Marine Sand And Lagoonal Deposits, Undifferentiated","lith":"sand, clay, silt","descrip":"Light gray, yellowish-gray, light-green, and brownish-gray, poorly to well-sorted sand, silt, and …","b_age":0.774,"t_age":0.0117,"b_int_age":0.774,"t_int_age":0.0117,"b_int_name":"Chibanian","scale":"medium"},
    {"map_id":2906965,"source_id":133,"name":"Undifferentiated sediments","lith":"Major:{sand,clay}, Minor:{silt}, Incidental:{marl, peat, gravel}","descrip":"Undifferentiated Quaternary Sediments - Much of Florida's surface is covered by a varying thickness …","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Pleistocene","scale":"medium"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","scale":"tiny"},
  ],
  washington: [
    {"map_id":2464306,"source_id":70,"name":"colluvium","lith":"colluvium","descrip":"Colluvium (Pleistocene and Pliocene) -- Gravel, sand, and silt in lenticular deposits on slopes and ridge tops. Thickness up to 6 m (20 ft)","b_age":5.333,"t_age":0.0117,"b_int_age":5.333,"t_int_age":0.0117,"b_int_name":"Pliocene","scale":"large"},
    {"map_id":4484922,"source_id":547,"name":"Lowland deposits","lith":"clay, gravel, sand, silt, minor boulders","descrip":"Gravel, sand, silt, and clay. Medium- to coarse-grained sand and gravel; cobbles and boulders near base; commonly contains reworked Eocene glauconite; varicolored silts and clays; brown to dark gray lignitic silty clay; contains estuarine to marine fauna in some areas (includes in part Pamlico, Talbot, Wicomico and Sunderland Formations of earlier reports); thickness 0 to 150 feet","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","scale":"large"},
    {"map_id":2458367,"source_id":69,"name":"Chopawamsic Formation","lith":"metavolcanics","descrip":"Consists of lenses and tongues of metavolcanic, metasedimentary rocks, amphibolite greenstone and dark schist (island-arc terrane)","b_age":533.5,"t_age":493,"b_int_age":538.8,"t_int_age":486.85,"b_int_name":"Cambrian","scale":"large"},
    {"map_id":5178345,"source_id":1091,"name":"colluvium","lith":"colluvium","descrip":"Colluvium (Pleistocene and Pliocene) -- Gravel, sand, and silt in lenticular deposits on slopes and ridge tops. Thickness up to 6 m (20 ft)","b_age":null,"t_age":null,"b_int_age":5.333,"t_int_age":0.0117,"b_int_name":"Pliocene","scale":"large"},
    {"map_id":953492,"source_id":7,"name":"Late Cretaceous sedimentary","lith":"sedimentary","descrip":"","b_age":100.5,"t_age":66,"b_int_age":100.5,"t_int_age":66,"b_int_name":"Late Cretaceous","scale":"small"},
  ],
  newYork: [
    {"map_id":3733243,"source_id":451,"name":"Manhattan Formation, undivided","lith":"amphibolite, gneiss, granite, schist, minor marble","descrip":"","b_age":486.85,"t_age":443.1,"b_int_age":486.85,"t_int_age":443.1,"b_int_name":"Ordovician","scale":"large"},
    {"map_id":4092775,"source_id":526,"name":"Till","lith":"boulders, ice, sand, silt, minor clay, minor gneiss, minor metamorphic, minor sandstone, minor sedimentary","descrip":"","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","scale":"large"},
    {"map_id":2744519,"source_id":133,"name":"Manhattan Formation, undivided","lith":"Major:{pelitic schist,gneiss,amphibolite}","descrip":"","b_age":550.4,"t_age":533.5,"b_int_age":538.8,"t_int_age":458.2,"b_int_name":"Early Cambrian","scale":"medium"},
    {"map_id":4088771,"source_id":525,"name":"Lake, Ice-Contact, And Outwash Deposits","lith":"ice, clay, gravel, sand, silt, minor peat","descrip":"","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","scale":"medium"},
  ],
};
const day2 = (k: keyof typeof DAY2) => layersOf(DAY2[k].map(unitFromMacrostrat));

console.log("Audit of the Day 2 regions (10 November 2026)");
{
  // 1. Loose and weathered material is cover, never bedrock; the dig takes the cover's thickness from the map.
  const R = day2("richmond");
  check(R.bedrock === null && R.regionalBedrock === null, "Richmond: no bedrock named (Pliocene gravels and residuum are cover; the rest is continent- and world-scale)", [R.bedrock?.unit.name, R.regionalBedrock?.unit.name]);
  check(R.surface.map((v) => v.unit.name).join("|") === "Bacons Castle Formation|Gravel|Sand And Clay Decomposition Residuum", "Richmond: the gravels and the residuum are the cover", R.surface.map((v) => v.unit.name));
  check(R.surface[2]?.cover === "weathered" && surfacePhrase(R.surface[2]) === "weathered rock (residuum)", "Richmond: the residuum is weathered rock", R.surface[2] && surfacePhrase(R.surface[2]));
  const rText = [headline("Richmond", R), JSON.stringify(digRock(R))].join(" | ");
  check(/name no bedrock/.test(groundStandfirst("Richmond", R)) && !/Cenozoic|still forming/.test(rText) && !/still forming/.test(printed("Richmond", R)), "Richmond: the standfirst, strip and dig name no 'Cenozoic bedrock', and nothing says 'still forming'", rText);
  const rc = digCover(R);
  check(rc?.thickness === "Thickness is 0 to 70 feet." && rc.kind === "deposit" && !digRock(R).rock, "Richmond dig: the rock lies under the map's 0 to 70 feet of gravel, not at a typical 2 m", rc);
  const C = day2("charlotte");
  check(C.surface[0]?.unit.name === "Sandy Clay Saprolite" && C.surface[0].cover === "weathered", "Charlotte: the saprolite is weathered cover", C.surface[0]?.unit.name);
  check(C.bedrock?.unit.mapId === 3809670 && C.bedrock.rock?.slug === "granite" && C.bedrock.interval === "Ordovician to Devonian" && C.bedrock.ageRange === null, "Charlotte: bedrock is the granitic rock, dated only to the Ordovician to Devonian", [C.bedrock?.unit.name, C.bedrock?.rock?.slug, C.bedrock?.interval, C.bedrock?.ageRange]);
  const cc = digCover(C);
  // Audit of 10 November 2026, checked 14 November: the saprolite is from the 1:1,000,000 Savannah sheet (source 522), a
  // class across the sheet, so the dig no longer draws it or its "less than 5 m" as Charlotte's own; the rock keeps its age.
  check(cc === undefined && digRock(C).rock === "Granite" && digRock(C).rockAge === "from the Ordovician to the Devonian", "Charlotte dig: no regional cover or thickness drawn as the town's; granite 'from the Ordovician to the Devonian'", [cc, digRock(C)]);
  const B = day2("baltimore");
  check(B.bedrock === null && B.surface.some((v) => v.unit.name === "Clayey Saprolite" && v.cover === "weathered"), "Baltimore: the saprolite is cover; no bedrock named", B.bedrock?.unit.name);
  // 2. A continent- or world-scale map is never the town's bedrock where a detailed map covers the point.
  const P = day2("philadelphia");
  // Audit, 11 November 2026: the dig names the page's own first cover unit, with that unit's thickness only. Philadelphia's
  // Trenton Gravel (large-scale) gives none, so the dig no longer borrows the medium-scale estuarine unit's "1-25 m".
  check(digCover(B)?.thickness === "Thickness 0 to 150 feet." && P.surface[0]?.unit.name === "Trenton Gravel" && digCover(P)?.name === "Gravel" && digCover(P)?.thickness === null, "Baltimore dig: the cover's thickness is the map's clause; Philadelphia dig: the page's Trenton Gravel, no borrowed thickness", [digCover(B), digCover(P)]);
  check(P.bedrock === null && P.regionalBedrock === null && !/Cambrian/.test(headline("Philadelphia", P)), "Philadelphia: the continent-scale 'Cambrian-Ordovician sedimentary' is not the city's bedrock", headline("Philadelphia", P));
  check(P.others.filter((v) => v.coarse).length === 2, "Philadelphia: the two coarse maps are listed with the other maps", P.others.map((v) => v.unit.name));
  const J = day2("jacksonville");
  check(J.bedrock === null && J.regionalBedrock === null && !/Cenozoic sedimentary/.test(headline("Jacksonville", J)), "Jacksonville: no 'Cenozoic sedimentary rocks' bedrock", headline("Jacksonville", J));
  // 3. Non-geologic polygons are not rock.
  const F = day2("fredericton");
  check(!F.surface.length && !F.bedrock && F.regionalBedrock?.unit.mapId === 951384 && !/\bWater\b/.test(printed("Fredericton", F)), "Fredericton: the 'Water' polygon is dropped; the district's rock is the continent-scale map's, labelled", printed("Fredericton", F));
  check(/continent-scale map/.test(groundStandfirst("Fredericton", F)) && /continent-scale map/.test(bedrockFact(F.regionalBedrock!)), "Fredericton: the standfirst and the strip say the rock is from a continent-scale map", [groundStandfirst("Fredericton", F), bedrockFact(F.regionalBedrock!)]);
  check(isNonGeologic(unitFromMacrostrat({ name: "Water", lith: "", scale: "medium" })) && !isNonGeologic(unitFromMacrostrat({ name: "Waterville Formation", lith: "slate", b_age: 430, t_age: 425, scale: "medium" })), "'Water' is not geology; 'Waterville Formation' is");
  // 4. A period's span is not printed as the unit's own age.
  const A = day2("atlanta");
  check(A.bedrock?.unit.mapId === 2719114 && A.bedrock.rock?.slug === "gneiss" && A.bedrock.interval === "Precambrian to Paleozoic" && A.bedrock.ageRange === null && !/4,000/.test(printed("Atlanta", A)), "Atlanta: gneiss dated only to the Precambrian to Paleozoic; no 4,000 Ma anywhere", [A.bedrock?.interval, A.bedrock?.ageRange, digRock(A)]);
  const NY = day2("newYork");
  const till = NY.surface.find((v) => v.unit.name === "Till");
  check(till?.interval === "Quaternary" && till.ageRange === null && /dated by the map only to the Quaternary period/.test(surfaceFact(till)), "New York: the till is dated only to the Quaternary, not '2.6 million years ago to the present'", till && surfaceFact(till));
  check(spanName(66, 0) === "Cenozoic" && spanName(2.588, 0) === "Quaternary" && spanName(486.85, 358.86) === "Ordovician to Devonian" && spanName(4000, 251.902) === "Precambrian to Paleozoic", "spanName names the interval spans");
  check(spanName(449, 446.4667) === null && spanName(533.5, 493) === null && spanName(3.6, 2.841) === null, "spanName leaves a unit's own range alone (Ottawa's Carlsbad, Washington's Chopawamsic, Richmond's Bacons Castle)");
  check(spanName(0.129, 0) === "Late Pleistocene to Holocene" && spanName(0.774, 0) === "Middle Pleistocene to Holocene", "0.129 Ma to the present is the Late Pleistocene to Holocene span (Ottawa's Alluvial Silt, Pittsburgh's alluvium; audit of 11 November 2026)", [spanName(0.129, 0), spanName(0.774, 0)]);
  check(ageRangeOld(0.129, 0) === "up to 129,000 years old" && !/still forming/.test(ageRangeOld(66, 0) ?? ""), "the dig never says 'still forming'", ageRangeOld(0.129, 0));
  // 5. Lithology.
  const W = day2("washington");
  check(W.bedrock?.unit.name === "Chopawamsic Formation" && W.bedrock.rock?.slug === "metamorphic-rock", "Washington: 'metavolcanics' is metamorphic rock, not volcanic rock", W.bedrock?.rock?.slug);
  check(W.surface[0]?.unit.name === "colluvium" && W.surface[0].interval === "Pliocene to Pleistocene", "Washington: the Pliocene-Pleistocene colluvium is cover, not 'Cenozoic bedrock'", [W.surface[0]?.unit.name, W.surface[0]?.interval]);
  check(digCover(W)?.thickness === "Thickness up to 6 m (20 ft).", "Washington dig: the colluvium's thickness is the map's", digCover(W));
  check(rockForLithology(dominantInList("Major:{metavolcanic}"))?.slug === "metamorphic-rock", "Portland: 'Major: metavolcanic' is metamorphic rock");
  check(dominantInList("clay, sand") === null && surfacePhrase(J.surface[0]) === "clay and sand deposits", "Jacksonville: an alphabetical 'clay, sand' names neither as dominant ('clay and sand deposits')", surfacePhrase(J.surface[0]));
  check(dominantInList("Major:{sand,clay}, Minor:{silt}") === "sand" && dominantInList("dolostone") === "dolostone", "a Major list and a single item still give their first item");
  check(NY.bedrock?.unit.mapId === 3733243 && NY.bedrock.rock?.slug === "schist" && NY.bedrock.lithFrom === "other-map", "New York: the Manhattan Formation is schist, from the other map's major-lithology list", [NY.bedrock?.rock?.slug, NY.bedrock?.lithFrom]);
  check(bedrockRockFor({ name: "X", lith: "amphibolite, gneiss" }).rock === undefined, "an alphabetical two-item list names no rock on its own");
  // 6. Same-scale maps are not called coarser.
  check(A.others.filter((v) => !v.coarse).map((v) => v.unit.mapId).join() === "3934571", "Atlanta: the second medium-scale map is listed as a same-scale map, not a coarser one", A.others.map((v) => [v.unit.mapId, v.coarse]));
  check(C.others.some((v) => v.unit.mapId === 2778448 && !v.coarse), "Charlotte: the second granite map is a same-scale map", C.others.map((v) => [v.unit.mapId, v.coarse]));
  const layersUi = readFileSync("src/components/GroundLayers.tsx", "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  check(/at the same scale/.test(layersUi) && !/"first-listed lithology"/.test(layersUi), "the cards say which maps are at the same scale, and no longer say 'first-listed lithology' whatever the source");
  // 7. Words.
  check(!/deposits deposits/.test(printed("Washington", W)) && !/deposits deposits/.test(printed("Baltimore", B)) && surfacePhrase(B.surface[0]) === "lowland deposits", "no 'lowland deposits deposits'", surfacePhrase(B.surface[0]));
  check(!/everybody wants/.test(workability("sandy clay loam")) && !/everybody wants/.test(workability("clay loam")), "sandy clay loam and clay loam do not get the loam line (Atlanta)");
  check(kidPh(5.5) === "acid" && kidPh(5.6) === "acid" && phWord(5.5) === "acid", "the dig's pH word for 5.5 and 5.6 is the ground page's ('acid'; Charlottetown, Charlotte)", [kidPh(5.5), kidPh(5.6)]);
  // 8. Watershed labels.
  const rich = watershedView(verifiedWatershed({ ocean: "Atlantic Ocean", system: "Atlantic Ocean Seaboard", river: null, basin: "James-Chesapeake Bay", code: "020802", country: "USA" }, 37.5385087, -77.43428)!);
  check(rich.steps.every(([l, v]) => !(l === "Drains to" && /seaboard/i.test(v))) && rich.steps.some(([l]) => l === "Drainage region"), "'Atlantic Ocean Seaboard' is a drainage region, not 'Drains to'", rich.steps);
  check(rich.steps[0][1] === "James" && /USGS hydrologic unit 020802, as the USGS Watershed Boundary Dataset gives it for this point/.test(rich.note), "Richmond: USGS's name for unit 020802 (James), queried at the point", rich);
  const odd = watershedView({ ocean: "Pacific Ocean", system: "Yukon River", river: null, basin: "Tanana River", code: "190405", country: "USA" });
  check(/not checked against the USGS Watershed Boundary Dataset/.test(odd.note) && odd.steps[0][1] === "Tanana River", "a code not queried at the point is not called the USGS unit's", odd.note);
}

// ---- the 11 November audit of the Day 3 regions -----------------------------------------------------------------
// Map units at the site's coordinates for ten of its towns, read from the same Macrostrat query on 11 November 2026.
// The reading tool shortened most descriptions; only what it copied is kept (marked "(…)"). Indianapolis's Muscatatuck
// Group (3490712) carries the full description the site's store holds for the same unit, with its thickness sentence.
const DAY3: Record<string, MacrostratUnit[]> = {
  houston: [
    {"map_id":2735591,"source_id":133,"name":"Beaumont Formation, areas predominantly clay","lith":"Major:{clay,silt}","descrip":"On McAllen-Brownsville Sheet (1976) dominantly clay and mud of low permeability. (…)","b_age":0.6558,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":3985376,"source_id":501,"name":"Beaumont Formation, areas predominantly clay","lith":"clay","descrip":"On McAllen-Brownsville Sheet (1976) dominantly clay and mud of low permeability. (…)","b_age":0.6538,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":4045763,"source_id":511,"name":"Delta Silt And Clay","lith":"clay, silt","descrip":"Interdistributary mud facies of Beaumont Formation in Texas. (…)","b_age":0.6538,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":951302,"source_id":7,"name":"Pleistocene sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  newOrleans: [
    {"map_id":2944227,"source_id":133,"name":"Natural Levees","lith":"Major:{silt,clay}, Minor:{sand}","descrip":"Gray and brown silt, silty clay, some very fine sand, reddish brown along the Red River.","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":4047029,"source_id":511,"name":"Natural Levee Silt And Clay","lith":"clay, silt, sand","descrip":"Brown to grayish-brown, light to medium-gray silt and silty clay containing small amounts of fine sand, chiefly quartz; (…)","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3946191,"source_id":497,"name":"Natural Levees","lith":"clay, sand, silt","descrip":"Gray and brown silt, silty clay, some very fine sand, reddish brown along the Red River. (…)","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":948980,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  memphis: [
    {"map_id":3959878,"source_id":500,"name":"Loess","lith":"silt","descrip":"Clayey and sandy silt, gray to brown, massive. Maximum thickness about 100 feet along bluffs of Mississippi River (…)","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"large"},
    {"map_id":2952360,"source_id":133,"name":"Loess","lith":"Major:{silt}","descrip":"Clayey and sandy silt, gray to brown, massive. Maximum thickness about 100 feet along bluffs of Mississippi River (…)","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"medium"},
    {"map_id":4051550,"source_id":512,"name":"Loess And Loessial Colluvium And Alluvium","lith":"clay, sand, silt","descrip":"Yellow, brown to reddish-brown, or grayish-brown to yellowish-brown silt mixed with clay and fine sand; (…)","b_age":0.774,"t_age":0.0117,"b_int_age":0.774,"t_int_age":0.0117,"b_int_name":"Chibanian","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":951248,"source_id":7,"name":"Late Eocene sedimentary","lith":"sandstone, clay, chalk, limestone,","descrip":"","b_age":37.8,"t_age":33.9,"b_int_age":37.71,"t_int_age":33.9,"b_int_name":"Late Eocene","t_int_name":"Late Eocene","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  brownsville: [
    {"map_id":2468562,"source_id":71,"name":"Silty and sandy flood-plain alluvium","lith":"","descrip":"Flood-plain deposits of the lower Rio Grande; mostly silt and sand.","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"large"},
    {"map_id":3977656,"source_id":501,"name":"Alluvium in Rio Grande, subdivided into areas predominantly of sand","lith":"sand","descrip":"Point-bar and distributary sand and silt--yellowish-gray or brownish-gray quartz sand and silt; (…)","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":2729708,"source_id":133,"name":"Alluvium in Rio Grande, subdivided into areas predominantly of sand","lith":"Major:{silt,sand}, Minor:{gravel}","descrip":"Point-bar and distributary sand and silt--yellowish-gray or brownish-gray quartz sand and silt; (…)","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":4162867,"source_id":535,"name":"Point-Bar And Distributary Sand And Silt","lith":"sand, silt, clay, gravel","descrip":"Yellowish-gray or brownish-gray quartz sand and silt; contains plant debris and some biotite. (…)","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":965001,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  indianapolis: [
    {"map_id":3490712,"source_id":250,"name":"Muscatatuck Group","lith":"","descrip":"Limestone and dolomite. The Muscatatuck Group consists of the North Vernon Limestone and Jeffersonville Limestone. Thickness 0-127 (0=erosional edge). Upper contact abrupt and possibly unconformable; lower contact regional unconformity.","b_age":396.875,"t_age":388.6334,"b_int_age":419.62,"t_int_age":358.86,"b_int_name":"Devonian","t_int_name":"Devonian","scale":"large"},
    {"map_id":4134198,"source_id":528,"name":"Outwash, undifferentiated. Atherton Formation, in part.","lith":"gravel, sand","descrip":"Undifferentiated outwash, mainly as valley train; sand and gravel. Atherton Formation in part","b_age":1.8095,"t_age":0.6538,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":4199737,"source_id":538,"name":"Outwash Sand And Gravel","lith":"gravel, sand, limestone, silt, minor ice, minor metamorphic, minor sandstone, minor shale","descrip":"Batavia and Mackinaw Members of Henry Formation in Illinois; outwash facies of Atherton Formation in Indiana; (…)","b_age":1.8095,"t_age":0.6538,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":3882792,"source_id":479,"name":"Muscatatuck Group","lith":"limestone","descrip":"On the paper state map, there are two units, both with the same map pattern, labeled \"D\" and \"D1\".","b_age":392.5499,"t_age":383.2501,"b_int_age":419.62,"t_int_age":358.86,"b_int_name":"Devonian","t_int_name":"Devonian","scale":"medium"},
    {"map_id":2922436,"source_id":133,"name":"Muscatatuck Group","lith":"Major:{limestone,dolostone}","descrip":"Limestone and dolomite","b_age":396.875,"t_age":388.6334,"b_int_age":419.62,"t_int_age":358.86,"b_int_name":"Devonian","t_int_name":"Devonian","scale":"medium"},
    {"map_id":952877,"source_id":7,"name":"Devonian sedimentary","lith":"sedimentary","descrip":"","b_age":419.2,"t_age":358.9,"b_int_age":419.62,"t_int_age":358.86,"b_int_name":"Devonian","t_int_name":"Devonian","scale":"small"},
  ],
  asheville: [
    {"map_id":3809100,"source_id":468,"name":"Muscovite-biotite gneiss","lith":"gneiss, amphibolite, schist","descrip":"Locally sulfidic; interlayered and gradational with mica schist, minor amphibolite, and hornblende gneiss","b_age":1000,"t_age":538.8,"b_int_age":1000,"t_int_age":538.8,"b_int_name":"Neoproterozoic","t_int_name":"Neoproterozoic","scale":"medium"},
    {"map_id":2957196,"source_id":133,"name":"Ashe Metamorphic Suite and Tallulah Falls Formation; Muscovite-biotite gneiss","lith":"Major:{gneiss,mica schist}, Minor:{amphibolite}","descrip":"Locally sulfidic; interlayered and gradational with mica schist, minor amphibolite, and hornblende gneiss.","b_age":720,"t_age":686,"b_int_age":1000,"t_int_age":538.8,"b_int_name":"Neoproterozoic","t_int_name":"Neoproterozoic","scale":"medium"},
    {"map_id":4076556,"source_id":522,"name":"Granitic Or Arkosic Metasedimentary Bouldery Colluvium","lith":"granitic, metasedimentary, clay","descrip":"Pale to dark-brown, yellowish-red, grayish-yellow, poorly sorted, silty, sandy loam to sandy clay. (…)","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":954257,"source_id":7,"name":"Neoproterozoic-Cambrian sedimentary","lith":"sedimentary","descrip":"","b_age":1000,"t_age":485.4,"b_int_age":1000,"t_int_age":486.85,"b_int_name":"Neoproterozoic","t_int_name":"Cambrian","scale":"small"},
  ],
  pittsburgh: [
    {"map_id":3745045,"source_id":454,"name":"Glenshaw Formation","lith":"coal, limestone, sandstone, shale","descrip":"Cyclic sequences of shale, sandstone, red beds, and thin limestone and coal; (…)","b_age":309,"t_age":304.275,"b_int_age":323.4,"t_int_age":298.9,"b_int_name":"Pennsylvanian","t_int_name":"Pennsylvanian","scale":"large"},
    {"map_id":4138907,"source_id":530,"name":"Alluvium","lith":"gravel, sand, sandstone, silt, minor clay, minor ice, minor peat, minor shale, minor siltstone","descrip":"Yellowish brown, brown, or reddish-brown to gray silt, sand, and gravel. (…)","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3010165,"source_id":133,"name":"Glenshaw Formation","lith":"Major:{shale}, Minor:{coal,sandstone,clastic,limestone}","descrip":"Cyclic sequences of shale, sandstone, red beds, and thin limestone and coal; (…)","b_age":309,"t_age":304.275,"b_int_age":323.4,"t_int_age":298.9,"b_int_name":"Pennsylvanian","t_int_name":"Pennsylvanian","scale":"medium"},
    {"map_id":951419,"source_id":7,"name":"Gzhelian sedimentary","lith":"sandstone,shale, coal","descrip":"","b_age":307.5,"t_age":302.5,"b_int_age":306,"t_int_age":303.7,"b_int_name":"Missourian","t_int_name":"Missourian","scale":"small"},
  ],
  columbus: [
    {"map_id":4010244,"source_id":502,"name":"Ground Moraine","lith":"","descrip":"Thickness generally 1-3 m; rarely 6 m.","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":2826815,"source_id":133,"name":"Columbus Limestone","lith":"Major:{limestone}, Minor:{dolostone}","descrip":"Limestone and dolomite; gray to brown, weathers brown; massive bedding; (…)","b_age":392.3666,"t_age":388.4,"b_int_age":419.62,"t_int_age":358.86,"b_int_name":"Devonian","t_int_name":"Devonian","scale":"medium"},
    {"map_id":3739146,"source_id":453,"name":"Columbus Limestone","lith":"limestone, chert, conglomerate, sandstone","descrip":"Limestone and dolomite. (…)","b_age":419.62,"t_age":382.31,"b_int_age":419.62,"t_int_age":382.31,"b_int_name":"Early Devonian","t_int_name":"Middle Devonian","scale":"medium"},
    {"map_id":4563625,"source_id":549,"name":"Ground moraine","lith":"","descrip":"Ground moraine, flat to gently undulating","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":951414,"source_id":7,"name":"Devonian sedimentary","lith":"sedimentary","descrip":"","b_age":419.2,"t_age":358.9,"b_int_age":419.62,"t_int_age":358.86,"b_int_name":"Devonian","t_int_name":"Devonian","scale":"small"},
  ],
  littleRock: [
    {"map_id":3908243,"source_id":491,"name":"Jackfork Sandstone","lith":"sandstone","descrip":"Thin- to massive-bedded, fine- to coarse-grained, brown, tan, or bluish-gray quartzitic sandstones (…)","b_age":323.4,"t_age":315.2,"b_int_age":323.4,"t_int_age":315.2,"b_int_name":"Bashkirian","t_int_name":"Bashkirian","scale":"medium"},
    {"map_id":2958318,"source_id":133,"name":"Jackfork Sandstone","lith":"Major:{sandstone,shale}","descrip":"Sandstone with interbedded shale, some as olistolithic intervals. Approximatly 6000 ft. maximum thickness.","b_age":323.2,"t_age":320.05,"b_int_age":323.4,"t_int_age":298.9,"b_int_name":"Pennsylvanian","t_int_name":"Pennsylvanian","scale":"medium"},
    {"map_id":4051364,"source_id":512,"name":"Bouldery Sandy Colluvium","lith":"clay, sand, sandstone, silt, minor boulders, minor shale","descrip":"Tan to brown, dark-grayish-brown, or yellowish-brown fine sand, silt, and minor silty clay containing sandstone boulders; (…)","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":967113,"source_id":7,"name":"Paleocene sedimentary","lith":"sedimentary","descrip":"","b_age":66,"t_age":56,"b_int_age":66,"t_int_age":56,"b_int_name":"Paleocene","t_int_name":"Paleocene","scale":"small"},
  ],
  stLouis: [
    {"map_id":4065431,"source_id":516,"name":"Loess","lith":"clay, silt","descrip":"Bignell Loess, Peoria Loess, and Loveland Loess; Bignell, Peoria, and Loveland Formations of Kansas Geological Survey; Bignell Loess not recognized in Missouri. (…) Thickness 2-40 m along the Missouri River in Kansas, 3-23 m along the Missouri and Mississippi Rivers in Missouri.","b_age":0.774,"t_age":0,"b_int_age":0.774,"t_int_age":0,"b_int_name":"Chibanian","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3728039,"source_id":447,"name":"Meramecian Stage","lith":"limestone, sand, shale","descrip":"The Merameian Stage is composed mainly of limestone with some dolomite and some shale in eastern Missouri. (…)","b_age":346.7,"t_age":330.3,"b_int_age":346.7,"t_int_age":330.3,"b_int_name":"Visean","t_int_name":"Visean","scale":"medium"},
    {"map_id":2720730,"source_id":133,"name":"Meramecian Series","lith":"Major:{limestone}","descrip":"St. Louis Limestone, Salem Formation, Warsaw Formation.","b_age":343.5,"t_age":336.4167,"b_int_age":358.86,"t_int_age":323.4,"b_int_name":"Mississippian","t_int_name":"Mississippian","scale":"medium"},
    {"map_id":3771245,"source_id":463,"name":"Epizonal granite and granite porphyry","lith":"granite","descrip":"Characterized by perthitic alkali feldspars and granophyric textures","b_age":1600,"t_age":1000,"b_int_age":1600,"t_int_age":1000,"b_int_name":"Mesoproterozoic","t_int_name":"Mesoproterozoic","scale":"medium"},
    {"map_id":973205,"source_id":7,"name":"Serpukhovian sedimentary","lith":"sedimentary","descrip":"","b_age":330.9,"t_age":323.2,"b_int_age":330.3,"t_int_age":323.4,"b_int_name":"Serpukhovian","t_int_name":"Serpukhovian","scale":"small"},
  ],
};
const day3 = (k: keyof typeof DAY3) => layersOf(DAY3[k].map(unitFromMacrostrat));
const viewsOf = (L: GroundLayers) => [...L.surface, ...(L.bedrock ? [L.bedrock] : []), ...(L.regionalBedrock ? [L.regionalBedrock] : []), ...L.others];
const byMap = (L: GroundLayers, id: number) => viewsOf(L).find((v) => v.unit.mapId === id);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

console.log("Audit of the Day 3 regions (11 November 2026)");
{
  // 1. Where the maps name no rock, the dig stops in the cover and names none.
  for (const k of ["houston", "newOrleans", "memphis", "brownsville"] as const) {
    const L = day3(k);
    const d = digRock(L);
    check(!L.bedrock && !L.regionalBedrock && digStopsAtCover(L) && !d.rock && !d.rockAge && /name no bedrock/.test(groundStandfirst(k, L)), `${k}: no rock is named, and the dig stops in the cover`, [L.bedrock?.unit.name, L.regionalBedrock?.unit.name, d]);
  }
  check(!digStopsAtCover(day3("columbus")) && !digStopsAtCover(layersOfFixture("ottawa")), "where a bedrock is named the dig still reaches it (Columbus, Ottawa)");
  const digPage = readFileSync("src/app/(site)/ground/[slug]/dig/page.tsx", "utf8");
  const digUi = readFileSync("src/components/kids/SoilDig.jsx", "utf8");
  const groundPage = readFileSync("src/components/GroundPage.tsx", "utf8");
  check(!/really (down )?there/.test(digPage) && /noRock=\{noRock && !!cover\}/.test(digPage) && /They name nothing beneath it/.test(digPage), "the dig page no longer promises 'the bedrock that is really down there', and tells the dig when the maps name no rock");
  check(/noRock: nr/.test(digUi) && /(?:o|base)\.slice\(0, 4\)/.test(digUi) && /They name nothing beneath it, so this dig stops in it/.test(digUi) && /Four!/.test(digUi), "the dig has four layers and says the maps name no rock where it stops in the cover");
  check(/rockNamed\(layers\) \? " to the bedrock" : ""/.test(groundPage), "the ground page's dig link says 'to the bedrock' only where a rock is named");
  // 2. A unit whose own range is its interval's is dated by the interval only, whatever the interval.
  const A = day3("asheville");
  const col = byMap(A, 4076556)!;
  check(col.periodOnly && col.ageRange === null && col.interval === "Late Pleistocene" && !/129,000/.test(printed("Asheville", A)), "Asheville: the colluvium is dated only to the Late Pleistocene, not '129,000 to 11,700 years ago'", [col.interval, col.ageRange]);
  const P = day3("pittsburgh");
  check(P.surface[0]?.interval === "Late Pleistocene to Holocene" && P.surface[0].ageRange === null && /dated by the map only to the Late Pleistocene to the Holocene/.test(surfaceFact(P.surface[0])), "Pittsburgh: the alluvium is dated only to the Late Pleistocene to Holocene", P.surface[0] && surfaceFact(P.surface[0]));
  const C = day3("columbus");
  check(C.surface.length === 1 && C.surface[0].interval === "Late Pleistocene" && C.surface[0].ageRange === null, "Columbus: one ground moraine (two maps), dated only to the Late Pleistocene", C.surface.map((v) => [v.unit.mapId, v.interval, v.ageRange]));
  const LR = day3("littleRock");
  const jf = byMap(LR, 3908243)!;
  check(jf.ageRange === null && jf.interval === "Pennsylvanian" && jf.datedTo === "the Bashkirian, part of the Pennsylvanian subperiod", "Little Rock: the Jackfork Sandstone's 323.4 to 315.2 Ma is the Bashkirian's span, named as such", [jf.interval, jf.datedTo, jf.ageRange]);
  check(LR.surface[0]?.interval === "Late Pleistocene to Holocene" && LR.surface[0].ageRange === null && surfacePhrase(LR.surface[0]) === "bouldery sandy colluvium", "Little Rock: the colluvium is dated only to the Late Pleistocene to Holocene", LR.surface[0] && surfaceFact(LR.surface[0]));
  const SL = day3("stLouis");
  const mer = byMap(SL, 3728039)!;
  check(SL.surface[0]?.interval === "Middle Pleistocene to Holocene" && SL.surface[0].ageRange === null && mer.ageRange === null && mer.datedTo === "the Visean, part of the Mississippian subperiod", "St. Louis: the loess (Chibanian to Holocene) and the Meramecian Stage (Visean) are dated by their intervals", [SL.surface[0]?.interval, mer.datedTo]);
  check(!/774,000|346\.7|330\.3/.test(printed("St. Louis", SL)) && !/323\.4|315\.2|129,000/.test(printed("Little Rock", LR)), "no interval span printed as an age at St. Louis or Little Rock");
  const M = day3("memphis");
  check(byMap(M, 4051550)?.interval === "Middle Pleistocene to Late Pleistocene" && byMap(M, 4051550)?.ageRange === null, "Memphis: the loessial unit is dated only to the Middle to Late Pleistocene, not '774,000 to 11,700 years ago'", byMap(M, 4051550)?.interval);
  // 3. A unit's own range outside its own interval, and Quaternary own ranges, are not printed.
  const I = day3("indianapolis");
  const ow = I.surface.filter((v) => /outwash/i.test(v.unit.name));
  check(ow.length === 2 && ow.every((v) => v.interval === "Late Pleistocene" && v.ageRange === null) && !/1\.8|0\.65|million years ago to|650,000|653,800/.test(printed("Indianapolis", I)), "Indianapolis: the outwash is dated to its Late Pleistocene interval, not '1.8 to 0.65 million years ago'", ow.map((v) => [v.interval, v.ageRange]));
  const H = day3("houston");
  check(H.surface[0]?.unit.mapId === 2735591 && H.surface[0].interval === "Pleistocene" && H.surface[0].ageRange === null && byMap(H, 4045763)?.interval === "Late Pleistocene" && !/655,800|653,800/.test(printed("Houston", H)), "Houston: the Beaumont is dated only to the Pleistocene and the delta silt to the Late Pleistocene; no '655,800' or '653,800'", printed("Houston", H));
  // 4. Watershed codes are the USGS dataset's at the point.
  const pit = verifiedWatershed({ ocean: "Gulf of Mexico", system: "Mississippi River system", river: "Ohio River", basin: "Allegheny", code: "050100", country: "USA" }, 40.4406968, -80.0025666)!;
  check(pit.code === "050200" && watershedView(pit).steps[0][1] === "Monongahela" && /050200, as the USGS Watershed Boundary Dataset gives it/.test(watershedView(pit).note), "Pittsburgh: unit 050200 Monongahela, not 050100 Allegheny", watershedView(pit));
  const bro = verifiedWatershed({ ocean: "Gulf of Mexico", system: "Rio Grande", river: "Rio Grande", basin: "Lower Rio Grande", code: "130900", country: "USA" }, 25.9024289, -97.4981698)!;
  const broV = watershedView(bro);
  check(bro.code === "121102" && broV.steps[0][1] === "Southwestern Texas Coastal" && !broV.steps.some(([, v]) => /Rio Grande/.test(v)), "Brownsville: unit 121102 Southwestern Texas Coastal; no 'Drains to: Rio Grande'", broV.steps);
  // 5. The USDA texture triangle.
  check(textureClass(24, 55, 21) === "sandy clay loam" && textureClass(33, 36, 31) === "clay loam", "Asheville 24/55/21 is sandy clay loam; Brownsville 33/36/31 is clay loam (USDA)", [textureClass(24, 55, 21), textureClass(33, 36, 31)]);
  check(!/without clay's stickiness/.test(workability(textureClass(33, 36, 31))) && !/without clay's stickiness/.test(workability("silty clay loam")), "no clay loam gets 'without clay's stickiness' (Brownsville)");
  // The triangle's rules as the USDA-NRCS Soil Survey Manual (2017) states them, tested on a 0.5% grid: each point is in
  // exactly one class, and textureClass names it.
  const USDA: [string, (c: number, sa: number, si: number) => boolean][] = [
    ["sand", (c, sa, si) => si + 1.5 * c < 15],
    ["loamy sand", (c, sa, si) => si + 1.5 * c >= 15 && si + 2 * c < 30],
    ["sandy loam", (c, sa, si) => (c >= 7 && c < 20 && sa > 52 && si + 2 * c >= 30) || (c < 7 && si < 50 && si + 2 * c >= 30)],
    ["loam", (c, sa, si) => c >= 7 && c < 27 && si >= 28 && si < 50 && sa <= 52],
    ["silt loam", (c, sa, si) => (si >= 50 && c >= 12 && c < 27) || (si >= 50 && si < 80 && c < 12)],
    ["silt", (c, sa, si) => si >= 80 && c < 12],
    ["sandy clay loam", (c, sa, si) => c >= 20 && c < 35 && si < 28 && sa > 45],
    ["clay loam", (c, sa) => c >= 27 && c < 40 && sa > 20 && sa <= 45],
    ["silty clay loam", (c, sa) => c >= 27 && c < 40 && sa <= 20],
    ["sandy clay", (c, sa) => c >= 35 && sa > 45],
    ["silty clay", (c, sa, si) => c >= 40 && si >= 40],
    ["clay", (c, sa, si) => c >= 40 && sa <= 45 && si < 40],
  ];
  const off: string[] = [];
  for (let c = 0; c <= 100; c += 0.5)
    for (let si = 0; si <= 100 - c; si += 0.5) {
      const sa = 100 - c - si;
      const hits = USDA.filter(([, f]) => f(c, sa, si)).map(([n]) => n);
      if (hits.length !== 1 || textureClass(c, sa, si) !== hits[0]) off.push(`${c}/${sa}/${si}: ${hits.join("+") || "none"} vs ${textureClass(c, sa, si)}`);
    }
  check(off.length === 0, "textureClass is the USDA triangle at every point of a 0.5% grid", off.slice(0, 6));
  check(textureClass(12, 30, 30) === textureClass(20, 50, 50), "fractions that do not sum to 100 are scaled first");
  // 6. Deposit names, one unit per map name, the dig's unit, the bedrock's order, thickness units.
  check(M.surface.filter((v) => v.unit.name === "Loess").length === 1 && M.surface.every((v) => v.rock?.slug !== "river-deposits" && surfacePhrase(v) === "loess"), "Memphis: one 'Loess' layer (two maps), and the loessial unit is loess, not river deposits", M.surface.map((v) => [v.unit.mapId, v.rock?.slug, surfacePhrase(v)]));
  check(surfacePhrase(col) === "colluvium" && !/granitic deposits/.test(printed("Asheville", A)), "Asheville: the bouldery colluvium is 'colluvium', not 'granitic deposits'", surfacePhrase(col));
  const NO = day3("newOrleans");
  const BR = day3("brownsville");
  for (const [k, L] of [["New Orleans", NO], ["Brownsville", BR], ["Memphis", M], ["Houston", H]] as const) {
    const names = L.surface.map((v) => v.unit.name.toLowerCase());
    check(new Set(names).size === names.length, `${k}: no unit is shown twice from two maps`, names);
  }
  check(digCover(NO)?.name === cap(surfacePhrase(NO.surface[0])) && /silt deposits/.test(groundStandfirst("New Orleans", NO)) && digCover(NO)?.name === "Silt deposits", "New Orleans: the dig and the page name the same cover (silt deposits)", [digCover(NO), groundStandfirst("New Orleans", NO)]);
  check(BR.surface[0]?.unit.mapId === 2468562 && digCover(BR)?.name === "River deposits" && /alluvium/.test(groundStandfirst("Brownsville", BR)), "Brownsville: the dig and the page take the same unit (the flood-plain alluvium)", [digCover(BR), groundStandfirst("Brownsville", BR)]);
  const colRev = layersOf([...DAY3.columbus].reverse().map(unitFromMacrostrat));
  check(C.bedrock?.unit.mapId === 2826815 && colRev.bedrock?.unit.mapId === 2826815 && C.bedrock.interval === "Middle Devonian" && C.bedrock.ageRange === "392.4 to 388.4 million years ago", "Columbus: the bedrock is the unit with a range of its own (Middle Devonian, 392.4 to 388.4), whatever order the units come in", [C.bedrock?.unit.mapId, colRev.bedrock?.unit.mapId, C.bedrock?.ageRange]);
  const mus = I.bedrock!;
  check(mus.unit.mapId === 3490712 && mus.thickness === "Thickness 0-127 (0=erosional edge). (The map gives no unit for this figure.)", "Indianapolis: a thickness with no unit says so", mus.thickness);
  check(digCover(M)?.thickness?.startsWith("Maximum thickness about 100 feet") === true && digCover({ ...I, surface: [{ ...I.surface[0], unit: { ...I.surface[0].unit, description: "Thickness 0-127." } }] })?.thickness === null, "the dig uses a thickness only when it has a unit", [digCover(M)?.thickness]);
  // Every fixture: no printed range where the unit's own range is its interval's, lies outside it, or is a Quaternary deposit's.
  const leaks: string[] = [];
  for (const [k, raw] of [...Object.entries(DAY2), ...Object.entries(DAY3)]) {
    const L = layersOf(raw.map(unitFromMacrostrat));
    for (const v of viewsOf(L)) {
      const r = raw.find((x) => x.map_id === v.unit.mapId)!;
      const inter = r.b_int_age != null && r.t_int_age != null && r.b_age != null && r.t_age != null;
      const equal = inter && Math.abs(r.b_age! - r.b_int_age!) < 1e-6 && Math.abs(r.t_age! - r.t_int_age!) < 1e-6;
      const outside = inter && (r.b_age! > r.b_int_age! + 1.5 || r.t_age! < r.t_int_age! - 1.5 || (r.b_int_age! < 10 && r.b_age! > r.b_int_age! * 1.01));
      if (v.ageRange && (equal || outside || (v.cover && isSurfaceDeposit(v.unit)))) leaks.push(`${k} ${v.unit.mapId}: ${v.ageRange}`);
      if (v.periodOnly && !v.datedTo) leaks.push(`${k} ${v.unit.mapId}: dated only by an interval, but no interval named`);
    }
  }
  check(leaks.length === 0, "no fixture prints an interval's span, a range outside its interval, or a Quaternary deposit's own range as an age", leaks);
}

// ---- the 13 November audit of the Day 4 regions ------------------------------------------------------------------
// Map units at the site's coordinates for nine of its towns, read from the same Macrostrat query on 13 November 2026.
// The reading tool would copy only short pieces of a long description, so where a description is not whole it ends
// "(…)"; Miami's state-compilation copy (3003958), Boise's (2991198), Tucson's (2778876) and San Diego's paralic deposits
// (2676962) are the cached copies of the same units (rock:v1), verbatim.
const DAY4: Record<string, MacrostratUnit[]> = {
  miami: [
    {"map_id":4072704,"source_id":520,"name":"Miami Oolite","lith":"limestone, sand, unconsolidated","descrip":"White to light-yellow, crystalline, oolitic limestone interbedded with thin layers of soft, unconsolidated oolitic sand. Locally this unit is perforated with numerous solution holes and channels now filled with fine to medium quartz sand. Oolitic limestone portions of the formation are commonly brecciated and re-cemented as a result of solution. Th230/U234 ages on the Miami Oolite range from about 90,000 to about 145,000 years old (Broecker and Thurber, 1965; Osmond and others, 1965). The oolite is exposed at the surface throughout much of southeast Florida; in places it is covered by thin, discontinuous patches of eolian oolite and quartz sand (indicated by pattern). Thickness as much as 20 m.","b_age":0.5254,"t_age":0.2685,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":3923801,"source_id":493,"name":"Miami Limestone","lith":"limestone, sand","descrip":"The Miami Limestone (formerly the Miami Oolite), named by Sanford (1909), occurs at or near the surface in southeastern peninsular Florida from Palm Beach County to Dade and Monroe Counties. (…)","b_age":0.5254,"t_age":0.2685,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":3003958,"source_id":133,"name":"Miami Limestone","lith":"Major:{limestone,sandstone}","descrip":"The Miami Limestone (formerly the Miami Oolite), named by Sanford (1909), occurs at or near the surface in southeastern peninsular Florida from Palm Beach County to Dade and Monroe Counties. It forms the Atlantic Coastal Ridge and extends beneath the Everglades where it is commonly covered by thin organic and freshwater sediments. The Miami Limestone occurs on the mainland and in the southern Florida Keys from Big Pine Key to the Marquesas Keys. From Big Pine Key to the mainland, the Miami Limestone is replaced by the Key Largo Limestone. To the north, in Palm Beach County, the Miami Limestone grades laterally northward into the Anastasia Formation. The Miami Limestone consists of two facies, an oolitic facies and a bryozoan facies (Hoffmeister et al. [1967]). The oolitic facies consists of white to orangish gray, poorly to moderately indurated, sandy, oolitic limestone (grainstone) with scattered concentrations of fossils. The bryozoan facies consists of white to orangish gray, poorly to well indurated, sandy, fossiliferous limestone (grainstone and packstone). Beds of quartz sand are also present as unindurated sediments and indurated limey sandstones. Fossils present include mollusks, bryozoans, and corals. Molds and casts of fossils are common. The highly porous and permeable Miami Limestone forms much of the Biscayne Aquifer of the surficial aquifer system.","b_age":0.527,"t_age":0.2693,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  fortLauderdale: [
    {"map_id":4074408,"source_id":520,"name":"Beach Shell-Fragment And Shell Sand","lith":"sand, carbonate, clay, silt","descrip":"White to light-gray shell fragment and shell sand including minor amounts of fine quartz sand, silt, and clay. Locally the deposit may be weakly cemented by calcium carbonate. Where exposed along the Florida Keys, the unit commonly consists of foraminiferal tests. Thickness 1-5 m.","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3923801,"source_id":493,"name":"Miami Limestone","lith":"limestone, sand","descrip":"The Miami Limestone (formerly the Miami Oolite), named by Sanford (1909), occurs at or near the surface in southeastern peninsular Florida from Palm Beach County to Dade and Monroe Counties. (…)","b_age":0.5254,"t_age":0.2685,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":3003958,"source_id":133,"name":"Miami Limestone","lith":"Major:{limestone,sandstone}","descrip":"The Miami Limestone (formerly the Miami Oolite), named by Sanford (1909), occurs at or near the surface in southeastern peninsular Florida from Palm Beach County to Dade and Monroe Counties. (…)","b_age":0.527,"t_age":0.2693,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":961693,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  fortMyers: [
    {"map_id":2835743,"source_id":133,"name":"Shelly sediments of Plio-Pleistocene age","lith":"Major:{sand,limestone}, Minor:{clay}","descrip":"Tertiary-Quaternary Fossiliferous Sediments of Southern Florida - Molluskbearing sediments of southern Florida contain some of the most abundant and diverse fossil faunas in the world. (…)","b_age":3.6,"t_age":0.0117,"b_int_age":3.6,"t_int_age":0.0117,"b_int_name":"Late Pliocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":4075116,"source_id":520,"name":"Calcareous Sand Solution Residuum","lith":"sand, clay, limestone","descrip":"Yellowish-gray to grayish-white quartz sand and calcareous sand residuum on soft sandy limestone and shell-hash limestone. Locally, where deposit mantles an underlying karst topography, it includes the clay-filling of sink holes. Thickness 1-3 m.","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Paleogene","t_int_name":"Quaternary","scale":"medium"},
    {"map_id":3930860,"source_id":493,"name":"Shelly sediments","lith":"unconsolidated","descrip":"Tertiary-Quaternary Fossiliferous Sediments of Southern Florida - Molluskbearing sediments of southern Florida contain some of the most abundant and diverse fossil faunas in the world. (…)","b_age":1.9379,"t_age":0.6538,"b_int_age":5.333,"t_int_age":0.0117,"b_int_name":"Pliocene","t_int_name":"Pleistocene","scale":"medium"},
  ],
  tampa: [
    {"map_id":2905140,"source_id":133,"name":"Hawthorn Group, Arcadia Formation, Tampa Member","lith":"Major:{limestone}, Minor:{dolostone,sand,clay}, Incidental:{coral}","descrip":"The Tampa Member consists predominantly of limestone with subordinate dolostone, sand and clay (Scott, 1988). (…)","b_age":24.2975,"t_age":23.6638,"b_int_age":27.3,"t_int_age":11.63,"b_int_name":"Chattian","t_int_name":"Middle Miocene","scale":"medium"},
    {"map_id":4075185,"source_id":520,"name":"Sand And Clay Decomposition Residuum","lith":"clay, sand","descrip":"White, light-yellow, grayish-orange or grayish-red, commonly mottled, poorly sorted, fine quartz sand and small lenses of clay, interbedded with light-gray, yellowish-gray, very pale orange, or light-reddish-brown, micaceous, medium to coarse sand; locally includes lenses of kaolinitic sandy clay that contain leached and partly decomposed oyster shell fragments. (…)","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Paleogene","t_int_name":"Quaternary","scale":"medium"},
    {"map_id":3923241,"source_id":493,"name":"Tampa Member","lith":"clay, dolostone, limestone, sand, minor mudstone","descrip":"Predominantly limestone with subordinate dolostone, sand and clay (Scott, 1988). (…)","b_age":24.105,"t_age":17.0975,"b_int_age":27.3,"t_int_age":11.63,"b_int_name":"Chattian","t_int_name":"Serravallian","scale":"medium"},
    {"map_id":961693,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3186031,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":66,"t_age":0,"b_int_age":66,"t_int_age":0,"b_int_name":"Cenozoic","t_int_name":"Cenozoic","scale":"tiny"},
  ],
  boise: [
    {"map_id":4548175,"source_id":546,"name":"Sediments and sedimentary rocks","lith":"sedimentary, gravel, sand, silt","descrip":"Older gravel, sand, and silt deposited in fans, streams, and lakes. (…)","b_age":5.333,"t_age":0.0117,"b_int_age":5.333,"t_int_age":0.0117,"b_int_name":"Pliocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":3771006,"source_id":462,"name":"Extended continental crust","lith":"","descrip":"","b_age":4031,"t_age":251.902,"b_int_age":4031,"t_int_age":251.902,"b_int_name":"Archean","t_int_name":"Paleozoic","scale":"medium"},
    {"map_id":2991198,"source_id":133,"name":"Sediments and sedimentary rocks (Pleistocene and Pliocene)","lith":"Major:{gravel,sand,silt}","descrip":"Older gravel, sand, and silt deposited in fans, streams, and lakes. Includes older terrace gravels and Tuana Gravel northwest of Twin Falls.  (Quaternary to Eocene Continental Sediments and Sedimentary Rocks).","b_age":5.333,"t_age":0.0117,"b_int_age":5.333,"t_int_age":0.0117,"b_int_name":"Pliocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":936378,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3188543,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":5.333,"t_age":2.588,"b_int_age":5.333,"t_int_age":2.58,"b_int_name":"Pliocene","t_int_name":"Pliocene","scale":"tiny"},
  ],
  sacramento: [
    {"map_id":2842894,"source_id":133,"name":"Quaternary alluvium and marine deposits","lith":"Major:{coarse alluvium}, Minor:{fine alluvium}","descrip":"Alluvium, lake, playa, and terrace deposits; unconsolidated and semi-consolidated. Mostly nonmarine, but includes marine deposits near the coast.","b_age":4.4087,"t_age":0.0117,"b_int_age":5.333,"t_int_age":0,"b_int_name":"Pliocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":4551448,"source_id":548,"name":"Alluvium, lake, playa, and terrace deposits","lith":"unconsolidated","descrip":"Alluvium, lake, playa, and terrace deposits; unconsolidated and semi-consolidated. Mostly nonmarine, but includes marine deposits near the coast","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":973494,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3185749,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"tiny"},
  ],
  tucson: [
    {"map_id":3662608,"source_id":871,"name":"Intermediate river deposits","lith":"sorted ash sand silt clay soil carbonate","descrip":"Moderately dissected terrace deposits associated with large fluvial systems, including the Santa Cruz and Rillito Rivers, Tanque Verde and Cienega Creeks, and Pantano Wash. (…)","b_age":null,"t_age":null,"b_int_age":0.774,"t_int_age":0.0117,"b_int_name":"Middle Pleistocene","t_int_name":"Late Pleistocene","scale":"large"},
    {"map_id":3902530,"source_id":490,"name":"Quaternary surficial deposits, undivided","lith":"clay, sand, silt, unconsolidated","descrip":"Unconsolidated to strongly consolidated alluvial and eolian deposits. (…)","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"medium"},
    {"map_id":2778876,"source_id":133,"name":"Quaternary surficial deposits, undivided","lith":"Major:{sand,silt,clay}","descrip":"Unconsolidated to strongly consolidated alluvial and eolian deposits. This unit includes: coarse, poorly sorted alluvial fan and terrace deposits on middle and upper piedmonts and along large drainages; sand, silt and clay on alluvial plains and playas; and wind-blown sand deposits.  (0-2 Ma)","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Gelasian","t_int_name":"Holocene","scale":"medium"},
    {"map_id":956072,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3185380,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":23.03,"t_age":0,"b_int_age":23.04,"t_int_age":0,"b_int_name":"Miocene","t_int_name":"Quaternary","scale":"tiny"},
  ],
  albuquerque: [
    {"map_id":3286586,"source_id":178,"name":"Floodplain deposits of the Rio Grande, Rio Puerco, and Jemez River","lith":"","descrip":"For the Rio Grande and Jemez River, consists of unconsolidated, light-brown, coarse sand and round pebble to granule gravel with subordinate lenses of fine sand, silt, and clay. (…)","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"large"},
    {"map_id":2966040,"source_id":133,"name":"Alluvium","lith":"Major:{unconsolidated alluvium}","descrip":"","b_age":0.126,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3805968,"source_id":467,"name":"Alluvium","lith":"","descrip":"Alluvium.","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":947785,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3185380,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":23.03,"t_age":0,"b_int_age":23.04,"t_int_age":0,"b_int_name":"Miocene","t_int_name":"Quaternary","scale":"tiny"},
  ],
  sanDiego: [
    {"map_id":2676962,"source_id":115,"name":"Old paralic deposits, Unit 6","lith":"","descrip":"Poorly sorted, moderately permeable, reddish-brown, interfingered strandline, beach, estuarine and colluvial deposits composed of siltstone, sandstone and conglomerate. These deposits rest on the 22-23 m Nestor terrace.","b_age":0.781,"t_age":0.0117,"b_int_age":0.774,"t_int_age":0.0117,"b_int_name":"Middle Pleistocene","t_int_name":"Late Pleistocene","scale":"large"},
    {"map_id":4556990,"source_id":548,"name":"Older alluvium, lake, playa, and terrace deposits","lith":"","descrip":"Older alluvium, lake, playa, and terrace deposits (…)","b_age":2.58,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":2769730,"source_id":133,"name":"Quaternary alluvium and marine deposits","lith":"Major:{coarse alluvium}, Minor:{fine alluvium}","descrip":"Alluvium, lake, playa, and terrace deposits; unconsolidated and semi-consolidated. Mostly nonmarine, but includes marine deposits near the coast.","b_age":5.8113,"t_age":4.0333,"b_int_age":5.333,"t_int_age":0,"b_int_name":"Pliocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":959187,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3185380,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":23.03,"t_age":0,"b_int_age":23.04,"t_int_age":0,"b_int_name":"Miocene","t_int_name":"Quaternary","scale":"tiny"},
  ],
};
const day4 = (k: keyof typeof DAY4) => layersOf(DAY4[k].map(unitFromMacrostrat));
/** Every surface phrase, fact line and standfirst a fixture prints, and the dig's names. */
const allText = (name: string, L: GroundLayers) => [printed(name, L), ...L.surface.map((v) => surfacePhrase(v)), digCover(L)?.name ?? "", ...viewsOf(L).map((v) => (v.cover ? surfaceFact(v) : bedrockFact(v)))].join(" | ");

console.log("Audit of the Day 4 regions (13 November 2026)");
{
  // 1. The ocean: every verified row carries it; Fort Myers reaches the Gulf, Orlando both coasts, the Colorado's towns
  // drain toward the Gulf of California; no line says "west".
  const ws = (ocean: string, system: string, basin: string, code: string): Watershed => ({ ocean, system, river: null, basin, code, country: "USA" });
  const fm = verifiedWatershed(ws("Atlantic Ocean", "Atlantic Ocean Seaboard", "Southern Florida", "030902"), 26.640628, -81.8723084)!;
  const fmV = watershedView(fm);
  check(fm.ocean === "Gulf of Mexico" && fm.river === "Caloosahatchee River" && !fmV.steps.some(([, v]) => /Atlantic/.test(v)) && drainsTo(fm).water === "the Gulf of Mexico" && /Gulf of Mexico/.test(oceanText(fm) ?? ""), "Fort Myers drains to the Gulf of Mexico by the Caloosahatchee, with no Atlantic step", [fm.ocean, fmV.steps]);
  const orl = verifiedWatershed(ws("Atlantic Ocean", "Atlantic Ocean Seaboard", "Kissimmee", "030901"), 28.5421218, -81.379045)!;
  check(orl.ocean === "Gulf of Mexico and Atlantic Ocean" && drainsTo(orl).water === "the Gulf of Mexico and the Atlantic Ocean" && /Lake Okeechobee/.test(oceanText(orl) ?? "") && watershedView(orl).steps.some(([, v]) => v === "Lake Okeechobee"), "Orlando drains by the Kissimmee to Lake Okeechobee, and so to both coasts", [orl.ocean, watershedView(orl).steps, drainsTo(orl)]);
  for (const [n, lat, lon] of [["Miami", 25.7741566, -80.1935973], ["Fort Lauderdale", 26.1223084, -80.1433786]] as const) {
    const m = verifiedWatershed(ws("Atlantic Ocean", "Atlantic Ocean Seaboard", "Southern Florida", "030902"), lat, lon)!;
    check(m.ocean === "Atlantic Ocean", `${n} (Florida Southeast Coast, 03090206) drains to the Atlantic`, m.ocean);
  }
  for (const [n, lat, lon, gila] of [["Phoenix", 33.4484367, -112.074141, true], ["Tucson", 32.2228765, -110.974847, true], ["Las Vegas", 36.1674263, -115.1484131, false]] as const) {
    const c = verifiedWatershed(ws("Pacific Ocean", "Colorado River", "x", "150000"), lat, lon)!;
    const t = oceanText(c) ?? "";
    check(c.ocean === "Gulf of California" && drainsTo(c).verb === "drains toward" && /trickle/.test(t) && !/west|Pacific/.test(t) && (!gila || watershedView(c).steps.some(([l, v]) => l === "Drains to" && v === "Gila River")), `${n}: drains toward the Gulf of California; the line says the Colorado barely reaches the sea${gila ? "; the Gila is named" : ""}`, [c.ocean, t, watershedView(c).steps]);
  }
  check(Object.values(OCEAN_TEXT).every((t) => !/\bwest\b/i.test(t)), "no ocean line says the water runs west (Los Angeles, Santa Barbara)");
  // 2. A rock lithology is rock whatever its age.
  const MI = day4("miami");
  check(MI.surface.length === 0 && MI.bedrock?.unit.mapId === 3923801 && MI.bedrock.rock?.slug === "limestone" && MI.bedrock.interval === "Pleistocene" && MI.bedrock.ageRange === null, "Miami: the Miami Limestone is the bedrock, limestone, Pleistocene, no range", [MI.surface.map((v) => v.unit.name), MI.bedrock && show(MI.bedrock)]);
  check(/Pleistocene limestone bedrock at Miami/.test(groundStandfirst("Miami", MI)) && !digStopsAtCover(MI) && digRock(MI).rock === "Limestone" && !/name no bedrock|oolite deposits|limestone deposits|527,000|525,400|269,300/i.test(allText("Miami", MI)), "Miami: the page and the dig name the limestone; no 'no bedrock', 'oolite deposits' or Macrostrat's own range", groundStandfirst("Miami", MI));
  check(MI.others.filter((v) => /Miami (Oolite|Limestone)/.test(v.unit.name)).every((v) => v.ageRange === null) && MI.others.some((v) => v.unit.name === "Miami Oolite" && v.interval === "Late Pleistocene"), "Miami: the other maps' copies (the Oolite, Late Pleistocene) print no own range either");
  const FL = day4("fortLauderdale");
  // Audit of 10 November 2026, checked 14 November: the shell sand is from the 1:1,000,000 Florida Keys sheet (source 520):
  // regional context, labelled, and never put "over" the state map's limestone as one stack, nor dug with its 1-5 m.
  check(FL.surface.length === 1 && surfacePhrase(FL.surface[0]) === "sand deposits" && FL.surface[0].coarse && FL.bedrock?.rock?.slug === "limestone" && /^The geologic map shows Pleistocene limestone bedrock at Fort Lauderdale\. A regional map of surface deposits \(USGS, 1:1,000,000\) shows sand deposits in the district around Fort Lauderdale \(Holocene\)\.$/.test(groundStandfirst("Fort Lauderdale", FL)), "Fort Lauderdale: the Miami Limestone at the town; the shell sand labelled as the regional sheet's", groundStandfirst("Fort Lauderdale", FL));
  check(digCover(FL) === undefined && digRock(FL).rock === "Limestone" && !digStopsAtCover(FL), "Fort Lauderdale: the dig reaches the limestone; no regional sand or 1-5 m drawn as the town's", [digCover(FL), digRock(FL)]);
  check(coverKind(byMap(day3("asheville"), 4076556)!.unit) === "deposit", "a colluvium whose lithology starts 'granitic' stays a deposit (Asheville)");
  // 3. A rock named in a cover unit's description is said.
  const FM = day4("fortMyers");
  // Audit of 10 November 2026, checked 14 November: the residuum (4075116) is from the 1:1,000,000 Florida Keys sheet; its
  // description is the class's, so what it "lies on" is not said as the town's rock (see `REGIONAL_SOURCES`).
  check(!FM.bedrock && FM.beneath === null && !viewsOf(FM).some((v) => v.unit.mapId === 4075116 && (v.lead || v.thickness)), "Fort Myers: the regional residuum's description is not printed or read as the rock under the town", FM.beneath && [FM.beneath.unit.unit.name, FM.beneath.text]);
  check(!/limestone/i.test(groundStandfirst("Fort Myers", FM)) && !digRock(FM).rock && !digRock(FM).rockAge, "Fort Myers: the standfirst and the dig name no rock from a regional sheet's description", [groundStandfirst("Fort Myers", FM), digRock(FM)]);
  check(day4("sanDiego").beneath === null, "a terrace is not a rock (San Diego's deposits 'rest on the 22-23 m Nestor terrace')");
  // 4. Boise: one unit, one role; source 462 is basement.
  const BO = day4("boise");
  check(BASEMENT_SOURCES.has(462) && !BO.bedrock && !viewsOf(BO).some((v) => v.unit.sourceId === 462), "Boise: the Idaho basement map (source 462) is never the bedrock or listed", viewsOf(BO).map((v) => v.unit.sourceId));
  check(BO.surface.length === 1 && BO.surface[0].unit.mapId === 2991198 && surfacePhrase(BO.surface[0]) === "gravel" && BO.surface[0].interval === "Pliocene to Pleistocene" && digStopsAtCover(BO) && /name no bedrock/.test(groundStandfirst("Boise", BO)) && !BO.bedrock && !BO.regionalBedrock && !/sedimentary rock/.test(groundStandfirst("Boise", BO)), "Boise: the lake and river gravels are one surface layer; no 'sedimentary rock' under them", [BO.surface.map((v) => [v.unit.mapId, surfacePhrase(v), v.interval]), groundStandfirst("Boise", BO), headline("Boise", BO)]);
  // 5. Ages: Sacramento's Quaternary alluvium, Tampa's member and group copies.
  const SA = day4("sacramento");
  check(SA.surface.length === 1 && surfacePhrase(SA.surface[0]) === "alluvium" && SA.surface[0].interval === "Quaternary" && SA.surface[0].ageRange === null && !/4\.4|0\.01 million|marine/.test(groundStandfirst("Sacramento", SA)), "Sacramento: one alluvium layer (two maps), dated to the Quaternary its name gives; no 4.4 Ma, no 'marine deposits'", [SA.surface.map((v) => surfaceFact(v)), groundStandfirst("Sacramento", SA)]);
  check(ageRangeText(4.4087, 0.0117) === "4.4 million to 11,700 years ago" && !/0\.0\d million/.test(ageRangeText(3.6, 0.0117) ?? ""), "an end under a million years is given in years, never '0.01 million'", ageRangeText(4.4087, 0.0117));
  const TA = day4("tampa");
  const tm = TA.others.find((v) => v.unit.mapId === 3923241);
  check(TA.bedrock?.unit.mapId === 2905140 && TA.bedrock.rock?.slug === "limestone" && TA.bedrock.interval === "Oligocene to Miocene" && TA.bedrock.joint && TA.bedrock.ageRange === null && tm?.interval === "Oligocene to Miocene" && tm.ageRange === null, "Tampa: the member's two copies are dated together, Oligocene to Miocene, with no range", [TA.bedrock && show(TA.bedrock), tm && show(tm)]);
  check(/Oligocene to Miocene limestone bedrock at Tampa\. A regional map/.test(groundStandfirst("Tampa", TA)) && /dated by the maps of this spot only to the Oligocene to the Miocene/.test(bedrockFact(TA.bedrock!)) && !/24\.3|23\.7|17\.1/.test(allText("Tampa", TA)), "Tampa: 'Oligocene to Miocene limestone bedrock', no 24.3 to 23.7", bedrockFact(TA.bedrock!));
  check(endsName(27.3, 11.63) === "Oligocene to Miocene" && endsName(346.7, 298.9) === "Carboniferous" && endsName(541, 485.4) === "Cambrian", "endsName: the intervals at each end, or one period that holds both", [endsName(27.3, 11.63), endsName(346.7, 298.9), endsName(541, 485.4)]);
  // 6. Surface phrases from material words.
  const TU = day4("tucson");
  const AL = day4("albuquerque");
  const SD = day4("sanDiego");
  check(surfacePhrase(AL.surface[0]) === "floodplain deposits" && surfacePhrase(TU.surface[0]) === "intermediate river deposits" && surfacePhrase(SD.surface[0]) === "old paralic deposits" && SD.surface.some((v) => v.unit.mapId === 2769730 && surfacePhrase(v) === "alluvium" && v.interval === "Quaternary"), "Albuquerque 'floodplain deposits', Tucson 'intermediate river deposits', San Diego 'old paralic deposits'; the statewide unit is 'alluvium', Quaternary", [AL, TU, SD].map((L) => L.surface.map((v) => surfacePhrase(v))));
  check(![MI, FL, FM, TA, BO, SA, TU, AL, SD].some((L) => L.surface.some((v) => /,|\bunit \d|deposits.*deposits|soil carbonate|and marine/i.test(surfacePhrase(v)))), "no fixture's surface phrase carries a comma, a unit number, 'deposits' twice, a lithology string or 'and marine'");
  // 8. The dig: desert towns by the site's climate normals, caliche where the map lists it.
  const climateOf = (slug: string) => (NORMALS as unknown as { place: { slug: string; lat: number }; climate: Parameters<typeof isDesertClimate>[0] }[]).find((t) => t.place.slug === slug);
  const desertOf = (slug: string) => {
    const t = climateOf(slug);
    return !!t && isDesertClimate(t.climate, t.place.lat);
  };
  check(["tucson-arizona", "phoenix-arizona", "las-vegas-nevada"].every(desertOf) && !["albuquerque-new-mexico", "ottawa-ontario", "miami-florida", "denver-colorado", "boise-idaho"].some(desertOf), "desert digs at Tucson, Phoenix and Las Vegas (Köppen BW); not at Albuquerque (BSk), Denver, Boise, Ottawa or Miami");
  check(digCaliche(TU) && !digCaliche(AL) && !digCaliche(SA), "caliche is named at Tucson, whose map unit lists soil carbonate, and not where the map does not");
  const digUi = readFileSync("src/components/kids/SoilDig.jsx", "utf8");
  const digPage = readFileSync("src/app/(site)/ground/[slug]/dig/page.tsx", "utf8");
  check(/desert: ds, caliche: ca/.test(digUi) && /"Dry surface"/.test(digUi) && /ds\s*\?\s*"Pale and light brown/.test(digUi) && /\{!ds && <A x=\{268\}/.test(digUi) && /"Subsoil with caliche"/.test(digUi) && /desert=\{desert\} caliche=\{caliche\}/.test(digPage) && /isDesertClimate\(/.test(digPage) && !/through the leaf litter/.test(digPage), "the dig draws desert ground (no leaves, worms or mole) where the climate is desert, and names caliche where the map lists it");
}

// ---- the audit of 10 November 2026, checked 14 November (Day 5: the last 25 towns) ----------------------------------
// Map units at the site's coordinates for twelve of the towns, read with the same Macrostrat query on 14 November 2026
// by the checkers. The reading tool shortened some descriptions ("..."); what it copied is kept verbatim.
const DAY5: Record<string, MacrostratUnit[]> = {
  bozeman: [
    {"map_id":3775937,"source_id":465,"name":"lmbricately intercalated rocks","lith":"","descrip":"Covered","b_age":4031,"t_age":1600,"b_int_age":4031,"t_int_age":1600,"b_int_name":"Archean","t_int_name":"Paleoproterozoic","scale":"medium"},
    {"map_id":4424480,"source_id":542,"name":"Sixmile Creek Formation","lith":"conglomerate, marlstone, sandstone, siltstone","descrip":"Conglomerate, sandstone, tuffaceous  siltstone, marlstone, and equivalent sediment and ash beds.","b_age":17.0975,"t_age":5.333,"b_int_age":23.04,"t_int_age":5.333,"b_int_name":"Miocene","t_int_name":"Miocene","scale":"medium"},
    {"map_id":2941469,"source_id":133,"name":"Upper Tertiary sediment or sedimentary rock","lith":"Major:{conglomerate,sandstone,siltstone}, Minor:{marlstone}, Incidental:{volcanic}","descrip":"Conglomerate, tuffaceous sandstone and siltstone, marlstone, and equivalent sediment and ash beds.","b_age":20.44,"t_age":2.588,"b_int_age":20.45,"t_int_age":2.58,"b_int_name":"Burdigalian","t_int_name":"Pliocene","scale":"medium"},
    {"map_id":4518538,"source_id":543,"name":"Sixmile Creek Formation","lith":"conglomerate, marlstone, sandstone, siltstone","descrip":"Conglomerate, sandstone, tuffaceous  siltstone, marlstone, and equivalent sediment and ash beds.","b_age":17.0975,"t_age":5.333,"b_int_age":23.04,"t_int_age":5.333,"b_int_name":"Miocene","t_int_name":"Miocene","scale":"medium"},
    {"map_id":953493,"source_id":7,"name":"Neogene sedimentary","lith":"sedimentary","descrip":"","b_age":23.03,"t_age":2.588,"b_int_age":23.04,"t_int_age":2.58,"b_int_name":"Neogene","t_int_name":"Neogene","scale":"small"},
    {"map_id":3187606,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":23.03,"t_age":5.333,"b_int_age":23.04,"t_int_age":5.333,"b_int_name":"Miocene","t_int_name":"Miocene","scale":"tiny"},
  ],
  laramie: [
    {"map_id":2699026,"source_id":127,"name":"Mixed alluvium and terrace deposits","lith":"","descrip":"Unconsolidated and poorly consolidated clay, silt, sand, and gravel, representing a transition zone","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"large"},
    {"map_id":3901525,"source_id":489,"name":"Unidentified rocks of units Ys and Ya","lith":"","descrip":"Mapped from aeromagnetic map of Wyoming","b_age":1600,"t_age":1000,"b_int_age":1600,"t_int_age":1000,"b_int_name":"Mesoproterozoic","t_int_name":"Mesoproterozoic","scale":"medium"},
    {"map_id":2967994,"source_id":133,"name":"Alluvium and Colluvium","lith":"Major:{clay,silt,sand}, Minor:{gravel}","descrip":"Clay, silt, sand, and gravel in flood plains, fans, terraces, and slopes.","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3843280,"source_id":471,"name":"Alluvium and colluvium","lith":"clay, gravel, sand, silt","descrip":"Clay, silt, sand, and gravel in flood plains, fans, terraces, and slopes","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":940840,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3185972,"source_id":154,"name":"Mesozoic sedimentary rocks","lith":"sandstone-conglomerate","descrip":"","b_age":237,"t_age":174.1,"b_int_age":237,"t_int_age":174.7,"b_int_name":"Late Triassic","t_int_name":"Early Jurassic","scale":"tiny"},
  ],
  portland: [
    {"map_id":1548888,"source_id":20,"name":"Quaternary surficial deposits; Alluvial deposits","lith":"Major: {volcanic ash}; Major: {fluvial sediment, intermediate volcanic rocks of the Cascade Range clasts; lithology: organic","descrip":"Alluvium; 60m thick; mixed grained sediments","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"large"},
    {"map_id":2916844,"source_id":133,"name":"Lacustrine and fluvial sedimentary rocks","lith":"Major:{clay,silt,sand}, Minor:{gravel}, Incidental:{peat}","descrip":"Unconsolidated to semiconsolidated lacustrine clay, silt, sand, and gravel; in places includes mudflow and fluvial deposits","b_age":2.588,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":4314619,"source_id":540,"name":"Lacustrine and fluvial sedimentary rocks","lith":"sedimentary, clay, sand, silt, unconsolidated, minor chert, minor conglomerate, minor gravel, minor peat, minor quartzite","descrip":"Unconsolidated to semiconsolidated lacustrine clay, silt, sand, and gravel; in places includes mudflow and fluvial deposits","b_age":2.58,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Pleistocene","t_int_name":"Pleistocene","scale":"medium"},
    {"map_id":969273,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
    {"map_id":3190057,"source_id":154,"name":"Cenozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"tiny"},
  ],
  seattle: [
    {"map_id":1388784,"source_id":19,"name":"","lith":"artificial fill, including modified land","descrip":"","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"large"},
    {"map_id":4523294,"source_id":544,"name":"Quaternary alluvium","lith":"clay, sand, silt, unconsolidated, minor diatomite, minor gravel, minor peat","descrip":"Quaternary unconsolidated or semiconsolidated alluvial clay, silt, sand, gravel, and (or) cobble deposits...","b_age":2.58,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"medium"},
    {"map_id":2752173,"source_id":133,"name":"Alluvium","lith":"Major:{silt,sand}, Minor:{gravel}, Incidental:{peat, clay}","descrip":"Mostly unconsolidated silt, sand, and gravel valley fill with some clay; includes low-level terrace, marsh, peat,...","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":966206,"source_id":7,"name":"Quaternary sedimentary","lith":"sedimentary","descrip":"","b_age":2.588,"t_age":0,"b_int_age":2.58,"t_int_age":0,"b_int_name":"Quaternary","t_int_name":"Quaternary","scale":"small"},
  ],
  austin: [
    {"map_id":4041253,"source_id":509,"name":"Alluvial Clay, Silt, Sand, And Gravel","lith":"clay, gravel, sand, silt, minor basalt, minor boulders, minor chert, minor claystone, minor gneiss, minor granite, minor igneous, minor limestone, minor pegmatite, minor quartzite, minor sandstone, minor schist, minor sedimentary, minor volcanic","descrip":"Alluvium of \"Deweyville Terrace,\" Beaumont, Lissie, and Willis age, undifferentiated. ...","b_age":2.58,"t_age":0.0117,"b_int_age":2.58,"t_int_age":0.0117,"b_int_name":"Gelasian","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":2831140,"source_id":133,"name":"Austin Chalk","lith":"Major:{marlstone,chalk}, Minor:{claystone}","descrip":"In Eastern part of Trans-Pecos Texas and High Plains- Chalk and marl; chalk mostly microgranular calcite ...","b_age":90.7225,"t_age":80.725,"b_int_age":100.5,"t_int_age":66,"b_int_name":"Late Cretaceous","t_int_name":"Late Cretaceous","scale":"medium"},
    {"map_id":3988815,"source_id":501,"name":"Austin Chalk","lith":"chalk","descrip":"In Eastern part of Trans-Pecos Texas and High Plains- Chalk and marl; chalk mostly microgranular calcite ...","b_age":90.7225,"t_age":80.75,"b_int_age":100.5,"t_int_age":66,"b_int_name":"Late Cretaceous","t_int_name":"Late Cretaceous","scale":"medium"},
    {"map_id":953264,"source_id":7,"name":"Late Cretaceous sedimentary","lith":"sand, mud, chalk, carbonate","descrip":"","b_age":95.55,"t_age":70.575,"b_int_age":100.5,"t_int_age":72.2,"b_int_name":"Cenomanian","t_int_name":"Campanian","scale":"small"},
    {"map_id":3186170,"source_id":154,"name":"Mesozoic sedimentary rocks","lith":"carbonate,shale","descrip":"","b_age":145,"t_age":100.5,"b_int_age":143.1,"t_int_age":100.5,"b_int_name":"Early Cretaceous","t_int_name":"Early Cretaceous","scale":"tiny"},
  ],
  internationalFalls: [
    {"map_id":4132590,"source_id":527,"name":"Clayey sediment","lith":"clay, silt","descrip":"Silt and clay, commonly laminated; dominantly distal meltwater sediments deposited in deep water.","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":3900114,"source_id":485,"name":"Granitic intrusion","lith":"granitic, granite","descrip":"Includes the Sacred Heart (~2592, 2603 Ma) and Ortonville granites; Shannon Lake Granite (~2674), and other...","b_age":2800,"t_age":2500,"b_int_age":2800,"t_int_age":2500,"b_int_name":"Neoarchean","t_int_name":"Neoarchean","scale":"medium"},
    {"map_id":4079874,"source_id":524,"name":"Lake Clay And Silt","lith":"clay, silt, ice, sand, minor carbonate, minor gravel, minor peat","descrip":"Pink, pale-red, pale-yellow, reddish-brown, yellowish-brown, grayish brown, brown, grayish-green, pinkish-gray...","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":3775399,"source_id":464,"name":"Granitic intrusion","lith":"granitic, granite","descrip":"Includes the Sacred Heart (~2592, 2603 Ma) and Ortonville granites; Shannon Lake Granite (~2674), and other...","b_age":2800,"t_age":2500,"b_int_age":2800,"t_int_age":2500,"b_int_name":"Neoarchean","t_int_name":"Neoarchean","scale":"medium"},
    {"map_id":2900115,"source_id":133,"name":"Granitic intrusion","lith":"Major:{granite}","descrip":"Granitic intrusion.","b_age":2800,"t_age":2500,"b_int_age":2800,"t_int_age":2500,"b_int_name":"Neoarchean","t_int_name":"Neoarchean","scale":"medium"},
    {"map_id":944516,"source_id":7,"name":"Neoarchean plutonic: undivided granitic rocks","lith":"plutonic: undivided granitic rocks","descrip":"","b_age":2800,"t_age":2500,"b_int_age":2800,"t_int_age":2500,"b_int_name":"Neoarchean","t_int_name":"Neoarchean","scale":"small"},
    {"map_id":3189083,"source_id":154,"name":"Archean sedimentary rocks","lith":"paragneiss","descrip":"","b_age":2800,"t_age":2500,"b_int_age":2800,"t_int_age":2500,"b_int_name":"Neoarchean","t_int_name":"Neoarchean","scale":"tiny"},
  ],
  grandForks: [
    {"map_id":3738777,"source_id":452,"name":"Winnipeg Group","lith":"sandstone, shale","descrip":"Light-gray to greenish-gray shale and light-gray sandstone; marine nearshore and offshore sediment; as thick as 125 meters (400 feet)","b_age":486.85,"t_age":443.1,"b_int_age":486.85,"t_int_age":443.1,"b_int_name":"Ordovician","t_int_name":"Ordovician","scale":"medium"},
    {"map_id":3880196,"source_id":478,"name":"River sediment","lith":"clay, sand, silt","descrip":"Dark, obscurely bedded clay and silt (overbank sediment); generally overlying cross-bedded sand (channel sediment); as thick as 10 meters (30 feet); on flood plains of modem streams","b_age":0.0117,"t_age":0,"b_int_age":0.0117,"t_int_age":0,"b_int_name":"Holocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":2987640,"source_id":133,"name":"Winnipeg Group","lith":"Major:{shale,sandstone}","descrip":"Light-gray to greenish-gray shale and light-gray sandstone; marine nearshore and offshore sediment; as thick as 125 metres (400 feet).","b_age":465.5,"t_age":458.4,"b_int_age":486.85,"t_int_age":443.1,"b_int_name":"Ordovician","t_int_name":"Ordovician","scale":"medium"},
    {"map_id":3900205,"source_id":486,"name":"Granitoid rocks","lith":"granite, greenstone, tonalite","descrip":"Granite to tonalite of 2,650-2,750 Ma age group in Superior greenstone-granite terrane","b_age":2800,"t_age":2500,"b_int_age":2800,"t_int_age":2500,"b_int_name":"Neoarchean","t_int_name":"Neoarchean","scale":"medium"},
    {"map_id":4053549,"source_id":513,"name":"Alluvium","lith":"clay, gravel, sand, silt, minor boulders, minor carbonate, minor ice, minor lignite","descrip":"Reddish-brown, yellowish-brown, brown, yellowish-gray, brownish-gray, gray, black, or mottled clay, silt, sand, and gravel.  Calcareous; partly or completely oxidized.  Thickness 1-9 m, locally more than 23 m","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":963805,"source_id":7,"name":"Late Ordovician sedimentary","lith":"sedimentary","descrip":"","b_age":458.4,"t_age":443.8,"b_int_age":458.2,"t_int_age":443.1,"b_int_name":"Late Ordovician","t_int_name":"Late Ordovician","scale":"small"},
    {"map_id":3192138,"source_id":154,"name":"Paleozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":458.4,"t_age":443.8,"b_int_age":458.2,"t_int_age":443.1,"b_int_name":"Late Ordovician","t_int_name":"Late Ordovician","scale":"tiny"},
  ],
  madison: [
    {"map_id":934954,"source_id":6,"name":"Wonewoc Formation (Cw)","lith":"","descrip":"Quartz sandstone, medium grained, brownish yellow to white, with medium- to large-scale cross bedding commonly seen in outcrop. Reaches a maximum thickness of 165 feet (50 m) in the subsurface. Part of Elk Mound Group.","b_age":497.5,"t_age":493.575,"b_int_age":538.8,"t_int_age":486.85,"b_int_name":"Cambrian","t_int_name":"Cambrian","scale":"large"},
    {"map_id":2985493,"source_id":133,"name":"Cambrian, undivided","lith":"Major:{sandstone}, Minor:{dolostone,shale}","descrip":"Sandstone with some dolomite and shale, undivided; includes Trempealeau, Tunnel City, and Elk Mound Formations","b_age":496.8,"t_age":492.5,"b_int_age":538.8,"t_int_age":486.85,"b_int_name":"Cambrian","t_int_name":"Cambrian","scale":"medium"},
    {"map_id":4026504,"source_id":506,"name":"Ground Moraine","lith":"","descrip":"Thickness 2-30 m.","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":3900491,"source_id":488,"name":"Paleozoic rocks, undivided","lith":"carbonate, sandstone, siltstone","descrip":"Dominantly quartzose and glauconitic sandstone and siltstone with lesser amounts of carbonate rocks","b_age":538.8,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","t_int_name":"Paleozoic","scale":"medium"},
    {"map_id":3769249,"source_id":459,"name":"Sandstone with some dolomite and shale, undivided","lith":"sandstone, shale","descrip":"Sandstone with some dolomite and shale, undivided; includes Trempealeau City and Elk Mound Groups","b_age":538.8,"t_age":486.85,"b_int_age":538.8,"t_int_age":486.85,"b_int_name":"Cambrian","t_int_name":"Cambrian","scale":"medium"},
    {"map_id":3770941,"source_id":461,"name":"Granitic plutons","lith":"granitic","descrip":"","b_age":1600,"t_age":1000,"b_int_age":1600,"t_int_age":1000,"b_int_name":"Mesoproterozoic","t_int_name":"Mesoproterozoic","scale":"medium"},
    {"map_id":3771049,"source_id":463,"name":"Granitoid rocks","lith":"granite, metamorphic","descrip":"Includes fine-grained epizonal granite (in Wisconsin) and probable mesozonal granite and associated metamorphic rocks","b_age":2500,"t_age":1600,"b_int_age":2500,"t_int_age":1600,"b_int_name":"Paleoproterozoic","t_int_name":"Paleoproterozoic","scale":"medium"},
    {"map_id":4569315,"source_id":550,"name":"Lake sediment","lith":"clay, gravel, sand, silt, minor ice","descrip":"Stratified and well-sorted sandy gravel, sand, silt, and clay deposited in lakes. Lake plains formed in ice-marginal lakes, includes both laminated offshore and bedded nearshore sediment.  Includes small hills that were islands within the lakes.","b_age":0.129,"t_age":0.0117,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":951240,"source_id":7,"name":"Cambrian sedimentary","lith":"sedimentary","descrip":"","b_age":541,"t_age":485.4,"b_int_age":538.8,"t_int_age":486.85,"b_int_name":"Cambrian","t_int_name":"Cambrian","scale":"small"},
    {"map_id":3187973,"source_id":154,"name":"Paleozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":541,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","t_int_name":"Paleozoic","scale":"tiny"},
  ],
  grandRapids: [
    {"map_id":2739801,"source_id":133,"name":"Bayport Limestone","lith":"Major:{limestone}, Minor:{sandstone,dolostone}, Incidental:{shale, chert, evaporite}","descrip":"Secondary unit description from USGS Geologic Names lexicon (ref. MI016): The Bayport limestone consists of sandy yellow...","b_age":342.0833,"t_age":340.6667,"b_int_age":358.86,"t_int_age":323.4,"b_int_name":"Mississippian","t_int_name":"Mississippian","scale":"medium"},
    {"map_id":3893643,"source_id":484,"name":"Michigan Formation","lith":"","descrip":"","b_age":348.8334,"t_age":340.6667,"b_int_age":358.86,"t_int_age":323.4,"b_int_name":"Mississippian","t_int_name":"Mississippian","scale":"medium"},
    {"map_id":4024679,"source_id":506,"name":"Outwash  Sand  And  Gravel","lith":"gravel, sand, limestone, silt, minor ice, minor peat, minor sandstone, minor shale","descrip":"Batavia  and  Mackinaw  Members  of  Henry Formation in Illinois; outwash facies of Atherton Formation in Indiana...","b_age":1.8095,"t_age":0.6538,"b_int_age":0.129,"t_int_age":0.0117,"b_int_name":"Late Pleistocene","t_int_name":"Late Pleistocene","scale":"medium"},
    {"map_id":4356251,"source_id":541,"name":"Glacial Outwash Sand And Gravel And Postglacial Alluvium","lith":"gravel, sand","descrip":"Pale reddish brown, fine to coarse sand alternating with layers of small gravel to heavy cobbles, mixed lithology...","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":951358,"source_id":7,"name":"Serpukhovian sedimentary","lith":"sedimentary","descrip":"","b_age":330.9,"t_age":323.2,"b_int_age":330.3,"t_int_age":323.4,"b_int_name":"Serpukhovian","t_int_name":"Serpukhovian","scale":"small"},
    {"map_id":3187973,"source_id":154,"name":"Paleozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":541,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","t_int_name":"Paleozoic","scale":"tiny"},
  ],
  niagara: [
    {"map_id":624086,"source_id":1,"name":"Queenston Formation","lith":"shale, limestone, dolostone, siltstone","descrip":"","b_age":448.05,"t_age":444.15,"b_int_age":458.2,"t_int_age":443.1,"b_int_name":"Late Ordovician","t_int_name":"Late Ordovician","scale":"medium"},
    {"map_id":4140818,"source_id":530,"name":"Alluvium","lith":"gravel, sand, sandstone, silt, minor clay, minor ice, minor peat, minor shale, minor siltstone","descrip":"Yellowish brown, brown, or reddish-brown to gray silt, sand, and gravel.  Generally calcareous.","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":953915,"source_id":7,"name":"Late Ordovician sedimentary","lith":"sedimentary","descrip":"","b_age":458.4,"t_age":443.8,"b_int_age":458.2,"t_int_age":443.1,"b_int_name":"Late Ordovician","t_int_name":"Late Ordovician","scale":"small"},
    {"map_id":3187973,"source_id":154,"name":"Paleozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":541,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","t_int_name":"Paleozoic","scale":"tiny"},
  ],
  kingston: [
    {"map_id":619135,"source_id":1,"name":"Late felsic plutonic rocks","lith":"granodiorite, granite, syenite, pegmatite, alkalic granite, migmatitic gneisses","descrip":"","b_age":1600,"t_age":541,"b_int_age":1600,"t_int_age":538.8,"b_int_name":"Mesoproterozoic","t_int_name":"Neoproterozoic","scale":"medium"},
    {"map_id":4014808,"source_id":504,"name":"Lake Silt And Clay","lith":"clay, silt, ice, sand, minor carbonate, minor gravel, minor limestone, minor peat","descrip":"Pale-yellow, yellowish-brown, reddish-brown, olive-brown, grayish-brown, brown, olive, pinkish-gray, reddish-gray.","b_age":0.129,"t_age":0,"b_int_age":0.129,"t_int_age":0,"b_int_name":"Late Pleistocene","t_int_name":"Holocene","scale":"medium"},
    {"map_id":949051,"source_id":7,"name":"Middle Ordovician sedimentary","lith":"sedimentary","descrip":"","b_age":470,"t_age":458.4,"b_int_age":471.3,"t_int_age":458.2,"b_int_name":"Middle Ordovician","t_int_name":"Middle Ordovician","scale":"small"},
    {"map_id":3187973,"source_id":154,"name":"Paleozoic sedimentary rocks","lith":"sedimentary rocks","descrip":"","b_age":541,"t_age":251.902,"b_int_age":538.8,"t_int_age":251.902,"b_int_name":"Paleozoic","t_int_name":"Paleozoic","scale":"tiny"},
  ],
  saskatoon: [
    {"map_id":1295805,"source_id":9,"name":"Lea Park Fm; Milk River Fm of Montana Gp","lith":"marine shale/muddy sandstone","descrip":"","b_age":83.6,"t_age":74.975,"b_int_age":143.1,"t_int_age":66,"b_int_name":"Cretaceous","t_int_name":"Cretaceous","scale":"medium"},
    {"map_id":968897,"source_id":7,"name":"Late Cretaceous sedimentary","lith":"sand, chalk, mud","descrip":"","b_age":90.825,"t_age":67.0167,"b_int_age":83.6,"t_int_age":66,"b_int_name":"Campanian","t_int_name":"Maastrichtian","scale":"small"},
    {"map_id":3188050,"source_id":154,"name":"Mesozoic sedimentary rocks","lith":"siltstone,shale,sandstone","descrip":"","b_age":100.5,"t_age":66,"b_int_age":100.5,"t_int_age":66,"b_int_name":"Late Cretaceous","t_int_name":"Late Cretaceous","scale":"tiny"},
  ],
};
const day5 = (k: keyof typeof DAY5) => layersOf(DAY5[k].map(unitFromMacrostrat));

console.log("Audit of the Day 5 regions (14 November 2026)");
{
  // 1. Buried basement: sources 465 and 489, and every basement map named in the source list, are never the bedrock.
  const BZ = day5("bozeman");
  check(!viewsOf(BZ).some((v) => v.unit.sourceId === 465) && BZ.bedrock?.unit.name === "Sixmile Creek Formation" && !/Archean|Paleoproterozoic/.test(printed("Bozeman", BZ)), "Bozeman: the Montana basement map (465, 'Covered') is not the bedrock; the Sixmile Creek Formation is", BZ.bedrock && show(BZ.bedrock));
  const LA = day5("laramie");
  check(!viewsOf(LA).some((v) => v.unit.sourceId === 489) && !LA.bedrock && !/Mesoproterozoic/.test(printed("Laramie", LA)), "Laramie: the Wyoming aeromagnetic basement map (489) is not the bedrock", LA.bedrock && show(LA.bedrock));
  check(isBuriedBasement({ name: "x", description: "Covered", sourceId: 999 }) && isBuriedBasement({ name: "x", description: "Mapped from aeromagnetic map of Wyoming", sourceId: 999 }) && isBuriedBasement({ name: "Precambrian basement, undivided", description: null, sourceId: 999 }) && !isBuriedBasement({ name: "Winnipeg Group", description: "Light-gray shale; covered in places by till", sourceId: 452 }), "a basement unit from an unlisted source is caught by its own words ('Covered', aeromagnetic, basement)");
  const SRC = (MACROSTRAT_SOURCES as { sources: Record<string, string> }).sources;
  const missingBasement = Object.entries(SRC).filter(([id, n]) => BASEMENT_SOURCE_NAME.test(n) && !BASEMENT_SOURCES.has(Number(id)));
  check(missingBasement.length === 0 && [465, 489].every((id) => BASEMENT_SOURCES.has(id)), "every basement, aeromagnetic or buried-surface map in the source list is in BASEMENT_SOURCES", missingBasement);
  // 2. The 1:1,000,000 Quaternary sheets rank below the 1:500,000 maps, are labelled, and their text stays off local claims.
  const QUAD = /4°\s*[x×]\s*6°/;
  const missingRegional = Object.entries(SRC).filter(([id, n]) => QUAD.test(n) !== Number(id) in REGIONAL_SOURCES);
  check(missingRegional.length === 0 && [504, 506, 509, 513, 524, 525, 530].every((id) => id in REGIONAL_SOURCES) && ![507, 527, 528, 541, 550].some((id) => id in REGIONAL_SOURCES), "REGIONAL_SOURCES is exactly the 4° x 6° sheets of the source list (504, 506, 509, 513, 524, 525, 530 ...; not the 1:500,000 maps)", missingRegional);
  const MA = day5("madison");
  check(MA.surface[0]?.unit.sourceId === 550 && surfacePhrase(MA.surface[0]) === "lake sediment" && /lake sediment at the surface at Madison/.test(groundStandfirst("Madison", MA)) && !/ground moraine|2-30 m/i.test(groundStandfirst("Madison", MA)) && digCover(MA)?.name !== "Glacial till" && !digCover(MA)?.thickness, "Madison: Wisconsin's 1:500,000 lake sediment first; the Chicago sheet's ground moraine and its 2-30 m are not the town's", [groundStandfirst("Madison", MA), digCover(MA)]);
  const NI = day5("niagara");
  check(NI.surface[0]?.coarse && /^The geologic map shows Late Ordovician shale bedrock at Niagara-on-the-Lake\. A regional map of surface deposits \(USGS, 1:1,000,000\) shows alluvium in the district around/.test(groundStandfirst("Niagara-on-the-Lake", NI)) && !/at the surface at Niagara/.test(groundStandfirst("Niagara-on-the-Lake", NI)) && digCover(NI) === undefined, "Niagara-on-the-Lake: the Lake Erie sheet's 'alluvium' is labelled regional and is not dug as the town's ground", groundStandfirst("Niagara-on-the-Lake", NI));
  const GR = day5("grandRapids");
  check(GR.surface[0]?.unit.sourceId === 541 && !/Henry Formation|Atherton/.test(viewsOf(GR).map((v) => `${v.lead ?? ""} ${v.rest ?? ""}`).join(" ")), "Grand Rapids: Southern Michigan's 1:500,000 map first; the Chicago sheet's 'Henry Formation in Illinois' is not printed", GR.surface.map((v) => [v.unit.sourceId, v.lead]));
  const AU = day5("austin");
  check(AU.surface.every((v) => v.coarse && !v.lead && !v.thickness) && !/Deweyville|Lissie|Willis/.test(viewsOf(AU).map((v) => `${v.lead ?? ""} ${v.rest ?? ""}`).join(" ")) && /\(map unit: Alluvial Clay, Silt, Sand, And Gravel; from a regional map of surface deposits \(USGS, 1:1,000,000\)\)/.test(surfaceFact(AU.surface[0])), "Austin: the Austin sheet's alluvium is labelled regional, and its 'Deweyville Terrace, Beaumont, Lissie and Willis age' is not printed", surfaceFact(AU.surface[0]));
  const regionalText = (["madison", "niagara", "grandRapids", "austin", "kingston", "grandForks", "internationalFalls"] as const).flatMap((k) => viewsOf(day5(k)).filter((v) => isRegional(v.unit)));
  check(regionalText.length > 0 && regionalText.every((v) => v.coarse && v.lead === null && v.thickness === null && v.rest === null && scaleRank(v.unit) > 1 && scaleRank(v.unit) < 2), "no regional sheet's description or thickness is printed; every one is labelled and ranked between medium and small", regionalText.filter((v) => v.lead || v.thickness).map((v) => v.unit.name));
  // 3. Portland's alluvial deposits are not volcanic rock.
  const PO = day5("portland");
  check(PO.surface[0]?.cover === "deposit" && surfacePhrase(PO.surface[0]) === "alluvium" && digCover(PO)?.kind === "deposit" && digCover(PO)?.name !== "Young volcanic rock" && !/volcanic/i.test(groundStandfirst("Portland", PO)), "Portland: 'Quaternary surficial deposits; Alluvial deposits' is alluvium, not volcanic rock", [groundStandfirst("Portland", PO), digCover(PO)]);
  // 4. Austin Chalk is chalk.
  check(AU.bedrock?.rock?.slug === "chalk" && AU.bedrock.lithFrom === "name" && /Late Cretaceous chalk bedrock at Austin/.test(groundStandfirst("Austin", AU)) && digRock(AU).rock === "Chalk", "Austin: the Austin Chalk is chalk (its name), not marl (one list's order)", AU.bedrock && show(AU.bedrock));
  check(day2("atlanta").bedrock?.rock?.slug === "gneiss", "a name that lists rocks ('Mica Schist/ Gneiss/ Amphibolite') does not override the list (Atlanta stays gneiss)");
  // 5. Valley fill is not made ground.
  const SE = day5("seattle");
  const seAl = viewsOf(SE).find((v) => v.unit.mapId === 2752173);
  check(!!seAl && !isMadeGround(seAl.unit) && surfacePhrase(seAl) === "alluvium" && isMadeGround({ ...seAl.unit, description: "Artificial fill, including modified land." }), "Seattle: 'valley fill' in the Alluvium's description is not made ground; artificial fill still is", seAl && surfacePhrase(seAl));
  // 6. The dig: no cover mapped is no rock at 2 m.
  const SK = day5("saskatoon");
  const digUi = readFileSync("src/components/kids/SoilDig.jsx", "utf8");
  check(SK.surface.length === 0 && digCover(SK) === undefined && !/about 2 m down|about 1–2 m down/.test(digUi) && /ticks = a\.slice\(0, 4\)/.test(digUi) && /name: "Deeper ground"/.test(digUi) && /"at a depth the maps here do not give"/.test(digUi), "Saskatoon: no cover is mapped, and the dig gives the rock no depth (never 'about 2 m down'); the ruler stops at 1 m");
  // 7. Canadian sub-drainage areas are named as Statistics Canada names them.
  const can = (code: string, basin: string) => verifiedWatershed({ ocean: "Atlantic Ocean", system: "St. Lawrence River", river: null, basin, code, country: "CAN" }, 43.65, -79.38)!;
  check(can("02H", "North and west Lake Ontario").basin === "Lake Ontario and Niagara Peninsula" && can("08N", "Upper Columbia").basin === "Columbia" && can("02O", "Upper St. Lawrence").basin === "Central St. Lawrence" && /Statistics Canada/.test(watershedView(can("02H", "x")).note) && !can("02H", "x").verified, "02H 'Lake Ontario and Niagara Peninsula', 08N 'Columbia', 02O 'Central St. Lawrence' (Statistics Canada); the code is not called checked", [can("02H", "x").basin, watershedView(can("02H", "x")).note]);
  check(/not checked against Statistics Canada/.test(watershedView(can("99Z", "Somewhere")).note) && can("99Z", "Somewhere").basin === "Somewhere", "a code the table lacks keeps its stored name and does not claim Statistics Canada's");
  // 8. The soil card's "suited" line: no tree or shrub by pH alone; by zone only inside its sourced range.
  const noZone = Object.values(PH_TEXT).map((t) => t.suited).join(" ");
  check(!/apple|stone fruit|peach|lilac|clematis|lavender|rhododendron|azalea|hydrangea|heather|blueberr|raspberr|rhubarb|cranberr|conifer|perennial|lawn/i.test(noZone), "the zone-free 'suited' lines name no fruit tree, shrub or perennial", noZone);
  check(!/apple/.test(suitedFor("slightly acid", 1)) && !/apple/.test(suitedFor("slightly acid", 3)) && /apples/.test(suitedFor("slightly acid", 5)) && !/peach/.test(suitedFor("alkaline", 2)) && !/peach/.test(suitedFor("alkaline", 4)) && /lilacs and peaches/.test(suitedFor("alkaline", 5)) && !/lilac/.test(suitedFor("near neutral", 8)) && !/lilac/.test(suitedFor("alkaline", 9)) && suitedFor("acid", null) === PH_TEXT.acid.suited, "suitedFor: no apples at Thompson, Whitehorse, Fairbanks or International Falls (zones 1 to 3), no peaches at Val-d'Or, Grand Forks or Laramie (2 to 4), no lilacs at Austin or San Antonio (8 to 9)", [suitedFor("alkaline", 5), suitedFor("alkaline", 9)]);
  // 9. A description's list of the map class's named members is not printed as the town's.
  const IF = day5("internationalFalls");
  check(IF.bedrock?.rock?.slug === "granite" && !/Sacred Heart|Ortonville|Shannon Lake/.test(viewsOf(IF).map((v) => `${v.lead ?? ""} ${v.rest ?? ""}`).join(" ")), "International Falls: the Sacred Heart, Ortonville and Shannon Lake granites are not printed", IF.bedrock && [IF.bedrock.lead, IF.bedrock.rest]);
  check(aboutThisUnit("Sandstone with some dolomite and shale, undivided; includes Trempealeau, Tunnel City, and Elk Mound Formations") === "Sandstone with some dolomite and shale, undivided." && aboutThisUnit("Gray shale. Includes minor sandstone beds.") === "Gray shale. Includes minor sandstone beds.", "aboutThisUnit drops a list of named members and keeps an 'includes' of plain materials");
  // 10. Grand Forks: "as thick as 10 meters (30 feet)" is the map's thickness.
  check(digCover(day5("grandForks"))?.thickness === "As thick as 10 meters (30 feet).", "Grand Forks dig: the river sediment is 'as thick as 10 meters (30 feet)', as the map says", digCover(day5("grandForks")));
  // 11. Kingston: the point (44.305, -76.428) is at Kingston Mills, on Precambrian rock; not moved here (see the report).
  const KI = day5("kingston");
  check(digCover(KI) === undefined && KI.surface.every((v) => v.coarse), "Kingston: the Ottawa sheet's lake silt and clay is labelled regional and not dug as the town's");
}

// ---- all 264 towns, on the cached map units the site holds ------------------------------------------------------
// The live store's backup holds the map units in their older shape (rock:v1, and the stored ground records), without
// the map's scale or source. For this sweep the source is told from the name: the world map (Macrostrat source 154)
// names its units "<era> <kind> rocks", the Geologic Map of North America (source 7) "<interval> <kind>" with a
// lithology that is only the family ("sedimentary", "plutonic: charnockite"). A rock:v3
// entry, where the backup has one, is used as stored. The older shapes carry no interval ages, so the interval rules of
// the 11 November audit are tested on the Day 2 and Day 3 fixtures; the sweep tests the rest.
console.log("All towns (cached map units)");
{
  const BACKUP = "/home/claude/rebuild/blobs-guides.jsonl";
  type V1 = { name: string; lith: string; bAge: number | null; tAge: number | null; period?: string; description: string | null };
  const blobs = new Map<string, unknown>();
  if (existsSync(BACKUP)) {
    for (const line of readFileSync(BACKUP, "utf8").split("\n")) {
      if (!/^\{"k":"(rock:|rec:v1:ground:|soil:v2:|ws:v1:)/.test(line)) continue;
      try {
        const o = JSON.parse(line) as { k: string; v: unknown };
        blobs.set(o.k, ((typeof o.v === "string" ? JSON.parse(o.v) : o.v) as { value?: unknown }).value);
      } catch {}
    }
  }
  const INT = "(?:(?:Early|Middle|Late) )?(?:Precambrian|Phanerozoic|Archean|Proterozoic|Paleoproterozoic|Mesoproterozoic|Neoproterozoic|Paleozoic|Mesozoic|Cenozoic|Cambrian|Ordovician|Silurian|Devonian|Mississippian|Pennsylvanian|Carboniferous|Permian|Triassic|Jurassic|Cretaceous|Paleogene|Neogene|Tertiary|Quaternary|Paleocene|Eocene|Oligocene|Miocene|Pliocene|Pleistocene|Holocene)";
  const WORLD = new RegExp(`^${INT}(?:-${INT})? [a-z ]*rocks$`);
  const CONTINENT = new RegExp(`^${INT}(?:-${INT})? (?:sedimentary|volcanic|intrusive|plutonic|metamorphic)\\b`);
  const fromV1 = (u: V1): RockUnit => {
    const src = WORLD.test(u.name) ? 154 : CONTINENT.test(u.name) && /^(sedimentary|volcanic|plutonic|intrusive|metamorphic)/i.test(u.lith ?? "") ? 7 : null;
    // An unnamed unit with only a family for its lithology ("sedimentary", "volcanic") is from a small-scale map, as
    // Cape Town's is (Macrostrat source 190, small).
    const small = !u.name && /^(sedimentary|volcanic|plutonic|intrusive|metamorphic)( rocks)?$/i.test(u.lith ?? "");
    return { name: u.name ?? "", lith: u.lith ?? "", bAge: u.bAge, tAge: u.tAge, ageBasis: u.bAge != null && u.tAge != null ? "unit" : null, bIntName: u.period ?? "", description: u.description, scale: src === 154 ? "tiny" : src === 7 || small ? "small" : "medium", mapId: null, sourceId: src };
  };
  const towns = (NORMALS as unknown as { place: { slug: string; name: string; lat: number; lon: number } }[]).map((t) => t.place);
  let withUnits = 0;
  const kinds = { bedrock: 0, regional: 0, coverOnly: 0, none: 0 };
  const bad: string[] = [];
  const stops: string[] = [];
  const textureChanged: string[] = [];
  const verifiedTowns = new Set<string>();
  const beneathTowns: string[] = [];
  const desertTowns: string[] = [];
  for (const p of towns) {
    const k2 = `${p.lat.toFixed(2)}:${p.lon.toFixed(2)}`;
    const v2 = blobs.get(`rock:v3:${k2}`) as RockUnit[] | undefined;
    const v1 = (blobs.get(`rock:v1:${k2}`) as V1[] | undefined) ?? ((blobs.get(`rec:v1:ground:${k2.replace(":", "_")}`) as { value?: { rocks?: V1[] } } | undefined)?.value?.rocks ?? undefined);
    const units: RockUnit[] = v2 ?? (v1 ?? []).map(fromV1);
    if (units.length) withUnits++;
    const L = layersOf(units);
    const text = printed(p.name, L);
    if (L.bedrock) kinds.bedrock++;
    else if (L.regionalBedrock) kinds.regional++;
    else if (L.surface.length) kinds.coverOnly++;
    else kinds.none++;
    const b = L.bedrock?.unit;
    // A bedrock may reach the present only where its own lithology names a rock (audit of 13 November 2026).
    if (b && (coverKind(b) || (b.tAge === 0 && !lithologyRock(b)) || isNonGeologic(b) || isCoarse(b))) bad.push(`${p.slug}: bedrock ${b.name} is cover, runs to the present, is not geology, or is from a coarse map`);
    if (L.regionalBedrock && L.detailed) bad.push(`${p.slug}: a coarse map's rock is shown although a detailed map covers the point`);
    if (L.regionalBedrock && !/scale map/.test(bedrockFact(L.regionalBedrock))) bad.push(`${p.slug}: the district's rock does not say which map it is from`);
    if (/deposits deposits|still forming|\(map unit: Water\b/i.test(text)) bad.push(`${p.slug}: ${text.match(/deposits deposits|still forming|\(map unit: Water\b/i)![0]}`);
    for (const v of viewsOf(L)) {
      if (v.ageRange && spanName(v.unit.bAge, v.unit.tAge)) bad.push(`${p.slug}: ${v.unit.name} prints the span of ${spanName(v.unit.bAge, v.unit.tAge)} as its own age`);
      // Audit, 11 November 2026: a Quaternary deposit is dated by its map interval only; a thickness always says its unit.
      if (v.ageRange && v.cover && isSurfaceDeposit(v.unit)) bad.push(`${p.slug}: ${v.unit.name} prints a Quaternary deposit's own range (${v.ageRange})`);
      if (v.periodOnly && !v.datedTo) bad.push(`${p.slug}: ${v.unit.name} is dated only by an interval, but none is named`);
      if (v.thickness && !hasThicknessUnit(v.thickness) && !/gives no unit/.test(v.thickness)) bad.push(`${p.slug}: thickness with no unit: ${v.thickness}`);
    }
    // The dig: it stops in the cover exactly where no rock is named, and then names none; its cover is the page's first.
    const dc = digCover(L);
    if (digStopsAtCover(L) !== (!L.bedrock && !L.regionalBedrock && !L.beneath && L.surface.length > 0)) bad.push(`${p.slug}: the dig's stop rule disagrees with the layers`);
    if (digStopsAtCover(L)) {
      stops.push(p.slug);
      if (digRock(L).rock || digRock(L).rockAge) bad.push(`${p.slug}: the dig names a rock where the maps name none`);
    }
    if (JSON.stringify(dc) !== JSON.stringify(digCover({ ...L, surface: L.surface.slice(0, 1) }))) bad.push(`${p.slug}: the dig's cover is not the page's first cover unit`);
    if (dc?.thickness && !hasThicknessUnit(dc.thickness)) bad.push(`${p.slug}: the dig uses a thickness with no unit`);
    const names = L.surface.map((v) => v.unit.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()).filter(Boolean);
    if (new Set(names).size !== names.length) bad.push(`${p.slug}: one unit shown twice as surface layers`);
    // Audit of 13 November 2026 (Day 4).
    for (const v of L.surface) {
      const ph = surfacePhrase(v);
      if (!isMadeGround(v.unit) && (/,|\bunit \d|deposits.*deposits|\b(?:alluvium|colluvium|sand|gravel|clay|silt) and marine\b/i.test(ph) || ph.split(/\s+/).length > 5)) bad.push(`${p.slug}: surface phrase built from a raw map string: "${ph}"`);
      if (!isCoarse(v.unit) && v.cover === "deposit" && lithologyRock(v.unit) && !["basalt", "volcanic-rock"].includes(lithologyRock(v.unit)!.slug)) bad.push(`${p.slug}: ${v.unit.name} is a rock by its lithology but shown as loose cover`);
    }
    if (/0\.0\d million/.test(text) || viewsOf(L).some((v) => /0\.0\d million/.test(v.ageRange ?? ""))) bad.push(`${p.slug}: an age printed as '0.0x million'`);
    const nameKey = (u: RockUnit) => u.name.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
    if (L.bedrock && !lithologyRock(L.bedrock.unit) && L.surface.some((v) => nameKey(v.unit) && nameKey(v.unit) === nameKey(L.bedrock!.unit))) bad.push(`${p.slug}: one unit is both the surface layer and the bedrock`);
    const ranged = viewsOf(L).filter((v) => v.ageRange && !v.coarse);
    if (ranged.some((a) => ranged.some((b) => a !== b && nameKey(a.unit) && nameKey(a.unit) === nameKey(b.unit) && a.ageRange !== b.ageRange))) bad.push(`${p.slug}: one unit printed with two different ranges`);
    // "No bedrock" is never said over a cover unit whose own description names the rock it lies on.
    if (/name no bedrock/.test(groundStandfirst(p.name, L)) && L.surface.some((v) => /\b(?:on|upon|overlies|underlain by)\s+[^.;]*\b(?:limestone|sandstone|shale|granite|basalt|gneiss|schist|dolostone|slate|marble|chalk)\b/i.test(v.unit.description ?? ""))) bad.push(`${p.slug}: "no bedrock" though a cover unit's description names the rock it lies on`);
    if (L.beneath) beneathTowns.push(`${p.slug} (${L.beneath.unit.unit.name}: ${L.beneath.text})`);
    {
      const t = (NORMALS as unknown as { place: { slug: string }; climate: Parameters<typeof isDesertClimate>[0] }[]).find((x) => x.place.slug === p.slug);
      if (t && isDesertClimate(t.climate, p.lat)) desertTowns.push(`${p.slug}${digCaliche(L) ? " (caliche)" : ""}`);
    }
    // The bedrock is never an interval-only copy where a map at the same scale gives the same unit a range of its own,
    // whatever order the units come in (Columbus).
    if (L.bedrock) {
      const key = (u: RockUnit) => u.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const same = units.filter((u) => !isCoarse(u) && !coverKind(u) && !isNonGeologic(u) && (u.scale || "") === (L.bedrock!.unit.scale || "") && key(u) === key(L.bedrock!.unit));
      const own = (u: RockUnit) => u.ageBasis === "unit" && spanName(u.bAge, u.tAge) == null;
      if (!own(L.bedrock.unit) && same.some(own)) bad.push(`${p.slug}: the bedrock is dated only by an interval though a same-scale map gives the unit a range`);
      const rev = layersOf([...units].reverse()).bedrock?.unit;
      if (rev && key(rev) === key(L.bedrock.unit) && own(rev) !== own(L.bedrock.unit)) bad.push(`${p.slug}: the bedrock's dating depends on the order of the units`);
    }
    const soil = withTexture((blobs.get(`soil:v2:${k2}`) as { v?: Soil | null } | undefined)?.v ?? null);
    const storedTexture = (blobs.get(`soil:v2:${k2}`) as { v?: Soil | null } | undefined)?.v?.texture;
    if (soil) {
      if (soil.texture !== storedTexture) textureChanged.push(`${p.slug} ${soil.clay}/${soil.sand}/${soil.silt}: ${storedTexture} -> ${soil.texture}`);
      const page = phWord(soil.ph);
      const kid = kidPh(soil.ph);
      const same = { "very acid": "very acid", acid: "acid", "slightly acid": "a little acid", "near neutral": "about neutral", alkaline: "sweet (alkaline)" }[page];
      if (kid !== same) bad.push(`${p.slug}: dig pH '${kid}' differs from the page's '${page}' at pH ${soil.ph}`);
      if (/clay loam/.test(soil.texture) && /everybody wants|without clay's stickiness/.test(workability(soil.texture))) bad.push(`${p.slug}: ${soil.texture} gets the loam or the silt line`);
      if (soil.texture !== textureClass(soil.clay, soil.sand, soil.silt)) bad.push(`${p.slug}: the texture word is not the USDA class of the printed percentages`);
    }
    const ws = verifiedWatershed((blobs.get(`ws:v1:${k2}`) as { v?: Watershed | null } | undefined)?.v ?? null, p.lat, p.lon);
    if (ws) {
      const { steps, note } = watershedView(ws);
      if (ws.verified) verifiedTowns.add(p.slug);
      if (ws.country === "USA" && !ws.verified) bad.push(`${p.slug}: a US watershed code not checked against the USGS dataset at the point`);
      // Audit of 10 November 2026, checked 14 November: every Canadian code is named as Statistics Canada names it.
      if (ws.country === "CAN" && (!ws.officialName || ws.basin !== SDA_NAME[ws.code])) bad.push(`${p.slug}: Canadian sub-drainage area ${ws.code} "${ws.basin}" is not Statistics Canada's name`);
      if (/Watershed Boundary Dataset gives it/.test(note) !== !!ws.verified) bad.push(`${p.slug}: the footnote calls an unchecked code the USGS dataset's`);
      if (steps.some(([l, v]) => l === "Drains to" && /seaboard/i.test(v))) bad.push(`${p.slug}: a seaboard printed as "Drains to"`);
      if (steps.some(([, v]) => /\.$/.test(v))) bad.push(`${p.slug}: a watershed name ends in a full stop`);
      // Audit of 13 November 2026: every verified ocean has its own line, and no line sends water west.
      if (ws.verified && !oceanText(ws)) bad.push(`${p.slug}: no line for the ocean "${ws.ocean}"`);
      if (/\bwest\b/i.test(oceanText(ws) ?? "")) bad.push(`${p.slug}: the water line says "west"`);
    }
  }
  check(towns.length === KNOWN_PLACES.length, `every served town in the sweep (${KNOWN_PLACES.length})`, towns.length);
  console.log(`  ${withUnits} towns with cached map units: ${kinds.bedrock} with bedrock from a detailed map, ${kinds.regional} with only a coarse map's rock (labelled), ${kinds.coverOnly} with cover and no bedrock named, ${kinds.none} with none`);
  check(bad.length === 0, `no town breaks the layer, age, dig, thickness, texture, pH or watershed rules (${bad.length} found)`, bad.slice(0, 12));
  console.log(`  the dig stops in the cover (no rock named) at ${stops.length} towns: ${stops.join(", ")}`);
  console.log(`  a rock is named only in a cover unit's own description at ${beneathTowns.length} towns: ${beneathTowns.join("; ") || "none"}`);
  console.log(`  the dig draws desert ground (Köppen BW) at ${desertTowns.length} towns: ${desertTowns.join(", ")}`);
  console.log(`  texture class changed from the stored one at ${textureChanged.length} towns:\n    ${textureChanged.join("\n    ")}`);
  // The verified watershed file: every entry is a town's point, every US town with a stored watershed is in it, a code
  // moved to another two-digit region says why its river and system stand, and the names agree with the code list.
  const T = (HUC6_TOWNS as unknown as { towns: Record<string, { lat: number; lon: number; huc6: string; name: string; stored?: string; reviewed?: string; ocean?: string; oceanCheck?: string }> }).towns;
  const slugs = new Set(towns.map((t) => t.slug));
  const fileBad: string[] = [];
  for (const [slug, t] of Object.entries(T)) {
    const town = towns.find((x) => x.slug === slug);
    if (!slugs.has(slug) || !town || town.lat.toFixed(2) !== t.lat.toFixed(2) || town.lon.toFixed(2) !== t.lon.toFixed(2)) fileBad.push(`${slug}: not a town's point`);
    if (!/^\d{6}$/.test(t.huc6) || !t.name) fileBad.push(`${slug}: bad code or name`);
    if (t.stored && t.stored.slice(0, 2) !== t.huc6.slice(0, 2) && !t.reviewed) fileBad.push(`${slug}: moved region ${t.stored} -> ${t.huc6} without a review note`);
    // Audit of 13 November 2026 (Day 4): every row carries the ocean its USGS region reaches (the file's `_oceans`); region
    // 03 by subregion (0301-0308 the Atlantic, 0310-0318 the Gulf); 0309 straddles both coasts and needs the unit checked
    // at the point (`oceanCheck`).
    const REGION_OCEAN: Record<string, string> = { "01": "Atlantic Ocean", "02": "Atlantic Ocean", "04": "Atlantic Ocean", "05": "Gulf of Mexico", "06": "Gulf of Mexico", "07": "Gulf of Mexico", "08": "Gulf of Mexico", "09": "Hudson Bay", "10": "Gulf of Mexico", "11": "Gulf of Mexico", "12": "Gulf of Mexico", "13": "Gulf of Mexico", "15": "Gulf of California", "17": "Pacific Ocean", "18": "Pacific Ocean", "19": "Pacific Ocean" };
    const sub = Number(t.huc6.slice(2, 4));
    const expected = t.huc6.startsWith("03") ? (sub <= 8 ? "Atlantic Ocean" : sub >= 10 ? "Gulf of Mexico" : null) : REGION_OCEAN[t.huc6.slice(0, 2)];
    if (!t.ocean) fileBad.push(`${slug}: no ocean`);
    else if (expected ? t.ocean !== expected : !t.oceanCheck) fileBad.push(`${slug}: ocean "${t.ocean}" for unit ${t.huc6}${expected ? ` (region gives ${expected})` : " without the unit checked at the point"}`);
    const listed = (HUC6_NAMES as Record<string, string>)[t.huc6];
    if (listed && listed !== t.name) fileBad.push(`${slug}: ${t.huc6} is "${listed}" in the code list, "${t.name}" here`);
  }
  check(fileBad.length === 0 && verifiedTowns.size === Object.keys(T).length, `the verified watershed file holds every US town with a stored watershed, at its point (${verifiedTowns.size} verified)`, fileBad);
  check(T["pittsburgh-pennsylvania"]?.huc6 === "050200" && T["brownsville-texas"]?.huc6 === "121102", "Pittsburgh 050200 and Brownsville 121102 in the verified file");
  check(T["fort-myers-florida"]?.ocean === "Gulf of Mexico" && T["orlando-florida"]?.ocean === "Gulf of Mexico and Atlantic Ocean" && T["miami-florida"]?.ocean === "Atlantic Ocean" && T["fort-lauderdale-florida"]?.ocean === "Atlantic Ocean" && T["tampa-florida"]?.ocean === "Gulf of Mexico" && ["phoenix-arizona", "tucson-arizona", "las-vegas-nevada"].every((k) => T[k]?.ocean === "Gulf of California"), "pinned oceans: Fort Myers the Gulf, Orlando both coasts, Miami and Fort Lauderdale the Atlantic, the Colorado's towns the Gulf of California");
}

console.log(failed ? `\n${failed} check(s) FAILED` : "\nall checks passed");
process.exit(failed ? 1 : 0);
