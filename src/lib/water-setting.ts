/**
 * The waters a place actually has.
 *
 * Three sources, from broad to fine. Natural Earth (water-grid.json, built by
 * scripts/build-water-grid.py) says whether the sea, a big lake or a big river
 * is near — no network call, so it is always there. OpenStreetMap's named
 * waters within 20 km fill in the lakes, dams, rivers and streams. The
 * climate decides whether the streams run cold enough for trout.
 *
 * Server-only: the grid is three-quarters of a megabyte.
 *
 * RECOVERED 2026-10-08 from the session transcript (full file as of 2026-10-07).
 *
 * Round 2 (agent C, 14 October 2026, L13): the named waters are sifted before
 * they become fishing water. OpenStreetMap names everything that holds water,
 * so Lisbon's list held a sewage works ("ETAR da Mutela") and a dock, Lagos's
 * a "Swimmimg pool", Nairobi's the open sewers of the Nairobi River basin and
 * a hyacinth-choked dam, Cape Town's the canalised Salt and Black rivers and
 * the city's drinking-water reservoirs — and the guide writer took each for a
 * fishery. Treatment works, pools, docks, storm basins and the curated urban
 * drains are dropped from the lakes, rivers and streams (and kept, with the
 * reason, in `avoid`); reservoirs stay but are flagged "likely closed".
 * `coldStreams` keeps its climate test; the cold-stream habitat needs a real
 * stream left after the sift, so Nairobi's drains no longer read as trout water.
 * // source: The Star (Nairobi), 1 July 2026 — Nairobi Rivers Commission: the Nairobi, Ngong and Mathare rivers
 * //   are "more than 50 per cent sewage" https://www.the-star.co.ke/counties/nairobi/2026-07-01-adopt-cleaner-technologies-to-save-rivers-in-nairobi-industries-urged
 * // source: Nairobi Dam (Wikipedia, citing NEMA/UNEP) — "water hyacinth… has clogged the water preventing sailing and
 * //   fishing"; inflow includes "waste water from the un-sewered Kibera settlement" https://en.wikipedia.org/wiki/Nairobi_Dam
 * // source: GroundUp, "Province raps City's knuckles over state of rivers" — the Salt River, "also known as the Black
 * //   River", among Cape Town's worst for E. coli https://www.groundup.org.za/article/province-raps-citys-knuckles-over-state-rivers/
 * // source: Table Mountain Fund — the five Table Mountain dams still feed the city's water supply
 * //   https://www.thetablemountainfund.org.za/why-are-there-five-dams-on-top-of-table-mountain/
 */

import grid from "@/data/water-grid.json";
import type { Habitat, WaterGroup } from "./fish-habitats";
import { WATER_GROUPS, habitatsOf } from "./fish-habitats";
import { presenceAt } from "./fish-presence";
import type { Climate, WaterBody } from "./types";
import { watersUnavailable } from "./waters";
import { inlandSeaAt, type InlandSea } from "./inland-seas";

export type AvoidKind = "treatment-works" | "pool" | "dock" | "stormwater" | "canal" | "urban-drain" | "reservoir-closed" | "no-fishing" | "not-a-name" | "dry-river";

/** Why a named water is not offered as a fishery. `certain` is false for a reservoir, which may well be open. */
export type WaterAvoid = { kind: AvoidKind; reason: string; certain: boolean };

/** A named water as the fishing page sees it: the OSM record, with the reason it is not fishing water when it is not. */
export type FishingWater = WaterBody & { avoid?: WaterAvoid };

/** Names that say the water is not a fishery, in the languages of the site's three continents. */
const NAME_RULES: { kind: AvoidKind; re: RegExp; reason: string }[] = [
  {
    kind: "treatment-works",
    re: /\b(ETAR|EDAR|WWTP|STW|STP)\b|sewage|sewerage|treatment|wastewater|waste water|effluent|épuration|epuração|depura|kläranlage|klärwerk|oczyszczalnia|renseanlegg|reningsverk|rioolwater|afvalwater|aguas residuales|águas residuais/i,
    reason: "a sewage or water-treatment works",
  },
  {
    kind: "pool",
    re: /swimming|swimmimg|\b(lido|baths|piscin[ae]|piscina|schwimmbad|freibad|zwembad|pływalnia|badeanstalt)\b|\b(hotel|resort|club|leisure|spa)\b.*\bpools?\b|\bpools?\b.*\b(hotel|resort|club|leisure|spa)\b/i,
    reason: "a swimming pool",
  },
  {
    kind: "dock",
    re: /\b(dock|docks|doca|dársena|darsena|hafenbecken|marina|wharf|quay|dry dock|shipyard|turning basin|boat basin)\b/i,
    reason: "a dock or harbour basin",
  },
  {
    kind: "stormwater",
    re: /storm ?water|retention|detention|settling|balancing|attenuation|tailings|slurry|sludge|evaporation|infiltration|percolation|sump|overflow|spillway|\bbasin\b|\bwash\b|\bwetlands?\b|water storage|\bstorage\b|\btank\b|\bcistern\b/i,
    reason: "a storm basin, wash or wetland, not a fishery",
  },
  {
    kind: "canal",
    re: /\b(canal|kanal|canale|kanaal|kanał|gracht|channel|drain|ditch|sloot|fossé|graben|rów)\b/i,
    reason: "a canal or drainage channel",
  },
  {
    kind: "not-a-name",
    re: /^(water|waterscape|lake|pond|river|stream|creek|dam|reservoir|lagoon|unnamed|no name|sin nombre|sem nome|lac|étang|see|teich|bach|fluss)$/i,
    reason: "not a real name",
  },
];

/**
 * Named urban waters that OpenStreetMap calls rivers, streams or lakes and
 * that are open sewers, canalised flood channels or derelict dams within a
 * city: not fisheries, whatever the region's fish list says. Each is tied to
 * a centre and a radius so that a river of the same name elsewhere is left
 * alone.
 */
