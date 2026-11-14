/**
 * The season band's frame: eyebrow with the month, heading, lede, then one
 * featured invitation and two cards (or two cards, or one alone), and a link
 * to every open invitation. Plain props only, for the server band and its
 * client redraw alike.
 */
import Link from "next/link";
import type { FeatureInvitation } from "@/lib/conservation/invitations";
import { InvitationCard, InvitationFeature } from "./InvitationFeature";
import { BAND, DISCLOSURE } from "./OrgsPanel";

export function SeasonBandView({
  items,
  month,
  heading,
  lede,
  id,
  className = "",
}: {
  items: FeatureInvitation[];
  month: string;
  heading: string;
  lede?: string;
  id: string;
  className?: string;
}) {
  if (!items.length) return null;
  const [first, ...rest] = items;
  return (
    <section className={`${BAND} ${className}`} aria-labelledby={id}>
      <p className="eyebrow text-moss">Open invitations · {month}</p>
      <h2 id={id} className="font-display mt-2 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
        {lede ?? "Counts, surveys and days out that the organisations in our library are running now; each button opens their own page."} {DISCLOSURE}
      </p>
      {items.length === 2 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((inv) => (
            <InvitationCard key={inv.slug} inv={inv} />
          ))}
        </div>
      ) : (
        <>
          <InvitationFeature inv={first} className="mt-8" />
          {rest.length > 0 && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {rest.map((inv) => (
                <InvitationCard key={inv.slug} inv={inv} />
              ))}
            </div>
          )}
        </>
      )}
      <p className="mt-6 text-[15px]">
        <Link href="/conservation#invitations" className="font-medium text-moss underline-offset-2 hover:underline">
          Every open invitation →
        </Link>
      </p>
    </section>
  );
}
