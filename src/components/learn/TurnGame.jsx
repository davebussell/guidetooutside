"use client";
// Restored from client module 31327 (exports: FamilyGame, TurnGame)
import * as s from "react";
import * as a from "@/components/learn/family";
import * as n from "@/components/learn/NatureGame";
function CI_({ kind: e, kids: r, start: l, note: o, title: d }) {
  let [h, c] = (0, s.useState)(null),
    m = r.find((e) => e.id === (h ?? l)) ?? r[0],
    u = m ? (0, a.rungOf)(m) : "four";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-1">Whose turn</span>
        {r.map((e, s) => {
          let n = m?.id === e.id;
          return (
            <button
              key={e.id}
              type="button"
              aria-pressed={n}
              onClick={() => c(e.id)}
              className={`flex items-center gap-1.5 rounded-full border py-0.5 pl-0.5 pr-3 text-sm font-semibold transition active:scale-95 ${n ? "border-moss bg-moss/10" : "border-line bg-surface text-ink-2 hover:border-moss"}`}
            >
              <a.Avatar kid={e} i={s} size={26} />
              {e.name}
            </button>
          );
        })}
      </div>
      {o && <p className="mt-2 text-sm text-ink-2">{o}</p>}
      <div className="mt-4">
        <n.NatureGame kind={e} rung={u} title={d} />
      </div>
    </div>
  );
}
/** @param {{ kind: string, note?: string, title?: string }} props */
export const FamilyGame = function ({ kind: e, note: s, title: n }) {
  let r = (0, a.useFamily)();
  return <CI_ kind={e} kids={r.kids} note={s} title={n} />;
};
export { CI_ as TurnGame };
