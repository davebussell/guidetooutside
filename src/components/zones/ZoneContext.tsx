"use client";
/**
 * The zone pages' note for a reader outside Canada and the US, where the
 * official USDA / NRCan maps stop: their own computed zone with the method,
 * the RHS rating the same winter answers to (Europe), the honest word that
 * zones mean little in the tropics, and the sources. Nothing is shown for a
 * North American reader or before a place is known; the zone banner above
 * already covers them.
 */
import Link from "next/link";
import { useZoneHere } from "@/components/here/ZoneHere";
import { useRegion } from "@/lib/use-region";
import { rhsRange, rhsRatingFor, zoneBandC, ZONE_SOURCES } from "@/lib/region-context";
import { continentServed } from "@/lib/scope";
import { theRegion } from "@/lib/the-region";

const t = (n: number) => `${n < 0 ? "−" : ""}${Math.abs(Math.round(n * 10) / 10)}`;

export function ZoneContext({ pageZone, variant = "zones" }: { pageZone?: number; variant?: "zones" | "map" }) {
  const ctx = useRegion();
  const z = useZoneHere() as { place: { label: string } | null; zone: string | null; zoneNumber: number | null; minC: number | null; minBasis?: "station" | "era5" | null; minStation?: string | null; loading: boolean };
  // A reader whose remembered place is on a parked continent gets no computed zone (src/lib/scope.ts).
  if (!ctx.known || ctx.continent === "north-america" || !continentServed(ctx.continent) || !z.place) return null;
  if (z.loading) return <div className="h-24 animate-pulse rounded-tile bg-paper-2/60" aria-hidden="true" />;
  const town = z.place.label.split(",")[0];
  const where = ctx.regionName ? theRegion(ctx.regionName) : "your region";
  const band = z.zone ? zoneBandC(z.zone) : null;
  const rhs = z.minC != null ? rhsRatingFor(z.minC) : null;
  const onScale = z.zoneNumber != null && z.zoneNumber >= 2 && z.zoneNumber <= 11;
  const coverage =
    variant === "map"
      ? `The map draws only the official zones of Canada and the United States; there are no polygons for ${where}.`
      : `The zone maps and the zone-by-zone guides on this site describe Canada and the United States.`;
  return (
    <section className="rounded-tile border border-moss/40 bg-moss-soft p-5 text-sm">
      <p className="eyebrow text-moss">
        {"Your zone, computed · "}
        {town}
      </p>
      {z.zone ? (
        <>
          <p className="font-display mt-1 text-xl font-semibold">
            {`USDA-equivalent zone ${z.zone}`}
            {ctx.zoneSystem === "loose" ? " — frost-free, so a loose guide" : null}
          </p>
          <p className="mt-2 text-ink">
            {coverage}
            {" For "}
            {town}
            {", in "}
            {where}
            {", the site works the zone out itself"}
            {z.minC != null
              ? z.minBasis === "station" && z.minStation
                ? `: the average of each year's coldest night at a weather station (${z.minStation}; NOAA GHCN-Daily) is ${t(z.minC)} °C`
                : `: the average of each winter's coldest night over the last ten years of ERA5 reanalysis (Open-Meteo archive) is ${t(z.minC)} °C`
              : " from the coldest night of an average year"}
            {band ? `, which on the USDA rule (10 °F bands, 5 °F halves) falls in zone ${z.zone}, ${t(band.lo)} to ${t(band.hi)} °C.` : "."}
          </p>
          {ctx.zoneSystem === "usda-equivalent-rhs" && rhs && (
            <p className="mt-2 text-ink">
              {"In RHS terms that is an "}
              <strong className="font-semibold">{rhs.code}</strong>
              {` winter (${rhsRange(rhs)}, "${rhs.category}"): plants rated ${rhs.code} and hardier come through an average winter here; anything rated more tender needs shelter or a glasshouse.`}
            </p>
          )}
          {ctx.zoneSystem === "loose" && (
            <p className="mt-2 text-ink">
              {"Within the tropics the coldest night of the year seldom nears freezing except high in the mountains, so the zone says little about what grows: the wet and dry seasons do. The local guide for "}
              {town}
              {" is built on its rainfall months instead."}
            </p>
          )}
          {ctx.zoneSystem === "usda-equivalent" && (
            <p className="mt-2 text-ink">No national zone map is published for this country; treat the computed zone as a half-zone estimate and your own garden&apos;s frost record as the better guide.</p>
          )}
        </>
      ) : (
        <p className="mt-1 text-ink">
          {"No zone could be computed for "}
          {town}
          {" yet. "}
          {coverage}
        </p>
      )}
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {onScale && pageZone !== z.zoneNumber && (
          <Link href={`/zones/${z.zoneNumber}`} className="font-semibold text-moss hover:underline">
            {`What zone ${z.zoneNumber} means in North America →`}
          </Link>
        )}
        {ctx.regionSlug && (
          <Link href={`/regions/${ctx.regionSlug}`} className="font-semibold text-moss hover:underline">
            {`${ctx.regionName} guide →`}
          </Link>
        )}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-ink-2">
        {"Sources: "}
        <a className="underline decoration-line underline-offset-2 hover:text-moss" href={ZONE_SOURCES.usda.url} target="_blank" rel="noopener">
          {ZONE_SOURCES.usda.label}
        </a>
        {" (the zone rule); "}
        <a className="underline decoration-line underline-offset-2 hover:text-moss" href={ZONE_SOURCES.nrcan.url} target="_blank" rel="noopener">
          {ZONE_SOURCES.nrcan.label}
        </a>
        {ctx.continent === "europe" ? (
          <>
            {"; "}
            <a className="underline decoration-line underline-offset-2 hover:text-moss" href={ZONE_SOURCES.rhs.url} target="_blank" rel="noopener">
              {ZONE_SOURCES.rhs.label}
            </a>
            {", the UK and Irish trade standard. Germany and the Netherlands use USDA-style zone maps in the nursery trade, but no national body publishes one we could link to."}
          </>
        ) : (
          ". We know of no official hardiness-zone map published by an African country; nursery charts there borrow the USDA scale."
        )}
      </p>
    </section>
  );
}
