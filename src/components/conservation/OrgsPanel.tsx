/**
 * The frame of a "who looks after this" panel, the one every panel on the
 * site uses: a moss-tinted band inside the page container with the eyebrow
 * "Get involved", a display heading and the lede, then at most one featured
 * open invitation (the best for the place and the panel's subjects, chosen by
 * the server component that calls this), then the organisation cards, then a
 * footer link. With no invitation the band is the heading and the cards,
 * which still reads as a section of its own.
 *
 * No library import, so the server panels and the client `NearbyOrgs` draw
 * the same thing from the same trimmed props.
 */
import Link from "next/link";
import type { Topic } from "@/data/conservation/types";
import type { FeatureInvitation } from "@/lib/conservation/invitations";
import { OrgCard, type CardOrg } from "./OrgCard";
import { InvitationFeature } from "./InvitationFeature";

const DEFAULT_TITLE: Partial<Record<Topic, string>> = {
  water: "Who looks after this water",
  fish: "Who looks after these fish and their water",
  birds: "Who looks after the birds here",
  pollinators: "Who looks after the pollinators here",
  plants: "Who looks after the plants here",
  forests: "Who looks after the forests here",
  "soil-seeds": "Who keeps the seeds and soil here",
  wildlife: "Who looks after the wildlife here",
  land: "Who looks after the land here",
  ground: "Who looks after the ground and sky here",
  youth: "Where young people can join in",
};

export const DISCLOSURE = "We list registered charities and public bodies only, and we receive nothing from anything you give.";
export const DEFAULT_LEDE = `The organisations working on this near you, closest first. ${DISCLOSURE}`;

export const defaultTitle = (topic?: Topic | Topic[]) => {
  const first = Array.isArray(topic) ? topic[0] : topic;
  return (first ? DEFAULT_TITLE[first] : undefined) ?? "Who looks after this place";
};

export type PanelMatch = { org: CardOrg; why: string };

/** The band every get-involved section sits in (panels, stories, the season band). */
export const BAND = "gto-band rounded-feature bg-moss-soft px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12";

export function OrgsPanel({
  id = "who-protects",
  heading,
  lede,
  matches,
  feature,
  compact,
  footer,
  children,
}: {
  id?: string;
  heading: string;
  lede: React.ReactNode;
  matches: PanelMatch[];
  /** The one open invitation to feature above the cards. */
  feature?: FeatureInvitation | null;
  compact?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const n = matches.length;
  return (
    <section className={BAND} aria-labelledby={id}>
      <p className="eyebrow text-moss">Get involved</p>
      <h2 id={id} className="font-display mt-2 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-2 sm:text-base">{lede}</p>
      {children}
      {feature && <InvitationFeature inv={feature} className="mt-8" />}
      {n > 0 && (
        <div className={`mt-8 grid gap-5 ${n > 1 ? "md:grid-cols-2" : "max-w-xl"} ${n > 2 ? "lg:grid-cols-3" : ""}`}>
          {matches.map((m) => (
            <OrgCard key={m.org.slug} org={m.org} why={m.why} compact={compact} />
          ))}
        </div>
      )}
      {footer}
    </section>
  );
}

export function RegionLink({ countryCode, label = "All organisations in your region →" }: { countryCode?: string | null; label?: string }) {
  return (
    <p className="mt-6 text-[15px]">
      <Link href={`/conservation${countryCode ? `?country=${countryCode}` : ""}`} className="font-medium text-moss underline-offset-2 hover:underline">
        {label}
      </Link>
    </p>
  );
}
