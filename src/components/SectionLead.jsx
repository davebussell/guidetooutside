"use client";
// Restored from client module 84960 (exports: SectionLead)
import * as n from "next/link";
import * as l from "@/lib/hooks";
import * as s from "@/components/LocationSearch";
/** @param {{ section: string, label: string, note?: string }} props */
export const SectionLead = function ({ section: e, label: o, note: i }) {
  let a = (0, l.usePlace)();
  return a?.slug ? (
    <div className="grid gap-3">
      <n.default
        href={`/${e}/${a.slug}`}
        className="group flex items-center justify-between gap-4 rounded-card bg-moss px-5 py-4 text-on-moss transition hover:shadow-lift hover:bg-moss-2"
      >
        <span className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wider text-on-moss/90">{a.label}</span>
          <span className="font-display mt-0.5 block text-xl sm:text-2xl font-semibold leading-tight">{o}</span>
          <span className="mt-1 block text-sm text-on-moss/90">{i}</span>
        </span>
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-on-moss/15 text-2xl transition group-hover:translate-x-1"
        >
          →
        </span>
      </n.default>
      <details className="text-sm text-ink-2">
        <summary className="cursor-pointer underline decoration-line underline-offset-2 hover:text-ink">Another place</summary>
        <div className="mt-3">
          <s.LocationSearch section={e} />
        </div>
      </details>
    </div>
  ) : (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink">{o}: enter a place</p>
      <s.LocationSearch large section={e} />
      <p className="mt-2 text-sm text-ink-2">
        Town or postal code, anywhere in Canada or the United States, or use your location.{" "}
        <a href="#find" className="underline decoration-line hover:text-ink">
          Or choose from the list
        </a>
        .
      </p>
    </div>
  );
};
