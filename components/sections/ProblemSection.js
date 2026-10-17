import { SectionHeading } from "@/components/common/SectionHeading";

const PROBLEMS = [
  {
    index: "01",
    title: "The Invisible Progress Valley",
    kicker: "The biological trap",
    body: "Hair grows at a modest ~1.25 cm per month. When you inspect the mirror twice a day, microscopic follicular stabilization is invisible to the human eye. You feel like zero progress is happening, lose motivation, and quit right before shedding transitions into regrowth.",
  },
  {
    index: "02",
    title: "The Bathroom Lighting Illusion",
    kicker: "The visual trap",
    body: "One evening under harsh bathroom LEDs your crown looks thinner; the next morning in soft window light it looks dense. Without standardized camera distance, head tilt, and lighting consistency, confirmation bias will either deceive you with false hope or trigger needless anxiety.",
  },
  {
    index: "03",
    title: "The Daily Protocol Friction",
    kicker: "The behavioral trap",
    body: "Morning topical solution, evening oral pill, a weekly microneedling session, plus a 4-minute scalp massage. Life gets busy. You skip Tuesday, forget Thursday, and suddenly two weeks of compounding treatment efficacy evaporate.",
  },
];

export function ProblemSection() {
  return (
    <section id="problems" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <SectionHeading
        kicker="The uncomfortable truth"
        title="The 3 Invisible Friction Points That Kill Your Hair Goals Before Month 4"
        subtitle="Whether you are following doctor-prescribed DHT blockers, topical formulas, or an organic scalp wellness routine, you face the exact same psychological traps."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {PROBLEMS.map((problem) => (
          <article
            key={problem.index}
            className="flex flex-col rounded-lg border border-surface-border bg-surface-card p-6 shadow-card"
          >
            <p className="font-display text-sm font-semibold tabular-nums tracking-[0.14em] text-brand-accent">
              {problem.index}
            </p>
            <h3 className="mt-4 font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-content-primary">
              {problem.title}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-sage">
              {problem.kicker}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-content-secondary">{problem.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
