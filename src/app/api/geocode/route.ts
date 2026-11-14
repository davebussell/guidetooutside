import { NextResponse } from "next/server";
import { geocode, reverseGeocode } from "@/lib/geocode";

/**
 * One place for free text (`?q=`) or coordinates (`?lat=&lon=`), as the zone
 * map and the space-offer form use it: the Place JSON, or 404.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim();
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const place = q ? await geocode(q) : lat && lon ? await reverseGeocode(Number(lat), Number(lon)) : null;
  if (!place) return NextResponse.json({ error: "not found" }, { status: q || (lat && lon) ? 404 : 400 });
  return NextResponse.json(place, { headers: { "Cache-Control": "public, max-age=3600" } });
}
