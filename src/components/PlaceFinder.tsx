/**
 * "Choose a place": the finder and the list of every place with a pre-built
 * guide, by country, province or state, then the ecological regions and the
 * hardiness zones. On /the-day, and on the section front pages (/gardening,
 * /fishing, /foraging, /ground), where `section` sends each place to that
 * section's page and `title` names it ("Gardening guides by place").
 */
import Link from "next/link";
import KNOWN from "@/lib/served-places";
import { SERVED_ECOREGIONS as ECOREGIONS } from "@/lib/ecoregions";
import { regionOf } from "@/lib/region";
import { continentServed } from "@/lib/scope";
import { LocationSearch } from "@/components/LocationSearch";
import type { Place } from "@/lib/types";

/** How a province, state or country is headed in the list. */
const HEADING: Record<string, string> = {
  Quebec: "Québec",
  "District of Columbia": "Washington, DC",
  "United Kingdom": "UK",
  "Democratic Republic of the Congo": "DR Congo",
};

/** Places listed by their everyday name where the map's name is an administrative one (from the live list). */
const LIST_NAME: Record<string, string> = {
  "fredericton-new-brunswick": "Fredericton",
  "moncton-new-brunswick": "Moncton",
  "saint-john-new-brunswick": "Saint John",
  "sudbury-ontario": "Sudbury",
  "montreal-quebec": "Montréal",
  "quebec-city-quebec": "Québec City",
  "st-louis-missouri": "St. Louis",
  "albany-new-york": "Albany",
};

type Group = { name: string; places: Place[] };

function groups(): { continent: string; groups: Group[] }[] {
  // A parked continent has no column (src/lib/scope.ts); it comes back when the continent is served again.
  const by: Record<string, Map<string, Place[]>> = {
    Canada: new Map(),
    "United States": new Map(),
    ...(continentServed("europe") ? { Europe: new Map() } : {}),
    ...(continentServed("africa") ? { Africa: new Map() } : {}),
  };
  for (const p of KNOWN as Place[]) {
    const continent =
      p.countryCode === "CA" ? "Canada" : p.countryCode === "US" ? "United States" : (regionOf(p.lat, p.lon) as { continent?: string }).continent === "europe" ? "Europe" : "Africa";
    const raw = p.countryCode === "CA" || p.countryCode === "US" ? p.admin1 : p.country;
    const name = HEADING[raw] ?? raw;
    const m = by[continent];
    if (!m) continue;
    m.set(name, [...(m.get(name) ?? []), p]);
  }
  return Object.entries(by).map(([continent, m]) => ({
    continent,
    groups: [...m.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([name, places]) => ({ name, places })),
  }));
}

const ZONES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function PlaceFinder({ title = "Choose a place", section, accent = "text-moss" }: { title?: string; section?: string; accent?: string }) {
  const href = (slug: string) => (section ? `/${section}/${slug}` : `/guide/${slug}`);
  const regions = ECOREGIONS as { slug: string; name: string }[];
  return (
    <section id="find" className="scroll-mt-24">
      <p className={`eyebrow ${accent}`}>Local guides</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-ink-2 max-w-2xl">
        Enter a town or postal code anywhere in Canada or the United States for this week&apos;s guide to that place, or choose from the list below.
      </p>
      <div className="mt-5 max-w-2xl">
        {/* The live landings pass no section here: a search lands on the overview guide. */}
        <LocationSearch large />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {groups().map((c) => (
          <div key={c.continent}>
            <p className="eyebrow">{c.continent}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {c.groups.map((g) => (
                <div key={g.name}>
                  <h3 className="font-semibold text-sm">{g.name}</h3>
                  <ul className="mt-1 space-y-0.5">
                    {g.places.map((p) => (
                      <li key={p.slug}>
                        <Link href={href(p.slug)} className="text-sm text-ink-2 hover:text-ink">
                          {LIST_NAME[p.slug] ?? p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-ink-2">
        The list shows places with a pre-built guide. Any town or postal code in Canada or the United States can be entered in the search box.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow">By ecological region</p>
          <ul className="mt-3 columns-1 sm:columns-2 gap-6 text-sm">
            {regions.map((r) => (
              <li key={r.slug} className="break-inside-avoid border-b border-line">
                <Link href={`/regions/${r.slug}`} className="block py-1 text-ink-2 hover:text-moss transition">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">By hardiness zone</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ZONES.map((z) => (
              <li key={z}>
                <Link href={`/zones/${z}`} className="inline-block rounded-md border border-line bg-surface px-3 py-1.5 text-sm hover:border-moss hover:text-moss transition">
                  Zone {z}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <Link href="/zones/map" className="underline decoration-line hover:text-ink">
              Zone map →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
