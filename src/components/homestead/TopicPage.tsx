/**
 * A Homesteading topic page (/homesteading/laying-hens, /homesteading/rainwater
 * and so on), laid out like the species and wildlife pages: photograph and key
 * facts, the safety note where there is one, the facts at a glance, the
 * sections, breeds or the firewood table, the conservation story for the
 * topic (or the "who looks after this" panel, passed in as `orgs` by the
 * route, which knows the visitor's place), what to check and with whom, the
 * local numbers, more topics, and the sources.
 */
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, shareCard } from "@/lib/site";
import { TOPICS, getTopic, type HomesteadTopic } from "@/data/homestead/topics";
import { SOURCES, HOMESTEAD_REVIEWED } from "@/data/homestead/sources";
import { FIREWOOD } from "@/data/homestead/firewood";
import { continentServed } from "@/lib/scope";
import { homesteadImage } from "@/lib/homestead/images";
import { PhotoBy } from "./Credit";
import { BreedList, CheckBox, FirewoodTable, SourcesBox, TopicCard } from "./Blocks";
import { HomesteadLocal } from "./HomesteadLocal";

/**
 * A topic's description for the page's metadata. The wood-heat topic's own (src/data/homestead/topics.ts) counts the
 * firewood table's species on three continents, but the table lists the trees of the served continents only
 * (src/lib/scope.ts): while a continent is parked the description says what the table shows.
 */
function descriptionOf(t: HomesteadTopic): string {
  const woods = FIREWOOD.filter((w) => continentServed(w.region)).length;
  if (t.slug !== "wood-heat" || woods === FIREWOOD.length) return t.description;
  return `Heating with wood: drying firewood below 20 % moisture, heat in a stacked cubic metre for ${woods} species of North America, heating degree days, and carbon-monoxide and chimney-fire safety.`;
}

export function topicMetadata(slug: string): Metadata {
  const t = getTopic(slug);
  if (!t) return { title: "Not found" };
  const img = homesteadImage(t.image);
  const description = descriptionOf(t);
  const share = shareCard(t.seoTitle, description, `/homesteading/${t.slug}`);
  return {
    title: t.seoTitle,
    description,
    alternates: { canonical: `/homesteading/${t.slug}` },
    ...share,
    openGraph: { ...share.openGraph, type: "article", ...(img ? { images: [{ url: img.src, alt: img.alt }] } : {}) },
    twitter: { ...share.twitter, ...(img ? { images: [img.src] } : {}) },
  };
}

function jsonLd(t: HomesteadTopic) {
  const url = `${SITE.url}/homesteading/${t.slug}`;
  const img = homesteadImage(t.image);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Homesteading", item: `${SITE.url}/homesteading` },
          { "@type": "ListItem", position: 3, name: t.title, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: t.seoTitle,
        description: descriptionOf(t),
        mainEntityOfPage: url,
        ...(img ? { image: `${SITE.url}${img.src}` } : {}),
        articleSection: "Homesteading",
        dateModified: HOMESTEAD_REVIEWED,
        citation: t.sources.map((id) => ({ "@type": "CreativeWork", name: `${SOURCES[id].publisher} — ${SOURCES[id].title}`, url: SOURCES[id].url })),
        publisher: { "@id": `${SITE.url}/#organization` },
        isAccessibleForFree: true,
      },
    ],
  };
}

/** The three topics after this one, round the list. */
function moreTopics(t: HomesteadTopic): HomesteadTopic[] {
  const i = TOPICS.findIndex((x) => x.slug === t.slug);
  return [1, 2, 3].map((k) => TOPICS[(i + k) % TOPICS.length]);
}

