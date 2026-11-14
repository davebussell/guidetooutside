import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getZone, ZONES } from "@/data/zones";
import { speciesInZone } from "@/lib/species";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { SITE, shareCard } from "@/lib/site";
import { SpeciesCard } from "@/components/NatureCard";
import { LocationSearch } from "@/components/LocationSearch";
import { NewsletterForm } from "@/components/NewsletterForm";
import { YourZoneBanner } from "@/components/here/ZoneHere";
import { ZoneList } from "@/components/zones/ZoneList";
import { ZONE_YEAR } from "@/components/zones/zone-year";
import { ZoneContext } from "@/components/zones/ZoneContext";
import { abroadInZone, abroadTitle } from "@/components/zones/zone-places";
import { rhsRange, rhsRatingFor, zoneBandC } from "@/lib/region-context";
import { continentServed } from "@/lib/scope";
import { servedText } from "@/components/species/served-text";
import { NearbyOrgs } from "@/components/conservation/NearbyOrgs";
import { OrgsAnywhere } from "@/components/conservation/VisitorOrgs";

type Params = { n: string };

export function generateStaticParams() {
  return ZONES.map((z) => ({ n: String(z.zone) }));
}

export const dynamicParams = false;

const zoneOf = (n: string) => (/^\d+$/.test(n) ? getZone(Number(n)) : undefined);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const z = zoneOf((await params).n);
  if (!z) return {};
  const title = `Zone ${z.zone} gardening, fishing & foraging guide`;
  const description = `${z.title.replace(/\.$/, "")}. What to grow, what's biting and what to forage in hardiness Zone ${z.zone} (${z.lowC}), with regional guides for ${z.places
    .slice(0, 4)
    .map((p) => p.label)
    .join(", ")} and more.`;
  return { title, description, alternates: { canonical: `/zones/${z.zone}` }, ...shareCard(title, description) };
}