const URBAN_DRAINS: { lat: number; lon: number; km: number; names: RegExp; reason: string; kind?: AvoidKind; certain?: false }[] = [
  {
    // Nairobi: the Nairobi River basin inside the city (Nairobi Rivers Commission, 2026: "more than 50 per cent sewage").
    lat: -1.29,
    lon: 36.82,
    km: 18,
    names: /\b(nairobi river|mto nairobi|ngong river|mathare river|kirichwa|motoine|gitathuru|ruirwaka|karura river|nairobi dam|lily lake)\b/i,
    reason: "an open sewer of the Nairobi River basin inside the city; Kenya's trout are in the Aberdare and Mount Kenya rivers, its Nile perch in Lakes Victoria and Turkana",
  },
  {
    // Cape Town: the canalised Salt, Black and Liesbeek rivers, among the city's worst for E. coli.
    lat: -33.92,
    lon: 18.42,
    km: 15,
    names: /\b(salt river|black river|liesbee[ck]k? river|elsieskraal|vygekraal|lotus river|big lotus)\b/i,
    reason: "a canalised urban river with sewage spills; the Cape's river fishing is in the Eerste, Lourens and Berg rivers, 40–60 km out",
  },
  {
    // Cape Town: the Table Mountain and Molteno reservoirs are the city's water-supply dams inside the national park.
    lat: -33.95,
    lon: 18.42,
    km: 10,
    names: /\b(molteno|woodhead|hely-hutchinson|victoria reservoir|alexandra reservoir|de villiers dam|kirstenbosch dam|newlands reservoir)\b/i,
    reason: "a water-supply reservoir on Table Mountain, closed to angling",
    kind: "reservoir-closed",
  },
  {
    // Houston: Kinder Lake is the pond of Discovery Green, a downtown park; "Spreading serenely over more than an acre of
    // the park", with ticketed kayak and bumper-boat rides, and the park rules list "No fishing" (Day 3 audit, 11 November
    // 2026: the stored guide listed it as a fishing water). source: https://www.discoverygreen.com/kinder-lake
    lat: 29.7535,
    lon: -95.3594,
    km: 2,
    names: /\bkinder lake\b/i,
    reason: "a park pond whose rules say no fishing (Discovery Green)",
    kind: "no-fishing",
  },
  // Day 4 audit (13 November 2026): dry, concrete and show waters named as fishing waters.
  // Phoenix: "Below the diversion dam, the bed of the Salt River is dry, except following rain or upstream runoff"; "With
  // the exception of Tempe Town Lake, the riverbed winding through the cities is usually dry". Tempe Town Lake, in the bed,
  // is a lake of its own and is not touched. source: https://en.wikipedia.org/wiki/Salt_River_(Arizona)
  {
    lat: 33.4484,
    lon: -112.0741,
    km: 30,
    names: /^salt river$/i,
    reason: "dry through the cities below Granite Reef Dam except after rain or upstream runoff; Tempe Town Lake, in its bed, is the water that stays",
    kind: "dry-river",
  },
  // Tucson: "most of these creeks and rivers flow only after heavy rains, with just a few patches of perennial stretches";
  // the upper Rillito "may be dry for much of the year". source: https://watershedmg.org/tucsons-rivers-past-and-present
  {
    lat: 32.2229,
    lon: -110.9748,
    km: 30,
    names: /^rillito( river| creek)?$/i,
    reason: "flows only after heavy rain; the upper reach may be dry for much of the year",
    kind: "dry-river",
  },
  // Tucson: the Santa Cruz downtown "has typically been dry since the 1940s"; flow came back in 2019 through the Heritage
  // Project, which carries effluent from the Agua Nueva facility, and the reach from northwest Tucson to Marana runs all
  // year on effluent from Pima County's reclamation plants. The fish its surveys found are Gila topminnow and western
  // mosquitofish, not angling fish. source: Sonoran Institute, "Living River: Downtown Tucson to Marana" (2024)
  // https://sonoraninstitute.org/files/Living-River-Downtown-Tucson-to-Marana-2024.pdf
  {
    lat: 32.2229,
    lon: -110.9748,
    km: 30,
    names: /\bsanta cruz river\b/i,
    reason: "dry from the 1940s until treated effluent brought flow back to reaches downtown and below the reclamation plants; the fish surveyed there are Gila topminnow and mosquitofish",
    kind: "dry-river",
  },
  // Los Angeles: "since 1938, the 51-mile river has been bound in concrete"; anglers wade "the soft-bottom stretch known as
  // the Glendale Narrows" for carp and largemouth bass (High Country News, 20 April 2021). It is fished, so it is kept, with
  // the reason. source: https://www.hcn.org/issues/53-5/south-people-places-the-los-angeles-rivers-overlooked-anglers/
  {
    lat: 34.0537,
    lon: -118.2428,
    km: 30,
    names: /^los angeles river$/i,
    reason: "a concrete flood channel since 1938; anglers fish its soft-bottomed Glendale Narrows for carp and largemouth bass",
    kind: "canal",
    certain: false,
  },
  // Las Vegas: Lake of Dreams is the Wynn resort's show lake, a "multimedia production" on "the outdoor lake at Wynn Las
  // Vegas" with a "45-foot performance waterfall". source: https://www.wynnlasvegas.com/Entertainment/LakeOfDreams
  {
    lat: 36.1674,
    lon: -115.1484,
    km: 20,
    names: /^lake of dreams$/i,
    reason: "the Wynn resort's show lake, with a performance waterfall and a nightly light show: not a public fishery",
    kind: "no-fishing",
  },
];

const dist = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  const x = (d - b) * r * Math.cos(((a + c) / 2) * r);
  return Math.hypot(x, (c - a) * r) * 6371;
};

const RESERVOIR_NAME = /\b(reservoir|reservoirs|réservoir|embalse|barragem|albufeira|stausee|talsperre|zbiornik|dam)\b/i;
/** A name that may be a swimming pool but may as well be a mere ("Swan Pool"): kept, flagged for the writer. */
const MAYBE_POOL = /\bpools?\b/i;

/** Why a named water near (lat, lon) is not fishing water, or null when it may be. */
export function flagWater(w: WaterBody, lat: number, lon: number): WaterAvoid | null {
  const name = w.name.trim();
  for (const u of URBAN_DRAINS) if (dist(lat, lon, u.lat, u.lon) <= u.km && u.names.test(name)) return { kind: u.kind ?? "urban-drain", reason: u.reason, certain: u.certain ?? true };
  // A drain or pond that an agency stocks with trout is fishing water, whatever its name (Albuquerque's Rio Grande drains).
  if (troutWatersAt(lat, lon).some((t) => t.names.test(name))) return null;
  for (const r of NAME_RULES) if (r.re.test(name)) return { kind: r.kind, reason: r.reason, certain: true };
  if (w.kind === "reservoir" || RESERVOIR_NAME.test(name))
    return { kind: "reservoir-closed", reason: "a reservoir or dam, which may be closed to angling or need a permit; check with the owner before you go", certain: false };
  if (MAYBE_POOL.test(name)) return { kind: "pool", reason: "named a pool: a mere in Britain, a swimming pool elsewhere — check what it is", certain: false };
  return null;
}

/** The named waters with their flags: the ones to drop from fishing lists have `avoid.certain`. */
export function sortWaters(waters: WaterBody[], lat: number, lon: number): { kept: FishingWater[]; avoid: FishingWater[] } {
  const kept: FishingWater[] = [];
  const avoid: FishingWater[] = [];
  for (const w of waters) {
    const a = flagWater(w, lat, lon);
    if (a?.certain) avoid.push({ ...w, avoid: a });
    else kept.push(a ? { ...w, avoid: a } : w);
  }
  return { kept, avoid };
}

type Grid = {
  step: number;
  lat0: number;
  lon0: number;
  rows: number;
  cols: number;
  coast: number[][];
  lake: number[][];
  river: number[][];
  lakes: { name: string; km2: number; kind: string }[];
  rivers: { name: string }[];
};
const G = grid as unknown as Grid;

function cell(layer: number[][], lat: number, lon: number): number {
  const r = Math.floor((lat - G.lat0) / G.step);
  const c = Math.floor((lon - G.lon0) / G.step);
  if (r < 0 || r >= G.rows || c < 0 || c >= G.cols) return 0;
  const row = layer[r];
  let end = -1;
  for (let i = 0; i < row.length; i += 3) {
    const start = end + 1 + row[i];
    end = start + row[i + 1] - 1;
    if (c < start) return 0;
    if (c <= end) return row[i + 2];
  }
  return 0;
}

/** The best value in the cell and its eight neighbours — a town centre is a point, its anglers are not. Used for the lakes. */
function near(layer: number[][], lat: number, lon: number, pick: (a: number, b: number) => number): number {
  let best = 0;
  for (const dy of [-1, 0, 1])
    for (const dx of [-1, 0, 1]) {
      const v = cell(layer, lat + dy * G.step, lon + dx * G.step);
      if (v) best = best ? pick(best, v) : v;
    }
  return best;
}

/**
 * The great tidal waters a city is built around — lagoons, rias, firths and
 * estuaries that define its fishing but that a 20 km map query can miss (a
 * lagoon relation too big to return in time) or that Natural Earth does not
 * draw. Centre and reach in km.
 */
