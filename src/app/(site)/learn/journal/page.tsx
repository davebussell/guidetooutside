import type { Metadata } from "next";
import { FieldJournal } from "@/components/learn/FieldJournal";
import { Tile } from "@/components/learn/family";

export const metadata: Metadata = {
  title: "The field journal — what they counted, and when",
  description:
    "A counting journal for young naturalists, kept in your own browser and never sent anywhere. Write down what was counted, where, and by whom, and watch a year of walks turn into a record of your own patch.",
  alternates: { canonical: "/learn/journal" },
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-moss">For Kids · Teaching at home · The field journal</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">What did we count today?</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          One line per count. Twelve mushrooms on the big log; four crows from the kitchen window. On its own each line is nothing. Forty of them is the
          first time a child sees that writing things down turns into knowing something — that this September had more mushrooms than last, and they
          know it because they wrote it down.
        </p>
      </div>
      <div className="mt-8">
        <FieldJournal />
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="card p-5 sm:p-6">
          <p className="font-display text-lg font-semibold">Where this is kept</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            {
              "In this browser, on this device, and nowhere else. It is never sent to us and we could not read it if we wanted to — there is no account behind this page and no request leaves it. That also means clearing your browser data erases it, so press "
            }
            <span className="font-medium text-ink">Save a backup</span>
            {" now and then and keep the file somewhere."}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Tile art="sun" title="Today's nature count" note="Real numbers from outside your door, for each child" href="/learn/count" />
          <Tile art="acorn" title="Lessons by theme" note="An hour outside, and the words to say" href="/learn/lessons" />
        </div>
      </div>
    </div>
  );
}
