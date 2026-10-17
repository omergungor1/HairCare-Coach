import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { GhostCameraDemo } from "@/components/sections/GhostCameraDemo";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingCards } from "@/components/sections/PricingCards";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ScalpTimerPreview } from "@/components/sections/ScalpTimerPreview";
import { SolutionOverview } from "@/components/sections/SolutionOverview";
import { TrustStatsBar } from "@/components/sections/TrustStatsBar";
import { WaitlistCtaCard } from "@/components/sections/WaitlistCtaCard";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStatsBar />
      <ProblemSection />
      <SolutionOverview />
      <FeaturesGrid />
      <GhostCameraDemo />
      <ScalpTimerPreview />
      <ComparisonTable />
      <PricingCards />
      <FaqAccordion />
      <WaitlistCtaCard />
    </>
  );
}
