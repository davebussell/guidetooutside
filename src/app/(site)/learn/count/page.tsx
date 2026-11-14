import type { Metadata } from "next";
import { Suspense } from "react";
import { FinderSkeleton, LearnFinder } from "@/components/learn/LearnFinder";
import { RUNGS } from "@/lib/learn/rungs";
import { CountForReal } from "@/components/conservation/CountForReal";

export const metadata: Metadata = {
  title: "Today's nature count — real numbers to count with a two-, four- and six-year-old",
  description:
    "Hours of daylight, days to the first frost, nights to a full moon and how many kinds of living thing are near you this month — today's real readings for your own town, written as counting at three ages.",
  alternates: { canonical: "/learn/count" },
};

type Rung = { id: string; age: number; label: string; skill: string; building: string };

export default function CountFinderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <Suspense fallback={<FinderSkeleton />}>
        <LearnFinder
          base="/learn/count"
          eyebrow="For Kids · Teaching at home · Today’s nature count"
          title="What shall we count today?"
          intro="The sun was up for a certain number of hours today. The first frost is a certain number of days away. The moon is a certain number of nights from full. Those are real numbers about the ground outside your door, and every one of them is a counting problem. Tell us where you are and we will work out today’s."
          tiles={[
            { art: "sun", title: "Hours of daylight", note: "Held up on ten fingers" },
            { art: "snow", title: "Days to the first frost", note: "Stones into a jar" },
            { art: "moon", title: "Nights to a full moon", note: "Drawn every evening" },
            { art: "bug", title: "Kinds living near you", note: "Found this month" },
          ]}
        />
      </Suspense>
      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {(RUNGS as Rung[]).map((r) => (
          <div key={r.id} className="card p-5">
            <p className="eyebrow text-moss">About {r.age}</p>
            <p className="font-display mt-1 text-xl font-semibold">{r.label}</p>
            <p className="mt-1.5 text-sm text-ink-2">{r.skill}</p>
            <p className="mt-3 border-t border-line/70 pt-3 text-xs leading-relaxed text-ink-2">{r.building}</p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <Suspense fallback={null}>
          <CountForReal />
        </Suspense>
      </div>
    </div>
  );
}
