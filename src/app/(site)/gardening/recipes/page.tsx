import type { Metadata } from "next";
import Link from "next/link";
import { CROPS, RECIPES } from "@/lib/crops";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { RecipeCard } from "@/components/garden/CropCard";
import { FoodPanel } from "@/components/conservation/FoodPanel";

export const metadata: Metadata = {
  title: "Preserving recipes — tested canning, pickling, fermenting, freezing and drying recipes for the garden",
  description: `${RECIPES.length} tested home-preserving recipes with exact processing times, headspace and altitude adjustments, organised by crop: tomatoes, cucumbers, beans, beets, apples, berries, peppers, squash, herbs and more.`,
  alternates: { canonical: "/gardening/recipes" },
};

export default function RecipesPage() {
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Gardening", "/gardening"],
      ["Putting up", "/gardening/preserving"],
      ["Recipes", "/gardening/recipes"],
    ]),
  ]);
  const byCrop = CROPS.map((c) => ({ crop: c, recipes: RECIPES.filter((r) => r.crop === c.slug) })).filter((g) => g.recipes.length);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <Link href="/gardening" className="hover:text-ink">
          Gardening
        </Link>
        <span>·</span>
        <Link href="/gardening/preserving" className="hover:text-ink">
          Preserving
        </Link>
      </nav>
      <p className="eyebrow mt-4 text-gold">Recipes</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{RECIPES.length} tested preserving recipes</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">
        Each follows a tested recipe from the US National Center for Home Food Preservation, Bernardin, Ball or a university extension service, with the processing time copied
        exactly and the safety requirements set out before the ingredients. Arranged by crop.
      </p>
      <div className="mt-10 grid gap-10">
        {byCrop.map(({ crop, recipes }) => (
          <section key={crop.slug} id={crop.slug} className="scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold">
              <Link href={`/gardening/crops/${crop.slug}`} className="hover:text-moss">
                {crop.name}
              </Link>{" "}
              <span className="font-normal text-ink-2">· {recipes.length}</span>
            </h2>
            <div className="mt-4">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((r) => (
                  <RecipeCard key={r.slug} recipe={r} />
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      {/* Local food, markets and food rescue near the reader. */}
      <FoodPanel place={null} section="kitchen" nearby className="mt-14" />
    </div>
  );
}
