import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { shareCard } from "@/lib/site";
import { KNOWN_PLACES } from "@/lib/geocode";
import { continentServed } from "@/lib/scope";
import { TOPICS } from "@/data/homestead/topics";
import { SIGNAL_FAMILIES, TASKS } from "@/data/homestead/calendar";
import { FIREWOOD } from "@/data/homestead/firewood";
import { homesteadImage } from "@/lib/homestead/images";
import { SectionLead } from "@/components/SectionLead";
import { PlaceFinder } from "@/components/PlaceFinder";
import { NoteCTA } from "@/components/PlaceCards";
import { HeroCaption } from "@/components/homestead/Credit";
import { BreedList, TopicCard } from "@/components/homestead/Blocks";
import { SignalTable } from "@/components/homestead/SignalTable";
import { SeasonBand } from "@/components/conservation/SeasonBand";
import { FoodPanel } from "@/components/conservation/FoodPanel";

/** The season band's invitations open and close by date. */
export const revalidate = 3600;

const title = "Homesteading — hens, bees, goats, rain tanks and woodpiles, timed to your climate";
const description = `Small-scale self-reliance on a house lot or smallholding in Canada and the United States: laying hens, ducks, honeybees, dairy goats and meat rabbits, rainwater, firewood, compost, root cellars and season extension, with the numbers worked out for ${Math.floor(KNOWN_PLACES.length / 10) * 10}+ towns.`;

/** The firewood table lists the trees of the served continents only (src/lib/scope.ts), so the count here is of those. */
const WOODS = FIREWOOD.filter((w) => continentServed(w.region)).length;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/homesteading" },
  ...shareCard(title, description, "/homesteading"),
};

const CONTENTS = [
  { href: "#topics", label: "Topics", note: "Ten guides, from hens to hoop houses" },
  { href: "/homesteading/calendar", label: "The homestead year", note: "Tasks by climate signal" },
  { href: "#breeds", label: "Breeds and climate", note: "Cold-hardy and heat-tolerant breeds" },
  { href: "/homesteading/wood-heat#species", label: "Firewood by species", note: "Heat in a stacked cubic metre" },
  { href: "#find", label: "Local guides", note: `${Math.floor(KNOWN_PLACES.length / 10) * 10}+ places` },
  { href: "/gardening/preserving", label: "Preserving the harvest", note: "Canning, pickling, drying and freezing" },
];

const COVERS = [
  "Daylight today, and the dates it falls below 14 and 12 hours",
  "Nights below 0, −10 and −20 °C, and days above 30 and 35 °C, counted from a nearby weather station's daily record where one exists",
  "Litres a year from 100 m² of roof, and the tank the dry months need",
  "Heating degree days, the heating season and when to split wood",
  "The frost-free season and the dates for covers and tunnels",
  "The months bees can forage, and the length of the winter cluster",
];

