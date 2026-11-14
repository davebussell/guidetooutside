/**
 * /conservation/<slug> — one organisation: who it is and where it works (the
 * remit in words), what it does, how to help this season, the ways in, the
 * towns on this site inside its areas, the pages here it connects to, and the
 * record behind the listing (register, founding year, when it was checked).
 * Its own open invitations come first under its name (one featured, or a row
 * of cards), its one clear way in leads the "ways in" box, and its latest
 * articles follow the details when it has a feed.
 * One page per library record, built at deploy and re-rendered at most hourly
 * (invitations open and close by date; articles arrive daily); any other slug
 * is a 404.
 */
import type { Metadata } from "next";
import { NOINDEX } from "@/lib/seo/indexing";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FOOD_ROLE_LABEL, ORGANISATIONS, TOPIC_LABEL, orgBySlug, type Organisation, type Topic } from "@/data/conservation";
import { servesTier } from "@/lib/conservation/match";
import { countryLabel, ecoregionName, hubContinent, kmBetween, scopeLine } from "@/lib/conservation/geo-words";
import { KNOWN_PLACES } from "@/lib/geocode";
import { regionOf } from "@/lib/region";
import { getEcoregion } from "@/lib/ecoregions";
import { continentServed } from "@/lib/scope";
import { getCreature } from "@/lib/nature";
import { getSpecies } from "@/lib/species";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { SITE, shareCard } from "@/lib/site";
import type { Place } from "@/lib/types";
import { invitationsFor, toFeature } from "@/lib/conservation/invitations";
import { orgNews } from "@/lib/conservation/news";
import { OrgActions } from "@/components/conservation/OrgCard";
import { InvitationCard, InvitationFeature } from "@/components/conservation/InvitationFeature";
import { OrgNews } from "@/components/conservation/OrgNews";
import { DISCLOSURE } from "@/components/conservation/OrgsPanel";

type Params = { slug: string };

