"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/common/Button";
import { track } from "@/lib/analytics";
import { ROUTINES, TIERS } from "@/lib/options";
import { WaitlistSubmissionSchema } from "@/lib/validations";

const fieldClass =
  "min-h-12 w-full rounded-md border border-surface-border bg-surface-card px-3 text-base text-content-primary outline-none focus-visible:ring-2 focus-visible:ring-brand-accent";

export function WaitlistForm({ idPrefix, initialTier = "pro_early_bird" }) {
  const [email, setEmail] = useState("");
  const [routineType, setRoutineType] = useState("");
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  function firstError(key) {
    const value = errors[key];
    return Array.isArray(value) ? value[0] : "";
  }

  async function onSubmit(event) {
    event.preventDefault();
    setFormError("");

    const parsed = WaitlistSubmissionSchema.safeParse({
      email,
      routineType,
      selectedTier,
    });

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("idle");
        setErrors(data.details?.fieldErrors || {});
        setFormError(data.error || "We could not save that spot.");
        return;
      }

      setResult(data);
      setStatus("success");
      track("waitlist_submit_success", {
        tier: parsed.data.selectedTier,
        routine: parsed.data.routineType,
        source: idPrefix,
      });
    } catch {
      setStatus("idle");
      setFormError("We could not reach the waitlist. Check your connection and try again.");
    }
  }

  if (status === "success" && result) {
    const shareText =
      "I joined the HairCare Coach early list. It is a habit companion for hair routines, with no miracle claims. https://haircarecoach.app";
    const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    return (
      <div className="rounded-lg border border-surface-border bg-brand-accent-soft p-5" role="status">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-ink">
          You are on the list
        </p>
        <p className="mt-3 font-display text-4xl font-bold tabular-nums tracking-[-0.03em] text-content-primary">
          #{result.waitlistPosition}
        </p>
        <p className="mt-3 text-base leading-relaxed text-content-secondary">
          {result.alreadyJoined
            ? "This email was already reserved. Your place on the priority invite list is unchanged."
            : "Welcome aboard. Your early access spot is reserved. Download the Evidence Handbook now. A beta invite goes out by email when TestFlight and Google Play beta open. No other mail."}
        </p>
        <a
          href={result.guideUrl}
          download
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-accent px-5 font-display font-semibold text-[#0F172A] shadow-accent"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Download the Evidence Handbook
        </a>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-surface-border bg-surface-card px-4 text-sm font-semibold text-content-primary"
          >
            Share on X
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-surface-border bg-surface-card px-4 text-sm font-semibold text-content-primary"
          >
            Share on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor={`${idPrefix}-email`} className="mb-1.5 block text-sm font-medium text-content-primary">
          Email address
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email address..."
          value={email}
          aria-invalid={Boolean(firstError("email"))}
          aria-describedby={firstError("email") ? `${idPrefix}-email-error` : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
          }}
          className={fieldClass}
        />
        {firstError("email") ? (
          <p id={`${idPrefix}-email-error`} className="mt-1.5 text-sm text-red-700">
            {firstError("email")}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-routine`} className="mb-1.5 block text-sm font-medium text-content-primary">
          What routine are you currently tracking?
        </label>
        <select
          id={`${idPrefix}-routine`}
          name="routineType"
          value={routineType}
          aria-invalid={Boolean(firstError("routineType"))}
          aria-describedby={firstError("routineType") ? `${idPrefix}-routine-error` : undefined}
          onChange={(event) => {
            setRoutineType(event.target.value);
            if (errors.routineType) setErrors((current) => ({ ...current, routineType: undefined }));
          }}
          className={fieldClass}
        >
          <option value="">Select a routine</option>
          {ROUTINES.map((routine) => (
            <option key={routine.value} value={routine.value}>
              {routine.label}
            </option>
          ))}
        </select>
        {firstError("routineType") ? (
          <p id={`${idPrefix}-routine-error`} className="mt-1.5 text-sm text-red-700">
            {firstError("routineType")}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-content-primary">Early access plan</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIERS.map((tier) => {
            const checked = selectedTier === tier.value;
            return (
              <label
                key={tier.value}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-3 py-2 ${checked ? "border-brand-accent bg-brand-accent-soft" : "border-surface-border bg-surface-card"}`}
              >
                <input
                  type="radio"
                  name={`${idPrefix}-tier`}
                  value={tier.value}
                  checked={checked}
                  onChange={() => setSelectedTier(tier.value)}
                  className="h-4 w-4 accent-[#10B981]"
                />
                <span>
                  <span className="block text-sm font-semibold text-content-primary">{tier.label}</span>
                  <span className="block text-sm tabular-nums text-content-secondary">{tier.price}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {formError ? (
        <p role="alert" className="text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-[#0F172A]/30 border-t-[#0F172A]"
              aria-hidden="true"
            />
            Reserving your spot
          </>
        ) : (
          "Claim Early Access & Free Guide"
        )}
      </Button>
    </form>
  );
}
