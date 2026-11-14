/**
 * When each climate signal in the homestead calendar arrives at one place,
 * and which tasks are due in a given month. Pure functions over the numbers
 * in ./climate.ts; nothing is fetched.
 *
 * A task's window is a run of days (it may wrap past 31 December). Signals
 * that never come at a place (daylight never falls below 12 hours on the
 * equator, nights never freeze in Lagos) give no window, and their tasks are
 * left out for that place.
 */
import type { Signal, HomesteadTask } from "@/data/homestead/calendar";
import { TASKS } from "@/data/homestead/calendar";
import {
  daily,
  dayLabel,
  daylightYear,
  crossings,
  coldHeat,
  heatingNeed,
  frostSeason,
  beeSeason,
  runs,
  runStart,
  monthStart,
  monthEnd,
  wrapDoy,
  inRun,
  GRID_WORDS,
  tempWords,
  tempsFromStation,
  type HomesteadInput,
  type Run,
} from "./climate";

export type Window = { start: number; end: number };

/** The dates each signal arrives at the place (days of the year), computed once. */
export type SignalDates = {
  daylight: Record<12 | 14, { down: number | null; up: number | null }>;
  lastSpringFrost: number | null;
  firstFallFrost: number | null;
  nightsBelow: Record<0 | 4, Run | null>;
  daysAbove30: Run | null;
  bees: { start: number | null; end: number | null };
  heatingStart: number | null;
  rainsStart: number | null;
  dryStart: number | null;
  /** Frost is rare: the frost-free season is the whole year. */
  frostRare: boolean;
  /** The frost dates are a weather station's (or stations'), so they can be set beside the grid's freezing nights. */
  frostFromStations: boolean;
  /** "at the weather station" or "pooled from 3 nearby weather stations", for those lines. */
  frostStationWords: string;
  /** Where the monthly lows behind the freezing nights come from (homestead/climate tempWords), and whether it is a station. */
  tempWords: string;
  tempsFromStation: boolean;
};

/** Where the frost dates beside a grid date were measured: one station, or a pool of them. */
export function stationWords(c: { frostStations?: number | null } | null): string {
  const n = c?.frostStations ?? 1;
  return n > 1 ? `pooled from ${n} nearby weather stations` : "at the weather station";
}

export function signalDates(input: HomesteadInput): SignalDates {
  const year = Number(input.today.slice(0, 4)) || 2026;
  const day = daylightYear(input.lat, input.lon, year);
  const cross = (h: number) => {
    const c = crossings(day, h * 60);
    return { down: c.find((x) => x.dir === "down")?.doy ?? null, up: c.find((x) => x.dir === "up")?.doy ?? null };
  };
  const c = input.climate;
  const r = input.regime;
  const lo = c ? daily(c.monthlyMeanMin) : null;
  const below = (t: number) => (lo ? (runs(lo.map((x) => x < t))[0] ?? null) : null);
  const ch = c ? coldHeat(c) : null;
  const frost = c ? frostSeason(c) : null;
  const bees = c ? beeSeason(c) : null;
  const heating = c ? heatingNeed(c) : null;
  // A bee season that never ends (warm all year) or never starts has no start and end.
  const forage = bees?.forage.main;
  const beeRun = forage && forage.days < 365 ? forage : null;
  const rainsMonth = r ? runStart(r.wetMonths) : null;
  const dryMonth = r ? runStart(r.dryMonths) : null;
  return {
    daylight: { 12: cross(12), 14: cross(14) },
    lastSpringFrost: frost && !frost.rare ? frost.lastSpringDoy : null,
    firstFallFrost: frost && !frost.rare ? frost.firstFallDoy : null,
    nightsBelow: { 0: below(0), 4: below(4) },
    daysAbove30: ch?.above30.main ?? null,
    bees: { start: beeRun ? beeRun.start : null, end: beeRun ? beeRun.end : null },
    heatingStart: heating?.season && heating.season.to - heating.season.from !== 11 ? monthStart(heating.season.from) : null,
    rainsStart: rainsMonth ? monthStart(rainsMonth) : null,
    dryStart: dryMonth ? monthStart(dryMonth) : null,
    frostRare: !!frost?.rare,
    frostFromStations: frost?.source === "stations",
    frostStationWords: stationWords(c),
    tempWords: tempWords(c),
    tempsFromStation: tempsFromStation(c),
  };
}

