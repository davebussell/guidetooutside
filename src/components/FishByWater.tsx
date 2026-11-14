/**
 * The fishing page's lead: each kind of water the place has (the sea, the
 * estuaries, the rivers, the lakes and dams), and the fish of each in season
 * now — six as cards, the rest named, then the ones whose season is another
 * time of year.
 *
 * Round 2 (agent C): a fish the regulator has closed is shown after the open
 * ones under "Closed season now", never deleted; a fish that closes later in
 * the month says so on its card; a kind of water whose named waters are not
 * fisheries (urban drains, drinking-water reservoirs) or that is closed to
 * all fishing says why; and the regulator's licence note is printed where
 * one is recorded.
 *
 * Accuracy audit (2 November 2026): a fish is listed only when it has been
 * recorded near the town (GBIF), with the evidence on its card; the region's
 * other fish are named apart as "Regional species, not checked near here";
 * months are "Typical angling months" unless the regulator's rows name the
 * fish, in which case its open season is printed; and the footer says "as
 * read on <date>" only where a closed-season row applies, else points to the
 * regulator.
 *
 * Audit of 10 November 2026: a sea or sea-run fish's months are those of its
 * typical months that records near the town bear out, and the card says so; a
 * fish recorded here whose records bear out none of them is named with its
 * evidence and no season; a regulator's catch-and-release-only days are listed
 * apart ("Catch and release only now"), with the days the fish may be kept on
 * its card; and the records are counted in a box reaching 60 km each way from
 * town, which the words now say (its corners are about 85 km out).
 *
 * Day 3 audit (11 November 2026): the agencies' fish-consumption advice is printed with each kind of water and on the
 * card of each fish it names (src/data/fish-advisories.ts: Pittsburgh's three rivers, the Mississippi at St. Louis, the
 * Houston Ship Channel); months a fresh-water fish's records add are named as such on its card; a fish whose latest
 * record is older than 2006 is listed with no season and says why.
 *
 * Day 5 audit (14 November 2026):
 *  - Grand Rapids' walleye read "Typical angling months, less the closed season: Year-round" though Michigan closes it
 *    16 March to 24 April: a closed season of part-months drops no whole month. Where a closed season leaves all twelve
 *    months, the card says "the whole year outside the closed season" (`typicalLine`).
 *  - Kingston's and Niagara-on-the-Lake's bluegill and lake whitefish were listed under "Other months (typical angling
 *    months, not legal seasons)" while the footer named them under Ontario's open-all-year row. A fish the regulator's
 *    rows govern carries its open season in that list too, and the heading no longer calls every month there not legal.
 *  - Portland's Chinook read "months that records near here bear out: Jul–Oct" while its records peak in May; the card now
 *    says where the records peak when that month is outside the months shown (fishing-waters `recordsPeak`).
 */
import Image from "next/image";
import Link from "next/link";
import { habitatTags, laterWords, typicalLine, type AdvisoryNote, type SectionFish, type WaterSection } from "@/lib/fishing-waters";
import { rulesFooterParts, type RegulatorInfo } from "@/lib/closed-seasons";
import { getCreature } from "@/lib/nature";
import { creatureImage } from "@/lib/creature-images";
import { monthName } from "@/lib/species";
import { shortMonthRange } from "./NatureCard";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2026-11-11" → "11 November 2026". */
const dateWords = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

/** One advisory in the agency's words: "Carp and channel catfish, the Allegheny River…: no more than one meal a month (PCBs)." */
function adviceText(a: AdvisoryNote): string {
  return `${a.fish}, ${a.waters}: ${a.advice.charAt(0).toLowerCase()}${a.advice.slice(1)}${a.who ? ` (for ${a.who})` : ""}${a.contaminant ? `; ${a.contaminant}` : ""}.`;
}

/** On a fish's own card the advisory's list of fish is left out: the card is that fish (fix of 11 November 2026). */
function adviceOnCard(a: AdvisoryNote): string {
  const where = a.waters.charAt(0).toUpperCase() + a.waters.slice(1);
  return `${where}: ${a.advice.charAt(0).toLowerCase()}${a.advice.slice(1)}${a.who ? ` (for ${a.who})` : ""}${a.contaminant ? `; ${a.contaminant}` : ""}.`;
}

/**
 * A card's habitat line is src/lib/fishing-waters `habitatTags`, which the fish check reads too: only habitats this place
 * has (audit of 5 November 2026: "big lakes" at Calgary, Denver and Dallas); where the open coast is 10 to 30 km from
 * town, the sea's tags say so, and surf and rock tags never sit on a tidal river or an estuary (audit of 10 November
 * 2026: Moncton, Savannah and Jacksonville read "surf beaches · rocky shores" as if at the town).
 */
