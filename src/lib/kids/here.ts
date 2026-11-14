/**
 * The place a visitor last landed on, read on the server from the cookie that
 * `RememberPlace` (src/lib/place-cookie) writes: `gto_place` =
 * `{ slug, label, lat, lon, tz }`. The children's book, the day planner and the
 * Learn pages use it to draw the real sky and weather over the family's house.
 */
import { classifyEcoregion } from "@/lib/ecoregions";
import { continentServed } from "@/lib/scope";
import { cookies } from "next/headers";

export type CookiePlace = { slug: string; label: string; lat: number; lon: number; tz: string | null };

export async function cookiePlace(): Promise<CookiePlace | null> {
  let raw: string | undefined;
  try {
    raw = (await cookies()).get("gto_place")?.value;
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const p = JSON.parse(decodeURIComponent(raw)) as Partial<CookiePlace>;
    if (typeof p.slug !== "string" || !/^[a-z0-9-]{2,90}$/.test(p.slug)) return null;
    const lat = Number(p.lat);
    const lon = Number(p.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
    // A remembered place on a parked continent (src/lib/scope.ts) is not a place the site serves: no card, no link.
    if (!continentServed((classifyEcoregion(lat, lon) as { continent?: string } | null)?.continent)) return null;
    return {
      slug: p.slug,
      label: typeof p.label === "string" && p.label ? p.label.slice(0, 120) : p.slug,
      lat,
      lon,
      tz: typeof p.tz === "string" && p.tz ? p.tz : null,
    };
  } catch {
    return null;
  }
}

/** "Ottawa, Ontario" → "Ottawa". */
export const shortName = (label: string) => label.split(",")[0].trim();
