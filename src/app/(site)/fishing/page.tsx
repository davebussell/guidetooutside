import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { KNOWN_PLACES } from "@/lib/geocode";
import { continentServed } from "@/lib/scope";
import { creatureImage } from "@/lib/creature-images";
import { REGS_AFRICA, REGS_CA, REGS_EUROPE, REGS_US } from "@/lib/regs";
import { SectionLead } from "@/components/SectionLead";
import { PlaceFinder } from "@/components/PlaceFinder";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SeasonBand } from "@/components/conservation/SeasonBand";
import { FoodPanel } from "@/components/conservation/FoodPanel";

/** The season band's invitations open and close by date. */
export const revalidate = 3600;

const TITLE = "Fishing — what's biting near you, where the fish are, and how to tell them apart";
const DESCRIPTION = `Fishing guides for ${Math.floor(KNOWN_PLACES.length / 10) * 10}+ towns across Canada and the United States, the freshwater and inshore fish from walleye and brook trout to striped bass and redfish with size, range and records.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/fishing" },
};

const CONTENTS: { href: string; label: string; note: string }[] = [
  { href: "/fishing/regulations", label: "Regulations", note: "Official sources by jurisdiction" },
  { href: "#find", label: "Local guides", note: "100+ places" },
  { href: "/conservation?topic=water", label: "Who looks after your water", note: "Waterkeepers and watershed groups" },
];

const COVERS = [
  "Species active this week, with tactics and depth",
  "Feeding periods by sunrise, sunset and moon",
  "Named lakes, rivers and reservoirs within 20 km",
  "Well-known waters worth the drive",
  "The solunar rating for the day (a tradition, labelled as such)",
  "A link to the regulator for the water",
];

const READING_THE_WEEK = [
  "Fish respond to trends more than to any single day. A three-day warm spell after a cold front brings spring walleye and crappie into feeding; a falling barometer before a storm often produces the best hour of the week; a clear, high-pressure day after a front is usually the slowest. Water temperature lags air temperature by days to weeks; the soil temperature in the local guide is a reasonable proxy for shallow water in spring.",
  "Low light is the constant. Dawn and dusk outfish midday almost everywhere. Many anglers also hold that the days around the new and full moon fish best (the solunar tradition), though studies that have tested it are mixed. The local guide shows the rating and labels it as a tradition.",
];


/** The jurisdictions the directory lists: a parked continent's table is not shown there (src/lib/scope.ts), so it is not counted here. */
const JURISDICTIONS =
  REGS_CA.length + REGS_US.length + (continentServed("europe") ? REGS_EUROPE.length : 0) + (continentServed("africa") ? REGS_AFRICA.length : 0);


export default function FishingPage() {
  const photo = creatureImage("brook-trout");
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <section className="card overflow-hidden">
        <div className="grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            <p className="eyebrow text-azure">Fishing</p>
            <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Where fish hold through the year, and why.</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              A temperate lake passes through ice cover, spring turnover, summer stratification into a warm upper layer and a cold lower one, and autumn
              turnover. Fish move between the layers as temperature and oxygen change. The local guide covers the species active this week, named waters nearby and feeding periods by sun and moon.
            </p>
            <div className="mt-6">
              <SectionLead section="fishing" label="This week's fishing guide" note="Active species, where they hold, and feeding periods by sun and moon." />
            </div>
          </div>
          <figure className="relative min-h-[240px] bg-paper-2 lg:min-h-full">
            {photo && (
              <>
                <Image
                  src={photo.src}
                  alt="Brook trout (Salvelinus fontinalis) over a stony streambed"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/75 to-transparent px-4 pb-2.5 pt-8 font-display text-xs italic leading-snug text-on-night/90">
                  <span className="font-medium">
                    {"Brook trout, Salvelinus fontinalis"}
                    {"."}
                  </span>
                  {" Photo"}{" "}
                  <a href={photo.source} target="_blank" rel="noopener nofollow" className="underline">
                    {photo.author}
                  </a>{" "}
                  {"on iNaturalist"}
                  {" ·"}{" "}
                  <a href={photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
                    {photo.license}
                  </a>
                </figcaption>
              </>
            )}
          </figure>
        </div>
      </section>

      <nav aria-label="Fishing: contents" className="mt-8">
        <p className="eyebrow">In this section</p>
        <ul className="mt-2 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          {CONTENTS.map((c) => (
            <li key={c.href} className="border-b border-line">
              <Link href={c.href} className="group flex items-baseline justify-between gap-3 py-2.5">
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
        topics={["water", "fish"]}
        nearby
        heading="Get involved this season: rivers, lakes and fish"
        headingNear="Rivers, lakes and fish: get involved near {town}"
        lede="River cleanups, water testing, fish and waterbird counts run by the conservation organisations in our library; each button opens their own page."
        id="get-involved"
        className="mt-14"
      />

      {/* The seafood guide for the reader's country and local food (the reader's own town once the browser knows it). */}
      <FoodPanel place={null} section="fishing" nearby className="mt-14" />



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
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Reading the week</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              {READING_THE_WEEK.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </article>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Regulations first</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                Seasons, size and bag limits, licences and gear rules change by year, by jurisdiction and often by individual water. The guide does not
                state dates; it names the regulator and links to it. The full{" "}
                <Link href="/fishing/regulations" className="underline">
                  regulations directory
                </Link>{" "}
                {"covers every Canadian province and territory and every US state."}
              </p>
            </div>
          </article>
        </div>
        <aside className="grid gap-6 content-start">
          <Link href="/fishing/regulations" className="card p-5 hover:border-azure transition">
            <p className="eyebrow text-azure">Directory</p>
            <p className="font-display mt-1 text-xl font-semibold">Fishing regulations</p>
            <p className="mt-1 text-sm text-ink-2">
              {"Official sources for licences, seasons and limits: "}
              {JURISDICTIONS}
              {" jurisdictions in Canada and the United States."}
            </p>
          </Link>
        </aside>
      </section>

      <div className="mt-20">
        <PlaceFinder title="Fishing guides by place" section="fishing" accent="text-azure" />
      </div>

      <section className="mt-16 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note</h2>
          <p className="mt-1 text-paper/90 text-sm">One email a week for your area, sent Sunday evening. Unsubscribe at any time.</p>
        </div>
        <NewsletterForm source="topic-fishing" />
      </section>
    </div>
  );
}
