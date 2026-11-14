/**
 * The month's lists on a region page: the wild edibles in season, the fish
 * active and the garden creatures active in the region, as photograph cards.
 * The same cards and wording as the place pages, said of the region.
 */
import Link from "next/link";
import { theRegion } from "@/lib/the-region";
import { monthName, speciesNow } from "@/lib/species";
import { PRESENCE_BOX_KM } from "@/lib/plant-presence-info";
import { CREATURES, FISH, GARDEN_LIFE, creaturesNow } from "@/lib/nature";
import { CreatureCard, SpeciesCard } from "@/components/NatureCard";
import type { Region } from "./region-bits";

/** "Wild foods in season": the first six of the month's edibles in the region, and how many more. */
export function RegionForaging({ region, month, limit = 6 }: { region: Region; month: number; limit?: number }) {
  const now = speciesNow(month, region.slug);
  const list = now.slice(0, limit);
  const more = now.length - list.length;
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-moss">Regional list · {monthName(month)}</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Wild foods the guide gives for this month</h2>
          <p className="mt-2 text-ink-2 max-w-2xl">
            {`${now.length} wild edibles the guide gives for ${monthName(month)} in ${theRegion(region.name)}. A regional list, not checked near any one town: a species can be absent from a given valley, and nothing here says it is in season or legal to pick where you are. A town's foraging page lists only what has been recorded within about ${PRESENCE_BOX_KM} km of it.`}
          </p>
        </div>
        <Link href={`/regions/${region.slug}`} className="text-sm text-ink-2 hover:text-ink underline decoration-line">
          {region.name} →
        </Link>
      </div>
      <div className="mt-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <SpeciesCard key={s.slug} species={s} priority={i < 3} />
          ))}
        </ul>
      </div>
      {more > 0 && (
        <p className="mt-4 text-sm">
          <Link href="/foraging/calendar" className="font-medium text-moss hover:underline">
            {more} more on the regional list{": foraging calendar →"}
          </Link>
        </p>
      )}
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Photographs are research-grade observations from iNaturalist, each credited to its photographer. They show a typical specimen, not every
        variation — never identify from a photo alone. Confirm with a regional field guide or an experienced forager before you eat anything wild.
      </p>
    </section>
  );
}

const FAUNA = {
  fish: {
    list: FISH,
    eyebrow: "Fish",
    title: "Fish of the region this month",
    intro: (where: string, m: string) =>
      `Sport fish that anglers in ${where} typically target in ${m}: where each holds, how to identify it, and the method that usually takes it. This is regional context, not a check near any town: whether a fish lives in a given water, and whether it may be fished now, depends on the place and the regulator's rules (see a town's fishing page).`,
    more: "All fish species →",
  },
  garden: {
    list: GARDEN_LIFE,
    eyebrow: "Garden fauna",
    title: "Garden insects and soil life active this month",
    intro: (where: string, m: string) =>
      `Pollinators, predators, soil organisms and pests active in ${where} in ${m}. Most are beneficial; identify the few pests before treating anything.`,
    more: "All garden species →",
  },
} as const;

/** "Fish of the region this month" (regional context, not a check near a town) or "Garden insects and soil life active this month" in the region: the first three. */
export function RegionFauna({ kind, region, month, limit = 3 }: { kind: "fish" | "garden"; region: Region; month: number; limit?: number }) {
  const t = FAUNA[kind];
  const all = creaturesNow(t.list, month, region.slug);
  if (!all.length) return null;
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-azure">
            {t.eyebrow} · {monthName(month)}
          </p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">{t.title}</h2>
          <p className="mt-2 text-ink-2 max-w-2xl">{t.intro(theRegion(region.name), monthName(month))}</p>
        </div>
        <Link href="/wildlife" className="text-sm text-ink-2 hover:text-ink underline decoration-line whitespace-nowrap">
          {t.more}
        </Link>
      </div>
      <div className="mt-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {all.slice(0, limit).map((c) => (
            <CreatureCard key={c.slug} creature={c} priority={false} />
          ))}
        </ul>
      </div>
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Photographs are research-grade observations from iNaturalist, each credited to its photographer. Ranges and timing are typical, not guaranteed —{" "}
        {CREATURES.length} species are covered across Canada and the United States.
      </p>
    </section>
  );
}
