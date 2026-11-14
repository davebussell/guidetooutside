/**
 * The "Common questions" block used on the gardening reference pages: a list
 * of <details>, the first one open, and the FAQPage entity that goes with it.
 */
import { SITE } from "@/lib/site";

export type Faq = { q: string; a: string };

export function faqLd(path: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}${path}#questions`,
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function FaqList({ faqs, className = "mt-5 grid gap-3" }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={className}>
      {faqs.map((f, i) => (
        <details key={f.q} className="card group p-4" open={i === 0}>
          <summary className="cursor-pointer list-none font-display text-lg font-semibold marker:content-none">{f.q}</summary>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
