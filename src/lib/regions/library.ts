/**
 * What the libraries give a region, town by town: the wild edibles, fish and
 * garden creatures tagged with the region, and the crops whose growing
 * parameters fit each town's climate — then split into what every pre-built
 * town in the region gets and what only some do.
 *
 * The split is only as fine as the data. The libraries tag a species by
 * ecoregion, so within a region the only things that can take it off a
 * town's list are its hardiness zone (where the species has a zone range),
 * whether the town is near the sea (shore species and salt-water fish), and,
 * for crops, the town's own monthly climate (src/lib/crop-calendar). Nothing
 * finer is claimed.
 */
import { PLACE_NORMALS } from "@/lib/climate-fallback";
import { cropCalendar } from "@/lib/crop-calendar";
import { localCrops } from "@/lib/crops";
import { getEcoregion } from "@/lib/ecoregions";
import { FISH, GARDEN_LIFE, type Creature } from "@/lib/nature";
import { regimeOf } from "@/lib/regime";
import { SPECIES, isShoreSpecies, type Species } from "@/lib/species";
import { nameList } from "./format";
import { townsInRegion } from "./towns";
import type { LibItem, RegionLibrary, TownRow } from "./types";

const NORMALS = new Map(PLACE_NORMALS.map((e) => [e.place.slug, e]));

const inRegion = (x: { regions: "all" | string[] }, slug: string) => x.regions === "all" || x.regions.includes(slug);

const speciesItem = (s: Species): LibItem => ({
  kind: "species",
  slug: s.slug,
  name: s.name,
  href: `/foraging/${s.slug}`,
  ...(s.zones ? { zones: s.zones } : {}),
  ...(isShoreSpecies(s) ? { coastOnly: true } : {}),
});
const fishItem = (f: Creature): LibItem => ({ kind: "fish", slug: f.slug, name: f.name, href: `/wildlife/${f.slug}`, ...(f.water === "salt" ? { coastOnly: true } : {}) });
const gardenItem = (c: Creature): LibItem => ({ kind: "garden", slug: c.slug, name: c.name, href: `/wildlife/${c.slug}` });

/** Whether a tagged species or fish is given to this town: its zone range and the coast flag. */
export function itemAtTown(item: LibItem, t: TownRow): boolean {
  if (item.zones && t.zoneNumber != null && (t.zoneNumber < item.zones[0] || t.zoneNumber > item.zones[1])) return false;
  if (item.coastOnly && !t.coast) return false;
  return true;
}

/** The crops whose growing parameters fit a town's climate calendar, or null without a rain record. */
function cropsAtTown(t: TownRow, crops: ReturnType<typeof localCrops>): string[] | null {
  const e = NORMALS.get(t.slug);
  if (!e?.climate.monthlyRainMm) return null;
  const regime = regimeOf(e.climate, t.lat);
  return cropCalendar(e.climate, regime, crops, { lat: t.lat }).map((f) => f.crop.slug);
}

const LIB = new Map<string, RegionLibrary>();

/** The region's library: every item tagged for it, and the towns each is given to. */
export function regionLibrary(slug: string): RegionLibrary {
  const hit = LIB.get(slug);
  if (hit) return hit;
  const region = getEcoregion(slug) as { continent?: string } | undefined;
  const towns = townsInRegion(slug);
  const crops = localCrops(region?.continent && region.continent !== "north-america" ? "GB" : "US");

  const items: LibItem[] = [
    ...SPECIES.filter((s) => inRegion(s, slug)).map(speciesItem),
    ...FISH.filter((f) => inRegion(f, slug)).map(fishItem),
    ...GARDEN_LIFE.filter((c) => inRegion(c, slug)).map(gardenItem),
  ];
  // The tagged items end here; crops are appended as towns are found to grow them.
  const tagged = items.length;
  const cropIndex = new Map<string, number>();
  const byTown: Record<string, number[]> = {};
  const noCrops: string[] = [];
  for (const t of towns) {
    const got: number[] = [];
    for (let i = 0; i < tagged; i++) if (itemAtTown(items[i], t)) got.push(i);
    const fit = cropsAtTown(t, crops);
    if (!fit) noCrops.push(t.slug);
    else
      for (const cs of fit) {
        let i = cropIndex.get(cs);
        if (i == null) {
          const c = crops.find((x) => x.slug === cs)!;
          i = items.push({ kind: "crop", slug: c.slug, name: c.name, href: `/gardening/crops/${c.slug}` }) - 1;
          cropIndex.set(cs, i);
        }
        got.push(i);
      }
    byTown[t.slug] = got.sort((a, b) => a - b);
  }
  const lib = { items, byTown, noCrops };
  LIB.set(slug, lib);
  return lib;
}

