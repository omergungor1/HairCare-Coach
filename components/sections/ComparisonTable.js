import { SectionHeading } from "@/components/common/SectionHeading";

const COLUMNS = [
  "Generic habit trackers",
  "Telehealth drug sellers",
  "AI scanner apps",
  "HairCare Coach",
];

const ROWS = [
  ["Hair-specific protocols", "No", "No", "Partial", "Yes"],
  ["Ghost-overlay camera", "No", "No", "Partial", "Yes"],
  ["Gamified streaks and shields", "Partial", "No", "No", "Yes"],
  ["Scalp care guided timer", "No", "No", "No", "Yes"],
  ["Vendor neutrality", "Yes", "No", "Partial", "Yes"],
  ["Sensitive photo privacy", "Partial", "Partial", "Partial", "Yes"],
];

const NOTES = [
  ["Generic checkboxes", "Only sell their own drugs", "Diagnostic only", "Tailored to every hair routine"],
  ["No camera", "No camera", "Clunky estimate", "Precise silhouette alignment"],
  ["Basic streak only", "No gamification", "No gamification", "XP and challenge system"],
  ["No timer", "No timer", "No timer", "Haptic 4-minute zone guide"],
  ["Neutral", "Push expensive subscriptions", "Upsell partner clinics", "Independent, nothing to sell"],
  ["Often cloud-synced", "Health database", "Cloud AI analysis", "Stored locally on device"],
];

function Tone({ value }) {
  const styles = {
    Yes: "text-brand-ink",
    No: "text-content-tertiary",
    Partial: "text-[#B45309]",
  };
  return <span className={`font-semibold ${styles[value]}`}>{value}</span>;
}

export function ComparisonTable() {
  return (
    <section id="comparison" className="border-y border-surface-border bg-surface-card">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <SectionHeading
          kicker="Comparison"
          title="How HairCare Coach compares"
          subtitle="Habit apps forget the protocol. Telehealth shops sell a drug. Scanner apps guess from a photo. This is a consistency companion with nothing in the cart."
        />

        <div className="mt-8 lg:hidden">
          <div className="space-y-4">
            {ROWS.map((row, rowIndex) => (
              <article key={row[0]} className="rounded-lg border border-surface-border p-4">
                <h3 className="font-display text-lg font-semibold text-content-primary">{row[0]}</h3>
                <ul className="mt-3 space-y-2">
                  {COLUMNS.map((column, columnIndex) => (
                    <li key={column} className="flex items-start justify-between gap-3 text-sm">
                      <span className={columnIndex === 3 ? "font-semibold text-content-primary" : "text-content-secondary"}>
                        {column}
                        <span className="mt-0.5 block text-xs font-normal text-content-tertiary">{NOTES[rowIndex][columnIndex]}</span>
                      </span>
                      <Tone value={row[columnIndex + 1]} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">
              HairCare Coach compared with generic habit trackers, telehealth sellers, and AI scanner apps
            </caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-surface-border px-3 py-3 font-display text-xs uppercase tracking-[0.12em] text-content-tertiary">
                  Criteria
                </th>
                {COLUMNS.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`border-b border-surface-border px-3 py-3 font-display text-sm font-semibold ${index === 3 ? "bg-brand-accent-soft text-brand-ink" : "text-content-primary"}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, rowIndex) => (
                <tr key={row[0]}>
                  <th scope="row" className="border-b border-surface-border px-3 py-4 font-semibold text-content-primary">
                    {row[0]}
                  </th>
                  {row.slice(1).map((cell, columnIndex) => (
                    <td
                      key={`${row[0]}-${COLUMNS[columnIndex]}`}
                      className={`border-b border-surface-border px-3 py-4 ${columnIndex === 3 ? "bg-brand-accent-soft/60" : ""}`}
                    >
                      <Tone value={cell} />
                      <span className="mt-1 block text-xs text-content-secondary">{NOTES[rowIndex][columnIndex]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
