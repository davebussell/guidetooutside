/**
 * A place in two sentences: what kind of climate it has, what water it sits
 * on, and so what its garden year and its fishing turn on. The line a field
 * guide prints under the name of a place before anything else.
 *
 * RECOVERED 2026-10-08 (full file as of 2026-10-07).
 *
 * Audit of 10 November 2026 (C10): Moncton, Philadelphia, Washington, Baltimore and Savannah read "on the sea coast"
 * and "the open sea, from beach, rock and boat", and Richmond, 10–30 km from Natural Earth's coastline (the tidal
 * James), read the open sea too, because every place with a "sea" water group got that phrase. Now the phrase belongs
 * to a place on the open coast only ("on"); a place 10–30 km from it gets "the coast, 10 to 30 km away"; a place on a
 * tidal river or estuary arm (`water.tidal`) is said to be on that water. The overview's Water column is worded here
 * too (`waterTitle`, `waterLines`), so the column, the climate line and the fishing line say the same thing.
 *
 * Day 4 audit (13 November 2026): Tampa read "the open sea, from beach, rock and boat" on an enclosed bay; a bay reach
 * (water-setting TIDAL_REACHES `bay`) makes the town "A bayside place" on the bay. The radii now come from water-radii.ts,
 * so the restored client fishing page (GuideLoader.jsx) prints these same lines instead of its own "No named water is
 * mapped within 20 km; farm dams and ponds are the nearest fishing".
 *
 * Day 5 audit (14 November 2026): Seattle, Vancouver, Nanaimo and Victoria read "on the sea coast", "Sea coast", "The sea is
 * the main fishery", "the open sea, from beach, rock and boat" and "The open sea, within about 10 km: surf beaches…". Their
 * salt water is the Salish Sea (water-setting INLAND_SEAS: Puget Sound, the Strait of Georgia, the Strait of Juan de Fuca),
 * which meets the open Pacific only at the mouth of the Strait of Juan de Fuca. Where `water.inlandSea` is set, every line
 * names that water, with its source's words in the Water column, and none says the open sea, the open coast or surf.
 *
 * Day 5 audit, second pass (14 November 2026): the fix above did not reach a setting stored before 14 November, which has
 * no `inlandSea`, so Nanaimo, Vancouver, Victoria and Seattle still read "The open sea, within about 10 km: surf beaches".
 * A setting that lacks the field has it worked out here from the town's coordinates (inland-seas `withInlandSea`, the same
 * rule as waterSetting): placeProfile always, and waterLines where the caller passes the place.
 *
 * Day 3 audit (11 November 2026):
 *  - Pittsburgh read "the Allegheny and its feeder rivers" and "on the Allegheny": the town stands where the Allegheny and
 *    the Monongahela form the Ohio. A confluence (water-setting WATER_FIXES `confluence`) is named whole in every line.
 *  - Brownsville read "The open coast, 10 to 30 km away" and "the estuaries": its salt water is the Lower Laguna Madre and
 *    the ship channel, 10 to 30 km out, and the open Gulf beach is about 36 km away. A reach that is not at the town
 *    (TIDAL_REACHES `away`) is named with its distance and its source's words, and never as the water the town is on.
 *  - The named-rivers line repeated the great river ("The Rio Grande, one of the region's great rivers. Rivers: Rio
 *    Grande."); a named river that is one of the great rivers is not listed again.
 */

import type { LocalData } from "./types";
import type { WaterSetting } from "./water-setting";
import { lakeName, riverName } from "./water-names";
// The radii from their own module, not waters.ts (server-only), so the client fishing page can use waterLines (Day 4 audit).
import { WATER_RADII_KM } from "./water-radii";
import { climateZoneLabel } from "./zone-label";
// Client-safe (no water grid): the restored client fishing page uses waterLines too.
import { withInlandSea } from "./inland-seas";

const article = (w: string) => (/^[aeiou]/i.test(w) ? "an" : "a");
const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);

/**
 * "the Delaware River" → "the tidal Delaware River"; a name without "the" ("Lake Pontchartrain") is kept, and so is a water
 * that is not at the town (`away`: Brownsville's Lower Laguna Madre).
 */
export const tidalName = (t: NonNullable<WaterSetting["tidal"]>): string => (t.away || !/^the /i.test(t.water) ? t.water : t.water.replace(/^the /i, "the tidal "));

