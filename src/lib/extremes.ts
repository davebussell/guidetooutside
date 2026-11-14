/**
 * How many cold nights and hot days a place really has, counted from a nearby
 * weather station's daily record (src/data/place-extremes.json, built by
 * scripts/build-place-extremes.ts from NOAA GHCN-Daily, 1991-2020).
 *
 * Monthly averages hide extremes: the average July afternoon in Ottawa is
 * 27 °C, yet the airport station counts about fifteen days a year at 30 °C or
 * hotter. So these counts come from the station and from nothing else; where a
 * town has no station record that passes the completeness rule (at least 20
 * years of at least 300 valid days), there is no entry and the pages say so
 * plainly rather than print a zero.
 *
 * Server-side only (it reads place-extremes.json and, for the station rule, place-frost.json, place-rain.json and
 * place-normals.json, about 500 KB): do not import this from a client component.
 */
import data from "@/data/place-extremes.json";
import frostRows from "@/data/place-frost.json";
import normalsRows from "@/data/place-normals.json";
import rainRows from "@/data/place-rain.json";
import { extremesStationRejected, type TownStation } from "./extremes-rule";
import { stationName } from "./zone-label";

export { stationName };

export type PlaceExtremes = {
  /** `joined`: other GHCN-Daily IDs of the same station whose days filled its gaps (scripts/build-place-extremes.ts, "Split station IDs"). */
  station: { id: string; name: string; km: number; joined?: string[] };
  /** "1991-2020" */
  period: string;
  /** Years with at least 300 valid TMIN days: the cold figures rest on these. */
  years: number;
  /** Years with at least 300 valid TMAX days: the hot figures rest on these. */
  yearsMax: number;
  /** Mean share of days with a valid TMIN across the qualifying years (0-1); null when the cold figures are. */
  coverage: number | null;
  /** The cold figures are null when TMIN has under 20 qualifying years; the hot ones when TMAX has. Null is "not counted", never zero. */
  nightsBelowMinus10: number | null;
  nightsBelowMinus20: number | null;
  nightsBelowMinus25: number | null;
  /** Nights with a minimum below 0 °C. */
  nightsBelowZero: number | null;
  daysAbove30: number | null;
  daysAbove35: number | null;
  /** Mean over the years of each year's lowest night: the quantity the USDA zones are defined on. */
  meanAnnualExtremeMinC: number | null;
  /** The station's whole file, not only 1991-2020, with the date and the first year it reported. */
  recordLowC: number | null;
  recordLowDate: string | null;
  recordLowSince: number | null;
  recordHighC: number | null;
  recordHighDate: string | null;
  recordHighSince: number | null;
  /**
   * The GHCN-Daily ID a record high was read under when it is not the station's own: the same airport reporting under a
   * newer ID. Day 5 audit, 14 November 2026: Yellowknife A's file stops in 2012, and ECCC's 32.6 °C of 2 August 2021 is
   * under CAN02204101 (NCEI daily summaries, read 14 November 2026); Victoria Gonzales's 39.8 °C of 28 June 2021 was
   * missing from the build's file and is set from NCEI's daily summary for CAN01018611, read the same day.
   */
  recordHighId?: string;
  /** The last year the file has that element; absent in entries built before 11 November 2026. */
  recordLowUntil?: number | null;
  recordHighUntil?: number | null;
};

/** Every entry in src/data/place-extremes.json, including any whose station the rule below sets aside (for the checks and builds). */
export const PLACE_EXTREMES_ALL = data as unknown as Record<string, PlaceExtremes>;

type FrostRow = { station?: TownStation; stations?: TownStation[] };
const FROST_ROWS = frostRows as unknown as Record<string, FrostRow>;
const RAIN_ROWS = rainRows as unknown as Record<string, { station: string; km: number }>;
/** The ERA5 coldest night of an average year each town was built with (place-normals.json holds the grid's, before any station is laid over it). */
const GRID_MIN = new Map((normalsRows as unknown as { place: { slug: string }; climate: { meanAnnualExtremeMinC: number } }[]).map((e) => [e.place.slug, e.climate.meanAnnualExtremeMinC]));

