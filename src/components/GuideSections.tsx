/**
 * The weekly guide, rendered on the server from a stored record: the overview
 * (summary and three section cards) or one section in full. The same markup as
 * the client GuideLoader renders once its fetch lands, so a stored guide and a
 * freshly written one look identical.
 */
import Image from "next/image";
import Link from "next/link";
import type { Guide, GuideItem, GuideView, LocalData } from "@/lib/types";
import { isCodedWaterName, matches, sectionLabel, type GuideSection } from "@/lib/guide-check";
import { closedSpeciesNow, vetStoredFishing } from "@/lib/guide-ai";
import { frostDatesOf, gardenYear } from "@/lib/garden-year";
import { matchSpecies } from "@/lib/species";
import { CREATURES, type Creature } from "@/lib/nature";
import { waterLines } from "@/lib/place-profile";
import { tidalRegsFor } from "@/lib/region-regs";
import speciesImages from "@/data/species-images.json";
import creatureImages from "@/data/creature-images.json";
import type { GuideFilm } from "@/lib/fish-films";
import { FilmRow } from "@/components/SpeciesVideos";
import { OrgStrip } from "@/components/conservation/OrgStrip";
import { guideStrip, type GuideStripSection } from "@/lib/conservation/strips";

type Photo = { src: string };
const SPECIES_PHOTOS = speciesImages as Record<string, Photo>;
const CREATURE_PHOTOS = creatureImages as Record<string, Photo>;

/** The section's "Who looks after this" strip (it replaced the shopping links). */
const stripFor = (place: LocalData["place"], section: GuideStripSection, data: LocalData) => guideStrip(place, section, data.water);

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** The library creature a guide's fish name refers to: by binomial first, then by common name. */
function matchCreature(name: string, list: Creature[] = CREATURES): Creature | undefined {
  const n = norm(name);
  if (!n) return undefined;
  for (const c of list) {
    const latin = norm(c.latin.replace(/ (spp\.?|[a-z]+idae|[a-z]+ini)$/i, ""));
    if (latin.split(" ").length > 1 && n.includes(latin)) return c;
  }
  for (const c of list) {
    const common = norm(c.name.replace(/\(.*?\)/g, ""));
    if (common.length >= 5 && (n.includes(common) || common.includes(n))) return c;
    const alt = norm((c.name.match(/\((.*?)\)/) || [])[1] ?? "");
    if (alt.length >= 5 && n.includes(alt)) return c;
    // The alternative names now live in `localNames` ("Elf" for bluefish in South Africa), not in the name. Only the whole
    // name answers to one: "American shad" is not bluefish.
    if (((c as Creature & { localNames?: { name: string }[] }).localNames ?? []).some((ln) => norm(ln.name) === n)) return c;
  }
  return undefined;
}

