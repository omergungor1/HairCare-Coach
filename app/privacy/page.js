import { LegalLayout } from "@/components/common/LegalLayout";

export const metadata = {
  title: "Privacy Policy — HairCare Coach",
  description: "What this validation site collects, and what the HairCare Coach app is designed to keep on your phone.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lede="This page describes the validation website. The mobile app, when it ships, is designed so progress photos stay on your device."
    >
      <h2>What this website collects</h2>
      <p>
        If you join the waitlist, we receive your email address, the routine category you select, and
        whether you are interested in the free plan or Early Supporter Pro. We use that to measure
        demand and to contact you about the beta. We do not ask for photos, medical records, or payment
        details on this page.
      </p>
      <h2>How long it is stored</h2>
      <p>
        On this validation build, submissions are held in temporary server memory for the life of the
        running process. They are not written to a long-term database yet. Restarting the server clears
        them. Do not treat this demo as a permanent archive of your address.
      </p>
      <h2>Photos</h2>
      <p>
        This website never uploads a scalp photo. The product described here keeps progress photos in
        local smartphone storage and does not use them to train public AI models.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        The page does not load third-party advertising scripts or set tracking cookies. Anonymous
        product events, such as opening the waitlist, stay in the browser as custom events and are not
        sent to an outside analytics vendor from this build.
      </p>
      <h2>Asking us to delete an email</h2>
      <p>
        Write to support@haircarecoach.app from the same address you submitted. Tell us you want it
        removed from the early access list.
      </p>
    </LegalLayout>
  );
}
