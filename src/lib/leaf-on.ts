/**
 * Whether the trees of a town are in leaf on a day: from the town's average
 * last spring frost to LEAF_FALL_DAYS (14) after its average first autumn
 * frost. Text that has leaves working or a canopy closed over the forest floor
 * (src/data/day-stories.ts pieces marked `leaf`) is printed only inside it:
 * a sugar maple is bare on 2 November in Ottawa (last frost 10 May, first
 * 5 October, so leaf-on to 19 October) and in full leaf on 15 June.
 *
 * Frost days follow the site's frost calendar (src/lib/frost.ts
 * seasonToOutput): calendar days of the year north of the equator, a first
 * frost after New Year carried past 365 (Jacksonville's 5 January is 370);
 * south of the equator days counted from 2 July (`south`, 2 July is day 1),
 * so the window runs from the town's last spring frost (Johannesburg,
 * 16 August) to 14 days after its first autumn one (30 May): the same rule,
 * mirrored. A frost-free town (both dates "Rare")
 * has no frost to end its leaf-on season: always in leaf. Where there is no
 * climate on file the answer is no (the safe side: the clause is dropped).
 */
import type { Climate } from "./types";

export const LEAF_FALL_DAYS = 14;

/** Day of a non-leap year (1-365) for an ISO date; 29 February counts as 28 February. */
export function nonLeapDoy(iso: string): number {
  const [, m, d] = iso.split("-").map(Number);
  return Math.floor((Date.UTC(2025, m - 1, m === 2 && d === 29 ? 28 : d) - Date.UTC(2025, 0, 1)) / 86400000) + 1;
}

/** The date's day in the climate's frost calendar: calendar days north, days counted from 2 July south (frost.ts seasonToOutput). */
export function frostCalendarDoy(iso: string, south: boolean): number {
  const doy = nonLeapDoy(iso);
  return south ? (doy >= 183 ? doy - 182 : doy + 183) : doy;
}

/** The leaf-on window in frost-calendar days, or null for a frost-free town (leaf-on all year). */
export function leafOnWindow(c: Pick<Climate, "lastSpringFrost" | "firstFallFrost" | "lastSpringFrostDoy" | "firstFallFrostDoy">): { start: number; end: number } | null {
  // 366 is the "no autumn frost" sentinel; a first frost after New Year is 367 or more (Split: 3 January is 368).
  const rare = c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare" || c.lastSpringFrostDoy <= 0 || c.firstFallFrostDoy === 366;
  return rare ? null : { start: c.lastSpringFrostDoy, end: c.firstFallFrostDoy + LEAF_FALL_DAYS };
}

/**
 * Whether the town is in leaf on the local date `iso` ("2026-11-02"). `lat` is
 * the hemisphere when the climate does not say (`south`).
 */
export function leafOn(climate: Climate | null | undefined, iso: string, lat?: number): boolean {
  if (!climate) return false;
  const w = leafOnWindow(climate);
  if (!w) return true;
  const south = climate.south ?? (lat !== undefined && lat < 0);
  const d = frostCalendarDoy(iso, south);
  // The window can run past the end of the frost calendar's year (a first frost after New Year).
  return (d >= w.start && d <= w.end) || (d + 365 >= w.start && d + 365 <= w.end);
}
