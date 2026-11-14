/**
 * Which regions border which, and how each neighbour differs in the numbers.
 *
 * The borders are read off the classifier's own map (src/lib/ecoregions.jsx):
 * two regions are neighbours where its latitude–longitude boxes meet on the
 * same continent, plus the two sea crossings a reader would expect (the
 * Mediterranean, the Mozambique Channel). Hawaiʻi borders nothing.
 * The contrast line is computed from the regions' town medians, never written.
 */
import { getEcoregion } from "@/lib/ecoregions";
import { regionStats, type RegionStats } from "./stats";

export const NEIGHBOURS: Record<string, string[]> = {
  "boreal-north": ["boreal-forest", "western-mountains", "pacific-maritime", "great-plains"],
  "boreal-forest": ["boreal-north", "great-lakes-st-lawrence", "acadian-forest", "great-plains", "western-mountains", "pacific-maritime"],
  "acadian-forest": ["boreal-forest", "great-lakes-st-lawrence", "northeast-coast"],
  "great-lakes-st-lawrence": ["boreal-forest", "acadian-forest", "northeast-coast", "appalachian", "central-hardwoods", "great-plains"],
  "northeast-coast": ["acadian-forest", "great-lakes-st-lawrence", "appalachian", "southeastern"],
  appalachian: ["great-lakes-st-lawrence", "northeast-coast", "central-hardwoods", "southeastern"],
  "central-hardwoods": ["great-lakes-st-lawrence", "appalachian", "southeastern", "gulf-coast", "great-plains"],
  southeastern: ["northeast-coast", "appalachian", "central-hardwoods", "gulf-coast", "florida-peninsula"],
  "gulf-coast": ["central-hardwoods", "southeastern", "florida-peninsula", "great-plains"],
  "florida-peninsula": ["southeastern", "gulf-coast"],
  "great-plains": ["boreal-forest", "great-lakes-st-lawrence", "central-hardwoods", "gulf-coast", "western-mountains", "deserts"],
  "western-mountains": ["boreal-north", "boreal-forest", "great-plains", "pacific-maritime", "deserts"],
  "pacific-maritime": ["boreal-north", "boreal-forest", "western-mountains", "mediterranean-california"],
  "mediterranean-california": ["pacific-maritime", "deserts"],
  deserts: ["western-mountains", "great-plains", "mediterranean-california"],
  "hawaii-tropics": [],
  "atlantic-europe": ["boreal-europe", "continental-europe", "alpine-europe", "mediterranean-europe"],
  "continental-europe": ["atlantic-europe", "boreal-europe", "alpine-europe", "pannonian-steppe", "mediterranean-europe"],
  "boreal-europe": ["atlantic-europe", "continental-europe"],
  "alpine-europe": ["atlantic-europe", "continental-europe", "mediterranean-europe", "pannonian-steppe"],
  "mediterranean-europe": ["atlantic-europe", "continental-europe", "alpine-europe", "pannonian-steppe", "north-africa-mediterranean"],
  "pannonian-steppe": ["continental-europe", "alpine-europe", "mediterranean-europe"],
  "north-africa-mediterranean": ["sahara-nile", "mediterranean-europe"],
  "sahara-nile": ["north-africa-mediterranean", "sahel-savanna", "east-african-highlands", "swahili-coast"],
  "sahel-savanna": ["sahara-nile", "guinean-forest", "congo-basin", "east-african-highlands"],
  "guinean-forest": ["sahel-savanna", "congo-basin"],
  "congo-basin": ["guinean-forest", "sahel-savanna", "east-african-highlands", "southern-savanna"],
  "east-african-highlands": ["sahara-nile", "sahel-savanna", "congo-basin", "swahili-coast", "southern-savanna"],
  "swahili-coast": ["sahara-nile", "east-african-highlands", "southern-savanna", "madagascar-islands"],
  "southern-savanna": ["congo-basin", "east-african-highlands", "swahili-coast", "highveld-drakensberg", "namib-karoo", "cape-fynbos"],
  "highveld-drakensberg": ["southern-savanna", "namib-karoo", "cape-fynbos"],
  "namib-karoo": ["southern-savanna", "highveld-drakensberg", "cape-fynbos"],
  "cape-fynbos": ["namib-karoo", "highveld-drakensberg", "southern-savanna"],
  "madagascar-islands": ["swahili-coast"],
};

export type Neighbour = {
  slug: string;
  name: string;
  /** "Drier (520 vs 900 mm) and colder at its coldest (−8 vs 1 °C) than here." Empty when either side has no towns. */
  contrast: string;
  /** Pre-built towns in the neighbour. */
  towns: number;
};

const sign = (x: number) => `${x < 0 ? "−" : ""}${Math.abs(Math.round(x))}`;

/** One line on how `other` differs from `self`, from the town medians; "" when there is nothing to compare. */
export function contrastLine(self: RegionStats, other: RegionStats): string {
  if (!self.towns.length || !other.towns.length) return "";
  const parts: string[] = [];
  const r1 = self.medianRainMm;
  const r2 = other.medianRainMm;
  if (r1 != null && r2 != null && r1 > 0 && Math.abs(r2 - r1) / r1 >= 0.15) parts.push(`${r2 < r1 ? "drier" : "wetter"} (${Math.round(r2).toLocaleString("en")} vs ${Math.round(r1).toLocaleString("en")} mm)`);
  const c1 = self.medianColdestC;
  const c2 = other.medianColdestC;
  if (c1 != null && c2 != null && Math.abs(c2 - c1) >= 2) parts.push(`${c2 < c1 ? "colder" : "milder"} at its coldest (${sign(c2)} vs ${sign(c1)} °C)`);
  const h1 = self.medianWarmestC;
  const h2 = other.medianWarmestC;
  if (h1 != null && h2 != null && Math.abs(h2 - h1) >= 2) parts.push(`${h2 < h1 ? "cooler" : "hotter"} at its hottest (${sign(h2)} vs ${sign(h1)} °C)`);
  const f1 = self.medianFrostFreeDays;
  const f2 = other.medianFrostFreeDays;
  if (!parts.length && f1 != null && f2 != null && Math.abs(f2 - f1) >= 20) parts.push(`a ${f2 < f1 ? "shorter" : "longer"} frost-free season (${Math.round(f2)} vs ${Math.round(f1)} days)`);
  if (!parts.length) return "Much the same numbers at the towns compared.";
  const s = parts.length <= 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `${s.charAt(0).toUpperCase()}${s.slice(1)} than here.`;
}

/** The region's neighbours, each with a one-line contrast from the data. */
export function neighboursOf(slug: string): Neighbour[] {
  const self = regionStats(slug);
  return (NEIGHBOURS[slug] ?? [])
    .map((s) => {
      const r = getEcoregion(s) as { slug: string; name: string } | undefined;
      if (!r) return null;
      const other = regionStats(s);
      return { slug: s, name: r.name, contrast: contrastLine(self, other), towns: other.towns.length };
    })
    .filter((n): n is Neighbour => !!n);
}
