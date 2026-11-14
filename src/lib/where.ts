/**
 * Where a piece of region prose holds, and how a town reads it.
 *
 * Region prose (src/lib/ecoregions.jsx landscape lines, the day stories in
 * src/data/day-stories.ts) is written for a whole region. Printed under a
 * town's name it reads as the town's own fact, so the audit of 10 November
 * 2026 found the Bay of Fundy at Halifax, the Chesapeake at Boston, sunrise
 * "out of the sea" at Philadelphia, barrier islands and the gopher tortoise at
 * Atlanta, and summer nights and the daily thunderstorm in November. A piece
 * of prose now carries the conditions under which it is true (`Where`), and a
 * town gets only the pieces whose conditions all hold there (`PlaceFacts`,
 * worked out on the server by src/lib/place-scope.ts). Nothing is added: a
 * piece that does not hold is dropped.
 *
 * Pure and light (no data files), so it may be bundled for the browser with
 * src/data/day-stories.ts.
 */

/** Meteorological seasons: March to May is spring, June to August summer, September to November autumn, December
 * to February winter in the northern hemisphere (NOAA NCEI, "Meteorological Versus Astronomical Seasons",
 * https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons, read 11 Nov 2026); six months on in the
 * southern hemisphere. */
export type Season = "spring" | "summer" | "autumn" | "winter";

export function seasonOf(month: number, south = false): Season {
  const m = south ? ((month + 5) % 12) + 1 : month;
  return m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter";
}

/** The conditions under which a piece of prose holds. All given conditions must hold. */
export type Where = {
  /** Within 25 km of a Great Lakes shore (src/lib/great-lakes), or (false) not. */
  lake?: boolean;
  /** Inside the town's leaf-on window, its growing season (src/lib/leaf-on), or (false) outside it. */
  leaf?: boolean;
  /** "on": the open sea within about 10 km; "near": within about 30 km (src/lib/water-setting `coast`); false: neither. */
  coast?: "on" | "near" | false;
  /** Tidal water at the town: a tidal reach (water-setting TIDAL_REACHES) or the open sea within about 10 km, outside the microtidal seas. */
  tidal?: boolean;
  /** Salt water at the town: the open sea within about 30 km, or an estuary where river and sea water mix. */
  salt?: boolean;
  /** Within the reach of a named water or range (src/data/scope-places NEAR). */
  near?: string;
  /** Inside an area (src/lib/place-scope AREAS), or outside one. */
  area?: string;
  outside?: string;
  /** A big lake (Natural Earth, water-setting `bigLake`) at the town, or (false) none. */
  bigLake?: boolean;
  /** The town's big river (water-setting `bigRiver`) is this one. */
  river?: string;
  /** This fish has been recorded near the town, with records in the current month (src/lib/fish-presence). */
  fish?: string;
  /** The town's local date falls in one of these seasons. */
  season?: Season | Season[];
  /** The town's local month is one of these (northern-hemisphere months, six months on south of the equator). */
  months?: number[];
  /** A crop is in its sowing window at the town today (src/lib/soil-sowing), or (false) none is. */
  sowing?: boolean;
  /**
   * The town's state, province or region (its `admin1`, "Louisiana"). Audit of 10 November 2026: a Louisiana figure
   * (the coast lost every hour and a half) was printed at Houston and Brownsville, in Texas.
   */
  admin1?: string;
  /**
   * Frost on fewer than FEW_FROST_NIGHTS nights in an average year at the town's own stations (climate
   * `frostDaysPerYear`), or (false) on that many or more. Audit of 10 November 2026: "nearly frost-free" was printed at
   * Memphis (53 frost nights a year) and Little Rock (45).
   */
  fewFrosts?: boolean;
  /**
   * The fishing page lists this fish, in season today, in one of these kinds of water at the town (src/lib/fishing-waters
   * `fishByWater` sections: "sea", "estuary", "rivers", "lakes"). Audit of 11 November 2026: walleye "on the shoals and
   * weed edges in two to four metres" at towns whose page lists walleye only in rivers; striped bass "through the tide
   * change" at Little Rock, on a dammed river far above tidewater.
   */
  fishIn?: { fish: string; waters: string[] };
  /**
   * The town's average daily high this month (its own normals, climate `monthlyMeanMax`) is at least this, °C. Audit of
   * 13 November 2026: lizards on the rock, snakes on the warm sand and bats leaving the caves were gated on "spring,
   * summer and autumn", which let them print at Boise (November high 10 °C) and Albuquerque (15 °C) on 13 November.
   * A story that describes warmth is gated on the town's own month, not a named season (REPTILE_HIGH_C).
   */
  highAtLeast?: number;
  /** The town's average precipitation this month (climate `monthlyRainMm`) is under this many mm. */
  rainBelow?: number;
};

