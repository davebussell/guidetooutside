/**
 * The almanac for a moment: the moon, the name of the next full moon, days to
 * the next full and new moons, the traditional planting hint, the next
 * solstice or equinox, and the phases of the coming weeks.
 *
 * The same computation the header's AlmanacBar (client module 25715) inlines:
 * the October full moon in the first week is still the Harvest Moon, a season
 * mark counts as "today" until noon UTC has passed by 12 hours, and the phase
 * list starts 12 hours back so a phase earlier today is still shown.
 */
import { getMoon, phasesBetween } from "@/lib/moon";
import { FULL_MOON_NAMES } from "@/lib/almanac";

export const fullMoonName = (d: Date) => (d.getUTCMonth() === 9 && d.getUTCDate() <= 7 ? "Harvest Moon" : FULL_MOON_NAMES[d.getUTCMonth()]);

export function plantingHint(phaseName: string, age: number): string {
  if (phaseName === "New Moon" || (age >= 0 && age < 7.4))
    return "New to first quarter: sow leafy crops and anything harvested for its leaves — lettuce, spinach, brassicas, herbs.";
  if (age < 14.8) return "First quarter to full: sow crops that fruit above ground — beans, peas, tomatoes, squash, grain.";
  if (age < 22.1) return "Full to last quarter: plant root crops, bulbs and perennials; transplant and take cuttings.";
  return "Last quarter to new: a resting phase — weed, prune, harvest, turn compost and prepare beds.";
}

export function seasonMark(now: Date, south = false) {
  const y = now.getUTCFullYear();
  const marks = [
    { name: south ? "Autumn equinox" : "Spring equinox", md: [2, 20] },
    { name: south ? "Winter solstice" : "Summer solstice", md: [5, 21] },
    { name: south ? "Spring equinox" : "Autumn equinox", md: [8, 22] },
    { name: south ? "Summer solstice" : "Winter solstice", md: [11, 21] },
  ];
  const next = [y, y + 1]
    .flatMap((yy) => marks.map((m) => ({ name: m.name, date: new Date(Date.UTC(yy, m.md[0], m.md[1], 12)) })))
    .filter((m) => m.date.getTime() >= now.getTime() - 432e5)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  return { ...next, daysAway: Math.max(0, Math.round((next.date.getTime() - now.getTime()) / 864e5)) };
}

/**
 * `south`: read the solstices and equinoxes in the southern hemisphere's
 * names (the September equinox is spring there), from the remembered place.
 */
export function almanacAt(now: Date = new Date(), opts: { south?: boolean } = {}) {
  const moon = getMoon(now);
  const full = new Date(`${moon.nextFull}T12:00:00Z`);
  const nw = new Date(`${moon.nextNew}T12:00:00Z`);
  return {
    moon,
    waxing: moon.age < 14.7652944265,
    fullMoonName: fullMoonName(full),
    full,
    daysToFull: Math.round((full.getTime() - now.getTime()) / 864e5),
    nextNew: nw,
    daysToNew: Math.round((nw.getTime() - now.getTime()) / 864e5),
    plantingHint: plantingHint(moon.phaseName, moon.age),
    season: seasonMark(now, !!opts.south),
    events: phasesBetween(new Date(now.getTime() - 432e5), 45.5).map((e) => ({
      kind: e.kind,
      date: e.date,
      name: e.kind === "Full Moon" ? fullMoonName(e.date) : undefined,
    })),
  };
}

/** Day of the year (1–366) of a moment, read in a time zone. */
export function dayOfYear(now: Date, timeZone: string): number {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value);
  const y = get("year");
  return Math.round((Date.UTC(y, get("month") - 1, get("day")) - Date.UTC(y, 0, 1)) / 864e5) + 1;
}
