/**
 * "The region at a glance": the ranges the region's pre-built towns span,
 * one tile per figure, each with the line that says how it was read.
 */
import type { Figure } from "@/lib/regions/stats";

export function RegionGlance({ figures, towns, regionName }: { figures: Figure[]; towns: number; regionName: string }) {
  return (
    <section aria-labelledby="glance">
      <p className="eyebrow text-moss">The region at a glance</p>
      <h2 id="glance" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        What the numbers span
      </h2>
      <p className="mt-2 max-w-3xl text-ink-2">
        {towns
          ? `Every figure is the range across the ${towns} pre-built ${towns === 1 ? "town" : "towns"} in ${regionName}, read from the same records their own pages print. Nothing is averaged over the region; where a town has no value it is left out and said so.`
          : `No pre-built town falls in ${regionName} yet, so there are no ranges to show. Search a town in the region above and its own page gives these numbers for that spot.`}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((f) => (
          <div key={f.key} className="rounded-tile border border-line/80 bg-paper-2/50 px-4 py-3">
            <p className="eyebrow">{f.label}</p>
            <p className="font-display mt-1 text-xl font-semibold leading-tight text-ink">{f.value}</p>
            {f.note && <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{f.note}</p>}
            <p className="mt-2 border-t border-line/70 pt-2 text-xs leading-relaxed text-ink-2">{f.method}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