/**
 * Reptiles about: a month whose average daily high is at least this. A working rule, like FEW_FROST_NIGHTS: Arizona
 * Game and Fish says "Rattlesnakes are most active from March through October in desert areas"
 * (https://www.azgfd.com/2026/02/27/above-average-temps-could-bring-out-rattlesnakes/, read 13 Nov 2026), and the
 * coolest of those months at the site's two Arizona desert towns is Tucson's March, an average high of 23.4 °C (Phoenix
 * 24.6 °C; src/data/place-normals.json). Joshua Tree: "during winter ... most lizards hibernate"
 * (https://www.nps.gov/jotr/learn/nature/lizards.htm, read 13 Nov 2026). So Boise has reptiles out June to September,
 * Albuquerque May to September, Las Vegas April to October.
 */
export const REPTILE_HIGH_C = 23;

/**
 * "Nearly frost-free": frost on fewer than this many nights in an average year at the town's stations. A working rule,
 * like NEAR_GREAT_LAKE_KM: the Gulf Coast towns measure 1 (Brownsville), 4.5 (Houston), 6.5 (New Orleans), 45 (Little
 * Rock) and 53 (Memphis) frost nights a year (src/data/place-normals.json).
 */
export const FEW_FROST_NIGHTS = 10;

/**
 * What a town is, for the conditions above. A fact left out is unknown, and a piece that depends on it is dropped
 * (the safe side); `lake` and `leaf` are always known.
 */
export type PlaceFacts = {
  lake: boolean;
  leaf: boolean;
  coast?: "on" | "near" | null;
  tidal?: boolean;
  salt?: boolean;
  near?: string[];
  areas?: string[];
  bigLake?: boolean;
  bigRiver?: string | null;
  /** Fish recorded near the town with records in the current month. */
  fishNow?: string[];
  month?: number;
  south?: boolean;
  sowing?: boolean;
  /** The sun's noon height at the summer and the winter solstice here, in whole degrees (`{noon}`, `{winterNoon}` in text). */
  noon?: number;
  winterNoon?: number;
  admin1?: string;
  /** Frost nights in an average year at the town's stations (climate `frostDaysPerYear`). */
  frostNights?: number;
  /** For each fish the fishing page lists in season today, the kinds of water it is listed in. */
  fishWaters?: Record<string, string[]>;
  /** The town's own normals for its local month: average daily high and low (°C) and precipitation (mm). */
  monthHigh?: number;
  monthLow?: number;
  monthRain?: number;
};

const has = <T>(xs: T[] | undefined, x: T) => !!xs && xs.includes(x);

