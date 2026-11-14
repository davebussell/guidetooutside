/**
 * The almanac bits a place page shows: the traditional full-moon names, the
 * next solstice or equinox, the lunar-planting and solunar lore (labelled as
 * tradition), and day-length change.
 */
import { phasesBetween } from "./moon";
import { sunTimes } from "./sun";
import { dateIn } from "./tz";
import type { Moon } from "./types";

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Traditional North American full-moon names, by the month the full moon falls in. */
export const FULL_MOON_NAMES = [
  "Wolf Moon",
  "Snow Moon",
  "Worm Moon",
  "Pink Moon",
  "Flower Moon",
  "Strawberry Moon",
  "Buck Moon",
  "Sturgeon Moon",
  "Harvest Moon",
  "Hunter's Moon",
  "Beaver Moon",
  "Cold Moon",
];

export const fullMoonName = (d: Date) => FULL_MOON_NAMES[d.getUTCMonth()];

/** "Oct 26" for a date read at noon UTC. */
export const fmtDate = (d: Date) => `${SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;

/** A date in a time zone as "Oct 10". */
export function fmtDateIn(d: Date, timeZone?: string): string {
  try {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone });
  } catch {
    return fmtDate(d);
  }
}

/** The next solstice or equinox from `now`, named for the hemisphere. */
export function nextSeasonMark(now: Date, south: boolean): { name: string; date: Date; days: number } {
  const y = now.getUTCFullYear();
  const marks: { k: "march" | "june" | "september" | "december"; date: Date }[] = [];
  for (const yy of [y, y + 1]) {
    marks.push({ k: "march", date: new Date(Date.UTC(yy, 2, 20, 12)) });
    marks.push({ k: "june", date: new Date(Date.UTC(yy, 5, 21, 12)) });
    marks.push({ k: "september", date: new Date(Date.UTC(yy, 8, 22, 12)) });
    marks.push({ k: "december", date: new Date(Date.UTC(yy, 11, 21, 12)) });
  }
  const today = Date.UTC(y, now.getUTCMonth(), now.getUTCDate(), 12);
  const m = marks.find((x) => x.date.getTime() >= today)!;
  const NAMES = {
    march: south ? "Autumn equinox" : "Spring equinox",
    june: south ? "Winter solstice" : "Summer solstice",
    september: south ? "Spring equinox" : "Autumn equinox",
    december: south ? "Summer solstice" : "Winter solstice",
  };
  return { name: NAMES[m.k], date: m.date, days: Math.round((m.date.getTime() - today) / 86400000) };
}

/** Traditional lunar-planting advice for the moon's quarter. */
export function lunarPlanting(age: number): string {
  const f = age / 29.530588853;
  if (f < 0.25) return "New to first quarter: a time for sowing leafy crops and grains, by tradition.";
  if (f < 0.5) return "First quarter to full: a time for sowing fruiting crops — beans, squash, tomatoes — by tradition.";
  if (f < 0.75) return "Full to last quarter: a time for planting roots, bulbs and perennials, by tradition.";
  return "Last quarter to new: a resting phase — weed, prune, harvest, turn compost and prepare beds.";
}

/** The four quarter phases from `now` over the next five weeks. */
export function comingPhases(now: Date, n = 4) {
  return phasesBetween(now, 35).slice(0, n);
}

/**
 * The full moons that fall on the given local calendar dates ("2026-11-24")
 * in `timeZone`: the instant of each (the same series the almanac lists, so a
 * page that names a full moon agrees with it) and the local date it falls on.
 * A full moon at 01:28 UTC on 24 December is still 23 December in Ottawa.
 */
export function fullMoonsOn(isoDates: string[], timeZone: string): { date: string; at: Date }[] {
  if (!isoDates.length) return [];
  const first = isoDates[0] < isoDates[isoDates.length - 1] ? isoDates[0] : isoDates[isoDates.length - 1];
  const last = isoDates[0] < isoDates[isoDates.length - 1] ? isoDates[isoDates.length - 1] : isoDates[0];
  // Local dates run from UTC-12 to UTC+14, so look a day either side of the UTC span.
  const from = new Date(`${first}T00:00:00Z`).getTime() - 86400000;
  const to = new Date(`${last}T00:00:00Z`).getTime() + 2 * 86400000;
  return phasesBetween(new Date(from), (to - from) / 86400000)
    .filter((p) => p.kind === "Full Moon")
    .map((p) => ({ date: dateIn(p.date, timeZone), at: p.date }))
    .filter((p) => isoDates.includes(p.date));
}

/** Minutes of daylight on a date at a place, and the change to the next day and to a month on. */
export function dayLengthChange(lat: number, lon: number, now: Date) {
  const day = (d: Date) => sunTimes(lat, lon, d).dayLengthMin as number;
  const today = day(now);
  const tomorrow = day(new Date(now.getTime() + 86400000));
  const month = day(new Date(now.getTime() + 30 * 86400000));
  return { today, perDay: tomorrow - today, inAMonth: month - today };
}

export type { Moon };
