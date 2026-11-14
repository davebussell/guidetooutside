/**
 * The towns the "Hardiness zones and the coldest night" toy lists: every
 * pre-built place the site serves (src/lib/scope.ts) with its hardiness zone
 * (the climate normals' zone, the same one each local guide shows), named as
 * the toy names them and sorted by slug.
 */
import NORMALS from "@/data/place-normals.json";
import { countryServed } from "@/lib/scope";

type Normal = { place: { name: string; slug: string; countryCode: string }; climate: { zone: string } };

let cache: { name: string; slug: string; zone: string }[] | null = null;

export function coldestPlaces() {
  if (cache) return cache;
  cache = (NORMALS as Normal[])
    .filter((n) => countryServed(n.place.countryCode))
    .map((n) => ({ name: n.place.name.replace(/^(City of|Greater) /, ""), slug: n.place.slug, zone: n.climate.zone }))
    .sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  return cache;
}
