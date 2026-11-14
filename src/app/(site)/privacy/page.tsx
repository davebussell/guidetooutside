import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      <p className="eyebrow text-moss">Privacy</p>
      <h1 className="font-display mt-2 text-4xl font-semibold">Short version: we keep very little.</h1>
      <div className="mt-6 space-y-4 text-ink-2 leading-relaxed">
        <p>
          <strong className="text-ink">Location.</strong>
          {" The town, postal code or coordinates you enter are used to build your guide and appear in the page URL. If you use the “locate me” button, your browser asks your permission first. We do not store your location against any identity."}
        </p>
        <p>
          <strong className="text-ink">Newsletter.</strong>
          {" If you subscribe, we keep your email address and the area you subscribed from so we can send you a relevant weekly note. Every email has an unsubscribe link."}
        </p>
        <p>
          <strong className="text-ink">Shared spaces (closed).</strong>
          {" The shared-spaces listings closed in October 2026 and no new listings or visit requests are taken. If you listed a space before then, ask us and we will delete what you sent entirely."}
        </p>
        <p>
          <strong className="text-ink">Analytics.</strong>
          {" We use Google Analytics to count visits and see which pages are useful. It sets cookies. Visitors in the European Economic Area, the UK and Switzerland are asked first, and analytics stays off until they agree."}
        </p>
        <p>
          <strong className="text-ink">Advertising.</strong>
          {" Pages on the main site may show ads from Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the internet. You can opt out of personalised advertising in "}
          <a className="underline" href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google&apos;s My Ad Center</a>
          {", and opt out of some other vendors' cookies at "}
          <a className="underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>
          {". How Google uses information from sites that use its services is explained "}
          <a className="underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">on Google&apos;s own page</a>
          {". Visitors in the European Economic Area, the UK and Switzerland are asked for consent before personalised ads are shown. The Learn pages carry no ads."}
        </p>
        <p>
          <strong className="text-ink">Shop and affiliate links.</strong>
          {" Books marked as supporting an organisation link to that organisation's own shop; we earn nothing from those sales, and nothing from any donation, membership or adoption you make. Other book links go to Bookshop.org (or IndieBookstores.ca in Canada), and Bookshop.org links may be affiliate links that earn the site a small commission at no extra cost to you; Bookshop.org shares its affiliate earnings with independent bookshops. The brands on the gifts shelves are 1% for the Planet members, and some of their links may become affiliate links. Any shop you visit may set cookies on its own site, under its own privacy policy."}
        </p>
        <p>
          <strong className="text-ink">Third-party data.</strong>
          {" Your location is sent to weather and map services (Open-Meteo, OpenStreetMap Nominatim, Overpass) and to an AI provider to generate the guide, under their own privacy policies. No account, name or email is ever sent with it."}
        </p>
        <p>
          {"Questions: "}
          <a className="underline" href="mailto:hello@guidetooutside.com">hello@guidetooutside.com</a>
        </p>
      </div>
    </article>
  );
}
