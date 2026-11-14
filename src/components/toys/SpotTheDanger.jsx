"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 13397 (exports: SpotTheDanger)
import * as s from "react";
let r = [
    {
      id: "wild-fennel",
      about: "wild fennel",
      chip: "Fennel or hemlock",
      names: ["Wild fennel", "Poison hemlock"],
      warn: "deadly",
      intro:
        "Wild fennel and poison hemlock grow in the same fields. Both have lacy leaves and umbrella-shaped flower heads. What tells them apart?",
      act: {
        kind: "smell",
        label: "Crush a leaf and smell",
        done: "Sniff! Fennel smells sweet, like black liquorice. Hemlock smells musty. Now tap the tell — the thing that tells them apart.",
      },
      nudge: "First, crush a leaf of each and smell it.",
      ask: "Tap where the smell is.",
      tell: "smell",
      parts: {
        smell: {
          name: "the smell",
          hint: "",
        },
        flowers: {
          name: "the flowers",
          hint: "Fennel's flowers are yellow and hemlock's are white — but young plants have no flowers yet. What works on every plant?",
        },
        leaves: {
          name: "the leaves",
          hint: "Both have lacy, feathery leaves. That's why people mix them up.",
        },
        stem: {
          name: ["the smooth blue-green stem", "the blotchy stem"],
          hint: [
            "Good eye — fennel's stem is smooth and blue-green, and hemlock's has purple blotches. A real clue, but check the one thing that works every time.",
            "Good eye — purple blotches are a hemlock warning sign. But both stems can be hollow, so check the one thing that works every time.",
          ],
        },
      },
      right:
        "The smell! Fennel smells of anise, like black liquorice. Poison hemlock smells musty — and can kill. No anise smell? Walk away.",
      says: ["smells of anise", "smells musty"],
      note: "Grown-ups: wear gloves to crush a leaf you aren't sure of.",
    },
    {
      id: "wild-grape",
      about: "wild grapes",
      chip: "Grape or moonseed",
      names: ["Wild grape", "Canada moonseed"],
      warn: "poisonous",
      intro:
        "Wild grapes and Canada moonseed both scramble over fences and hang out blue-black berries in late summer. What tells them apart?",
      act: {
        kind: "cut",
        label: "Cut a berry open",
        done: "Snip! Look at the seeds inside each berry — then tap the tell.",
      },
      nudge: "Cut a berry of each open and look inside.",
      ask: "Tap the seeds.",
      tell: "seeds",
      parts: {
        seeds: {
          name: "the seeds",
          hint: "",
        },
        berries: {
          name: "the bunch of berries",
          hint: "From the outside they look almost the same — dark blue with a dusty bloom. The difference is inside.",
          after: "Now look inside, in the circle.",
        },
        leaf: {
          name: "the leaf",
          hint: "Grape leaves are toothed and moonseed's are smooth-edged — a clue, but leaves can fool you. The surest test is inside a berry.",
        },
        climb: {
          name: ["the forked tendril", "the twining stem"],
          hint: "Good clue! Grapes grab on with curly, forked tendrils; moonseed has none and twines its whole stem. Now check inside a berry — that's the surest test.",
        },
      },
      right:
        "The seeds! A grape has plump, teardrop-shaped seeds. Moonseed has one flat seed curled like a crescent moon — and it can kill.",
      says: ["teardrop seeds", "one crescent seed"],
    },
    {
      id: "ramps",
      about: "ramps",
      chip: "Ramps or lily of the valley",
      names: ["Ramps (wild leeks)", "Lily of the valley"],
      warn: "poisonous",
      intro: "In the spring woods, ramps and lily of the valley both push up smooth, broad leaves. What tells them apart?",
      act: {
        kind: "smell",
        label: "Crush a leaf and smell",
        done: "Sniff! Ramps smell strongly of onion and garlic. Lily of the valley doesn't. Now tap the tell.",
      },
      nudge: "First, crush a leaf of each and smell it.",
      ask: "Tap where the smell is.",
      tell: "smell",
      parts: {
        smell: {
          name: "the smell",
          hint: "",
        },
        leaves: {
          name: "the leaves",
          hint: "Both have smooth, broad leaves — exactly why people mix them up.",
        },
        base: {
          name: ["the reddish stalk and bulb", "the wrapped base"],
          hint: "Good eye — lily of the valley's leaves come wrapped in a sheath, and many ramps have a reddish stalk. But some ramps have white stalks. What's the sure test?",
        },
      },
      right:
        "The smell! A ramp smells strongly of onion and garlic. Lily of the valley doesn't — and it's poisonous. No onion smell, no ramp.",
      note: "Crush a fresh leaf every time: once your fingers smell of onion, everything will.",
      says: ["smells of onion", "no onion smell"],
    },
    {
      id: "fiddleheads",
      about: "fiddleheads",
      chip: "Fiddlehead or bracken",
      names: ["Ostrich fern fiddleheads", "Bracken"],
      warn: "not for eating",
      intro:
        "In spring, ferns come up as curled coils called fiddleheads. Only ostrich fern is the one people cook. How do you know it from bracken?",
      act: {
        kind: "cut",
        label: "Snip the stems",
        done: "Snip! Look at the cut end of each stem — then tap the tell.",
      },
      nudge: "Snip a stem of each and look at the cut end.",
      ask: "Tap the cut stems.",
      tell: "end",
      parts: {
        end: {
          name: "the cut stem",
          hint: "",
        },
        coil: {
          name: ["the coils", "the curled tips"],
          hint: "Both start as curly coils — that's the trap. Look closer.",
        },
        cover: {
          name: ["the papery brown scales", "the fuzzy stalk"],
          hint: [
            "Papery brown scales that rub off are an ostrich fern clue. Now look at the stems.",
            "Good clue — bracken is fuzzy, and it splits into three like a bird's claw. Now look at the stems.",
          ],
        },
        stem: {
          name: "the stems",
          hint: "Good eye — the stems hold the answer. Snip them and look at the ends.",
          tellAfter: true,
        },
      },
      right:
        "The stem! Ostrich fern's is smooth, with a deep U-shaped groove like celery. Bracken's is fuzzy and round — and it isn't eaten.",
      note: "Bracken holds a chemical linked to cancer. Even ostrich fern fiddleheads must be boiled 15 minutes — never eaten raw.",
      says: ["smooth, U-shaped groove", "fuzzy, round stem"],
    },
    {
      id: "elderflower",
      about: "elderflower",
      chip: "Elder or water hemlock",
      names: ["Elderflower", "Water hemlock"],
      warn: "deadly",
      intro: "Elder and water hemlock both hold up flat heads of tiny white flowers, often in the same wet ditches. What tells them apart?",
      act: {
        kind: "cut",
        label: "Cut the stems",
        done: "Snip! Look inside each stem — then tap the tell.",
      },
      nudge: "Cut the stems and look inside.",
      ask: "Tap the cut stems.",
      tell: "inside",
      parts: {
        inside: {
          name: "inside the stem",
          hint: "",
        },
        flowers: {
          name: "the flower head",
          hint: "Look again — both have flat heads of tiny white flowers. That's exactly why this pair is so dangerous.",
        },
        leaves: {
          name: "the leaves",
          hint: "Both have leaves made of many leaflets. Look lower down.",
        },
        stem: {
          name: ["the woody stems", "the soft stem"],
          hint: "Good eye — the stems hold the answer. Cut them and look inside.",
          tellAfter: true,
        },
      },
      right:
        "The stem! Elder is a woody shrub with bark. Water hemlock is a soft plant whose hollow base is split into chambers — one of the most poisonous plants in North America.",
      says: ["woody, with bark", "soft, with chambers"],
      note: "Never cut or dig water hemlock yourself — its roots are the most poisonous part. We cut it here so you don't have to.",
    },
    {
      id: "morel",
      about: "morels",
      chip: "Morel or false morel",
      names: ["True morel", "False morel"],
      warn: "can kill",
      intro: "In spring woods, true morels and false morels both come up with wrinkly caps. What tells them apart?",
      act: {
        kind: "cut",
        label: "Slice them in half",
        done: "Slice! Look inside each one, from the tip of the cap to the bottom of the stem — then tap the tell.",
      },
      nudge: "Slice each one in half, top to bottom.",
      ask: "Tap the insides.",
      tell: "inside",
      parts: {
        inside: {
          name: "the inside",
          hint: "",
        },
        cap: {
          name: ["the honeycomb cap", "the brain-like cap"],
          hint: "Good eye — a morel's cap is pitted like a honeycomb, and a false morel's is wrinkled like a brain. But the sure test is inside.",
        },
        stem: {
          name: "the stem",
          hint: "Look again — the outside of the stem won't tell you. Look inside.",
        },
      },
      right:
        "The inside! A true morel is hollow in one piece, from the tip of the cap to the bottom of the stem. A false morel is stuffed or chambered — and can kill.",
      note: "Slice every one. Even true morels are poisonous raw — they must be well cooked.",
      says: ["hollow in one piece", "stuffed and chambered"],
    },
    {
      id: "chanterelle",
      about: "chanterelles",
      chip: "Chanterelle or jack-o'-lantern",
      names: ["Golden chanterelle", "Jack-o'-lantern"],
      warn: "poisonous",
      intro:
        "Chanterelles and jack-o'-lantern mushrooms are both bright orange-gold and come up in summer and fall. What tells them apart?",
      act: {
        kind: "look",
        label: "Look underneath",
        done: "Peek! Look at the underside of each cap, close up — then tap the tell.",
      },
      nudge: "Look underneath the caps.",
      ask: "Tap the underside.",
      tell: "gills",
      parts: {
        gills: {
          name: "under the cap, close up",
          hint: "",
        },
        cap: {
          name: "the colour",
          hint: "Both are orange-gold. Colour won't tell you.",
        },
        base: {
          name: ["growing alone from the ground", "the bunch growing from wood"],
          hint: "Good clue — jack-o'-lanterns grow in bunches from wood. But the wood can be buried, so they can look as if they grow from soil. Look underneath.",
        },
        under: {
          name: "under the cap",
          hint: "Good eye — the answer is underneath. Take a closer look.",
          tellAfter: true,
        },
      },
      right:
        "The underside! A chanterelle has blunt, forking ridges, like melted wax. A jack-o'-lantern has sharp, thin gills — and makes people very sick.",
      says: ["blunt, forking ridges", "sharp, thin gills"],
    },
    {
      id: "rose-hips",
      about: "rose hips",
      chip: "Rose hip or nightshade",
      names: ["Rose hips", "Bittersweet nightshade"],
      warn: "poisonous",
      intro:
        "In autumn, rose hips and bittersweet nightshade berries are both shiny red and hang in the same hedges. What tells them apart?",
      act: {
        kind: "look",
        label: "Look closer",
        done: "Look at the tip of each red fruit — the end away from its stalk. Then tap the tell.",
      },
      nudge: "Look closely at the tip of each fruit.",
      ask: "Tap the tip of the fruit.",
      tell: "tip",
      parts: {
        tip: {
          name: "the tip of the fruit, close up",
          hint: "",
        },
        fruit: {
          name: "the red fruit",
          hint: "They're both shiny red. Look closer at the tip of each one.",
          tellAfter: true,
        },
        stem: {
          name: "the prickly stem",
          hint: "Good clue — a rose's stem is prickly, and nightshade is a smooth vine. But look at the fruit itself.",
        },
        flower: {
          name: "the purple flower",
          hint: "Good clue — purple star flowers belong to nightshade. But the flowers aren't always out. Look at the fruit.",
        },
        leaves: {
          name: "the leaves",
          hint: "Leaves change colour and fall in autumn. Look at the fruit.",
        },
      },
      right:
        "The tip! A rose hip usually wears a little crown of dried sepals. Bittersweet nightshade berries are smooth at the tip — and poisonous.",
      says: ["a crown at the tip", "a smooth tip"],
    },
  ],
  o = (e, t) => ("string" == typeof e ? e : e[t]),
  i = "#3a3a2c",
  n = (e) => Math.round(10 * e) / 10;
