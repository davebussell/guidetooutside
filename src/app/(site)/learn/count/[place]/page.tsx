import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AsOf } from "@/components/Freshness";
import { CountSheet } from "@/components/learn/CountSheet";
import { AwakeGame } from "@/components/learn/AwakeGame";
import { Tile } from "@/components/learn/family";
import { SunShadow as SunShadowJs } from "@/components/toys/SunShadow";
import { RememberPlace } from "@/lib/place-cookie";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { resolvePlace, type PlaceSearch } from "@/lib/place-route";
import { localTaxa, TREES } from "@/lib/local-flora";
import { awakeNow, countCards, type Recorded } from "@/lib/learn/count";
import { shareCard } from "@/lib/site";

export const dynamic = "force-dynamic";

/** The toy's `rung` is optional; its restored source does not say so. */
const SunShadow = SunShadowJs as unknown as React.ComponentType<{ lat: number; lon: number; placeName: string; timeZone: string }>;

type Params = { place: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const place = await placeFromSlug((await params).place);
  if (!place) return { title: "Location not found" };
  const title = `Today's nature count for ${place.label}`;
  const description = `Hours of daylight, days to the first frost, nights to a full moon and what is living near ${place.name} right now — today's real numbers, written as counting for a two-, four- and six-year-old.`;
  const path = `/learn/count/${place.slug}`;
  const share = shareCard(title, description, path);
  return { title, description, alternates: { canonical: path }, ...share, openGraph: { ...share.openGraph, type: "article" } };
}

/** What has been photographed within 40 km this month, from the cached iNaturalist counts. */
async function recordedNear(lat: number, lon: number, month: number): Promise<Recorded> {
  const [fungi, plants] = await Promise.all([localTaxa(lat, lon, month, "Fungi", 200), localTaxa(lat, lon, month, "Plantae", 200)]);
  const all = [...fungi, ...plants];
  if (!all.length) return null;
  const trees = new Set(all.map((t) => t.latin.split(" ")[0]).filter((g) => TREES[g]));
  return { all: all.length, fungi: fungi.length, trees: Math.min(8, trees.size) };
}

export default async function CountPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<PlaceSearch & { at?: string }> }) {
  const [{ place: slug }, search] = await Promise.all([params, searchParams]);
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  const data = await getLocalData(place);
  // Local development only: `?at=<ISO time>` counts the day as it stood then, to compare with a capture.
  const at = process.env.NODE_ENV === "development" ? Date.parse(search.at ?? "") : NaN;
  const now = Number.isFinite(at) ? new Date(at) : new Date();
  const recorded = await recordedNear(place.lat, place.lon, data.month);
  const cards = countCards(data, recorded, now);
  const awake = awakeNow(data, now);
  const tz = data.forecast.timezone;
  const dateLine = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: tz });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <RememberPlace slug={place.slug} label={place.label} lat={place.lat} lon={place.lon} tz={tz} />
      <div className="max-w-3xl">
        <p className="eyebrow text-moss">For Kids · Teaching at home · Today’s nature count</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
          What shall we count in {place.name} today?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          Every number here is today’s, and every one of them is true of the ground outside your door. Tap who’s counting, read the line under their
          name, and go and count the thing.
        </p>
      </div>
      <p className="mt-6 text-sm font-medium text-ink-2">
        {dateLine} · {place.label} · {data.season.toLowerCase()}
      </p>
      <div className="print:hidden">
        <AsOf savedAt={data.fetchedAt} what="Today's readings" timeZone={tz} />
      </div>
      <div className="mt-4">
        <CountSheet cards={cards} placeName={place.name} />
      </div>
      <div className="mt-12 print:hidden">
        <AwakeGame animals={awake.animals} phaseLabel={awake.phaseLabel} clock={awake.clock} placeName={place.name} />
      </div>
      <section className="mt-12 print:hidden">
        <p className="eyebrow text-gold">The same day, on a slider</p>
        <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Where the shadow falls in {place.name}</h2>
        <p className="mt-2 max-w-3xl text-ink-2">
          Worked out from the sun’s real position at these coordinates, so the shadow points where your shadow points and is as long as your shadow is.
          Put a stick in the lawn on Saturday and check it.
        </p>
        <div className="mt-5">
          <SunShadow lat={place.lat} lon={place.lon} placeName={place.name} timeZone={tz} />
        </div>
      </section>
      <div className="mt-12 grid gap-3 sm:grid-cols-3 print:hidden">
        <Tile art="book" title="The next eight weeks" note={`Which lesson which week, by the season and ${place.name}'s daylight`} href={`/learn/plan/${place.slug}`} />
        <Tile art="acorn" title="Lessons by theme" note="An hour outside, with the words to say at each age" href="/learn/lessons" />
        <Tile art="crayon" title="The field journal" note="Write down what they counted today" href="/learn/journal" />
      </div>
    </div>
  );
}
