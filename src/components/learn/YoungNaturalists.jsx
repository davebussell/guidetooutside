"use client";
// Restored from client module 46032 (exports: YoungNaturalists)
import * as t from "react/jsx-runtime";
import * as s from "next/link";
import * as n from "react";
import * as a from "@/lib/learn/rungs";
import * as o from "@/components/learn/NatureGame";
import * as i from "@/lib/hooks";
let r = {
  rocks: {
    title: "Counting with rocks",
    intro:
      "Whatever is under you comes up in the driveway, the stream bed and the garden wall, which makes it the easiest thing on this site to put in a child's hand.",
    prompts: {
      two: "Find a heavy stone and a light stone. Say heavy. Say light. Now swap hands.",
      four: "Collect twelve stones and lay them in a line, heaviest to lightest, by hand. Then count how many are rough and how many are smooth.",
      six: "Weigh a dozen stones and write the numbers down. How much heavier is the biggest than the smallest? Sort them twice over — big and rough, big and smooth, small and rough, small and smooth — and see whether every stone lands in one of the four.",
    },
    game: "more",
    lesson: {
      slug: "sort-the-stones",
      title: "Sort the stones",
    },
  },
  regions: {
    title: "Counting what grows here",
    intro:
      "A region is just the list of things that do well where you are. A child does not need the word to notice that the trees change when you drive an hour north.",
    prompts: {
      two: "Put both arms around a tree. Now find a different tree and do it again. Two trees.",
      four: "Count how many kinds of tree you can find between the house and the end of the road. Not how many trees — how many different ones.",
      six: "Count your steps all the way around three trees and write each number down. How many more steps did the biggest take than the smallest?",
    },
    game: "more",
    lesson: {
      slug: "acorns-in-tens",
      title: "A hundred acorns",
    },
  },
  zones: {
    title: "Counting to the frost",
    intro:
      "A hardiness zone is a number that means the coldest night of an average year. The countdown to the first frost is the same idea with a paper chain.",
    prompts: {
      two: "Touch something cold. Now touch something warm. Cold, warm. Two things.",
      four: "Count out one stone for every day until the first frost, and take one away each evening.",
      six: "How many weeks and days until the first frost? Make a paper chain that long, break one link off each morning, and when the frost actually comes count what is left over.",
    },
    game: "tally",
    lesson: {
      slug: "frost-chain",
      title: "Counting down to frost",
    },
  },
  wildlife: {
    title: "Counting legs",
    intro:
      "Insects have six legs and spiders have eight, which means a log with four spiders under it is a times table that nobody had to invent.",
    prompts: {
      two: "Look — legs! Wiggle your fingers like that. How many legs have you got? Two.",
      four: "Count the legs on one beetle, pointing at each as you say the number. Six. Now two beetles — how many is that?",
      six: "Four spiders at eight legs each. Count in eights. Then: if you found forty-eight legs and they were all beetles, how many beetles was that?",
    },
    game: "legs",
    lesson: {
      slug: "how-many-legs",
      title: "How many legs?",
    },
  },
  "the-day": {
    title: "Counting the hours of light",
    intro:
      "The sun's height is the whole reason the day has a shape. A stick in the lawn and a stone every hour makes that visible by teatime.",
    prompts: {
      two: "Stand in the shadow. Now jump out of it. In, out. Is the shadow long or short?",
      four: "Measure the shadow in your own footsteps, heel to toe. Do it again after lunch — is it getting longer or shorter?",
      six: "Mark the shadow every hour and write down its length. Which hour was shortest? That is roughly when the sun was highest, and the stone that marks it points very nearly north.",
    },
    game: "more",
    lesson: {
      slug: "shadow-clock",
      title: "The shadow clock",
    },
  },
  almanac: {
    title: "Counting the nights",
    intro:
      "The moon is the only thing in the sky that visibly changes from one night to the next, which makes it the one calendar a four-year-old can read.",
    prompts: {
      two: "Point at the moon. Is it a circle or a banana? Draw a circle.",
      four: "Is tonight's moon fatter or thinner than last night's? Draw it, and again tomorrow.",
      six: "Full to full is about twenty-nine and a half nights. Draw one square a night for a month and count how many it actually took.",
    },
    game: "count",
    lesson: {
      slug: "moon-calendar",
      title: "A month of moons",
    },
  },
};
export const YoungNaturalists = function ({ panel: e }) {
  let l = r[e],
    d = (0, i.usePlace)(),
    [c, h] = (0, n.useState)("four"),
    [m, u] = (0, n.useState)(false);
  return l ? (
    <section className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow text-moss">For young naturalists</p>
        <s.default href={d ? `/learn/count/${d.slug}` : "/learn"} className="text-sm font-medium text-moss underline hover:no-underline">
          {d ? `Today's nature count for ${d.label.split(",")[0]}` : "All the teaching pages"}
          {" →"}
        </s.default>
      </div>
      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{l.title}</h2>
      <p className="mt-2 max-w-3xl text-ink-2">{l.intro}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {a.RUNGS.map((e) => {
          let s = e.id === c;
          return (
            <button
              key={e.id}
              type="button"
              aria-pressed={s}
              onClick={() => h(e.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${s ? "border-moss bg-moss-soft text-moss-2" : "border-edge text-ink-2 hover:border-moss/50"}`}
            >
              {"About "}
              {e.age}
            </button>
          );
        })}
      </div>
      <p className="mt-4 max-w-3xl leading-relaxed">{l.prompts[c]}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line/70 pt-4">
        <button
          type="button"
          onClick={() => u((e) => !e)}
          aria-expanded={m}
          className="rounded-full border border-edge px-3.5 py-1.5 text-xs font-medium text-ink-2 transition hover:border-moss hover:text-moss"
        >
          {m ? "Close the game" : "Play it on screen"}
        </button>
        {l.lesson && (
          <s.default href={`/learn/lessons/${l.lesson.slug}`} className="text-sm font-medium text-moss underline hover:no-underline">
            {"The full lesson: "}
            {l.lesson.title}
          </s.default>
        )}
      </div>
      {m && (
        <div className="mt-5">
          <o.NatureGame kind={l.game} rung={c} title="Five minutes on screen" />
        </div>
      )}
    </section>
  ) : null;
};