export default async function ZonePage({ params }: { params: Promise<Params> }) {
  const z = zoneOf((await params).n);
  if (!z) notFound();
  const label = `Zone ${z.zone}`;
  const prev = getZone(z.zone - 1);
  const next = getZone(z.zone + 1);
  const path = `/zones/${z.zone}`;
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Hardiness zones", "/zones"],
      [label, path],
    ]),
    {
      "@type": "Article",
      headline: `${label} gardening, fishing and foraging`,
      description: z.summary,
      mainEntityOfPage: `${SITE.url}${path}`,
      articleSection: "Hardiness zones",
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
  ]);
  const wild = speciesInZone(z.zone).map(servedText);
  const year = ZONE_YEAR[z.zone] ?? [];
  // The towns of Europe and Africa in this zone: listed only while that continent is served (src/lib/scope.ts).
  const inZone = abroadInZone(z.zone);
  const abroad = { europe: continentServed("europe") ? inZone.europe : [], africa: continentServed("africa") ? inZone.africa : [] };
  // The RHS ratings a winter in this zone's band answers to (its cold and warm halves): a British scale, offered while Europe is served.
  const band = zoneBandC(String(z.zone));
  const rhsCold = band ? rhsRatingFor(band.lo + 0.1) : null;
  const rhsWarm = band ? rhsRatingFor(band.hi - 0.1) : null;
  const rhsText = continentServed("europe") && rhsCold && rhsWarm ? (rhsCold.code === rhsWarm.code ? `an ${rhsCold.code} winter (${rhsRange(rhsCold)})` : `an ${rhsCold.code} to ${rhsWarm.code} winter`) : null;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <nav className="text-sm text-ink-2 flex flex-wrap items-center gap-2">
        <Link href="/zones" className="hover:text-ink">
          All zones
        </Link>
        {prev && (
          <>
            <span>·</span>
            <Link href={`/zones/${prev.zone}`} className="hover:text-ink">
              ← Zone {prev.zone}
            </Link>
          </>
        )}
        {next && (
          <>
            <span>·</span>
            <Link href={`/zones/${next.zone}`} className="hover:text-ink">
              Zone {next.zone} →
            </Link>
          </>
        )}
      </nav>
      <div className="mt-4 grid gap-3">
        <YourZoneBanner here={String(z.zone)} />
        <ZoneContext pageZone={z.zone} />
      </div>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow text-moss">Hardiness {label}</p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">{z.title}</h1>
          <p className="mt-4 text-lg text-ink-2">{z.summary}</p>
        </div>
        <div className="card p-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="eyebrow">Winter low</p>
            <p className="font-display text-xl font-semibold mt-1">{z.lowC}</p>
            <p className="text-xs text-ink-2">{z.lowF}</p>
          </div>
          <div>
            <p className="eyebrow">Frost-free days</p>
            <p className="font-display text-xl font-semibold mt-1">{z.frostFree}</p>
          </div>
          <div className="col-span-2">
            <p className="eyebrow">Typical frost window</p>
            <p className="mt-1 text-ink-2">{z.frostWindow}</p>
          </div>
        </div>
      </div>
      <section className="mt-10">
        <p className="eyebrow">Places in {label} · Canada and the United States</p>
        <p className="mt-1 text-sm text-ink-2">
          From the official USDA 2023 and Natural Resources Canada maps. Each place has a local guide for the current week: forecast, soil temperature, moon, nearby waters and
          a written summary.
        </p>
        <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 text-sm">
          {z.places.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/guide/${p.slug}`} className="block py-1.5 text-ink-2 hover:text-moss transition">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
        {(abroad.europe.length > 0 || abroad.africa.length > 0) && (
          <div className="mt-8">
            <p className="eyebrow">{label} in Europe and Africa · USDA-equivalent</p>
            <p className="mt-1 text-sm text-ink-2">
              Towns whose average coldest night falls in the same band, {z.lowC}, worked out on the USDA rule from each town&apos;s coldest night of an average year (a weather station&apos;s 1991–2020 record where one is near, otherwise ten years of ERA5 reanalysis), because no official map covers them.
              {rhsText ? ` For a European gardener this is ${rhsText} on the RHS scale.` : ""}
            </p>
            {(
              [
                ["Europe", abroad.europe],
                ["Africa", abroad.africa],
              ] as const
            ).map(([name, places]) =>
              places.length ? (
                <div key={name} className="mt-3">
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
        )}
        <div className="mt-6 max-w-xl">
          <LocationSearch />
        </div>
      </section>
      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <figure className="m-0 card overflow-hidden">
          <Image
            src={`/zones/map-${z.zone}.svg`}
            alt={`Map of Canada and the United States with hardiness ${label} picked out`}
            width={460}
            height={300}
            className="w-full h-auto bg-paper-2/60"
            priority
          />
        </figure>
        <div>
          <p className="eyebrow text-moss">Extent</p>
          <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold">{label} across Canada and the United States</h2>
          <p className="mt-2 text-ink-2">
            A hardiness zone is a band of winter cold rather than a region: it covers every area where the average annual minimum falls between {z.lowC}. That is why {label}{" "}
            includes{" "}
            {z.places
              .slice(0, 3)
              .map((p) => p.label)
              .join(", ")}{" "}
            and much of the country between them.
          </p>
          <p className="mt-3 text-sm text-ink-2">
            Drawn from the USDA 2023 and Natural Resources Canada zone maps.{" "}
            <Link href="/zones/map" className="underline font-medium text-moss">
              Zone map
            </Link>{" "}
            for any location.
          </p>
        </div>
      </section>
      <div className="mt-8 grid gap-8">
        <section className="card p-6 sm:p-8">
          <p className="eyebrow text-moss">Gardening in {label} · North America</p>
          <p className="mt-2 text-ink-2">{z.gardening.intro}</p>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <ZoneList title="Vegetables" items={z.gardening.vegetables} />
            <ZoneList title="Fruit" items={z.gardening.fruit} />
            <ZoneList title="Perennials and shrubs" items={z.gardening.perennials} />
          </div>
          <div className="mt-6">
            <ZoneList title="Notes" items={z.gardening.notes} />
          </div>
        </section>
        <section className="card p-6 sm:p-8">
          <p className="eyebrow text-azure">Fishing in {label} · North America</p>
          <p className="mt-2 text-ink-2">{z.fishing.intro}</p>
          <div className="mt-5">
            <ZoneList title="Principal species" items={z.fishing.species} />
          </div>
          <p className="mt-4 text-xs text-ink-2">Seasons, limits and licences vary by country, province and state; each local guide links to the relevant regulator.</p>
        </section>
        <section className="card p-6 sm:p-8">
          <p className="eyebrow text-moss">Foraging in {label} · North America</p>
          <p className="mt-2 text-ink-2">{z.foraging.intro}</p>
          <div className="mt-5">
            <ZoneList title="Species" items={z.foraging.species} />
          </div>
          <p className="mt-4 text-xs text-ink-2">Never eat anything you cannot identify with certainty. Confirm with a regional field guide or local expert.</p>
        </section>
        {wild.length > 0 && (
          <section className="card p-6 sm:p-8 lg:col-span-2">
            <p className="eyebrow text-moss">Wild edibles in {label}</p>
            <h2 className="font-display mt-1 text-2xl font-semibold">Species whose range includes {label}</h2>
            <p className="mt-2 text-ink-2 max-w-3xl text-sm">
              Library species whose recorded hardiness range includes this zone. Timing varies by weeks across the zone; with a location set, the foraging guide narrows it to
              the local month.
            </p>
            <div className="mt-5">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wild.map((s) => (
                  <SpeciesCard key={s.slug} species={s} priority={false} />
                ))}
              </ul>
            </div>
          </section>
        )}
        <section className="card p-6 sm:p-8">
          <p className="eyebrow">The {label} year · North America, northern calendar</p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {year.map((y) => (
              <li key={y.when} className="rounded-tile bg-paper-2/60 p-4">
                <p className="font-semibold">{y.when}</p>
                <p className="mt-1 text-sm text-ink-2">{y.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
      {/* Pre-rendered page: the visitor's own pollinator and plant bodies are filled in by the browser, with the ecoregional planting guide named when the library has one. */}
      <div className="mt-12">
        <NearbyOrgs id="who-looks-after" topic={["pollinators", "plants"]} headingNear="Who looks after the pollinators and plants near {town}" ecoGuideLede>
          <OrgsAnywhere id="who-looks-after" topic={["pollinators", "plants"]} heading="Who looks after pollinators and native plants" />
        </NearbyOrgs>
      </div>
      <section className="mt-12 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note: {label}</h2>
          <p className="mt-1 text-paper/90 text-sm">What to sow, which fish are active and what is ripening: one email a week, for your area.</p>
        </div>
        <NewsletterForm source={`zone-${z.zone}`} location={label} />
      </section>
    </div>
  );
}
