/**
 * "Who looks after this" as one line: two organisations, each name linking to
 * its page on this site, with the reason it is shown. Presentational only (it
 * takes plain items, not the library), so the server guide sections and the
 * client GuideLoader render the same strip from the same props.
 */
import Link from "next/link";

export type StripItem = { slug: string; name: string; why: string };

export function OrgStrip({ items, label = "Who looks after this", className = "mt-6" }: { items?: StripItem[] | null; label?: string; className?: string }) {
  if (!items?.length) return null;
  return (
    <div className={`${className} rounded-tile border border-line bg-paper-2/70 px-4 py-3`}>
      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 text-sm">
        <span className="eyebrow">{label}</span>
        {items.map((o) => (
          <span key={o.slug} className="min-w-0">
            <Link href={`/conservation/${o.slug}`} className="font-medium text-moss underline-offset-2 hover:underline">
              {o.name}
            </Link>
            <span className="text-ink-2"> — {o.why}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
