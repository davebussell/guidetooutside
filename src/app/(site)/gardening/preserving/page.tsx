import type { Metadata } from "next";
import Link from "next/link";
import { CROPS, METHODS, RECIPES, type PreserveMethodId } from "@/lib/crops";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { SITE } from "@/lib/site";
import { RecipeCard } from "@/components/garden/CropCard";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { PutItUpSection } from "@/components/crops/PutItUpSection";

/** The month in the tool's "In season this month" list. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Putting up the harvest — canning, pickling, fermenting, freezing and drying, safely",
  description:
    "How each way of preserving works, what it suits and what it must never be used for; the botulism rules in plain words; the altitude table; and a tool that tells you what to do with a box of tomatoes and an afternoon. With tested recipes.",
  alternates: { canonical: "/gardening/preserving" },
};

const RULES: [string, string][] = [
  [
    "Acid decides the method",
    "Below pH 4.6 (fruit, pickles, jam, tomatoes with added acid) a boiling-water bath is enough. Above it (every plain vegetable, beans, corn, squash, meat) only a pressure canner reaches the 116 °C that kills Clostridium botulinum spores. There is no safe alternative, whatever older practice suggests.",
  ],
  [
    "Tested recipes, exactly",
    "A processing time belongs to one recipe: its jar size, pack, acid and thickness. Change the vegetables, add oil or flour, or halve the vinegar and the time no longer applies. Season at the table instead.",
  ],
  [
    "Headspace and new lids",
    "The gap at the top is what lets a vacuum form; too little and food pushes under the lid, too much and it may not seal. Two-piece lids, the flat part new every time, fingertip-tight.",
  ],
  [
    "The clock starts at a full boil",
    "In a water bath the jars sit under 3–5 cm of water at a rolling boil; the time starts when it returns to the boil, not when the jars go in. In a pressure canner it starts when the gauge reaches pressure after a 10-minute vent.",
  ],
  [
    "Altitude adds time",
    "Water boils at a lower temperature at altitude, so processing takes longer. Most coastal and lowland towns are under 300 m and need no change; Calgary (1,045 m) and Denver (1,609 m) do. The table is below.",
  ],
  [
    "Oil, garlic and herbs",
    "Garlic or herbs in oil at room temperature is the classic home botulism case. Refrigerate for four days at most, or freeze. Pesto freezes; it is never canned.",
  ],
  [
    "When in doubt, throw it out",
    "Discard without tasting any jar whose lid flexes, or that leaks, spurts, is unexpectedly cloudy or smells wrong. Botulism toxin has no taste. Dried, frozen and fermented food that has gone soft, pink, slimy or mouldy is likewise finished.",
  ],
  [
    "Burns and scalds",
    "The canner, hot syrup and the pressure canner cause most home-preserving injuries. Keep children away from the stove while jars are processing, and lift jars with a jar lifter, upright.",
  ],
];

/** Altitude, water bath (recipes over 20 min), weighted gauge, dial gauge. */
const ALTITUDE: [string, string, string, string][] = [
  ["0–300 m (0–1,000 ft)", "as written", "10 lb", "11 lb"],
  ["301–600 m (1,001–2,000 ft)", "+5 min", "15 lb", "11 lb"],
  ["601–1,200 m (2,001–4,000 ft)", "+5 min to 900 m, +10 min above", "15 lb", "12 lb"],
  ["1,201–1,800 m (4,001–6,000 ft)", "+10 min", "15 lb", "13 lb"],
  ["1,801–2,400 m (6,001–8,000 ft)", "+15 min", "15 lb", "14 lb"],
  ["2,401–3,000 m (8,001–10,000 ft)", "+20 min", "15 lb", "15 lb"],
];

