import Link from "next/link";
import { ActivityArt } from "@/components/learn/ActivityArt";
import { LocationSearch } from "@/components/LocationSearch";
import { POPULAR_LOCATIONS } from "@/lib/site";
import { cookiePlace } from "@/lib/kids/here";
import { regionContext } from "@/lib/region-context";

export type FinderTile = { art: string; title: string; note: string };

/** The skeleton the finder streams in over. */
export function FinderSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true">
      <div className="h-3 w-40 rounded bg-line/70" />
      <div className="mt-4 h-10 w-96 max-w-full rounded bg-line" />
    </div>
  );
}

/**
 * The place finder at the top of /learn/count and /learn/plan: what the page
 * does, four tiles, the search, and ten towns to start from. Read per request
 * (the remembered place), so it streams in behind a skeleton.
 */
export async function LearnFinder({ base, eyebrow, title, intro, tiles }: { base: string; eyebrow: string; title: string; intro: string; tiles: FinderTile[] }) {
  // The reader's own postal word ("Town or postcode" in Britain, "ZIP code" in the US); neutral when no place is remembered.
  const ctx = regionContext(await cookiePlace());
  return (
    <>
      <p className="eyebrow text-moss">{eyebrow}</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">{intro}</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-hidden="true">
        {tiles.map((t) => (
          <div key={t.title} className="card flex items-center gap-3 p-3">
            <ActivityArt art={t.art} className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
            <span className="min-w-0">
              <span className="font-display block text-[15px] font-semibold leading-tight">{t.title}</span>
              <span className="mt-0.5 block text-xs text-ink-2">{t.note}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-2xl">
        <LocationSearch large />
        <p className="mt-2 text-sm text-ink-2">{ctx.searchPlaceholder} — or use your location.</p>
      </div>
      <div className="mt-8">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-2">Or start from one of these</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {POPULAR_LOCATIONS.slice(0, 10).map((l) => (
            <Link
              key={l.slug}
              href={`${base}/${l.slug}`}
              className="rounded-full border border-edge bg-surface px-3.5 py-1.5 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
