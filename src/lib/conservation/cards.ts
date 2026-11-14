/**
 * What a panel's organisation cards carry beyond the record: each
 * organisation's own open invitation (its button) and its newest article (its
 * "Latest" line), and the one invitation the panel features. Server-side; the
 * results are plain props the presentational components (and the client
 * panel, through /conservation/near.json) draw.
 */
import type { Organisation, Topic } from "@/data/conservation";
import type { CardOrg } from "@/components/conservation/OrgCard";
import { featureFor, openInvitationOf, type FeatureInvitation } from "./invitations";
import type { MatchPlace } from "./match";
import { latestByOrg } from "./news";

export type PanelInput = { org: Organisation | CardOrg; why: string };
export type PanelCard = { org: CardOrg; why: string };

/** The cards' extras for a panel's organisations; `featured` is the invitation the panel shows above them (no card repeats it). */
/** `filter.topics`: a card's button is only an invitation about the panel's subject; `filter.only`: only these invitations (a story's own list). */
export async function withExtras(matches: PanelInput[], place: MatchPlace | null, featured?: FeatureInvitation | null, filter: { topics?: Topic[]; only?: string[] } = {}): Promise<PanelCard[]> {
  if (!matches.length) return [];
  const exclude = featured ? [featured.slug] : [];
  const news = await latestByOrg(matches.map((m) => m.org.slug));
  return matches.map((m) => {
    const inv = openInvitationOf(m.org.slug, place, { exclude, topics: filter.topics, only: filter.only });
    const n = news.get(m.org.slug);
    return {
      why: m.why,
      org: {
        ...m.org,
        invitation: inv ? { slug: inv.invitation.slug, title: inv.invitation.title, url: inv.invitation.url, cta: inv.invitation.cta } : null,
        news: n ? { title: n.title, url: n.url, dateLabel: n.dateLabel } : null,
      },
    };
  });
}

/** The panel's featured invitation and its cards, in one call. */
export async function panelFor(matches: PanelInput[], place: MatchPlace | null, topics: Topic[] | undefined, opts: { feature?: boolean } = {}): Promise<{ feature: FeatureInvitation | null; cards: PanelCard[] }> {
  const feature = opts.feature === false ? null : featureFor(place, topics);
  return { feature, cards: await withExtras(matches, place, feature, { topics }) };
}
