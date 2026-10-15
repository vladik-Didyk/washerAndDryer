import Welcome from "../components/Welcome";
import Machines from "../components/Machines";
import HowItWorks from "../components/HowItWorks";
import InstallVideos from "../components/InstallVideos";
import Prices from "../components/Prices";
import About from "../components/About";
import ServiceArea from "../components/ServiceArea";
import FAQ from "../components/FAQ";
import BookingForm from "../components/BookingForm";

// Testimonials stay off the page until there are real customer reviews
// (src/content/testimonials.js).
export default function HomePage() {
  return (
    <>
      <Welcome />
      <Machines />
      <HowItWorks />
      <InstallVideos />
      <Prices />
      <About />
      <ServiceArea />
      <FAQ />
      <BookingForm />
    </>
  );
}
