"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { track } from "@/lib/analytics";

const VIEWS = [
  {
    id: "hairline",
    label: "Front angle",
    before: "/hair_before.png",
    after: "/hair_after.png",
    beforeAlt: "Sample month 1 photo from the front",
    afterAlt: "Sample month 4 photo from the front",
  },
  {
    id: "crown",
    label: "Top angle",
    before: "/hait-top-before.png",
    after: "/hait-top-after.png",
    beforeAlt: "Sample month 1 photo from above",
    afterAlt: "Sample month 4 photo from above",
  },
];

export function GhostCameraDemo() {
  const frameRef = useRef(null);
  const used = useRef(false);
  const [position, setPosition] = useState(58);
  const [view, setView] = useState("hairline");
  const scene = VIEWS.find((item) => item.id === view) ?? VIEWS[0];

  function markUsed() {
    if (used.current) return;
    used.current = true;
    track("demo_ghost_slider_used", { view });
  }

  function updateFromClientX(clientX) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = Math.round((Math.min(Math.max(clientX - rect.left, 0), rect.width) / rect.width) * 100);
    setPosition(next);
    markUsed();
  }

  function onKeyDown(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 4 : -4;
    setPosition((current) => Math.min(100, Math.max(0, current + delta)));
    markUsed();
  }

  function selectView(nextView) {
    setView(nextView);
    setPosition(58);
    used.current = false;
  }

  return (
    <section id="ghost-demo" className="border-y border-surface-border bg-surface-subtle">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Ghost overlay preview"
            title="Align month 1 and month 4 without guessing the angle"
            subtitle="Drag the handle. Month 4 stays on the left and month 1 on the right, locked to the same frame. Switch between the front and the top of the head. These are sample photos for the alignment demo, not a patient result, and the app does not invent hair."
          />
          <fieldset className="mt-6">
            <legend className="sr-only">Photo angle</legend>
            <div className="inline-flex rounded-md border border-surface-border bg-surface-card p-1">
              {VIEWS.map((item) => (
                <label
                  key={item.id}
                  className={`inline-flex min-h-12 cursor-pointer items-center rounded-sm px-4 text-sm font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-accent ${view === item.id ? "bg-brand-accent text-[#0F172A]" : "text-content-secondary"}`}
                >
                  <input
                    type="radio"
                    name="ghost-angle"
                    value={item.id}
                    checked={view === item.id}
                    onChange={() => selectView(item.id)}
                    className="sr-only"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
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
            <Image
              key={`${scene.id}-before`}
              src={scene.before}
              alt={scene.beforeAlt}
              fill
              sizes="(min-width: 1024px) 384px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <Image
                key={`${scene.id}-after`}
                src={scene.after}
                alt={scene.afterAlt}
                fill
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover"
              />
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
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#0F3A2E] px-2.5 py-1 text-xs font-semibold text-white">
              Month 4
            </span>
            <span className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#0F172A]">
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
