import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import speciesImages from "@/data/species-images.json";
import creatureImages from "@/data/creature-images.json";
import { RegionPick } from "@/components/RegionPick";
import { SERVED_ECOREGIONS as ECOREGIONS } from "@/lib/ecoregions";
import { SPECIES, speciesNow } from "@/lib/species";
import { PRESENCE_BOX_KM } from "@/lib/plant-presence-info";
import { CREATURES, FISH, GARDEN_LIFE, creaturesNow } from "@/lib/nature";

/*
 * The homepage's seasonal strips: wild foods in season, fish active this
 * month, and garden fauna active this month.
 *
 * Region-aware since round two of the regional-accuracy work: the strips are
 * built from the libraries (src/lib/species, src/lib/nature) for every
 * ecological region, and `RegionPick` (client) shows the reader the species
 * in season in their own region and hemisphere once their remembered place is
 * known — a Cape Town reader in October sees the Cape's spring, not Ontario's
 * autumn — and the whole-world list when no place is known. The page itself
 * stays static (revalidated hourly); only the pick happens in the browser.
 */

type Photo = { author: string; license: string; licenseUrl: string; source: string; src: string };

const SPECIES_PHOTOS = speciesImages as Record<string, Photo>;
const CREATURE_PHOTOS = creatureImages as Record<string, Photo>;
const REGIONS = ECOREGIONS as { slug: string; continent?: string; south?: boolean }[];

type PickItem = { key: string; node: ReactNode; regions: "all" | string[] };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

const KIND_LABEL: Record<string, string> = {
  berry: "Berry", fruit: "Fruit", nut: "Nut", mushroom: "Mushroom", green: "Green", root: "Root", coastal: "Coastal", tree: "Tree",
};
const GROUP_LABEL: Record<string, string> = {
  fish: "Fish", pollinator: "Pollinator", beneficial: "Beneficial", pest: "Pest", soil: "Soil life",
};

/** Runs of consecutive months, kept whole across December: [[10, 2]] for October to February. */
function monthRuns(months: number[]): [number, number][] {
  const set = new Set(months);
  if (set.size === 12) return [[1, 12]];
  const runs: [number, number][] = [];
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || set.has(((m + 10) % 12) + 1)) continue;
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) end = (end % 12) + 1;
    runs.push([m, end]);
  }
  return runs;
}
/** "October – November", "March – May, September – October". */
const speciesSeason = (months: number[]) =>
  monthRuns(months)
    .map(([a, b]) => (a === b ? MONTHS[a - 1] : `${MONTHS[a - 1]} – ${MONTHS[b - 1]}`))
    .join(", ");
/** "Year-round", "May–Oct". */
const creatureSeason = (months: number[]) =>
  new Set(months).size === 12
    ? "Year-round"
    : monthRuns(months)
        .map(([a, b]) => (a === b ? SHORT[a - 1] : `${SHORT[a - 1]}–${SHORT[b - 1]}`))
        .join(", ");

function Credit({ photo }: { photo: Photo }) {
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
  href, photo, alt, label, season, name, latin, text, cta, priority,
}: {
  href: string; photo?: Photo; alt: string; label: string; season: string; name: string; latin: string; text: string; cta: string; priority?: boolean;
}) {
  return (
    <li className="card overflow-hidden flex flex-col">
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] bg-paper-2 overflow-hidden">
          {photo && (
            <Image
              src={photo.src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover motion-safe:group-hover:scale-[1.03] transition duration-[900ms] ease-settle"
              priority={priority}
            />
          )}
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
        {photo && <Credit photo={photo} />}
      </div>
    </li>
  );
}

function StripHead({ eyebrow, tone, title, intro, more }: { eyebrow: string; tone: string; title: string; intro: string; more?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className={`eyebrow ${tone}`}>{eyebrow}</p>
        <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-ink-2 max-w-2xl">{intro}</p>
      </div>
      {more && (
        <Link href={more.href} className="text-sm text-ink-2 hover:text-ink underline decoration-line whitespace-nowrap">
          {more.label}
        </Link>
      )}
    </div>
  );
}

/**
 * The items for RegionPick: one card per species per continent group (North
 * America, Europe, northern Africa, southern Africa), carrying the regions in
 * that group where the species is in season this month and its best rank in
 * those regions' own lists. The library's months are northern and a southern
 * region reads them half a year on (src/lib/ecoregions libraryMonth), so the
 * southern card shows the shifted months. The rank keeps the libraries'
 * native-first order within the reader's continent — a species written for
 * that continent before an introduced or cosmopolitan one — so a Cape Town
 * reader sees waterblommetjie and galjoen before chickweed and largemouth
 * bass. Sorted by rank, then group, then name; with no place known the first
 * cards are the North American leaders, as before.
 */
