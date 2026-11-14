import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlanBoard } from "@/components/learn/PlanBoard";
import { Tile } from "@/components/learn/family";
import { RememberPlace } from "@/lib/place-cookie";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { resolvePlace, type PlaceSearch } from "@/lib/place-route";
import { planIntro, seasonPlan } from "@/lib/learn/plan";
import { shareCard } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { place: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const place = await placeFromSlug((await params).place);
  if (!place) return { title: "Location not found" };
  const title = `Eight weeks of nature lessons for ${place.label}`;
  const description = `A term plan for teaching children outside, built from the season, ${place.name}'s daylight and moon, and its average first frost where that falls in the eight weeks — which lesson to do which week, and why that week. For a two-, four- and six-year-old.`;
  const path = `/learn/plan/${place.slug}`;
  const share = shareCard(title, description, path);
  return { title, description, alternates: { canonical: path }, ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function PlanPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<PlaceSearch & { at?: string }> }) {
  const [{ place: slug }, search] = await Promise.all([params, searchParams]);
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  const data = await getLocalData(place);
  // Local development only: `?at=<ISO time>` plans from that day, to compare with a capture.
  const at = process.env.NODE_ENV === "development" ? Date.parse(search.at ?? "") : NaN;
  const weeks = seasonPlan(data, Number.isFinite(at) ? new Date(at) : new Date());

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <RememberPlace slug={place.slug} label={place.label} lat={place.lat} lon={place.lon} tz={data.forecast.timezone} />
      <div className="max-w-3xl">
        <p className="eyebrow text-moss">For Kids · Teaching at home · The season plan</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">The next eight weeks in {place.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          {planIntro(data, weeks)}
        </p>
      </div>
      <div className="mt-8">
        <PlanBoard weeks={weeks} placeName={place.name} closing={[]} />
      </div>
      <div className="mt-12 grid gap-3 sm:grid-cols-3 print:hidden">
        <Tile art="sun" title="Today's nature count" note="The numbers as they stand this morning, for each child" href={`/learn/count/${place.slug}`} />
        <Tile art="sprout" title="Each child's ladder" note="What each of them can do, and the next step" href="/learn/progress" />
        <Tile art="hare" title="Plan today" note="A whole day out, for today's weather" href="/learn#today" />
      </div>
    </div>
  );
}
