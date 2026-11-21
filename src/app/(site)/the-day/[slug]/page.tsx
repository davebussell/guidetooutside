import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { dayPageData } from "@/lib/day-page";
import { RememberPlace } from "@/lib/place-cookie";
import { DAY_PHASES } from "@/data/day-stories";
import { ChangeLocation } from "@/components/ChangeLocation";
import { DayScrubber } from "@/components/DayScrubber";
import { SpinEarth } from "@/components/toys/SpinEarth";
import { LandSkyNav } from "@/components/ground/LandSkyNavClient";
import { NoteCTA } from "@/components/PlaceCards";
import { OrgLine } from "@/components/conservation/OrgLine";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `The day in ${place.label}`;
  const description = `Eight phases of the day worked out from the sun's real position over ${place.name}: what the light is doing now, what it means up close and across the whole landscape, and where the fish, the pollinators and the pests are in each one.`;
  const share = shareCard(title, description, `/the-day/${place.slug}`);
  return { title, description, alternates: { canonical: `/the-day/${place.slug}` }, ...placeRobots("the-day", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

/** /the-day/<town>: where the sun is at a place now, and the day there phase by phase. */
export default async function DayPlacePage({ params, searchParams }: { params: Promise<PlaceParams>; searchParams: Promise<PlaceSearch> }) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("the-day", slug, place.slug, search);
  const data = await getLocalData(place);
  // Local development only: `?at=<ISO time>` renders the day as it stood then, to compare with a capture.
  const at = process.env.NODE_ENV === "development" ? Date.parse((search as { at?: string }).at ?? "") : NaN;
  const day = dayPageData(data, Number.isFinite(at) ? new Date(at) : new Date());
  const phase = day.currentPhase ? DAY_PHASES[day.currentPhase].label : null;
  const alt = day.nowAltitude;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <RememberPlace slug={place.slug} label={place.label} lat={place.lat} lon={place.lon} tz={data.forecast.timezone} />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="eyebrow text-gold">The day · {place.label}</p>
            <h1 className="font-display mt-1 text-4xl sm:text-5xl font-semibold tracking-tight">
              {phase}
              {day.minutesLeftNow != null && (
                <span className="text-ink-2 font-normal text-2xl sm:text-3xl">
                  {" "}
                  · {day.minutesLeftNow} min remaining
                </span>
              )}
            </h1>
            <p className="mt-2 text-ink-2">
              Sun {alt > 0 ? `${alt}° up` : `${Math.abs(alt)}° below the horizon`}, in the {day.nowCompass} · {day.regionName}
            </p>
          </div>
          <ChangeLocation label={place.label} section={undefined} />
        </div>

        <section className="mt-6 card p-5 sm:p-6 border-l-4 border-l-gold-fill">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="eyebrow text-gold">Conditions</p>
            <p className="font-display text-xl font-semibold">{day.characterLabel}</p>
          </div>
          <p className="mt-2 text-ink-2 max-w-3xl">{day.characterSummary}</p>
          <p className="mt-2 text-sm font-medium text-moss">{day.characterAdvice}</p>
        </section>

        <div className="mt-8">
          <DayScrubber data={day} />
        </div>
        <OrgLine place={place} topic={["wildlife", "birds", "water", "land"]} label={`Who looks after today’s outdoors near ${place.name}`} className="mt-6" />

        <div className="mt-10 max-w-4xl">
          <section className="card scroll-mt-24 p-4 sm:p-6">
            <p className="eyebrow">Interactive</p>
            <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{`The Earth's rotation and the day at ${place.name}`}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
              Rotate the Earth, or use the arrows, to follow the location from sunrise to noon, sunset and night. One full rotation is one day.
            </p>
            <div className="mt-4">
              <SpinEarth lat={place.lat} lon={place.lon} placeName={place.name} />
            </div>
          </section>
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          <Link href={`/guide/${place.slug}`} className="card p-5 hover:border-moss transition">
            <h2 className="font-display text-lg font-semibold">Local guide</h2>
            <p className="mt-1 text-sm text-ink-2">{`Gardening, fishing, foraging and homesteading for ${place.name} this week.`}</p>
          </Link>
          <Link href={`/regions/${day.regionSlug}`} className="card p-5 hover:border-moss transition">
            <h2 className="font-display text-lg font-semibold">{day.regionName}</h2>
            <p className="mt-1 text-sm text-ink-2">The ecological region and its species.</p>
          </Link>
          <Link href="/almanac" className="card p-5 hover:border-moss transition">
            <h2 className="font-display text-lg font-semibold">Almanac</h2>
            <p className="mt-1 text-sm text-ink-2">Day length, the moon, and air and water temperature through the year.</p>
          </Link>
        </section>

        <div className="mt-12">
          <p className="eyebrow text-moss">The land and the sky</p>
          <div className="mt-3">
            <LandSkyNav current="day" />
          </div>
        </div>

        <NoteCTA
          className="mt-12"
          title={<>The week ahead for {place.name}</>}
          body="One email, Sunday evening. Unsubscribe at any time."
          source="the-day"
          location={place.label}
        />
      </div>
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
