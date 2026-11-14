/**
 * The pre-built towns of an ecological region, each reduced to the row a
 * regional guide compares: zone, frost, rain, the coldest and hottest month,
 * elevation and the water it sits on.
 *
 * Everything comes from what the site already holds for the 264 pre-built
 * towns — src/lib/known-places.json (the places), src/data/place-normals.json
 * (ten-year ERA5 normals with the frost dates and zone the town pages print),
 * src/lib/regime (Köppen class and rain pattern read from those normals) and
 * src/lib/water-setting (Natural Earth's coast, big-lake and big-river grid).
 * A town belongs to the region `classifyEcoregion` gives its coordinates, so
 * the table matches the region named at the top of each town's own pages.
 *
 * Server-only: the water grid is three-quarters of a megabyte. The rows
 * themselves are plain JSON and are handed to the client compare widget.
 */
import KNOWN from "@/lib/served-places";
import { PLACE_NORMALS } from "@/lib/climate-fallback";
import { classifyEcoregion } from "@/lib/ecoregions";
import { koppenText, regimeOf } from "@/lib/regime";
import { waterSetting } from "@/lib/water-setting";
import type { Climate, Place, Regime, RegimeId } from "@/lib/types";
import { displayName } from "./format";
import type { TownRow, WaterKind } from "./types";

export type { TownRow, WaterKind } from "./types";

const PLACES = KNOWN as Place[];
const NORMALS = new Map(PLACE_NORMALS.map((e) => [e.place.slug, e.climate]));

const round1 = (x: number) => Math.round(x * 10) / 10;

/** Index (0–11) of the largest and smallest value; the first on a tie. */
const argMax = (xs: number[]) => xs.reduce((best, x, i) => (x > xs[best] ? i : best), 0);
const argMin = (xs: number[]) => xs.reduce((best, x, i) => (x < xs[best] ? i : best), 0);

/**
 * A southern town's frost days are counted from 2 July (src/lib/frost); this
 * puts them back on the calendar (1 = 1 January) so every town's frost can be
 * laid on the same twelve months.
 */
export function calendarDoy(doy: number, south: boolean): number {
  if (!south) return doy;
  const d = doy + 182;
  return d > 365 ? d - 365 : d;
}

/** The month (1–12) a calendar day of the year falls in. */
export function monthOfDoy(doy: number): number {
  const ends = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  const d = Math.min(365, Math.max(1, Math.round(doy)));
  return ends.findIndex((e) => d <= e) + 1;
}

function waterOf(place: Place, climate: Climate | null): { kind: WaterKind; name: string | null; coast: boolean } {
  const w = waterSetting(place.lat, place.lon, [], climate);
  if (w.coast === "on") return { kind: "coast", name: null, coast: true };
  if (w.bigLake) return { kind: "lake", name: w.bigLake.name, coast: w.coast !== null };
  if (w.bigRiver) return { kind: "river", name: w.bigRiver, coast: w.coast !== null };
  if (w.coast === "near") return { kind: "near-coast", name: null, coast: true };
  return { kind: "inland", name: null, coast: false };
}

function rowOf(place: Place): TownRow {
  const c = NORMALS.get(place.slug) ?? null;
  const regime: Regime | null = c ? regimeOf(c, place.lat) : null;
  const water = waterOf(place, c);
  const south = !!c?.south;
  const frostRare = !!c && (c.lastSpringFrost === "Rare" || c.firstFallFrost === "Rare");
  const means = c ? c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2) : null;
  const rain = c?.monthlyRainMm && c.monthlyRainMm.length === 12 ? c.monthlyRainMm : null;
  return {
    slug: place.slug,
    name: displayName(place),
    label: place.label,
    admin1: place.admin1,
    admin1Code: place.admin1Code ?? null,
    country: place.country,
    countryCode: place.countryCode,
    lat: place.lat,
    lon: place.lon,
    hasClimate: !!c,
    hasRain: !!rain,
    zone: c?.zone ?? null,
    zoneNumber: c?.zoneNumber ?? null,
    zoneSource: c?.zoneSource ?? (c ? "estimated" : null),
    south,
    frostRare,
    lastFrost: c ? (frostRare ? null : c.lastSpringFrost) : null,
    firstFrost: c ? (frostRare ? null : c.firstFallFrost) : null,
    lastFrostDoy: c && !frostRare ? calendarDoy(c.lastSpringFrostDoy, south) : null,
    firstFrostDoy: c && !frostRare ? calendarDoy(c.firstFallFrostDoy, south) : null,
    frostFreeDays: c ? (frostRare ? 365 : c.frostFreeDays) : null,
    frostSource: c?.frostSource ?? null,
    rainMm: regime?.annualRainMm ?? null,
    rain: regime?.rain ?? null,
    wettest: rain ? argMax(rain) + 1 : null,
    driest: rain ? argMin(rain) + 1 : null,
    wetMonths: regime?.wetMonths ?? [],
    dryMonths: regime?.dryMonths ?? [],
    coldestC: means ? round1(Math.min(...means)) : null,
    warmestC: means ? round1(Math.max(...means)) : null,
    coldestMonth: means ? argMin(means) + 1 : null,
    warmestMonth: means ? argMax(means) + 1 : null,
    elevationM: c?.elevationM ?? null,
    // With its neighbouring class where the grid's figures sit within the margin of a boundary (audit, 13 November 2026).
    koppen: regime && c ? koppenText(c, place.lat, regime.koppen).replace(/^Köppen /, "") : (regime?.koppen ?? null),
    regime: (regime?.id as RegimeId | undefined) ?? null,
    regimeName: regime?.name ?? null,
    frostLed: regime ? regime.frostLed : c ? c.frostFreeDays < 300 : null,
    water: water.kind,
    waterName: water.name,
    coast: water.coast,
  };
}

let ALL: TownRow[] | null = null;
let BY_REGION: Map<string, TownRow[]> | null = null;

/** Every pre-built town as a row, in known-places order. */
export function allTownRows(): TownRow[] {
  if (!ALL) ALL = PLACES.map(rowOf);
  return ALL;
}

/** The region a pre-built town's coordinates fall in. */
export const regionOfTown = (p: Pick<Place, "lat" | "lon">): string => classifyEcoregion(p.lat, p.lon)?.slug ?? "";

/**
 * The pre-built towns whose coordinates classify into `slug`, coldest zone
 * first (then by name), so a region reads from its cold edge to its warm one.
 */
export function townsInRegion(slug: string): TownRow[] {
  if (!BY_REGION) {
    BY_REGION = new Map();
    for (const p of PLACES) {
      const r = regionOfTown(p);
      const rows = BY_REGION.get(r) ?? [];
      rows.push(rowOf(p));
      BY_REGION.set(r, rows);
    }
    for (const rows of BY_REGION.values()) rows.sort(byCold);
  }
  return BY_REGION.get(slug) ?? [];
}

/** One town's row, whatever region it is in. */
export function townRow(slug: string): TownRow | undefined {
  return allTownRows().find((t) => t.slug === slug);
}

const byCold = (a: TownRow, b: TownRow) =>
  (a.zoneNumber ?? 99) - (b.zoneNumber ?? 99) || (a.coldestC ?? 99) - (b.coldestC ?? 99) || a.name.localeCompare(b.name);
