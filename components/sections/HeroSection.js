"use client";

import { Lock, Shield } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useWaitlist } from "@/components/providers/WaitlistProvider";

const TASKS = [
  { done: true, label: "Morning Minoxidil Spray 1ml" },
  { done: false, label: "4-Min Scalp Massage Timer" },
  { done: false, label: "Monthly Ghost Photo Due in 3 Days" },
];

export function HeroSection() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="hero-dots border-b border-surface-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-3 py-1.5 font-display text-xs font-semibold text-brand-ink">
            <Shield aria-hidden="true" className="h-3.5 w-3.5" />
            Zero Miracle Claims. 100% Habit Science.
          </p>
          <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.12] tracking-[-0.03em] text-content-primary sm:text-5xl lg:text-[3.35rem]">
            Stop Quitting Your Hair Routine.
            <span className="mt-2 block text-brand-sage">
              Build the Daily Consistency That Actually Works.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-content-secondary">
            Minoxidil, Finasteride, microneedling, and scalp care take 3 to 6 months of relentless
            daily discipline to show real biological change. HairCare Coach turns grueling multi-step
            regimens into effortless streaks—complete with standardized ghost-overlay progress photos,
            smart dosage reminders, and zero false promises.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => openWaitlist({ tier: "pro_early_bird", source: "hero" })}
            >
              Join the Early Access Waitlist
            </Button>
            <Button href="/#features" variant="secondary">
              Explore the Science First ↓
            </Button>
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-content-secondary">
            <Lock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-sage" />
            <span>
              100% Free to join · Zero spam guarantee · Strictly local photo privacy ·{" "}
              <span className="tabular-nums font-semibold text-content-primary">412 / 500</span> spots claimed
            </span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[320px]">
          <div className="absolute -inset-8 -z-10 rounded-full bg-brand-accent/20 blur-3xl" aria-hidden="true" />
          <div className="rounded-[2.2rem] border border-[#1F3830] bg-[#0F3A2E] p-3 shadow-elevated">
            <div className="overflow-hidden rounded-[1.7rem] bg-[#F8FAFC] text-[#0F172A]">
              <div className="flex items-center justify-between px-5 pt-5">
                <div>
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2D6A4F]">
                    Today
                  </p>
                  <p className="font-display text-lg font-bold">Day 42 Streak</p>
                </div>
                <p className="font-display text-2xl" aria-hidden="true">
                  🔥
                </p>
              </div>

              <ul className="mt-4 space-y-2 px-4">
                {TASKS.map((task) => (
                  <li
                    key={task.label}
                    className="flex items-start gap-3 rounded-md border border-[#E2E8F0] bg-white px-3 py-3"
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${task.done ? "border-[#10B981] bg-[#10B981] text-[#0F172A]" : "border-[#CBD5E1] bg-white"}`}
                      aria-hidden="true"
                    >
                      {task.done ? "✓" : ""}
                    </span>
                    <span className="text-sm leading-snug">
                      <span className="sr-only">{task.done ? "Completed: " : "Open: "}</span>
                      {task.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between px-5 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#475569]">Consistency</p>
                  <p className="font-display text-3xl font-bold tabular-nums tracking-[-0.03em]">96%</p>
                </div>
                <svg viewBox="0 0 36 36" className="h-16 w-16" aria-hidden="true">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${0.96 * 87.96} 87.96`}
                    transform="rotate(-90 18 18)"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-content-tertiary">
            Example routine screen. Photos in the real app stay on your phone.
          </p>
        </div>
      </div>
    </section>
  );
}
