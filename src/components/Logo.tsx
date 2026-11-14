import Image from "next/image";

/**
 * The marks: a woodpecker and a blue jay, the two birds of the site (kept through the rebrand of 14 November 2026;
 * the name is Guide to Outside, guidetooutside.com).
 *
 * - "line": the pair sharing one branch, ink line with a red crest and a blue wing. Picture only. Used where the mark
 *   is small: the header (the nav is at its width limit, so the name is not set beside it) and the browser tab.
 * - "badge": the pair on one trunk in a moss ring with a low gold sun, with the name under it. Used where there is
 *   room: the footer, the About page, the newsletter and the share card.
 *
 * The line mark is an SVG (public/brand/birds-line.svg); the same drawing is src/app/icon.svg.
 */
const LINE = { src: "/brand/birds-line.svg", w: 453, h: 432 };
const BADGE = { src: "/brand/birds-badge.webp", w: 640, h: 640 };

export function Logo({ height = 68, variant = "line", className = "" }: { height?: number; variant?: "line" | "badge"; className?: string }) {
  if (variant === "line") {
    const width = Math.round((height * LINE.w) / LINE.h);
    return <Image src={LINE.src} width={width} height={height} alt="Guide to Outside" className={className} unoptimized priority />;
  }
  return (
    <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <Image src={BADGE.src} width={height} height={height} alt="" unoptimized />
      <span className="font-display text-xl font-semibold leading-none tracking-tight">Guide to Outside</span>
    </span>
  );
}
