/**
 * The European and African towns in each hardiness zone, for the zone pages.
 *
 * The zone pages' own place lists (src/data/zones.ts) are the official USDA /
 * NRCan map zones of Canadian and US towns. The towns elsewhere have no
 * official map, so these are the zones the site computes for each of them
 * on the USDA rule (a band of 10 °F for the zone, 5 °F for the half) from the
 * coldest night of an average year: a weather station's 1991-2020 record where one
 * passes (src/data/place-extremes.json), else ten years of ERA5. They are the zones
 * the local guides show (src/lib/climate-fallback), each with the minimum it was
 * worked out from, and are labelled "USDA-equivalent" wherever they are shown.
 */
import { PLACE_NORMALS } from "@/lib/climate-fallback";
import { regionContext, rhsRatingFor } from "@/lib/region-context";
import { continentServed } from "@/lib/scope";

export type AbroadPlace = {
  slug: string;
  name: string;
  country: string;
  zone: string;
  zoneNumber: number;
  /** The coldest night of an average year the zone was worked out from. */
  minC: number;
  /** Where that figure came from: a weather station's 1991-2020 record or ten years of ERA5. */
  basis: "station" | "era5";
  continent: "europe" | "africa";
  /** The RHS rating of a winter this cold (European readers' scale). */
  rhs: string;
};

let cache: AbroadPlace[] | null = null;

/**
 * Every pre-built town outside Canada and the US with its USDA-equivalent zone, warmest first within a zone. A town on
 * a parked continent (src/lib/scope.ts) is left out, so the zone pages list none until its continent is served again.
 */
export function abroadPlaces(): AbroadPlace[] {
  if (cache) return cache;
  const out: AbroadPlace[] = PLACE_NORMALS.filter((n) => n.place.countryCode !== "CA" && n.place.countryCode !== "US" && n.climate.zoneMinC != null)
    .map((n) => {
      const minC = n.climate.zoneMinC!;
      const basis: AbroadPlace["basis"] = n.climate.zoneSystem === "usda-station" ? "station" : "era5";
      const ctx = regionContext(n.place);
      const continent: AbroadPlace["continent"] = ctx.continent === "africa" ? "africa" : "europe";
      return {
        slug: n.place.slug,
        name: n.place.name.replace(/^(City of|Greater) /, ""),
        country: n.place.country === "United Kingdom" ? "UK" : n.place.country,
        zone: n.climate.zone,
        zoneNumber: n.climate.zoneNumber,
        minC,
        basis,
        continent,
        rhs: rhsRatingFor(minC).code,
      };
    })
    .filter((p) => continentServed(p.continent))
    .sort((a, b) => a.zone.localeCompare(b.zone) || a.name.localeCompare(b.name));
  cache = out;
  return out;
}

/** The hover text of a town's chip: its zone with the system, the minimum behind it and where that came from, and the RHS rating in Europe. */
export function abroadTitle(p: AbroadPlace): string {
  const min = `${p.minC < 0 ? "−" : ""}${Math.abs(p.minC).toFixed(1)} °C`;
  return `${p.name}, ${p.country}: USDA-equivalent zone ${p.zone}, from a coldest night of ${min} in an average year (${p.basis === "station" ? "weather station record, 1991–2020" : "ERA5 reanalysis, ten years"})${p.continent === "europe" ? `, RHS ${p.rhs}` : ""}`;
}

/** The towns abroad whose USDA-equivalent zone has this number, by continent. */
export function abroadInZone(zone: number): { europe: AbroadPlace[]; africa: AbroadPlace[] } {
  const all = abroadPlaces().filter((p) => p.zoneNumber === zone);
  return { europe: all.filter((p) => p.continent === "europe"), africa: all.filter((p) => p.continent === "africa") };
}

/** Towns abroad warmer than the scale's last page (zones 12–13: frost-free). */
export function abroadBeyondScale(): AbroadPlace[] {
  return abroadPlaces().filter((p) => p.zoneNumber > 11);
}
