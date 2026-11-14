/**
 * The card an interactive diagram sits in on the fishing and wildlife pages:
 * "Interactive", the toy's title and a line on how to use it, then the toy.
 */
export function ToyPanel({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} className="card scroll-mt-24 p-4 sm:p-6">
      <p className="eyebrow">Interactive</p>
      <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{intro}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
