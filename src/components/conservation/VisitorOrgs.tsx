/**
 * The panel for pages with no place of their own (species, wildlife, zone and
 * learn pages): the organisations near the visitor's remembered town when
 * there is one, and otherwise the world-wide bodies on the subject with a
 * town search ("Enter your town for the organisations near you").
 *
 * `VisitorOrgs` is for dynamic pages, which can read the place cookie on the
 * server (pass `visitorPlace()`); `OrgsAnywhere` is the no-place panel on its
 * own, which a static page renders inside the client `NearbyOrgs`.
 *
 * Both feature the best open invitation for the subject (for the visitor's
 * town, or with no town one done from home or anywhere) above the cards.
 */
import type { Topic } from "@/data/conservation";
import { panelFor } from "@/lib/conservation/cards";
import { orgsAnywhere, orgsFor } from "@/lib/conservation/match";
import type { VisitorPlace } from "@/lib/conservation/visitor";
import { LocationSearch } from "@/components/LocationSearch";
import { DISCLOSURE, OrgsPanel, RegionLink } from "./OrgsPanel";

export const fillTown = (s: string, town: string) => s.replace(/\{town\}/g, town);

const asList = (t?: Topic | Topic[]) => (Array.isArray(t) ? t : t ? [t] : undefined);

export async function OrgsAnywhere({
  topic,
  species,
  limit = 3,
  heading,
  lede,
  id,
}: {
  topic?: Topic | Topic[];
  species?: string[];
  limit?: number;
  heading: string;
  lede?: string;
  id?: string;
}) {
  const panel = await panelFor(orgsAnywhere({ topic, species, limit }), null, asList(topic));
  return (
    <OrgsPanel
      id={id}
      heading={heading}
      lede={lede ?? `The bodies that work on this everywhere; your own town's organisations appear here once we know where you are. ${DISCLOSURE}`}
      matches={panel.cards}
      feature={panel.feature}
      footer={<RegionLink label="Browse every organisation by country →" />}
    >
      <div className="mt-5 max-w-xl">
        <p className="text-sm font-medium">Enter your town for the organisations near you</p>
        <div className="mt-2">
          <LocationSearch />
        </div>
      </div>
    </OrgsPanel>
  );
}

export async function VisitorOrgs({
  place,
  topic,
  species,
  limit = 3,
  headingNear,
  headingAnywhere,
  lede,
  ledeAnywhere,
  id,
}: {
  place: VisitorPlace | null;
  topic?: Topic | Topic[];
  species?: string[];
  limit?: number;
  /** With "{town}" for the visitor's town: "Who looks after the water near {town}". */
  headingNear: string;
  headingAnywhere: string;
  lede?: string;
  ledeAnywhere?: string;
  id?: string;
}) {
  const matches = place ? orgsFor(place, { topic, species, limit }) : [];
  if (!place || !matches.length) return <OrgsAnywhere topic={topic} species={species} limit={limit} heading={headingAnywhere} lede={ledeAnywhere} id={id} />;
  const panel = await panelFor(matches, place, asList(topic));
  return (
    <OrgsPanel
      id={id}
      heading={fillTown(headingNear, place.name)}
      lede={lede ? fillTown(lede, place.name) : `The organisations working on this near ${place.name}, closest first. ${DISCLOSURE}`}
      matches={panel.cards}
      feature={panel.feature}
      footer={<RegionLink countryCode={place.countryCode} />}
    />
  );
}
