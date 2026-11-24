import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { GroundPage } from "@/components/GroundPage";

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
  const title = `The ground under ${place.label}`;
  const description = `The surface deposits and bedrock the geologic maps show at ${place.name}, with their age ranges, the soil as a model estimates it, a modelled river flow, the lakes and rivers within reach, and where the water goes after it leaves.`;
  const share = shareCard(title, description, `/ground/${place.slug}`);
  return { title, description, alternates: { canonical: `/ground/${place.slug}` }, ...placeRobots("ground", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function GroundPlacePage({ params }: { params: Promise<PlaceParams> }) {
  const { slug } = await params;
  const search: PlaceSearch = {};
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("ground", slug, place.slug, search);
  const data = await getLocalData(place);
  return <GroundPage data={data} />;
}
