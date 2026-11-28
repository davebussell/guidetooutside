import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { placeFromSlug } from "@/lib/geocode";
import { getLocalData } from "@/lib/local-data";
import { placeRobots, redirectToCanonicalPlace } from "@/lib/seo/indexing";
import { resolvePlace, type PlaceParams, type PlaceSearch } from "@/lib/place-route";
import { SITE, shareCard } from "@/lib/site";
import { RememberPlace } from "@/lib/place-cookie";
import { type Organisation } from "@/data/conservation";
import { orgsFor, type OrgMatch } from "@/lib/conservation/match";
import { pageWaters } from "@/lib/conservation/waters";
import { WhoProtects } from "@/components/conservation/WhoProtects";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { FOOD_RECORD_SLUGS } from "@/lib/conservation/food";
import { withExtras } from "@/lib/conservation/cards";
import type { MatchPlace } from "@/lib/conservation/match";
import { OrgCard } from "@/components/conservation/OrgCard";
import { DISCLOSURE, RegionLink } from "@/components/conservation/OrgsPanel";
import { giftsFor, GIFT_KIND_LABEL, type GiftItem } from "@/lib/gifts";
import { GEAR_DISCLOSURE } from "@/lib/affiliate";
import { PlaceHero } from "@/components/PlaceHero";
import { LocationSearch } from "@/components/LocationSearch";
import type { Place } from "@/lib/types";

/**
 * A town's page is built the first time the town is asked for (the loading screen shows while it is), then stored
 * and served as a static page. It is rebuilt in the background at most once an hour, so no later reader waits.
 * The page reads no query string: a static page cannot, and the town's own coordinates are used.
 */
export const revalidate = 3600;
export function generateStaticParams(): PlaceParams[] {
  return [];
}

const describe = (place: Place) =>
  `The conservation organisations working on the wild places around ${place.name}, how to join them, and the gifts whose sales fund their work. Registered charities and public bodies only.`;

