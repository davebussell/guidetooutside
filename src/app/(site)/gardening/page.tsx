import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CROPS, cropsInMonth, RECIPES, recipesInSeason } from "@/lib/crops";
import { cropImage } from "@/lib/crop-images";
import { KNOWN_PLACES } from "@/lib/geocode";
import { GARDEN_LIFE } from "@/lib/nature";
import { monthName } from "@/lib/species";
import { CropGrid, RecipeCard } from "@/components/garden/CropCard";
import { CreatureCard } from "@/components/NatureCard";
import { PlaceFinder } from "@/components/PlaceFinder";
import { SectionLead } from "@/components/SectionLead";
import { NewsletterForm } from "@/components/NewsletterForm";
import { FrostWatchHere, YourGardenYear } from "@/components/here/GardenHere";
import { RegionNote } from "@/components/here/RegionNote";
import { WillItSproutHere } from "@/components/here/ToyHere";
import { ColdestNightForYou } from "@/components/here/ZoneHere";
import { PutItUpSection } from "@/components/crops/PutItUpSection";
import { coldestPlaces } from "@/components/zones/coldest-places";
import { ToyCard } from "@/components/zones/ToyCard";
import { SeasonBand } from "@/components/conservation/SeasonBand";
import { FoodPanel } from "@/components/conservation/FoodPanel";

/** The month's crops and recipes follow the calendar. */
export const revalidate = 3600;