const ESTUARIES: { name: string; lat: number; lon: number; km: number }[] = [
  { name: "Lagos Lagoon", lat: 6.5, lon: 3.45, km: 30 },
  { name: "the Ébrié Lagoon", lat: 5.3, lon: -4.0, km: 35 },
  { name: "Lake Nokoué and the Porto-Novo lagoon", lat: 6.42, lon: 2.45, km: 25 },
  { name: "the Bonny River estuary", lat: 4.6, lon: 7.1, km: 35 },
  { name: "the Wouri estuary", lat: 4.0, lon: 9.6, km: 30 },
  { name: "the Komo estuary", lat: 0.4, lon: 9.5, km: 30 },
  { name: "the Sierra Leone River estuary", lat: 8.5, lon: -13.2, km: 25 },
  { name: "the Mesurado River mouth", lat: 6.3, lon: -10.8, km: 15 },
  { name: "the Mussulo lagoon", lat: -8.95, lon: 13.1, km: 25 },
  { name: "Maputo Bay and the Espírito Santo estuary", lat: -25.95, lon: 32.6, km: 30 },
  { name: "Tudor Creek and Port Reitz", lat: -4.04, lon: 39.65, km: 15 },
  { name: "Durban harbour and the Mgeni estuary", lat: -29.85, lon: 31.03, km: 20 },
  { name: "the Swartkops estuary", lat: -33.87, lon: 25.6, km: 20 },
  { name: "the Knysna estuary", lat: -34.05, lon: 23.05, km: 15 },
  { name: "Lake Mariout and the Nile delta lagoons", lat: 31.15, lon: 29.9, km: 30 },
  { name: "the Lake of Tunis", lat: 36.8, lon: 10.25, km: 20 },
  { name: "the Venetian Lagoon", lat: 45.42, lon: 12.33, km: 25 },
  { name: "the Ria Formosa", lat: 37.0, lon: -7.9, km: 30 },
  { name: "the Tagus estuary", lat: 38.75, lon: -9.05, km: 25 },
  { name: "the Albufera lagoon", lat: 39.33, lon: -0.35, km: 20 },
  { name: "the Ría de Bilbao", lat: 43.3, lon: -2.98, km: 15 },
  { name: "the Severn estuary", lat: 51.45, lon: -3.0, km: 35 },
  { name: "the Firth of Forth", lat: 56.0, lon: -3.2, km: 30 },
  { name: "the Moray Firth", lat: 57.5, lon: -4.15, km: 25 },
  { name: "Belfast Lough", lat: 54.65, lon: -5.8, km: 20 },
  { name: "Cork Harbour", lat: 51.85, lon: -8.3, km: 20 },
  { name: "the Liffey estuary and Dublin Bay", lat: 53.34, lon: -6.18, km: 15 },
  { name: "the Firth of Clyde", lat: 55.9, lon: -4.5, km: 30 },
  { name: "the Dniester estuary", lat: 46.25, lon: 30.25, km: 40 },
  { name: "the Vistula Lagoon and the Dead Vistula", lat: 54.35, lon: 18.8, km: 35 },
  // Day 4 audit (13 November 2026): Miami's page never named Biscayne Bay. "Biscayne Bay is a shallow estuary. It is a place
  // where freshwater from the mainland mixes with salt water from the sea." (National Park Service). Miami's open coast,
  // the Atlantic shore of Miami Beach, is within 10 km, so the bay is the town's estuary, not a tidal reach. The circle
  // (about 14 km to downtown Miami) stops well short of Fort Lauderdale, about 55 km north.
  // source: https://www.nps.gov/bisc/learn/nature/biscaynebay.htm
  { name: "Biscayne Bay", lat: 25.65, lon: -80.22, km: 20 },
];
const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  const x = (d - b) * r * Math.cos(((a + c) / 2) * r);
  return Math.hypot(x, (c - a) * r) * 6371;
};
/** The great tidal water near a place, by name, if it has one. */
export function estuaryNear(lat: number, lon: number): string | null {
  return ESTUARIES.find((e) => km(lat, lon, e.lat, e.lon) <= e.km)?.name ?? null;
}

/** How a tidal river or estuary arm behaves at the town, as its source describes it. */
export type TidalKind = "fresh" | "estuary" | "tidal";

/**
 * Waters a fisheries agency stocks with trout or describes as trout water, at towns too warm for the cold-stream test
 * (Day 4 audit, 13 November 2026). Trout were tied to small cold streams and lakes, so Boise's river and Albuquerque's
 * winter-stocked ponds and drains lost them. Each row is the agency's page, read: the river or drain it names (`river`,
 * as the rivers line prints it, and `names`, to match OpenStreetMap's names), the trout it names there (`species`) and
 * the trout it also stocks in the town's ponds (`still`). The row applies inside its circle whether or not the map
 * look-up answered, since the agency's page, not the map, says the water is there.
 */
export type TroutWater = {
  near: { lat: number; lon: number; km: number };
  river: string;
  names: RegExp;
  species: string[];
  still: string[];
  note: string;
  agency: string;
  source: string;
  checked: string;
};
export const TROUT_WATERS: TroutWater[] = [
  // source: IDFG Fishing Planner, "Boise River, Eagle Road to Strawberry Glen": "The Boise River offers miles of fishing in
  //   one of the finest urban trout rivers in the country." "Wild trout and stocked hatchery rainbow and brown trout are
  //   abundant." https://idfg.idaho.gov/ifwis/fishingplanner/water/72028 ; IDFG press release, "Fishing the Boise River in
  //   Winter" (undated): "Wild rainbow and brown trout spend their entire lives in the Boise River"; IDFG stocks "roughly
  //   50,000 catchable rainbow trout annually", and the river "is stocked with trout every month of the year except in the
  //   spring during high water events." https://idfg.idaho.gov/press/fishing-boise-river-winter ; IDFG, "Southwest Region
  //   rainbow trout stocking schedule - October" (27 September 2023): the Boise River from Strawberry Glen to Barber Dam and
  //   from Middleton to Eagle Road, and Parkcenter Pond (700) and Riverside Pond.
  //   https://idfg.idaho.gov/article/southwest-region-rainbow-trout-stocking-schedule-october (all read 13 November 2026)
  {
    near: { lat: 43.6166, lon: -116.2009, km: 25 },
    river: "the Boise River",
    names: /^boise river$/i,
    species: ["rainbow-trout", "brown-trout"],
    still: ["rainbow-trout"],
    note: "Idaho Fish and Game calls the Boise River one of the finest urban trout rivers in the country: wild rainbow and brown trout live in it all their lives, and it stocks about 50,000 catchable rainbow trout a year, every month except during spring high water. It also stocks rainbow trout in town ponds such as Parkcenter Pond.",
    agency: "Idaho Department of Fish and Game",
    source: "https://idfg.idaho.gov/ifwis/fishingplanner/water/72028",
    checked: "2026-11-13",
  },
  // source: NMDGF, "Winter fish stocking" (article of 12 November 2015): "Trout are stocked every week from November through
  //   March"; "Rainbow trout already have been stocked at multiple locations in the drains that run alongside the Rio
  //   Grande"; fish go "into the ponds at Tingley Beach" and "into the drains"; places named include "the Corrales drain
  //   along the bosque", the Rio Grande Open Space off Alameda Boulevard, the Shining River parking area and the drain
  //   between Bridge and Rio Bravo boulevards. The fish counts are 2015's and are not printed.
  //   https://wildlife.dgf.nm.gov/winter-fish-stocking/ (read 13 November 2026)
  {
    near: { lat: 35.0841, lon: -106.651, km: 25 },
    river: "the drains beside the Rio Grande",
    names: /\b(riverside drain|corrales (riverside )?drain|atrisco (riverside )?drain|tingley)\b/i,
    species: ["rainbow-trout"],
    still: ["rainbow-trout"],
    note: "New Mexico Game and Fish stocks rainbow trout every week from November through March in the Tingley Beach ponds and in the drains that run beside the Rio Grande, among them the Corrales drain along the bosque and the drain between Bridge and Rio Bravo boulevards.",
    agency: "New Mexico Department of Game and Fish",
    source: "https://wildlife.dgf.nm.gov/winter-fish-stocking/",
    checked: "2026-11-13",
  },
  // Day 5 audit (14 November 2026): Asheville's cold streams rest on the climate test below (warmest month at most 24 °C at
  // 500 m or more), and the station's July mean is now 24.06 °C (NOAA 1991–2020), so after a failed map look-up the town
  // lost its trout streams, though its trout water is real. The rule is now the state's own designation, not a nudged
  // threshold. source: 15A NCAC 10C .0205, "PUBLIC MOUNTAIN TROUT WATERS", Buncombe County, Hatchery Supported Trout Waters:
  //   "Bent Creek from the headwaters to the N.C. Arboretum boundary line", "Cane Creek from the headwaters to the S.R. 3138
  //   bridge", "Dillingham Creek from Corner Rock Creek to Ivy Creek", "Ivy Creek from Dillingham Creek to the U.S. 19-23
  //   bridge", "Lake Powhatan", "Reems Creek from Sugar Camp Fork to the U.S. 19-23 bridge", "Stony Creek", "Swannanoa from
  //   the S.R. 2702 bridge near Ridgecrest to the Wood Avenue bridge" "at the intersection of N.C. 81 and U.S. 74A in
  //   Asheville". https://regulations.justia.com/states/north-carolina/title-15a/chapter-10/subchapter-c/section-0200/section-10c-0205
  //   (read 14 November 2026). The rule does not name the species stocked; the species are the trout the site's presence
  //   table records within 10 km of Asheville (src/data/place-presence-fish.json: 325 rainbow, 453 brown and 244 brook trout
  //   rows; brook trout have no "trout water" habitat in fish-habitats, so they stay with the cold-stream test), and `still`
  //   is empty because no source says which trout Lake Powhatan gets.
  {
    near: { lat: 35.5954, lon: -82.5508, km: 25 },
    river: "the designated trout waters around Asheville",
    names: /\b(swannanoa river|bent creek|cane creek|reems creek|ivy creek|dillingham creek|stony creek|lake powhatan)\b/i,
    species: ["rainbow-trout", "brown-trout"],
    still: [],
    note: "North Carolina designates Hatchery Supported trout waters around Asheville: Bent Creek above the N.C. Arboretum, Cane Creek, Reems Creek, Ivy Creek, Dillingham Creek, Stony Creek, Lake Powhatan, and the Swannanoa River from Ridgecrest down to the Wood Avenue bridge in Asheville.",
    agency: "North Carolina Wildlife Resources Commission",
    source: "https://regulations.justia.com/states/north-carolina/title-15a/chapter-10/subchapter-c/section-0200/section-10c-0205",
    checked: "2026-11-14",
  },
];

