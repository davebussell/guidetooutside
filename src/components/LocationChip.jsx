"use client";
// Restored from client module 29950 (exports: LocationChip, TOPIC_LINKS)
import * as s from "next/link";
import * as n from "next/navigation";
import * as r from "react";
import * as t from "@/lib/zone-query";
import * as o from "@/lib/hooks";
import { useRegion } from "@/lib/use-region";
/** @param {{ compact?: boolean }} props */
export const LocationChip = function ({ compact: e = false }) {
  // The reader's own postal word ("Town or postcode" in Britain, "ZIP code" in the US), neutral until a place is known.
  let region = useRegion(),
    i,
    l = (0, o.usePlace)(),
    c = (0, n.useRouter)(),
    d = (0, n.usePathname)(),
    [h, u] = (0, r.useState)(false),
    [m, p] = (0, r.useState)(""),
    [g, b] = (0, r.useState)(false),
    [x, f] = (0, r.useState)(null),
    w = (0, r.useRef)(null),
    v = (0, r.useRef)(null),
    j = (i = d?.match(/^\/(gardening|fishing|foraging|ground)\/[^/]+/)) ? i[1] : "";
  (0, r.useEffect)(() => {
    if (!h) return;
    let e = (e) => {
        w.current && !w.current.contains(e.target) && u(false);
      },
      a = (e) => {
        "Escape" === e.key && u(false);
      };
    (document.addEventListener("mousedown", e), document.addEventListener("keydown", a));
    let s = setTimeout(() => v.current?.focus(), 30);
    return () => {
      (document.removeEventListener("mousedown", e), document.removeEventListener("keydown", a), clearTimeout(s));
    };
  }, [h]);
  let k = j ? `&section=${j}` : "",
    y = l ? l.label.split(",")[0].trim() : "Find my area";
  return (
    <div ref={w} className="relative">
      <button
        type="button"
        onClick={() => u((e) => !e)}
        aria-expanded={h}
        aria-haspopup="dialog"
        title={l ? `Your location: ${l.label}` : "Set your location"}
        className={`inline-flex items-center gap-2 rounded-full transition whitespace-nowrap ${l ? "border border-edge bg-surface/80 text-ink hover:border-moss hover:text-moss px-3.5 py-2" : "bg-moss text-paper hover:bg-moss-2 px-4 py-2"} ${e ? "text-sm px-3 py-1.5" : "text-[15px] font-medium"}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span className={`truncate ${e ? "max-w-[7.5rem]" : "max-w-[7rem] xl:max-w-[8rem]"}`}>{y}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition ${h ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {h && (
        <div
          role="dialog"
          aria-label="Change your location"
          className="gto-solid card p-4 z-50 shadow-lift fixed inset-x-4 top-[5.5rem] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem] sm:max-w-[calc(100vw-2rem)]"
        >
          {l ? (
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Your location</p>
                <p className="font-display text-lg font-semibold leading-tight">{l.label}</p>
              </div>
              {l.slug && (
                <s.default
                  href={j ? `/${j}/${l.slug}` : `/guide/${l.slug}`}
                  onClick={() => u(false)}
                  className="text-sm font-medium text-moss underline whitespace-nowrap"
                >
                  Open guide →
                </s.default>
              )}
            </div>
          ) : (
            <div>
              <p className="eyebrow">Your location</p>
              <p className="text-sm text-ink-2">Once set, the menus link directly to the local guides.</p>
            </div>
          )}
          <form
            onSubmit={function (e) {
              e.preventDefault();
              let a = m.trim();
              if (!a) return;
              let s = (0, t.parseZoneQuery)(a);
              (b(true), u(false), p(""), b(false), c.push(s ? `/zones/${s}` : `/guide?q=${encodeURIComponent(a)}${k}`));
            }}
            className="mt-3 flex gap-2"
          >
            <input
              ref={v}
              value={m}
              onChange={(e) => p(e.target.value)}
              placeholder={l ? `Change to a ${region.searchPlaceholder.charAt(0).toLowerCase()}${region.searchPlaceholder.slice(1)}` : region.searchPlaceholder}
              aria-label="New location"
              className="flex-1 w-0 min-w-0 rounded-full border border-edge bg-surface px-4 py-2 text-sm placeholder:text-ink-2 focus:outline-none focus:border-moss focus:ring-2 focus:ring-moss/25"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={g}
              className="rounded-full bg-moss text-paper px-4 py-2 text-sm font-semibold hover:bg-moss-2 disabled:opacity-60"
            >
              Go
            </button>
          </form>
          <button
            type="button"
            onClick={function () {
              navigator.geolocation
                ? (b(true),
                  f(null),
                  navigator.geolocation.getCurrentPosition(
                    (e) => {
                      (b(false), u(false), c.push(`/guide?lat=${e.coords.latitude.toFixed(4)}&lon=${e.coords.longitude.toFixed(4)}${k}`));
                    },
                    () => {
                      (b(false), f(`Location unavailable. Enter a town or ${region.postalWord} instead.`));
                    },
                    {
                      timeout: 8e3,
                    },
                  ))
                : f("Location isn't available in this browser.");
            }}
            disabled={g}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink disabled:opacity-60"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              <circle cx="12" cy="12" r="8" />
            </svg>
            {g ? "Locating…" : "Use my current location"}
          </button>
          {x && <p className="mt-2 text-xs text-rust">{x}</p>}
          {j && (
            <p className="mt-2 text-xs text-ink-2">
              {"You'll stay on the "}
              {j}
              {" guide for the new place."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export const TOPIC_LINKS = [
  {
    section: "gardening",
    label: "Gardening",
    topic: "/gardening",
  },
  {
    section: "fishing",
    label: "Fishing",
    topic: "/fishing",
  },
  {
    section: "foraging",
    label: "Foraging",
    topic: "/foraging",
  },
];
