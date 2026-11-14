/**
 * A wild edible's page, /foraging/<species>: the photograph and the
 * library entry (season, habitat, identification, the look-alike, use and
 * caution), the facts panel, the spot-the-danger pair where there is one,
 * questions people ask, the medicinal record where there is one, videos, the
 * regions and zones it grows in, a place search, what else is in season this
 * month, and the sources it was checked against.
 *
 * Rendered by /foraging/[slug] for a species slug, which also takes the page
 * metadata from speciesMetadata(slug).
 */
import type { ComponentType } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, SHARE_IMAGE } from "@/lib/site";
import { continentServed } from "@/lib/scope";
import { alsoInSeason, continentOfRegion, getSpecies, monthName, monthRange, type Species } from "@/lib/species";
import { speciesImage } from "@/lib/species-images";
import { SERVED_ECOREGIONS as ECOREGIONS, getEcoregion } from "@/lib/ecoregions";
import { homeRegion, servedRegionsFirst, servedText } from "./served-text";
import { EDIBLE_FACTS, FACTS_REVIEWED, type EdibleFacts } from "@/data/edible-facts";
import { getMedicinal } from "@/data/medicinal";
import { SPECIES_VIDEOS, type Video } from "@/data/videos";
import { SpeciesCard } from "@/components/NatureCard";
import { RegionPick } from "@/components/RegionPick";
import { SpeciesVideos as RestoredSpeciesVideos } from "@/components/SpeciesVideos";
import { LocalAnswer, NearYouLine, RegionChips } from "@/components/here/LocalBits";
import { ZoneRange } from "@/components/here/ZoneHere";
import { SpotTheDanger as RestoredSpotTheDanger } from "@/components/toys/SpotTheDanger";
import { ToySection } from "@/components/foraging/ToySection";
import { PlaceSearchCard } from "@/components/foraging/PlaceSearchCard";
import { MedicinalPanel } from "@/components/foraging/Medicinal";

// Restored client modules, typed with the props they take.
const SpotTheDanger = RestoredSpotTheDanger as ComponentType<{ start?: string; only?: string[] }>;
const SpeciesVideos = RestoredSpeciesVideos as ComponentType<{ kind: "forage" | "fish" | "garden"; name: string; videos: Video[]; heading?: string }>;

/** The species with a pair in the spot-the-danger game (its pair ids are species slugs). */
const DANGER_PAIRS = new Set(["wild-fennel", "wild-grape", "ramps", "fiddleheads", "elderflower", "morel", "chanterelle", "rose-hips"]);

const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** The name a question is asked about: without its bracketed alternative, lower case ("ramps"). */
const plainName = (name: string) => name.replace(/\s*\(.*?\)/g, "").trim().toLowerCase();

const pageTitle = (s: Species) =>
  s.deadlyDouble ? `${s.name} — how to identify, when to pick, and the dangerous look-alike` : `${s.name} — how to identify and when to pick`;

const pageDescription = (s: Species) =>
  `${s.name} (${s.latin}): when it's ready, where it grows, how to identify it, the look-alikes to know and which parts are used. Part of the Guide to Outside foraging guide.`;

/** The species as its own page shows it: with its text for the served continent (servedText). */
function speciesForPage(slug: string): Species | undefined {
  const s = getSpecies(slug);
  return s && servedText(s);
}

export function speciesMetadata(slug: string): Metadata {
  const s = speciesForPage(slug);
  if (!s) return { title: "Not found" };
  const title = pageTitle(s);
  const description = pageDescription(s);
  const photo = speciesImage(slug);
  return {
    title,
    description,
    alternates: { canonical: `/foraging/${slug}` },
    openGraph: { title, description, images: [photo ? photo.src : SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}

/** Breadcrumbs, the article (with its sources) and the questions, for search engines. */
function jsonLd(s: Species, facts: EdibleFacts | undefined, hasPhoto: boolean) {
  const url = `${SITE.url}/foraging/${s.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Foraging", item: `${SITE.url}/foraging` },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: `${s.name} — how to identify and when to pick`,
        description: `${s.name} (${s.latin}): season, habitat, identification features and dangerous look-alikes.`,
        mainEntityOfPage: url,
        ...(hasPhoto ? { image: `${SITE.url}/species/${s.slug}.webp` } : {}),
        articleSection: "Foraging",
        dateModified: FACTS_REVIEWED.iso,
        citation: (facts?.sources ?? []).map((c) => ({ "@type": "CreativeWork", name: c.label, url: c.url })),
        publisher: { "@id": `${SITE.url}/#organization` },
        isAccessibleForFree: true,
      },
      ...(facts?.faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#questions`,
              mainEntity: facts.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ]
        : []),
    ],
  };
}

