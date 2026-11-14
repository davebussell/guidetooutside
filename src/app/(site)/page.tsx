import type { Metadata } from "next";
import Link from "next/link";
import { LocationSearch } from "@/components/LocationSearch";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AtmospherePhase } from "@/components/AtmospherePhase";
import { TrailheadCard } from "@/components/TrailheadCard";
import { Atmosphere } from "@/components/home/Atmosphere";
import { SeasonNow, WildlifeNow } from "@/components/home/HomeSections";
import { SeasonBand } from "@/components/conservation/SeasonBand";
import { SERVED_ECOREGIONS as ECOREGIONS } from "@/lib/ecoregions";
import { SELECTED_PLACES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

// The seasonal strips follow the calendar month.
export const revalidate = 3600;

const ZONES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const PILLARS = [
  {
    href: "/gardening",
    label: "Gardening",
    tone: "moss",
    text: "Hardiness zone, frost dates and today's soil temperature, with what to sow, start and harvest this week.",
  },
  {
    href: "/fishing",
    label: "Fishing",
    tone: "azure",
    text: "Species active this week, feeding periods by sun and moon, nearby waters and the official regulations.",
  },
  {
    href: "/foraging",
    label: "Foraging",
    tone: "rust",
    text: "Wild edibles in season, where they grow, how to identify them, and the poisonous species they resemble.",
  },
  {
    href: "/homesteading",
    label: "Homesteading",
    tone: "bark",
    text: "Hens, bees, goats, rain tanks and woodpiles, with daylight, frost, roof water and heating worked out for your climate.",
  },
] as const;

// Spelled out so Tailwind sees each class.
const TONE = {
  moss: { card: "hover:border-moss", text: "text-moss" },
  azure: { card: "hover:border-azure", text: "text-azure" },
  rust: { card: "hover:border-rust", text: "text-rust" },
  bark: { card: "hover:border-bark", text: "text-bark" },
};

export default function Home() {
  const month = new Date().getMonth() + 1;
  const regions = ECOREGIONS as { slug: string; name: string }[];
  const manyContinents = SELECTED_PLACES.length > 1;
  return (
    <>
      <Atmosphere />
      <AtmospherePhase />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <p className="eyebrow text-moss">Canada · United States</p>
        <h1 className="font-display mt-3 text-5xl sm:text-7xl font-semibold leading-[1.02] tracking-tight max-w-4xl mx-auto">
          Your guide to <em className="not-italic text-moss atmo-accent">thrive outside.</em>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto text-balance">
          Gardening, fishing, foraging and homesteading, worked out for your town, this week.
        </p>
        <div id="search" className="mt-9 max-w-2xl mx-auto">
          <TrailheadCard />
          <LocationSearch large />
          <p className="mt-3 text-sm text-ink-2">
            Or use your device&apos;s location.{" "}
            <Link href="/how-it-works" className="underline decoration-line hover:text-ink">
              How it works
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <Link key={p.label} href={p.href} className={`card p-6 lg:p-7 transition ${TONE[p.tone].card}`}>
            <p className={`eyebrow ${TONE[p.tone].text}`}>{p.label}</p>
            <p className="mt-3 text-ink-2 leading-relaxed">{p.text}</p>
            <span className={`mt-5 inline-block text-sm font-medium ${TONE[p.tone].text}`}>{p.label} guide →</span>
          </Link>
        ))}
      </section>

      {/* Things a family can do this season with the organisations in the library: the widest-reaching ones on the
          cached page, redrawn in the browser for the visitor's remembered town. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <SeasonBand
          family
          openOnly
          nearby
          heading="Get involved this season"
          headingNear="Get involved this season, near {town}"
          lede="Counts and surveys a family can do this month, most of them from a window or a garden, run by the conservation organisations in our library; each button opens their own page."
          id="get-involved"
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">By zone</p>
          <h2 className="font-display mt-2 text-3xl font-semibold">Ten hardiness zones</h2>
          <p className="mt-2 text-ink-2">
            A hardiness zone is set by the average coldest night of winter. It decides which perennials survive and how long the growing
            season runs. Zones 2 to 11 cover most of Canada and the United States.
          </p>
          <ul className="mt-5 grid grid-cols-5 lg:grid-cols-10 gap-2">
            {ZONES.map((z) => (
              <li key={z}>
                <Link href={`/zones/${z}`} className="card block p-3 text-center hover:border-moss hover:text-moss transition">
                  <span className="font-display text-2xl font-semibold">{z}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm flex gap-4">
            <Link href="/zones" className="underline decoration-line hover:text-ink">
              All zone guides →
            </Link>
            <Link href="/zones/map" className="underline decoration-line hover:text-ink">
              Zone map →
            </Link>
          </p>
        </div>
        <div>
          <p className="eyebrow">By region</p>
          <h2 className="font-display mt-2 text-3xl font-semibold">{regions.length} ecological regions</h2>
          <p className="mt-2 text-ink-2">
            Landscapes defined by climate, soil and vegetation, from boreal forest and prairie to desert and Pacific rainforest.
          </p>
          <ul className="mt-5 columns-1 sm:columns-2 gap-8 text-sm">
            {regions.map((r) => (
              <li key={r.slug} className="break-inside-avoid border-b border-line">
                <Link href={`/regions/${r.slug}`} className="block py-1.5 text-ink-2 hover:text-moss transition">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <SeasonNow month={month} limit={3} />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <WildlifeNow kind="fish" month={month} limit={3} />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <WildlifeNow kind="garden" month={month} limit={3} />
      </section>

      <section id="locations" className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <p className="eyebrow">Local guides</p>
        <h2 className="font-display mt-2 text-3xl font-semibold">Selected places</h2>
        {/* One list across the page while one continent is served; a headed column for each when there are more. */}
        <div className={manyContinents ? "mt-6 grid gap-8 sm:grid-cols-3" : "mt-6"}>
          {SELECTED_PLACES.map((g) => (
            <div key={g.continent}>
              {manyContinents && (
                <h3 className="border-t-2 border-ink pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">{g.continent}</h3>
              )}
              <ul className={manyContinents ? "mt-2 grid grid-cols-2 gap-x-6 text-sm" : "grid grid-cols-2 gap-x-6 border-t-2 border-ink pt-3 text-sm sm:grid-cols-4"}>
                {g.places.map((l) => (
                  <li key={l.slug} className="border-b border-line">
                    <Link href={`/guide/${l.slug}`} className="block py-1.5 text-ink-2 hover:text-moss transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <div className="card p-8 sm:p-12 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
          <div>
            <h2 className="font-display text-3xl font-semibold">The Weekly Field Note</h2>
            <p className="mt-2 text-paper/85">
              A short email each Sunday evening: what to sow, which fish are active and what is ripening where you live.{" "}
              <Link href="/newsletter" className="underline">
                Sample issue
              </Link>
              .
            </p>
          </div>
          <NewsletterForm source="home" />
        </div>
      </section>
    </>
  );
}
