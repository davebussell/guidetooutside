import type { Metadata } from "next";
import { Suspense } from "react";
import { TodayPlanner } from "@/components/learn/TodayPlanner";
import { LESSONS, THEMES } from "@/lib/learn/lessons";
import { LOOK_ONLY, RUNGS } from "@/lib/learn/rungs";
import Link from "next/link";
import { PlaceCTA } from "@/components/PlaceCTA";
import { Tile } from "@/components/learn/family";
import { CountForReal } from "@/components/conservation/CountForReal";
import { FoodPanel } from "@/components/conservation/FoodPanel";

export const metadata: Metadata = {
  title: "For Kids — plan today outside, and teach with numbers that are true",
  description:
    "A day planner for parents at home with little ones: pick who is coming, how long you have and how wild everyone feels, and get a plan of nature activities for today's real weather — with what a one-, three- and five-year-old each do. Plus lessons built on live local data.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl print:hidden">
        <p className="eyebrow text-moss">For Kids · Teaching at home</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">What shall we do today?</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-2">
          Tap who’s coming and slide how wild everyone feels — the plan changes as you go, with what each child does in every activity.
        </p>
      </div>
      <div className="mt-8">
        <Suspense
          fallback={
            <div aria-busy="true" className="animate-pulse">
              <div className="h-4 w-72 max-w-full rounded bg-line/70" />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="card h-[82px]" />
                <div className="card h-[82px]" />
                <div className="card h-[82px]" />
                <div className="card h-[82px]" />
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,370px)_minmax(0,1fr)]">
                <div className="card h-[420px]" />
                <div className="grid gap-5">
                  <div className="card h-[300px]" />
                  <div className="card h-[300px]" />
                </div>
              </div>
            </div>
          }
        >
          <TodayPlanner />
        </Suspense>
      </div>
      <div className="print:hidden">
        <section className="mt-20 max-w-3xl">
          <p className="eyebrow text-moss">Going further</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">Teach it outside, where the numbers are real</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            A nature lesson does not need invented material. The sun was up for a particular number of hours today. The first frost is a particular
            number of days away. A particular number of living things have been photographed within forty kilometres of you this month. Every one of
            those is a counting problem, and every one of them is true — which is what makes it worth a child’s attention.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Everything here is written three times over, for a two-year-old, a four-year-old and a six-year-old, because those are not three
            difficulties of the same task. They are three different tasks that share a field, an hour and a bucket of acorns.
          </p>
          <div className="mt-8">
            <PlaceCTA />
          </div>
        </section>
        <div className="mt-14">
          <Suspense fallback={null}>
            <CountForReal />
          </Suspense>
        </div>
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Three rungs</h2>
          <p className="mt-2 max-w-3xl text-ink-2">
            Ages are a rough guide and children are not their ages. Pick by what they can do, not by their birthday.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {(RUNGS as { id: string; age: number; label: string; skill: string; building: string }[]).map((r) => (
              <div key={r.id} className="card p-6">
                <p className="font-display text-4xl font-semibold leading-none text-moss">{r.age}</p>
                <p className="font-display mt-3 text-xl font-semibold leading-tight">{r.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.skill}</p>
                <p className="mt-4 border-t border-line/70 pt-3 text-xs leading-relaxed text-ink-2">{r.building}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Everything else, for teaching at home</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Tile
              art="sun"
              title="Today's nature count"
              note="Daylight, frost and the moon where you live, as counting for each child"
              href="/learn/count"
            />
            <Tile art="book" title="The season plan" note="Eight weeks, ordered by your own town's frost, daylight and moon" href="/learn/plan" />
            <Tile
              art="acorn"
              title="Lessons by theme"
              note={`${LESSONS.length} lessons — an hour outside, and the words to say to each child`}
              href="/learn/lessons"
            />
            <Tile art="flower" title="Patterns and shapes" note="Petal counts, leaf symmetry and pine-cone spirals" href="/learn/patterns" />
            <Tile art="crayon" title="The field journal" note="What they counted, when and where — kept on this device" href="/learn/journal" />
            <Tile art="sprout" title="Each child's ladder" note="What each of them can do, the next step, and the badges" href="/learn/progress" />
          </div>
        </section>
        <section className="mt-16">
          <div className="card border-l-4 border-l-gold-fill p-6 sm:p-8">
            <p className="eyebrow text-gold">The rule, every time</p>
            <p className="font-display mt-2 text-xl leading-snug sm:text-2xl">{LOOK_ONLY}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
              The foraging half of this site is written for adults who have decided to learn identification properly. The teaching half is not, and
              never will be: no page here tells a child that anything growing wild is safe to eat, and no photograph — including the ones on this site
              — is ever enough to identify a plant or a mushroom. Counting is the better lesson at these ages anyway. A child who has counted four
              hundred mushrooms and eaten none of them knows more about mushrooms than one who has eaten one.
            </p>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">What there is to teach</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {THEMES.map((t) => (
              <div key={t.theme}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: t.colour }}>
                  {t.theme}
                </p>
                <p className="mt-1 text-sm text-ink-2">{t.note}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {LESSONS.filter((l) => l.theme === t.theme).map((l) => (
                    <Tile key={l.slug} art={l.art} title={l.title} note={`${l.minutes} min outside`} href={`/learn/lessons/${l.slug}`} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* School gardens and the community gardens and farms that welcome families (the reader's own town once the browser knows it). */}
        <FoodPanel place={null} section="learn" nearby compact className="mt-16" />
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">The world it is all about</h2>
          <p className="mt-2 max-w-3xl text-ink-2">
            The rest of the site, which is where the lessons get their facts. Written for adults, but a six-year-old will happily sit through the rock
            diagrams.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/ground/rocks" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <path d="M4 17.6l4.2-9.4 5.6-3 6.2 6.6-2.8 5.8z" />
                <path d="M8.2 8.2l5.4 3.6M13.8 5.2l-.2 6.6M17.2 17.6l-3.6-5.8" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">Kinds of rock</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">How each one forms and what grows above it</span>
              </span>
            </Link>
            <Link href="/regions" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <path d="M2.5 17.5c2.4-4.6 4.2-6.9 5.4-6.9 1.2 0 2.5 1.8 3.8 5.4" />
                <path d="M9.6 17.5c2.6-5.6 4.6-8.4 6-8.4 1.4 0 3.3 2.8 5.9 8.4" />
                <path d="M2.5 20.2h19" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">Ecological regions</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">Sixteen landscapes across the continent</span>
              </span>
            </Link>
            <Link href="/zones" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <path d="M14 14.8V5.2a2 2 0 1 0-4 0v9.6a4 4 0 1 0 4 0z" />
                <path d="M12 8.5v6.8" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">Hardiness zones</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">The coldest night of an average year</span>
              </span>
            </Link>
            <Link href="/zones/map" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <path d="M9 4.5L3.5 6.6v12.9L9 17.4l6 2.1 5.5-2.1V4.5L15 6.6z" />
                <path d="M9 4.5v12.9M15 6.6v12.9" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">The zone map</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">Every band, drawn</span>
              </span>
            </Link>
            <Link href="/wildlife" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <ellipse cx="12" cy="13.4" rx="4.4" ry="6" />
                <path d="M12 7.4v12" />
                <circle cx="12" cy="5.6" r="2" />
                <path d="M7.6 10L4 8.2M7.6 13.4H3.6M7.6 16.8L4 18.8M16.4 10L20 8.2M16.4 13.4H20.4M16.4 16.8L20 18.8" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">Wildlife</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">Fish, insects and soil life</span>
              </span>
            </Link>
            <Link href="/the-day" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">The day</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">Eight phases of light</span>
              </span>
            </Link>
            <Link href="/almanac" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <circle cx="12" cy="12" r="8.4" />
                <path d="M12 3.6 A8.4 8.4 0 0 1 12 20.4 A3.6 8.4 0 0 0 12 3.6 Z" fill="currentColor" stroke="none" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">Almanac</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">Moon, sun, season and water</span>
              </span>
            </Link>
            <Link href="/how-it-works" className="card group flex gap-3 p-4 transition hover:border-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                className="shrink-0 mt-0.5 h-5 w-5 shrink-0 text-ink-2/80 transition group-hover:text-moss"
              >
                <circle cx="12" cy="12" r="8.6" />
                <path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8z" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug group-hover:text-moss">How it works</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-2">Where every number comes from</span>
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
