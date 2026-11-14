"use client";
// Restored from client module 26861 (exports: AddToPlan)
import * as t from "react/jsx-runtime";
import * as a from "react";
import * as r from "next/link";
import * as n from "@/lib/plan-today";
export const AddToPlan = function ({ id: e, title: i, className: o = "" }) {
  let [l, s] = (0, a.useState)("unknown");
  return ((0, a.useEffect)(() => {
    let t = () => {
      let t = (0, n.readToday)();
      s((a) => (t.extra.includes(e) || t.picks.includes(e) ? ("added" === a ? "added" : "in") : "out"));
    };
    return (
      t(),
      window.addEventListener(n.TODAY_EVENT, t),
      window.addEventListener("storage", t),
      () => {
        (window.removeEventListener(n.TODAY_EVENT, t), window.removeEventListener("storage", t));
      }
    );
  }, [e]),
  "unknown" === l) ? (
    <span className={`inline-block h-9 w-32 rounded-full bg-paper-2/60 ${o}`} aria-hidden="true" />
  ) : "out" === l ? (
    <button
      type="button"
      onClick={() => {
        ((0, n.addToToday)(e), s("added"));
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-edge bg-surface px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss ${o}`}
      aria-label={`Add ${i} to today's plan`}
    >
      + Add to today
    </button>
  ) : (
    <span className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 ${o}`}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-moss/40 bg-moss-soft px-3 py-1.5 text-sm font-semibold text-moss">
        {"added" === l ? "Added ✓" : "In today's plan ✓"}
      </span>
      <r.default href="/learn#today" className="text-sm font-medium text-moss hover:underline">
        Open the plan →
      </r.default>
      {"added" === l && (
        <button
          type="button"
          onClick={() => {
            ((0, n.removeFromToday)(e), s("out"));
          }}
          className="text-xs text-ink-2 underline decoration-line hover:text-ink"
        >
          Undo
        </button>
      )}
    </span>
  );
};
