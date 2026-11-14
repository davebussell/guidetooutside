"use client";

import { usePathname } from "next/navigation";

/** Pages written for teaching children carry no ads. */
const NO_ADS = ["/learn"];

/**
 * Loads Google AdSense (Auto ads) on the main site when NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * A plain async <script> is server-rendered and React hoists it into <head>, which is
 * where AdSense's site verification looks for it.
 */
export function AdsenseScript({ client }: { client: string }) {
  const path = usePathname() ?? "/";
  if (NO_ADS.some((p) => path === p || path.startsWith(p + "/"))) return null;
  return <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" />;
}
