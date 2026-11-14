"use client";
// Restored from client module 74296 (exports: LessonExtra)
import * as t from "react/jsx-runtime";
import * as n from "next/dynamic";
let CS_ = (0, n.default)(() => import("@/components/toys/SunShadow").then((e) => e.SunShadow), {
    }),
  CR_ = (0, n.default)(() => import("@/components/learn/MoonMonth").then((e) => e.MoonMonth), {
    }),
  CA_ = (0, n.default)(() => import("@/components/learn/TallyCounter").then((e) => e.TallyCounter), {
    }),
  l = {
    "shadow-clock": {
      eyebrow: "The same day, on a slider",
      title: "Your own shadow, hour by hour",
      note: "Worked out from the sun's real position at your coordinates, so the shadow points where your shadow points and is as long as your shadow is. Use it to check the stones on the lawn, or to see ahead to where the next one goes.",
    },
    "moon-calendar": {
      eyebrow: "The answer key",
      title: "The next thirty nights",
      note: "The real shape for every night of the coming month. Check the strip against it, see when the full moon lands, or work out on a cloudy Tuesday what would have been drawn.",
    },
    "five-minute-bird-count": {
      eyebrow: "For the five minutes",
      title: "A counter for things that will not hold still",
      note: "Big enough to tap with cold hands. It draws the tally marks as it goes, and the total drops into the field journal when you are done.",
    },
    "mushroom-count": {
      eyebrow: "For the fifty steps",
      title: "A counter for the walk",
      note: "Tap once per mushroom as you pass it. Hands go back behind backs between taps.",
    },
  };
export const LessonExtra = function ({ slug: e }) {
  let n = l[e];
  return n ? (
    <section className="mt-14">
      <p className="eyebrow text-gold">{n.eyebrow}</p>
      <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">{n.title}</h2>
      <p className="mt-2 max-w-3xl text-ink-2">{n.note}</p>
      <div className="mt-6">
        {"shadow-clock" === e && <CS_ />}
        {"moon-calendar" === e && <CR_ />}
        {("five-minute-bird-count" === e || "mushroom-count" === e) && (
          <div className="max-w-md">
            <CA_ label={"mushroom-count" === e ? "Mushrooms passed" : "Birds seen"} />
          </div>
        )}
      </div>
    </section>
  ) : null;
};
