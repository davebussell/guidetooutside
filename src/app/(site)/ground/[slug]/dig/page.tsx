import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { placeFromSlug } from "@/lib/geocode";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { shareCard } from "@/lib/site";
import { getClimate } from "@/lib/climate";
import { digCaliche, digCover, digRock, getRocks, getSoil, isDesertClimate, kidPh, layersOf, rockNamed, type DigCover } from "@/lib/ground";
import { LandSkyEyebrow } from "@/components/kids/LandSkyNav";
import { LandSkyNav } from "@/components/ground/LandSkyNavClient";
import { SoilDig } from "@/components/kids/SoilDig";
import { ActivityArt } from "@/components/learn/ActivityArt";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `Dig down under ${place.label}`;
  // Audit, 11 November 2026: the description promised every town's real bedrock, and at Houston, New Orleans, Memphis
  // and Brownsville the maps name no rock at all. It now says only what holds for every town.
  // Audit, 13 November 2026: no leaf litter is promised (the desert towns' digs draw bare, dry ground).
  const description = `An interactive dig for children through the topsoil and subsoil under ${place.name}, and down to what the geologic maps show beneath.`;
  const share = shareCard(title, description, `/ground/${place.slug}/dig`);
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/ground/${place.slug}/dig` },
    ...share,
    openGraph: { ...share.openGraph, type: "website" },
  };
}

/** The cover the maps show over the rock here (glacial till, lake or marine clay, river deposits, fill, weathered rock), when there is one. */
type Cover = DigCover;
type DigProps = {
  placeName: string;
  rock?: string;
  rockAge?: string;
  soil?: string;
  cover?: Cover;
  noRock: boolean;
  /** The rock is named only in the cover's own description, not drawn as a map unit (Fort Myers). */
  rockInWords: boolean;
  /** A desert climate (Köppen BW, from the site's normals): the dig draws desert ground, not woodland. */
  desert: boolean;
  /** The map lists soil carbonate (caliche) at the dig's cover. */
  caliche: boolean;
};

/** What the dig goes down to, in the card's opening line: only what the maps show here. */
function digTo(cover: Cover | undefined, noRock: boolean, rockInWords: boolean): string {
  if (noRock && cover) return `down into the ${cover.name.toLowerCase()} the geologic maps show here. They name nothing beneath it, so the dig stops there.`;
  if (noRock) return "and on through typical layers. The geologic maps give nothing here for the dig to draw, so the deep layers are not this town's own.";
  if (rockInWords) return "down to the rock a geologic map's own description puts under the ground here.";
  return "all the way to the bedrock the geologic maps show here.";
}

/** The dig, in its "Try it" card. */
function DigCard({ placeName, rock, rockAge, soil, cover, noRock, rockInWords, desert, caliche }: DigProps) {
  return (
    <section className="card scroll-mt-24 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <ActivityArt art="mud" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
        <div className="min-w-0">
          <p className="eyebrow text-moss">Try it</p>
          <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{`Dig down under ${placeName}`}</h2>
        </div>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
        Drag the spade down, or tap Dig deeper, through {desert ? "the dry surface, the pale topsoil" : "the leaves, the living topsoil"} and the subsoil,{" "}
        {digTo(cover, noRock, rockInWords)}
      </p>
      <div className="mt-4">
        <SoilDig rock={rock} rockAge={rockAge} soil={soil} placeName={placeName} cover={cover} noRock={noRock && !!cover} desert={desert} caliche={caliche} />
      </div>
    </section>
  );
}

/** The same dig once the soil has been read, with the soil named. */
async function DigWithSoil({ lat, lon, ...props }: DigProps & { lat: number; lon: number }) {
  const soil = await getSoil(lat, lon);
  return <DigCard {...props} soil={soil ? `${soil.texture}, ${kidPh(soil.ph)}` : undefined} />;
}

/** /ground/<town>/dig: a child's dig through the ground under a place, down to what the geologic maps show there. */
export default async function DigPage({ params, searchParams }: { params: Promise<PlaceParams>; searchParams: Promise<PlaceSearch> }) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  const place = await resolvePlace(slug, search);
  if (!place) notFound();
  const units = await getRocks(place.lat, place.lon).catch(() => []);
  const layers = layersOf(units);
  // The bedrock the maps show (never cover), named by its main lithology, with the unit's age range, or the interval the
  // map dates it to where that is all it gives ("from the Ordovician to the Devonian"; audit, 10 November 2026: the dig
  // said "66 million years old, and still forming" for saprolite).
  const { rock, rockAge } = digRock(layers);
  // Where the maps show cover over the rock (loose deposits, or rock weathered where it lies), the dig does not put the
  // rock at a typical 2 m: under Chicago it lies 20 to 30 m down under glacial and lake deposits (5 Nov 2026 audit), and
  // under Richmond, Charlotte and Atlanta under weathered rock 3 to 15 m, up to 5 m and up to 15 m thick (10 Nov 2026
  // audit). The cover is named, with the map's own thickness words when it gives them; otherwise the depth is left unsaid.
  const cover: Cover | undefined = digCover(layers);
  // Where the maps name no rock at all (no detailed map's bedrock, no district rock), the dig stops in the cover and says
  // so (audit, 11 November 2026: Houston, New Orleans, Memphis and Brownsville, where the sediment runs hundreds to
  // thousands of metres down; see `digStopsAtCover`). With no map unit at all, the deep layers are typical, and said to be.
  // Audit, 13 November 2026 (Day 4): at Fort Myers a cover unit's own description names the rock it lies on, and the dig
  // said "They name nothing beneath it"; that rock now counts (`rockNamed`), with no age, since the words give none.
  const noRock = !rockNamed(layers);
  const rockInWords = !layers.bedrock && !layers.regionalBedrock && !!layers.beneath;
  // Audit, 13 November 2026: leaf litter and dark topsoil with earthworms were drawn under Tucson, Phoenix and Las Vegas.
  // A desert by the site's own climate normals draws desert ground; caliche is named where the map lists it.
  const desert = isDesertClimate(await getClimate(place).catch(() => null), place.lat);
  const caliche = digCaliche(layers);
  const props = { placeName: place.name, rock, rockAge, cover, noRock, rockInWords, desert, caliche };
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <LandSkyEyebrow>The ground under you</LandSkyEyebrow>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Dig down under {place.name}</h1>
        <p className="mt-2 text-ink-2">
          <Link href={`/ground/${place.slug}`} className="underline decoration-line hover:text-ink">
            The ground under {place.name}, in full →
          </Link>
        </p>
        <div className="mt-8">
          <LandSkyNav current="ground" rockNamed={!noRock} />
        </div>
        <div className="mt-10">
          <Suspense fallback={<DigCard {...props} soil={undefined} />}>
            <DigWithSoil {...props} lat={place.lat} lon={place.lon} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