function FishCard({ fish, section }: { fish: SectionFish; section: WaterSection }) {
  const img = creatureImage(fish.slug);
  const href = `/wildlife/${fish.slug}`;
  return (
    <li className="grid grid-cols-[38%_1fr] gap-4 border-t border-line/70 pt-4">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-tile bg-paper-2">
        {img ? (
          <Image
            src={img.src}
            alt={`${fish.name} (${fish.latin})`}
            fill
            sizes="(max-width: 640px) 40vw, 220px"
            className="object-cover transition duration-[900ms] ease-settle motion-safe:hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
            <span className="font-display text-base italic text-ink-2">{fish.latin}</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink-2">No open-licence photograph</span>
          </span>
        )}
      </Link>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.12em] text-ink-2">{habitatTags(fish, section)}</p>
        <h4 className="font-display mt-1 text-lg font-semibold leading-tight">
          <Link href={href} className="hover:text-moss">
            {fish.name}
          </Link>
        </h4>
        <p className="text-xs italic text-ink-2">{fish.latin}</p>
        <p className="mt-1 text-xs text-ink-2">
          {fish.basis === "regulator" && fish.openWords && fish.openWords === "all year" && fish.keepWords && fish.keepWords !== "never" ? (
            // A row that only limits keeping (Boston's cod: kept 1 Sep to 31 Oct, released on other days) is not the
            // regulator's "open all year": print the keep season alone (fix of 11 November 2026).
            <>
              <span className="font-medium text-ink">May be kept only {fish.keepWords}</span> (
              {fish.ruleSource ? (
                <a href={fish.ruleSource} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2">
                  {fish.regulator}
                </a>
              ) : (
                fish.regulator
              )}
              ); release it on other days. Typical angling months{fish.seasonFrom === "records" ? " that records near here bear out" : ""}: {shortMonthRange(fish.anglingMonths)}.
            </>
          ) : fish.basis === "regulator" && fish.openWords ? (
            <>
              <span className="font-medium text-ink">Open {fish.openWords}</span> (
              {fish.ruleSource ? (
                <a href={fish.ruleSource} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2">
                  {fish.regulator}
                </a>
              ) : (
                fish.regulator
              )}
              ).{fish.keepWords ? <> {fish.keepWords === "never" ? "It may not be kept; release every fish." : `May be kept only ${fish.keepWords}; release it on other days.`}</> : null}{" "}
              {typicalLine(fish, fish.openWords === "all year" ? "Typical angling months within it" : "Typical angling months, less the closed season")}
            </>
          ) : (
            <>
              Typical angling months{fish.seasonFrom === "records" ? " that records near here bear out" : ""} (not legal seasons): {shortMonthRange(fish.anglingMonths)}.
            </>
          )}
          {fish.peakOutside ? (
            // Day 5 audit: Portland's Chinook records peak in May, outside the months shown.
            <> Records near here peak in {monthName(fish.peakOutside)}, outside these months.</>
          ) : null}
          {fish.widened?.length ? (
            // Day 3 audit: months the town's own records add, said as such (Houston's largemouth bass in November and January).
            <> {shortMonthRange(fish.widened)} added: the records near here hold at least half as many in each of those months as in its usual ones.</>
          ) : null}
        </p>
        {fish.tactic && <p className="mt-2 text-sm leading-snug text-ink-2">{fish.tactic}</p>}
        {fish.closure && (
          <p className="mt-2 text-xs font-medium text-rust">
            {fish.closure.label}
            {fish.closure.source && (
              <>
                {" "}
                <a href={fish.closure.source} target="_blank" rel="noopener nofollow" className="font-normal text-ink-2 underline decoration-line underline-offset-2">
                  rules
                </a>
              </>
            )}
          </p>
        )}
        {fish.monthsNote && (
          <p className="mt-2 text-xs text-ink-2">
            {fish.monthsNote.text}{" "}
            <a href={fish.monthsNote.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2">
              source
            </a>
          </p>
        )}
        {fish.advisories
          ?.filter((a) => !a.species.includes("*"))
          .map((a) => (
            <p key={a.id} className="mt-2 text-xs text-ink-2">
              <span className="font-medium text-ink">Eating it: </span>
              {adviceOnCard(a)}{" "}
              <a href={a.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2">
                {a.agency}
              </a>
            </p>
          ))}
        <p className="mt-2 text-[10px] text-ink-2">{fish.evidence}</p>
        {img && (
          <p className="mt-1 text-[10px] text-ink-2">
            <a href={img.source} target="_blank" rel="noopener nofollow" className="hover:underline">
              {img.author}
            </a>{" "}
            · {img.license}
          </p>
        )}
      </div>
    </li>
  );
}

const fishLink = "underline decoration-line underline-offset-2 hover:text-moss";

/** The line under the page about the rules (the words are src/lib/closed-seasons rulesFooterParts, which the checks read too). */
function RulesFooter({ reg, shown, tidal }: { reg: RegulatorInfo; shown: Set<string>; tidal: boolean }) {
  return (
    <>
      {rulesFooterParts(reg, (s) => (shown.has(s) ? getCreature(s)?.name : undefined), tidal).map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <a key={i} href={p.href} target="_blank" rel="noopener nofollow" className={fishLink}>
            {p.text}
          </a>
        ),
      )}
    </>
  );
}

