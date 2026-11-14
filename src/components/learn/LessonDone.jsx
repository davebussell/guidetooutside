"use client";
// Restored from client module 11120 (exports: LessonDone)
import * as n from "next/link";
import * as s from "@/lib/learn/use-learn";
export const LessonDone = function ({ slug: e, title: r, compact: a = false }) {
  let l = (0, s.useLearn)(),
    o = l.done[e];
  return a ? (
    <div>
      <button
        type="button"
        onClick={() => l.markDone(e)}
        aria-pressed={!!o}
        className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${o ? "border border-moss bg-moss-soft text-moss" : "bg-moss text-white hover:bg-moss-2"}`}
      >
        {o ? "Done ✓" : "We did it!"}
      </button>
      <p className="mt-2 text-center text-xs text-ink-2">
        {o
          ? `Done on ${new Date(o + "T12:00:00").toLocaleDateString("en-CA", {
              month: "long",
              day: "numeric",
            })} \xb7 tap again to undo`
          : "Keeps it off the next season plan"}
      </p>
    </div>
  ) : (
    <div className={`card flex flex-wrap items-center justify-between gap-4 p-5 ${o ? "border-moss/60 bg-moss/5" : ""}`}>
      <div className="min-w-0">
        <p className="eyebrow text-moss">{o ? "Done" : "When you have done it"}</p>
        <p className="mt-1 text-sm leading-snug text-ink-2">
          {o ? (
            <>
              Marked done on{" "}
              {new Date(o + "T12:00:00").toLocaleDateString("en-CA", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              . Write what they counted in{" "}
              <n.default href="/learn/journal" className="text-moss underline hover:no-underline">
                the journal
              </n.default>{" "}
              — that is where the badges come from.
            </>
          ) : (
            <>Ticking it keeps it off the next season plan, and nothing else.</>
          )}
        </p>
      </div>
      <button
        type="button"
        onClick={() => l.markDone(e)}
        aria-pressed={!!o}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${o ? "border border-edge text-ink-2 hover:border-moss hover:text-moss" : "bg-moss text-paper hover:bg-moss-2"}`}
      >
        {o ? "Not done after all" : `We did "${r}"`}
      </button>
    </div>
  );
};
