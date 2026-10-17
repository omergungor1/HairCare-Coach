"use client";

import { useWaitlist } from "@/components/providers/WaitlistProvider";

export function TopBanner() {
  const { openWaitlist } = useWaitlist();

  return (
    <div className="bg-banner-bg text-banner-text">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed sm:text-[15px]">
          <span className="mr-2 inline-flex rounded-full bg-white/10 px-2.5 py-1 font-display text-[11px] font-semibold tracking-[0.08em] text-banner-link">
            PRIVATE BETA ACCESS
          </span>
          First 500 members lock in 50% lifetime discount + receive the free 18-Page Evidence Handbook.
        </p>
        <button
          type="button"
          onClick={() => openWaitlist({ tier: "pro_early_bird", source: "banner" })}
          className="inline-flex min-h-12 shrink-0 items-center font-display text-sm font-semibold text-banner-link underline-offset-4 hover:underline"
        >
          Claim Your Spot →
        </button>
      </div>
    </div>
  );
}
