import { NextResponse } from "next/server";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { guideFor } from "@/lib/guide-ai";
import { metaOf } from "@/lib/records";

export const dynamic = "force-dynamic";

/**
 * The guide for a place, for GuideLoader on a page that had no stored guide:
 * `{ data, guide, meta? }`. The first visitor's request writes it (three small
 * model calls) and stores it; everyone after gets the stored copy, with `meta`
 * for its freshness stamp.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  let place = await placeFromSlug(slug);
  if (!place) return NextResponse.json({ error: "unknown location" }, { status: 404 });
  if (Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat - place.lat) < 0.5 && Math.abs(lon - place.lon) < 0.7) {
    place = { ...place, lat, lon };
  }
  const data = await getLocalData(place);
  const { guide, record } = await guideFor(data);
  return NextResponse.json(
    { data, guide, ...(record ? { meta: metaOf(record) } : {}) },
    // Stored per place; keep the CDN out of it (it would ignore the query string).
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
