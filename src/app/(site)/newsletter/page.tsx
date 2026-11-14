import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "The Weekly Field Note",
  description:
    "A short Sunday-evening email tuned to your area: frost warnings, what to plant, what's biting, what's ripening in the woods, and the week's moon.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <Logo variant="badge" height={112} className="mb-6" />
      <p className="eyebrow text-moss">Newsletter</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">The Weekly Field Note</h1>
      <p className="mt-4 text-lg text-ink-2">One email, Sunday evening, written for your area. About a two-minute read.</p>
      <div className="mt-8 card p-6 sm:p-8">
        <p className="eyebrow">Contents</p>
        <ul className="mt-3 space-y-2 text-ink-2">
          <li>— The week&apos;s weather in one line, and a frost warning when one is forecast</li>
          <li>— Three things to plant, start or harvest</li>
          <li>— Active fish species and the best feeding period</li>
          <li>— One wild food in season, and its poisonous look-alike</li>
          <li>— The moon: phase, traditional name and almanac notes</li>
        </ul>
        <p className="eyebrow mt-6">Sign up</p>
        <div className="mt-3">
          <NewsletterForm source="newsletter-page" />
        </div>
        <p className="mt-3 text-xs text-ink-2">
          The note is tailored to the last location looked up on the site. No spam, your address is never shared, and unsubscribing
          takes one click.
        </p>
      </div>
    </div>
  );
}
