/**
 * The season word a page shows for a place today.
 *
 * `LocalData.season` is the temperate meteorological season in the place's
 * hemisphere ("Spring" | "Summer" | "Fall" | "Winter"), which is wrong word
 * for word in the tropics: the audit found a "Fall" tile on Lagos and a
 * "Spring" tile on Nairobi (RF-findings L14). Agent A's `seasonLabel(d)` in
 * src/lib/local-data gives the regime's own season words; this module hands
 * the pages that, and keeps its own reading of the regime as the fallback
 * (and as the named rain runs the AI fact sheet lists): the local name of the
 * rains in a wet month, "Dry season" otherwise, and the temperate word
 * (autumn, not fall, outside the US) in the temperate zones.
 *
 * // source: Kenya Meteorological Department — "The March to May period is the major
 * //   rainfall season (long rains)"; "October-December 'Short-Rains'"
 * //   https://meteo.go.ke/documents/10/MAM_2024_Forecast.pdf
 * // source: NiMet / Lagos Island 1991–2020 normals — wet May–October with the July–August
 * //   "August break" (https://en.wikipedia.org/wiki/Lagos, climate section)
 */
import { seasonLabel } from "./local-data";
import { regionContext, seasonWord, type RegionContext } from "./region-context";
import type { LocalData, Regime } from "./types";

/** East African usage: the long rains are the March–May season, the short rains October–December. */
const EAST_AFRICA = new Set(["KE", "TZ", "UG", "RW", "BI", "ET", "SO", "SS"]);

/** Consecutive runs of months, kept whole across December. */
export function monthRuns(months: number[]): number[][] {
  const set = new Set(months);
  if (set.size === 12) return [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]];
  const runs: number[][] = [];
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || set.has(((m + 10) % 12) + 1)) continue;
    const run = [m];
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) {
      end = (end % 12) + 1;
      run.push(end);
    }
    runs.push(run);
  }
  return runs;
}

export type RainRun = { months: number[]; label: string };

/** The regime's wet runs with their local names: "Long rains", "Second rains", "Winter rains". */
export function rainRuns(r: Regime | null | undefined, countryCode: string | null): RainRun[] {
  if (!r) return [];
  const runs = monthRuns(r.wetMonths);
  if (!runs.length) return [];
  if (r.rain === "two-rainy-seasons") {
    if (countryCode && EAST_AFRICA.has(countryCode)) {
      return runs.map((months) => ({
        months,
        label: months.some((m) => m >= 3 && m <= 5) ? "Long rains" : months.some((m) => m >= 10 && m <= 12) ? "Short rains" : "Rains",
      }));
    }
    const ordered = [...runs].sort((a, b) => a[0] - b[0]);
    return ordered.map((months, i) => ({ months, label: i === 0 ? "First rains" : i === 1 ? "Second rains" : "Rains" }));
  }
  const label =
    r.rain === "winter-rain"
      ? "Winter rains"
      : r.rain === "summer-rain"
        ? "Summer rains"
        : r.rain === "year-round" && runs[0].length === 12
          ? "Rain through the year"
          : "Rainy season";
  return runs.map((months) => ({ months, label }));
}

/**
 * "Autumn", "Spring", "Short rains", "Dry season": the season word for the
 * place today, in the reader's own vocabulary.
 */
export function seasonLabelFor(d: LocalData, ctx: RegionContext = regionContext(d.place)): string {
  // Agent A's climate-truth words (src/lib/local-data seasonLabel), landed 14 Oct 2026.
  try {
    const a = seasonLabel(d);
    if (a) return a;
  } catch {
    /* fall back to the regime words below */
  }
  if (ctx.tropical && d.regime) {
    const run = rainRuns(d.regime, ctx.countryCode).find((x) => x.months.includes(d.month));
    if (run) return run.label;
    return "Dry season";
  }
  return seasonWord(d.season, ctx);
}
