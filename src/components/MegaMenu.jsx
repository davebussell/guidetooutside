"use client";
// Restored from client module 75020 (exports: MegaMenu)
import * as a from "react/jsx-runtime";
import * as s from "next/link";
import * as n from "next/navigation";
import * as r from "react";
import * as t from "next/image";
import * as o from "@/lib/nav";
import * as i from "@/lib/ecoregions";
import * as l from "@/lib/nav";
import * as c from "@/lib/nav";
import * as d from "@/lib/hooks";
import { SERVED_NAV_MENUS } from "./nav-served";
function CH_({ id: e, menu: n, slug: r, label: d, lat: u, lon: m, onNavigate: p, onHold: g, onRelease: b }) {
  let x = null != u && null != m ? (0, i.classifyEcoregion)(u, m) : null,
    f = x ? (0, l.regionFace)(x.slug) : null;
  return (
    <div id={e} className="fixed inset-x-0 top-20 z-40 px-4 sm:px-6 pt-3" onMouseEnter={g} onMouseLeave={b}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="gto-solid ml-auto w-full max-w-3xl xl:max-w-4xl overflow-hidden rounded-card border border-line bg-surface shadow-lift motion-safe:animate-[gtoFade_var(--duration-settle)_var(--ease-settle)]">
          <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <div className="relative overflow-hidden bg-paper-2 p-6">
              {f && (
                <>
                  <t.default src={f.src} alt="" fill sizes="340px" className="object-cover opacity-[0.3]" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-br from-paper-2 via-paper-2/80 to-paper-2/40" aria-hidden="true" />
                </>
              )}
              <div className="relative">
                <p className="eyebrow flex items-center gap-1.5 text-moss">
                  <c.MenuIcon name={n.icon} className="h-4 w-4" />
                  {n.label}
                </p>
                <p className="font-display mt-1 text-xl font-semibold leading-tight">{n.tagline}</p>
                <s.default
                  href={(0, o.navHref)(n.lead.href, r)}
                  onClick={p}
                  className="group mt-5 block rounded-tile border border-line bg-surface/80 p-4 transition hover:border-moss"
                >
                  <p className="eyebrow">{r && d ? d : "No location set"}</p>
                  <p className="font-display mt-0.5 text-lg font-semibold leading-tight group-hover:text-moss">{n.lead.label}</p>
                  <p className="mt-1 text-sm text-ink-2">{n.lead.note}</p>
                  {!r && <p className="mt-2 text-xs text-ink-2">Set a location to open the local page.</p>}
                </s.default>
                {n.intro && (
                  <s.default
                    href={n.intro.href}
                    onClick={p}
                    className="group mt-3 flex items-start gap-2.5 rounded-tile border border-dashed border-line/90 bg-surface/50 px-3.5 py-2.5 text-sm transition hover:border-moss"
                  >
                    <c.MenuIcon name="book" className="mt-0.5 h-4 w-4 shrink-0 text-ink-2" />
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink group-hover:text-moss">{n.intro.label}</span>
                      <span className="block text-xs text-ink-2">{n.intro.note}</span>
                    </span>
                  </s.default>
                )}
                {x && f && "learn" === n.id && (
                  <s.default
                    href={`/regions/${x.slug}`}
                    onClick={p}
                    className="group mt-3 flex items-center gap-2.5 text-xs text-ink-2 hover:text-ink"
                  >
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-line">
                      <t.default src={f.src} alt="" fill sizes="36px" className="object-cover" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-ink group-hover:text-moss">{x.name}</span>
                      <span className="block truncate">
                        {f.name}
                        {" country"}
                      </span>
                    </span>
                  </s.default>
                )}
              </div>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-2">
              {n.sections.map((e) => (
                <div key={e.title}>
                  <p className="eyebrow">{e.title}</p>
                  <ul className="mt-2.5 grid gap-2.5">
                    {e.links.map((e) => (
                      <li key={e.label}>
                        <s.default
                          href={(0, o.navHref)(e.href, r)}
                          onClick={p}
                          className="group -mx-2 flex gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-moss-soft"
                        >
                          <c.MenuIcon name={e.icon} className="mt-0.5 h-[18px] w-[18px] text-ink-2/80 transition group-hover:text-moss" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium leading-snug group-hover:text-moss">
                              {e.label}
                              {e.local && !r && <span className="ml-1.5 text-[11px] font-normal text-ink-2">needs a location</span>}
                            </span>
                            {e.note && <span className="mt-0.5 block text-xs leading-snug text-ink-2">{e.note}</span>}
                          </span>
                        </s.default>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const MegaMenu = function () {
  let [e, t] = (0, r.useState)(null),
    i = (0, d.usePlace)(),
    l = (0, n.usePathname)(),
    u = (0, r.useRef)(null),
    m = (0, r.useRef)(null),
    p = (0, r.useId)(),
    g = i?.slug ?? null,
    b = () => {
      (m.current && clearTimeout(m.current), (m.current = null));
    },
    x = (e, a) => {
      (b(), (m.current = setTimeout(() => t(e), a)));
    },
    f = (e) => {
      (b(), (m.current = setTimeout(() => t(null), e)));
    },
    w = (0, r.useCallback)(() => {
      (b(), t(null));
    }, []);
  return (
    (0, r.useEffect)(() => {
      w();
    }, [l, w]),
    (0, r.useEffect)(() => () => b(), []),
    (0, r.useEffect)(() => {
      if (!e) return;
      let a = (a) => {
          "Escape" !== a.key || (w(), u.current?.querySelector(`[data-trigger="${e}"]`)?.focus());
        },
        s = (e) => {
          u.current && !u.current.contains(e.target) && w();
        };
      return (
        document.addEventListener("keydown", a),
        document.addEventListener("mousedown", s),
        () => {
          (document.removeEventListener("keydown", a), document.removeEventListener("mousedown", s));
        }
      );
    }, [e, w]),
    (
      <div
        ref={u}
        className="relative hidden lg:flex items-center self-stretch"
        onMouseEnter={b}
        onMouseLeave={() => f(180)}
        onBlurCapture={(e) => {
          if (!u.current) return;
          let a = e.relatedTarget;
          (a && u.current.contains(a)) || w();
        }}
      >
        <nav aria-label="Main" className="flex items-center gap-1">
          {SERVED_NAV_MENUS.map((n) => {
            var r, t;
            let d = e === n.id,
              u = `${p}-${n.id}`,
              m =
                ((r = n),
                !!(t = l) &&
                  ("learn" === r.id
                    ? ["/learn", "/ground", "/regions", "/the-day"].some((e) => t.startsWith(e))
                    : "conservation" === r.id
                      ? ["/conservation", "/resources"].some((e) => t.startsWith(e))
                      : t.startsWith(`/${r.id}`)));
            return (
              <div key={n.id} onMouseEnter={() => x(n.id, 110)}>
                <div
                  className={`inline-flex items-center rounded-full text-[15px] font-medium whitespace-nowrap transition ${m ? "bg-moss-soft text-moss" : d ? "bg-paper-2 text-ink" : "text-ink-2 hover:text-ink"}`}
                >
                  <s.default
                    href={(0, o.navHref)(n.href, g)}
                    onClick={w}
                    aria-current={l === (0, o.navHref)(n.href, g) ? "page" : undefined}
                    onKeyDown={(e) => {
                      "ArrowDown" !== e.key || d || (e.preventDefault(), x(n.id, 0));
                    }}
                    className="inline-flex items-center gap-1.5 rounded-l-full py-2 pl-3 pr-1 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <c.MenuIcon name={n.icon} className="h-[18px] w-[18px] opacity-80 lg:max-xl:hidden" />
                    {n.label}
                  </s.default>
                  <button
                    type="button"
                    data-trigger={n.id}
                    aria-expanded={d}
                    aria-controls={u}
                    aria-haspopup="true"
                    aria-label={`More in ${n.label}`}
                    onClick={() => (d ? w() : x(n.id, 0))}
                    onKeyDown={(e) => {
                      "ArrowDown" !== e.key || d || (e.preventDefault(), x(n.id, 0));
                    }}
                    className="grid h-9 w-7 place-items-center rounded-r-full pr-1"
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`transition-transform motion-reduce:transition-none ${d ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                {d && (
                  <CH_
                    id={u}
                    menu={n}
                    slug={g}
                    label={i?.label ?? null}
                    lat={i?.lat ?? null}
                    lon={i?.lon ?? null}
                    onNavigate={w}
                    onHold={b}
                    onRelease={() => f(180)}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>
    )
  );
};
