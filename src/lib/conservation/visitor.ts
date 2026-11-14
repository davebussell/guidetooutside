/**
 * The visitor's remembered place, for generic pages (species, wildlife, zone,
 * learn, the hub) that have no place of their own: the `gto_place` cookie
 * RememberPlace writes, resolved to a full place for the matcher.
 *
 * Reading the cookie opts the route into dynamic rendering, so this is for
 * pages that are already dynamic; a static page shows the panel for "no
 * place" on the server and lets `NearbyOrgs` fill it in on the client.
 *
 * Resolution never reaches the network beyond the cache: a pre-built town
 * comes from the table, a geocoded town from the `geo:v1:<slug>` cache entry
 * the place page left. Failing both, the cookie's own point and label are
 * used (the label's "Town, Province" or "Town, Country" tail gives the
 * country and province when it can), so only the matches the point and
 * label support apply — never a live geocode from a generic page.
 */
import { cache } from "react";
import { cacheGet } from "@/lib/cache";
import { countryShort, knownPlace } from "@/lib/geocode";
import { regionFromCookie } from "@/lib/region-cookie";
import { placeFromLabel } from "@/lib/region-context";
import type { Place } from "@/lib/types";
import { countryWords } from "./geo-words";
import type { MatchPlace } from "./match";

export type VisitorPlace = MatchPlace & {
  slug: string;
  name: string;
  /** "Ottawa, Ontario". */
  label: string;
  /** True when the full place (country, province) was found; false when only the cookie's point and label were. */
  resolved: boolean;
};

const fromPlace = (p: Place): VisitorPlace => ({
  lat: p.lat,
  lon: p.lon,
  countryCode: p.countryCode,
  admin1Code: p.admin1Code,
  admin1: p.admin1,
  slug: p.slug,
  name: p.name,
  label: p.label,
  country: countryShort(p.country),
  resolved: true,
});

/** A slug to a place without the network: the table, then the geocode cache. */
export async function placeWithoutNetwork(slug: string): Promise<Place | null> {
  const known = knownPlace(slug);
  if (known) return known;
  if (!/^[a-z0-9-]{2,120}$/.test(slug)) return null;
  try {
    return (await cacheGet<Place>(`geo:v1:${slug}`)) ?? null;
  } catch {
    return null;
  }
}

/** A place from what a page or a client knows of it (slug, point, label), resolved without the network. */
export async function resolveVisitor(c: { slug: string; label?: string | null; lat: number; lon: number }): Promise<VisitorPlace> {
  const full = await placeWithoutNetwork(c.slug);
  if (full) return fromPlace(full);
  const label = c.label || c.slug;
  const { countryCode, admin1Code } = placeFromLabel(label);
  return {
    lat: c.lat,
    lon: c.lon,
    countryCode: countryCode ?? "",
    ...(admin1Code ? { admin1Code } : {}),
    slug: c.slug,
    name: label.split(",")[0].trim(),
    label,
    ...(countryCode ? { country: countryWords(countryCode) } : {}),
    resolved: false,
  };
}

/** The remembered place, or null when the visitor has not landed on a place page yet. */
export const visitorPlace = cache(async (): Promise<VisitorPlace | null> => {
  const { place } = await regionFromCookie();
  if (!place) return null;
  return resolveVisitor(place);
});
