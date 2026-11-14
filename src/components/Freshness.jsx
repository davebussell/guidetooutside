"use client";
// Restored from client module 25760 (exports: exactly, stampProps, timeAgo, AsOf, Freshness)
import * as t from "react/jsx-runtime";
import * as s from "next/navigation";
import * as n from "react";
function a(e, t = Date.now()) {
  let s = t - new Date(e).getTime();
  if (!Number.isFinite(s)) return "at an unknown time";
  let n = Math.round(s / 6e4);
  if (n < 1) return "just now";
  if (n < 60) return `${n} minute${1 === n ? "" : "s"} ago`;
  let i = Math.round(n / 60);
  if (i < 24) return `${i} hour${1 === i ? "" : "s"} ago`;
  let r = Math.round(i / 24);
  if (r < 14) return `${r} day${1 === r ? "" : "s"} ago`;
  let o = Math.round(r / 7);
  if (o < 9) return `${o} weeks ago`;
  let l = Math.round(r / 30);
  return l < 18 ? `${l} month${1 === l ? "" : "s"} ago` : `${Math.round(r / 365)} years ago`;
}
function i(e, t) {
  try {
    return new Date(e).toLocaleString("en-CA", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: t,
    });
  } catch {
    return e;
  }
}
let r = {
    fresh: null,
    due: "Due for a refresh.",
    stale: "Out of date.",
    "out-of-season": null,
  },
  o = {
    ai: "written from live local data",
    rules: "from the built-in rules, not written for this place",
    live: "read from live sources",
  };
function CL_({ iso: e, timeZone: s }) {
  let [i, r] = (0, n.useState)(null);
  if (
    ((0, n.useEffect)(() => {
      r(Date.now());
    }, []),
    null == i)
  ) {
    let n = new Date(e);
    return (
      <>
        {"at "}
        {Number.isFinite(n.getTime())
          ? n.toLocaleTimeString("en-CA", {
              hour: "numeric",
              minute: "2-digit",
              ...(s
                ? {
                    timeZone: s,
                  }
                : {}),
            })
          : "an unknown time"}
      </>
    );
  }
  return <>{a(e, i)}</>;
}
export { i as exactly };
export const stampProps = function (e, t, s = Date.now()) {
  let n = (function (e, t, s = Date.now()) {
    let n = (s - new Date(e.savedAt).getTime()) / 1e3;
    return e.season && t && e.season !== t ? "out-of-season" : n <= e.freshFor ? "fresh" : n <= 4 * e.freshFor ? "due" : "stale";
  })(e, t, s);
  return {
    savedAt: e.savedAt,
    sourceLabel: o[e.source] ?? undefined,
    state: n,
    note: (e.season && t && e.season !== t ? `Written in ${e.season.toLowerCase()}; the season is now ${t.toLowerCase()}.` : null) ?? r[n],
  };
};
export { a as timeAgo };
export const AsOf = function ({ savedAt: e, what: s, timeZone: n }) {
  return (
    <p className="mt-3 text-xs text-ink-2" title={i(e, n)}>
      {s}
      {" read "}
      <CL_ iso={e} timeZone={n} />.
    </p>
  );
};
export const Freshness = function ({
  kind: e,
  slug: a,
  savedAt: r,
  sourceLabel: o,
  state: d,
  note: c,
  cooldownSeconds: u = 0,
  label: h,
  timeZone: m,
}) {
  let p = (0, s.useRouter)(),
    [x, f] = (0, n.useState)(false),
    [g, b] = (0, n.useState)(null),
    [y, v] = (0, n.useState)(u),
    j = "out-of-season" === d || "stale" === d;
  async function w() {
    (f(true), b(null));
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
      if (429 === t.status) {
        (v(s.retryAfterSeconds ?? 3600), b(s.message ?? "Recently refreshed. Try again later."));
        return;
      }
      if (!t.ok) return void b(s.message ?? "Refresh failed. The previous version is shown.");
      (v(s.retryAfterSeconds ?? 3600), p.refresh(), b("Updated."));
    } catch {
      b("Connection failed. The previous version is shown.");
    } finally {
      f(false);
    }
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-2">
      <span className="inline-flex items-center gap-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="opacity-70"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <span title={i(r, m)}>
          {"Updated "}
          <CL_ iso={r} timeZone={m} />
          {o ? (
            <span className="text-ink-2">
              {" · "}
              {o}
            </span>
          ) : null}
        </span>
      </span>
      {c && <span className={j ? "font-medium text-gold" : "text-ink-2"}>{c}</span>}
      {x ? (
        <span className="inline-flex items-center gap-1.5" aria-live="polite">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-line border-t-moss" aria-hidden="true" />
          Updating (about 15 seconds).
        </span>
      ) : y > 0 ? (
        <span className="text-ink-2" aria-live="polite">
          {g ?? `Refreshed recently; available again in ${Math.ceil(y / 60)} minutes.`}
        </span>
      ) : (
        <>
          <button
            type="button"
            onClick={w}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium transition ${j ? "border-gold-fill/60 text-ink hover:border-gold-fill hover:bg-gold-fill/10" : "border-edge text-ink-2 hover:border-moss hover:text-ink"}`}
            aria-label={`Refresh ${h}`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 11a8 8 0 1 0-1.6 5.6" />
              <path d="M20 5v6h-6" />
            </svg>
            Refresh
          </button>
          {g && (
            <span className="text-ink-2" aria-live="polite">
              {g}
            </span>
          )}
        </>
      )}
    </div>
  );
};