export default function HomesteadingPage() {
  const hero = homesteadImage("hens-squash");
  const teaser = SIGNAL_FAMILIES.slice(0, 6).map((f) => ({ family: f, tasks: TASKS.filter((t) => t.family === f.id).slice(0, 2) }));
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <section className="card overflow-hidden">
        <div className="grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            <p className="eyebrow text-moss">Homesteading</p>
            <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Hens, bees, rain tanks and woodpiles, timed to your climate.</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              Hens lay by the length of the day, bees fly by the afternoon temperature, a rain tank has to last the dry months and firewood needs six months to dry before it is burned. This section covers laying hens, ducks,
              honeybees, dairy goats and meat rabbits, rainwater, wood heat, compost, food storage and season extension; the local guide works out a town&apos;s numbers: daylight, freezing nights and hot days, roof water, heating
              degree days, frost dates and the bee season.
            </p>
            <div className="mt-6">
              <SectionLead section="homesteading" label="This week's homestead guide" note="Daylight and laying, cold and heat for the animals, roof water, wood heat, frost dates and bees, for one town." />
            </div>
          </div>
          <figure className="relative min-h-[240px] bg-paper-2 lg:min-h-full">
            {hero && <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />}
            {hero && <HeroCaption image={hero} />}
          </figure>
        </div>
      </section>

      <nav aria-label="Homesteading: contents" className="mt-8">
        <p className="eyebrow">In this section</p>
        <ul className="mt-2 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          {CONTENTS.map((c) => (
            <li key={c.href} className="border-b border-line">
              <Link className="group flex items-baseline justify-between gap-3 py-2.5" href={c.href}>
                <span className="min-w-0">
                  <span className="block font-medium text-ink group-hover:text-moss">{c.label}</span>
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

      <SeasonBand
        topics={["soil-seeds", "water", "forests", "pollinators"]}
        nearby
        heading="Get involved this season: soil, seed, water and trees"
        headingNear="Soil, seed, water and trees: get involved near {town}"
        lede="Seed swaps, tree planting, water testing and pollinator surveys run by the conservation organisations in our library; each button opens their own page."
        id="get-involved"
        className="mt-14"
      />

      {/* Community farms, local food networks and markets (the reader's own town once the browser knows it). */}
      <FoodPanel place={null} section="homesteading" nearby className="mt-14" />

      <section id="topics" className="mt-14 scroll-mt-24">
        <p className="eyebrow text-moss">Guides</p>
        <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Ten topics for a house lot or smallholding</h2>
        <p className="mt-2 max-w-2xl text-ink-2">
          Each guide gives the space, temperatures, timings and rules of thumb from extension services, agriculture departments and research, with its sources listed, and what to check locally before you start.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <TopicCard key={t.slug} topic={t} priority={i < 3} />
          ))}
        </ul>
      </section>

      <section id="year" className="mt-16 scroll-mt-24">
        <p className="eyebrow text-moss">Calendar</p>
        <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">The homestead year, by climate signal</h2>
        <p className="mt-2 max-w-2xl text-ink-2">
          Tasks keyed to what the climate does rather than to dates, so the same calendar works in Fairbanks, Phoenix and Miami: as the days shorten, before the first frost, when nights freeze, when afternoons pass 13 °C for the
          bees, before the heating season and ahead of the rains.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teaser.map(({ family, tasks }) => (
            <div key={family.id} className="card p-5">
              <p className="eyebrow">{family.eyebrow}</p>
              <p className="font-display mt-1 text-lg font-semibold leading-snug">{family.title}</p>
              <ul className="mt-3 grid gap-2 text-sm">
                {tasks.map((t) => (
                  <li key={t.id} className="border-t border-line/70 pt-2">
                    <Link href={`/homesteading/${t.topic}`} className="font-medium text-ink hover:text-moss">
                      {t.title}
                    </Link>
                    <span className="block text-xs text-ink-2">{t.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 card p-4 sm:p-6">
          <p className="eyebrow">Same signal, six towns</p>
          <p className="mt-1 text-sm text-ink-2">When each signal arrives, worked out from each town&apos;s climate normals and latitude.</p>
          <div className="mt-4">
            <SignalTable />
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/homesteading/calendar" className="font-medium text-moss hover:underline">
            The full homestead calendar →
          </Link>
        </p>
      </section>

      <section id="breeds" className="mt-16 scroll-mt-24">
        <p className="eyebrow text-moss">Livestock</p>
        <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Breeds for cold winters and hot summers</h2>
        <p className="mt-2 max-w-2xl text-ink-2">
          Marked cold-hardy or heat-tolerant only where the breed&apos;s source says so. The local guide lists the ones that suit a town&apos;s freezing season or heat.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <BreedList animal="hen" />
          <div className="grid gap-8 content-start">
            <BreedList animal="duck" />
            <BreedList animal="goat" />
            <BreedList animal="rabbit" />
          </div>
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
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Signals, not dates</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                A calendar that says &ldquo;cover the beds in October&rdquo; is too late in Fairbanks, where the average first frost comes in late August, and meaningless in Miami, where frost is rare. The homestead year here is written in signals instead: the day length,
                which depends only on latitude and date; the average frost dates; the first freezing nights; the afternoon temperatures bees fly in; the months that carry the heating need; and the rains.
              </p>
              <p>
                The numbers come from each town&apos;s climate normals, the same ten-year averages behind the gardening pages, and from the sun&apos;s path at its latitude. They are averages: a single night freezes earlier than the
                average night, and a dry year falls short of the average rainfall.
              </p>
            </div>
          </article>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Rules are local</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                Whether hens, goats or bees are allowed on a lot, whether rainwater may be collected and how much, and when wood may be burned are decided by municipalities, provinces, states and countries, and change. The guide
                does not state those rules; each topic names what to check and who answers.
              </p>
            </div>
          </article>
        </div>
        <aside className="grid gap-6 content-start">
          <div className="card p-5">
            <p className="eyebrow text-moss">Also in the gardening guide</p>
            <p className="font-display mt-1 text-lg font-semibold">Preserving the harvest</p>
            <p className="mt-1 text-sm text-ink-2">Canning, pickling, fermenting, freezing and drying, with tested recipes and processing times. What a root cellar cannot keep, a jar can.</p>
            <Link href="/gardening/preserving" className="mt-3 inline-block text-sm font-medium text-moss hover:underline">
              Preserving →
            </Link>
          </div>
          <Link href="/homesteading/wood-heat#species" className="card p-5 hover:border-moss transition">
            <p className="eyebrow text-moss">Table</p>
            <p className="font-display mt-1 text-xl font-semibold">Firewood heat by species</p>
            <p className="mt-1 text-sm text-ink-2">Heat in a stacked cubic metre and a cord for {WOODS} trees of North America.</p>
          </Link>
        </aside>
      </section>

      <div className="mt-20">
        <PlaceFinder title="Homestead guides by place" section="homesteading" accent="text-moss" />
      </div>

      <NoteCTA className="mt-16" title="The Weekly Field Note" body="One email a week for your area, sent Sunday evening. Unsubscribe at any time." source="topic-homesteading" />
    </div>
  );
}
