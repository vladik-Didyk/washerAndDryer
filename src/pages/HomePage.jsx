import Welcome from "../components/Welcome";
import TrustStrip from "../components/TrustStrip";
import Machines from "../components/Machines";
import HowItWorks from "../components/HowItWorks";
import InstallVideos from "../components/InstallVideos";
import Prices from "../components/Prices";
import LandlordsTeaser from "../components/LandlordsTeaser";
import About from "../components/About";
import ServiceArea from "../components/ServiceArea";
import FAQ from "../components/FAQ";
import CtaBand from "../components/CtaBand";
import BookingForm from "../components/BookingForm";

// Testimonials stay off the page until there are real customer reviews
// (src/content/testimonials.js).
export default function HomePage() {
  return (
    <>
      <Welcome />
      <TrustStrip />
      <Machines />
      <HowItWorks />
      <InstallVideos />
      <Prices />
      <LandlordsTeaser />
      <About />
      <ServiceArea />
      <FAQ />
      <CtaBand
        title="A washer and dryer for $12.50 a week"
        text="Repairs included. Delivery and installation quoted before you pay. Tell us your space, and we reply with the machine, the total and the start date."
      />
      <BookingForm />
    </>
  );
}
