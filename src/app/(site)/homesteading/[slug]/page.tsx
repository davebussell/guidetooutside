import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { placeRobots } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { getTopic } from "@/data/homestead/topics";
import { TopicPage, topicMetadata } from "@/components/homestead/TopicPage";
import { HomesteadPlacePage } from "@/components/homestead/HomesteadPlacePage";
import { StoryBlock } from "@/components/conservation/StoryBlock";
import { VisitorOrgs } from "@/components/conservation/VisitorOrgs";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { visitorPlace } from "@/lib/conservation/visitor";
import type { FoodRole, Topic } from "@/data/conservation";

/** A topic page's panel when it has no story: its first subject, then the rest of the homestead's. */
const TOPIC_PANEL: Record<string, { topic: Topic[]; near: string; anywhere: string }> = {
  honeybees: { topic: ["pollinators", "plants", "soil-seeds"], near: "Who looks after the bees and pollinators near {town}", anywhere: "Who looks after bees and other pollinators" },
  rainwater: { topic: ["water", "soil-seeds"], near: "Who looks after the water near {town}", anywhere: "Who looks after rivers, lakes and the water you collect" },
  "wood-heat": { topic: ["forests", "land"], near: "Who looks after the woods near {town}", anywhere: "Who looks after woods and forests" },
};
/**
 * The food band's roles on a topic page: the food and livestock topics lead with community farms and local food (the
 * homesteading default); season extension with growing advice and the farms that teach it.
 */
const TOPIC_FOOD: Record<string, FoodRole[]> = {
  "season-extension": ["growing-advice", "community-farms", "seed-library", "local-food"],
};
const SOIL_PANEL = { topic: ["soil-seeds", "land", "pollinators"] as Topic[], near: "Who keeps the seeds and soil near {town}", anywhere: "Who keeps old seeds, breeds and soil alive" };

export const dynamic = "force-dynamic";

/**
 * /homesteading/<slug> is two kinds of page, like /foraging/<slug>: a topic
 * (/homesteading/laying-hens) or a town (/homesteading/toronto-ontario). A
 * topic wins a tie. A town reached by another spelling of its slug is sent on
 * to the canonical one.
 */
export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  if (getTopic(slug)) return topicMetadata(slug);
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `Homesteading in ${place.label}`;
  const description = `The homestead year in ${place.name}: daylight and laying, freezing nights and hot days for the animals, litres from 100 m² of roof, heating degree days, frost dates for cold frames and tunnels, and the bee season.`;
  const share = shareCard(title, description, `/homesteading/${place.slug}`);
  return { title, description, alternates: { canonical: `/homesteading/${place.slug}` }, ...placeRobots("homesteading", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function HomesteadingSlugPage({ params, searchParams }: { params: Promise<PlaceParams>; searchParams: Promise<PlaceSearch> }) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  if (getTopic(slug)) {
    // The route is dynamic already: the visitor's remembered town picks the organisations and a story's steps.
    const here = await visitorPlace();
    const panel = TOPIC_PANEL[slug] ?? SOIL_PANEL;
    return (
      <TopicPage
        slug={slug}
        orgs={
          <>
            <StoryBlock
              path={`/homesteading/${slug}`}
              place={here}
              fallback={<VisitorOrgs id="who-looks-after" place={here} topic={panel.topic} headingNear={panel.near} headingAnywhere={panel.anywhere} />}
            />
            {/* Below the story or panel: community farms and local food near the visitor's town. */}
            <FoodPanel place={here} section="homesteading" roles={TOPIC_FOOD[slug]} className="mt-10" />
          </>
        }
      />
    );
  }
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  if (place.slug !== slug) {
    const q = search.lat && search.lon ? `?lat=${encodeURIComponent(search.lat)}&lon=${encodeURIComponent(search.lon)}` : "";
    permanentRedirect(`/homesteading/${place.slug}${q}`);
  }
  return <HomesteadPlacePage place={place} />;
}
