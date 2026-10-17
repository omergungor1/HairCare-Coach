"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { useWaitlist } from "@/components/providers/WaitlistProvider";

export function WaitlistModal() {
  const { open, tier, session, closeWaitlist } = useWaitlist();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeWaitlist();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeWaitlist, session]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#0B1311]/70"
        aria-label="Close early access dialog"
        onClick={closeWaitlist}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-surface-border bg-surface-card p-5 shadow-elevated sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-sage">
              Private beta
            </p>
            <h2 id="waitlist-title" className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-content-primary">
              Claim your early access spot
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              Tell us the routine you already follow. Early Supporter Pro is pre-selected at the
              lifetime launch price.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeWaitlist}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-content-primary"
            aria-label="Close"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <WaitlistForm key={`${session}-${tier}`} idPrefix={`modal-${session}`} initialTier={tier} />
      </div>
    </div>
  );
}
