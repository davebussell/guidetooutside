"use client";
// Restored from client module 43111 (exports: Avatar, Chip, EXAMPLE, Heart, KID_COLOURS, KidChips, KidEditor, Label, Tile, WhoBlock, bandOf, rungOf, useChosenKid, useFamily)
import * as t from "react/jsx-runtime";
import * as s from "react";
import * as a from "@/lib/learn/activities";
import * as r from "@/components/learn/ActivityArt";
import * as n from "@/lib/learn/use-learn";
let i = ["var(--azure)", "var(--rust)", "var(--gold)", "var(--moss)", "#7a5bd0", "#b0508a"],
  o = [
    {
      id: "k1",
      name: "Little one",
      age: 1,
      rung: "two",
      skills: [],
      likes: ["animals", "water"],
      here: true,
    },
    {
      id: "k2",
      name: "Middle one",
      age: 3,
      rung: "two",
      skills: [],
      likes: ["bugs", "building"],
      here: true,
    },
    {
      id: "k3",
      name: "Big one",
      age: 5,
      rung: "four",
      skills: [],
      likes: ["birds", "counting"],
      here: true,
    },
  ],
  l = {
    animals: "hare",
    bugs: "bug",
    birds: "bird",
    trees: "leaf",
    rocks: "stone",
    water: "water",
    sky: "cloud",
    counting: "acorn",
    building: "table",
    art: "crayon",
    stories: "book",
    sounds: "ear",
    growing: "sprout",
    cooking: "apple",
  },
  d = (e) => ({
    ...e,
    likes: e.likes ?? [],
    here: e.here ?? true,
  });
