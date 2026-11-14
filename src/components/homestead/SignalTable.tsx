/** One table: each climate signal of the homestead calendar, the date it arrives in several towns. */
import Link from "next/link";
import { exampleTowns, SIGNAL_ROWS } from "@/lib/homestead/examples";
import { countryServed } from "@/lib/scope";

/**
 * Six served towns far apart in climate, from the subarctic to the frost-free south. The library's own list
 * (EXAMPLE_TOWNS in src/lib/homestead/examples) names towns in parked countries, which have no page to link to.
 */
const SERVED_EXAMPLES = ["toronto-ontario", "fairbanks-alaska", "vancouver-british-columbia", "denver-colorado", "phoenix-arizona", "miami-florida"];

export function SignalTable({ slugs = SERVED_EXAMPLES, rows = SIGNAL_ROWS }: { slugs?: string[]; rows?: typeof SIGNAL_ROWS }) {
  // The climate table behind exampleTowns holds every town, parked ones included (src/lib/scope.ts): a parked town gets no column.
  const towns = exampleTowns(slugs).filter((t) => countryServed(t.place.countryCode));
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-ink text-left">
            <th className="py-2 pr-3 font-semibold">Signal</th>
            {towns.map((t) => (
              <th key={t.place.slug} className="py-2 px-2 font-semibold">
                <Link href={`/homesteading/${t.place.slug}`} className="hover:text-moss">
                  {t.place.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line">
              <td className="py-2 pr-3 text-ink-2">{r.label}</td>
              {towns.map((t) => {
                const v = r.value(t.dates);
                const quiet = /^(never|rare|none|no |all year|—)/.test(v);
                return (
                  <td key={t.place.slug} className={`py-2 px-2 tabular-nums ${quiet ? "text-ink-2" : "text-ink"}`}>
                    {v}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
