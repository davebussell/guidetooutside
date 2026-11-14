"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 49389 (exports: RockCycle)
import * as h from "next/link";
import * as f from "react";
import * as u from "@/components/ground/rock-art";
let s, t, a, r, o, i, l, n, d;
let m = "deep under the mountains, where it is hot and squeezed",
  p = "buried under the sea floor",
  x = {
    runny: {
      name: "Runny magma",
      family: "magma",
      slug: null,
      at: [736, 362],
      zone: "magma",
      where: "in the magma chamber under the island volcano",
    },
    sticky: {
      name: "Sticky magma",
      family: "magma",
      slug: null,
      at: [100, 335],
      zone: "magma",
      where: "in the magma chamber under the mountain volcano",
    },
    basalt: {
      name: "Basalt",
      family: "igneous",
      slug: "basalt",
      at: [698, 146],
      zone: "island",
      where: "on the side of the island volcano",
    },
    gabbro: {
      name: "Gabbro",
      family: "igneous",
      slug: null,
      at: [690, 296],
      zone: "islandDeep",
      where: "underground, beneath the island",
      say: "GAB-roh",
    },
    pumice: {
      name: "Pumice",
      family: "igneous",
      slug: "volcanic-rock",
      at: [425, 134],
      zone: "surface",
      where: "on the ground downwind of the mountain volcano",
      say: "PUM-iss",
    },
    granite: {
      name: "Granite",
      family: "igneous",
      slug: "granite",
      at: [275, 282],
      zone: "deep",
      where: "deep inside the mountains",
    },
    sand: {
      name: "Sand",
      family: "sediment",
      slug: "river-deposits",
      at: [512, 212],
      zone: "sea",
      where: "on the beach where the river meets the sea",
    },
    mud: {
      name: "Mud",
      family: "sediment",
      slug: "river-deposits",
      at: [585, 240],
      zone: "sea",
      where: "on the sea floor",
    },
    shells: {
      name: "Shells & lime mud",
      family: "sediment",
      slug: null,
      at: [650, 232],
      zone: "sea",
      where: "on the reef around the island",
    },
    sandstone: {
      name: "Sandstone",
      family: "sedimentary",
      slug: "sandstone",
      at: [512, 290],
      zone: "beds",
      where: p,
    },
    shale: {
      name: "Shale",
      family: "sedimentary",
      slug: "shale",
      at: [572, 296],
      zone: "beds",
      where: p,
    },
    limestone: {
      name: "Limestone",
      family: "sedimentary",
      slug: "limestone",
      at: [632, 290],
      zone: "beds",
      where: p,
    },
    chalk: {
      name: "Chalk",
      family: "sedimentary",
      slug: "chalk",
      at: [548, 334],
      zone: "beds",
      where: p,
    },
    dolostone: {
      name: "Dolostone",
      family: "sedimentary",
      slug: "dolostone",
      at: [614, 336],
      zone: "beds",
      where: p,
    },
    slate: {
      name: "Slate",
      family: "metamorphic",
      slug: "slate",
      at: [335, 392],
      zone: "deep",
      where: m,
    },
    schist: {
      name: "Schist",
      family: "metamorphic",
      slug: "schist",
      at: [410, 412],
      zone: "deep",
      where: m,
      say: "shist",
    },
    gneiss: {
      name: "Gneiss",
      family: "metamorphic",
      slug: "gneiss",
      at: [170, 404],
      zone: "deep",
      where: m,
      say: "nice",
    },
    paragneiss: {
      name: "Paragneiss",
      family: "metamorphic",
      slug: "paragneiss",
      at: [250, 420],
      zone: "deep",
      where: m,
      say: "PAIR-uh-nice",
    },
    quartzite: {
      name: "Quartzite",
      family: "metamorphic",
      slug: "quartzite",
      at: [480, 392],
      zone: "deep",
      where: m,
    },
    marble: {
      name: "Marble",
      family: "metamorphic",
      slug: "marble",
      at: [552, 410],
      zone: "deep",
      where: m,
    },
  },
  y = [
    "basalt",
    "gabbro",
    "pumice",
    "granite",
    "sandstone",
    "shale",
    "limestone",
    "chalk",
    "dolostone",
    "slate",
    "schist",
    "gneiss",
    "paragneiss",
    "quartzite",
    "marble",
  ],
  g = "Deep and hot in a mountain belt, its calcite regrows into bigger, sparkly crystals. The fossils disappear.",
  b = "You made marble! Sugary, sparkly crystals — and the shells are gone.",
  k = "It's runny magma again! Rock that sinks into the mantle can, much later, rise in a hot plume and partly melt. Round the loop again!",
  j = "It melted into sticky magma! Melted continent is rich in silica — thick, sticky and full of gas.",
  w = "Buried deep, hot and squeezed. Without melting, its minerals regrow as flat green flakes of chlorite, all lined up.",
  L = {
    runny: [
      {
        to: "basalt",
        how: "erupt",
        label: "Erupt it!",
        sub: "lava pours out and cools fast",
        span: "months to decades",
        yrs: 3,
        doing:
          "Up the pipe it goes and — whoosh! — out as red-hot lava. In the open air the lava cools and sets hard in months to decades.",
        done: "You made basalt! Lava that cooled fast in the air, so its crystals are too small to see. Dark, heavy, and often full of little gas holes.",
      },
      {
        to: "gabbro",
        how: "cool",
        label: "Cool it slowly underground",
        sub: "stuck deep down, crystals grow big",
        span: "thousands to hundreds of thousands of years",
        yrs: 5e4,
        doing: "It stays stuck underground, wrapped in warm rock, so it cools very slowly. Crystals grow… and grow…",
        done: "You made gabbro! The same runny magma as basalt, cooled slowly underground — so its dark and pale crystals had time to grow big.",
      },
    ],
    sticky: [
      {
        to: "pumice",
        how: "blast",
        label: "Erupt it — bang!",
        sub: "its gas blasts it into pumice and ash",
        span: "seconds to minutes",
        yrs: 1e-5,
        doing: "Sticky magma can't let its gas out gently, so it explodes! The froth freezes in mid-air in seconds.",
        done: "You made pumice! Frothy volcanic rock, so full of gas bubbles that it can float on water.",
      },
      {
        to: "granite",
        how: "cool",
        label: "Cool it slowly underground",
        sub: "it stalls kilometres down",
        span: "tens of thousands to millions of years",
        yrs: 3e5,
        doing: "It stalls kilometres down and cools slowly. Crystals of feldspar, quartz and mica grow into each other.",
        done: "You made granite! Silica-rich magma cooled slowly, deep down — time enough for big pink, white, grey and black crystals.",
      },
    ],
    basalt: [
      {
        to: "mud",
        how: "wear",
        label: "Wear it down",
        sub: "weathering and erosion",
        span: "thousands to millions of years",
        yrs: 2e5,
        doing: "Rain, frost and plant roots break it apart. Its minerals rot to clay, and streams wash the bits into the sea.",
        done: "Now it's mud: clay and silt, the finest crumbs of worn-down rock. Basalt has almost no quartz, so most of it rots to clay.",
      },
      {
        to: "shells",
        how: "dissolve",
        label: "Dissolve it in rain",
        sub: "its calcium feeds sea shells",
        span: "thousands to millions of years",
        yrs: 5e5,
        doing: "Rain is very slightly acid. Bit by bit it dissolves calcium out of the basalt, and rivers carry it to the sea…",
        done: "Now it's shells and lime mud! Sea creatures used the dissolved calcium to build their shells.",
      },
      {
        to: "schist",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions of years",
        yrs: 5e6,
        doing: w,
        done: "You made green schist! Heat, pressure and water turned basalt's dark minerals into green chlorite, lined up in sheets.",
      },
      {
        to: "runny",
        how: "sink",
        label: "Sink it into the mantle",
        sub: "old sea floor goes back down",
        span: "hundreds of millions of years",
        yrs: 3e8,
        doing:
          "The moving sea floor carries it to a deep-sea trench, where it sinks back into the mantle. Far below, hot rock slowly stirs…",
        done: k,
      },
    ],
    gabbro: [
      {
        to: "mud",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "millions of years",
        yrs: 5e6,
        doing:
          "Slowly the rock above wears away until the gabbro is at the surface. Then rain and frost break it up, and streams wash it into the sea.",
        done: "Now it's mud! Gabbro's dark minerals and feldspar rot mostly to clay.",
      },
      {
        to: "runny",
        how: "sink",
        label: "Sink it into the mantle",
        sub: "old sea floor goes back down",
        span: "hundreds of millions of years",
        yrs: 3e8,
        doing: "Gabbro makes the deep part of the sea floor. At a deep-sea trench the sea floor sinks back into the mantle…",
        done: k,
      },
    ],
    pumice: [
      {
        to: "mud",
        how: "wear",
        label: "Wear it down",
        sub: "weathering and erosion",
        span: "hundreds to thousands of years",
        yrs: 1e3,
        doing: "Pumice and ash are mostly glass, and volcanic glass rots to clay quickly, as rocks go. Rain washes it down the river.",
        done: "Now it's mud: fine clay from rotted volcanic glass.",
      },
      {
        to: "schist",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions of years",
        yrs: 5e6,
        doing: w,
        done: "You made green schist! Heat, pressure and water turned the volcanic rock into green chlorite, lined up in sheets.",
      },
    ],
    granite: [
      {
        to: "sand",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "tens of millions of years",
        yrs: 3e7,
        doing:
          "The mountains above it slowly wear away until the granite reaches the surface. Rain rots its feldspar to clay, and its quartz grains wash down the river.",
        done: "Now it's sand! Tough little grains of quartz from the granite, washed down to the sea.",
      },
      {
        to: "gneiss",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions to tens of millions of years",
        yrs: 1e7,
        doing:
          "Caught where continents collide, it's pushed deep and squeezed. Without melting, its minerals slowly sort themselves into stripes.",
        done: "You made gneiss — say “nice”! Its light and dark minerals sorted into bold stripes.",
      },
      {
        to: "sticky",
        how: "melt",
        label: "Melt it",
        sub: "deep and hot enough, any rock melts",
        span: "millions of years",
        yrs: 5e6,
        doing: "Pushed deeper and deeper, it gets hot enough to melt — and the melt, lighter than the rock around it, rises.",
        done: j,
      },
    ],
    sand: [
      {
        to: "sandstone",
        how: "bury",
        label: "Pile it up and bury it",
        sub: "squeezed and cemented",
        span: "millions of years",
        yrs: 5e6,
        doing: "More sand and mud pile on top. The weight squeezes the water out, and minerals in the water glue the grains together.",
        done: "You made sandstone! Sand grains glued together by natural cement — you can still see the grains and the layers.",
      },
    ],
    mud: [
      {
        to: "shale",
        how: "bury",
        label: "Pile it up and bury it",
        sub: "squeezed flat",
        span: "millions of years",
        yrs: 5e6,
        doing: "Layer after layer piles on top. The weight squeezes the water out and presses the flat flakes of clay together.",
        done: "You made shale! Mud pressed flat, so it splits into thin layers.",
      },
    ],
    shells: [
      {
        to: "limestone",
        how: "bury",
        label: "Pile them up and bury them",
        sub: "squeezed and cemented",
        span: "hundreds of thousands to millions of years",
        yrs: 1e6,
        doing: "Shells and lime mud pile up on the warm, shallow sea floor. Buried, they're squeezed and cemented together.",
        done: "You made limestone! Shells and lime mud turned to stone. It fizzes in vinegar.",
      },
      {
        to: "chalk",
        how: "bury",
        label: "Let tiny plankton build it",
        sub: "microscopic shells pile up",
        span: "millions of years",
        yrs: 2e6,
        doing:
          "In a clear sea far from muddy rivers, tiny floating algae build shells too small to see. When they die, the shells drift down, year after year.",
        done: "You made chalk! Soft white rock made of countless microscopic plankton shells.",
      },
    ],
    sandstone: [
      {
        to: "quartzite",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions of years",
        yrs: 5e6,
        doing: "Deep and hot, the quartz grains grow into each other until every gap is gone.",
        done: "You made quartzite! The sand grains welded into one of the hardest rocks there is.",
      },
      {
        to: "sand",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "millions of years",
        yrs: 5e6,
        doing: "Pushed up into hills and worn by the weather, its cement gives way and it crumbles grain by grain.",
        done: "It's sand again! The same quartz grains, loose once more.",
      },
    ],
    shale: [
      {
        to: "slate",
        how: "squeeze",
        label: "Squeeze it",
        sub: "pressure and a little heat",
        span: "millions of years",
        yrs: 3e6,
        doing: "Squeezed from the sides as mountains are pushed up. Tiny new flakes of mica grow, all lined up the same way.",
        done: "You made slate! It splits into flat, smooth sheets — good for roofs.",
      },
      {
        to: "mud",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "millions of years",
        yrs: 3e6,
        doing: "Shale is soft. Pushed up into hills and rained on, it breaks into chips, then clay.",
        done: "It's mud again!",
      },
    ],
    limestone: [
      {
        to: "marble",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions of years",
        yrs: 5e6,
        doing: g,
        done: b,
      },
      {
        to: "dolostone",
        how: "soak",
        label: "Soak it in salty water",
        sub: "magnesium swaps in",
        span: "thousands to millions of years",
        yrs: 5e5,
        doing: "Salty water full of magnesium seeps through it. Bit by bit, magnesium takes the place of some of the calcium.",
        done: "You made dolostone! Tougher than limestone, and it only fizzes when you scratch it to powder.",
      },
      {
        to: "shells",
        how: "dissolve",
        label: "Dissolve it in rain",
        sub: "its calcium goes back to sea",
        span: "millions of years",
        yrs: 2e6,
        doing:
          "Pushed up into hills, it meets the rain — and limestone dissolves. (That's how caves are made.) Rivers carry the calcium to the sea…",
        done: "Shells and lime mud again! Sea creatures built new shells from the old limestone's calcium.",
      },
    ],
    chalk: [
      {
        to: "marble",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions of years",
        yrs: 5e6,
        doing: g,
        done: b,
      },
      {
        to: "shells",
        how: "dissolve",
        label: "Dissolve it in rain",
        sub: "its calcium goes back to sea",
        span: "millions of years",
        yrs: 2e6,
        doing: "Pushed up into hills and rained on, chalk slowly dissolves, and rivers carry its calcium to the sea…",
        done: "Shells and lime mud again! Sea creatures built new shells from the old chalk's calcium.",
      },
    ],
    dolostone: [
      {
        to: "marble",
        how: "squeeze",
        label: "Bury and squeeze it",
        sub: "heat and pressure, no melting",
        span: "millions of years",
        yrs: 5e6,
        doing: "Deep and hot in a mountain belt, its crystals regrow bigger and sparkly.",
        done: "You made marble! Made from dolostone, it's called dolomitic marble.",
      },
      {
        to: "shells",
        how: "dissolve",
        label: "Dissolve it in rain",
        sub: "its calcium goes back to sea",
        span: "millions of years",
        yrs: 3e6,
        doing: "Pushed up and rained on, dolostone dissolves too — more slowly than limestone. Rivers carry it to the sea…",
        done: "Shells and lime mud again! Sea creatures used the dissolved calcium to build new shells.",
      },
    ],
    quartzite: [
      {
        to: "sand",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "slowly — it's very tough",
        span: "tens of millions of years",
        yrs: 3e7,
        doing:
          "Quartzite hardly wears at all, so this takes a very long time. Frost cracks it into blocks, and the blocks break into sand.",
        done: "It's sand again — quartz grains, the toughest leftovers of all.",
      },
      {
        to: "quartzite",
        how: "bake",
        label: "Heat and squeeze it more",
        sub: "can it change again?",
        span: "millions of years",
        yrs: 5e6,
        doing: "More heat, more squeezing… but quartz has nothing else to turn into.",
        done: "Still quartzite! Its crystals just grew a little bigger.",
      },
    ],
    marble: [
      {
        to: "shells",
        how: "dissolve",
        label: "Dissolve it in rain",
        sub: "its calcium goes back to sea",
        span: "millions of years",
        yrs: 2e6,
        doing: "Lifted to the surface, marble slowly dissolves in rain, just like limestone. Rivers carry its calcium to the sea…",
        done: "Shells and lime mud again! Sea creatures built new shells from the marble's calcium.",
      },
      {
        to: "marble",
        how: "bake",
        label: "Heat and squeeze it more",
        sub: "can it change again?",
        span: "millions of years",
        yrs: 5e6,
        doing: "More heat, more squeezing…",
        done: "Still marble! More heat only makes its crystals grow coarser.",
      },
    ],
    slate: [
      {
        to: "schist",
        how: "squeeze",
        label: "Heat and squeeze it more",
        sub: "deeper and hotter",
        span: "millions of years",
        yrs: 5e6,
        doing: "Hotter and deeper, the mica flakes grow big enough to see.",
        done: "You made schist — say “shist”! Big flakes of mica, all lined up, make it glitter.",
      },
      {
        to: "mud",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "millions of years",
        yrs: 5e6,
        doing: "Mountains wear down until the slate is at the surface. It splits into chips, then rots to clay.",
        done: "It's mud again!",
      },
    ],
    schist: [
      {
        to: "gneiss",
        toSed: "paragneiss",
        how: "squeeze",
        label: "Heat and squeeze it more",
        sub: "deeper and hotter still",
        span: "millions of years",
        yrs: 5e6,
        doing: "Deeper and hotter still, its minerals separate into light and dark stripes.",
        done: "You made gneiss — say “nice”! Its light and dark minerals sorted into bold stripes.",
        doneSed: "You made paragneiss! Gneiss made from old mud and sand — its stripes are a ghost of the layers.",
      },
      {
        to: "mud",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "millions of years",
        yrs: 1e7,
        doing: "Mountains wear down until the schist is at the surface. Its mica flakes and clay wash away down the river.",
        done: "Now it's mud!",
      },
    ],
    gneiss: [
      {
        to: "sand",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "tens of millions of years",
        yrs: 3e7,
        doing: "The mountains above it slowly wear away until the gneiss reaches the surface. Its quartz grains wash down the river.",
        done: "Now it's sand! Tough quartz grains from the gneiss, washed down to the sea.",
      },
      {
        to: "sticky",
        how: "melt",
        label: "Melt it",
        sub: "deep and hot enough, any rock melts",
        span: "millions of years",
        yrs: 5e6,
        doing: "Deeper still, and it gets hot enough to melt. The melt is lighter than the rock around it, so it rises.",
        done: j,
      },
    ],
    paragneiss: [
      {
        to: "sand",
        how: "wear",
        label: "Lift it up and wear it down",
        sub: "weathering and erosion",
        span: "tens of millions of years",
        yrs: 3e7,
        doing: "The mountains above it slowly wear away until the paragneiss reaches the surface. Its quartz grains wash down the river.",
        done: "Sand again! Its quartz grains are back where they started, long ago.",
      },
      {
        to: "sticky",
        how: "melt",
        label: "Melt it",
        sub: "deep and hot enough, any rock melts",
        span: "millions of years",
        yrs: 5e6,
        doing: "Deeper still, and it gets hot enough to melt. The melt is lighter than the rock around it, so it rises.",
        done: j,
      },
    ],
  },
  M = {
    erupt: "fire",
    blast: "fire",
    cool: "fire",
    melt: "fire",
    sink: "fire",
    wear: "water",
    dissolve: "water",
    bury: "water",
    soak: "water",
    squeeze: "squeeze",
    bake: "squeeze",
  },
  v = {
    basalt: {
      texture: "dark",
      swatch: "#3e3d3b",
    },
    gabbro: {
      texture: "speckled",
      swatch: "#4b4a46",
    },
    pumice: {
      texture: "bubbly",
      swatch: "#dcd6ca",
    },
    granite: {
      texture: "speckled",
      swatch: "#d4b3a5",
    },
    sandstone: {
      texture: "grainy",
      swatch: "#d8b489",
    },
    shale: {
      texture: "layered",
      swatch: "#6d6c69",
    },
    limestone: {
      texture: "layered",
      swatch: "#cfc8b6",
      extras: {
        shells: true,
      },
    },
    chalk: {
      texture: "chalky",
      swatch: "#f4f1e8",
    },
    dolostone: {
      texture: "sugary",
      swatch: "#d6c4a4",
    },
    quartzite: {
      texture: "sugary",
      swatch: "#ecdcd6",
    },
    marble: {
      texture: "sugary",
      swatch: "#f2efe9",
    },
    slate: {
      texture: "sheeted",
      swatch: "#4d5560",
    },
    schist: {
      texture: "sheeted",
      swatch: "#9a978d",
      extras: {
        glitter: true,
      },
    },
    schistGreen: {
      texture: "sheeted",
      swatch: "#6b8566",
      extras: {
        glitter: true,
      },
    },
    gneiss: {
      texture: "banded",
      swatch: "#aaa197",
    },
    paragneiss: {
      texture: "banded",
      swatch: "#9d968c",
      extras: {
        garnets: true,
      },
    },
  };