/**
 * Waters that dams cut off from the sea (Day 5 audit, 14 November 2026): Spokane read steelhead and salmon as regional
 * species and filed its Chinook, landlocked fish of the Idaho lakes, under the rivers as if they ran from the sea.
 * Washington's State of Salmon report: "Completion of Grand Coulee Dam in 1941 and Chief Joseph Dam in 1955 on the
 * Columbia River blocked migrating fish", cutting them off from the Columbia, Pend Oreille and Spokane watersheds. The box
 * is the Columbia basin above Grand Coulee (118.98 W) in Washington and the Idaho panhandle, Lake Coeur d'Alene included;
 * the Okanagan joins the Columbia below Chief Joseph Dam and is outside it. Inside, a salmon is a landlocked lake fish and
 * a steelhead (a rainbow trout that runs to the sea or a big lake) has nowhere to run.
 */
export const SEA_RUN_BLOCKED: { box: Box; says: string; source: string; checked: string }[] = [
  {
    box: { minLat: 47.0, maxLat: 49.0, minLon: -118.98, maxLon: -115.9 },
    says: "Grand Coulee Dam (1941) and Chief Joseph Dam (1955) blocked salmon and steelhead from the Spokane, Pend Oreille and upper Columbia",
    source: "https://stateofsalmon.wa.gov/region/northeast-washington/hydropower/ ; https://www.nwcouncil.org/history/GrandCouleeImpactsOnFish/",
    checked: "2026-11-14",
  },
];
/** The fish that run to the sea, which a dam can cut off: in a SEA_RUN_BLOCKED area a salmon lives only in lakes. */
const SEA_RUN_SALMON = ["chinook-salmon", "coho-salmon", "atlantic-salmon"];
export const seaRunBlockedAt = (lat: number, lon: number): boolean => SEA_RUN_BLOCKED.some((b) => inBox(b.box, lat, lon));

/** The trout waters whose circle holds the place. */
export const troutWatersAt = (lat: number, lon: number): TroutWater[] => TROUT_WATERS.filter((t) => dist(lat, lon, t.near.lat, t.near.lon) <= t.near.km);

/**
 * A fish's habitats at a place (Day 4 audit): "trout water" only for a trout that a TROUT_WATERS row names; and a trout a
 * row names in the river but not in the ponds, in a climate too warm for trout streams, is the river's fish here (Boise's
 * brown trout, wild in the Boise River, were filed under the town's ponds). Everywhere else, the fish's own habitats.
 */
export function habitatsAt(slug: string, w: Partial<Pick<WaterSetting, "troutWaters" | "coldStreams" | "seaRunBlocked">> | null | undefined): Habitat[] {
  // Above a dam with no fish passage (SEA_RUN_BLOCKED, Day 5 audit): a salmon is a landlocked lake fish, a steelhead none.
  if (w?.seaRunBlocked && slug === "steelhead") return [];
  if (w?.seaRunBlocked && SEA_RUN_SALMON.includes(slug)) return ["lake"];
  const hs = habitatsOf(slug);
  if (!hs.includes("trout-river")) return hs;
  const rows = (w?.troutWaters ?? []).filter((t) => t.species.includes(slug));
  if (!rows.length) return hs.filter((h) => h !== "trout-river");
  if (!w?.coldStreams && !rows.some((t) => t.still.includes(slug))) return hs.filter((h) => h !== "lake" && h !== "pond" && h !== "big-lake");
  return hs;
}

export type WaterSetting = {
  /**
   * "on" within about 10 km of the open sea, "near" within about 30 km. Measured from the town's own grid cell; a
   * tidal river or estuary arm that Natural Earth draws as sea (`tidal`) does not count as the coast.
   */
  coast: "on" | "near" | null;
  /**
   * The tidal river or estuary arm the town stands on, where Natural Earth's coastline runs up it ("the Delaware
   * River"): "fresh" where the tide reaches the town but the salt does not, "estuary" where river and sea water mix,
   * "tidal" where the source says only that the tide reaches the town. With `away`, the town does not stand on it: it is
   * the town's salt water, 10 to 30 km out (Brownsville's Lower Laguna Madre), and `says` is what its source calls it.
   */
  tidal: { water: string; kind: TidalKind; away?: string; says?: string; bay?: true } | null;
  /** Rivers that meet at the town and the river they form (WATER_FIXES `confluence`): Pittsburgh's three rivers. */
  confluence: { rivers: string[]; forms: string | null } | null;
  /**
   * What the map service said about named waters: "listed" (an answer with names in it), "none" (an answer with none,
   * or no look-up made), "unavailable" (the service did not answer, so nothing can be said either way).
   */
  namedWaters: "listed" | "none" | "unavailable";
  /** `by`: who measured the area, where it is not Natural Earth's polygon (Day 5 audit: Rainy Lake's 1,162 km² is the polygon's). */
  bigLake: { name: string; km2: number; by?: string } | null;
  bigRiver: string | null;
  /** A named lagoon, ria or estuary the place is built around. */
  estuary: string | null;
  /** Named still waters nearby, nearest first; a reservoir carries a soft `avoid` flag. */
  lakes: FishingWater[];
  /** Named rivers nearby, nearest first. */
  rivers: FishingWater[];
  streams: FishingWater[];
  /** Named waters dropped from the fishing lists — treatment works, pools, docks, urban drains — each with the reason. */
  avoid: FishingWater[];
  /**
   * Whether the climate lets small streams here stay below about 20 °C in
   * summer (a cool summer, or height): the condition for trout and grayling
   * water. Not a promise that any named stream holds trout.
   */
  coldStreams: boolean;
  /**
   * With a coast: the inland sea the salt water belongs to (INLAND_SEAS, Day 5 audit): the shore is salt water, but not
   * the open sea, and has no surf beaches. Absent on settings stored before 14 November 2026.
   */
  inlandSea?: InlandSea | null;
  /** Above a dam that cut the sea-run fish off (SEA_RUN_BLOCKED, Day 5 audit); absent on settings stored before 14 November 2026. */
  seaRunBlocked?: boolean;
  /** The agencies' trout waters at the town (TROUT_WATERS); absent on settings stored before 13 November 2026. */
  troutWaters?: TroutWater[];
  habitats: Habitat[];
  groups: WaterGroup[];
};

