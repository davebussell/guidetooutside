/**
 * A wild edible as the library pages and cards show it when no place is known: with the text its record carries for
 * the served continent (src/lib/species speciesHere), so a species shared with a parked continent (src/lib/scope.ts)
 * reads as it does here. Mussels, for one, are named and described for North America, not for the Cape.
 *
 * A record already read for a place comes back unchanged: its text for the continent is the same text.
 */
import { SERVED_ECOREGIONS } from "@/lib/ecoregions";
import { continentServed } from "@/lib/scope";
import { continentOfRegion, speciesHere, type Species } from "@/lib/species";

/** The first region the record names on a served continent: the one its own page is written from. */
export const homeRegion = (s: Pick<Species, "regions">): string | undefined =>
  s.regions === "all" ? undefined : s.regions.find((r) => continentServed(continentOfRegion(r)));

/** A served region to read a record written for every region from. */
const ANY_SERVED_REGION = (SERVED_ECOREGIONS as { slug: string }[])[0]?.slug;

export const servedText = <T extends Species>(s: T): T => speciesHere(s, homeRegion(s) ?? ANY_SERVED_REGION);

/**
 * The record with the regions of served continents first. The library reads a record's home continent from its first
 * region ("also in season", "also active"), and a record shared with a parked continent may name that one first.
 */
export function servedRegionsFirst<T extends { regions: "all" | string[] }>(x: T): T {
  if (x.regions === "all") return x;
  const served = x.regions.filter((r) => continentServed(continentOfRegion(r)));
  return served.length ? { ...x, regions: [...served, ...x.regions.filter((r) => !served.includes(r))] } : x;
}
