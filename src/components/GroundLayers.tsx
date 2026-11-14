/**
 * The two layers the geologic map shows at a point, as cards on /ground/<town>:
 * the cover (loose deposits, or rock weathered where it lies) and the bedrock,
 * each with its age range and the map's own description, and the other maps of
 * the same spot. Pure markup over `layersOf` (src/lib/ground-layers); no data
 * fetching.
 */
import Link from "next/link";
import { coarseMapName, scaleRank, type GroundLayers, type UnitView } from "@/lib/ground-layers";
import { isAlphabeticalList } from "@/lib/rocks";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Role = "Surface deposits" | "Weathered rock" | "Young volcanic rock" | "Bedrock" | "Bedrock in the district";

/**
 * Where the rock name was read. Audit, 10 November 2026: the card said "first-listed lithology" for New York and
 * Boston, where the name had in fact been read from the description, because the map's list was alphabetical.
 */
const LITH_NOTE: Record<string, string> = {
  lith: "the main rock in the map's lithology list",
  "other-map": "the main rock another map of this spot lists for the same unit",
  description: "first named in the map's description",
  name: "from the unit's name",
};

/**
 * One map unit as a card: its name, its age range, the rock or deposit type it
 * is, and the map's own description, verbatim. Soil effects are not claimed
 * here: soil forms on whatever is at the surface, and the rock type's general
 * soil text is on its own page.
 */
