import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { shareCard } from "@/lib/site";
import { SERVED_ECOREGIONS as ECOREGIONS } from "@/lib/ecoregions";
import { DAY_PHASES, type DayPhase } from "@/data/day-stories";
import { PlaceFinder } from "@/components/PlaceFinder";
import { YoungNaturalists } from "@/components/learn/YoungNaturalists";

const title = "The day — where the sun is, and where everything else is because of it";
const description =
  "Eight phases of the day worked out from the sun's real position at your location: what the light is doing, what it means up close and across the whole landscape, and where the fish, the pollinators and the pests are in each one.";

const share = shareCard(title, description, "/the-day");
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/the-day" },
  ...share,
  openGraph: { ...share.openGraph, type: "website" },
};

const PHASES = Object.keys(DAY_PHASES) as DayPhase[];

/** The page before a place is chosen: what the day page shows, and where to choose a place. */
async function DayIndex() {
  const regions = ECOREGIONS as { slug: string; name: string }[];
  return (
    <>
      <p className="eyebrow text-gold">The day</p>
      <h1 className="font-display mt-1 text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl">The day, hour by hour</h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        Light, temperature and animal activity change through the day: fish found in the shallows at first light are usually in deeper water by
        noon. With a location set, this page divides the day into eight phases calculated from the sun&apos;s position at that place, describing the
        light, its effect on plants and the landscape, and where each fish and insect in the guide is likely to be.
      </p>
      <div className="mt-8">
        <PlaceFinder />
      </div>
      <section className="mt-14">
        <p className="eyebrow">Each phase includes</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <li key={p} className="card px-4 py-3">
              <p className="font-display text-lg font-semibold">{DAY_PHASES[p].label}</p>
              <p className="mt-1 text-sm text-ink-2">
                The sun&apos;s altitude and bearing, the effect on plants and landscape in the region, and the species active.
              </p>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-14">
        <YoungNaturalists panel="the-day" />
      </div>
      <section className="mt-12">
        <p className="eyebrow">Available for every region</p>
        <ul className="mt-3 columns-1 sm:columns-2 lg:columns-3 gap-8 text-sm">
          {regions.map((r) => (
            <li key={r.slug} className="break-inside-avoid border-b border-line">
              <Link href={`/regions/${r.slug}`} className="block py-1.5 text-ink-2 hover:text-moss transition">
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function DayIndexSkeleton() {
  return (
    <div aria-busy="true">
      <p className="eyebrow text-gold">The day</p>
      <div className="mt-2 h-12 w-72 rounded-lg bg-paper-2/70 animate-pulse" />
      <div className="mt-6 h-24 rounded-tile bg-paper-2/60 animate-pulse" />
      <div className="mt-8 h-[26rem] rounded-tile bg-paper-2/60 animate-pulse" />
    </div>
  );
}

/** /the-day: the day page before a place is chosen. */
export default function DayPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <Suspense fallback={<DayIndexSkeleton />}>
          <DayIndex />
        </Suspense>
      </div>
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
