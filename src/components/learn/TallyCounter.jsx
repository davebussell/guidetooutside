"use client";
// Restored from client module 33040 (exports: TallyCounter)
import * as t from "react/jsx-runtime";
import * as n from "react";
function CS_({ n: e }) {
  let n = Math.floor(e / 5),
    a = e % 5;
  return 0 === e ? (
    <p className="text-sm text-ink-2">No marks yet. Tap the big square for the first one.</p>
  ) : (
    <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
      {Array.from(
        {
          length: n,
        },
        (e, n) => (
          <svg
            key={n}
            viewBox="0 0 34 30"
            className="h-10 w-12 shrink-0 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 4V26M12 4V26M19 4V26M26 4V26" />
            <path d="M2 24L29 6" />
          </svg>
        ),
      )}
      {a > 0 && (
        <svg
          viewBox="0 0 34 30"
          className="h-10 w-12 shrink-0 text-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {Array.from(
            {
              length: a,
            },
            (e, n) => (
              <path key={n} d={`M${5 + 7 * n} 4V26`} />
            ),
          )}
        </svg>
      )}
    </div>
  );
}
export const TallyCounter = function ({ onKeep: e, label: a = "Counting", compact: o = false }) {
  let [r, l] = (0, n.useState)(0),
    [i, d] = (0, n.useState)(null);
  return (
    <div className={`card ${o ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow text-moss">{a}</p>
        <p className="font-display text-3xl font-semibold leading-none text-moss" aria-live="polite">
          {r}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          (l((e) => e + 1), d(null));
        }}
        className="mt-3 flex min-h-32 w-full items-center justify-center rounded-tile border-2 border-dashed border-moss/40 bg-moss/5 px-4 py-6 text-center transition active:bg-moss-soft"
      >
        <span className="font-display text-xl font-semibold text-moss-2">{0 === r ? "Tap here for one" : "Tap for another one"}</span>
      </button>
      <div className="mt-4 min-h-12">
        <CS_ n={r} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line/70 pt-3">
        <button
          type="button"
          onClick={() => l((e) => Math.max(0, e - 1))}
          className="rounded-full border border-edge px-3.5 py-1.5 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
        >
          One too many
        </button>
        <button
          type="button"
          onClick={() => {
            (l(0), d(null));
          }}
          className="rounded-full border border-edge px-3.5 py-1.5 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
        >
          Start again
        </button>
        {e && (
          <button
            type="button"
            disabled={0 === r}
            onClick={() => {
              (e(r), d(r), l(0));
            }}
            className="ml-auto rounded-full bg-moss px-4 py-1.5 text-sm font-medium text-paper transition hover:bg-moss-2 disabled:opacity-40"
          >
            {"Put "}
            {r > 0 ? r : "it"}
            {" in the journal"}
          </button>
        )}
      </div>
      {null != i && (
        <p className="mt-2 text-sm text-moss-2" aria-live="polite">
          {i}
          {" went into the journal. The counter is back to nought for the next thing."}
        </p>
      )}
    </div>
  );
};
