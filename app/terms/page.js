import { LegalLayout } from "@/components/common/LegalLayout";

export const metadata = {
  title: "Terms of Service — HairCare Coach",
  description: "Terms for the HairCare Coach validation website and early access list.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lede="By joining the waitlist you are asking for a beta invitation, not buying a medical service."
    >
      <h2>What you are signing up for</h2>
      <p>
        HairCare Coach is a habit, reminder, and documentation tool for routines you already follow. The
        early access list reserves a place in line and unlocks the downloadable handbook. It is not a
        clinic visit, a prescription, or a promise that hair will regrow.
      </p>
      <h2>Pricing shown on this page</h2>
      <p>
        Pioneer Free is described as $0. Early Supporter Pro is described as $2.99 per month, which is
        half of the planned $4.99 monthly launch price, or $29.99 per year. Nothing is charged on this
        website. A paid plan begins only if you later subscribe inside the app.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Do not submit someone else’s email address. Do not use the site to collect health data from
        other people.
      </p>
      <h2>Handbook</h2>
      <p>
        The Evidence Handbook is educational. It is not personalized medical advice. Talk with a
        qualified dermatologist or trichologist before you start or change a regimen.
      </p>
    </LegalLayout>
  );
}