const TITLE = "Gardening — your garden year: what to pick, put up, plant and plan this week";
const DESCRIPTION = `Gardening guides for ${Math.floor(KNOWN_PLACES.length / 10) * 10}+ towns across Canada and the United States built on each town's own frost dates: where the garden year is right now, tonight's frost call bed by bed, what's coming out of the garden, how to can, freeze, dry and store it, which seeds to save, and what to sow when spring comes.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/gardening" },
};

const HERO_CAPTION = "Tomatoes, peppers and aubergines at harvest";

const COVERS = [
  "Stage of the garden year, from local frost dates",
  "Tonight's frost risk by crop: pick, cover or leave",
  "Crops ready this week and how to store them",
  "Tested preserving recipes: canning, freezing, drying, fermenting",
  "Seed saving, and the last plantings before the ground freezes",
  "In spring: soil temperature at seed depth and what to sow this week",
];

const ARTICLES: { title: string; paras: string[] }[] = [
  {
    title: "Why autumn is for harvest, not sowing",
    paras: [
      "A temperate garden runs between two dates: the last spring frost and the first autumn frost. Tender crops grow in the gap; everything else is timed from one end or the other. The local guide takes both dates for each town from the nearest weather station, so it can state which phase the garden is in rather than repeat a seed-packet average.",
      "Once the first frost is within a few weeks, sowing stops making sense: nothing sown now matures before the ground freezes. The work turns to harvest — picking the tender crops before the frost takes them, curing squash and onions so they keep, leaving the roots and brassicas to sweeten — and then to the kitchen. The one exception is garlic, which is planted now for harvest the following summer.",
    ],
  },
  {
    title: "Frost dates are averages — plan for the spread",
    paras: [
      "An “average first frost” of October 1 means that in half of years there is a frost before October 1. Low spots and open fields frost earlier than a city garden against a south wall; a clear, still night runs a degree or two colder in the bed than at the weather station. The frost watch on your local page reads the week's forecast lows against every crop still in the ground.",
      "In spring, tender transplants (tomatoes, peppers, basil, squash) go out one to two weeks after the average last frost, or earlier with row cover on hand. Hardy crops (peas, spinach, onions, brassicas) tolerate light frost and can go in weeks before.",
    ],
  },
];

const SOIL: [string, string][] = [
  ["Below 7 °C (45 °F)", "Too cold for most seeds. Peas, spinach and fava beans will sit and wait; others rot."],
  ["7–13 °C (45–55 °F)", "Cool-season crops germinate: peas, lettuce, spinach, radish, brassicas, onions, potatoes."],
  ["13–18 °C (55–65 °F)", "Most seeds germinate. Beans, corn, chard and carrots go in; transplant tomatoes when nights stay above 10 °C."],
  ["Above 18 °C (65 °F)", "Warm-season seeds — squash, cucumbers, melons, okra — germinate fast. Lettuce and spinach start to bolt."],
];

function ContentsLink({ href, title, note }: { href: string; title: string; note: string }) {
  return (
    <li className="border-b border-line">
      <Link href={href} className="group flex items-baseline justify-between gap-3 py-2.5">
        <span className="min-w-0">
          <span className="block font-medium text-ink group-hover:text-moss">{title}</span>
          <span className="block text-sm text-ink-2">{note}</span>
        </span>
        <span aria-hidden="true" className="text-ink-2 group-hover:text-moss">
          →
        </span>
      </Link>
    </li>
  );
}

export default function GardeningPage() {
  const month = new Date().getMonth() + 1;
  const ready = cropsInMonth(month);
  const recipes = recipesInSeason(month, 6);
  const hero = cropImage("tomato");
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <section className="card overflow-hidden">
        <div className="grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            <p className="eyebrow text-moss">Gardening</p>
            <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Harvest: what to pick, store and preserve this week.</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              In northern temperate gardens the sowing season is over. Tomatoes ripen faster than they can be eaten, squash needs curing, and the first frost is close or already
              past. The work now is picking, preserving, cold storage and seed saving, timed to local frost dates. Enter a place for its own calendar.
            </p>
            <div className="mt-6">
              <SectionLead
                section="gardening"
                label="This week's garden guide"
                note="Stage of the garden year, tonight's frost risk by crop, what is ready and how to preserve it."
              />
            </div>
          </div>
          <figure className="relative min-h-[240px] bg-paper-2 lg:min-h-full">
            <Image
              src="/crops/tomato.webp"
              alt="A basket of harvested tomatoes, sweet peppers and aubergines"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            {hero && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/75 to-transparent px-4 pb-2.5 pt-8 font-display text-xs italic leading-snug text-on-night/90">
                <span className="font-medium">{HERO_CAPTION}.</span> Photo{" "}
                <a href={hero.source} target="_blank" rel="noopener nofollow" className="underline">
                  {hero.author}
                </a>{" "}
                {hero.where} ·{" "}
                <a href={hero.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
                  {hero.license}
                </a>
              </figcaption>
            )}
          </figure>
        </div>
      </section>
      <nav aria-label="Gardening: contents" className="mt-8">
        <p className="eyebrow">In this section</p>
        <ul className="mt-2 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          <ContentsLink href="/gardening/crops" title="In season" note={`${ready.length} crops this month`} />
          <ContentsLink href="/gardening/preserving" title="Preserving" note="Canning, freezing, drying, fermenting" />
          <ContentsLink href="#frost" title="Frost risk" note="Crop by crop" />
          <ContentsLink href="/gardening/seeds" title="Seed saving" note="Which crops come true" />
          <ContentsLink href="/zones" title="Hardiness zones" note="Zones 2 to 11" />
          <ContentsLink href="#find" title="Local guides" note="With local frost dates" />
        </ul>
      </nav>
      <SeasonBand
        topics={["pollinators", "birds", "plants", "soil-seeds"]}
        nearby
        heading="Get involved this season: gardens, birds and pollinators"
        headingNear="Gardens, birds and pollinators: get involved near {town}"
        lede="Counts, surveys and planting days for gardeners, run by the conservation organisations in our library; each button opens their own page."
        id="get-involved"
        className="mt-14"
      />
      {/* Food and growing: community gardens, seed libraries and growing groups (the reader's own town once the browser knows it). */}
      <FoodPanel place={null} section="gardening" nearby className="mt-14" />
      <section id="play" className="mt-14 scroll-mt-24">
        <p className="eyebrow text-moss">Reference</p>
        <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Interactive diagrams</h2>
        <div className="mt-6 grid gap-10">
          <div id="frost" className="scroll-mt-24 grid gap-5">
            <YourGardenYear />
            <FrostWatchHere />
          </div>
          <PutItUpSection month={month} />
          <div>
            <p className="eyebrow text-moss">For spring</p>
            <div className="mt-4 grid gap-10">
              <ToyCard
                id="sprout"
                title="Germination and soil temperature"
                blurb="Drag the soil thermometer. Below a seed's minimum temperature it stays dormant or rots; within its range it emerges in days; above it, germination fails. This is why peas are sown weeks before beans."
              >
                <WillItSproutHere />
              </ToyCard>
              <ToyCard
                id="coldest"
                title="Hardiness zones and the coldest night"
                blurb="A hardiness zone is defined by the average coldest night of winter. Lower the temperature to see which plants survive it and which towns share the zone."
              >
                <ColdestNightForYou places={coldestPlaces()} />
              </ToyCard>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-16">
        <div className="mb-16">
          <p className="eyebrow text-gold">Harvest</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Crops ready in {monthName(month)}</h2>
          <p className="mt-2 max-w-2xl text-ink-2">
            Tender crops first, which must be picked before frost, then the hardy crops that hold in the ground and sweeten with cold. Each entry gives harvest timing, storage and
            preserving methods, for a frost-led garden in the northern temperate belt.
          </p>
          <div className="mt-3">
            <RegionNote section="gardening" what="this month's harvest list" />
          </div>
          <div className="mt-6">
            <CropGrid crops={ready} limit={6} />
          </div>
          {recipes.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-ink">Preserving recipes in season</p>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((r) => (
                  <RecipeCard key={r.slug} recipe={r} cropName={r.crop.replace(/-/g, " ")} />
                ))}
              </ul>
            </div>
          )}
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/gardening/crops" className="text-sm font-medium text-moss hover:underline">
              All {CROPS.length} crops →
            </Link>
            <Link href="/gardening/preserving" className="text-sm font-medium text-moss hover:underline">
              All {RECIPES.length} tested recipes →
            </Link>
          </p>
        </div>
        <div id="garden-life" className="scroll-mt-24">
          <p className="eyebrow text-moss">Garden fauna</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Pollinators, predators and pests</h2>
          <p className="mt-2 max-w-2xl text-ink-2">
            The bees, beetles, wasps and earthworms that pollinate crops, prey on pests and build soil, and the pests that damage crops: how to identify each and what to do about
            it.
          </p>
          <div className="mt-6">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GARDEN_LIFE.slice(0, 6).map((c) => (
                <CreatureCard key={c.slug} creature={c} priority={false} />
              ))}
            </ul>
          </div>
          <p className="mt-4">
            <Link href="/wildlife#garden" className="text-sm font-medium text-moss hover:underline">
              All {GARDEN_LIFE.length} garden species →
            </Link>
          </p>
        </div>
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
          {ARTICLES.map((a) => (
            <article key={a.title}>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">{a.title}</h2>
              <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
                {a.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Soil temperature matters more than air temperature</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>Seeds respond to the temperature of the soil around them. In the sowing months the local guide gives today&apos;s soil temperature at 6 cm depth:</p>
              <ul className="not-prose grid gap-2 sm:grid-cols-2">
                {SOIL.map(([t, b]) => (
                  <li key={t} className="card px-4 py-3">
                    <p className="font-semibold text-ink">{t}</p>
                    <p className="text-sm">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
        <aside className="grid gap-6 content-start">
          <div className="card p-5">
            <p className="eyebrow text-rust">Safe canning</p>
            <p className="mt-2 text-sm text-ink-2">
              Below pH 4.6 — fruit, pickles, jam, tomatoes with added acid — a boiling-water bath is enough. Every plain vegetable needs a pressure canner. There is no safe
              alternative, and the recipes here follow tested sources exactly.{" "}
              <Link href="/gardening/preserving" className="underline">
                Preserving methods and safety rules
              </Link>
              .
            </p>
          </div>
          <div className="card p-5">
            <p className="eyebrow">Planting by the moon</p>
            <p className="mt-2 text-sm text-ink-2">
              A traditional practice rather than a tested one: sow leaf crops from new moon to first quarter, fruiting crops up to full moon, and root crops and perennials while
              the moon wanes. Today&apos;s phase is in the{" "}
              <Link href="/almanac" className="underline">
                almanac
              </Link>
              .
            </p>
          </div>
        </aside>
      </section>
      <div className="mt-20">
        <PlaceFinder title="Gardening guides by place" section="gardening" />
      </div>
      <section className="mt-16 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note</h2>
          <p className="mt-1 text-paper/90 text-sm">One email a week for your area, sent Sunday evening. Unsubscribe at any time.</p>
        </div>
        <NewsletterForm source="topic-gardening" />
      </section>
    </div>
  );
}