export function TopicPage({ slug, orgs }: { slug: string; orgs?: React.ReactNode }) {
  const t = getTopic(slug);
  if (!t) notFound();
  const img = homesteadImage(t.image);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }} />
      <nav className="text-sm text-ink-2 flex flex-wrap items-center gap-2">
        <Link href="/homesteading" className="hover:text-ink">
          Homesteading
        </Link>
        <span>·</span>
        <Link href="/homesteading/calendar" className="hover:text-ink">
          Calendar
        </Link>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="card overflow-hidden">
          <div className="relative aspect-[4/3] bg-paper-2">
            {img && <Image src={img.src} alt={img.alt} fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />}
          </div>
          {img && <PhotoBy image={img} />}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-2">Homesteading</span>
            <span className="text-xs text-ink-2">·</span>
            <span className="text-xs font-semibold text-moss">{t.eyebrow}</span>
          </div>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">{t.title}</h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">{t.lede}</p>
          <dl className="mt-6 grid gap-5">
            {t.facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-1 text-ink-2">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {t.safety && (
        <section className="mt-10 rounded-tile bg-rust-soft p-6 sm:p-8 max-w-4xl">
          <h2 className="font-display text-xl font-semibold text-rust">{t.safety.title}</h2>
          <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
            {t.safety.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <section className="card p-5 sm:p-7" aria-labelledby="quick-facts">
          <h2 id="quick-facts" className="eyebrow text-moss">
            {t.title} at a glance
          </h2>
          <dl className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
            {t.glance.map((g) => (
              <div key={g.label} className="min-w-0 border-t border-line/70 pt-3">
                <dt className="text-[13px] font-semibold uppercase tracking-wide text-ink">{g.label}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{g.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-10 content-start">
          {t.sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.list && (
                  <ul className="grid gap-1.5 border-t border-line/70 pt-3">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-2">
                        <span aria-hidden="true" className="text-ink-2">
                          –
                        </span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {t.slug === "food-storage" && s.id === "preserving" && (
                  <div className="not-prose grid gap-3 pt-1 sm:grid-cols-2">
                    <Link href="/gardening/preserving" className="card group p-5 transition hover:border-moss">
                      <p className="eyebrow text-moss">Preserving</p>
                      <p className="font-display mt-1 text-lg font-semibold text-ink group-hover:text-moss">Methods, safety and tested recipes →</p>
                    </Link>
                    <Link href="/gardening/crops" className="card group p-5 transition hover:border-moss">
                      <p className="eyebrow text-moss">Crops</p>
                      <p className="font-display mt-1 text-lg font-semibold text-ink group-hover:text-moss">Harvest, storage and preserving by crop →</p>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <aside className="grid gap-6 content-start">
          <section className="card p-5">
            <p className="eyebrow text-moss">In your area</p>
            <p className="font-display mt-1 text-lg font-semibold">Worked out for your town</p>
            <p className="mt-1 text-sm text-ink-2">{t.local}</p>
            <div className="mt-4">
              <HomesteadLocal note={t.local} anchor={t.panel} />
            </div>
          </section>
          <section className="card p-5">
            <p className="eyebrow">The homestead year</p>
            <p className="font-display mt-1 text-lg font-semibold">Tasks by climate signal</p>
            <p className="mt-1 text-sm text-ink-2">What to do as the days shorten, before the first frost, when nights freeze and ahead of the rains, wherever you are.</p>
            <Link href="/homesteading/calendar" className="mt-3 inline-block text-sm font-medium text-moss hover:underline">
              The homestead calendar →
            </Link>
          </section>
        </aside>
      </div>

      {t.breeds && (
        <section id="breeds" className="mt-14 scroll-mt-24">
          <p className="eyebrow text-moss">Breeds</p>
          <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Breeds and the climate they suit</h2>
          <p className="mt-2 max-w-3xl text-ink-2">
            Cold-hardy and heat-tolerant are marked only where the breed&apos;s source says so; no mark means the source is silent, not that the breed copes badly.
          </p>
          <div className="mt-5 max-w-4xl">
            <BreedList animal={t.breeds} heading={false} />
          </div>
        </section>
      )}

      {t.slug === "wood-heat" && (
        <section id="species" className="mt-14 scroll-mt-24">
          <p className="eyebrow text-moss">Firewood</p>
          <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Heat in a stacked cubic metre, by species</h2>
          <p className="mt-2 max-w-3xl text-ink-2">
            Net heat at 20 % water content: kilowatt-hours in a stacked cubic metre (a stere) and millions of BTU in a cord. Bars in red are broadleaved trees, in green conifers. Worked out from each species&apos; basic density in the Global Wood
            Density Database by the Bavarian State Institute of Forestry&apos;s method; a real stack varies with how tightly it is stacked and how dry it is.
          </p>
          <div className="mt-6">
            <FirewoodTable />
          </div>
        </section>
      )}

      {orgs && <div className="mt-14">{orgs}</div>}

      <div className="mt-14 max-w-4xl">
        <CheckBox items={t.check} />
      </div>

      <section className="mt-14">
        <p className="eyebrow">Also in Homesteading</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moreTopics(t).map((m) => (
            <TopicCard key={m.slug} topic={m} />
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <SourcesBox
          ids={t.sources}
          note="Figures are given as their sources give them, converted to metric where needed. Where sources disagree, both are shown."
        />
      </div>
      <p className="mt-10 text-xs text-ink-2 max-w-3xl">
        Educational information only. This guide gives no veterinary or medical advice: call a vet about a sick animal and a doctor about a sting or a burn. Rules on keeping animals, collecting water and burning wood are set locally; check them before you start.
      </p>
    </div>
  );
}
