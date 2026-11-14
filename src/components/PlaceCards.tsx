/**
 * The cards that close a place page: its ecological region and hardiness zone,
 * and the newsletter sign-up for the place.
 */
import Link from "next/link";
import type { LocalData } from "@/lib/types";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { regionTextAt } from "@/lib/region-text";
import { getZone } from "@/data/zones";
import { climateZoneLabel, zoneBasis } from "@/lib/zone-label";
import { NewsletterForm } from "@/components/NewsletterForm";

/** How the zone was found: "Natural Resources Canada's plant hardiness map … at Toronto's coordinates." or "Worked out on the USDA rule from the coldest night of an average year, …". */
export function zoneSentence(data: LocalData): string {
  // A temperature appears only beside the zone it was worked out into (see zoneBasis), never an ERA5 low beside a map zone.
  return zoneBasis(data.climate!, data.place.name);
}

export function RegionZoneCards({ data, className = "mt-10" }: { data: LocalData; className?: string }) {
  const eco = classifyEcoregion(data.place.lat, data.place.lon);
  // The region's summary as it holds at this town (src/lib/region-text): the audit of 11 November 2026 found the Gulf
  // Coast's "nearly frost-free" on the cards at Memphis and Little Rock.
  const summary = regionTextAt(eco, "summary", data.place.lat, data.place.lon, data.climate);
  const zone = data.climate ? getZone(data.climate.zoneNumber) : undefined;
  return (
    <section className={`${className} grid gap-4 md:grid-cols-2`}>
      <Link href={`/regions/${eco.slug}`} className="card p-5 hover:border-moss transition">
        <p className="eyebrow">Your ecological region</p>
        <h2 className="font-display mt-1 text-xl font-semibold">{eco.name}</h2>
        {summary && <p className="mt-2 text-sm text-ink-2">{summary}</p>}
        <span className="mt-3 inline-block text-sm font-medium text-moss">Regional guide →</span>
      </Link>
      {zone && data.climate && (
        <Link href={`/zones/${data.climate.zoneNumber}`} className="card p-5 hover:border-moss transition">
          <p className="eyebrow">Your hardiness zone</p>
          <h2 className="font-display mt-1 text-xl font-semibold">{climateZoneLabel(data.climate)}</h2>
          <p className="mt-2 text-sm text-ink-2">
            {zoneSentence(data)} {"What grows, what bites and what to forage across your zone."}
          </p>
          <span className="mt-3 inline-block text-sm font-medium text-moss">Zone guide →</span>
        </Link>
      )}
    </section>
  );
}

/** The green sign-up band. */
export function NoteCTA({
  title,
  body,
  source,
  location,
  className = "",
}: {
  title: React.ReactNode;
  body: string;
  source: string;
  location?: string;
  className?: string;
}) {
  return (
    <section
      className={`${className ? `${className} ` : ""}card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0`}
    >
      <div>
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        <p className="mt-1 text-paper/90 text-sm">{body}</p>
      </div>
      <NewsletterForm source={source} location={location} />
    </section>
  );
}
