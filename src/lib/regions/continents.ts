/**
 * How the regions of one continent differ, in a few lines computed from
 * their towns: the driest and wettest, the coldest and warmest winters, and
 * how many run on frost dates rather than rain.
 */
import type { RainPattern } from "@/lib/types";
import { regionStats, type RegionStats } from "./stats";

export type RegionCard = {
  slug: string;
  name: string;
  towns: number;
  /** "5a–7a", or null with no towns. */
  zones: string | null;
  rain: RainPattern | null;
  frostLed: boolean;
};

const sign = (x: number) => `${x < 0 ? "−" : ""}${Math.abs(Math.round(x))}`;

export function regionCard(r: { slug: string; name: string }): RegionCard {
  const s = regionStats(r.slug);
  return {
    slug: r.slug,
    name: r.name,
    towns: s.towns.length,
    zones: s.zoneLow ? (s.zoneLow === s.zoneHigh ? s.zoneLow : `${s.zoneLow}–${s.zoneHigh}`) : null,
    rain: s.rain,
    frostLed: s.towns.length > 0 && s.frostLed > s.towns.length / 2,
  };
}

/** The continent's regions summed up against each other. "" when none has towns. */
export function continentIntro(regions: { slug: string; name: string }[]): string {
  const stats = regions.map((r) => regionStats(r.slug)).filter((s) => s.towns.length);
  if (!stats.length) return "";
  const name = (s: RegionStats) => regions.find((r) => r.slug === s.slug)!.name;
  const towns = stats.reduce((a, s) => a + s.towns.length, 0);
  const byRain = stats.filter((s) => s.medianRainMm != null).sort((a, b) => a.medianRainMm! - b.medianRainMm!);
  const byCold = stats.filter((s) => s.medianColdestC != null).sort((a, b) => a.medianColdestC! - b.medianColdestC!);
  const frostLed = stats.filter((s) => s.frostLed > s.towns.length / 2).length;
  const parts: string[] = [];
  parts.push(`${regions.length} regions, ${towns} pre-built towns between them.`);
  if (byRain.length >= 2) {
    const d = byRain[0];
    const w = byRain[byRain.length - 1];
    parts.push(
      `Precipitation (rain and melted snow) at the towns runs from about${Math.round(d.medianRainMm!).toLocaleString("en")} mm a year in the ${name(d)} to ${Math.round(w.medianRainMm!).toLocaleString("en")} mm in the ${name(w)}.`,
    );
  }
  if (byCold.length >= 2) {
    const c = byCold[0];
    const m = byCold[byCold.length - 1];
    parts.push(`The coldest month averages ${sign(c.medianColdestC!)} °C in the ${name(c)} and ${sign(m.medianColdestC!)} °C in the ${name(m)}.`);
  }
  if (frostLed === stats.length) parts.push("Frost dates frame the garden year in every one of them.");
  else if (frostLed === 0) parts.push("Frost frames the garden year in none of them: the rains and the heat do.");
  else parts.push(`Frost dates frame the garden year in ${frostLed} of the ${stats.length} with towns; in the rest the rains, or the heat, set the calendar.`);
  return parts.join(" ").replace(/the (Atlantic|Continental|Mediterranean|Madagascar)\b/g, "$1");
}
