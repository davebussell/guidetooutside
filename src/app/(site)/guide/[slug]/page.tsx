import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { guideId, readGuide } from "@/lib/guide-ai";
import { rulesGuide } from "@/lib/guide-rules";
import { floraEvidence } from "@/lib/local-flora";
import { checkLimit, metaOf, stampProps } from "@/lib/records";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { GuideLoader } from "@/components/GuideLoader";
import { Freshness } from "@/components/Freshness";
import { PlaceHero } from "@/components/PlaceHero";
import { GuideHeader } from "@/components/GuideHeader";
import { PlaceOrgs, PlaceSetting, ThisMonth } from "@/components/PlaceOverview";
import { ConditionsPanel } from "@/components/ConditionsPanel";
import { DayBand } from "@/components/DayBand";
import { GuideBody } from "@/components/GuideSections";
import { SkyPanel } from "@/components/SkyPanel";
import { ForcesPanel } from "@/components/ForcesPanel";
import { SeasonalForaging } from "@/components/SeasonalForaging";
import { LocalWildlife } from "@/components/LocalWildlife";
import { NoteCTA, RegionZoneCards } from "@/components/PlaceCards";

/**
 * A town's page is built the first time the town is asked for (the loading screen shows while it is), then stored
 * and served as a static page. It is rebuilt in the background at most once an hour, so no later reader waits.
 * The page reads no query string: a static page cannot, and the town's own coordinates are used.
 */
export const revalidate = 3600;
export function generateStaticParams(): PlaceParams[] {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `Gardening, fishing & foraging in ${place.label}`;
  const description = `This week's local guide for ${place.label}: hardiness zone, frost dates, ecological region, what to plant, what's biting, and what's in season to forage.`;
  return { title, description, alternates: { canonical: `/guide/${place.slug}` }, ...placeRobots("guide", place.slug), ...shareCard(title, description, `/guide/${place.slug}`) };
}

/** The overview of a place: what kind of place it is, this month, today, this week's guide, the sky, the forces, and what is about. */
export default async function GuidePage({ params }: { params: Promise<PlaceParams> }) {
  const { slug } = await params;
  const search: PlaceSearch = {};
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("guide", slug, place.slug, search);
  const [data, stored] = await Promise.all([getLocalData(place), readGuide(place)]);
  const gate = stored ? await checkLimit("guide", guideId(place)) : null;
  const eco = classifyEcoregion(place.lat, place.lon);
  const now = new Date();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <PlaceHero data={data} />
        <GuideHeader place={place} current="overview" timeZone={data.forecast.timezone} />

        <div className="mt-12">
          <PlaceSetting data={data} />
        </div>
        <div className="mt-16">
          <ThisMonth data={data} />
        </div>

        <section className="mt-16" aria-labelledby="today">
          <p className="eyebrow">Today</p>
          <h2 id="today" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            The weather, the soil and the sky
          </h2>
          <div className="mt-6">
            <ConditionsPanel data={data} />
          </div>
          <div className="mt-6">
            <DayBand data={data} now={now} />
          </div>
        </section>

        <div className="mt-10">
          {stored ? (
            // Written once, kept, and served straight from storage, with how old it is.
            <>
              <GuideBody view="overview" data={data} guide={stored.value} />
              <Freshness
                kind="guide"
                slug={place.slug}
                label={`the guide for ${place.name}`}
                timeZone={data.forecast.timezone}
                cooldownSeconds={gate && !gate.ok && gate.reason === "cooldown" ? gate.retryAfterSeconds : 0}
                {...stampProps(metaOf(stored), data.season)}
              />
            </>
          ) : (
            <GuideLoader slug={place.slug} lat={place.lat} lon={place.lon} view="overview" fallback={{ data, guide: rulesGuide(data, await floraEvidence(data.place, data.month).catch(() => null)) }} films={undefined} />
          )}
        </div>

        <div className="mt-12">
          <SkyPanel data={data} now={now} />
        </div>
        <div className="mt-12">
          <ForcesPanel data={data} section="overview" now={now} />
        </div>
        <div className="mt-12">
          <SeasonalForaging
            month={data.month}
            regionSlug={eco.slug}
            zone={data.climate?.zoneNumber}
            placeLabel={place.label}
            place={place}
            limit={6}
            showSoon={false}
            coast={data.water ? data.water.coast !== null : undefined}
          />
        </div>
        <div className="mt-12">
          <LocalWildlife data={data} limit={3} />
        </div>

        <RegionZoneCards data={data} />

        <div className="mt-12">
          <PlaceOrgs data={data} />
        </div>

        <NoteCTA
          className="mt-12"
          title={<>Get this guide for {place.name} every week</>}
          body="Frost warnings, what's biting, what's ripening. One email, Sunday evening."
          source="guide"
          location={place.label}
        />
      </div>
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
