/**
 * The ground under a place: what the geologic map says is at the surface and
 * in the bedrock (Macrostrat map units, see ./ground-layers), the soil
 * (SoilGrids), the watershed the rain drains to, and a modelled estimate of
 * river flow (Open-Meteo flood API, GloFAS: a model, not a gauge).
 *
 * The slow, stable part — rocks, soil, watershed — is stored as a record
 * (`rec:v1:ground:<lat2>_<lon2>`, fresh for 90 days). The river is read per
 * day. Cache keys:
 *   rock:v3:<lat2>:<lon2>      the map units, as RockUnit (v3 adds the interval's span and top name)
 *   soil:v2:<lat2>:<lon2>      { v: Soil | null }
 *   ws:v1:<lat2>:<lon2>        { v: Watershed | null }
 *   reach:v2:<lat2>:<lon2>     { v: { lat, lon } | null } — the river cell used
 *   flow:v4:<lat2>:<lon2>:<date>  { v: FlowReading | null } (keyed by the reach)
 */
import { cacheGet, cacheSet } from "./cache";
import { readRecord, writeRecord, type StoredRecord } from "./records";
import { ROCKS_VERSION, macrostratUrl, unitFromMacrostrat, type GroundLayers, type MacrostratUnit, type RockUnit } from "./ground-layers";
import type { Rock } from "./rocks";
import { koppen } from "./regime";
import type { Climate, Place } from "./types";
import HUC6_TOWNS from "@/data/usgs-huc6-towns.json";
import SDA_NAMES from "@/data/statcan-sda-names.json";

export {
  ROCKS_VERSION,
  ageRangeOld,
  ageRangeText,
  bedrockFact,
  bedrockPhrase,
  coarseMapName,
  beneathSentence,
  digCaliche,
  digCover,
  digRock,
  digStopsAtCover,
  groundStandfirst,
  intervalFor,
  layersOf,
  rockNamed,
  spanPhrase,
  surfaceFact,
  surfacePhrase,
} from "./ground-layers";
export type { Beneath, DigCover, GroundLayers, RockUnit, UnitView } from "./ground-layers";

export type Soil = { clay: number; sand: number; silt: number; texture: string; ph: number; organicCarbon: number };
/**
 * `verified`: the code and the basin name are the USGS Watershed Boundary Dataset's at the point (see `verifiedWatershed`).
 * `officialName`: a Canadian sub-drainage area named as Statistics Canada names its code (the code itself is the stored one).
 */
export type Watershed = { ocean: string; system: string; river: string | null; basin: string; code: string; country: string; verified?: boolean; officialName?: boolean };

/** Statistics Canada's names for the sub-drainage areas the Canadian towns' stored codes use (src/data/statcan-sda-names.json). */
export const SDA_NAME: Record<string, string> = (SDA_NAMES as { names: Record<string, string> }).names;
/** `rocksV` stamps the shape of `rocks`: a record without it was stored with the old reading of the map and is re-read, not trusted. */
export type Ground = { watershed: Watershed | null; rocks: RockUnit[]; soil: Soil | null; rocksV?: number };

/**
 * A modelled estimate of the river discharge near a place on one date. It is
 * the GloFAS model's value, not a gauge reading, and nothing here compares it
 * with a seasonal normal or calls it high or low: the model's own error is
 * not known to this site.
 */
export type FlowReading = { todayM3s: number };

export const GROUND_FRESH_SECONDS = 90 * 24 * 3600;
const YEAR = 365 * 24 * 3600;

export const groundId = (p: Pick<Place, "lat" | "lon">) => `${p.lat.toFixed(2)}_${p.lon.toFixed(2)}`;
const k2 = (lat: number, lon: number) => `${lat.toFixed(2)}:${lon.toFixed(2)}`;

// ---------------------------------------------------------------- words

/** "very acid", "acid", "slightly acid", "near neutral", "alkaline". */
export function phWord(ph: number): string {
  return ph < 5 ? "very acid" : ph < 5.8 ? "acid" : ph < 6.5 ? "slightly acid" : ph < 7.3 ? "near neutral" : "alkaline";
}

/**
 * What the bedrock does to the soil above it, for the foraging note: only
 * where the map shows NO surface-deposit unit at the point (soil that forms
 * on glacial or marine deposits takes its pH from them, not from the rock
 * beneath) and only for a rock named by its main lithology. The bedrock is
 * never a continent- or world-scale map's unit (`regionalBedrock` is not
 * read here), so no soil claim rests on one.
 */
