"use client";
// Restored from client module 26370 (exports: MobileMenu)
import * as s from "next/link";
import * as n from "react";
import * as r from "react-dom";
import * as t from "@/components/AlmanacBar";
import * as o from "@/lib/nav";
import * as i from "next/image";
import * as l from "@/lib/ecoregions";
import * as c from "@/lib/nav";
import * as d from "@/lib/nav";
import * as h from "@/lib/hooks";
import { SERVED_NAV_MENUS } from "./nav-served";
export const MobileMenu = function () {
  let [e, u] = (0, n.useState)(false),
    [m, p] = (0, n.useState)(SERVED_NAV_MENUS[0].id),
    [g, b] = (0, n.useState)(false),
    x = (0, h.usePlace)(),
    f = x?.slug ?? null,
    w = x ? (0, l.classifyEcoregion)(x.lat, x.lon) : null,
    v = w ? (0, c.regionFace)(w.slug) : null;
  ((0, n.useEffect)(() => b(true), []),
    (0, n.useEffect)(
      () => (
        (document.body.style.overflow = e ? "hidden" : ""),
        () => {
          document.body.style.overflow = "";
        }
      ),
      [e],
    ),
    (0, n.useEffect)(() => {
      if (!e) return;
      let a = (e) => "Escape" === e.key && u(false);
      return (document.addEventListener("keydown", a), () => document.removeEventListener("keydown", a));
    }, [e]));
  let j = () => u(false),
    k = (
      <div className="gto-solid fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper motion-safe:animate-settle">
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-line/70 px-4">
          <t.AlmanacBar />
          <button type="button" onClick={j} aria-label="Close menu" className="rounded-full border border-edge p-2.5 transition hover:border-moss hover:text-moss">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-5 py-6" aria-label="Main">
          {x && (
            <p className="eyebrow mb-3">
              {"Showing "}
              {x.label}
            </p>
          )}
          <ul className="grid gap-1">
            {SERVED_NAV_MENUS.map((e) => {
              let n = m === e.id;
              return (
                <li key={e.id} className="border-b border-line/60 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <s.default
                      href={(0, o.navHref)(e.href, f)}
                      onClick={j}
                      className="font-display flex flex-1 items-center gap-3 py-3.5 text-2xl font-semibold hover:text-moss"
                    >
                      <d.MenuIcon name={e.icon} className="h-6 w-6 text-ink-2" />
                      {e.label}
                    </s.default>
                    <button
                      type="button"
                      onClick={() => p(n ? null : e.id)}
                      aria-expanded={n}
                      aria-label={`${n ? "Hide" : "Show"} ${e.label} links`}
                      className="rounded-full border border-edge p-2 text-ink-2 transition hover:border-moss hover:text-moss"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={n ? "rotate-180" : ""}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  {n && (
                    <div className="pb-4">
                      <s.default
                        href={(0, o.navHref)(e.lead.href, f)}
                        onClick={j}
                        className="block rounded-tile border border-line bg-paper-2 p-4"
                      >
                        <p className="eyebrow">{x?.label ?? "No location set"}</p>
                        <p className="font-display mt-0.5 text-lg font-semibold leading-tight">{e.lead.label}</p>
                        <p className="mt-1 text-sm text-ink-2">{e.lead.note}</p>
                        {w && v && "land" === e.id && (
                          <span className="mt-3 flex items-center gap-2.5 text-xs text-ink-2">
                            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-line">
                              <i.default src={v.src} alt="" fill sizes="36px" className="object-cover" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-medium text-ink">{w.name}</span>
                              <span className="block truncate">
                                {v.name}
                                {" country"}
                              </span>
                            </span>
                          </span>
                        )}
                      </s.default>
                      {e.intro && (
                        <s.default
                          href={e.intro.href}
                          onClick={j}
                          className="mt-3 flex items-start gap-2.5 rounded-tile border border-dashed border-line px-3.5 py-2.5 text-sm"
                        >
                          <d.MenuIcon name="book" className="mt-0.5 h-4 w-4 shrink-0 text-ink-2" />
                          <span className="min-w-0">
                            <span className="block font-semibold text-ink">{e.intro.label}</span>
                            <span className="block text-xs text-ink-2">{e.intro.note}</span>
                          </span>
                        </s.default>
                      )}
                      {e.sections.map((e) => (
                        <div key={e.title} className="mt-4">
                          <p className="eyebrow">{e.title}</p>
                          <ul className="mt-2 grid gap-2.5">
                            {e.links.map((e) => (
                              <li key={e.label}>
                                <s.default href={(0, o.navHref)(e.href, f)} onClick={j} className="flex gap-3">
                                  <d.MenuIcon name={e.icon} className="mt-0.5 h-[18px] w-[18px] text-ink-2/80" />
                                  <span className="min-w-0">
                                    <span className="block font-medium leading-snug">{e.label}</span>
                                    {e.note && <span className="mt-0.5 block text-xs leading-snug text-ink-2">{e.note}</span>}
                                  </span>
                                </s.default>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-3 text-ink-2">
            {o.NAV_SECONDARY.map((e) => (
              <s.default key={e.label} href={(0, o.navHref)(e.href, f)} onClick={j} className="hover:text-ink">
                {e.label}
              </s.default>
            ))}
          </div>
        </nav>
      </div>
    );
  return (
    <>
      <button
        type="button"
        onClick={() => u(true)}
        aria-label="Open menu"
        aria-expanded={e}
        className="rounded-full border border-edge bg-surface/70 p-2.5 text-ink transition hover:border-moss hover:text-moss"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {e && g && (0, r.createPortal)(k, document.body)}
    </>
  );
};