const around = (d: number | null, [a, b]: [number, number]): Window | null => (d == null ? null : { start: wrapDoy(d + a), end: wrapDoy(d + b) });

/** The window of days in which a signal's task is due at this place, or null when the signal never comes. */
export function signalWindow(s: Signal, d: SignalDates): Window | null {
  switch (s.kind) {
    case "daylight-down":
      return around(d.daylight[s.hours].down, s.offset ?? [-14, 14]);
    case "daylight-up":
      return around(d.daylight[s.hours].up, s.offset ?? [-7, 21]);
    case "frost-spring":
      return around(d.lastSpringFrost, s.offset);
    case "frost-fall":
      return around(d.firstFallFrost, s.offset);
    case "nights-below": {
      const run = d.nightsBelow[s.temp];
      if (!run || run.days >= 365) return null;
      if (s.phase === "during") return { start: run.start, end: run.end };
      return around(s.phase === "start" ? run.start : run.end + 1, s.offset ?? [-14, 14]);
    }
    case "days-above": {
      const run = d.daysAbove30;
      return run ? { start: run.start, end: run.end } : null;
    }
    case "bees":
      return around(s.phase === "start" ? d.bees.start : d.bees.end == null ? null : d.bees.end + 1, s.phase === "start" ? [-7, 21] : [-7, 21]);
    case "heating":
      return around(d.heatingStart, s.offset);
    case "rains":
      return around(d.rainsStart, s.offset);
    case "dry":
      return around(d.dryStart, s.offset);
    case "frost-free":
      if (d.frostRare) return { start: 1, end: 365 };
      if (d.lastSpringFrost == null || d.firstFallFrost == null) return null;
      return { start: d.lastSpringFrost, end: d.firstFallFrost };
  }
}

/** The date the signal itself arrives (not the task window), for "Daylight falls below 14 hours on Aug 21". */
export function signalDay(s: Signal, d: SignalDates): number | null {
  switch (s.kind) {
    case "daylight-down":
      return d.daylight[s.hours].down;
    case "daylight-up":
      return d.daylight[s.hours].up;
    case "frost-spring":
      return d.lastSpringFrost;
    case "frost-fall":
      return d.firstFallFrost;
    case "nights-below": {
      const run = d.nightsBelow[s.temp];
      if (!run || run.days >= 365) return null;
      return s.phase === "end" ? wrapDoy(run.end + 1) : run.start;
    }
    case "days-above":
      return d.daysAbove30?.start ?? null;
    case "bees":
      return s.phase === "start" ? d.bees.start : d.bees.end == null ? null : wrapDoy(d.bees.end + 1);
    case "heating":
      return d.heatingStart;
    case "rains":
      return d.rainsStart;
    case "dry":
      return d.dryStart;
    case "frost-free":
      return d.frostRare ? null : d.lastSpringFrost;
  }
}