export function rockLore(layers: GroundLayers): { name: string; lime: "sweetens" | "sours" | null } | null {
  const rock: Rock | undefined = layers.bedrock?.rock;
  if (!rock || layers.surface.length > 0) return null;
  const e = rock.soilEffect;
  return { name: rock.name, lime: e === "alkaline" ? "sweetens" : e === "acid" ? "sours" : null };
}

/**
 * The USDA texture class of the three fractions (%), by the texture triangle's own rules: USDA-NRCS Soil Survey Manual
 * (2017), chapter 3, as tabulated in ISRIC's "Ultimate Soil Texture Flow Chart"
 * (https://wrb.isric.org/files/The_Ultimate_Soil_Texture_Flow_Chart_2022-01-11.pdf, read 11 November 2026). The
 * fractions are scaled to sum to 100 first where they are more than 2 points off (SoilGrids' three means need not sum
 * to 100); whole percentages that sum to 99 to 101, as the page prints them, are classed as they stand, so a reader can
 * check the word against the printed figures.
 *
 * Audit, 11 November 2026: the old shortcut had no sandy clay loam below 27% clay (Asheville's 24% clay, 21% silt, 55%
 * sand was "loam"; USDA: sandy clay loam, 20 to 35% clay, under 28% silt, over 45% sand), and split clay loam from silty
 * clay loam on silt where USDA splits on sand (Brownsville's 33/31/36 was "silty clay loam"; USDA: clay loam, sand over
 * 20 and up to 45%).
 */
export function textureClass(clay: number, sand: number, silt: number): string {
  const sum = clay + sand + silt;
  const f = sum > 0 && Math.abs(sum - 100) > 2 ? 100 / sum : 1;
  const [c, sa, si] = [clay * f, sand * f, silt * f];
  if (si + 1.5 * c < 15) return "sand";
  if (si + 2 * c < 30) return "loamy sand";
  if ((c >= 7 && c < 20 && sa > 52) || (c < 7 && si < 50)) return "sandy loam";
  if (c < 27 && si >= 50) return si >= 80 && c < 12 ? "silt" : "silt loam";
  if (c >= 7 && c < 27 && si >= 28 && sa <= 52) return "loam";
  if (c >= 20 && c < 35 && si < 28 && sa > 45) return "sandy clay loam";
  if (c >= 27 && c < 40 && sa <= 45) return sa <= 20 ? "silty clay loam" : "clay loam";
  if (c >= 35 && sa > 45) return "sandy clay";
  if (c >= 40) return si >= 40 ? "silty clay" : "clay";
  return "loam"; // not reached once the fractions sum to 100
}

/**
 * The soil with its texture class worked out from the percentages it prints. The texture stored with a soil record was
 * classed by the old shortcut when it was read (records are kept for a year), so it is never printed as stored.
 */
export const withTexture = (s: Soil | null): Soil | null => (s ? { ...s, texture: textureClass(s.clay, s.sand, s.silt) } : null);

// ---------------------------------------------------------------- fetchers