export function FishByWater({ sections, placeName, month }: { sections: WaterSection[]; placeName: string; month: number }) {
  if (!sections.length) return null;
  const { regulation, presence } = sections[0];
  const shown = new Set(sections.flatMap((s) => [...s.fish, ...s.closed, ...s.later, ...s.undated].map((f) => f.slug)));
  // The regulator's licence and "no closed season" notes, once each, after the waters.
  const notes = [...new Map(sections.flatMap((s) => s.notes).map((n) => [n.note, n])).values()];
  return (
    <section aria-labelledby="by-water">
      <p className="eyebrow text-azure">On the water · {monthName(month)}</p>
      <h2 id="by-water" className="font-display mt-1 text-3xl font-semibold tracking-tight">
        What to fish for around {placeName}, water by water
      </h2>
      <p className="mt-2 max-w-2xl text-ink-2">
        {presence.checked ? (
          <>
            Each kind of water holds its own fish. These are the ones recorded near {placeName} (GBIF records since {presence.since} in a box reaching{" "}
            {presence.boxKm} km each way from town) that are in season in {monthName(month)}, by the regulator&rsquo;s season where one is loaded and by typical
            angling months where not; for a sea fish, only the months its records near here bear out. Tap one for where it holds, how to know it and the rules
            that apply.
          </>
        ) : (
          <>
            Each kind of water holds its own fish. Fish records near {placeName} have not been checked yet, so no fish is listed as in season here; the
            region&rsquo;s species are named below as context only.
          </>
        )}
      </p>
      <div className="mt-8 grid gap-10">
        {sections.map((s) => {
          const cards = s.fish.slice(0, 6);
          const also = s.fish.slice(6);
          return (
            <article key={s.id} className="border-t-2 border-ink pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                <p className="text-sm text-ink-2">{s.where}</p>
              </div>
              {s.avoid && (
                <p className="mt-3 max-w-3xl rounded-tile border border-rust/40 bg-paper-2 px-4 py-3 text-sm text-ink">
                  <span className="font-medium text-rust">Not here. </span>
                  {s.avoid.reason}
                </p>
              )}
              {cards.length ? (
                <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {cards.map((f) => (
                    <FishCard key={f.slug} fish={f} section={s} />
                  ))}
                </ul>
              ) : s.closed.length || s.avoid ? null : (
                <p className="mt-4 text-sm text-ink-2">A quiet month on this water — nothing in the guide is at its best here now.</p>
              )}
              {[
                { title: "Closed season now", list: s.closed.filter((f) => !f.closure!.release) },
                { title: "Catch and release only now", list: s.closed.filter((f) => f.closure!.release) },
              ].map(({ title, list }) =>
                list.length > 0 ? (
                <div key={title} className="mt-5 text-sm">
                  <p className="font-medium text-rust">{title}</p>
                  <ul className="mt-1 grid gap-1 text-ink-2">
                    {list.map((f) => (
                      <li key={f.slug}>
                        <Link href={`/wildlife/${f.slug}`} className={`${fishLink} text-ink`}>
                          {f.name}
                        </Link>{" "}
                        <span>— {f.closure!.label.replace(/ — .*$/, "").replace(/^Catch and release only /, "")}</span>
                        <span className="text-ink-2"> ({f.closure!.regulator}</span>
                        {f.closure!.source ? (
                          <>
                            <span className="text-ink-2">, </span>
                            <a href={f.closure!.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-moss">
                              rules
                            </a>
                            <span className="text-ink-2">)</span>
                          </>
                        ) : (
                          <span className="text-ink-2">)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                ) : null,
              )}
              {(also.length > 0 || s.later.length > 0) && (
                <p className="mt-5 text-sm text-ink-2">
                  {also.length > 0 && (
                    <>
                      <span className="font-medium text-ink">Also in season: </span>
                      {also.map((f, i) => (
                        <span key={f.slug}>
                          {i > 0 ? ", " : null}
                          <Link href={`/wildlife/${f.slug}`} className={fishLink}>
                            {f.name}
                          </Link>
                          {f.closure && <span className="text-rust"> ({f.closure.label.replace(/ — .*$/, "")})</span>}
                        </span>
                      ))}
                      .{" "}
                    </>
                  )}
                  {s.later.length > 0 && (
                    <>
                      <span className="font-medium text-ink">Other months: </span>
                      {s.later.map((f, i) => (
                        <span key={f.slug}>
                          {i > 0 ? ", " : null}
                          <Link href={`/wildlife/${f.slug}`} className={fishLink}>
                            {f.name}
                          </Link>{" "}
                          <span className="text-ink-2">({laterWords(f)})</span>
                        </span>
                      ))}
                      .
                    </>
                  )}
                </p>
              )}
              {[
                { list: s.undated.filter((f) => f.undatedWhy !== "old"), why: `Their records near ${placeName} fall outside the months they are usually fished, so no season is claimed here.` },
                { list: s.undated.filter((f) => f.undatedWhy === "old"), why: `None has been recorded near ${placeName} since 2005, so no season is claimed.` },
              ].map(({ list, why }) =>
                list.length > 0 ? (
                <p key={why} className="mt-4 text-sm text-ink-2">
                  <span className="font-medium text-ink">Recorded near here, no season shown: </span>
                  {list.map((f, i) => (
                    <span key={f.slug}>
                      {i > 0 ? "; " : null}
                      <Link href={`/wildlife/${f.slug}`} className={fishLink}>
                        {f.name}
                      </Link>{" "}
                      <span>({f.evidence})</span>
                    </span>
                  ))}
                  . {why}
                </p>
                ) : null,
              )}
              {s.advisories.length > 0 && (
                <div className="mt-4 text-sm text-ink-2">
                  <p className="font-medium text-ink">Eating what you catch here</p>
                  <ul className="mt-1 grid gap-1">
                    {s.advisories.map((a) => (
                      <li key={a.id}>
                        {adviceText(a)}{" "}
                        <a href={a.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-moss">
                          {a.agency}
                        </a>
                        , read {dateWords(a.checked)}.
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {s.unchecked.length > 0 && (
                <p className="mt-4 text-sm text-ink-2">
                  <span className="font-medium text-ink">Regional species, not checked near here: </span>
                  {s.unchecked.map((f, i) => (
                    <span key={f.slug}>
                      {i > 0 ? ", " : null}
                      <Link href={`/wildlife/${f.slug}`} className={fishLink}>
                        {f.name}
                      </Link>
                      {presence.checked && !presence.dataPoor && f.reason ? <span> ({f.reason.replace(/\.$/, "").replace(/^./, (c) => c.toLowerCase())})</span> : null}
                    </span>
                  ))}
                  . They are known across the region, but{" "}
                  {!presence.checked
                    ? "this town's fish records have not been checked"
                    : presence.dataPoor
                      ? `fewer than 2,000 fish records of any kind lie in a box reaching ${presence.boxKm} km each way from ${placeName}, so a missing record proves little`
                      : "the records near here cannot say whether they live in these waters"}
                  .
                </p>
              )}
            </article>
          );
        })}
      </div>
      {notes.length > 0 && (
        <p className="mt-6 max-w-3xl text-sm text-ink-2">
          {notes.map((n, i) => (
            <span key={n.note}>
              {i > 0 ? " " : null}
              {n.note}{" "}
              <a href={n.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-moss">
                {n.regulator}
              </a>
              .
            </span>
          ))}
        </p>
      )}
      <p className="mt-6 text-xs text-ink-2">
        Waters from Natural Earth and OpenStreetMap. A fish is listed as in season only if it has been recorded since {presence.since} in a box reaching{" "}
        {presence.boxKm} km each way from {placeName} in the Global Biodiversity Information Facility ({presence.source}), with records nearer than 30 km or
        enough of them farther out, and a sea fish only in the months its records bear out; the count and the nearest distance are on its card. A fish with no
        record is left out where many other fish have been recorded, and named as a regional species where few have or where its records are too thin. <RulesFooter reg={regulation} shown={shown} tidal={sections.some((s) => s.id === "sea" || s.id === "estuary")} />
      </p>
    </section>
  );
}
