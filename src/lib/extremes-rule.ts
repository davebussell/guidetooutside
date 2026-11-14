/**
 * Whether a weather station's daily record can stand for a town's cold nights, hot days, coldest night of an average
 * year and record extremes (src/data/place-extremes.json, src/data/place-zones-usda.json). Pure: the callers pass the
 * station and the town's own stations, so the build scripts, the pages and the checks all read the same rule.
 *
 * The Day 5 audit (14 November 2026) found three towns counted from a station that is not the town's:
 *  - Nanaimo from Entrance Island, a lighthouse 10.5 km offshore, whose −2.6 °C coldest night of an average year put the
 *    town in USDA-equivalent zone 9b (the sea keeps an island's nights mild);
 *  - Whitehorse from Mayo Road, 18.6 km out in a colder valley (−46.2 °C against the town's −33.8 °C on the grid), though
 *    its frost dates and precipitation come from Whitehorse A, 1.5 km away;
 *  - Kingston from Hartington IHD, 24.9 km inland, though its own station (Kingston Pumping Station) is 8 km away.
 * The build took the nearest station in the frost list whose record passed the completeness rule, whatever it was.
 *
 * The rule (the town's "own" stations are the frost and precipitation stations of src/data/place-frost.json and
 * src/data/place-rain.json):
 *  1. An offshore station (an island, lighthouse or rock in its name) does not stand for a town on the mainland: one whose
 *     own stations are not offshore too.
 *  2. A station beyond STATION_RADIUS_KM (20 km, the radius the frost stations are gathered within) does not stand for a
 *     town that has a station of its own inside the town ring (15 km): a far station's record is another place's,
 *     however complete. (Kingston, London and Halifax: their own stations are 7–10 km away.)
 *  3. A station beyond the town ring must read like the town: its mean annual extreme minimum within EXTREME_MIN_AGREE_C
 *     (4 °C, the stored stations' own 5–95 % agreement with the grid; scripts/build-place-extremes.ts) of the town's ERA5
 *     one. This test used to start at 25 km; Mayo Road, at 18.6 km and 12.4 °C colder, passed under it.
 * A town whose only station fails is left without counts, and its pages say no station that can stand for it has 20
 * complete years; it is never given another place's nights.
 */
export const TOWN_RING_KM = 15;
export const STATION_RADIUS_KM = 20;
export const EXTREME_MIN_AGREE_C = 4;

/** An island, lighthouse or rock station: the sea keeps its nights milder than the mainland's. */
export const OFFSHORE = /\b(ISLAND|ISLE|LIGHT|LIGHTHOUSE|LIGHTSTATION|ROCKS?|BUOY)\b/i;

export type TownStation = { name: string; km: number };

/** Null when the station stands for the town, else the reason in plain words. */
export function extremesStationRejected(station: TownStation, stationMinC: number | null | undefined, own: TownStation[], townGridMinC: number | null | undefined): string | null {
  const ownLand = own.filter((s) => !OFFSHORE.test(s.name));
  if (OFFSHORE.test(station.name) && ownLand.length) return `${station.name} is offshore, and the town's own stations are on land`;
  if (station.km > STATION_RADIUS_KM && own.some((s) => s.km <= TOWN_RING_KM)) return `${station.name} is ${station.km} km away, and the town has a station of its own within ${TOWN_RING_KM} km`;
  if (station.km > TOWN_RING_KM && stationMinC != null && townGridMinC != null && Math.abs(stationMinC - townGridMinC) > EXTREME_MIN_AGREE_C)
    return `${station.name} is ${station.km} km away and its coldest night of an average year (${stationMinC} °C) is more than ${EXTREME_MIN_AGREE_C} °C from the town's (${townGridMinC} °C)`;
  return null;
}
