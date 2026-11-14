/**
 * The card an interactive diagram sits in on the foraging pages: "Interactive",
 * its heading and a line on how to use it, then the toy itself. /foraging
 * shows the foraging-year wheel (#year) and spot-the-danger (#danger); a
 * species with a look-alike pair shows spot-the-danger (#spot-the-danger).
 */
import type { ReactNode } from "react";

export function ToySection({ id, title, text, children }: { id: string; title: string; text: string; children: ReactNode }) {
  return (
    <section id={id} className="card scroll-mt-24 p-4 sm:p-6">
      <p className="eyebrow">Interactive</p>
      <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{text}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