function UnitCard({ v, role }: { v: UnitView; role: Role }) {
  const u = v.unit;
  const cover = role === "Surface deposits" || role === "Weathered rock" || role === "Young volcanic rock";
  const deposit = cover && v.cover !== "volcanic";
  const title = cap(u.name || u.lith || (cover ? "Surface deposit" : "Bedrock unit"));
  const noRock = cover
    ? v.cover === "weathered"
      ? "The map names this as weathered material, so it is counted as cover over the bedrock, not as the bedrock itself."
      : "No deposit page matches this map name or its main lithology, so none is shown."
    : isAlphabeticalList(u.lith)
      ? "The map lists this unit's rocks in alphabetical order, which does not say which is the main one, so no rock page is named."
      : "No rock page matches the main rock the map gives for this unit, so none is shown.";
  return (
    <li className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${cover ? "bg-gold-fill/25 text-ink" : "bg-bark-soft text-bark"}`}>{role}</span>
        {v.interval && <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-semibold text-ink-2">{v.interval}</span>}
        {v.ageRange && <span className="text-[11px] text-ink-2">{v.ageRange}</span>}
      </div>
      <h3 className="font-display mt-2 text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-1 text-sm text-ink-2">
        {v.rock ? (
          <>
            {deposit ? "Kind of deposit, from its map name: " : `Rock type (${LITH_NOTE[v.lithFrom ?? "lith"]}): `}
            <Link href={`/ground/rocks/${v.rock.slug}`} className="font-medium text-moss underline decoration-line underline-offset-2 hover:no-underline">
              {v.rock.name}
            </Link>
          </>
        ) : (
          noRock
        )}
      </p>
      {u.lith && (
        <p className="mt-1 text-sm text-ink-2">
          <span className="font-medium text-ink">Map lithology: </span>
          {u.lith}
        </p>
      )}
      {v.lead && (
        <div className="mt-3 text-sm text-ink-2">
          <p className="eyebrow">The map&apos;s description</p>
          <p className="mt-0.5">{v.lead}</p>
          {v.thickness && <p className="mt-1">{v.thickness}</p>}
          {v.rest && (
            <details className="mt-1">
              <summary className="cursor-pointer text-moss hover:underline">More of the map&apos;s description</summary>
              <p className="mt-1">{v.rest}</p>
            </details>
          )}
        </div>
      )}
      {v.rock && (
        <div className="mt-3 text-sm">
          <p className="eyebrow">{deposit ? "What this kind of deposit is" : "What this kind of rock is"}</p>
          <p className="mt-0.5 text-ink-2">{v.rock.what}</p>
        </div>
      )}
      <p className="mt-3 text-xs text-ink-2">
        {v.periodOnly && v.datedTo
          ? v.joint
            ? // Audit of 13 November 2026 (Day 4): Tampa's two maps give the Tampa Member two ranges that cannot both be right.
              `The maps of this spot give this unit ages that disagree; they agree only on ${v.datedTo}, so no age range is shown. `
            : `The map dates this unit only to ${v.datedTo}, not to an age of its own, so no age range is shown. `
          : v.ageRange
            ? "The age is the range this map gives the unit, not the age of one deposit; later dating can differ. "
            : "The map gives this unit no age. "}
        {v.coarse
          ? // Day 5 audit (14 November 2026): a regional deposit card said "the broad kind of rock"; a deposit is not rock.
            `From ${coarseMapName(u)}: it shows the broad kind of ${deposit ? "deposits" : "rock"} in the district, not the ${deposit ? "deposits" : "rock"} under one town. `
          : u.scale
            ? `From a ${u.scale}-scale map. `
            : ""}
        {u.mapId ? `Macrostrat map unit ${u.mapId}.` : ""}
      </p>
    </li>
  );
}

/** The layers the geologic map shows at a point, and the other maps of the same spot. */
export function UnderGround({ name, layers }: { name: string; layers: GroundLayers }) {
  const { surface, bedrock, regionalBedrock, others, detailed } = layers;
  // Audit, 10 November 2026: units from maps at the same scale as the cards (Charlotte's and Atlanta's second bedrock
  // maps, Richmond's) were filed under "other, coarser maps". Each is now said to be at the same scale or coarser.
  const ref = bedrock ?? regionalBedrock ?? surface[0];
  const sameScale = ref ? others.filter((o) => scaleRank(o.unit) <= scaleRank(ref.unit)).length : 0;
  const summary =
    sameScale > 0
      ? others.length === 1
        ? "One other map of the same spot, at the same scale"
        : `${others.length} other maps of the same spot (${sameScale} at the same scale, ${others.length - sameScale} coarser)`
      : others.length === 1
        ? "One other, coarser map of the same spot"
        : `${others.length} other, coarser maps of the same spot`;
  return (
    <section>
      <p className="eyebrow text-bark">Surface deposits and bedrock</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">What the geologic map shows at {name}</h2>
      <p className="mt-2 max-w-2xl text-ink-2">
        Two layers, read from the geologic maps that cover the spot (Macrostrat&apos;s compilation, most detailed map first): what lies over the rock
        (loose deposits, or rock weathered where it lies), and the bedrock under it. A map unit can include other materials, as its own description says,
        and the maps are not a borehole log for one garden.
      </p>
      <p className="mt-3">
        <Link href="/ground/rocks" className="text-sm font-medium text-moss hover:underline">
          Rock types and how they form →
        </Link>
      </p>
      <ol className="mt-6 grid gap-4">
        {surface.map((v) => (
          <UnitCard
            key={`s-${v.unit.mapId ?? v.unit.name}`}
            v={v}
            role={v.cover === "weathered" ? "Weathered rock" : v.cover === "volcanic" ? "Young volcanic rock" : "Surface deposits"}
          />
        ))}
        {surface.length === 0 && (
          <li className="card p-5 text-sm text-ink-2 sm:p-6">
            <span className="font-medium text-ink">Surface deposits: </span>
            the maps returned no surface-deposit unit for this point. That does not mean there is none; it means none of the maps shows one here.
          </li>
        )}
        {bedrock ? (
          <UnitCard key={`b-${bedrock.unit.mapId ?? bedrock.unit.name}`} v={bedrock} role="Bedrock" />
        ) : regionalBedrock ? (
          <UnitCard key={`r-${regionalBedrock.unit.mapId ?? regionalBedrock.unit.name}`} v={regionalBedrock} role="Bedrock in the district" />
        ) : (
          <li className="card p-5 text-sm text-ink-2 sm:p-6">
            <span className="font-medium text-ink">Bedrock: </span>
            {detailed && surface.length > 0 && layers.beneath
              ? // Audit of 13 November 2026 (Day 4): Fort Myers's residuum card says it lies on soft sandy limestone.
                `no map here draws a bedrock unit, but ${layers.beneath.unit.unit.name ? `the ${layers.beneath.unit.unit.name}` : "the cover"} above is described as lying on ${layers.beneath.text}. That rock has no map unit of its own here, so it has no card.`
              : detailed && surface.length > 0
                ? "the detailed maps here name no bedrock beneath the units above, so none is named. Maps of the whole continent or the world are too coarse to say what rock lies under the town."
                : "the maps returned no bedrock unit for this point, so none is named here."}
          </li>
        )}
      </ol>
      {others.length > 0 && (
        <details className="mt-4 text-sm text-ink-2">
          <summary className="cursor-pointer font-medium text-moss hover:underline">{summary}</summary>
          <p className="mt-2 max-w-2xl">
            These are other maps&apos; versions of the same ground{sameScale > 0 ? ", some drawn at the same scale as the cards above" : ", drawn at smaller scales"}:
            they can be less specific or disagree with the units above, and they are not further layers beneath them.
          </p>
          <ul className="mt-2 grid gap-1.5">
            {others.map((v) => (
              <li key={`o-${v.unit.mapId ?? v.unit.name}`}>
                <span className="font-medium text-ink">{cap(v.unit.name || v.unit.lith || "Unnamed unit")}</span>
                {v.unit.lith ? ` · ${v.unit.lith}` : ""}
                {v.ageRange ? ` · ${v.ageRange}` : v.interval ? ` · ${v.interval} (${v.joint ? "all the maps here agree on" : "the map gives only this"})` : ""}
                {v.coarse ? ` · ${coarseMapName(v.unit)}` : v.unit.scale ? ` · ${v.unit.scale}-scale map` : ""}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
