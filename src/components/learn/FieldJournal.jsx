"use client";
// Restored from client module 70281 (exports: FieldJournal)
import * as t from "react/jsx-runtime";
import * as n from "next/link";
import * as s from "react";
import * as a from "@/lib/learn/badges";
import * as o from "@/lib/hooks";
import * as r from "@/components/learn/ActivityArt";
import * as l from "@/components/learn/family";
import * as i from "@/lib/learn/use-learn";
import * as d from "@/components/learn/TallyCounter";
let h = () => new Date().toISOString().slice(0, 10),
  u = [
    {
      what: "Birds",
      art: "bird",
    },
    {
      what: "Mushrooms",
      art: "mushroom",
    },
    {
      what: "Acorns",
      art: "acorn",
    },
    {
      what: "Leaves",
      art: "leaf",
    },
    {
      what: "Bugs",
      art: "bug",
    },
    {
      what: "Pine cones",
      art: "pinecone",
    },
    {
      what: "Flowers",
      art: "flower",
    },
    {
      what: "Stones",
      art: "stone",
    },
  ];
export const FieldJournal = function () {
  let e = (0, i.useLearn)(),
    c = (0, l.useFamily)(),
    m = (0, o.usePlace)(),
    { journal: g } = e,
    p = c.kids,
    [f, x] = (0, s.useState)(h),
    [w, b] = (0, s.useState)(""),
    [y, v] = (0, s.useState)(null),
    [j, k] = (0, s.useState)("all"),
    [N, S] = (0, s.useState)(""),
    [C, A] = (0, s.useState)(""),
    [T, M] = (0, s.useState)(false),
    [L, F] = (0, s.useState)(false),
    [B, O] = (0, s.useState)(false),
    [R, E] = (0, s.useState)(null),
    $ = (0, s.useRef)(null),
    U = (0, s.useRef)(null),
    W = (0, s.useMemo)(() => (0, i.countedFor)(g), [g]),
    z = (0, s.useMemo)(() => (0, a.earnedBadges)(W), [W]),
    P = (0, s.useMemo)(() => (0, a.nextBadges)(W, 2), [W]),
    K = (0, s.useMemo)(() => {
      let e = g.reduce((e, t) => e + (t.count ?? 0), 0),
        t = new Set(g.map((e) => e.what.trim().toLowerCase()).filter(Boolean)),
        n = new Set(g.map((e) => e.date));
      return {
        entries: g.length,
        counted: e,
        kinds: t.size,
        days: n.size,
      };
    }, [g]),
    Y = (e) => ("all" === e ? "All together" : (p.find((t) => t.id === e)?.name ?? "Someone")),
    D = g.reduce((e, t) => ((e[t.date] ??= []).push(t), e), {}),
    V = Object.keys(D).sort((e, t) => t.localeCompare(e)),
    q = "w-full rounded-tile border border-edge bg-surface px-3 py-2 text-[15px] outline-none focus:border-moss focus:ring-2 focus:ring-moss/25";
  return (
    <section>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8">
        {u.map((e) => (
          <button
            key={e.what}
            type="button"
            onClick={() => {
              (b(e.what),
                E(null),
                window.matchMedia("(max-width: 1023px)").matches &&
                  U.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  }));
            }}
            aria-pressed={w === e.what}
            className={`card group flex flex-col items-center gap-1.5 p-2 text-center transition hover:shadow-lift hover:border-moss sm:p-3 ${w === e.what ? "border-moss ring-2 ring-moss/40" : ""}`}
          >
            <r.ActivityArt art={e.art} className="h-12 w-12 transition group-hover:rotate-[-4deg] sm:h-14 sm:w-14" />
            <span className="font-display text-[13px] font-semibold leading-tight group-hover:text-moss sm:text-[15px]">{e.what}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,370px)_minmax(0,1fr)]">
        <form
          ref={U}
          onSubmit={(t) => {
            if ((t.preventDefault(), !w.trim())) return void $.current?.focus();
            "all" !== j && c.ensure();
            let n = new Set(z.map((e) => e.id)),
              s = {
                date: f || h(),
                what: w.trim(),
                count: y,
                learner: j,
                where: (N || m?.label || "").trim(),
                note: C.trim(),
              };
            e.addEntry(s);
            let o = (0, a.earnedBadges)([
              ...W,
              {
                date: s.date,
                what: s.what,
                count: s.count,
                learner: s.learner,
              },
            ]);
            (E({
              what: s.what,
              badges: o.filter((e) => !n.has(e.id)).map((e) => e.name),
            }),
              b(""),
              v(null),
              A(""));
          }}
          className="card grid scroll-mt-24 gap-6 p-5 sm:p-6 lg:sticky lg:top-24"
        >
          <div>
            <l.Label aside={c.example ? "Tap one to make it yours" : undefined}>Who counted?</l.Label>
            <div className="mt-3">
              <l.KidChips kids={p} selected={j} onSelect={k} allLabel="All together" dim={false} />
            </div>
          </div>
          <div>
            <l.Label>What did you count?</l.Label>
            <input ref={$} value={w} onChange={(e) => b(e.target.value)} placeholder="Mushrooms on the big log" className={`mt-3 ${q}`} />
          </div>
          <div>
            <l.Label aside={null == y ? "Tap + or count it" : undefined}>How many</l.Label>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-edge bg-surface">
                <button
                  type="button"
                  onClick={() => v((e) => Math.max(0, (e ?? 0) - 1))}
                  className="h-12 w-12 rounded-full text-2xl text-ink-2 hover:text-moss"
                  aria-label="One fewer"
                >
                  −
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={y ?? ""}
                  onChange={(e) => v("" === e.target.value ? null : Math.max(0, Number(e.target.value)))}
                  placeholder="0"
                  aria-label="How many"
                  className="font-display w-16 bg-transparent text-center text-3xl font-semibold text-moss outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => v((e) => (e ?? 0) + 1)}
                  className="h-12 w-12 rounded-full text-2xl text-ink-2 hover:text-moss"
                  aria-label="One more"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => O((e) => !e)}
                aria-expanded={B}
                className="rounded-full border border-gold-fill bg-gold-fill/15 px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-gold-fill/30"
              >
                {B ? "Close" : "Count it now"}
              </button>
            </div>
            {B && (
              <div className="mt-3">
                <d.TallyCounter
                  label="Out counting"
                  compact
                  onKeep={(e) => {
                    (v(e), O(false));
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => M((e) => !e)}
              aria-expanded={T}
              className="flex w-full items-center justify-between text-left"
            >
              <l.Label>When, where, and a note</l.Label>
              <span className={`text-ink-2 transition ${T ? "rotate-180" : ""}`}>▾</span>
            </button>
            {T && (
              <div className="mt-3 grid gap-2.5">
                <input type="date" value={f} onChange={(e) => x(e.target.value)} aria-label="Day" className={q} />
                <input
                  value={N}
                  onChange={(e) => S(e.target.value)}
                  placeholder={m?.label ?? "The woods behind the house"}
                  aria-label="Where"
                  className={q}
                />
                <input
                  value={C}
                  onChange={(e) => A(e.target.value)}
                  placeholder="Rained on Tuesday. Far more than last week."
                  aria-label="Anything else"
                  className={q}
                />
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-full bg-moss px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-moss-2"
            >
              Add to the journal
            </button>
            {R && (
              <p className="mt-3 rounded-lg border-l-4 border-l-gold-fill bg-gold-fill/10 px-3 py-2 text-sm" aria-live="polite">
                {R.badges.length ? (
                  <>
                    {"New badge: "}
                    <span className="font-semibold">{R.badges.join(", ")}</span>. Go and tell them.
                  </>
                ) : (
                  <>
                    <span className="font-semibold">{R.what}</span>
                    {" is in the journal."}
                  </>
                )}
              </p>
            )}
          </div>
        </form>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">The journal</h2>
              <p className="mt-1 text-sm text-ink-2">
                {K.entries} {1 === K.entries ? "entry" : "entries"}
                {" · "}
                {K.counted}
                {" things counted · "}
                {K.kinds} {1 === K.kinds ? "kind" : "kinds"}
                {" · "}
                {K.days} {1 === K.days ? "day" : "days"}
                {" out"}
              </p>
            </div>
            {g.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    let e = (e) => `"${e.replace(/"/g, '""')}"`,
                      t = [
                        "date,what,how many,who counted,where,note",
                        ...[...g]
                          .sort((e, t) => e.date.localeCompare(t.date))
                          .map((t) => [t.date, e(t.what), t.count ?? "", e(Y(t.learner)), e(t.where), e(t.note)].join(",")),
                      ].join("\n"),
                      n = URL.createObjectURL(
                        new Blob([t], {
                          type: "text/csv;charset=utf-8",
                        }),
                      ),
                      s = document.createElement("a");
                    ((s.href = n), (s.download = `field-journal-${h()}.csv`), s.click(), URL.revokeObjectURL(n));
                  }}
                  className="rounded-full border border-edge px-3.5 py-1.5 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
                >
                  Spreadsheet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let t = {
                        v: 2,
                        learners: e.learners,
                        journal: g,
                        done: e.done,
                      },
                      n = URL.createObjectURL(
                        new Blob([JSON.stringify(t, null, 2)], {
                          type: "application/json",
                        }),
                      ),
                      s = document.createElement("a");
                    ((s.href = n), (s.download = `guidetooutside-learn-${h()}.json`), s.click(), URL.revokeObjectURL(n));
                  }}
                  className="rounded-full border border-gold-fill bg-gold-fill/15 px-3.5 py-1.5 text-sm font-semibold text-ink transition hover:bg-gold-fill/30"
                >
                  Save a backup
                </button>
              </div>
            )}
          </div>
          {z.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {z.map((e) => (
                <span key={e.id} className="rounded-full border border-gold-fill/50 bg-gold-fill/10 px-3 py-1 text-xs font-semibold text-ink">
                  {"★ "}
                  {e.name}
                </span>
              ))}
              <n.default href="/learn/progress" className="text-xs font-medium text-moss underline hover:no-underline">
                All the badges →
              </n.default>
            </div>
          )}
          {P.length > 0 && g.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {P.map((e) => {
                let n = e.progress?.(W);
                return (
                  <div key={e.id} className="card p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold">Nearly</p>
                    <p className="font-display mt-0.5 text-lg font-semibold">{e.name}</p>
                    <p className="mt-1 text-sm text-ink-2">{e.how}</p>
                    {n && (
                      <>
                        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-paper-2">
                          <div
                            className="h-full rounded-full bg-gold-fill"
                            style={{
                              width: `${Math.round((n.now / n.need) * 100)}%`,
                            }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-ink-2">
                          {n.now}
                          {" of "}
                          {n.need}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {0 === g.length ? (
            <div className="card mt-5 p-6 text-center">
              <r.ActivityArt art="crayon" className="mx-auto h-20 w-20" />
              <p className="font-display mt-3 text-xl font-semibold">Nothing in it yet</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-ink-2">
                The first entry can be as small as “four crows, from the kitchen window” — small is the point, and forty small ones is a
                record. Tap a picture above to start.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6">
              {V.map((n) => (
                <div key={n}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">
                    {new Date(n + "T12:00:00").toLocaleDateString("en-CA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <ul className="mt-2 grid gap-3">
                    {D[n].map((n) => {
                      let s,
                        a = p.findIndex((e) => e.id === n.learner);
                      return (
                        <li key={n.id} className="card relative flex items-center gap-4 overflow-hidden p-4 pl-5">
                          <span className="absolute inset-y-0 left-0 w-1.5 bg-moss" aria-hidden="true" />
                          <r.ActivityArt
                            art={
                              ((s = n.what.toLowerCase()),
                              [
                                [/pine ?cone|cone/, "pinecone"],
                                [/mushroom|fung|toadstool/, "mushroom"],
                                [/acorn|nut/, "acorn"],
                                [/feather/, "feather"],
                                [
                                  /bird|crow|robin|duck|goose|geese|jay|chickadee|sparrow|gull|owl|heron|hawk|eagle|finch|woodpecker|loon/,
                                  "bird",
                                ],
                                [
                                  /bug|beetle|\bant|spider|worm|insect|butterfl|bee\b|bees|caterpillar|ladybug|snail|slug|moth|fly|flies/,
                                  "bug",
                                ],
                                [/flower|petal|daisy|dandelion|clover|aster/, "flower"],
                                [/leaf|leaves/, "leaf"],
                                [/seed/, "seed"],
                                [/stick|twig|branch/, "stick"],
                                [/shell/, "shell"],
                                [/stone|rock|pebble/, "stone"],
                                [/tree|maple|oak|pine|birch|spruce|cedar/, "tree"],
                                [/snow|frost|ice/, "snow"],
                                [/cloud|rain|puddle/, "cloud"],
                                [/star/, "star"],
                                [/moon/, "moon"],
                                [/sun|shadow|daylight/, "sun"],
                                [/fish|frog|tadpole|pond|river|water|lake/, "water"],
                                [/deer|squirrel|rabbit|hare|chipmunk|fox|raccoon|animal|track/, "hare"],
                                [/apple|berr/, "apple"],
                                [/step|tall|long|height|measure/, "thermometer"],
                              ].find(([e]) => e.test(s))?.[1] ?? "crayon")
                            }
                            className="h-14 w-14 shrink-0"
                          />
                          {null != n.count && (
                            <span className="font-display shrink-0 text-3xl font-semibold leading-none text-moss">{n.count}</span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="font-display block text-lg font-semibold leading-snug">{n.what}</span>
                            <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-ink-2">
                              {"all" === n.learner ? (
                                <span className="flex -space-x-2">
                                  {p.slice(0, 3).map((e, n) => (
                                    <l.Avatar key={e.id} kid={e} i={n} size={20} />
                                  ))}
                                </span>
                              ) : a >= 0 ? (
                                <l.Avatar kid={p[a]} i={a} size={20} />
                              ) : null}
                              <span className="font-medium">{Y(n.learner)}</span>
                              {n.where ? (
                                <span>
                                  {"· "}
                                  {n.where}
                                </span>
                              ) : null}
                            </span>
                            {n.note && <span className="mt-1 block text-sm leading-snug text-ink-2">{n.note}</span>}
                          </span>
                          <button
                            type="button"
                            onClick={() => e.removeEntry(n.id)}
                            aria-label={`Remove "${n.what}"`}
                            className="shrink-0 self-start rounded-full p-1.5 text-ink-2 transition hover:bg-paper-2 hover:text-rust"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              aria-hidden="true"
                            >
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-0 flex-1 basis-64">
              <p className="font-display text-lg font-semibold">Moving it to another device</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">
                Save a backup here, then load the file on the other device. Nothing is stored on a server, which is why it is yours.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-edge px-3.5 py-1.5 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss">
                Load a backup
                <input
                  type="file"
                  accept="application/json"
                  className="sr-only"
                  onChange={(t) => {
                    let n,
                      s = t.target.files?.[0];
                    (s &&
                      (((n = new FileReader()).onload = () => {
                        try {
                          let t = JSON.parse(String(n.result));
                          t &&
                            Array.isArray(t.learners) &&
                            Array.isArray(t.journal) &&
                            e.replaceAll({
                              v: 2,
                              learners: t.learners,
                              journal: t.journal,
                              done: t.done ?? {},
                            });
                        } catch {}
                      }),
                      n.readAsText(s)),
                      (t.target.value = ""));
                  }}
                />
              </label>
              {g.length > 0 && (
                <button
                  type="button"
                  onClick={() => (L ? (e.clearJournal(), F(false)) : F(true))}
                  onBlur={() => F(false)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${L ? "border-rust bg-rust-soft text-rust" : "border-edge text-ink-2 hover:border-rust/50"}`}
                >
                  {L ? "Really erase everything?" : "Erase the journal"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