function $(e, s) {
  return "schist" === e && "igneous" === s ? "schistGreen" : e;
}
function z(e) {
  return "schistGreen" === e ? "Green schist" : "droplet" === e ? "Dissolved in water" : x[e].name;
}
let N = {
    magma: "Magma — melted rock",
    sediment: "Sediment — loose bits",
    igneous: "Igneous rock",
    sedimentary: "Sedimentary rock",
    metamorphic: "Metamorphic rock",
  },
  q = new Set(["basalt", "gabbro", "shale", "slate", "mud", "schistGreen"]),
  C = (() => {
    let e = (0, u.seeded)(41),
      s = [];
    for (let t = 0; t < 12; t++) {
      let a = (t / 12) * Math.PI * 2,
        r = 0.9 + 0.14 * e();
      s.push([54 * r * Math.cos(a), 44 * r * Math.sin(a)]);
    }
    return (0, u.smoothClosed)(s);
  })(),
  W = [
    [-26, -8, 5],
    [-6, 12, 4],
    [18, -14, 6],
    [30, 10, 3.5],
    [-34, 14, 3],
    [4, -24, 3],
    [8, 26, 3],
  ];
function S({ kind: e, uid: s }) {
  let t = "runny" === e;
  return (
    <g>
      {s && <circle r={66} fill={`url(#${s}halo)`} />}
      <path
        d={C}
        fill={s ? `url(#${s}${e})` : t ? "#ff9a2e" : "#e0662c"}
        stroke={t ? "#c2410c" : "#8a2a12"}
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
      />
      {t ? (
        <g fill="#fff4b8" opacity={0.8}>
          <ellipse cx={-18} cy={-16} rx={12} ry={6} />
          <circle cx={22} cy={14} r={4} />
        </g>
      ) : (
        <g>
          <path
            d="M-40 -2 Q-20 -12 0 -4 M10 20 Q26 14 40 20"
            fill="none"
            stroke="#8a2a12"
            strokeWidth={3}
            opacity={0.35}
            strokeLinecap="round"
          />
          {W.map(([e, s, t], a) => (
            <circle key={a} cx={e} cy={s} r={t} fill="#ffe0a8" stroke="#c2501c" strokeWidth={1} opacity={0.8} />
          ))}
        </g>
      )}
    </g>
  );
}
let Q = (0, u.heapD)(9),
  P =
    ((s = (0, u.seeded)(77)),
    (t = ["#e9d6a8", "#c9a86e", "#f4ecd9", "#b58b5c", "#d9bf8c", "#8f7f6c"]),
    Array.from(
      {
        length: 110,
      },
      () => ({
        x: (0, u.r1)(-58 + 116 * s()),
        y: (0, u.r1)(-40 + 74 * s()),
        r: (0, u.r1)(1.4 + 1.6 * s()),
        c: t[Math.floor(s() * t.length)],
      }),
    ));
function A({ uid: e }) {
  return (
    <g>
      <clipPath id={`${e}sand`}>
        <path d={Q} />
      </clipPath>
      <path d={Q} fill="#d9bf8c" />
      <g clipPath={`url(#${e}sand)`}>
        {P.map((e, s) => (
          <circle key={s} cx={e.x} cy={e.y} r={e.r} fill={e.c} />
        ))}
      </g>
      <path d={Q} fill="none" stroke="#9c8458" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </g>
  );
}
let T =
  ((a = (0, u.seeded)(19)),
  Array.from(
    {
      length: 30,
    },
    () => ({
      x: (0, u.r1)(-44 + 88 * a()),
      y: (0, u.r1)(-8 + 30 * a()),
      r: (0, u.r1)(0.8 + a()),
    }),
  ));
