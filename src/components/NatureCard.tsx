/**
 * A photograph card for a wild edible or a creature, as place pages list
 * them: the photograph, kind and season, name and Latin name, a line of
 * identification, the link on, and the photo credit.
 */
import Image from "next/image";
import Link from "next/link";
import type { Species } from "@/lib/species";
import { monthRange } from "@/lib/species";
import type { Creature } from "@/lib/nature";
import { GROUP_LABEL } from "@/lib/nature";
import { speciesImage } from "@/lib/species-images";
import { creatureImage } from "@/lib/creature-images";
import { shortMonthRange } from "@/lib/month-range";

type Photo = { src: string; author: string; license: string; licenseUrl: string; source: string };

// The month-run helper lives in src/lib/month-range.ts (Day 5 audit, 14 November 2026), so the fishing page's library
// code and the check scripts use the same function without bundling this component; re-exported for the components
// that import it from here.
export { shortMonthRange };

const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function PhotoCredit({ photo }: { photo: Photo }) {
  return (
    <p className="mt-2 font-display text-xs italic text-ink-2">
      Photo:{" "}
      <a href={photo.source} target="_blank" rel="noopener nofollow" className="underline">
        {photo.author}
      </a>{" "}
      ·{" "}
      <a href={photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
        {photo.license}
      </a>
    </p>
  );
}

function Card({
  href,
  photo,
  alt,
  label,
  season,
  name,
  latin,
  text,
  cta,
  priority,
  badge,
}: {
  href: string;
  photo: Photo | null;
  alt: string;
  label: string;
  season: string;
  name: string;
  latin: string;
  text: string;
  cta: React.ReactNode;
  priority?: boolean;
  badge?: string;
}) {
  return (
    <li className="card overflow-hidden flex flex-col">
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] bg-paper-2 overflow-hidden">
          {photo ? (
            <Image
              src={photo.src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover motion-safe:group-hover:scale-[1.03] transition duration-[900ms] ease-settle"
              priority={priority}
            />
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
              <span className="font-display text-base italic text-ink-2">{latin}</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-2">No open-licence photograph</span>
            </span>
          )}
          {badge && <span className="absolute top-2 right-2 rounded-sm bg-rust text-white text-[11px] font-semibold px-2 py-0.5">{badge}</span>}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{label}</span>
          <span className="text-[11px] text-ink-2">{season}</span>
        </div>
        <h3 className="font-display mt-1.5 text-lg font-semibold leading-tight">
          <Link href={href} className="hover:text-moss">
            {name}
          </Link>
        </h3>
        <p className="text-xs italic text-ink-2">{latin}</p>
        <p className="mt-2 text-sm text-ink-2 flex-1">{text}</p>
        <Link href={href} className="mt-3 text-sm font-medium text-moss hover:underline">
          {cta}
        </Link>
        {photo && <PhotoCredit photo={photo} />}
      </div>
    </li>
  );
}

export function SpeciesCard({ species: s, priority }: { species: Species; priority?: boolean }) {
  return (
    <Card
      href={`/foraging/${s.slug}`}
      photo={speciesImage(s.slug)}
      alt={`${s.name} (${s.latin})`}
      label={capital(s.kind)}
      season={monthRange(s.months)}
      name={s.name}
      latin={s.latin}
      text={s.identify}
      cta={
        <>
          {"Identification"}
          {s.lookalikes ? " and look-alikes" : ""}
          {" →"}
        </>
      }
      priority={priority}
      badge={s.deadlyDouble ? "Poisonous look-alike" : undefined}
    />
  );
}

export function CreatureCard({ creature: c, priority }: { creature: Creature; priority?: boolean }) {
  return (
    <Card
      href={`/wildlife/${c.slug}`}
      photo={creatureImage(c.slug)}
      alt={`${c.name} (${c.latin})`}
      label={GROUP_LABEL[c.group]}
      season={shortMonthRange(c.months)}
      name={c.name}
      latin={c.latin}
      text={c.identify}
      cta={c.group === "fish" ? "Habitat and methods →" : "Role in the garden →"}
      priority={priority}
    />
  );
}

/** A row of pill links: "Ground beetle · Apr–Oct". */
export function Chips({ items, className = "" }: { items: { href: string; label: string; note?: string }[]; className?: string }) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="inline-block rounded-full bg-surface border border-edge px-3.5 py-1.5 text-sm hover:border-moss hover:text-moss transition"
            >
              {it.label} {it.note && <span className="text-ink-2 text-xs">· {it.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
