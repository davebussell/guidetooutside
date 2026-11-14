/**
 * The pollinator planting guide for a reader's ecoregion, when the library
 * has a body that publishes one: an organisation in the Pollinator
 * Partnership network whose `ecoregion` areas (recorded from its own guide
 * finder) include the reader's region and that is registered in the
 * reader's country, so a reader is never pointed at another country's guide.
 */
import { ORGANISATIONS } from "@/data/conservation";
import { regionOf } from "@/lib/region";
import { ecoregionName } from "./geo-words";
import type { MatchPlace } from "./match";

const isPollinatorPartnership = (o: { slug: string; name: string; network?: string }) =>
  o.network === "Pollinator Partnership" || o.slug.startsWith("pollinator-partnership") || /^Pollinator Partnership\b/.test(o.name);

export function ecoGuideFor(place: MatchPlace): { slug: string; name: string; region: string } | null {
  const eco = regionOf(place.lat, place.lon)?.slug as string | undefined;
  if (!eco || !place.countryCode) return null;
  const org = ORGANISATIONS.find(
    (o) => isPollinatorPartnership(o) && o.countryCode === place.countryCode && o.areas.some((a) => a.kind === "ecoregion" && a.ecoregions.includes(eco)),
  );
  return org ? { slug: org.slug, name: org.name, region: ecoregionName(eco) } : null;
}
