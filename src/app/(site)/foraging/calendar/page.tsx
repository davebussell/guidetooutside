/**
 * /foraging/calendar — the foraging year: what is in season this month
 * across all regions, every month's list (narrowed to the reader's region
 * once a place is set), and every species A–Z with its season.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { SPECIES, monthName, monthRange, speciesNow } from "@/lib/species";
import { foragingNow, PRESENCE_BOX_KM, PRESENCE_FROM_YEAR } from "@/lib/plant-presence";
import { LocationSearch } from "@/components/LocationSearch";
import { SpeciesCard } from "@/components/NatureCard";
import { servedText } from "@/components/species/served-text";
import { CalendarYear } from "@/components/here/ActiveNearYou";
import { regionFromCookie } from "@/lib/region-cookie";
import { theRegion } from "@/lib/the-region";
import { visitorPlace } from "@/lib/conservation/visitor";
import { FoodPanel } from "@/components/conservation/FoodPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Foraging calendar — what's in season each month",
  description: "A month-by-month calendar of wild edibles across Canada and the United States: what to pick now, what's coming, and how to identify each one.",
  alternates: { canonical: "/foraging/calendar" },
};

export default async function ForagingCalendarPage() {
  const month = new Date().getMonth() + 1;
  // With no place known a species is named and described as its own page does (servedText).
  const library = SPECIES.map(servedText);
  const now = speciesNow(month).map(servedText);
  // The page is dynamic, so the remembered place (the cookie) can narrow the month to the reader's own
  // ecological region and, south of the equator, the reader's own season.
  const [{ place, ctx }, here] = await Promise.all([regionFromCookie(), visitorPlace()]);
  // "In season near you" only for what is recorded near the place this month; where the place cannot be checked
  // the region's list is shown under its own label (plant-presence).
  const gatedNear = ctx.known && ctx.regionSlug && place ? foragingNow(month, ctx.regionSlug, undefined, { place }) : null;
  const nearChecked = gatedNear?.why === "none";
  const near = gatedNear ? (nearChecked ? gatedNear.checked : gatedNear.regional) : [];
  const town = place ? place.label.split(",")[0] : null;
  const byName = [...library].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="eyebrow text-moss">
        <Link href="/foraging" className="hover:text-ink">
          Foraging
        </Link>
        {" · Calendar"}
      </p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">The foraging year</h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        Every wild edible in the guide, by the month it is usually in season. Dates are for the middle of each species&apos; range: the south of a range runs weeks
        earlier, the north weeks later. The local guide narrows this to the current week for a given place.
      </p>
      <div className="mt-6 max-w-2xl">
        <LocationSearch />
      </div>
      {town && ctx.regionName && (
        <section className="mt-12">
          <p className="eyebrow text-moss">
            {nearChecked ? "In season near " : "Regional list · "}
            {nearChecked ? town : monthName(month)}
            {nearChecked ? ` · ${monthName(month)}` : ""}
          </p>
          <h2 className="font-display mt-1 text-3xl font-semibold">
            {nearChecked
              ? `${near.length} species recorded within about ${PRESENCE_BOX_KM} km of ${town}`
              : `${near.length} species the guide gives for ${theRegion(ctx.regionName)} - not checked near ${town}`}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-ink-2">
            {nearChecked
              ? `In the guide's season for ${monthName(month)} and recorded within about ${PRESENCE_BOX_KM} km of ${town} in ${monthName(month)}, in public observations (GBIF, mostly iNaturalist) since ${PRESENCE_FROM_YEAR}.`
              : "Regional context only: this place cannot be checked against local observations (too few have been logged near it, or it is not one we have checked), so none of this says a species is in season, growing or legal to pick where you are."}{" "}
            {ctx.hemisphere === "south"
              ? `Read in the southern calendar: ${monthName(month)} here is the northern ${monthName(((month + 5) % 12) + 1)}, and the library's months are turned round to match. `
              : ctx.tropical
                ? "In the tropics the wet and dry seasons, not the calendar, decide what is ready. "
                : ""}
            <Link href={`/foraging/${place!.slug}`} className="font-medium text-moss underline">
              Foraging guide for {town} →
            </Link>
          </p>
          {near.length > 0 && (
            <div className="mt-5">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {near.slice(0, 9).map((s, i) => (
                  <SpeciesCard key={s.slug} species={s} priority={i < 3} />
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
      <section className="mt-12">
        <p className="eyebrow text-moss">
          {"All regions · "}
          {monthName(month)}
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold">
          {now.length}
          {" species the guide gives for this month across all regions"}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-2">
          Every region together; a species shown here may be thousands of kilometres from you. Set a place to see your own region first.
        </p>
        <div className="mt-5">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {now.map((s, i) => (
              <SpeciesCard key={s.slug} species={s} priority={i < 3} />
            ))}
          </ul>
        </div>
      </section>
      <section className="mt-16">
        <p className="eyebrow">Month by month</p>
        <h2 className="font-display mt-1 text-3xl font-semibold">The year by month</h2>
        <CalendarYear
          month={month}
          species={library.map((s) => ({ slug: s.slug, name: s.name, months: s.months, regions: s.regions, deadlyDouble: s.deadlyDouble }))}
        />
      </section>
      {/* Foraging codes and the fruit-picking groups near the reader. */}
      <FoodPanel place={here} section="foraging" className="mt-16" />
      <section className="mt-16">
        <p className="eyebrow">All species</p>
        <h2 className="font-display mt-1 text-3xl font-semibold">Wild edibles A–Z</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {byName.map((s) => (
            <li key={s.slug}>
              <Link href={`/foraging/${s.slug}`} className="card flex items-baseline justify-between gap-3 px-4 py-2.5 hover:border-moss transition">
                <span className="font-medium">{s.name}</span>
                <span className="text-xs text-ink-2 whitespace-nowrap">{monthRange(s.months)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