/** "When": the typical months, and which way they move across the range. */
function whenText(s: Species): string {
  if (s.months.length >= 12) return "All year, though what is worth picking changes with the rains and the seasons.";
  const northAmerican = s.regions === "all" || continentOfRegion(homeRegion(s) ?? s.regions[0]) === "north-america";
  const shift = northAmerican ? "Earlier in the south, later in the north." : "Earlier in warm, low country; later in the hills.";
  return `Typically ${monthRange(s.months)} — ${s.months.map(monthName).join(", ")}. ${shift}`;
}

/** True when the photograph shows a related taxon rather than the species itself (or a form of it). */
function closeRelative(s: Species, taxon?: string): boolean {
  if (!taxon) return false;
  const base = s.latin.replace(/\s+spp\.?$/, "");
  return !taxon.startsWith(base);
}

function Hero({ s, month }: { s: Species; month: number }) {
  const photo = speciesImage(s.slug);
  const inSeason = s.months.includes(month);
  return (
    <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="card overflow-hidden">
        <div className="relative aspect-[4/3] bg-paper-2">
          {photo ? (
            <Image src={photo.src} alt={`${s.name} (${s.latin})`} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-ink-2">No photograph yet</div>
          )}
        </div>
        {photo && (
          <p className="px-4 py-3 font-display text-[13px] italic text-ink-2">
            Photo by{" "}
            <a href={photo.source} target="_blank" rel="noopener nofollow" className="underline">
              {photo.author}
            </a>{" "}
            on iNaturalist ·{" "}
            <a href={photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
              {photo.license}
            </a>
            {closeRelative(s, photo.taxon) ? ` · photographed specimen identified as ${photo.taxon}, a close relative` : ""}
          </p>
        )}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-2">{capital(s.kind)}</span>
          <span className="text-xs text-ink-2">·</span>
          <span className={`text-xs font-semibold ${inSeason ? "text-moss" : "text-ink-2"}`}>
            {inSeason ? `In season (${monthName(month)})` : `Season: ${monthRange(s.months)}`}
          </span>
        </div>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">{s.name}</h1>
        <p className="mt-1 text-lg italic text-ink-2">{s.latin}</p>
        <NearYouLine regions={s.regions} months={s.months} section="foraging" verb="in season" />
        {s.deadlyDouble && (
          <div className="mt-5 rounded-tile bg-rust-soft p-4">
            <p className="font-semibold text-rust">Poisonous look-alike</p>
            <p className="mt-1 text-sm text-ink-2">{s.lookalikes}</p>
          </div>
        )}
        <dl className="mt-6 grid gap-5">
          <Entry label="When" text={whenText(s)} />
          <Entry label="Where it grows" text={s.habitat} />
          <Entry label="Identification" text={s.identify} />
          {!s.deadlyDouble && <Entry label="Look-alikes" text={s.lookalikes} />}
          <Entry label="Harvest and use" text={s.use} />
          {s.caution && <Entry label="Caution" text={s.caution} warn />}
        </dl>
      </div>
    </div>
  );
}

function Entry({ label, text, warn }: { label: string; text: string; warn?: boolean }) {
  return (
    <div>
      <dt className={warn ? "eyebrow text-rust" : "eyebrow"}>{label}</dt>
      <dd className="mt-1 text-ink-2">{text}</dd>
    </div>
  );
}

/** "<name> at a glance". */
function QuickFacts({ s, f }: { s: Species; f: EdibleFacts }) {
  const rows: [string, string | undefined][] = [
    ["Also called", f.otherNames],
    ["Family", f.family],
    ["Where it grows", f.range],
    ["When to pick", f.whenToPick],
    ["Parts used", f.partsUsed],
    ["Is any of it poisonous?", f.poisonous],
    ["More look-alikes to know", f.moreLookalikes],
  ];
  return (
    <div className="mt-12">
      <section className="card p-5 sm:p-7" aria-labelledby="quick-facts">
        <h2 id="quick-facts" className="eyebrow text-moss">
          {s.name} at a glance
        </h2>
        <dl className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {rows
            .filter((r): r is [string, string] => !!r[1])
            .map(([label, text]) => (
              <div key={label} className="min-w-0 border-t border-line/70 pt-3">
                <dt className="text-[13px] font-semibold uppercase tracking-wide text-ink">{label}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{text}</dd>
              </div>
            ))}
        </dl>
      </section>
    </div>
  );
}

/** "Questions people ask about <name>": the first three open. */
function Questions({ s, f }: { s: Species; f: EdibleFacts }) {
  return (
    <div className="mt-12">
      <section aria-labelledby="questions" className="scroll-mt-24" id="questions-section">
        <h2 id="questions" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
          {"Questions people ask about "}
          {plainName(s.name)}
        </h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:items-start">
          {f.faqs.map((q, i) => (
            <details key={q.q} open={i < 3} className="group card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">{q.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper-2 text-ink-2 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{q.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

/** "Checked against these sources · last reviewed …". */
function Sources({ f }: { f: EdibleFacts }) {
  return (
    <div className="mt-10">
      <section className="rounded-tile border border-line bg-paper-2/60 p-5 text-sm text-ink-2">
        <p className="font-semibold text-ink">
          {"Checked against these sources · "}
          <time dateTime={FACTS_REVIEWED.iso}>
            {"last reviewed "}
            {FACTS_REVIEWED.label}
          </time>
        </p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {f.sources.map((c) => (
            <li key={c.url} className="min-w-0">
              <a
                href={c.url}
                target="_blank"
                rel="noopener nofollow"
                className="break-words underline decoration-line underline-offset-2 hover:text-ink"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-2">Seasons are typical for the middle of the range and move by weeks north and south, and up and down hills.</p>
      </section>
    </div>
  );
}

type Region = { slug: string; name: string };

/** `orgs` is the "who looks after the wild plants" panel, which the route renders from the visitor's place. */
export function SpeciesPage({ slug, orgs }: { slug: string; orgs?: React.ReactNode }) {
  const s = speciesForPage(slug);
  if (!s) notFound();
  const month = new Date().getMonth() + 1;
  const facts = EDIBLE_FACTS[slug];
  const medicinal = getMedicinal(slug);
  const regions: Region[] =
    s.regions === "all"
      ? (ECOREGIONS as Region[]).map((r) => ({ slug: r.slug, name: r.name }))
      : // A region on a parked continent has no page to link to.
        s.regions.filter((r) => continentServed(continentOfRegion(r))).map((r) => ({ slug: r, name: (getEcoregion(r) as Region | undefined)?.name ?? r }));
  const also = alsoInSeason(servedRegionsFirst(s), month).map(servedText);
  const ld = jsonLd(s, facts, !!speciesImage(slug));
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="text-sm text-ink-2 flex flex-wrap items-center gap-2">
        <Link href="/foraging" className="hover:text-ink">
          Foraging
        </Link>
        <span>·</span>
        <Link href="/foraging/calendar" className="hover:text-ink">
          Calendar
        </Link>
      </nav>
      <Hero s={s} month={month} />
      {facts && <QuickFacts s={s} f={facts} />}
      {DANGER_PAIRS.has(slug) && (
        <div className="mt-10">
          <ToySection
            id="spot-the-danger"
            title="Edible and poisonous look-alike compared"
            text="The edible species and its poisonous look-alike side by side. Smell, cut or look closer, then select the feature that separates them. Confirm any identification with a regional field guide or an expert."
          >
            <SpotTheDanger start={slug} />
          </ToySection>
        </div>
      )}
      {facts && facts.faqs.length > 0 && <Questions s={s} f={facts} />}
      {medicinal && <MedicinalPanel plant={medicinal} name={s.name} />}
      <SpeciesVideos kind="forage" name={s.name} videos={SPECIES_VIDEOS[slug] ?? []} />
      <section className="mt-12">
        <p className="eyebrow">Found in these regions</p>
        <RegionChips regions={regions} />
        {s.zones && (
          <p className="mt-2 text-sm text-ink-2">
            <ZoneRange min={s.zones[0]} max={s.zones[1]} />
          </p>
        )}
      </section>
      {orgs && <div className="mt-12">{orgs}</div>}
      <LocalAnswer section="foraging">
        <PlaceSearchCard
          eyebrow="Local season"
          title="This week's foraging guide for a place"
          text="Enter a town or postal code for what is in season there this week, based on the local climate, this week's weather and the ecological region."
        />
      </LocalAnswer>
      <RegionPick
        className="mt-12"
        limit={3}
        title={`Also in season in ${monthName(month)}`}
        items={also.map((o) => ({ key: o.slug, regions: o.regions, node: <SpeciesCard key={o.slug} species={o} priority={false} /> }))}
      />
      {facts && <Sources f={facts} />}
      <p className="mt-10 text-xs text-ink-2 max-w-3xl">
        Educational information only. Never eat a wild plant or mushroom identified from a single photograph or description — confirm with a regional field guide or an
        experienced forager, and know the poisonous species in your area first.
      </p>
    </div>
  );
}
