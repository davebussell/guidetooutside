"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 9764 (exports: FishLookalikes, LOOKALIKE_PAIRS)
import * as l from "next/link";
import * as r from "react";
import * as o from "@/components/fish/FishArt";
let t;
let s = {
    head: "the head and jaw",
    chin: "under the chin",
    body: "the body and its markings",
    dorsal: "the fin on the back",
    lowerFins: "the lower fins",
    tail: "the tail",
  },
  i = [
    {
      id: "pike-muskie",
      sides: [
        {
          look: "northern-pike",
          name: "Northern pike",
          slug: "northern-pike",
          clue: "Light spots on a dark body",
          tags: {
            body: "light spots on dark",
            tail: "rounded tips",
            chin: "5 pores or fewer",
          },
        },
        {
          look: "muskellunge",
          name: "Muskellunge",
          aka: "muskie",
          slug: "muskellunge",
          clue: "Dark marks on a light body",
          tags: {
            body: "dark marks on light",
            tail: "pointed tips",
            chin: "6 to 9 pores",
          },
        },
      ],
      tells: ["body", "tail", "chin"],
      parts: ["chin", "body", "dorsal", "tail"],
      crop: "body",
      why: "A pike has light, bean-shaped spots on a dark body, rounded tail tips and 5 or fewer pores under each side of its jaw. A muskie is the reverse — dark bars or spots on a light body — with pointed tail tips and 6 to 9 pores.",
    },
    {
      id: "bass",
      sides: [
        {
          look: "largemouth-bass",
          name: "Largemouth bass",
          slug: "largemouth-bass",
          clue: "Jaw reaches past the eye",
          tags: {
            head: "jaw goes past the eye",
            body: "dark side stripe",
          },
        },
        {
          look: "smallmouth-bass",
          name: "Smallmouth bass",
          slug: "smallmouth-bass",
          clue: "Jaw stops under the eye",
          tags: {
            head: "jaw ends under the eye",
            body: "bronze, with bars",
          },
        },
      ],
      tells: ["head", "body"],
      parts: ["head", "body", "dorsal", "tail"],
      crop: "head",
      why: "Look at the jaw. On a largemouth the upper jaw reaches past the back of the eye; on a smallmouth it stops under the eye. Largemouth wear a dark stripe along the side; smallmouth are bronze with vertical bars.",
    },
    {
      id: "brook-brown",
      sides: [
        {
          look: "brook-trout",
          name: "Brook trout",
          slug: "brook-trout",
          clue: "Light wormy marks on a dark back",
          tags: {
            body: "light marks on dark",
            lowerFins: "white edges",
          },
        },
        {
          look: "brown-trout",
          name: "Brown trout",
          slug: "brown-trout",
          clue: "Dark spots with pale rings",
          tags: {
            body: "dark spots on light",
            lowerFins: "no white edges",
          },
        },
      ],
      tells: ["body", "lowerFins"],
      parts: ["head", "body", "lowerFins", "tail"],
      crop: "body",
      why: "A brook trout has light, worm-like marks on a dark back, red spots with blue halos, and white edges on its lower fins. A brown trout has dark spots with pale halos on a lighter, golden body, and no white fin edges.",
    },
    {
      id: "brook-lake",
      sides: [
        {
          look: "brook-trout",
          name: "Brook trout",
          slug: "brook-trout",
          clue: "Nearly square tail",
          tags: {
            tail: "nearly square",
            body: "red spots, blue halos",
          },
        },
        {
          look: "lake-trout",
          name: "Lake trout",
          slug: "lake-trout",
          clue: "Deeply forked tail",
          tags: {
            tail: "deeply forked",
            body: "pale spots, no red",
          },
        },
      ],
      tells: ["tail", "body"],
      parts: ["head", "body", "dorsal", "tail"],
      crop: "tail",
      why: "Check the tail: a lake trout's is deeply forked, a brook trout's nearly square. And only the brook trout has red spots in blue halos — a lake trout's spots are all pale, on grey.",
    },
    {
      id: "drum",
      sides: [
        {
          look: "redfish",
          name: "Red drum",
          aka: "redfish",
          slug: "redfish",
          clue: "Black spot at the tail, no whiskers",
          tags: {
            tail: "black tail spot",
            chin: "no whiskers",
          },
        },
        {
          look: "black-drum",
          name: "Black drum",
          clue: "Whiskers under the chin",
          tags: {
            tail: "no tail spot",
            chin: "chin whiskers",
          },
        },
      ],
      tells: ["tail", "chin"],
      parts: ["chin", "body", "dorsal", "tail"],
      crop: "tail",
      why: "A red drum is copper-bronze with a black spot (sometimes several) at the base of its tail, and no whiskers. A black drum is grey to black with rows of little barbels under its chin — and young ones wear black vertical bars.",
    },
    {
      id: "walleye-sauger",
      sides: [
        {
          look: "walleye",
          name: "Walleye",
          slug: "walleye",
          clue: "White tip on the tail",
          tags: {
            tail: "white tip",
            dorsal: "no spots, dark blotch",
          },
        },
        {
          look: "sauger",
          name: "Sauger",
          clue: "No white tip on the tail",
          tags: {
            tail: "no white tip",
            dorsal: "rows of black spots",
          },
        },
      ],
      tells: ["tail", "dorsal"],
      parts: ["head", "dorsal", "body", "tail"],
      crop: "tail",
      why: "A walleye has a white tip on the bottom lobe of its tail, and a dark blotch at the back of its first dorsal fin. A sauger has no white tip, but that first dorsal fin is covered in rows of black spots.",
    },
    {
      id: "speckled",
      sides: [
        {
          look: "speckled-trout",
          name: "Spotted seatrout",
          aka: "“speckled trout” on the Gulf",
          slug: "speckled-trout",
          clue: "Silvery, with round black spots",
          tags: {
            body: "round black spots on silver",
            head: "two big fangs",
          },
        },
        {
          look: "brook-trout",
          name: "Brook trout",
          aka: "“speckled trout” in Canada",
          slug: "brook-trout",
          clue: "Wormy back, red spots in blue",
          tags: {
            body: "wormy marks, red spots",
            head: "no fangs",
          },
        },
      ],
      tells: ["body", "head"],
      parts: ["head", "body", "lowerFins", "tail"],
      crop: "body",
      why: "Same nickname, different fish. On the Gulf and Atlantic coasts a “speckled trout” is the spotted seatrout — a silvery saltwater drum with round black spots and two big fangs at the tip of its upper jaw. In Canada it is the brook trout, a freshwater char with worm-like marks and red spots in blue halos.",
    },
  ];
