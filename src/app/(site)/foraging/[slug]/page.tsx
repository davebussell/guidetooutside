import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { ALL_SPECIES, getSpecies } from "@/lib/species";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { PlaceTopicPage } from "@/components/PlaceTopicPage";
import * as SpeciesModule from "@/components/species/SpeciesPage";
import { OrgsAnywhere } from "@/components/conservation/VisitorOrgs";
import { NearbyOrgs } from "@/components/conservation/NearbyOrgs";
import { StoryBlock } from "@/components/conservation/StoryBlock";
import { FoodPanel } from "@/components/conservation/FoodPanel";

const { SpeciesPage } = SpeciesModule;
/** Fruit, berries and nuts: the food band leads with the fruit-picking and fruit-tree groups. */
const FRUIT_KINDS = new Set(["fruit", "berry", "nut"]);
/** The species page's own metadata, where its module provides it. */
const speciesMetadata = (SpeciesModule as Record<string, unknown>).speciesMetadata as ((slug: string) => Metadata | Promise<Metadata>) | undefined;

/**
 * A town's page is built the first time the town is asked for (the loading screen shows while it is), then stored
 * and served as a static page. It is rebuilt in the background at most once an hour, so no later reader waits.
 * The page reads no query string: a static page cannot, and the town's own coordinates are used.
 */
export const revalidate = 3600;
export function generateStaticParams(): PlaceParams[] {
  // The wild-edible pages are built with the site, so a reader (or a search engine) gets the finished page, never the
  // loading screen. Towns are still built the first time each is asked for.
  return ALL_SPECIES.filter((s) => getSpecies(s.slug)).map((s) => ({ slug: s.slug }));
}

/**
 * The slugs of parked species (src/lib/scope.ts). A parked species has no page, and its slug is not a town's either,
 * so it is not handed on to the geocoder to be matched to a town by its words ("rowan", "myrtle").
 */
const PARKED_SPECIES = new Set(ALL_SPECIES.filter((s) => !getSpecies(s.slug)).map((s) => s.slug));

/**
 * /foraging/<slug> is two kinds of page: a wild edible (/foraging/ramps) or a
 * town (/foraging/toronto-ontario). A species slug wins a tie.
 */
export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  if (getSpecies(slug)) return speciesMetadata ? speciesMetadata(slug) : { title: getSpecies(slug)!.name };
  if (PARKED_SPECIES.has(slug)) return {};
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `Foraging in ${place.label}`;
  const description = `What's ready to forage in ${place.name} right now: wild edibles in season with photographs, where they grow, how to identify them and the dangerous look-alikes to know first.`;
  const share = shareCard(title, description, `/foraging/${place.slug}`);
  return { title, description, alternates: { canonical: `/foraging/${place.slug}` }, ...placeRobots("foraging", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

export default async function ForagingSlugPage({ params }: { params: Promise<PlaceParams> }) {
  const { slug } = await params;
  const search: PlaceSearch = {};
  if (getSpecies(slug)) {
    // A species page is static: it reads no cookie, and the visitor's own organisations are filled in by the browser
    // (NearbyOrgs), as on the wildlife pages. Reading the place cookie here made every species page render on demand
    // behind the "Reading local records" screen (found 27 November 2026).
    const fruit = FRUIT_KINDS.has(getSpecies(slug)!.kind);
    return (
      <SpeciesPage
        slug={slug}
        orgs={
          <>
            {/* The species' story where one is written (its country-dependent parts decided in the browser), else the plain panel. */}
            <StoryBlock
              path={`/foraging/${slug}`}
              fallback={
                <NearbyOrgs
                  id="who-looks-after"
                  topic={["plants", "land"]}
                  species={[slug]}
                  headingNear="Who looks after the wild plants near {town}"
                >
                  <OrgsAnywhere
                    id="who-looks-after"
                    topic={["plants", "land"]}
                    species={[slug]}
                    heading="Who looks after wild plants and the land they grow on"
                  />
                </NearbyOrgs>
              }
            />
            {/* Foraging codes and gleaning; for fruit, the fruit-picking and fruit-tree groups first. */}
            <FoodPanel place={null} nearby section="foraging" fruit={fruit} className="mt-10" />
          </>
        }
      />
    );
  }
  if (PARKED_SPECIES.has(slug)) notFound();
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("foraging", slug, place.slug, search);
  return <PlaceTopicPage section="foraging" place={place} />;
}
