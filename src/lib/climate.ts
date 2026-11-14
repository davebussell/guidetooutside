/**
 * Climate normals for a place: ten years of ERA5 reanalysis (Open-Meteo's
 * archive) read into monthly means, precipitation (rain and melted snow: the
 * archive's precipitation_sum and GHCN-Daily's PRCP are both totals, not rainfall
 * alone), a USDA-equivalent hardiness zone and
 * frost dates (src/lib/frost). Where a GHCN-Daily station normal lies within
 * 15 km (src/data/place-rain.json) its 1991–2020 monthly precipitation replaces the
 * reanalysis months, which can read 15–25 % off the station record on coasts
 * and in deserts (Phoenix +67 %, Cape Town +22 %, Denver +17 %, Lagos −19 %
 * against the NWS, SAWS and NiMet normals in the October 2026 audit).
 *
 * Pre-built towns read their stored record (src/lib/climate-fallback). Any
 * other place is read once per quarter-degree cell and cached for over a year
 * under `clim:v4:<lat>:<lon>`; when the archive cannot be read, the nearest
 * pre-built town within 50 km stands in, and failing that the place has no
 * climate record yet (the pages say the record "is still being read").
 */
import { cacheGet, cacheSet } from "./cache";
import { nearestNormals, placeNormals, stationRain, withEra5Zone, zoneFromExtremeMin } from "./climate-fallback";
import { gridFrost, normalsFrost, stationFrost, type DailyMin } from "./frost";
import type { Climate, Place } from "./types";
import type { ZonedClimate } from "./zone-label";

export { doyToLabel, dateToDoy, zoneFromExtremeMin } from "./climate-fallback";
export { weatherLabel, getForecast } from "./forecast";

const TTL = 400 * 24 * 3600;
const MISS_TTL = 3600;
const quarter = (x: number) => (Math.round(x * 4) / 4).toFixed(2);
export const climateKey = (lat: number, lon: number) => `clim:v4:${quarter(lat)}:${quarter(lon)}`;

type Archive = {
  elevation?: number;
  daily?: { time: string[]; temperature_2m_max: (number | null)[]; temperature_2m_min: (number | null)[]; precipitation_sum: (number | null)[] };
};

const round1 = (x: number) => Math.round(x * 10) / 10;

/** Read ten years of daily ERA5 for a point into a climate record. */
export async function readClimate(lat: number, lon: number): Promise<ZonedClimate | null> {
  const south = lat < 0;
  const endYear = new Date().getUTCFullYear() - 1;
  const startYear = endYear - 9;
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", lat.toFixed(4));
  url.searchParams.set("longitude", lon.toFixed(4));
  url.searchParams.set("start_date", `${startYear}-01-01`);
  url.searchParams.set("end_date", `${endYear}-12-31`);
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum");
  url.searchParams.set("timezone", "auto");
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`archive ${res.status}`);
  const j = (await res.json()) as Archive;
  const d = j.daily;
  if (!d || d.time.length < 365) return null;

  const sumMax = new Array(12).fill(0);
  const sumMin = new Array(12).fill(0);
  const n = new Array(12).fill(0);
  const rain = new Map<string, number>(); // "yyyy-mm" → total
  const days: DailyMin[] = [];
  // The year's extreme low: calendar years in the north (the USDA convention), July-to-June years in the south so the winter is not cut in two.
  const extremes = new Map<number, { min: number; days: number }>();
  d.time.forEach((t, i) => {
    const tmin = d.temperature_2m_min[i];
    const tmax = d.temperature_2m_max[i];
    const m = Number(t.slice(5, 7)) - 1;
    const y = Number(t.slice(0, 4));
    const p = d.precipitation_sum[i];
    if (p != null) rain.set(t.slice(0, 7), (rain.get(t.slice(0, 7)) ?? 0) + p);
    if (tmin == null) return;
    sumMin[m] += tmin;
    if (tmax != null) sumMax[m] += tmax;
    n[m] += 1;
    days.push({ date: t, tmin });
    const fy = south ? (m >= 6 ? y : y - 1) : y;
    const e = extremes.get(fy) ?? { min: Infinity, days: 0 };
    e.min = Math.min(e.min, tmin);
    e.days++;
    extremes.set(fy, e);
  });
  const full = [...extremes.values()].filter((e) => e.days >= 300);
  if (!full.length) return null;
  const meanMin = full.reduce((a, e) => a + e.min, 0) / full.length;
  const { zone, zoneNumber } = zoneFromExtremeMin(meanMin);
  const monthlyMeanMax = sumMax.map((s, i) => (n[i] ? round1(s / n[i]) : 0));
  const monthlyMeanMin = sumMin.map((s, i) => (n[i] ? round1(s / n[i]) : 0));
  const frost = stationFrost(lat, lon) ?? gridFrost(days, { monthlyMeanMax, monthlyMeanMin }, south);
  const years = endYear - startYear + 1;
  const gridRain = Array.from({ length: 12 }, (_, m) => {
    let total = 0;
    for (let y = startYear; y <= endYear; y++) total += rain.get(`${y}-${String(m + 1).padStart(2, "0")}`) ?? 0;
    return Math.round(total / years);
  });
  const station = stationRain(lat, lon);
  return {
    yearsSampled: full.length,
    meanAnnualExtremeMinC: round1(meanMin),
    zone,
    zoneNumber,
    lastSpringFrost: frost.lastSpringFrost,
    firstFallFrost: frost.firstFallFrost,
    lastSpringFrostDoy: frost.lastSpringFrostDoy,
    firstFallFrostDoy: frost.firstFallFrostDoy,
    ...(south ? { south: true } : {}),
    frostFreeDays: frost.frostFreeDays,
    frostSource: frost.frostSource,
    frostConfidence: frost.frostConfidence,
    frostSpreadDays: frost.frostSpreadDays ?? null,
    frostStations: frost.frostStations ?? null,
    ...(frost.frostStationKm != null ? { frostStationKm: frost.frostStationKm } : {}),
    ...(frost.frostDaysPerYear != null ? { frostDaysPerYear: frost.frostDaysPerYear } : {}),
    monthlyMeanMax,
    monthlyMeanMin,
    monthlyRainMm: station ? station.monthlyRainMm : gridRain,
    rainSource: station ? "station" : "grid",
    ...(station ? { rainStation: station.station, rainStationKm: Math.round(station.distanceKm * 10) / 10 } : {}),
    elevationM: j.elevation != null ? Math.round(j.elevation) : undefined,
    zoneSource: "estimated",
    // A point with no stored town has no map lookup: its zone is the USDA rule on this ten-year ERA5 coldest night, and says so.
    zoneSystem: "usda-era5",
    zoneMinC: round1(meanMin),
    estimated: true,
  };
}

