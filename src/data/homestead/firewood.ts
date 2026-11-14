/**
 * Heat in firewood, by species. Sources: src/data/homestead/SOURCES.md.
 *
 * Density is each species' basic wood density (oven-dry mass per green
 * volume, t/m³) from the Global Wood Density Database (Zanne et al. 2009,
 * read through the R package BIOMASS 2.2.7-1; the mean of its records for the
 * species, `records` of them). The heat follows the method of the Bavarian
 * State Institute of Forestry's leaflet Merkblatt 20 (LWF 2025):
 *
 *   wet mass of a solid m³ at 20 % water content = density × 1000 ÷ 0.8
 *   heat of that solid m³ = wet mass × net heating value at 20 % water
 *     (4.02 kWh/kg for conifers, 3.86 kWh/kg for broadleaved trees)
 *   heat of a stacked m³ (a stere) = solid m³ × 0.7
 *
 * Checked against the leaflet's own figures (beech 1,885 kWh, spruce 1,333
 * kWh per stere): this table gives 1,976 and 1,301, the gap coming from the
 * different density sources. A cord is 3.62 stacked m³ (128 ft³), converted
 * with the same 0.7 solid share; 1 kWh = 3,412 BTU. These are net heat values
 * (the steam leaving the flue carries the rest), so they run below tables of
 * gross heat such as the University of Kentucky's.
 */
export type WoodRegion = "north-america" | "europe" | "africa";

export type FirewoodSpecies = {
  name: string;
  latin: string;
  region: WoodRegion;
  /** Conifer (softwood) or broadleaved (hardwood). */
  kind: "conifer" | "broadleaf";
  /** Basic density, t/m³ (oven-dry mass per green volume), GWDD mean. */
  density: number;
  /** How many GWDD records the mean is taken from. */
  records: number;
};

const RAW: FirewoodSpecies[] = [
  { name: "Sugar maple", latin: "Acer saccharum", region: "north-america", kind: "broadleaf", density: 0.56, records: 1 },
  { name: "Red maple", latin: "Acer rubrum", region: "north-america", kind: "broadleaf", density: 0.49, records: 1 },
  { name: "Northern red oak", latin: "Quercus rubra", region: "north-america", kind: "broadleaf", density: 0.56, records: 1 },
  { name: "White oak", latin: "Quercus alba", region: "north-america", kind: "broadleaf", density: 0.63, records: 2 },
  { name: "Bur oak", latin: "Quercus macrocarpa", region: "north-america", kind: "broadleaf", density: 0.58, records: 1 },
  { name: "White ash", latin: "Fraxinus americana", region: "north-america", kind: "broadleaf", density: 0.55, records: 1 },
  { name: "Shagbark hickory", latin: "Carya ovata", region: "north-america", kind: "broadleaf", density: 0.64, records: 1 },
  { name: "American beech", latin: "Fagus grandifolia", region: "north-america", kind: "broadleaf", density: 0.56, records: 1 },
  { name: "Yellow birch", latin: "Betula alleghaniensis", region: "north-america", kind: "broadleaf", density: 0.55, records: 1 },
  { name: "Paper birch", latin: "Betula papyrifera", region: "north-america", kind: "broadleaf", density: 0.48, records: 1 },
  { name: "Black cherry", latin: "Prunus serotina", region: "north-america", kind: "broadleaf", density: 0.47, records: 1 },
  { name: "Black locust", latin: "Robinia pseudoacacia", region: "north-america", kind: "broadleaf", density: 0.675, records: 5 },
  { name: "Ironwood (hophornbeam)", latin: "Ostrya virginiana", region: "north-america", kind: "broadleaf", density: 0.63, records: 1 },
  { name: "American elm", latin: "Ulmus americana", region: "north-america", kind: "broadleaf", density: 0.46, records: 1 },
  { name: "Quaking aspen", latin: "Populus tremuloides", region: "north-america", kind: "broadleaf", density: 0.35, records: 1 },
  { name: "Honey mesquite", latin: "Prosopis glandulosa", region: "north-america", kind: "broadleaf", density: 0.709, records: 3 },
  { name: "Douglas-fir", latin: "Pseudotsuga menziesii", region: "north-america", kind: "conifer", density: 0.428, records: 3 },
  { name: "Tamarack", latin: "Larix laricina", region: "north-america", kind: "conifer", density: 0.49, records: 1 },
  { name: "Ponderosa pine", latin: "Pinus ponderosa", region: "north-america", kind: "conifer", density: 0.38, records: 1 },
  { name: "Eastern white pine", latin: "Pinus strobus", region: "north-america", kind: "conifer", density: 0.34, records: 1 },
  { name: "White spruce", latin: "Picea glauca", region: "north-america", kind: "conifer", density: 0.33, records: 1 },
  { name: "European beech", latin: "Fagus sylvatica", region: "europe", kind: "broadleaf", density: 0.585, records: 2 },
  { name: "Hornbeam", latin: "Carpinus betulus", region: "europe", kind: "broadleaf", density: 0.693, records: 2 },
  { name: "Pedunculate oak", latin: "Quercus robur", region: "europe", kind: "broadleaf", density: 0.575, records: 7 },
  { name: "Ash", latin: "Fraxinus excelsior", region: "europe", kind: "broadleaf", density: 0.57, records: 3 },
  { name: "Silver birch", latin: "Betula pendula", region: "europe", kind: "broadleaf", density: 0.512, records: 2 },
  { name: "Sycamore maple", latin: "Acer pseudoplatanus", region: "europe", kind: "broadleaf", density: 0.509, records: 2 },
  { name: "Sweet chestnut", latin: "Castanea sativa", region: "europe", kind: "broadleaf", density: 0.463, records: 3 },
  { name: "Black alder", latin: "Alnus glutinosa", region: "europe", kind: "broadleaf", density: 0.42, records: 3 },
  { name: "Aspen", latin: "Populus tremula", region: "europe", kind: "broadleaf", density: 0.373, records: 2 },
  { name: "Holm oak", latin: "Quercus ilex", region: "europe", kind: "broadleaf", density: 0.82, records: 1 },
  { name: "Olive", latin: "Olea europaea", region: "europe", kind: "broadleaf", density: 0.806, records: 2 },
  { name: "European larch", latin: "Larix decidua", region: "europe", kind: "conifer", density: 0.474, records: 1 },
  { name: "Scots pine", latin: "Pinus sylvestris", region: "europe", kind: "conifer", density: 0.395, records: 5 },
  { name: "Norway spruce", latin: "Picea abies", region: "europe", kind: "conifer", density: 0.37, records: 1 },
  { name: "Blue gum", latin: "Eucalyptus globulus", region: "africa", kind: "broadleaf", density: 0.722, records: 11 },
  { name: "Rose gum (flooded gum)", latin: "Eucalyptus grandis", region: "africa", kind: "broadleaf", density: 0.662, records: 3 },
  { name: "Black wattle", latin: "Acacia mearnsii", region: "africa", kind: "broadleaf", density: 0.66, records: 3 },
  { name: "Sweet thorn", latin: "Acacia karroo", region: "africa", kind: "broadleaf", density: 0.689, records: 1 },
  { name: "Mopane", latin: "Colophospermum mopane", region: "africa", kind: "broadleaf", density: 0.904, records: 1 },
  { name: "Silky oak", latin: "Grevillea robusta", region: "africa", kind: "broadleaf", density: 0.521, records: 17 },
  { name: "Mango", latin: "Mangifera indica", region: "africa", kind: "broadleaf", density: 0.553, records: 6 },
  { name: "Patula pine", latin: "Pinus patula", region: "africa", kind: "conifer", density: 0.418, records: 2 },
];

