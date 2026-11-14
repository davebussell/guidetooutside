import type { Metadata } from "next";
import { Suspense } from "react";
import { FinderSkeleton, LearnFinder } from "@/components/learn/LearnFinder";

export const metadata: Metadata = {
  title: "The season plan — eight weeks of nature lessons, ordered by your own year",
  description:
    "A term plan for teaching children outside, built from the season where you live, your town's daylight and moon, and its average first frost where that falls in the plan. Which lesson which week, and why that week.",
  alternates: { canonical: "/learn/plan" },
};

export default function PlanFinderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <Suspense fallback={<FinderSkeleton />}>
        <LearnFinder
          base="/learn/plan"
          eyebrow="For Kids · Teaching at home · The season plan"
          title="What should we learn this season?"
          intro="Some lessons only work for a few weeks: while the oaks are dropping their acorns, before the first frost, while the flowers last. When those weeks fall depends on where you live, and so does how fast the days are changing. Tell us where you are and the plan is built from your own year."
          tiles={[
            { art: "acorn", title: "Acorns in tens", note: "While the oaks are dropping" },
            { art: "snow", title: "Counting to frost", note: "Before your first frost" },
            { art: "moon", title: "A month of moons", note: "Full moon to full moon" },
            { art: "flower", title: "Count the petals", note: "While the flowers last" },
          ]}
        />
      </Suspense>
    </div>
  );
}
