import type { Metadata } from "next";
import Link from "next/link";
import { Naturalists } from "@/components/learn/Naturalists";

export const metadata: Metadata = {
  title: "Your young naturalists — the ladder, and the badges",
  description:
    "Track what each child can actually do — one number word per object, tally marks, counting in tens — and what to teach next. Badges are earned from real counts written in the field journal.",
  alternates: { canonical: "/learn/progress" },
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-moss">For Kids · Teaching at home · Each child’s ladder</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">What’s next for each of them?</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          Teaching three children at once means holding three answers to one question: what is the next single step for this one. The ladder is
          numeracy in the order it actually develops — counting to twenty comes long before knowing that the last number you said is how many there were
          — and naming where a child is turns out to be most of the work.
        </p>
      </div>
      <div className="mt-8">
        <Naturalists />
      </div>
      <div className="card mt-12 p-5 sm:p-6">
        <p className="font-display text-lg font-semibold">Where this is kept</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          {
            "In this browser, on this device, and nowhere else. Names, ages and ticks are never sent to us and there is no account behind this page. That also means one device only — save a backup from"
          }{" "}
          <Link href="/learn/journal" className="text-moss underline hover:no-underline">
            the journal
          </Link>{" "}
          now and then, and keep the file somewhere.
        </p>
      </div>
    </div>
  );
}
