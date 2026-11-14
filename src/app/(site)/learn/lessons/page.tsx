import type { Metadata } from "next";
import Link from "next/link";
import { LessonsBrowser } from "@/components/learn/LessonsBrowser";
import { PlaceCTA } from "@/components/PlaceCTA";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { LESSONS, THEMES } from "@/lib/learn/lessons";
import { RUNGS } from "@/lib/learn/rungs";

export const metadata: Metadata = {
  title: "Nature lessons for two-, four- and six-year-olds",
  description:
    "An hour outside and five minutes on screen. Counting acorns in tens, tallying birds, skip-counting spider legs, folding leaves in half — each lesson written three times over, once for each age, with the words to say.",
  alternates: { canonical: "/learn/lessons" },
};

export default function LessonsPage() {
  const lessons = LESSONS.map((l) => ({
    slug: l.slug,
    title: l.title,
    theme: l.theme,
    blurb: l.blurb,
    art: l.art,
    pitch: l.pitch,
    minutes: l.minutes,
    months: l.months,
    first: { two: l.say.two[0], four: l.say.four[0], six: l.say.six[0] },
  }));
  const rungs = (RUNGS as { id: string; label: string; age: number }[]).map((r) => ({ id: r.id, label: r.label, age: r.age }));
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-moss">For Kids · Teaching at home · Lessons by theme</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">What shall we learn outside?</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          {lessons.length}
          {
            " lessons, each an hour outside and then five minutes on a screen. Every one is written three times — for a two-, a four- and a six-year-old, with the actual words to say — so tap a child and each card shows what they will be doing."
          }
        </p>
        <p className="mt-3 text-sm text-ink-2">Look and count. Nothing goes in a mouth.</p>
      </div>
      <div className="mt-8">
        <LessonsBrowser lessons={lessons} themes={THEMES} rungs={rungs} />
      </div>
      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <div className="card flex flex-col justify-between gap-4 p-5 sm:col-span-2">
          <div>
            <p className="font-display text-xl font-semibold">Not sure where to start?</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              Today’s numbers where you live — daylight, frost, the moon, what is growing — written out as counting for each age. It is the quickest way
              into any of these.
            </p>
          </div>
          <div>
            <PlaceCTA label="Start with today's numbers" />
          </div>
        </div>
        <Link href="/learn#today" className="card group flex flex-col justify-between gap-3 p-5 transition hover:border-moss">
          <p className="font-display text-xl font-semibold group-hover:text-moss">Plan today instead</p>
          <p className="text-sm leading-relaxed text-ink-2">Who’s coming, how long, and how wild everyone feels — a whole day, not one lesson.</p>
          <span className="text-sm font-semibold text-moss">Plan today →</span>
        </Link>
      </section>
      {/* School gardens and the community gardens and farms that welcome families. */}
      <FoodPanel place={null} section="learn" nearby compact className="mt-14" />
    </div>
  );
}
