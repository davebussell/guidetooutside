/**
 * A one-line "Who looks after this" strip computed on the server for a place
 * and topic: the two best organisations, each linking to its page here. For
 * the foot of a data panel (the homestead bees and rainwater panels, the
 * day's plan); renders nothing when nothing matches.
 */
import type { Topic } from "@/data/conservation";
import type { MatchPlace } from "@/lib/conservation/match";
import { stripFor } from "@/lib/conservation/strips";
import { OrgStrip } from "./OrgStrip";

export function OrgLine({
  place,
  topic,
  waters,
  species,
  label,
  limit = 2,
  className,
}: {
  place: MatchPlace;
  topic: Topic | Topic[];
  waters?: string[];
  species?: string[];
  label?: string;
  limit?: number;
  className?: string;
}) {
  return <OrgStrip items={stripFor(place, topic, { waters, species, limit })} label={label} className={className} />;
}
