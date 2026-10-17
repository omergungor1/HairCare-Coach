import { LegalLayout } from "@/components/common/LegalLayout";

export const metadata = {
  title: "Contact — HairCare Coach",
  description: "Contact HairCare Coach about the early access list.",
};

export default function ContactPage() {
  return (
    <LegalLayout
      title="Contact support"
      lede="Questions about the waitlist, the handbook, or a deletion request go to one address."
    >
      <p>
        Email{" "}
        <a className="font-semibold text-brand-ink underline-offset-4 hover:underline" href="mailto:support@haircarecoach.app">
          support@haircarecoach.app
        </a>
        . Include the address you used on the form if you want a spot removed.
      </p>
      <p>We do not offer diagnosis or treatment advice over email.</p>
    </LegalLayout>
  );
}
