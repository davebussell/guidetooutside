import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CREATURES, alsoActive, getCreature, GROUP_LABEL, type Creature } from "@/lib/nature";
import { continentOfRegion, monthName } from "@/lib/species";
import { getEcoregion, SERVED_ECOREGIONS } from "@/lib/ecoregions";
import { continentServed } from "@/lib/scope";
import { servedRegionsFirst } from "@/components/species/served-text";
import { creatureImage } from "@/lib/creature-images";
import { FISH_FACTS } from "@/data/fish-facts";
import { FACTS_REVIEWED } from "@/data/edible-facts";
import { CREATURE_VIDEOS, FISH_FILMS } from "@/data/videos";
import { SHARE_IMAGE, SITE } from "@/lib/site";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { CreatureCard, shortMonthRange } from "@/components/NatureCard";
import { LocalAnswer, NearYouLine, RegionChips } from "@/components/here/LocalBits";
import { LocationSearch } from "@/components/LocationSearch";
import { FishSize } from "@/components/toys/FishLineup";
import { FishLookalikes } from "@/components/toys/FishLookalikes";
import { FishFilms } from "@/components/FishFilms";
import { SpeciesVideos } from "@/components/SpeciesVideos";
import { ToyPanel } from "@/components/wildlife/ToyPanel";
import { QuickFacts, Questions, Sources } from "@/components/wildlife/FishFactsPanels";
import { LOOKALIKE_FISH } from "@/components/wildlife/lookalike-fish";
import { NearbyOrgs } from "@/components/conservation/NearbyOrgs";
import { OrgsAnywhere } from "@/components/conservation/VisitorOrgs";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import type { Topic } from "@/data/conservation";

type Params = { slug: string };

export function generateStaticParams() {
  return CREATURES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;
/** "Active (October)" and "Also active in October" follow the month, so the pages are re-read twice a day. */
export const revalidate = 43200;

const isFish = (c: Creature) => c.group === "fish";
/** The conservation panel's subjects: a fish's water, or the garden's pollinators, birds and wildlife. */
const FISH_TOPICS: Topic[] = ["fish", "water"];
const GARDEN_TOPICS: Topic[] = ["pollinators", "birds", "wildlife"];
/** The everyday name without its bracketed part: "Redfish (red drum)" → "Redfish". */
const shortName = (name: string) => name.replace(/\s*\([^)]*\)\s*$/, "");

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getCreature((await params).slug);
  if (!c) return {};
  const title = isFish(c) ? `${c.name} — facts, size, range and how to catch it` : `${c.name} — what it does in the garden`;
  const description = isFish(c)
    ? `${c.name} (${c.latin}): how to identify it, its native range, size and record, lifespan, what it eats, when it spawns, and where and how to catch it.`
    : `${c.name} (${c.latin}): identification, season and what it means for your garden. Part of the Guide to Outside field guide.`;
  const img = creatureImage(c.slug);
  return {
    title,
    description,
    alternates: { canonical: `/wildlife/${c.slug}` },
    openGraph: { title, description, images: img ? [img.src] : [SHARE_IMAGE] },
  };
}

/** The continent the page is written from: that of the first region the record names on a served continent (src/lib/scope.ts). */
const homeContinent = (c: Creature): string =>
  c.regions === "all" ? "north-america" : continentOfRegion(c.regions.find((r) => continentServed(continentOfRegion(r))) ?? c.regions[0]);

/** "When": all year, or the months as a range and in full, with how the season moves across the range. */
function whenText(c: Creature): string {
  if (c.months.length >= 12) return "Active all year; habitat and behaviour shift with the season.";
  const names = [...c.months].sort((a, b) => a - b).map(monthName).join(", ");
  const northAmerican = homeContinent(c) === "north-america";
  return `${shortMonthRange(c.months)} — ${names}. ${northAmerican ? "Earlier in the south, later in the north." : "Earlier where the water warms first."}`;
}