export type PartialItem = {
  item: LibItem;
  /** Town slugs that get it, and that do not. */
  inTowns: string[];
  outTowns: string[];
  /** "hardiness zones 3–7 only: not in Miami (10a) or Tampa (10a)" */
  reason: string;
};

export type Split = {
  everywhere: LibItem[];
  partial: PartialItem[];
  /** Tagged for the region but given to none of its towns — a gap between the tag and the zone range. */
  nowhere: LibItem[];
};

export type SharedAndDiffering = {
  towns: number;
  species: Split;
  fish: Split;
  garden: Split;
  crops: Split;
  /** Towns whose crops are unknown (no rain in the record). */
  noCrops: string[];
  library: RegionLibrary;
};

const sign = (x: number) => `${x < 0 ? "−" : ""}${Math.abs(Math.round(x))}`;

function reasonFor(item: LibItem, inTowns: TownRow[], outTowns: TownRow[]): string {
  const who = (ts: TownRow[], f?: (t: TownRow) => string) => nameList(ts.map((t) => (f ? `${t.name} (${f(t)})` : t.name)), 4);
  if (item.kind === "crop") {
    const inCold = inTowns.map((t) => t.coldestC ?? 0);
    const outCold = outTowns.map((t) => t.coldestC ?? 0);
    const inHot = inTowns.map((t) => t.warmestC ?? 0);
    const outHot = outTowns.map((t) => t.warmestC ?? 0);
    const inRain = inTowns.map((t) => t.rainMm ?? 0);
    const outRain = outTowns.map((t) => t.rainMm ?? 0);
    let why = "by the climate calendar";
    if (Math.max(...outCold) < Math.min(...inCold)) why = `where the coldest month stays above about ${sign(Math.min(...inCold))} °C`;
    else if (Math.min(...outCold) > Math.max(...inCold)) why = `where winters are cold enough (coldest month at or below ${sign(Math.max(...inCold))} °C)`;
    else if (Math.min(...outHot) > Math.max(...inHot)) why = `where summers stay cooler (hottest month at or below ${sign(Math.max(...inHot))} °C)`;
    else if (Math.max(...outHot) < Math.min(...inHot)) why = `where summers reach ${sign(Math.min(...inHot))} °C or more`;
    else if (Math.max(...outRain) < Math.min(...inRain)) why = `in the wetter towns (${Math.round(Math.min(...inRain))} mm a year or more)`;
    return `${why}: not in ${who(outTowns)}`;
  }
  const parts: string[] = [];
  if (item.zones) {
    const outZone = outTowns.filter((t) => t.zoneNumber != null && (t.zoneNumber < item.zones![0] || t.zoneNumber > item.zones![1]));
    if (outZone.length) parts.push(`hardiness zones ${item.zones[0]}–${item.zones[1]} only: not in ${who(outZone, (t) => t.zone ?? "")}`);
  }
  if (item.coastOnly) {
    const inland = outTowns.filter((t) => !t.coast);
    if (inland.length) parts.push(`${item.kind === "fish" ? "salt water" : "the shore"} only: not inland at ${who(inland)}`);
  }
  return parts.join("; ") || `not in ${who(outTowns)}`;
}

function split(kind: LibItem["kind"], lib: RegionLibrary, towns: TownRow[]): Split {
  const counted = kind === "crop" ? towns.filter((t) => !lib.noCrops.includes(t.slug)) : towns;
  const out: Split = { everywhere: [], partial: [], nowhere: [] };
  lib.items.forEach((item, i) => {
    if (item.kind !== kind) return;
    const inTowns = counted.filter((t) => (lib.byTown[t.slug] ?? []).includes(i));
    if (!counted.length) return out.everywhere.push(item);
    if (inTowns.length === counted.length) return out.everywhere.push(item);
    if (!inTowns.length) return out.nowhere.push(item);
    const outTowns = counted.filter((t) => !inTowns.includes(t));
    out.partial.push({ item, inTowns: inTowns.map((t) => t.slug), outTowns: outTowns.map((t) => t.slug), reason: reasonFor(item, inTowns, outTowns) });
  });
  // The most widely shared first among the partial ones.
  out.partial.sort((a, b) => b.inTowns.length - a.inTowns.length || a.item.name.localeCompare(b.item.name));
  return out;
}

/** What every town in the region gets, and what only some do, kind by kind. */
export function sharedAndDiffering(slug: string): SharedAndDiffering {
  const towns = townsInRegion(slug);
  const library = regionLibrary(slug);
  return {
    towns: towns.length,
    species: split("species", library, towns),
    fish: split("fish", library, towns),
    garden: split("garden", library, towns),
    crops: split("crop", library, towns),
    noCrops: library.noCrops,
    library,
  };
}