function Y() {
  return (
    <g>
      <path
        d="M-56 22 Q-58 -4 -30 -14 Q0 -24 30 -14 Q58 -4 56 22 Q30 32 0 30 Q-30 32 -56 22Z"
        fill="#7b6d60"
        stroke="#4d4238"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      {T.map((e, s) => (
        <circle key={s} cx={e.x} cy={e.y} r={e.r} fill="#9a8b7b" />
      ))}
      <path d="M-32 -6 Q-12 -14 12 -11" fill="none" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" opacity={0.35} />
    </g>
  );
}
function B({ x: e, y: s, rot: t, s: a }) {
  return (
    <g transform={`translate(${e} ${s}) rotate(${t}) scale(${a})`}>
      <path d="M-13 7 Q-13 -11 0 -13 Q13 -11 13 7 Q0 10 -13 7Z" fill="#f7efe1" stroke="#a8916c" strokeWidth={1.6} />
      <path d="M0 8 L0 -12 M-6 8 L-9 -8 M6 8 L9 -8 M-10 7 L-13 -2 M10 7 L13 -2" stroke="#c9b28c" strokeWidth={1.2} fill="none" />
    </g>
  );
}
function I({ uid: e }) {
  return (
    <g>
      <clipPath id={`${e}lime`}>
        <path d={Q} />
      </clipPath>
      <path d={Q} fill="#e8dfcb" stroke="#b3a383" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <g clipPath={`url(#${e}lime)`}>
        {P.slice(0, 50).map((e, s) => (
          <circle key={s} cx={e.x} cy={e.y} r={0.7 * e.r} fill="#d6ccb4" />
        ))}
      </g>
      <B x={-26} y={-8} rot={-24} s={1.1} />
      <B x={8} y={14} rot={12} s={1} />
      <g transform="translate(24 -12)">
        <circle r={11} fill="#ecd9b9" stroke="#a88b62" strokeWidth={1.6} />
        <path d="M0 0 m-6 0 a6 6 0 1 1 6 6 a4 4 0 1 1 -4 -4" fill="none" stroke="#a88b62" strokeWidth={1.5} />
      </g>
      <path
        d="M-44 20 l4 -10 l4 6 l4 -12 l3 14"
        fill="none"
        stroke="#e39a86"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
function G() {
  return (
    <g>
      <path
        d="M0 -44 C16 -18 34 0 34 16 A34 30 0 0 1 -34 16 C-34 0 -16 -18 0 -44Z"
        fill="#8fcbe9"
        fillOpacity={0.9}
        stroke="#3f89b5"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      <ellipse cx={-13} cy={4} rx={5} ry={10} fill="#ffffff" opacity={0.6} transform="rotate(20 -13 4)" />
      {[
        [8, 10],
        [16, -2],
        [-4, 22],
        [20, 20],
        [2, -10],
      ].map(([e, s], t) => (
        <circle key={t} cx={e} cy={s} r={1.8} fill="#ffffff" />
      ))}
    </g>
  );
}
function Z({ look: e, uid: s, detail: t = "hi", flat: a = false }) {
  let r = v[e];
  if (r)
    return (
      <u.RockSpecimen
        texture={r.texture}
        swatch={r.swatch}
        seed={(0, u.seedOf)(e)}
        r={44}
        detail={t}
        extras={r.extras}
        glintClass={a ? undefined : "rc-glint"}
      />
    );
  switch (e) {
    case "runny":
    case "sticky":
      return <S kind={e} uid={a ? undefined : s} />;
    case "sand":
      return <A uid={s} />;
    case "mud":
      return <Y />;
    case "shells":
      return <I uid={s} />;
    default:
      return <G />;
  }
}
function D({ uid: e }) {
  return (
    <>
      <radialGradient id={`${e}runny`} cx="45%" cy="40%" r="65%">
        <stop offset="0" stopColor="#fff2a8" />
        <stop offset="0.35" stopColor="#ffc24a" />
        <stop offset="0.75" stopColor="#ff7a22" />
        <stop offset="1" stopColor="#d9401c" />
      </radialGradient>
      <radialGradient id={`${e}sticky`} cx="45%" cy="40%" r="65%">
        <stop offset="0" stopColor="#ffd08a" />
        <stop offset="0.4" stopColor="#ff9340" />
        <stop offset="0.8" stopColor="#d8501f" />
        <stop offset="1" stopColor="#9a2c14" />
      </radialGradient>
      <radialGradient id={`${e}halo`}>
        <stop offset="0.55" stopColor="#ffb04a" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ff7a2a" stopOpacity="0" />
      </radialGradient>
    </>
  );
}
let R = {
  sand: 0,
  shells: 0,
  mud: 4,
  droplet: 10,
};
function O({ look: e, gaze: s, excited: t }) {
  let a = R[e] ?? -6,
    r = q.has(e),
    o = (0, u.r1)(3 * s[0]),
    i = (0, u.r1)(1 + 3 * s[1]);
  return (
    <g transform={`translate(0 ${a})`}>
      {[-15, 15].map((e) => (
        <g key={e} transform={`translate(${e} 0)`}>
          <g className="rc-blink">
            <ellipse rx={8.5} ry={9.5} fill="#fffdf8" stroke="#1f1a17" strokeWidth={1.6} />
            <circle cx={o} cy={i} r={4.4} fill="#1f1a17" />
            <circle cx={(0, u.r1)(o - 1.5)} cy={(0, u.r1)(i - 1.6)} r={1.5} fill="#fffdf8" />
          </g>
        </g>
      ))}
      {t ? (
        <ellipse cy={16} rx={4.5} ry={5.5} fill={r ? "#f3ead8" : "#1f1a17"} />
      ) : (
        <path d="M-8 13 Q0 20 8 13" fill="none" stroke={r ? "#f3ead8" : "#1f1a17"} strokeWidth={2.8} strokeLinecap="round" />
      )}
    </g>
  );
}
let H = (e, s, t, a = "io") => ({
    tag: e,
    w: s,
    pts: t,
    ease: a,
  }),
  E = (e) => (e < 0 ? 0 : e > 1 ? 1 : e),
  F = (e, s, t) => (t <= s ? +(e >= t) : E((e - s) / (t - s))),
  V = (e) => Math.sin(Math.PI * E(e));
function U(e, s, t) {
  let a = -1,
    r = -1;
  for (let s = 0; s < e.legs.length; s++) e.legs[s].tag === t && (a < 0 && (a = s), (r = s));
  return a < 0 ? [2, 2] : [s[a], s[r + 1]];
}
let K = [
  [344, 86],
  [372, 110],
  [400, 126],
  [437, 142],
  [468, 160],
  [494, 188],
];
function _(e) {
  let s = x[e].at;
  switch (x[e].zone) {
    case "island":
      return {
        pre: [],
        rain: s,
        post: [
          H("roll", 0.8, [
            [684, 206],
            [636, 238],
          ]),
        ],
      };
    case "islandDeep":
      return {
        pre: [H("lift", 1, [[700, 142]])],
        rain: [700, 142],
        post: [
          H("roll", 0.8, [
            [684, 206],
            [636, 238],
          ]),
        ],
      };
    case "surface":
      return {
        pre: [],
        rain: s,
        post: [
          H("river", 0.9, [
            [468, 160],
            [494, 188],
          ]),
        ],
      };
    case "beds":
      return {
        pre: [H("lift", 1, [[420, 134]])],
        rain: [420, 134],
        post: [
          H("river", 0.9, [
            [437, 142],
            [468, 160],
            [494, 188],
          ]),
        ],
      };
    default:
      return {
        pre: [H("lift", 1.1, [[322, 58]])],
        rain: [322, 58],
        post: [H("river", 1.5, K)],
      };
  }
}
let J = {
  at: "runny",
  origin: "igneous",
  trail: [
    {
      id: "runny",
      look: "runny",
    },
  ],
  made: [],
  years: 0,
  said: "Your rock begins as a blob of runny magma — melted rock from the mantle — under a volcanic island. What happens to it next? You choose.",
  span: null,
};
function X(e, s) {
  return e.toSed && "sedimentary" === s ? e.toSed : e.to;
}
function ee(e) {
  return e >= 10 ? String(Math.round(e)) : String(Math.round(10 * e) / 10).replace(/\.0$/, "");
}
let es =
    "M0 178 L12 172 Q60 132 86 70 L94 74 L106 74 L114 70 Q138 128 180 150 Q200 158 222 146 L250 112 L268 100 L284 70 L296 60 L310 84 L324 80 L344 104 Q372 132 400 144 Q440 160 468 178 Q482 194 494 204 L530 256 L640 260 L668 222 L684 204 Q712 150 728 92 L734 96 L740 96 L744 92 Q762 150 800 184 L800 500 L0 500 Z",
  et = "M494 204 L684 204 L668 222 L640 260 L530 256 Z",
  ea = "M344 104 Q372 132 400 144 Q440 160 468 178 Q482 194 494 204";
function er(e, s, t, a, r, o) {
  let i = "";
  for (let l = a; l <= r; l += 10) i += `${i ? "L" : "M"}${l} ${(0, u.r1)(e + s * Math.sin((2 * Math.PI * l) / t + o))}`;
  return i;
}
let eo = [er(382, 6, 80, 0, 600, 0), er(404, 7, 90, 0, 620, 1.2), er(428, 6, 70, 0, 630, 2.1)],
  ei = ["#cbb58e", "#a39b90", "#d3cab8", "#bfa983", "#978f86", "#d8d0bf", "#bba57f", "#9c958b", "#cfc6b3", "#b3a07f"].map((e, s) => {
    let t = 250 + 10 * s;
    return {
      d: `M440 ${t} Q580 ${t + 4} 720 ${t + 8} L720 ${t + 18} Q580 ${t + 14} 440 ${t + 10} Z`,
      c: e,
    };
  }),
  el = (() => {
    let e = (0, u.seeded)(61),
      s = [];
    for (let t = 0; t < 11; t++) {
      let a = (t / 11) * Math.PI * 2,
        r = 0.86 + 0.2 * e();
      s.push([275 + 76 * r * Math.cos(a), 282 + 38 * r * Math.sin(a)]);
    }
    return (0, u.smoothClosed)(s);
  })(),
  en =
    ((r = (0, u.seeded)(3)),
    Array.from(
      {
        length: 34,
      },
      () => ({
        x: (0, u.r1)(800 * r()),
        y: (0, u.r1)(180 + 270 * r()),
        rx: (0, u.r1)(3 + 7 * r()),
        ry: (0, u.r1)(2 + 4 * r()),
        c: r() > 0.5 ? "#b3957a" : "#6d5442",
      }),
    )),
  ed = [
    [30, 156, 0.9],
    [44, 150, 0.75],
    [188, 152, 1],
    [204, 154, 0.8],
    [216, 150, 0.9],
    [776, 162, 0.8],
    [790, 172, 0.95],
  ],
  ec = [
    [80, 482, 0],
    [150, 486, 1.1],
    [320, 488, 0.6],
    [610, 486, 1.7],
    [720, 482, 0.3],
    [770, 488, 2.2],
  ];
function CEh_({ x: e, y: s, k: t = 1, fill: a = "#ffffff", op: r = 0.92 }) {
  return (
    <g fill={a} opacity={r}>
      <ellipse cx={(0, u.r1)(e)} cy={(0, u.r1)(s + 8 * t)} rx={(0, u.r1)(40 * t)} ry={(0, u.r1)(13 * t)} />
      <circle cx={(0, u.r1)(e - 14 * t)} cy={(0, u.r1)(s)} r={(0, u.r1)(15 * t)} />
      <circle cx={(0, u.r1)(e + 10 * t)} cy={(0, u.r1)(s - 4 * t)} r={(0, u.r1)(19 * t)} />
    </g>
  );
}
function CEf_({ uid: e }) {
  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id={`${e}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe0f0" />
          <stop offset="1" stopColor="#f3efe0" />
        </linearGradient>
        <linearGradient id={`${e}crust`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.1" stopColor="#a17f60" />
          <stop offset="0.6" stopColor="#7d5d45" />
          <stop offset="1" stopColor="#5b3f2f" />
        </linearGradient>
        <linearGradient id={`${e}sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc0e0" />
          <stop offset="1" stopColor="#3f86b5" />
        </linearGradient>
        <linearGradient id={`${e}melt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a3218" />
          <stop offset="1" stopColor="#4e170d" />
        </linearGradient>
        <radialGradient id={`${e}pocket`}>
          <stop offset="0" stopColor="#ffd35c" />
          <stop offset="0.5" stopColor="#ff8a2a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d9481f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${e}chamber`} cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor="#ffd35c" />
          <stop offset="0.55" stopColor="#ff8a2a" />
          <stop offset="1" stopColor="#d9481f" />
        </radialGradient>
        <clipPath id={`${e}land`}>
          <path d={es} />
        </clipPath>
        <clipPath id={`${e}beds`}>
          <path d="M494 206 L530 257 L640 261 L700 352 L508 352 Z" />
        </clipPath>
        <clipPath id={`${e}pluton`}>
          <path d={el} />
        </clipPath>
      </defs>
      <rect x={0} y={0} width={800} height={260} fill={`url(#${e}sky)`} />
      <circle cx={612} cy={46} r={20} fill="#ffd45c" />
      <circle cx={612} cy={46} r={30} fill="#ffd45c" opacity={0.25} />
      <CEh_ x={190} y={34} k={0.9} />
      <CEh_ x={492} y={52} k={0.75} />
      <path d={es} fill={`url(#${e}crust)`} />
      <g clipPath={`url(#${e}land)`}>
        {en.map((e, s) => (
          <ellipse key={s} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill={e.c} opacity={0.45} />
        ))}
        <g fill="none" stroke="#6b4c3a" strokeWidth={2.5} opacity={0.35} strokeLinecap="round">
          <path d="M24 176 Q66 130 90 80" />
          <path d="M44 176 Q78 136 95 92" />
          <path d="M176 156 Q132 126 110 80" />
          <path d="M156 160 Q124 132 106 94" />
        </g>
        <path
          d="M222 146 L250 112 L268 100 L284 70 L296 60 L310 84 L324 80 L344 104 Q372 132 400 144 L372 158 L250 160 Z"
          fill="#8c7d70"
          opacity={0.55}
        />
        <g clipPath={`url(#${e}beds)`}>
          {ei.map((e, s) => (
            <path key={s} d={e.d} fill={e.c} />
          ))}
          <g fill="none" stroke="#5c4a3a" strokeWidth={1} opacity={0.3}>
            {ei.map((e, s) => (
              <path key={s} d={`M440 ${250 + 10 * s} Q580 ${254 + 10 * s} 720 ${258 + 10 * s}`} />
            ))}
          </g>
        </g>
        <path d="M640 261 L668 222 L684 204 Q712 150 728 92 L734 96 L740 96 L744 92 Q762 150 800 184 L800 352 L700 352 Z" fill="#6f655d" />
        <g fill="none" stroke="#3f3935" strokeWidth={2.5} opacity={0.35}>
          <path d="M662 250 Q704 190 728 110" />
          <path d="M800 212 Q764 170 744 110" />
          <path d="M690 300 Q724 238 736 130" />
        </g>
        <g clipPath={`url(#${e}pluton)`}>
          <g transform="translate(275 282) scale(1.35 0.72)">
            <u.RockTexture texture="speckled" swatch="#d4b3a5" seed={5} detail="lo" />
          </g>
        </g>
        <path d={el} fill="none" stroke="#7a5a4c" strokeWidth={2} opacity={0.55} />
        <path d="M0 362 Q150 350 300 360 Q450 370 612 356 L640 454 L0 454 Z" fill="#9a5540" opacity={0.5} />
        <g fill="none" stroke="#6d3a2a" strokeWidth={3} opacity={0.35}>
          {eo.map((e, s) => (
            <path key={s} d={e} />
          ))}
        </g>
        <path d="M0 456 Q100 446 200 456 T400 456 T600 456 T800 456 L800 500 L0 500 Z" fill={`url(#${e}melt)`} />
        <g className="rc-glow">
          <ellipse cx={120} cy={476} rx={64} ry={15} fill={`url(#${e}pocket)`} />
          <ellipse cx={336} cy={484} rx={48} ry={10} fill={`url(#${e}pocket)`} />
          <ellipse cx={604} cy={480} rx={46} ry={11} fill={`url(#${e}pocket)`} />
          <ellipse cx={736} cy={476} rx={64} ry={15} fill={`url(#${e}pocket)`} />
        </g>
        {ec.map(([e, s, t], a) => (
          <g
            key={a}
            className="rc-bubble"
            style={{
              animationDelay: `${t}s`,
            }}
          >
            <circle cx={e} cy={s} r={3} fill="#ffcf70" />
          </g>
        ))}
        <path d="M120 470 Q108 420 100 357" fill="none" stroke="#e0662c" strokeWidth={7} opacity={0.85} strokeLinecap="round" />
        <path d="M736 466 L736 384" fill="none" stroke="#e0662c" strokeWidth={8} opacity={0.85} strokeLinecap="round" />
        <rect x={96} y={74} width={8} height={242} fill="#3d2b22" />
        <rect x={732} y={94} width={8} height={248} fill="#2e2623" />
        <ellipse cx={100} cy={335} rx={58} ry={22} fill={`url(#${e}chamber)`} stroke="#9a3414" strokeWidth={2.5} />
        <ellipse cx={736} cy={362} rx={58} ry={22} fill={`url(#${e}chamber)`} stroke="#9a3414" strokeWidth={2.5} />
      </g>
      <path d="M78 92 Q84 80 86 70 L94 74 L106 74 L114 70 Q117 80 122 92 Q114 86 108 92 Q100 86 92 92 Q86 86 78 92Z" fill="#f7f7f4" />
      <path d="M274 84 L284 70 L296 60 L310 84 L304 81 L298 90 L290 81 L282 88Z" fill="#f7f7f4" />
      <path
        d="M0 178 L12 172 Q60 132 86 70 L94 74 L106 74 L114 70 Q138 128 180 150 Q200 158 222 146 L250 112 L268 100 L284 70 L296 60 L310 84 L324 80 L344 104 Q372 132 400 144 Q440 160 468 178 Q482 194 494 204"
        fill="none"
        stroke="#6f9a4a"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M684 204 Q712 150 728 92 L734 96 L740 96 L744 92 Q762 150 800 184"
        fill="none"
        stroke="#5f8a45"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      {ed.map(([e, s, t], a) => (
        <g key={a} transform={`translate(${e} ${s}) scale(${t})`}>
          <rect x={-1.5} y={-4} width={3} height={6} fill="#6b4a30" />
          <path d="M0 -24 L8 -4 L-8 -4 Z M0 -30 L6 -14 L-6 -14 Z" fill="#3f7a45" />
        </g>
      ))}
      <path d={ea} fill="none" stroke="#4d9fd0" strokeWidth={6} strokeLinecap="round" />
      <path d={ea} fill="none" stroke="#9fd3ee" strokeWidth={2} strokeLinecap="round" />
      <path d={et} fill={`url(#${e}sea)`} opacity={0.82} />
      <path d="M494 204 L684 204" stroke="#e8f6fb" strokeWidth={2.5} />
      <path d="M540 214 q6 -4 12 0 q6 4 12 0 M600 222 q6 -4 12 0 q6 4 12 0" fill="none" stroke="#e8f6fb" strokeWidth={1.8} opacity={0.7} />
      <g fontWeight={800} fontSize={20} paintOrder="stroke" strokeWidth={4} strokeLinejoin="round">
        <text x={14} y={447} textAnchor="start" fill="#fff1e2" stroke="#6d3a2a">
          hot & squeezed
        </text>
        <text x={400} y={491} textAnchor="middle" fill="#ffe2b8" stroke="#4e170d">
          melting zone
        </text>
      </g>
    </g>
  );
}
let eu =
    ((o = (0, u.seeded)(8)),
    Array.from(
      {
        length: 16,
      },
      () => ({
        vx: (2 * o() - 1) * 80,
        h: 40 + 60 * o(),
        speed: 0.8 + 0.7 * o(),
        off: o(),
        r: 3 + 4 * o(),
        c: o() > 0.45 ? "#ff8a2a" : "#ffc24a",
      }),
    )),
  em =
    ((i = (0, u.seeded)(12)),
    Array.from(
      {
        length: 14,
      },
      () => ({
        dx: 70 + 330 * i(),
        h: 50 + 90 * i(),
        lag: 0.25 * i(),
        r: 2 + 3 * i(),
      }),
    )),
  ep =
    ((l = (0, u.seeded)(21)),
    Array.from(
      {
        length: 26,
      },
      () => ({
        x: 170 + 300 * l(),
        off: l(),
        r: 1 + 1.5 * l(),
      }),
    )),
  ex =
    ((n = (0, u.seeded)(33)),
    Array.from(
      {
        length: 9,
      },
      (e, s) => {
        let t = (s / 9) * Math.PI * 2 + 0.4 * n(),
          a = 30 + 12 * n();
        return {
          dx: Math.cos(t) * a,
          dy: Math.sin(t) * a * 0.8,
          at: 0.7 * n(),
          s: 4 + 3 * n(),
        };
      },
    )),
  ey =
    ((d = (0, u.seeded)(55)),
    Array.from(
      {
        length: 18,
      },
      (e, s) => ({
        dx: -50 + 6 * s + 4 * d(),
        off: d(),
        r: 1.4 + 1.4 * d(),
      }),
    )),
  eg = Array.from(
    {
      length: 10,
    },
    (e, s) => {
      let t = (s / 10) * Math.PI * 2;
      return {
        cx: Math.cos(t),
        cy: Math.sin(t),
      };
    },
  ),
  eb = {
    sand: "#dcc28f",
    mud: "#8a7c6e",
    shells: "#f3ecde",
  };
function CEk_({ x: e, y: s, dir: t, op: a }) {
  return (
    <g transform={`translate(${(0, u.r1)(e)} ${(0, u.r1)(s)}) scale(${t} 1)`} opacity={(0, u.r1)(100 * a) / 100}>
      <path d="M-24 -8 h20 v-10 l24 18 l-24 18 v-10 h-20 Z" fill="#f6ead8" stroke="#5b3426" strokeWidth={2.5} strokeLinejoin="round" />
    </g>
  );
}
function CEj_({ x: e, y: s, s: t, fill: a = "#fffbe8" }) {
  return (
    <g transform={`translate(${(0, u.r1)(e)} ${(0, u.r1)(s)}) scale(${(0, u.r1)(t)})`}>
      <path d={u.STAR} fill={a} stroke="#d9a441" strokeWidth={0.12} />
    </g>
  );
}
function CEw_({ run: e, p: s, b: t, at: a, uid: r }) {
  let o = e.script,
    i = [],
    l = o.start;
  switch (e.tr.how) {
    case "erupt": {
      let [e] = U(o, t, "fountain"),
        [l, n] = U(o, t, "fall"),
        [d, h] = U(o, t, "flow"),
        [f, m] = U(o, t, "set");
      if (s < n) {
        let e = Math.min(338, a.y);
        i.push(
          <rect
            key="col"
            x={731}
            y={(0, u.r1)(e)}
            width={10}
            height={(0, u.r1)(342 - e)}
            fill={`url(#${r}vent)`}
            opacity={(0, u.r1)((1 - F(s, l, n)) * 100) / 100}
          />,
        );
      }
      let p = F(s, e - 0.02, e + 0.04) * (1 - F(s, d, f + 0.05));
      if (p > 0) {
        let e = 96 * p * (0.9 + 0.1 * Math.sin(90 * s));
        i.push(
          <g key="fountain" opacity={(0, u.r1)(100 * Math.min(1, 1.5 * p)) / 100}>
            <ellipse cx={736} cy={(0, u.r1)(94 - 0.45 * e)} rx={40} ry={(0, u.r1)(0.6 * e + 10)} fill="#ffcf70" opacity={0.28} />
            <path
              d={`M716 96 C720 ${(0, u.r1)(94 - 0.45 * e)} 728 ${(0, u.r1)(94 - e)} 736 ${(0, u.r1)(94 - e)} C744 ${(0, u.r1)(94 - e)} 752 ${(0, u.r1)(94 - 0.45 * e)} 756 96 Z`}
              fill="#ff7a22"
            />
            <path
              d={`M727 96 C729 ${(0, u.r1)(94 - 0.4 * e)} 732 ${(0, u.r1)(94 - 0.8 * e)} 736 ${(0, u.r1)(94 - 0.8 * e)} C740 ${(0, u.r1)(94 - 0.8 * e)} 743 ${(0, u.r1)(94 - 0.4 * e)} 745 96 Z`}
              fill="#ffd35c"
            />
            {eu.map((e, t) => {
              let a = (7 * s * e.speed + e.off) % 1;
              return (
                <circle
                  key={t}
                  cx={(0, u.r1)(736 + e.vx * a)}
                  cy={(0, u.r1)(92 - 4 * e.h * p * a * (1 - a))}
                  r={(0, u.r1)(e.r * (1 - 0.3 * a))}
                  fill={e.c}
                />
              );
            })}
          </g>,
        );
      }
      let x = F(s, l, h),
        y = F(s, f, m);
      if (x > 0) {
        let e = {
          d: "M731 98 Q716 128 706 158 Q696 184 686 204",
          pathLength: 100,
          fill: "none",
          strokeLinecap: "round",
          strokeDasharray: `${(0, u.r1)(100 * x)} 200`,
        };
        (i.push(
          <g key="flow">
            {y < 1 && (
              <path
                {...e}
                stroke={y < 0.5 ? "#ff6a1f" : "#9a2f1e"}
                strokeOpacity={(0, u.r1)(0.35 * (1 - y) * 100) / 100}
                strokeWidth={30}
              />
            )}
            <path {...e} stroke={y < 0.33 ? "#ff6a1f" : y < 0.66 ? "#c2411e" : y < 0.9 ? "#6a3a2e" : "#3f3a37"} strokeWidth={17} />
            {y < 0.7 && <path {...e} stroke="#ffd35c" strokeOpacity={(0, u.r1)((1 - y / 0.7) * 100) / 100} strokeWidth={4} />}
          </g>,
        ),
          x > 0.9 &&
            y < 1 &&
            i.push(
              <g key="steam" fill="none" stroke="#ffffff" strokeWidth={4} strokeLinecap="round">
                {[0, 1, 2, 3].map((e) => {
                  let t = (5 * s + e / 4) % 1;
                  return (
                    <path
                      key={e}
                      d={`M${672 + 9 * e} ${(0, u.r1)(198 - 50 * t)} c7 -7 -7 -14 0 -21`}
                      opacity={(0, u.r1)((1 - t) * (1 - y) * 90) / 100}
                    />
                  );
                })}
              </g>,
            ));
      }
      break;
    }
    case "blast": {
      let [e, l] = U(o, t, "burst"),
        [n, d] = U(o, t, "fly"),
        [, h] = U(o, t, "fall");
      if (s < l) {
        let e = Math.min(312, a.y);
        i.push(<rect key="col" x={96} y={(0, u.r1)(e)} width={8} height={(0, u.r1)(316 - e)} fill={`url(#${r}vent)`} />);
      }
      let f = F(s, e, d),
        m = 1 - 0.85 * F(s, h, 1);
      if (f > 0) {
        (i.push(
          <g key="ash">
            {Array.from(
              {
                length: 14,
              },
              (e, s) => {
                let t = s / 13;
                if (t > f + 0.05) return null;
                let a = 100 + t * t * 260 * f + 10 * Math.sin(1.7 * s),
                  r = 62 - 44 * Math.min(3 * t, 1) * (0.5 + 0.5 * f) + t * t * 20,
                  o = (12 + 34 * t) * (0.55 + 0.45 * f);
                return (
                  <g key={s} opacity={(0, u.r1)(0.8 * m * 100) / 100}>
                    <circle cx={(0, u.r1)(a)} cy={(0, u.r1)(r)} r={(0, u.r1)(o)} fill={s % 3 == 0 ? "#6f6a66" : "#8d8783"} />
                    <circle cx={(0, u.r1)(a - 0.3 * o)} cy={(0, u.r1)(r - 0.35 * o)} r={(0, u.r1)(0.45 * o)} fill="#a9a39e" opacity={0.6} />
                  </g>
                );
              },
            )}
          </g>,
        ),
          i.push(
            <g key="bits" fill="#e9e3d6" stroke="#8d8783" strokeWidth={0.8}>
              {em.map((t, a) => {
                let r = F(s, e + t.lag * (h - e), h + 0.05);
                return r <= 0 || r >= 1 ? null : (
                  <circle
                    key={a}
                    cx={(0, u.r1)(100 + t.dx * r)}
                    cy={(0, u.r1)(60 + 90 * r - 4 * t.h * r * (1 - r))}
                    r={(0, u.r1)(t.r)}
                    opacity={(0, u.r1)((1 - F(r, 0.85, 1)) * 100) / 100}
                  />
                );
              })}
            </g>,
          ));
        let t = F(s, n, h) * m;
        t > 0 &&
          i.push(
            <g key="ashfall" fill="#6f6a66">
              {ep.map((e, a) => (
                <circle
                  key={a}
                  cx={(0, u.r1)(e.x)}
                  cy={(0, u.r1)(40 + ((3 * s + e.off) % 1) * 110)}
                  r={(0, u.r1)(e.r)}
                  opacity={(0, u.r1)(0.45 * t * 100) / 100}
                />
              ))}
            </g>,
          );
      }
      break;
    }
    case "cool": {
      let [e, l] = U(o, t, "cool"),
        n = 1 - F(s, e, l);
      i.push(
        <circle key="glow" cx={(0, u.r1)(a.x)} cy={(0, u.r1)(a.y)} r={50} fill={`url(#${r}glow)`} opacity={(0, u.r1)(90 * n) / 100} />,
      );
      let d = F(s, e, l);
      ex.forEach((e, s) => {
        let t = E((d - e.at) * 4);
        t > 0 && i.push(<CEj_ key={`s${s}`} x={a.x + e.dx} y={a.y + e.dy} s={e.s * t} />);
      });
      break;
    }
    case "wear":
    case "dissolve": {
      let [r, n] = U(o, t, "lift"),
        [d, h] = U(o, t, "rain");
      if (r < 2 && s > r && s < n + 0.02) {
        let e = V(F(s, r, n));
        i.push(
          <g
            key="lift"
            fill="none"
            stroke="#fffdf8"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={(0, u.r1)(100 * e) / 100}
          >
            {[-1, 1].map((e) =>
              [0, 1].map((s) => <path key={`${e}${s}`} d={`M${(0, u.r1)(a.x + 40 * e - 8)} ${(0, u.r1)(a.y + 14 - 14 * s)} l8 -8 l8 8`} />),
            )}
          </g>,
        );
      }
      let f = F(s, d - 0.02, d + 0.04) * (1 - F(s, h - 0.04, h + 0.02));
      if (f > 0) {
        let t = o.legs.find((e) => "rain" === e.tag),
          r = t ? t.pts[0] : l,
          n = Math.max(24, r[1] - 58),
          m = F(s, d, h);
        if (
          (i.push(
            <g key="rain" opacity={(0, u.r1)(100 * f) / 100}>
              <g stroke="#3f8fc4" strokeWidth={3} strokeLinecap="round">
                {Array.from(
                  {
                    length: 10,
                  },
                  (e, s) => {
                    let t = (5 * m + 0.37 * s) % 1,
                      a = r[0] - 36 + 8 * s,
                      o = n + 14,
                      i = o + t * Math.max(16, r[1] - 12 - o);
                    return (
                      <line
                        key={s}
                        x1={(0, u.r1)(a)}
                        y1={(0, u.r1)(i)}
                        x2={(0, u.r1)(a - 3)}
                        y2={(0, u.r1)(i + 10)}
                        opacity={(0, u.r1)((1 - 0.5 * t) * 100) / 100}
                      />
                    );
                  },
                )}
              </g>
              <CEh_ x={r[0] - 4} y={n} k={1.05} fill="#7d8794" op={0.96} />
            </g>,
          ),
          "wear" === e.tr.how)
        ) {
          let t = F(s, d + (h - d) * 0.66, h + 0.04);
          if (t > 0 && t < 1) {
            let s = eb[e.to] ?? "#c9b48e";
            i.push(
              <g key="crumbs" fill={s} stroke="#6b5a48" strokeWidth={0.8}>
                {eg.map((e, s) => (
                  <circle
                    key={s}
                    cx={(0, u.r1)(a.x + e.cx * (12 + 26 * t))}
                    cy={(0, u.r1)(a.y + e.cy * (10 + 18 * t) + 22 * t * t)}
                    r={3}
                    opacity={(0, u.r1)((1 - t) * 100) / 100}
                  />
                ))}
              </g>,
            );
          }
        }
      }
      let [m, p] = U(o, t, "river"),
        [x, y] = U(o, t, "roll"),
        [g, b] = U(o, t, "sea"),
        k = Math.max(m < 2 ? F(s, m, m + 0.03) * (1 - F(s, p, p + 0.05)) : 0, x < 2 ? F(s, x, x + 0.03) * (1 - F(s, y, y + 0.05)) : 0);
      if (
        (m < 2 &&
          k > 0 &&
          i.push(
            <path
              key="shimmer"
              d={ea}
              fill="none"
              stroke="#f2fbff"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="6 22"
              strokeDashoffset={(0, u.r1)(-(1400 * s))}
              opacity={(0, u.r1)(100 * k) / 100}
            />,
          ),
        g < 2)
      ) {
        let e = F(s, g, g + 0.03) * (1 - F(s, b, b + 0.05));
        e > 0 &&
          i.push(
            <g key="ripples" fill="none" stroke="#e8f6fb" strokeWidth={2}>
              {[0, 1].map((t) => {
                let r = (6 * s + t / 2) % 1;
                return (
                  <ellipse
                    key={t}
                    cx={(0, u.r1)(a.x)}
                    cy={(0, u.r1)(a.y + 18)}
                    rx={(0, u.r1)(10 + 26 * r)}
                    ry={(0, u.r1)(3 + 6 * r)}
                    opacity={(0, u.r1)((1 - r) * e * 100) / 100}
                  />
                );
              })}
            </g>,
          );
      }
      let [j, w] = U(o, t, "build");
      if (j < 2) {
        let e = F(s, j, w);
        ex.forEach((t, r) => {
          let o = E((e - 0.5 * t.at) * 3) * (1 - F(s, 0.97, 1));
          o > 0 && i.push(<CEj_ key={`b${r}`} x={a.x + t.dx} y={a.y + t.dy} s={t.s * o * 0.8} />);
        });
      }
      break;
    }
    case "bury": {
      let [n] = U(o, t, "settle"),
        [, d] = U(o, t, "sink"),
        [h, f] = U(o, t, "press"),
        m = eb[e.from] ?? "#dcc28f",
        p = F(s, n, n + 0.03) * (1 - F(s, d, d + 0.06));
      if (p > 0) {
        let t = "chalk" === e.to;
        i.push(
          <g key="fall" fill={t ? "#ffffff" : m} stroke={t ? "#b9c9d6" : "#6b5a48"} strokeWidth={0.6}>
            {ey.map((e, t) => {
              var a;
              let r = l[0] + e.dx,
                o =
                  (a = Math.max(496, Math.min(680, r))) < 530
                    ? 204 + ((a - 494) * 52) / 36
                    : a < 640
                      ? 256 + ((a - 530) * 4) / 110
                      : 260 - ((a - 640) * 38) / 28,
                i = 210 + ((4 * s + e.off) % 1) * Math.max(4, o - 214);
              return <circle key={t} cx={(0, u.r1)(r)} cy={(0, u.r1)(i)} r={(0, u.r1)(e.r)} opacity={(0, u.r1)(100 * p) / 100} />;
            })}
          </g>,
        );
      }
      let x = F(s, n, h),
        y = [m, "#b9a37e", "#8e8880"];
      i.push(
        <g key="layers" clipPath={`url(#${r}seaclip)`}>
          {[0, 1, 2].map((e) => {
            let t = E(3 * x - e) * (1 - F(s, 0.94, 1));
            if (t <= 0) return null;
            let a = 6 * e,
              r = 6 * (e + 1);
            return (
              <path
                key={e}
                d={`M534 ${256 - r} L636 ${260 - r} L636 ${260 - a} L534 ${256 - a} Z`}
                fill={y[e]}
                opacity={(0, u.r1)(100 * t) / 100}
              />
            );
          })}
        </g>,
      );
      let g = F(s, h, h + 0.05) * (1 - F(s, f - 0.05, f));
      if (g > 0) {
        let e = 4 * Math.sin(60 * s);
        i.push(
          <g key="press" opacity={(0, u.r1)(100 * g) / 100}>
            {[-30, 0, 30].map((s) => (
              <path
                key={s}
                d={`M${(0, u.r1)(a.x + s - 6)} ${(0, u.r1)(a.y - 66 + e)} h12 v10 h7 l-13 14 l-13 -14 h7 Z`}
                fill="#fffdf8"
                stroke="#1f2a22"
                strokeWidth={1.8}
                strokeLinejoin="round"
              />
            ))}
          </g>,
        );
      }
      break;
    }
    case "squeeze":
    case "bake": {
      let [l, n] = U(o, t, "squeeze"),
        d = F(s, l, l + 0.06) * (1 - F(s, n - 0.06, n));
      if (d > 0) {
        let t = 6 * (0.5 - 0.5 * Math.cos(F(s, l, n) * Math.PI * 8));
        if (
          (i.push(
            <circle key="heat" cx={(0, u.r1)(a.x)} cy={(0, u.r1)(a.y)} r={54} fill={`url(#${r}heat)`} opacity={(0, u.r1)(90 * d) / 100} />,
          ),
          i.push(<CEk_ key="l" x={a.x - 64 + t} y={a.y} dir={1} op={d} />),
          i.push(<CEk_ key="r" x={a.x + 64 - t} y={a.y} dir={-1} op={d} />),
          "bake" === e.tr.how || F(s, l, n) > 0.4)
        ) {
          let e = F(s, l + (n - l) * 0.3, n);
          ex.forEach((s, t) => {
            let r = E((e - s.at) * 3) * d;
            r > 0 && i.push(<CEj_ key={`s${t}`} x={a.x + 0.8 * s.dx} y={a.y + 0.8 * s.dy} s={s.s * r * 0.8} />);
          });
        }
      }
      break;
    }
    case "melt": {
      let [e, l] = U(o, t, "sink"),
        [, n] = U(o, t, "melt"),
        [d, h] = U(o, t, "rise"),
        f = F(s, e + (l - e) * 0.5, n) * (1 - F(s, h, 1));
      if (
        (f > 0 &&
          i.push(
            <circle key="glow" cx={(0, u.r1)(a.x)} cy={(0, u.r1)(a.y)} r={56} fill={`url(#${r}glow)`} opacity={(0, u.r1)(100 * f) / 100} />,
          ),
        s > d)
      ) {
        let e = F(s, d, d + 0.05) * (1 - F(s, h, 1));
        i.push(
          <path
            key="feeder"
            d="M120 470 Q108 420 100 357"
            fill="none"
            stroke="#ffd35c"
            strokeWidth={9}
            strokeLinecap="round"
            opacity={(0, u.r1)(100 * e) / 100}
          />,
        );
      }
      break;
    }
    case "sink": {
      let [e, l] = U(o, t, "sink"),
        [n, d] = U(o, t, "deep"),
        [h, f] = U(o, t, "plume"),
        m = F(s, e, e + 0.04) * (1 - F(s, l, n + 0.05));
      if (m > 0) {
        let [e, s] = o.legs[0].pts,
          t = o.start;
        i.push(
          <path
            key="slab"
            d={`M${t[0]} ${t[1]} L${e[0]} ${e[1]} L${s[0]} ${s[1]}`}
            fill="none"
            stroke="#fffdf8"
            strokeWidth={3}
            strokeDasharray="10 10"
            strokeLinecap="round"
            opacity={(0, u.r1)(80 * m) / 100}
          />,
        );
      }
      let p = F(s, n, d) * (1 - F(s, f, 1));
      p > 0 &&
        i.push(
          <circle key="deep" cx={(0, u.r1)(a.x)} cy={(0, u.r1)(a.y)} r={54} fill={`url(#${r}glow)`} opacity={(0, u.r1)(100 * p) / 100} />,
        );
      let x = F(s, h - 0.05, h + 0.02) * (1 - F(s, f + 0.02, 1));
      x > 0 &&
        i.push(
          <path
            key="plume"
            d={`M712 496 Q722 440 ${(0, u.r1)(a.x - 16)} ${(0, u.r1)(a.y + 12)} L${(0, u.r1)(a.x + 16)} ${(0, u.r1)(a.y + 12)} Q750 440 760 496 Z`}
            fill={`url(#${r}plume)`}
            opacity={(0, u.r1)(85 * x) / 100}
          />,
        );
      break;
    }
    case "soak": {
      let [e, r] = U(o, t, "seep"),
        l = F(s, e, e + 0.06) * (1 - F(s, r - 0.06, r));
      l > 0 &&
        (i.push(
          <g key="seep" fill="none" stroke="#3f9fc4" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            {[0, 1, 2, 3, 4, 5].map((e) => {
              let t = (5 * s + e / 6) % 1,
                r = a.x - 70 + 26 * e + 16 * t,
                o = a.y + 36 - 60 * t;
              return (
                <path
                  key={e}
                  d={`M${(0, u.r1)(r)} ${(0, u.r1)(o)} q7 -6 0 -14 l-4 4 m4 -4 l5 3`}
                  opacity={(0, u.r1)(l * V(t) * 100) / 100}
                />
              );
            })}
          </g>,
        ),
        i.push(
          <text
            key="label"
            x={(0, u.r1)(a.x)}
            y={(0, u.r1)(a.y + 52)}
            textAnchor="middle"
            fontSize={17}
            fontWeight={800}
            fill="#e8f6fb"
            stroke="#1f4f66"
            strokeWidth={4}
            paintOrder="stroke"
            opacity={(0, u.r1)(100 * l) / 100}
          >
            magnesium-rich water
          </text>,
        ));
    }
  }
  return <g aria-hidden="true">{i}</g>;
}
function CEL_({ how: e }) {
  let s,
    t = {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };
  return (
    (s =
      "erupt" === e || "blast" === e ? (
        <path {...t} d="M3 21 L9 9 H15 L21 21 Z M12 9 V5 M8 6 L10 8 M16 6 L14 8" />
      ) : "cool" === e ? (
        <path {...t} d="M12 3 L19 7 V15 L12 19 L5 15 V7 Z M12 3 V19 M5 7 L19 15 M19 7 L5 15" />
      ) : "melt" === e ? (
        <path
          {...t}
          d="M12 3 C15 8 18 10 18 14 A6 6 0 0 1 6 14 C6 10 9 9 12 3 Z M12 12 C13 14 14 15 14 16.5 A2 2 0 0 1 10 16.5 C10 15 11 14 12 12 Z"
        />
      ) : "sink" === e ? (
        <path {...t} d="M3 7 Q7 4 11 7 T21 7 M12 10 V21 M8 17 L12 21 L16 17" />
      ) : "wear" === e ? (
        <path {...t} d="M7 12 A4 4 0 0 1 8 4 A5 5 0 0 1 17 5 A3.5 3.5 0 0 1 17 12 Z M8 16 L7 19 M12 15 L11 18 M16 16 L15 19" />
      ) : "dissolve" === e || "soak" === e ? (
        <path {...t} d="M12 3 C15 8 18 11 18 15 A6 6 0 0 1 6 15 C6 11 9 8 12 3 Z M9.5 15 A2.5 2.5 0 0 0 12 17.5" />
      ) : "bury" === e ? (
        <path {...t} d="M4 14 H20 M4 18 H20 M4 22 H20 M12 2 V10 M9 7 L12 10 L15 7" />
      ) : (
        <path {...t} d="M2 12 H9 M6 8 L10 12 L6 16 M22 12 H15 M18 8 L14 12 L18 16" />
      )),
    (
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true" focusable="false">
        {s}
      </svg>
    )
  );
}
let eM = {
    fire: "bg-rust text-white",
    water: "bg-azure text-white",
    squeeze: "bg-moss text-white",
  },
  ev = {
    igneous: "#c8352b",
    sedimentary: "#2c6fb5",
    metamorphic: "#2f5d3a",
    magma: "#d9a441",
    sediment: "#d9a441",
  };
function CE$_({ look: e, uid: s, size: t = "h-7 w-8" }) {
  return (
    <svg viewBox="-62 -50 124 100" className={`${t} shrink-0`} aria-hidden="true" focusable="false">
      <Z look={e} uid={s} detail="lo" flat />
    </svg>
  );
}
function CEz_({ two: e, four: s, six: t, outside: a }) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-paper-2/60 p-4 text-sm leading-snug">
      <p className="eyebrow">Say it like this</p>
      <ul className="mt-3 grid gap-2.5">
        {[
          ["2", e],
          ["4", s],
          ["6", t],
        ].map(([e, s]) => (
          <li key={e} className="flex items-start gap-3">
            <span className="mt-px inline-flex shrink-0 items-center rounded-full bg-moss/10 px-2.5 py-0.5 text-xs font-semibold text-moss">
              {"Age "}
              {e}
            </span>
            <span className="text-ink">“{s}”</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-line/70 pt-3 text-ink">
        <span className="font-semibold text-azure">{"Go outside: "}</span>
        {a}
      </p>
    </div>
  );
}
let eN = `
.rc-blink{transform-box:fill-box;transform-origin:center;animation:rcBlink 5s infinite}
@keyframes rcBlink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.12)}}
.rc-bob{animation:rcBob 2.6s ease-in-out infinite}
@keyframes rcBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.rc-glint{transform-box:fill-box;transform-origin:center;animation:rcTwinkle 1.9s ease-in-out infinite}
@keyframes rcTwinkle{0%,100%{opacity:.25;transform:scale(.5)}50%{opacity:1;transform:scale(1.15)}}
.rc-glow{animation:rcGlow 2.4s ease-in-out infinite}
@keyframes rcGlow{0%,100%{opacity:.7}50%{opacity:1}}
.rc-bubble{animation:rcBubble 3.2s ease-in infinite;opacity:0}
@keyframes rcBubble{0%{transform:translateY(0);opacity:0}20%{opacity:.9}100%{transform:translateY(-24px);opacity:0}}
.rc-banner{transform-box:fill-box;transform-origin:center;animation:rcBanner 3.8s ease-out forwards}
@keyframes rcBanner{0%{opacity:0;transform:scale(.5)}9%{opacity:1;transform:scale(1.1)}15%{transform:scale(1)}80%{opacity:1}100%{opacity:0}}
.rc-burst{animation:rcBurst 1.2s ease-out forwards}
@keyframes rcBurst{0%{transform:translate(0,0) scale(.2);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(1);opacity:0}}
.rc-spin{transform-box:fill-box;transform-origin:center;animation:rcSpin 7s linear infinite}
@keyframes rcSpin{to{transform:rotate(360deg)}}
.rc-pop{animation:rcPop .6s ease-out}
@keyframes rcPop{0%{transform:scale(.6)}60%{transform:scale(1.12)}100%{transform:scale(1)}}
@media (prefers-reduced-motion: reduce){
.rc-blink,.rc-bob,.rc-glint,.rc-glow,.rc-spin,.rc-pop,.rc-banner{animation:none}
.rc-bubble,.rc-burst{animation:none;opacity:0}
}
`;
export const RockCycle = function () {
  var e, s, t;
  let a = "rc" + (0, f.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    [r, o] = (0, f.useState)(J),
    [i, l] = (0, f.useState)(null),
    [n, d] = (0, f.useState)(0),
    [m, p] = (0, f.useState)(null),
    [g, b] = (0, f.useState)(null),
    k = (0, f.useRef)(0),
    j = (0, f.useRef)(false),
    w = (0, f.useRef)(null);
  (0, f.useEffect)(() => {
    if (!i) return;
    let e = "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 450 : i.dur,
      s = 0,
      t = -1,
      a = (r) => {
        t < 0 && (t = r);
        let o = Math.min(1, (r - t) / e);
        if ((d(o), o < 1)) {
          s = requestAnimationFrame(a);
          return;
        }
        (l(null),
          p({
            key: i.key,
            banner: i.banner,
            isNew: i.isNew,
          }),
          j.current && ((j.current = false), w.current?.querySelector("button")?.focus()));
      };
    return ((s = requestAnimationFrame(a)), () => cancelAnimationFrame(s));
  }, [i]);
  let v = i
      ? (function (e) {
          let s = e.legs.reduce((e, s) => e + s.w, 0),
            t = [0],
            a = 0;
          for (let r of e.legs) ((a += r.w), t.push(a / s));
          return t;
        })(i.script)
      : [0, 1],
    q = i
      ? (function (e, s, t) {
          let a = e.start;
          for (let i = 0; i < e.legs.length; i++) {
            let l = e.legs[i];
            if (t <= s[i + 1] || i === e.legs.length - 1) {
              var r, o;
              let e =
                  ((r = F(t, s[i], s[i + 1])),
                  "lin" === (o = l.ease) ? r : "in" === o ? r * r : "out" === o ? 1 - (1 - r) * (1 - r) : r * r * (3 - 2 * r)),
                n = [a, ...l.pts],
                d = [],
                c = 0;
              for (let e = 0; e < n.length - 1; e++) {
                let s = Math.hypot(n[e + 1][0] - n[e][0], n[e + 1][1] - n[e][1]);
                (d.push(s), (c += s));
              }
              if (c < 0.01)
                return {
                  x: a[0],
                  y: a[1],
                  dx: 0,
                  dy: 0,
                };
              let h = e * c;
              for (let e = 0; e < d.length; e++) {
                if (h <= d[e] || e === d.length - 1) {
                  let s = d[e] ? Math.min(1, h / d[e]) : 0,
                    [t, a] = n[e],
                    [r, o] = n[e + 1];
                  return {
                    x: t + (r - t) * s,
                    y: a + (o - a) * s,
                    dx: d[e] ? (r - t) / d[e] : 0,
                    dy: d[e] ? (o - a) / d[e] : 0,
                  };
                }
                h -= d[e];
              }
            }
            a = l.pts[l.pts.length - 1];
          }
          return {
            x: a[0],
            y: a[1],
            dx: 0,
            dy: 0,
          };
        })(i.script, v, n)
      : {
          x: x[r.at].at[0],
          y: x[r.at].at[1],
          dx: 0,
          dy: 0,
        },
    C = $(r.at, r.origin),
    W = i
      ? (function (e, s, t, a) {
          let r = t;
          for (let t of e.morphs) {
            let [o, i] = U(e, s, t.tag),
              l = o + t.f * (i - o),
              n = l - t.w / 2,
              d = l + t.w / 2;
            if (a >= d) {
              r = t.to;
              continue;
            }
            if (a > n)
              return {
                a: r,
                b: t.to,
                k: (a - n) / (d - n),
              };
            break;
          }
          return {
            a: r,
            b: null,
            k: 0,
          };
        })(i.script, v, i.fromLook, n)
      : {
          a: C,
          b: null,
          k: 0,
        },
    S = 0;
  if (i && "wear" === i.tr.how) {
    let [e, s] = U(i.script, v, "rain"),
      t = (t) => e + (s - e) * t;
    S = F(n, t(0.3), t(0.62)) * (1 - F(n, t(0.66), t(0.74)));
  }
  let Q = i ? [q.dx, q.dy] : [0, 0.3],
    P = i
      ? ((e = i.prevYears),
        (s = r.years),
        (t = F(n, 0.05, 0.95)) <= 0 ? e : t >= 1 ? s : Math.exp(Math.log(e + 1) + (Math.log(s + 1) - Math.log(e + 1)) * t) - 1)
      : r.years,
    A = i && n < 0.9 ? i.prevMade : r.made.length,
    T = i && n < 0.97 ? r.trail.slice(0, -1) : r.trail,
    Y = i ? L[i.from] : L[r.at],
    B = i ? i.fromOrigin : r.origin,
    I = i ? i.tr.doing : r.said,
    G = i ? i.tr.span : r.span,
    R = W.b && W.k > 0.5 ? W.b : W.a,
    E = null !== g && !i && Y[g] ? x[X(Y[g], r.origin)].at : null,
    V = x[r.at],
    K = `A cut-away landscape: a volcano in a mountain range, a river running down to the sea, a volcanic island, and hot rock deep below. Your rock is ${i ? "on its way" : `${z(C).toLowerCase()}, ${V.where}`}.`,
    es = Math.max(0, T.length - 12),
    ea = T.slice(es);
  return (
    <div className="@container text-ink">
      <style>{eN}</style>
      <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] @3xl:items-start">
        <div className="overflow-hidden rounded-2xl border border-line">
          <svg viewBox="0 0 800 500" className="block h-auto w-full select-none" role="img" aria-label={K}>
            <defs>
              <D uid={a} />
              <linearGradient id={`${a}vent`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e2511f" />
                <stop offset="0.5" stopColor="#ffb040" />
                <stop offset="1" stopColor="#e2511f" />
              </linearGradient>
              <radialGradient id={`${a}glow`}>
                <stop offset="0.3" stopColor="#ff9a3c" stopOpacity="0.85" />
                <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${a}heat`}>
                <stop offset="0.2" stopColor="#ff8a4a" stopOpacity="0.7" />
                <stop offset="1" stopColor="#d9481f" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${a}plume`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#ffb04a" stopOpacity="0.95" />
                <stop offset="1" stopColor="#ff7a2a" stopOpacity="0.35" />
              </linearGradient>
              <clipPath id={`${a}seaclip`}>
                <path d={et} />
              </clipPath>
            </defs>
            <CEf_ uid={a} />
            {i && <CEw_ run={i} p={n} b={v} at={q} uid={a} />}
            {E && (
              <g transform={`translate(${E[0]} ${E[1]})`} aria-hidden="true">
                <g className="rc-spin">
                  <circle r={36} fill="none" stroke="#fffdf8" strokeWidth={6} strokeDasharray="10 8" opacity={0.9} />
                  <circle r={36} fill="none" stroke="#d9a441" strokeWidth={3} strokeDasharray="10 8" />
                </g>
              </g>
            )}
            <g transform={`translate(${(0, u.r1)(q.x)} ${(0, u.r1)(q.y)}) scale(0.58)`} aria-hidden="true">
              <g className={i ? undefined : "rc-bob"}>
                <ellipse cx={0} cy={2} rx={64} ry={52} fill="#fffdf8" opacity={0.3} />
                <g opacity={W.b ? (0, u.r1)((1 - W.k) * 100) / 100 : 1}>
                  <Z look={W.a} uid={a} />
                </g>
                {W.b && (
                  <g opacity={(0, u.r1)(100 * W.k) / 100}>
                    <Z look={W.b} uid={a} />
                  </g>
                )}
                {S > 0 && (
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={(0, u.r1)(100 * S) / 100}>
                    <path
                      d="M-30 -30 L-16 -12 L-22 2 L-8 18 M-16 -12 L-2 -16 L10 -2 L4 12 L18 26 M10 -2 L30 -8"
                      stroke="#fffdf8"
                      strokeWidth={5}
                    />
                    <path
                      d="M-30 -30 L-16 -12 L-22 2 L-8 18 M-16 -12 L-2 -16 L10 -2 L4 12 L18 26 M10 -2 L30 -8"
                      stroke="#1f1a17"
                      strokeWidth={2.5}
                    />
                  </g>
                )}
                <O look={R} gaze={Q} excited={!!i} />
              </g>
            </g>
            {m && !i && (
              <g key={m.key} aria-hidden="true">
                <g transform={`translate(${(0, u.r1)(q.x)} ${(0, u.r1)(q.y)})`}>
                  {ex.map((e, s) => (
                    <g
                      key={s}
                      className="rc-burst"
                      style={{
                        "--dx": `${(0, u.r1)(1.6 * e.dx)}px`,
                        "--dy": `${(0, u.r1)(1.6 * e.dy)}px`,
                      }}
                    >
                      <path d={u.STAR} transform="scale(7)" fill={s % 2 ? "#ffd45c" : "#fffdf8"} stroke="#d9a441" strokeWidth={0.1} />
                    </g>
                  ))}
                </g>
                <g transform="translate(400 34)">
                  <g className="rc-banner">
                    <rect
                      x={(0, u.r1)(-(8.2 * m.banner.length + 34))}
                      y={-24}
                      width={(0, u.r1)(16.4 * m.banner.length + 68)}
                      height={48}
                      rx={24}
                      fill="#1f2a22"
                      stroke="#d9a441"
                      strokeWidth={3}
                    />
                    <text y={9} textAnchor="middle" fontSize={27} fontWeight={800} fill="#fffdf8">
                      {m.banner}
                    </text>
                    {m.isNew && (
                      <g transform={`translate(${(0, u.r1)(8.2 * m.banner.length + 30)} -22) rotate(12)`}>
                        <rect x={-30} y={-14} width={60} height={28} rx={14} fill="#d9a441" stroke="#fffdf8" strokeWidth={2} />
                        <text y={6} textAnchor="middle" fontSize={17} fontWeight={800} fill="#1f2a22">
                          NEW!
                        </text>
                      </g>
                    )}
                  </g>
                </g>
              </g>
            )}
          </svg>
        </div>
        <div className="@container flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div key={m ? m.key : "still"} className={`shrink-0 rounded-2xl border border-line bg-paper-2 p-1.5 ${m ? "rc-pop" : ""}`}>
              <svg viewBox="-62 -50 124 100" className="block h-20 w-24" aria-hidden="true" focusable="false">
                <defs>
                  <D uid={`${a}p`} />
                </defs>
                <g opacity={W.b ? (0, u.r1)((1 - W.k) * 100) / 100 : 1}>
                  <Z look={W.a} uid={`${a}p`} />
                </g>
                {W.b && (
                  <g opacity={(0, u.r1)(100 * W.k) / 100}>
                    <Z look={W.b} uid={`${a}p`} />
                  </g>
                )}
              </svg>
            </div>
            <div className="min-w-0">
              <p className="eyebrow">{i ? "Your rock is…" : "Your rock is now"}</p>
              <p className="font-display text-3xl font-semibold leading-tight">
                {i ? "changing" : z(C)}
                {!i && V.say && <span className="ml-2 align-middle font-sans text-sm font-normal text-ink-2">say “{V.say}”</span>}
              </p>
              <p className="text-sm text-ink-2">
                {i ? "Watch the picture" : "droplet" === C ? "Carried away in rainwater" : N[x["schistGreen" === C ? "schist" : C].family]}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-paper-2 px-3 py-2">
              <p className="eyebrow">Time so far</p>
              <p className="font-display text-lg font-semibold leading-tight tabular-nums">
                {(function (e) {
                  if (e <= 0) return "0 years";
                  if (e < 1) return "under a year";
                  if (e < 1.5) return "about 1 year";
                  if (e < 1e3) return `about ${Math.round(e)} years`;
                  if (e < 1e6) {
                    let s = 10 ** (Math.floor(Math.log10(e)) - 1);
                    return `about ${String(Math.round(Math.round(e / s) * s)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} years`;
                  }
                  return e < 1e9 ? `about ${ee(e / 1e6)} million years` : `about ${ee(e / 1e9)} billion years`;
                })(P)}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-ink-2">{G ? `This step: ${G}` : "No time has passed yet"}</p>
            </div>
            <div className="rounded-xl bg-paper-2 px-3 py-2">
              <p className="eyebrow">Rocks made</p>
              <p className="font-display text-lg font-semibold leading-tight">
                {A}{" "}
                <span className="text-sm font-normal text-ink-2">
                  {"of "}
                  {y.length}
                  {" kinds"}
                </span>
              </p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-gold transition-[width] duration-500"
                  style={{
                    width: `${Math.round((A / y.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <p aria-live="polite" className="font-display min-h-[4.5rem] text-lg leading-snug">
            {I}
          </p>
          {!i && r.years > 45e8 && (
            <p className="-mt-2 text-sm text-ink-2">
              That’s longer than Earth has existed — about 4.5 billion years. Real rocks only get round a few times.
            </p>
          )}
          <div ref={w} role="group" aria-label="What happens next?" className="grid gap-2 @sm:grid-cols-2 @3xl:grid-cols-1">
            {Y.map((e, s) => {
              let t = x[X(e, B)],
                a = null !== i && i.choice === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-disabled={!!i || undefined}
                  onClick={(e) =>
                    ((e, s) => {
                      if (i) return;
                      let t = L[r.at][e];
                      if (!t) return;
                      let a = X(t, r.origin),
                        n = x[a].family,
                        c =
                          "igneous" === n || "magma" === n ? "igneous" : "sedimentary" === n || "sediment" === n ? "sedimentary" : r.origin,
                        h = $(r.at, r.origin),
                        f = $(a, c),
                        u = (function (e, s, t, a) {
                          let r = x[e].at,
                            o = x[t].at;
                          switch (s) {
                            case "erupt":
                              return {
                                start: r,
                                legs: [
                                  H("rise", 1, [[736, 104]]),
                                  H("fountain", 0.45, [[736, 30]], "out"),
                                  H("fall", 0.4, [[716, 98]], "in"),
                                  H("flow", 0.6, [o], "out"),
                                  H("set", 1.1, [o]),
                                ],
                                morphs: [
                                  {
                                    tag: "set",
                                    f: 0.45,
                                    w: 0.12,
                                    to: a,
                                  },
                                ],
                              };
                            case "blast":
                              return {
                                start: r,
                                legs: [
                                  H("rise", 1, [[100, 84]]),
                                  H("burst", 0.35, [[100, 26]], "out"),
                                  H(
                                    "fly",
                                    0.9,
                                    [
                                      [190, 20],
                                      [320, 52],
                                    ],
                                    "lin",
                                  ),
                                  H("fall", 0.5, [o], "in"),
                                  H("rest", 0.7, [o]),
                                ],
                                morphs: [
                                  {
                                    tag: "burst",
                                    f: 0.75,
                                    w: 0.08,
                                    to: a,
                                  },
                                ],
                              };
                            case "cool":
                              return {
                                start: r,
                                legs: [H("move", 1, [o]), H("cool", 1.6, [o])],
                                morphs: [
                                  {
                                    tag: "cool",
                                    f: 0.45,
                                    w: 0.35,
                                    to: a,
                                  },
                                ],
                              };
                            case "wear": {
                              let s = _(e);
                              return {
                                start: r,
                                legs: [...s.pre, H("rain", 1.1, [s.rain]), ...s.post, H("settle", 0.6, [o]), H("rest", 0.3, [o])],
                                morphs: [
                                  {
                                    tag: "rain",
                                    f: 0.72,
                                    w: 0.05,
                                    to: a,
                                  },
                                ],
                              };
                            }
                            case "dissolve": {
                              let s = _(e),
                                t = "island" === x[e].zone || "islandDeep" === x[e].zone;
                              return {
                                start: r,
                                legs: [
                                  ...s.pre,
                                  H("rain", 1.1, [s.rain]),
                                  ...s.post,
                                  H("sea", t ? 0.5 : 0.9, t ? [o] : [[560, 214], o]),
                                  H("build", 1, [o]),
                                ],
                                morphs: [
                                  {
                                    tag: "rain",
                                    f: 0.7,
                                    w: 0.06,
                                    to: "droplet",
                                  },
                                  {
                                    tag: "build",
                                    f: 0.35,
                                    w: 0.1,
                                    to: a,
                                  },
                                ],
                              };
                            }
                            case "bury":
                              return {
                                start: r,
                                legs: [H("settle", 0.9, [r]), H("sink", 1.1, [o]), H("press", 1, [o])],
                                morphs: [
                                  {
                                    tag: "press",
                                    f: 0.45,
                                    w: 0.12,
                                    to: a,
                                  },
                                ],
                              };
                            case "squeeze":
                              return {
                                start: r,
                                legs: [H("sink", 1.2, [o]), H("squeeze", 1.5, [o])],
                                morphs: [
                                  {
                                    tag: "squeeze",
                                    f: 0.5,
                                    w: 0.15,
                                    to: a,
                                  },
                                ],
                              };
                            case "bake":
                              return {
                                start: r,
                                legs: [H("squeeze", 2.2, [r])],
                                morphs: [],
                              };
                            case "melt": {
                              let e = [r[0], 472];
                              return {
                                start: r,
                                legs: [
                                  H("sink", 1, [e]),
                                  H("melt", 1, [e]),
                                  H("gather", 0.6, [[120, 472]]),
                                  H("rise", 1, [[108, 404], o]),
                                  H("rest", 0.3, [o]),
                                ],
                                morphs: [
                                  {
                                    tag: "melt",
                                    f: 0.5,
                                    w: 0.25,
                                    to: a,
                                  },
                                ],
                              };
                            }
                            case "sink":
                              return {
                                start: r,
                                legs: [
                                  H(
                                    "sink",
                                    1.4,
                                    "basalt" === e
                                      ? [
                                          [662, 262],
                                          [604, 468],
                                        ]
                                      : [
                                          [640, 390],
                                          [604, 468],
                                        ],
                                  ),
                                  H("deep", 1, [[604, 468]]),
                                  H("drift", 0.6, [[736, 474]]),
                                  H("plume", 1, [o]),
                                  H("rest", 0.3, [o]),
                                ],
                                morphs: [
                                  {
                                    tag: "deep",
                                    f: 0.55,
                                    w: 0.2,
                                    to: a,
                                  },
                                ],
                              };
                            case "soak":
                              return {
                                start: r,
                                legs: [H("move", 0.6, [o]), H("seep", 1.7, [o])],
                                morphs: [
                                  {
                                    tag: "seep",
                                    f: 0.55,
                                    w: 0.2,
                                    to: a,
                                  },
                                ],
                              };
                          }
                        })(r.at, t.how, a, f),
                        m = ("igneous" === n || "sedimentary" === n || "metamorphic" === n) && !r.made.includes(a);
                      ((k.current += 1),
                        (j.current = s),
                        b(null),
                        p(null),
                        d(0),
                        l({
                          key: k.current,
                          choice: e,
                          fromOrigin: r.origin,
                          from: r.at,
                          fromLook: h,
                          to: a,
                          toLook: f,
                          tr: t,
                          script: u,
                          dur: Math.round(850 * u.legs.reduce((e, s) => e + s.w, 0)),
                          prevYears: r.years,
                          prevMade: r.made.length,
                          banner: (function (e, s, t, a) {
                            if (t === s) return `Still ${x[t].name.toLowerCase()}!`;
                            let r = x[t].family;
                            return "magma" === r
                              ? "sink" === e.how
                                ? "Magma again!"
                                : "It melted!"
                              : "shells" === t
                                ? "Shells and lime mud!"
                                : "sediment" === r
                                  ? `Now it's ${x[t].name.toLowerCase()}!`
                                  : `You made ${z(a).toLowerCase()}!`;
                          })(t, r.at, a, f),
                          isNew: m,
                        }),
                        o({
                          at: a,
                          origin: c,
                          trail: [
                            ...r.trail,
                            {
                              id: a,
                              look: f,
                            },
                          ],
                          made: m ? [...r.made, a] : r.made,
                          years: r.years + t.yrs,
                          said: t.toSed && "sedimentary" === c && t.doneSed ? t.doneSed : t.done,
                          span: t.span,
                        }));
                    })(s, 0 === e.detail)
                  }
                  onPointerEnter={() => b(s)}
                  onPointerLeave={() => b(null)}
                  onFocus={() => b(s)}
                  onBlur={() => b(null)}
                  className={`flex min-h-14 items-center gap-3 rounded-2xl px-4 py-2.5 text-left shadow-sm transition active:scale-[.97] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-azure ${eM[M[e.how]]} ${a ? "ring-4 ring-gold" : i ? "opacity-40" : "hover:brightness-110"} ${i ? "cursor-wait" : ""}`}
                >
                  <CEL_ how={e.how} />
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold leading-tight">{e.label}</span>
                    <span className="block text-sm leading-snug opacity-90">
                      {e.sub}
                      {" → "}
                      {"magma" === t.family || "sediment" === t.family ? t.name.toLowerCase() : t.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <nav aria-label="Your rock's journey" className="mt-5">
        <p className="eyebrow">Your rock’s journey</p>
        <ol className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-2">
          {es > 0 && (
            <li className="pr-1 text-sm text-ink-2">
              {es}
              {" earlier ›"}
            </li>
          )}
          {ea.map((e, s) => {
            let t = x[e.id],
              r = s === ea.length - 1,
              o = (
                <>
                  <CE$_ look={e.look} uid={`${a}j${s}`} size="h-6 w-7" />
                  <span>{z(e.look)}</span>
                </>
              ),
              i = `flex min-h-10 items-center gap-1.5 rounded-full border-2 py-1 pl-1.5 pr-3 text-sm font-semibold ${r ? "border-gold bg-[#fbf1da] text-ink" : "border-line bg-[#fffdf8] text-ink-2"}`;
            return (
              <li key={es + s} className="flex items-center gap-1">
                {s > 0 && (
                  <span aria-hidden="true" className="text-ink-2">
                    ›
                  </span>
                )}
                {t.slug ? (
                  <h.default
                    href={`/ground/rocks/${t.slug}`}
                    aria-current={r ? "step" : undefined}
                    className={`${i} transition hover:border-moss hover:text-moss`}
                  >
                    {o}
                  </h.default>
                ) : (
                  <span aria-current={r ? "step" : undefined} className={i}>
                    {o}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="mt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="eyebrow">Your rock collection</p>
          <p className="text-sm text-ink-2">
            <span className="font-semibold text-ink">{A}</span>
            {" of "}
            {y.length}
            {" kinds made"}
          </p>
        </div>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {y.map((e) => {
            let s = x[e],
              t = (i && n < 0.9 ? r.made.slice(0, i.prevMade) : r.made).includes(e),
              o = ev[s.family];
            if (!t)
              return (
                <li key={e}>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed bg-paper-2 text-base font-semibold text-ink-2/70"
                    style={{
                      borderColor: `${o}66`,
                    }}
                    title="Not made yet"
                  >
                    ?
                    <span className="sr-only">
                      {"A kind of "}
                      {s.family}
                      {" rock you haven’t made yet"}
                    </span>
                  </span>
                </li>
              );
            let l = "schist" !== e || r.trail.some((e) => "schist" === e.look) ? e : "schistGreen",
              d = <CE$_ look={l} uid={`${a}c${e}`} size="h-8 w-9" />,
              f = "flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#fffdf8]";
            return (
              <li key={e}>
                {s.slug ? (
                  <h.default
                    href={`/ground/rocks/${s.slug}`}
                    className={`${f} transition hover:scale-105`}
                    style={{
                      borderColor: o,
                    }}
                    title={s.name}
                    aria-label={s.name}
                  >
                    {d}
                  </h.default>
                ) : (
                  <span
                    className={f}
                    style={{
                      borderColor: o,
                    }}
                    title={s.name}
                    aria-label={s.name}
                    role="img"
                  >
                    {d}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
            <li className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full border-2"
                style={{
                  borderColor: ev.igneous,
                }}
              />
              igneous: cooled from melted rock
            </li>
            <li className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full border-2"
                style={{
                  borderColor: ev.sedimentary,
                }}
              />
              sedimentary: laid down in layers
            </li>
            <li className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full border-2"
                style={{
                  borderColor: ev.metamorphic,
                }}
              />
              metamorphic: changed by heat and squeezing
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              ((j.current = false), l(null), p(null), b(null), d(0), o(J));
            }}
            className="min-h-12 rounded-full border-2 border-line px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95"
          >
            Start again
          </button>
        </div>
      </div>
      <p className="mt-5 rounded-2xl bg-moss px-4 py-3 font-semibold text-white">
        Given enough time, any kind of rock can become any other: melted and cooled, worn down and laid in layers, or buried and squeezed —
        in any order, round and round.
      </p>
      <CEz_
        two="Hot rock! Cold rock! Crumble, squish — a new rock!"
        four="Rocks change, very, very slowly. They melt, they crumble into sand, and they get squashed into new rocks."
        six="Melted rock cools into igneous rock. Worn-down bits pile up into sedimentary rock. Heat and squeezing make metamorphic rock. And round it goes."
        outside="Pick up a handful of sand and look closely: every grain is a crumb of an older rock, on its way round the cycle."
      />
    </div>
  );
};
