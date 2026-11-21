import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AdsenseScript } from "@/components/AdsenseScript";
import { OutboundClicks } from "@/components/conservation/OutboundClicks";

/**
 * Google consent mode: in the EEA, the UK and Switzerland, analytics and ad
 * storage stay off until the visitor accepts in Google's consent message
 * (AdSense → Privacy & messaging), which updates these signals itself.
 */
const CONSENT_DEFAULT = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  region: ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"],
  wait_for_update: 500,
};

/** AdSense's site-ownership tag, in <head> on every main-site page once the publisher ID is set. */
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
export const metadata: Metadata = ADSENSE_CLIENT ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {};

// Analytics and ads load on the main site.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
      {/* Counts clicks out to conservation organisations as the GA4 event org_out (no-op without gtag). */}
      <OutboundClicks />
      {adsense && <AdsenseScript client={adsense} />}
      {ga && (
        <>
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',${JSON.stringify(CONSENT_DEFAULT)});gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
        </>
      )}
    </>
  );
}
