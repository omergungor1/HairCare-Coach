"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";

const TOTAL = 240;
const ZONES = [
  "Zone 1: Temples",
  "Zone 2: Crown",
  "Zone 3: Vertex",
  "Zone 4: Neck Base",
];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function ScalpTimerPreview() {
  const [remaining, setRemaining] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const remainingRef = useRef(TOTAL);
  const timerRef = useRef(null);

  function stop() {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  function toggle() {
    if (timerRef.current) {
      stop();
      setRunning(false);
      return;
    }

    if (remainingRef.current === 0) {
      remainingRef.current = TOTAL;
      setRemaining(TOTAL);
    }

    setRunning(true);
    timerRef.current = setInterval(() => {
      const next = remainingRef.current <= 1 ? 0 : remainingRef.current - 1;
      remainingRef.current = next;
      setRemaining(next);
      if (next === 0) {
        stop();
        setRunning(false);
      }
    }, 1000);
  }

  const elapsed = TOTAL - remaining;
  const zoneIndex = Math.min(3, Math.floor(elapsed / 60));
  const progress = elapsed / TOTAL;
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const label = remaining === 0 ? "Start again" : running ? "Pause" : "Start";

  return (
    <section id="timer" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <div className="mx-auto flex max-w-sm flex-col items-center rounded-lg border border-surface-border bg-surface-card p-8 shadow-card">
          <div className={`relative ${running ? "animate-soft-pulse" : ""}`}>
            <svg viewBox="0 0 220 220" className="h-64 w-64" aria-hidden="true">
              <circle cx="110" cy="110" r={radius} fill="none" stroke="var(--surface-border)" strokeWidth="12" />
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#10B981"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${progress * circumference} ${circumference}`}
                transform="rotate(-90 110 110)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-5xl font-bold tabular-nums tracking-[-0.03em] text-content-primary" aria-live="polite">
                {formatTime(remaining)}
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-sage">{remaining === 0 ? "Session complete" : ZONES[zoneIndex]}</p>
            </div>
          </div>
          <Button className="mt-6 w-full" onClick={toggle} aria-pressed={running}>
            {label}
          </Button>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <SectionHeading
          kicker="Scalp timer preview"
          title="Four minutes. Four zones. No miracle claims."
          subtitle="This is the same 4-minute guide the app uses: temples, crown, vertex, then the neck base. It is a relaxing companion practice, not a cure for pattern hair loss."
        />
        <ol className="mt-6 space-y-3">
          {ZONES.map((zone, index) => (
            <li
              key={zone}
              className={`rounded-md border px-4 py-3 text-sm font-semibold ${index === zoneIndex && running ? "border-brand-accent bg-brand-accent-soft text-content-primary" : "border-surface-border text-content-secondary"}`}
            >
              <span className="mr-2 tabular-nums">{index + 1}.</span>
              {zone.replace(`Zone ${index + 1}: `, "")}
              <span className="ml-2 font-normal">· 60 seconds</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
