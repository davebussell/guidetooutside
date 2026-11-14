/**
 * The garden's insects and soil life active at a place this month: photograph
 * cards for the first few, the rest as chips.
 */
import Link from "next/link";
import type { LocalData } from "@/lib/types";
import { regionOf as classifyEcoregion } from "@/lib/region";
import { CREATURES, GARDEN_LIFE, creaturesNow } from "@/lib/nature";
import { monthName } from "@/lib/species";
import { Chips, CreatureCard, shortMonthRange } from "./NatureCard";

export function LocalWildlife({ data, limit = 3, chips = false }: { data: LocalData; limit?: number; chips?: boolean }) {
  const eco = classifyEcoregion(data.place.lat, data.place.lon);
  const all = creaturesNow(GARDEN_LIFE, data.month, eco.slug, data.place);
  if (!all.length) return null;
  const list = all.slice(0, limit);
  const rest = all.slice(limit);
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-azure">
            {"Garden fauna"} · {monthName(data.month)}
          </p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Garden insects and soil life active this month</h2>
          <p className="mt-2 text-ink-2 max-w-2xl">
            {`Pollinators, predators, soil organisms and pests active near ${data.place.label} in ${monthName(data.month)}. Most are beneficial; identify the few pests before treating anything.`}
          </p>
        </div>
        <Link href="/wildlife" className="text-sm text-ink-2 hover:text-ink underline decoration-line whitespace-nowrap">
          All garden species →
        </Link>
      </div>
      <div className="mt-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CreatureCard key={c.slug} creature={c} />
          ))}
        </ul>
      </div>
      {chips && rest.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow">Also active this month</p>
          <Chips items={rest.map((c) => ({ href: `/wildlife/${c.slug}`, label: c.name, note: shortMonthRange(c.months) }))} className="mt-3" />
        </div>
      )}
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Photographs are research-grade observations from iNaturalist, each credited to its photographer. Ranges and timing are typical, not guaranteed —{" "}
        {CREATURES.length} species are covered across Canada and the United States.
      </p>
    </section>
  );
}
