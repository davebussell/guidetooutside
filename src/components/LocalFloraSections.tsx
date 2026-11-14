/**
 * The local half of /foraging/<town>, streamed: what has been recorded near
 * the place this month, the trees, the hazards, and what is coming into
 * season. Read from the stored record for the place and month; on a first
 * visit the observation service is asked and a live answer is stored.
 */
import type { Place } from "@/lib/types";
import {
  FLORA_FRESH_SECONDS,
  floraHere,
  floraId,
  floraNearby,
  type LocalFlora,
} from "@/lib/local-flora";
import {
  checkLimit,
  metaOf,
  readRecord,
  stampProps,
  writeRecord,
} from "@/lib/records";
import { getRocks, layersOf, rockLore } from "@/lib/ground";
import { Freshness } from "@/components/Freshness";
import { SeasonalForaging } from "@/components/SeasonalForaging";
import {
  HazardPanel,
  LocalFloraPanel,
  TreesPanel,
} from "@/components/LocalFloraPanels";
import { GENERIC_LAND_RULE, landRulesFor } from "@/data/land-rules";
import { FieldLoader } from "./FieldLoader";

/**
 * Where picking is allowed, as a short block of text at the head of the foraging
 * page: the rules loaded for the place (regulator, wording, source, date checked),
 * or the one generic line where none is loaded. A rule is printed only where its
 * wording was read on the regulator's own page; see src/data/land-rules.ts.
 */
