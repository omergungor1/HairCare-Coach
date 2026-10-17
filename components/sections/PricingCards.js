"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useWaitlist } from "@/components/providers/WaitlistProvider";
import { track } from "@/lib/analytics";

const PLANS = [
  {
    id: "free",
    name: "Pioneer Free",
    price: "$0",
    cadence: "Forever",
    featured: false,
    cta: "Start Free on Launch",
    points: [
      "Up to 3 daily treatment reminders",
      "Standard 4-minute guided scalp massage timer",
      "Basic streak counter and daily check-in",
      "Camera gallery stored on your phone",
      "Tier 1 evidence summaries",
    ],
  },
  {
    id: "pro_early_bird",
    name: "Early Supporter Pro",
    price: "$2.99",
    cadence: "per month · 50% off launch price",
    featured: true,
    cta: "Lock In 50% Lifetime Discount",
    note: "Regular price after launch: $4.99/mo or $29.99/yr",
    points: [
      "Unlimited daily and weekly routines",
      "Ghost-overlay camera with angle guidelines",
      "Side-by-side and split-slider exports",
      "2 streak freeze shields each month",
      "30, 60, and 90-day cohort challenges",
      "Full PubMed evidence library",
      "Founding member badge and priority requests",
    ],
  },
];

export function PricingCards() {
  const { openWaitlist } = useWaitlist();

  function choose(tier) {
    track("pricing_tier_select", { tier });
    openWaitlist({ tier, source: "pricing" });
  }

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <SectionHeading
        align="center"
        kicker="Simple, transparent value"
        title="Free to Start. Rewarding to Master."
        subtitle="No hidden medical consultations and no forced supplement bundles. Software that keeps you accountable."
      />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        {PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`flex flex-col rounded-lg border bg-surface-card p-6 shadow-card ${plan.featured ? "border-brand-accent ring-2 ring-brand-accent" : "border-surface-border"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-content-primary">{plan.name}</h3>
              {plan.featured ? (
                <span className="rounded-full bg-brand-accent px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F172A]">
                  Featured
                </span>
              ) : null}
            </div>
            <p className="mt-4 font-display text-5xl font-bold tabular-nums tracking-[-0.03em] text-content-primary">
              {plan.price}
            </p>
            <p className="text-sm text-content-secondary">{plan.cadence}</p>
            {plan.note ? <p className="mt-2 text-sm text-content-tertiary">{plan.note}</p> : null}
            <ul className="mt-6 flex-1 space-y-3">
              {plan.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-relaxed text-content-secondary">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-sage" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              variant={plan.featured ? "primary" : "secondary"}
              onClick={() => choose(plan.id)}
            >
              {plan.cta}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
