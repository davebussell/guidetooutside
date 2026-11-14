"use client";
// Restored from client module 97161 (exports: AtmospherePhase)
import * as t from "react";
import * as n from "@/lib/daypart";
import * as s from "@/lib/hooks";
export const AtmospherePhase = function () {
  let e = (0, s.usePlace)(),
    a = (0, s.useMinuteNow)();
  return (
    (0, t.useEffect)(() => {
      if (!a) return;
      let t = new Date(a),
        s = e?.lat ?? 45,
        l = e?.lon ?? -t.getTimezoneOffset() / 4;
      try {
        document.documentElement.dataset.phase = (0, n.dayShape)(s, l, t).current?.phase ?? "night";
      } catch {}
    }, [e?.lat, e?.lon, a]),
    (0, t.useEffect)(() => {
      let e = document.documentElement;
      return () => {
        delete e.dataset.phase;
      };
    }, []),
    null
  );
};
