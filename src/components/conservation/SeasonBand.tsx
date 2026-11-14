/**
 * "Get involved this season": up to three open (or opening soon)
 * invitations for a set of subjects and, when known, a place — one featured
 * and two as cards, two as cards, or one alone. For the homepage and the
 * section landings. Renders nothing when there is nothing to offer, so a page
 * never carries an empty band.
 *
 * `SeasonBandView` is the frame alone (plain props, no library), so the
 * client `NearbySeason` can redraw it for the visitor's remembered town on a
 * page that is rendered once for everyone.
 */
import type { Topic } from "@/data/conservation";
import { invitationsFor, siteToday, toFeature, type FeatureInvitation } from "@/lib/conservation/invitations";
import type { MatchPlace } from "@/lib/conservation/match";
import { NearbySeason } from "./NearbySeason";
import { SeasonBandView } from "./SeasonBandView";

export { SeasonBandView };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export type SeasonQuery = { topics?: Topic[]; fromHome?: boolean; family?: boolean; openOnly?: boolean };

/**
 * Up to three for the band. With no place, the ones anyone can join (world-wide or from home) come first; when
 * there are fewer than three, the best of the rest anywhere fill in, each saying where it runs.
 */
export function seasonInvitations(place: MatchPlace | null, q: SeasonQuery): FeatureInvitation[] {
  const base = { topics: q.topics, fromHome: q.fromHome, family: q.family, openOnly: q.openOnly };
  const first = invitationsFor(place, { ...base, limit: 3 });
  const list = place || first.length >= 3 ? first : [...first, ...invitationsFor(null, { ...base, anywhere: true, exclude: first.map((m) => m.invitation.slug), limit: 3 - first.length })];
  return list.map((m) => toFeature(m, { showWhere: !place }));
}

export function SeasonBand({
  topics,
  place = null,
  fromHome,
  family,
  openOnly,
  heading = "Get involved this season",
  headingNear,
  lede,
  id = "this-season",
  className = "",
  nearby = false,
}: SeasonQuery & {
  place?: MatchPlace | null;
  heading?: string;
  /** With "{town}": the heading once the browser knows the visitor's town (with `nearby`). */
  headingNear?: string;
  lede?: string;
  id?: string;
  className?: string;
  /** Redraw for the visitor's remembered town in the browser (static pages with no place). */
  nearby?: boolean;
}) {
  const list = seasonInvitations(place, { topics, fromHome, family, openOnly });
  const month = MONTHS[Number(siteToday().slice(5, 7)) - 1];
  const view = list.length ? <SeasonBandView items={list} month={month} heading={heading} lede={lede} id={id} className={className} /> : null;
  if (!nearby || place) return view;
  return (
    <NearbySeason query={{ topics, fromHome, family, openOnly }} month={month} headingNear={headingNear ?? `${heading}, near {town}`} lede={lede} id={id} className={className}>
      {view}
    </NearbySeason>
  );
}