async function getJson<T>(url: string, ms = 12_000): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(ms) });
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status}`);
  return (await res.json()) as T;
}

/**
 * The geologic map units under a point, the most detailed map first (the
 * order Macrostrat returns). Each is one map's unit at the point, not a layer
 * of a stack: use `layersOf` to read them as surface deposits and bedrock.
 */
export async function getRocks(lat: number, lon: number): Promise<RockUnit[]> {
  const key = `rock:v${ROCKS_VERSION}:${k2(lat, lon)}`;
  const hit = await cacheGet<RockUnit[]>(key);
  if (hit) return hit;
  const json = await getJson<{ success?: { data?: MacrostratUnit[] } }>(macrostratUrl(lat, lon));
  const units = (json.success?.data ?? []).map(unitFromMacrostrat);
  await cacheSet(key, units, YEAR);
  return units;
}

/** The root-zone soil at a point (0–30 cm, SoilGrids 250 m). */
export async function getSoil(lat: number, lon: number): Promise<Soil | null> {
  const key = `soil:v2:${k2(lat, lon)}`;
  const hit = await cacheGet<{ v: Soil | null }>(key);
  if (hit) return withTexture(hit.v);
  type Layer = { name: string; depths: { label: string; values: { mean: number | null } }[] };
  let v: Soil | null = null;
  try {
    const q = ["clay", "sand", "silt", "phh2o", "soc"].map((p) => `property=${p}`).join("&");
    const depths = ["0-5cm", "5-15cm", "15-30cm"].map((d) => `depth=${d}`).join("&");
    const json = await getJson<{ properties: { layers: Layer[] } }>(
      `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&${q}&${depths}&value=mean`,
      20_000,
    );
    const mean = (name: string) => {
      const l = json.properties.layers.find((x) => x.name === name);
      const vals = (l?.depths ?? []).map((d) => d.values.mean).filter((x): x is number => x != null);
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
    };
    const [clay, sand, silt, ph, soc] = ["clay", "sand", "silt", "phh2o", "soc"].map(mean);
    if (clay != null && sand != null && silt != null && ph != null) {
      // The class is that of the whole percentages the page prints, so a reader can check one against the other.
      v = withTexture({
        clay: Math.round(clay / 10),
        sand: Math.round(sand / 10),
        silt: Math.round(silt / 10),
        texture: "",
        ph: Math.round(ph) / 10,
        organicCarbon: Math.round(soc ?? 0),
      });
    }
  } catch {
    return null; // not cached: try again next time
  }
  // SoilGrids answers "no value" for some cells: that is cached for a month, not a year.
  await cacheSet(key, { v }, v ? YEAR : 30 * 24 * 3600);
  return v;
}

/** A town's six-digit hydrologic unit as the USGS Watershed Boundary Dataset gives it at the town's point. */
type VerifiedHuc = {
  lat: number;
  lon: number;
  huc6: string;
  name: string;
  stored?: string;
  river?: string | null;
  system?: string;
  reviewed?: string;
  /** The water the town's drainage reaches, checked for this unit (see `_oceans` in the data file); replaces the stored one. */
  ocean?: string;
  /** Where the region holds coasts on two sides: the eight-digit unit at the point and the sources read for it. */
  oceanCheck?: string;
};
const VERIFIED_HUC = new Map(Object.values((HUC6_TOWNS as unknown as { towns: Record<string, VerifiedHuc> }).towns).map((t) => [k2(t.lat, t.lon), t]));

/**
 * The stored watershed with the code and name the USGS Watershed Boundary Dataset gives at the point, where it was
 * queried (src/data/usgs-huc6-towns.json). Audit, 11 November 2026: the stored code was wrong at the point at Pittsburgh
 * (050100 Allegheny; the dataset gives 050200 Monongahela) and Brownsville (130900 Lower Rio Grande; 121102
 * Southwestern Texas Coastal), and the footnote "named as in the USGS Watershed Boundary Dataset" made the wrong code
 * look checked. The footnote now says so only where the point was queried. The stored river and system stay unless the
 * data file replaces them (Brownsville's water does not reach the Rio Grande).
 *
 * Audit of 13 November 2026 (Day 4): the ocean was the stored record's, taken from the drainage region, and nothing
 * checked it. Unit 0309 (Southern Florida) holds coasts on both sides, so Fort Myers, on the Caloosahatchee, which
 * empties into the Gulf of Mexico at Fort Myers (USGS, https://pubs.usgs.gov/ds/1031/ds1031_caloosa_description.html),
 * and Orlando, on the Kissimmee, which flows to Lake Okeechobee, read "drains to the Atlantic Ocean". Every verified row
 * now carries the ocean its region reaches (the data file's `_oceans` says how each was checked), and it replaces the
 * stored one.
 */
export function verifiedWatershed(ws: Watershed | null, lat: number, lon: number): Watershed | null {
  if (!ws) return null;
  // Audit of 10 November 2026, checked 14 November: Canadian names were never checked, since the `ws:v1` rows have no
  // writer here and only US rows were verified. 02H printed "North and west Lake Ontario" (Statistics Canada: "Lake
  // Ontario and Niagara Peninsula"), 08N "Upper Columbia" (officially "Columbia"), and Montreal's 02O "Upper St. Lawrence"
  // (02O is "Central St. Lawrence"; 02M is the Upper St. Lawrence). A Canadian basin is named from Statistics Canada's
  // table for its code; a code the table lacks keeps its stored name and is not called official. The code itself is the
  // stored drainage map's and is not checked at the point, and the footnote says so.
  if (ws.country === "CAN") {
    const name = SDA_NAME[ws.code];
    return { ...ws, basin: name ?? ws.basin, officialName: !!name, verified: false };
  }
  const v = ws.country === "USA" ? VERIFIED_HUC.get(k2(lat, lon)) : undefined;
  if (!v) return { ...ws, verified: false };
  return {
    ...ws,
    code: v.huc6,
    basin: v.name,
    river: v.river !== undefined ? v.river : ws.river,
    system: v.system !== undefined ? v.system : ws.system,
    ocean: v.ocean ?? ws.ocean,
    verified: true,
  };
}

/**
 * "drains to the Atlantic Ocean", "drains toward the Gulf of California": the heading's verb and water. Audit of 13
 * November 2026 (Day 4): the Colorado is so drawn down that only a trickle reaches the sea (see OCEAN_TEXT), so its towns'
 * rain drains toward the Gulf of California, not to it.
 */
export function drainsTo(ws: Pick<Watershed, "ocean">): { verb: "drains to" | "drains toward"; water: string } {
  const water = /^Hudson Bay/.test(ws.ocean) ? ws.ocean : `the ${ws.ocean.replace(/ and (?!the )/, " and the ")}`;
  return { verb: ws.ocean === "Gulf of California" ? "drains toward" : "drains to", water };
}

/** The drainage basin a point is in (North America only; read from the cache where it was stored). */
export async function getWatershed(lat: number, lon: number): Promise<Watershed | null> {
  const hit = await cacheGet<{ v: Watershed | null }>(`ws:v1:${k2(lat, lon)}`);
  return verifiedWatershed(hit?.v ?? null, lat, lon);
}

/** Everything slow about the ground, fetched fresh. */
export async function fetchGround(lat: number, lon: number): Promise<Ground> {
  const [rocks, soil, watershed] = await Promise.all([getRocks(lat, lon).catch(() => [] as RockUnit[]), getSoil(lat, lon), getWatershed(lat, lon)]);
  return { watershed, rocks, soil, rocksV: ROCKS_VERSION };
}

/** The stored ground record for a place. */
export async function readGround(place: Pick<Place, "lat" | "lon">): Promise<StoredRecord<Ground> | null> {
  return readRecord<Ground>("ground", groundId(place)).catch(() => null);
}

/** Fetches and stores the ground for a place (the refresh). */
export async function writeGround(place: Pick<Place, "lat" | "lon">, previous?: StoredRecord<Ground> | null): Promise<StoredRecord<Ground>> {
  const g = await fetchGround(place.lat, place.lon);
  return writeRecord("ground", groundId(place), g, { source: "live", freshFor: GROUND_FRESH_SECONDS, previous: previous ?? null });
}

/** The stored ground, or a fresh read stored on first visit. */
export async function groundFor(place: Pick<Place, "lat" | "lon">): Promise<StoredRecord<Ground> | null> {
  const raw = await readGround(place);
  // A stored record's soil texture and watershed code are re-checked on every read (see `withTexture`, `verifiedWatershed`).
  const stored = raw && {
    ...raw,
    value: { ...raw.value, soil: withTexture(raw.value.soil), watershed: verifiedWatershed(raw.value.watershed, place.lat, place.lon) },
  };
  if (stored) {
    if (stored.value.rocksV === ROCKS_VERSION && stored.value.rocks.length > 0) return stored;
    // Stored before the map was read as surface deposits and bedrock (the old
    // rocks carried the wrong ages and are not shown), or stored empty after a
    // failed read: read them again (cached), and leave the soil and watershed as
    // stored; the next refresh writes the record.
    const rocks = await getRocks(place.lat, place.lon).catch(() => [] as RockUnit[]);
    return { ...stored, value: { ...stored.value, rocks, rocksV: ROCKS_VERSION } };
  }
  try {
    const g = await fetchGround(place.lat, place.lon);
    if (!g.rocks.length && !g.soil && !g.watershed) return null;
    return await writeRecord("ground", groundId(place), g, { source: "live", freshFor: GROUND_FRESH_SECONDS, previous: null });
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- the river

const FLOOD = "https://flood-api.open-meteo.com/v1/flood";

/** Candidate river cells: the place, then about 15 km out in eight directions. */
const OFFSETS: [number, number][] = [
  [0, 0],
  [0.14, 0],
  [-0.14, 0],
  [0, 0.2],
  [0, -0.2],
  [0.1, 0.15],
  [-0.1, -0.15],
  [0.1, -0.15],
  [-0.1, 0.15],
];

/** The modelled river cell that stands for a place's rivers: the biggest flow within about 15 km. */
export async function findReach(lat: number, lon: number): Promise<{ lat: number; lon: number } | null> {
  const key = `reach:v2:${k2(lat, lon)}`;
  const hit = await cacheGet<{ v: { lat: number; lon: number } | null }>(key);
  if (hit) return hit.v;
  const pts = OFFSETS.map(([a, b]) => ({ lat: lat + a, lon: lon + b }));
  let v: { lat: number; lon: number } | null = null;
  try {
    type R = { daily?: { river_discharge?: (number | null)[] } };
    const json = await getJson<R | R[]>(
      `${FLOOD}?latitude=${pts.map((p) => p.lat.toFixed(4)).join(",")}&longitude=${pts.map((p) => p.lon.toFixed(4)).join(",")}&daily=river_discharge_median&past_days=30&forecast_days=1`,
    );
    const rows = Array.isArray(json) ? json : [json];
    let best = 0.5;
    rows.forEach((r, i) => {
      const xs = ((r.daily as { river_discharge_median?: (number | null)[] } | undefined)?.river_discharge_median ?? []).filter((x): x is number => x != null);
      const m = xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
      if (m > best) {
        best = m;
        v = pts[i];
      }
    });
  } catch {
    return null;
  }
  await cacheSet(key, { v }, YEAR);
  return v;
}

/**
 * The GloFAS model's discharge for the date at the river cell chosen for a
 * place (the biggest modelled flow within about 15 km: see `findReach`). A
 * model estimate on a coarse grid, not a gauge reading, and not the flow at
 * the place itself. Nothing else is derived from it: the model's own error is
 * not known here, so no "high", "low" or "rising" is judged.
 */
export async function riverFlow(place: Pick<Place, "lat" | "lon">, today: string): Promise<FlowReading | null> {
  const reach = await findReach(place.lat, place.lon);
  if (!reach) return null;
  const key = `flow:v4:${k2(reach.lat, reach.lon)}:${today}`;
  const hit = await cacheGet<{ v: FlowReading | null }>(key);
  if (hit) return hit.v;
  let v: FlowReading | null = null;
  try {
    const json = await getJson<{ daily: { time: string[]; river_discharge: (number | null)[] } }>(
      `${FLOOD}?latitude=${reach.lat}&longitude=${reach.lon}&daily=river_discharge&start_date=${today}&end_date=${today}`,
    );
    const now = json.daily.river_discharge[0];
    if (now != null && now > 0) v = { todayM3s: Math.round(now * 10) / 10 };
  } catch {
    return null;
  }
  await cacheSet(key, { v }, 2 * 24 * 3600);
  return v;
}

// ---------------------------------------------------------------- the words on /ground/<town>

/** The marker on the pH bar, 4 to 8.5. */
export const phPosition = (ph: number) => Math.max(0, Math.min(100, ((ph - 4) / 4.5) * 100));

/**
 * What the soil's pH means for a garden, by band.
 *
 * Audit of 10 November 2026, checked 14 November: "suited" named trees and shrubs by pH alone, beside the hardiness zone
 * on the same town's pages: "Almost everything: tomatoes … apples" at Thompson (zone 1a), Whitehorse (1b), Fairbanks (3a)
 * and International Falls (3b); "most stone fruit" at Val-d'Or (2b), Grand Forks (4a) and Laramie (4b); "lilacs" at
 * Austin and San Antonio, too warm for them. The soil card is printed without the town's zone, so `suited` now names only
 * annual crops, for which the pH is the soil's part, and says that the zone decides the rest. Trees and shrubs are named
 * only by `suitedFor`, where the town's zone is known and inside the plant's sourced range.
 */
export const PH_TEXT: Record<string, { means: string; suited: string; amending: string }> = {
  "very acid": {
    means:
      "Well below what most vegetables want. Phosphorus and molybdenum get locked away at this pH, and aluminium becomes soluble enough to hurt roots — so plants can sit in fed soil and still go hungry.",
    suited: "Potatoes. For fruit, trees and shrubs, the town's hardiness zone decides as much as the soil.",
    amending:
      "Lime raises it, slowly — autumn is the time, and it takes a season to move. Test before and after rather than guessing; overshooting is harder to undo than undershooting.",
  },
  acid: {
    means:
      "Comfortable for woodland plants and a little tight for the vegetable garden. Brassicas sulk, and clubroot is worse at this end of the scale.",
    suited: "Potatoes and carrots. For fruit, trees and shrubs, the town's hardiness zone decides as much as the soil.",
    amending: "A dressing of lime in autumn brings the vegetable beds up without touching the fruit. Leave the blueberries well alone.",
  },
  "slightly acid": {
    means:
      "The sweet spot for a vegetable garden. Nearly every nutrient is at its most available somewhere in this band, which is why it is the number every soil guide tells you to aim at.",
    suited: "Most vegetables: tomatoes, beans, squash and lettuce. For fruit, trees and shrubs, the town's hardiness zone decides as much as the soil.",
    amending: "Nothing needed. Compost keeps it here; heavy lime would push it past useful.",
  },
  "near neutral": {
    means:
      "Easy ground for most vegetables and fruit. Iron and manganese start to get harder to reach at the top of this band, which shows up as yellowing between the veins on young leaves.",
    suited: "Brassicas, beets, spinach and peas. For fruit, trees and shrubs, the town's hardiness zone decides as much as the soil.",
    amending: "Leave it. If acid-lovers are the point, grow them in containers or a made-up bed rather than fighting the whole garden.",
  },
  alkaline: {
    means:
      "Limey ground. Iron, manganese and zinc are chemically present but hard for roots to take up, so acid-loving plants go yellow between the veins no matter how much you feed them.",
    suited: "Brassicas and beets. For fruit, trees and shrubs, the town's hardiness zone decides as much as the soil.",
    amending:
      "Chelated iron treats the symptom. Sulphur lowers pH but slowly and not permanently. The honest answer is to grow what suits it and put the blueberries in a pot.",
  },
};

/**
 * Fruit and shrubs the soil card may name, with the pH bands each suits (the bands the old lists put them in) and the USDA
 * hardiness zones each is rated for. The top of a range is the heat limit: lilac and the fruit trees need cold winters.
 * - Highbush blueberry, zones 3a to 8b, "Acid (<6.0)", ideal pH 5.0 (NC State Extension Plant Toolbox,
 *   https://plants.ces.ncsu.edu/plants/vaccinium-corymbosum/, read 14 November 2026).
 * - Apple, zones 4a to 9b (NC State Extension, https://plants.ces.ncsu.edu/plants/malus-domestica/common-name/apple,
 *   read 14 November 2026).
 * - Common lilac, zones 3 to 7 (University of Minnesota, https://trees.umn.edu/common-lilac-syringa-vulgaris, read 14
 *   November 2026): too warm for Austin and San Antonio.
 * - Peach, zones 5a to 9b, needing "a specific number of cold days" (NC State Extension,
 *   https://plants.ces.ncsu.edu/plants/prunus-persica/, read 14 November 2026); it stands for the old "most stone fruit".
 */
const ZONED_PLANTS: { name: string; bands: string[]; zones: [number, number] }[] = [
  { name: "blueberries", bands: ["very acid", "acid"], zones: [3, 8] },
  { name: "apples", bands: ["slightly acid"], zones: [4, 9] },
  { name: "lilacs", bands: ["near neutral", "alkaline"], zones: [3, 7] },
  { name: "peaches", bands: ["alkaline"], zones: [5, 9] },
];

/**
 * The "suited" line for a pH band at a town in USDA hardiness zone `zone` (the whole number: 4 for 4a and 4b): the band's
 * line, with the fruit and shrubs of `ZONED_PLANTS` that suit the band and are rated for the zone. With no zone it is the
 * band's line alone, which names no tree or shrub.
 */
export function suitedFor(word: string, zone: number | null | undefined): string {
  const base = PH_TEXT[word]?.suited ?? "";
  if (zone == null || !Number.isFinite(zone)) return base;
  const hardy = ZONED_PLANTS.filter((p) => p.bands.includes(word) && zone >= p.zones[0] && zone <= p.zones[1]).map((p) => p.name);
  if (!hardy.length) return base;
  const list = hardy.length === 1 ? hardy[0] : `${hardy.slice(0, -1).join(", ")} and ${hardy[hardy.length - 1]}`;
  return `${base} Of the fruit and shrubs, ${list} suit this pH and are rated for zone ${zone}.`;
}

/** How a texture works under the spade. */
export function workability(texture: string): string {
  if (texture === "sand" || texture === "loamy sand" || texture === "sandy loam")
    return "Water runs straight through, so it dries fast and warms early — you can work it days after rain and sow ahead of heavier ground, but it needs watering and feeding more often because both wash out.";
  if (texture === "clay" || texture === "silty clay" || texture === "sandy clay")
    return "Holds water and nutrients well and gives them up slowly. It is cold and late in spring, and it will set like concrete if you work it wet — so wait until it crumbles rather than smears.";
  if (texture === "silt loam" || texture === "silt")
    return "Fine and fertile, holding water better than sand without clay's stickiness. It caps over in heavy rain, so it wants a mulch or a cover crop rather than being left bare.";
  // Audit, 10 November 2026: Atlanta's sandy clay loam got the loam line ("why loam is the one everybody wants"). The clay
  // loams hold 20 to 40% clay (textureClass above), between loam and clay, so their line is the one between the loam and
  // clay lines here. Audit, 11 November 2026: silty clay loam (27 to 40% clay) got the silt line, "without clay's
  // stickiness"; it is a clay loam too.
  if (texture === "clay loam" || texture === "sandy clay loam" || texture === "silty clay loam")
    return "Between loam and clay: it holds water and nutrients better than loam, but it is stickier and slower to dry in spring, so wait until it crumbles rather than smears before you work it.";
  return "A balance of sand, silt and clay — the texture that holds enough water to matter and still drains, which is why loam is the one everybody wants.";
}

/**
 * The pH a child's dig names, from the same bands as the ground page's `phWord`. Audit, 10 November 2026: the dig
 * called pH 5.5 and 5.6 "about neutral" (its own bands) where the ground page and the strip said "acid" (Charlottetown,
 * Charlotte).
 */
const KID_PH: Record<string, string> = {
  "very acid": "very acid",
  acid: "acid",
  "slightly acid": "a little acid",
  "near neutral": "about neutral",
  alkaline: "sweet (alkaline)",
};
export const kidPh = (ph: number) => KID_PH[phWord(ph)];

/**
 * Is the town a desert, by its Köppen–Geiger climate (BW: the rain is under half the dryness threshold) from the site's
 * own monthly normals (src/lib/regime.ts `koppen`)? Then the child's dig draws desert ground, not woodland. Audit of 13
 * November 2026 (Day 4): the dig drew leaf litter and "dark and crumbly" topsoil with earthworms under Tucson, Phoenix
 * and Las Vegas. Desert soils (Aridisols) have "a surface horizon ... light in colour with very low humus content" and,
 * as they mature, "subsurface clay and calcium carbonate accumulations" (Britannica, Aridisol,
 * https://www.britannica.com/science/Aridisol, read 13 November 2026); the USDA's Tucson series has a light-brown
 * surface with less than 1 percent organic matter (https://soilseries.sc.egov.usda.gov/OSD_Docs/T/TUCSON.html).
 * Semi-arid (BS) towns are not included: their soils range from pale to the dark grassland soils of the plains.
 */
export function isDesertClimate(c: Pick<Climate, "monthlyMeanMax" | "monthlyMeanMin" | "monthlyRainMm"> | null, lat: number): boolean {
  if (!c?.monthlyRainMm || c.monthlyRainMm.length !== 12) return false;
  const t = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
  return koppen(t, c.monthlyRainMm, lat).startsWith("BW");
}

/**
 * Where the rain goes, by the ocean it reaches. Audit, 5 November 2026: the old lines were written for one river system
 * and printed for every town on the ocean (Ottawa's fur trade and eels under Detroit and Concord; the Mississippi and the
 * Louisiana dead zone under Dallas, whose Trinity runs to Galveston Bay). Each line now holds for any basin on that ocean,
 * and the Mississippi line is used only where the watershed is the Mississippi's.
 */
export const OCEAN_TEXT: Record<string, string> = {
  "Atlantic Ocean": "Everything that falls here works its way, river by river, to the Atlantic. What washes off the land upstream travels down to the coast with it.",
  "Gulf of Mexico": "This water runs, river by river, to the Gulf of Mexico. What washes off the land upstream travels down to the coast with it.",
  // Audit of 13 November 2026 (Day 4): "west" was printed where the water runs south (the Los Angeles River, Santa
  // Barbara's creeks).
  "Pacific Ocean": "Everything that falls here works its way, river by river, to the Pacific.",
  // Audit of 13 November 2026: "works its way west, river by river, to the Pacific" was printed for Phoenix, Tucson and Las
  // Vegas. The Colorado's basin ultimately discharges into the Gulf of California (USGS water resources region 15, as
  // quoted at https://en.wikipedia.org/wiki/Water_resource_region, read 13 November 2026), but "the Colorado is so
  // siphoned and stalled by canals and dams that only a trickle of its water ever reaches the sea", and most of it is
  // taken "primarily to grow feed for livestock" (KJZZ, 29 March 2024,
  // https://kjzz.org/content/1875569/colorado-river-rarely-reaches-sea-heres-why, read 13 November 2026).
  "Gulf of California":
    "This water is in the Colorado River's basin, which runs to the Gulf of California. Canals and dams take so much of the Colorado, most of it for farms, that only a trickle now reaches the sea.",
  // Orlando (Kissimmee unit 03090101). Water flows into Lake Okeechobee mainly from the Kissimmee River, and "outflows are
  // directed through control gates to canals that flow to tidal rivers, such as the Caloosahatchee and St. Lucie rivers
  // and estuaries" (Lake Okeechobee, Water Atlas, USF Water Institute,
  // https://chnep.wateratlas.usf.edu/waterbodies/lakes/1002667/lake-okeechobee, read 13 November 2026; the Kissimmee runs
  // between Lakes Kissimmee and Okeechobee, SFWMD, https://sfwmd.gov/our-work/kissimmee-river). The Caloosahatchee
  // empties into the Gulf of Mexico (USGS, above); the St. Lucie reaches the Atlantic at St. Lucie Inlet (USGS subregion
  // 0309 runs "from St. Lucie Inlet to and including the Caloosahatchee River Basin",
  // https://water.usgs.gov/GIS/huc_name.html, read 13 November 2026).
  "Gulf of Mexico and Atlantic Ocean":
    "This water reaches Lake Okeechobee. Gates let water out of the lake into canals to the Caloosahatchee, which runs to the Gulf of Mexico, and to the St. Lucie, which runs to the Atlantic.",
  "Hudson Bay": "Water from here flows north, not south, to Hudson Bay, a cold inland sea that is frozen over for much of the year.",
  "Arctic Ocean": "Water from here flows north, to the Arctic Ocean.",
};

/**
 * The steps and the footnote of the watershed block on /ground/<town>. The `ws:v1` data is read from the cache; the code
 * that wrote it is not in this repository, so its labels are fixed here. Audit, 10 November 2026:
 * - "Drains to: Atlantic Ocean Seaboard" (and "Gulf of Mexico Seaboard"): a seaboard is a drainage region, the coastal
 *   basins that each run straight to the sea, not a water the rain drains to. It is labelled as a region.
 * - Richmond's basin was printed as "James-Chesapeake Bay" over "Basin 020802 (USGS hydrologic unit)", but USGS names
 *   unit 020802 "James". A trailing full stop in a stored name is dropped.
 * Audit, 11 November 2026: the USGS name was looked up by the stored code, and the footnote called it the dataset's, so a
 * code wrong at the point (Pittsburgh, Brownsville) looked checked. Only a code queried at the town's point
 * (`verifiedWatershed`) is called the dataset's; any other is said to be unchecked.
 */
export function watershedView(ws: Watershed): { steps: [string, string][]; note: string } {
  const steps: [string, string][] = [["Sub-basin", ws.basin.replace(/[.\s]+$/, "")]];
  if (ws.river) steps.push(["Drains to", ws.river]);
  if (ws.system && ws.system !== ws.ocean) steps.push([/seaboard/i.test(ws.system) ? "Drainage region" : "Drains to", ws.system]);
  steps.push(["Outflow", ws.ocean]);
  const note =
    ws.country === "CAN"
      ? ws.officialName
        ? `Sub-drainage area ${ws.code}, named as in Statistics Canada's Standard Drainage Area Classification. The code is the drainage map's own, not checked at this point.`
        : `Basin ${ws.code} (Canadian sub-drainage area). The name is the drainage map's own, not checked against Statistics Canada's classification.`
      : ws.verified
        ? `USGS hydrologic unit ${ws.code}, as the USGS Watershed Boundary Dataset gives it for this point.`
        : `Basin code ${ws.code}. The code and the name are the drainage map's own, not checked against the USGS Watershed Boundary Dataset at this point.`;
  return { steps, note };
}