export async function generateMetadata({ params }: { params: Promise<PlaceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await placeFromSlug(slug);
  if (!place) return { title: "Location not found" };
  const title = `Get involved near ${place.label}`;
  const description = describe(place);
  const share = shareCard(title, description, `/resources/${place.slug}`);
  return { title, description, alternates: { canonical: `/resources/${place.slug}` }, ...placeRobots("resources", place.slug), ...share, openGraph: { ...share.openGraph, type: "article" } };
}

const TABS = [
  { id: "overview", label: "Overview", href: (s: string) => `/guide/${s}` },
  { id: "gardening", label: "Gardening", href: (s: string) => `/gardening/${s}` },
  { id: "fishing", label: "Fishing", href: (s: string) => `/fishing/${s}` },
  { id: "foraging", label: "Foraging", href: (s: string) => `/foraging/${s}` },
  { id: "homesteading", label: "Homesteading", href: (s: string) => `/homesteading/${s}` },
  { id: "ground", label: "The ground", href: (s: string) => `/ground/${s}` },
];

/** The section tabs for the place (this page is none of them), the location search, and the place remembered for the site. */
function PlaceBar({ place, timeZone }: { place: Place; timeZone?: string }) {
  return (
    <>
      <RememberPlace slug={place.slug} label={place.label} lat={place.lat} lon={place.lon} tz={timeZone} />
      <div className="flex flex-col-reverse gap-4 border-b border-line lg:flex-row lg:items-end lg:justify-between">
        <nav className="-mx-4 flex gap-0 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:gap-1 sm:px-0" aria-label="Guide sections">
          {TABS.map((t) => (
            <Link
              key={t.id}
              href={t.href(place.slug)}
              className="-mb-px whitespace-nowrap border-b-2 border-transparent px-2.5 py-3 text-[13px] font-medium text-ink-2 transition hover:border-line hover:text-ink sm:px-4 sm:text-sm"
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="pt-4 lg:w-80 lg:pb-2 lg:pt-0">
          <LocationSearch />
        </div>
      </div>
    </>
  );
}

/** A section frame in the shape of the organisation panels. */
function Section({ id, eyebrow, eyebrowClass = "text-moss", title, lede, children }: { id: string; eyebrow: string; eyebrowClass?: string; title: string; lede?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card p-6 sm:p-8" aria-labelledby={id}>
      <p className={`eyebrow ${eyebrowClass}`}>{eyebrow}</p>
      <h2 id={id} className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {lede && <p className="mt-1.5 max-w-3xl text-sm text-ink-2">{lede}</p>}
      {children}
    </section>
  );
}

/** Cards with each organisation's own open invitation (its button) and newest article. */
async function OrgGrid({ cards: input, place }: { cards: { org: Organisation; why: string }[]; place: MatchPlace }) {
  const cards = await withExtras(input, place);
  return (
    <div className={`mt-5 grid gap-5 ${cards.length > 1 ? "md:grid-cols-2" : ""} ${cards.length > 2 ? "lg:grid-cols-3" : ""}`}>
      {cards.map((c) => (
        <OrgCard key={c.org.slug} org={c.org} why={c.why} />
      ))}
    </div>
  );
}

const WAY_LABEL: Record<string, string> = { adoption: "Adopt", membership: "Join", "donation-gift": "Give", subscription: "Give" };

function GiftTile({ item }: { item: GiftItem }) {
  if (item.type === "org") {
    const { gift, org } = item;
    return (
      <article className="flex flex-col rounded-tile border border-line/70 bg-surface p-4 sm:p-5">
        <p className="text-xs text-ink-2">{gift.free ? "Free" : GIFT_KIND_LABEL[gift.kind]}</p>
        <h3 className="mt-1 font-medium leading-snug">{gift.title}</h3>
        <p className="text-sm">
          <Link href={`/conservation/${org.slug}`} className="text-ink-2 underline-offset-2 hover:text-moss hover:underline">
            {org.name}
          </Link>
        </p>
        <p className="mt-1.5 flex-1 text-sm text-ink-2">{gift.note}</p>
        <p className="mt-3 text-sm">
          <a href={gift.url} target="_blank" rel="noopener noreferrer" className="font-medium text-moss underline-offset-2 hover:underline" data-gto-out="org" data-gto-org={org.slug} data-gto-way={gift.kind}>
            {gift.free ? "Register" : WAY_LABEL[gift.kind]} →
          </a>
        </p>
      </article>
    );
  }
  const { brand, url, earns } = item;
  return (
    <article className="flex flex-col rounded-tile border border-line/70 bg-surface p-4 sm:p-5">
      <p className="text-xs text-ink-2">1% for the Planet member</p>
      <h3 className="mt-1 font-medium leading-snug">{brand.brand}</h3>
      <p className="mt-1.5 flex-1 text-sm text-ink-2">{brand.line}</p>
      <p className="mt-3 text-sm">
        <a href={url} target="_blank" rel={earns ? "sponsored noopener noreferrer" : "noopener noreferrer"} className="font-medium text-moss underline-offset-2 hover:underline" data-gto-out="gear" data-gto-brand={brand.affiliate}>
          Visit {brand.brand} →
        </a>
      </p>
    </article>
  );
}


/** Words in an organisation's asks or blurb that mean it runs a count, survey or record people can send to. */
const COUNTS = /\b(count|counts|counting|counted|survey|surveys|monitor|monitoring|record|records|recording|atlas|census|sampling|bioblitz|sightings?|report your|log your|observations?)\b/i;
const runsCounts = (o: Organisation) => COUNTS.test(o.asks.join(" ")) || COUNTS.test(o.blurb);

/** /resources/<town>: the organisations working around a place, how to join them, and the gifts that fund them. */
export default async function ResourcesPage({ params }: { params: Promise<PlaceParams> }) {
  const { slug } = await params;
  const search: PlaceSearch = {};
  const place: Place | null = await resolvePlace(slug, search);
  if (!place) notFound();
  redirectToCanonicalPlace("resources", slug, place.slug, search);
  const data = await getLocalData(place);
  const waters = pageWaters(data.water);

  // (1) Who looks after the place, across every topic (the food and growing groups have their own section below).
  const protects = orgsFor(place, { waters, limit: 6, exclude: FOOD_RECORD_SLUGS });
  const shown = new Set(protects.map((m) => m.org.slug));

  // (3) Count for real: citizen-science programmes for birds, water and pollinators, programmes first.
  const countAll = orgsFor(place, { topic: ["birds", "water", "pollinators"], waters }).filter((m) => m.topical && runsCounts(m.org) && !shown.has(m.org.slug));
  const counts: OrgMatch[] = [...countAll.filter((m) => m.org.kind === "programme"), ...countAll.filter((m) => m.org.kind !== "programme")].slice(0, 6);

  // (4) Gifts (the children's picture books moved to Pecker & Jay with the rest of the kids content, Nov 2026).
  const gifts = giftsFor(place);
  const anyGear = gifts.some((g) => g.type === "gear");

  const checked = [...protects.map((m) => m.org), ...counts.map((m) => m.org)].map((o) => o.verified).sort().pop();

  const title = `Get involved near ${place.name}`;
  const listed = [...protects.map((m) => m.org), ...counts.map((m) => m.org)];
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Get involved near ${place.label}`,
    description: describe(place),
    url: `${SITE.url}/resources/${place.slug}`,
    about: { "@type": "Place", name: place.label, geo: { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lon } },
    ...(listed.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: listed.map((o, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: o.name, url: o.links.home } })),
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <PlaceHero
        data={data}
        eyebrow="Get involved"
        title={title}
        standfirst={`The organisations working on the wild places around ${place.name}, how to join them, and the gifts whose sales fund that work. We list registered charities and public bodies only, and we receive nothing from anything you give.`}
      />
      <PlaceBar place={place} timeZone={data.forecast.timezone} />

      <div className="mt-10 grid gap-10">
        <div>
          <WhoProtects place={place} waters={waters} limit={6} exclude={FOOD_RECORD_SLUGS} title={`Who looks after ${place.name}'s wild places`} id="who-looks-after" />
          {checked && (
            <p className="mt-3 text-xs text-ink-2">
              Each organisation is checked against its own pages and a public register or network list; the most recent check was on {new Date(`${checked}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}.
            </p>
          )}
        </div>

        {/* Food and growing near the town: community gardens and allotments by name, then the groups, none repeated from the sections around it. */}
        <FoodPanel place={place} section="resources" exclude={[...shown, ...counts.map((m) => m.org.slug)]} />

        {counts.length > 0 && (
          <Section
            id="count-for-real"
            eyebrow="Count for real"
            title={`Counts and surveys near ${place.name}`}
            lede="Birds at the feeder, insects on the flowers, the state of a stream: a count sent to one of these programmes joins thousands of others and is read by the people who look after the species. Look closely, count honestly, send it in."
          >
            <OrgGrid cards={counts.map((m) => ({ org: m.org, why: m.why }))} place={place} />
            <RegionLink countryCode={place.countryCode} />
          </Section>
        )}

        {gifts.length > 0 && (
          <Section
            id="gifts"
            eyebrow="Gifts that give"
            title="Gifts that fund the work"
            lede={`Symbolic adoptions and memberships from the organisations that work around ${place.name}${anyGear ? ", and gear from brands that give at least one per cent of their sales to environmental groups" : ""}.`}
          >
            <div className={`mt-5 grid gap-4 sm:grid-cols-2 ${gifts.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {gifts.map((g) => (
                <GiftTile key={g.type === "org" ? `${g.org.slug}:${g.gift.title}` : g.brand.brand} item={g} />
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-xs text-ink-2">
              {DISCLOSURE}
              {anyGear ? ` ${GEAR_DISCLOSURE}` : ""}
            </p>
          </Section>
        )}

      </div>
      <p className="mt-10 text-sm text-ink-2">
        <Link href={`/guide/${place.slug}`} className="text-moss underline hover:no-underline">
          Back to this week&apos;s guide for {place.name}
        </Link>
      </p>
    </div>
  );
}
