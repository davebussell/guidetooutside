import type { Metadata } from "next";
import Link from "next/link";
import { ActivityArt } from "@/components/learn/ActivityArt";
import { FamilyGame } from "@/components/learn/TurnGame";
import { PlaceCTA } from "@/components/PlaceCTA";
import { Tile } from "@/components/learn/family";

export const metadata: Metadata = {
  title: "Patterns and shapes — the arithmetic hiding in how things grow",
  description:
    "Petal counts, leaf symmetry and the spirals on a pine cone. What to hunt for on a walk with a two-, four- or six-year-old, what the numbers actually are, and where the famous pattern holds and where it plainly does not.",
  alternates: { canonical: "/learn/patterns" },
};

export default function PatternsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-moss">For Kids · Teaching at home · Patterns and shapes</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">What patterns can we find?</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          Living things do not grow to random numbers. Count the petals on twenty flowers and the same few numbers keep turning up; count the spirals
          on a pine cone and you get eight one way and thirteen the other, on cone after cone. A four-year-old can find this out in an afternoon, and
          a six-year-old can start to ask why.
        </p>
        <p className="mt-3 text-sm text-ink-2">Look and count. Nothing goes in a mouth.</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile art="flower" title="Count the petals" note="The same few numbers" href="#petals" />
        <Tile art="pinecone" title="Spirals" note="Eight one way, thirteen the other" href="#spirals" />
        <Tile art="leaf" title="Fold in half" note="Symmetry, and where it fails" href="#symmetry" />
        <Tile art="stone" title="Make a repeat" note="Stone, cone, stone, cone" href="#repeats" />
      </div>
      <div className="mt-8 grid gap-6">
        <section id="petals" className="card relative overflow-hidden scroll-mt-24">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-gold-fill" aria-hidden="true" />
          <div className="p-5 pl-6 sm:p-7 sm:pl-9">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold">1 · Counting</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">The petal numbers</h2>
            <p className="mt-2 max-w-3xl text-ink-2">
              Get down to the flower rather than picking it, and touch each petal once as you count. Write the number down. Ten flowers is enough for
              the pattern to show itself.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
                  <rect width="100" height="100" rx="22" fill="#f4ecdc" />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={15}
                    ry={15}
                    fill="#f4f1ea"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={15}
                    ry={15}
                    fill="#f4f1ea"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(120 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={15}
                    ry={15}
                    fill="#f4f1ea"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(240 50 50)"
                  />
                  <circle cx="50" cy="50" r={9} fill="#d9b35d" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold leading-none text-gold">3</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">Trillium, iris, most lilies</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">
                    Damp woodland in spring; garden beds. What looks like six on a lily is two rings of three.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
                  <rect width="100" height="100" rx="22" fill="#f4ecdc" />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={12}
                    ry={15}
                    fill="#f2d74e"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={12}
                    ry={15}
                    fill="#f2d74e"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(90 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={12}
                    ry={15}
                    fill="#f2d74e"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(180 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={31}
                    rx={12}
                    ry={15}
                    fill="#f2d74e"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(270 50 50)"
                  />
                  <circle cx="50" cy="50" r={9} fill="#c9a227" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold leading-none text-gold">4</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">Every mustard — and there are hundreds</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">
                    Roadsides and gardens all summer. Four petals in a cross is what gives the family its old name.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
                  <rect width="100" height="100" rx="22" fill="#f4ecdc" />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={12}
                    ry={14}
                    fill="#f2b8c6"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={12}
                    ry={14}
                    fill="#f2b8c6"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(72 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={12}
                    ry={14}
                    fill="#f2b8c6"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(144 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={12}
                    ry={14}
                    fill="#f2b8c6"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(216 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={12}
                    ry={14}
                    fill="#f2b8c6"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(288 50 50)"
                  />
                  <circle cx="50" cy="50" r={9} fill="#e6c34a" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold leading-none text-gold">5</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">Buttercup, wild rose, geranium, apple and cherry blossom, columbine</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">Everywhere, all season. By a long way the commonest number to find.</p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
                  <rect width="100" height="100" rx="22" fill="#f4ecdc" />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#f7f4ee"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#f7f4ee"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(60 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#f7f4ee"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(120 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#f7f4ee"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(180 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#f7f4ee"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(240 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#f7f4ee"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(300 50 50)"
                  />
                  <circle cx="50" cy="50" r={9} fill="#9bbf5a" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold leading-none text-gold">6</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">Snowdrop, many onions and garlics</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">
                    Early spring. Often really three and three again, so look for the two rings.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
                  <rect width="100" height="100" rx="22" fill="#f4ecdc" />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(45 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(90 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(135 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(180 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(225 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(270 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={32}
                    rx={9}
                    ry={14}
                    fill="#e58fb4"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(315 50 50)"
                  />
                  <circle cx="50" cy="50" r={9} fill="#f0c93a" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold leading-none text-gold">8</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">Cosmos, some larkspurs, bloodroot</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">Late summer borders; bloodroot in rich spring woodland.</p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
                  <rect width="100" height="100" rx="22" fill="#e8f0dc" />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(17.142857142857142 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(34.285714285714285 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(51.42857142857143 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(68.57142857142857 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(85.71428571428571 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(102.85714285714286 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(120 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(137.14285714285714 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(154.28571428571428 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(171.42857142857142 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(188.57142857142856 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(205.71428571428572 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(222.85714285714286 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(240 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(257.1428571428571 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(274.2857142857143 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(291.42857142857144 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(308.57142857142856 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(325.7142857142857 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy={27}
                    rx={4.2}
                    ry={17}
                    fill="#fbfaf5"
                    stroke="var(--ink)"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    transform="rotate(342.85714285714283 50 50)"
                  />
                  <circle cx="50" cy="50" r={14} fill="#e0a526" />
                  <circle cx="50" cy="50" r="8" fill="#b9781b" opacity="0.5" />
                </svg>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-semibold leading-none text-gold">13, 21, 34</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">Daisies, asters, black-eyed Susan</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">
                    Late summer fields. These are not petals but ray florets, and the count varies head to head — which is the honest, interesting
                    part.
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-6 flex gap-4 rounded-tile bg-gold-soft p-4 sm:p-5">
              <ActivityArt art="star" className="hidden h-14 w-14 shrink-0 sm:block" />
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold">Say this out loud to the six-year-old</p>
                <p className="mt-1.5 leading-relaxed">
                  Three, five, eight, thirteen, twenty-one — each one is the two before it added together. That sequence is real and it turns up all
                  over the place. But four is just as common as five in a hedgerow, and four is not in the sequence at all. So it is a strong habit
                  rather than a law, and the flowers that break it are worth collecting on purpose.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="spirals" className="card relative overflow-hidden scroll-mt-24">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-moss" aria-hidden="true" />
          <div className="p-5 pl-6 sm:p-7 sm:pl-9">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">2 · Spirals</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Things to go and count</h2>
            <p className="mt-2 max-w-3xl text-ink-2">
              A plant putting out each new leaf about a hundred and thirty-seven degrees round from the last one never lands a leaf directly above an
              older one, so none of them sits in another’s shade. Stand in the garden and turn that far each time you put down a stone. The stones
              never line up.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <ActivityArt art="pinecone" className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight">A pine cone, looked at from the flat end</p>
                  <p className="mt-1.5 inline-block rounded-full bg-moss-soft px-2.5 py-0.5 text-xs font-semibold text-moss">8 one way, 13 the other</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    Follow one spiral with a finger and count how many it takes to get round. Then follow the other way. Small cones often go 5 and 8.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <ActivityArt art="apple" className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight">A pineapple, from the shop</p>
                  <p className="mt-1.5 inline-block rounded-full bg-moss-soft px-2.5 py-0.5 text-xs font-semibold text-moss">8, 13 and 21</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    Three sets of spirals at three angles. Easiest of the lot, and it comes with lunch.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <ActivityArt art="flower" className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight">A sunflower head, seeds and all</p>
                  <p className="mt-1.5 inline-block rounded-full bg-moss-soft px-2.5 py-0.5 text-xs font-semibold text-moss">34 and 55, or 55 and 89</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    Too many to count without a pen. Mark the starting seed, draw the spiral on a photograph.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <ActivityArt art="sprout" className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight">A fern fiddlehead in spring</p>
                  <p className="mt-1.5 inline-block rounded-full bg-moss-soft px-2.5 py-0.5 text-xs font-semibold text-moss">One spiral, unrolling</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    Come back to the same one each day for a week and see how far it has opened.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <ActivityArt art="shell" className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight">A snail shell</p>
                  <p className="mt-1.5 inline-block rounded-full bg-moss-soft px-2.5 py-0.5 text-xs font-semibold text-moss">About three turns</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    Each turn is wider than the last by roughly the same amount, which is what makes it a spiral rather than a coil.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-tile border border-line/70 bg-surface p-4">
                <ActivityArt art="stick" className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight">The way a twig splits</p>
                  <p className="mt-1.5 inline-block rounded-full bg-moss-soft px-2.5 py-0.5 text-xs font-semibold text-moss">Usually into 2</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    Follow one branch from the trunk to a leaf, counting the forks. Then another. Are they the same?
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section id="symmetry" className="card relative overflow-hidden scroll-mt-24">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-[#6b5ca5]" aria-hidden="true" />
          <div className="p-5 pl-6 sm:p-7 sm:pl-9">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6b5ca5]">3 · Symmetry</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Folding things in half</h2>
            <div className="mt-5 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
              <ul className="grid content-start gap-4">
                <li className="flex gap-4">
                  <ActivityArt art="leaf" className="h-14 w-14 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold">One fold</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      A leaf, a feather, a butterfly, your own face. Fold a leaf down the midrib and the two edges very nearly meet — nearly, because
                      a real leaf is never exact, and spotting the gap is the sharper skill. Elm leaves are lopsided at the base on purpose, and are
                      the best ones to hand a four-year-old who thinks the answer is always yes.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <ActivityArt art="snow" className="h-14 w-14 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold">Many folds</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      A buttercup folds five ways. A starfish folds five ways. A snowflake folds six. Cut a paper circle, fold it in half three times
                      and snip the edge — open it out and count the repeats. That is the same arithmetic as the flower, done with scissors.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <ActivityArt art="shell" className="h-14 w-14 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold">No folds at all</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      A snail shell does not fold onto itself any way at all, and neither does a spiral. Ask which pile a pine cone goes in — it is a
                      genuinely hard question, and there is no wrong answer at six.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="rounded-tile bg-paper-2/50 p-4">
                <FamilyGame
                  kind="symmetry"
                  note="Pick the matching half. The youngest gets the pattern game instead, which is the same idea one rung down."
                />
              </div>
            </div>
          </div>
        </section>
        <section id="repeats" className="card relative overflow-hidden scroll-mt-24">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-azure" aria-hidden="true" />
          <div className="p-5 pl-6 sm:p-7 sm:pl-9">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-azure">4 · Repeats</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Make one, then finish one</h2>
            <div className="mt-4 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-ink-2">
                  Stone, cone, stone, cone. Then stone, cone, cone. Then three things instead of two. Laying out a repeat and asking somebody else to
                  continue it is the whole of early algebra, done with what is on the path.
                </p>
                <div className="mt-4 flex items-center gap-2" aria-hidden="true">
                  <ActivityArt art="stone" className="h-12 w-12" />
                  <ActivityArt art="pinecone" className="h-12 w-12" />
                  <ActivityArt art="stone" className="h-12 w-12" />
                  <ActivityArt art="pinecone" className="h-12 w-12" />
                  <ActivityArt art="stone" className="h-12 w-12" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-tile border-2 border-dashed border-line font-display text-2xl text-ink-2">
                    ?
                  </span>
                </div>
                <p className="mt-4">
                  <Link href="/learn/lessons/bark-and-repeats" className="font-medium text-moss underline hover:no-underline">
                    The full lesson, with the words to say at each age →
                  </Link>
                </p>
              </div>
              <div className="rounded-tile bg-paper-2/50 p-4">
                <FamilyGame kind="pattern" note="What comes next — two things, then three, then four." />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="mt-12">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">The lessons that go with it</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Tile art="flower" title="Count the petals" note="40 min outside" href="/learn/lessons/petal-numbers" size="sm" />
          <Tile art="leaf" title="Fold a leaf in half" note="30 min outside" href="/learn/lessons/fold-a-leaf" size="sm" />
          <Tile art="tree" title="Patterns in bark and stone" note="35 min outside" href="/learn/lessons/bark-and-repeats" size="sm" />
        </div>
        <div className="mt-8">
          <PlaceCTA label="Today's numbers where you are" />
        </div>
      </section>
    </div>
  );
}
