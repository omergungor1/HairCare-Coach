const STATS = [
  {
    value: "180 Days",
    label:
      "Minimum biological cycle required to observe clinically meaningful changes in follicular density.",
  },
  {
    value: "68% of Men",
    label:
      "Prematurely abandon oral or topical regimens within the first 90 days due to lack of immediate feedback.",
  },
  {
    value: "0% Miracle Claims",
    label:
      "Every method in the app is graded by peer-reviewed dermatological studies (PubMed indexed).",
  },
];

export function TrustStatsBar() {
  return (
    <section aria-label="Scientific honesty metrics" className="border-b border-surface-border bg-surface-card">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        {STATS.map((stat, index) => (
          <article
            key={stat.value}
            className={`px-5 py-8 ${index > 0 ? "border-t border-surface-border md:border-t-0 md:border-l" : ""}`}
          >
            <p className="font-display text-3xl font-bold tabular-nums tracking-[-0.03em] text-brand-ink">
              {stat.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