/** A tidal reach the town stands on (not one 10 to 30 km out). */
const atTown = (t: WaterSetting["tidal"] | undefined): t is NonNullable<WaterSetting["tidal"]> => !!t && !t.away;

const joinAnd = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** The great rivers of the town, as the grid and its fixes name them: one, or the rivers of a confluence and the one they form. */
export function bigRiverNames(w: Pick<WaterSetting, "bigRiver" | "confluence"> | null): string[] {
  if (w?.confluence) return [...w.confluence.rivers, ...(w.confluence.forms ? [w.confluence.forms] : [])];
  return w?.bigRiver ? [w.bigRiver] : [];
}

/** "Allegheny River", "the Allegheny" and "Allegheny" are one river: the key a named river and a great river share. */
export const riverKey = (name: string): string =>
  name
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/\s+river$/, "")
    .trim();

/** The named rivers that are not one of the great rivers already named. */
const otherRivers = (w: WaterSetting) => {
  const big = new Set(bigRiverNames(w).map(riverKey));
  return w.rivers.filter((x) => !big.has(riverKey(x.name)));
};

/** "the three rivers (the Allegheny, Monongahela and Ohio)". */
const confluencePhrase = (c: NonNullable<WaterSetting["confluence"]>): string => {
  const all = [...c.rivers, ...(c.forms ? [c.forms] : [])];
  return `the ${all.length === 2 ? "two" : all.length === 3 ? "three" : all.length} rivers (the ${joinAnd(all)})`;
};

/** The Water column's heading. */
export function waterTitle(w: WaterSetting | null): string {
  const away = !!w?.tidal?.away && !!w.tidal.bay;
  if (w?.coast === "on") return "A coastal place";
  // A bay the town stands on (Tampa Bay, Day 4 audit) is not a river.
  if (atTown(w?.tidal)) return w.tidal.bay ? "A bayside place" : "A tidal-river place";
  if (w?.bigLake) return "A lakeshore place";
  if (w?.bigRiver) return "A river place";
  if (w?.coast === "near") return "Near the coast";
  // A bay 10 to 30 km out (San Jose's South San Francisco Bay): near it, not on it.
  if (away) return "Near a bay";
  return "Inland water";
}

/**
 * The Water column's lines, in the order a reader meets the waters. When the map service did not answer, the column
 * says so and never says that no named water is mapped (audit, 10 November 2026: "No named water is mapped close by"
 * at Atlanta, Charlotte and Raleigh was a failed look-up, not an empty map).
 */
