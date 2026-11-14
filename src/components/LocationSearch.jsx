"use client";
// Restored from client module 85016 (exports: LocationSearch)
import * as t from "react/jsx-runtime";
import * as s from "next/navigation";
import * as n from "react";
import * as a from "@/lib/zone-query";
import { useRegion } from "@/lib/use-region";
/** @param {{ large?: boolean, defaultValue?: string, section?: string }} props */
export const LocationSearch = function ({ large: e = false, defaultValue: r = "", section: o }) {
  // The placeholder follows the reader: "ZIP code" and the zone shortcut only where those are the habit,
  // "postcode" in the UK and Ireland, "postal code" everywhere else and before a place is known.
  const region = useRegion();
  let i = (0, s.useRouter)(),
    l = o ? `&section=${encodeURIComponent(o)}` : "",
    [d, c] = (0, n.useState)(r),
    [h, m] = (0, n.useState)(false),
    [u, x] = (0, n.useState)(null);
  return (
    <form
      onSubmit={function (e) {
        if ((e.preventDefault(), !d.trim())) return;
        m(true);
        let t = (0, a.parseZoneQuery)(d);
        i.push(t ? `/zones/${t}` : `/guide?q=${encodeURIComponent(d.trim())}${l}`);
      }}
      className="w-full"
    >
      <div
        className={`flex items-stretch gap-1 rounded-full border border-edge bg-surface p-1 shadow-rest transition focus-within:border-moss focus-within:ring-2 focus-within:ring-moss/25 ${e ? "sm:p-1.5" : ""}`}
      >
        <input
          value={d}
          onChange={(e) => c(e.target.value)}
          placeholder={region.searchPlaceholder}
          aria-label="Your location"
          className={`flex-1 w-0 min-w-0 bg-transparent px-4 placeholder:text-ink-2 focus:outline-none ${e ? "h-14 text-lg" : "h-11 text-base"}`}
          autoComplete="off"
          enterKeyHint="search"
        />
        <button
          type="button"
          onClick={function () {
            navigator.geolocation
              ? (m(true),
                x(null),
                navigator.geolocation.getCurrentPosition(
                  (e) => {
                    i.push(`/guide?lat=${e.coords.latitude.toFixed(4)}&lon=${e.coords.longitude.toFixed(4)}${l}`);
                  },
                  () => {
                    (m(false), x(`Location unavailable. Enter a town or ${region.postalWord} instead.`));
                  },
                  {
                    timeout: 8e3,
                  },
                ))
              : x("Location isn't available in this browser.");
          }}
          disabled={h}
          title="Use my current location"
          aria-label="Use my current location"
          className="rounded-full px-3 text-ink-2 hover:bg-moss-soft hover:text-moss disabled:opacity-50 transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        </button>
        <button
          type="submit"
          disabled={h}
          className={`rounded-full bg-moss text-on-moss font-semibold px-5 hover:bg-moss-2 disabled:opacity-60 transition ${e ? "text-base sm:px-7" : "text-sm"}`}
        >
          {h ? "Searching…" : "Search"}
        </button>
      </div>
      {u && <p className="mt-2 text-sm text-rust">{u}</p>}
    </form>
  );
};
