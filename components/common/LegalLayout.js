export function LegalLayout({ title, lede, children }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-sage">
        HairCare Coach
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-content-primary">
        {title}
      </h1>
      {lede ? <p className="mt-4 text-lg leading-relaxed text-content-secondary">{lede}</p> : null}
      <div className="mt-8 space-y-4 text-base leading-relaxed text-content-secondary [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-content-primary">
        {children}
      </div>
    </article>
  );
}
