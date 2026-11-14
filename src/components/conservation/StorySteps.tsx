/**
 * A story's "ways in": a numbered row of cards, each with its effort on top
 * ("A few minutes", "An afternoon", "All season"), what to do, who with, and
 * one button to the organisation's own page or the invitation. A reader whose
 * country is known sees the steps for everyone and the ones for their country
 * in that row; a reader whose country is not known sees the steps for
 * everyone in the row and the country ones as a short "Where you live" list
 * under it, each with its country. Presentational (plain props, no library),
 * so the client country filter draws the same thing.
 */
import Link from "next/link";
import { OutboundButton } from "./InvitationFeature";

export type StepData = {
  key: string;
  effort: string;
  text: string;
  /** The organisation's page or the invitation's, opened by the button. */
  href?: string;
  label?: string;
  /** "invitation" or the organisation's way ("home", "volunteer" …), for the click count. */
  way: string;
  org?: { slug: string; name: string };
  countries?: string[];
  /** The countries in words, for a step that only exists in some: "In Canada", "In Europe". */
  where?: string;
};

export function StepCard({ step, n }: { step: StepData; n: number }) {
  return (
    <li className="card flex h-full min-w-0 flex-col p-5 sm:p-6">
      <p className="flex items-center gap-3">
        <span className="font-display grid h-9 w-9 shrink-0 place-items-center rounded-full bg-moss text-lg text-on-moss" aria-hidden="true">
          {n}
        </span>
        <span className="eyebrow text-moss">{step.effort}</span>
      </p>
      <p className="mt-4 text-[17px] leading-snug text-ink">{step.text}</p>
      {step.org && (
        <p className="mt-2 text-sm text-ink-2">
          With{" "}
          <Link href={`/conservation/${step.org.slug}`} className="font-medium text-ink underline decoration-line underline-offset-2 hover:text-moss">
            {step.org.name}
          </Link>
        </p>
      )}
      {step.href && step.label && step.org && (
        <div className="mt-auto pt-5">
          <OutboundButton href={step.href} org={step.org.slug} way={step.way} variant="outline">
            {step.label}
          </OutboundButton>
        </div>
      )}
    </li>
  );
}

export const stepsHeading = (n: number) => (n === 3 ? "Three ways in" : n === 2 ? "Two ways in" : n === 4 ? "Four ways in" : "Ways in");

export function StepGrid({ steps, id }: { steps: StepData[]; id: string }) {
  if (!steps.length) return null;
  return (
    <div className="mt-12">
      <h3 id={id} className="font-display text-2xl tracking-tight sm:text-3xl">
        {stepsHeading(steps.length)}
      </h3>
      <ol aria-labelledby={id} className={`mt-5 grid gap-5 ${steps.length > 1 ? "md:grid-cols-2" : "max-w-xl"} ${steps.length === 3 || steps.length > 4 ? "lg:grid-cols-3" : ""}`}>
        {steps.map((s, i) => (
          <StepCard key={s.key} step={s} n={i + 1} />
        ))}
      </ol>
    </div>
  );
}

/** The country steps for a reader whose country is not known: one line each, its country first. */
export function LocalSteps({ steps, id }: { steps: StepData[]; id: string }) {
  if (!steps.length) return null;
  return (
    <div className="mt-8">
      <h4 id={id} className="font-display text-xl tracking-tight">
        Where you live
      </h4>
      <ul aria-labelledby={id} className="card mt-3 divide-y divide-line/70 px-5 sm:px-6">
        {steps.map((s) => (
          <li key={s.key} className="grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto] sm:items-center">
            <p className="text-[13px] font-semibold text-moss">
              {s.where ?? "Some countries"} · <span className="font-normal text-ink-2">{s.effort}</span>
            </p>
            <p className="text-[15px] leading-snug">
              {s.text}
              {s.org && (
                <span className="text-ink-2">
                  {" "}
                  — with{" "}
                  <Link href={`/conservation/${s.org.slug}`} className="text-ink underline decoration-line underline-offset-2 hover:text-moss">
                    {s.org.name}
                  </Link>
                </span>
              )}
            </p>
            {s.href && s.label && s.org && (
              <OutboundButton href={s.href} org={s.org.slug} way={s.way} variant="outline" className="justify-self-start sm:justify-self-end">
                {s.label}
              </OutboundButton>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The ways in for a reader in `country` (all of them when it is unknown: the
 * steps for everyone numbered, the country ones listed under them).
 */
export function StepsBlock({ steps, country, id }: { steps: StepData[]; country: string | null; id: string }) {
  if (country) {
    const mine = steps.filter((s) => !s.countries?.length || s.countries.includes(country));
    return <StepGrid steps={mine.length ? mine : steps.filter((s) => !s.countries?.length)} id={id} />;
  }
  const general = steps.filter((s) => !s.countries?.length);
  const local = steps.filter((s) => s.countries?.length);
  if (!general.length) return <StepGrid steps={steps} id={id} />;
  return (
    <>
      <StepGrid steps={general} id={id} />
      <LocalSteps steps={local} id={`${id}-local`} />
    </>
  );
}
