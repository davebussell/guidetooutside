"use client";
// Restored from client module 91511 (exports: NatureGame)
import * as t from "react/jsx-runtime";
import * as s from "next/link";
import * as n from "react";
import * as l from "@/lib/learn/rungs";
import * as d from "@/lib/hooks";
let a = ["leaf", "acorn", "pinecone", "berry", "cap", "feather", "stone", "shell"],
  r = {
    leaf: "leaf",
    acorn: "acorn",
    pinecone: "pine cone",
    berry: "berry",
    cap: "mushroom",
    feather: "feather",
    stone: "stone",
    shell: "shell",
  },
  o = {
    leaf: (
      <>
        <path d="M12 2.5C17.5 6 20 10 20 13.5c0 4-3.6 6.5-8 8-4.4-1.5-8-4-8-8C4 10 6.5 6 12 2.5Z" />
        <path d="M12 21.5V5" />
        <path d="M12 9.5L8 7M12 9.5l4-2.5M12 14L7.6 11.4M12 14l4.4-2.6M12 18l-3.4-2.2M12 18l3.4-2.2" />
      </>
    ),
    acorn: (
      <>
        <path d="M6 9.5C6 9.5 7.5 20 12 20C16.5 20 18 9.5 18 9.5Z" />
        <path d="M5 9.5H19" />
        <path d="M6.5 6.5C6.5 5 9 4 12 4C15 4 17.5 5 17.5 6.5C17.5 8 15 9.5 12 9.5C9 9.5 6.5 8 6.5 6.5Z" />
        <path d="M12 4V2" />
      </>
    ),
    pinecone: (
      <>
        <path d="M12 3C15 3 17 6 17 11C17 16.5 14.5 21 12 21C9.5 21 7 16.5 7 11C7 6 9 3 12 3Z" />
        <path d="M7.5 9H16.5M8 13H16M9 17H15" />
      </>
    ),
    berry: (
      <>
        <circle cx="9" cy="14" r="4.5" />
        <circle cx="15.5" cy="16" r="3.5" />
        <path d="M9 9.5V5M9 5L5.5 3M9 5L12.5 3" />
      </>
    ),
    cap: (
      <>
        <path d="M3.5 12C3.5 7.6 7.3 4 12 4C16.7 4 20.5 7.6 20.5 12Z" />
        <path d="M9.5 12V16.5C9.5 18.5 10.5 20 12 20C13.5 20 14.5 18.5 14.5 16.5V12" />
      </>
    ),
    feather: (
      <>
        <path d="M18.5 3.5C18.5 3.5 8.5 5.5 7 12.5C6.2 16.3 8.6 18.6 8.6 18.6C8.6 18.6 15.8 16.6 17.4 10.2C18.4 6.2 18.5 3.5 18.5 3.5Z" />
        <path d="M17.6 4.4L4.5 20.5" />
        <path d="M9.6 14.8l5.2-1.6M8.7 11.7l6.6-2M9.9 8.9l6.3-2.1" />
      </>
    ),
    stone: (
      <>
        <path d="M4 14.5C4 10.5 8 7 12.5 7C17 7 20.5 9.5 20 13.5C19.5 17.5 16 19 12 19C8 19 4 18.5 4 14.5Z" />
        <path d="M8 11.5C9 10.5 11 10 12.5 10.5" />
      </>
    ),
    shell: (
      <>
        <path d="M12 12 A1.2 1.2 0 0 1 14.4 12 A2.4 2.4 0 0 1 9.6 12 A3.6 3.6 0 0 1 16.8 12 A4.8 4.8 0 0 1 7.2 12" />
      </>
    ),
  };
function CI_({ name: e, className: s = "h-10 w-10" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={s}
      role="img"
      aria-label={r[e]}
    >
      {o[e]}
    </svg>
  );
}
let c = (e, t) => e[Math.floor(t() * e.length)],
  h = {
    leaf: "feather",
    feather: "leaf",
  },
  m = (...e) => {
    let t = new Set(e);
    for (let s of e) {
      let e = h[s];
      e && t.add(e);
    }
    return a.filter((e) => !t.has(e));
  },
  u = (e, t, s) => e + Math.floor(s() * (t - e + 1));