type Box = { minLat: number; maxLat: number; minLon: number; maxLon: number };
const inBox = (b: Box, lat: number, lon: number) => lat >= b.minLat && lat <= b.maxLat && lon >= b.minLon && lon <= b.maxLon;

/**
 * Where the 0.05° Natural Earth grid is wrong about a town's water and a source says what the water is (audit of the
 * Day 1 regions, 5 November 2026). Each fix applies only where the grid makes the mistake it names, so it cannot touch a
 * town the grid already gets right.
 */
export const WATER_FIXES: {
  box: Box;
  when: (g: { coastBand: number; lake: string | null; river: string | null }) => boolean;
  coast?: null;
  /** null: the grid's lake is not the town's; a lake: the town's big lake, where the grid has none (Okanagan Lake, Day 5). */
  bigLake?: null | { name: string; km2: number; by: string };
  bigRiver?: string;
  /** Rivers that meet at the town, and the river they form there, where the grid names only one of them (Pittsburgh). */
  confluence?: { rivers: string[]; forms: string | null };
  source: string;
}[] = [
  // Natural Earth's ocean runs up the St. Lawrence to Montreal. The river is fresh water, with no tide above Lac
  // Saint-Pierre, as far as the east tip of Île d'Orléans, below Quebec City.
  { box: { minLat: 45.0, maxLat: 47.05, minLon: -75.0, maxLon: -70.85 }, when: (g) => g.coastBand > 0, coast: null, bigRiver: "St. Lawrence", source: "https://www.planstlaurent.qc.ca/en/the-st-lawrence" },
  // Natural Earth's Lake Erie takes in the Detroit River; Detroit and Windsor stand on the river, about 30 km from the lake.
  { box: { minLat: 42.05, maxLat: 42.36, minLon: -83.2, maxLon: -82.9 }, when: (g) => g.lake === "Erie", bigLake: null, bigRiver: "Detroit River", source: "https://en.wikipedia.org/wiki/Detroit_River" },
  // The Natural Earth line through Calgary carries the trunk river's name; the South Saskatchewan begins where the Bow and
  // the Oldman meet, far downstream. Calgary is on the Bow and the Elbow.
  { box: { minLat: 50.8, maxLat: 51.3, minLon: -114.4, maxLon: -113.7 }, when: (g) => g.river === "South Saskatchewan", bigRiver: "Bow", source: "https://thecanadianencyclopedia.ca/en/article/south-saskatchewan-river" },
  // Rivers the grid does not carry, for towns built on them.
  { box: { minLat: 46.75, maxLat: 47.0, minLon: -96.95, maxLon: -96.65 }, when: (g) => !g.river, bigRiver: "Red River", source: "https://www.usgs.gov/centers/dakota-water/science/red-river-north-fargo-north-dakota-110-years" },
  { box: { minLat: 49.75, maxLat: 50.05, minLon: -97.35, maxLon: -96.95 }, when: (g) => !g.river, bigRiver: "Red River", source: "https://www.gov.mb.ca/nrnd/fish-wildlife/pubs/fish_wildlife/fish/angling-guide.pdf" },
  { box: { minLat: 41.45, maxLat: 41.75, minLon: -93.8, maxLon: -93.45 }, when: (g) => !g.river, bigRiver: "Des Moines River", source: "https://iowadnr.gov/About-DNR/DNR-News-Releases/ArticleID/712/Top-Urban-Fishing-Spots-in-Des-Moines" },
  { box: { minLat: 32.65, maxLat: 32.95, minLon: -97.0, maxLon: -96.6 }, when: (g) => !g.river, bigRiver: "Trinity River", source: "https://waterdata.usgs.gov/monitoring-location/USGS-08057000/" },
  // Confluence towns (Day 3 audit, 11 November 2026). Natural Earth names one river per cell, so Pittsburgh read "the
  // Allegheny and its feeder rivers"; Point State Park, at the tip of the city's Golden Triangle, "sits at the confluence of
  // the Monongahela and Allegheny rivers, forming the headwaters of the Ohio River" (National Park Service). The grid's
  // river stays the town's big river (other pages match on it); the page names all three.
  {
    box: { minLat: 40.38, maxLat: 40.5, minLon: -80.08, maxLon: -79.92 },
    when: (g) => ["Allegheny", "Monongahela", "Ohio"].includes(g.river ?? ""),
    confluence: { rivers: ["Allegheny", "Monongahela"], forms: "Ohio" },
    source: "https://www.nps.gov/places/point-state-park.htm",
  },
  // Day 5 audit (14 November 2026): the town's main water was missing. Each applies only where the grid names no lake or
  // river at the town (or, at Portland, only the Willamette).
  // Kelowna: Okanagan Lake, "a total surface area of 351 km2", "120 km in length"; Kelowna is one of the three main towns on
  // its shore, midway along it (Canadian Encyclopedia). Natural Earth's lake layer does not carry it.
  {
    box: { minLat: 49.75, maxLat: 50.0, minLon: -119.65, maxLon: -119.35 },
    when: (g) => !g.lake,
    bigLake: { name: "Okanagan Lake", km2: 351, by: "the Canadian Encyclopedia" },
    source: "https://thecanadianencyclopedia.ca/en/article/okanagan-lake",
  },
  // Whitehorse: "The city lies mainly on the western side of the Yukon River" (Canadian Encyclopedia).
  { box: { minLat: 60.6, maxLat: 60.85, minLon: -135.25, maxLon: -134.9 }, when: (g) => !g.river, bigRiver: "Yukon", source: "https://www.thecanadianencyclopedia.ca/en/article/whitehorse" },
  // Vancouver: "Two surrounding waterways — Burrard Inlet and the Strait of Georgia — provide a sheltered deep-sea port", and
  // "the Fraser River offers an easy route" inland (Canadian Encyclopedia); the Fraser's North Arm runs along the city's south
  // edge. The salt water is the inland sea's (INLAND_SEAS); the Fraser is the town's great river.
  { box: { minLat: 49.19, maxLat: 49.32, minLon: -123.27, maxLon: -123.02 }, when: (g) => !g.river, bigRiver: "Fraser", source: "https://thecanadianencyclopedia.ca/en/article/Vancouver" },
  // Portland: the National Park Service's "Willamette River Confluence" with the Columbia is at N Marine Drive and Lombard
  // Street, Portland (Lewis and Clark's "a large river which discharges itself into the Columbia on it's South Side"). The
  // grid names only the Willamette; the page names both. No new river is formed, so `forms` is null.
  {
    box: { minLat: 45.4, maxLat: 45.65, minLon: -122.85, maxLon: -122.5 },
    when: (g) => g.river === "Willamette",
    confluence: { rivers: ["Willamette", "Columbia"], forms: null },
    source: "https://www.nps.gov/places/willamette-river-confluence.htm",
  },
  // Grand Forks: USGS gauge 05082500, "Red River of the North at Grand Forks, ND"; the grid carries no river there.
  { box: { minLat: 47.8, maxLat: 48.05, minLon: -97.2, maxLon: -96.9 }, when: (g) => !g.river, bigRiver: "Red River", source: "https://waterdata.usgs.gov/nd/nwis/uv?site_no=05082500" },
];

