/**
 * "Wild edibles A–Z" on /foraging (#library): every species in the library,
 * grouped by type and listed by name, each with its short season.
 */
import Link from "next/link";
import { SPECIES, type SpeciesKind } from "@/lib/species";
import { shortSpan } from "@/components/foraging/months";
import { servedText } from "@/components/species/served-text";

/** The groups, in page order. */
const GROUPS: { kind: SpeciesKind; label: string }[] = [
  { kind: "mushroom", label: "Mushrooms" },
  { kind: "berry", label: "Berries" },
  { kind: "fruit", label: "Fruit" },
  { kind: "nut", label: "Nuts" },
  { kind: "green", label: "Greens" },
  { kind: "root", label: "Roots" },
  { kind: "tree", label: "From trees" },
  { kind: "coastal", label: "Coastal" },
];

export function ForagingLibrary() {
  return (
    <section id="library" className="scroll-mt-24">
      <p className="eyebrow text-moss">Index</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Wild edibles A–Z</h2>
      <p className="mt-2 max-w-2xl text-ink-2">
        All {SPECIES.length} species, by type. Each entry gives photographs, season, habitat, identification and the poisonous look-alikes.
      </p>
      <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g) => {
          const items = SPECIES.filter((s) => s.kind === g.kind)
            .map(servedText)
            .sort((a, b) => a.name.localeCompare(b.name));
          if (!items.length) return null;
          return (
            <div key={g.kind}>
              <p className="eyebrow">
                {g.label} <span className="font-normal text-ink-2">· {items.length}</span>
              </p>
              <ul className="mt-2 grid gap-1">
                {items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/foraging/${s.slug}`}
                      className="group flex items-baseline justify-between gap-3 rounded-md px-1.5 py-1 -mx-1.5 transition hover:bg-paper-2"
                    >
                      <span className="text-sm font-medium group-hover:text-moss">{s.name}</span>
                      <span className="shrink-0 text-xs text-ink-2">{shortSpan(s.months)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
