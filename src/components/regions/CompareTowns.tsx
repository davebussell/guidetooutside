"use client";
/**
 * "Compare two places": pick any two of the region's pre-built towns and see
 * the lines that differ, and what the libraries give one and not the other.
 * Everything comes down from the server as props (the town rows and the
 * region's library); nothing is fetched. A remembered place that is one of
 * the towns opens the comparison; one that is not is pointed to its own guide.
 */
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { usePlace } from "@/lib/hooks";
import { compareTowns, mostDifferent } from "@/lib/regions/compare";
import type { LibItem, RegionLibrary, TownOrgs, TownRow } from "@/lib/regions/types";

const KIND_LABEL: Record<LibItem["kind"], string> = { species: "Wild edibles", fish: "Fish", garden: "Garden life", crop: "Crops" };
const KIND_ORDER: LibItem["kind"][] = ["species", "fish", "crop", "garden"];

function OnlyList({ title, items, town }: { title: string; items: LibItem[]; town: string }) {
  const groups = KIND_ORDER.map((k) => ({ k, items: items.filter((i) => i.kind === k) })).filter((g) => g.items.length);
  return (
    <div>
      <p className="font-semibold text-ink">{title}</p>
      {!groups.length ? (
        <p className="mt-1 text-sm text-ink-2">Nothing the libraries give {town} alone.</p>
      ) : (
        <dl className="mt-1 grid gap-1.5 text-sm">
          {groups.map((g) => (
            <div key={g.k}>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">
                {KIND_LABEL[g.k]} · {g.items.length}
              </dt>
              <dd className="leading-relaxed">
                {g.items.map((i, n) => (
                  <span key={i.slug}>
                    {n > 0 && ", "}
                    <Link href={i.href} className="underline decoration-line underline-offset-2 hover:text-moss">
                      {i.name}
                    </Link>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function CompareTowns({ towns, lib, regionName, orgs }: { towns: TownRow[]; lib: RegionLibrary; regionName: string; orgs?: Record<string, TownOrgs> }) {
  const id = useId();
  const remembered = usePlace() as { slug?: string; label?: string } | null;
  const rememberedTown = remembered?.slug ? towns.find((t) => t.slug === remembered.slug) : undefined;
  const [picked, setPicked] = useState<{ a: string; b: string } | null>(null);

  const { a, b } = useMemo(() => {
    const first = (picked ? towns.find((t) => t.slug === picked.a) : undefined) ?? rememberedTown ?? towns[0];
    const second = (picked ? towns.find((t) => t.slug === picked.b) : undefined) ?? mostDifferent(first, towns) ?? towns[1] ?? towns[0];
    return { a: first, b: second };
  }, [picked, rememberedTown, towns]);

  if (towns.length < 2) {
    return (
      <p className="text-ink-2">
        {towns.length === 1
          ? `Only one pre-built town (${towns[0].name}) falls in ${regionName}, so there is no second town to set beside it here. Search your own town above: its guide gives the same numbers, and the table and ribbon above show where it sits.`
          : `No pre-built town falls in ${regionName} yet. Search a town in the region above to see its own numbers.`}
      </p>
    );
  }

  const cmp = compareTowns(a, b, lib, orgs);
  const differing = cmp.lines.filter((l) => l.differs).length;
  const select = (which: "a" | "b", value: TownRow) => (
    <label className="grid gap-1 text-sm">
      <span className="eyebrow">{which === "a" ? "First place" : "Second place"}</span>
      <select
        id={`${id}-${which}`}
        value={value.slug}
        onChange={(e) => setPicked({ a: which === "a" ? e.target.value : a.slug, b: which === "b" ? e.target.value : b.slug })}
        className="h-11 w-full rounded-tile border border-edge bg-surface px-3 text-base text-ink"
      >
        {towns.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.name}
            {t.zone ? ` · ${t.zone}` : ""}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {select("a", a)}
        {select("b", b)}
      </div>
      {remembered?.slug && !rememberedTown && (
        <p className="mt-2 text-sm text-ink-2">
          Your remembered place, {remembered.label ?? remembered.slug}, is not one of the pre-built towns here;{" "}
          <Link href={`/guide/${remembered.slug}`} className="font-medium text-moss hover:underline">
            its own guide
          </Link>{" "}
          carries the same numbers.
        </p>
      )}
      {rememberedTown && a.slug === rememberedTown.slug && !picked && <p className="mt-2 text-sm text-ink-2">Opened on your remembered place, {rememberedTown.name}, against the town that differs most from it.</p>}

      <div className="mt-5 overflow-hidden rounded-tile border border-line">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-ink bg-paper-2/60 text-left">
              <th scope="col" className="w-[28%] py-2 pl-3 pr-2 font-semibold">
                <span className="sr-only">Measure</span>
              </th>
              <th scope="col" className="py-2 px-2 font-semibold">
                <Link href={`/guide/${a.slug}`} className="hover:text-moss">
                  {a.name}
                </Link>
              </th>
              <th scope="col" className="py-2 px-2 font-semibold">
                <Link href={`/guide/${b.slug}`} className="hover:text-moss">
                  {b.name}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {cmp.lines.map((l) => (
              <tr key={l.key} className={`border-b border-line last:border-0 align-top ${l.differs ? "" : "text-ink-2"}`}>
                <th scope="row" className="py-2 pl-3 pr-2 text-left font-medium text-ink-2">
                  {l.label}
                  <span className="sr-only">. {l.method}</span>
                </th>
                <td className={`py-2 px-2 tabular-nums ${l.differs ? "font-medium text-ink" : ""}`} title={l.method}>
                  {l.a}
                </td>
                <td className={`py-2 px-2 tabular-nums ${l.differs ? "font-medium text-ink" : ""}`} title={l.method}>
                  {l.b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-2">
        {differing ? `${differing} of ${cmp.lines.length} lines differ; the rest read the same at both.` : "The two read the same on every line."} Hover a value for how it was read; the table above
        lists every town&rsquo;s method marks.
      </p>

      {cmp.orgNotes.length > 0 && (
        <div className="mt-5">
          <p className="font-semibold text-ink">Who looks after each</p>
          <ul className="mt-1 grid gap-1 text-sm leading-relaxed text-ink">
            {cmp.orgNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden="true" className="text-moss">
                  ·
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <OnlyList title={`In ${a.name}, not ${b.name}`} items={cmp.onlyA} town={a.name} />
        <OnlyList title={`In ${b.name}, not ${a.name}`} items={cmp.onlyB} town={b.name} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-2">
        {cmp.shared} library items are given to both. Differences come only from the zone and coast rules and the crop calendar described above
        {cmp.cropsUnknown.length ? `; crops are left out because no rain was recorded for ${cmp.cropsUnknown.join(" and ")}` : ""}. Nothing here is a claim about a species&rsquo; true
        range between two towns — check the town&rsquo;s own page and a local guide.
      </p>
    </div>
  );
}
