"use client";
// Restored from client module 7275 (exports: clockAtHour, useClock)
import * as t from "react";
import * as r from "@/lib/daypart";
import * as n from "@/lib/sun";
import * as s from "@/lib/kids/time-words";
function i(e, t, a = new Date()) {
  let o = (0, r.solarPosition)(e, t, a),
    l = (0, n.sunTimes)(e, t, a),
    c = Math.max(1, (0, r.solarPosition)(e, t, l.solarNoon).altitude),
    d = null;
  if (l.sunrise && l.sunset) {
    let e = (a.getTime() - l.sunrise.getTime()) / (l.sunset.getTime() - l.sunrise.getTime());
    d = e >= -0.02 && e <= 1.02 ? Math.max(0, Math.min(1, e)) : null;
  }
  return {
    time: (0, s.timeFromSun)(o.altitude, o.azimuth),
    sunArc: d,
    sunHeight: Math.max(0, o.altitude) / c,
  };
}
function a(e = new Date()) {
  let t = e.getHours() + e.getMinutes() / 60,
    r = (0, s.timeFromHour)(e.getHours()),
    n = t >= 6 && t <= 19 ? (t - 6) / 13 : null;
  return {
    time: r,
    sunArc: n,
    sunHeight: null == n ? 0 : Math.sin(n * Math.PI),
  };
}
export const clockAtHour = function (e, t) {
  let r = new Date(),
    n = Math.max(0, Math.min(23.99, t));
  return (r.setHours(Math.floor(n), Math.round((n % 1) * 60) % 60, 0, 0), null != e.lat && null != e.lon ? i(e.lat, e.lon, r) : a(r));
};
export const useClock = function (e) {
  let [r, n] = (0, t.useState)(
    e.clock ?? {
      time: "day",
      sunArc: 0.55,
      sunHeight: 0.8,
    },
  );
  return (
    (0, t.useEffect)(() => {
      let t = () => n(null != e.lat && null != e.lon ? i(e.lat, e.lon) : a());
      t();
      let r = setInterval(t, 6e4);
      return () => clearInterval(r);
    }, [e.lat, e.lon]),
    r
  );
};
