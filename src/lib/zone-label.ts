/**
 * Hardiness zones and the system each one is on. A bare "5b" is ambiguous:
 * the USDA scale is set by one number (the average of each year's coldest
 * night, in 10 °F zones and 5 °F halves), while Natural Resources Canada's
 * map blends seven climate variables (coldest-month mean minimum, frost-free
 * period, June to November rain, warmest-month mean maximum, a winter
 * harshness index, snow depth and wind gusts; 4th edition, 1991-2020 climate).
 * The two share numbers and letters but not meaning, so every zone the site
 * prints carries its system:
 *
 *   "nrcan"         Canadian (NRCan) zone 5b      the official Canadian map, looked up by coordinates
 *   "usda-2023"     USDA zone 7b                  the official USDA 2023 map
 *   "usda-station"  USDA-equivalent zone 5a       the USDA rule applied to a weather station's record
 *   "usda-era5"     USDA-equivalent zone 5a       the USDA rule applied to ten years of ERA5 reanalysis
 *
 * No data is imported here, so scripts and client components can use it.
 */
import type { Climate } from "./types";

export type ZoneSource = "nrcan" | "usda-2023" | "usda-station" | "usda-era5";

/** Extra zone facts the climate records carry once src/lib/climate-fallback has applied src/data/place-zones*.json. */
export type ZonedClimate = Climate & {
  /** Which system `zone` is on (see above). */
  zoneSystem?: ZoneSource;
  /** The coldest-night average (°C) the zone was worked out from; set only when the zone is a USDA-equivalent, so the two always match. */
  zoneMinC?: number | null;
  /** The station behind a "usda-station" zone. */
  zoneStation?: { name: string; km: number; years: number; period: string } | null;
  /** The USDA-scale zone worked out from the same coldest-night average, given beside an official Canadian zone. */
  usdaEquivalent?: { zone: string; minC: number; basis: "station" | "era5"; station?: { name: string; km: number; years: number; period: string } } | null;
};

/** USDA zone from the mean annual extreme minimum (°C): 10 °F zones, 5 °F halves, zone 1 starting at -60 °F. */
export function zoneFromExtremeMin(minC: number): { zone: string; zoneNumber: number } {
  const f = minC * 1.8 + 32;
  let n = Math.floor((f + 60) / 10) + 1;
  n = Math.max(1, Math.min(13, n));
  const lower = -60 + (n - 1) * 10;
  return { zone: `${n}${f - lower < 5 ? "a" : "b"}`, zoneNumber: n };
}

/** The USDA band of a zone label, in °C: "5a" is -20 to -15 °F, -28.9 to -26.1 °C. Zone 1a has no floor and 13b no ceiling (zoneFromExtremeMin stops at 1 and 13). */
export function usdaBandC(zone: string): { lo: number; hi: number } | null {
  const m = /^(\d{1,2})([ab])$/i.exec(zone.trim());
  if (!m) return null;
  const n = Number(m[1]);
  const b = m[2].toLowerCase() === "b";
  const lowF = -60 + (n - 1) * 10 + (b ? 5 : 0);
  const c = (f: number) => ((f - 32) * 5) / 9;
  return { lo: n <= 1 && !b ? -Infinity : c(lowF), hi: n >= 13 && b ? Infinity : c(lowF + 5) };
}

/** The number in a zone label: "5b" is 5. */
export const zoneNumberOf = (zone: string) => Number.parseInt(zone, 10);

const SYSTEM_NAME: Record<ZoneSource, string> = {
  nrcan: "Canadian (NRCan)",
  "usda-2023": "USDA",
  "usda-station": "USDA-equivalent",
  "usda-era5": "USDA-equivalent",
};

/** "Canadian (NRCan) zone 5b", "USDA zone 7b", "USDA-equivalent zone 5a". */
export function zoneLabel(zone: string, source: ZoneSource): string {
  return `${SYSTEM_NAME[source]} zone ${zone}`;
}

/** The heading for a zone figure shown on its own: "Canadian (NRCan) zone", "USDA zone", "USDA-equivalent zone". */
export function zoneSystemHeading(source: ZoneSource): string {
  return `${SYSTEM_NAME[source]} zone`;
}

/** The zone's system as the climate record carries it, falling back to the older `zoneSource` field. */
export function zoneSourceOf(c: Pick<Climate, "zoneSource"> & { zoneSystem?: ZoneSource }): ZoneSource {
  if (c.zoneSystem) return c.zoneSystem;
  if (c.zoneSource === "nrcan") return "nrcan";
  if (c.zoneSource === "usda-2023") return "usda-2023";
  return "usda-era5";
}

