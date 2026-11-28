/**
 * /ground/<town>: the rock under a place, layer by layer, the soil it makes
 * and what that soil's pH means, where the rain goes when it leaves, what the
 * river is doing this week, and the named waters within reach.
 */
import { Suspense } from "react";
import type { LocalData } from "@/lib/types";
import {
  drainsTo,
  oceanText,
  PH_TEXT,
  WATER_KIND_TEXT,
  getRocks,
  getSoil,
  getWatershed,
  groundStandfirst,
  layersOf,
  phPosition,
  phWord,
  riverFlow,
  suitedFor,
  watershedView,
  workability,
  type RockUnit,
  type Watershed,
} from "@/lib/ground";
import { UnderGround } from "./GroundLayers";
import { PlaceHero } from "./PlaceHero";
import { GuideHeader } from "./GuideHeader";
import { NoteCTA } from "./PlaceCards";
import { WhoProtects } from "./conservation/WhoProtects";
import { SECTION_TOPICS } from "@/lib/conservation/match";
import { FieldLoader } from "./FieldLoader";
import { zoneFromExtremeMin, zoneNumberOf, type ZonedClimate } from "@/lib/zone-label";

/**
 * The town's zone on the USDA scale, which the fruit and shrub ranges in ground.ts ZONED_PLANTS are given on. A Canadian
 * town's printed zone is NRCan's, a different scale with the same numbers, so its USDA-equivalent is used: the one the
 * climate record carries, or the USDA rule applied to its coldest-night average (zoneFromExtremeMin). Day 5 audit (14
 * November 2026): the soil card printed only the pH band's general line, never the fruit and shrubs inside their zones.
 */
function usdaZoneOf(c: ZonedClimate | null, countryCode: string): number | null {
  if (!c) return null;
  const canadian = c.zoneSystem === "nrcan" || (!c.zoneSystem && countryCode.toUpperCase() === "CA");
  if (!canadian) return Number.isFinite(c.zoneNumber) ? c.zoneNumber : null;
  if (c.usdaEquivalent?.zone) return zoneNumberOf(c.usdaEquivalent.zone);
  return Number.isFinite(c.meanAnnualExtremeMinC) ? zoneFromExtremeMin(c.meanAnnualExtremeMinC).zoneNumber : null;
}

