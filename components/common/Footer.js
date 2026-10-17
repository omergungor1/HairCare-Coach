import Link from "next/link";
import { VitalLoopLogo } from "@/components/common/VitalLoopLogo";

const LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/methodology", label: "Scientific Methodology" },
  { href: "/contact", label: "Contact Support" },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-card">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="HairCare Coach home">
            <VitalLoopLogo className="h-8 w-14" />
            <span className="font-display text-lg text-brand-ink">
              <span className="font-bold">HairCare</span>{" "}
              <span className="font-normal">Coach</span>
            </span>
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 sm:items-end">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-12 items-center text-sm text-content-secondary underline-offset-4 hover:text-content-primary hover:underline sm:min-h-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-sm text-content-tertiary">© 2026 HairCare Coach. All rights reserved.</p>

        <aside className="mt-6 rounded-lg border border-surface-border bg-surface-subtle p-5">
          <h2 className="font-display text-sm font-semibold tracking-[0.08em] text-content-primary uppercase">
            Important medical disclaimer
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            HairCare Coach is a digital habit tracking, routine reminder, and wellness documentation
            tool. It does not provide medical diagnoses, clinical treatment plans, or pharmaceutical
            prescriptions. The content provided in the Evidence Hub is for educational purposes only
            and must not replace professional advice from a qualified dermatologist or trichologist.
            Always consult your healthcare provider before starting or modifying any hair loss regimen.
          </p>
        </aside>
      </div>
    </footer>
  );
}
