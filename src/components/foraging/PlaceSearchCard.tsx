/**
 * A card asking for a place: eyebrow, heading, a line of text and the
 * location search. The species pages close with "Local season" (inside
 * LocalAnswer, which swaps it for a link once a place is set); the medicinal
 * page with "By place".
 */
import { LocationSearch } from "@/components/LocationSearch";

export function PlaceSearchCard({ eyebrow, title, text, className = "mt-12" }: { eyebrow: string; title: string; text: string; className?: string }) {
  return (
    <section className={`${className} card p-6 sm:p-8`}>
      <p className="eyebrow text-moss">{eyebrow}</p>
      <h2 className="font-display mt-1 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-ink-2 max-w-2xl text-sm">{text}</p>
      <div className="mt-4 max-w-xl">
        <LocationSearch />
      </div>
    </section>
  );
}
