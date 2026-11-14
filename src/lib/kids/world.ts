/**
 * The world The Big Outside is drawn in: the season, the sky and the moon over
 * the family's house, read on the server for the book's home screen and every
 * story and game. With no remembered place it is the season and moon at the
 * site's home (eastern Canada) and a "partly" sky, which is what the live book
 * shows a first-time visitor.
 */
import { getMoon } from "@/lib/moon";
import { solarPosition } from "@/lib/daypart";
import { sunTimes } from "@/lib/sun";
import { timeFromSun } from "@/lib/kids/time-words";
import { cacheGet } from "@/lib/cache";
import { cookiePlace, shortName } from "@/lib/kids/here";
import { placeFromSlug } from "@/lib/geocode";
import type { Forecast } from "@/lib/types";

export type Season = "spring" | "summer" | "autumn" | "winter";
export type Sky = "clear" | "partly" | "cloudy" | "fog" | "rain" | "storm" | "snow";
export type RainStep = { name: string; kind: "creek" | "river" | "lake" | "water" | "sea" | "inland"; note?: string };
export type Clock = { time: "dawn" | "day" | "dusk" | "night"; sunArc: number | null; sunHeight: number };

export type World = {
  placeName: string | null;
  slug: string | null;
  lat: number | null;
  lon: number | null;
  tz: string | null;
  month: number;
  season: Season;
  sky: Sky;
  tempC: number | null;
  windKmh: number | null;
  countryCode: string | null;
  /** The week's forecast, today first. */
  week: { date: string; sky: Sky }[] | null;
  moonAge: number;
  moonIllumination: number;
  nightsToFull: number;
  /** Where rain falling on the house ends up: the rivers in order, then the sea (or an inland lake). */
  rainPath: RainStep[] | null;
  nearRiver: string | null;
  clock: Clock | null;
};

/** The site's home time zone, for "this month" when no place is known. */
const HOME_TZ = "America/Toronto";

const SEASON_OF: Season[] = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "autumn", "autumn", "autumn", "winter"];

/** The season a month falls in, half a year on south of the equator. */
export function seasonOf(month: number, lat?: number | null): Season {
  const m = lat != null && lat < 0 ? ((month + 5) % 12) + 1 : month;
  return SEASON_OF[m - 1];
}

/** WMO weather code → what a child would say the sky is doing. */
export function skyOf(code: number | null | undefined): Sky {
  if (code == null) return "partly";
  if (code <= 1) return "clear";
  if (code === 2) return "partly";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 95) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  return "cloudy";
}

/** Whole days from one ISO date (or instant) to another. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to.slice(0, 10)}T00:00:00Z`) - Date.parse(`${from.slice(0, 10)}T00:00:00Z`)) / 864e5);
}

/** The month (1–12) today in a time zone. */
export function monthIn(timeZone: string | null, now = new Date()): number {
  try {
    return Number(new Intl.DateTimeFormat("en-CA", { timeZone: timeZone ?? HOME_TZ, month: "numeric" }).format(now));
  } catch {
    return now.getUTCMonth() + 1;
  }
}

/** Where the sun is over a place right now, as the book's clock reads it. */
export function clockAt(lat: number, lon: number, now = new Date()): Clock {
  const pos = solarPosition(lat, lon, now);
  const times = sunTimes(lat, lon, now);
  const noonAlt = Math.max(1, solarPosition(lat, lon, times.solarNoon).altitude);
  let sunArc: number | null = null;
  if (times.sunrise && times.sunset) {
    const f = (now.getTime() - times.sunrise.getTime()) / (times.sunset.getTime() - times.sunrise.getTime());
    sunArc = f >= -0.02 && f <= 1.02 ? Math.max(0, Math.min(1, f)) : null;
  }
  return { time: timeFromSun(pos.altitude, pos.azimuth) as Clock["time"], sunArc, sunHeight: Math.max(0, pos.altitude) / noonAlt };
}

type Watershed = { ocean: string | null; system: string | null; river: string | null; basin: string | null } | null;

/** The route a raindrop takes from the house, from the drainage-basin record the ground page keeps (`ws:v1`). */
async function rainPathAt(lat: number, lon: number): Promise<RainStep[] | null> {
  const hit = await cacheGet<{ v: Watershed }>(`ws:v1:${lat.toFixed(2)}:${lon.toFixed(2)}`).catch(() => null);
  const ws = hit?.v;
  if (!ws) return null;
  const steps: RainStep[] = [];
  const seen = new Set<string>();
  const add = (name: string | null, kind: RainStep["kind"]) => {
    if (!name || seen.has(name)) return;
    seen.add(name);
    steps.push({ name, kind });
  };
  add(ws.river, "river");
  if (ws.system && ws.system !== ws.ocean && !/Seaboard/i.test(ws.system)) add(ws.system, /Lake|Bay|Gulf|Sea/i.test(ws.system) && !/River/i.test(ws.system) ? "water" : "river");
  if (ws.ocean) add(ws.ocean, /Basin|Great Salt|Inland/i.test(ws.ocean) ? "inland" : "sea");
  return steps.length ? steps : null;
}

/** Today's forecast for the house, from the shared forecast cache only — the book never waits on a weather service. */
export async function forecastAt(lat: number, lon: number): Promise<Forecast | null> {
  const hit = await cacheGet<Forecast>(`fc:v1:${lat.toFixed(2)}:${lon.toFixed(2)}`).catch(() => null);
  if (hit) return hit;
  try {
    const { getForecast } = await import("@/lib/forecast");
    return await getForecast(lat, lon);
  } catch {
    return null;
  }
}

export async function getWorld(now = new Date()): Promise<World> {
  const moon = getMoon(now);
  const base = {
    moonAge: moon.age,
    moonIllumination: moon.illumination,
    nightsToFull: daysBetween(now.toISOString(), moon.nextFull),
  };
  const here = await cookiePlace();
  if (!here) {
    const month = monthIn(null, now);
    return {
      placeName: null,
      slug: null,
      lat: null,
      lon: null,
      tz: null,
      month,
      season: seasonOf(month),
      sky: "partly",
      tempC: null,
      windKmh: null,
      countryCode: null,
      week: null,
      ...base,
      rainPath: null,
      nearRiver: null,
      clock: null,
    };
  }
  const [fc, rainPath, place] = await Promise.all([
    forecastAt(here.lat, here.lon),
    rainPathAt(here.lat, here.lon),
    placeFromSlug(here.slug).catch(() => null),
  ]);
  const tz = here.tz ?? fc?.timezone ?? null;
  const month = monthIn(tz, now);
  return {
    placeName: shortName(here.label),
    slug: here.slug,
    lat: here.lat,
    lon: here.lon,
    tz,
    month,
    season: seasonOf(month, here.lat),
    sky: fc ? skyOf(fc.current.code) : "partly",
    tempC: fc ? Math.round(fc.current.temp) : null,
    windKmh: fc ? Math.round(fc.current.wind) : null,
    countryCode: place?.countryCode ?? null,
    week: fc ? fc.days.map((d) => ({ date: d.date, sky: skyOf(d.code) })) : null,
    ...base,
    rainPath,
    nearRiver: rainPath?.find((s) => s.kind === "river")?.name ?? null,
    clock: clockAt(here.lat, here.lon, now),
  };
}
