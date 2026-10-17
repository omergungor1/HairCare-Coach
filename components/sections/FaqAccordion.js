"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const QUESTIONS = [
  {
    question: "Does HairCare Coach promise to regrow my hair?",
    answer:
      "No. Anyone promising guaranteed hair regrowth in an app is being dishonest. Hair regrowth depends on your genetics, the biological cause of hair loss, and the treatments you and your physician choose. What HairCare Coach is built to do is help you stay consistent with whichever routine you follow, track photographic changes without distortion, and avoid missed applications.",
  },
  {
    question: "Is scalp massage a scientifically proven cure for baldness?",
    answer:
      "No, it is not a standalone cure. Small pilot studies suggest scalp massage can temporarily increase localized blood flow and mechanical stretch in dermal papilla cells, but it cannot reverse advanced androgenetic alopecia on its own. In the app, scalp massage is a relaxing, stress-reducing wellness companion, not a substitute for proven therapies.",
  },
  {
    question: "Where are my sensitive progress photos stored?",
    answer:
      "Photos remain on your personal smartphone by default. We do not upload scalp photos to our servers or use them to train public AI models. Your privacy comes first.",
  },
  {
    question: "Can I use HairCare Coach if I have had a hair transplant?",
    answer:
      "Yes. Post-transplant care asks for strict washing schedules, scabbing protocols, and medication timing across the first 12 months. HairCare Coach can hold a customized milestone timeline so that investment is easier to protect. It does not replace your surgeon’s aftercare instructions.",
  },
  {
    question: "When will the app launch?",
    answer:
      "Early access is opening for the first 500 waitlist supporters. You will get an email invitation when beta builds are live on TestFlight for iOS and Google Play beta for Android.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="border-t border-surface-border bg-surface-subtle">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <SectionHeading
          kicker="Questions"
          title="Frequently asked, answered without the sales pitch"
        />
        <div className="mt-8 divide-y divide-surface-border rounded-lg border border-surface-border bg-surface-card">
          {QUESTIONS.map((item, index) => {
            const open = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-content-primary"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                  >
                    {item.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 transition ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="px-5 pb-5 text-sm leading-relaxed text-content-secondary">
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
