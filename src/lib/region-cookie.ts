/**
 * The reader's region context on the server, from the place cookie
 * (`gto_place`, read by src/lib/kids/here cookiePlace). For dynamic pages
 * only: reading the cookie opts a route out of static rendering.
 */
import { cookiePlace, type CookiePlace } from "./kids/here";
import { regionContext, type RegionContext } from "./region-context";

export async function regionFromCookie(): Promise<{ place: CookiePlace | null; ctx: RegionContext }> {
  const place = await cookiePlace();
  return { place, ctx: regionContext(place) };
}
