/**
 * One organisation, as a tile: the reason it is shown (a small chip) and its
 * network, its name in the display face (linking to its page on this site),
 * the blurb (three lines on a panel, whole on its own page), what it asks of
 * people as a short checklist, its newest article when it has a feed, and
 * one clear way in: the organisation's own open invitation when there is
 * one, else the first of volunteer, events, join, youth and give, labelled
 * for what it does ("Volunteer with Ottawa Riverkeeper"). The other ways and
 * the website follow as a quiet row.
 *
 * Outbound links carry `data-gto-out="org"`, the slug and the way in, so
 * connection clicks can be counted (OutboundClicks).
 */
import Link from "next/link";
import type { Organisation } from "@/data/conservation/types";
import { OutboundButton } from "./InvitationFeature";

/** The organisation's own open invitation, as its card's button needs it. */
export type CardInvitation = { slug: string; title: string; url: string; cta: string };
/** Its newest article, as the card's "Latest" line needs it. */
export type CardNews = { title: string; url: string; dateLabel: string };

/** The fields a card shows: a full record, or the trimmed one the client panel receives. */
export type CardOrg = Pick<Organisation, "slug" | "name" | "network" | "blurb" | "asks" | "links"> & {
  shortName?: string;
  invitation?: CardInvitation | null;
  news?: CardNews | null;
  /** The way in a panel asks for, when it is not one of the record's own links (a food band's guide page): the button after an open invitation. */
  primary?: { href: string; label: string; way: string } | null;
};

type WayKey = keyof Organisation["links"];

const WAYS: { key: WayKey; label: string }[] = [
  { key: "volunteer", label: "Volunteer" },
  { key: "events", label: "Events" },
  { key: "join", label: "Join" },
  { key: "youth", label: "For young people" },
  { key: "donate", label: "Give" },
  { key: "shop", label: "Shop" },
];

/** The order the one clear way in is chosen from, after an open invitation. */
const PRIMARY_ORDER: WayKey[] = ["volunteer", "events", "join", "youth", "donate"];

const shortOf = (org: Pick<CardOrg, "name" | "shortName">) => (org.shortName && org.name.length > 26 ? org.shortName : org.name);

function primaryLabel(key: WayKey, org: Pick<CardOrg, "name" | "shortName">): string {
  const n = shortOf(org);
  const fits = n.length <= 26;
  switch (key) {
    case "volunteer":
      return fits ? `Volunteer with ${n}` : "Find a volunteer role";
    case "events":
      return "See upcoming events";
    case "join":
      return fits ? `Join ${n}` : "Join";
    case "youth":
      return "See the youth programme";
    case "donate":
      return fits ? `Give to ${n}` : "Give";
    default:
      return "Visit their website";
  }
}

export type PrimaryWay = { way: string; href: string; label: string };

const BRIEF_LABEL: Partial<Record<WayKey, string>> = { volunteer: "Volunteer", events: "See upcoming events", join: "Join", youth: "See the youth programme", donate: "Give" };

/**
 * The one clear way in for an organisation (its open invitation first).
 * `brief` drops the organisation's name from the label, for a list that
 * names it just above.
 */
export function primaryWay(org: Pick<CardOrg, "name" | "shortName" | "links" | "invitation" | "primary">, opts: { brief?: boolean } = {}): PrimaryWay {
  if (org.invitation) return { way: "invitation", href: org.invitation.url, label: org.invitation.cta };
  if (org.primary) return { way: org.primary.way, href: org.primary.href, label: org.primary.label };
  const key = PRIMARY_ORDER.find((k) => org.links[k]);
  if (key) return { way: key, href: org.links[key]!, label: (opts.brief && BRIEF_LABEL[key]) || primaryLabel(key, org) };
  return { way: "home", href: org.links.home, label: "Visit their website" };
}

/** The quiet row of ways in: the website and every way the primary button did not take. */
export function OrgWays({ org, className = "", skip }: { org: Pick<Organisation, "slug" | "links">; className?: string; skip?: string }) {
  const ways = WAYS.filter((w) => org.links[w.key] && w.key !== skip);
  return (
    <p className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${className}`}>
      {skip !== "home" && (
        <a href={org.links.home} target="_blank" rel="noopener noreferrer" className="font-medium text-moss underline-offset-2 hover:underline" data-gto-out="org" data-gto-org={org.slug} data-gto-way="home">
          Website
        </a>
      )}
      {ways.map((w) => (
        <a key={w.key} href={org.links[w.key]} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline-offset-2 hover:text-moss hover:underline" data-gto-out="org" data-gto-org={org.slug} data-gto-way={w.key}>
          {w.label}
        </a>
      ))}
    </p>
  );
}

/** The button and the quiet row under it, for a card or an organisation's own page. */
export function OrgActions({ org, className = "", size = "md", block = false }: { org: CardOrg; className?: string; size?: "md" | "lg"; block?: boolean }) {
  const p = primaryWay(org);
  return (
    <div className={className}>
      <OutboundButton href={p.href} org={org.slug} way={p.way} size={size} className={block ? "w-full text-balance" : ""}>
        {p.label}
      </OutboundButton>
      <OrgWays org={org} skip={p.way} className="mt-3" />
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="mt-[3px] shrink-0 text-moss" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  );
}

export function OrgAsks({ asks, className = "" }: { asks: string[]; className?: string }) {
  if (!asks.length) return null;
  return (
    <ul className={`grid gap-1.5 text-sm leading-snug ${className}`} aria-label="How to help">
      {asks.slice(0, 3).map((a) => (
        <li key={a} className="flex gap-2">
          <Check />
          <span>{a}</span>
        </li>
      ))}
    </ul>
  );
}

export function NewsLine({ org, news, className = "" }: { org: Pick<CardOrg, "slug">; news: CardNews; className?: string }) {
  return (
    <p className={`text-sm leading-snug text-ink-2 ${className}`}>
      <span className="font-semibold text-ink">Latest: </span>
      <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line underline-offset-2 hover:text-moss" data-gto-out="org" data-gto-org={org.slug} data-gto-way="article">
        {news.title}
      </a>
      <span className="whitespace-nowrap"> · {news.dateLabel}</span>
    </p>
  );
}

export function OrgCard({ org, why, compact = false, full = false }: { org: CardOrg; why?: string; compact?: boolean; full?: boolean }) {
  return (
    <article className="card flex h-full min-w-0 flex-col p-5 sm:p-6">
      {(why || org.network) && (
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-2">
          {why && <span className="rounded-full bg-paper-2 px-2.5 py-0.5 font-medium text-ink">{why}</span>}
          {org.network && !(why ?? "").includes(org.network.replace(/ International$/, "")) && <span>{org.network}</span>}
        </p>
      )}
      <h3 className="font-display mt-2.5 text-xl font-medium leading-snug tracking-tight sm:text-[1.4rem]">
        <Link href={`/conservation/${org.slug}`} className="hover:text-moss">
          {org.name}
        </Link>
      </h3>
      <p className={`mt-2 text-[15px] leading-relaxed text-ink-2 ${full ? "" : "line-clamp-3"}`}>{org.blurb}</p>
      {!compact && <OrgAsks asks={org.asks} className="mt-3" />}
      {org.news && <NewsLine org={org} news={org.news} className="mt-3 border-t border-line/70 pt-3" />}
      <OrgActions org={org} className="mt-auto pt-5" block />
    </article>
  );
}
