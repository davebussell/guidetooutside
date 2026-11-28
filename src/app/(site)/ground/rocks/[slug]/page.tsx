import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROCKS, ROCK_FAMILIES, SOIL_EFFECT, getRock, type Rock } from "@/lib/rocks";
import { SHARE_IMAGE, SITE } from "@/lib/site";
import { LocationSearch } from "@/components/LocationSearch";
import { RockUnderYou } from "@/components/here/LocalBits";
import { FamilyArt } from "@/components/rocks/FamilyArt";
import { SOIL_BADGE, phRange } from "@/components/rocks/rock-bits";

type Params = { slug: string };

/** When the rock pages were last checked against their sources. */
const REVIEWED = "2026-10-02";
const REVIEWED_LABEL = "October 2026";

export function generateStaticParams(): Params[] {
  return ROCKS.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const rock = getRock((await params).slug);
  if (!rock) return {};
  const title = `${rock.name} — what it is, how it forms and how to identify it`;
  const description = `${rock.name}: ${lowerFirst(rock.type)}. ${rock.tagline} Its grain, colour, hardness, streak and density, how it forms, where it's found and what it's used for.`;
  const path = `/ground/rocks/${rock.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [SHARE_IMAGE], type: "article" },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
  };
}

/** The quick facts, in the order the live page lists them. */
function facts(r: Rock): [string, string][] {
  return [
    ["What type of rock", r.type],
    ["What it's made of", r.madeOf],
    ["Grain size", r.grain],
    ["Colour", r.colour],
    ["Luster", r.luster],
    ["Streak", r.streak],
    ["Hardness", r.hardness],
    ["Density", r.density],
    ["Porosity", r.porosity],
    ["Does it fizz in acid?", r.acid],
    ["What it forms from", r.formsFrom],
    ["What it turns into", r.becomes],
    ...(r.howLong ? ([["How long it takes to form", r.howLong]] as [string, string][]) : []),
    ["Where in the world", r.world],
  ];
}

function jsonLd(r: Rock) {
  const url = `${SITE.url}/ground/rocks/${r.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Kinds of rock", item: `${SITE.url}/ground/rocks` },
          { "@type": "ListItem", position: 3, name: r.name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: r.name,
        description: r.what,
        mainEntityOfPage: url,
        articleSection: "Geology",
        dateModified: REVIEWED,
        citation: r.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
        publisher: { "@id": `${SITE.url}/#organization` },
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#questions`,
        mainEntity: r.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

/** /ground/rocks/<slug>: one kind of rock — how it forms, its facts, what it means above ground. */
export default async function RockPage({ params }: { params: Promise<Params> }) {
  const rock = getRock((await params).slug);
  if (!rock) notFound();
  const fam = ROCK_FAMILIES[rock.family];
  const lower = rock.name.toLowerCase();
  const panels: [string, string][] = [
    ["What it is", rock.what],
    ["How to know it", rock.identify],
    ["How it wears", rock.wears],
    ["What it means above ground", rock.above],
    ["Where you stand on it", rock.where],
    ["What lives on it", rock.lives],
    ["What it's used for", rock.uses],
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(rock)).replace(/</g, "\\u003c") }} />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <Link href="/ground" className="hover:text-ink">
          The ground
        </Link>
        <span>·</span>
        <Link href="/ground/rocks" className="hover:text-ink">
          Kinds of rock
        </Link>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-bark-soft px-2.5 py-1 text-xs font-semibold text-bark">{fam.label}</span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${SOIL_BADGE[rock.soilEffect].className}`}>Soil pH {phRange(rock)}</span>
          </div>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">{rock.name}</h1>
          <p className="mt-2 text-lg text-ink-2">{rock.tagline}</p>
          <div className="mt-4">
            <RockUnderYou here={rock.slug} />
          </div>
          <div className="mt-6 rounded-tile border-l-4 border-l-moss bg-paper-2 px-5 py-4">
            <p className="eyebrow text-bark">How it forms</p>
            <p className="mt-1 text-ink-2">{rock.forms}</p>
          </div>
        </div>
        <div className="card p-5">
          <p className="eyebrow">{fam.title}</p>
          <div className="mt-3 flex justify-center">
            <FamilyArt family={rock.family} />
          </div>
          <p className="mt-3 text-sm text-ink-2">{fam.blurb}</p>
        </div>
      </div>

      <div className="mt-10">
        <section className="card p-5 sm:p-7" aria-labelledby="quick-facts">
          <h2 id="quick-facts" className="eyebrow text-bark">
            {rock.name} facts
          </h2>
          <dl className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
            {facts(rock).map(([dt, dd]) => (
              <div key={dt} className="min-w-0 border-t border-line/70 pt-3">
                <dt className="text-[13px] font-semibold uppercase tracking-wide text-ink">{dt}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{dd}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>


      <dl className="mt-12 grid gap-6 sm:grid-cols-2">
        {panels.map(([dt, dd]) => (
          <div key={dt} className="card p-5">
            <dt className="eyebrow">{dt}</dt>
            <dd className="mt-1.5 text-ink-2">{dd}</dd>
          </div>
        ))}
        <div className="card p-5">
          <dt className="eyebrow text-bark">What it does to the soil</dt>
          <dd className="mt-1.5 text-ink-2">{SOIL_EFFECT[rock.soilEffect].sentence}</dd>
        </div>
      </dl>

      <div className="mt-12">
        <section aria-labelledby="questions" className="scroll-mt-24" id="questions-section">
          <h2 id="questions" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
            Questions people ask about {lower}
          </h2>
          <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:items-start">
            {rock.faqs.map((f, i) => (
              <details key={f.q} open={i < 3} className="group card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper-2 text-ink-2 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-12">
        <p className="eyebrow">Next to it in the cycle</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rock.next.map((n) => {
            const other = getRock(n.slug);
            return (
              <li key={n.slug} className="card p-5">
                <h2 className="font-display text-lg font-semibold leading-tight">
                  <Link href={`/ground/rocks/${n.slug}`} className="hover:text-moss">
                    {other?.name ?? n.slug}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-ink-2 first-letter:uppercase">{n.note}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 card p-6 sm:p-8">
        <p className="eyebrow text-bark">Is this what you&apos;re standing on?</p>
        <h2 className="font-display mt-1 text-2xl font-semibold">Find the rock under your town</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          Enter a town or postal code and we&apos;ll show you the rock beneath it and how old it is, the soil it makes, and the chain of rivers your water
          joins on the way to the sea.
        </p>
        <div className="mt-4 max-w-xl">
          <LocationSearch />
        </div>
      </section>

      <div className="mt-10">
        <section className="rounded-tile border border-line bg-paper-2/60 p-5 text-sm text-ink-2">
          <p className="font-semibold text-ink">
            Checked against these sources ·{" "}
            <time dateTime={REVIEWED}>last reviewed {REVIEWED_LABEL}</time>
          </p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {rock.sources.map((s) => (
              <li key={s.url} className="min-w-0">
                <a href={s.url} target="_blank" rel="noopener nofollow" className="break-words underline decoration-line underline-offset-2 hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-2">
            Figures like hardness and density are typical ranges for the rock as a whole — built from its minerals — and a particular outcrop can sit
            outside them.
          </p>
        </section>
      </div>

      <p className="mt-10 max-w-3xl text-xs text-ink-2">
        General descriptions of rock families. Any particular outcrop can differ — rocks grade into one another, and a geological map at this scale
        describes a district rather than a hillside.
      </p>

    </div>
  );
}