/** Whether every condition of `w` holds at a town with facts `f`. */
export function holds(w: Where, f: PlaceFacts): boolean {
  if (w.lake !== undefined && w.lake !== f.lake) return false;
  if (w.leaf !== undefined && w.leaf !== f.leaf) return false;
  if (w.coast !== undefined) {
    if (f.coast === undefined) return false;
    if (w.coast === "on" && f.coast !== "on") return false;
    if (w.coast === "near" && f.coast == null) return false;
    if (w.coast === false && f.coast != null) return false;
  }
  if (w.tidal !== undefined && (f.tidal === undefined || f.tidal !== w.tidal)) return false;
  if (w.salt !== undefined && (f.salt === undefined || f.salt !== w.salt)) return false;
  if (w.near !== undefined && !has(f.near, w.near)) return false;
  if (w.area !== undefined && !has(f.areas, w.area)) return false;
  if (w.outside !== undefined && (f.areas === undefined || f.areas.includes(w.outside))) return false;
  if (w.bigLake !== undefined && (f.bigLake === undefined || f.bigLake !== w.bigLake)) return false;
  if (w.river !== undefined && f.bigRiver !== w.river) return false;
  if (w.fish !== undefined && !has(f.fishNow, w.fish)) return false;
  if (w.season !== undefined) {
    if (f.month === undefined) return false;
    const s = seasonOf(f.month, f.south);
    if (!(Array.isArray(w.season) ? w.season : [w.season]).includes(s)) return false;
  }
  if (w.months !== undefined) {
    if (f.month === undefined) return false;
    const m = f.south ? ((f.month + 5) % 12) + 1 : f.month;
    if (!w.months.includes(m)) return false;
  }
  if (w.sowing !== undefined && (f.sowing === undefined || f.sowing !== w.sowing)) return false;
  if (w.admin1 !== undefined && f.admin1 !== w.admin1) return false;
  if (w.fewFrosts !== undefined && (f.frostNights === undefined || f.frostNights < FEW_FROST_NIGHTS !== w.fewFrosts)) return false;
  if (w.fishIn !== undefined && !(f.fishWaters?.[w.fishIn.fish] ?? []).some((x) => w.fishIn!.waters.includes(x))) return false;
  if (w.highAtLeast !== undefined && (f.monthHigh === undefined || f.monthHigh < w.highAtLeast)) return false;
  if (w.rainBelow !== undefined && (f.monthRain === undefined || f.monthRain >= w.rainBelow)) return false;
  return true;
}

/** A piece of prose: plain text (holds everywhere in the region) or text with the conditions under which it holds. */
export type Piece = string | ({ t: string } & Where);

/**
 * The town's own figures in a piece ("near {noon}°"); null when one is not known, and the piece is then dropped.
 * `{dayRange}` is this month's average daily high less its average low, in whole degrees (audit of 13 November 2026:
 * the desert dusk's "Ten or fifteen degrees in three hours" was more than the whole day's range at Boise, 8 to 16 °C).
 */
export function fillTokens(t: string, f: PlaceFacts): string | null {
  let ok = true;
  const range = f.monthHigh !== undefined && f.monthLow !== undefined ? Math.round(f.monthHigh - f.monthLow) : undefined;
  const out = t.replace(/\{(noon|winterNoon|dayRange)\}/g, (_, k: "noon" | "winterNoon" | "dayRange") => {
    const v = k === "dayRange" ? range : f[k];
    if (v === undefined) ok = false;
    return String(v);
  });
  return ok ? out : null;
}

/** The text of a piece at a town, or null when it does not hold there. */
export function pieceAt(p: Piece, f: PlaceFacts): string | null {
  if (typeof p === "string") return fillTokens(p, f);
  return holds(p, f) ? fillTokens(p.t, f) : null;
}

/**
 * Pieces joined end to end (spaces and punctuation sit inside the pieces), keeping those that hold; null when nothing
 * is left.
 */
export function piecesText(text: string | Piece[] | null | undefined, f: PlaceFacts): string | null {
  if (text == null) return null;
  const parts = typeof text === "string" ? [text] : text;
  const out = parts.map((p) => pieceAt(p, f) ?? "").join("").trim();
  return out || null;
}

/**
 * A list sentence ("Mixed Acadian forest, rocky headlands, salt marshes, bogs and the Bay of Fundy tides."): the items
 * that hold, joined with commas and `last` (" and " unless the region's own sentence uses another) before the last,
 * capitalised, with a full stop.
 */
export function listText(items: Piece[], f: PlaceFacts, last = " and "): string {
  const xs = items.map((p) => pieceAt(p, f)).filter((x): x is string => !!x);
  if (!xs.length) return "";
  const joined = xs.length === 1 ? xs[0] : `${xs.slice(0, -1).join(", ")}${xs.length === 2 && last === ", and " ? " and " : last}${xs[xs.length - 1]}`;
  return `${joined.charAt(0).toUpperCase()}${joined.slice(1)}.`;
}