/**
 * The Mississippi's own line: the largest drainage in North America, and the summer dead zone its runoff feeds. Audit,
 * 11 November 2026: "travels south for thousands of kilometres to the Gulf" was printed for every town on the system,
 * from Bozeman to New Orleans, and was not measured for any of them (Little Rock's river path is nearer one thousand
 * kilometres). The distance is gone; the line says only where the water goes.
 */
const MISSISSIPPI_TEXT =
  "This water joins the Mississippi, the largest drainage in North America, and travels with it to the Gulf. What runs off the fields upstream arrives there too, which is why a low-oxygen dead zone forms off Louisiana each summer.";

/** The line for a watershed: the Mississippi's where the system or river is the Mississippi's, else the ocean's. */
export function oceanText(ws: Pick<Watershed, "ocean" | "system" | "river">): string | null {
  if (/mississippi|missouri|ohio river|arkansas|red river of the south/i.test(`${ws.system} ${ws.river ?? ""}`)) return MISSISSIPPI_TEXT;
  return OCEAN_TEXT[ws.ocean] ?? null;
}

/** What each kind of named water is, for the nearby-waters list. */
export const WATER_KIND_TEXT: Record<string, string> = {
  lake: "Still water that layers in summer: warm at the top, cold below, with a sharp boundary between. Fish sit at the depth that suits them and move as that boundary does.",
  stream:
    "Small, cold, and shaded by whatever grows over it. Most of what lives here eats insects that fall in from the trees, so a stream through woodland is a richer place than the same stream through a field.",
  river:
    "Moving water sorts itself into riffles, runs and pools, and everything in it lives where the current brings food without costing more energy than the food is worth. Learn to read the seams and you have learned the river.",
  reservoir:
    "A drowned valley on a schedule someone else sets. Levels swing with demand rather than weather, the shoreline is young and unvegetated, and there is often a flooded forest and an old road bed down there holding fish.",
};