/**
 * Tidal rivers and estuary arms that Natural Earth draws as sea (audit of the Day 2 regions, 10 November 2026, C10).
 *
 * Why the grid gets these wrong: the coast layer is the distance to Natural Earth's 1:10m coastline, and that line is
 * the edge of its ocean polygon, which runs up tidal rivers and estuaries far inland: up the Delaware past
 * Philadelphia, the Potomac to Washington, the Patapsco to Baltimore, the James towards Richmond, the Petitcodiac to
 * Moncton, the Elbe to Hamburg, the Garonne to Bordeaux. The grid records only how far a cell is from that line, not
 * what lies on either side of it, so it cannot tell a river bank from a sea shore, and a narrow tidal river looks the
 * same as a fjord or a strait (which are sea). No rule on the grid alone can separate them; the build would need the
 * ocean polygons and the river centrelines' mouths (scripts/build-water-grid.py). Until then each tidal reach is a data
 * fix here, with its source, and applies only where the grid calls the place coastal (band 1 or 2).
 *
 * For each: the water as a sentence names it; how it behaves at the town (TidalKind); `openCoast`, the open coast's
 * band from the town ("near" within about 30 km, null further), with the distance worked out from coordinates in the
 * comment; and the great river the grid misses, where it misses one.
 */
export const TIDAL_REACHES: {
  box: Box;
  water: string;
  kind: TidalKind;
  openCoast: "near" | null;
  bigRiver?: string;
  /** Where the water is not at the town but 10 to 30 km out (Brownsville's lagoon): how far, in the page's words. */
  away?: string;
  /** With `away`: what the water is, in its source's words, for the overview and the estuary section. */
  says?: string;
  /** A bay, not a river: the overview calls the town bayside, not a tidal-river place. */
  bay?: true;
  source: string;
}[] = [
  // The Petitcodiac River Estuary: Bay of Fundy tides run up it to Moncton twice a day (the tidal bore). The nearest open
  // shore is Parlee Beach at Shediac on Northumberland Strait (46.24 N, 64.52 W), about 27 km from the city centre.
  { box: { minLat: 45.98, maxLat: 46.2, minLon: -64.95, maxLon: -64.65 }, water: "the Petitcodiac River", kind: "estuary", openCoast: "near", source: "https://www.moncton.ca/en/things-do/tidal-bore" },
  // The Delaware meets tidewater at Trenton, above Philadelphia (Britannica); the salt front's average location is around
  // Wilmington, Delaware, well below the city (DRBC). Delaware Bay begins further down still.
  { box: { minLat: 39.85, maxLat: 40.1, minLon: -75.3, maxLon: -74.95 }, water: "the Delaware River", kind: "fresh", openCoast: null, bigRiver: "Delaware", source: "https://www.britannica.com/place/Delaware-River ; https://www.nj.gov/drbc/programs/flow/salt-front.html" },
  // The tidal Potomac runs 183 km from Little Falls in Washington to the Bay; its uppermost segment is tidal fresh (USGS).
  { box: { minLat: 38.8, maxLat: 39.0, minLon: -77.15, maxLon: -76.9 }, water: "the Potomac River", kind: "fresh", openCoast: null, bigRiver: "Potomac", source: "https://pubs.usgs.gov/of/1999/of99-219/html/tidal.html" },
  // The Patapsco's last 16 km are a tidal estuary inlet of the Chesapeake Bay, and its inner part is Baltimore's harbour.
  // The Chesapeake is itself an estuary; the Atlantic is far beyond it.
  { box: { minLat: 39.2, maxLat: 39.37, minLon: -76.7, maxLon: -76.5 }, water: "the Patapsco River", kind: "estuary", openCoast: null, source: "https://en.wikipedia.org/wiki/Patapsco_River" },
  // Richmond's fall line is the highest point the tide reaches on the James; the freshwater/saltwater licence line is at
  // Hog Island, far downstream, and anglers above it need a freshwater licence (Virginia DWR).
  { box: { minLat: 37.45, maxLat: 37.62, minLon: -77.55, maxLon: -77.35 }, water: "the James River", kind: "fresh", openCoast: null, bigRiver: "James", source: "https://dwr.virginia.gov/blog/explore-the-tidal-james-wild/" },
  // Savannah Harbor lies in the Lower Savannah River Estuary, with two tides a day (USGS). Tybee Island's beach (32.00 N,
  // 80.845 W) is about 25 km from the city centre.
  { box: { minLat: 32.0, maxLat: 32.15, minLon: -81.2, maxLon: -81.0 }, water: "the Savannah River", kind: "estuary", openCoast: "near", source: "https://pubs.usgs.gov/publication/70156727" },
  // The lower St. Johns is an estuary, open to the ocean and diluted with fresh water (Jacksonville University); its
  // circulation is driven by the tides (NOAA). Jacksonville Beach (30.284 N, 81.393 W) is about 26 km from downtown.
  { box: { minLat: 30.2, maxLat: 30.45, minLon: -81.8, maxLon: -81.55 }, water: "the St. Johns River", kind: "estuary", openCoast: "near", bigRiver: "St. Johns", source: "https://ju.edu/news/2024-05-14-deep-dive-the-st-johns-river-is-moving-right-along.php ; https://gnome.orr.noaa.gov/doc/location_files/st_johns_river_tech.html" },
  // The Caloosahatchee is tidal from LaBelle and reaches the Gulf 16 km south-west of Fort Myers in San Carlos Bay,
  // behind Sanibel Island. Fort Myers Beach (26.45 N, 81.95 W) is about 23 km from the city centre.
  { box: { minLat: 26.55, maxLat: 26.72, minLon: -81.95, maxLon: -81.8 }, water: "the Caloosahatchee River", kind: "estuary", openCoast: "near", source: "https://en.wikipedia.org/wiki/Caloosahatchee_River" },
  // Lake Pontchartrain is a brackish estuary with small tides, reaching the Gulf through Lake Borgne; it forms New
  // Orleans's northern edge. The open Gulf is far beyond Lake Borgne.
  { box: { minLat: 29.85, maxLat: 30.1, minLon: -90.2, maxLon: -89.9 }, water: "Lake Pontchartrain", kind: "estuary", openCoast: null, source: "https://en.wikipedia.org/wiki/Lake_Pontchartrain" },
  // Tide waters run up the Saguenay fjord as far as Chicoutimi, about 100 km from the St. Lawrence (Wikipedia); the fjord
  // holds cold sea water behind its sill, and Tadoussac is 90 km on (Canadian Encyclopedia).
  { box: { minLat: 48.35, maxLat: 48.48, minLon: -71.2, maxLon: -70.95 }, water: "the Saguenay Fjord", kind: "estuary", openCoast: null, source: "https://en.wikipedia.org/wiki/Saguenay_River ; https://thecanadianencyclopedia.ca/en/article/fjord-du-saguenay" },
  // The Elbe is tidal from the Geesthacht weir down, and reaches the North Sea at Cuxhaven, 110 km from Hamburg.
  { box: { minLat: 53.45, maxLat: 53.65, minLon: 9.8, maxLon: 10.2 }, water: "the Elbe", kind: "tidal", openCoast: null, source: "https://en.wikipedia.org/wiki/Elbe" },
  // Ships use the tidal Garonne up to the Pont de Pierre in Bordeaux; the Gironde runs about 100 km on to the Atlantic.
  { box: { minLat: 44.75, maxLat: 44.95, minLon: -0.7, maxLon: -0.45 }, water: "the Garonne", kind: "tidal", openCoast: null, source: "https://en.wikipedia.org/wiki/Garonne" },
  // The Loire forms its estuary at Nantes, 53 km from the Atlantic at Saint-Nazaire.
  { box: { minLat: 47.15, maxLat: 47.3, minLon: -1.7, maxLon: -1.45 }, water: "the Loire", kind: "estuary", openCoast: null, source: "https://en.wikipedia.org/wiki/Loire" },
  // From the tidal weir at Glasgow Green the Clyde is tidal, a mix of fresh and salt water, and it merges into the Firth
  // of Clyde at the Tail of the Bank off Greenock (55.95 N, 4.76 W), about 33 km away.
  { box: { minLat: 55.8, maxLat: 55.92, minLon: -4.4, maxLon: -4.15 }, water: "the River Clyde", kind: "estuary", openCoast: null, source: "https://en.wikipedia.org/wiki/River_Clyde" },
  // Brownsville (Day 3 audit, 11 November 2026). The grid's coast band here is the Lower Laguna Madre and the ship
  // channel, not the open Gulf: worked out from coordinates, the port's turning basin is about 11 km from the city centre,
  // the south end of the Lower Laguna Madre about 27 km, and the nearest open Gulf beach (Boca Chica, 25.997 N, 97.155 W)
  // about 36 km, beyond the 30 km "near" band. USGS: "Lower Laguna Madre is a shallow estuary between Padre Island" and
  // the mainland; "salinities in some areas at times exceed that of seawater"; its fresh water comes in "primarily at
  // Brownsville Ship Channel ... and Arroyo Colorado". The town does not stand on it, so the reach carries `away`.
  {
    box: { minLat: 25.82, maxLat: 26.0, minLon: -97.6, maxLon: -97.38 },
    water: "the Lower Laguna Madre and the Brownsville Ship Channel",
    kind: "estuary",
    openCoast: null,
    away: "10 to 30 km away",
    says: "a shallow estuary behind Padre Island, at times saltier than the sea",
    source: "https://pubs.usgs.gov/fs/fs-167-98/167-98_text.htm",
  },
  // Day 4 audit (13 November 2026): enclosed bays read as the open sea. Tampa read "the open sea, from beach, rock and
  // boat" and "The sea is the main fishery". Tampa Bay is "Florida's largest open-water estuary at 373 square miles"
  // (Southwest Florida Water Management District), and downtown Tampa stands on its Hillsborough Bay arm. Worked out from
  // coordinates, the nearest open Gulf beach, Clearwater Beach (27.978 N, 82.827 W), is about 37 km from downtown, beyond
  // the 30 km "near" band.
  {
    box: { minLat: 27.85, maxLat: 28.06, minLon: -82.62, maxLon: -82.33 },
    water: "Tampa Bay",
    kind: "estuary",
    openCoast: null,
    bay: true,
    source: "https://www.swfwmd.state.fl.us/projects/swim/tampa-bay",
  },
  // San Jose read "The coast is within about 30 km" and had a sea section. The salt water nearest the city is the south end
  // of San Francisco Bay at Alviso, about 12 km from downtown by coordinates (37.426 N, 121.974 W); USGS describes "the
  // main channel and shallow intertidal mudflats in the southernmost part of south San Francisco Bay", and calls the Bay
  // and the Sacramento-San Joaquin Delta "one of the largest estuaries in the United States". The nearest open Pacific
  // shore, at Capitola (36.972 N, 121.953 W), is about 41 km away, beyond the 30 km band. The town does not stand on the
  // bay, so the reach carries `away`.
  {
    box: { minLat: 37.2, maxLat: 37.45, minLon: -122.05, maxLon: -121.75 },
    water: "South San Francisco Bay",
    kind: "estuary",
    openCoast: null,
    away: "10 to 30 km away",
    says: "the shallow south end of San Francisco Bay, with intertidal mudflats",
    bay: true,
    source: "https://pubs.usgs.gov/publication/ofr20111315 ; https://pubs.usgs.gov/publication/fs20133037",
  },
];

