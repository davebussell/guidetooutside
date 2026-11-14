import type { Metadata } from "next";
import Link from "next/link";
import { CROPS, cropsInMonth, GROUP_LABEL, type CropGroup } from "@/lib/crops";
import { monthName } from "@/lib/species";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";
import { CropGrid } from "@/components/garden/CropCard";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { FrostWatchHere, YourGardenYear } from "@/components/here/GardenHere";
import { RegionNote } from "@/components/here/RegionNote";

/** "Harvested in <month>" follows the calendar. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Garden crops — when to pick, how they take a frost, where they keep, how to put them up",
  description:
    "Every common crop of the temperate garden: the signs it’s ready, what a frost night does to it, how long it keeps and where, the ways to can, freeze, dry or pickle it, and whether the seed is worth saving.",
  alternates: { canonical: "/gardening/crops" },
};

/** The index's group order (berries before perennials, unlike GROUP_LABEL). */
const INDEX_ORDER: CropGroup[] = ["fruiting", "squash", "root", "allium", "brassica", "leafy", "legume", "grain", "tree-fruit", "berry", "perennial", "herb"];

export default function CropsPage() {
  const month = new Date().getMonth() + 1;
  const now = cropsInMonth(month);
  const tender = now.filter((c) => c.hardiness === "tender" || c.hardiness === "half-hardy");
  const hardy = now.filter((c) => c.hardiness === "hardy" || c.hardiness === "very-hardy");
  const groups = INDEX_ORDER.map((g) => ({ g, crops: CROPS.filter((c) => c.group === g).sort((a, b) => a.name.localeCompare(b.name)) })).filter((x) => x.crops.length);
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["Gardening", "/gardening"],
      ["Crops", "/gardening/crops"],
    ]),
  ]);
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
      <p className="eyebrow mt-4 text-moss">Crops</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Garden crops: harvest, storage and preserving</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">
        {CROPS.length} crops, each with signs of ripeness, frost tolerance, storage conditions and life, preserving methods, and whether its seed is worth saving.
      </p>
      <div className="mt-8 grid gap-5">
        <YourGardenYear compact />
        <FrostWatchHere />
      </div>
      {now.length > 0 && (
        <section className="mt-12">
          <p className="eyebrow text-gold">This month</p>
          <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">Harvested in {monthName(month)}</h2>
          <p className="mt-1 text-sm text-ink-2">In a frost-led garden of the northern temperate belt; the local guide times each crop to a town&apos;s own frost dates.</p>
          <div className="mt-3">
            <RegionNote section="gardening" what="this month's harvest list" />
          </div>
          {tender.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-ink">Tender crops: harvest before frost</p>
              <CropGrid crops={tender} />
            </div>
          )}
          {hardy.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-ink">Hardy crops: improved by light frost</p>
              <CropGrid crops={hardy} />
            </div>
          )}
        </section>
      )}
      <section className="mt-14">
        <p className="eyebrow text-moss">Index</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">All crops, by group</h2>
        <div className="mt-6 grid gap-10">
          {groups.map(({ g, crops }) => (
            <div key={g} id={g}>
              <h3 className="font-display text-2xl font-semibold">
                {GROUP_LABEL[g]} <span className="font-normal text-ink-2">· {crops.length}</span>
              </h3>
              <div className="mt-4">
                <CropGrid crops={crops} />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Local food, markets and food rescue near the reader. */}
      <FoodPanel place={null} section="kitchen" nearby className="mt-14" />
      <section className="mt-14 grid gap-5 md:grid-cols-2">
        <Link href="/gardening/preserving" className="card group p-6 transition hover:border-moss">
          <p className="eyebrow text-gold">Preserving</p>
          <p className="font-display mt-1 text-2xl font-semibold group-hover:text-moss">
            Canning, pickling, fermenting, freezing and drying: methods by crop, with tested recipes →
          </p>
        </Link>
        <Link href="/gardening/seeds" className="card group p-6 transition hover:border-moss">
          <p className="eyebrow text-moss">Seeds</p>
          <p className="font-display mt-1 text-2xl font-semibold group-hover:text-moss">Which crops come true from seed, which cross, and how to dry and store seed →</p>
        </Link>
      </section>
    </div>
  );
}
