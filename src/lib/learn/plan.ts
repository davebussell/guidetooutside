/**
 * The season plan for a place (/learn/plan/<town>): the next eight weeks,
 * Monday to Sunday from this week, two lessons a week ordered by how soon
 * each one's season closes, and a note for each week from the place's own
 * year — the average first frost, a full moon, or how fast the day is
 * shortening.
 *
 * Reconstructed from the ten captured towns: lessons still in season are
 * taken most-urgent first (the month their season ends, then library order;
 * lessons for any month last); when they run out, a lesson for any month
 * comes round again once three weeks have passed since it was done.
 */
import { sunTimes } from "@/lib/sun";
import { fullMoonsOn } from "@/lib/almanac";
import { LESSONS, THEMES, type Lesson } from "@/lib/learn/lessons";
import { lessonFits } from "@/lib/learn/lesson-fit";
import { frostSourceWords } from "@/lib/frost";
import type { Climate, LocalData } from "@/lib/types";

export type PlanLesson = { slug: string; title: string; theme: string; minutes: number; maths: string; again: boolean; art: string; colour: string };
export type PlanWeek = { index: number; start: string; label: string; note: string; frost: boolean; lessons: PlanLesson[] };

const WEEKS = 8;
const PER_WEEK = 2;
const REPEAT_AFTER = 3;

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (isoDate: string, n: number) => {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
};
const longDay = (isoDate: string, weekday = false) =>
  new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-US", { ...(weekday ? { weekday: "long" as const } : {}), month: "long", day: "numeric", timeZone: "UTC" });
const doyOf = (isoDate: string) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5) + 1;
};

/** Daylight on a date, in minutes (sunrise to sunset, from sunTimes, not rounded). */
function daylight(lat: number, lon: number, isoDate: string): number | null {
  const t = sunTimes(lat, lon, new Date(`${isoDate}T12:00:00Z`));
  if (!t.sunrise || !t.sunset) return null;
  return (t.sunset.getTime() - t.sunrise.getTime()) / 60000;
}

/**
 * How much daylight changes across the week that starts on `start`: the
 * length of the day a week on (the next Monday) minus this Monday's, in
 * minutes, so "N a day" is that over seven days. One method for every week
 * (it was Monday to Sunday, six days' change shared over seven). Negative
 * while the days shorten; null where the sun does not rise and set.
 */
export function weeklyDaylightChange(lat: number, lon: number, start: string): number | null {
  const a = daylight(lat, lon, start);
  const b = daylight(lat, lon, addDays(start, 7));
  return a == null || b == null ? null : b - a;
}

/** Whole days from an ISO date to the nearest solstice (21 June or 21 December; the real dates fall on the 20th to the 22nd). */
export function daysToSolstice(isoDate: string): number {
  const y = Number(isoDate.slice(0, 4));
  const t = Date.parse(`${isoDate}T12:00:00Z`);
  return Math.min(...[y - 1, y, y + 1].flatMap((yr) => [`${yr}-06-21`, `${yr}-12-21`]).map((s) => Math.abs(t - Date.parse(`${s}T12:00:00Z`)) / 864e5));
}

/** A solstice within this many days of a date counts as "near" one. */
export const NEAR_SOLSTICE_DAYS = 14;

/**
 * The fastest the day changes in a week anywhere in the year at this place:
 * the weekly change at the two equinoxes, where it peaks (about 22 minutes at
 * Ottawa, 15 at Cape Town, 4.7 at N'Djamena).
 */
export function peakWeeklyDaylightChange(lat: number, lon: number, year: number): number | null {
  const a = weeklyDaylightChange(lat, lon, `${year}-03-17`);
  const b = weeklyDaylightChange(lat, lon, `${year}-09-19`);
  return a == null || b == null ? null : Math.max(Math.abs(a), Math.abs(b));
}

/** "Barely moves": a week's change under this share of the place's own fastest week, and a solstice within NEAR_SOLSTICE_DAYS. */
export const STEADY_SHARE = 0.25;
/** Where even the fastest week is under this many minutes (about 15° from the equator), the days are steady all year. */
export const TROPICS_PEAK_MINUTES = 6;

const minutes = (n: number) => `${n} minute${n === 1 ? "" : "s"}`;

/** The lesson's months as read where the place is: half a year on south of the equator. */
const inSeason = (l: Lesson, month: number, south: boolean) => {
  if (!l.months.length) return true;
  const m = south ? ((month + 5) % 12) + 1 : month;
  return l.months.includes(m);
};
/** How many months until the lesson's season closes, counted from `month` (99 for a lesson for any month). */
const urgency = (l: Lesson, month: number, south: boolean) => {
  if (!l.months.length) return 99;
  for (let k = 0; k < 12; k++) {
    const m = ((month - 1 + k) % 12) + 1;
    if (!inSeason(l, m, south)) return k;
  }
  return 98;
};

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

