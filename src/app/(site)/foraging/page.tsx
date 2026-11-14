/**
 * /foraging — the foraging section's front page: what the section covers,
 * the foraging-year wheel and spot-the-danger, every wild edible by type,
 * the safety rules, and the local guides by place.
 */
import type { ComponentType } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SPECIES } from "@/lib/species";
import { speciesImage } from "@/lib/species-images";
import { MEDICINAL } from "@/data/medicinal";
import { SectionLead } from "@/components/SectionLead";
import { PlaceFinder } from "@/components/PlaceFinder";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SpinTheYearHere } from "@/components/here/ToyHere";
import { SpotTheDanger as RestoredSpotTheDanger } from "@/components/toys/SpotTheDanger";
import { ToySection } from "@/components/foraging/ToySection";
import { ForagingLibrary } from "@/components/foraging/ForagingLibrary";
import { servedText } from "@/components/species/served-text";
import { SeasonBand } from "@/components/conservation/SeasonBand";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { visitorPlace } from "@/lib/conservation/visitor";

// A restored client module, typed with the props it takes.
const SpotTheDanger = RestoredSpotTheDanger as ComponentType<{ start?: string; only?: string[] }>;

export const dynamic = "force-dynamic";

const TITLE = "Foraging — what's ready to pick, how to identify it, and the deadly look-alikes";
const DESCRIPTION =
  "Wild edibles of Canada and the United States with photographs, seasons, identification and the dangerous doubles to know first; a wheel of what's ready each month, a spot-the-danger game, and foraging guides for 100+ towns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/foraging" },
};

const CONTENTS = [
  { href: "#year", title: "The foraging year", note: "In season, month by month" },
  { href: "#danger", title: "Poisonous look-alikes", note: "How to tell them apart" },
  { href: "#library", title: "Wild edibles A–Z", note: `${SPECIES.length} species, photographed` },
  { href: "/foraging/calendar", title: "Foraging calendar", note: "Month by month" },
  { href: "/foraging/medicinal", title: "Medicinal plants", note: "Uses, evidence and cautions" },
  { href: "#find", title: "Local guides", note: "100+ places" },
];

const COVERS = [
  "Wild edibles in season this week near you",
  "Habitat: where each one actually grows",
  "Key identification features",
  "Dangerous look-alikes and how to tell them apart",
  "What's coming next month",
  "Region-specific hazards: ticks, hogweed, bears, land rules",
];

const RULES = [
  {
    title: "Confirm identity twice",
    text: "Identify with at least two independent features and two reliable sources. If any doubt remains, leave it.",
  },
  {
    title: "Learn the deadly species first",
    text: "Know the death cap and destroying angel, false morels, poison hemlock, water hemlock and giant hogweed before learning any edible.",
  },
  {
    title: "Mind the ground",
    text: "Skip roadsides, rail lines, sprayed lawns, orchards, industrial land and downstream of farms. Plants concentrate what they grow in.",
  },
  {
    title: "Take a little",
    text: "Harvest a small share of a patch, cut rather than pull, and leave the roots of anything perennial. Ramps and wild leeks especially.",
  },
  {
    title: "Know the land",
    text: "National and regional parks and nature reserves usually prohibit harvesting; public forests often allow personal use. Rules differ by country. Private land needs the owner's permission.",
  },
  {
    title: "Start with a small amount",
    text: "Correctly identified wild foods can still cause reactions. Eat a small amount the first time and keep a sample.",
  },
];

/** The wheel's tokens: each species with its months, ranges and a small photograph. */
function wheelSpecies() {
  return SPECIES.map(servedText).map((s) => {
    const img = speciesImage(s.slug);
    return {
      slug: s.slug,
      name: s.name,
      kind: s.kind,
      months: s.months,
      deadlyDouble: s.deadlyDouble,
      photo: img ? `/_next/image?url=${encodeURIComponent(img.src)}&w=256&q=75` : undefined,
      regions: s.regions,
    };
  });
}

