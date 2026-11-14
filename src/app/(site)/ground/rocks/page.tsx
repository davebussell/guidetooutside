import type { Metadata } from "next";
import Link from "next/link";
import { ROCKS, ROCK_FAMILIES } from "@/lib/rocks";
import { LocationSearch } from "@/components/LocationSearch";
import { LandSkyEyebrow, LandSkyNav } from "@/components/kids/LandSkyNav";
import { RockUnderYou } from "@/components/here/LocalBits";
import { RockInTheLoop } from "@/components/here/ToyHere";
import { YoungNaturalists } from "@/components/learn/YoungNaturalists";
import { RockCycle } from "@/components/toys/RockCycle";
import { ToyCard } from "@/components/toys/ToyCard";
import { FamilyArt } from "@/components/rocks/FamilyArt";
import { FAMILY_ORDER, FAMILY_TOY, SOIL_BADGE, phRange } from "@/components/rocks/rock-bits";
import { StoryBlock } from "@/components/conservation/StoryBlock";
import { NearbyOrgs } from "@/components/conservation/NearbyOrgs";
import { OrgsAnywhere } from "@/components/conservation/VisitorOrgs";

/** Hourly: the conservation story's invitations open and close by date, and the organisations' articles arrive daily. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The kinds of rock — how each one forms and what it means above ground",
  description:
    "A field guide to the rock under North America: granite, limestone, gneiss, basalt, shale and the rest. How each one forms, how to recognise it in the hand, how it weathers, and what it means for the soil, the water and what grows.",
  alternates: { canonical: "/ground/rocks" },
};

/** /ground/rocks: the rock cycle toy, then every kind of rock by family, each family with its own toy. */
export default function RocksIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <LandSkyEyebrow>Kinds of rock</LandSkyEyebrow>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Every rock is somewhere in the same loop</h1>
      <p className="mt-3 max-w-2xl text-ink-2">
        There are only three things that can happen to rock: it can melt and cool, it can be worn down and laid back out in layers, or it can be buried
        and squeezed until its minerals regrow. Every rock you will ever pick up is one of those three, caught partway round. Which one decides how it
        wears, what soil it leaves, and whether that soil is sweet or sour — which is most of what a garden, a river and a wood are arguing about.
      </p>
      <div className="mt-5">
        <RockUnderYou here={undefined} />
      </div>
      <div className="mt-6">
        <LandSkyNav current="rocks" />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {FAMILY_ORDER.map((f) => {
          const toy = FAMILY_TOY[f];
          return toy ? (
            <a
              key={f}
              href={`#make-${f}`}
              className="rounded-full border border-edge bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
            >
              {toy.title}
            </a>
          ) : null;
        })}
      </div>
      <div id="rock-cycle" className="mt-8 card scroll-mt-24 p-4 sm:p-8">
        <p className="eyebrow text-bark">The rock cycle — take one rock all the way round</p>
        <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Melt it, erupt it, wash it to the sea, bury it, squeeze it</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          Start with a blob of magma and decide what happens next. Every choice is something the Earth really does, with roughly how long it really
          takes. Collect all fifteen kinds of rock.
        </p>
        <div className="mt-5">
          <RockCycle />
        </div>
        <RockInTheLoop />
      </div>

      <div className="mt-14 grid gap-14">
        {FAMILY_ORDER.map((f) => {
          const fam = ROCK_FAMILIES[f];
          const toy = FAMILY_TOY[f];
          return (
            <section key={f}>
              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{fam.title}</h2>
                  <p className="mt-2 max-w-2xl text-ink-2">{fam.blurb}</p>
                </div>
                <div className="card p-4 flex justify-center">
                  <FamilyArt family={f} />
                </div>
              </div>
              {toy && (
                <div className="mt-6 max-w-4xl">
                  <ToyCard id={`make-${f}`} art={toy.art} title={toy.title} intro={toy.intro}>
                    {toy.toy}
                  </ToyCard>
                </div>
              )}
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ROCKS.filter((r) => r.family === f).map((r) => {
                  const badge = SOIL_BADGE[r.soilEffect];
                  return (
                    <li key={r.slug} className="card p-5 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.className}`}>{badge.label}</span>
                        <span className="text-[11px] text-ink-2">pH {phRange(r)}</span>
                      </div>
                      <h3 className="font-display mt-2 text-xl font-semibold leading-tight">
                        <Link href={`/ground/rocks/${r.slug}`} className="hover:text-moss">
                          {r.name}
                        </Link>
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm text-ink-2">{r.tagline}</p>
                      <Link href={`/ground/rocks/${r.slug}`} className="mt-3 text-sm font-medium text-moss hover:underline">
                        How it forms →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-14">
        <YoungNaturalists panel="rocks" />
      </div>

      {/* The ground and the sky: the page's conservation story (geoparks, dark skies), or the plain panel. */}
      <div className="mt-14">
        <StoryBlock
          path="/ground/rocks"
          fallback={
            <NearbyOrgs id="who-looks-after" topic={["ground", "land"]} headingNear="Who looks after the ground and the night sky near {town}">
              <OrgsAnywhere id="who-looks-after" topic={["ground", "land"]} heading="Who looks after the ground and the night sky" />
            </NearbyOrgs>
          }
        />
      </div>

      <section className="mt-14 card p-6 sm:p-8">
        <p className="eyebrow text-bark">Find out what you&apos;re standing on</p>
        <h2 className="font-display mt-1 text-2xl font-semibold">Which of these is under your town?</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          Enter a town and we&apos;ll show you the rock beneath it, how old it is, the soil it weathers into and where your water goes from there.
        </p>
        <div className="mt-4 max-w-xl">
          <LocationSearch />
        </div>
      </section>
    </div>
  );
}
