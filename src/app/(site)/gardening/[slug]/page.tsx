import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { PlaceTopicPage } from "@/components/PlaceTopicPage";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  // Where the zone is an official map's, it leads the title.
  const c = (await getLocalData(place).catch(() => null))?.climate;
  const official = c && (c.zoneSource === "usda-2023" || c.zoneSource === "nrcan");
  const title = official ? `Gardening in ${place.label} — zone ${c.zone}, frost dates and this week in the garden` : `Gardening in ${place.label}`;
  const description = `${official ? `${place.name} is in hardiness zone ${c.zone}. ` : ""}This week in the garden in ${place.name}: where the garden year is, hardiness zone and frost dates, tonight's frost call bed by bed, what's ready to pick, how to store and put it up, and what to sow when the season comes.`;
  const share = shareCard(title, description, `/gardening/${place.slug}`);
  return { title, description, alternates: { canonical: `/gardening/${place.slug}` }, ...placeRobots("gardening", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function GardeningPlacePage({ params, searchParams }: { params: Promise<PlaceParams>; searchParams: Promise<PlaceSearch> }) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("gardening", slug, place.slug, search);
  return <PlaceTopicPage section="gardening" place={place} />;
}
