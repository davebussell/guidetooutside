import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityArt } from "@/components/learn/ActivityArt";
import { Label, Tile } from "@/components/learn/family";
import { LessonAtAGlance, LessonFamily, LessonGame, LessonSay, LessonWho } from "@/components/learn/LessonParts";
import { LessonDone } from "@/components/learn/LessonDone";
import { LessonExtra } from "@/components/learn/LessonExtra";
import { PlaceCTA } from "@/components/PlaceCTA";
import { getLesson, LESSONS, monthsLabel, THEMES, type RungId } from "@/lib/learn/lessons";
import { LOOK_ONLY, RUNGS } from "@/lib/learn/rungs";
import { SKILLS } from "@/lib/learn/badges";
import { SITE, shareCard } from "@/lib/site";
import { breadcrumbLd, jsonLd } from "@/lib/learn/ld";

type Rung = { id: RungId; age: number; label: string; building: string };

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const l = getLesson((await params).slug);
  if (!l) return {};
  const path = `/learn/lessons/${l.slug}`;
  const card = shareCard(l.title, l.blurb, path);
  return {
    title: `${l.title} — a nature lesson for ages two, four and six`,
    description: l.blurb,
    alternates: { canonical: path },
    openGraph: { ...card.openGraph, type: "article" },
    twitter: card.twitter,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const l = getLesson((await params).slug);
  if (!l) notFound();
  const theme = THEMES.find((t) => t.theme === l.theme)!;
  const rungs = RUNGS as Rung[];
  const when = monthsLabel(l.months);
  const skills = (SKILLS as { id: string; label: string; lessons?: string[] }[]).filter((s) => s.lessons?.includes(l.slug));
  const more = LESSONS.filter((o) => o.theme === l.theme && o.slug !== l.slug);
  const path = `/learn/lessons/${l.slug}`;
  const ld = jsonLd([
    breadcrumbLd([
      ["Home", "/"],
      ["For Kids", "/learn"],
      ["Lessons", "/learn/lessons"],
      [l.title, path],
    ]),
    {
      "@type": "Article",
      headline: l.title,
      description: l.blurb,
      mainEntityOfPage: `${SITE.url}${path}`,
      articleSection: l.theme,
      publisher: { "@id": `${SITE.url}/#organization` },
      isAccessibleForFree: true,
    },
  ]);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <p className="eyebrow text-moss">
        For Kids ·{" "}
        <Link href="/learn/lessons" className="hover:text-moss-2">
          Lessons
        </Link>{" "}
        · {l.theme}
      </p>
      <LessonFamily>
        <div className="mt-4 grid items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <aside className="card grid gap-6 p-5 sm:p-6 lg:sticky lg:top-24 print:hidden">
            <LessonWho />
            <div className="hidden lg:block">
              <Label>At a glance</Label>
              <dl className="mt-3 grid gap-2.5 text-sm">
                {[
                  ["When", when],
                  ["Outside", `About ${l.minutes} minutes`],
                  ["On screen", "Five minutes, after"],
                  ["Teaches", l.maths],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[84px_1fr] gap-2">
                    <dt className="font-semibold text-ink-2">{k}</dt>
                    <dd className="leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="hidden lg:block">
              <LessonDone slug={l.slug} title={l.title} compact />
            </div>
          </aside>
          <div className="grid gap-6">
            <article className="card relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: theme.colour }} aria-hidden="true" />
              <div className="p-5 pl-6 sm:p-7 sm:pl-9">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: theme.colour }}>
                  Lesson · {l.theme}
                </p>
                <div className="mt-3 flex gap-4 sm:gap-6">
                  <ActivityArt art={l.art} className="h-20 w-20 sm:h-32 sm:w-32" />
                  <div className="min-w-0 flex-1">
                    <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{l.title}</h1>
                    <p className="mt-2 text-[15px] italic leading-snug text-ink sm:text-base">
                      “{l.pitch}”
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                      <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">{when}</span>
                      <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">{l.minutes} min outside</span>
                      <span className="rounded-full bg-azure-soft px-2 py-0.5 font-medium text-azure">+ 5 on screen</span>
                    </div>
                  </div>
                </div>
                <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-ink-2">{l.blurb}</p>
                <div className="mt-5">
                  <LessonAtAGlance
                    first={{ two: l.say.two[0], four: l.say.four[0], six: l.say.six[0] }}
                    labels={Object.fromEntries(rungs.map((r) => [r.id, r.label]))}
                  />
                </div>
                <div className="mt-5 grid gap-2 text-[15px] leading-snug">
                  <p>
                    <span className="font-semibold">You’ll need: </span>
                    <span className="text-ink-2">{l.need.join(" · ")}</span>
                  </p>
                </div>
              </div>
            </article>
            {typeof l.watch === "string" && (
              <div className="card border-l-4 border-l-rust p-5">
                <p className="eyebrow text-rust">Before you go</p>
                <p className="mt-1.5 leading-relaxed">{l.watch}</p>
              </div>
            )}
            <section className="card grid gap-6 p-5 sm:p-7 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">What is going on out there</p>
                <p className="mt-2 leading-relaxed">{l.why}</p>
                {l.reads && (
                  <p className="mt-3 text-sm">
                    <Link href={l.reads.href} className="font-medium text-moss underline hover:no-underline">
                      {l.reads.label} →
                    </Link>
                  </p>
                )}
              </div>
              <div className="rounded-tile bg-paper-2/60 p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-2">What to look for</p>
                <ul className="mt-3 grid gap-2.5">
                  {l.look.map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm leading-snug">
                      <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-gold-fill" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="card relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-moss" aria-hidden="true" />
              <div className="p-5 pl-6 sm:p-7 sm:pl-9">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">1 · First, outside</p>
                <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">What to do</h2>
                <ol className="mt-5 grid gap-4">
                  {l.steps.map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss text-base font-semibold text-white">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
            <section>
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">2 · Out loud</p>
              <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">What to say to each of them</h2>
              <p className="mt-2 max-w-3xl text-ink-2">
                All of them at once, off the same material. Each child is on the card that fits them — read down it, and if it goes wrong, the box at
                the bottom says what that usually means.
              </p>
              <div className="mt-5">
                <LessonSay
                  rungs={rungs.map((r) => ({ id: r.id, age: r.age, label: r.label, building: r.building, say: l.say[r.id], misstep: l.missteps[r.id] }))}
                />
              </div>
              <div className="card mt-5 border-l-4 border-l-moss p-5 sm:p-6">
                <p className="eyebrow text-moss">How you know it landed</p>
                <p className="mt-1.5 leading-relaxed">{l.evidence}</p>
                {skills.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s) => (
                        <span key={s.id} className="rounded-full border border-edge bg-paper-2/50 px-3 py-1 text-xs font-medium">
                          {s.label}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm">
                      <Link href="/learn/progress" className="font-medium text-moss underline hover:no-underline">
                        Tick these off on each child’s ladder →
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </section>
            <section>
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-azure">3 · Then, five minutes on screen</p>
              <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">The same idea, drilled</h2>
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr] xl:items-start">
                <LessonGame kind={l.game} note={l.gameNote} />
                <div className="card p-5">
                  <p className="eyebrow">Why this order</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    The walk first, the game after. Reversed, the walk becomes the price of the game, and a child who has learned that outside is what you
                    do before the screen has learned the wrong thing very efficiently.
                  </p>
                  {l.extend && (
                    <>
                      <p className="eyebrow mt-5">If they want more</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">{l.extend}</p>
                    </>
                  )}
                </div>
              </div>
            </section>
            <LessonExtra slug={l.slug} />
            <LessonDone slug={l.slug} title={l.title} />
            <p className="rounded-tile border-l-4 border-l-gold-fill bg-paper-2/70 p-4 text-sm leading-relaxed text-ink-2">{LOOK_ONLY}</p>
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">More {l.theme.toLowerCase()}</p>
                <Link href="/learn/lessons" className="text-sm font-medium text-moss underline hover:no-underline">
                  All the lessons →
                </Link>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {more.map((o) => (
                  <Tile key={o.slug} art={o.art} title={o.title} note={`${o.minutes} min outside`} href={`/learn/lessons/${o.slug}`} size="sm" />
                ))}
              </div>
              <div className="mt-8">
                <PlaceCTA label="Today's numbers where you are" />
              </div>
            </section>
          </div>
        </div>
      </LessonFamily>
    </div>
  );
}
