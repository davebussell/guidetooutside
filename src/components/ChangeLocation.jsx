"use client";
// Restored from client module 62181 (exports: ChangeLocation)
import * as t from "react/jsx-runtime";
import * as s from "next/navigation";
import * as i from "react";
import * as r from "@/lib/zone-query";
import * as n from "@/lib/place-cookie";
import { useRegion } from "@/lib/use-region";
/** @param {{ section?: string, label: string }} props */
export const ChangeLocation = function ({ section: e, label: a }) {
  // The reader's own postal word ("Town or postcode" in Britain, "ZIP code" in the US), neutral until a place is known.
  let region = useRegion(),
    o = (0, s.useRouter)(),
    [l, c] = (0, i.useState)(false),
    [d, h] = (0, i.useState)(""),
    [x, f] = (0, i.useState)(null),
    u = (0, i.useRef)(null),
    m = (0, i.useRef)(null);
  return (
    (0, i.useEffect)(() => {
      if (!l) return;
      let e = (e) => {
          u.current && !u.current.contains(e.target) && c(false);
        },
        t = (e) => "Escape" === e.key && c(false);
      (document.addEventListener("mousedown", e), document.addEventListener("keydown", t));
      let s = setTimeout(() => m.current?.focus(), 30);
      return () => {
        (document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t), clearTimeout(s));
      };
    }, [l]),
    (
      <div ref={u} className="relative shrink-0">
        <button
          type="button"
          onClick={() => c((e) => !e)}
          aria-expanded={l}
          className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface/80 px-4 py-2 text-sm hover:border-moss transition"
        >
          <svg
            width="15"
            height="15"
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
          <span className="max-w-[12rem] truncate">
            {"Showing "}
            {a}
          </span>
          <span className="font-semibold text-moss">Change</span>
        </button>
        {l && (
          <div
            role="dialog"
            aria-label="Change location"
            className="gto-solid absolute right-0 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] card p-4 z-50 shadow-lift"
          >
            <p className="eyebrow">Show this guide for</p>
            <form
              onSubmit={function (t) {
                t.preventDefault();
                let s = d.trim();
                if (!s) return;
                let i = (0, r.parseZoneQuery)(s);
                (c(false), h(""));
                let n = e ? `&section=${e}` : "";
                o.push(i ? `/zones/${i}` : `/guide?q=${encodeURIComponent(s)}${n}`);
              }}
              className="mt-2 flex gap-2"
            >
              <input
                ref={m}
                value={d}
                onChange={(e) => h(e.target.value)}
                placeholder={region.searchPlaceholder}
                aria-label="New location"
                className="flex-1 w-0 min-w-0 rounded-full border border-edge bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss/25"
                autoComplete="off"
              />
              <button type="submit" className="rounded-full bg-moss text-paper px-4 py-2 text-sm font-semibold hover:bg-moss-2">
                Go
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <button
                type="button"
                onClick={function () {
                  navigator.geolocation
                    ? navigator.geolocation.getCurrentPosition(
                        (t) => {
                          (c(false),
                            o.push(
                              `/guide?lat=${t.coords.latitude.toFixed(4)}&lon=${t.coords.longitude.toFixed(4)}${e ? `&section=${e}` : ""}`,
                            ));
                        },
                        () => f(`Location unavailable. Enter a town or ${region.postalWord} instead.`),
                        {
                          timeout: 8e3,
                        },
                      )
                    : f("Location isn't available in this browser.");
                }}
                className="text-ink-2 hover:text-ink underline"
              >
                Use my current location
              </button>
              <button
                type="button"
                onClick={function () {
                  ((0, n.clearPlace)(), c(false), o.refresh());
                }}
                className="text-ink-2 hover:text-ink underline"
              >
                Browse everywhere instead
              </button>
            </div>
            {x && <p className="mt-2 text-xs text-rust">{x}</p>}
          </div>
        )}
      </div>
    )
  );
};
