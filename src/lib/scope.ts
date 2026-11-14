/**
 * What the site serves at all (Dave, 14 November 2026: "narrow the site down to just North America to start. Don't
 * let Europe or Africa find pages").
 *
 * Two gates, the wider one here:
 *  - served (this file): a country or continent that is not served is parked. Its towns, regions, species, fish and
 *    organisations are not listed, linked, searched or answered: the pages return 404 and nothing on the site names
 *    them. The data stays in the repository, so serving a continent again is a change to the two lists below.
 *  - indexed (src/lib/seo/indexing.ts): of the served towns, the ones search engines are shown.
 *
 * Kept free of imports so client components (the place finder) can use it.
 */
export const SERVED_COUNTRIES: readonly string[] = ["CA", "US"];
export const SERVED_CONTINENTS: readonly string[] = ["north-america"];

/** Is a town in this country served? */
export const countryServed = (countryCode?: string | null): boolean => SERVED_COUNTRIES.includes((countryCode ?? "").toUpperCase());

/** Is this continent served? A region record with no continent is North American (src/lib/ecoregions). */
export const continentServed = (continent?: string | null): boolean => SERVED_CONTINENTS.includes(continent ?? "north-america");

/** How the site names what it covers, for copy: "Canada and the United States". */
export const SERVED_WORDS = "Canada and the United States";