function pageLd(c: Creature): string {
  const url = `${SITE.url}/wildlife/${c.slug}`;
  const img = creatureImage(c.slug);
  const f = isFish(c) ? FISH_FACTS[c.slug] : undefined;
  return jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Wildlife", "/wildlife"],
      [c.name, `/wildlife/${c.slug}`],
    ]),
    {
      "@type": "Article",
      headline: c.name,
      description: `${c.name} (${c.latin}) — ${c.where}`,
      mainEntityOfPage: url,
      ...(img ? { image: `${SITE.url}${img.src}` } : {}),
      articleSection: "Wildlife",
      ...(f
        ? {
            dateModified: FACTS_REVIEWED.iso,
            citation: f.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
          }
        : {}),
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
    ...(f?.faqs.length
      ? [
          {
            "@type": "FAQPage",
            "@id": `${url}#questions`,
            mainEntity: f.faqs.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
          },
        ]
      : []),
  ]);
}

export default async function CreaturePage({ params }: { params: Promise<Params> }) {
  const c = getCreature((await params).slug);
  if (!c) notFound();
  const fish = isFish(c);
  const month = new Date().getMonth() + 1;
  const active = c.months.includes(month);
  const img = creatureImage(c.slug);
  const f = fish ? FISH_FACTS[c.slug] : undefined;
  const section = fish ? "fishing" : "gardening";
  const videos = CREATURE_VIDEOS[c.slug] ?? { kind: fish ? "fish" : "garden", videos: [] };
  // The regions with a page: a region on a parked continent (src/lib/scope.ts) is not listed.
  const regions = (
    c.regions === "all"
      ? SERVED_ECOREGIONS
      : c.regions.map((r) => getEcoregion(r)).filter((r) => r && continentServed((r as { continent?: string }).continent))
  ) as { slug: string; name: string }[];
  const also = alsoActive(servedRegionsFirst(c), month);
  const short = shortName(c.name);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pageLd(c) }} />
      <nav className="text-sm text-ink-2 flex flex-wrap items-center gap-2">
        <Link href="/wildlife" className="hover:text-ink">
          Species
        </Link>
        <span>·</span>
        <Link href={`/${section}`} className="hover:text-ink">
          {fish ? "Fishing" : "Gardening"}
        </Link>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="card overflow-hidden">
          <div className="relative aspect-[4/3] bg-paper-2">
            {img ? (
              <Image src={img.src} alt={`${c.name} (${c.latin})`} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-ink-2">No photograph yet</div>
            )}
          </div>
          {img && (
            <p className="px-4 py-3 font-display text-[13px] italic text-ink-2">
              {"Photo by"}{" "}
              <a href={img.source} target="_blank" rel="noopener nofollow" className="underline">
                {img.author}
              </a>{" "}
              {"on iNaturalist ·"}{" "}
              <a href={img.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
                {img.license}
              </a>
              {img.taxon && img.taxon !== c.latin ? ` · specimen identified as ${img.taxon}` : ""}
            </p>
          )}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-2">{GROUP_LABEL[c.group]}</span>
            <span className="text-xs text-ink-2">·</span>
            <span className={`text-xs font-semibold ${active ? "text-moss" : "text-ink-2"}`}>
              {active ? `Active (${monthName(month)})` : `Active ${shortMonthRange(c.months)}`}
            </span>
          </div>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">{c.name}</h1>
          <p className="mt-1 text-lg italic text-ink-2">{c.latin}</p>
          <NearYouLine regions={c.regions} months={c.months} section={section} />
          <dl className="mt-6 grid gap-5">
            <div>
              <dt className="eyebrow">When</dt>
              <dd className="mt-1 text-ink-2">{whenText(c)}</dd>
            </div>
            <div>
              <dt className="eyebrow">{fish ? "Habitat" : "Where found"}</dt>
              <dd className="mt-1 text-ink-2">{c.where}</dd>
            </div>
            <div>
              <dt className="eyebrow">Identification</dt>
              <dd className="mt-1 text-ink-2">{c.identify}</dd>
            </div>
            <div>
              <dt className="eyebrow">{fish ? "Notes" : c.group === "pest" ? "Damage and control" : "Role in the garden"}</dt>
              <dd className="mt-1 text-ink-2">{c.note}</dd>
            </div>
            {c.tactic ? (
              <div>
                <dt className="eyebrow text-moss">Method</dt>
                <dd className="mt-1 text-ink-2">{c.tactic}</dd>
              </div>
            ) : undefined}
            {c.caution ? (
              <div>
                <dt className="eyebrow text-rust">Caution</dt>
                <dd className="mt-1 text-ink-2">{c.caution}</dd>
              </div>
            ) : undefined}
          </dl>
          {fish && (
            <p className="mt-6 rounded-tile border border-line bg-paper-2/60 p-4 text-sm text-ink-2">
              {"Seasons, size limits and catch limits change every year and differ by water body."}{" "}
              <Link href="/fishing/regulations" className="underline font-medium text-moss">
                Check the current regulations
              </Link>
              {" for"}
              {homeContinent(c) === "north-america" ? " the local jurisdiction and the water" : " the country and the water"}
              {" before fishing."}
            </p>
          )}
        </div>
      </div>

      {f ? (
        <div className="mt-12">
          <QuickFacts name={c.name} facts={f} />
        </div>
      ) : undefined}

      {f ? (
        <div className="mt-10 grid gap-10">
          <ToyPanel id="how-big" title={`${short}: size range`} intro="Move the slider from a typical adult to the largest recorded specimen, shown against objects of known size.">
            <FishSize name={c.name} slug={c.slug} typicalCm={f.typicalCm} maxCm={f.maxCm} record={f.record} shape={f.shape} />
          </ToyPanel>
          {LOOKALIKE_FISH.has(c.slug) && (
            <ToyPanel
              id="lookalikes"
              title="Commonly confused species"
              intro="The species it is most often mistaken for, side by side. Name each, then select the distinguishing feature, the same features fisheries officers use."
            >
              <FishLookalikes start={c.slug} />
            </ToyPanel>
          )}
        </div>
      ) : undefined}

      {f?.faqs.length ? (
        <div className="mt-12">
          <Questions about={short.toLowerCase()} faqs={f.faqs} />
        </div>
      ) : undefined}

      {fish && <FishFilms name={c.name} videos={FISH_FILMS[c.slug] ?? []} month={month} />}
      <SpeciesVideos kind={videos.kind} name={c.name} videos={videos.videos} heading={videos.heading} />

      <section className="mt-12">
        <p className="eyebrow">Found in these regions</p>
        <RegionChips regions={regions.map((r) => ({ slug: r.slug, name: r.name }))} />
      </section>

      {f ? (
        <div className="mt-10">
          <Sources sources={f.sources} />
        </div>
      ) : undefined}

      {/* The page is pre-rendered, so the visitor's own organisations are filled in by the browser (NearbyOrgs). */}
      <div className="mt-12">
        <NearbyOrgs
          id="who-looks-after"
          topic={fish ? FISH_TOPICS : GARDEN_TOPICS}
          species={[c.slug]}
          headingNear={fish ? "Who looks after the fish and water near {town}" : "Who looks after garden wildlife near {town}"}
        >
          <OrgsAnywhere
            id="who-looks-after"
            topic={fish ? FISH_TOPICS : GARDEN_TOPICS}
            species={[c.slug]}
            heading={fish ? "Who looks after fish and their water" : "Who looks after garden wildlife"}
          />
        </NearbyOrgs>
      </div>

      {/* A fish page: the seafood guide for the reader's country, with a link to this fish's own page in the guide where it has one. */}
      {fish && <FoodPanel place={null} section="fishing" roles={["sustainable-seafood"]} fish={{ slug: c.slug, name: c.name, water: c.water }} nearby className="mt-10" />}

      <LocalAnswer section={section}>
        <section className="mt-12 card p-6 sm:p-8">
          <p className="eyebrow text-moss">Local activity</p>
          <h2 className="font-display mt-1 text-2xl font-semibold">This week&apos;s guide for a place</h2>
          <p className="mt-2 text-ink-2 max-w-2xl text-sm">
            Enter a town or postal code for this week&apos;s conditions there, based on the local climate, this week&apos;s weather and the ecological
            region.
          </p>
          <div className="mt-4 max-w-xl">
            <LocationSearch />
          </div>
        </section>
      </LocalAnswer>

      <section className="mt-12">
        <p className="eyebrow">
          {"Also active in "}
          {monthName(month)}
        </p>
        <div className="mt-4">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {also.map((o) => (
              <CreatureCard key={o.slug} creature={o} priority={false} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
