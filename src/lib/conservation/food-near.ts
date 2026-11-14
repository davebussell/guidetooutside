/**
 * The question a static page's food band asks /conservation/food.json once
 * the browser knows the reader's town, and the URL for it. Types and a URL
 * builder only, so the client bundle carries none of the library.
 */
import type { FoodRole } from "@/data/conservation/types";
import type { FoodSection } from "./food";
import type { NearPlace } from "./near";

export type FoodQuery = {
  section: FoodSection;
  roles?: FoodRole[];
  gardens?: boolean;
  /** A fish page's creature slug, for the seafood guides' look-up links. */
  fish?: string;
  fruit?: boolean;
  compact?: boolean;
};

export function foodUrl(p: NearPlace, q: FoodQuery): string {
  const s = new URLSearchParams({ slug: p.slug, lat: p.lat.toFixed(4), lon: p.lon.toFixed(4), section: q.section });
  if (p.label) s.set("label", p.label);
  if (q.roles?.length) s.set("roles", q.roles.join(","));
  if (q.gardens !== undefined) s.set("gardens", q.gardens ? "1" : "0");
  if (q.fish) s.set("fish", q.fish);
  if (q.fruit) s.set("fruit", "1");
  if (q.compact) s.set("compact", "1");
  return `/conservation/food.json?${s.toString()}`;
}
