/**
 * The climate normals the site keeps on file, and the date and zone helpers
 * the live climate reading shares with them.
 *
 * src/data/place-normals.json holds the full climate record of every
 * pre-built town (scripts/recover-place-climate.py), so their pages never
 * wait on the reanalysis archive; it is also the fallback for a place near a
 * pre-built town when the archive cannot be read. Its monthly means are a
 * weather station's 1991–2020 normals where one was read (scripts/build-
 * station-normals.ts; `tempStationOf` below names the station), and ten years
 * of ERA5 elsewhere.
 */
import { countryServed } from "@/lib/scope";
import normals from "@/data/place-normals.json";
import rain from "@/data/place-rain.json";
import zoneRows from "@/data/place-zones.json";
import usdaRows from "@/data/place-zones-usda.json";
import { extremesRejected } from "./extremes";
import type { Climate, Place } from "./types";
import { zoneFromExtremeMin, type ZonedClimate, type ZoneSource } from "./zone-label";

export { zoneFromExtremeMin };

type Entry = { place: Place; climate: ZonedClimate };

/**
 * Every pre-built town's zone and the system it is on (scripts/build-place-zones.ts):
 * the official Natural Resources Canada or USDA 2023 map zone where there is one
 * (src/data/place-zones.json), else the USDA rule applied to a weather station's
 * coldest night of an average year, else to ERA5 (src/data/place-zones-usda.json).
 * place-normals.json still holds the zone it was built with (the 2026 audit found 55
 * that did not match the minimum printed beside them), so the resolved zone is laid
 * over it here, once, for every reader of the normals.
 */
const OFFICIAL_ROWS = zoneRows as unknown as Record<string, { zone: string; source: "nrcan" | "usda-2023" }>;
const USDA_ROWS = usdaRows as unknown as Record<string, { zone: string; minC: number; basis: "station" | "era5"; station?: { name: string; km: number; years: number; period: string } }>;
const LEGACY_SOURCE: Record<ZoneSource, NonNullable<Climate["zoneSource"]>> = { nrcan: "nrcan", "usda-2023": "usda-2023", "usda-station": "estimated", "usda-era5": "estimated" };

/**
 * A USDA row worked out from a station the station rule sets aside (src/lib/extremes-rule.ts) is read on the grid instead,
 * until scripts/build-place-zones.ts is run again with the rule: Day 5 audit, 14 November 2026, Nanaimo's USDA-equivalent
 * zone 9b came from the Entrance Island lighthouse's −2.6 °C coldest night, 10.5 km offshore.
 */
function usdaRow(slug: string, c: ZonedClimate): (typeof USDA_ROWS)[string] | undefined {
  const u = USDA_ROWS[slug];
  if (!u || u.basis !== "station" || !extremesRejected(slug)) return u;
  const minC = c.meanAnnualExtremeMinC;
  return { zone: zoneFromExtremeMin(minC).zone, minC, basis: "era5" };
}

/** A normals climate with its resolved zone, the system it is on, and the coldest night behind it (USDA-equivalent zones) or beside it (official ones). */
function withZone(c: ZonedClimate, slug: string): ZonedClimate {
  const u = usdaRow(slug, c);
  const z: { zone: string; source: ZoneSource } | undefined = OFFICIAL_ROWS[slug] ?? (u ? { zone: u.zone, source: u.basis === "station" ? "usda-station" : "usda-era5" } : undefined);
  if (!z) return c;
  const derived = z.source === "usda-station" || z.source === "usda-era5";
  return {
    ...c,
    // The coldest night of a typical year is the station's where one was counted (scripts/build-place-zones.ts):
    // the reanalysis grid runs 2–3 °C too mild in the coldest towns, which let perennials and overwinter sowings
    // through that the station record rules out (5 Nov 2026 audit).
    meanAnnualExtremeMinC: u?.basis === "station" ? u.minC : c.meanAnnualExtremeMinC,
    extremeMinSource: u?.basis === "station" ? "station" : "era5",
    zone: z.zone,
    zoneNumber: Number.parseInt(z.zone, 10),
    zoneSource: LEGACY_SOURCE[z.source],
    zoneSystem: z.source,
    // The coldest night is given with the zone only when the zone was worked out from it, so the two always agree.
    zoneMinC: derived && u ? u.minC : null,
    zoneStation: z.source === "usda-station" && u?.station ? u.station : null,
    usdaEquivalent: !derived && u ? { zone: u.zone, minC: u.minC, basis: u.basis, ...(u.station ? { station: u.station } : {}) } : null,
  };
}

/** A climate record read from the reanalysis (or cached before zone systems were recorded): its zone is a USDA-equivalent from its own ERA5 coldest night. */
export function withEra5Zone(c: ZonedClimate): ZonedClimate {
  if (c.zoneSystem) return c;
  if (c.zoneSource === "usda-2023" || c.zoneSource === "nrcan") return { ...c, zoneSystem: c.zoneSource };
  return { ...c, zoneSystem: "usda-era5", zoneMinC: c.meanAnnualExtremeMinC };
}