function h() {
  let e = (0, n.useLearn)(),
    t = 0 === e.learners.length,
    a = (0, s.useMemo)(() => (t ? o : e.learners.map(d)), [t, e.learners]);
  (0, s.useEffect)(() => {
    if (t)
      try {
        let t = localStorage.getItem("gto:today:v1");
        if (!t) return;
        let s = JSON.parse(t),
          a = s.settings?.kids;
        if (!a?.length || !a.some((e, t) => e.name !== o[t]?.name || e.age !== o[t]?.age || e.likes?.join() !== o[t]?.likes.join())) return;
        (e.replaceAll({
          v: 2,
          learners: a.map((e) => ({
            id: e.id,
            name: e.name,
            age: e.age,
            rung: (0, n.rungForAge)(e.age),
            skills: [],
            likes: e.likes ?? [],
            here: e.here ?? true,
          })),
          journal: e.journal,
          done: e.done,
        }),
          delete s.settings.kids,
          localStorage.setItem("gto:today:v1", JSON.stringify(s)));
      } catch {}
  }, []);
  let r = (0, s.useCallback)(() => {
      t &&
        e.replaceAll({
          v: 2,
          learners: o.map((e) => ({
            ...e,
          })),
          journal: e.journal,
          done: e.done,
        });
    }, [t, e]),
    i = (0, s.useCallback)(
      (s, a) => {
        if (t)
          return void e.replaceAll({
            v: 2,
            learners: o.map((e) =>
              e.id === s
                ? {
                    ...e,
                    ...a,
                    rung: null != a.age && null == a.rung ? (0, n.rungForAge)(a.age) : (a.rung ?? e.rung),
                  }
                : {
                    ...e,
                  },
            ),
            journal: e.journal,
            done: e.done,
          });
        let r = e.learners.find((e) => e.id === s),
          i = null != a.age && r && r.rung === (0, n.rungForAge)(r.age) ? (0, n.rungForAge)(a.age) : undefined;
        e.updateLearner(
          s,
          i
            ? {
                ...a,
                rung: i,
              }
            : a,
        );
      },
      [t, e],
    ),
    l = (0, s.useCallback)((t, s) => (r(), e.addLearner(t, s)), [r, e]),
    h = (0, s.useCallback)(
      (s) => {
        t
          ? e.replaceAll({
              v: 2,
              learners: o
                .filter((e) => e.id !== s)
                .map((e) => ({
                  ...e,
                })),
              journal: e.journal,
              done: e.done,
            })
          : e.removeLearner(s);
      },
      [t, e],
    );
  return {
    kids: a,
    example: t,
    update: i,
    add: l,
    remove: h,
    ensure: r,
    store: e,
  };
}
function CC_({ kid: e, i: s, size: a = 36 }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-surface"
      style={{
        width: a,
        height: a,
        background: i[s % i.length],
        fontSize: 0.42 * a,
      }}
      aria-hidden="true"
    >
      {e.name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
function CU_({ on: e, onClick: s, children: a, className: r = "", small: n = false }) {
  return (
    <button
      type="button"
      aria-pressed={e}
      onClick={s}
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition ${n ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${e ? "border-moss bg-moss text-white" : "border-edge bg-surface text-ink-2 hover:border-moss hover:text-moss"} ${r}`}
    >
      {a}
    </button>
  );
}
function CP_({ className: e = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={e} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.7 1.3 4.5 2.6.3.5 1.3.5 1.6 0 .8-1.3 2.3-2.6 4.5-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
/** @param {{ children: import("react").ReactNode, aside?: import("react").ReactNode }} props */
function CM_({ children: e, aside: s }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-2">{e}</p>
      {s && <p className="text-sm font-medium text-moss">{s}</p>}
    </div>
  );
}
function CF_({ kids: e, selected: s, onSelect: a, allLabel: r, editing: n, onEdit: i, onAdd: o, dim: l = true }) {
  return (
    <div className="flex flex-wrap gap-2">
      {r && (
        <button
          type="button"
          onClick={() => a("all")}
          aria-pressed={"all" === s}
          className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-left transition ${"all" === s ? "border-moss bg-moss-soft" : "border-edge bg-surface hover:border-moss"}`}
        >
          <span className="flex -space-x-2.5">
            {e.slice(0, 3).map((e, s) => (
              <CC_ key={e.id} kid={e} i={s} size={28} />
            ))}
          </span>
          <span className="text-sm font-semibold">{r}</span>
        </button>
      )}
      {e.map((e, r) => {
        let o = s === e.id,
          d = n === e.id;
        return (
          <button
            key={e.id}
            type="button"
            onClick={() => {
              o && i ? i(d ? null : e.id) : a(e.id);
            }}
            aria-pressed={o}
            aria-expanded={i ? d : undefined}
            className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-left transition ${o ? "border-moss bg-moss-soft" : "border-edge bg-surface hover:border-moss"} ${l && !e.here ? "opacity-45" : ""}`}
          >
            <CC_ kid={e} i={r} />
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{e.name}</span>
              <span className="block text-xs text-ink-2">{l && !e.here ? "not today" : 0 === e.age ? "under 1" : `age ${e.age}`}</span>
            </span>
            {o && i && <span className="ml-0.5 text-xs text-ink-2">{d ? "▴" : "✎"}</span>}
          </button>
        );
      })}
      {o && (
        <button
          type="button"
          onClick={o}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-edge px-3.5 py-2 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
        >
          <span className="text-lg leading-none">+</span>
          {" Add"}
        </button>
      )}
    </div>
  );
}
function CG_({ kid: e, i: s, onChange: n, onRemove: i, onDone: o, showLikes: d = true, showHere: h = true, canRemove: m = true }) {
  return (
    <div className="mt-3 rounded-tile border border-line bg-paper/60 p-4">
      <div className="flex items-center gap-3">
        <CC_ kid={e} i={s} size={44} />
        <input
          value={e.name}
          onChange={(e) =>
            n({
              name: e.target.value.slice(0, 24),
            })
          }
          aria-label="Name"
          className="min-w-0 flex-1 rounded-tile border border-edge bg-surface px-3 py-2 text-base font-semibold outline-none focus:border-moss focus:ring-2 focus:ring-moss/25"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-edge bg-surface">
          <button
            type="button"
            onClick={() =>
              n({
                age: Math.max(0, e.age - 1),
              })
            }
            className="h-10 w-10 rounded-full text-xl text-ink-2 hover:text-moss"
            aria-label="Younger"
          >
            −
          </button>
          <span className="w-16 text-center text-sm font-semibold">{0 === e.age ? "under 1" : `age ${e.age}`}</span>
          <button
            type="button"
            onClick={() =>
              n({
                age: Math.min(10, e.age + 1),
              })
            }
            className="h-10 w-10 rounded-full text-xl text-ink-2 hover:text-moss"
            aria-label="Older"
          >
            +
          </button>
        </div>
        {h && (
          <CU_
            on={e.here}
            onClick={() =>
              n({
                here: !e.here,
              })
            }
          >
            {e.here ? "Coming today" : "Not today"}
          </CU_>
        )}
      </div>
      {d && (
        <>
          <p className="mt-4 text-sm font-medium">
            {e.name || "They"}
            {" loves…"}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {a.INTERESTS.map((s) => {
              let a = e.likes.includes(s.key);
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={a}
                  onClick={() =>
                    n({
                      likes: a ? e.likes.filter((e) => e !== s.key) : [...e.likes, s.key],
                    })
                  }
                  className={`flex items-center gap-1.5 rounded-full border py-0.5 pl-0.5 pr-2.5 text-[13px] font-medium transition ${a ? "border-rust/60 bg-rust-soft text-ink" : "border-edge bg-surface text-ink-2 hover:border-ink-2"}`}
                >
                  <r.ActivityArt art={l[s.key]} className="h-7 w-7 !rounded-full" />
                  {s.label}
                  {a && <CP_ className="h-3.5 w-3.5 text-rust" />}
                </button>
              );
            })}
          </div>
        </>
      )}
      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={o} className="rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white">
          Done
        </button>
        {m && (
          <button type="button" onClick={i} className="text-sm text-ink-2 underline hover:text-rust">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
export { CC_ as Avatar };
export { CU_ as Chip };
export { o as EXAMPLE };
export { CP_ as Heart };
export { i as KID_COLOURS };
export { CF_ as KidChips };
export { CG_ as KidEditor };
export { CM_ as Label };
/** @param {{ art: string, title: string, note?: string, on?: boolean, onClick?: () => void, href?: string, className?: string, size?: "sm" | "md" }} props */
export const Tile = function ({ art: e, title: s, note: a, on: n = false, onClick: i, href: o, className: l = "", size: d = "md" }) {
  let h = (
      <>
        <r.ActivityArt
          art={e}
          className={`shrink-0 transition group-hover:rotate-[-4deg] ${"sm" === d ? "h-12 w-12" : "h-14 w-14 sm:h-16 sm:w-16"}`}
        />
        <span className="min-w-0">
          <span
            className={`font-display block font-semibold leading-tight group-hover:text-moss ${"sm" === d ? "text-[15px]" : "text-[17px]"}`}
          >
            {s}
          </span>
          {a && <span className="mt-0.5 block text-xs text-ink-2">{a}</span>}
        </span>
      </>
    ),
    c = `card group flex items-center gap-3 p-3 text-left transition hover:shadow-lift hover:border-moss ${n ? "border-moss ring-2 ring-moss/40" : ""} ${l}`;
  return o ? (
    <a href={o} className={c}>
      {h}
    </a>
  ) : (
    <button type="button" aria-pressed={i ? n : undefined} onClick={i} className={c}>
      {h}
    </button>
  );
};
export const WhoBlock = function ({ title: e = "Who's this for?", allLabel: a, value: r, onChange: n, showLikes: i = false, aside: o }) {
  let l = h(),
    [d, c] = (0, s.useState)(null),
    u = l.kids.find((e) => e.id === r),
    p = l.kids.findIndex((e) => e.id === r);
  return (
    <div>
      <CM_ aside={o ?? (l.example ? "Tap one to make it yours" : undefined)}>{e}</CM_>
      <div className="mt-3">
        <CF_
          kids={l.kids}
          selected={r}
          onSelect={n}
          allLabel={a}
          editing={d}
          onEdit={c}
          onAdd={() => {
            let e = l.add("New one", 4);
            (n(e.id), c(e.id));
          }}
          dim={false}
        />
      </div>
      {u && d === u.id && (
        <CG_
          kid={u}
          i={p}
          onChange={(e) => l.update(u.id, e)}
          onRemove={() => {
            (l.remove(u.id), c(null), n(l.kids.find((e) => e.id !== u.id)?.id ?? "all"));
          }}
          onDone={() => c(null)}
          showLikes={i}
          canRemove={l.kids.length > 1}
        />
      )}
    </div>
  );
};
export const bandOf = (e) => (0, a.bandFor)(e.age);
export const rungOf = (e) => e.rung ?? (0, n.rungForAge)(e.age);
export const useChosenKid = function (e, t = false, a = "first") {
  let [r, n] = (0, s.useState)(null),
    i = t && "all" === a ? "all" : (e.find((e) => e.here)?.id ?? e[0]?.id ?? null);
  return [("all" === r ? t : !!r && e.some((e) => e.id === r)) ? r : i, n];
};
export { h as useFamily };
