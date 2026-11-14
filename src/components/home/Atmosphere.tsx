/**
 * The homepage's living background: a dark ground under two canopies of
 * blurred leaves that drift against each other, the light turning from dawn
 * rose to noon gold to blue evening over one 84-second cycle (all in
 * globals.css: `.gto-atmo*`, `--atmo-cycle`). `.gto-atmo-hour` takes its tint
 * from the real time of day, which <AtmospherePhase> writes to <html data-phase>.
 */
/** Leaves: [x, y, rotation, half-length, widest point (behind the middle), half-width above, half-width below]. */
const LEAVES: [number, number, number, number, number, number, number][] = [
  [1120, 173, 129, 105, 28, 43, 45],
  [45, 112, 143, 101, 24, 42, 36],
  [930, 172, 40, 102, 26, 35, 37],
  [835, 786, 31, 150, 42, 59, 59],
  [1250, -53, 47, 127, 43, 52, 47],
  [547, 403, 86, 122, 35, 55, 55],
  [1122, 749, 5, 171, 53, 69, 72],
  [955, 414, 148, 147, 32, 49, 53],
  [855, 352, 59, 175, 38, 80, 71],
  [925, 580, 45, 117, 27, 36, 36],
  [663, 693, 170, 135, 28, 60, 52],
  [618, 417, 160, 184, 34, 71, 67],
  [905, 280, 87, 111, 22, 49, 45],
  [725, 264, 111, 175, 50, 56, 59],
  [486, 617, 8, 127, 23, 42, 40],
  [39, 215, 61, 170, 55, 55, 49],
  [65, 196, 150, 125, 42, 55, 48],
  [1122, 700, 22, 119, 38, 54, 46],
  [239, 699, 147, 167, 45, 61, 52],
  [891, 317, 163, 131, 37, 53, 48],
  [107, 822, 163, 188, 58, 67, 58],
  [1002, 459, 178, 164, 33, 69, 61],
  [542, 615, 120, 48, 9, 19, 17],
  [368, 544, 101, 57, 17, 20, 20],
  [1156, 483, 10, 47, 15, 21, 21],
  [504, 667, 48, 37, 8, 16, 18],
  [502, 283, 66, 65, 22, 26, 27],
  [715, 343, 149, 42, 10, 19, 17],
  [312, 624, 91, 54, 11, 22, 23],
  [288, 826, 59, 36, 6, 16, 14],
  [173, 384, 157, 69, 15, 28, 31],
  [39, 247, 116, 74, 18, 26, 23],
  [269, 686, 68, 41, 12, 15, 16],
  [-32, 307, 124, 42, 14, 19, 19],
  [133, 400, 135, 68, 14, 30, 25],
  [1224, 42, 95, 51, 14, 18, 17],
  [881, 286, 131, 65, 14, 21, 19],
  [115, 299, 98, 52, 13, 17, 18],
  [15, 710, 178, 51, 11, 22, 22],
  [975, 524, 48, 37, 9, 16, 15],
  [140, 804, 141, 52, 15, 16, 14],
  [746, -54, 160, 31, 10, 12, 11],
  [40, 40, 65, 58, 17, 19, 17],
  [125, 173, 148, 74, 18, 23, 26],
  [1080, 858, 87, 44, 10, 19, 21],
  [666, 552, 4, 39, 11, 16, 16],
];
/** Light falling between the leaves: [polyline, stroke width]. */
const STREAKS: [string, number][] = [
  ["M-100 130 L-10 153 L80 177 L170 199 L260 218 L350 232 L440 240 L530 241 L620 235 L710 224 L800 206 L890 185 L980 162 L1070 138 L1160 115 L1250 96", 9],
  ["M-100 467 L-10 469 L80 464 L170 453 L260 436 L350 417 L440 398 L530 379 L620 365 L710 356 L800 353 L890 357 L980 368 L1070 383 L1160 402 L1250 422", 15],
  ["M-100 134 L-10 93 L80 56 L170 32 L260 25 L350 37 L440 66 L530 105 L620 145 L710 177 L800 195 L890 193 L980 173 L1070 139 L1160 99 L1250 61", 20],
  ["M-100 184 L-10 189 L80 201 L170 220 L260 244 L350 269 L440 294 L530 316 L620 333 L710 342 L800 343 L890 337 L980 322 L1070 302 L1160 278 L1250 252", 18],
  ["M-100 727 L-10 742 L80 755 L170 763 L260 766 L350 762 L440 753 L530 740 L620 724 L710 709 L800 695 L890 684 L980 680 L1070 681 L1160 688 L1250 700", 16],
];

const leaf = ([x, y, r, l, a, up, down]: (typeof LEAVES)[number]) => ({
  d: `M-${l} 0 Q-${a} -${up} ${l} 0 Q-${a} ${down} -${l} 0 Z`,
  transform: `translate(${x} ${y}) rotate(${r})`,
});

function Canopy({ blur }: { blur: number }) {
  const id = `gtoSoft${blur}`;
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="gto-dapple">
      <defs>
        <filter id={id} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill="currentColor" stroke="currentColor">
        {LEAVES.map((l, i) => (
          <path key={i} {...leaf(l)} />
        ))}
        {STREAKS.map(([d, w], i) => (
          <path key={`s${i}`} d={d} fill="none" strokeWidth={w} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

export function Atmosphere() {
  return (
    <div className="gto-atmo" aria-hidden="true">
      <div className="gto-atmo-ground" />
      <div className="gto-atmo-glow" />
      <div className="gto-atmo-canopy gto-atmo-canopy-a">
        <Canopy blur={5} />
      </div>
      <div className="gto-atmo-canopy gto-atmo-canopy-b">
        <Canopy blur={20} />
      </div>
      <div className="gto-atmo-hour" />
      <div className="gto-atmo-vignette" />
    </div>
  );
}
