"use client";
// Restored from client module 25715 (exports: AlmanacBar)
import * as a from "react/jsx-runtime";
import * as s from "next/link";
import * as n from "@/lib/moon-phases";
import * as o from "@/lib/sun";
import * as i from "@/lib/moon-phases";
import * as l from "@/lib/hooks";
let r = [
  "Wolf Moon",
  "Snow Moon",
  "Worm Moon",
  "Pink Moon",
  "Flower Moon",
  "Strawberry Moon",
  "Buck Moon",
  "Sturgeon Moon",
  "Harvest Moon",
  "Hunter's Moon",
  "Beaver Moon",
  "Cold Moon",
];
function t(e) {
  let a = e.getUTCMonth();
  return 9 === a && 7 >= e.getUTCDate() ? "Harvest Moon" : r[a];
}
export const AlmanacBar = function () {
  let e = (0, l.useMinuteNow)(),
    r = (0, l.usePlace)();
  if (!e) return <div className="h-10 w-44" aria-hidden="true" />;
  let c = (function (e = new Date()) {
      var a;
      let s = (0, n.getMoon)(e, undefined),
        r = new Date(s.nextFull + "T12:00:00Z");
      return {
        moon: s,
        waxing: s.age < 14.7652944265,
        fullMoonName: t(r),
        daysToFull: Math.round((r.getTime() - e.getTime()) / 864e5),
        daysToNew: Math.round((new Date(s.nextNew + "T12:00:00Z").getTime() - e.getTime()) / 864e5),
        plantingHint:
          ((a = s.age),
          "New Moon" === s.phaseName || (a >= 0 && a < 7.4)
            ? "New to first quarter: sow leafy crops and anything harvested for its leaves — lettuce, spinach, brassicas, herbs."
            : a < 14.8
              ? "First quarter to full: sow crops that fruit above ground — beans, peas, tomatoes, squash, grain."
              : a < 22.1
                ? "Full to last quarter: plant root crops, bulbs and perennials; transplant and take cuttings."
                : "Last quarter to new: a resting phase — weed, prune, harvest, turn compost and prepare beds."),
        season: (function (e = new Date(), a = false) {
          let s = e.getUTCFullYear(),
            n = [
              {
                name: a ? "Autumn equinox" : "Spring equinox",
                md: [2, 20],
              },
              {
                name: a ? "Winter solstice" : "Summer solstice",
                md: [5, 21],
              },
              {
                name: a ? "Spring equinox" : "Autumn equinox",
                md: [8, 22],
              },
              {
                name: a ? "Summer solstice" : "Winter solstice",
                md: [11, 21],
              },
            ],
            r = [s, s + 1]
              .flatMap((e) =>
                n.map((a) => ({
                  name: a.name,
                  date: new Date(Date.UTC(e, a.md[0], a.md[1], 12)),
                })),
              )
              .filter((a) => a.date.getTime() >= e.getTime() - 432e5)
              .sort((e, a) => e.date.getTime() - a.date.getTime())[0];
          return {
            ...r,
            daysAway: Math.max(0, Math.round((r.date.getTime() - e.getTime()) / 864e5)),
          };
        })(e),
        events: (function (e = new Date(), a = 45) {
          return (0, n.phasesBetween)(new Date(e.getTime() - 432e5), a + 0.5).map((e) => ({
            kind: e.kind,
            date: e.date,
            name: "Full Moon" === e.kind ? t(e.date) : undefined,
          }));
        })(e),
      };
    })(e),
    d = r ? (0, o.sunTimes)(r.lat, r.lon, e) : null;
  return (
    <s.default
      href="/almanac"
      className="flex items-center gap-3 rounded-full border border-line/80 bg-surface/70 pl-1.5 pr-4 py-1 text-xs text-ink-2 hover:border-moss hover:text-ink transition whitespace-nowrap"
      title="Open the almanac"
    >
      <i.MoonIcon age={c.moon.age} size={30} />
      <span className="flex flex-col leading-tight">
        <span className="font-semibold text-ink">
          {c.moon.phaseName}
          {" · "}
          {c.moon.illumination}%
        </span>
        <span>
          {c.fullMoonName}
          {" in "}
          {c.daysToFull}
          {" d"}
        </span>
      </span>
      <span className="hidden md:flex flex-col leading-tight border-l border-line/80 pl-3">
        {d?.sunrise ? (
          <>
            <span className="font-semibold text-ink">
              {"☀ "}
              {(0, o.fmtTime)(d.sunrise, r?.tz)}
              {" – "}
              {(0, o.fmtTime)(d.sunset, r?.tz)}
            </span>
            <span className="truncate max-w-[9rem]">{r?.label}</span>
          </>
        ) : (
          <>
            <span className="font-semibold text-ink">{c.season.name}</span>
            <span>
              {"in "}
              {c.season.daysAway}
              {" days"}
            </span>
          </>
        )}
      </span>
    </s.default>
  );
};
