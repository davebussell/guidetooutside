/**
 * The moon for a place page: phase, illumination, the next full and new moons
 * (Meeus' mean-phase series with corrections, in src/lib/moon-phases), and the
 * anglers' traditional solunar rating.
 */
import { getMoon as moonAt, phasesBetween as phases } from "./moon-phases";
import type { Moon } from "./types";

/** The moon at a moment; dates are read in the place's time zone when given. */
export function getMoon(date: Date = new Date(), timeZone?: string): Moon {
  return moonAt(date, timeZone) as Moon;
}

/** New, first-quarter, full and last-quarter moons from `from` over the next `days`. */
export function phasesBetween(from: Date, days: number): { kind: string; date: Date }[] {
  return phases(from, days);
}
