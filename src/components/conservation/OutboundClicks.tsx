"use client";
/**
 * Counts connections made: a click on any organisation link
 * (`[data-gto-out="org"]`, carrying `data-gto-org` and `data-gto-way`) sends a
 * GA4 event `org_out` with the organisation, the way in and the page; a click
 * on a community garden in a food band (`[data-gto-out="garden"]`, carrying
 * `data-gto-garden`, its OpenStreetMap id, and the way: website, osm or map)
 * sends `garden_out`. Mounted
 * once in the site layout; does nothing when gtag is absent (no GA ID, kids
 * pages, blocked script) and respects the consent defaults gtag already holds.
 */
import { useEffect } from "react";

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

export function OutboundClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('[data-gto-out="org"], [data-gto-out="garden"]');
      if (!a) return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== "function") return;
      if (a.getAttribute("data-gto-out") === "garden") {
        gtag("event", "garden_out", {
          garden: a.getAttribute("data-gto-garden") ?? "",
          way: a.getAttribute("data-gto-way") ?? "osm",
          page_path: window.location.pathname,
          transport_type: "beacon",
        });
        return;
      }
      gtag("event", "org_out", {
        org: a.getAttribute("data-gto-org") ?? "",
        way: a.getAttribute("data-gto-way") ?? "home",
        page_path: window.location.pathname,
        transport_type: "beacon",
      });
    };
    // Capture, so a link that stops propagation is still counted; auxclick counts middle-clicks.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);
  return null;
}
