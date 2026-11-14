/**
 * "Choosing a preserving method": the PutItUp tool in its card, as on
 * /gardening and /gardening/preserving. The tool gets the 41 crops and the
 * recipes in the slim shape the live pages passed, and the month the server
 * rendered in (the visitor's own month replaces it once a place is set).
 */
import { CROPS, RECIPES } from "@/lib/crops";
import { PutItUp } from "@/components/garden/PutItUp";

export function putItUpProps(month: number) {
  return {
    crops: CROPS.map((c) => ({ slug: c.slug, name: c.name, preserve: c.preserve, harvestMonths: c.harvestMonths, preserveNote: c.preserveNote })),
    recipes: RECIPES.map((r) => ({ slug: r.slug, title: r.title, crop: r.crop, method: r.method, active: r.active, tagline: r.tagline })),
    month,
  };
}

export function PutItUpSection({ month }: { month: number }) {
  return (
    <section id="put-it-up" className="card scroll-mt-24 p-4 sm:p-6">
      <p className="eyebrow">Tool</p>
      <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Choosing a preserving method</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
        Select the crop, the quantity, the time available and the equipment at hand. The tool returns a suitable method and a tested recipe.
      </p>
      <div className="mt-4">
        <PutItUp {...putItUpProps(month)} />
      </div>
    </section>
  );
}