function x(e, t, s, n, a) {
  let r = new Set([e]),
    o = 1;
  for (; r.size < t && o < 12;) {
    for (let a of [-o * n, o * n]) {
      let n = e + a;
      n > 0 && n <= s && r.size < t && r.add(n);
    }
    o++;
  }
  return p([...r], a);
}
function p(e, t) {
  let s = [...e];
  for (let e = s.length - 1; e > 0; e--) {
    let n = Math.floor(t() * (e + 1));
    [s[e], s[n]] = [s[n], s[e]];
  }
  return s;
}
function f(e, t) {
  return {
    options: e,
    answer: e.indexOf(t),
  };
}
let g = [
  {
    name: "spider",
    plural: "spiders",
    legs: 8,
  },
  {
    name: "beetle",
    plural: "beetles",
    legs: 6,
  },
  {
    name: "ant",
    plural: "ants",
    legs: 6,
  },
  {
    name: "bird",
    plural: "birds",
    legs: 2,
  },
  {
    name: "deer",
    plural: "deer",
    legs: 4,
  },
  {
    name: "frog",
    plural: "frogs",
    legs: 4,
  },
];
function CY_({ n: e, glyph: s, rows: n, size: a = "h-9 w-9 sm:h-11 sm:w-11" }) {
  if (n) {
    let r = [];
    for (let t = 0; t < e; t += n) r.push(Math.min(n, e - t));
    return (
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        {r.map((e, n) => (
          <div key={n} className="flex gap-1.5 rounded-lg bg-paper-2/60 px-2 py-1.5">
            {Array.from(
              {
                length: e,
              },
              (e, n) => (
                <span key={n} className="text-moss">
                  <CI_ name={s} className={a} />
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {Array.from(
        {
          length: e,
        },
        (e, n) => (
          <span key={n} className="text-moss">
            <CI_ name={s} className={a} />
          </span>
        ),
      )}
    </div>
  );
}
function CB_({ n: e }) {
  let s = Math.floor(e / 5),
    n = e % 5;
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-3">
      {Array.from(
        {
          length: s,
        },
        (e, s) => (
          <svg
            key={s}
            viewBox="0 0 34 30"
            className="h-12 w-14 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M5 4V26M12 4V26M19 4V26M26 4V26" />
            <path d="M2 24L29 6" />
          </svg>
        ),
      )}
      {n > 0 && (
        <svg viewBox="0 0 34 30" className="h-12 w-14 text-ink" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          {Array.from(
            {
              length: n,
            },
            (e, s) => (
              <path key={s} d={`M${5 + 7 * s} 4V26`} />
            ),
          )}
        </svg>
      )}
    </div>
  );
}
function CJ_({ cells: e, mirrored: s = false }) {
  return (
    <div className={`grid grid-cols-3 gap-1 ${s ? "-scale-x-100" : ""}`}>
      {[0, 1, 2].flatMap((s) =>
        [0, 1, 2].map((n) => {
          let a = e[3 * s + n];
          return <span key={`${s}-${n}`} className={`h-6 w-6 rounded-[5px] sm:h-7 sm:w-7 ${a ? "bg-moss" : "bg-line/50"}`} />;
        }),
      )}
    </div>
  );
}
let w = ["That's it.", "Right.", "Got it.", "Yes — that's the one.", "Good counting."];
export const NatureGame = function ({ kind: e, rung: o, title: h, className: k = "" }) {
  let N,
    v = (0, d.useMounted)(),
    [M, $] = (0, n.useState)(0),
    [C, S] = (0, n.useState)(null),
    [A, L] = (0, n.useState)(0),
    T = (0, n.useCallback)(() => {
      ($((e) => e + 1), S(null));
    }, []),
    W = v
      ? (function (e, t, s) {
          let n = (0, l.rung)(t),
            o = c(a, s);
          switch (
            ("two" === t && ("tally" === e || "legs" === e) && (e = "count"), "two" === t && "symmetry" === e && (e = "pattern"), e)
          ) {
            case "count": {
              let e = "two" === t ? u(1, 3, s) : "four" === t ? u(2, 10, s) : u(6, 20, s);
              return {
                mode: "number",
                prompt: `How many ${r[o]}${1 === e ? "" : "s"}?`,
                glyph: o,
                count: e,
                rows: "six" === t ? 5 : undefined,
                ...f(x(e, "two" === t ? 3 : 4, n.ceiling, 1, s), e),
              };
            }
            case "more": {
              let e = c(m(o), s);
              if ("two" === t) {
                let t = u(1, 2, s),
                  n = t + u(2, 3, s),
                  a = p(
                    [
                      {
                        n: n,
                        glyph: o,
                      },
                      {
                        n: t,
                        glyph: e,
                      },
                    ],
                    s,
                  );
                return {
                  mode: "group",
                  prompt: "Tap the side with more.",
                  groups: a,
                  answer: a.findIndex((e) => e.n === n),
                };
              }
              let n = "four" === t ? u(4, 10, s) : u(9, 14, s),
                a = p(
                  [
                    {
                      n: n,
                      glyph: o,
                    },
                    {
                      n: n - ("four" === t ? u(2, 4, s) : u(1, 2, s)),
                      glyph: e,
                    },
                  ],
                  s,
                );
              return {
                mode: "group",
                prompt:
                  "four" === t ? "Which side has more? Count both." : "Which side has more? Say how many more, out loud, before you tap.",
                groups: a,
                answer: a.findIndex((e) => e.n === n),
              };
            }
            case "tally": {
              let e = "four" === t ? u(3, 12, s) : u(7, 38, s);
              return {
                mode: "tally",
                prompt: "How many marks?",
                count: e,
                ...f(x(e, 4, n.ceiling, 1, s), e),
              };
            }
            case "legs": {
              let e = c(
                  g.filter((e) => ("four" === t ? e.legs <= 4 : e.legs >= 6)),
                  s,
                ),
                n = "four" === t ? u(2, 5, s) : u(3, 8, s),
                a = e.legs * n;
              return {
                mode: "tally",
                prompt: `${n} ${e.plural}. Each one has ${e.legs} legs. How many legs altogether?`,
                count: 0,
                ...f(x(a, 4, 100, e.legs, s), a),
              };
            }
            case "pattern": {
              let e = c(m(o), s),
                n = c(m(o, e), s),
                a =
                  "two" === t
                    ? [o, e]
                    : "four" === t
                      ? c(
                          [
                            [o, e, e],
                            [o, o, e],
                          ],
                          s,
                        )
                      : c(
                          [
                            [o, e, n],
                            [o, o, e, e],
                            [o, e, e, n],
                          ],
                          s,
                        ),
                r = "two" === t ? 4 : "four" === t ? 6 : 7,
                i = Array.from(
                  {
                    length: r + 1,
                  },
                  (e, t) => a[t % a.length],
                ),
                l = i[r],
                d = i.slice(0, r),
                h = m(l).filter((e) => a.includes(e) || 0.3 > s()),
                u = p([l, ...h.slice(0, "two" === t ? 1 : 2)], s);
              return {
                mode: "sequence",
                prompt: "What comes next?",
                shown: d,
                options: u,
                answer: u.indexOf(l),
              };
            }
            case "symmetry": {
              let e = Array.from(
                {
                  length: 9,
                },
                () => 0.45 > s(),
              );
              e.some(Boolean) || (e[u(0, 8, s)] = true);
              let t = (t) => {
                  let n = e.slice(),
                    a = new Set();
                  for (; a.size < t;) {
                    let e = u(0, 8, s);
                    a.has(e) || (a.add(e), (n[e] = !n[e]));
                  }
                  return n;
                },
                n = p([e.slice(), t(1), t(2)], s);
              return {
                mode: "mirror",
                prompt: "One wing is done. Which is the matching one?",
                half: e,
                options: n,
                answer: n.findIndex((t) => t.every((t, s) => t === e[s])),
              };
            }
          }
        })(
          e,
          o,
          ((N =
            (function (e, t, s) {
              let n = 0x811c9dc5;
              for (let a of `${e}:${t}:${s}`) n = Math.imul(n ^ a.charCodeAt(0), 0x1000193);
              return n >>> 0;
            })(e, o, M) >>> 0),
          () => {
            let e = Math.imul((N = (N + 0x6d2b79f5) >>> 0) ^ (N >>> 15), 1 | N);
            return (((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e) ^ (e >>> 14)) >>> 0) / 0x100000000;
          }),
        )
      : null,
    O = w[(M + A) % w.length];
  if (!v || !W)
    return (
      <div className={`card p-5 sm:p-6 ${k}`} aria-busy="true">
        <div className="h-3 w-28 rounded bg-line/70" />
        <div className="mt-4 h-24 rounded-lg bg-line/40" />
        <span className="sr-only">Loading the game…</span>
      </div>
    );
  let z = null !== C && C === W.answer,
    F =
      "number" === W.mode || "tally" === W.mode
        ? String(W.options[W.answer])
        : "group" === W.mode
          ? `the side with ${W.groups[W.answer].n}`
          : "sequence" === W.mode
            ? r[W.options[W.answer]]
            : "the mirrored one",
    H = (e) => {
      z || (S(e), e === W.answer && L((e) => e + 1));
    },
    P = (e) =>
      null === C
        ? "border-line bg-paper-2/40 hover:border-moss hover:bg-moss-soft"
        : e === W.answer && (z || C === e)
          ? "border-moss bg-moss-soft text-moss-2"
          : e === C
            ? "border-rust/60 bg-rust-soft"
            : "border-line bg-paper-2/40 opacity-60";
  return (
    <div className={`card p-5 sm:p-6 ${k}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow text-azure">{h ?? "On screen"}</p>
        <p className="text-xs text-ink-2" aria-live="polite">
          {A > 0 ? `${A} right` : `Ages ${(0, l.rung)(o).age}ish`}
        </p>
      </div>
      <p className="font-display mt-1.5 text-xl font-semibold leading-snug sm:text-2xl">{W.prompt}</p>
      <div className="mt-4 rounded-tile border border-line/70 bg-paper-2/30 px-3 py-5">
        {"number" === W.mode && <CY_ n={W.count} glyph={W.glyph} rows={W.rows} />}
        {"tally" === W.mode &&
          (W.count > 0 ? <CB_ n={W.count} /> : <p className="text-center text-sm text-ink-2">Work it out, then tap the number.</p>)}
        {"group" === W.mode && (
          <div className="grid grid-cols-2 gap-3">
            {W.groups.map((e, s) => (
              <button
                key={s}
                type="button"
                onClick={() => H(s)}
                aria-label={`${e.n} ${r[e.glyph]}s`}
                className={`rounded-tile border-2 p-3 transition ${P(s)}`}
              >
                <CY_ n={e.n} glyph={e.glyph} size="h-7 w-7 sm:h-9 sm:w-9" />
              </button>
            ))}
          </div>
        )}
        {"sequence" === W.mode && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {W.shown.map((e, s) => (
              <span key={s} className="text-moss">
                <CI_ name={e} className="h-8 w-8 sm:h-10 sm:w-10" />
              </span>
            ))}
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-dashed border-ink-2/50 text-lg font-semibold text-ink-2 sm:h-12 sm:w-12">
              ?
            </span>
          </div>
        )}
        {"mirror" === W.mode && (
          <div className="flex items-center justify-center gap-2">
            <CJ_ cells={W.half} />
            <span className="h-24 w-px bg-ink-2/40" aria-hidden="true" />
            <span className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-dashed border-ink-2/50 text-lg font-semibold text-ink-2">
              ?
            </span>
          </div>
        )}
      </div>
      {"group" !== W.mode && (
        <div className={`mt-4 grid gap-2.5 ${"mirror" === W.mode ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
          {"number" === W.mode || "tally" === W.mode
            ? W.options.map((e, s) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => H(s)}
                  className={`font-display rounded-tile border-2 py-4 text-2xl font-semibold transition sm:text-3xl ${P(s)}`}
                >
                  {e}
                </button>
              ))
            : "sequence" === W.mode
              ? W.options.map((e, s) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => H(s)}
                    aria-label={r[e]}
                    className={`flex items-center justify-center rounded-tile border-2 py-3 text-moss transition ${P(s)}`}
                  >
                    <CI_ name={e} className="h-9 w-9 sm:h-11 sm:w-11" />
                  </button>
                ))
              : W.options.map((e, s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => H(s)}
                    aria-label={`Option ${s + 1}`}
                    className={`flex items-center justify-center rounded-tile border-2 p-2.5 transition ${P(s)}`}
                  >
                    <CJ_ cells={e} mirrored />
                  </button>
                ))}
        </div>
      )}
      <div className="mt-4 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium" aria-live="polite">
          {null === C ? (
            <span className="text-ink-2">Take your time. Nothing here is timed.</span>
          ) : z ? (
            <span className="text-moss-2">{O}</span>
          ) : (
            <span className="text-ink-2">
              {"Not that one — it was "}
              {F}. Count it again together and have another go.
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={T}
          className="rounded-full bg-moss px-4 py-2 text-sm font-medium text-paper transition hover:bg-moss-2"
        >
          {null === C ? "Different one" : z ? "Next" : "Try another"}
        </button>
      </div>
    </div>
  );
};
