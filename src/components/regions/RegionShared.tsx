/**
 * "What the whole region shares, and what differs": the wild edibles, fish,
 * garden creatures and crops the libraries give the region, split into what
 * every pre-built town gets and what only some do — with the rule that
 * makes the difference named each time, and the limits of the data said.
 */
import Link from "next/link";
import type { LibItem } from "@/lib/regions/types";
import type { PartialItem, SharedAndDiffering, Split } from "@/lib/regions/library";
import type { TownRow } from "@/lib/regions/types";
import { nameList } from "@/lib/regions/format";

const KINDS: { key: keyof Pick<SharedAndDiffering, "species" | "fish" | "garden" | "crops">; title: string; tone: string; what: string; rule: string }[] = [
  {
    key: "species",
    title: "Wild edibles",
    tone: "text-moss",
    what: "wild edibles",
    rule: "A species is given to a town when the library tags it for this region, the town's hardiness zone is inside the species' zone range (where it has one), and, for a shore species, the town is near the sea.",
  },
  {
    key: "fish",
    title: "Fish",
    tone: "text-azure",
    what: "fish",
    rule: "A fish is given to a town when the library tags it for this region and, for a fish of salt water only, the town is near the sea. Which of its waters a town actually has — a big lake, a trout stream — is on the town's own fishing page.",
  },
  {
    key: "garden",
    title: "Garden insects and soil life",
    tone: "text-azure",
    what: "garden creatures",
    rule: "Garden creatures are tagged by region only, so every town in the region is given the same ones.",
  },
  {
    key: "crops",
    title: "Crops",
    tone: "text-moss",
    what: "crops",
    rule: "A crop is listed for a town when at least one month's sowing would grow through within the crop's temperature limits and clear of frost, by the town's own ten-year monthly climate (the same calendar the town's gardening page prints).",
  },
];

function Names({ items, show = 12 }: { items: LibItem[]; show?: number }) {
  const first = items.slice(0, show);
  const rest = items.slice(show);
  const link = (i: LibItem) => (
    <Link key={i.slug} href={i.href} className="underline decoration-line underline-offset-2 hover:text-moss">
      {i.name}
    </Link>
  );
  return (
    <>
      <span className="leading-relaxed">
        {first.map((i, n) => (
          <span key={i.slug}>
            {n > 0 && ", "}
            {link(i)}
          </span>
        ))}
        {rest.length ? ` and ${rest.length} more.` : "."}
      </span>
      {rest.length > 0 && (
        <details className="mt-1 text-sm">
          <summary className="cursor-pointer text-moss hover:underline">All {items.length}</summary>
          <p className="mt-1 leading-relaxed text-ink">
            {items.map((i, n) => (
              <span key={i.slug}>
                {n > 0 && ", "}
                {link(i)}
              </span>
            ))}
            .
          </p>
        </details>
      )}
    </>
  );
}

function Partial({ p, byTown }: { p: PartialItem; byTown: Map<string, TownRow> }) {
  const where = p.inTowns.map((s) => byTown.get(s)?.name ?? s);
  return (
    <li className="border-b border-line py-2 last:border-0">
      <Link href={p.item.href} className="font-medium text-ink hover:text-moss">
        {p.item.name}
      </Link>
      <span className="text-ink-2">
        {" "}
        — {p.inTowns.length} of {p.inTowns.length + p.outTowns.length} towns ({nameList(where, 4)}); {p.reason}.
      </span>
    </li>
  );
}

function Block({ kind, split, towns, counted, byTown }: { kind: (typeof KINDS)[number]; split: Split; towns: number; counted: number; byTown: Map<string, TownRow> }) {
  const total = split.everywhere.length + split.partial.length + split.nowhere.length;
  if (!total) return null;
  return (
    <section className="border-t-2 border-ink pt-4">
      <h3 className={`eyebrow ${kind.tone}`}>{kind.title}</h3>
      <p className="font-display mt-1 text-2xl font-semibold leading-snug">
        {towns === 0
          ? `${total} ${kind.what} tagged for the region`
          : split.partial.length === 0
            ? `All ${split.everywhere.length} ${kind.what} in every town`
            : `${split.everywhere.length} in every town, ${split.partial.length} only in some`}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{kind.rule}</p>
      {split.everywhere.length > 0 && (
        <div className="mt-3 text-ink">
          <span className="font-semibold">{towns === 0 ? "Tagged for the region" : counted === 1 ? `In ${byTown.values().next().value?.name ?? "the one town"}` : "Everywhere in the region"}:</span>{" "}
          <Names items={split.everywhere} />
        </div>
      )}
      {split.partial.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold text-ink">Only where the rule allows:</p>
          <ul className="mt-1 text-sm">
            {split.partial.map((p) => (
              <Partial key={p.item.slug} p={p} byTown={byTown} />
            ))}
          </ul>
        </div>
      )}
      {split.nowhere.length > 0 && (
        <p className="mt-3 text-sm text-ink-2">
          <span className="font-semibold text-ink">Tagged for the region but outside every pre-built town&rsquo;s rule:</span>{" "}
          {split.nowhere.map((i, n) => (
            <span key={i.slug}>
              {n > 0 && "; "}
              <Link href={i.href} className="underline decoration-line underline-offset-2 hover:text-moss">
                {i.name}
              </Link>
              {i.zones ? ` (zones ${i.zones[0]}–${i.zones[1]})` : i.coastOnly ? " (coast only)" : ""}
            </span>
          ))}
          . A town searched in the region that fits the rule still gets {split.nowhere.length === 1 ? "it" : "them"}.
        </p>
      )}
    </section>
  );
}

export function RegionShared({ data, towns, regionName }: { data: SharedAndDiffering; towns: TownRow[]; regionName: string }) {
  const byTown = new Map(towns.map((t) => [t.slug, t]));
  const noCropNames = data.noCrops.map((s) => byTown.get(s)?.name ?? s);
  return (
    <section aria-labelledby="shared">
      <p className="eyebrow text-moss">Shared and differing</p>
      <h2 id="shared" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        What the whole region shares, and what differs
      </h2>
      <p className="mt-2 max-w-3xl text-ink-2">
        The libraries tag each wild edible, fish and garden creature by ecological region, so everything below is given to the whole of {regionName}. Within
        the region, only three things in the data can take an item off a town&rsquo;s list: its hardiness zone, whether it is near the sea, and (for crops) its own monthly
        climate. Differences finer than that — a valley, a soil, a particular river — are not claimed here.
        {towns.length > 0 && towns.length <= 2 && ` With only ${towns.length === 1 ? "one pre-built town" : "two pre-built towns"} in the region, "everywhere" means ${towns.length === 1 ? "that town" : "both"}; search your own town to see its list.`}
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {KINDS.map((k) => (
          <Block key={k.key} kind={k} split={data[k.key]} towns={towns.length} counted={k.key === "crops" ? towns.length - data.noCrops.length : towns.length} byTown={byTown} />
        ))}
      </div>
      {noCropNames.length > 0 && (
        <p className="mt-4 text-xs text-ink-2">
          Crops could not be worked out for {nameList(noCropNames)}: no monthly rain was recorded when {noCropNames.length === 1 ? "its" : "their"} climate was read, so
          {noCropNames.length === 1 ? " it is" : " they are"} left out of the crop counts.
        </p>
      )}
    </section>
  );
}
