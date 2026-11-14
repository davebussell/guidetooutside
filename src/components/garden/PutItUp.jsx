"use client";
// Restored from client module 10796 (exports: PutItUp)
import * as s from "react/jsx-runtime";
import * as r from "react";
import * as n from "next/link";
import * as l from "@/lib/use-here";
let t = {
    "water-bath": "Water-bath canning",
    pressure: "Pressure canning",
    pickle: "Pickling",
    ferment: "Fermenting",
    freeze: "Freezing",
    dry: "Drying",
    "cold-store": "Cold storage",
    cure: "Curing and storage",
  },
  o = {
    "water-bath": ["canner", "pressure"],
    pressure: ["pressure"],
    pickle: ["canner", "pressure"],
    ferment: [],
    freeze: ["freezer"],
    dry: ["dehydrator"],
    "cold-store": ["coldroom"],
    cure: [],
  };
function CA_({ on: e, onClick: r, children: n }) {
  return (
    <button
      type="button"
      aria-pressed={e}
      onClick={r}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${e ? "border-moss bg-moss text-paper" : "border-edge bg-surface hover:border-moss"}`}
    >
      {n}
    </button>
  );
}
export const PutItUp = function ({ crops: e, recipes: i, month: c }) {
  // The crops' harvest months are the northern calendar; a reader south of the equator is six months round.
  let here = (0, l.useHere)(),
    d = here.month ? (here.region?.south ? ((here.month + 5) % 12) + 1 : here.month) : c,
    u = (0, r.useMemo)(() => e.filter((e) => e.harvestMonths.includes(d)), [e, d]),
    [h, m] = (0, r.useState)(() => (e.find((e) => "tomato" === e.slug && e.harvestMonths.includes(c)) ?? u[0] ?? e[0]).slug),
    [p, g] = (0, r.useState)("basket"),
    [f, x] = (0, r.useState)("afternoon"),
    [b, w] = (0, r.useState)(() => new Set(["freezer", "canner"])),
    j = e.find((e) => e.slug === h) ?? e[0],
    v = (0, r.useMemo)(() => {
      let e = [];
      return (
        j.preserve.forEach((s, r) => {
          var n, l, t;
          let a,
            c = o[s],
            d = 0 === c.length || c.some((e) => b.has(e)),
            u =
              ((n = s),
              (l = f),
              (t = p),
              (a = "freeze" === n || "cold-store" === n || "cure" === n || "ferment" === n),
              "hour" === l
                ? a
                  ? {
                      score: "freeze" === n ? 3 : 2,
                      why:
                        "freeze" === n
                          ? "An hour is enough to wash, blanch and bag."
                          : "ferment" === n
                            ? "About twenty minutes of salting; fermentation does the rest."
                            : "No cooking; only suitable storage conditions.",
                    }
                  : {
                      score: 0,
                      why: "",
                    }
                : "afternoon" === l
                  ? "pressure" === n && "barrow" === t
                    ? {
                        score: 1,
                        why: "One pressure-canner load takes most of an afternoon; a wheelbarrow load is about two days’ work.",
                      }
                    : {
                        score: 2 + +!a,
                        why: a ? "Achievable in the time available." : "One canner load fits comfortably into an afternoon.",
                      }
                  : "bowl" === t && ("water-bath" === n || "pressure" === n || "pickle" === n)
                    ? {
                        score: 1,
                        why: "A bowlful barely fills one jar; freezing or a refrigerator pickle is simpler for small quantities.",
                      }
                    : {
                        score: 3,
                        why: a ? "Ample time; this is the simplest option." : "Canning suits large quantities and a full weekend.",
                      });
          if (!u.score) return;
          let h = d ? null : c[0],
            m = 2 * u.score + (j.preserve.length - r) - 2 * !!h;
          e.push({
            method: s,
            score: m,
            why: u.why,
            missing: h,
            recipes: i.filter((e) => e.crop === j.slug && e.method === s),
          });
        }),
        e.sort((e, s) => s.score - e.score).slice(0, 3)
      );
    }, [j, b, f, p, i]);
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
      <div className="card grid gap-5 p-5">
        <div>
          <label htmlFor="putitup-crop" className="eyebrow block">
            Crop
          </label>
          <select
            id="putitup-crop"
            value={h}
            onChange={(e) => m(e.target.value)}
            className="mt-2 w-full rounded-tile border border-edge bg-surface px-3 py-2.5 text-[15px] outline-none focus:border-moss focus:ring-2 focus:ring-moss/25"
          >
            {u.length > 0 && (
              <optgroup label="In season this month">
                {u.map((e) => (
                  <option key={e.slug} value={e.slug}>
                    {e.name}
                  </option>
                ))}
              </optgroup>
            )}
            <optgroup label="All crops">
              {e
                .filter((e) => !u.includes(e))
                .map((e) => (
                  <option key={e.slug} value={e.slug}>
                    {e.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
        <div>
          <p className="eyebrow">Quantity</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <CA_ on={"bowl" === p} onClick={() => g("bowl")}>
              A bowl
            </CA_>
            <CA_ on={"basket" === p} onClick={() => g("basket")}>
              A basket
            </CA_>
            <CA_ on={"barrow" === p} onClick={() => g("barrow")}>
              A wheelbarrow
            </CA_>
          </div>
        </div>
        <div>
          <p className="eyebrow">Time available</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <CA_ on={"hour" === f} onClick={() => x("hour")}>
              One hour
            </CA_>
            <CA_ on={"afternoon" === f} onClick={() => x("afternoon")}>
              An afternoon
            </CA_>
            <CA_ on={"weekend" === f} onClick={() => x("weekend")}>
              A weekend
            </CA_>
          </div>
        </div>
        <div>
          <p className="eyebrow">Equipment</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              ["freezer", "Freezer space"],
              ["canner", "Deep pot and jars"],
              ["pressure", "Pressure canner"],
              ["dehydrator", "Dehydrator or low oven"],
              ["coldroom", "Cold store or garage"],
            ].map(([e, r]) => (
              <CA_
                key={e}
                on={b.has(e)}
                onClick={() =>
                  w((s) => {
                    let r = new Set(s);
                    return (r.has(e) ? r.delete(e) : r.add(e), r);
                  })
                }
              >
                {r}
              </CA_>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="eyebrow text-gold">Recommended method</p>
        <h3 className="font-display mt-1 text-2xl font-semibold">
          {v.length ? `${j.name}: ${t[v[0].method].toLowerCase()}` : `${j.name}: best eaten fresh`}
        </h3>
        <p className="mt-2 text-sm text-ink-2">{j.preserveNote}</p>
        {0 === v.length && (
          <p className="mt-3 text-sm text-ink-2">No method fits that time and equipment. Allow an afternoon, or select freezer space.</p>
        )}
        <ol className="mt-4 grid gap-3">
          {v.map((e, r) => (
            <li key={e.method} className={`card p-4 ${0 === r ? "border-moss ring-2 ring-moss/30" : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg font-semibold">
                  {r + 1}
                  {". "}
                  {t[e.method]}
                </p>
                <n.default href={`/gardening/preserving#${e.method}`} className="text-xs font-medium text-moss hover:underline">
                  Method details
                </n.default>
              </div>
              <p className="mt-1 text-sm text-ink-2">{e.why}</p>
              {e.missing && (
                <p className="mt-1 text-sm text-rust">
                  {"Needs "}
                  {"pressure" === e.missing
                    ? "a pressure canner"
                    : "canner" === e.missing
                      ? "a deep pot and canning jars"
                      : "dehydrator" === e.missing
                        ? "a dehydrator or an oven that holds 60 °C"
                        : "coldroom" === e.missing
                          ? "somewhere cold and dark"
                          : "freezer space"}
                  ; select it above if one can be borrowed.
                </p>
              )}
              {e.recipes.length > 0 && (
                <ul className="mt-2 grid gap-1">
                  {e.recipes.map((e) => (
                    <li key={e.slug}>
                      <n.default href={`/gardening/recipes/${e.slug}`} className="text-sm font-semibold text-moss hover:underline">
                        {e.title}
                        {" → "}
                        <span className="font-normal text-ink-2">
                          ({e.active}
                          {" active)"}
                        </span>
                      </n.default>
                    </li>
                  ))}
                </ul>
              )}
              {0 === e.recipes.length && (
                <n.default
                  href={`/gardening/crops/${j.slug}#put-up`}
                  className="mt-2 inline-block text-sm font-semibold text-moss hover:underline"
                >
                  {"Method on the "}
                  {j.name.toLowerCase()}
                  {" page →"}
                </n.default>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
