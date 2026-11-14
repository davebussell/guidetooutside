"use client";
// Restored from client module 39255 (exports: RefreshPrompt)
import * as t from "react/jsx-runtime";
import * as s from "next/navigation";
import * as n from "react";
export const RefreshPrompt = function ({ kind: e, slug: a, title: i, body: r, action: o }) {
  let l = (0, s.useRouter)(),
    [d, c] = (0, n.useState)(false),
    [u, h] = (0, n.useState)(null),
    [m, p] = (0, n.useState)(false);
  async function x() {
    (c(true), h(null));
    try {
      let t = await fetch("/api/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kind: e,
            slug: a,
          }),
        }),
        s = await t.json().catch(() => ({}));
      if (!t.ok) return void h(s.message ?? "Request failed. Try again in a minute.");
      (p(true), l.refresh());
    } catch {
      h("Connection failed.");
    } finally {
      c(false);
    }
  }
  return (
    <section className="card border-dashed p-6 sm:p-7">
      <p className="eyebrow text-moss">{i}</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{r}</p>
      <button
        type="button"
        onClick={x}
        disabled={d || m}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-moss-2 disabled:opacity-60"
      >
        {d && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/40 border-t-paper" aria-hidden="true" />}
        {d ? "Looking…" : m ? "Found them" : o}
      </button>
      {d && <p className="mt-2 text-xs text-ink-2">This can take up to a minute, and is needed only once per place.</p>}
      {u && <p className="mt-2 text-sm text-rust">{u}</p>}
    </section>
  );
};
