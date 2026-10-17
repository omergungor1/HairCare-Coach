"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { track } from "@/lib/analytics";

function HairlineScene({ variant }) {
  const hair = variant === "after"
    ? "M78 168 C92 58 228 58 242 168 C226 118 94 118 78 168 Z"
    : "M96 132 C112 62 214 62 228 128 C214 104 108 108 96 132 Z";

  return (
    <svg viewBox="0 0 320 420" className="h-full w-full" role="img" aria-label={variant === "after" ? "Month 4 hairline illustration" : "Month 1 hairline illustration"}>
      <defs>
        <linearGradient id={`booth-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7EEEA" />
          <stop offset="100%" stopColor="#D5DDD8" />
        </linearGradient>
      </defs>
      <rect width="320" height="420" fill={`url(#booth-${variant})`} />
      <path d="M70 420 V300 C70 250 110 230 160 230 C210 230 250 250 250 300 V420 Z" fill="#CDB7A4" />
      <ellipse cx="160" cy="176" rx="78" ry="96" fill="#E4C8B0" />
      <ellipse cx="92" cy="186" rx="12" ry="18" fill="#D7B394" />
      <path d={hair} fill="#241C18" />
      <path d="M160 40 V250 M70 176 H250" stroke="#0F3A2E" strokeOpacity="0.35" strokeDasharray="4 6" />
      <circle cx="160" cy="150" r="4" fill="#10B981" />
    </svg>
  );
}

function CrownScene({ variant }) {
  const patch = variant === "after" ? 28 : 46;
  return (
    <svg viewBox="0 0 320 420" className="h-full w-full" role="img" aria-label={variant === "after" ? "Month 4 crown illustration" : "Month 1 crown illustration"}>
      <rect width="320" height="420" fill="#E7EEEA" />
      <ellipse cx="160" cy="200" rx="108" ry="128" fill="#E4C8B0" />
      <ellipse cx="160" cy="188" rx="90" ry="108" fill="#3A2E28" />
      <circle cx="160" cy="176" r={patch} fill="#E4C8B0" fillOpacity="0.92" />
      <path d="M160 70 V300 M70 190 H250" stroke="#F8FAFC" strokeOpacity="0.55" strokeDasharray="4 6" />
      <circle cx="160" cy="176" r="5" fill="#10B981" />
      <path d="M160 300 L148 332 H172 Z" fill="#E4C8B0" />
    </svg>
  );
}

export function GhostCameraDemo() {
  const frameRef = useRef(null);
  const used = useRef(false);
  const [position, setPosition] = useState(58);
  const [view, setView] = useState("hairline");

  function updateFromClientX(clientX) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = Math.round((Math.min(Math.max(clientX - rect.left, 0), rect.width) / rect.width) * 100);
    setPosition(next);
    if (!used.current) {
      used.current = true;
      track("demo_ghost_slider_used", { view });
    }
  }

  function onKeyDown(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 4 : -4;
    setPosition((current) => Math.min(100, Math.max(0, current + delta)));
    if (!used.current) {
      used.current = true;
      track("demo_ghost_slider_used", { view });
    }
  }

  const Scene = view === "hairline" ? HairlineScene : CrownScene;

  return (
    <section id="ghost-demo" className="border-y border-surface-border bg-surface-subtle">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Ghost overlay preview"
            title="Align month 1 and month 4 without guessing the angle"
            subtitle="Drag the handle. The outline is the previous photo, kept on the same crosshair. This is an illustration, not a patient result, and the app does not invent hair."
          />
          <div className="mt-6 inline-flex rounded-md border border-surface-border bg-surface-card p-1" role="group" aria-label="Alignment view">
            {[
              ["hairline", "Hairline Alignment"],
              ["crown", "Crown Vertex Alignment"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                onClick={() => {
                  setView(value);
                  used.current = false;
                }}
                className={`min-h-12 rounded-sm px-4 text-sm font-semibold ${view === value ? "bg-brand-accent text-[#0F172A]" : "text-content-secondary"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div
            ref={frameRef}
            className="relative mx-auto aspect-[4/5] max-w-sm touch-none overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              updateFromClientX(event.clientX);
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromClientX(event.clientX);
            }}
          >
            <Scene variant="before" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <Scene variant="after" />
            </div>
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white" />
            </div>
            <button
              type="button"
              role="slider"
              aria-label="Compare month 4 with month 1"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={position}
              onKeyDown={onKeyDown}
              className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[#0F3A2E] text-xs font-semibold text-white shadow-elevated"
              style={{ left: `${position}%` }}
            >
              ||
            </button>
            <span className="absolute left-3 top-3 rounded-full bg-[#0F3A2E] px-2.5 py-1 text-xs font-semibold text-white">
              Month 4
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#0F172A]">
              Month 1
            </span>
          </div>
          <p className="mt-3 text-center text-xs text-content-secondary">
            Drag, or focus the handle and use the arrow keys.
          </p>
        </div>
      </div>
    </section>
  );
}