/** A town's own stations: its frost station (or the stations its frost dates were pooled from) and its precipitation station. */
export function townStations(slug: string): TownStation[] {
  const f = FROST_ROWS[slug];
  const r = RAIN_ROWS[slug];
  return [...(f?.station ? [f.station] : []), ...(f?.stations ?? []), ...(r ? [{ name: r.station, km: r.km }] : [])];
}

/**
 * Why a town's stored station record does not stand for it (src/lib/extremes-rule.ts), or null when it does or there is
 * none. Day 5 audit, 14 November 2026: Nanaimo's offshore lighthouse, Whitehorse's colder valley station 18.6 km out and
 * Kingston's inland station 24.9 km out had set their cold nights and coldest night of an average year.
 */
export function extremesRejected(slug: string): string | null {
  const e = PLACE_EXTREMES_ALL[slug];
  if (!e) return null;
  return extremesStationRejected(e.station, e.meanAnnualExtremeMinC, townStations(slug), GRID_MIN.get(slug));
}

const TABLE: Record<string, PlaceExtremes> = Object.fromEntries(Object.entries(PLACE_EXTREMES_ALL).filter(([slug]) => !extremesRejected(slug)));

/** The station record for a pre-built town, or null when it has none that passes (or none that can stand for the town). */
export function getExtremes(slug: string): PlaceExtremes | null {
  return TABLE[slug] ?? null;
}

export const PLACE_EXTREMES = TABLE;

/**
 * The town's frost nights a year as one figure with its source, for any page that prints them (Day 5 audit, 14 November
 * 2026: Nanaimo's gardening page said "about 41 frost nights a year", pooled from five stations, and its homestead page
 * 5.5, from the Entrance Island lighthouse). One station's count, in this order: the frost station's own (NOAA's nights at
 * or below 0 °C at the station the frost dates come from), else the daily record's nights below 0 °C at the extremes
 * station; a pooled count only when neither exists, and then it says it is pooled. Null when nothing is on file.
 */
export function frostNights(slug: string, c: { frostDaysPerYear?: number; frostStations?: number | null; frostStationKm?: number }): { nights: number; words: string } | null {
  const f = FROST_ROWS[slug];
  const one = f?.station ?? (f?.stations?.length === 1 ? f.stations[0] : null);
  if (one && c.frostDaysPerYear != null) return { nights: c.frostDaysPerYear, words: `at ${stationName(one.name)}, ${one.km} km away, 1991–2020` };
  const ex = getExtremes(slug);
  if (ex?.nightsBelowZero != null) return { nights: ex.nightsBelowZero, words: `at ${stationName(ex.station.name)}, ${ex.station.km} km away, ${periodText(ex.period)}` };
  if (c.frostDaysPerYear != null) return { nights: c.frostDaysPerYear, words: `pooled from ${c.frostStations ?? "several"} weather stations${c.frostStationKm != null ? `, the nearest ${c.frostStationKm} km away` : ""}` };
  return null;
}

/** "1991-2020" as "1991–2020". */
export const periodText = (period: string) => period.replace("-", "–");

/** "Counted from Ottawa CDA RCS, 4.7 km away, 1991–2020". */
export function countedFrom(ex: PlaceExtremes): string {
  return `Counted from ${stationName(ex.station.name)}, ${ex.station.km} km away, ${periodText(ex.period)}`;
}

/**
 * A count of days or nights a year, as a reader should see it: whole numbers
 * from 10 up, one decimal below that, and "less than 1" for a fraction of a
 * day, so a rare event is never printed as nothing and never as a round zero.
 * 0 stays "0" (the station really counted none in the period).
 */
export function perYear(n: number): string {
  if (n === 0) return "0";
  if (n < 1) return "less than 1";
  if (n < 10) return n.toFixed(1).replace(/\.0$/, "");
  return String(Math.round(n));
}

/** "−27.7 °C" with a true minus sign. */
export function celsius(c: number, digits = 1): string {
  // The sign is read after rounding: −0.04 is "0.0 °C", never "−0.0 °C" (audit, 13 November 2026: Boise's January).
  const r = Number(c.toFixed(digits));
  const s = Math.abs(r).toFixed(digits);
  return `${r < 0 ? "−" : ""}${s} °C`;
}

/** "4 February 2023" from "2023-02-04". */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}