export function waterLines(w0: WaterSetting | null, at?: { lat: number; lon: number } | null): string[] {
  if (!w0) return [];
  // A setting serialised for the client page, or stored before a field existed, may lack a list: read it as empty; and,
  // with the place, an inland sea it lacks is worked out (Day 5 audit).
  const w1 = at ? withInlandSea(w0, at.lat, at.lon) : w0;
  const w: WaterSetting = { ...w1, rivers: w1.rivers ?? [], lakes: w1.lakes ?? [], streams: w1.streams ?? [], avoid: w1.avoid ?? [] };
  const join = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
  const out: string[] = [];
  const sea = w.inlandSea;
  if (sea && w.coast === "on") out.push(`${cap(sea.water)}, within about 10 km: ${sea.says}. Rocky shore, harbours and the water offshore.`);
  else if (sea && w.coast === "near") out.push(`${cap(sea.water)}, 10 to 30 km away: ${sea.says}.`);
  else if (w.coast === "on") out.push("The open sea, within about 10 km: surf beaches, rocky shore, harbours and the water offshore.");
  else if (w.coast === "near") out.push("The open coast, 10 to 30 km away.");
  if (w.tidal?.away) {
    // A reach 10 to 30 km out (Brownsville's lagoon): its distance and its source's words, not "at the town".
    out.push(`${cap(w.tidal.water)}, ${w.tidal.away}${w.tidal.says ? `: ${w.tidal.says}` : ""}.`);
  } else if (w.tidal) {
    const name = cap(w.tidal.water);
    // Each kind says only what the reach's source in water-setting.ts TIDAL_REACHES says.
    if (w.tidal.kind === "fresh") out.push(`${name} is tidal here, but its water is fresh: the salt water stays far downstream.`);
    else if (w.tidal.kind === "estuary") out.push(`${name}: tidal water at the town, part river and part sea.`);
    else out.push(`${name} is tidal here: the tide rises and falls at the town.`);
  } else if (w.estuary) out.push(`${cap(w.estuary)}: tidal water, half sea and half river.`);
  // The area is Natural Earth's polygon unless a fix gives its source (Day 5 audit: Rainy Lake's "1,162 km²" is the polygon's).
  if (w.bigLake) out.push(`${lakeName(w.bigLake.name)}, ${w.bigLake.km2.toLocaleString("en")} km² of open water ${w.bigLake.by ? `(${w.bigLake.by})` : "as Natural Earth's map outlines it"}.`);
  // The tidal line already names the river when the great river is the tidal one.
  if (w.confluence) out.push(`${cap(joinAnd(w.confluence.rivers.map(riverName)))} meet here${w.confluence.forms ? ` to form ${riverName(w.confluence.forms)}` : ""}.`);
  else if (w.bigRiver && !w.tidal?.water.includes(w.bigRiver)) out.push(`${cap(riverName(w.bigRiver))}, one of the region's great rivers.`);
  const rivers = otherRivers(w);
  if (rivers.length) out.push(`Rivers: ${join(rivers.slice(0, 4).map((x) => x.name))}.`);
  if (w.lakes.length) out.push(`Lakes and dams: ${join(w.lakes.slice(0, 4).map((x) => x.name))}.`);
  if (w.streams.length) out.push(`Streams: ${join(w.streams.slice(0, 3).map((x) => x.name))}${w.coldStreams ? " — a climate cool enough for trout streams, judged from air temperature and height" : ""}.`);
  if (w.namedWaters === "unavailable") out.push("The map service did not answer, so the named rivers and lakes near here are not listed yet.");
  else if (!w.rivers.length && !w.lakes.length && !w.streams.length) {
    if (w.avoid.length) out.push(`The named waters near here (${join(w.avoid.slice(0, 4).map((x) => x.name))}) are not fishing water.`);
    else if (w.namedWaters === "none" && !out.length)
      out.push(`No named river is mapped within ${WATER_RADII_KM.river} km, and no named lake within ${WATER_RADII_KM.lake} km or stream within ${WATER_RADII_KM.stream} km.`);
  }
  return out;
}

export type PlaceProfile = {
  /** "A Mediterranean climate of mild, wet winters and long, dry summers, on the sea coast." */
  setting: string;
  /** "The sea is the main fishery; the garden year turns on the winter rains." */
  turnsOn: string;
  /** The water, alone: "on the sea coast", "on the shore of Lake Ontario". */
  water: string;
  /** Short facts for a strip: "Mediterranean climate", "627 mm of precipitation a year", "Canadian (NRCan) zone 5b", "Atlantic coast". */
  facts: string[];
  /** "Fishing around Cape Town means the open sea from beach and rock, the estuaries, the rivers, and lakes and dams." */
  fishing: string;
};

