/**
 * Times and dates in a place's own time zone (the IANA zone the forecast
 * reports), for pages rendered on a server that runs on UTC.
 */

/** "06:21", 24-hour, in `timeZone`. */
export function hhmmIn(d: Date, timeZone: string): string {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
}

/** "2026-10-07": the calendar date of an instant in `timeZone`. */
export function dateIn(d: Date, timeZone: string): string {
  return d.toLocaleDateString("en-CA", { timeZone });
}

/** "October 7, 2026" for a local ISO date ("2026-10-07"). */
export function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
