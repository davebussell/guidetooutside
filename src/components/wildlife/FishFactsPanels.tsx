/**
 * The reference panels of a fish page (/wildlife/<fish>): "<name> facts",
 * "Questions people ask about <name>" and "Checked against these sources",
 * from the fish's facts (src/data/fish-facts.ts).
 */
import { FACTS_REVIEWED } from "@/data/edible-facts";
import { sizeText, type FishFacts } from "@/data/fish-facts";

/** The facts rows in the order the live pages print them; rows a fish has no text for are left out. */
function factRows(f: FishFacts): [label: string, text: string | undefined][] {
  return [
    ["Also called", f.otherNames],
    ["Family", f.family],
    ["Native range", f.nativeRange],
    ["Introduced to", f.introduced],
    ["Habitat", f.habitat],
    ["Water temperature", f.temp],
    ["Size", sizeText(f)],
    ["Record", f.record],
    ["Lifespan", f.lifespan],
    ["What it eats", f.diet],
    ["Spawning", f.spawning],
    ["Young fish", f.young],
    ["Teeth and mouth", f.mouth],
    ["Look-alikes", f.lookalikes],
    ["Eating", f.eating],
    ["Status", f.status],
  ];
}

export function QuickFacts({ name, facts }: { name: string; facts: FishFacts }) {
  return (
    <section className="card p-5 sm:p-7" aria-labelledby="quick-facts">
      <h2 id="quick-facts" className="eyebrow text-azure">
        {name} facts
      </h2>
      <dl className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
        {factRows(facts)
          .filter(([, text]) => text)
          .map(([label, text]) => (
            <div key={label} className="min-w-0 border-t border-line/70 pt-3">
              <dt className="text-[13px] font-semibold uppercase tracking-wide text-ink">{label}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{text}</dd>
            </div>
          ))}
      </dl>
    </section>
  );
}

/** The questions, the first three open. `about` is the fish's everyday name, lower-cased, without its bracketed part. */
export function Questions({ about, faqs }: { about: string; faqs: FishFacts["faqs"] }) {
  return (
    <section aria-labelledby="questions" className="scroll-mt-24" id="questions-section">
      <h2 id="questions" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
        {"Questions people ask about "}
        {about}
      </h2>
      <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:items-start">
        {faqs.map((f, i) => (
          <details key={f.q} open={i < 3} className="group card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-snug text-ink">{f.q}</h3>
              <span
                aria-hidden="true"
                className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper-2 text-ink-2 transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Sources({ sources }: { sources: FishFacts["sources"] }) {
  return (
    <section className="rounded-tile border border-line bg-paper-2/60 p-5 text-sm text-ink-2">
      <p className="font-semibold text-ink">
        {"Checked against these sources · "}
        <time dateTime={FACTS_REVIEWED.iso}>
          {"last reviewed "}
          {FACTS_REVIEWED.label}
        </time>
      </p>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {sources.map((s) => (
          <li key={s.url} className="min-w-0">
            <a href={s.url} target="_blank" rel="noopener nofollow" className="break-words underline decoration-line underline-offset-2 hover:text-ink">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-2">
        Sizes, records and ranges are for the species as a whole; local populations and rules vary. Records change; the record-keeper named above holds the
        current one.
      </p>
    </section>
  );
}