function LandRules({ place }: { place: Place }) {
  const rules = landRulesFor(place);
  return (
    <section aria-labelledby="where-to-pick">
      <p className="eyebrow text-moss">Where you may pick</p>
      <h2
        id="where-to-pick"
        className="font-display mt-1 text-2xl font-semibold tracking-tight"
      >
        Who owns the land decides
      </h2>
      {rules.length > 0 ? (
        <>
          <p className="mt-2 max-w-2xl text-sm text-ink-2">
            Around {place.name}, the rules below are the regulators&apos; own
            wording. They cover public land; they do not make anything else free
            to pick.
          </p>
          <ul className="mt-3 grid max-w-3xl gap-3 text-sm text-ink-2">
            {rules.map((r) => (
              <li key={r.id}>
                <span className="font-semibold text-ink">{r.title}.</span>{" "}
                {r.rule}{" "}
                <a
                  href={r.source.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="underline"
                >
                  {r.source.label}
                </a>
                , checked {r.checked}.
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-2xl text-sm text-ink-2">
            Anywhere else, {GENERIC_LAND_RULE.charAt(0).toLowerCase()}
            {GENERIC_LAND_RULE.slice(1)}
          </p>
        </>
      ) : (
        <p className="mt-2 max-w-2xl text-sm text-ink-2">{GENERIC_LAND_RULE}</p>
      )}
    </section>
  );
}

export async function LocalFloraSections({
  place,
  month,
  regionSlug,
  zone,
  coast,
}: {
  place: Place;
  month: number;
  regionSlug?: string;
  zone?: number;
  /** False for a place with no sea within reach. */
  coast?: boolean;
}) {
  // Stored per place and month: a September list for Wakefield is written once
  // and then simply read, which is why the second visitor waits for nothing.
  const id = floraId(place.lat, place.lon, month);
  const existing = await readRecord<LocalFlora>("flora", id).catch(() => null);
  const [fetched, rocks] = await Promise.all([
    existing
      ? Promise.resolve(null)
      : floraNearby(place.lat, place.lon, month).catch(() => null),
    getRocks(place.lat, place.lon).catch(() => []),
  ]);
  // Only a live answer is worth keeping. Storing the fallback would freeze a
  // bad afternoon at the observation service into this place's page for good.
  const record =
    existing ??
    (fetched?.live
      ? await writeRecord("flora", id, fetched, {
          source: "live",
          freshFor: FLORA_FRESH_SECONDS,
          previous: null,
        }).catch(() => null)
      : null);
  // Shown with today's library and roster, the place's own text, the two-records rule and the regulators' bans, so a
  // record stored before a wording was fixed prints today's (audit of 10 November 2026: stored records kept the South
  // African hazard notes on US pages).
  const stored = record?.value ?? fetched;
  const flora = stored ? floraHere(stored, place, month) : null;

  // Limey ground and sour ground grow visibly different plants, and different
  // mushrooms with them. Said only where the maps show bedrock and NO surface
  // deposit at the point (soil on till or marine clay takes its chemistry from
  // that, not from the rock below), and as what usually happens on such rock.
  const lore = rockLore(layersOf(rocks));
  const groundNote =
    lore?.lime === "sweetens"
      ? `The geologic maps show ${lore.name.toLowerCase()} bedrock here and no surface deposit on it. Soil lying directly on limey rock is usually alkaline, which favours lime-loving plants (many ferns, orchids and maidenhair fern) and the mushrooms associated with hardwoods on rich soil.`
      : lore?.lime === "sours"
        ? `The geologic maps show ${lore.name.toLowerCase()} bedrock here and no surface deposit on it. Soil lying directly on rock like this is usually acid, which favours blueberry, wintergreen, Labrador tea and conifer-associated mushrooms, and tends to exclude lime-loving plants.`
        : null;

  if (!flora || !flora.live) {
    return (
      <div className="grid gap-12">
        <LandRules place={place} />
        <SeasonalForaging
          month={month}
          regionSlug={regionSlug}
          zone={zone}
          placeLabel={place.label}
          place={place}
          limit={6}
          coast={coast}
        />
      </div>
    );
  }

  const gate = record ? await checkLimit("flora", id).catch(() => null) : null;
  // Where the guide's own edibles are not among the most-recorded species (a
  // fynbos spring, say, when thousands of wildflowers are logged), the curated
  // list leads and the raw record follows it.
  const thin = flora.known.length < 3;
  return (
    <div className="grid gap-12">
      <LandRules place={place} />
      {thin && (
        <SeasonalForaging
          month={month}
          regionSlug={regionSlug}
          zone={zone}
          placeLabel={place.label}
          place={place}
          limit={9}
          showSoon={false}
          coast={coast}
          showBans={false}
        />
      )}
      <div>
        <LocalFloraPanel
          flora={flora}
          month={month}
          placeName={place.name}
          groundNote={groundNote}
        />
        {record && (
          <Freshness
            kind="flora"
            slug={place.slug}
            label={`what has been found near ${place.name}`}
            cooldownSeconds={
              gate && !gate.ok && gate.reason === "cooldown"
                ? gate.retryAfterSeconds
                : 0
            }
            timeZone={undefined}
            {...stampProps(metaOf(record))}
          />
        )}
      </div>
      <TreesPanel flora={flora} placeName={place.name} />
      <HazardPanel flora={flora} month={month} placeName={place.name} />
      <SeasonalForaging
        month={month}
        regionSlug={regionSlug}
        zone={zone}
        placeLabel={place.label}
        place={place}
        showNow={false}
        coast={coast}
      />
    </div>
  );
}

/** What the local half looks like while the observation record is coming in. */
export function LocalFloraSkeleton() {
  return (
    <div aria-busy="true">
      <FieldLoader
        compact
        topic="foraging"
        text="Reading the plants and fungi recorded near the town, and how far away each record is."
      />
      <div className="animate-pulse mt-5" aria-hidden="true">
        <div className="h-2.5 w-40 rounded bg-line/70" />
        <div className="mt-3 h-9 w-2/3 max-w-lg rounded bg-line" />
        <div className="mt-3 h-4 w-full max-w-2xl rounded bg-line/70" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="card overflow-hidden">
              <div className="aspect-[4/3] bg-line/60" />
              <div className="p-4">
                <div className="h-4 w-2/3 rounded bg-line" />
                <div className="mt-2.5 h-3 w-1/2 rounded bg-line/70" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
