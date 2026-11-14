"use client";
// Restored from client module 14824 (exports: SunPanel)
import * as s from "next/link";
import * as n from "@/lib/sun";
import * as a from "@/lib/hooks";
export const SunPanel = function () {
  let e = (0, a.usePlace)();
  function r() {
    navigator.geolocation?.getCurrentPosition((e) => {
      let t = {
        slug: "",
        label: "Your location",
        lat: e.coords.latitude,
        lon: e.coords.longitude,
      };
      try {
        (localStorage.setItem("gto:place", JSON.stringify(t)), window.dispatchEvent(new Event("gto:place")));
      } catch {}
    });
  }
  if (!(0, a.useMounted)()) return <section className="card p-6 min-h-40" aria-busy="true" />;
  if (!e)
    return (
      <section className="card p-6">
        <p className="eyebrow">Sun</p>
        <p className="mt-2 text-ink-2">
          Look up any{" "}
          <s.default href="/#search" className="underline">
            location
          </s.default>{" "}
          and this panel will show sunrise, sunset and day length for it — or{" "}
          <button type="button" onClick={r} className="underline">
            use your device's location
          </button>
          .
        </p>
      </section>
    );
  let o = new Date(),
    i = (0, n.sunTimes)(e.lat, e.lon, o),
    l = (0, n.sunTimes)(e.lat, e.lon, new Date(o.getTime() - 864e5)),
    d = null != i.dayLengthMin && null != l.dayLengthMin ? i.dayLengthMin - l.dayLengthMin : null;
  return (
    <section className="card p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow">
          {"Sun · "}
          {e.label}
        </p>
        {e.slug && (
          <s.default href={`/guide/${e.slug}`} className="text-xs underline text-ink-2">
            local guide
          </s.default>
        )}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-ink-2">Sunrise</p>
          <p className="font-display text-2xl font-semibold">{(0, n.fmtTime)(i.sunrise, e.tz)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-2">Sunset</p>
          <p className="font-display text-2xl font-semibold">{(0, n.fmtTime)(i.sunset, e.tz)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-2">Day length</p>
          <p className="font-display text-2xl font-semibold">{(0, n.fmtDayLength)(i.dayLengthMin)}</p>
          {null != d && 0 !== d && (
            <p className="text-xs text-ink-2">
              {d > 0 ? "+" : ""}
              {d}
              {" min vs yesterday"}
            </p>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-2/80">
        {"Solar noon "}
        {(0, n.fmtTime)(i.solarNoon, e.tz)}.{" "}
        <button type="button" onClick={r} className="underline">
          Use my current location instead
        </button>
      </p>
    </section>
  );
};
