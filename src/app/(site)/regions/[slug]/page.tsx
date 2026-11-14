import { regionRobots } from "@/lib/seo/indexing";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, shareCard } from "@/lib/site";
import { theRegion } from "@/lib/the-region";
import { LocationSearch } from "@/components/LocationSearch";
import { NewsletterForm } from "@/components/NewsletterForm";
import { LandSkyNav } from "@/components/kids/LandSkyNav";
import { YourRegionBanner } from "@/components/here/LocalBits";
import { ZoneBand } from "@/components/here/ZoneHere";
import { BiomeDial } from "@/components/toys/BiomeDial";
import { ToyCard } from "@/components/toys/ToyCard";
import { RegionMosaic, RegionPhotoCredits } from "@/components/regions/RegionMosaic";
import { RegionFauna, RegionForaging } from "@/components/regions/RegionSections";
import { RegionGuide } from "@/components/regions/RegionGuide";
import { regionOrgs, regionStats } from "@/lib/regions";
import { BIOME_START, REGIONS, exampleSlug, getRegion, type Region } from "@/components/regions/region-bits";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return REGIONS.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;
/** The month's lists change with the month. */
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const region = getRegion((await params).slug);
  if (!region) return {};
  const title = `${region.name} — gardening, fishing & foraging`;
  const n = regionStats(region.slug).towns.length;
  const k = regionOrgs(region.slug).inRegion.length;
  const description = `${region.summary} A regional guide: ${n ? `${n} towns compared on zone, frost, rain and water, ` : ""}what the whole region shares, what differs town to town, ${
    k ? `the year across it, and the ${k === 1 ? "one organisation" : `${k} organisations`} working to protect it` : "and the year across it"
  }.`;
  return {
    title,
    description,
    alternates: { canonical: `/regions/${region.slug}` },
    ...regionRobots(region.slug),
    ...shareCard(title, description, `/regions/${region.slug}`),
  };
}

function jsonLd(r: Region) {
  const url = `${SITE.url}/regions/${r.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Ecological regions", item: `${SITE.url}/regions` },
          { "@type": "ListItem", position: 3, name: r.name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: r.name,
        description: r.summary,
        mainEntityOfPage: url,
        articleSection: "Regions",
        publisher: { "@id": `${SITE.url}/#organization` },
        isAccessibleForFree: true,
      },
    ],
  };
}

const GUIDES = [
  { key: "gardening", label: "Gardening", tone: "text-moss" },
  { key: "fishing", label: "Fishing", tone: "text-azure" },
  { key: "foraging", label: "Foraging", tone: "text-moss" },
] as const;

/** /regions/<slug>: one ecological region — its photographs, places, the regional guide built from its towns, and what grows, bites and ripens there this month. */
export default async function RegionPage({ params }: { params: Promise<Params> }) {
  const region = getRegion((await params).slug);
  if (!region) notFound();
  const i = REGIONS.findIndex((r) => r.slug === region.slug);
  const prev = REGIONS[i - 1];
  const next = REGIONS[i + 1];
  const month = new Date().getMonth() + 1;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(region)) }} />
      <nav className="text-sm text-ink-2 flex flex-wrap items-center gap-2">
        <Link href="/regions" className="hover:text-ink">
          All regions
        </Link>
        {prev && (
          <>
            <span>·</span>
            <Link href={`/regions/${prev.slug}`} className="hover:text-ink">
              ← {prev.name}
            </Link>
          </>
        )}
        {next && (
          <>
            <span>·</span>
            <Link href={`/regions/${next.slug}`} className="hover:text-ink">
              {next.name} →
            </Link>
          </>
        )}
      </nav>
      <div className="mt-4">
        <YourRegionBanner here={region.slug} />
      </div>
      <div className="mt-5 overflow-hidden card p-0">
        <RegionMosaic slug={region.slug} aspect="aspect-[16/9]" sizes="(max-width: 1024px) 100vw, 640px" priority linked />
      </div>
      <RegionPhotoCredits slug={region.slug} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow text-moss">
            {region.level1} · <ZoneBand band={region.zones} />
          </p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">{region.name}</h1>
          <p className="mt-4 text-lg text-ink-2">{region.summary}</p>
          <p className="mt-3 text-ink-2">{region.landscape}</p>
        </div>
        <div className="card p-5">
          <p className="eyebrow">Local guide</p>
          <div className="mt-3">
            <LocationSearch />
          </div>
        </div>
      </div>

      <section className="mt-10">
        <p className="eyebrow">Places in this region</p>
        <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 text-sm">
          {region.examples.map((e) => (
            <li key={e} className="border-b border-line">
              <Link href={`/guide/${exampleSlug(e)}`} className="block py-1.5 text-ink-2 hover:text-moss transition">
                {e}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {GUIDES.map((g) => (
          <section key={g.key} className="card p-6">
            <p className={`eyebrow ${g.tone}`}>{g.label}</p>
            <p className="mt-2 text-ink-2 leading-relaxed">{region[g.key]}</p>
            <Link href={`/${g.key}`} className={`mt-4 inline-block text-sm font-medium ${g.tone}`}>
              {g.label} guide →
            </Link>
          </section>
        ))}
      </div>

      <div className="mt-16">
        <RegionGuide slug={region.slug} name={region.name} />
      </div>

      <section className="mt-16">
        <RegionForaging region={region} month={month} />
      </section>
      <section className="mt-14">
        <RegionFauna kind="fish" region={region} month={month} />
      </section>
      <section className="mt-14">
        <RegionFauna kind="garden" region={region} month={month} />
      </section>

      <section className="mt-12 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note for {theRegion(region.name)}</h2>
          <p className="mt-1 text-paper/90 text-sm">One email a week, sent Sunday evening. It is tailored to a specific place once a location is set.</p>
        </div>
        <NewsletterForm source={`region-${region.slug}`} location={region.name} />
      </section>

      <div className="mt-14 max-w-4xl">
        <ToyCard
          title={`${region.name}: climate and vegetation`}
          intro="Temperature and rainfall largely determine what can grow in a place. The dial opens on the vegetation type closest to this region; adjust temperature or rainfall to see what would grow instead."
        >
          <BiomeDial start={BIOME_START[region.slug]} />
        </ToyCard>
      </div>
      <div className="mt-14">
        <p className="eyebrow text-moss">For Kids · The land and the sky</p>
        <div className="mt-3">
          <LandSkyNav current="regions" />
        </div>
      </div>
    </div>
  );
}
