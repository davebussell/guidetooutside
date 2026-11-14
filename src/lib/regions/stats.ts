/**
 * A region at a glance: the ranges its pre-built towns span, each with the
 * one-line method the number was read by. Nothing is averaged across the
 * region beyond a median for ordering and contrast; the ranges are the point.
 */
import { RAIN_WORDS, SHORT, degRange, median, rangeText, zoneCompare, zoneRange } from "./format";
import { townsInRegion } from "./towns";
import type { RainPattern } from "@/lib/types";
import type { TownRow } from "./types";

export type Figure = {
  key: string;
  label: string;
  value: string;
  /** A second line under the value: which towns sit at the ends, or how many are which. */
  note?: string;
  /** How the number was read, in one line. */
  method: string;
};

export type RegionStats = {
  slug: string;
  towns: TownRow[];
  figures: Figure[];
  /** Counts for the index cards and contrasts. */
  zoneLow: string | null;
  zoneHigh: string | null;
  rainPatterns: { rain: RainPattern; towns: number }[];
  /** The pattern most towns have. */
  rain: RainPattern | null;
  frostLed: number;
  frostRare: number;
  medianRainMm: number | null;
  medianColdestC: number | null;
  medianWarmestC: number | null;
  medianFrostFreeDays: number | null;
};

const ends = (ts: TownRow[], v: (t: TownRow) => number | null): { lo: TownRow; hi: TownRow } | null => {
  const have = ts.filter((t) => v(t) != null);
  if (!have.length) return null;
  const sorted = [...have].sort((a, b) => v(a)! - v(b)!);
  return { lo: sorted[0], hi: sorted[sorted.length - 1] };
};

const STATS = new Map<string, RegionStats>();

