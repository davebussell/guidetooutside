/**
 * "Neighbouring regions": the regions this one borders, each with one line
 * on how its towns' numbers differ from this region's.
 */
import Link from "next/link";
import type { Neighbour } from "@/lib/regions/neighbours";

export function RegionNeighbours({ neighbours, regionName, towns }: { neighbours: Neighbour[]; regionName: string; towns: number }) {
  return (
    <section aria-labelledby="neighbours">
      <p className="eyebrow text-moss">Neighbouring regions</p>
      <h2 id="neighbours" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        Across the border
      </h2>
      <p className="mt-2 max-w-3xl text-ink-2">
        {neighbours.length
          ? `The regions that meet ${regionName} on the map, and how their pre-built towns compare with these: the middle value of each region's towns, precipitation a year and the coldest and hottest months.`
          : `${regionName} borders no other region on the map.`}
        {!towns && neighbours.length > 0 && " With no pre-built towns here there is nothing to set the neighbours against, so only their own numbers are given."}
      </p>
      {neighbours.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {neighbours.map((n) => (
            <li key={n.slug} className="card p-5">
              <Link href={`/regions/${n.slug}`} className="font-display text-xl font-semibold leading-snug text-ink hover:text-moss">
                {n.name} →
              </Link>
              <p className="mt-1 text-xs text-ink-2">{n.towns ? `${n.towns} pre-built ${n.towns === 1 ? "town" : "towns"}` : "No pre-built towns yet"}</p>
              {n.contrast && <p className="mt-2 text-sm leading-relaxed text-ink-2">{n.contrast}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
