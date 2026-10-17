import { SectionHeading } from "@/components/common/SectionHeading";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

export function WaitlistCtaCard() {
  return (
    <section id="waitlist" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="grid items-start gap-8 rounded-xl border border-surface-border bg-surface-card p-6 shadow-elevated md:grid-cols-2 md:p-10">
        <SectionHeading
          kicker="Early access"
          title="Stop Starting Over Every 60 Days."
          subtitle="Join men who want a routine they can actually keep. Lock in early-bird pricing and download the Evidence Handbook on this page."
        />
        <WaitlistForm idPrefix="footer-form" initialTier="pro_early_bird" />
      </div>
    </section>
  );
}
