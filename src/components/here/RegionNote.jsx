"use client";
/**
 * One honest line under a northern-calendar list (the crops harvested this
 * month, the preserving recipes in season, the zone-5 garden year) for a
 * reader whose year runs differently: six months round south of the equator,
 * or not by frost at all in the tropics. Readers in the northern temperate
 * belt — North America and Europe — see nothing, because the calendar is
 * theirs. The link goes to the reader's own local page for the section.
 */
import Link from "next/link";
import { useHere } from "@/lib/use-here";
import { useRegion } from "@/lib/use-region";
import { southMonth } from "@/lib/region-context";
import { continentServed } from "@/lib/scope";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthName = (m) => MONTHS[((m - 1) % 12 + 12) % 12];

/** @param {{ section?: "gardening" | "foraging" | "fishing" | "homesteading", what?: string }} props */
export function RegionNote({ section = "gardening", what = "this calendar" }) {
  const here = useHere();
  const ctx = useRegion();
  // A place remembered from a parked continent (src/lib/scope.ts) has no local page for the note to link to.
  if (!ctx.known || !here.place || !continentServed(ctx.continent) || (!ctx.tropical && ctx.hemisphere === "north")) return null;
  const month = here.month || new Date().getMonth() + 1;
  const link = (
    <Link href={`/${section}/${here.place.slug}`} className="font-semibold text-moss hover:underline">
      {section.charAt(0).toUpperCase() + section.slice(1)}
      {" guide for "}
      {here.town}
      {" →"}
    </Link>
  );
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-tile border border-line bg-paper-2/60 px-4 py-2.5 text-sm">
      <p className="text-ink">
        {ctx.tropical ? (
          <>
            <span className="font-semibold">
              {"Near "}
              {here.town}
              {" frost does not set the year"}
            </span>
            {`: ${what} is written for frost-led temperate gardens, where the growing season runs between the last and first frosts. In the tropics the rains and the dry season decide the dates instead.`}
          </>
        ) : (
          <>
            <span className="font-semibold">
              {"Near "}
              {here.town}
              {" the seasons run six months from this calendar"}
            </span>
            {`: ${what} follows the northern year, so ${monthName(month)} here is its ${monthName(southMonth(month))}.`}
          </>
        )}
      </p>
      {link}
    </div>
  );
}