/** The label for a climate record's zone: "Canadian (NRCan) zone 5b". */
export function climateZoneLabel(c: Climate): string {
  return zoneLabel(c.zone, zoneSourceOf(c as ZonedClimate));
}

const minus = (c: number) => `${c < 0 ? "−" : ""}${Math.abs(c).toFixed(1)} °C`;

/** Initialisms that stay in capitals in NOAA's upper-case station names. */
const KEEP_UPPER = new Set(["CDA", "RCS", "CS", "AUT", "USC", "AFB", "AP", "ARPT", "NAS", "WSO", "WFO", "WSFO", "NWS", "ASOS", "AWOS", "AWS", "UK", "USA", "DC", "II", "III", "SE", "ESE", "NW", "STP", "KGW", "TV", "FAA"]);
/** Words NOAA's 30-character station-name field cut short or abbreviates; completed only where there is one reading. */
const WORD_FIX: Record<string, string> = { GARDE: "Garden", AIRPOR: "Airport", LJUBL: "Ljubljana", DWTN: "Downtown", CNTRL: "Central", PHILA: "Philadelphia", FT: "Fort", FLD: "Field", CY: "City", NY: "New York" };

/** "OTTAWA CDA RCS" to "Ottawa CDA RCS"; "VANCOUVER INT'L A" to "Vancouver Int'l A"; "NY CITY CNTRL PARK" to "New York City Central Park". */
export function stationName(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/(^|[\s\-/(._:])([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase())
    .replace(/\b[A-Za-z]+\b/g, (w) => WORD_FIX[w.toUpperCase()] ?? (KEEP_UPPER.has(w.toUpperCase()) ? w.toUpperCase() : w))
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** One short line on where the zone came from, for a small tile; the coldest night appears only beside a zone worked out from it. */
export function zoneBasisShort(c: Climate): string {
  const z = c as ZonedClimate;
  const src = zoneSourceOf(z);
  if (src === "nrcan") return "Natural Resources Canada map, 1991–2020 climate";
  if (src === "usda-2023") return "USDA 2023 hardiness map";
  const station = z.zoneStation;
  if (src === "usda-station" && station && z.zoneMinC != null) return `Weather station record: coldest night of an average year ${minus(z.zoneMinC)} at ${stationName(station.name)}, ${station.km} km away, ${station.period.replace("-", "–")}`;
  return z.zoneMinC != null ? `Estimated from ERA5 reanalysis: coldest night of an average year ${minus(z.zoneMinC)}` : "Estimated from ERA5 reanalysis";
}

/**
 * One or two sentences on how the zone was found, for the line under it.
 * An official zone never has a temperature printed beside it as if it were
 * its band: the Canadian zone is not a coldest-night band, and a USDA map
 * zone can differ by a half zone from any one station. A coldest-night figure
 * appears only beside the zone it was worked out into, or under its own label.
 */
export function zoneBasis(c: Climate, placeName: string): string {
  const z = c as ZonedClimate;
  const src = zoneSourceOf(z);
  const station = z.zoneStation ?? z.usdaEquivalent?.station ?? null;
  const stationText = (s: NonNullable<typeof station>) => `${stationName(s.name)}, ${s.km} km away, ${s.period.replace("-", "–")}`;
  if (src === "nrcan") {
    const eq = z.usdaEquivalent;
    const base = `Natural Resources Canada's plant hardiness map (4th edition, 1991–2020 climate) at ${placeName}'s coordinates. It blends seven climate variables, so it is not a coldest-night band.`;
    // The comparison is given only from a station record; an ERA5 minimum runs milder than a cold valley's real one.
    return eq?.station ? `${base} On the USDA rule the coldest night of an average year, ${minus(eq.minC)} at ${stationText(eq.station)}, gives USDA-equivalent zone ${eq.zone}.` : base;
  }
  if (src === "usda-2023") {
    const eq = z.usdaEquivalent;
    return `The USDA 2023 Plant Hardiness Zone Map for ${placeName}.${eq?.station ? ` For comparison, ${stationText(eq.station)} gives a coldest night of ${minus(eq.minC)} in an average year, USDA-equivalent zone ${eq.zone}.` : ""}`;
  }
  if (src === "usda-station" && station && z.zoneMinC != null) {
    return `Worked out on the USDA rule from the coldest night of an average year, ${minus(z.zoneMinC)}, at ${stationText(station)}.`;
  }
  return z.zoneMinC != null
    ? `Estimated on the USDA rule from ten years of ERA5 reanalysis, whose coldest night of an average year is ${minus(z.zoneMinC)}; no weather station with a long enough record was within reach.`
    : "Estimated on the USDA rule from ten years of ERA5 reanalysis; no weather station with a long enough record was within reach.";
}
