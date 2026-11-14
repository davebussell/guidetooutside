/**
 * GET /api/here?lat=&lon=: the few facts about the remembered place that
 * pages away from the place pages personalise with (src/lib/use-here): its
 * zone, the soil and air temperature now, the rock underfoot, the average
 * frost dates, the week's night-time lows and its time zone.
 * → { zone, zoneNumber, soilC, tempC, rock, frost, lows, tz }.
 */
import { NextResponse } from "next/server";
import { getClimate, getForecast } from "@/lib/climate";
import { getRocks, layersOf } from "@/lib/ground";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const u = new URL(req.url);
  const lat = Number(u.searchParams.get("lat"));
  const lon = Number(u.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return NextResponse.json({ message: "lat and lon are required" }, { status: 400 });
  }
  const [climate, forecast, units] = await Promise.all([
    getClimate({ slug: "", lat, lon }).catch(() => null),
    getForecast(lat, lon).catch(() => null),
    getRocks(lat, lon).catch(() => []),
  ]);
  // The bedrock the geologic maps show, never a surface deposit; null where no rock page matches its first-listed lithology.
  const bedrock = layersOf(units).bedrock;
  const frostLed = climate && climate.lastSpringFrost !== "Rare";
  return NextResponse.json(
    {
      zone: climate?.zone ?? null,
      zoneNumber: climate?.zoneNumber ?? null,
      soilC: forecast?.soilTemp6cm ?? null,
      tempC: forecast?.current.temp ?? null,
      rock: bedrock?.rock ? { slug: bedrock.rock.slug, name: bedrock.rock.name, unit: bedrock.unit.name || null } : null,
      frost: frostLed
        ? {
            lastDoy: climate.lastSpringFrostDoy,
            firstDoy: climate.firstFallFrostDoy,
            frostFreeDays: climate.frostFreeDays,
            south: !!climate.south,
            lastLabel: climate.lastSpringFrost,
            firstLabel: climate.firstFallFrost,
          }
        : null,
      lows: (forecast?.days ?? []).slice(0, 7).map((d) => ({ date: d.date, tMin: d.tMin })),
      tz: forecast?.timezone ?? null,
    },
    { headers: { "Cache-Control": "private, max-age=1800" } },
  );
}