function Items({
  items,
  empty,
  withPhotos = false,
  photos = "species",
  films,
  season,
}: {
  items: (GuideItem & { where?: string; lookalikes?: string })[];
  empty?: string;
  withPhotos?: boolean;
  photos?: "species" | "fish";
  films?: Record<string, GuideFilm>;
  season?: string;
}) {
  if (!items?.length) return empty ? <p className="text-sm text-ink-2">{empty}</p> : null;
  return (
    <ul className="divide-y divide-line/70">
      {items.map((it, i) => {
        const sp = withPhotos && photos === "species" ? matchSpecies(it.name) : undefined;
        const fish = withPhotos && photos === "fish" ? matchCreature(it.name) : undefined;
        const href = sp ? `/foraging/${sp.slug}` : fish ? `/wildlife/${fish.slug}` : null;
        const img = sp ? (SPECIES_PHOTOS[sp.slug] ?? null) : fish ? (CREATURE_PHOTOS[fish.slug] ?? null) : null;
        const alt = sp?.name ?? fish?.name ?? it.name;
        return (
          <li key={`${it.name}-${i}`} className="py-3 flex gap-3">
            {img && href && (
              <Link href={href} className="shrink-0">
                <span className="block relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-paper-2">
                  <Image src={img.src} alt={alt} fill sizes="96px" className="object-cover" />
                </span>
              </Link>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {href ? (
                  <Link href={href} className="hover:text-moss underline decoration-line">
                    {it.name}
                  </Link>
                ) : (
                  it.name
                )}
              </p>
              {it.where && (
                <p className="text-xs text-ink-2 mt-0.5">
                  {"Where: "}
                  {it.where}
                </p>
              )}
              <p className="text-sm text-ink-2 mt-1">{it.detail}</p>
              {it.lookalikes && (
                <p className="text-sm mt-1 text-rust">
                  <span className="font-semibold">Look-alikes:</span> {it.lookalikes}
                </p>
              )}
              {it.caution && (
                <p className="text-sm mt-1 text-rust">
                  <span className="font-semibold">Caution:</span> {it.caution}
                </p>
              )}
              {href && (
                <Link href={href} className="mt-1 inline-block text-xs font-medium text-moss hover:underline">
                  {fish ? "Habitat and methods →" : "Identification →"}
                </Link>
              )}
              {fish && films?.[fish.slug] && (
                <FilmRow
                  v={films[fish.slug]}
                  label={
                    films[fish.slug].now && season
                      ? `Video · fishing for ${fish.name.toLowerCase()} in ${season}`
                      : `Video · fishing for ${fish.name.toLowerCase()} in this region`
                  }
                  tag={films[fish.slug].tag}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The named waters near the town, less the ones the water setting says are
 * not fishing water (sewage works, pools, canals, closed drinking-water
 * reservoirs — src/lib/water-setting `avoid`), which are counted instead of
 * listed; a water that is only likely closed is listed with the warning.
 * Since 10 November 2026 the map look-up reaches 20 km for rivers but 10 km
 * for lakes and 5 km for streams (waters.ts WATER_RADII_KM), so the heading
 * no longer says "within 20 km"; each water carries its own distance.
 */
function NamedWaters({ data }: { data: LocalData }) {
  const avoid = new Map((data.water?.avoid ?? []).map((w) => [w.name, w.avoid]));
  // A database code ("Trib 00774 To Darby Creek") is not a water's name (audit, 10 November 2026); it is not counted as left out either.
  const named = data.waters.filter((w) => !isCodedWaterName(w.name));
  const shown = named.filter((w) => !avoid.get(w.name)?.certain);
  const left = named.length - shown.length;
  return (
    <Block title="Named waters near here">
      <p className="text-sm text-ink-2">
        {shown.map((x) => `${x.name} (${x.distanceKm} km${avoid.has(x.name) ? "; check it is open" : ""})`).join(" · ")}
        {left > 0 && (
          <span className="block mt-1 text-xs">
            {left === 1 ? "One named water left out: it is " : `${left} named waters left out: they are `}
            {[...new Set(named.filter((w) => avoid.get(w.name)?.certain).map((w) => avoid.get(w.name)!.reason))].slice(0, 3).join("; ")}.
          </span>
        )}
      </p>
    </Block>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1.5 text-sm text-ink-2">
      {items.map((t, i) => (
        <li key={`${t.slice(0, 20)}-${i}`} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-1">{title}</h3>
      {children}
    </div>
  );
}

/** "AI-written from local data" for a section the model wrote and the check passed; "Seasonal guide" for one built from the site's records. */
function SourceNote({ guide, section }: { guide: Guide; section: GuideSection | "overview" }) {
  return <span className="text-ink-2 text-xs">{sectionLabel(guide, section)}</span>;
}

export function GardeningGuide({ data, guide }: { data: LocalData; guide: Guide }) {
  const g = guide.gardening;
  const phase = gardenYear(new Date(`${data.today}T12:00:00`), frostDatesOf(data.climate)).phase.id;
  const late = phase === "harvest" || phase === "bed" || phase === "rest";
  const anySowing = g.sowOutdoorsNow.length > 0 || g.startIndoorsNow.length > 0;
  const sowing = (
    <div className="grid gap-6 md:grid-cols-2">
      <Block title={late ? "Remaining plantings" : "Sow outdoors"}>
        <Items items={g.sowOutdoorsNow} empty="No outdoor sowings this week." />
      </Block>
      <Block title="Start indoors">
        <Items items={g.startIndoorsNow} empty="No indoor sowings this week." />
      </Block>
    </div>
  );
  return (
    <section className="card p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-moss">
          {"Gardening · "}
          {data.place.name}
          {" · this week"}
        </p>
        <SourceNote guide={guide} section="gardening" />
      </div>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold leading-tight">{g.headline}</h2>
      <p className="mt-3 text-sm text-ink-2">{g.zoneNotes}</p>
      <div className="mt-6 grid gap-8">
        {!late && sowing}
        <Block title={late ? "Harvest and storage" : "Harvest"}>
          <Items items={g.harvestNow} empty={late ? "Beds are cleared; stored crops are the remaining harvest." : "No crops ready to harvest yet."} />
        </Block>
        <div className="grid gap-6 md:grid-cols-2">
          <Block title="Tasks this week">
            <Bullets items={g.tasksThisWeek} />
          </Block>
          <Block title="Risks">
            <Bullets items={g.watchOut} />
          </Block>
        </div>
        {late && anySowing && sowing}
        <OrgStrip items={stripFor(data.place, "gardening", data)} />
      </div>
    </section>
  );
}

export function FishingGuide({ data, guide, films }: { data: LocalData; guide: Guide; films?: Record<string, GuideFilm> }) {
  const f = guide.fishing;
  const w = data.water;
  // A stored guide written before the regulator's closed seasons were known
  // (src/lib/closed-seasons): species closed today are marked and moved
  // below the open ones, never dropped, until the guide is regenerated.
  const closed = closedSpeciesNow(data);
  const closedNames = closed.map((c) => c.species);
  const species = closedNames.length
    ? [...f.species]
        .map((it) => {
          const hit = matches(it.name, closedNames);
          const c = hit ? closed.find((x) => x.species === hit) : null;
          return c ? { ...it, caution: `${c.note.split(". ")[0]}${it.caution ? ` ${it.caution}` : ""}`, closed: true } : { ...it, closed: false };
        })
        .sort((a, b) => Number(a.closed) - Number(b.closed))
    : f.species;
  return (
    <section className="card p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-azure">
          {"Fishing · "}
          {data.place.name}
          {" · this week"}
        </p>
        <SourceNote guide={guide} section="fishing" />
      </div>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold leading-tight">{f.headline}</h2>
      <div className="mt-6 grid gap-8">
        <Block title="Active species">
          <Items items={species} withPhotos photos="fish" films={films} season={data.season === "Fall" ? "autumn" : data.season.toLowerCase()} />
        </Block>
        <div className="grid gap-6 md:grid-cols-2">
          <Block title="Feeding periods">
            <p className="text-sm text-ink-2">{f.bestTimes}</p>
          </Block>
          {/* With no list from the guide, the overview's own lines (place-profile `waterLines`). Audit of 10 November 2026: this
              block said 'The open sea: surf beaches…' at tidal-river towns, and 'No named water is mapped within 20 km; farm dams
              and ponds are the nearest fishing' after a failed map look-up (Atlanta, Charlotte, Raleigh have rivers through them). */}
          {f.waters?.length || waterLines(w, data.place).length ? (
            <Block title="Waters">
              <Bullets items={f.waters?.length ? f.waters : waterLines(w, data.place)} />
            </Block>
          ) : null}
        </div>
        {data.waters.length > 0 && <NamedWaters data={data} />}
        <div className="rounded-tile border border-azure/30 bg-azure/5 p-4 text-sm">
          <p className="font-semibold text-azure">Regulations</p>
          <p className="mt-1 text-ink-2">{f.regulationsNote}</p>
          {data.regs && (
            <a href={data.regs.url} target="_blank" rel="noopener" className="mt-2 inline-block font-medium text-azure underline">
              {data.regs.agency}
              {" ↗"}
            </a>
          )}
          {/* Day 5 audit (14 November 2026): at Nanaimo, Vancouver and Victoria the box named only the BC freshwater synopsis,
              though their main water is tidal, under Fisheries and Oceans Canada (region-regs tidalRegsFor). Both are named. */}
          {(() => {
            const tidal = tidalRegsFor(data);
            return tidal ? (
              <p className="mt-2 text-ink-2">
                {"Tidal water: "}
                <a href={tidal.url} target="_blank" rel="noopener" className="font-medium text-azure underline">
                  {tidal.name.replace(/ \(tidal waters\)$/, "")}
                  {" ↗"}
                </a>
              </p>
            ) : null;
          })()}
        </div>
        <OrgStrip items={stripFor(data.place, "fishing", data)} />
      </div>
    </section>
  );
}

export function ForagingGuide({ data, guide }: { data: LocalData; guide: Guide }) {
  const f = guide.foraging;
  return (
    <section className="card p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-moss">
          {"Foraging · "}
          {data.place.name}
          {" · this week"}
        </p>
        <SourceNote guide={guide} section="foraging" />
      </div>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold leading-tight">{f.headline}</h2>
      <div className="mt-6 grid gap-8">
        <Block title="In season">
          <Items items={f.inSeasonNow} withPhotos empty="No wild food in the guide is confirmed by local records for this week." />
        </Block>
        <div className="grid gap-6 md:grid-cols-2">
          <Block title="Coming into season">
            <Items items={f.comingSoon} empty="Few species are expected in the coming weeks." />
          </Block>
          <Block title="Local hazards">
            <Bullets items={f.safety} />
          </Block>
        </div>
        {data.forageLaw && (
          <div className="rounded-tile bg-rust-soft p-4 text-sm">
            <p className="font-semibold text-rust">Harvesting law</p>
            <p className="mt-1 text-ink-2">{data.forageLaw}</p>
          </div>
        )}
        <p className="text-xs text-ink-2">
          Foraging information is educational. Confirm every identification with a regional field guide or expert before eating anything wild.
        </p>
        <OrgStrip items={stripFor(data.place, "foraging", data)} />
      </div>
    </section>
  );
}

export function OverviewGuide({ data, guide }: { data: LocalData; guide: Guide }) {
  const base = `/guide/${data.place.slug}`;
  // Species the regulator closes today go to the back of the card (see FishingGuide).
  const closedNow = closedSpeciesNow(data);
  const closedNames = closedNow.map((c) => c.species);
  const fishNames = [...guide.fishing.species]
    .map((e) => ({ name: e.name, hit: matches(e.name, closedNames) }))
    .sort((a, b) => Number(!!a.hit) - Number(!!b.hit))
    .map((e) => (e.hit ? `${e.name} (${closedNow.find((c) => c.species === e.hit)?.release ? "catch and release only" : "closed season"})` : e.name));
  const cards = [
    {
      href: `${base}/gardening`,
      eyebrow: "Gardening",
      accent: "text-moss",
      border: "hover:border-moss",
      headline: guide.gardening.headline,
      items: [...guide.gardening.sowOutdoorsNow, ...guide.gardening.harvestNow].slice(0, 4).map((e) => e.name),
      label: "Sow and harvest",
    },
    {
      href: `${base}/fishing`,
      eyebrow: "Fishing",
      accent: "text-azure",
      border: "hover:border-azure",
      headline: guide.fishing.headline,
      items: fishNames.slice(0, 4),
      label: "Active species",
    },
    {
      href: `${base}/foraging`,
      eyebrow: "Foraging",
      accent: "text-moss",
      border: "hover:border-moss",
      headline: guide.foraging.headline,
      items: guide.foraging.inSeasonNow.slice(0, 4).map((e) => e.name),
      label: "In season",
    },
  ];
  const heads = [guide.gardening.headline, guide.fishing.headline, guide.foraging.headline].map((h) => (h ?? "").trim());
  const lead = heads.every((h) => h && guide.summary.includes(h)) ? heads.map((h) => h.replace(/[.!]+$/, "")).join(". ") + "." : guide.summary;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">This week</p>
        <SourceNote guide={guide} section="overview" />
      </div>
      <p className="mt-2 text-lg leading-relaxed text-ink-2 max-w-3xl">{lead}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className={`card p-5 flex flex-col transition ${c.border}`}>
            <p className={`eyebrow ${c.accent}`}>{c.eyebrow}</p>
            <h3 className="font-display mt-1 text-xl font-semibold leading-snug">{c.headline}</h3>
            <p className="eyebrow mt-4">{c.label}</p>
            <ul className="mt-1 text-sm text-ink-2 space-y-0.5">
              {c.items.map((t, i) => (
                <li key={`${t}-${i}`}>{t}</li>
              ))}
            </ul>
            <span className={`mt-auto pt-4 text-sm font-medium ${c.accent}`}>
              {c.eyebrow}
              {" guide →"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * One view of the guide, as GuideLoader shows it. A stored guide's fishing section is first held to the page's own fish
 * lists for today (src/lib/guide-vet; audit of 10 November 2026), since readGuide has only the place and not its data.
 */
export function GuideBody({ view, data, guide: stored, films }: { view: GuideView; data: LocalData; guide: Guide; films?: Record<string, GuideFilm> }) {
  const guide = vetStoredFishing(stored, data);
  return view === "gardening" ? (
    <GardeningGuide data={data} guide={guide} />
  ) : view === "fishing" ? (
    <FishingGuide data={data} guide={guide} films={films} />
  ) : view === "foraging" ? (
    <ForagingGuide data={data} guide={guide} />
  ) : (
    <OverviewGuide data={data} guide={guide} />
  );
}