function weekNote(data: LocalData, start: string): { note: string; frost: boolean } {
  const { place, climate } = data;
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  // The average first frost, if it falls this week and the dates can carry it (see frostWeekDatable).
  if (climate && climate.firstFallFrostDoy > 0 && climate.firstFallFrostDoy < 366 && !climate.south && frostWeekDatable(climate)) {
    if (days.some((d) => doyOf(d) === climate.firstFallFrostDoy)) {
      return {
        frost: true,
        note: `The average first frost falls this week (${climate.firstFallFrost}, ${frostSourceWords(climate)}). Watch the grass on the first clear still morning — and count what is left on the paper chain.`,
      };
    }
  }
  // A full moon this week: the almanac's full moon (src/lib/almanac fullMoonsOn,
  // the same series as the moon page), on the place's own calendar day.
  const full = fullMoonsOn(days, data.forecast.timezone)[0];
  if (full) return { frost: false, note: `Full moon on ${longDay(full.date, true)}. Go out after tea and look at it, and again two nights later.` };
  // How fast the day is changing.
  const delta = weeklyDaylightChange(place.lat, place.lon, days[0]);
  if (delta == null) return { frost: false, note: "" };
  const change = Math.abs(delta);
  const losing = delta < 0;
  // "Barely moves" is said only where it is true of the place and the date: within a fortnight of
  // a solstice and at under a quarter of the place's own fastest week, or in the tropics, where no
  // week of the year changes by more than six minutes. A fixed 14-minute cut-off alone called Cape
  // Town's 13 minutes a week in November "barely moves", when that is close to its fastest.
  const peak = peakWeeklyDaylightChange(place.lat, place.lon, Number(days[0].slice(0, 4)));
  const nearSolstice = Math.min(daysToSolstice(days[0]), daysToSolstice(days[6])) <= NEAR_SOLSTICE_DAYS;
  if (peak != null && peak < TROPICS_PEAK_MINUTES) {
    return {
      frost: false,
      note: `The day hardly changes length this close to the equator: ${minutes(Math.round(change))} ${losing ? "lost" : "gained"} in seven days.`,
    };
  }
  if (peak != null && change < STEADY_SHARE * peak && nearSolstice) {
    return {
      frost: false,
      note: `The day barely moves this week: ${minutes(Math.round(change))} ${losing ? "lost" : "gained"} in seven days. Near a solstice, the sun almost stands still.`,
    };
  }
  return {
    frost: false,
    note: `The day ${losing ? "loses" : "gains"} about ${minutes(Math.round(change))} across this week — ${(change / 7).toFixed(1)} a day. Measure a shadow on Monday and again on Sunday.`,
  };
}

export function seasonPlan(data: LocalData, now = new Date()): PlanWeek[] {
  const tz = data.forecast.timezone;
  const today = now.toLocaleDateString("en-CA", { timeZone: tz });
  const dow = (new Date(`${today}T12:00:00Z`).getUTCDay() + 6) % 7; // Monday 0
  const monday = addDays(today, -dow);
  const south = data.place.lat < 0;
  const colour = (theme: string) => THEMES.find((t) => t.theme === theme)?.colour ?? "var(--moss)";
  const card = (l: Lesson, again: boolean): PlanLesson => ({
    slug: l.slug,
    title: l.title,
    theme: l.theme,
    minutes: l.minutes,
    maths: l.maths,
    again,
    art: l.art,
    colour: colour(l.theme),
  });
  const doneIn = new Map<string, number>();
  const weeks: PlanWeek[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const start = addDays(monday, 7 * w);
    const month = Number(start.slice(5, 7));
    const fresh = LESSONS.map((l, i) => ({ l, i }))
      .filter(({ l }) => !doneIn.has(l.slug) && inSeason(l, month, south) && lessonFits(l, data.place, month, data.climate))
      .sort((x, y) => urgency(x.l, month, south) - urgency(y.l, month, south) || x.i - y.i)
      .slice(0, PER_WEEK)
      .map(({ l }) => card(l, false));
    let lessons = fresh;
    if (!lessons.length) {
      lessons = [...doneIn.entries()]
        .map(([slug, week]) => ({ l: LESSONS.find((x) => x.slug === slug)!, week }))
        .filter(({ l, week }) => !l.months.length && w - week >= REPEAT_AFTER)
        .sort((x, y) => x.week - y.week)
        .slice(0, PER_WEEK)
        .map(({ l }) => card(l, true));
    }
    lessons.forEach((l) => doneIn.set(l.slug, w));
    weeks.push({ index: w, start, label: longDay(start), ...weekNote(data, start), lessons });
  }
  return weeks;
}

/**
 * The page's opening paragraph, written from this place's own plan rather than a stock line: the
 * daylight change now and at the end of the eight weeks (from the sun tables), and the average
 * first frost only where it falls inside the plan. Nothing here assumes a northern autumn, a
 * frost, or an oak: a town south of the equator, or a frost-free one, reads what is true there.
 */
export function planIntro(data: LocalData, weeks: PlanWeek[]): string {
  const { place, climate } = data;
  const parts = ["Not a curriculum — a calendar."];
  if (weeks.length) {
    const first = weeks[0];
    const last = weeks[weeks.length - 1];
    const peak = peakWeeklyDaylightChange(place.lat, place.lon, Number(first.start.slice(0, 4)));
    const d0 = weeklyDaylightChange(place.lat, place.lon, first.start);
    const dN = weeklyDaylightChange(place.lat, place.lon, last.start);
    if (d0 != null && peak != null && peak >= TROPICS_PEAK_MINUTES && Math.round(Math.abs(d0)) >= 1) {
      let s = `This week the day is ${d0 < 0 ? "losing" : "gaining"} about ${minutes(Math.round(Math.abs(d0)))}`;
      if (dN != null && (Math.sign(dN) !== Math.sign(d0) || Math.abs(dN) <= 0.6 * Math.abs(d0))) {
        s += `; by ${longDay(last.start)} it is changing by about ${minutes(Math.round(Math.abs(dN)))} a week`;
      }
      parts.push(s + ".");
    }
    const frostWeek = weeks.find((w) => w.frost);
    if (frostWeek && climate) parts.push(`The average first frost near ${place.name} falls in the week of ${frostWeek.label} (${climate.firstFallFrost}).`);
  }
  parts.push("Each lesson is placed in a week when its season is open, the ones whose season closes soonest first.");
  return parts.join(" ");
}