function Hero() {
  const photo = speciesImage("chanterelle");
  return (
    <section className="card overflow-hidden">
      <div className="grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
        <div className="min-w-0 p-5 sm:p-8 lg:p-10">
          <p className="eyebrow text-moss">Foraging</p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Wild foods by season and place, and the species to avoid.</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Fiddleheads are picked for about two weeks in spring, chanterelles after the late-summer rains, hen of the woods at the base of oaks in autumn. Wild food
            depends on timing and habitat. This section sets out the foraging year, the poisonous species that resemble edibles and how to tell them apart; the local
            guide lists what has been recorded nearby this month.
          </p>
          <div className="mt-6">
            <SectionLead section="foraging" label="In season near you" note="Ranked by how often each species is recorded within 40 km this month." />
          </div>
        </div>
        <figure className="relative min-h-[240px] bg-paper-2 lg:min-h-full">
          {photo && (
            <>
              <Image
                src={photo.src}
                alt={`Chanterelles (${photo.taxon}) on the forest floor`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/75 to-transparent px-4 pb-2.5 pt-8 font-display text-xs italic leading-snug text-on-night/90">
                <span className="font-medium">{`Chanterelles, ${photo.taxon}`}.</span> Photo{" "}
                <a href={photo.source} target="_blank" rel="noopener nofollow" className="underline">
                  {photo.author}
                </a>{" "}
                {"on iNaturalist"} ·{" "}
                <a href={photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
                  {photo.license}
                </a>
              </figcaption>
            </>
          )}
        </figure>
      </div>
    </section>
  );
}

function Contents() {
  return (
    <nav aria-label="Foraging: contents" className="mt-8">
      <p className="eyebrow">In this section</p>
      <ul className="mt-2 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        {CONTENTS.map((c) => (
          <li key={c.href} className="border-b border-line">
            <Link href={c.href} className="group flex items-baseline justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block font-medium text-ink group-hover:text-moss">{c.title}</span>
                <span className="block text-sm text-ink-2">{c.note}</span>
              </span>
              <span aria-hidden="true" className="text-ink-2 group-hover:text-moss">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function ForagingPage() {
  const month = new Date().getMonth() + 1;
  // The route is dynamic already, so the season band reads the visitor's remembered town here.
  const here = await visitorPlace();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <Hero />
      <Contents />
      <SeasonBand
        topics={["plants", "land", "forests"]}
        place={here}
        heading={here ? `Wild plants, woods and land: get involved near ${here.name}` : "Get involved this season: wild plants, woods and land"}
        lede="Plant surveys, reserve work days and records of what grows where, run by the conservation organisations in our library; each button opens their own page."
        id="get-involved"
        className="mt-14"
      />
      {/* Foraging codes and the fruit-picking groups, for the visitor's remembered town when there is one. */}
      <FoodPanel place={here} section="foraging" className="mt-14" />
      <section id="play" className="mt-14 scroll-mt-24">
        <p className="eyebrow text-moss">Reference</p>
        <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Interactive diagrams</h2>
        <div className="mt-6 grid gap-10">
          <ToySection
            id="year"
            title="The foraging year"
            text="Turn the wheel to a month to see which species are usually in season. A red ring marks a species with a dangerous look-alike. Months are typical for the middle of each range; the south of a range runs early and the north late."
          >
            <SpinTheYearHere species={wheelSpecies()} startMonth={month} />
          </ToySection>
          <ToySection
            id="danger"
            title="Poisonous look-alikes"
            text="Eight wild foods and the poisonous species they resemble. Smell, cut or look closer, then select the feature that separates them. This is an introduction only: confirm any wild food with a regional field guide or an expert before eating it."
          >
            <SpotTheDanger />
          </ToySection>
        </div>
      </section>
      <section className="mt-16">
        <ForagingLibrary />
      </section>
      <section className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-10">
          <div>
            <p className="eyebrow">What the local guide covers</p>
            <ul className="mt-3 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
              {COVERS.map((c) => (
                <li key={c} className="border-b border-line py-2.5 text-sm text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Six rules for safe foraging</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <ul className="not-prose grid gap-3 sm:grid-cols-2">
                {RULES.map((r) => (
                  <li key={r.title} className="card px-4 py-3">
                    <p className="font-semibold text-ink">{r.title}</p>
                    <p className="text-sm">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">How the guide handles safety</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                Every mushroom or plant with a dangerous look-alike is listed with that look-alike and the feature that separates them. The hazard list is specific to each
                ecological region: tick season in north-eastern North America, giant hogweed in the Great Lakes basin, bears in the boreal forest,
                red-tide closures on the Pacific coast. It is a starting point for further checking, not a final authority.
              </p>
            </div>
          </article>
        </div>
        <aside className="grid gap-6 content-start">
          <div className="card p-5">
            <p className="eyebrow text-moss">Also in the foraging guide</p>
            <p className="font-display mt-1 text-lg font-semibold">Medicinal plants</p>
            <p className="mt-1 text-sm text-ink-2">
              What {MEDICINAL.length} of these plants have traditionally been used for, what has actually been tested, and the interactions and cautions that come with
              each one. Traditional use, not medical advice.
            </p>
            <Link href="/foraging/medicinal" className="mt-3 inline-block text-sm font-medium text-moss hover:underline">
              Medicinal plants →
            </Link>
          </div>
        </aside>
      </section>
      <div className="mt-20">
        <PlaceFinder title="Foraging guides by place" section="foraging" accent="text-moss" />
      </div>
      <section className="mt-16 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note</h2>
          <p className="mt-1 text-paper/90 text-sm">One email a week for your area, sent Sunday evening. Unsubscribe at any time.</p>
        </div>
        <NewsletterForm source="topic-foraging" />
      </section>
    </div>
  );
}
