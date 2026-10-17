"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Bell, BookOpen, Camera, Shield, Timer, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { track } from "@/lib/analytics";

const FEATURES = [
  {
    icon: Bell,
    badge: "Compliance Made Simple",
    title: "Never Miss an Application. Never Over-Apply.",
    name: "Smart Routine & Compliance Engine",
    body: "Set customized schedules for morning sprays, evening tablets, weekly microneedling, or gentle scalp care routines. Intelligent snooze alerts notify you when you are actually in your bathroom, not when you are commuting.",
    points: [
      "Distinct profiles for topical, oral, and mechanical routines.",
      "Flexible intervals, such as microneedling every 10 or 14 days.",
      "One-tap logging from the lock screen.",
    ],
  },
  {
    icon: Camera,
    badge: "Privacy-First Technology",
    title: "True Visual Progress, Free from Lighting Bias.",
    name: "Standardized Ghost-Overlay Photo Diary",
    body: "When you take the monthly progress photo, a semi-transparent outline of the previous photo sits on the live camera so the angle matches.",
    points: [
      "Alignment guides for hairline, temples, and vertex crown.",
      "Side-by-side and split-slider before/after comparisons.",
      "100% local device storage. Scalp photos are not uploaded to train public models.",
    ],
  },
  {
    icon: Timer,
    badge: "Wellness Companion",
    title: "Mindful Scalp Relaxation with Built-in Frequency Tracking.",
    name: "Guided Scalp Care Companion Timer",
    body: "A 4-minute acoustic timer for gentle, circular scalp massage. Soft chimes and haptic prompts move you across crown, temple, and vertex zones.",
    note: "Scalp massage supports local micro-circulation and stress reduction. It is never presented as a standalone cure for genetic pattern hair loss.",
  },
  {
    icon: Trophy,
    badge: "Behavioral Psychology",
    title: "Turn Tedious Repetition into a Winning Streak.",
    name: "Streak Gamification & Freeze Shields",
    body: "Experience points, consistency levels, and milestone badges reward every verified routine you complete.",
    points: [
      "Streak freeze shields protect a streak when you travel or feel unwell.",
      "30, 60, and 90-day challenges line up with biological milestones.",
    ],
  },
];

const TIERS = [
  {
    id: "tier-1",
    name: "Tier 1",
    title: "FDA-approved / high clinical evidence",
    body: "Examples include finasteride and minoxidil. These are treatments a person and their physician may choose. HairCare Coach only helps you remember the schedule you already set. It does not prescribe them.",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=finasteride+minoxidil+androgenetic+alopecia",
  },
  {
    id: "tier-2",
    name: "Tier 2",
    title: "Emerging clinical data",
    body: "Examples include microneedling and low-level laser therapy. Evidence is growing and still uneven. The app tracks the schedule. It does not promise a result.",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=microneedling+androgenetic+alopecia",
  },
  {
    id: "tier-3",
    name: "Tier 3",
    title: "Limited or anecdotal evidence",
    body: "Examples include scalp massage and rosemary oil. Treat these as wellness companions, not substitutes for therapies with stronger evidence.",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=scalp+massage+androgenetic+alopecia",
  },
];

export function FeaturesGrid() {
  const [active, setActive] = useState(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const tier = TIERS.find((item) => item.id === active);

  useEffect(() => {
    if (!active) return undefined;
    closeRef.current?.focus();
    function onKey(event) {
      if (event.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  function openTier(id) {
    setActive(id);
    track("evidence_modal_view", { tier: id });
  }

  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <SectionHeading
        kicker="Core features"
        title="Five tools for the long middle of a hair routine"
        subtitle="No serum of our own. No clinic upsell. Just the pieces that keep a regimen you already trust from falling apart."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.name} className="rounded-lg border border-surface-border bg-surface-card p-6 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-accent-soft text-brand-ink">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-surface-border px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-sage">
                  {feature.badge}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-content-primary">
                {feature.name}
              </h3>
              <p className="mt-1 font-display text-base font-semibold text-brand-ink">{feature.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">{feature.body}</p>
              {feature.points ? (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-content-secondary">
                  {feature.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {feature.note ? (
                <p className="mt-4 border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3 text-sm leading-relaxed text-content-primary">
                  {feature.note}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      <article id="evidence" className="mt-4 rounded-lg border border-surface-border bg-surface-card p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-accent-soft text-brand-ink">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-surface-border px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-sage">
            Zero snake oil
          </span>
        </div>
        <h3 className="mt-5 font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-content-primary">
          The Transparent Evidence Hub
        </h3>
        <p className="mt-1 font-display text-base font-semibold text-brand-ink">Know what the science actually says.</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-content-secondary">
          A bite-sized library that sorts hair therapies into three evidence grades and links out to
          PubMed searches. We do not sell a formula and we do not earn a commission on unverified pills.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {TIERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openTier(item.id)}
              className="min-h-12 flex-1 rounded-md border border-surface-border px-4 text-left font-display text-sm font-semibold text-content-primary hover:border-brand-accent"
            >
              <Shield aria-hidden="true" className="mb-1 h-4 w-4 text-brand-sage" />
              {item.name}
              <span className="mt-1 block font-body text-xs font-normal text-content-secondary">{item.title}</span>
            </button>
          ))}
        </div>
      </article>

      {tier ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-[#0B1311]/70"
            aria-label="Close evidence note"
            onClick={() => setActive(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-lg rounded-lg border border-surface-border bg-surface-card p-6 shadow-elevated"
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-sage">{tier.name}</p>
            <h3 id={titleId} className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-content-primary">
              {tier.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">{tier.body}</p>
            <a
              href={tier.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
            >
              Open the PubMed search
            </a>
            <div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                className="mt-4 inline-flex min-h-12 items-center rounded-md bg-brand-accent px-5 font-display font-semibold text-[#0F172A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
