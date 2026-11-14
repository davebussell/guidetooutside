"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 81867 (exports: FishLineup, FishSize)
import * as a from "next/link";
import * as l from "@/lib/use-here";
import * as r from "react";
import * as o from "@/components/fish/FishArt";
let s = (e) => Math.round(10 * e) / 10,
  i = (e) => Math.round(e / 2.54),
  n = [
    {
      id: "hand",
      cm: 18,
      tall: 9,
      label: "a grown-up's hand",
      a: "a hand",
    },
    {
      id: "bread",
      cm: 30,
      tall: 13,
      label: "a loaf of bread",
      a: "a loaf of bread",
    },
    {
      id: "kid",
      cm: 100,
      tall: 26,
      label: "a 4-year-old, lying down",
      a: "a four-year-old",
    },
    {
      id: "paddle",
      cm: 150,
      tall: 20,
      label: "a canoe paddle",
      a: "a canoe paddle",
    },
    {
      id: "adult",
      cm: 170,
      tall: 34,
      label: "a grown-up, lying down",
      a: "a grown-up",
    },
  ];
function CD_({ id: e }) {
  switch (e) {
    case "hand":
      return (
        <g fill="#f0c9a4" stroke="#a8765a" strokeWidth="0.35" strokeLinejoin="round">
          <path d="M0 -3.2 Q0 -4.4 2 -4.4 L9 -4.4 Q10.5 -4.4 10.6 -3.6 L10.6 3.6 Q10.5 4.4 9 4.4 L2 4.4 Q0 4.4 0 3.2Z" />
          {[-3.3, -1.1, 1.1, 3.3].map((e, a) => (
            <rect key={e} x="10" y={e - 0.95} width={[6.4, 7.4, 7, 5.6][a]} height="1.9" rx="0.95" />
          ))}
          <path d="M7.5 -4.2 Q9.5 -7.4 12.4 -7.6 Q13.4 -7.4 12.6 -6.6 Q10.6 -5.4 9.6 -3.8Z" />
          <path d="M1.5 -2.2 Q3 0 1.5 2.2" fill="none" />
        </g>
      );
    case "bread":
      return (
        <g>
          <path
            d="M1 6.5 Q0 6.5 0 5 L0 -1 Q0 -6.5 7 -6.5 L23 -6.5 Q30 -6.5 30 -1 L30 5 Q30 6.5 29 6.5Z"
            fill="#d49a52"
            stroke="#8e5a26"
            strokeWidth="0.4"
          />
          <path d="M0.6 -1.2 Q15 -3 29.4 -1.2" fill="none" stroke="#b77a3a" strokeWidth="0.35" />
          {[7, 13, 19, 25].map((e) => (
            <path
              key={e}
              d={`M${e - 2} -5.8 Q${e} -3.4 ${e + 2} -5.8`}
              fill="none"
              stroke="#f4dcae"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          ))}
        </g>
      );
    case "paddle":
      return (
        <g stroke="#7a5230" strokeWidth="0.5" strokeLinejoin="round">
          <path
            d="M0 -2.5 Q0 -4.6 3 -4.6 L9 -4.6 Q10 -4.6 10 -3.6 L10 -1.4 L94 -1.4 L94 1.4 L10 1.4 L10 3.6 Q10 4.6 9 4.6 L3 4.6 Q0 4.6 0 2.5Z"
            fill="#c8955a"
          />
          <path d="M94 -1.6 Q102 -10 124 -10 Q146 -10 150 -3 L150 3 Q146 10 124 10 Q102 10 94 1.6Z" fill="#d9a766" />
          <path d="M96 0 L148 0" stroke="#b07a42" strokeWidth="0.6" />
        </g>
      );
    case "kid":
    case "adult":
      return (
        <g transform={`scale(${"kid" === e ? 1 : 1.7})`} strokeLinejoin="round">
          <circle cx="9" cy="0" r="8.6" fill="#f0c9a4" stroke="#a8765a" strokeWidth="0.4" />
          <path d="M1 -3 Q2 -9 9 -9 Q15 -9 16.6 -3 Q12 -6 5 -5Z" fill="#6b4226" />
          <circle cx="11.5" cy="-2.4" r="0.8" fill="#2b2320" />
          <circle cx="11.5" cy="2.4" r="0.8" fill="#2b2320" />
          <path d="M14 -1.4 Q15.2 0 14 1.4" fill="none" stroke="#a8765a" strokeWidth="0.5" strokeLinecap="round" />
          <rect x="16.5" y="-11" width="33" height="22" rx="6" fill={"kid" === e ? "#c8352b" : "#2c6fb5"} />
          <rect x="20" y="-13.4" width="24" height="3.4" rx="1.7" fill="#f0c9a4" />
          <rect x="20" y="10" width="24" height="3.4" rx="1.7" fill="#f0c9a4" />
          <rect x="47" y="-9.6" width="46" height="8.4" rx="3.5" fill="#3f5f8a" />
          <rect x="47" y="1.2" width="46" height="8.4" rx="3.5" fill="#3f5f8a" />
          <rect x="92" y="-10.6" width="8" height="10" rx="2.6" fill="#2f2a26" />
          <rect x="92" y="0.6" width="8" height="10" rx="2.6" fill="#2f2a26" />
        </g>
      );
  }
}
let h = `
.fs-range{-webkit-appearance:none;appearance:none;width:100%;height:44px;background:transparent;cursor:pointer;margin:0;touch-action:pan-y}
.fs-range:focus{outline:none}
.fs-range:focus-visible{outline:3px solid #2c6fb5;outline-offset:2px;border-radius:999px}
.fs-range::-webkit-slider-runnable-track{height:16px;border-radius:999px;border:1px solid #d9cfb8;background:linear-gradient(to right,#e9e0cd 0,#e9e0cd var(--fs-a),#9cc07a var(--fs-a),#9cc07a var(--fs-b),#f0d58c var(--fs-b),#f0d58c 100%)}
.fs-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:36px;height:36px;margin-top:-11px;border-radius:50%;background:#fffdf8;border:5px solid #2f5d3a;box-shadow:0 2px 6px rgba(31,42,34,.3)}
.fs-range::-moz-range-track{height:16px;border-radius:999px;border:1px solid #d9cfb8;background:linear-gradient(to right,#e9e0cd 0,#e9e0cd var(--fs-a),#9cc07a var(--fs-a),#9cc07a var(--fs-b),#f0d58c var(--fs-b),#f0d58c 100%)}
.fs-range::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#fffdf8;border:5px solid #2f5d3a;box-shadow:0 2px 6px rgba(31,42,34,.3)}
.fs-grow{transform-origin:0 0;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.fs-grab{cursor:grab}
.fs-grab:active{cursor:grabbing}
@media (prefers-reduced-motion: no-preference){.fs-nudge{animation:fs-nudge 1.6s ease-in-out 3}}
@keyframes fs-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
@media (prefers-reduced-motion: reduce){.fs-grow{transition:none}}
.fs-bub{transform-box:fill-box;transform-origin:center}
@media (max-width: 560px){.fs-fine{display:none}.fs-num{font-size:25px}.fs-lbl{font-size:27px}.fs-bub{transform:scale(1.45)}}
`;
export const FishLineup = function ({ fish: e }) {
  let [i, n] = (0, r.useState)("usual"),
    c = (0, l.useHere)(),
    f = c.region?.slug,
    p = (e) => !!f && !!e.regions && ("all" === e.regions || e.regions.includes(f)),
    m = e.filter(p).length,
    u = 1.03 * Math.max(110, ...e.map((e) => e.maxCm)) + 4,
    x = (e) => ("usual" === i ? e.typicalCm[1] : e.maxCm),
    k = [...e].sort((e, t) => x(t) - x(e) || t.maxCm - e.maxCm);
  return (
    <div className="text-ink">
      {f && m > 0 && (
        <p className="mb-3 text-sm text-ink-2">
          <span className="font-semibold text-moss">
            {m}
            {" of these "}
            {1 === m ? "lives" : "live"}
            {" in your region"}
          </span>
          {" — the "}
          {c.region.name}
          {", around "}
          {c.town}. They&apos;re marked below.
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2" role="group" aria-label="Which size to show">
          {[
            ["usual", "Usual size"],
            ["record", "Biggest ever"],
          ].map(([e, a]) => (
            <button
              key={e}
              type="button"
              aria-pressed={i === e}
              onClick={() => n(e)}
              className={`min-h-11 rounded-full border-2 px-4 py-1.5 font-semibold transition active:scale-95 ${i === e ? "border-moss bg-moss text-white" : "border-line bg-paper text-ink-2 hover:border-moss/60"}`}
            >
              {a}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-sm text-ink-2">
          {"usual" === i ? "A big, everyday adult of each kind." : "The biggest one ever measured of each kind."}
        </p>
      </div>
      <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
        <div className="rounded-xl px-2 py-1.5">
          <p className="text-sm font-semibold text-ink-2">A four-year-old, lying down · about 100 cm</p>
          <svg viewBox={`0 -15 ${s(u)} 30`} className="mt-1 block h-auto w-full" aria-hidden="true">
            <line x1="102" x2="102" y1="-15" y2="15" stroke="#c8352b" strokeWidth="0.8" strokeDasharray="2 2" />
            <g transform="translate(2 0)">
              <CD_ id="kid" />
            </g>
          </svg>
        </div>
        {k.map((e) => {
          let l = (0, o.lookFor)(e.slug, e.shape),
            r = (0, o.lookHeight)(l),
            n = ((r.bottom - r.top) / 100) * e.maxCm + 6,
            d = x(e);
          return (
            <a.default
              key={e.slug}
              href={`/wildlife/${e.slug}`}
              className="group block rounded-xl px-2 py-1.5 transition hover:bg-paper-2 focus-visible:outline-3 focus-visible:outline-azure"
            >
              <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="font-semibold text-ink group-hover:text-moss">
                  {e.name}
                  {p(e) && (
                    <span className="ml-2 rounded-full bg-moss/15 px-2 py-0.5 text-[11px] font-semibold text-moss">in your region</span>
                  )}
                </span>
                <span className="text-xs text-ink-2">
                  {"usually "}
                  {e.typicalCm[0]}–{e.typicalCm[1]}
                  {" cm · record "}
                  {e.maxCm}
                  {" cm"}
                </span>
              </span>
              <svg
                viewBox={`0 ${s(-n / 2)} ${s(u)} ${s(n)}`}
                className="mt-1 block h-auto w-full overflow-visible"
                aria-hidden="true"
                focusable="false"
              >
                <line
                  x1="102"
                  x2="102"
                  y1={s(-n / 2)}
                  y2={s(n / 2)}
                  stroke="#c8352b"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />
                <g transform={`translate(2 ${s(-((r.top + r.bottom) / 2) * (e.maxCm / 100))})`} color="#8a7a5a" opacity="0.5">
                  {"usual" === i && (
                    <g transform={`scale(${s(e.maxCm) / 100})`}>
                      <o.FishArt look={l} ghost outline={1} />
                    </g>
                  )}
                </g>
                <g transform="translate(2 0)">
                  <g
                    className="fs-grow"
                    style={{
                      transform: `scale(${(d / 100).toFixed(4)})`,
                    }}
                  >
                    <g transform={`translate(0 ${s(-(r.top + r.bottom) / 2)})`}>
                      <o.FishArt look={l} detail={false} outline={1} />
                    </g>
                  </g>
                </g>
              </svg>
            </a.default>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-ink-2">
        Drawn to one scale. The red dashed line is 100 cm — about as long as a four-year-old lying down. Tap a fish to open its page.
      </p>
      <style>{h}</style>
    </div>
  );
};
export const FishSize = function ({ name: e, slug: a, typicalCm: l, maxCm: c, record: f, shape: p }) {
  let m,
    u,
    x,
    k,
    b = (0, o.lookFor)(a, p),
    [y, g] = l,
    [$, j] = (0, r.useState)(Math.round((y + g) / 2)),
    [w, v] = (0, r.useState)(false),
    M = (0, r.useRef)(null),
    L = ((u = (m = 1.1 * c) <= 100 ? 10 : m <= 200 ? 25 : 50), Math.ceil(m / u) * u),
    N = 714 / L,
    W = (0, o.lookHeight)(b),
    A = Math.max(110, ((W.bottom - W.top) / 100) * c * N + 56),
    C = 72 + A / 2,
    Q = [...n.filter((e) => e.cm <= L && e.cm >= 0.1 * L && ("adult" !== e.id || L >= 200))]
      .sort((e, t) => Math.abs(Math.log(e.cm / c)) - Math.abs(Math.log(t.cm / c)))
      .slice(0, 3)
      .sort((e, t) => e.cm - t.cm),
    S = Q.map((e) => Math.max(20, e.tall * N) + 44),
    F = 72 + A + 30,
    T = F + S.reduce((e, t) => e + t, 0) + 6,
    B = ($ * N) / 100,
    P = (c * N) / 100,
    z = 58 + $ * N,
    Z = $ >= c - 0.5,
    q = Z ? "max" : $ > g ? "big" : "typical",
    I = N >= 3.2 ? 1 : 5 * N >= 6 ? 5 : 10,
    O = [5, 10, 20, 25, 50, 100].find((e) => e * N >= 56) ?? 100,
    E = 2.54 * N,
    D = E >= 5 ? 1 : 6 * E >= 10 ? 6 : 12,
    K = [2, 3, 6, 12, 24, 36].find((e) => e * E >= 56) ?? 36,
    R = Math.floor(L / 2.54),
    G =
      "typical" === q
        ? `Most adults you'll catch: ${y}–${g} cm (${i(y)}–${i(g)} in).`
        : "big" === q
          ? `Bigger than most — a real trophy. The biggest ever measured was ${c} cm.`
          : `The biggest one ever measured: ${c} cm (${i(c)} in).`,
    H = (e) => {
      let t = M.current;
      if (!t) return;
      let a = t.getScreenCTM();
      a && (j(Math.max(y, Math.min(c, Math.round(((e - a.e) / a.a - 58) / N)))), v(true));
    },
    Y = (e) => `${(((e - y) / (c - y)) * 100).toFixed(2)}%`,
    X = Math.min(Math.max(z, 152.1), 671.9);
  return (
    <div className="text-ink">
      <style>{h}</style>
      <div className="overflow-hidden rounded-2xl border border-line bg-[#eef4f1]">
        <svg
          ref={M}
          viewBox={`0 0 800 ${s(T)}`}
          className="block h-auto w-full select-none"
          role="img"
          aria-label={`A ${e.toLowerCase()} ${$} centimetres long (${i($)} inches) on a measuring board, beside ${Q.map((e) => `${e.a} (${e.cm} cm)`).join(", ")}. ${G}`}
        >
          <line x1={s(z)} x2={s(z)} y1="48" y2={s(72 + A + 6)} stroke="#1f2a22" strokeWidth="2" strokeDasharray="5 4" />
          <g transform={`translate(${s(X)} 30)`}>
            <g className="fs-bub">
              <rect x={-85} y="-19" width={170} height="38" rx="19" fill={"max" === q ? "#d9a441" : "#1f2a22"} />
              <text y="8" textAnchor="middle" fontSize="23" fontWeight="800" fill={"max" === q ? "#1f2a22" : "#fffdf8"}>
                {$}
                {" cm · "}
                {i($)}
                {" in"}
              </text>
            </g>
          </g>
          <rect x={52} y={72} width={734} height={s(A)} rx="8" fill="#ecd08e" stroke="#b8924a" strokeWidth="2" />
          {[0.3, 0.55, 0.8].map((e) => (
            <path key={e} d={`M78 ${s(72 + A * e)} q200 -6 400 0 t300 0`} fill="none" stroke="#dcb56a" strokeWidth="2" opacity="0.6" />
          ))}
          <rect x={36} y={62} width="22" height={s(A + 20)} rx="5" fill="#9a6a34" stroke="#6e4a22" strokeWidth="2" />
          <rect x={s(58 + y * N)} y={73} width={s((g - y) * N)} height="42" fill="#5b9a45" opacity="0.28" />
          <text x={s(58 + ((y + g) / 2) * N)} y={126} textAnchor="middle" fontSize="15" fontWeight="700" fill="#2f5d3a" className="fs-fine">
            most adults
          </text>
          <g transform={`translate(${s(58 + c * N)} 124)`}>
            <path
              d="M0 -9 L2.6 -2.8 L9 -2.8 L3.9 1.1 L5.8 7.6 L0 3.8 L-5.8 7.6 L-3.9 1.1 L-9 -2.8 L-2.6 -2.8Z"
              fill="#d9a441"
              stroke="#8a6420"
              strokeWidth="1"
            />
          </g>
          <g stroke="#5a4020" strokeWidth="1.3">
            {Array.from(
              {
                length: Math.floor(L / I) + 1,
              },
              (e, a) => {
                let l = a * I,
                  r = l % O == 0,
                  o = l % (O / 2) == 0;
                return <line key={l} x1={s(58 + l * N)} x2={s(58 + l * N)} y1={72} y2={72 + (r ? 18 : o ? 12 : 7)} />;
              },
            )}
          </g>
          <g fontSize="15" fontWeight="700" fill="#4a3418" textAnchor="middle" className="fs-num">
            {Array.from(
              {
                length: Math.floor(L / O) + 1,
              },
              (e, t) => t * O,
            )
              .filter((e) => e > 0 && 58 + e * N < 790)
              .map((e) => (
                <text key={e} x={s(58 + e * N)} y={110} className={e % (2 * O) == 0 ? undefined : "fs-fine"}>
                  {e}
                </text>
              ))}
            <text x={62} y={110} textAnchor="start">
              cm
            </text>
          </g>
          <g stroke="#5a4020" strokeWidth="1.3">
            {Array.from(
              {
                length: Math.floor(R / D) + 1,
              },
              (e, a) => {
                let l = a * D,
                  r = l % K == 0;
                return <line key={l} x1={s(58 + l * E)} x2={s(58 + l * E)} y1={s(72 + A)} y2={s(72 + A - (r ? 16 : 7))} />;
              },
            )}
          </g>
          <g fontSize="15" fontWeight="700" fill="#4a3418" textAnchor="middle" className="fs-num">
            {Array.from(
              {
                length: Math.floor(R / K) + 1,
              },
              (e, t) => t * K,
            )
              .filter((e) => e > 0 && 58 + e * E < 790)
              .map((e) => (
                <text key={e} x={s(58 + e * E)} y={s(72 + A - 24)} className={e % (2 * K) == 0 ? undefined : "fs-fine"}>
                  {e}
                </text>
              ))}
            <text x={62} y={s(72 + A - 24)} textAnchor="start">
              in
            </text>
          </g>
          {!Z && (
            <g
              transform={`translate(58 ${s(C)}) scale(${P.toFixed(4)}) translate(0 ${s(-(W.top + W.bottom) / 2)})`}
              color="#8a6420"
              opacity="0.55"
            >
              <o.FishArt look={b} ghost outline={1.4} />
            </g>
          )}
          <g transform={`translate(58 ${s(C)})`}>
            <g
              className="fs-grow"
              style={{
                transform: `scale(${B.toFixed(4)})`,
              }}
            >
              <g transform={`translate(0 ${s(-(W.top + W.bottom) / 2)})`}>
                <o.FishArt look={b} outline={1.4} detail={$ * N > 160} />
              </g>
            </g>
          </g>
          <g
            className="fs-grab"
            style={{
              touchAction: "none",
            }}
            onPointerDown={(e) => {
              0 === e.button && (e.currentTarget.setPointerCapture(e.pointerId), H(e.clientX));
            }}
            onPointerMove={(e) => {
              e.currentTarget.hasPointerCapture(e.pointerId) && H(e.clientX);
            }}
            aria-hidden="true"
          >
            <circle cx={s(z)} cy={s(C)} r="40" fill="#ffffff" opacity="0.001" />
            <g className={w ? undefined : "fs-nudge"}>
              <circle cx={s(z)} cy={s(C)} r="15" fill="#fffdf8" stroke="#2f5d3a" strokeWidth="4" />
              <path
                d={`M${s(z - 6)} ${s(C)} l4 -4 m-4 4 l4 4 M${s(z + 6)} ${s(C)} l-4 -4 m4 4 l-4 4`}
                stroke="#2f5d3a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
          {Q.map((e, a) => {
            let l = Math.max(20, e.tall * N),
              r = F + S.slice(0, a).reduce((e, t) => e + t, 0) + l / 2,
              o = 58 + e.cm * N;
            return (
              <g key={e.id}>
                <g transform={`translate(58 ${s(r)}) scale(${s(100 * N) / 100})`}>
                  <CD_ id={e.id} />
                </g>
                <line
                  x1={s(o)}
                  x2={s(o)}
                  y1={s(r - l / 2 - 4)}
                  y2={s(r + l / 2 + 4)}
                  stroke="#6f8f88"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <text x={58} y={s(r + l / 2 + 26)} fontSize="18" fontWeight="700" fill="#1f2a22" className="fs-lbl">
                  {e.label}
                  {" · "}
                  {e.cm}
                  {" cm"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div aria-live="polite" className="mt-3 min-h-[4.5rem]">
        <p className="font-display text-lg leading-snug sm:text-xl">
          <span className="font-semibold">{G}</span>
        </p>
        <p className="mt-0.5 text-ink-2">
          {"This "}
          {e.toLowerCase()}
          {": "}
          {$}
          {" cm. "}
          {
            ((x = [...n].reverse().find((e) => e.cm <= 1.04 * $)),
            (k = n.find((e) => e.cm > 1.04 * $)),
            x && Math.abs(x.cm - $) / $ < 0.06
              ? `About as long as ${x.a}.`
              : x && k
                ? `Longer than ${x.a}, shorter than ${k.a}.`
                : x
                  ? `Longer than ${x.a}!`
                  : k
                    ? `Shorter than ${k.a}.`
                    : "")
          }
        </p>
      </div>
      <label className="mt-2 block">
        <span className="sr-only">
          {"How long is the "}
          {e.toLowerCase()}?
        </span>
        <input
          type="range"
          min={y}
          max={c}
          step={1}
          value={$}
          onChange={(e) => {
            (j(Number(e.target.value)), v(true));
          }}
          aria-valuetext={`${$} centimetres, ${i($)} inches. ${"typical" === q ? "A typical adult." : "big" === q ? "Bigger than most." : "The biggest ever measured."}`}
          className="fs-range"
          style={{
            "--fs-a": Y(y),
            "--fs-b": Y(g),
          }}
        />
      </label>
      <div className="flex justify-between text-xs font-semibold text-ink-2" aria-hidden="true">
        <span>small adult</span>
        <span className="text-moss">most adults</span>
        <span className="text-[#8a6420]">biggest ever</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            (j(Math.round((y + g) / 2)), v(true));
          }}
          aria-pressed={"typical" === q}
          className={`min-h-11 rounded-full border-2 px-4 py-1.5 font-semibold transition active:scale-95 ${"typical" === q ? "border-moss bg-moss text-white" : "border-line bg-paper text-ink-2 hover:border-moss/60"}`}
        >
          A typical one
        </button>
        <button
          type="button"
          onClick={() => {
            (j(c), v(true));
          }}
          aria-pressed={"max" === q}
          className={`min-h-11 rounded-full border-2 px-4 py-1.5 font-semibold transition active:scale-95 ${"max" === q ? "border-gold bg-gold text-ink" : "border-line bg-paper text-ink-2 hover:border-gold"}`}
        >
          The biggest ever
        </button>
      </div>
      <div className="mt-4 rounded-2xl bg-paper-2 px-4 py-3 text-sm leading-relaxed">
        <p className="eyebrow text-moss">The record</p>
        <p className="mt-1 text-ink">{f}</p>
      </div>
    </div>
  );
};