// The inland seas (INLAND_SEAS, inlandSeaAt) live in ./inland-seas, which the client pages can import (Day 5 audit).
export { INLAND_SEAS, inlandSeaAt, withInlandSea, type InlandSea } from "./inland-seas";


/** The fresh-water habitats a fish's records may vouch for; the big lake and the big river come from the grid alone. */
const RECORD_HABITATS: Habitat[] = ["lake", "pond", "river"];

/**
 * The kinds of fresh water the town's fish records vouch for, for a town whose map look-up failed (Day 3 audit, 11 November
 * 2026). The fallback gave such a town only ponds and rivers, which hid every fish of lakes and cold streams: Asheville,
 * with 325 rainbow and 453 brown trout rows and the nearest within 10 km, and hatchery-supported trout water in town (NC
 * Wildlife's 2026 rules), showed no trout at all. Now a fish recorded within 10 km of town (the presence table's nearest
 * ring) vouches for its lake, pond and river habitats; a fish whose first habitat is a cold stream vouches for one only in
 * a climate cool enough for trout streams (`coldStreams`), so a warm town's stocked winter trout (Nashville) go to its
 * lakes, not to a stream the map never named. Where the table has no evidence (a town not in it, or one with few fish
 * records of any kind), lakes are added to the fallback's ponds and rivers, so no kind of still water is ruled out.
 */
function recordedHabitats(lat: number, lon: number, coldStreams: boolean): Habitat[] {
  const pres = presenceAt(lat, lon);
  if (!pres?.checked) return ["lake", "pond", "river"];
  // Day 5 audit (14 November 2026): a data-poor town's records were not read at all, so Bozeman, with 971 rainbow and 57
  // brown trout rows and the nearest within 10 km, had no cold streams after a failed look-up, and its trout showed only
  // under the lakes. Few records of other fish say nothing about absence, but a fish recorded within 10 km still vouches
  // for its water; a data-poor town keeps the lake, pond and river fallback as well.
  const out = new Set<Habitat>(pres.dataPoor ? ["lake", "pond", "river"] : []);
  for (const f of Object.values(pres.fish)) {
    if (f.status !== "recorded" || (f.withinKm ?? 99) > 10) continue;
    const hs = habitatsOf(f.slug);
    for (const x of hs) if (RECORD_HABITATS.includes(x)) out.add(x);
    if (hs[0] === "cold-stream" && coldStreams) out.add("cold-stream");
  }
  return [...out];
}

/** The town's fish recorded within 10 km (the presence table's nearest ring), where the table has enough records to say. */
function nearFish(lat: number, lon: number) {
  const pres = presenceAt(lat, lon);
  if (!pres?.checked || pres.dataPoor) return [];
  return Object.values(pres.fish).filter((f) => f.status === "recorded" && (f.withinKm ?? 99) <= 10);
}

/** A fish whose first water is the estuary (redfish, snook, tarpon) recorded within 10 km. */
const estuaryVouched = (lat: number, lon: number): boolean => nearFish(lat, lon).some((f) => habitatsOf(f.slug)[0] === "estuary");

const STILL: Habitat[] = ["big-lake", "lake", "pond"];
/** The lakes and ponds vouched for by fish of still water alone (no river, stream or sea habitat) recorded within 10 km. */
function stillVouched(lat: number, lon: number): Habitat[] {
  const out = new Set<Habitat>();
  for (const f of nearFish(lat, lon)) {
    const hs = habitatsOf(f.slug);
    if (!hs.every((x) => STILL.includes(x))) continue;
    for (const x of hs) if (x === "lake" || x === "pond") out.add(x);
  }
  return [...out];
}

