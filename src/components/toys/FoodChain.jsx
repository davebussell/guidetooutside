"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 67911 (exports: FoodChain)
import * as s from "react";
let r = {
    sun: {
      id: "sun",
      name: "Sun",
      tag: "Sun",
      the: "the sun",
      eats: "",
      fact: "All the energy starts here, as sunlight.",
    },
    grass: {
      id: "grass",
      name: "Grass",
      tag: "Grass",
      the: "the grass",
      eats: "",
      fact: "Grass makes its own food from sunlight. That makes it a producer.",
    },
    grasshopper: {
      id: "grasshopper",
      name: "Grasshopper",
      tag: "Grasshopper",
      the: "the grasshopper",
      eats: "grass and leaves",
      fact: "Grasshoppers munch grass and leaves all summer long.",
    },
    snake: {
      id: "snake",
      name: "Garter snake",
      tag: "Snake",
      the: "the garter snake",
      eats: "worms, frogs and bugs like grasshoppers",
      fact: "Garter snakes eat worms, frogs and bugs — grasshoppers too.",
    },
    hawk: {
      id: "hawk",
      name: "Red-tailed hawk",
      tag: "Hawk",
      the: "the hawk",
      eats: "mice and snakes",
      fact: "Red-tailed hawks soar up high, then swoop down on mice and snakes.",
    },
    algae: {
      id: "algae",
      name: "Algae",
      tag: "Algae",
      the: "the algae",
      eats: "",
      fact: "Algae are tiny green living things in the water. They make food from sunlight.",
    },
    tadpole: {
      id: "tadpole",
      name: "Tadpole",
      tag: "Tadpole",
      the: "the tadpole",
      eats: "algae",
      fact: "Tadpoles scrape algae off rocks and plants with their tiny mouths.",
    },
    sunfish: {
      id: "sunfish",
      name: "Pumpkinseed sunfish",
      tag: "Sunfish",
      the: "the sunfish",
      eats: "bugs, snails and tadpoles",
      fact: "Pumpkinseed sunfish gobble bugs, snails and tadpoles.",
    },
    heron: {
      id: "heron",
      name: "Great blue heron",
      tag: "Heron",
      the: "the heron",
      eats: "fish and frogs",
      fact: "A great blue heron wades slowly, then snaps up a fish with its long bill.",
    },
    oak: {
      id: "oak",
      name: "Oak tree (acorns)",
      tag: "Oak",
      the: "the acorns",
      eats: "",
      fact: "An oak tree makes food from sunlight and packs some of it into its acorns.",
    },
    chipmunk: {
      id: "chipmunk",
      name: "Eastern chipmunk",
      tag: "Chipmunk",
      the: "the chipmunk",
      eats: "acorns, seeds and berries",
      fact: "Chipmunks stuff acorns into their cheek pouches to carry home.",
    },
    fox: {
      id: "fox",
      name: "Red fox",
      tag: "Red fox",
      the: "the fox",
      eats: "chipmunks, mice and rabbits",
      fact: "Red foxes hunt chipmunks, mice and rabbits — and eat berries, too.",
    },
  },
  l = [
    {
      id: "meadow",
      label: "Meadow",
      title: "A meadow food chain",
      order: ["sun", "grass", "grasshopper", "snake", "hawk"],
    },
    {
      id: "pond",
      label: "Pond",
      title: "A pond food chain",
      order: ["sun", "algae", "tadpole", "sunfish", "heron"],
    },
    {
      id: "forest",
      label: "Forest",
      title: "An oak wood food chain",
      order: ["sun", "oak", "chipmunk", "fox"],
    },
  ],
  a = {
    sun: {
      label: "Energy",
      fill: "#f6d77f",
      ink: "#6b4e10",
      says: "where the energy comes from",
    },
    producer: {
      label: "Producer",
      fill: "#cfe6bf",
      ink: "#23472c",
      says: "makes its own food from sunlight",
    },
    consumer: {
      label: "Consumer",
      fill: "#f4dcbc",
      ink: "#6a3f14",
      says: "gets energy by eating other living things",
    },
    top: {
      label: "Top predator",
      fill: "#f3c4bb",
      ink: "#7a1f18",
      says: "top of this chain — nothing here eats it",
    },
  };
