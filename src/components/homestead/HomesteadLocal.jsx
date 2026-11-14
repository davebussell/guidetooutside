"use client";
/**
 * "In your area" on the topic pages: with a place remembered, a link straight
 * to its homestead page; without one, the location search. (The section
 * landing uses SectionLead, whose "Or choose from the list" points at the
 * landing's own list of places.)
 */
import Link from "next/link";
import { usePlace } from "@/lib/hooks";
import { LocationSearch } from "@/components/LocationSearch";

/** @param {{ note: string, anchor?: string }} props */
export function HomesteadLocal({ note, anchor }) {
  const place = usePlace();
  if (place?.slug) {
    return (
      <Link
        href={`/homesteading/${place.slug}${anchor ? `#${anchor}` : ""}`}
        className="group flex items-center justify-between gap-4 rounded-card bg-moss px-5 py-4 text-on-moss transition hover:shadow-lift hover:bg-moss-2"
      >
        <span className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wider text-on-moss/90">{place.label}</span>
          <span className="font-display mt-0.5 block text-xl sm:text-2xl font-semibold leading-tight">This week&apos;s homestead guide</span>
          <span className="mt-1 block text-sm text-on-moss/90">{note}</span>
        </span>
        <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-on-moss/15 text-2xl transition group-hover:translate-x-1">
          →
        </span>
      </Link>
    );
  }
  return <LocationSearch section="homesteading" />;
}