export default function PreservingPage() {
  const path = "/gardening/preserving";
  const month = new Date().getMonth() + 1;
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Gardening", "/gardening"],
      ["Putting up the harvest", path],
    ]),
    {
      "@type": "Article",
      headline: "Putting up the harvest, safely",
      description: "Every home-preserving method explained, the safety rules that matter, the altitude table, and tested recipes.",
      mainEntityOfPage: `${SITE.url}${path}`,
      articleSection: "Gardening",
      dateModified: "2026-10-02",
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
  ]);
  const methods = Object.keys(METHODS) as PreserveMethodId[];
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
      </nav>
      <p className="eyebrow mt-4 text-gold">Preserving</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Preserving the harvest: methods, safety and tested recipes</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">
        Eight preserving methods, and one rule common to all of them: a jar is only as safe as the acid, heat and time that went into it. Every recipe here follows tested sources
        (the US National Center for Home Food Preservation, Bernardin and university extension services) with processing times copied exactly. Freezing is the quickest method,
        canning gives shelf-stable stores, and drying suits small quantities.
      </p>
      <div className="mt-10">
        <PutItUpSection month={month} />
      </div>
      <section className="mt-14">
        <p className="eyebrow text-moss">Methods</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">Uses and limits of each method</h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {methods.map((k) => {
            const m = METHODS[k];
            const recipes = RECIPES.filter((r) => r.method === k);
            return (
              <li key={k} id={k} className="card scroll-mt-24 p-5 sm:p-6">
                <h3 className="font-display text-2xl font-semibold">{m.name}</h3>
                <p className="mt-1 text-ink-2">{m.short}</p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="eyebrow">Equipment</dt>
                    <dd className="mt-0.5 text-ink-2">{m.equipment}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-moss">Suitable for</dt>
                    <dd className="mt-0.5 text-ink-2">{m.goodFor}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-rust">Never use for</dt>
                    <dd className="mt-0.5 text-ink-2">{m.never}</dd>
                  </div>
                </dl>
                {recipes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">Recipes · {recipes.length}</p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {recipes.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/gardening/recipes/${r.slug}`}
                            className="inline-block rounded-full border border-edge bg-surface px-3 py-1 text-sm hover:border-moss hover:text-moss"
                          >
                            {r.title.split(",")[0]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-14">
        <p className="eyebrow text-rust">Safety</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">Eight rules for safe preserving</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {RULES.map(([t, b]) => (
            <li key={t} className="card px-4 py-3">
              <p className="font-semibold text-ink">{t}</p>
              <p className="mt-1 text-sm text-ink-2">{b}</p>
            </li>
          ))}
        </ul>
      </section>
      <section id="altitude" className="mt-14 scroll-mt-24">
        <p className="eyebrow text-moss">Altitude</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">Altitude adjustments</h2>
        <p className="mt-2 max-w-3xl text-ink-2">
          At 1,500 m water boils at about 95 °C, so the same jar needs longer in a water bath, and a pressure canner needs more pressure to reach 116 °C inside. Every recipe on
          this site gives its time for 0–300 m; adjust from this table. Most coastal and lowland towns are under 300 m; the Canadian Prairies lie at 500–1,100 m, and Denver and
          the Colorado Front Range at about 1,600 m.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2 pr-4 font-semibold">Altitude</th>
                <th className="py-2 pr-4 font-semibold">Water bath, recipes over 20 min</th>
                <th className="py-2 pr-4 font-semibold">Pressure, weighted gauge</th>
                <th className="py-2 font-semibold">Pressure, dial gauge</th>
              </tr>
            </thead>
            <tbody>
              {ALTITUDE.map((row) => (
                <tr key={row[0]} className="border-b border-line/60">
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? "py-3 pr-4 font-semibold text-ink" : "py-3 pr-4 text-ink-2"}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-2">
          For water-bath recipes of 20 minutes or less, add 5 minutes anywhere from 301 to 1,800 m and 10 minutes above that. Steps follow the USDA/NCHFP tables; where a recipe
          gives its own, the recipe’s line wins. A dial gauge needs testing every year; a weighted gauge does not.
        </p>
      </section>
      <section className="mt-14">
        <p className="eyebrow text-moss">Recipes</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">{RECIPES.length} tested recipes</h2>
        <div className="mt-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RECIPES.map((r) => (
              <RecipeCard key={r.slug} recipe={r} cropName={r.crop.replace(/-/g, " ")} />
            ))}
          </ul>
        </div>
      </section>
      {/* Local food, markets and food rescue near the reader. */}
      <FoodPanel place={null} section="kitchen" nearby className="mt-14" />
      <section className="mt-14 grid gap-5 md:grid-cols-2">
        <Link href="/gardening/crops" className="card group p-6 transition hover:border-moss">
          <p className="eyebrow text-moss">Crops</p>
          <p className="font-display mt-1 text-2xl font-semibold group-hover:text-moss">{CROPS.length} crops: harvest, storage and preserving →</p>
        </Link>
        <Link href="/gardening/seeds" className="card group p-6 transition hover:border-moss">
          <p className="eyebrow text-moss">Seed saving</p>
          <p className="font-display mt-1 text-2xl font-semibold group-hover:text-moss">Which seeds to save, and how →</p>
        </Link>
      </section>
      <p className="mt-10 max-w-3xl text-xs text-ink-2">
        Educational information. Home canning carries real risk when recipes are altered or times guessed; the recipes here follow tested sources named on each page, and those
        sources are the authority when anything differs. If a jar is bulging, leaking, spurting or smells wrong, discard it without tasting.
      </p>
    </div>
  );
}
