"use client";
/**
 * The town loading screen, left out on the pages that share a town route but are not towns (a wild edible at
 * /foraging/ramps, a homestead topic at /homesteading/ducks). Those are built with the site, so the loading screen
 * would only flash before the finished page; it belongs to a town's first build alone (Dave, November 2026).
 */
import { useParams } from "next/navigation";

export function LoaderUnlessSlug({ skip, children }: { skip: string[]; children: React.ReactNode }) {
  const slug = useParams<{ slug?: string }>()?.slug;
  if (typeof slug === "string" && skip.includes(slug)) return null;
  return <>{children}</>;
}
