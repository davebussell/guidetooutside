"use client";
/**
 * The visitor's remembered place in the browser, for the parts of static
 * pages that depend on it: the `gto_place` cookie RememberPlace writes (or its
 * `gto:place` entry, through `usePlace`), and the country it is in, asked once
 * per page view from /conservation/near.json (which resolves the place
 * without the network). No library is bundled here.
 */
import { useEffect, useState } from "react";
import { usePlace } from "@/lib/hooks";
import { nearUrl, type NearAnswer, type NearPlace } from "./near";

export function cookiePlace(): NearPlace | null {
  try {
    const raw = document.cookie.split("; ").find((c) => c.startsWith("gto_place="));
    if (!raw) return null;
    const p = JSON.parse(decodeURIComponent(raw.slice("gto_place=".length))) as Partial<NearPlace>;
    return typeof p.slug === "string" && Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lon)) ? { slug: p.slug, label: p.label ?? null, lat: Number(p.lat), lon: Number(p.lon) } : null;
  } catch {
    return null;
  }
}

const asked = new Map<string, Promise<string | null>>();

/** The remembered place's ISO country code once known; null while unknown or with no place. */
export function useVisitorCountry(): string | null {
  const stored = usePlace() as NearPlace | null;
  const [country, setCountry] = useState<string | null>(null);
  const slug = stored?.slug ?? null;
  useEffect(() => {
    const place = stored?.slug ? stored : cookiePlace();
    if (!place?.slug || !Number.isFinite(place.lat) || !Number.isFinite(place.lon)) return;
    let live = true;
    if (!asked.has(place.slug)) {
      asked.set(
        place.slug,
        fetch(`${nearUrl(place, { limit: 1 })}&only=place`)
          .then((r) => (r.ok ? (r.json() as Promise<Pick<NearAnswer, "place">>) : null))
          .then((a) => a?.place?.countryCode || null)
          .catch(() => null),
      );
    }
    asked.get(place.slug)!.then((cc) => live && setCountry(cc));
    return () => {
      live = false;
    };
    // `slug` stands for the place.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return country;
}
