/**
 * The region's year, month by month: how many of its towns are clear of frost,
 * how many are in their rainy or dry months, and how many library species and
 * fish are in season — each from the town's own record, laid on the calendar.
 *
 * Hemisphere-honest: a southern town's frost dates are converted from its
 * July-start frost year to calendar months, wet and dry months come from the
 * town's own Köppen reading (src/lib/regime), and the species counts use the
 * library's own southern shift (speciesNow / creaturesNow). The ribbon starts
 * in July for a southern region so its growing season is not cut in two; no
 * band is simply slid by six months.
 */
import { getEcoregion } from "@/lib/ecoregions";
import { FISH, creaturesNow } from "@/lib/nature";
import { speciesNow } from "@/lib/species";
import { monthOfDoy, townsInRegion } from "./towns";
import type { RainPattern } from "@/lib/types";
import type { TownRow } from "./types";

export type SeasonMonth = {
  /** Calendar month, 1–12. */
  m: number;
  /** Towns clear of frost for the whole month (towns with rare frost count every month). */
  frostFree: number;
  /** Towns in a rainy month, and in a dry month (Gaussen), by their own regime. */
  wet: number;
  dry: number;
  /** Wild edibles and fish in season in the region this month, in its local calendar. */
  species: number;
  fish: number;
};

export type RegionSeason = {
  slug: string;
  south: boolean;
  /** The months in display order: January first, or July first for a southern region. */
  order: number[];
  months: SeasonMonth[];
  /** Towns with a climate record, with frost, with frost rare, with a rain record. */
  towns: number;
  frostTowns: number;
  frostRareTowns: number;
  rainTowns: number;
  /** For the towns with frost: the months the last spring frost and first autumn frost fall in, earliest to latest. */
  lastFrost: { earliest: number; latest: number; earliestTown: string; latestTown: string } | null;
  firstFrost: { earliest: number; latest: number; earliestTown: string; latestTown: string } | null;
  /** The pattern most towns have, and the months most towns call wet. */
  rain: RainPattern | null;
  wettest: number[];
  /** Months with the most wild edibles in season (at least two-thirds of the year's peak). */
  forage: number[];
  peakSpecies: number;
};

const MONTH_START = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
const MONTH_END = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

/** Whether the whole of month `m` lies inside a town's frost-free window (a week after the last frost to the first). */
export function monthFrostFree(t: TownRow, m: number): boolean {
  if (!t.hasClimate) return false;
  if (t.frostRare) return true;
  const last = t.lastFrostDoy!;
  const first = t.firstFrostDoy!;
  const start = MONTH_START[m - 1];
  const end = MONTH_END[m - 1];
  if (last < first) return start >= last + 7 && end <= first;
  // The window wraps the new year (a southern town): clear after the last frost, or before the first.
  return start >= last + 7 || end <= first;
}

const spread = (ts: TownRow[], v: (t: TownRow) => number | null) => {
  const have = ts.filter((t) => v(t) != null);
  if (!have.length) return null;
  const sorted = [...have].sort((a, b) => v(a)! - v(b)!);
  const lo = sorted[0];
  const hi = sorted[sorted.length - 1];
  return { earliest: monthOfDoy(v(lo)!), latest: monthOfDoy(v(hi)!), earliestTown: lo.name, latestTown: hi.name };
};

const SEASONS = new Map<string, RegionSeason>();

export function regionSeason(slug: string): RegionSeason {
  const hit = SEASONS.get(slug);
  if (hit) return hit;
  const region = getEcoregion(slug) as { south?: boolean } | undefined;
  const south = !!region?.south;
  const towns = townsInRegion(slug).filter((t) => t.hasClimate);
  const frosty = towns.filter((t) => !t.frostRare);
  const rainy = towns.filter((t) => t.hasRain);
  const months: SeasonMonth[] = [];
  for (let m = 1; m <= 12; m++) {
    months.push({
      m,
      frostFree: towns.filter((t) => monthFrostFree(t, m)).length,
      wet: rainy.filter((t) => t.wetMonths.includes(m)).length,
      dry: rainy.filter((t) => t.dryMonths.includes(m)).length,
      species: speciesNow(m, slug).length,
      fish: creaturesNow(FISH, m, slug).length,
    });
  }
  const patterns = new Map<RainPattern, number>();
  for (const t of rainy) if (t.rain) patterns.set(t.rain, (patterns.get(t.rain) ?? 0) + 1);
  const rain = [...patterns.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const wetMax = Math.max(0, ...months.map((x) => x.wet));
  const peakSpecies = Math.max(0, ...months.map((x) => x.species));
  const season: RegionSeason = {
    slug,
    south,
    order: south ? [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    months,
    towns: towns.length,
    frostTowns: frosty.length,
    frostRareTowns: towns.length - frosty.length,
    rainTowns: rainy.length,
    lastFrost: spread(frosty, (t) => t.lastFrostDoy),
    firstFrost: spread(frosty, (t) => t.firstFrostDoy),
    rain,
    wettest: wetMax ? months.filter((x) => x.wet === wetMax).map((x) => x.m) : [],
    forage: peakSpecies ? months.filter((x) => x.species >= (2 * peakSpecies) / 3).map((x) => x.m) : [],
    peakSpecies,
  };
  SEASONS.set(slug, season);
  return season;
}