function n(e, t) {
  let a = (0, o.geometry)(e),
    l = e.gill,
    r = (l + e.body) / 2,
    s = (e, t, a, l) => ({
      x: e,
      y: t,
      w: a - e,
      h: l - t,
    });
  switch (t) {
    case "head":
      return s(-2, a.top(l) - 1, l + 2, a.bot(l) + 1);
    case "chin":
      return s(-2, e.mouth.y + 0.4, l - 2, a.bot(0.6 * l) + 5);
    case "body":
      return s(l + 3, 0.8 * a.top(r), e.body - 4, 0.8 * a.bot(r));
    case "dorsal": {
      let t = e.dorsal[0];
      return s(t.from - 2, a.top((t.from + t.to) / 2) - t.h - 2, t.to + 3, a.top((t.from + t.to) / 2) + 1);
    }
    case "lowerFins":
      return s(e.pelvic ? Math.min(e.pelvic.x, e.anal.from) - 2 : e.anal.from - 2, a.at(r, 0.55), e.anal.to + 3, a.bot(r) + e.anal.h + 2);
    case "tail":
      return s(e.body - 5, a.tailTop - 2, 102, a.tailBot + 2);
  }
}
function d(e, t, a) {
  let l = Math.max(e.w, t),
    r = Math.max(e.h, a);
  return {
    x: e.x + e.w / 2 - l / 2,
    y: e.y + e.h / 2 - r / 2,
    w: l,
    h: r,
  };
}
let h = (e) => Math.round(10 * e) / 10,
  c = 2 * i.length,
  f =
    ((t = (0, o.seeded)(77)),
    Array.from(
      {
        length: 16,
      },
      () => ({
        x: h(40 + 720 * t()),
        r: h(5 + 12 * t()),
        d: h(0.6 * t()),
        dur: h(1.6 + 1.2 * t()),
      }),
    )),
  p = `
.la-part{cursor:pointer;outline:none}
.la-part .la-outline{opacity:.6;transition:opacity .2s, stroke .2s}
.la-part:hover .la-outline{opacity:1}
.la-part:focus-visible .la-outline{opacity:1;stroke:#2c6fb5;stroke-width:4}
.la-part[aria-disabled="true"]{cursor:default}
@media (prefers-reduced-motion: no-preference){
.la-glow{animation:la-glow 1.4s ease-in-out infinite}
.la-bub{animation:la-bub var(--dur) ease-out var(--d) both}
.la-pop{transform-box:fill-box;transform-origin:center;animation:la-pop .45s ease-out both}
.la-swim{animation:la-swim 4s ease-in-out infinite}
}
@keyframes la-glow{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes la-bub{0%{transform:translateY(0);opacity:0}15%{opacity:.9}100%{transform:translateY(-360px);opacity:0}}
@keyframes la-pop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}
@keyframes la-swim{0%,100%{transform:translate(0,0)}50%{transform:translate(-6px,3px)}}
`;
function CM_() {
  return (
    <ul className="mt-4 grid gap-2 text-sm leading-snug">
      {i.map((e) => (
        <li key={e.id} className="rounded-2xl border border-line bg-paper px-4 py-3">
          <span className="font-semibold">
            {e.sides[0].name}
            {" or "}
            {e.sides[1].name.toLowerCase()}?
          </span>{" "}
          {e.why}
        </li>
      ))}
    </ul>
  );
}
let u = i.map((e) => ({
  id: e.id,
  fish: e.sides.map((e) => e.slug ?? e.look),
}));
/** @param {{ start?: string }} props — the fish whose look-alike pair opens first. */
export const FishLookalikes = function ({ start: e }) {
  let t,
    u,
    x = "la" + (0, r.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    [k, b] = (0, r.useState)(1),
    [y, g] = (0, r.useState)(0),
    [$, j] = (0, r.useState)("name"),
    [w, v] = (0, r.useState)(null),
    [M, L] = (0, r.useState)(0),
    [N, W] = (0, r.useState)(0),
    [A, C] = (0, r.useState)(0),
    [Q, S] = (0, r.useState)(0),
    [F, T] = (0, r.useState)(false),
    B = (0, r.useRef)(null),
    P = () => requestAnimationFrame(() => B.current?.focus()),
    z = (function (e, t) {
      let a = (function (e) {
          if (!e) return -1;
          let t = i.findIndex((t) => t.id === e);
          return t >= 0 ? t : i.findIndex((t) => t.sides.some((t) => t.slug === e || t.look === e));
        })(t),
        l = i.map((e, t) => t).filter((e) => e !== a),
        r = (0, o.seeded)(7919 * e + 13);
      for (let e = l.length - 1; e > 0; e--) {
        let t = Math.floor(r() * (e + 1));
        [l[e], l[t]] = [l[t], l[e]];
      }
      return a >= 0 ? [a, ...l] : l;
    })(k, e),
    Z = i[z[y]],
    q = 0.5 > (0, o.seeded)(101 * k + 17 * y + 5)() ? 0 : 1,
    I = 2 * y + +("tell" === $) + 1,
    O = (e, t) => {
      if (!w)
        if (
          (v({
            pick: t,
            ok: e,
          }),
          C((e) => e + 1),
          e)
        ) {
          L((e) => e + 1);
          let e = N + 1;
          (W(e), e >= 3 && S((e) => e + 1));
        } else W(0);
    },
    E = Z.sides[q];
  t =
    "name" === $
      ? w
        ? w.ok
          ? `It's a ${E.name.toLowerCase()}. ${Z.why}`
          : `This one is a ${E.name.toLowerCase()}. ${Z.why}`
        : "Which one is this? Look closely, then tap the matching picture."
      : w
        ? w.ok
          ? `That's the tell: ${s[w.pick]}. ${Z.why}`
          : `The tell is ${s[Z.tells[0]]}. ${Z.why}`
        : "Tap the part that tells them apart.";
  let D = (e) => (0, o.lookHeight)(e),
    K = (e, t, l) => {
      let r = d(n(e, t), 12, 10);
      return (
        <g key={`g${t}`} className="la-glow" pointerEvents="none">
          <rect
            x={h(r.x * l - 6)}
            y={h(r.y * l - 6)}
            width={h(r.w * l + 12)}
            height={h(r.h * l + 12)}
            rx="18"
            fill="#ffe7a0"
            fillOpacity="0.18"
            stroke="#e8b534"
            strokeWidth="5"
            filter={`url(#${x}-blur)`}
          />
          <rect
            x={h(r.x * l - 6)}
            y={h(r.y * l - 6)}
            width={h(r.w * l + 12)}
            height={h(r.h * l + 12)}
            rx="18"
            fill="none"
            stroke="#d9a441"
            strokeWidth="3"
          />
        </g>
      );
    },
    R = (e, t, l, r, o, s, i, d, c) => {
      let f = n(e, t),
        p = "chin" === t || "lowerFins" === t,
        m = 13 * r.length + 28,
        u = Math.min(Math.max((f.x + f.w / 2) * l, m / 2 + 8 - s), 792 - s - m / 2),
        x = Math.min(Math.max(p ? (f.y + f.h) * l + 28 : f.y * l - 24, d + 22 - i), c - 22 - i);
      return (
        <g key={o} transform={`translate(${h(u)} ${h(x)})`} pointerEvents="none">
          <g className="la-pop">
            <rect x={h(-m / 2)} y="-19" width={h(m)} height="38" rx="19" fill="#1f2a22" />
            <text y="8" textAnchor="middle" fontSize="24" fontWeight="700" fill="#fffdf8">
              {r}
            </text>
          </g>
        </g>
      );
    },
    G = (e) => (
      <g>
        <rect width="800" height={e} fill={`url(#${x}-water)`} />
        {[0.22, 0.5, 0.78].map((t, l) => (
          <path
            key={l}
            d={`M0 ${h(e * t)} q100 -10 200 0 t200 0 t200 0 t200 0`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.35"
          />
        ))}
      </g>
    ),
    H = (
      <defs>
        <linearGradient id={`${x}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6f2f4" />
          <stop offset="1" stopColor="#cfe2e8" />
        </linearGradient>
        <filter id={`${x}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
    ),
    Y = Q > 0 && w?.ok && N >= 3 && (
      <g key={`b${Q}`} pointerEvents="none">
        {f.map((e, t) => (
          <g key={t} transform={`translate(${e.x} 520)`}>
            <circle
              className="la-bub"
              r={e.r}
              fill="#ffffff"
              fillOpacity="0.35"
              stroke="#ffffff"
              strokeWidth="2"
              style={{
                "--d": `${e.d}s`,
                "--dur": `${e.dur}s`,
              }}
            />
          </g>
        ))}
      </g>
    );
  if ("name" === $) {
    let e = o.LOOKS[E.look],
      t = D(e),
      l = Math.min(6.6, 250 / (t.bottom - t.top)),
      r = 400 - 50 * l,
      s = 170 - ((t.top + t.bottom) / 2) * l;
    u = (
      <svg
        viewBox="0 0 800 340"
        className="block h-auto w-full select-none"
        role="img"
        aria-label={w ? `A ${E.name.toLowerCase()}` : "A mystery fish"}
      >
        {H}
        {G(340)}
        <g transform={`translate(${h(r)} ${h(s)})`}>
          <g className="la-swim">
            <g transform={`scale(${h(100 * l) / 100})`}>
              <o.FishArt look={e} seed={3 * y + 11} outline={1.6} />
            </g>
            {w && K(e, Z.crop, l)}
            {w && E.tags[Z.crop] && R(e, Z.crop, l, E.tags[Z.crop], "t", r, s, 0, 340)}
          </g>
        </g>
        {!w && (
          <g transform="translate(740 56)">
            <circle r="30" fill="#1f2a22" />
            <text y="13" textAnchor="middle" fontSize="38" fontWeight="800" fill="#fffdf8">
              ?
            </text>
          </g>
        )}
        {Y}
      </svg>
    );
  } else {
    let e = Z.sides.map((e) => o.LOOKS[e.look]),
      t = e.map(D),
      l = Math.min(7.3, 196 / Math.max(...t.map((e) => e.bottom - e.top))),
      r = 406 - 50 * l;
    u = (
      <svg
        viewBox="0 0 800 520"
        className="block h-auto w-full select-none"
        role="group"
        aria-label={`A ${Z.sides[0].name.toLowerCase()} above a ${Z.sides[1].name.toLowerCase()}`}
      >
        {H}
        {G(520)}
        <line x1="30" x2="770" y1="260" y2="260" stroke="#ffffff" strokeWidth="3" strokeDasharray="4 10" opacity="0.8" />
        {Z.sides.map((i, c) => {
          let f,
            p,
            m = e[c],
            u = t[c],
            x = 260 * c + 146 - ((u.top + u.bottom) / 2) * l,
            k = null !== w;
          return (
            <g key={c}>
              <g transform={`translate(16 ${260 * c + 12})`}>
                <rect width={h(15 * i.name.length + 32)} height="44" rx="22" fill="#fffdf8" stroke="#d9cfb8" strokeWidth="2" />
                <text x="16" y="30" fontSize="27" fontWeight="800" fill="#1f2a22">
                  {i.name}
                </text>
                {i.aka && (
                  <text
                    x={h(15 * i.name.length + 44)}
                    y="30"
                    fontSize="21"
                    fontWeight="600"
                    fill="#34443a"
                    stroke="#eef6f7"
                    strokeWidth="4"
                    paintOrder="stroke"
                  >
                    {i.aka}
                  </text>
                )}
              </g>
              <g transform={`translate(${h(r)} ${h(x)})`}>
                <g transform={`scale(${h(100 * l) / 100})`}>
                  <o.FishArt look={m} seed={c + 2} outline={1.5} />
                </g>
                {Z.parts.map((e) => {
                  let t = d(n(m, e), 0, 0),
                    r = d(
                      {
                        x: t.x * l,
                        y: t.y * l,
                        w: t.w * l,
                        h: t.h * l,
                      },
                      90,
                      88,
                    ),
                    o = () => O(Z.tells.includes(e), e),
                    c = w && !w.ok && w.pick === e;
                  return (
                    <g
                      key={e}
                      role="button"
                      tabIndex={k ? -1 : 0}
                      aria-disabled={!!k || undefined}
                      aria-label={`${s[e]} of the ${i.name.toLowerCase()}`}
                      className="la-part"
                      onClick={k ? undefined : o}
                      onKeyDown={(e) => {
                        k || ("Enter" !== e.key && " " !== e.key) || (e.preventDefault(), o());
                      }}
                    >
                      <rect x={h(r.x)} y={h(r.y)} width={h(r.w)} height={h(r.h)} fill="#ffffff" fillOpacity="0.001" />
                      {!k && (
                        <rect
                          className="la-outline"
                          x={h(t.x * l - 4)}
                          y={h(t.y * l - 4)}
                          width={h(t.w * l + 8)}
                          height={h(t.h * l + 8)}
                          rx="14"
                          fill="#ffffff"
                          fillOpacity="0.12"
                          stroke="#4f7d8f"
                          strokeWidth="2.5"
                          strokeDasharray="7 7"
                        />
                      )}
                      {c && (
                        <rect
                          x={h(t.x * l - 4)}
                          y={h(t.y * l - 4)}
                          width={h(t.w * l + 8)}
                          height={h(t.h * l + 8)}
                          rx="14"
                          fill="none"
                          stroke="#c8352b"
                          strokeWidth="4"
                        />
                      )}
                    </g>
                  );
                })}
                {k &&
                  ((f = w.ok ? w.pick : Z.tells[0]),
                  (p = i.tags[f]),
                  (
                    <>
                      {K(m, f, l)}
                      {p && R(m, f, l, p, `t${c}`, r, x, 260 * c + 58, 260 * c + 258)}
                    </>
                  ))}
              </g>
            </g>
          );
        })}
        {Y}
      </svg>
    );
  }
  if (F) {
    let e =
      M >= c - 1
        ? "Sharp eyes! You could teach this at the dock."
        : M >= 0.7 * c
          ? "Great spotting — you know your tells."
          : M >= 0.4 * c
            ? "Good going. Play again and the tells will stick."
            : "These are tricky — that's why people mix them up. Play again!";
    return (
      <div className="text-ink">
        <style>{p}</style>
        <div className="rounded-2xl border border-line bg-paper-2 p-6 text-center">
          <p className="eyebrow text-moss">All seven pairs</p>
          <p className="font-display mt-1 text-5xl font-semibold">
            {M}{" "}
            <span className="text-2xl text-ink-2">
              {"out of "}
              {c}
            </span>
          </p>
          <p aria-live="polite" className="mt-2 text-lg">
            {e}
          </p>
          <button
            type="button"
            onClick={() => {
              (b((e) => e + 1), g(0), j("name"), v(null), L(0), W(0), C(0), T(false), P());
            }}
            className="mt-4 min-h-12 rounded-full bg-moss px-6 py-2 text-lg font-semibold text-white shadow-sm transition active:scale-95"
          >
            Play again
          </button>
        </div>
        <CM_ />
      </div>
    );
  }
  return (
    <div className="text-ink">
      <style>{p}</style>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink-2">
          {"Round "}
          {I}
          {" of "}
          {c}
          {" · "}
          <span className="text-ink">{"name" === $ ? "Name it" : "Spot the tell"}</span>
        </p>
        <div className="flex items-center gap-2">
          {N >= 3 && (
            <span key={Q} className="rounded-full bg-gold/25 px-3 py-1 text-sm font-semibold text-ink">
              {N}
              {" in a row!"}
            </span>
          )}
          <span className="rounded-full bg-moss px-3 py-1 text-sm font-semibold text-white" aria-label={`Score: ${M} out of ${A}`}>
            {"Score "}
            {M}/{A}
          </span>
        </div>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from(
          {
            length: c,
          },
          (e, t) => (
            <span
              key={t}
              className={`h-1.5 flex-1 rounded-full ${t < I - 1 || (t === I - 1 && w) ? "bg-moss" : t === I - 1 ? "bg-gold" : "bg-line"}`}
            />
          ),
        )}
      </div>
      <h3 ref={B} tabIndex={-1} className="font-display mt-3 text-2xl font-semibold leading-tight outline-none">
        {"name" === $ ? "Which one is this?" : "What tells them apart?"}
      </h3>
      <div className="mt-2 overflow-hidden rounded-2xl border border-line">{u}</div>
      {"name" === $ && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3" role="group" aria-label="Pick the fish">
          {Z.sides.map((e, t) => {
            let l = o.LOOKS[e.look],
              r = n(l, Z.crop),
              s = Math.max(r.w + 6, (r.h + 6) * 1.8),
              i = s / 1.8,
              d = `${h(r.x + r.w / 2 - s / 2)} ${h(r.y + r.h / 2 - i / 2)} ${h(s)} ${h(i)}`,
              c = w ? (t === q ? "right" : w.pick === t ? "wrong" : "idle") : "idle";
            return (
              <button
                key={t}
                type="button"
                onClick={() => O(t === q, t)}
                disabled={null !== w}
                aria-label={`${e.name}${e.aka ? `, ${e.aka}` : ""}: ${e.clue}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border-2 text-left transition active:scale-[.98] ${"right" === c ? "border-moss bg-moss/10" : "wrong" === c ? "border-rust bg-rust/10" : "border-line bg-paper hover:border-moss/60"} disabled:cursor-default`}
              >
                <svg viewBox={d} className="block aspect-[1.8] w-full bg-[#e3eff2]" aria-hidden="true" focusable="false">
                  <o.FishArt look={l} seed={t + 40} outline={1.4} />
                </svg>
                <span className="block px-3 py-2">
                  <span className="font-display block text-lg font-semibold leading-tight sm:text-xl">
                    {"right" === c ? "✓ " : "wrong" === c ? "✗ " : ""}
                    {e.name}
                  </span>
                  {e.aka && <span className="block text-xs text-ink-2">{e.aka}</span>}
                  <span className="mt-0.5 block text-sm leading-snug text-ink-2">{e.clue}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-3 rounded-2xl bg-paper-2 px-4 py-3">
        <p aria-live="polite" className="min-h-[3rem] text-base leading-snug">
          {w && <span className={`font-semibold ${w.ok ? "text-moss" : "text-rust"}`}>{w.ok ? "Right! " : "Not quite. "}</span>}
          {t}
        </p>
        {w && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => {
                (v(null), "name" === $ ? j("tell") : y < z.length - 1 ? (g(y + 1), j("name")) : T(true), P());
              }}
              className="min-h-12 rounded-full bg-moss px-5 py-2 font-semibold text-white shadow-sm transition active:scale-95"
            >
              {"name" === $ ? "Next: spot the tell →" : y < z.length - 1 ? "Next pair →" : "See my score"}
            </button>
            {Z.sides
              .filter((e) => e.slug)
              .map((e) => (
                <l.default
                  key={e.name}
                  href={`/wildlife/${e.slug}`}
                  className="inline-flex min-h-10 items-center text-sm font-semibold text-azure underline-offset-4 hover:underline"
                >
                  {e.name}
                  {" →"}
                </l.default>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export { u as LOOKALIKE_PAIRS };