/** Net heating value at 20 % water content, kWh per kg of wet wood (LWF Merkblatt 20). */
export const HEAT_AT_20 = { conifer: 4.02, broadleaf: 3.86 } as const;
/** Net heating value of oven-dry wood, kWh/kg (LWF): conifers carry more lignin and resin. */
export const HEAT_DRY = { conifer: 5.2, broadleaf: 5.0 } as const;
/** Air-dry (15–20 %) and fresh (50 % and more) wood, kWh/kg (LWF). */
export const HEAT_AIR_DRY_KWH_KG = 4;
export const HEAT_FRESH_KWH_KG = 2;
/** Solid wood in a stacked cubic metre (LWF), and stacked m³ in a cord (128 ft³). */
export const SOLID_PER_STERE = 0.7;
export const STERES_PER_CORD = 3.6246;
const BTU_PER_KWH = 3412.14;

/** Heat in one stacked cubic metre at 20 % water content (kWh). */
export function kwhPerStere(s: Pick<FirewoodSpecies, "density" | "kind">): number {
  return ((s.density * 1000) / 0.8) * HEAT_AT_20[s.kind] * SOLID_PER_STERE;
}

/** The same heat per cord, in millions of BTU. */
export function mbtuPerCord(s: Pick<FirewoodSpecies, "density" | "kind">): number {
  return (kwhPerStere(s) * STERES_PER_CORD * BTU_PER_KWH) / 1e6;
}

export type FirewoodRow = FirewoodSpecies & { kwhStere: number; mbtuCord: number };

/** Every species with its heat values (kWh to the nearest 10, MBTU to one decimal), densest first within each region. */
export const FIREWOOD: FirewoodRow[] = RAW.map((s) => ({ ...s, kwhStere: Math.round(kwhPerStere(s) / 10) * 10, mbtuCord: Math.round(mbtuPerCord(s) * 10) / 10 })).sort(
  (a, b) => (a.region === b.region ? b.kwhStere - a.kwhStere : 0),
);

export const WOOD_REGION_LABEL: Record<WoodRegion, string> = {
  "north-america": "North America",
  europe: "Europe",
  africa: "Africa",
};

/** The leaflet's own worked figures, kWh per stacked m³ at 20 % water (LWF). */
export const LWF_REFERENCE = { beech: 1885, birch: 1777, pine: 1516, spruce: 1333 } as const;

/** Gross heat per cord at 20 % moisture, million BTU, from the University of Kentucky table, for comparison. */
export const UKY_GROSS_MBTU = { Hickory: 29.3, "White oak": 27.9, "Sugar maple": 25.9, "Red oak": 25.9, "White ash": 24.6, "White pine": 15.0 } as const;
