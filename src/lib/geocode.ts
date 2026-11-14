import { cache } from "react";
import { cacheGet, cacheSet } from "./cache";
import { OSM_USER_AGENT } from "./site";
import type { Place } from "./types";
import { countryServed } from "./scope";
import KNOWN from "./known-places.json"; // the whole table; KNOWN_PLACES below is what is served

/**
 * Places: free-text search, reverse lookup, and URL slugs.
 *
 * The guide covers North America (Canada and the United States), Europe and
 * Africa. Search asks Nominatim first, restricted to those countries, and
 * falls back to Open-Meteo's GeoNames search (which also reads postal codes)
 * when Nominatim has nothing or is unavailable.
 *
 * Slugs: in Canada and the US a town is named with its province or state
 * ("toronto-ontario", "bangor-maine"); elsewhere with its country
 * ("cape-town-south-africa", "london-uk", "paris-france").
 */

const CA_PROVINCES: Record<string, string> = {
  Alberta: "AB",
  "British Columbia": "BC",
  Manitoba: "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Nova Scotia": "NS",
  Ontario: "ON",
  "Prince Edward Island": "PE",
  Quebec: "QC",
  Québec: "QC",
  Saskatchewan: "SK",
  "Northwest Territories": "NT",
  Nunavut: "NU",
  Yukon: "YT",
};

const US_STATES: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS",
  Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD", Massachusetts: "MA",
  Michigan: "MI", Minnesota: "MN", Mississippi: "MS", Missouri: "MO", Montana: "MT",
  Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
  Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI",
  "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT",
  Vermont: "VT", Virginia: "VA", Washington: "WA", "West Virginia": "WV",
  Wisconsin: "WI", Wyoming: "WY", "District of Columbia": "DC",
};

/** ISO 3166 codes the guide covers. */
const NORTH_AMERICA = ["ca", "us"];
const EUROPE = [
  "ad", "al", "at", "ax", "ba", "be", "bg", "by", "ch", "cy", "cz", "de", "dk", "ee", "es", "fi", "fo", "fr", "gb", "gg",
  "gi", "gr", "hr", "hu", "ie", "im", "is", "it", "je", "li", "lt", "lu", "lv", "mc", "md", "me", "mk", "mt", "nl", "no",
  "pl", "pt", "ro", "rs", "ru", "se", "si", "sj", "sk", "sm", "ua", "va", "xk",
];
const AFRICA = [
  "ao", "bf", "bi", "bj", "bw", "cd", "cf", "cg", "ci", "cm", "cv", "dj", "dz", "eg", "eh", "er", "et", "ga", "gh", "gm",
  "gn", "gq", "gw", "ke", "km", "lr", "ls", "ly", "ma", "mg", "ml", "mr", "mu", "mw", "mz", "na", "ne", "ng", "re", "rw",
  "sc", "sd", "sh", "sl", "sn", "so", "ss", "st", "sz", "td", "tg", "tn", "tz", "ug", "yt", "za", "zm", "zw",
];
/** Every country the data can describe; Europe and Africa are parked for now (src/lib/scope.ts). */
const DESCRIBED = [...NORTH_AMERICA, ...EUROPE, ...AFRICA];
/** The countries a search or a slug may land in: described and served. */
export const COVERED_COUNTRIES = new Set(DESCRIBED.map((c) => c.toUpperCase()).filter(countryServed));
const COUNTRY_PARAM = DESCRIBED.filter(countryServed).join(",");

/** Countries whose everyday English name is shorter than the official one. */
const COUNTRY_SHORT: Record<string, string> = {
  "United Kingdom": "UK",
  "Democratic Republic of the Congo": "DR Congo",
};
export const countryShort = (country: string) => COUNTRY_SHORT[country] ?? country;
const isNorthAmerica = (countryCode: string) => countryCode === "CA" || countryCode === "US";

export function admin1Code(countryCode: string, admin1: string): string | undefined {
  if (countryCode === "CA") return CA_PROVINCES[admin1];
  if (countryCode === "US") return US_STATES[admin1];
  return undefined;
}

/** "Wrocław" → "wroc-aw", "Tromsø" → "troms", "Côte d'Ivoire" → "cote-d-ivoire". */
export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function makePlace(p: { name: string; admin1: string; country: string; countryCode: string; lat: number; lon: number }): Place {
  const name = p.name.replace(/^City of /i, "");
  const na = isNorthAmerica(p.countryCode);
  const code = admin1Code(p.countryCode, p.admin1);
  const tail = na ? p.admin1 : countryShort(p.country);
  return {
    name,
    admin1: p.admin1,
    country: p.country,
    countryCode: p.countryCode,
    lat: p.lat,
    lon: p.lon,
    ...(code ? { admin1Code: code } : {}),
    slug: slugify([name, tail].filter(Boolean).join(" ")),
    label: tail ? `${name}, ${tail}` : name,
  };
}

// ---- the pre-built towns ----------------------------------------------------

/**
 * The towns the table holds: 101 in Canada and the US, then Europe and Africa
 * (parked: src/lib/scope.ts). Each keeps its own slug even where
 * the geocoder names it differently ("quebec-city-quebec" is "Quebec, Quebec").
 */
