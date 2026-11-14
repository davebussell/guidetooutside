import type { Metadata } from "next";
import Link from "next/link";
import { CROPS, SEED_KIND, type SeedKind } from "@/lib/crops";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { SITE } from "@/lib/site";
import { faqLd, FaqList } from "@/components/crops/FaqList";
import { FoodPanel } from "@/components/conservation/FoodPanel";

const TITLE = "Saving seed — which garden seeds come true, which cross, and how to dry and keep them";
const DESCRIPTION =
  "The seed-saving guide for a home garden: the easy self-pollinators, the biennials that need a second year, the crops that cross with their neighbours, the hybrids that won’t come true, and the ones grown from tubers and cloves instead — crop by crop.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/gardening/seeds" },
};

/** The questions at the foot of the page (and its FAQPage), from the live page. */
const FAQS = [
  {
    q: "What is the difference between open-pollinated and hybrid seed?",
    a: "Open-pollinated (and heirloom) varieties breed true: save the seed and you get the same plant. An F1 hybrid is the first-generation cross of two parent lines; it is uniform and often vigorous, but its own seed segregates back toward the parents. The packet says ‘F1’ or ‘hybrid’ when it is one.",
  },
  {
    q: "How do you dry seeds for storage?",
    a: "Spread them one layer deep on a plate, a screen or a coffee filter — not paper towel, which sticks — somewhere airy out of the sun for one to three weeks. A seed is dry enough when a bean snaps rather than dents under a fingernail and a tomato seed does not bend. Then jar them with a label and the year.",
  },
  {
    q: "Where should seeds be stored?",
    a: "Cool, dark and dry: a sealed jar in a cupboard against an outside wall, or the fridge with a packet of silica gel. The old rule of thumb (Harrington's rule, written in Fahrenheit) is that temperature in °F plus relative humidity in percent should stay under 100: at 10 °C (50 °F) that means under 50 % humidity, at 20 °C (68 °F) under about 30 %. A warm, damp, bright place, such as a garage in summer, can halve the life of a packet.",
  },
  {
    q: "How long do vegetable seeds last?",
    a: "Stored cool and dry: onions, parsnips and parsley about a year; corn, peppers and peas two to three; beans, carrots and tomatoes three to five; cucumbers, squash, lettuce and brassicas five or more. Each crop page gives its own figure. To test an old packet, sow ten seeds on damp paper towel a month before sowing time and count how many germinate.",
  },
  {
    q: "Which seeds are easiest to save first?",
    a: "Beans, peas, lettuce and tomatoes. All are self-pollinating and their seed is easy to clean and dry. Leave beans and peas to dry in the pod on the plant; ferment tomato pulp in a jar for two to three days, then rinse and dry the seed.",
  },
];

export default function SeedsPage() {
  const path = "/gardening/seeds";
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Gardening", "/gardening"],
      ["Saving seed", path],
    ]),
    {
      "@type": "Article",
      headline: "Saving seed: which garden seeds come true, and how to keep them",
      description: "Crop by crop: the easy self-pollinators, the biennials, the crossers, the hybrids, and the crops saved whole.",
      mainEntityOfPage: `${SITE.url}${path}`,
      articleSection: "Gardening",
      dateModified: "2026-10-02",
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
    faqLd(path, FAQS),
  ]);
  const kinds = Object.keys(SEED_KIND) as SeedKind[];
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
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
      <p className="eyebrow mt-4 text-moss">Seed saving</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Saving seed: which crops come true, and how</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">
        Seed saving is the last task of the harvest. Some crops are straightforward: shell the beans and dry them. Others will not breed true, because the plant was a hybrid or
        because squash has crossed with a pumpkin in a nearby bed. Crops are grouped below into five categories, with the method for each.
      </p>
      <div className="mt-10 grid gap-10">
        {kinds.map((k) => {
          const crops = CROPS.filter((c) => c.seeds.kind === k).sort((a, b) => a.name.localeCompare(b.name));
          return (
            <section key={k} id={k} className="scroll-mt-24">
              <h2 className="font-display text-3xl font-semibold tracking-tight">{SEED_KIND[k].title}</h2>
              <p className="mt-2 max-w-3xl text-ink-2">{SEED_KIND[k].blurb}</p>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {crops.map((c) => (
                  <li key={c.slug} className="card p-4">
                    <h3 className="font-display text-xl font-semibold">
                      <Link href={`/gardening/crops/${c.slug}#seeds`} className="hover:text-moss">
                        {c.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-2">{c.seeds.how}</p>
                    <p className="mt-2 text-xs text-ink-2">
                      <span className="font-semibold text-ink">Keeps:</span> {c.seeds.viability}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      {/* Seed libraries and swaps first, then the gardens and growers who keep seed going. */}
      <FoodPanel place={null} section="seeds" nearby className="mt-14" />
      <section className="mt-14">
        <p className="eyebrow text-moss">Questions</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">Common questions on seed saving</h2>
        <FaqList faqs={FAQS} />
      </section>
    </div>
  );
}
