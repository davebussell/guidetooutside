/**
 * An open invitation as the thing to do: the hero card (`InvitationFeature`)
 * and its compact form for rows of two or three (`InvitationCard`).
 *
 * The feature: a 3:2 photograph of the subject (credited under it), or, with
 * none, a calm panel in the subject's colour carrying the subject's word; the
 * window as a chip (open in moss, soon in gold); the invitation's own name as
 * eyebrow and what to do as the heading; the summary; the facts (effort, free
 * or the cost, family, from home); the organisation, linking to its page
 * here; and one large button to the organisation's own page. Photo left of
 * the text from 1024 px, above it below that.
 *
 * Presentational only (it takes the trimmed `FeatureInvitation`, never the
 * library), so the client `NearbyOrgs` draws the same card. Outbound links
 * carry `data-gto-out="org"` and `data-gto-way="invitation"` for the click count.
 */
import Image from "next/image";
import Link from "next/link";
import type { Topic } from "@/data/conservation/types";
import type { FeatureInvitation, InvitationWindow } from "@/lib/conservation/invitations";

/** The subject's colour and word for an invitation with no photograph. */
const TOPIC_PANEL: Record<Topic, { tint: string; word: string }> = {
  water: { tint: "bg-azure-soft text-azure", word: "Water" },
  fish: { tint: "bg-azure-soft text-azure", word: "Fish" },
  birds: { tint: "bg-azure-soft text-azure", word: "Birds" },
  pollinators: { tint: "bg-gold-soft text-gold", word: "Pollinators" },
  plants: { tint: "bg-moss-soft text-moss", word: "Plants" },
  forests: { tint: "bg-moss-soft text-moss", word: "Forests" },
  "soil-seeds": { tint: "bg-bark-soft text-bark", word: "Soil and seed" },
  wildlife: { tint: "bg-bark-soft text-bark", word: "Wildlife" },
  land: { tint: "bg-moss-soft text-moss", word: "Land" },
  ground: { tint: "bg-bark-soft text-bark", word: "Ground and sky" },
  youth: { tint: "bg-moss-soft text-moss", word: "Young naturalists" },
  food: { tint: "bg-gold-soft text-gold", word: "Food and growing" },
};

