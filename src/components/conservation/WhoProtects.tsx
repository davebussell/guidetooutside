/**
 * "Who looks after this" — the panel every place, species and zone page
 * carries: the organisations the matcher ranks for the place and topic, local
 * first, with the best open invitation for the place and subject featured
 * above them. Renders nothing when the library has no match at all, so a
 * page is never left with an empty box.
 *
 * The frame itself (`OrgsPanel`: heading, lede, feature, cards, the
 * disclosure line) lives in ./OrgsPanel so the client `NearbyOrgs` can draw it
 * without the library.
 */
import type { Topic } from "@/data/conservation";
import { panelFor } from "@/lib/conservation/cards";
import { orgsFor, type MatchOptions, type MatchPlace } from "@/lib/conservation/match";
import { DEFAULT_LEDE, OrgsPanel, RegionLink, defaultTitle } from "./OrgsPanel";

export { DISCLOSURE, OrgsPanel, RegionLink, defaultTitle, type PanelMatch } from "./OrgsPanel";

const asList = (t?: Topic | Topic[]) => (Array.isArray(t) ? t : t ? [t] : undefined);

export async function WhoProtects({
  place,
  topic,
  title,
  lede,
  waters,
  species,
  limit = 3,
  compact,
  id,
  feature = true,
  exclude,
}: {
  place: MatchPlace;
  topic?: Topic | Topic[];
  title?: string;
  lede?: string;
  waters?: string[];
  species?: string[];
  limit?: number;
  compact?: boolean;
  /** The heading's id, when a page carries more than one panel. */
  id?: string;
  /** Feature the best open invitation above the cards (default); false when the page features one already. */
  feature?: boolean;
  /** Organisation slugs another panel on the page shows. */
  exclude?: string[];
}) {
  const opts: MatchOptions = { topic, waters, species, limit, exclude };
  const matches = orgsFor(place, opts);
  if (!matches.length) return null;
  const panel = await panelFor(matches, place, asList(topic), { feature });
  return (
    <OrgsPanel
      id={id}
      heading={title ?? defaultTitle(topic)}
      lede={lede ?? DEFAULT_LEDE}
      matches={panel.cards}
      feature={panel.feature}
      compact={compact}
      footer={<RegionLink countryCode={place.countryCode} />}
    />
  );
}
