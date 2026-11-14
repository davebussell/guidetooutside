/**
 * The local half of a place's foraging page: the library's edibles that have
 * actually been recorded nearby this month, everything else recorded (named
 * and counted only — never presented as food), the commonest trees, and the
 * hazard roster entries recorded nearby.
 */
import Image from "next/image";
import Link from "next/link";
import type { LocalFind, LocalFlora } from "@/lib/local-flora";
import { atRiskFor, hostsHere, recordedAs } from "@/lib/local-flora";
import { OUTSIDE_RANGE_NOTE as PLANTED_NOTE, monthName } from "@/lib/species";
import { speciesImage } from "@/lib/species-images";
import { SEVERITY_LABEL, hazardSlug, type Hazard } from "@/data/hazards";
import hazardImages from "@/data/hazard-images.json";
import { FLORA_RADIUS_KM, PRESENCE_BOX_KM, PRESENCE_FROM_YEAR } from "@/lib/plant-presence-info";

type HazardPhoto = { src: string; author: string; license: string; licenseUrl: string; source: string };
const HAZARD_PHOTOS = hazardImages as Record<string, HazardPhoto>;

const plural = (n: number) => (n === 1 ? "" : "s");

/**
 * A library species recorded nearby: photograph, name, how often it was recorded, and the trees it keeps company with here.
 * The count is the calendar month's over every year on record (audit of 10 November 2026: "41 records within 40 km this
 * month" at Boston were 32 Novembers' worth from 2018 to 2025 and none from 2026), so the label says so.
 */
