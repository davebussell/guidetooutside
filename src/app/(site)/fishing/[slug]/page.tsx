import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { PlaceTopicPage } from "@/components/PlaceTopicPage";

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
  const title = `Fishing in ${place.label}`;
  const description = `What's biting in ${place.name} this week: the species that are active and where they hold, the best windows by sun and moon, nearby waters, and the official regulations.`;
  const share = shareCard(title, description, `/fishing/${place.slug}`);
  return { title, description, alternates: { canonical: `/fishing/${place.slug}` }, ...placeRobots("fishing", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function FishingPlacePage({ params }: { params: Promise<PlaceParams> }) {
  const { slug } = await params;
  const search: PlaceSearch = {};
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("fishing", slug, place.slug, search);
  return <PlaceTopicPage section="fishing" place={place} />;
}