function l(e) {
  let t = e;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
function a(e, t, s, r) {
  let o = 1 - r;
  return [o * o * e[0] + 2 * o * r * t[0] + r * r * s[0], o * o * e[1] + 2 * o * r * t[1] + r * r * s[1]];
}
function d(e, t) {
  let s = `M${n(e[0][0])} ${n(e[0][1])}`;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = e[(r + 1) % e.length],
      l = i[0] - o[0],
      a = i[1] - o[1],
      d = Math.hypot(l, a) || 1,
      h = o[0] + 0.72 * l + (a / d) * t,
      c = o[1] + 0.72 * a - (l / d) * t;
    s += ` L${n(h)} ${n(c)} L${n(i[0])} ${n(i[1])}`;
  }
  return s + " Z";
}
function h(e, t, s, r = 0) {
  let o = t[0] - e[0],
    i = t[1] - e[1],
    l = Math.hypot(o, i) || 1,
    a = -i / l,
    d = o / l,
    c = [e[0] + 0.35 * o + a * s + a * r, e[1] + 0.35 * i + d * s + d * r],
    f = [e[0] + 0.35 * o - a * s + a * r, e[1] + 0.35 * i - d * s + d * r],
    x = [e[0] + 0.8 * o + a * s * 0.45 + a * r, e[1] + 0.8 * i + d * s * 0.45 + d * r],
    p = [e[0] + 0.8 * o - a * s * 0.45 + a * r, e[1] + 0.8 * i - d * s * 0.45 + d * r],
    k = (e) => `${n(e[0])} ${n(e[1])}`;
  return `M${k(e)} C${k(c)} ${k(x)} ${k(t)} C${k(p)} ${k(f)} ${k(e)} Z`;
}
function c(e, t, s, r = 14) {
  let o = t[0] - e[0],
    i = t[1] - e[1],
    n = Math.hypot(o, i) || 1,
    l = -i / n,
    a = o / n,
    d = (e) => s * Math.sin(Math.PI * Math.pow(e, 0.8)) * (1 - 0.15 * e),
    h = [];
  for (let t = 0; t <= r; t++) {
    let s = t / r;
    h.push([e[0] + o * s + l * d(s), e[1] + i * s + a * d(s)]);
  }
  for (let t = r - 1; t > 0; t--) {
    let s = t / r;
    h.push([e[0] + o * s - l * d(s), e[1] + i * s - a * d(s)]);
  }
  return h;
}
function CF_({ x: e, y: s, text: r, bg: o, fg: i = "#fffdf8", size: l = 28 }) {
  let a = r.length * l * 0.56 + 30;
  return (
    <g>
      <rect x={n(e - a / 2)} y={s - 0.8 * l} width={n(a)} height={1.45 * l} rx={0.72 * l} fill={o} stroke="#fffdf8" strokeWidth={3} />
      <text x={e} y={s + 0.28 * l} textAnchor="middle" fontSize={l} fontWeight={800} fill={i}>
        {r}
      </text>
    </g>
  );
}
function CX_() {
  return (
    <g>
      <rect width={400} height={440} fill="#eef3e6" />
      <circle cx={340} cy={60} r={30} fill="#fbf1c8" />
      <path d="M0 392 C 100 384 220 398 400 388 V440 H0 Z" fill="#c9b98c" />
      <path d="M0 404 C 120 398 260 410 400 402 V440 H0 Z" fill="#b6a57a" />
      {[30, 78, 128, 262, 318, 370].map((e) => (
        <path key={e} d={`M${e} 398 l-6 -16 M${e} 398 l2 -18 M${e} 398 l8 -14`} stroke="#8aa05a" strokeWidth={2.5} strokeLinecap="round" />
      ))}
    </g>
  );
}
function CP_() {
  return (
    <g>
      <rect width={400} height={440} fill="#eaf1ee" />
      <path d="M0 380 C 100 372 250 386 400 378 V440 H0 Z" fill="#9fc3cf" />
      <path d="M0 396 C 120 390 260 400 400 394 V440 H0 Z" fill="#8ab3c1" />
      {[60, 150, 290, 350].map((e, s) => (
        <path
          key={e}
          d={`M${e - 24} ${404 + (s % 2) * 14} q12 -5 24 0 t24 0`}
          stroke="#e7f2f5"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {[34, 50, 360, 378].map((e, s) => (
        <path
          key={e}
          d={`M${e} 392 C ${e + (s % 2 ? 4 : -4)} 330 ${e} 300 ${e + (s % 2 ? 8 : -6)} 250`}
          stroke="#7a9a4a"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}
function CK_({ y: e = 360, seed: s = 4 }) {
  let r = l(s),
    o = Array.from(
      {
        length: 16,
      },
      () => ({
        x: n(400 * r()),
        y: n(e + 10 + r() * (430 - e)),
        r: n(180 * r()),
        c: ["#b07a3a", "#9a6a34", "#c49350", "#8a5a2c"][Math.floor(4 * r())],
      }),
    );
  return (
    <g>
      <rect width={400} height={440} fill="#eef0e2" />
      <path d="M40 0 V200 M360 0 V160" stroke="#d9dccb" strokeWidth={26} />
      <path d={`M0 ${e} C 120 ${e - 8} 260 ${e + 8} 400 ${e - 4} V440 H0 Z`} fill="#8b6b4a" />
      {o.map((e, s) => (
        <ellipse key={s} cx={e.x} cy={e.y} rx={14} ry={6} fill={e.c} transform={`rotate(${e.r} ${e.x} ${e.y})`} opacity={0.9} />
      ))}
    </g>
  );
}
function CJ_() {
  return (
    <g>
      <rect width={400} height={440} fill="#edf1e4" />
      <path d="M0 372 C 120 360 260 378 400 366 V440 H0 Z" fill="#7c6247" />
      {[
        [40, 376, 50],
        [120, 380, 44],
        [290, 378, 56],
        [370, 372, 40],
      ].map(([e, s, r], o) => (
        <g key={o}>
          <ellipse cx={e} cy={s} rx={r} ry={16} fill="#6f9a3e" />
          <ellipse cx={e - 8} cy={s - 5} rx={0.6 * r} ry={8} fill="#86b04c" />
        </g>
      ))}
    </g>
  );
}
function CU_() {
  let e = l(9),
    s = Array.from(
      {
        length: 14,
      },
      () => ({
        x: n(400 * e()),
        y: n(318 + 110 * e()),
        r: n(3 + 5 * e()),
      }),
    );
  return (
    <g>
      <rect width={400} height={440} fill="#eef0e2" />
      <path d="M0 300 C 120 294 260 306 400 298 V440 H0 Z" fill="#7e5f45" />
      <path d="M0 300 C 120 294 260 306 400 298" stroke="#a58659" strokeWidth={8} fill="none" />
      {s.map((e, s) => (
        <circle key={s} cx={e.x} cy={e.y} r={e.r} fill="#5e4533" opacity={0.6} />
      ))}
      {[40, 96, 250, 350].map((e, s) => (
        <ellipse
          key={e}
          cx={e}
          cy={296}
          rx={16}
          ry={5}
          fill={s % 2 ? "#b58440" : "#9a6a34"}
          transform={`rotate(${30 * s - 20} ${e} 296)`}
        />
      ))}
    </g>
  );
}
function CM_({ x: e, y: s, leaf: r }) {
  return (
    <g transform={`translate(${e} ${s})`}>
      <path d="M-9 -1 l7 -10 l11 3 l1 10 l-10 5 z" fill={r} stroke={i} strokeWidth={2} strokeLinejoin="round" />
      <path
        d="M-48 40 C -44 20 -30 4 -14 -1 C -5 -3 1 4 -3 11 C -7 17 -18 21 -26 31 C -30 37 -32 42 -33 46 Z"
        fill="#f1c7a4"
        stroke={i}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <ellipse cx={-9} cy={3} rx={5.5} ry={3.6} fill="#fbe3d6" stroke="#c99b7d" strokeWidth={1.2} transform="rotate(-35 -9 3)" />
      <path d="M-30 24 q5 3 9 0" stroke="#c99b7d" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <path
        d="M48 44 C 44 24 30 9 14 4 C 5 2 -1 9 3 16 C 7 22 18 25 26 35 C 30 41 32 46 33 50 Z"
        fill="#ebbd99"
        stroke={i}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <ellipse cx={9} cy={8} rx={5.5} ry={3.6} fill="#fbe3d6" stroke="#c99b7d" strokeWidth={1.2} transform="rotate(35 9 8)" />
      <path d="M21 29 q5 -3 9 0" stroke="#c99b7d" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  );
}
function CY_({ x: e, y: s, word: r, good: o }) {
  let i = o ? "#7a9a1e" : "#8a7896",
    l = 28 * r.length * 0.56 + 30,
    a = Math.min(400 - l / 2 - 6, Math.max(l / 2 + 6, e));
  return (
    <g>
      {[-24, 0, 24].map((r, o) => (
        <g key={o} transform={`translate(${e + r} ${s})`}>
          <g
            className="sd-waft"
            style={{
              animationDelay: `${0.4 * o}s`,
            }}
          >
            <path d="M0 0 c-9 -11 9 -20 0 -31 c-9 -11 9 -20 0 -31" fill="none" stroke={i} strokeWidth={5} strokeLinecap="round" />
          </g>
        </g>
      ))}
      <g transform={`translate(${n(a)} ${s - 96})`}>
        <g className="sd-pop">
          <CF_ x={0} y={0} text={r} bg={o ? "#6d8a1c" : "#6f6480"} />
        </g>
      </g>
    </g>
  );
}
function CG_({ id: e, x: s, y: r, r: o, from: l, handle: a, children: d }) {
  return (
    <g>
      {l && <line x1={l[0]} y1={l[1]} x2={s} y2={r} stroke={i} strokeWidth={3} strokeDasharray="7 6" strokeLinecap="round" />}
      <g transform={`translate(${s} ${r})`}>
        <g className="sd-pop">
          {a && (
            <path
              d={`M${n(0.68 * o)} ${n(0.68 * o)} L${n(1.25 * o)} ${n(1.25 * o)}`}
              stroke="#6b4a2c"
              strokeWidth={14}
              strokeLinecap="round"
            />
          )}
          <circle r={o + 7} fill="#fffdf8" stroke={i} strokeWidth={3} />
          <clipPath id={e}>
            <circle r={o} />
          </clipPath>
          <g clipPath={`url(#${e})`}>
            <rect x={-o} y={-o} width={2 * o} height={2 * o} fill="#f6f0e0" />
            {d}
          </g>
          <circle r={o} fill="none" stroke={i} strokeWidth={2} />
          {a && (
            <path
              d={`M${n(-(0.55 * o))} ${n(-(0.3 * o))} A${n(0.7 * o)} ${n(0.7 * o)} 0 0 1 ${n(-(0.2 * o))} ${n(-(0.62 * o))}`}
              stroke="#ffffff"
              strokeWidth={5}
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
            />
          )}
        </g>
      </g>
    </g>
  );
}
function $({ y: e }) {
  return (
    <g transform={`translate(0 ${e})`}>
      <g className="sd-knife">
        <path d="M0 -7 L70 -7 Q84 -6 90 0 Q84 6 70 6 L0 6 Z" fill="#d7dde2" stroke={i} strokeWidth={2.5} strokeLinejoin="round" />
        <rect x={-46} y={-9} width={48} height={18} rx={7} fill="#7a4a2a" stroke={i} strokeWidth={2.5} />
      </g>
    </g>
  );
}
let CB_ = (0, s.createContext)(null);
function L({ part: e, ring: r, children: i }) {
  let n = (0, s.useContext)(CB_);
  if (!n) return <g>{i}</g>;
  let [l, a, d, h] = r,
    c = e === n.pair.tell,
    f = n.pair.parts[e],
    x = f ? o(f.name, n.side) : e,
    p = n.wobble && n.wobble.side === n.side && n.wobble.part === e ? n.wobble.n : 0;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${n.pair.names[n.side]}: ${x}`}
      className="sd-hot"
      onClick={() => n.pick(n.side, e)}
      onKeyDown={(t) => {
        ("Enter" === t.key || " " === t.key) && (t.preventDefault(), n.pick(n.side, e));
      }}
    >
      {c && n.found && (
        <g className="sd-glow">
          <ellipse cx={l} cy={a} rx={d + 16} ry={h + 16} fill={`url(#${n.uid}glow)`} />
        </g>
      )}
      <ellipse cx={l} cy={a} rx={Math.max(d, 52)} ry={Math.max(h, 52)} fill="#ffffff" fillOpacity={0} />
      <g key={p} className={p ? "sd-wob" : undefined}>
        {i}
      </g>
      {c && n.found && <ellipse cx={l} cy={a} rx={d + 4} ry={h + 4} fill="none" stroke="#d9a441" strokeWidth={6} />}
      <ellipse
        className="sd-focus"
        cx={l}
        cy={a}
        rx={d + 4}
        ry={h + 4}
        fill="none"
        stroke="#2c6fb5"
        strokeWidth={5}
        strokeDasharray="12 9"
      />
    </g>
  );
}
function M({ x: e, y: s, dir: r, len: o = 1, color: i = "#5f9a58" }) {
  let l = [e, s],
    d = [e + 44 * r * o, s - 74 * o],
    h = [e + 124 * r * o, s - 66 * o],
    c = `M${n(l[0])} ${n(l[1])} Q${n(d[0])} ${n(d[1])} ${n(h[0])} ${n(h[1])}`;
  for (let e of [0.2, 0.36, 0.52, 0.68, 0.84, 0.97]) {
    let t = a(l, d, h, e),
      s = 46 * o * (1 - 0.5 * e);
    for (let e of [
      [t[0] + r * s * 0.35, t[1] - 0.9 * s],
      [t[0] + r * s * 0.85, t[1] - 0.45 * s],
      [t[0] + r * s * 0.8, t[1] + 0.45 * s],
    ]) {
      let s = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2];
      c += ` M${n(t[0])} ${n(t[1])} Q${n(s[0] + 4 * r)} ${n(s[1] - 3)} ${n(e[0])} ${n(e[1])} M${n(s[0])} ${n(s[1])} l${n(10 * r * o)} ${n(-9 * o)} M${n(s[0])} ${n(s[1])} l${n(12 * r * o)} ${n(5 * o)}`;
    }
  }
  return <path d={c} stroke={i} strokeWidth={2.4} strokeLinecap="round" fill="none" />;
}
function W({ x: e, y: s, dir: r, len: o = 1, color: i = "#4f8f3e" }) {
  let l = [e, s],
    d = [e + 50 * r * o, s - 64 * o],
    h = [e + 126 * r * o, s - 58 * o],
    c = [];
  for (let [e, s] of [0.18, 0.33, 0.48, 0.63, 0.78, 0.92].entries()) {
    let f = a(l, d, h, s),
      x = 40 * o * (1 - 0.5 * s);
    for (let s of [1, -1]) {
      let l = [f[0] + r * x * 0.55, f[1] - s * x * 0.8];
      c.push(<path key={`r${e}${s}`} d={`M${n(f[0])} ${n(f[1])} L${n(l[0])} ${n(l[1])}`} stroke={i} strokeWidth={1.8} />);
      let a = (180 * Math.atan2(l[1] - f[1], l[0] - f[0])) / Math.PI;
      for (let r of [0.3, 0.52, 0.74, 0.96]) {
        let d = [f[0] + (l[0] - f[0]) * r, f[1] + (l[1] - f[1]) * r];
        for (let l of 0.96 === r ? [0] : [1, -1]) {
          let h = n(a + 55 * l),
            f = n(d[0]),
            x = n(d[1]);
          c.push(
            <g key={`l${e}${s}${r}${l}`} transform={`translate(${f} ${x}) rotate(${h}) scale(${n(o)})`}>
              <path d="M0 0 L3 -2.6 L5 -0.6 L7.5 -2 L8.6 0 L7.5 2 L5 0.6 L3 2.6 Z" fill={i} />
            </g>,
          );
        }
      }
    }
  }
  return (
    <g>
      <path
        d={`M${n(l[0])} ${n(l[1])} Q${n(d[0])} ${n(d[1])} ${n(h[0])} ${n(h[1])}`}
        stroke={i}
        strokeWidth={3.2}
        fill="none"
        strokeLinecap="round"
      />
      {c}
    </g>
  );
}
function CW_({ x: e, y: s, w: r, h: o, flower: i, edge: l, ray: a = "#7a9a5a", n: d = 9, dot: h = 4.6 }) {
  let c = Array.from(
    {
      length: d,
    },
    (t, i) => {
      let n = i / (d - 1) - 0.5;
      return [e + n * r, s - o + n * n * o * 0.7];
    },
  );
  return (
    <g>
      {c.map((r, o) => (
        <path key={`r${o}`} d={`M${e} ${s} L${n(r[0])} ${n(r[1])}`} stroke={a} strokeWidth={2.4} strokeLinecap="round" />
      ))}
      {c.map((e, s) => (
        <g key={`u${s}`} transform={`translate(${n(e[0])} ${n(e[1])})`}>
          {[-60, -30, 0, 30, 60].map((e) => (
            <g key={e} transform={`rotate(${e})`}>
              <line x1={0} y1={0} x2={0} y2={-12} stroke={a} strokeWidth={1.6} />
              <circle cx={0} cy={-13} r={h} fill={i} stroke={l} strokeWidth={1.2} />
            </g>
          ))}
          <circle r={h} fill={i} stroke={l} strokeWidth={1.2} />
        </g>
      ))}
    </g>
  );
}
let C = [
  [0, 0],
  [-16, 4],
  [16, 4],
  [-8, 22],
  [10, 24],
  [-24, 22],
  [26, 20],
  [0, 42],
  [-16, 40],
  [16, 42],
  [-6, 60],
  [8, 62],
  [0, 80],
];
function CV_({ x: e, y: s }) {
  return (
    <g transform={`translate(${e} ${s})`}>
      <path
        d="M0 -40 C 2 -26 0 -12 0 0 M0 -20 L-18 2 M0 -20 L20 2 M0 10 L-10 36 M0 10 L12 38 M0 40 L0 70"
        stroke="#6b5a3a"
        strokeWidth={2.6}
        fill="none"
        strokeLinecap="round"
      />
      {C.map(([e, s], r) => (
        <g key={r} transform={`translate(${e} ${s})`}>
          <circle r={11.5} fill="#3a3263" stroke={i} strokeWidth={1.6} />
          <circle cx={-3.5} cy={-3.5} r={4.5} fill="#9b96c4" opacity={0.75} />
          <circle cx={2} cy={5} r={1.4} fill="#221c3d" />
        </g>
      ))}
    </g>
  );
}
let N = [
    [128, 180],
    [150, 170],
    [178, 172],
    [200, 190],
    [212, 214],
    [214, 236],
    [196, 238],
    [186, 250],
    [184, 272],
    [170, 296],
    [150, 314],
    [132, 300],
    [112, 290],
    [96, 268],
    [80, 250],
    [66, 232],
    [70, 212],
    [84, 192],
    [104, 178],
  ],
  Z = [
    [130, 178],
    [168, 172],
    [206, 196],
    [212, 232],
    [196, 266],
    [168, 300],
    [136, 314],
    [102, 300],
    [76, 268],
    [64, 232],
    [74, 198],
    [100, 180],
  ];
function A({ x: e, y: s, r, color: o, dark: l, scales: a }) {
  return (
    <g transform={`translate(${e} ${s})`}>
      <circle r={r} fill={o} stroke={i} strokeWidth={2.5} />
      <path
        d={`M${n(0.1 * r)} ${n(-(0.05 * r))} C ${n(0.5 * r)} ${n(-(0.4 * r))} ${n(0.6 * r)} ${n(0.45 * r)} ${n(0.05 * r)} ${n(0.55 * r)} C ${n(-(0.6 * r))} ${n(0.6 * r)} ${n(-(0.8 * r))} ${n(-(0.2 * r))} ${n(-(0.4 * r))} ${n(-(0.6 * r))} C ${n(-(0.1 * r))} ${n(-(0.85 * r))} ${n(0.5 * r)} ${n(-(0.9 * r))} ${n(0.85 * r)} ${n(-(0.45 * r))}`}
        stroke={l}
        strokeWidth={2.6}
        fill="none"
        strokeLinecap="round"
      />
      {a &&
        [
          [-0.7, -0.5, -30],
          [0.6, 0.55, 40],
          [-0.2, 0.8, 10],
        ].map(([e, s, o], i) => (
          <path
            key={i}
            d="M0 -6 L6 5 L-6 5 Z"
            fill="#a8784a"
            stroke="#6b4a2a"
            strokeWidth={1}
            transform={`translate(${n(e * r)} ${n(s * r)}) rotate(${o})`}
          />
        ))}
    </g>
  );
}
let T = [
  {
    d: "M188 382 C 170 320 128 260 112 212",
    c: [112, 196, 24],
  },
  {
    d: "M200 380 C 196 300 186 220 180 164",
    c: [180, 146, 26],
  },
  {
    d: "M212 382 C 236 330 270 260 282 206",
    c: [282, 190, 24],
  },
  {
    d: "M220 384 C 250 368 290 340 318 312",
    c: [324, 298, 17],
  },
];
function P({ base: e, tip: s, n: r, color: o, toothDepth: l = 2.5, w: a = 11 }) {
  let h = [],
    f = s[0] - e[0],
    x = s[1] - e[1],
    p = Math.hypot(f, x) || 1,
    k = -x / p,
    j = f / p;
  for (let s = 1; s <= r; s++) {
    let n = s / (r + 0.6),
      p = [e[0] + f * n, e[1] + x * n];
    for (let e of [1, -1]) {
      let r = [p[0] + k * e * 34 + 0.12 * f, p[1] + j * e * 34 + 0.12 * x];
      h.push(<path key={`${s}${e}`} d={d(c(p, r, a, 8), l)} fill={o} stroke={i} strokeWidth={1.8} strokeLinejoin="round" />);
    }
  }
  return (
    h.push(
      <path
        key="t"
        d={d(c([e[0] + 0.86 * f, e[1] + 0.86 * x], [s[0] + 0.25 * f, s[1] + 0.25 * x], a, 8), l)}
        fill={o}
        stroke={i}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />,
    ),
    (
      <g>
        <path d={`M${e[0]} ${e[1]} L${n(s[0])} ${n(s[1])}`} stroke="#557a33" strokeWidth={3} strokeLinecap="round" />
        {h}
      </g>
    )
  );
}
let S = (() => {
    let e = l(21),
      t = [];
    for (; t.length < 150;) {
      let s = 2 * e() - 1,
        r = 2 * e() - 1;
      s * s + r * r > 1 || t.push([n(205 + 98 * s), n(80 + 20 * r - (1 - s * s) * 8)]);
    }
    return t;
  })(),
  B = "M200 62 C 238 66 262 150 258 250 L 142 250 C 138 150 162 66 200 62 Z",
  G = "M150 246 C 150 290 138 330 140 360 Q 200 378 260 360 C 262 330 250 290 250 246 Z",
  F = (e) => (e <= 62 ? 0 : e >= 200 ? 58 : 58 * Math.sin(((e - 62) / 138) * (Math.PI / 2))),
  z = (() => {
    let e = l(12),
      t = [-1.05, -0.72, -0.4, -0.08, 0.24, 0.56, 0.88, 1.2],
      s = t.map(() =>
        Array.from(
          {
            length: 20,
          },
          () => (e() - 0.5) * 5,
        ),
      ),
      r = (e, r) => 200 + t[e] * F(r) + s[e][Math.floor((r - 60) / 10)],
      o = "";
    t.forEach((e, t) => {
      for (let e = 70; e <= 250; e += 10) o += `${70 === e ? " M" : " L"}${n(r(t, e))} ${e}`;
    });
    for (let s = 0; s < t.length - 1; s++)
      for (let t = 84 + (s % 2) * 13; t < 250; t += 26) {
        let i = n(t + (e() - 0.5) * 6);
        o += ` M${n(r(s, t))} ${i} L${n(r(s + 1, t))} ${n(i + (e() - 0.5) * 6)}`;
      }
    return o.trim();
  })(),
  I = [84, 104, 124, 146, 168, 190, 212, 234].flatMap((e, t) => [
    {
      x: n(200 - F(e) - 1),
      y: e + (t % 2) * 4,
    },
    {
      x: n(200 + F(e) + 1),
      y: e + ((t + 1) % 2) * 4,
    },
  ]),
  Q =
    "M118 196 C 98 160 114 108 156 98 C 176 74 232 74 250 100 C 292 110 306 164 284 200 C 294 234 256 262 222 252 C 198 266 150 262 134 244 C 108 240 104 214 118 196 Z",
  D = (() => {
    let e = l(27),
      t = [];
    for (let s = 96; s < 262; s += 26)
      for (let r = 104; r < 300; r += 34) {
        let o = r + 16 * e(),
          i = s + 12 * e(),
          l = e() * Math.PI * 2,
          a = `M${n(o)} ${n(i)}`;
        for (let t = 0; t < 4; t++) {
          let t = o + 8 * Math.cos((l += (e() - 0.5) * 2.4)),
            s = i + 8 * Math.sin(l);
          ((l += (e() - 0.5) * 1.6), (o = t + 8 * Math.cos(l)), (i = s + 8 * Math.sin(l)), (a += ` Q${n(t)} ${n(s)} ${n(o)} ${n(i)}`));
        }
        t.push(a);
      }
    return t;
  })();
function H({ x: e, y: s, s: r = 1 }) {
  return (
    <g transform={`translate(${e} ${s}) scale(${r})`}>
      {[-72, -36, 0, 36, 72].map((e) => (
        <g key={e} transform={`rotate(${e})`}>
          <path d="M0 0 C -6 7 -5 17 1 26 C 3 18 5 8 0 0 Z" fill="#5d4a26" stroke="#34260f" strokeWidth={1.2} strokeLinejoin="round" />
          <path d="M0 3 C 0 10 0 16 1 22" stroke="#8a7440" strokeWidth={1.1} fill="none" />
        </g>
      ))}
      <ellipse rx={6} ry={3.4} fill="#7a3a24" stroke="#34260f" strokeWidth={1.2} />
    </g>
  );
}
function O({ x: e, y: s, s: r = 1 }) {
  return (
    <g>
      <path d={`M${e} ${s - 26 * r} l0 -18`} stroke="#6b3a2a" strokeWidth={2.6} strokeLinecap="round" />
      <ellipse cx={e} cy={s} rx={19 * r} ry={25 * r} fill="#d6432a" stroke={i} strokeWidth={2.4} />
      <ellipse cx={n(e - 6 * r)} cy={n(s - 9 * r)} rx={n(4 * r)} ry={n(8 * r)} fill="#f29a7e" opacity={0.8} />
      <H x={e} y={n(s + 23 * r)} s={0.8 * r} />
    </g>
  );
}
let V = {
    "wild-fennel": [
      function ({ shown: e }) {
        return (
          <g>
            <CX_ />
            <L part="stem" ring={[200, 350, 36, 66]}>
              <path d="M200 440 C 197 380 203 300 200 128" stroke={i} strokeWidth={17} strokeLinecap="round" fill="none" />
              <path d="M200 440 C 197 380 203 300 200 128" stroke="#7fa98e" strokeWidth={12} strokeLinecap="round" fill="none" />
              <path d="M197 436 C 195 380 200 300 198 132" stroke="#b4d0bb" strokeWidth={2.5} fill="none" />
              {[300, 232, 176].map((e) => (
                <path
                  key={e}
                  d={`M190 ${e + 16} C 186 ${e + 6} 190 ${e - 2} 200 ${e - 6} C 210 ${e - 2} 214 ${e + 6} 210 ${e + 16}`}
                  fill="#9cc0a5"
                  stroke={i}
                  strokeWidth={2}
                />
              ))}
            </L>
            <L part="leaves" ring={[110, 246, 84, 62]}>
              <M x={196} y={300} dir={-1} len={1.1} />
              <M x={204} y={232} dir={1} len={0.95} />
              <M x={196} y={176} dir={-1} len={0.72} />
            </L>
            <L part="flowers" ring={[200, 82, 108, 48]}>
              <CW_ x={200} y={130} w={176} h={66} flower="#f2c94c" edge="#a88222" ray="#86a86e" />
            </L>
            {e && (
              <L part="smell" ring={[318, 300, 68, 96]}>
                <CM_ x={318} y={384} leaf="#8fbf6a" />
                <CY_ x={318} y={358} word="anise!" good />
              </L>
            )}
          </g>
        );
      },
      function ({ shown: e }) {
        return (
          <g>
            <CX_ />
            <L part="stem" ring={[200, 350, 36, 66]}>
              <path d="M200 440 C 202 380 197 300 200 128" stroke={i} strokeWidth={17} strokeLinecap="round" fill="none" />
              <path d="M200 440 C 202 380 197 300 200 128" stroke="#79a35c" strokeWidth={12} strokeLinecap="round" fill="none" />
              {[
                [199, 410, 8],
                [202, 372, 10],
                [198, 334, 7],
                [201, 290, 9],
                [199, 250, 6],
                [201, 212, 8],
                [200, 176, 6],
                [200, 150, 5],
              ].map(([e, s, r], o) => (
                <ellipse key={o} cx={e} cy={s} rx={4.6} ry={r} fill="#7b2d5b" opacity={0.9} />
              ))}
              <path d="M200 240 C 230 210 256 196 282 184" stroke={i} strokeWidth={9} fill="none" strokeLinecap="round" />
              <path d="M200 240 C 230 210 256 196 282 184" stroke="#79a35c" strokeWidth={5.5} fill="none" strokeLinecap="round" />
              <ellipse cx={236} cy={210} rx={3} ry={5} fill="#7b2d5b" transform="rotate(50 236 210)" />
            </L>
            <L part="leaves" ring={[110, 246, 84, 62]}>
              <W x={196} y={300} dir={-1} len={1.08} />
              <W x={204} y={286} dir={1} len={0.8} />
              <W x={196} y={196} dir={-1} len={0.7} />
            </L>
            <L part="flowers" ring={[200, 82, 108, 48]}>
              <CW_ x={200} y={130} w={170} h={64} flower="#fbfaf2" edge="#8f8f80" ray="#6f9a55" />
              <CW_ x={282} y={186} w={80} h={40} n={6} flower="#fbfaf2" edge="#8f8f80" ray="#6f9a55" dot={4} />
            </L>
            {e && (
              <L part="smell" ring={[318, 300, 68, 96]}>
                <CM_ x={318} y={384} leaf="#5f9a48" />
                <CY_ x={318} y={358} word="musty!" good={false} />
              </L>
            )}
          </g>
        );
      },
    ],
    "wild-grape": [
      function ({ shown: e, uid: s }) {
        return (
          <g>
            <CX_ />
            <L part="climb" ring={[178, 70, 58, 46]}>
              <path d="M160 126 C 166 108 170 96 174 86" stroke="#7d9a40" strokeWidth={4} fill="none" strokeLinecap="round" />
              <path
                d="M174 86 C 164 70 150 64 140 56 C 128 48 136 36 146 42 C 152 46 148 54 142 52"
                stroke="#7d9a40"
                strokeWidth={3.4}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M174 86 C 186 70 200 62 212 52 C 224 42 218 30 208 34 C 200 38 204 48 212 46"
                stroke="#7d9a40"
                strokeWidth={3.4}
                fill="none"
                strokeLinecap="round"
              />
            </L>
            <path d="M-10 142 C 100 124 220 132 410 104" stroke={i} strokeWidth={19} fill="none" strokeLinecap="round" />
            <path d="M-10 142 C 100 124 220 132 410 104" stroke="#6b4a33" strokeWidth={14} fill="none" strokeLinecap="round" />
            {[20, 60, 100, 146, 196, 240, 300, 350].map((e, s) => (
              <path
                key={e}
                d={`M${e} ${n(138 - 0.08 * e + (s % 2) * 3)} l18 ${s % 2 ? -2 : 1}`}
                stroke="#b08b68"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            ))}
            <L part="leaf" ring={[140, 244, 76, 70]}>
              <path d="M160 128 C 150 146 138 162 130 182" stroke="#6f8a3a" strokeWidth={4} fill="none" strokeLinecap="round" />
              <path d={d(N, 5)} fill="#6aa447" stroke={i} strokeWidth={2.4} strokeLinejoin="round" />
              <path
                d="M130 184 L150 300 M131 190 L200 226 M130 190 L76 228 M140 240 L182 262 M138 236 L96 262"
                stroke="#4d8a34"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
              />
            </L>
            <L part="berries" ring={[288, 214, 54, 72]}>
              <CV_ x={288} y={172} />
            </L>
            {e && (
              <>
                <$ y={236} />
                <L part="seeds" ring={[206, 362, 72, 72]}>
                  <CG_ id={`${s}l0`} x={206} y={362} r={66} from={[272, 250]}>
                    <circle r={52} fill="#3a3263" />
                    <circle r={45} fill="#b9c98f" />
                    <circle r={45} fill="#d6e2b1" opacity={0.5} />
                    {[0, 120, 240].map((e) => (
                      <g key={e} transform={`rotate(${e}) translate(0 -16)`}>
                        <path d="M0 16 C -11 4 -11 -14 0 -16 C 11 -14 11 4 0 16 Z" fill="#8a5a2c" stroke={i} strokeWidth={2} />
                        <ellipse cx={-3} cy={-6} rx={3} ry={5} fill="#c28d58" />
                      </g>
                    ))}
                  </CG_>
                </L>
              </>
            )}
          </g>
        );
      },
      function ({ shown: e, uid: s }) {
        let r = (e) => 140 - 0.075 * e,
          o = "";
        for (let e = -4; e <= 404; e += 4) o += `${o ? " L" : "M"}${e} ${n(r(e) + 14 * Math.sin((Math.PI * e) / 50))}`;
        return (
          <g>
            <CX_ />
            <path d="M-10 140 L410 110" stroke="#8d8a80" strokeWidth={12} strokeLinecap="round" />
            <path d="M-10 140 L410 110" stroke="#b4b0a4" strokeWidth={4} strokeLinecap="round" />
            <L part="climb" ring={[178, 118, 70, 36]}>
              <path d={o} stroke="#6f7a3a" strokeWidth={4.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {[0, 100, 200, 300, 400].map((e) => (
                <g key={e}>
                  <path d={`M${e - 9} ${n(r(e - 9))} L${e + 9} ${n(r(e + 9))}`} stroke="#8d8a80" strokeWidth={12} strokeLinecap="butt" />
                  <path d={`M${e - 9} ${n(r(e - 9))} L${e + 9} ${n(r(e + 9))}`} stroke="#b4b0a4" strokeWidth={4} strokeLinecap="butt" />
                </g>
              ))}
            </L>
            <L part="leaf" ring={[140, 244, 76, 70]}>
              <path d="M150 124 C 144 150 136 176 132 204" stroke="#6f7a3a" strokeWidth={4} fill="none" strokeLinecap="round" />
              <path
                d={`M${Z.map((e) => `${e[0]} ${e[1]}`).join(" L")} Z`}
                fill="#72a64d"
                stroke={i}
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
              <path
                d="M132 204 L136 306 M132 206 L200 214 M132 206 L70 220 M132 208 L186 280 M132 208 L86 284"
                stroke="#548e3a"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
              />
              <circle cx={132} cy={205} r={3.5} fill="#6f7a3a" />
            </L>
            <L part="berries" ring={[288, 214, 54, 72]}>
              <CV_ x={288} y={172} />
            </L>
            {e && (
              <>
                <$ y={236} />
                <L part="seeds" ring={[206, 362, 72, 72]}>
                  <CG_ id={`${s}l1`} x={206} y={362} r={66} from={[272, 250]}>
                    <circle r={52} fill="#3a3263" />
                    <circle r={45} fill="#b3b58a" />
                    <circle r={45} fill="#d6d9b1" opacity={0.45} />
                    <path
                      d="M-28 -12 A 30 30 0 1 0 28 -12 L 18 -8 A 20 20 0 1 1 -18 -8 Z"
                      fill="#c9a86e"
                      stroke={i}
                      strokeWidth={2.2}
                      strokeLinejoin="round"
                    />
                    {[-60, -30, 0, 30, 60].map((e) => (
                      <g key={e} transform={`rotate(${e})`}>
                        <line x1={0} y1={11} x2={0} y2={19} stroke="#8a6a3a" strokeWidth={2.4} strokeLinecap="round" />
                      </g>
                    ))}
                  </CG_>
                </L>
              </>
            )}
          </g>
        );
      },
    ],
    ramps: [
      function ({ shown: e }) {
        return (
          <g>
            <CU_ />
            <L part="base" ring={[160, 326, 50, 66]}>
              {[
                [152, 372, 1],
                [300, 358, 0.75],
              ].map(([e, s, r]) => (
                <g key={e}>
                  <path
                    d={`M${e - 10 * r} ${s + 22 * r} l-8 18 M${e} ${s + 24 * r} l0 20 M${e + 10 * r} ${s + 22 * r} l8 18`}
                    stroke="#d9cdb5"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <ellipse cx={e} cy={s} rx={17 * r} ry={24 * r} fill="#f4efe4" stroke={i} strokeWidth={2.4} />
                  <path
                    d={`M${e - 6 * r} ${s - 18 * r} C ${e - 8 * r} ${s} ${e - 6 * r} ${s + 14 * r} ${e - 2 * r} ${s + 20 * r}`}
                    stroke="#d8cdb6"
                    strokeWidth={2}
                    fill="none"
                  />
                </g>
              ))}
              <path
                d="M146 352 C 144 320 142 290 144 262 M158 352 C 160 320 162 290 162 262"
                stroke={i}
                strokeWidth={11}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M146 352 C 144 320 142 290 144 262 M158 352 C 160 320 162 290 162 262"
                stroke="#9c3b5a"
                strokeWidth={7}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M296 342 C 295 318 295 290 296 250 M305 342 C 306 318 306 290 305 250"
                stroke={i}
                strokeWidth={9}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M296 342 C 295 318 295 290 296 250 M305 342 C 306 318 306 290 305 250"
                stroke="#9c3b5a"
                strokeWidth={5.5}
                strokeLinecap="round"
                fill="none"
              />
            </L>
            <L part="leaves" ring={[150, 160, 104, 82]}>
              <path d={h([144, 264], [60, 96], 44, -8)} fill="#6fb04e" stroke={i} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M144 262 C 120 210 92 150 62 98" stroke="#a7d487" strokeWidth={2.4} fill="none" />
              <path d={h([162, 264], [246, 80], 46, 8)} fill="#7cbb58" stroke={i} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M162 262 C 184 210 214 140 244 84" stroke="#b4dc93" strokeWidth={2.4} fill="none" />
              <path d={h([296, 252], [262, 142], 30, -4)} fill="#6fb04e" stroke={i} strokeWidth={2.2} strokeLinejoin="round" />
              <path d={h([305, 252], [352, 150], 30, 4)} fill="#7cbb58" stroke={i} strokeWidth={2.2} strokeLinejoin="round" />
            </L>
            {e && (
              <L part="smell" ring={[330, 120, 62, 90]}>
                <CM_ x={342} y={176} leaf="#7cbb58" />
                <CY_ x={336} y={150} word="onion!" good />
              </L>
            )}
          </g>
        );
      },
      function ({ shown: e }) {
        return (
          <g>
            <CU_ />
            <L part="base" ring={[160, 326, 50, 66]}>
              <path d="M20 338 C 100 330 200 346 380 334" stroke={i} strokeWidth={14} fill="none" strokeLinecap="round" />
              <path d="M20 338 C 100 330 200 346 380 334" stroke="#c9a676" strokeWidth={9} fill="none" strokeLinecap="round" />
              {[40, 90, 150, 210, 270, 330].map((e) => (
                <path key={e} d={`M${e} 342 l-6 22 M${e} 342 l5 24`} stroke="#d9cdb5" strokeWidth={2} strokeLinecap="round" />
              ))}
              <path
                d="M142 336 C 140 300 142 270 146 240 L166 240 C 168 270 168 300 166 336 Z"
                fill="#d8c59c"
                stroke={i}
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
              <path d="M146 240 C 150 226 160 222 166 240" fill="#c7a7a0" stroke={i} strokeWidth={2} />
              <path d="M150 330 L150 250 M158 330 L160 248" stroke="#bda57a" strokeWidth={1.6} />
              <path
                d="M296 336 C 294 312 295 290 298 262 L312 262 C 314 290 314 312 312 336 Z"
                fill="#d8c59c"
                stroke={i}
                strokeWidth={2.2}
                strokeLinejoin="round"
              />
            </L>
            <L part="leaves" ring={[150, 160, 104, 82]}>
              <path d={h([150, 244], [60, 96], 42, -8)} fill="#5f9d5a" stroke={i} strokeWidth={2.5} strokeLinejoin="round" />
              <path d={h([160, 244], [246, 80], 44, 8)} fill="#6aa864" stroke={i} strokeWidth={2.5} strokeLinejoin="round" />
              {[-10, 0, 10].map((e) => (
                <g key={e}>
                  <path d={`M150 242 C ${126 + e} 200 ${96 + e} 150 62 98`} stroke="#8cc284" strokeWidth={1.4} fill="none" />
                  <path d={`M160 242 C ${188 + e} 196 ${214 + e} 140 244 82`} stroke="#94c98c" strokeWidth={1.4} fill="none" />
                </g>
              ))}
              <path d={h([302, 264], [268, 150], 30, -4)} fill="#5f9d5a" stroke={i} strokeWidth={2.2} strokeLinejoin="round" />
              <path d={h([308, 264], [352, 160], 30, 4)} fill="#6aa864" stroke={i} strokeWidth={2.2} strokeLinejoin="round" />
            </L>
            {e && (
              <L part="smell" ring={[330, 120, 62, 90]}>
                <CM_ x={342} y={176} leaf="#6aa864" />
                <CY_ x={336} y={150} word="no onion" good={false} />
              </L>
            )}
          </g>
        );
      },
    ],
    fiddleheads: [
      function ({ shown: e, uid: s }) {
        return (
          <g>
            <CK_ y={372} seed={5} />
            <path d="M204 380 C 206 320 210 260 214 196" stroke="#4a3322" strokeWidth={6} fill="none" strokeLinecap="round" />
            {[210, 230, 250, 270, 290, 310, 330].map((e, s) => (
              <path
                key={e}
                d={`M${n(206 + (380 - e) * 0.05)} ${e} l${s % 2 ? 12 : -12} -8`}
                stroke="#4a3322"
                strokeWidth={5}
                strokeLinecap="round"
              />
            ))}
            <L part="stem" ring={[196, 290, 64, 48]}>
              {T.map((e, s) => (
                <g key={s}>
                  <path d={e.d} stroke={i} strokeWidth={13} fill="none" strokeLinecap="round" />
                  <path d={e.d} stroke="#86b94a" strokeWidth={8.5} fill="none" strokeLinecap="round" />
                  <path d={e.d} stroke="#5d8f2c" strokeWidth={2} fill="none" strokeLinecap="round" transform="translate(2 0)" />
                </g>
              ))}
            </L>
            <L part="coil" ring={[200, 176, 124, 52]}>
              {T.map((e, s) => (
                <A key={s} x={e.c[0]} y={e.c[1]} r={e.c[2]} color="#8cc04e" dark="#4f8424" scales />
              ))}
            </L>
            <L part="cover" ring={[200, 384, 70, 30]}>
              {[
                [170, 384, -20],
                [190, 378, 10],
                [212, 380, -10],
                [232, 386, 24],
                [200, 392, 0],
                [180, 394, 30],
                [222, 396, -30],
              ].map(([e, s, r], o) => (
                <path
                  key={o}
                  d="M0 -10 L10 8 L-10 8 Z"
                  fill="#b8874f"
                  stroke="#6b4a2a"
                  strokeWidth={1.4}
                  transform={`translate(${e} ${s}) rotate(${r})`}
                />
              ))}
            </L>
            {e && (
              <>
                <$ y={258} />
                <L part="end" ring={[92, 330, 70, 70]}>
                  <path d="M150 262 l14 -6 M152 270 l14 -6" stroke={i} strokeWidth={3} strokeLinecap="round" />
                  <CG_ id={`${s}l0`} x={92} y={330} r={62} from={[154, 264]}>
                    <circle r={70} fill="#e8e2cf" />
                    <path
                      d="M-14 -44 L-14 -10 A 14 14 0 0 0 14 -10 L14 -44 A 46 46 0 1 1 -14 -44 Z"
                      fill="#8cc04e"
                      stroke="#3f6e1d"
                      strokeWidth={3.5}
                      strokeLinejoin="round"
                    />
                    <path d="M-7 -40 L-7 -12 A 7 7 0 0 0 7 -12 L7 -40" fill="none" stroke="#bfe08e" strokeWidth={3} />
                    {[
                      [-22, 10],
                      [22, 10],
                      [0, 26],
                    ].map(([e, s], r) => (
                      <circle key={r} cx={e} cy={s} r={4.5} fill="#5d8f2c" />
                    ))}
                  </CG_>
                </L>
              </>
            )}
          </g>
        );
      },
      function ({ shown: e, uid: s }) {
        let r = (e, s) => {
          let r = [];
          for (let o = 0; o <= s; o++) {
            let i = o / s,
              l = e[0][0] + (e[1][0] - e[0][0]) * i,
              a = e[0][1] + (e[1][1] - e[0][1]) * i;
            (r.push(<path key={`a${o}`} d={`M${n(l - 5)} ${n(a)} l-7 -3`} stroke="#e4ddc8" strokeWidth={2} strokeLinecap="round" />),
              r.push(<path key={`b${o}`} d={`M${n(l + 5)} ${n(a + 3)} l7 -3`} stroke="#e4ddc8" strokeWidth={2} strokeLinecap="round" />));
          }
          return r;
        };
        return (
          <g>
            <CK_ y={372} seed={6} />
            <L part="stem" ring={[200, 290, 64, 48]}>
              <path d="M200 400 C 198 330 202 260 200 214" stroke={i} strokeWidth={13} fill="none" strokeLinecap="round" />
              <path d="M200 400 C 198 330 202 260 200 214" stroke="#8f9448" strokeWidth={8.5} fill="none" strokeLinecap="round" />
            </L>
            <L part="cover" ring={[200, 380, 40, 34]}>
              {r(
                [
                  [200, 396],
                  [200, 220],
                ],
                16,
              )}
            </L>
            <L part="coil" ring={[200, 162, 110, 62]}>
              {[
                ["M200 216 C 180 196 156 178 134 164", [124, 156]],
                ["M200 216 C 202 186 204 156 206 124", [206, 112]],
                ["M200 216 C 222 196 246 180 268 166", [278, 158]],
              ].map(([e, s], r) => (
                <g key={r}>
                  <path d={e} stroke={i} strokeWidth={10} fill="none" strokeLinecap="round" />
                  <path d={e} stroke="#8f9448" strokeWidth={6} fill="none" strokeLinecap="round" />
                  <A x={s[0]} y={s[1]} r={14} color="#9aa24e" dark="#65692c" />
                  {[0.3, 0.55, 0.8].map((e) => (
                    <circle
                      key={e}
                      cx={n(200 + (s[0] - 200) * e)}
                      cy={n(216 + (s[1] - 216) * e)}
                      r={6}
                      fill="#9aa24e"
                      stroke={i}
                      strokeWidth={1.6}
                    />
                  ))}
                </g>
              ))}
              {[
                [124, 156],
                [206, 112],
                [278, 158],
              ].map(([e, s], r) => (
                <g key={r}>
                  {[0, 60, 120, 180, 240, 300].map((r) => (
                    <g key={r} transform={`translate(${e} ${s}) rotate(${r})`}>
                      <path d="M0 -15 l0 -7" stroke="#e4ddc8" strokeWidth={2} strokeLinecap="round" />
                    </g>
                  ))}
                </g>
              ))}
              {r(
                [
                  [200, 214],
                  [132, 166],
                ],
                6,
              )}
              {r(
                [
                  [200, 214],
                  [270, 166],
                ],
                6,
              )}
            </L>
            {e && (
              <>
                <$ y={258} />
                <L part="end" ring={[92, 330, 70, 70]}>
                  <path d="M190 262 l14 -6 M192 270 l14 -6" stroke={i} strokeWidth={3} strokeLinecap="round" />
                  <CG_ id={`${s}l1`} x={92} y={330} r={62} from={[192, 264]}>
                    <circle r={70} fill="#e8e2cf" />
                    {Array.from(
                      {
                        length: 18,
                      },
                      (e, s) => (
                        <g key={s} transform={`rotate(${20 * s})`}>
                          <path d="M0 -44 l0 -12" stroke="#b7ad90" strokeWidth={2.6} strokeLinecap="round" />
                        </g>
                      ),
                    )}
                    <path
                      d="M-44 -6 C -44 -32 -22 -44 0 -44 C 22 -44 44 -32 44 -6 C 44 24 24 44 0 44 C -24 44 -44 24 -44 -6 Z"
                      fill="#9aa24e"
                      stroke="#5d6128"
                      strokeWidth={3.5}
                    />
                    {[
                      [-18, -6],
                      [18, -6],
                      [0, 18],
                    ].map(([e, s], r) => (
                      <circle key={r} cx={e} cy={s} r={4.5} fill="#65692c" />
                    ))}
                  </CG_>
                </L>
              </>
            )}
          </g>
        );
      },
    ],
    elderflower: [
      function ({ shown: e, uid: s }) {
        let r;
        return (
          <g>
            <CX_ />
            <L part="leaves" ring={[84, 232, 70, 44]}>
              <P base={[150, 262]} tip={[56, 222]} n={2} color="#5f9b46" />
              <P base={[258, 262]} tip={[350, 226]} n={2} color="#67a34d" />
              <P base={[143, 196]} tip={[70, 150]} n={2} color="#67a34d" w={9} />
              <P base={[264, 200]} tip={[336, 158]} n={2} color="#5f9b46" w={9} />
            </L>
            <L part="stem" ring={[204, 360, 58, 62]}>
              {["M172 440 C 168 360 150 250 136 150", "M202 440 C 204 340 206 220 205 110", "M232 440 C 240 360 256 260 270 160"].map(
                (e, s) => (
                  <g key={s}>
                    <path d={e} stroke={i} strokeWidth={17} fill="none" strokeLinecap="round" />
                    <path d={e} stroke="#8c7a66" strokeWidth={12} fill="none" strokeLinecap="round" />
                  </g>
                ),
              )}
              {
                ((r = l(33)),
                Array.from(
                  {
                    length: 30,
                  },
                  (e, s) => {
                    let o = s % 3,
                      i = 0.1 + 0.8 * r(),
                      l = [172 - 36 * i, 202 + 3 * i, 232 + 38 * i][o],
                      a = 440 - i * [290, 330, 280][o];
                    return <ellipse key={s} cx={n(l + (r() - 0.5) * 6)} cy={n(a)} rx={2.4} ry={1.3} fill="#dccfb6" />;
                  },
                ))
              }
            </L>
            <L part="flowers" ring={[205, 82, 110, 38]}>
              <path
                d="M205 112 L205 100 M205 104 L150 90 M205 104 L180 86 M205 104 L230 86 M205 104 L262 90 M136 152 L136 140 M270 160 L268 146"
                stroke="#6b7a45"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <ellipse cx={205} cy={78} rx={102} ry={24} fill="#f5edcf" opacity={0.7} />
              {S.map(([e, s], r) => (
                <circle key={r} cx={e} cy={s} r={4} fill="#fbf6df" stroke="#c9bb86" strokeWidth={1} />
              ))}
            </L>
            {e && (
              <>
                <$ y={402} />
                <L part="inside" ring={[318, 318, 70, 70]}>
                  <path d="M192 402 l22 -4" stroke={i} strokeWidth={3} strokeLinecap="round" />
                  <CG_ id={`${s}l0`} x={318} y={318} r={62} from={[212, 400]}>
                    <circle r={70} fill="#e9e3d0" />
                    <circle r={52} fill="#7a5a3f" stroke={i} strokeWidth={2} />
                    {Array.from(
                      {
                        length: 16,
                      },
                      (e, s) => (
                        <g key={s} transform={`rotate(${22.5 * s})`}>
                          <path d="M0 -52 l0 5" stroke="#5a3f2a" strokeWidth={2} />
                        </g>
                      ),
                    )}
                    <circle r={44} fill="#e7d3a6" />
                    <circle r={34} fill="none" stroke="#caa970" strokeWidth={2} />
                    <circle r={26} fill="none" stroke="#caa970" strokeWidth={2} />
                    <circle r={17} fill="#fdfaf0" stroke="#d9c79a" strokeWidth={2} />
                  </CG_>
                </L>
              </>
            )}
          </g>
        );
      },
      function ({ shown: e, uid: s }) {
        return (
          <g>
            <CP_ />
            <L part="leaves" ring={[84, 232, 70, 44]}>
              <P base={[198, 290]} tip={[64, 236]} n={3} color="#5c9a44" w={7} toothDepth={3} />
              <P base={[202, 250]} tip={[340, 206]} n={3} color="#66a24c" w={7} toothDepth={3} />
            </L>
            <L part="stem" ring={[204, 360, 58, 62]}>
              <path d="M200 392 C 198 320 202 220 200 128" stroke={i} strokeWidth={17} fill="none" strokeLinecap="round" />
              <path d="M200 392 C 198 320 202 220 200 128" stroke="#7aa55a" strokeWidth={12} fill="none" strokeLinecap="round" />
              {[380, 350, 320, 290, 256, 222, 190, 160].map((e, s) => (
                <path
                  key={e}
                  d={`M${198 + (s % 2) * 3} ${e} l0 -16`}
                  stroke="#7b2d5b"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.85}
                />
              ))}
              <ellipse cx={200} cy={390} rx={18} ry={12} fill="#86a862" stroke={i} strokeWidth={2.4} />
              <path d="M200 276 C 230 240 256 214 288 196" stroke={i} strokeWidth={9} fill="none" strokeLinecap="round" />
              <path d="M200 276 C 230 240 256 214 288 196" stroke="#7aa55a" strokeWidth={5.5} fill="none" strokeLinecap="round" />
            </L>
            <L part="flowers" ring={[205, 82, 110, 38]}>
              <CW_ x={200} y={130} w={170} h={62} flower="#fbfaf2" edge="#8f8f80" ray="#6f9a55" />
              <CW_ x={288} y={198} w={76} h={36} n={6} flower="#fbfaf2" edge="#8f8f80" ray="#6f9a55" dot={4} />
            </L>
            {e && (
              <>
                <$ y={392} />
                <L part="inside" ring={[318, 318, 70, 70]}>
                  <path d="M188 390 l24 0" stroke={i} strokeWidth={3} strokeLinecap="round" />
                  <CG_ id={`${s}l1`} x={318} y={318} r={62} from={[212, 390]}>
                    <rect x={-66} y={-66} width={132} height={132} fill="#e6eee6" />
                    <path
                      d="M-30 -70 L-30 26 C -30 40 -18 46 0 46 C 18 46 30 40 30 26 L30 -70"
                      fill="#8ab36a"
                      stroke={i}
                      strokeWidth={2.5}
                    />
                    <path d="M-22 -70 L-22 22 C -22 34 -12 38 0 38 C 12 38 22 34 22 22 L22 -70" fill="#f7f2dc" />
                    {[-48, -26, -4, 18].map((e) => (
                      <rect key={e} x={-22} y={e} width={44} height={6} fill="#dfe8c8" stroke="#a5b886" strokeWidth={1.2} />
                    ))}
                    {[-60, -38, -16, 6].map((e) => (
                      <path key={e} d={`M-16 ${e + 4} C -8 ${e} 8 ${e} 16 ${e + 4}`} stroke="#e4dcc0" strokeWidth={2} fill="none" />
                    ))}
                    <path d="M8 26 C 12 34 14 40 10 44 C 6 40 6 32 8 26 Z" fill="#e7c43a" stroke="#a88a1c" strokeWidth={1.4} />
                    {[-24, -6, 14, 28].map((e, s) => (
                      <path
                        key={e}
                        d={`M${e} 44 C ${e - 6 + 3 * s} 56 ${e - 2} 66 ${e + 2} 74`}
                        stroke="#d7c79d"
                        strokeWidth={9}
                        strokeLinecap="round"
                        fill="none"
                      />
                    ))}
                  </CG_>
                </L>
              </>
            )}
          </g>
        );
      },
    ],
    morel: [
      function ({ shown: e, uid: s }) {
        return (
          <g>
            <CK_ y={350} seed={7} />
            <ellipse cx={200} cy={362} rx={80} ry={12} fill="#5e4430" opacity={0.35} />
            {e ? (
              <>
                <L part="inside" ring={[200, 212, 86, 156]}>
                  <path d={G} fill="#f4ecd8" stroke={i} strokeWidth={2.8} strokeLinejoin="round" />
                  <path d={B} fill="#f4ecd8" stroke={i} strokeWidth={2.8} strokeLinejoin="round" />
                  <clipPath id={`${s}cap0s`}>
                    <path d={B} />
                  </clipPath>
                  <g clipPath={`url(#${s}cap0s)`}>
                    {I.map((e, s) => (
                      <circle key={s} cx={e.x} cy={e.y} r={7} fill="#8a643a" />
                    ))}
                  </g>
                  <path
                    d="M200 80 C 228 86 244 150 242 244 C 240 290 236 320 238 346 Q 200 358 162 346 C 164 320 160 290 158 244 C 156 150 172 86 200 80 Z"
                    fill="#c9ad7c"
                    stroke="#8a6a3e"
                    strokeWidth={2}
                  />
                  <path
                    d="M200 92 C 222 98 232 150 230 240 C 228 290 226 318 226 338"
                    stroke="#d9c192"
                    strokeWidth={6}
                    fill="none"
                    strokeLinecap="round"
                  />
                </L>
                <$ y={206} />
              </>
            ) : (
              <>
                <L part="stem" ring={[200, 306, 64, 50]}>
                  <path d={G} fill="#efe5cd" stroke={i} strokeWidth={2.8} strokeLinejoin="round" />
                  <path
                    d="M170 270 C 168 300 164 330 166 352 M228 270 C 232 300 236 330 234 352"
                    stroke="#d8cbaa"
                    strokeWidth={2}
                    fill="none"
                  />
                </L>
                <L part="cap" ring={[200, 156, 70, 96]}>
                  <clipPath id={`${s}cap0`}>
                    <path d={B} />
                  </clipPath>
                  <path d={B} fill="#6e4a28" />
                  <g clipPath={`url(#${s}cap0)`}>
                    <path d={z} stroke="#a4804e" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={z} stroke="#e2c68c" strokeWidth={5.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <path d={B} fill="none" stroke={i} strokeWidth={2.8} strokeLinejoin="round" />
                </L>
              </>
            )}
          </g>
        );
      },
      function ({ shown: e, uid: s }) {
        let r;
        return (
          <g>
            <CK_ y={350} seed={8} />
            <ellipse cx={200} cy={362} rx={80} ry={12} fill="#5e4430" opacity={0.35} />
            {e ? (
              <>
                <L part="inside" ring={[200, 212, 86, 156]}>
                  <path
                    d="M160 240 C 156 290 146 330 148 360 Q 200 376 252 360 C 254 330 244 290 240 240 Z"
                    fill="#f6efe2"
                    stroke={i}
                    strokeWidth={2.8}
                    strokeLinejoin="round"
                  />
                  <path d={Q} fill="#f1e2cc" stroke={i} strokeWidth={2.8} strokeLinejoin="round" />
                  <path d={Q} fill="none" stroke="#94402a" strokeWidth={9} strokeLinejoin="round" opacity={0.8} />
                  {[
                    "M140 190 C 150 170 170 168 176 184 C 180 200 160 210 148 204 Z",
                    "M186 140 C 200 124 222 130 222 148 C 222 164 198 166 190 156 Z",
                    "M232 176 C 246 160 270 168 266 188 C 262 204 240 204 234 194 Z",
                    "M184 200 C 196 190 214 194 214 210 C 214 226 192 228 186 216 Z",
                    "M150 120 C 160 110 176 114 174 126 C 172 138 156 136 150 128 Z",
                  ].map((e, s) => (
                    <path key={s} d={e} fill="#c9a987" stroke="#8a6a4a" strokeWidth={1.6} />
                  ))}
                  {
                    ((r = l(41)),
                    Array.from(
                      {
                        length: 26,
                      },
                      (e, s) => {
                        let o = 168 + 64 * r(),
                          i = 252 + 96 * r();
                        return (
                          <path
                            key={s}
                            d={`M${n(o)} ${n(i)} q6 -4 12 0 t12 0`}
                            stroke="#d9cdb8"
                            strokeWidth={1.8}
                            fill="none"
                            strokeLinecap="round"
                          />
                        );
                      },
                    ))
                  }
                  <path d="M176 262 C 186 276 176 300 190 314 C 200 324 214 312 222 330" stroke="#c9b89a" strokeWidth={2} fill="none" />
                </L>
                <$ y={206} />
              </>
            ) : (
              <>
                <L part="stem" ring={[200, 306, 64, 50]}>
                  <path
                    d="M160 240 C 156 290 146 330 148 360 Q 200 376 252 360 C 254 330 244 290 240 240 Z"
                    fill="#eee2cc"
                    stroke={i}
                    strokeWidth={2.8}
                    strokeLinejoin="round"
                  />
                  <path
                    d="M178 262 C 182 290 172 320 176 350 M214 262 C 210 296 222 324 218 352"
                    stroke="#d6c6a6"
                    strokeWidth={2.4}
                    fill="none"
                  />
                </L>
                <L part="cap" ring={[200, 170, 96, 86]}>
                  <clipPath id={`${s}cap1`}>
                    <path d={Q} />
                  </clipPath>
                  <path d={Q} fill="#94402a" />
                  <g clipPath={`url(#${s}cap1)`}>
                    {D.map((e, s) => (
                      <path key={`s${s}`} d={e} stroke="#4f1d10" strokeWidth={5} fill="none" strokeLinecap="round" />
                    ))}
                    {D.map((e, s) => (
                      <path
                        key={`h${s}`}
                        d={e}
                        stroke="#c0674a"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        transform="translate(-2.5 -3.5)"
                      />
                    ))}
                  </g>
                  <path d={Q} fill="none" stroke={i} strokeWidth={2.8} strokeLinejoin="round" />
                </L>
              </>
            )}
          </g>
        );
      },
    ],
    chanterelle: [
      function ({ shown: e, uid: s }) {
        return (
          <g>
            <CJ_ />
            <L part="base" ring={[198, 372, 64, 26]}>
              <ellipse cx={198} cy={372} rx={40} ry={9} fill="#5b4632" />
              <ellipse cx={186} cy={378} rx={30} ry={10} fill="#86b04c" />
              <ellipse cx={220} cy={380} rx={26} ry={9} fill="#6f9a3e" />
            </L>
            <L part="under" ring={[198, 244, 62, 70]}>
              <path
                d="M100 150 C 120 176 160 240 182 320 L 184 372 L 212 372 L 214 320 C 236 240 272 174 294 146 Z"
                fill="#f0ac34"
                stroke={i}
                strokeWidth={2.8}
                strokeLinejoin="round"
              />
              {[
                "M112 160 C 140 200 170 260 190 330",
                "M140 158 C 160 200 180 260 194 320",
                "M140 158 C 150 176 160 184 164 200",
                "M172 156 C 182 200 192 250 198 320",
                "M204 156 C 204 200 202 260 200 320",
                "M236 156 C 226 200 214 260 206 320",
                "M236 156 C 244 172 248 176 250 190",
                "M266 154 C 244 200 222 260 210 326",
                "M286 150 C 262 196 234 260 214 330",
              ].map((e, s) => (
                <g key={s}>
                  <path d={e} stroke="#d88e1e" strokeWidth={5} fill="none" strokeLinecap="round" />
                  <path d={e} stroke="#f7cd6a" strokeWidth={1.8} fill="none" strokeLinecap="round" transform="translate(-2 0)" />
                </g>
              ))}
            </L>
            <L part="cap" ring={[197, 138, 104, 30]}>
              <path
                d="M94 150 C 100 124 150 120 198 124 C 250 120 300 126 302 146 C 296 162 250 160 198 162 C 150 164 100 166 94 150 Z"
                fill="#f4bb42"
                stroke={i}
                strokeWidth={2.8}
                strokeLinejoin="round"
              />
              <path d="M120 146 C 150 136 250 134 280 144 C 250 152 150 154 120 146 Z" fill="#e7a02e" />
            </L>
            <g>
              <path
                d="M312 312 C 320 326 330 344 332 366 L 344 366 C 346 344 356 326 364 310 Z"
                fill="#f0ac34"
                stroke={i}
                strokeWidth={2.2}
                strokeLinejoin="round"
              />
              <path d="M308 312 C 318 302 358 300 368 310 C 358 318 318 320 308 312 Z" fill="#f4bb42" stroke={i} strokeWidth={2.2} />
            </g>
            {e && (
              <L part="gills" ring={[312, 94, 66, 66]}>
                <CG_ id={`${s}l0`} x={312} y={94} r={58} handle from={[244, 214]}>
                  <rect x={-60} y={-60} width={120} height={120} fill="#f3b545" />
                  {[-46, -22, 2, 26, 50].map((e, s) => (
                    <g key={e}>
                      <path
                        d={`M${e} -64 C ${e + 6} -30 ${e - 6} 10 ${e + 4} 64`}
                        stroke="#d88e1e"
                        strokeWidth={13}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M${e - 3} -64 C ${e + 3} -30 ${e - 9} 10 ${e + 1} 64`}
                        stroke="#fbd67c"
                        strokeWidth={4}
                        fill="none"
                        strokeLinecap="round"
                      />
                      {s % 2 == 0 && (
                        <path
                          d={`M${e + 2} -8 C ${e + 8} 4 ${e + 14} 14 ${e + 16} 30`}
                          stroke="#d88e1e"
                          strokeWidth={10}
                          fill="none"
                          strokeLinecap="round"
                        />
                      )}
                    </g>
                  ))}
                </CG_>
              </L>
            )}
          </g>
        );
      },
      function ({ shown: e, uid: s }) {
        let r = [
          {
            x: 118,
            y: 196,
            w: 52,
            tilt: -12,
          },
          {
            x: 200,
            y: 146,
            w: 60,
            tilt: 0,
          },
          {
            x: 282,
            y: 184,
            w: 54,
            tilt: 12,
          },
          {
            x: 150,
            y: 256,
            w: 42,
            tilt: -8,
          },
          {
            x: 252,
            y: 254,
            w: 42,
            tilt: 8,
          },
        ];
        return (
          <g>
            <CK_ y={372} seed={9} />
            <L part="base" ring={[210, 350, 92, 46]}>
              <path
                d="M120 440 L 132 330 C 170 316 250 316 290 332 L 304 440 Z"
                fill="#7a5638"
                stroke={i}
                strokeWidth={2.8}
                strokeLinejoin="round"
              />
              <ellipse cx={211} cy={330} rx={80} ry={14} fill="#b58a5c" stroke={i} strokeWidth={2.4} />
              <ellipse cx={211} cy={330} rx={50} ry={8} fill="none" stroke="#8a643e" strokeWidth={2} />
              <ellipse cx={211} cy={330} rx={24} ry={4} fill="none" stroke="#8a643e" strokeWidth={2} />
              {[150, 180, 240, 272].map((e) => (
                <path key={e} d={`M${e} 350 l${e < 211 ? -4 : 4} 80`} stroke="#5e4028" strokeWidth={3} />
              ))}
            </L>
            <L part="under" ring={[200, 240, 70, 54]}>
              {r.map((e, s) => (
                <path
                  key={s}
                  d={`M${211 + (s - 2) * 8} 322 C ${n((211 + e.x) / 2)} ${n(e.y + 70)} ${e.x} ${e.y + 30} ${e.x} ${e.y + 10}`}
                  stroke={i}
                  strokeWidth={17}
                  fill="none"
                  strokeLinecap="round"
                />
              ))}
              {r.map((e, s) => (
                <path
                  key={s}
                  d={`M${211 + (s - 2) * 8} 322 C ${n((211 + e.x) / 2)} ${n(e.y + 70)} ${e.x} ${e.y + 30} ${e.x} ${e.y + 10}`}
                  stroke="#ea7c26"
                  strokeWidth={12}
                  fill="none"
                  strokeLinecap="round"
                />
              ))}
            </L>
            <L part="cap" ring={[200, 160, 110, 40]}>
              {r.map((e, s) => (
                <g key={s} transform={`rotate(${e.tilt} ${e.x} ${e.y})`}>
                  <path
                    d={`M${e.x - e.w} ${e.y} Q ${e.x} ${e.y + 0.55 * e.w} ${e.x + e.w} ${e.y} Z`}
                    fill="#f39a4a"
                    stroke={i}
                    strokeWidth={2.2}
                  />
                  {Array.from(
                    {
                      length: 11,
                    },
                    (s, r) => {
                      let o = (r + 1) / 12,
                        i = e.x - e.w + 2 * e.w * o;
                      return (
                        <path
                          key={r}
                          d={`M${n(i)} ${n(e.y + 1)} L${n(e.x + (i - e.x) * 0.2)} ${n(e.y + 0.26 * e.w)}`}
                          stroke="#c55a14"
                          strokeWidth={1.4}
                        />
                      );
                    },
                  )}
                  <path
                    d={`M${e.x - e.w} ${e.y} C ${e.x - e.w} ${n(e.y - 0.6 * e.w)} ${e.x + e.w} ${n(e.y - 0.6 * e.w)} ${e.x + e.w} ${e.y} C ${e.x + 0.5 * e.w} ${e.y + 6} ${e.x - 0.5 * e.w} ${e.y + 6} ${e.x - e.w} ${e.y} Z`}
                    fill="#f0842c"
                    stroke={i}
                    strokeWidth={2.6}
                    strokeLinejoin="round"
                  />
                  <ellipse cx={e.x} cy={n(e.y - 0.3 * e.w)} rx={n(0.35 * e.w)} ry={n(0.1 * e.w)} fill="#d8661c" />
                </g>
              ))}
            </L>
            {e && (
              <L part="gills" ring={[88, 94, 66, 66]}>
                <CG_ id={`${s}l1`} x={88} y={94} r={58} handle from={[150, 204]}>
                  <rect x={-60} y={-60} width={120} height={120} fill="#f7a45a" />
                  {Array.from(
                    {
                      length: 13,
                    },
                    (e, s) => {
                      let r = -60 + 10 * s;
                      return (
                        <g key={s}>
                          <path d={`M${r} -64 L${r + 18} 64`} stroke="#b9500f" strokeWidth={3.4} />
                          <path d={`M${r + 2} -64 L${r + 20} 64`} stroke="#ffd2a2" strokeWidth={1.2} />
                        </g>
                      );
                    },
                  )}
                </CG_>
              </L>
            )}
          </g>
        );
      },
    ],
    "rose-hips": [
      function ({ shown: e, uid: s }) {
        let r = "M40 440 C 60 300 120 160 250 110 C 300 92 340 96 372 112",
          o = (() => {
            let e = [],
              s = [40, 440],
              r = [80, 250],
              o = [250, 110];
            for (let i = 0; i < 20; i++) {
              let l = a(s, r, o, 0.04 + 0.048 * i),
                d = i % 2 ? 1 : -1;
              e.push(
                <path
                  key={i}
                  d={`M${n(l[0])} ${n(l[1])} l${n(7 * d)} ${n(-6)} l${n(-(3 * d))} ${n(7)}`}
                  fill="#c98a6a"
                  stroke="#6b3a2a"
                  strokeWidth={1.2}
                />,
              );
            }
            return e;
          })();
        return (
          <g>
            <CX_ />
            <L part="stem" ring={[78, 360, 46, 62]}>
              <path d={r} stroke={i} strokeWidth={14} fill="none" strokeLinecap="round" />
              <path d={r} stroke="#8e3f2d" strokeWidth={9.5} fill="none" strokeLinecap="round" />
              {o}
            </L>
            <L part="leaves" ring={[134, 236, 56, 46]}>
              <P base={[100, 280]} tip={[180, 206]} n={2} color="#7d9d44" w={10} toothDepth={1.8} />
              <P base={[300, 100]} tip={[350, 40]} n={2} color="#c7a43e" w={9} toothDepth={1.8} />
            </L>
            <L part="fruit" ring={[258, 196, 88, 52]}>
              <path d="M196 150 L 188 172 M250 112 L 262 150 M328 104 L 326 150" stroke="#6b3a2a" strokeWidth={2.4} fill="none" />
              <O x={188} y={196} />
              <O x={262} y={176} s={0.95} />
              <O x={326} y={176} s={0.9} />
            </L>
            {e && (
              <L part="tip" ring={[100, 110, 70, 70]}>
                <CG_ id={`${s}l0`} x={100} y={110} r={62} handle from={[188, 222]}>
                  <rect x={-64} y={-64} width={128} height={128} fill="#eef3e6" />
                  <path d="M0 -70 L0 -44" stroke="#6b3a2a" strokeWidth={5} />
                  <ellipse cx={0} cy={-6} rx={32} ry={40} fill="#d6432a" stroke={i} strokeWidth={3} />
                  <ellipse cx={-10} cy={-20} rx={6} ry={13} fill="#f29a7e" opacity={0.8} />
                  <H x={0} y={32} s={1.5} />
                </CG_>
              </L>
            )}
          </g>
        );
      },
      function ({ shown: e, uid: s }) {
        return (
          <g>
            <CX_ />
            <L part="leaves" ring={[330, 330, 50, 60]}>
              <path
                d="M370 440 C 340 360 360 300 300 250 C 240 200 200 160 120 150 C 80 146 50 126 30 100"
                stroke="#5f6a36"
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
              />
              {[
                [330, 330, 390, 300, 1],
                [322, 272, 262, 312, 1],
                [150, 150, 128, 198, 0],
                [80, 134, 40, 170, 0],
              ].map(([e, s, r, o, n], l) => (
                <g key={l}>
                  <path d={h([e, s], [r, o], 20)} fill="#4f7f3a" stroke={i} strokeWidth={2.2} strokeLinejoin="round" />
                  {n ? (
                    <>
                      <ellipse
                        cx={e - 4}
                        cy={s - 14}
                        rx={6}
                        ry={10}
                        fill="#4f7f3a"
                        stroke={i}
                        strokeWidth={1.8}
                        transform={`rotate(-40 ${e - 4} ${s - 14})`}
                      />
                      <ellipse
                        cx={e + 10}
                        cy={s + 6}
                        rx={6}
                        ry={10}
                        fill="#4f7f3a"
                        stroke={i}
                        strokeWidth={1.8}
                        transform={`rotate(60 ${e + 10} ${s + 6})`}
                      />
                    </>
                  ) : null}
                </g>
              ))}
            </L>
            <L part="flower" ring={[104, 196, 48, 44]}>
              <path d="M150 152 C 136 170 120 180 106 188" stroke="#5f6a36" strokeWidth={2.4} fill="none" />
              {[
                [104, 196],
                [80, 214],
              ].map(([e, s], r) => (
                <g key={r} transform={`translate(${e} ${s})`}>
                  {[0, 72, 144, 216, 288].map((e) => (
                    <g key={e} transform={`rotate(${e})`}>
                      <path d="M0 -4 C -6 -12 -5 -24 0 -28 C 5 -24 6 -12 0 -4 Z" fill="#7b46a8" stroke="#4a2a66" strokeWidth={1.2} />
                    </g>
                  ))}
                  <path d="M-4 4 L0 -10 L4 4 Z" fill="#f2c230" stroke="#b08a10" strokeWidth={1} />
                </g>
              ))}
            </L>
            <L part="fruit" ring={[252, 236, 50, 60]}>
              <path
                d="M244 160 C 246 176 248 186 250 196 M250 196 L240 204 M250 196 L262 214 M246 206 L228 234 M254 214 L252 244 M258 222 L276 244 M246 240 L240 272 M256 250 L264 280"
                stroke="#5f6a36"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
              />
              {[
                [240, 204, "#e0342a"],
                [262, 214, "#e0342a"],
                [228, 234, "#e0342a"],
                [252, 244, "#e0342a"],
                [276, 244, "#f08a2a"],
                [240, 272, "#e0342a"],
                [264, 280, "#8fbf4a"],
              ].map(([e, s, r], o) => (
                <g key={o}>
                  <ellipse cx={e} cy={s + 12} rx={10} ry={13} fill={r} stroke={i} strokeWidth={1.8} />
                  <ellipse cx={e - 3} cy={s + 7} rx={2.6} ry={4.4} fill="#ffffff" opacity={0.75} />
                  <path
                    d={`M${e - 5} ${s} L${e} ${s + 3} L${e + 5} ${s} M${e} ${s - 1} L${e} ${s + 3}`}
                    stroke="#4f7f3a"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </L>
            {e && (
              <L part="tip" ring={[100, 110, 70, 70]}>
                <CG_ id={`${s}l1`} x={100} y={110} r={62} handle from={[228, 250]}>
                  <rect x={-64} y={-64} width={128} height={128} fill="#eef3e6" />
                  <path d="M0 -70 L0 -44" stroke="#5f6a36" strokeWidth={5} />
                  <path
                    d="M-16 -44 L0 -36 L16 -44 M-9 -50 L0 -36 L9 -50"
                    stroke="#4f7f3a"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <ellipse cx={0} cy={0} rx={30} ry={40} fill="#e0342a" stroke={i} strokeWidth={3} />
                  <ellipse cx={-10} cy={-12} rx={7} ry={14} fill="#ffffff" opacity={0.7} />
                </CG_>
              </L>
            )}
          </g>
        );
      },
    ],
  },
  E = `
.sd-hot{cursor:pointer;outline:none}
.sd-focus{opacity:0}
.sd-hot:focus-visible .sd-focus{opacity:1}
.sd-pop{transform-box:fill-box;transform-origin:center;animation:sdPop .45s cubic-bezier(.3,1.5,.5,1) both}
@keyframes sdPop{0%{transform:scale(.2);opacity:0}100%{transform:scale(1);opacity:1}}
.sd-waft{animation:sdWaft 2.2s ease-in-out infinite}
@keyframes sdWaft{0%{transform:translateY(8px);opacity:0}25%{opacity:1}100%{transform:translateY(-26px);opacity:0}}
.sd-glow{transform-box:fill-box;transform-origin:center;animation:sdGlow 1.6s ease-in-out infinite}
@keyframes sdGlow{0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}}
.sd-knife{animation:sdKnife .8s ease-in-out both}
@keyframes sdKnife{0%{transform:translateX(-60px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(460px);opacity:0}}
.sd-wob{transform-box:fill-box;transform-origin:center;animation:sdWob .45s ease-in-out}
@keyframes sdWob{0%,100%{transform:rotate(0)}25%{transform:rotate(-2.5deg)}75%{transform:rotate(2.5deg)}}
@media (prefers-reduced-motion: reduce){.sd-pop,.sd-glow,.sd-wob{animation:none}.sd-waft{animation:none;opacity:1}.sd-knife{display:none}}
`,
  R = {
    smell: (
      <path
        d="M6 18 c-3 -4 3 -7 0 -11 c-3 -4 3 -7 0 -11 M12 18 c-3 -4 3 -7 0 -11 c-3 -4 3 -7 0 -11 M18 18 c-3 -4 3 -7 0 -11 c-3 -4 3 -7 0 -11"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        transform="translate(0 3)"
      />
    ),
    cut: (
      <g fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15 L17 5 Q21 3 21 7 L9 17 Z" />
        <path d="M3 15 L1 21 L7 19" />
      </g>
    ),
    look: (
      <g fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <circle cx={10} cy={10} r={6.5} />
        <path d="M15 15 L21 21" />
      </g>
    ),
  };
/** @param {{ start?: string, only?: string[] }} props — the pair to open on, and optionally the only pairs to offer. */
export const SpotTheDanger = function ({ start: e, only: i }) {
  let n = "sd" + (0, s.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    l = (() => {
      if (!i || !i.length) return r;
      let e = i.map((e) => r.find((t) => t.id === e)).filter((e) => !!e);
      return e.length ? e : r;
    })(),
    a = Math.max(
      0,
      l.findIndex((t) => t.id === e),
    ),
    [d, h] = (0, s.useState)(a),
    [c, f] = (0, s.useState)(false),
    [x, p] = (0, s.useState)(false),
    [k, j] = (0, s.useState)(null),
    [u, m] = (0, s.useState)([]),
    [y, g] = (0, s.useState)(null),
    [$, L] = (0, s.useState)(0),
    M = Math.min(d, l.length - 1),
    W = l[M],
    [w, C] = V[W.id],
    v = (e) => {
      (h(e), f(false), p(false), j(null), g(null));
    },
    N = (e, t) => {
      let s = W.parts[t];
      if (t === W.tell || (c && s?.tellAfter)) {
        (f(true),
          p(true),
          j({
            tone: "right",
            text: W.right,
          }),
          u.includes(W.id) || m([...u, W.id]));
        return;
      }
      if (x)
        return void j({
          tone: "right",
          text: W.right,
        });
      let r = s ? o(c && s.after ? s.after : s.hint, e) : "",
        i = c ? W.ask : W.nudge,
        n = /^Good/.test(r) ? "" : "Look again. ";
      (j({
        tone: "hint",
        text: `${n}${r ? r + " " : ""}${i}`.trim(),
      }),
        g((s) => ({
          side: e,
          part: t,
          n: (s?.n ?? 0) + 1,
        })));
    },
    Z = k ?? {
      tone: "info",
      text: W.intro,
    },
    A = M + 1 < l.length ? M + 1 : 0;
  return (
    <div className="text-ink">
      <style>{E}</style>
      {l.length > 1 && (
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => v((M - 1 + l.length) % l.length)}
            aria-label="Previous pair"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-line bg-paper text-xl font-bold text-ink-2 transition active:scale-95"
          >
            ‹
          </button>
          <p className="min-w-0 flex-1 text-center text-sm font-semibold leading-tight text-ink">
            {u.includes(W.id) && <span className="text-moss">{"✓ "}</span>}
            {W.chip}
            <span className="block text-xs font-normal text-ink-2">
              {"Pair "}
              {M + 1}
              {" of "}
              {l.length}
            </span>
          </p>
          <button
            type="button"
            onClick={() => v((M + 1) % l.length)}
            aria-label="Next pair"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-line bg-paper text-xl font-bold text-ink-2 transition active:scale-95"
          >
            ›
          </button>
        </div>
      )}
      {l.length > 1 && (
        <div role="group" aria-label="Choose a pair" className="-mx-1 hidden flex-wrap gap-1.5 px-1 sm:flex">
          {l.map((e, s) => {
            let r = u.includes(e.id);
            return (
              <button
                key={e.id}
                type="button"
                aria-pressed={s === M}
                onClick={() => v(s)}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 px-3 py-1 text-sm font-semibold transition active:scale-95 ${s === M ? "border-moss bg-moss text-white" : "border-line bg-paper text-ink-2 hover:border-moss/60"}`}
              >
                {r && (
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M3 8.5 L6.5 12 L13 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {e.chip}
                {r && <span className="sr-only">{" (found)"}</span>}
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-4">
        {[0, 1].map((e) => {
          let CS_ = 0 === e ? w : C;
          return (
            <div key={e} className="min-w-0">
              <div className="flex min-h-[3.25rem] flex-col justify-end">
                <p className={`font-display text-base font-semibold leading-tight sm:text-xl ${0 === e ? "text-moss" : "text-rust"}`}>
                  {W.names[e]}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">{0 === e ? "the one people pick" : W.warn}</p>
              </div>
              <div
                className={`mt-1 overflow-hidden rounded-2xl border-2 transition-colors ${x ? (0 === e ? "border-moss" : "border-rust") : "border-line"}`}
              >
                <CB_.Provider
                  value={{
                    side: e,
                    pair: W,
                    found: x,
                    wobble: y,
                    pick: N,
                    uid: `${n}${e}`,
                  }}
                >
                  <svg
                    viewBox="0 0 400 440"
                    className="block h-auto w-full select-none"
                    role="group"
                    aria-label={`${W.names[e]} — tap the parts`}
                  >
                    <defs>
                      <radialGradient id={`${n}${e}glow`}>
                        <stop offset="0" stopColor="#ffd66b" stopOpacity="0.95" />
                        <stop offset="0.6" stopColor="#ffc94a" stopOpacity="0.45" />
                        <stop offset="1" stopColor="#ffc94a" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <g key={`${W.id}-${c ? $ : 0}`}>
                      <CS_ shown={c} uid={`${n}${e}${W.id.replace(/[^a-z]/g, "")}`} />
                    </g>
                  </svg>
                </CB_.Provider>
              </div>
              <p className={`mt-1 min-h-[1.5rem] text-sm font-semibold ${0 === e ? "text-moss" : "text-rust"}`}>{x ? W.says[e] : ""}</p>
            </div>
          );
        })}
      </div>
      <div
        aria-live="polite"
        className={`mt-2 min-h-[6.5rem] rounded-2xl px-4 py-3 transition-colors ${"right" === Z.tone ? "bg-[#fbf1da] ring-2 ring-gold" : "hint" === Z.tone ? "bg-paper-2" : "bg-paper-2/70"}`}
      >
        {"right" === Z.tone && <p className="font-display text-lg font-semibold text-moss">You found the tell!</p>}
        <p className="leading-snug">{Z.text}</p>
        {"right" === Z.tone && (
          <p className="mt-2 text-sm">
            <a href={`/foraging/${W.id}`} className="font-semibold text-azure underline underline-offset-2 hover:text-azure-2">
              {"More about "}
              {W.about}
              {" →"}
            </a>
          </p>
        )}
        {W.note && (c || x) && <p className="mt-2 text-sm text-ink-2">{W.note}</p>}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {x ? (
          <button
            type="button"
            onClick={() => v(A)}
            className="min-h-12 flex-1 basis-56 rounded-full bg-moss px-5 py-2 text-lg font-semibold text-white shadow-sm transition hover:bg-moss-2 active:scale-95"
          >
            {0 === A ? (l.length > 1 ? "Start again from the first pair" : "Play it again") : `Next: ${l[A].chip} →`}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              (f(true),
                L((e) => e + 1),
                x ||
                  j({
                    tone: "info",
                    text: W.act.done,
                  }));
            }}
            className="inline-flex min-h-12 flex-1 basis-56 items-center justify-center gap-2 rounded-full bg-moss px-5 py-2 text-lg font-semibold text-white shadow-sm transition hover:bg-moss-2 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
              {R[W.act.kind]}
            </svg>
            {c ? ("smell" === W.act.kind ? "Smell again" : "cut" === W.act.kind ? "Cut again" : "Look again") : W.act.label}
          </button>
        )}
        {!x && c && <p className="text-sm font-semibold text-ink-2">{W.ask}</p>}
      </div>
      <p className="mt-5 flex items-start gap-2 rounded-xl border-l-4 border-l-rust bg-paper-2/60 px-4 py-3 text-sm font-semibold leading-snug text-ink">
        A game teaches the tell. Before you eat anything wild, check it with a field guide or an expert.
      </p>
    </div>
  );
};