/**
 * A climate record cached before October 2026 carries frost dates read from
 * the grid at a flat 4.5 °C, sometimes one-sided ("Jan 9 – Rare"), and no
 * frost or rain provenance. Rather than re-read the archive for every such
 * cell, it is brought up to date from what it holds: station frost and rain
 * where a pre-built town's stations stand for the point, else the frost
 * dates modelled from its own monthly means (src/lib/frost `normalsFrost`),
 * which are both-or-neither and calibrated against stations.
 */
function upgraded(c: Climate, lat: number, lon: number): Climate {
  if (c.frostConfidence) return c;
  const south = lat < 0;
  const frost = stationFrost(lat, lon) ?? (c.frostSource === "stations" ? null : normalsFrost(c, south));
  const station = stationRain(lat, lon);
  return {
    ...c,
    ...(frost
      ? {
          lastSpringFrost: frost.lastSpringFrost,
          firstFallFrost: frost.firstFallFrost,
          lastSpringFrostDoy: frost.lastSpringFrostDoy,
          firstFallFrostDoy: frost.firstFallFrostDoy,
          frostFreeDays: frost.frostFreeDays,
          frostSource: frost.frostSource,
          frostConfidence: frost.frostConfidence,
          frostSpreadDays: frost.frostSpreadDays ?? null,
          frostStations: frost.frostStations ?? null,
          ...(frost.frostStationKm != null ? { frostStationKm: frost.frostStationKm } : {}),
          ...(frost.frostDaysPerYear != null ? { frostDaysPerYear: frost.frostDaysPerYear } : {}),
        }
      : { frostConfidence: "medium" as const }),
    ...(station
      ? { monthlyRainMm: station.monthlyRainMm, rainSource: "station" as const, rainStation: station.station, rainStationKm: Math.round(station.distanceKm * 10) / 10 }
      : { rainSource: (c.rainSource ?? "grid") as "grid" | "station" }),
  };
}

/** The climate record for a place, or null while it cannot be read. */
export async function getClimate(place: Pick<Place, "slug" | "lat" | "lon">): Promise<Climate | null> {
  const stored = placeNormals(place);
  if (stored) return stored;
  const key = climateKey(place.lat, place.lon);
  const hit = await cacheGet<{ value: Climate; fetchedAt: number }>(key);
  if (hit?.value) return withEra5Zone(upgraded(hit.value, place.lat, place.lon));
  if (await cacheGet<boolean>(`${key}:miss`)) return nearestNormals(place.lat, place.lon);
  try {
    const climate = await readClimate(place.lat, place.lon);
    if (climate) {
      await cacheSet(key, { value: climate, fetchedAt: Date.now() }, TTL);
      return climate;
    }
  } catch {
    /* the archive is busy or over its limit */
  }
  await cacheSet(`${key}:miss`, true, MISS_TTL);
  return nearestNormals(place.lat, place.lon);
}
