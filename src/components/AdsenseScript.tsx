"use client";


/**
 * Loads Google AdSense (Auto ads) on the main site when NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * A plain async <script> is server-rendered and React hoists it into <head>, which is
 * where AdSense's site verification looks for it.
 */
export function AdsenseScript({ client }: { client: string }) {
  return <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" />;
}
