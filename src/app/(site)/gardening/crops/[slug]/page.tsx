import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_CROPS, CROPS, getCrop, GROUP_LABEL, HARDINESS, METHODS, recipesFor, SEED_KIND } from "@/lib/crops";
import { cropImage } from "@/lib/crop-images";
import { monthName } from "@/lib/species";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { SHARE_IMAGE, SITE } from "@/lib/site";
import { CropCard, CropCredit, RecipeCard } from "@/components/garden/CropCard";
import { FrostHere, SowHere } from "@/components/here/GardenHere";
import { LocalAnswer } from "@/components/here/LocalBits";
import { LocationSearch } from "@/components/LocationSearch";
import { CropFaqs } from "@/components/crops/CropFaqs";
import { faqLd } from "@/components/crops/FaqList";
import { SourcesBox } from "@/components/crops/SourcesBox";

type Params = { slug: string };

export function generateStaticParams() {
  return ALL_CROPS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getCrop((await params).slug);
  if (!c) return {};
  const title = `${c.name} — when to pick, how to store, and how to put them up`;
  const description = `${c.name} (${c.latin}): the signs they’re ready, how they take a frost, where they keep and for how long, the ways to can, freeze, dry or pickle them, and whether the seed is worth saving.`;
  const img = cropImage(c.slug);
  return {
    title,
    description,
    alternates: { canonical: `/gardening/crops/${c.slug}` },
    openGraph: { title, description, ...(img ? { images: [img.src] } : {}) },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

const fahrenheit = (c: number) => Math.round((c * 9) / 5 + 32);
const lowerFirst = (s: string) => s.toLowerCase();

export default async function CropPage({ params }: { params: Promise<Params> }) {
  const crop = getCrop((await params).slug);
  if (!crop) notFound();
  const img = cropImage(crop.slug);
  const h = HARDINESS[crop.hardiness];
  const lower = crop.name.toLowerCase();
  const recipes = recipesFor(crop.slug);
  const also = CROPS.filter((c) => c.group === crop.group && c.slug !== crop.slug).slice(0, 3);
  const months = crop.harvestMonths;
  const path = `/gardening/crops/${crop.slug}`;
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Gardening", "/gardening"],
      ["Crops", "/gardening/crops"],
      [crop.name, path],
    ]),
    {
      "@type": "Article",
      headline: `${crop.name} — when to pick, how to store, how to put up`,
      description: `${crop.name} (${crop.latin}): harvest signs, frost hardiness, storage, preserving methods and seed saving.`,
      mainEntityOfPage: `${SITE.url}${path}`,
      ...(img ? { image: `${SITE.url}${img.src}` } : {}),
      articleSection: "Gardening",
      dateModified: "2026-10-02",
      citation: crop.sources.map((s) => ({
        "@type": "CreativeWork",
        name: s.label,
        url: s.url,
      })),
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
    faqLd(path, crop.faqs),
  ]);
  const facts: [string, string][] = [
    ["Botanical name", crop.latin],
    ["Group", GROUP_LABEL[crop.group]],
    ["Picked", months.map(monthName).join(", ")],
    ["Frost", `${h.label}: ${lowerFirst(h.short)}.`],
    ["Best put up as", crop.preserve.map((m) => METHODS[m].name.toLowerCase()).join(", ") || "eaten fresh"],
    ["Seed", SEED_KIND[crop.seeds.kind].label],
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <Link href="/gardening" className="hover:text-ink">
          Gardening
        </Link>
        <span>·</span>
        <Link href="/gardening/crops" className="hover:text-ink">
          Crops
        </Link>
        <span>·</span>
        <Link href="/gardening/preserving" className="hover:text-ink">
          Preserving
        </Link>
      </nav>
      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="card overflow-hidden">
          <div className="relative aspect-[4/3] bg-paper-2">
            {img && <Image src={img.src} alt={crop.name} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" priority />}
          </div>
          {img && <CropCredit img={img} className="px-4 py-3" />}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-2">{GROUP_LABEL[crop.group]}</span>
            <span className="text-xs text-ink-2">·</span>
            <span className="text-xs text-ink-2">
              Harvest {monthName(months[0])} – {monthName(months[months.length - 1])}
            </span>
            <span className="text-xs text-ink-2">·</span>
            <span className="text-xs text-ink-2" title={h.short}>
              {h.label} · {lowerFirst(h.short)}
            </span>
          </div>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{crop.name}</h1>
          <p className="mt-1 text-lg italic text-ink-2">{crop.latin}</p>
          <p className="mt-3 text-lg text-ink">{crop.tagline}</p>
          <FrostHere
            crop={{
              slug: crop.slug,
              name: crop.name,
              hardiness: crop.hardiness,
              harvestMonths: crop.harvestMonths,
              frostLimits: crop.frostLimits,
            }}
          />
          <dl className="mt-6 grid gap-5">
            <div>
              <dt className="eyebrow">Signs of ripeness</dt>
              <dd className="mt-1 text-ink-2">{crop.ready}</dd>
            </div>
            <div>
              <dt className="eyebrow">Harvesting</dt>
              <dd className="mt-1 text-ink-2">{crop.pick}</dd>
            </div>
            {crop.cure && (
              <div>
                <dt className="eyebrow">Curing</dt>
                <dd className="mt-1 text-ink-2">{crop.cure}</dd>
              </div>
            )}
            <div>
              <dt className="eyebrow text-azure">Frost tolerance</dt>
              <dd className="mt-1 text-ink-2">{crop.frostNote}</dd>
            </div>
          </dl>
        </div>
      </div>
      <section id="store" className="mt-12 scroll-mt-24">
        <p className="eyebrow text-moss">Storage</p>
        <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Storing {lower}</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2 pr-4 font-semibold">Where</th>
                <th className="py-2 pr-4 font-semibold">Temperature</th>
                <th className="py-2 pr-4 font-semibold">Humidity</th>
                <th className="py-2 pr-4 font-semibold">Keeps</th>
                <th className="py-2 font-semibold">How</th>
              </tr>
            </thead>
            <tbody>
              {crop.store.map((s) => (
                <tr key={s.where} className="border-b border-line/60 align-top">
                  <td className="py-3 pr-4 font-semibold text-ink">{s.where}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    {s.tempC[0]}–{s.tempC[1]} °C
                    <span className="block text-xs text-ink-2">
                      {fahrenheit(s.tempC[0])}–{fahrenheit(s.tempC[1])} °F
                    </span>
                  </td>
                  <td className="py-3 pr-4 capitalize">{s.humidity}</td>
                  <td className="py-3 pr-4">{s.keeps}</td>
                  <td className="py-3 text-ink-2">{s.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="put-up" className="mt-12 scroll-mt-24">
        <p className="eyebrow text-gold">Preserving</p>
        <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Preserving {lower}</h2>
        <p className="mt-3 max-w-3xl text-ink-2">{crop.preserveNote}</p>
        {crop.preserve.length > 0 && (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {crop.preserve.map((k) => {
              const own = recipes.filter((r) => r.method === k);
              return (
                <li key={k} className="card p-4">
                  <p className="font-display text-lg font-semibold">
                    <Link href={`/gardening/preserving#${k}`} className="hover:text-moss">
                      {METHODS[k].name}
                    </Link>
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{METHODS[k].short}</p>
                  {own.length > 0 && (
                    <ul className="mt-2 grid gap-1">
                      {own.map((r) => (
                        <li key={r.slug}>
                          <Link href={`/gardening/recipes/${r.slug}`} className="text-sm font-medium text-moss hover:underline">
                            {r.title}
                            {" →"}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {recipes.length > 0 && (
          <div className="mt-6">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div id="seeds" className="card scroll-mt-24 p-6">
          <p className="eyebrow text-moss">Seed saving</p>
          <h2 className="font-display mt-1 text-2xl font-semibold">{SEED_KIND[crop.seeds.kind].label}</h2>
          <p className="mt-3 text-ink-2">{crop.seeds.how}</p>
          <p className="mt-3 text-sm text-ink">
            <span className="font-semibold">Keeps:</span> {crop.seeds.viability}
          </p>
          <Link href="/gardening/seeds" className="mt-3 inline-block text-sm font-medium text-moss hover:underline">
            Seed saving →
          </Link>
        </div>
        <div id="next-year" className="card scroll-mt-24 p-6">
          <p className="eyebrow text-moss">Next year</p>
          <h2 className="font-display mt-1 text-2xl font-semibold">Planning {lower} for next season</h2>
          <p className="mt-3 text-ink-2">{crop.nextYear}</p>
          <SowHere sow={crop.sow} name={crop.name} />
        </div>
      </section>
      <div className="mt-12">
        <section className="card p-5 sm:p-7" aria-labelledby="quick-facts">
          <h2 id="quick-facts" className="eyebrow text-moss">
            {crop.name} at a glance
          </h2>
          <dl className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="min-w-0 border-t border-line/70 pt-3">
                <dt className="text-[13px] font-semibold uppercase tracking-wide text-ink">{k}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <div className="mt-12">
        <CropFaqs title={<>Questions people ask about {lower}</>} faqs={crop.faqs} />
      </div>
      <LocalAnswer section="gardening">
        <section className="card mt-12 p-6 sm:p-8">
          <p className="eyebrow text-moss">Local frost dates</p>
          <h2 className="font-display mt-1 text-2xl font-semibold">Harvest timing for a place</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-2">
            Enter a town or postal code to build the garden year, the frost forecast and this week’s guide from local weather.
          </p>
          <div className="mt-4 max-w-xl">
            <LocationSearch />
          </div>
        </section>
      </LocalAnswer>
      {also.length > 0 && (
        <section className="mt-12">
          <p className="eyebrow">Also in {GROUP_LABEL[crop.group].toLowerCase()}</p>
          <div className="mt-4">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {also.map((c, i) => (
                <CropCard key={c.slug} crop={c} priority={i < 3} />
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="mt-10">
        <SourcesBox
          sources={crop.sources}
          note="Harvest months are typical for zones 4–6 and shift by weeks north and south. Storage figures assume ideal conditions; without a cold store, expect the shorter end of each range."
        />
      </div>
    </div>
  );
}