export function regionStats(slug: string): RegionStats {
  const hit = STATS.get(slug);
  if (hit) return hit;
  const towns = townsInRegion(slug);
  const withClimate = towns.filter((t) => t.hasClimate);
  const figures: Figure[] = [];

  figures.push({
    key: "towns",
    label: "Towns covered",
    value: towns.length ? `${towns.length} pre-built ${towns.length === 1 ? "town" : "towns"}` : "No pre-built towns yet",
    note: towns.length ? undefined : "Search any town in the region and it is classified here.",
    method: "The site's pre-built towns whose coordinates fall in this region (classifyEcoregion), the same test every town page uses.",
  });

  const zones = withClimate.map((t) => t.zone).filter((z): z is string => !!z).sort(zoneCompare);
  const official = withClimate.filter((t) => t.zoneSource === "usda-2023" || t.zoneSource === "nrcan").length;
  const zEnds = zones.length ? { lo: withClimate.find((t) => t.zone === zones[0])!, hi: withClimate.find((t) => t.zone === zones[zones.length - 1])! } : null;
  figures.push({
    key: "zones",
    label: "Hardiness zones",
    value: zoneRange(zones),
    note: zEnds && zEnds.lo.slug !== zEnds.hi.slug ? `${zEnds.lo.name} to ${zEnds.hi.name}` : undefined,
    method: !withClimate.length
      ? "Read from each town's climate record once a town here is pre-built."
      : official === withClimate.length && official
        ? "Official USDA 2023 and NRCan zone maps at each town."
        : official
          ? `Official USDA 2023 or NRCan map for ${official} of ${withClimate.length} towns; the rest from the ten-year mean annual extreme minimum (ERA5), on the USDA scale.`
          : "No official zone map here: each zone is from the ten-year mean annual extreme minimum (ERA5), on the USDA scale.",
  });

  const frosty = withClimate.filter((t) => !t.frostRare);
  const rare = withClimate.filter((t) => t.frostRare);
  const ffEnds = ends(frosty, (t) => t.frostFreeDays);
  const stations = withClimate.filter((t) => t.frostSource === "stations").length;
  figures.push({
    key: "frost",
    label: "Frost-free season",
    value: !withClimate.length ? "—" : !frosty.length ? "Frost-free year-round" : rangeText(frosty.map((t) => t.frostFreeDays), (d) => `${d} days`),
    note: !frosty.length
      ? undefined
      : `${
          ffEnds && ffEnds.lo.slug !== ffEnds.hi.slug
            ? `${ffEnds.lo.name} (${ffEnds.lo.lastFrost} – ${ffEnds.lo.firstFrost}) to ${ffEnds.hi.name} (${ffEnds.hi.lastFrost} – ${ffEnds.hi.firstFrost})`
            : `${frosty[0].name} (${frosty[0].lastFrost} – ${frosty[0].firstFrost})`
        }${rare.length ? `; frost is rare in ${rare.length === 1 ? rare[0].name : frosty.length === 1 ? `the other ${rare.length}` : `${rare.length} towns`}` : ""}`,
    method: !withClimate.length
      ? "Read from each town's frost record once a town here is pre-built."
      : stations === withClimate.length && stations
        ? "Average last spring and first autumn frost from GHCN weather stations within 15 km of each town."
        : stations
          ? `GHCN station normals within 15 km for ${stations} of ${withClimate.length} towns; elsewhere the ERA5 daily minimum read at 4.5 °C, the grid temperature below which a ground frost is likely.`
          : "No frost stations within 15 km of these towns: the ERA5 daily minimum read at 4.5 °C, the grid temperature below which a ground frost is likely.",
  });

  const rainy = withClimate.filter((t) => t.rainMm != null);
  const rEnds = ends(rainy, (t) => t.rainMm);
  const patterns = new Map<RainPattern, number>();
  for (const t of rainy) if (t.rain) patterns.set(t.rain, (patterns.get(t.rain) ?? 0) + 1);
  const rainPatterns = [...patterns.entries()].map(([rain, n]) => ({ rain, towns: n })).sort((a, b) => b.towns - a.towns);
  const noRain = withClimate.length - rainy.length;
  figures.push({
    key: "rain",
    label: "Precipitation a year",
    value: rangeText(rainy.map((t) => t.rainMm), (x) => `${x.toLocaleString("en")} mm`),
    note: rEnds ? `${rEnds.lo.slug !== rEnds.hi.slug ? `${rEnds.lo.name} to ${rEnds.hi.name} · ` : ""}${rainPatterns.map((p) => `${RAIN_WORDS[p.rain]}${rainPatterns.length > 1 ? ` (${p.towns})` : ""}`).join(", ")}${noRain ? ` · no rain record for ${noRain}` : ""}` : undefined,
    method: "Monthly totals of rain and melted snow: a weather station's 1991–2020 record within 15 km where there is one (NOAA GHCN-Daily), otherwise ten years of ERA5; the pattern from the share falling in the summer half of the year (two seasons where the wet months come in two runs near the equator).",
  });

  const cEnds = ends(withClimate, (t) => t.coldestC);
  figures.push({
    key: "cold",
    label: "Coldest month",
    value: degRange(withClimate.map((t) => t.coldestC)),
    note: cEnds ? `${cEnds.lo.name} (${SHORT[(cEnds.lo.coldestMonth ?? 1) - 1]})${cEnds.lo.slug !== cEnds.hi.slug ? ` to ${cEnds.hi.name} (${SHORT[(cEnds.hi.coldestMonth ?? 1) - 1]})` : ""}` : undefined,
    method: "Mean of the daily highs and lows of each town's coldest month, ten years of ERA5.",
  });
  const hEnds = ends(withClimate, (t) => t.warmestC);
  figures.push({
    key: "hot",
    label: "Hottest month",
    value: degRange(withClimate.map((t) => t.warmestC)),
    note: hEnds ? `${hEnds.lo.name} (${SHORT[(hEnds.lo.warmestMonth ?? 1) - 1]})${hEnds.lo.slug !== hEnds.hi.slug ? ` to ${hEnds.hi.name} (${SHORT[(hEnds.hi.warmestMonth ?? 1) - 1]})` : ""}` : undefined,
    method: "Mean of the daily highs and lows of each town's warmest month, ten years of ERA5.",
  });

  const eEnds = ends(withClimate, (t) => t.elevationM);
  if (eEnds)
    figures.push({
      key: "elevation",
      label: "Elevation",
      value: rangeText(withClimate.map((t) => t.elevationM), (x) => `${x.toLocaleString("en")} m`),
      note: eEnds.lo.slug !== eEnds.hi.slug ? `${eEnds.lo.name} to ${eEnds.hi.name}` : undefined,
      method: "The elevation of each town's ERA5 grid cell (Open-Meteo), not of the town square.",
    });

  const stats: RegionStats = {
    slug,
    towns,
    figures,
    zoneLow: zones[0] ?? null,
    zoneHigh: zones[zones.length - 1] ?? null,
    rainPatterns,
    rain: rainPatterns[0]?.rain ?? null,
    frostLed: withClimate.filter((t) => t.frostLed && !t.frostRare).length,
    frostRare: rare.length,
    medianRainMm: median(rainy.map((t) => t.rainMm)),
    medianColdestC: median(withClimate.map((t) => t.coldestC)),
    medianWarmestC: median(withClimate.map((t) => t.warmestC)),
    medianFrostFreeDays: median(withClimate.map((t) => t.frostFreeDays)),
  };
  STATS.set(slug, stats);
  return stats;
}