function i(e, t) {
  return 0 === e ? "sun" : 1 === e ? "producer" : e === t - 1 ? "top" : "consumer";
}
let n = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function CO_() {
  return (
    <g>
      {Array.from(
        {
          length: 12,
        },
        (e, s) => (
          <line
            key={s}
            x1={0}
            y1={-40}
            x2={0}
            y2={-54}
            stroke="#e9a531"
            strokeWidth={7}
            strokeLinecap="round"
            transform={`rotate(${30 * s})`}
          />
        ),
      )}
      <circle r={34} fill="#f2b53c" />
      <circle cx={-6} cy={-6} r={26} fill="#f8c95a" />
      <circle cx={-12} cy={-13} r={10} fill="#fde08e" />
    </g>
  );
}
function CC_() {
  return (
    <g>
      <ellipse cx={0} cy={50} rx={48} ry={6} fill="#1f2a22" opacity={0.1} />
      <path d="M-30 50 C -32 22 -40 -4 -50 -20 C -30 -2 -22 24 -20 50 Z" fill="#5a9a3e" />
      <path d="M-18 50 C -18 12 -22 -22 -28 -46 C -10 -20 -6 14 -6 50 Z" fill="#72b04b" />
      <path d="M-6 50 C -4 8 0 -30 8 -56 C 13 -28 9 12 7 50 Z" fill="#5a9a3e" />
      <path d="M6 50 C 10 16 20 -12 34 -34 C 26 -8 20 22 18 50 Z" fill="#80bd57" />
      <path d="M16 50 C 22 26 38 6 52 -4 C 42 14 32 32 28 50 Z" fill="#5a9a3e" />
      <path d="M-2 50 C -8 24 -22 4 -40 -4 C -18 10 -10 30 -10 50 Z" fill="#6aa843" />
    </g>
  );
}
function CD_() {
  return (
    <g>
      <ellipse cx={0} cy={32} rx={48} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M14 6 L 10 28 M 24 6 L 30 26" stroke="#5f8a2c" strokeWidth={4} strokeLinecap="round" />
      <path d="M-48 2 C -48 -8 -32 -14 -10 -14 L 20 -14 C 30 -14 30 10 20 10 L -10 10 C -32 12 -48 12 -48 2 Z" fill="#8cbf45" />
      <g stroke="#76a83a" strokeWidth={2}>
        <line x1={-36} y1={-8} x2={-36} y2={8} />
        <line x1={-28} y1={-10} x2={-28} y2={9} />
        <line x1={-20} y1={-11} x2={-20} y2={10} />
      </g>
      <path d="M-44 -4 C -30 -18 2 -22 20 -14 C 0 -8 -24 -4 -44 -4 Z" fill="#6c9c30" />
      <path d="M-2 0 C -12 -22 -26 -32 -34 -28 C -32 -18 -18 -4 -8 6 Z" fill="#79ac38" />
      <path d="M-33 -27 L -30 24 L -20 27" stroke="#5f8a2c" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={30} cy={-6} rx={13} ry={15} fill="#9ccb52" />
      <circle cx={34} cy={-10} r={4.5} fill="#3b3a1f" />
      <circle cx={33} cy={-11.5} r={1.4} fill="#e9f3c8" />
      <path d="M31 -20 C 26 -40 12 -50 -6 -52" stroke="#6c9c30" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M35 -20 C 35 -40 26 -52 12 -58" stroke="#6c9c30" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}
function CX_() {
  let e = "M-54 30 C -42 48 -24 46 -20 30 C -16 14 -4 6 8 14 C 20 22 22 40 36 38 C 50 36 52 18 44 4 C 38 -6 38 -14 44 -22";
  return (
    <g>
      <ellipse cx={0} cy={48} rx={52} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d={e} stroke="#2f3b2e" strokeWidth={17} strokeLinecap="round" fill="none" />
      <path d={e} stroke="#e7d35a" strokeWidth={4} strokeLinecap="round" fill="none" />
      <ellipse cx={48} cy={-28} rx={13} ry={9.5} fill="#2f3b2e" transform="rotate(-28 48 -28)" />
      <path d="M58 -35 L 66 -41 M 66 -41 L 71 -39 M 66 -41 L 67 -47" stroke="#c8352b" strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={52} cy={-32} r={2.8} fill="#f2e7b0" />
      <circle cx={52.5} cy={-32} r={1.3} fill="#1f2a22" />
    </g>
  );
}
function CF_() {
  return (
    <g>
      <path d="M2 22 L 20 58 L 4 62 L -6 26 Z" fill="#c0602a" />
      <path d="M17 52 L 5 55" stroke="#8a3f1c" strokeWidth={3} strokeLinecap="round" />
      <path d="M-56 44 C -20 40 20 42 58 38" stroke="#7a5132" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M-18 -22 C -32 -6 -30 22 -12 36 C 2 46 22 34 22 12 C 22 -8 12 -24 -4 -28 Z" fill="#7a4f2e" />
      <path d="M-20 -16 C -32 0 -28 24 -12 35 C -6 22 -8 2 -4 -16 Z" fill="#f3e6cc" />
      <g stroke="#5a3b22" strokeWidth={3} strokeLinecap="round">
        <line x1={-24} y1={14} x2={-19} y2={12} />
        <line x1={-18} y1={20} x2={-13} y2={18} />
        <line x1={-24} y1={24} x2={-19} y2={22} />
        <line x1={-14} y1={27} x2={-10} y2={25} />
      </g>
      <path d="M-4 -18 C 12 -18 24 -2 22 20 C 20 32 14 42 8 48 C 4 28 -6 6 -4 -18 Z" fill="#5f3d22" />
      <path d="M2 -6 C 10 -4 16 4 18 14 M 4 8 C 10 10 14 18 14 26" stroke="#8a6040" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-14 38 L -16 46 M -10 38 L -8 46 M 0 40 L -1 47 M 4 40 L 6 47" stroke="#e0b64a" strokeWidth={4} strokeLinecap="round" />
      <circle cx={-12} cy={-34} r={15} fill="#7a4f2e" />
      <path d="M-26 -30 C -24 -22 -16 -18 -6 -20 C -12 -24 -18 -26 -26 -30 Z" fill="#f3e6cc" />
      <path d="M-26 -40 C -34 -40 -38 -34 -35 -26 C -33 -30 -30 -32 -25 -31 Z" fill="#e0b64a" />
      <path d="M-35 -27 L -33 -25" stroke="#3a2410" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M-22 -41 C -18 -44 -12 -44 -8 -42" stroke="#4a2f18" strokeWidth={3} strokeLinecap="round" fill="none" />
      <circle cx={-16} cy={-37} r={4} fill="#f2d27a" />
      <circle cx={-16.5} cy={-37} r={2.4} fill="#1f1408" />
    </g>
  );
}
function CH_() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={54} ry={46} fill="#cfe6f2" />
      <path
        d="M-44 20 C -32 0 -22 30 -10 10 C 2 -10 10 20 22 0 C 30 -12 38 4 46 -6"
        stroke="#5aa03f"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      <path d="M-40 -12 C -28 -32 -14 -6 -2 -24 C 8 -38 22 -14 36 -28" stroke="#7dbb55" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-30 34 C -18 22 -6 40 8 28 C 18 20 26 34 36 24" stroke="#4a8c35" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g fill="#6aae44">
        <circle cx={-20} cy={-2} r={5} />
        <circle cx={-12} cy={-6} r={4} />
        <circle cx={30} cy={14} r={5} />
        <circle cx={36} cy={8} r={3.5} />
        <circle cx={4} cy={-40} r={3.5} />
        <circle cx={-6} cy={40} r={3.5} />
      </g>
    </g>
  );
}
function CP_() {
  return (
    <g>
      <path d="M2 -6 C 16 -16 28 -4 40 -10 C 48 -14 56 -8 62 -4 C 56 2 50 6 42 4 C 30 2 18 14 2 8 Z" fill="#8a9c76" />
      <path d="M4 1 C 20 -2 36 0 58 -4" stroke="#5c6d4c" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={-14} cy={2} rx={24} ry={19} fill="#4a5a3f" />
      <ellipse cx={-20} cy={-6} rx={10} ry={6} fill="#6d7f5c" />
      <circle cx={-26} cy={-2} r={5.5} fill="#fffdf4" />
      <circle cx={-27} cy={-2} r={3} fill="#1f2a22" />
      <path d="M-36 8 Q -33 10 -30 8" stroke="#2c3627" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  );
}
function CU_() {
  return (
    <g>
      <path d="M32 0 L 58 -22 C 53 -7 53 7 58 22 Z" fill="#b08a3a" />
      <path d="M-18 -24 L -14 -38 L -6 -29 L 0 -41 L 6 -30 L 12 -40 L 18 -29 L 26 -33 L 34 -8 L -18 -18 Z" fill="#9c7f3a" />
      <path d="M8 24 L 30 32 L 34 8 Z" fill="#b08a3a" />
      <ellipse cx={0} cy={0} rx={40} ry={28} fill="#c9a84b" />
      <path d="M-36 8 C -20 29 20 30 37 7 C 20 18 -20 18 -36 8 Z" fill="#ea8a34" />
      <g fill="#9e8038" opacity={0.55}>
        <ellipse cx={4} cy={-12} rx={4} ry={10} />
        <ellipse cx={16} cy={-10} rx={4} ry={10} />
        <ellipse cx={27} cy={-6} rx={3.5} ry={9} />
      </g>
      <path
        d="M-35 -4 C -29 -9 -23 -6 -17 -11 M -35 5 C -27 1 -21 3 -15 -2"
        stroke="#3f8fb0"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={-11} cy={-5} rx={5.5} ry={4.5} fill="#1f2a22" />
      <circle cx={-7.5} cy={-5} r={2.6} fill="#c8352b" />
      <circle cx={-27} cy={-10} r={5.5} fill="#fffdf4" />
      <circle cx={-28} cy={-10} r={3.2} fill="#1f2a22" />
      <path d="M-40 1 L -34 2" stroke="#6a5424" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M-4 6 C 2 15 10 17 14 12 C 8 8 2 4 -4 6 Z" fill="#e0a64a" />
    </g>
  );
}
function CJ_() {
  return (
    <g>
      <path d="M4 14 L 0 60 M 14 12 L 18 60" stroke="#b08d4f" strokeWidth={4} strokeLinecap="round" />
      <path d="M-6 60 L 8 60 M 12 60 L 26 60" stroke="#b08d4f" strokeWidth={3} strokeLinecap="round" />
      <path d="M-18 -4 C -10 -22 20 -20 34 -2 C 40 6 44 18 40 22 C 26 20 6 18 -6 12 C -16 8 -22 4 -18 -4 Z" fill="#7f95ab" />
      <path d="M-4 -6 C 10 -16 28 -12 38 6 C 30 14 10 12 -2 6 Z" fill="#62798f" />
      <path d="M-14 -4 C -32 -16 -6 -30 -18 -48" stroke="#a3b6c7" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M-18 -2 L -24 12 L -12 6 Z" fill="#c3cfda" />
      <path d="M-28 -54 L -60 -48 L -28 -47 Z" fill="#e2a93b" />
      <ellipse cx={-18} cy={-52} rx={11} ry={9} fill="#eef2f4" />
      <path d="M-26 -57 C -14 -62 -2 -60 10 -54" stroke="#2a2f36" strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx={-21} cy={-52} r={2.4} fill="#1f2a22" />
    </g>
  );
}
function CY_({ x: e, y: s, s: r, r: l }) {
  return (
    <g transform={`translate(${e} ${s}) rotate(${l}) scale(${r})`}>
      <ellipse cx={0} cy={6} rx={11} ry={14} fill="#c98d4a" />
      <ellipse cx={-4} cy={4} rx={3.5} ry={7} fill="#dcaa6c" />
      <circle cx={0} cy={20} r={2} fill="#8a5a2e" />
      <path d="M-13 -1 C -13 -14 13 -14 13 -1 Z" fill="#7a5332" />
      <path d="M-9 -6 L 9 -6 M -11 -2 L 11 -2 M -6 -10 L 6 -10" stroke="#5c3d24" strokeWidth={1.5} />
      <path d="M0 -11 L 2 -18" stroke="#5c3d24" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}
function CM_() {
  return (
    <g>
      <g transform="translate(-14 -8) rotate(-24)">
        <path
          d="M0 -50 C 10 -50 12 -40 8 -36 C 18 -40 24 -32 16 -24 C 28 -26 32 -14 20 -8 C 32 -6 32 8 18 8 C 26 16 18 26 8 20 L 4 40 L -4 40 L -8 20 C -18 26 -26 16 -18 8 C -32 8 -32 -6 -20 -8 C -32 -14 -28 -26 -16 -24 C -24 -32 -18 -40 -8 -36 C -12 -40 -10 -50 0 -50 Z"
          fill="#6a9a3f"
        />
        <path d="M0 -44 L 0 40" stroke="#4f7a2c" strokeWidth={3} strokeLinecap="round" />
      </g>
      <path d="M-4 20 C 10 14 24 10 40 -6" stroke="#6b4a2c" strokeWidth={4} fill="none" strokeLinecap="round" />
      <CY_ x={14} y={30} s={1.5} r={-8} />
      <CY_ x={40} y={16} s={1.3} r={12} />
    </g>
  );
}
function CG_() {
  return (
    <g>
      <ellipse cx={0} cy={44} rx={40} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M-14 34 C -44 34 -54 2 -44 -26 C -40 -38 -28 -38 -28 -26 C -34 -6 -30 14 -10 22 Z" fill="#9a5f2c" />
      <ellipse cx={0} cy={12} rx={24} ry={29} fill="#c07c40" />
      <ellipse cx={9} cy={18} rx={13} ry={19} fill="#f1dcb9" />
      <path d="M-20 -6 C -26 8 -24 24 -16 36" stroke="#3a2a1c" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M-14 -10 C -20 6 -18 22 -10 34" stroke="#f4e6cc" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <path d="M-8 -12 C -13 4 -12 18 -6 30" stroke="#3a2a1c" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-36} rx={5} ry={7} fill="#a8682f" />
      <circle cx={10} cy={-22} r={17} fill="#c07c40" />
      <ellipse cx={18} cy={-14} rx={10} ry={8} fill="#d99a5c" />
      <path d="M2 -33 L 25 -29" stroke="#f4e6cc" strokeWidth={3} strokeLinecap="round" />
      <path d="M0 -27 L 26 -23" stroke="#3a2a1c" strokeWidth={3} strokeLinecap="round" />
      <path d="M4 -19 L 22 -17" stroke="#f4e6cc" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={17} cy={-25} r={3.6} fill="#1f2a22" />
      <circle cx={27} cy={-20} r={2.6} fill="#3a2a1c" />
      <CY_ x={22} y={6} s={0.8} r={10} />
      <ellipse cx={16} cy={4} rx={5} ry={4} fill="#a8682f" />
      <ellipse cx={26} cy={8} rx={4} ry={3.5} fill="#a8682f" />
      <ellipse cx={8} cy={40} rx={12} ry={5} fill="#a8682f" />
    </g>
  );
}
function CK_() {
  return (
    <g>
      <ellipse cx={-4} cy={38} rx={52} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M-28 -6 C -48 -12 -66 0 -64 16 C -62 28 -48 30 -38 22 C -32 16 -28 8 -24 4 Z" fill="#d9692b" />
      <path d="M-64 16 C -63 26 -52 30 -44 25 C -52 23 -58 19 -64 16 Z" fill="#fff8ee" />
      <path d="M-20 8 L -22 34 M -10 10 L -8 34 M 16 10 L 14 34 M 25 8 L 28 34" stroke="#3a2a1c" strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={0} cy={0} rx={32} ry={15} fill="#d9692b" />
      <path d="M-24 -8 C -8 -14 12 -14 24 -10" stroke="#e98a4d" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M20 -6 C 30 0 30 12 21 14 C 17 8 16 0 20 -6 Z" fill="#fff8ee" />
      <path d="M16 -6 C 20 -18 28 -28 38 -28 L 44 -16 Z" fill="#d9692b" />
      <path d="M29 -31 L 31 -48 L 40 -33 Z" fill="#3a2a1c" />
      <path d="M36 -32 L 43 -48 L 47 -30 Z" fill="#d9692b" />
      <path d="M39 -33 L 43 -43 L 45 -32 Z" fill="#3a2a1c" />
      <ellipse cx={38} cy={-22} rx={13} ry={11} fill="#d9692b" />
      <path d="M44 -27 L 63 -19 L 44 -13 Z" fill="#d9692b" />
      <path d="M34 -16 L 62 -18 L 47 -10 C 42 -10 37 -12 34 -16 Z" fill="#fff8ee" />
      <circle cx={63} cy={-19} r={3.2} fill="#2a1f18" />
      <circle cx={44} cy={-24} r={2.6} fill="#2a1f18" />
    </g>
  );
}
function CB_({ id: e }) {
  switch (e) {
    case "sun":
      return <CO_ />;
    case "grass":
      return <CC_ />;
    case "grasshopper":
      return <CD_ />;
    case "snake":
      return <CX_ />;
    case "hawk":
      return <CF_ />;
    case "algae":
      return <CH_ />;
    case "tadpole":
      return <CP_ />;
    case "sunfish":
      return <CU_ />;
    case "heron":
      return <CJ_ />;
    case "oak":
      return <CM_ />;
    case "chipmunk":
      return <CG_ />;
    case "fox":
      return <CK_ />;
  }
}
function CW_({ id: e }) {
  return "meadow" === e ? (
    <g>
      <rect width={800} height={500} fill="#dcecf3" />
      <path d="M0 250 C 120 220 260 236 400 244 C 540 252 660 222 800 236 L800 320 L0 320 Z" fill="#c4dba9" />
      <rect y={300} width={800} height={200} fill="#a9cd80" />
      <path d="M0 300 C 160 292 320 304 480 298 C 620 293 720 302 800 298 L800 316 L0 316 Z" fill="#98c06e" />
      <g>
        {[
          [40, 470, "#f2c14e"],
          [120, 486, "#fbfaf2"],
          [210, 474, "#9a7fc4"],
          [300, 490, "#f2c14e"],
          [520, 486, "#fbfaf2"],
          [600, 472, "#f2c14e"],
          [690, 488, "#9a7fc4"],
          [770, 474, "#fbfaf2"],
        ].map(([e, s, r]) => (
          <g key={`${e}`} transform={`translate(${e} ${s})`}>
            <circle r={6} fill={r} />
            <circle r={2.5} fill="#c98a2a" />
          </g>
        ))}
      </g>
    </g>
  ) : "pond" === e ? (
    <g>
      <rect width={800} height={500} fill="#dcecf3" />
      <path d="M0 262 C 100 240 220 250 330 244 C 470 236 600 254 800 240 L800 320 L0 320 Z" fill="#b5cf9a" />
      <rect y={296} width={800} height={204} fill="#9ec67a" />
      <path d="M0 340 C 200 330 600 330 800 340 L800 500 L0 500 Z" fill="#5c9fcb" />
      <path d="M0 360 C 200 352 600 352 800 360 L800 500 L0 500 Z" fill="#4f93c4" />
      <g stroke="#a9d3ee" strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M60 470 q 20 -6 40 0" />
        <path d="M700 476 q 18 -5 36 0" />
        <path d="M380 486 q 16 -5 32 0" />
      </g>
      <g stroke="#6b8f3a" strokeWidth={4} strokeLinecap="round">
        <line x1={22} y1={346} x2={18} y2={270} />
        <line x1={34} y1={346} x2={36} y2={284} />
        <line x1={774} y1={346} x2={778} y2={268} />
        <line x1={786} y1={346} x2={784} y2={286} />
      </g>
      <g fill="#7b4a2a">
        <rect x={12} y={274} width={12} height={30} rx={6} />
        <rect x={772} y={272} width={12} height={30} rx={6} />
      </g>
    </g>
  ) : (
    <g>
      <rect width={800} height={500} fill="#e2eee6" />
      <g fill="#8fb27a">
        {[30, 110, 190, 610, 690, 770].map((e) => (
          <path key={e} d={`M${e} 190 L ${e + 36} 300 L ${e - 36} 300 Z`} />
        ))}
      </g>
      <g fill="#7aa268">
        {[70, 150, 650, 730].map((e) => (
          <circle key={e} cx={e} cy={236} r={44} />
        ))}
      </g>
      <rect y={296} width={800} height={204} fill="#c7ab7c" />
      <path d="M0 296 C 200 288 400 302 600 292 C 700 288 760 296 800 294 L800 312 L0 312 Z" fill="#b4966a" />
      <g>
        {[
          [60, 470, "#d8612c", 20],
          [180, 488, "#e39a3a", -30],
          [330, 476, "#c9442a", 50],
          [480, 490, "#e39a3a", 10],
          [620, 472, "#d8612c", -40],
          [740, 486, "#c9442a", 70],
        ].map(([e, s, r, l]) => (
          <ellipse key={`${e}`} cx={e} cy={s} rx={10} ry={5} fill={r} transform={`rotate(${l} ${e} ${s})`} />
        ))}
      </g>
    </g>
  );
}
let M = `
@media (prefers-reduced-motion: no-preference) {
  .eco1fc-slide { animation: eco1fc-slide .55s cubic-bezier(.2,.8,.3,1.15) both; }
  .eco1fc-pop { transform-box: fill-box; transform-origin: center; animation: eco1fc-pop .45s ease-out .25s both; }
  .eco1fc-pulse { animation: eco1fc-pulse 1.1s ease-in-out infinite; }
  .eco1fc-wiggle { display: inline-block; animation: eco1fc-wiggle .55s ease-in-out; }
  .eco1fc-march { animation: eco1fc-march 1s linear infinite; }
}
@keyframes eco1fc-slide { from { transform: translateY(150px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes eco1fc-pop { 0% { transform: scale(.2); opacity: 0 } 70% { transform: scale(1.2); opacity: 1 } 100% { transform: scale(1) } }
@keyframes eco1fc-pulse { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
@keyframes eco1fc-wiggle { 0%,100% { transform: rotate(0) } 20% { transform: rotate(-6deg) } 40% { transform: rotate(5deg) } 60% { transform: rotate(-3deg) } 80% { transform: rotate(2deg) } }
@keyframes eco1fc-march { to { stroke-dashoffset: -32 } }
`;
function L(e, t) {
  return 80 + e * (136 + (776 - 136 * t) / (t - 1));
}
function $({ two: e, four: s, six: r, outside: l }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <p className="font-display text-lg font-semibold text-ink">Say it like this</p>
      <ul className="mt-2 grid gap-1.5 text-sm text-ink">
        {[
          {
            age: "Age 2",
            text: e,
          },
          {
            age: "Age 4",
            text: s,
          },
          {
            age: "Age 6",
            text: r,
          },
        ].map((e) => (
          <li key={e.age} className="flex gap-2">
            <span className="w-12 shrink-0 font-semibold text-moss">{e.age}</span>
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-line pt-3 text-sm text-ink">
        <span className="font-semibold text-rust">{"Go outside: "}</span>
        {l}
      </p>
    </div>
  );
}
export const FoodChain = function () {
  let [e, o] = (0, s.useState)("meadow"),
    [c, d] = (0, s.useState)(0),
    [x, f] = (0, s.useState)(0),
    [h, p] = (0, s.useState)(null),
    [u, j] = (0, s.useState)(null),
    y = l.find((t) => t.id === e) ?? l[0],
    m = y.order.length,
    g = (0, s.useMemo)(
      () =>
        (function (e, t) {
          let s,
            r =
              ((s =
                (function (e) {
                  let t = 0x811c9dc5;
                  for (let s of e) t = Math.imul(t ^ s.charCodeAt(0), 0x1000193);
                  return t >>> 0;
                })(`${e.id}:${t}`) >>> 0),
              () => {
                let e = Math.imul((s = (s + 0x6d2b79f5) >>> 0) ^ (s >>> 15), 1 | s);
                return (((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e) ^ (e >>> 14)) >>> 0) / 0x100000000;
              }),
            l = [...e.order];
          for (let e = l.length - 1; e > 0; e--) {
            let t = Math.floor(r() * (e + 1));
            [l[e], l[t]] = [l[t], l[e]];
          }
          return (l.every((t, s) => t === e.order[s]) && l.reverse(), l);
        })(y, c),
      [y, c],
    ),
    k = x === m,
    v =
      0 === x
        ? "Where does the energy come from? Tap the sun."
        : 1 === x
          ? "Who gets energy from the sun? (It makes its own food from sunlight.)"
          : k
            ? "Energy from the sun passes up the chain, eater by eater."
            : `Who eats ${r[y.order[x - 1]].the}?`;
  function C(e) {
    (o(e), f(0), p(null), j(null));
  }
  let W = l[(l.findIndex((t) => t.id === e) + 1) % l.length],
    N = x >= 2 ? L(x - 1, m) : L(0, m),
    Z = L(0, m),
    A = `${y.title}. ${
      0 === x
        ? "No cards placed yet."
        : `So far: ${y.order
            .slice(0, x)
            .map((e) => r[e].name)
            .join(", then ")}.`
    }`;
  return (
    <div className="grid gap-4">
      <style>{M}</style>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Pick a food chain">
        {l.map((s) => {
          let r = s.id === e;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={r}
              onClick={() => C(s.id)}
              className={`min-h-11 rounded-full px-4 py-2 font-semibold transition active:scale-95 ${r ? "bg-moss text-white" : "border border-line bg-white text-ink-2 hover:border-moss/50"}`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
      <svg viewBox="0 0 800 500" className="h-auto w-full select-none rounded-2xl border border-line" role="img" aria-label={A}>
        <CW_ id={y.id} />
        <text
          x={400}
          y={64}
          textAnchor="middle"
          fontSize={34}
          fontWeight={600}
          fill="#1f2a22"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
          }}
        >
          {y.title}
        </text>
        <g>
          <line x1={Z} y1={404} x2={L(m - 1, m)} y2={404} stroke="#fffdf8" strokeOpacity={0.55} strokeWidth={18} strokeLinecap="round" />
          {x >= 2 ? (
            <g>
              <line x1={Z} y1={404} x2={N} y2={404} stroke="#e8b84a" strokeWidth={18} strokeLinecap="round" />
              <line
                x1={Z}
                y1={404}
                x2={N}
                y2={404}
                stroke="#fff3c4"
                strokeWidth={5}
                strokeDasharray="10 6"
                strokeLinecap="round"
                className="eco1fc-march"
              />
              <path d={`M${N + 6} 388 L ${N + 26} 404 L ${N + 6} 420 Z`} fill="#e8b84a" />
            </g>
          ) : null}
          <text x={400} y={458} textAnchor="middle" fontSize={24} fontWeight={700} fill={"pond" === y.id ? "#fffdf8" : "#3b4a2f"}>
            {k ? "Energy passed all the way up!" : "Energy flows this way →"}
          </text>
        </g>
        {y.order.map((e, s) => {
          let l = L(s, m),
            n = s < x,
            o = s === x,
            d = a[i(s, m)];
          return (
            <g key={`${y.id}-${s}`} transform={`translate(${l} 196)`}>
              {n ? (
                <g key={`${y.id}-${c}-${e}`} className="eco1fc-slide">
                  <rect
                    x={-68}
                    y={-92}
                    width={136}
                    height={184}
                    rx={18}
                    fill="#fffaf0"
                    stroke={k ? "#d9a441" : "#d9cfb8"}
                    strokeWidth={k ? 5 : 3}
                  />
                  <g transform="translate(0 -14) scale(0.95)">
                    <CB_ id={e} />
                  </g>
                  <text y={74} textAnchor="middle" fontSize={r[e].tag.length > 9 ? 17 : 21} fontWeight={700} fill="#1f2a22">
                    {r[e].tag}
                  </text>
                  <g transform="translate(0 122)">
                    <rect x={-64} y={-19} width={128} height={38} rx={19} fill={d.fill} stroke="#fffdf8" strokeWidth={2} />
                    <text y={7} textAnchor="middle" fontSize={s === m - 1 ? 17 : 19} fontWeight={700} fill={d.ink}>
                      {d.label}
                    </text>
                  </g>
                </g>
              ) : (
                <g>
                  <rect
                    x={-68}
                    y={-92}
                    width={136}
                    height={184}
                    rx={18}
                    fill="#fffdf8"
                    fillOpacity={0.45}
                    stroke="#b9ad92"
                    strokeWidth={3}
                    strokeDasharray="10 8"
                  />
                  {o ? (
                    <rect
                      className="eco1fc-pulse"
                      x={-68}
                      y={-92}
                      width={136}
                      height={184}
                      rx={18}
                      fill="none"
                      stroke="#d9a441"
                      strokeWidth={5}
                      strokeDasharray="14 8"
                    />
                  ) : null}
                  <text y={22} textAnchor="middle" fontSize={64} fontWeight={700} fill={o ? "#c48a1f" : "#b9ad92"}>
                    ?
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {y.order.slice(1).map((e, s) => {
          let r = s + 1;
          if (r >= x) return null;
          let l = (L(r - 1, m) + L(r, m)) / 2;
          return (
            <g key={`arrow-${y.id}-${c}-${r}`} transform={`translate(${l} 182)`}>
              <g className="eco1fc-pop">
                <circle r={20} fill="#d9a441" stroke="#fffdf8" strokeWidth={3} />
                <path
                  d="M-9 0 H 7 M 0 -8 L 9 0 L 0 8"
                  stroke="#fffdf8"
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          );
        })}
      </svg>
      <div aria-live="polite" className={`rounded-2xl px-4 py-3 ${k ? "bg-moss text-white" : "bg-paper-2 text-ink"}`}>
        <p className="font-display text-lg font-semibold leading-snug sm:text-xl">{v}</p>
        {u ? <p className={`mt-1 text-sm ${k ? "text-white/90" : "hint" === u.tone ? "text-rust" : "text-ink-2"}`}>{u.text}</p> : null}
      </div>
      <div className={`grid gap-2 ${4 === m ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-5"}`}>
        {g.map((e) => {
          let s = y.order.indexOf(e),
            l = s < x,
            o = h?.id === e,
            c = a[i(s, m)];
          return (
            <button
              key={`${y.id}-${e}`}
              type="button"
              disabled={l || k}
              onClick={() =>
                (function (e) {
                  if (k) return;
                  let t = y.order.indexOf(e);
                  if (t < x) return;
                  if (t === x) {
                    (f(x + 1),
                      p(null),
                      j({
                        tone: "yes",
                        text: r[e].fact,
                      }));
                    return;
                  }
                  p((t) => ({
                    id: e,
                    n: (t?.n ?? 0) + 1,
                  }));
                  let s = r[e];
                  j({
                    tone: "hint",
                    text:
                      0 === x
                        ? "Every food chain starts with the sun. Find the sun!"
                        : 1 === x
                          ? `${n(s.the)} can't make its own food from sunlight — it has to eat. Which one can?`
                          : `Not yet! ${n(s.the)} eats ${s.eats}. Who eats ${r[y.order[x - 1]].the}?`,
                  });
                })(e)
              }
              aria-label={l ? `${r[e].name} — in the chain: ${c.label}` : r[e].name}
              className={`relative flex min-h-[7rem] flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2 text-center transition active:scale-95 ${l ? "border-line bg-paper" : o ? "border-rust/60 bg-white" : "border-line bg-white hover:border-moss/60"}`}
            >
              <span key={o ? `w${h?.n}` : "still"} className={`${o ? "eco1fc-wiggle" : "inline-block"} ${l ? "opacity-45" : ""}`}>
                <svg viewBox="-64 -64 128 128" className="h-14 w-14" aria-hidden="true" focusable="false">
                  <CB_ id={e} />
                </svg>
              </span>
              <span className={`text-sm font-semibold leading-tight ${l ? "text-ink-2" : "text-ink"}`}>{r[e].name}</span>
              {l ? (
                <span
                  className="whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-bold"
                  style={{
                    background: c.fill,
                    color: c.ink,
                  }}
                >
                  {c.label}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-ink-2">
        <span className="font-semibold text-ink">Why do the arrows point that way?</span>
        {" Each arrow goes from the one that gets eaten to the one that eats it — that’s the way the energy goes."}
      </p>
      <ul className="grid gap-1.5 text-sm text-ink sm:grid-cols-3">
        {["producer", "consumer", "top"].map((e) => (
          <li key={e} className="flex items-start gap-2">
            <span
              className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"
              style={{
                background: a[e].fill,
                color: a[e].ink,
              }}
            >
              {a[e].label}
            </span>
            <span className="text-ink-2">{a[e].says}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        {k ? (
          <button
            type="button"
            onClick={() => C(W.id)}
            className="rounded-full bg-moss px-4 py-2 font-semibold text-white transition active:scale-95"
          >
            {"Try the "}
            {W.label.toLowerCase()}
            {" chain"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={function () {
            (d((e) => e + 1), f(0), p(null), j(null));
          }}
          className="rounded-full border border-line bg-white px-4 py-2 font-semibold text-ink-2 transition active:scale-95"
        >
          Mix them up again
        </button>
      </div>
      <$
        two="“Grasshopper eats grass. Snake eats grasshopper. Crunch!” Tap the cards together, one at a time."
        four="“Plants make food from sunshine. Animals get their energy by eating.”"
        six="“The arrows show where the energy goes: from the one that's eaten to the one that eats it.”"
        outside="Find a leaf with nibble holes in it, then look underneath and nearby for who has been eating it."
      />
    </div>
  );
};
