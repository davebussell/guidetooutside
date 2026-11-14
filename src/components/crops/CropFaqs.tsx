/**
 * "Questions people ask about …" on a crop page: two columns of <details>,
 * the first three open. The FAQPage entity comes from faqLd (FaqList.tsx).
 */
import type { ReactNode } from "react";
import type { Faq } from "@/components/crops/FaqList";

export function CropFaqs({ title, faqs }: { title: ReactNode; faqs: Faq[] }) {
  return (
    <section aria-labelledby="questions" className="scroll-mt-24" id="questions-section">
      <h2 id="questions" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:items-start">
        {faqs.map((f, i) => (
          <details key={f.q} open={i < 3} className="group card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-snug text-ink">{f.q}</h3>
              <span aria-hidden="true" className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper-2 text-ink-2 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
