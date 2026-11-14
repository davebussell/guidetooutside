/**
 * "Soil, bedrock and drainage at <town>": the ground in a few facts on a
 * place's gardening, fishing and foraging pages, with the way through to
 * /ground/<town>. Streams in: the river reading is fetched per day. Surface
 * deposits and bedrock are the two layers the geologic maps show at the point
 * (src/lib/ground-layers); the river figure is a model estimate, not a gauge.
 */
import Link from "next/link";
import type { Place } from "@/lib/types";
import {
  bedrockFact,
  drainsTo,
  getRocks,
  groundFor,
  groundId,
  layersOf,
  phWord,
  surfaceFact,
  type RockUnit,
} from "@/lib/ground";
import { checkLimit, metaOf, stampProps } from "@/lib/records";
import { Freshness } from "@/components/Freshness";
import type { TopicSection } from "./PlaceTopicPage";
import { FieldLoader } from "./FieldLoader";

export async function GroundSummary({
  place,
  section,
}: {
  place: Place;
  section: TopicSection;
  timeZone?: string;
}) {
  const record = await groundFor(place);
  if (!record) return null;
  const g = record.value;
  // The same map units the ground page reads (the rock cache), so the two pages name the same layers. Audit, 10 November
  // 2026: Jacksonville's strip said sand where its ground page said clay, because the stored record and the cache held
  // the units in different orders. The stored units are used only when the cache has none.
  const cached = await getRocks(place.lat, place.lon).catch(() => [] as RockUnit[]);
  const layers = layersOf(cached.length ? cached : g.rocks);
  const { surface, bedrock, regionalBedrock } = layers;
  const surf = surface[0];
  const soil = section === "fishing" ? null : g.soil;

  const intro =
    section === "fishing"
      ? "What the geologic maps show here, and the watershed the water drains to."
      : "What the geologic maps show at this point, and the soil as the SoilGrids model estimates it. Right for the shape of a district, not for one garden.";

  const facts: { label: string; value: React.ReactNode }[] = [];
  if (soil)
    facts.push({
      label: "Soil (modelled)",
      value: `${phWord(soil.ph)} ${soil.texture}, pH ${soil.ph}`,
    });
  if (surf)
    facts.push({
      label:
        surf.cover === "weathered"
          ? "Weathered rock"
          : surf.cover === "volcanic"
            ? "Young volcanic rock"
            : "Surface deposits",
      value: surfaceFact(surf),
    });
  // A continent- or world-scale map's rock is printed only where no detailed map came back, and says which map it is
  // from (bedrockFact adds it); where the detailed maps show only cover, no bedrock is named (audit, 10 November 2026).
  const rockView = bedrock ?? regionalBedrock;
  if (rockView) {
    const text = bedrockFact(rockView);
    facts.push({
      label: bedrock ? "Bedrock" : "Bedrock in the district",
      value: rockView.rock ? (
        <Link
          href={`/ground/rocks/${rockView.rock.slug}`}
          className="hover:text-moss hover:underline decoration-line"
        >
          {text}
        </Link>
      ) : (
        text
      ),
    });
  } else if (surf && layers.detailed && layers.beneath) {
    // Audit of 13 November 2026 (Day 4): Fort Myers's cover unit says it lies on soft sandy limestone; "not named"
    // contradicted the ground page's own card.
    facts.push({
      label: "Bedrock",
      value: `not drawn as a map unit; ${layers.beneath.unit.unit.name ? `the ${layers.beneath.unit.unit.name}` : "the cover"} is described as lying on ${layers.beneath.text}`,
    });
  } else if (surf && layers.detailed) {
    facts.push({
      label: "Bedrock",
      value:
        "not named: the detailed maps name none beneath the surface units here",
    });
  }
  if (g.watershed) {
    const d = drainsTo(g.watershed);
    facts.push({ label: d.verb === "drains toward" ? "Drains toward" : "Drains to", value: g.watershed.ocean });
  }
  if (!facts.length) return null;

  const gate = await checkLimit("ground", groundId(place)).catch(() => null);
  return (
    <div>
      <section className="card p-6 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-bark">Geology and water</p>
            <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight">
              Soil, bedrock and drainage at {place.name}
            </h2>
          </div>
          <Link
            href={`/ground/${place.slug}`}
            className="text-sm font-medium text-moss hover:underline"
          >
            Full geology and water →
          </Link>
        </div>
        {intro && <p className="mt-2 max-w-2xl text-sm text-ink-2">{intro}</p>}
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-tile bg-paper-2 px-4 py-3">
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-0.5 text-sm font-medium leading-snug first-letter:uppercase">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <Freshness
        kind="ground"
        slug={place.slug}
        label={`the ground under ${place.name}`}
        cooldownSeconds={
          gate && !gate.ok && gate.reason === "cooldown"
            ? gate.retryAfterSeconds
            : 0
        }
        timeZone={undefined}
        {...stampProps(metaOf(record))}
      />
    </div>
  );
}

/** The card's shape while the ground is read. */
export function GroundSummarySkeleton() {
  return (
    <div className="card p-6 sm:p-7" aria-busy="true">
      <FieldLoader
        compact
        topic="ground"
        text="Reading the rock, soil and drainage under the town."
      />
      <div className="animate-pulse mt-5" aria-hidden="true">
        <div className="h-2.5 w-28 rounded bg-line/70" />
        <div className="mt-2.5 h-6 w-64 max-w-full rounded bg-line" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-tile bg-paper-2 px-4 py-3">
              <div className="h-2.5 w-14 rounded bg-line/70" />
              <div className="mt-2 h-4 w-24 rounded bg-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
