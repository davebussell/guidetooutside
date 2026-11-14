import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { PlaceTopicPage } from "@/components/PlaceTopicPage";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `Fishing in ${place.label}`;
  const description = `What's biting in ${place.name} this week: the species that are active and where they hold, the best windows by sun and moon, nearby waters, and the official regulations.`;
  const share = shareCard(title, description, `/fishing/${place.slug}`);
  return { title, description, alternates: { canonical: `/fishing/${place.slug}` }, ...placeRobots("fishing", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function FishingPlacePage({ params, searchParams }: { params: Promise<PlaceParams>; searchParams: Promise<PlaceSearch> }) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("fishing", slug, place.slug, search);
  return <PlaceTopicPage section="fishing" place={place} />;
}