export function generateStaticParams() {
  return ORGANISATIONS.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

/** The address site.ts gives for the site (the OpenStreetMap user agent and the about page use it too). */
const EDITOR = "hello@guidetooutside.com";

const KIND_LABEL: Record<Organisation["kind"], string> = {
  charity: "Charity",
  agency: "Public body",
  network: "Network",
  programme: "Programme",
};

/** The pages on this site each subject belongs to. */
const TOPIC_PAGE: Record<Topic, { href: string; label: string }> = {
  water: { href: "/fishing", label: "Fishing and the waters" },
  fish: { href: "/wildlife#fish", label: "The fish, species by species" },
  birds: { href: "/learn/count", label: "Counting birds with children" },
  pollinators: { href: "/wildlife#pollinator", label: "Pollinators in the garden" },
  plants: { href: "/foraging", label: "Wild plants and foraging" },
  forests: { href: "/foraging", label: "Wild plants and foraging" },
  "soil-seeds": { href: "/gardening/seeds", label: "Seeds and seed saving" },
  wildlife: { href: "/wildlife", label: "Wildlife" },
  land: { href: "/regions", label: "The ecological regions" },
  ground: { href: "/ground/rocks", label: "Rocks and the ground" },
  youth: { href: "/learn", label: "Teaching outdoors at home" },
  food: { href: "/gardening", label: "Growing food" },
};

const VERIFIED_FMT = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function registryLabel(o: Organisation): string | null {
  const r = o.registry;
  if (!r) return null;
  if (/^(CRA|OSCR|Charity Commission|Charities Regulator)/.test(r.body)) return `Registered charity: ${r.body.replace(/ \(Ireland\)$/, "")} ${r.id}`;
  if (r.body === "IRS") return `Registered non-profit: IRS EIN ${r.id}`;
  return `Registered: ${r.body} ${r.id}`;
}

/** The pre-built towns inside the organisation's areas, nearest its centre first (none for a world or continent body). */
function whereTheyWork(o: Organisation): Place[] {
  const towns = (KNOWN_PLACES as Place[]).map((p) => ({ p, t: servesTier(o, p) })).filter((x) => x.t >= 1);
  if (!towns.length) return [];
  const geo = o.areas.find((a) => a.kind === "radius" || a.kind === "box");
  const placed = o.places?.map((s) => (KNOWN_PLACES as Place[]).find((p) => p.slug === s)).filter((p): p is Place => !!p) ?? [];
  const centre =
    geo?.kind === "radius"
      ? { lat: geo.lat, lon: geo.lon }
      : geo?.kind === "box"
        ? { lat: (geo.latMin + geo.latMax) / 2, lon: (geo.lonMin + geo.lonMax) / 2 }
        : placed.length
          ? { lat: placed.reduce((s, p) => s + p.lat, 0) / placed.length, lon: placed.reduce((s, p) => s + p.lon, 0) / placed.length }
          : { lat: towns.reduce((s, x) => s + x.p.lat, 0) / towns.length, lon: towns.reduce((s, x) => s + x.p.lon, 0) / towns.length };
  return towns
    .sort((a, b) => b.t - a.t || kmBetween(centre.lat, centre.lon, a.p.lat, a.p.lon) - kmBetween(centre.lat, centre.lon, b.p.lat, b.p.lon))
    .slice(0, 12)
    .map((x) => x.p);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const o = orgBySlug((await params).slug);
  if (!o) return {};
  const title = `${o.name}: how to help`;
  const description = o.blurb.length > 200 ? `${o.blurb.slice(0, 197).replace(/\s+\S*$/, "")}…` : o.blurb;
  // Organisation pages stay out of the index for now (see src/lib/seo/indexing.ts); the hub is indexed.
  return { title, description, alternates: { canonical: `/conservation/${o.slug}` }, robots: NOINDEX, ...shareCard(title, description, `/conservation/${o.slug}`) };
}

export default async function OrganisationPage({ params }: { params: Promise<Params> }) {
  const o = orgBySlug((await params).slug);
  if (!o) notFound();

  const scope = scopeLine(o);
  const invites = invitationsFor(null, { org: o.slug, anywhere: true }).map((m) => toFeature(m, { showWhere: true }));
  const news = await orgNews([o.slug], { limit: 3, perOrg: 3 });
  const towns = whereTheyWork(o);
  const species = (o.species ?? [])
    .map((s) => {
      const c = getCreature(s);
      if (c) return { href: `/wildlife/${s}`, label: c.name };
      const sp = getSpecies(s);
      return sp ? { href: `/foraging/${s}`, label: sp.name } : null;
    })
    .filter((x): x is { href: string; label: string } => !!x);
  const sections = [...new Map(o.topics.map((t) => [TOPIC_PAGE[t].href, TOPIC_PAGE[t]])).values()];
  const ecoSlugs = [
    ...new Set([
      ...o.areas.flatMap((a) => (a.kind === "ecoregion" ? a.ecoregions : [])),
      ...towns.slice(0, 6).map((p) => regionOf(p.lat, p.lon)?.slug as string | undefined),
    ]),
  ]
    // A region on a parked continent (src/lib/scope.ts) has no guide to link to.
    .filter((s): s is string => !!s && continentServed((getEcoregion(s) as { continent?: string } | undefined)?.continent));
  const registry = registryLabel(o);
  const cont = hubContinent(o);
  const crumbCountry = cont !== "international" && o.countryCode ? countryLabel(o.countryCode) : null;

  const url = `${SITE.url}/conservation/${o.slug}`;
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Conservation", "/conservation"],
      [o.name, `/conservation/${o.slug}`],
    ]),
    {
      "@type": o.kind === "agency" ? "GovernmentOrganization" : "NGO",
      "@id": `${url}#organization`,
      name: o.name,
      ...(o.shortName ? { alternateName: o.shortName } : {}),
      url: o.links.home,
      sameAs: [o.links.home, o.registry?.url].filter(Boolean),
      description: o.blurb,
      ...(o.founded ? { foundingDate: String(o.founded) } : {}),
      ...(o.countryCode ? { address: { "@type": "PostalAddress", addressCountry: o.countryCode } } : {}),
      ...(o.network ? { memberOf: { "@type": "Organization", name: o.network } } : {}),
      ...(o.registry ? { identifier: { "@type": "PropertyValue", propertyID: o.registry.body, value: o.registry.id } } : {}),
      mainEntityOfPage: url,
    },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-2" aria-label="Breadcrumb">
        <Link href="/conservation" className="hover:text-ink">
          Get involved
        </Link>
        <span aria-hidden="true">·</span>
        <Link href={crumbCountry ? `/conservation?country=${o.countryCode}#library` : "/conservation#library"} className="hover:text-ink">
          {crumbCountry ?? "International"}
        </Link>
      </nav>

      <div className="mt-5">
        <p className="eyebrow text-moss">{o.network ?? KIND_LABEL[o.kind]}</p>
        <h1 className="font-display mt-1 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{o.name}</h1>
        {scope && <p className="mt-3 max-w-3xl text-lg text-ink-2">{scope}</p>}
      </div>

      {invites.length > 0 && (
        <section className="mt-8" aria-labelledby="open-now">
          <h2 id="open-now" className="eyebrow text-moss">
            {invites.some((i) => i.window.state === "open") ? "Open now" : "Opening soon"} · {invites.length === 1 ? "one invitation" : `${invites.length} invitations`}
          </h2>
          {invites.length === 1 ? (
            <InvitationFeature inv={invites[0]} headingLevel="h2" className="mt-3" />
          ) : (
            <div className={`mt-3 grid gap-5 md:grid-cols-2 ${invites.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {invites.map((inv) => (
                <InvitationCard key={inv.slug} inv={inv} />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0">
          <p className="max-w-2xl text-lg leading-relaxed">{o.blurb}</p>

          {o.asks.length > 0 && (
            <section className="mt-8" aria-labelledby="how-to-help">
              <h2 id="how-to-help" className="font-display text-2xl font-semibold tracking-tight">
                How to help
              </h2>
              <ul className="mt-3 grid gap-2">
                {o.asks.map((a) => (
                  <li key={a} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="text-moss">
                      ·
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div className="mt-6 rounded-tile border border-line bg-moss-soft/70 px-5 py-4">
            <p className="eyebrow text-moss">Ways in, on their own site</p>
            {/* Its invitations are featured above, so the button here is its standing way in. */}
            <OrgActions org={o} size="lg" className="mt-3 [&>p]:text-base" />
          </div>
          {o.youthProgramme && (
            <p className="mt-4 text-sm text-ink-2">
              For young people: <span className="text-ink">{o.youthProgramme}</span>
              {o.links.youth ? (
                <>
                  {" "}
                  —{" "}
                  <a href={o.links.youth} target="_blank" rel="noopener noreferrer" className="text-moss underline-offset-2 hover:underline" data-gto-out="org" data-gto-org={o.slug} data-gto-way="youth">
                    their page
                  </a>
                </>
              ) : null}
              .
            </p>
          )}
        </div>

        <aside className="card min-w-0 p-5 text-sm sm:p-6">
          <dl className="grid gap-4">
            <div>
              <dt className="eyebrow">What it is</dt>
              <dd className="mt-1">
                {KIND_LABEL[o.kind]}
                {o.countryCode && cont !== "international" ? `, ${countryLabel(o.countryCode)}` : ""}
                {o.founded ? ` · founded ${o.founded}` : ""}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Works on</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {o.topics.map((t) => (
                  <Link key={t} href={`/conservation?topic=${t}#library`} className="rounded-full border border-edge bg-surface px-2.5 py-0.5 text-xs hover:border-moss hover:text-moss">
                    {TOPIC_LABEL[t]}
                  </Link>
                ))}
              </dd>
            </div>
            {!!o.foodRoles?.length && (
              <div>
                <dt className="eyebrow">Food and growing</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {o.foodRoles.map((r) => (
                    <Link key={r} href={`/conservation?topic=food&role=${r}#library`} className="rounded-full border border-edge bg-surface px-2.5 py-0.5 text-xs hover:border-moss hover:text-moss">
                      {FOOD_ROLE_LABEL[r]}
                    </Link>
                  ))}
                </dd>
              </div>
            )}
            <div>
              <dt className="eyebrow">The record</dt>
              <dd className="mt-1 grid gap-1 text-ink-2">
                {registry ? (
                  <span>
                    {o.registry?.url ? (
                      <a href={o.registry.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-moss hover:underline">
                        {registry}
                      </a>
                    ) : (
                      registry
                    )}
                  </span>
                ) : o.kind === "agency" ? (
                  <span>A public body; no charity registration.</span>
                ) : (
                  <span>Listed on its network&apos;s member list.</span>
                )}
                <span>Checked {VERIFIED_FMT.format(new Date(`${o.verified}T12:00:00Z`))}</span>
              </dd>
            </div>
          </dl>
          <p className="mt-5 border-t border-line/70 pt-4 text-xs leading-relaxed text-ink-2">{DISCLOSURE}</p>
          <p className="mt-3 text-xs">
            <a
              href={`mailto:${EDITOR}?subject=${encodeURIComponent(`Correction: ${o.name} (/conservation/${o.slug})`)}`}
              className="font-medium text-moss underline-offset-2 hover:underline"
            >
              Is this your organisation? Tell us what to correct
            </a>
          </p>
        </aside>
      </div>

      <OrgNews items={news} heading={`Latest from ${o.shortName ?? o.name}`} headingLevel="h2" eyebrow="From their own site" id="latest" className="mt-14" />

      {towns.length > 0 && (
        <section className="mt-14" aria-labelledby="where">
          <p className="eyebrow">Where they work</p>
          <h2 id="where" className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Towns in this guide inside their area
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {towns.map((p) => (
              <li key={p.slug}>
                <Link href={`/guide/${p.slug}`} className="inline-block rounded-full border border-edge bg-surface px-4 py-2 text-sm transition hover:border-moss hover:text-moss">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(species.length > 0 || sections.length > 0 || ecoSlugs.length > 0) && (
        <section className="mt-14" aria-labelledby="on-this-site">
          <p className="eyebrow">On this site</p>
          <h2 id="on-this-site" className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Where {o.shortName ?? o.name} fits in this guide
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {species.length > 0 && (
              <div className="min-w-0 border-t-2 border-ink pt-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">The species it works on</h3>
                <ul className="mt-3 grid gap-1.5">
                  {species.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="font-medium text-moss hover:underline">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sections.length > 0 && (
              <div className="min-w-0 border-t-2 border-ink pt-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Sections</h3>
                <ul className="mt-3 grid gap-1.5">
                  {sections.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="font-medium text-moss hover:underline">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ecoSlugs.length > 0 && (
              <div className="min-w-0 border-t-2 border-ink pt-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">Regional guides</h3>
                <ul className="mt-3 grid gap-1.5">
                  {ecoSlugs.slice(0, 8).map((e) => (
                    <li key={e}>
                      <Link href={`/regions/${e}`} className="font-medium text-moss hover:underline">
                        {ecoregionName(e)}
                      </Link>
                    </li>
                  ))}
                </ul>
                {ecoSlugs.length > 8 && <p className="mt-2 text-xs text-ink-2">and {ecoSlugs.length - 8} more regions</p>}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