export function placeProfile(d: LocalData): PlaceProfile {
  const r = d.regime;
  // A setting stored before 14 November 2026 has no inlandSea: work it out from the place (Day 5 audit).
  const w = d.water ? withInlandSea(d.water, d.place.lat, d.place.lon) : d.water;
  const c = d.climate;
  const water = !w
    ? ""
    : w.coast === "on" && w.inlandSea
      ? `on ${w.inlandSea.water}`
      : w.coast === "on"
      ? "on the sea coast"
      : atTown(w.tidal)
        ? `on ${tidalName(w.tidal)}`
        : w.bigLake
        ? `on the shore of ${lakeName(w.bigLake.name)}`
        : w.confluence
          ? `where ${joinAnd(w.confluence.rivers.map(riverName))} meet${w.confluence.forms ? ` to form ${riverName(w.confluence.forms)}` : ""}`
        : w.bigRiver
          ? `on ${riverName(w.bigRiver)}`
          : w.coast === "near"
            ? "within reach of the coast"
            : "inland";
  const climate = r ? `${article(r.name)} ${r.name.toLowerCase().replace(/^mediterranean/, "Mediterranean")} climate of ${r.short}` : "";
  const setting = [climate ? climate.charAt(0).toUpperCase() + climate.slice(1) : "", water].filter(Boolean).join(", ") + ".";

  const fishery = !w
    ? ""
    : w.coast === "on" && w.inlandSea
      ? `${cap(w.inlandSea.water)} and the waters around it hold the fishing`
      : w.coast === "on"
      ? "The sea is the main fishery"
      : atTown(w.tidal)
        ? `${cap(tidalName(w.tidal))} and the waters around it hold the fishing`
        : w.bigLake
        ? `${lakeName(w.bigLake.name)} is the main fishery`
        : w.confluence
          ? `${cap(confluencePhrase(w.confluence))} hold the fishing`
        : w.bigRiver
          ? `${riverName(w.bigRiver).replace(/^the /, "The ")} and its backwaters hold the fishing`
          : w.coast === "near"
            ? "The coast is a short drive; rivers and dams are nearer"
            : "Rivers, lakes and dams hold the fishing";
  const garden = r
    ? r.frostLed && c && c.lastSpringFrost !== "Rare"
      ? `the frost dates frame the garden year (last spring frost about ${c.lastSpringFrost}, first autumn frost about ${c.firstFallFrost})`
      : r.name === "Mediterranean" && c && c.lastSpringFrost !== "Rare" && c.firstFallFrost !== "Rare"
        ? // Day 5 audit (14 November 2026): Portland and Seattle read "the garden year turns on the winter rains" with 32
          // and more freezing nights a year; where frost is dated, the dry summer and the frost dates both bound the year.
          `the dry summer and the frost dates bound the garden year (last spring frost about ${c.lastSpringFrost}, first autumn frost about ${c.firstFallFrost})`
        : `the garden year turns on ${r.runsOn}`
    : "";
  const turnsOn = [fishery, garden].filter(Boolean).join("; ") + (fishery || garden ? "." : "");

  const facts: string[] = [];
  if (r) facts.push(`${r.name} climate`);
  if (r?.annualRainMm != null) facts.push(`${r.annualRainMm.toLocaleString("en")} mm of precipitation a year`);
  if (w?.coast === "on" && w.inlandSea) facts.push(cap(w.inlandSea.water));
  else if (w?.coast === "on") facts.push("Sea coast");
  else if (atTown(w?.tidal)) facts.push(cap(tidalName(w.tidal)));
  else if (w?.bigLake) facts.push(lakeName(w.bigLake.name));
  else if (w?.confluence) facts.push(cap(joinAnd(bigRiverNames(w).map(riverName))));
  else if (w?.bigRiver) facts.push(riverName(w.bigRiver).replace(/^the /, "The "));
  if (c?.elevationM != null && c.elevationM > 400) facts.push(`${c.elevationM.toLocaleString("en")} m above sea level`);
  if (r?.frostLed && c) facts.push(climateZoneLabel(c));
  const g = w?.groups ?? [];
  const parts: string[] = [];
  // The open sea "from beach, rock and boat" only where the open coast is within about 10 km.
  // An inland sea (the Salish Sea, Day 5 audit) is named, from shore and boat: no open sea, no beach surf.
  if (g.includes("sea"))
    parts.push(
      w?.inlandSea
        ? w.coast === "on"
          ? `the salt water of ${w.inlandSea.water}, from shore and boat`
          : `${w.inlandSea.water}, 10 to 30 km away`
        : w?.coast === "on"
          ? "the open sea, from beach, rock and boat"
          : "the coast, 10 to 30 km away",
    );
  if (g.includes("estuary"))
    parts.push(w?.tidal?.kind === "estuary" ? (w.tidal.away ? `${tidalName(w.tidal)}, ${w.tidal.away}` : tidalName(w.tidal)) : (w?.estuary ?? "the estuaries"));
  // The great river is the tidal one: name it once ("the tidal Savannah River and the rivers that feed it").
  const same = !!(atTown(w?.tidal) && w?.bigRiver && w.tidal!.water.includes(w.bigRiver));
  if (g.includes("rivers"))
    parts.push(
      same && w!.tidal!.kind !== "estuary"
        ? `${tidalName(w!.tidal!)} and its feeder rivers`
        : same
          ? "the rivers that feed it"
          : w?.confluence
            ? confluencePhrase(w.confluence)
          : w?.bigRiver
            ? `${riverName(w.bigRiver)} and its feeder rivers`
            : w?.coldStreams
              ? "cold streams and rivers"
              : "the rivers",
    );
  if (g.includes("lakes")) parts.push(w?.bigLake ? `${lakeName(w.bigLake.name)} and the lakes and dams around it` : "lakes, dams and ponds");
  const list = parts.length <= 1 ? parts.join("") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  const fishing = parts.length ? `Fishing around ${d.place.name} means ${list}. Each holds its own fish.` : "";
  return { setting, turnsOn, water, facts, fishing };
}