export const ALL_KNOWN_PLACES = KNOWN as Place[];
/** The towns the site serves: the table less the parked countries (src/lib/scope.ts). */
export const KNOWN_PLACES = ALL_KNOWN_PLACES.filter((p) => countryServed(p.countryCode));
const KNOWN_BY_SLUG = new Map(KNOWN_PLACES.map((p) => [p.slug, p]));
const PARKED_SLUGS = new Set(ALL_KNOWN_PLACES.filter((p) => !countryServed(p.countryCode)).map((p) => p.slug));
export const knownPlace = (slug: string): Place | undefined => KNOWN_BY_SLUG.get(slug);

// ---- Nominatim and Open-Meteo -----------------------------------------------

type NominatimResult = { lat: string; lon: string; name?: string; display_name: string; address?: Record<string, string> };

async function nominatim(params: Record<string, string>, path = "search"): Promise<unknown> {
  const url = new URL(`https://nominatim.openstreetmap.org/${path}`);
  for (const [k, v] of Object.entries({ format: "jsonv2", addressdetails: "1", ...params })) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: { "User-Agent": OSM_USER_AGENT, "Accept-Language": "en" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`nominatim ${res.status}`);
  return res.json();
}

function placeFromNominatim(r: NominatimResult): Place | null {
  const a = r.address ?? {};
  const cc = (a.country_code ?? "").toUpperCase();
  if (!COVERED_COUNTRIES.has(cc)) return null;
  const name = a.city || a.town || a.village || a.municipality || a.hamlet || a.county || r.name || "";
  if (!name) return null;
  return makePlace({
    name,
    admin1: a.state || a.province || "",
    country: a.country ?? "",
    countryCode: cc,
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
  });
}

type OpenMeteoResult = { name: string; admin1?: string; country: string; country_code: string; latitude: number; longitude: number };

async function openMeteo(q: string): Promise<Place[]> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", q);
  url.searchParams.set("count", "10");
  url.searchParams.set("language", "en");
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) return [];
  const data = (await res.json()) as { results?: OpenMeteoResult[] };
  return (data.results ?? [])
    .filter((r) => COVERED_COUNTRIES.has(r.country_code.toUpperCase()))
    .map((r) =>
      makePlace({ name: r.name, admin1: r.admin1 ?? "", country: r.country, countryCode: r.country_code.toUpperCase(), lat: r.latitude, lon: r.longitude }),
    );
}

const searchMemo = new Map<string, { at: number; places: Place[] }>();

/**
 * Free text — a town, "town, province", a postal code or ZIP — to places in
 * the served countries, best first. Empty when nothing matched.
 */
export async function searchPlaces(query: string): Promise<Place[]> {
  const q = query.trim().replace(/\s+/g, " ");
  if (!q) return [];
  const memo = searchMemo.get(q.toLowerCase());
  if (memo && Date.now() - memo.at < 3600_000) return memo.places;
  let places: Place[] = [];
  try {
    const results = (await nominatim({ q, limit: "1", countrycodes: COUNTRY_PARAM })) as NominatimResult[];
    places = results.map(placeFromNominatim).filter((p): p is Place => !!p);
  } catch {
    /* fall through */
  }
  if (!places.length) {
    try {
      // Open-Meteo matches a bare name (or a postal code) best.
      places = await openMeteo(q.split(",")[0]);
    } catch {
      places = [];
    }
  }
  if (places.length) {
    searchMemo.set(q.toLowerCase(), { at: Date.now(), places });
    if (searchMemo.size > 500) searchMemo.delete(searchMemo.keys().next().value!);
  }
  return places;
}

/** The best match for free text, or null. */
export async function geocode(query: string): Promise<Place | null> {
  return (await searchPlaces(query))[0] ?? null;
}

/** Coordinates (the "use my location" button) to the town they fall in, keeping the precise point. */
export async function reverseGeocode(lat: number, lon: number): Promise<Place | null> {
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  try {
    const r = (await nominatim({ lat: String(lat), lon: String(lon), zoom: "10" }, "reverse")) as NominatimResult & { error?: string };
    if (!r || r.error) return null;
    const place = placeFromNominatim(r);
    return place ? { ...place, lat, lon } : null;
  } catch {
    return null;
  }
}

const GEO_TTL = 180 * 24 * 3600;

/**
 * A URL slug back to its place: the pre-built towns from the table, anything
 * else from the `geo:v1:<slug>` cache or, failing that, by geocoding the slug's
 * words. The place returned carries its canonical slug, which may differ from
 * the one asked for ("bangor-me" → "bangor-maine").
 */
export const placeFromSlug = cache(async (slug: string): Promise<Place | null> => {
  const known = knownPlace(slug);
  if (known) return known;
  // A parked town has no page: its slug is not handed to the geocoder to be found again by its words.
  if (PARKED_SLUGS.has(slug)) return null;
  if (!/^[a-z0-9-]{2,120}$/.test(slug)) return null;
  const key = `geo:v1:${slug}`;
  const hit = await cacheGet<Place>(key);
  if (hit) return countryServed(hit.countryCode) ? hit : null;
  const place = await geocode(slug.replace(/-/g, " "));
  if (place) await cacheSet(key, place, GEO_TTL);
  return place;
});
