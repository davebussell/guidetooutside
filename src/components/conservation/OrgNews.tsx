/**
 * The organisations' own articles: a row of up to three (or six, two rows)
 * cards — the feed's image through the Image CDN when it has one, the
 * organisation's name, the headline and the date — each opening the article
 * on the organisation's site. Headlines only; nothing of the article itself
 * is copied here. Renders nothing when there is no news.
 */
import type { NewsCard } from "@/lib/conservation/news-types";

export function OrgNews({
  items,
  heading = "Latest from the organisations",
  headingLevel = "h3",
  eyebrow,
  id,
  className = "",
  max = 3,
}: {
  items: NewsCard[];
  heading?: string;
  headingLevel?: "h2" | "h3";
  eyebrow?: string;
  id?: string;
  className?: string;
  max?: number;
}) {
  const shown = items.slice(0, max);
  if (!shown.length) return null;
  const H = headingLevel;
  return (
    <section className={className} aria-labelledby={id}>
      {eyebrow && <p className="eyebrow text-moss">{eyebrow}</p>}
      <H id={id} className={`font-display tracking-tight ${headingLevel === "h2" ? "mt-2 text-3xl sm:text-4xl" : "text-2xl"}`}>
        {heading}
      </H>
      <ul className={`mt-5 grid gap-5 ${shown.length > 1 ? "sm:grid-cols-2" : "max-w-md"} ${shown.length > 2 ? "lg:grid-cols-3" : ""}`}>
        {shown.map((n) => (
          <li key={n.url} className="min-w-0">
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              data-gto-out="org"
              data-gto-org={n.org.slug}
              data-gto-way="article"
              className="card group flex h-full flex-col overflow-hidden transition hover:border-moss"
            >
              {n.imageSrc ? (
                <span className="relative block aspect-[16/10] overflow-hidden bg-paper-2">
                  {/* Drawn by the Netlify Image CDN from the organisation's own feed image (640 × 400). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.imageSrc} alt="" width={640} height={400} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                </span>
              ) : (
                // No feed image: a calm tinted block with the organisation's name, so a row of
                // cards stays even and an article without a picture still reads as deliberate.
                <span aria-hidden="true" className="relative flex aspect-[16/10] items-end overflow-hidden bg-moss-soft p-5">
                  <span className="font-display text-2xl leading-tight text-moss/80 line-clamp-3">{n.org.name}</span>
                </span>
              )}
              <span className="flex flex-1 flex-col p-5">
                <span className="eyebrow text-moss">{n.org.name}</span>
                <span className="font-display mt-2 text-lg font-medium leading-snug text-ink group-hover:text-moss">{n.title}</span>
                <span className="mt-auto pt-3 text-sm text-ink-2">
                  {n.dateLabel}
                  <span aria-hidden="true"> · ↗</span>
                  <span className="sr-only"> (opens their site in a new tab)</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-2">From the organisations&apos; own sites; the headlines open their articles there.</p>
    </section>
  );
}
