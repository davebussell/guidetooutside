/**
 * Everything a place page knows about one place on one day.
 *
 * The forecast is read per request (cached ten minutes, with a three-day
 * stale copy for when Open-Meteo is unavailable); the climate normals, the
 * named waters and the water setting are as good as permanent. Wrapped in
 * React's `cache`, so a page and its metadata share one read.
 */
import { cache } from "react";
import { getClimate } from "./climate";
import { getForecast } from "./forecast";
import { getMoon } from "./moon";
import { forageLawFor, getRegsLink } from "./regs";
import { regimeOf, regimeSeason } from "./regime";
import { waterSetting } from "./water-setting";
import { getNearbyWaters } from "./waters";
import { dateToDoy } from "./climate-fallback";
import type { Climate, LocalData, Place } from "./types";

export type { LocalData, Place } from "./types";

export type Season = LocalData["season"];

/**
 * Meteorological season for a month, read half a year on south of the
 * equator. This is the typed four-season field the records and the kids'
 * pages key on; for words to show a reader use `seasonLabel`, which gives the
 * rains their names in the tropics and says "Autumn" outside the US.
 */
export function seasonFor(month: number, lat: number): Season {
  const m = lat >= 0 ? month : ((month + 5) % 12) + 1;
  if (m >= 3 && m <= 5) return "Spring";
  if (m >= 6 && m <= 8) return "Summer";
  if (m >= 9 && m <= 11) return "Fall";
  return "Winter";
}

/**
 * The season's name as a reader at the place would say it: "Long rains" in
 * Nairobi in April, "Dry season" in Lagos in January, "Wet season" in Cape
 * Town and London in October "Spring" and "Autumn", in Denver "Fall". Inside
 * the tropics (|lat| < 23.5°) spring and autumn mean nothing, so the regime's
 * season words are used (src/lib/regime `regimeSeason`); outside them the
 * hemisphere's season, with "Autumn" everywhere but the US.
 */
export function seasonLabel(d: Pick<LocalData, "place" | "regime" | "climate" | "month" | "season">): string {
  const r = d.regime;
  if (Math.abs(d.place.lat) < 23.5) {
    const s = r ? regimeSeason(r, d.month, d.place.lat, { countryCode: d.place.countryCode, climate: d.climate }) : null;
    if (s) return s.label;
    return d.season === "Fall" || d.season === "Spring" ? "Growing season" : d.season;
  }
  return d.season === "Fall" && d.place.countryCode !== "US" ? "Autumn" : d.season;
}

/**
 * Days to the average first autumn frost and since the average last spring
 * one. South of the equator the climate's frost days are counted from 2 July
 * (`south`), so today is counted the same way.
 */
export function frostCountdown(climate: Climate | null, today: string): { daysToFirstFrost: number | null; daysSinceLastFrost: number | null } {
  // A frost-free place (both dates "Rare") has no countdown; neither has one with a single dated side.
  if (!climate || climate.lastSpringFrost === "Rare" || climate.firstFallFrost === "Rare") return { daysToFirstFrost: null, daysSinceLastFrost: null };
  let doy = dateToDoy(today);
  if (climate.south) doy = ((doy - 184 + 365) % 365) + 1;
  let daysToFirstFrost: number | null = null;
  let daysSinceLastFrost: number | null = null;
  // A first frost after New Year is stored past 365 (Jacksonville's Jan 5 is 370), so the countdown runs through December.
  if (climate.firstFallFrostDoy < 366 + 90) {
    const d = climate.firstFallFrostDoy - doy;
    daysToFirstFrost = d >= 0 && d <= 365 ? d : null;
  }
  if (climate.lastSpringFrostDoy > 0) {
    const d = doy - climate.lastSpringFrostDoy;
    daysSinceLastFrost = d >= 0 ? d : null;
  }
  return { daysToFirstFrost, daysSinceLastFrost };
}

/** Today's date where the place is, from its time zone. */
export function localToday(timeZone: string, now = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  } catch {
    return now.toISOString().slice(0, 10);
  }
}

export const getLocalData = cache(async (place: Place): Promise<LocalData> => {
  const [forecast, climate, waters] = await Promise.all([
    getForecast(place.lat, place.lon),
    getClimate(place),
    getNearbyWaters(place.lat, place.lon),
  ]);
  const fetchedAt = new Date().toISOString();
  const today = forecast.days[0]?.date ?? localToday(forecast.timezone);
  const month = Number(today.slice(5, 7));
  const regime = climate ? regimeOf(climate, place.lat) : null;

  return {
    fetchedAt,
    place,
    forecast,
    climate,
    moon: getMoon(new Date(), forecast.timezone),
    waters,
    regs: getRegsLink(place),
    forageLaw: forageLawFor(place),
    regime,
    water: waterSetting(place.lat, place.lon, waters, climate),
    today,
    month,
    season: seasonFor(month, place.lat),
    ...frostCountdown(climate, today),
  };
});