/**
 * Where a town's monthly temperatures come from (fields written by scripts/build-station-normals.ts; src/lib/types.ts
 * `Climate` does not declare them yet). Day 5 audit, 14 November 2026: every town's monthly means were ten years of the
 * ERA5 grid, which put the homestead freezing dates 1 to 5 weeks late and the Köppen class wrong in five towns. Where a
 * station's normals were read (src/data/place-station-normals.json: NOAA's 1991–2020 normals for 67 US towns and
 * Niagara-on-the-Lake, NOAA's monthly summaries of an ECCC station for six Canadian towns), they replace the grid, and
 * every sentence built from them names the station; elsewhere the grid stands and is named.
 */
export type TempSource = {
  tempSource?: "station";
  tempStation?: string;
  tempStationKm?: number;
  /** "1991-2020", or the years a Canadian station's monthly summaries span ("1991-2014"). */
  tempPeriod?: string;
  tempBasis?: "noaa-normals" | "ghcn-gsom";
};

/** The station a climate record's monthly temperatures come from, or null when they are the ERA5 grid's. */
export function tempStationOf(c: Climate | null | undefined): { name: string; km: number; period: string; basis: "noaa-normals" | "ghcn-gsom" } | null {
  const t = c as (Climate & TempSource) | null | undefined;
  if (!t || t.tempSource !== "station" || !t.tempStation || t.tempStationKm == null) return null;
  return { name: t.tempStation, km: t.tempStationKm, period: t.tempPeriod ?? "1991-2020", basis: t.tempBasis ?? "noaa-normals" };
}

const NORMALS = (normals as unknown as Entry[]).map((e) => ({ ...e, climate: withZone(e.climate, e.place.slug) }));
const BY_SLUG = new Map(NORMALS.map((e) => [e.place.slug, e]));

/**
 * A GHCN-Daily 1991–2020 normal for a pre-built town (scripts/build-place-frost.ts --rain).
 * The element summed is PRCP, the day's total precipitation: rain plus the melted
 * water of snow, hail and ice. It is not rainfall alone (the 2026 audit put Ottawa's
 * 930 mm a year against a rainfall-only figure of 757 mm), so pages label it
 * "precipitation". The field names keep "rain" for the files already written.
 */
export type StationRain = {
  lat: number;
  lon: number;
  station: string;
  stationId: string;
  km: number;
  /** Complete months behind the thinnest month of the normal. */
  years: number;
  monthlyRainMm: number[];
  annualMm: number;
};
const RAIN = Object.values(rain as Record<string, StationRain>);
/** A station rainfall normal stands for a point this close to the town it was built for. */
export const RAIN_RADIUS_KM = 15;

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Day of year (non-leap 2025 calendar) to "May 12". */
export function doyToLabel(doy: number, year = 2025): string {
  const d = new Date(Date.UTC(year, 0, 1));
  d.setUTCDate(d.getUTCDate() + Math.round(doy) - 1);
  return `${SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** "2026-10-07" to its day of year. */
export function dateToDoy(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000) + 1;
}

const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  return Math.hypot((d - b) * r * Math.cos(((a + c) / 2) * r), (c - a) * r) * 6371;
};

/** The stored record of a pre-built town, when the place is that town. */
export function placeNormals(place: Pick<Place, "slug" | "lat" | "lon">): Climate | null {
  const e = BY_SLUG.get(place.slug);
  // The same town at the same spot: a precise "use my location" point keeps its own reading.
  if (e && km(e.place.lat, e.place.lon, place.lat, place.lon) < 2) return e.climate;
  return null;
}

/** The nearest pre-built town's record within `maxKm`, for when the archive cannot be read. */
export function nearestNormals(lat: number, lon: number, maxKm = 50): Climate | null {
  let best: Entry | null = null;
  let bestKm = maxKm;
  for (const e of NORMALS) {
    const d = km(lat, lon, e.place.lat, e.place.lon);
    if (d <= bestKm) {
      best = e;
      bestKm = d;
    }
  }
  return best?.climate ?? null;
}

/** The nearest station rainfall normal within `maxKm` of a point, or null (the reanalysis stands). */
export function stationRain(lat: number, lon: number, maxKm = RAIN_RADIUS_KM): (StationRain & { distanceKm: number }) | null {
  let best: StationRain | null = null;
  let bestKm = maxKm;
  for (const r of RAIN) {
    const d = km(lat, lon, r.lat, r.lon);
    if (d <= bestKm) {
      best = r;
      bestKm = d;
    }
  }
  return best ? { ...best, distanceKm: bestKm } : null;
}

/** The table for lists and examples: the served towns only (src/lib/scope.ts). Lookups by slug read the whole table. */
export const PLACE_NORMALS = NORMALS.filter((e) => countryServed(e.place.countryCode));