type Group = { id: string; regions: string[] };
const GROUPS: Group[] = [
  { id: "na", regions: REGIONS.filter((r) => continentOf(r) === "north-america").map((r) => r.slug) },
  { id: "eu", regions: REGIONS.filter((r) => continentOf(r) === "europe").map((r) => r.slug) },
  { id: "af", regions: REGIONS.filter((r) => continentOf(r) === "africa" && !r.south).map((r) => r.slug) },
  { id: "af-s", regions: REGIONS.filter((r) => continentOf(r) === "africa" && r.south).map((r) => r.slug) },
  // REGIONS holds the served regions only (src/lib/scope.ts), so a parked continent's group is empty and is dropped.
].filter((g) => g.regions.length > 0);
function continentOf(r: { continent?: string }): string {
  return r.continent ?? "north-america";
}
type Placed<T> = { item: T; group: Group; regions: string[]; months: number[]; rank: number };
function placeItems<T extends { slug: string; months: number[]; regions?: "all" | string[] }>(now: (regionSlug: string) => T[]): Placed<T>[] {
  const out: Placed<T>[] = [];
  for (const group of GROUPS) {
    const map = new Map<string, Placed<T>>();
    for (const slug of group.regions) {
      now(slug).forEach((item, i0) => {
        // A cosmopolitan weed leads only a region with nothing else in season; keep it behind the regional species.
        const i = item.regions === "all" ? i0 + 20 : i0;
        const e = map.get(item.slug) ?? { item, group, regions: [], months: item.months, rank: i };
        e.regions.push(slug);
        e.months = item.months;
        e.rank = Math.min(e.rank, i);
        map.set(item.slug, e);
      });
    }
    out.push(...map.values());
  }
  return out.sort((a, b) => a.rank - b.rank || GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || a.item.slug.localeCompare(b.item.slug));
}

/**
 * Wild foods typically ready this month: the reader's own region once a place
 * is known, else anywhere the guide covers. The cards lead with the species
 * the library gives a hardiness-zone range, by name.
 */
export function SeasonNow({ month, limit = 3 }: { month: number; limit?: number }) {
  const inSeason = SPECIES.filter((s) => s.months.includes(month));
  const items: PickItem[] = placeItems((slug) => speciesNow(month, slug)).map((p, i) => ({
    key: `${p.item.slug}-${p.group.id}`,
    regions: p.regions,
    node: (
      <Card
        href={`/foraging/${p.item.slug}`}
        photo={SPECIES_PHOTOS[p.item.slug]}
        alt={`${p.item.name} (${p.item.latin})`}
        label={KIND_LABEL[p.item.kind] ?? p.item.kind}
        season={speciesSeason(p.months)}
        name={p.item.name}
        latin={p.item.latin}
        text={p.item.identify}
        cta={`Identification${p.item.lookalikes ? " and look-alikes" : ""} →`}
        priority={i < limit}
      />
    ),
  }));
  const name = MONTHS[month - 1];
  return (
    <section>
      <StripHead
        eyebrow={`Regional list · ${name}`}
        tone="text-rust"
        title="Wild foods the guide gives for this month"
        intro={`${inSeason.length} wild edibles the guide gives for ${name} across Canada and the United States. A regional list, not checked near any one town: it does not say any of them is in season, growing or legal to pick where you are. A town's foraging page lists only what has been recorded within about ${PRESENCE_BOX_KM} km of it.`}
      />
      <RegionPick items={items} limit={limit} title="Regional list" className="mt-6" />
      {inSeason.length > limit && (
        <p className="mt-4 text-sm">
          <Link href="/foraging/calendar" className="font-medium text-moss hover:underline">
            {inSeason.length - limit} more on the regional list{": foraging calendar →"}
          </Link>
        </p>
      )}
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Photographs are research-grade observations from iNaturalist, each credited to its photographer. They show a typical specimen,
        not every variation — never identify from a photo alone. Confirm with a regional field guide or an experienced forager before you
        eat anything wild.
      </p>
    </section>
  );
}

const WILDLIFE = {
  fish: {
    eyebrow: "Fish",
    title: "Fish of your region this month",
    intro: (m: string) =>
      `Sport fish that anglers in your region typically target in ${m}: where each holds, how to identify it, and the method that usually takes it. This is regional context, not a check near any town: whether a fish lives in a water near you, and whether it may be fished now, depends on the place and the regulator's rules (see your town's fishing page).`,
    more: "All fish species →",
    cta: "Habitat and methods →",
  },
  garden: {
    eyebrow: "Garden fauna",
    title: "Garden insects and soil life active this month",
    intro: (m: string) =>
      `Pollinators, predators, soil organisms and pests active in ${m}. Most are beneficial; identify the few pests before treating anything.`,
    more: "All garden species →",
    cta: "Role in the garden →",
  },
} as const;

/**
 * Fish, or garden creatures, active this month: in the reader's own region
 * and hemisphere once a place is known, else anywhere. Within each group the
 * species with a regional range come before the ones found everywhere.
 */
export function WildlifeNow({ kind, month, limit = 3 }: { kind: "fish" | "garden"; month: number; limit?: number }) {
  const t = WILDLIFE[kind];
  const pool = kind === "fish" ? FISH : GARDEN_LIFE;
  const items: PickItem[] = placeItems((slug) => creaturesNow(pool, month, slug)).map((p) => ({
    key: `${p.item.slug}-${p.group.id}`,
    regions: p.regions,
    node: (
      <Card
        href={`/wildlife/${p.item.slug}`}
        photo={CREATURE_PHOTOS[p.item.slug]}
        alt={`${p.item.name} (${p.item.latin})`}
        label={GROUP_LABEL[p.item.group] ?? p.item.group}
        season={creatureSeason(p.months)}
        name={p.item.name}
        latin={p.item.latin}
        text={p.item.identify}
        cta={t.cta}
      />
    ),
  }));
  const name = MONTHS[month - 1];
  return (
    <section>
      <StripHead eyebrow={`${t.eyebrow} · ${name}`} tone="text-azure" title={t.title} intro={t.intro(name)} more={{ href: "/wildlife", label: t.more }} />
      <RegionPick items={items} limit={limit} title={kind === "fish" ? "Typical this month" : "Active now"} className="mt-6" />
      <p className="mt-6 text-xs text-ink-2 max-w-3xl">
        Photographs are research-grade observations from iNaturalist, each credited to its photographer. Ranges and timing are typical, not
        guaranteed — {CREATURES.length} species are covered across Canada and the United States.
      </p>
    </section>
  );
}

