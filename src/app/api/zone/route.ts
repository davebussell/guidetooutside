/**
 * GET /api/zone?lat=&lon=: the hardiness zone at a point, for the zone banner
 * on pages that show "your zone" (src/components/here/ZoneHere). The places
 * with an official map zone are answered on the page from
 * src/data/place-zones.json; this covers everywhere else.
 * → { zone, zoneNumber, minC, minBasis, minStation, source, system, label } or { zone: null }.
 *
 * `system` names the scale the zone is on (src/lib/zone-label.ts) and `label` is
 * the zone as it should be printed ("USDA-equivalent zone 5a"). `minC` is the
 * coldest night of an average year the zone was worked out from, and is given
 * only when it was (a USDA-equivalent zone): `minBasis` says whether it is a
 * weather station's 1991-2020 record ("station", named in `minStation`) or ten years of ERA5 ("era5").
 * An official map zone carries no minC, so no temperature is printed beside a
 * zone it does not define. `source` keeps the older three values for the banner.
 *
 * The climate read can fail (the reanalysis archive is rate-limited and the
 * cache remembers a miss for an hour), in which case `getClimate` falls back
 * to a pre-built town within 50 km. Beyond that this route answers from the
 * nearest pre-built town within 120 km rather than with nothing, and says so
 * (`source: "nearest"`, with the town and its distance), because a zone a
 * hundred kilometres off in the same climate is more use to a reader than a
 * blank banner, and the page can qualify it.
 */
import { NextResponse } from "next/server";
import { getClimate } from "@/lib/climate";
import type { Climate } from "@/lib/types";
import { PLACE_NORMALS, nearestNormals } from "@/lib/climate-fallback";
import { stationName, zoneLabel, zoneSourceOf, type ZonedClimate } from "@/lib/zone-label";

export const dynamic = "force-dynamic";

const NEAREST_KM = 120;

const km = (a: number, b: number, c: number, d: number) => {
  const r = Math.PI / 180;
  return Math.hypot((d - b) * r * Math.cos(((a + c) / 2) * r), (c - a) * r) * 6371;
};

/** The zone, its system and printed label, and the coldest night behind it when it is a USDA-equivalent. */
function describe(climate: Climate) {
  const z = climate as ZonedClimate;
  const system = zoneSourceOf(z);
  const derived = system === "usda-station" || system === "usda-era5";
  const minC = derived ? (z.zoneMinC ?? climate.meanAnnualExtremeMinC) : null;
  return {
    zone: climate.zone,
    zoneNumber: climate.zoneNumber,
    minC: minC == null ? null : Math.round(minC * 10) / 10,
    minBasis: derived ? (system === "usda-station" ? "station" : "era5") : null,
    // "Ottawa CDA RCS, 4.7 km away, 1991–2020" when the minimum is a weather station's.
    minStation: derived && z.zoneStation ? `${stationName(z.zoneStation.name)}, ${z.zoneStation.km} km away, ${z.zoneStation.period.replace("-", "–")}` : null,
    source: climate.zoneSource ?? "estimated",
    system,
    label: zoneLabel(climate.zone, system),
  };
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const lat = Number(u.searchParams.get("lat"));
  const lon = Number(u.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return NextResponse.json({ zone: null }, { status: 400 });
  }
  // A point on a pre-built town (within 2 km, as placeNormals counts it) is answered with that town's own zone, so the banner and the town's guide agree.
  const here = nearestNormals(lat, lon, 2);
  if (here) return NextResponse.json(describe(here), { headers: { "Cache-Control": "public, max-age=86400" } });
  const c = await getClimate({ slug: "", lat, lon }).catch(() => null);
  if (c) {
    return NextResponse.json(describe(c), { headers: { "Cache-Control": "public, max-age=86400" } });
  }
  let best: (typeof PLACE_NORMALS)[number] | null = null;
  let bestKm = NEAREST_KM;
  for (const e of PLACE_NORMALS) {
    const d = km(lat, lon, e.place.lat, e.place.lon);
    if (d <= bestKm) {
      best = e;
      bestKm = d;
    }
  }
  if (!best) return NextResponse.json({ zone: null, reason: "unavailable" }, { headers: { "Cache-Control": "public, max-age=600" } });
  return NextResponse.json(
    {
      ...describe(best.climate),
      source: "nearest",
      nearest: { label: best.place.label, slug: best.place.slug, km: Math.round(bestKm) },
    },
    // Short-lived: the archive may answer next time.
    { headers: { "Cache-Control": "public, max-age=600" } },
  );
}
