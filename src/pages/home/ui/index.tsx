import { useI18n } from "~/shared/i18n";
import { AboutTeaser } from "~/widgets/about-teaser";
import { CtaBand } from "~/widgets/cta-band";
import { FaqSection } from "~/widgets/faq-section";
import { Hero } from "~/widgets/hero";
import { HowItWorks } from "~/widgets/how-it-works";
import { InstallVideos } from "~/widgets/install-videos";
import { LandlordsTeaser } from "~/widgets/landlords-teaser";
import { MachineShowcase } from "~/widgets/machine-showcase";
import { Prices } from "~/widgets/prices";
import { ServiceArea } from "~/widgets/service-area";
import { StartRental } from "~/widgets/start-rental";
import { TrustStrip } from "~/widgets/trust-strip";

// Testimonials stay off the page until there are real customer reviews.
export default function HomePage() {
  const { cta } = useI18n().d.home;
  return (
    <>
      <Hero />
      <TrustStrip />
      <MachineShowcase compact />
      <HowItWorks />
      <InstallVideos />
      <Prices />
      <LandlordsTeaser />
      <AboutTeaser />
      <ServiceArea />
      <FaqSection />
      <CtaBand title={cta.title} text={cta.text} />
      <StartRental />
    </>
  );
}
