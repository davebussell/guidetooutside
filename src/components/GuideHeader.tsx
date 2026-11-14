import Link from "next/link";
import { LocationSearch } from "@/components/LocationSearch";
import { RememberPlace } from "@/lib/place-cookie";
import type { Place } from "@/lib/types";

export type PlaceTab = "overview" | "gardening" | "fishing" | "foraging" | "homesteading" | "ground";

const TABS: { id: PlaceTab; label: string; href: (slug: string) => string }[] = [
  { id: "overview", label: "Overview", href: (s) => `/guide/${s}` },
  { id: "gardening", label: "Gardening", href: (s) => `/gardening/${s}` },
  { id: "fishing", label: "Fishing", href: (s) => `/fishing/${s}` },
  { id: "foraging", label: "Foraging", href: (s) => `/foraging/${s}` },
  { id: "homesteading", label: "Homesteading", href: (s) => `/homesteading/${s}` },
  { id: "ground", label: "The ground", href: (s) => `/ground/${s}` },
];

/** The place-page tabs, the location search beside them, and the place remembered for the rest of the site. */
export function GuideHeader({ place, current, timeZone }: { place: Place; current: PlaceTab; timeZone?: string }) {
  return (
    <>
      <RememberPlace slug={place.slug} label={place.label} lat={place.lat} lon={place.lon} tz={timeZone} />
      <div className="flex flex-col-reverse gap-4 border-b border-line lg:flex-row lg:items-end lg:justify-between">
        <nav className="-mx-4 flex gap-0 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:gap-1 sm:px-0" aria-label="Guide sections">
          {TABS.map((t) => {
            const on = t.id === current;
            return (
              <Link
                key={t.id}
                href={t.href(place.slug)}
                aria-current={on ? "page" : undefined}
                className={`-mb-px whitespace-nowrap border-b-2 px-2.5 py-3 text-[13px] font-medium transition sm:px-4 sm:text-sm ${
                  on ? "border-moss text-moss" : "border-transparent text-ink-2 hover:border-line hover:text-ink"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 lg:w-80 lg:pb-2 lg:pt-0">
          <LocationSearch />
        </div>
      </div>
    </>
  );
}
