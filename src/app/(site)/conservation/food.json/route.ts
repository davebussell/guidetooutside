/**
 * The food band for a remembered place, as JSON, for pages rendered once for
 * everyone (`NearbyFood` asks here from the browser).
 *
 * GET /conservation/food.json?slug=ottawa-ontario&lat=45.42&lon=-75.7&label=Ottawa,%20Ontario
 *     &section=gardening[&roles=seed-library,community-gardens][&gardens=1][&fish=atlantic-cod][&fruit=1][&compact=1]
 *
 * The place is resolved without the network (the pre-built towns, the
 * geocode cache, else the point and the label); nothing here geocodes or
 * calls OpenStreetMap (the gardens come from the static file).
 */
import type { NextRequest } from "next/server";
import { FOOD_ROLES, type FoodRole } from "@/data/conservation";
import { FOOD_SECTIONS, foodBand, type FoodSection } from "@/lib/conservation/food";
import { resolveVisitor } from "@/lib/conservation/visitor";
import { getCreature } from "@/lib/nature";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const slug = q.get("slug") ?? "";
  const lat = Number(q.get("lat"));
  const lon = Number(q.get("lon"));
  const section = q.get("section") as FoodSection;
  if (!/^[a-z0-9-]{2,120}$/.test(slug) || !q.has("lat") || !q.has("lon") || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180 || !FOOD_SECTIONS.includes(section)) {
    return Response.json({ error: "slug, lat, lon and section are required" }, { status: 400 });
  }
  const label = (q.get("label") ?? "").slice(0, 120);
  const roles = (q.get("roles") ?? "").split(",").filter((r): r is FoodRole => (FOOD_ROLES as string[]).includes(r));
  const fishSlug = q.get("fish");
  const c = fishSlug && /^[a-z0-9-]{2,60}$/.test(fishSlug) ? getCreature(fishSlug) : undefined;
  const fish = c && c.group === "fish" ? { slug: c.slug, name: c.name, water: c.water } : undefined;

  const place = await resolveVisitor({ slug, label, lat, lon });
  const band = await foodBand(place, {
    section,
    roles: roles.length ? roles : undefined,
    gardens: q.has("gardens") ? q.get("gardens") === "1" : undefined,
    fish,
    fruit: q.get("fruit") === "1",
    compact: q.get("compact") === "1",
  });
  return Response.json({ place: { name: place.name, label: place.label, countryCode: place.countryCode }, band }, { headers: { "Cache-Control": "public, max-age=600" } });
}