/** One plain line saying what set the task off at this place. */
export function triggerLine(s: Signal, d: SignalDates): string | null {
  const day = signalDay(s, d);
  const on = day == null ? "" : dayLabel(day);
  switch (s.kind) {
    case "daylight-down":
      return day == null ? null : `Daylight here falls below ${s.hours} hours on ${on}.`;
    case "daylight-up":
      return day == null ? null : `Daylight here rises above ${s.hours} hours on ${on}.`;
    case "frost-spring":
      return day == null ? null : `The average last spring frost here is ${on}.`;
    case "frost-fall":
      return day == null ? null : `The average first autumn frost here is ${on}.`;
    case "nights-below": {
      // The "average nights" come from the town's monthly lows: the audit of 10 November 2026 found the ERA5 grid's 7–17
      // days late in the Acadian towns and 3 weeks late at Richmond, so the barrel and water jobs keyed to them say where
      // the date comes from, and where the town's frost dates are a station's, the station's date is given too. Day 5
      // audit, 14 November 2026: 74 towns now read a station's normals (scripts/build-station-normals.ts), and 55 of them
      // were still told their freezing dates were the grid's; the line names whichever source the lows are (tempWords).
      const run = d.nightsBelow[s.temp];
      if (!run) return null;
      const grid = d.tempsFromStation ? `on ${d.tempWords}` : `on ${GRID_WORDS} (a 30 km average, not a weather station)`;
      const firstFrost = s.temp === 0 && d.frostFromStations && d.firstFallFrost != null ? `; ${d.frostStationWords}, the average first frost is ${dayLabel(d.firstFallFrost)}` : "";
      const lastFrost = s.temp === 0 && d.frostFromStations && d.lastSpringFrost != null ? `; ${d.frostStationWords}, the average last frost is ${dayLabel(d.lastSpringFrost)}` : "";
      return s.phase === "end"
        ? `Average nights here rise back above ${s.temp} °C from ${on} ${grid}${lastFrost}.`
        : s.phase === "during"
          ? `Average nights here stay below ${s.temp} °C from ${dayLabel(run.start)} to ${dayLabel(run.end)} ${grid}.`
          : `Average nights here fall below ${s.temp} °C from ${on} ${grid}${firstFrost}.`;
    }
    case "days-above": {
      const run = d.daysAbove30;
      return run ? `Average afternoons here pass 30 °C from ${dayLabel(run.start)} to ${dayLabel(run.end)}.` : null;
    }
    case "bees":
      return day == null ? null : s.phase === "start" ? `Average afternoons here pass 13 °C from ${on}.` : `Average afternoons here fall below 13 °C from ${on}.`;
    case "heating":
      return day == null ? null : `The heating season here starts in ${dayLabel(day).split(" ")[0]}.`;
    case "rains":
      return day == null ? null : `The wet season here starts in ${dayLabel(day).split(" ")[0]}.`;
    case "dry":
      return day == null ? null : `The dry season here starts in ${dayLabel(day).split(" ")[0]}.`;
    case "frost-free":
      return d.frostRare
        ? "Frost is rare here, so this applies all year."
        : d.lastSpringFrost != null && d.firstFallFrost != null
          ? `The frost-free season here runs from ${dayLabel(d.lastSpringFrost)} to ${dayLabel(d.firstFallFrost)}.`
          : null;
  }
}

/** Whether two windows (each possibly wrapping New Year) share a day. */
export function overlaps(a: Window, b: Window): boolean {
  return inRun(a.start, b.start, b.end) || inRun(b.start, a.start, a.end);
}

export type DueTask = { task: HomesteadTask; window: Window; trigger: string | null };

/** Every task with its window at this place (tasks whose signal never comes are left out). */
export function tasksFor(d: SignalDates, tasks: HomesteadTask[] = TASKS): DueTask[] {
  const out: DueTask[] = [];
  for (const task of tasks) {
    const window = signalWindow(task.signal, d);
    if (window) out.push({ task, window, trigger: triggerLine(task.signal, d) });
  }
  return out;
}

/** Days two windows share. */
export function sharedDays(a: Window, b: Window): number {
  let n = 0;
  for (let d = 1; d <= 365; d++) if (inRun(d, a.start, a.end) && inRun(d, b.start, b.end)) n++;
  return n;
}

/** The tasks due in a month (1–12) at this place: windows sharing at least five days with the month. */
export function tasksInMonth(d: SignalDates, month: number, tasks: HomesteadTask[] = TASKS): DueTask[] {
  const m: Window = { start: monthStart(month), end: monthEnd(month) };
  return tasksFor(d, tasks).filter((t) => sharedDays(t.window, m) >= 5);
}

/** "Aug 7 to Sep 4", or "all year". */
export function windowLabel(w: Window): string {
  if (w.start === 1 && w.end === 365) return "all year";
  return `${dayLabel(w.start)} to ${dayLabel(w.end)}`;
}