export function DateChip({ window, className = "" }: { window: InvitationWindow; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold leading-tight ${window.state === "open" ? "bg-moss text-on-moss" : "gto-chip-soon"} ${className}`}>
      {window.label}
    </span>
  );
}

/** The facts as small chips ("A few minutes", "Free", "Family", "From home"); a long cost reads as a line of its own. */
export function InvitationFacts({ inv, className = "" }: { inv: FeatureInvitation; className?: string }) {
  const cost = inv.free ? "Free" : (inv.cost ?? "A fee or membership");
  const longCost = cost.length > 26;
  const facts = [inv.where ?? null, inv.effort, longCost ? null : cost, inv.family ? "Family" : null, inv.fromHome ? "From home" : null].filter(Boolean) as string[];
  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-1.5" aria-label="At a glance">
        {facts.map((f) => (
          <li key={f}>
            <span className="inline-block rounded-full bg-paper-2 px-2.5 py-0.5 text-[13px] leading-snug text-ink-2">{f}</span>
          </li>
        ))}
      </ul>
      {longCost && <p className="mt-2 text-[13px] leading-snug text-ink-2">Cost: {cost}</p>}
    </div>
  );
}

function Credit({ photo, className = "" }: { photo: NonNullable<FeatureInvitation["photo"]>; className?: string }) {
  return (
    <figcaption className={`font-display text-[13px] italic leading-snug text-ink-2 ${className}`}>
      Photograph:{" "}
      <a href={photo.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-ink">
        {photo.author}
      </a>{" "}
      ·{" "}
      <a href={photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-ink">
        {photo.license}
      </a>
    </figcaption>
  );
}

function TopicPanel({ topic, className = "" }: { topic?: Topic; className?: string }) {
  const p = TOPIC_PANEL[topic ?? "land"];
  return (
    <div className={`relative flex items-end overflow-hidden ${p.tint} ${className}`} aria-hidden="true">
      {/* three soft contour lines, drawn in the panel's own colour */}
      <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-[0.14]" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M-10 150 C 60 120, 110 170, 180 140 S 290 110, 320 130" />
        <path d="M-10 115 C 70 85, 120 135, 190 105 S 290 75, 320 95" />
        <path d="M-10 80 C 80 50, 130 100, 200 70 S 290 40, 320 60" />
      </svg>
      <span className="font-display relative p-5 text-3xl leading-none tracking-tight sm:p-6 sm:text-4xl">{p.word}</span>
    </div>
  );
}

export function OutboundButton({
  href,
  org,
  way,
  children,
  size = "md",
  variant = "primary",
  className = "",
}: {
  href: string;
  org: string;
  way: string;
  children: React.ReactNode;
  size?: "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
}) {
  const sizing = size === "lg" ? "min-h-12 px-7 py-3 text-base sm:min-h-[52px] sm:text-[17px]" : "min-h-11 px-5 py-2.5 text-[15px]";
  const tone = variant === "primary" ? "bg-moss text-on-moss hover:bg-moss-2" : "border border-moss text-moss hover:bg-moss hover:text-on-moss";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-gto-out="org"
      data-gto-org={org}
      data-gto-way={way}
      className={`inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-semibold leading-tight transition ${sizing} ${tone} ${className}`}
    >
      <span className="min-w-0">
        {children}
        {/* the arrow keeps to the last word when the label wraps */}
        <span aria-hidden="true" className="whitespace-nowrap">
          &#8288;&nbsp;↗
        </span>
        <span className="sr-only"> (opens their site in a new tab)</span>
      </span>
    </a>
  );
}

export function InvitationFeature({ inv, headingLevel = "h3", className = "" }: { inv: FeatureInvitation; headingLevel?: "h2" | "h3"; className?: string }) {
  const H = headingLevel;
  return (
    <article className={`card overflow-hidden ${className}`}>
      <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        {inv.photo ? (
          <figure className="flex min-w-0 flex-col">
            <div className="relative aspect-[3/2] bg-paper-2 lg:aspect-auto lg:min-h-[340px] lg:flex-1">
              <Image src={inv.photo.src} alt={inv.photo.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
            <Credit photo={inv.photo} className="px-5 py-2.5 sm:px-6" />
          </figure>
        ) : (
          <TopicPanel topic={inv.topics[0]} className="aspect-[3/2] lg:aspect-auto lg:min-h-[340px]" />
        )}
        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <DateChip window={inv.window} />
            {inv.name && <p className="eyebrow text-moss">{inv.name}</p>}
          </div>
          <H className="font-display mt-4 text-3xl leading-[1.12] tracking-tight sm:text-4xl">{inv.title}</H>
          <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-[17px]">{inv.summary}</p>
          <InvitationFacts inv={inv} className="mt-4" />
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4 lg:mt-auto lg:pt-8">
            <OutboundButton href={inv.url} org={inv.org.slug} way="invitation" size="lg">
              {inv.cta}
            </OutboundButton>
            <p className="text-sm text-ink-2">
              With{" "}
              <Link href={`/conservation/${inv.org.slug}`} className="font-medium text-ink underline decoration-line underline-offset-2 hover:text-moss">
                {inv.org.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function InvitationCard({ inv, headingLevel = "h3", className = "" }: { inv: FeatureInvitation; headingLevel?: "h3" | "h4"; className?: string }) {
  const H = headingLevel;
  return (
    <article className={`card flex h-full min-w-0 flex-col overflow-hidden ${className}`}>
      {inv.photo ? (
        <figure>
          <div className="relative aspect-[3/2] bg-paper-2">
            <Image src={inv.photo.src} alt={inv.photo.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <Credit photo={inv.photo} className="px-5 pt-2" />
        </figure>
      ) : (
        <TopicPanel topic={inv.topics[0]} className="aspect-[3/1]" />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <DateChip window={inv.window} />
          {inv.name && <p className="eyebrow text-moss">{inv.name}</p>}
        </div>
        <H className="font-display mt-3 text-xl font-medium leading-snug tracking-tight sm:text-2xl">{inv.title}</H>
        <p className="mt-2 text-sm text-ink-2">
          With{" "}
          <Link href={`/conservation/${inv.org.slug}`} className="font-medium text-ink underline decoration-line underline-offset-2 hover:text-moss">
            {inv.org.name}
          </Link>
        </p>
        <InvitationFacts inv={inv} className="mt-2" />
        <div className="mt-auto pt-5">
          <OutboundButton href={inv.url} org={inv.org.slug} way="invitation">
            {inv.cta}
          </OutboundButton>
        </div>
      </div>
    </article>
  );
}