/** The soil card: read separately, because the soil service is the slow one. */
async function SoilSection({
  name,
  lat,
  lon,
  zone,
}: {
  name: string;
  lat: number;
  lon: number;
  /** The town's USDA zone number (usdaZoneOf), for the fruit and shrubs suited to this pH (ground.ts suitedFor). */
  zone: number | null;
}) {
  const soil = await getSoil(lat, lon);
  if (!soil) {
    return (
      <section className="card p-6 sm:p-8">
        <p className="eyebrow text-bark">Soil</p>
        <h2 className="font-display mt-1 font-semibold tracking-tight text-3xl">
          No soil data came back for this place
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          The soil model (SoilGrids, ISRIC, 250 m) returned no values for the
          spot near {name}, so nothing is shown rather than a guess. Dig a hole
          and look, or have the soil tested.
        </p>
      </section>
    );
  }
  const word = phWord(soil.ph);
  const t = PH_TEXT[word];
  return (
    <section className="card p-6 sm:p-8">
      <p className="eyebrow text-bark">Soil</p>
      <h2 className="font-display mt-1 font-semibold tracking-tight text-3xl">
        {"The soil model puts "}
        {name}
        {" at "}
        {word} {soil.texture}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold leading-none">
              {soil.ph}
            </span>
            <span className="text-sm text-ink-2">pH in the root zone</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-gold-fill/50 via-moss/50 to-azure/50">
            <span
              className="block h-full w-1 rounded-full bg-ink"
              style={{ marginLeft: `calc(${phPosition(soil.ph)}% - 2px)` }}
              aria-hidden="true"
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-ink-2">
            <span>4 · acid</span>
            <span>6.5</span>
            <span>8.5 · alkaline</span>
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
            {(
              [
                ["Clay", soil.clay],
                ["Silt", soil.silt],
                ["Sand", soil.sand],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="rounded-tile bg-paper-2 px-2 py-2.5">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-0.5 font-display text-lg font-semibold">
                  {v}%
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-3 text-sm">
          <div>
            <p className="eyebrow">What it means</p>
            <p className="mt-0.5 text-ink-2">{t.means}</p>
          </div>
          <div>
            <p className="eyebrow text-bark">Suited without amendment</p>
            <p className="mt-0.5 text-ink-2">{suitedFor(word, zone)}</p>
          </div>
          <div>
            <p className="eyebrow">Amending for other plants</p>
            <p className="mt-0.5 text-ink-2">{t.amending}</p>
          </div>
          <div>
            <p className="eyebrow">Workability</p>
            <p className="mt-0.5 text-ink-2">{workability(soil.texture)}</p>
          </div>
        </div>
      </div>
      <p className="mt-5 text-xs text-ink-2">
        SoilGrids (ISRIC) model estimate for the 250 m cell, averaged over the
        top 30 cm. A model, not a sample from this ground.
      </p>
    </section>
  );
}

function SoilSkeleton() {
  const line = (
    <div>
      <div className="h-2.5 w-24 rounded bg-line/70" />
      <div className="mt-1.5 h-3.5 w-full rounded bg-line/60" />
      <div className="mt-1.5 h-3.5 w-4/5 rounded bg-line/60" />
    </div>
  );
  return (
    <div className="card p-6 sm:p-8" aria-busy="true">
      <FieldLoader
        compact
        topic="ground"
        text="Reading the soil records for these coordinates."
      />
      <div className="animate-pulse mt-5" aria-hidden="true">
        <div className="h-2.5 w-24 rounded bg-line/70" />
        <div className="mt-2.5 h-8 w-80 max-w-full rounded bg-line" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <div className="h-10 w-28 rounded bg-line" />
            <div className="mt-4 h-2.5 w-full rounded-full bg-line/60" />
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-16 rounded-tile bg-paper-2" />
              <div className="h-16 rounded-tile bg-paper-2" />
              <div className="h-16 rounded-tile bg-paper-2" />
            </div>
          </div>
          <div className="grid gap-3">
            {line}
            {line}
            {line}
          </div>
        </div>
      </div>
    </div>
  );
}

function WatershedSection({ name, ws }: { name: string; ws: Watershed }) {
  // The labels come from watershedView (src/lib/ground.ts): a seaboard is a drainage region, not a water (audit, 10 November 2026).
  const { steps, note } = watershedView(ws);
  // Audit of 13 November 2026: "drains toward" where the river is used up before the sea (the Colorado's towns).
  const { verb, water } = drainsTo(ws);
  return (
    <section>
      <p className="eyebrow text-azure">Watershed</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
        Rain falling on {name} {verb} {water}
      </h2>
      <ol className="mt-6 grid gap-0">
        {steps.map(([label, value], i) => {
          const last = i === steps.length - 1;
          return (
            <li key={`${label}-${i}`} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${last ? "bg-azure" : "bg-azure/40"}`}
                />
                {!last && <span className="w-px flex-1 bg-azure/25" />}
              </div>
              <div className={last ? "" : "pb-5"}>
                <p className="eyebrow">{label}</p>
                <p className="font-display text-xl font-semibold leading-tight">
                  {value}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      {oceanText(ws) && (
        <p className="mt-5 max-w-2xl text-ink-2">{oceanText(ws)}</p>
      )}
      <p className="mt-3 text-xs text-ink-2">{note}</p>
    </section>
  );
}

function FlowSection({ name }: { name: string }) {
  return (
    <section className="card p-6 sm:p-8">
      <p className="eyebrow text-azure">River flow · no figure shown</p>
      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight">
        River flow near {name}
      </h2>
      <p className="mt-4 max-w-2xl text-ink-2">
        This site does not print a flow figure for {name}. The only one
        available is a river model&apos;s estimate (GloFAS, read through
        Open-Meteo&apos;s flood API), not a measurement at the town. It can
        differ a lot from what a gauge on the same river reads, and there is no
        way to say by how much, so it is left out rather than shown as a fact.
        It is no guide to whether a river can be waded or crossed. For the real
        figure, use the current readings from the river authority or national
        gauge network for that river.
      </p>
    </section>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function WatersSection({
  name,
  waters,
}: {
  name: string;
  waters: LocalData["waters"];
}) {
  const list = waters.slice(0, 12);
  const kinds = [...new Set(list.map((w) => w.kind))].filter(
    (k) => WATER_KIND_TEXT[k],
  );
  return (
    <section>
      <p className="eyebrow text-azure">Nearby waters</p>
      <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">
        Named waters near {name}
      </h2>
      <p className="mt-2 max-w-2xl text-ink-2">
        Named lakes, rivers and streams within about 20 km, nearest first, from
        OpenStreetMap.
      </p>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w, i) => (
          <li
            key={`${w.name}-${i}`}
            className="card flex items-baseline justify-between gap-3 px-4 py-3"
          >
            <span className="min-w-0">
              <span className="block truncate font-medium">{w.name}</span>
              <span className="text-xs text-ink-2 first-letter:uppercase">
                {cap(w.kind)}
              </span>
            </span>
            <span className="shrink-0 text-sm text-ink-2">
              {w.distanceKm} km
            </span>
          </li>
        ))}
      </ul>
      {kinds.length > 0 && (
        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
          {kinds.map((k) => (
            <div key={k} className="card p-5">
              <dt className="font-display text-lg font-semibold">{cap(k)}</dt>
              <dd className="mt-1 text-sm text-ink-2">{WATER_KIND_TEXT[k]}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export async function GroundPage({ data }: { data: LocalData }) {
  const { place } = data;
  const [units, ws, flow] = await Promise.all([
    getRocks(place.lat, place.lon).catch(() => [] as RockUnit[]),
    getWatershed(place.lat, place.lon),
    riverFlow(place, data.today).catch(() => null),
  ]);
  const layers = layersOf(units);
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <PlaceHero
          data={data}
          title={`The ground under ${place.name}`}
          standfirst={groundStandfirst(place.name, layers)}
        />
        <GuideHeader
          place={place}
          current="ground"
          timeZone={data.forecast.timezone}
        />
        <div className="mt-12 grid gap-14">
          {units.length > 0 ? (
            <UnderGround name={place.name} layers={layers} />
          ) : (
            <p className="card p-5 text-sm text-ink-2 sm:p-6">
              The geologic map service returned no unit for this point, so no
              surface deposits or bedrock are named.
            </p>
          )}
          <Suspense fallback={<SoilSkeleton />}>
            <SoilSection name={place.name} lat={place.lat} lon={place.lon} zone={usdaZoneOf(data.climate as ZonedClimate | null, place.countryCode)} />
          </Suspense>
          {ws && <WatershedSection name={place.name} ws={ws} />}
          {flow && <FlowSection name={place.name} />}
          {data.waters.length > 0 && (
            <WatersSection name={place.name} waters={data.waters} />
          )}
          <p className="text-xs text-ink-2 max-w-3xl">
            Surface deposits and bedrock are the units published geologic maps
            show at this point (Macrostrat&apos;s compilation, each map at its
            own scale). Soil values are SoilGrids model estimates for a 250 m
            cell. River discharge is a model estimate, not a gauge reading. All
            of it is right for the shape of a district, not for a particular
            garden or a particular crossing. For anything that matters, dig a
            hole and look, and check the gauge.
          </p>
          <WhoProtects
            place={place}
            topic={SECTION_TOPICS.ground}
            title="Who looks after the land, caves and night sky here"
          />
          <NoteCTA
            title={<>The weekly field note for {place.name}</>}
            body="One email, Sunday evening. Unsubscribe at any time."
            source="ground"
            location={place.label}
          />
        </div>
      </div>
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
