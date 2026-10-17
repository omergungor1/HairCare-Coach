const STEPS = [
  {
    title: "Log the routine you already follow",
    body: "Topical, oral, or mechanical. The app reminds you when you are actually in the bathroom, not halfway through a commute.",
  },
  {
    title: "Photograph the same angle every month",
    body: "A ghost outline of last month’s photo sits on the camera so distance, tilt, and framing stay comparable.",
  },
  {
    title: "Stay for the full 180 days",
    body: "Streaks, freeze shields, and honest evidence grades keep the plan intact when motivation dips.",
  },
];

export function SolutionOverview() {
  return (
    <section id="how-it-works" className="bg-forest-band text-forest-band-text">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[#6EE7B7]">
          Meet your recovery companion
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
          Engineered for Daily Discipline. Grounded in Evidence.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-forest-band-muted">
          HairCare Coach brings behavioral psychology, objective visual tracking, and radical
          transparency to your personal hair journey.
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <p className="font-display text-sm font-semibold tabular-nums text-[#6EE7B7]">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-band-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