/**
 * What the grid and its sourced fixes alone say about the town's water: the coast band, the big lake, the big river, a
 * confluence and a tidal reach. No named waters and no fish records are read, so the presence rules (fish-presence.ts)
 * can ask it without a loop (Day 5 audit, 14 November 2026: a fresh-water fish whose nearest records are 30 to 60 km
 * from a town on salt water, or a big lake's fish at a town with no big lake).
 */
export function gridSetting(lat: number, lon: number) {
  // The town's own cell: band 2 already means the coastline is within 10 km of the cell's centre. The best of the eight
  // neighbours, used until 10 November 2026, stretched "within about 10 km" to about 20 (Savannah, 25 km from Tybee's
  // beach, read as "on the doorstep"; Hamburg, Nantes and Glasgow likewise).
  const coastBand = cell(G.coast, lat, lon);
  let coast: WaterSetting["coast"] = coastBand >= 2 ? "on" : coastBand === 1 ? "near" : null;
  const li = cell(G.lake, lat, lon) || near(G.lake, lat, lon, Math.min);
  const ri = cell(G.river, lat, lon);
  let bigLake: WaterSetting["bigLake"] = li ? { name: G.lakes[li - 1].name, km2: G.lakes[li - 1].km2 } : null;
  let bigRiver: string | null = ri ? G.rivers[ri - 1].name : null;
  let confluence: WaterSetting["confluence"] = null;
  for (const f of WATER_FIXES) {
    if (!inBox(f.box, lat, lon) || !f.when({ coastBand, lake: bigLake?.name ?? null, river: bigRiver })) continue;
    if (f.coast === null) coast = null;
    if (f.bigLake !== undefined) bigLake = f.bigLake;
    if (f.bigRiver) bigRiver = f.bigRiver;
    if (f.confluence) confluence = f.confluence;
  }
  // A tidal river or estuary arm drawn as sea: the open coast is where its entry says, and the water is the river's.
  const reach = coastBand > 0 ? (TIDAL_REACHES.find((t) => inBox(t.box, lat, lon)) ?? null) : null;
  if (reach) {
    coast = reach.openCoast;
    if (reach.bigRiver && !bigRiver) bigRiver = reach.bigRiver;
  }
  const tidalWater: WaterSetting["tidal"] = reach
    ? { water: reach.water, kind: reach.kind, ...(reach.away ? { away: reach.away, says: reach.says } : {}), ...(reach.bay ? { bay: true as const } : {}) }
    : null;
  return { coastBand, coast, bigLake, bigRiver, confluence, reach, tidalWater };
}

export function waterSetting(lat: number, lon: number, waters: WaterBody[], climate?: Climate | null): WaterSetting {
  const { coast, bigLake, bigRiver, confluence, reach, tidalWater } = gridSetting(lat, lon);

  // On the coast, a "lake" called a lagoon or ria is tidal water, not a lake; so it is on an estuary reach whose open coast is
  // far (San Jose's Coyote Creek Lagoon, on South San Francisco Bay).
  const tidal = (w: WaterBody) => (coast !== null || reach?.kind === "estuary") && (w.kind === "lagoon" || /\b(lagoon|lagune|laguna|lagoa|ria|ría|liman|lough)\b/i.test(w.name));
  const named = estuaryNear(lat, lon) ?? waters.find(tidal)?.name ?? null;
  // At a tidal reach, the estuary is the reach itself when river and sea water mix there, and none where it is fresh.
  const estuary = reach ? (reach.kind === "estuary" ? reach.water : null) : coast ? named : null;
  // Not everything the map names is fishing water (L13).
  const { kept, avoid } = sortWaters(waters, lat, lon);
  const lakes = kept.filter((w) => (w.kind === "lake" || w.kind === "reservoir") && !tidal(w));
  const rivers = kept.filter((w) => w.kind === "river");
  const streams = kept.filter((w) => w.kind === "stream");

  // Trout want water that stays below about 20 °C: a cool summer, or height.
  const warmest = climate ? Math.max(...climate.monthlyMeanMax.map((mx, i) => (mx + climate.monthlyMeanMin[i]) / 2)) : 20;
  const coldStreams = warmest <= 19 || ((climate?.elevationM ?? 0) >= 500 && warmest <= 24);

  // Salt water inside an inland sea (the Salish Sea, Day 5 audit): the shore, harbours and the water offshore, never surf.
  const inlandSea = coast && !reach ? inlandSeaAt(lat, lon) : null;
  const h = new Set<Habitat>();
  if (coast) ["surf", "rocks", "harbour", "offshore"].forEach((x) => h.add(x as Habitat));
  if (inlandSea) h.delete("surf");
  // An estuary wherever a river reaches a coast that is close by — counted before the sift: a canalised river
  // still has a mouth, and the mouth (Milnerton Lagoon, the Salt River mouth) is fished when the river is not.
  const anyRiver = waters.some((x) => x.kind === "river" || x.kind === "stream");
  if (coast && (estuary || anyRiver || bigRiver)) h.add("estuary");
  if (reach?.kind === "estuary") h.add("estuary");
  // A fresh or merely tidal reach is river water: its fish are the river's, not the estuary's (the 10 November audit
  // found bluefish "in season" on the tidal fresh Potomac at Washington).
  if (reach && reach.kind !== "estuary") h.add("river");
  if (bigLake) h.add("big-lake");
  if (lakes.length || bigLake) {
    h.add("lake");
    h.add("pond");
  }
  if (rivers.length || bigRiver) h.add("river");
  if (bigRiver) h.add("big-river");
  // Trout water is small and cold: named streams in a cool climate or in the hills, not a city's big river.
  if (streams.length && coldStreams) h.add("cold-stream");
  // Or an agency's trout water, where its page says so (TROUT_WATERS, Day 4 audit): the Boise River, Albuquerque's drains
  // and ponds. The row stands whether or not the map look-up answered.
  const troutWaters = troutWatersAt(lat, lon);
  if (troutWaters.length) h.add("trout-river");
  if (troutWaters.some((t) => t.still.length)) {
    h.add("lake");
    h.add("pond");
  }
  const unavailable = watersUnavailable(waters);
  // The map service did not answer: the records near the town say which kinds of water it has (recordedHabitats).
  if (unavailable) for (const x of recordedHabitats(lat, lon, coldStreams)) h.add(x);
  // Day 4 audit (13 November 2026): a failed look-up at Tampa, Miami and Fort Lauderdale left only "The sea", because the
  // estuary needed a named river. At a coastal town, a fish of estuaries recorded within 10 km vouches for one.
  if (unavailable && coast && estuaryVouched(lat, lon)) h.add("estuary");
  // An answer that names no still water (an empty answer, or half of one): Albuquerque, with the Rio Grande from the grid,
  // got no lakes or ponds at all, because the pond fallback below runs only when nothing else was found; yet Tingley Beach
  // is in town. Fish of still water alone (bluegill, crappie, perch) recorded within 10 km vouch for lakes and ponds.
  // An answer that named still waters, all of them unfit (Cape Town's water-supply dams), has said what they are: no fallback.
  const stillNamed = waters.some((x) => x.kind === "lake" || x.kind === "reservoir");
  if (!unavailable && !stillNamed && !bigLake) for (const x of stillVouched(lat, lon)) h.add(x);
  // Every town has a pond or a farm dam somewhere near it, even when the map names none.
  if (!h.size || unavailable) {
    h.add("pond");
    h.add("river");
  }

  const habitats = [...h];
  const groups = WATER_GROUPS.filter((g) => g.habitats.some((x) => h.has(x))).map((g) => g.id);
  const namedWaters: WaterSetting["namedWaters"] = unavailable ? "unavailable" : waters.length ? "listed" : "none";
  return { coast, tidal: tidalWater, confluence, namedWaters, bigLake, bigRiver, estuary, lakes, rivers, streams, avoid, coldStreams, inlandSea, seaRunBlocked: seaRunBlockedAt(lat, lon), troutWaters, habitats, groups };
}