function KnownCard({ find, trees, month }: { find: LocalFind; trees: LocalFlora["trees"]; month: number }) {
  const s = find.species!;
  const img = speciesImage(s.slug);
  const hosts = hostsHere(s.slug, trees);
  // Audit of 10 November 2026 (Day 4): "Acorns: 206 records" were records of oak trees; a plant record is of the plant.
  const of = recordedAs(find);
  return (
    <li className="card overflow-hidden flex flex-col">
      <Link href={`/foraging/${s.slug}`} className="group block">
        <div className="relative aspect-[4/3] bg-paper-2 overflow-hidden">
          {img && (
            <Image
              src={img.src}
              alt={`${s.name} (${s.latin})`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover motion-safe:group-hover:scale-[1.03] transition duration-[900ms] ease-settle"
            />
          )}
          {s.deadlyDouble && (
            <span className="absolute top-2 right-2 rounded-full bg-rust px-2.5 py-1 text-[11px] font-semibold text-white">Dangerous look-alike</span>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/foraging/${s.slug}`} className="font-display text-lg font-semibold leading-tight hover:text-moss">
          {s.name}
        </Link>
        <p className="mt-1 text-xs text-ink-2">
          {find.taxon.count} record{plural(find.taxon.count)}
          {of ? ` of ${of}` : null} within {FLORA_RADIUS_KM} km in {monthName(month)}, all years on record
        </p>
        {find.outsideRange && <p className="mt-2 text-sm text-ink-2">{PLANTED_NOTE}</p>}
        {hosts.length > 0 && (
          <p className="mt-2 text-sm text-ink-2">
            Locally associated with <span className="text-ink font-medium">{hosts.join(" and ")}</span>.
          </p>
        )}
      </div>
    </li>
  );
}

/** Anything else recorded nearby: named and counted, linked to its record, never called food. */
function RecordedCard({ find }: { find: LocalFind }) {
  const t = find.taxon;
  const name = t.common ?? t.latin;
  // A species protected where it grows (butternut) carries its status wherever it is named, even as a bare record.
  const risk = atRiskFor(t.latin);
  return (
    <li className="card overflow-hidden flex flex-col">
      <a href={`https://www.inaturalist.org/taxa/${t.id}`} target="_blank" rel="noopener nofollow" className="group block">
        <div className="relative aspect-[4/3] bg-paper-2 overflow-hidden">
          {t.photo && (
            <Image
              src={t.photo.url}
              alt={`${name} (${t.latin})`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
              className="object-cover motion-safe:group-hover:scale-[1.03] transition duration-[900ms] ease-settle"
              unoptimized
            />
          )}
        </div>
      </a>
      <div className="px-3 pt-3 flex-1">
        <p className="font-display text-[15px] font-semibold leading-tight first-letter:uppercase">{name}</p>
        <p className="mt-0.5 text-xs italic text-ink-2">{t.latin}</p>
        <p className="mt-1.5 text-xs text-ink-2">
          {t.count} record{plural(t.count)} nearby
        </p>
        {risk && (
          <p className="mt-1.5 text-xs text-ink-2">
            <span className="font-semibold text-rust">{risk.headline}.</span> {risk.text}{" "}
            {risk.sources.map((src, i) => (
              <span key={src.url}>
                {i > 0 && " · "}
                <a href={src.url} target="_blank" rel="noopener nofollow" className="underline">
                  {i === 0 ? "Ontario" : "Canada"}
                </a>
              </span>
            ))}
            .
          </p>
        )}
      </div>
      {t.photo && (
        <p className="px-3 pb-2.5 font-display text-xs italic leading-snug text-ink-2">
          <a href={t.photo.source} target="_blank" rel="noopener nofollow" className="underline">
            {t.photo.author}
          </a>{" "}
          ·{" "}
          <a href={t.photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
            {t.photo.license}
          </a>
        </p>
      )}
    </li>
  );
}

/**
 * What is out there, near this place, this month.
 *
 * The two halves say different things on purpose. The first is our own library,
 * narrowed to species people have actually found here and ordered by how often.
 * The second is everything else the record holds — the part a hand-written list
 * can never cover — named only.
 */
export function LocalFloraPanel({
  flora,
  month,
  placeName,
  groundNote,
}: {
  flora: LocalFlora;
  month: number;
  placeName: string;
  /** One line about the rock, when it is the kind that changes what grows. */
  groundNote?: string | null;
}) {
  if (!flora.live) return null;
  const alsoFungi = flora.alsoFungi.slice(0, 12);
  const alsoPlants = flora.alsoPlants.slice(0, 6);

  return (
    <section>
      <p className="eyebrow text-moss">
        Found near {placeName} · {monthName(month)}
      </p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
        {flora.known.length ? "Wild edibles recorded nearby" : `Recorded nearby in ${monthName(month)}`}
      </h2>
      <p className="mt-2 max-w-2xl text-ink-2">
        Of the {flora.recorded} most-recorded plant and fungus species within {FLORA_RADIUS_KM} km in {monthName(month)} (verified iNaturalist
        observations from every {monthName(month)} on record, not only this year&apos;s; the search returns at most 200 of each group, so this is not a
        count of everything that grows here),{" "}
        {flora.known.length
          ? "those covered by this guide with two or more records are listed below, most frequently recorded first."
          : "none is among this guide's edibles with two or more records; the commonest records are below, for reference only."}{" "}
        The in-season lists on this page count differently: GBIF records since {PRESENCE_FROM_YEAR} within about {PRESENCE_BOX_KM} km of the town.
      </p>
      {groundNote && <p className="mt-3 max-w-2xl text-ink-2">{groundNote}</p>}

      {flora.known.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flora.known.slice(0, 9).map((f) => (
            <KnownCard key={f.species!.slug} find={f} trees={flora.trees} month={month} />
          ))}
        </ul>
      )}
      {/* Every entry is named, not only the nine with cards: the weekly headline counts them all (plant-presence
          liveForagingHeadline, "… the foraging page lists them"; audit of 11 November 2026). */}
      {flora.known.length > 9 && (
        <p className="mt-4 max-w-3xl text-sm text-ink-2">
          Also with two or more records of the plant or fungus within {FLORA_RADIUS_KM} km in {monthName(month)}:{" "}
          {flora.known.slice(9).map((f, i, rest) => (
            <span key={f.species!.slug}>
              <Link href={`/foraging/${f.species!.slug}`} className="underline decoration-line underline-offset-2 hover:text-moss">
                {f.species!.name}
              </Link>{" "}
              ({f.taxon.count}
              {f.species!.recordOf ? ` records of ${f.species!.recordOf}` : ""}
              {f.outsideRange ? ", likely planted" : ""}){i < rest.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      )}

      {(alsoFungi.length > 0 || alsoPlants.length > 0) && (
        <div className="mt-12">
          <h3 className="font-display text-2xl font-semibold tracking-tight">Other species recorded nearby</h3>
          <p className="mt-2 max-w-2xl text-sm text-ink-2">
            Recorded within {FLORA_RADIUS_KM} km in {monthName(month)}, in any year on record. This guide has no identification notes for these
            species written for this region; use a regional key or an experienced forager to learn them. This is not a list of edibles.
          </p>
          {alsoFungi.length > 0 && (
            <>
              <p className="eyebrow mt-6">Fungi</p>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {alsoFungi.map((f) => (
                  <RecordedCard key={f.taxon.id} find={f} />
                ))}
              </ul>
            </>
          )}
          {alsoPlants.length > 0 && (
            <>
              <p className="eyebrow mt-8">Plants</p>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {alsoPlants.map((f) => (
                  <RecordedCard key={f.taxon.id} find={f} />
                ))}
              </ul>
            </>
          )}
          <p className="mt-5 text-xs text-ink-2">
            Photographs and records from{" "}
            <a href="https://www.inaturalist.org" target="_blank" rel="noopener nofollow" className="underline">
              iNaturalist
            </a>
            , used under their open licences and credited to their photographers.
          </p>
        </div>
      )}
    </section>
  );
}

/** The trees recorded most often nearby, most frequent first. */
export function TreesPanel({ flora, placeName }: { flora: LocalFlora; placeName: string }) {
  if (!flora.trees.length) return null;
  return (
    <section className="card p-6 sm:p-8">
      <p className="eyebrow text-moss">Trees</p>
      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight">Common trees around {placeName}</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-2">
        The trees most often recorded nearby, most frequent first. Most edible mushrooms are associated with particular tree species, so the tree
        cover indicates what to look for.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {flora.trees.map((t) => (
          <li key={t.genus} className="rounded-full border border-edge bg-surface/70 px-3.5 py-1.5 text-sm first-letter:uppercase">
            {t.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

const SEVERITY_CLASS: Record<Hazard["severity"], string> = {
  deadly: "bg-rust text-white",
  serious: "bg-gold-fill/30 text-ink",
  irritant: "bg-paper-2 text-ink-2",
};

function HazardCard({ hazard: h, count }: { hazard: Hazard; count: number }) {
  const img = HAZARD_PHOTOS[hazardSlug(h)];
  const latin = h.genus ? `${h.latin} (the whole genus)` : h.latin;
  return (
    <li className="card overflow-hidden p-5">
      {img && (
        <figure className="-mx-5 -mt-5 mb-4">
          <div className="relative aspect-[3/2] bg-paper-2 sm:aspect-[2/1]">
            <Image src={img.src} alt={`${h.name} (${latin})`} fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${SEVERITY_CLASS[h.severity]}`}>
              {SEVERITY_LABEL[h.severity]}
            </span>
          </div>
          <figcaption className="px-5 pt-2 font-display text-xs italic leading-snug text-ink-2">
            <a href={img.source} target="_blank" rel="noopener nofollow" className="underline">
              {img.author}
            </a>{" "}
            on iNaturalist ·{" "}
            <a href={img.licenseUrl} target="_blank" rel="noopener nofollow" className="underline">
              {img.license}
            </a>
          </figcaption>
        </figure>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {!img && <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${SEVERITY_CLASS[h.severity]}`}>{SEVERITY_LABEL[h.severity]}</span>}
        <span className="text-[11px] text-ink-2">
          {count} record{plural(count)} nearby
        </span>
      </div>
      <h3 className="font-display mt-2 text-xl font-semibold leading-tight">{h.name}</h3>
      <p className="text-sm italic text-ink-2">
        {h.latin}
        {h.genus ? " (the whole genus)" : null}
      </p>
      <dl className="mt-3 grid gap-2.5 text-sm">
        <div>
          <dt className="eyebrow">Mistaken for</dt>
          <dd className="mt-0.5 text-ink-2">{h.confusedWith}</dd>
        </div>
        <div>
          <dt className="eyebrow text-moss">Distinguishing features</dt>
          <dd className="mt-0.5 text-ink-2">{h.tell}</dd>
        </div>
        <div>
          <dt className="eyebrow text-rust">Effects</dt>
          <dd className="mt-0.5 text-ink-2">{h.effect}</dd>
        </div>
      </dl>
    </li>
  );
}

/** The hazard roster entries recorded nearby this month, deadliest first. */
export function HazardPanel({ flora, month, placeName }: { flora: LocalFlora; month: number; placeName: string }) {
  if (!flora.hazards.length) return null;
  const deadly = flora.hazards.filter((x) => x.hazard.severity === "deadly").length;
  return (
    <section id="hazards" className="scroll-mt-24 rounded-tile bg-rust-soft p-6 sm:p-8">
      <p className="eyebrow text-rust">Hazards</p>
      <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">
        Poisonous and dangerous species near {placeName}, {monthName(month)}
      </h2>
      <p className="mt-2 max-w-2xl text-ink-2">
        {flora.hazards.length} species on the hazard list {flora.hazards.length === 1 ? "has" : "have"} been recorded within {FLORA_RADIUS_KM} km in{" "}
        {monthName(month)}, in any year on record
        {deadly ? `, ${deadly} of them potentially fatal to a healthy adult` : null}. Learn these before any species you intend to eat.
      </p>
      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {flora.hazards.map((x) => (
          <HazardCard key={x.hazard.latin} hazard={x.hazard} count={x.count} />
        ))}
      </ul>
      <p className="mt-5 max-w-3xl text-xs text-ink-2">
        These are recorded within {FLORA_RADIUS_KM} km of here in {monthName(month)}, in any year on record, from verified iNaturalist observations. It is not a complete list of what is
        dangerous — nothing is — and a species missing from it may still be in your woods. Never eat anything identified from a photograph and a
        description alone.
      </p>
    </section>
  );
}
