/**
 * Whether a town's average first frost can be named as falling in a given week (the garden conditions panel and
 * the homestead check use it). Moved here from the teaching-at-home season plan when that left the site (18 November 2026).
 */
import type { Climate } from "@/lib/types";

/** Stations whose own average last frosts disagree by more than this are not a date to name a week by. */
export const FROST_WEEK_SPREAD_DAYS = 7;

/**
 * Whether the frost dates are good enough to say "falls this week": measured at
 * one weather station, or pooled from stations that agree within a week. The
 * audit of 10 November 2026 found New York's and Atlanta's pooled first frost
 * (9 and 3 stations, disagreeing by 10 and 11 days) 8 days before Central Park's
 * and Hartsfield's, so the plan said "falls this week" with the median 10 days
 * out; a grid estimate is never a date for "this week" either.
 */
export function frostWeekDatable(c: Pick<Climate, "frostSource" | "frostStations" | "frostSpreadDays">): boolean {
  if (c.frostSource !== "stations") return false;
  if ((c.frostStations ?? 1) <= 1) return true;
  return c.frostSpreadDays != null && c.frostSpreadDays <= FROST_WEEK_SPREAD_DAYS;
}
