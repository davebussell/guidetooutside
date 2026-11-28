import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ZONES } from "@/data/zones";
import { LocationSearch } from "@/components/LocationSearch";
import { YourZoneBanner } from "@/components/here/ZoneHere";
import { ZoneContext } from "@/components/zones/ZoneContext";
import { abroadBeyondScale, abroadInZone, abroadTitle } from "@/components/zones/zone-places";
import { RHS_RATINGS, rhsRange, ZONE_SOURCES } from "@/lib/region-context";
import { continentServed } from "@/lib/scope";

/** The town lists, the RHS table and the notes for Europe and Africa show only while that continent is served (src/lib/scope.ts). */
const EUROPE = continentServed("europe");
const AFRICA = continentServed("africa");
const ABROAD = EUROPE || AFRICA;

export const metadata: Metadata = {
  title: "Regional guides by hardiness zone",
  description:
    "Gardening, fishing and foraging guides for plant hardiness zones 2 to 11: the official USDA and Natural Resources Canada zones and the cities in each.",
};

export default function ZonesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="eyebrow text-moss">Hardiness zones</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Browse by hardiness zone</h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        A hardiness zone is set by the average coldest winter night. It indicates which perennials survive and how long the growing season runs. The zones here are the USDA
        scale used in the United States and, with its own map, in Canada. Choose a zone below, or search by town or postal code.
      </p>
      <div className="mt-5 grid gap-3">
        <YourZoneBanner here={undefined} />
        <ZoneContext />
      </div>
      <div className="mt-6 max-w-2xl">
        <LocationSearch />
      </div>
      <Link href="/zones/map" className="mt-6 card p-5 flex items-center justify-between gap-4 hover:border-moss transition">
        <div>
          <p className="eyebrow text-moss">Map</p>
          <p className="font-display text-xl font-semibold mt-1">Zone map: Canada and the United States</p>
          <p className="text-sm text-ink-2 mt-1">
            Official USDA 2023 and Natural Resources Canada zones. Select any point for its zone, region and local guide.
          </p>
        </div>
        <span className="text-moss font-medium whitespace-nowrap">Zone map →</span>
      </Link>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ZONES.map((z) => (
          <Link key={z.zone} href={`/zones/${z.zone}`} className="card overflow-hidden hover:border-moss transition group">
            <div className="relative bg-paper-2/60 border-b border-line/70">
              <Image src={`/zones/map-${z.zone}.svg`} alt={`Where zone ${z.zone} falls across Canada and the United States`} width={460} height={300} className="w-full h-auto" />
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold group-hover:text-moss">Zone {z.zone}</h2>
                <span className="text-xs text-ink-2">{z.lowC}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-ink-2">{z.title}</p>
              <p className="mt-3 text-xs text-ink-2">
                Frost-free days: {z.frostFree} · {z.places.length} regions
              </p>
              <p className="mt-2 text-sm text-ink-2 line-clamp-2">
                {z.places
                  .slice(0, 5)
                  .map((p) => p.label)
                  .join(", ")}
                {z.places.length > 5 ? "…" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <section className="mt-16">
        <p className="eyebrow">Places</p>
        <h2 className="font-display mt-2 text-3xl font-semibold">Local guides by zone</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {ZONES.map((z) => (
            <div key={z.zone}>
              <h3 className="font-display text-xl font-semibold">
                <Link href={`/zones/${z.zone}`} className="hover:text-moss">
                  Zone {z.zone}
                </Link>{" "}
                <span className="text-sm font-normal text-ink-2">{z.lowC}</span>
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {z.places.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/guide/${p.slug}`}
                      className="inline-block rounded-full bg-surface border border-edge px-3 py-1 text-sm hover:border-moss hover:text-moss transition"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-2 max-w-3xl">
          {ZONES.reduce((n, z) => n + z.places.length, 0)} places listed. Zone assignments are approximate: many cities span two half-zones and microclimates vary by neighbourhood.
          Each local guide estimates the zone for the exact location from ten years of climate data.
        </p>
      </section>
      {ABROAD ? (
        <AbroadByZone />
      ) : (
        <section className="mt-16 max-w-2xl">
          <OfficialMaps />
        </section>
      )}
    </div>
  );
}

/**
 * The same bands of winter cold in Europe and Africa: each pre-built town
 * there with the zone the site computes for it (no official map exists), and
 * the RHS hardiness rating a winter that cold answers to.
 */
function AbroadByZone() {
  const beyond = abroadBeyondScale();
  return (
    <section id="abroad" className="mt-16 scroll-mt-24">
      <p className="eyebrow">Europe and Africa</p>
      <h2 className="font-display mt-2 text-3xl font-semibold">USDA-equivalent zones elsewhere</h2>
      <p className="mt-3 max-w-3xl text-ink-2">
        No official USDA-style map covers Europe or Africa, so for every town there the site computes the zone from the same rule the USDA map uses: the average of each
        winter&apos;s single coldest night, in 10 °F bands with 5 °F halves. The figure is a weather station&apos;s 1991–2020 record (NOAA GHCN-Daily) where one passes
        the completeness test near the town, and otherwise ten years of ERA5 reanalysis; each town&apos;s hover text says which. British and Irish gardeners read hardiness as an RHS
        rating instead; the table below gives the equivalence.
      </p>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {ZONES.map((z) => {
          const abroad = abroadInZone(z.zone);
          const rows = [
            ["Europe", EUROPE ? abroad.europe : []],
            ["Africa", AFRICA ? abroad.africa : []],
          ] as const;
          if (!rows.some(([, places]) => places.length)) return null;
          return (
            <div key={z.zone}>
              <h3 className="font-display text-xl font-semibold">
                <Link href={`/zones/${z.zone}`} className="hover:text-moss">
                  Zone {z.zone}
                </Link>{" "}
                <span className="text-sm font-normal text-ink-2">{z.lowC}</span>
              </h3>
              {rows.map(([name, places]) =>
                places.length ? (
                  <div key={name} className="mt-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">{name}</p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {places.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/guide/${p.slug}`}
                            className="inline-block rounded-full bg-surface border border-edge px-3 py-1 text-sm hover:border-moss hover:text-moss transition"
                            title={abroadTitle(p)}
                          >
                            {p.name} <span className="text-ink-2">{p.zone}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null,
              )}
            </div>
          );
        })}
      </div>
      {beyond.length > 0 && (
        <p className="mt-6 max-w-3xl text-sm text-ink-2">
          Warmer than the scale&apos;s last page, in USDA-equivalent zones 12 and 13, where the coldest night of the year stays above 10 °C and frost is unknown:{" "}
          {beyond.map((p, i) => (
            <span key={p.slug}>
              <Link href={`/guide/${p.slug}`} className="underline decoration-line hover:text-ink">
                {p.name}
              </Link>{" "}
              <span>({p.zone})</span>
              {i < beyond.length - 1 ? ", " : "."}
            </span>
          ))}{" "}
          There the rains, not the cold, set the growing year, and each local guide is built on the town&apos;s rainfall months.
        </p>
      )}
      <div className={EUROPE ? "mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]" : "mt-8 max-w-2xl"}>
        {EUROPE && <RhsRatings />}
        <OfficialMaps />
      </div>
    </section>
  );
}

