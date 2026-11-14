import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { NAV_SECONDARY, navHref } from "@/lib/nav";
import { SERVED_NAV_MENUS, type NavMenu } from "./nav-served";

const ZONES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/**
 * Each menu's links, as the footer lists them: the lead page, the section's
 * own page when the lead goes somewhere else, then every link in the panel.
 * The footer is the same for everyone, so place links point at their
 * place-less pages.
 */
/**
 * Links the footer carries that the menus do not: The Big Outside, the
 * children's picture-book stories and games, is promoted nowhere else on the
 * site (only as a "play after" in the day planner), so the footer is where
 * a parent finds it.
 */
const FOOTER_EXTRA: Record<string, { href: string; label: string }[]> = {
};

function footerLinks(m: NavMenu): { href: string; label: string }[] {
  return [
    { href: navHref(m.lead.href, null), label: m.lead.label },
    ...(m.homeLabel ? [{ href: navHref(m.href, null), label: m.homeLabel }] : []),
    ...m.sections.flatMap((s) => s.links.map((l) => ({ href: navHref(l.href, null), label: l.label }))),
    ...(FOOTER_EXTRA[m.id] ?? []),
  ];
}

const SITE_LINKS = [{ href: "/how-it-works", label: "How it works" }, ...NAV_SECONDARY, { href: "/privacy", label: "Privacy" }];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <Logo variant="badge" height={96} />
            <p className="mt-4 max-w-sm text-sm text-ink-2">
              Your guide to thrive outside: gardening, fishing, foraging and homesteading, town by town, across Canada and the United States.
            </p>
          </div>
          <div className="min-w-0">
            <p className="eyebrow">The Weekly Field Note</p>
            <p className="mt-1.5 text-sm text-ink-2">
              What is in season, which fish are active, and the week&apos;s weather and sky for your place. One email, Sunday evening.
            </p>
            <div className="mt-3">
              <NewsletterForm source="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line/60 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {SERVED_NAV_MENUS.map((m) => (
            <div key={m.id}>
              <p className="eyebrow">{m.label}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {footerLinks(m).map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-ink-2 transition hover:text-moss">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow">Site</p>
            <ul className="mt-3 space-y-2 text-sm">
              {SITE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-ink-2 transition hover:text-moss">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/60 pt-8">
          <p className="eyebrow">Hardiness zones</p>
          <ul className="flex flex-wrap gap-1.5">
            {ZONES.map((z) => (
              <li key={z}>
                <Link
                  href={`/zones/${z}`}
                  className="inline-block rounded-full border border-edge px-3 py-1 text-sm transition hover:border-moss hover:bg-moss-soft hover:text-moss"
                >
                  {z}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-xs text-ink-2 space-y-2">
          <p className="max-w-3xl">
            Guides are generated from public weather and climate data and general regional knowledge. They are educational, not a
            substitute for official regulations or expert identification. Confirm fishing seasons and limits with the regulator where you
            fish, and never eat a wild plant or mushroom you cannot identify with certainty.
          </p>
          <div className="flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} guidetooutside.com</span>
            <span>Weather &amp; climate: Open-Meteo · Map data © OpenStreetMap contributors</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
