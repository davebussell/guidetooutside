import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCrop, getRecipe, METHODS, RECIPES, recipesFor } from "@/lib/crops";
import { cropImage } from "@/lib/crop-images";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { SHARE_IMAGE, SITE } from "@/lib/site";
import { CropCredit, RecipeCard } from "@/components/garden/CropCard";

type Params = { slug: string };

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = getRecipe((await params).slug);
  if (!r) return {};
  const title = `${r.title} — a tested home-preserving recipe`;
  const description = `${r.tagline} ${r.makes}. ${r.process ? "Processing time, headspace and altitude adjustments" : "Method and safety notes"} from ${r.source.label}.`;
  const img = cropImage(r.crop);
  return {
    title,
    description,
    alternates: { canonical: `/gardening/recipes/${r.slug}` },
    openGraph: { title, description, ...(img ? { images: [img.src] } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}

export default async function RecipePage({ params }: { params: Promise<Params> }) {
  const r = getRecipe((await params).slug);
  if (!r) notFound();
  const crop = getCrop(r.crop)!;
  const m = METHODS[r.method];
  const img = cropImage(r.crop);
  const crops = [r.crop, ...(r.also ?? [])];
  const more = recipesFor(r.crop)
    .filter((x) => x.slug !== r.slug)
    .slice(0, 3);
  const path = `/gardening/recipes/${r.slug}`;
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Gardening", "/gardening"],
      ["Putting up", "/gardening/preserving"],
      [r.title, path],
    ]),
    {
      "@type": "Recipe",
      name: r.title,
      description: r.tagline,
      mainEntityOfPage: `${SITE.url}${path}`,
      ...(img ? { image: `${SITE.url}${img.src}` } : {}),
      recipeIngredient: r.ingredients,
      recipeInstructions: r.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
      recipeYield: r.makes,
      recipeCategory: m.name,
      recipeCuisine: "Home preserving",
      keywords: [m.name.toLowerCase(), ...crops, "home preserving", "harvest"].join(", "),
      citation: { "@type": "CreativeWork", name: r.source.label, url: r.source.url },
      dateModified: "2026-10-02",
      author: { "@id": `${SITE.url}/#organization` },
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
  ]);
  const source = (
    <a href={r.source.url} target="_blank" rel="noopener" className="underline">
      {r.source.label}
    </a>
  );
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <Link href="/gardening" className="hover:text-ink">
          Gardening
        </Link>
        <span>·</span>
        <Link href="/gardening/preserving" className="hover:text-ink">
          Preserving
        </Link>
        <span>·</span>
        <Link href={`/gardening/crops/${crop.slug}`} className="hover:text-ink">
          {crop.name}
        </Link>
      </nav>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gold">{m.name}</span>
        {crops.map((s) => (
          <Link key={s} href={`/gardening/crops/${s}`} className="text-xs font-semibold uppercase tracking-wide text-ink-2 hover:text-moss">
            {getCrop(s)?.name ?? s}
          </Link>
        ))}
      </div>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{r.title}</h1>
      <p className="mt-3 text-lg text-ink">{r.tagline}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Makes", r.makes],
          ["Active time", r.active],
          ["Total", r.total],
        ].map(([k, v]) => (
          <div key={k} className="card px-4 py-3">
            <p className="eyebrow">{k}</p>
            <p className="font-display mt-0.5 text-lg font-semibold leading-tight">{v}</p>
          </div>
        ))}
      </div>
      {img && (
        <figure className="card mt-6 overflow-hidden">
          <div className="relative aspect-[2/1] bg-paper-2">
            <Image src={img.src} alt={crop.name} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
          </div>
          <CropCredit img={img} className="px-4 py-2.5" />
        </figure>
      )}
      <section className="mt-8 rounded-tile bg-rust-soft p-5 sm:p-6">
        <p className="eyebrow text-rust">Before you start</p>
        <h2 className="font-display mt-1 text-xl font-semibold">{r.process ? "Safety requirements" : "Key points"}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink">
          {r.safety.map((s) => (
            <li key={s} className="flex gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rust" aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-2">
          This follows {source}. Quantities, acid and times are theirs; do not scale the vegetables without scaling everything, and do not change the vinegar, lemon juice or
          processing time.
        </p>
      </section>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <section>
          <h2 className="font-display text-2xl font-semibold">Ingredients</h2>
          <ul className="mt-3 grid gap-2 text-[15px] leading-snug">
            {r.ingredients.map((s) => (
              <li key={s} className="flex gap-2.5">
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-moss" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          {r.process && (
            <div className="card mt-6 p-4">
              <p className="eyebrow text-gold">Processing</p>
              <dl className="mt-2 grid gap-1.5 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Jars</dt>
                  <dd className="text-ink-2">{r.process.jars}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Headspace</dt>
                  <dd className="text-ink-2">{r.process.headspace}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Time at 0–300 m (0–1,000 ft)</dt>
                  <dd className="text-ink-2">
                    <span className="font-display text-2xl font-semibold text-ink">{r.process.minutes} min</span>
                    {r.process.note ? ` ${r.process.note}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Above 300 m</dt>
                  <dd className="text-ink-2">{r.process.altitude}</dd>
                </div>
              </dl>
              <Link href="/gardening/preserving#altitude" className="mt-2 inline-block text-xs font-medium text-moss hover:underline">
                Why altitude changes the time →
              </Link>
            </div>
          )}
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Method</h2>
          <ol className="mt-3 grid gap-4">
            {r.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-moss text-sm font-bold text-paper">{i + 1}</span>
                <p className="pt-1 text-[15px] leading-relaxed text-ink">{s}</p>
              </li>
            ))}
          </ol>
          <div className="card mt-6 grid gap-3 p-4 text-sm">
            <p>
              <span className="font-semibold">Keeps:</span> <span className="text-ink-2">{r.keeps}</span>
            </p>
            <p>
              <span className="font-semibold">Variations:</span> <span className="text-ink-2">{r.variations}</span>
            </p>
          </div>
        </section>
      </div>
      <p className="mt-8 text-xs text-ink-2">
        Tested source: {source}. Checked {r.checked}. If a jar did not seal, refrigerate it and use it within a few days. Discard without tasting any jar that is bulging, leaking,
        spurting or smells wrong.
      </p>
      <section className="card mt-10 p-6">
        <p className="eyebrow text-moss">Crop</p>
        <h2 className="font-display mt-1 text-2xl font-semibold">
          <Link href={`/gardening/crops/${crop.slug}`} className="hover:text-moss">
            {crop.name}: harvest, storage and other recipes →
          </Link>
        </h2>
        <p className="mt-2 text-sm text-ink-2">{crop.preserveNote}</p>
      </section>
      {more.length > 0 && (
        <section className="mt-10">
          <p className="eyebrow">More for {crop.name.toLowerCase()}</p>
          <div className="mt-4">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((x) => (
                <RecipeCard key={x.slug} recipe={x} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
