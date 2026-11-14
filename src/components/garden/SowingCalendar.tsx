/**
 * The year's sowing calendar for a place: a row per crop (the climate's
 * staples first, then by how many months it can go in), a cell per month for
 * sowing, sowing with watering, sowing to stand through winter, or starting in
 * trays, a dot for harvest; and the perennials that do well here, named below.
 * Each row carries the calendar's reasons (CropFit.why) as hover text and for
 * screen readers.
 */
import Link from "next/link";
import type { CalendarSource, CropFit } from "@/lib/crop-calendar";
import type { Climate } from "@/lib/types";
import { tempsFromStation, tempWords } from "@/lib/homestead/climate";
import { monthSpans } from "@/lib/regime";

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-11-13" → "13 Nov 2026". */
const readOn = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTH_ABBR[m - 1]} ${y}`;
};

/**
 * The extension calendars behind this town's rows (CropFit.from), once each. Added after the Day 4 audit (13 Nov 2026):
 * where a calendar decides the sowing months (src/data/extension-calendars.json), the page says whose calendar it is, for
 * which region and months, and when it was read, and no longer calls the dates rules applied to the town's averages.
 */
function calendarSources(fits: CropFit[]): CalendarSource[] {
  const seen = new Map<string, CalendarSource>();
  for (const f of fits) if (f.from && !seen.has(f.from.id)) seen.set(f.from.id, f.from);
  return [...seen.values()];
}

function SourceName({ s }: { s: CalendarSource }) {
  return (
    <>
      <a href={s.url} className="underline decoration-line underline-offset-2 hover:text-moss" rel="noopener">
        {s.publisher}, {s.title}
      </a>
      , for {s.boundary.toLowerCase().startsWith(s.name.toLowerCase()) ? s.boundary : `${s.name}: ${s.boundary}`} ({s.published}; read {readOn(s.read)})
    </>
  );
}

const LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const WATERED = "bg-moss/35 [background-image:repeating-linear-gradient(135deg,transparent_0_3px,rgba(255,255,255,.55)_3px_5px)]";
const OVERWINTER = "bg-moss-2 [background-image:repeating-linear-gradient(0deg,transparent_0_2px,rgba(255,255,255,.4)_2px_3px)]";

type CellKind = "overwinter" | "sow" | "watered" | "trays" | null;

function kindOf(f: CropFit, m: number): CellKind {
  if (f.overwinter.includes(m)) return "overwinter";
  if (f.sow.includes(m)) return "sow";
  if (f.watered.includes(m)) return "watered";
  if (f.trays.includes(m)) return "trays";
  return null;
}

const CELL: Record<Exclude<CellKind, null>, string> = {
  overwinter: OVERWINTER,
  sow: "bg-moss",
  watered: WATERED,
  trays: "border border-moss bg-transparent",
};

const CELL_WORDS: Record<Exclude<CellKind, null>, string> = {
  overwinter: "sow to stand through winter",
  sow: "sow or plant out",
  watered: "sow with watering",
  trays: "start in trays",
};

/**
 * The row in words for screen readers, once per crop ("sow or plant out Apr–Jun; harvest Jul–Oct")
 * rather than once per month cell; the calendar's reasons stay in the hover text.
 */
function rowWords(f: CropFit): string {
  const kinds = (Object.keys(CELL_WORDS) as Exclude<CellKind, null>[])
    .map((k) => [k, Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => kindOf(f, m) === k)] as const)
    .filter(([, ms]) => ms.length)
    .map(([k, ms]) => `${CELL_WORDS[k]} ${monthSpans(ms)}`);
  return [...kinds, f.harvest.length ? `harvest ${monthSpans(f.harvest)}` : null].filter(Boolean).join("; ");
}

/** "a, b and c" (or "a, b, c" with `commas`), each a link to its crop page. */
export function CropLinks({ fits, lower = false, commas = false }: { fits: CropFit[]; lower?: boolean; commas?: boolean }) {
  return (
    <>
      {fits.map((f, i) => (
        <span key={f.crop.slug}>
          {i === 0 ? "" : i === fits.length - 1 && !commas ? " and " : ", "}
          <Link href={`/gardening/crops/${f.crop.slug}`} className="underline decoration-line underline-offset-2 hover:text-moss" title={f.why.join(" ")}>
            {lower ? f.crop.name.toLowerCase() : f.crop.name}
          </Link>
        </span>
      ))}
    </>
  );
}

/**
 * Where the calendar's temperatures come from. Day 5 audit, 14 November 2026: the heading said "ten years of ERA5
 * reanalysis temperatures" at the 74 towns now on a station's normals (scripts/build-station-normals.ts). With the
 * town's climate it names the source; without it (a caller that does not pass it) it says both, which is true everywhere.
 */
function tempsSource(climate: Climate | null | undefined): string {
  if (climate === undefined) return "the monthly temperatures (a weather station's normals where we have read them, otherwise ten years of ERA5 reanalysis)";
  return tempsFromStation(climate) ? `the monthly temperatures in ${tempWords(climate)}` : "ten years of ERA5 reanalysis temperatures";
}

export function SowingCalendar({
  fits,
  month,
  placeName,
  limit = 18,
  climate,
}: {
  fits: CropFit[];
  month: number;
  placeName: string;
  limit?: number;
  /** The town's climate record, to name where its temperatures come from. */
  climate?: Climate | null;
}) {
  const rows = fits.filter((f) => !f.perennial).slice(0, limit);
  const perennials = fits.filter((f) => f.perennial);
  const anyOverwinter = rows.some((f) => f.overwinter.length > 0);
  const anyWatered = rows.some((f) => f.watered.length > 0);
  const anyTrays = rows.some((f) => f.trays.length > 0);
  const sources = calendarSources(fits);
  const whole = sources.find((s) => s.covers.length === 12);
  const part = sources.filter((s) => s.covers.length < 12);
  return (
    <section aria-labelledby="sowing-calendar" className="border-t-2 border-ink pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id="sowing-calendar" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          The sowing calendar for {placeName}
        </h2>
        {/* The 10 Nov 2026 audit: "ten years of local temperature and rainfall" claimed more than the data holds. The monthly
            temperatures are a station's normals where read, else ten years of the ERA5 grid (tempsSource); the rainfall is a
            station normal where one is in reach. */}
        {whole ? (
          <p className="text-sm text-ink-2">
            Sowing dates from <SourceName s={whole} />; harvests worked out from each crop&apos;s days to maturity
          </p>
        ) : part.length ? (
          <p className="text-sm text-ink-2">
            {part.map((s) => (
              <span key={s.id}>
                Sowing dates for {monthSpans(s.covers)} from <SourceName s={s} />;{" "}
              </span>
            ))}
            the other months worked out from {tempsSource(climate)}, the rainfall and frost records, and the day length
          </p>
        ) : (
          <p className="text-sm text-ink-2">Worked out from {tempsSource(climate)}, the rainfall and frost records, and the day length</p>
        )}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[360px] table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-[34%] sm:w-[22%]" />
            {LETTERS.map((_, i) => (
              <col key={i} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="pb-1 text-left text-[11px] font-normal uppercase tracking-[0.12em] text-ink-2">Crop</th>
              {LETTERS.map((l, i) => (
                <th key={i} className={`pb-1 text-center text-[11px] ${i + 1 === month ? "font-bold text-ink" : "font-normal text-ink-2"}`}>
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.crop.slug} className="border-t border-line/60">
                <th scope="row" className="truncate py-0.5 pr-2 text-left font-normal" title={f.why.join(" ")}>
                  <Link href={`/gardening/crops/${f.crop.slug}`} className="hover:text-moss">
                    {f.crop.name}
                  </Link>
                  {f.staple && <span className="ml-1 text-[10px] uppercase tracking-wider text-moss">staple</span>}
                  <span className="sr-only">. {rowWords(f)}</span>
                </th>
                {LETTERS.map((_, i) => {
                  const kind = kindOf(f, i + 1);
                  const picked = f.harvest.includes(i + 1);
                  return (
                    <td key={i} className="relative h-7 border-l border-paper p-0">
                      <span className={`absolute inset-x-0 top-1 bottom-1 ${kind ? CELL[kind] : "bg-paper-2"}`} />
                      {picked && <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-fill ring-1 ring-ink/20" />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-4 bg-moss" /> Sow or plant out
        </span>
        {anyWatered && (
          <span className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-3 w-4 ${WATERED}`} /> Possible with watering — it grows into the dry season
          </span>
        )}
        {anyOverwinter && (
          <span className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-3 w-4 ${OVERWINTER}`} /> Sown to stand through winter
          </span>
        )}
        {anyTrays && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-4 border border-moss" /> Start in trays
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-gold-fill ring-1 ring-ink/20" /> Harvest
        </span>
      </p>
      {perennials.length > 0 && (
        <p className="mt-4 text-sm text-ink-2">
          <span className="font-medium text-ink">Perennials and fruit that do well here: </span>
          <CropLinks fits={perennials} commas />.
        </p>
      )}
      {whole ? (
        <p className="mt-3 text-xs text-ink-2">
          The sowing months are taken from {whole.publisher}&apos;s {whole.title} for {whole.name}, for the crops it lists; crops it does not list are left out.
          Harvest months are worked out from each crop&apos;s days to maturity and the frost record, not taken from the calendar. &ldquo;With watering&rdquo;
          marks sowings that grow into this town&apos;s dry months. Hover a crop&apos;s name for the calendar&apos;s own dates. Microclimates move them by weeks.
        </p>
      ) : (
        <p className="mt-3 text-xs text-ink-2">
          {part.map((s) => (
            <span key={s.id}>
              In {monthSpans(s.covers)} the sowing months are taken from {s.publisher}&apos;s {s.title} for {s.name}; crops it does not list are not sown then.{" "}
            </span>
          ))}
          {part.length ? "In the other months a" : "A"} crop is marked for a month when it can be sown on some day of that month and grow to harvest within its
          own temperature limits, in enough daylight and clear of frost. Where frost frames the year no crop goes out before its earliest day (a week after
          the average last frost for tender crops, three weeks before it for the others), and no harvest is shown before the earliest sowing plus the
          crop&apos;s days to maturity. A crop sown to stand through winter finishes in spring or summer. Hover a crop&apos;s name for the reasons. These are
          rules applied to this town&apos;s averages, not local planting dates; microclimates move them by weeks.
        </p>
      )}
    </section>
  );
}
