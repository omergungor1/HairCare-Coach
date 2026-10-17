import { LegalLayout } from "@/components/common/LegalLayout";

export const metadata = {
  title: "Scientific Methodology — HairCare Coach",
  description: "How HairCare Coach grades hair routines, and what the product refuses to claim.",
};

export default function MethodologyPage() {
  return (
    <LegalLayout
      title="Scientific Methodology"
      lede="We grade routines by the strength of published evidence. We do not invent a result the studies do not support."
    >
      <h2>Three grades</h2>
      <p>
        Tier 1 covers treatments with high clinical evidence, such as finasteride and minoxidil. Tier 2
        covers emerging data, such as microneedling and low-level laser therapy. Tier 3 covers limited
        or anecdotal practices, such as scalp massage and rosemary oil. Each grade links to a PubMed
        search so you can read the primary literature yourself.
      </p>
      <h2>What we will not say</h2>
      <p>
        We do not claim the app cures baldness, regrows a full head of hair on a calendar, or replaces
        a physician. Consistency software can help you keep a schedule. It cannot change your genetics.
      </p>
      <h2>Why 180 days shows up everywhere</h2>
      <p>
        Follicular changes that a person can actually compare usually need months, not a long weekend.
        The page uses 180 days as the minimum window we ask people to plan for before they judge a
        routine a failure. That is a planning horizon, not a guarantee that change will appear.
      </p>
      <h2>Photos</h2>
      <p>
        The ghost overlay exists to reduce lighting and angle bias. It does not diagnose hair loss and
        it does not generate a future photo of your scalp.
      </p>
    </LegalLayout>
  );
}
