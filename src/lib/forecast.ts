/**
 * Current conditions and the seven-day forecast, from Open-Meteo.
 *
 * Read per request but cached ten minutes under `fc:v1:<lat>:<lon>` (a 0.05°
 * grid, about 5 km), with a three-day copy under `…:stale` that is served
 * when Open-Meteo is slow or refuses (its free tier has a daily limit), so a
 * place page never fails on the weather.
 */
import { cacheGet, cacheSet } from "./cache";
import type { DailyForecast, Forecast } from "./types";

const FRESH_SECONDS = 600;
const STALE_SECONDS = 3 * 24 * 3600;
const grid = (x: number) => (Math.round(x * 20) / 20).toFixed(2);
export const forecastKey = (lat: number, lon: number) => `fc:v1:${grid(lat)}:${grid(lon)}`;

type OpenMeteo = {
  timezone: string;
  current: { time: string; temperature_2m: number; weather_code: number; wind_speed_10m: number; relative_humidity_2m: number; pressure_msl?: number; cloud_cover?: number };
  hourly: { time: string[]; soil_temperature_6cm: (number | null)[]; pressure_msl: (number | null)[] };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: (number | null)[];
    wind_speed_10m_max: (number | null)[];
    sunrise: string[];
    sunset: string[];
    weather_code: (number | null)[];
  };
};

async function fetchForecast(lat: number, lon: number): Promise<Forecast> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat.toFixed(4));
  url.searchParams.set("longitude", lon.toFixed(4));
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset,weather_code");
  url.searchParams.set("hourly", "soil_temperature_6cm,pressure_msl");
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,pressure_msl,cloud_cover");
  url.searchParams.set("past_days", "1");
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`forecast ${res.status}`);
  const j = (await res.json()) as OpenMeteo;
  const d = j.daily;
  // past_days=1 puts yesterday first in the daily and hourly series.
  const today = d.time.findIndex((t) => t === j.current.time.slice(0, 10));
  const first = today >= 0 ? today : 1;
  const days: DailyForecast[] = d.time.slice(first, first + 7).map((date, k) => {
    const i = first + k;
    return {
      date,
      tMax: d.temperature_2m_max[i],
      tMin: d.temperature_2m_min[i],
      precip: d.precipitation_sum[i] ?? 0,
      windMax: d.wind_speed_10m_max[i] ?? 0,
      sunrise: d.sunrise[i],
      sunset: d.sunset[i],
      code: d.weather_code[i] ?? 0,
    };
  });
  // Today's mean soil temperature at 6 cm.
  const h = j.hourly;
  const start = h.time.findIndex((t) => t.startsWith(days[0]?.date ?? ""));
  const soil = h.soil_temperature_6cm.slice(Math.max(0, start), Math.max(0, start) + 24).filter((x): x is number => typeof x === "number");
  const soilTemp6cm = soil.length ? soil.reduce((a, b) => a + b, 0) / soil.length : null;
  // Pressure now and its change over the last twelve hours.
  const nowIdx = h.time.findIndex((t) => t > j.current.time) - 1;
  const pressure = j.current.pressure_msl ?? null;
  const before = nowIdx >= 12 ? h.pressure_msl[nowIdx - 12] : null;
  const pressureTrend = pressure != null && before != null ? Math.round((pressure - before) * 10) / 10 : null;
  return {
    timezone: j.timezone,
    current: { temp: j.current.temperature_2m, code: j.current.weather_code, wind: j.current.wind_speed_10m, humidity: j.current.relative_humidity_2m },
    soilTemp6cm,
    pressure,
    pressureTrend,
    cloudCover: j.current.cloud_cover ?? null,
    days,
  };
}

/** The forecast for a point: cached, live, or — when Open-Meteo is unavailable — the last good one from the past three days. */
export async function getForecast(lat: number, lon: number): Promise<Forecast> {
  const key = forecastKey(lat, lon);
  const hit = await cacheGet<Forecast>(key);
  if (hit?.days?.length) return hit;
  try {
    // One retry after a short pause: Open-Meteo's refusals (429) are mostly per-minute,
    // and a page with no cached copy would otherwise fail outright for whoever asked first.
    const fc = await fetchForecast(lat, lon).catch(async () => {
      await new Promise((r) => setTimeout(r, 1500));
      return fetchForecast(lat, lon);
    });
    if (!fc.days.length) throw new Error("forecast: no days");
    await Promise.all([cacheSet(key, fc, FRESH_SECONDS), cacheSet(`${key}:stale`, fc, STALE_SECONDS)]);
    return fc;
  } catch (e) {
    const stale = await cacheGet<Forecast>(`${key}:stale`);
    if (stale?.days?.length) return stale;
    throw e;
  }
}

/** Plain words for a WMO weather code. */
export function weatherLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorms";
}
