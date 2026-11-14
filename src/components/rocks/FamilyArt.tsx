/**
 * The diagram for each rock family: on /ground/rocks beside each family's heading,
 * and in the family panel at the top of every rock page. Copied from the live pages.
 */
import type { RockFamily } from "@/lib/rocks";

const LABEL: Record<RockFamily, string> = {
  igneous: "Magma rising from depth: cooling slowly underground to make coarse crystals, or erupting and cooling fast to make fine ones",
  sedimentary: "Sediment settling through water in layers, then buried and compacted into rock",
  metamorphic: "Rock buried and squeezed from both sides, its minerals regrowing aligned across the direction of pressure",
  deposit: "An ice sheet dropping unsorted debris, and meltwater rivers sorting sand and gravel into flat terraces beyond it",
};

const DRAW: Record<RockFamily, React.ReactNode> = {
  igneous: (
    <>
      <path d="M0 46 H320" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <text x="4" y="40" fontSize="9" fill="currentColor" opacity="0.8">
        surface
      </text>
      <path d="M186 46 l22 -22 l22 22 Z" fill="currentColor" opacity="0.28" />
      <path d="M208 24 l-5 -12 M208 24 l6 -13 M208 24 l0 -16" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <text x="240" y="28" fontSize="9" fill="currentColor">
        erupts — cools fast,
      </text>
      <text x="240" y="39" fontSize="9" fill="currentColor">
        crystals too small to see
      </text>
      <path d="M60 128 q40 -46 96 -30 q42 12 52 -52" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" />
      <ellipse cx="78" cy="106" rx="46" ry="24" fill="currentColor" opacity="0.2" />
      <rect x="62" y="100" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" transform="rotate(0 66 104)" />
      <rect x="80" y="96" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" transform="rotate(22 84 100)" />
      <rect x="96" y="104" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" transform="rotate(44 100 108)" />
      <rect x="70" y="114" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" transform="rotate(66 74 118)" />
      <rect x="90" y="116" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" transform="rotate(88 94 120)" />
      <text x="132" y="104" fontSize="9" fill="currentColor">
        stalls and cools slowly —
      </text>
      <text x="132" y="115" fontSize="9" fill="currentColor">
        crystals grow large
      </text>
    </>
  ),
  sedimentary: (
    <>
      <path d="M0 26 H320" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <text x="4" y="20" fontSize="9" fill="currentColor" opacity="0.8">
        water
      </text>
      <g opacity="0.45">
        <circle cx="40" cy="34" r="2" fill="currentColor" />
        <circle cx="78" cy="34" r="2" fill="currentColor" />
        <circle cx="120" cy="34" r="2" fill="currentColor" />
        <circle cx="168" cy="34" r="2" fill="currentColor" />
        <circle cx="214" cy="34" r="2" fill="currentColor" />
        <circle cx="258" cy="34" r="2" fill="currentColor" />
      </g>
      <g opacity="0.35">
        <circle cx="49" cy="44" r="2" fill="currentColor" />
        <circle cx="87" cy="44" r="2" fill="currentColor" />
        <circle cx="129" cy="44" r="2" fill="currentColor" />
        <circle cx="177" cy="44" r="2" fill="currentColor" />
        <circle cx="223" cy="44" r="2" fill="currentColor" />
        <circle cx="267" cy="44" r="2" fill="currentColor" />
      </g>
      <g opacity="0.25">
        <circle cx="58" cy="54" r="2" fill="currentColor" />
        <circle cx="96" cy="54" r="2" fill="currentColor" />
        <circle cx="138" cy="54" r="2" fill="currentColor" />
        <circle cx="186" cy="54" r="2" fill="currentColor" />
        <circle cx="232" cy="54" r="2" fill="currentColor" />
        <circle cx="276" cy="54" r="2" fill="currentColor" />
      </g>
      <path d="M150 30 v18 m0 0 l-4 -5 m4 5 l4 -5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" fill="none" />
      <g>
        <rect x="20" y="70" width="280" height="13" fill="currentColor" opacity="0.3" />
        <line x1="20" y1="83" x2="300" y2="83" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
      </g>
      <g>
        <rect x="20" y="84" width="280" height="13" fill="currentColor" opacity="0.42" />
        <line x1="20" y1="97" x2="300" y2="97" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
      </g>
      <g>
        <rect x="20" y="98" width="280" height="13" fill="currentColor" opacity="0.3" />
        <line x1="20" y1="111" x2="300" y2="111" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
      </g>
      <g>
        <rect x="20" y="112" width="280" height="13" fill="currentColor" opacity="0.5" />
        <line x1="20" y1="125" x2="300" y2="125" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
      </g>
      <path d="M306 74 v46 m0 0 l-4 -5 m4 5 l4 -5" stroke="currentColor" strokeWidth="1.2" opacity="0.7" fill="none" />
      <text x="24" y="134" fontSize="9" fill="currentColor">
        weight above squeezes the water out and cements the grains
      </text>
    </>
  ),
  metamorphic: (
    <>
      <rect x="86" y="34" width="148" height="72" rx="3" fill="currentColor" opacity="0.14" />
      <rect x="104" y="48" width="13" height="4" rx="1" fill="currentColor" opacity="0.55" transform="rotate(0 110 50)" />
      <rect x="126" y="62" width="13" height="4" rx="1" fill="currentColor" opacity="0.55" transform="rotate(47 132 64)" />
      <rect x="112" y="84" width="13" height="4" rx="1" fill="currentColor" opacity="0.55" transform="rotate(94 118 86)" />
      <rect x="140" y="44" width="13" height="4" rx="1" fill="currentColor" opacity="0.55" transform="rotate(141 146 46)" />
      <line x1="176" y1="44" x2="220" y2="44" stroke="currentColor" strokeWidth="2.4" opacity="0.6" strokeLinecap="round" />
      <line x1="176" y1="56" x2="220" y2="56" stroke="currentColor" strokeWidth="2.4" opacity="0.6" strokeLinecap="round" />
      <line x1="176" y1="68" x2="220" y2="68" stroke="currentColor" strokeWidth="2.4" opacity="0.6" strokeLinecap="round" />
      <line x1="176" y1="80" x2="220" y2="80" stroke="currentColor" strokeWidth="2.4" opacity="0.6" strokeLinecap="round" />
      <line x1="176" y1="92" x2="220" y2="92" stroke="currentColor" strokeWidth="2.4" opacity="0.6" strokeLinecap="round" />
      <path d="M40 70 h34 m0 0 l-6 -5 m6 5 l-6 5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.75" />
      <path d="M280 70 h-34 m0 0 l6 -5 m-6 5 l6 5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.75" />
      <text x="18" y="26" fontSize="9" fill="currentColor">
        heat and pressure, but never melting
      </text>
      <text x="92" y="122" fontSize="9" fill="currentColor">
        grains pointing every way
      </text>
      <text x="176" y="122" fontSize="9" fill="currentColor">
        all in one plane
      </text>
    </>
  ),
  deposit: (
    <>
      <path d="M0 106 q60 -12 120 -4 q70 10 200 -6 V140 H0 Z" fill="currentColor" opacity="0.3" />
      <text x="4" y="132" fontSize="9" fill="currentColor" opacity="0.9">
        bedrock
      </text>
      <path d="M0 22 q54 0 84 30 q14 14 24 46 H0 Z" fill="currentColor" opacity="0.16" />
      <path d="M0 22 q54 0 84 30 q14 14 24 46" stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.5" />
      <text x="16" y="52" fontSize="9" fill="currentColor">
        ice
      </text>
      <circle cx="116" cy="92" r="6" fill="currentColor" opacity="0.6" />
      <circle cx="128" cy="84" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="138" cy="94" r="5" fill="currentColor" opacity="0.6" />
      <circle cx="150" cy="86" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="124" cy="96" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="144" cy="80" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="158" cy="95" r="3" fill="currentColor" opacity="0.6" />
      <text x="112" y="72" fontSize="9" fill="currentColor">
        till — everything mixed
      </text>
      <path d="M170 98 q40 -6 130 -4" stroke="currentColor" strokeWidth="1.2" opacity="0.55" fill="none" />
      <g opacity="0.6">
        <circle cx="186" cy="88" r="2.4" fill="currentColor" />
        <circle cx="202" cy="88" r="2.4" fill="currentColor" />
        <circle cx="218" cy="88" r="2.4" fill="currentColor" />
        <circle cx="234" cy="88" r="2.4" fill="currentColor" />
        <circle cx="250" cy="88" r="2.4" fill="currentColor" />
        <circle cx="266" cy="88" r="2.4" fill="currentColor" />
        <circle cx="282" cy="88" r="2.4" fill="currentColor" />
      </g>
      <g opacity="0.42">
        <circle cx="186" cy="94" r="1.4" fill="currentColor" />
        <circle cx="202" cy="94" r="1.4" fill="currentColor" />
        <circle cx="218" cy="94" r="1.4" fill="currentColor" />
        <circle cx="234" cy="94" r="1.4" fill="currentColor" />
        <circle cx="250" cy="94" r="1.4" fill="currentColor" />
        <circle cx="266" cy="94" r="1.4" fill="currentColor" />
        <circle cx="282" cy="94" r="1.4" fill="currentColor" />
      </g>
      <text x="180" y="72" fontSize="9" fill="currentColor">
        meltwater sorts it by size
      </text>
    </>
  ),
};

/** The family's diagram, drawn in the current text colour. */
export function FamilyArt({ family }: { family: RockFamily }) {
  return (
    <svg viewBox="0 0 320 140" role="img" aria-label={LABEL[family]} className="w-full max-w-md text-ink-2">
      <title>{LABEL[family]}</title>
      {DRAW[family]}
    </svg>
  );
}