/** The RHS scale beside the USDA zones: a British scale, shown while Europe is served. */
function RhsRatings() {
  return (
    <div className="card p-5 overflow-x-auto">
      <p className="eyebrow text-moss">RHS hardiness ratings</p>
      <p className="mt-1 text-sm text-ink-2">
        The Royal Horticultural Society rates plants H1a (tropical glasshouse) to H7 (very hardy) by the winter minimum they tolerate. Read a place&apos;s average coldest
        night against the table to see which ratings survive it.
      </p>
      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-ink-2">
            <th className="py-1.5 pr-3 font-semibold">Rating</th>
            <th className="py-1.5 pr-3 font-semibold">Winter minimum</th>
            <th className="py-1.5 pr-3 font-semibold">Category</th>
            <th className="py-1.5 font-semibold">USDA zone</th>
          </tr>
        </thead>
        <tbody>
          {RHS_RATINGS.map((r) => (
            <tr key={r.code} className="border-t border-line">
              <td className="py-1.5 pr-3 font-semibold">{r.code}</td>
              <td className="py-1.5 pr-3 whitespace-nowrap">{rhsRange(r)}</td>
              <td className="py-1.5 pr-3 text-ink-2">{r.category}</td>
              <td className="py-1.5 whitespace-nowrap">{r.usda}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-ink-2">
        Source:{" "}
        <a href={ZONE_SOURCES.rhs.url} target="_blank" rel="noopener" className="underline decoration-line hover:text-ink">
          {ZONE_SOURCES.rhs.label}
        </a>
        , which also gives the USDA equivalents in the last column.
      </p>
    </div>
  );
}

/** The publishers' own zone maps: the two there are, and the notes on Europe and Africa while those are served. */
function OfficialMaps() {
  return (
    <div className="card p-5 text-sm text-ink-2">
      <p className="eyebrow">Official maps</p>
      <ul className="mt-2 space-y-2">
        <li>
          <a href={ZONE_SOURCES.usda.url} target="_blank" rel="noopener" className="font-medium text-ink underline decoration-line hover:text-moss">
            {ZONE_SOURCES.usda.label}
          </a>{" "}
          — the United States, by ZIP code or map.
        </li>
        <li>
          <a href={ZONE_SOURCES.nrcan.url} target="_blank" rel="noopener" className="font-medium text-ink underline decoration-line hover:text-moss">
            {ZONE_SOURCES.nrcan.label}
          </a>{" "}
          — Canada&apos;s own zones, which blend seven climate variables, and its extreme-minimum (USDA-style) map.
        </li>
        {EUROPE && (
          <li>
            <a href={ZONE_SOURCES.rhs.url} target="_blank" rel="noopener" className="font-medium text-ink underline decoration-line hover:text-moss">
              {ZONE_SOURCES.rhs.label}
            </a>{" "}
            — the UK and Ireland rate plants rather than map places.
          </li>
        )}
      </ul>
      {ABROAD && (
        <p className="mt-3">
          Germany and the Netherlands use USDA-style zone maps in the nursery trade, but no national body publishes one we could verify and link to; no African country
          publishes an official map that we know of. Where there is no map, the USDA-equivalent zone on each local guide is the best figure available, give or take a
          half-zone.
        </p>
      )}
    </div>
  );
}
