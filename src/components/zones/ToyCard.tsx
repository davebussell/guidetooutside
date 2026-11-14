/** An interactive diagram in its card: eyebrow ("Interactive", "Tool"), title, one-line blurb, then the toy. */
import type { ReactNode } from "react";

export function ToyCard({ id, eyebrow = "Interactive", title, blurb, children }: { id: string; eyebrow?: string; title: string; blurb: string; children: ReactNode }) {
  return (
    <section id={id} className="card scroll-mt-24 p-4 sm:p-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{blurb}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
