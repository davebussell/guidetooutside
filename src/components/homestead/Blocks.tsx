/**
 * The building blocks the Homesteading pages share: the sources box, the
 * "what to check" box, breed lists, the firewood table and topic cards. Class
 * strings follow the species, wildlife and calendar pages.
 */
import Image from "next/image";
import Link from "next/link";
import { SOURCES, HOMESTEAD_REVIEWED, type SourceId } from "@/data/homestead/sources";
import { BREEDS, ANIMAL_LABEL, ANIMAL_TOPIC, type Animal, type Breed } from "@/data/homestead/breeds";
import { FIREWOOD, WOOD_REGION_LABEL, type WoodRegion } from "@/data/homestead/firewood";
import { continentServed } from "@/lib/scope";
import type { HomesteadTopic } from "@/data/homestead/topics";
import { homesteadImage } from "@/lib/homestead/images";
import { CardCredit } from "./Credit";

const reviewedLabel = new Date(HOMESTEAD_REVIEWED + "T12:00:00Z").toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/** "Checked against these sources · last reviewed October 2026". */
export function SourcesBox({ ids, note }: { ids: SourceId[]; note?: string }) {
  return (
    <section className="rounded-tile border border-line bg-paper-2/60 p-5 text-sm text-ink-2">
      <p className="font-semibold text-ink">
        Checked against these sources · <time dateTime={HOMESTEAD_REVIEWED}>last reviewed {reviewedLabel}</time>
      </p>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {ids.map((id) => {
          const s = SOURCES[id];
          return (
            <li key={id} className="min-w-0">
              <a href={s.url} target="_blank" rel="noopener nofollow" className="break-words underline decoration-line underline-offset-2 hover:text-ink">
                {s.publisher} — {s.title}
              </a>
            </li>
          );
        })}
      </ul>
      {note && <p className="mt-3 text-xs text-ink-2">{note}</p>}
    </section>
  );
}

/** Local rules are never stated: what to check, and with whom. */
export function CheckBox({ items, title = "What to check, and with whom" }: { items: { what: string; who: string }[]; title?: string }) {
  return (
    <section className="rounded-tile border border-line bg-paper-2/60 p-5 text-sm text-ink-2">
      <p className="eyebrow">Rules are local</p>
      <h2 className="font-display mt-1 text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-3xl">
        Rules on keeping animals, collecting water and burning wood differ from one town, province, state and country to the next, and change. This guide does not state them; it names what to ask and who answers.
      </p>
      <ul className="mt-3 grid gap-2">
        {items.map((c) => (
          <li key={c.what} className="border-t border-line/70 pt-2">
            <span className="text-ink">{c.what}</span>: {c.who}.
          </li>
        ))}
      </ul>
    </section>
  );
}

const FIT_BADGE = "mt-px inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";

function FitBadges({ b }: { b: Breed }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {b.cold === "suited" && <span className={`${FIT_BADGE} bg-azure-soft text-azure`}>Cold-hardy</span>}
      {b.cold === "cool" && <span className={`${FIT_BADGE} bg-azure-soft text-azure`}>Best in cool climates</span>}
      {b.heat === "suited" && <span className={`${FIT_BADGE} bg-gold-soft text-gold`}>Heat-tolerant</span>}
      {b.heat === "poor" && <span className={`${FIT_BADGE} bg-paper-2 text-ink-2`}>Dislikes heat</span>}
      {b.cold === "poor" && <span className={`${FIT_BADGE} bg-paper-2 text-ink-2`}>Dislikes cold</span>}
    </span>
  );
}

/** The breeds of one animal, with their climate fit and source. */
export function BreedList({ animal, heading = true }: { animal: Animal; heading?: boolean }) {
  const list = BREEDS.filter((b) => b.animal === animal);
  return (
    <div>
      {heading && (
        <p className="eyebrow">
          <Link href={`/homesteading/${ANIMAL_TOPIC[animal]}`} className="hover:text-ink">
            {ANIMAL_LABEL[animal]}
          </Link>{" "}
          <span className="font-normal text-ink-2">· {list.length}</span>
        </p>
      )}
      <ul className="mt-3 divide-y divide-line/70 card px-5">
        {list.map((b) => (
          <li key={b.name} className="py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
              <p className="font-medium text-ink">
                {b.name} <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{b.use}</span>
              </p>
              <FitBadges b={b} />
            </div>
            <p className="mt-1 text-sm text-ink-2">
              {b.note}{" "}
              <a href={SOURCES[b.source].url} target="_blank" rel="noopener nofollow" className="text-xs underline decoration-line underline-offset-2 hover:text-ink">
                {SOURCES[b.source].publisher.replace(/ \(.*\)$/, "")}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Heat in a stacked cubic metre and a cord, by species and region: the trees of the served continents only
 * (src/lib/scope.ts), with the bars scaled to the densest wood shown. One region fills the width in columns; several
 * stand side by side.
 */
export function FirewoodTable({ regions = ["north-america", "europe", "africa"] }: { regions?: WoodRegion[] }) {
  const shown = regions.filter((r) => continentServed(r));
  const woods = FIREWOOD.filter((f) => shown.includes(f.region));
  const max = Math.max(...woods.map((f) => f.kwhStere));
  const one = shown.length === 1;
  return (
    <div className={one ? "" : "grid gap-8 lg:grid-cols-3"}>
      {shown.map((r) => {
        const rows = woods.filter((f) => f.region === r);
        return (
          <div key={r} className="min-w-0">
            <p className="eyebrow">
              {WOOD_REGION_LABEL[r]} <span className="font-normal text-ink-2">· {rows.length}</span>
            </p>
            <ul className={one ? "mt-2 gap-8 sm:columns-2 lg:columns-3 [&>li]:mb-1 [&>li]:break-inside-avoid" : "mt-2 grid gap-1"}>
              {rows.map((f) => (
                <li key={f.latin} className="rounded-md px-1.5 py-1 -mx-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 text-sm font-medium">
                      {f.name} <span className="text-xs font-normal italic text-ink-2">{f.latin}</span>
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-ink-2">
                      {f.kwhStere.toLocaleString("en")} kWh · {f.mbtuCord.toFixed(1)} MBTU
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-paper-2">
                    <div className={`h-1.5 rounded-full ${f.kind === "conifer" ? "bg-moss/60" : "bg-rust/60"}`} style={{ width: `${(f.kwhStere / max) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** A topic as a photo card, like the calendar's species cards. */
export function TopicCard({ topic, priority = false }: { topic: HomesteadTopic; priority?: boolean }) {
  const img = homesteadImage(topic.image);
  const href = `/homesteading/${topic.slug}`;
  return (
    <li className="card overflow-hidden flex flex-col">
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] bg-paper-2 overflow-hidden">
          {img && (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover motion-safe:group-hover:scale-[1.03] transition duration-[900ms] ease-settle"
            />
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{topic.eyebrow}</span>
        </div>
        <h3 className="font-display mt-1.5 text-lg font-semibold leading-tight">
          <Link href={href} className="hover:text-moss">
            {topic.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink-2 flex-1">{topic.note}.</p>
        <Link href={href} className="mt-3 text-sm font-medium text-moss hover:underline">
          Read the guide →
        </Link>
        {img && <CardCredit image={img} />}
      </div>
    </li>
  );
}
