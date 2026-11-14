import type { Metadata } from "next";
import Link from "next/link";
import { LocationSearch } from "@/components/LocationSearch";
import { LandSkyNav } from "@/components/kids/LandSkyNav";
import { YourRegionBanner, YourRegionMark } from "@/components/here/LocalBits";
import { YoungNaturalists } from "@/components/learn/YoungNaturalists";
import { BiomeDial } from "@/components/toys/BiomeDial";
import { ToyCard } from "@/components/toys/ToyCard";
import { RegionMosaic } from "@/components/regions/RegionMosaic";
import { CONTINENTS, REGIONS, continentOf } from "@/components/regions/region-bits";
import { RAIN_WORDS, continentIntro, regionCard, regionOrgSummary } from "@/lib/regions";
import { SITE, shareCard } from "@/lib/site";

const TITLE = "Ecological regions of Canada and the United States";
const DESCRIPTION =
  "Gardening, fishing and foraging by ecological region — from the Pacific Maritime rainforest and the Great Lakes to the Prairies, the Appalachian Highlands, the Gulf Coast and the deserts. Each region is a guide: its towns compared on zone, frost, rain and water, what the whole region shares, and the year across it. Find yours by town or postal code.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/regions" },
  ...shareCard(TITLE, DESCRIPTION, "/regions"),
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Ecological regions", item: `${SITE.url}/regions` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: TITLE,
        description: DESCRIPTION,
        url: `${SITE.url}/regions`,
        isAccessibleForFree: true,
        publisher: { "@id": `${SITE.url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: REGIONS.length,
          itemListElement: REGIONS.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name, url: `${SITE.url}/regions/${r.slug}` })),
        },
      },
    ],
  };
}

/** /regions: every ecological region as a photograph card, by continent — with its towns, zones and rain — then the biome dial. */
export default function RegionsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <p className="eyebrow text-moss">Regions</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">
        {REGIONS.length} ecological regions of Canada and the United States
      </h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        A hardiness zone describes winter temperature. An ecological region describes the rest: forest type, soil, rainfall, rivers and the species
        they support. Enter a town or postal code to find both for a place, or browse the regions below. Each region&rsquo;s page is a guide to the whole
        of it: its pre-built towns compared, what they share and where they differ, and the year across the region.
      </p>
      <div className="mt-5">
        <YourRegionBanner here={undefined} />
      </div>
      <div className="mt-6 max-w-2xl">
        <LocationSearch />
      </div>
      {CONTINENTS.map((c) => {
        const regions = REGIONS.filter((r) => continentOf(r) === c.key);
        const intro = continentIntro(regions);
        return (
          <section key={c.key} className="mt-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight">{c.title}</h2>
            {intro && (
              <p className="mt-2 max-w-3xl text-ink-2">
                <span className="font-semibold text-ink">How the regions differ. </span>
                {intro}
              </p>
            )}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((r) => {
                const card = regionCard(r);
                const orgs = regionOrgSummary(r.slug);
                const listed = orgs.inRegion + orgs.national;
                return (
                  <Link key={r.slug} href={`/regions/${r.slug}`} className="card overflow-hidden hover:border-moss transition group flex flex-col">
                    <RegionMosaic slug={r.slug} aspect="aspect-[16/8]" sizes="(max-width: 640px) 100vw, 400px" priority={REGIONS.indexOf(r) < 3} />
                    <div className="p-6 flex flex-col flex-1">
                      <p className="eyebrow">
                        {r.zones}
                        <YourRegionMark slug={r.slug} />
                      </p>
                      <h3 className="font-display mt-1 text-2xl font-semibold group-hover:text-moss">{r.name}</h3>
                      <p className="mt-2 text-sm text-ink-2 flex-1">{r.summary}</p>
                      <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-xs">
                        <div>
                          <dt className="text-ink-2">Towns</dt>
                          <dd className="font-semibold tabular-nums text-ink">{card.towns || "—"}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-2">Zones at the towns</dt>
                          <dd className="font-semibold tabular-nums text-ink">{card.zones ?? "—"}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-2">Precipitation</dt>
                          <dd className="font-semibold text-ink">{card.rain ? RAIN_WORDS[card.rain].replace(/^rain /, "") : "—"}</dd>
                        </div>
                      </dl>
                      {listed > 0 && (
                        <p className="mt-2 text-xs text-ink-2">
                          <span className="font-semibold text-ink">
                            {listed} {listed === 1 ? "organisation" : "organisations"} listed
                          </span>
                          {orgs.inRegion > 0 && ` · ${orgs.inRegion} in the region`}
                          {orgs.national > 0 && ` · ${orgs.national} national`}
                          {orgs.youth > 0 && ` · ${orgs.youth} for young people`}
                        </p>
                      )}
                      <p className="mt-3 text-xs text-ink-2">{r.examples.slice(0, 4).join(" · ")}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Towns, zones and rain on each card are read from the region&rsquo;s pre-built towns: the zone range is theirs (official USDA 2023 and NRCan maps where one
        covers the town, otherwise estimated from ERA5), the rain pattern is the one most of them share, and a dash means no pre-built town falls in the region yet.
        The zone band above each name is the region&rsquo;s own, as written. Organisations listed are those in our conservation library with a home in the region
        or working across one of its countries; the international networks, which work in every region, are not counted. Photographs are openly licensed research-grade observations from iNaturalist, credited on each
        region&apos;s own page.
      </p>
      <div className="mt-14 max-w-4xl">
        <ToyCard
          title="Temperature, rainfall and vegetation"
          intro="Adjust temperature and rainfall to see the vegetation change: tundra, spruce forest, maple woodland, prairie, desert, rainforest. Temperature and rainfall largely determine what can grow in a place, and so define its ecological region."
        >
          <BiomeDial />
        </ToyCard>
      </div>
      <div className="mt-14">
        <p className="eyebrow text-moss">For Kids · The land and the sky</p>
        <div className="mt-3">
          <LandSkyNav current="regions" />
        </div>
      </div>
      <div className="mt-14">
        <YoungNaturalists panel="regions" />
      </div>
      <p className="mt-6 text-sm text-ink-2 max-w-3xl">
        See also the{" "}
        <Link href="/zones" className="underline">
          hardiness-zone guides
        </Link>{" "}
        and the{" "}
        <Link href="/zones/map" className="underline">
          zone map
        </Link>
        .
      </p>
    </div>
  );
}
