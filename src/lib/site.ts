import { continentServed } from "./scope";
import type { Metadata } from "next";

export const SITE = {
  name: "Guide to Outside",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://guidetooutside.com",
  description:
    "Your guide to thrive outside: gardening, fishing, foraging and homesteading, worked out for your town, this week — frost dates, hardiness zone, what to plant, what's biting, what's in season in the woods and what the homestead needs.",
  tagline: "Your guide to thrive outside.",
};

/** The default share card: every page's Open Graph and Twitter image unless it has its own. */
export const SHARE_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: SITE.name };

/**
 * A page's Open Graph and Twitter metadata, always carrying the default card
 * image. A page that sets `openGraph` replaces the root one wholesale, so
 * without this the card would lose its picture.
 */
export function shareCard(title: string, description: string, path?: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { title, description, ...(path ? { url: path } : {}), images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}

/** Seed pages for SEO: popular Canadian and US locations. */
export const POPULAR_LOCATIONS: { label: string; slug: string; lat: number; lon: number }[] = [
  { label: "Toronto, ON", slug: "toronto-ontario", lat: 43.65, lon: -79.38 },
  { label: "Montréal, QC", slug: "montreal-quebec", lat: 45.5, lon: -73.57 },
  { label: "Vancouver, BC", slug: "vancouver-british-columbia", lat: 49.28, lon: -123.12 },
  { label: "Calgary, AB", slug: "calgary-alberta", lat: 51.05, lon: -114.07 },
  { label: "Ottawa, ON", slug: "ottawa-ontario", lat: 45.42, lon: -75.7 },
  { label: "Halifax, NS", slug: "halifax-nova-scotia", lat: 44.65, lon: -63.58 },
  { label: "Winnipeg, MB", slug: "winnipeg-manitoba", lat: 49.9, lon: -97.14 },
  { label: "Kingston, ON", slug: "kingston-ontario", lat: 44.23, lon: -76.48 },
  { label: "Sherbrooke, QC", slug: "sherbrooke-quebec", lat: 45.4, lon: -71.89 },
  { label: "Seattle, WA", slug: "seattle-washington", lat: 47.61, lon: -122.33 },
  { label: "Portland, OR", slug: "portland-oregon", lat: 45.52, lon: -122.68 },
  { label: "Minneapolis, MN", slug: "minneapolis-minnesota", lat: 44.98, lon: -93.27 },
  { label: "Chicago, IL", slug: "chicago-illinois", lat: 41.88, lon: -87.63 },
  { label: "Burlington, VT", slug: "burlington-vermont", lat: 44.48, lon: -73.21 },
  { label: "Buffalo, NY", slug: "buffalo-new-york", lat: 42.89, lon: -78.88 },
  { label: "Denver, CO", slug: "denver-colorado", lat: 39.74, lon: -104.99 },
  { label: "Asheville, NC", slug: "asheville-north-carolina", lat: 35.6, lon: -82.55 },
  { label: "Austin, TX", slug: "austin-texas", lat: 30.27, lon: -97.74 },
  { label: "Atlanta, GA", slug: "atlanta-georgia", lat: 33.75, lon: -84.39 },
  { label: "Portland, ME", slug: "portland-maine", lat: 43.66, lon: -70.26 },
];

/** The front page's places by continent, parked continents included; SELECTED_PLACES below is what is shown. */
const ALL_SELECTED_PLACES: { continent: string; places: { label: string; slug: string }[] }[] = [
  {
    continent: "North America",
    places: [
      { label: "Toronto, ON", slug: "toronto-ontario" },
      { label: "Montréal, QC", slug: "montreal-quebec" },
      { label: "Vancouver, BC", slug: "vancouver-british-columbia" },
      { label: "Halifax, NS", slug: "halifax-nova-scotia" },
      { label: "Seattle, WA", slug: "seattle-washington" },
      { label: "Chicago, IL", slug: "chicago-illinois" },
      { label: "Denver, CO", slug: "denver-colorado" },
      { label: "Austin, TX", slug: "austin-texas" },
    ],
  },
  {
    continent: "Europe",
    places: [
      { label: "London", slug: "london-uk" },
      { label: "Edinburgh", slug: "edinburgh-uk" },
      { label: "Dublin", slug: "dublin-ireland" },
      { label: "Paris", slug: "paris-france" },
      { label: "Berlin", slug: "berlin-germany" },
      { label: "Lisbon", slug: "lisbon-portugal" },
      { label: "Rome", slug: "rome-italy" },
      { label: "Stockholm", slug: "stockholm-sweden" },
    ],
  },
  {
    continent: "Africa",
    places: [
      { label: "Cape Town", slug: "cape-town-south-africa" },
      { label: "Johannesburg", slug: "johannesburg-south-africa" },
      { label: "Nairobi", slug: "nairobi-kenya" },
      { label: "Lagos", slug: "lagos-nigeria" },
      { label: "Accra", slug: "accra-ghana" },
      { label: "Dakar", slug: "dakar-senegal" },
      { label: "Marrakesh", slug: "marrakesh-morocco" },
      { label: "Cairo", slug: "cairo-egypt" },
    ],
  },
];

/** The front page's places: the served continents only (src/lib/scope.ts). */
const CONTINENT_KEY: Record<string, string> = { "North America": "north-america", Europe: "europe", Africa: "africa" };
export const SELECTED_PLACES = ALL_SELECTED_PLACES.filter((g) => continentServed(CONTINENT_KEY[g.continent]));

/**
 * Who we are, for the OpenStreetMap services.
 *
 * Both Overpass mirrors refuse anonymous traffic — one with a 406, the other
 * with a 429 that says so in plain words — and Node's fetch sends nothing by
 * default. Without this the nearby-waters lookup had been failing silently on
 * every request and falling back to its empty array, which looks exactly like
 * a town with no lakes near it. Nominatim's usage policy asks for the same.
 */
export const OSM_USER_AGENT = "guidetooutside.com (+https://guidetooutside.com/about)";
