import { redirect } from "next/navigation";
import Link from "next/link";
import { geocode, reverseGeocode } from "@/lib/geocode";
import { SELECTED_PLACES } from "@/lib/site";
import { parseZoneQuery } from "@/lib/zone-query";
import { LocationSearch } from "@/components/LocationSearch";

export const dynamic = "force-dynamic";

type Search = { q?: string; lat?: string; lon?: string; section?: string };

/** Place pages that a section link can land on; anything else goes to the overview. */
const SECTIONS = ["gardening", "fishing", "foraging", "homesteading", "ground", "resources", "the-day"];

/** What a section's page holds, for the line that asks for a place. */
const SECTION_NOTE: Record<string, string> = {
  gardening: "this week's sowing, harvest and frost forecast",
  fishing: "active species, river flow and nearby waters",
  foraging: "wild foods in season and local hazards",
  homesteading: "daylight, roof water, wood heat and frost dates for the homestead",
  ground: "the bedrock, soil and watershed",
  "the-day": "the day's phases by sun position",
};

/**
 * The finder: `?q=` (a town, postal code or zone) or `?lat=&lon=` goes
 * straight to the place's page, on the section asked for with `?section=`;
 * otherwise it asks where.
 */
export default async function GuideFinder({ searchParams }: { searchParams: Promise<Search> }) {
  const { q, lat, lon, section: rawSection } = await searchParams;
  const section = rawSection && SECTIONS.includes(rawSection) ? rawSection : null;
  const dest = (slug: string) => (section ? `/${section}/${slug}` : `/guide/${slug}`);

  if (lat && lon) {
    const place = await reverseGeocode(Number(lat), Number(lon));
    if (place) redirect(`${dest(place.slug)}?lat=${place.lat.toFixed(4)}&lon=${place.lon.toFixed(4)}`);
  } else if (q) {
    const zone = parseZoneQuery(q);
    if (zone) redirect(`/zones/${zone}?q=${encodeURIComponent(q)}`);
    const place = await geocode(q);
    if (place) redirect(`${dest(place.slug)}?lat=${place.lat.toFixed(4)}&lon=${place.lon.toFixed(4)}`);
  }

  // A search that came back empty — words, or coordinates outside the countries the guide serves (src/lib/scope.ts).
  const failed = !!q || !!(lat && lon);
  const note = section ? SECTION_NOTE[section] : undefined;
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">{failed ? "Place not found" : "Enter a place"}</h1>
      <p className="mt-3 text-ink-2">
        {failed && q ? (
          <>
            Nothing in Canada or the United States matched <strong>“{q}”</strong>. Try a nearby town, or add the province or state.
          </>
        ) : failed ? (
          "No town in Canada or the United States was found at that location. Enter a town or postal code."
        ) : note ? (
          <>That page is specific to one place. Enter a town to see {note}.</>
        ) : (
          "Enter a town, city or postal code anywhere in Canada or the United States."
        )}
      </p>
      <div className="mt-6">
        <LocationSearch defaultValue={q ?? ""} />
      </div>
      {/* Somewhere to go that isn't the search box. Without this the page was a
          question, a field, and three hundred pixels of nothing above the footer. */}
      <div className="mt-10 border-t border-line/60 pt-8">
        <p className="eyebrow">Selected places</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {SELECTED_PLACES.flatMap((g) => g.places.slice(0, 6)).map((l) => (
            <li key={l.slug}>
              <Link
                href={dest(l.slug)}
                className="inline-block rounded-full border border-edge bg-surface px-3.5 py-1.5 text-sm hover:border-moss hover:text-moss"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-sm">
        <Link href="/" className="underline">
          Back home
        </Link>
      </p>
    </div>
  );
}
