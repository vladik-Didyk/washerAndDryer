import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Machines from "./components/Machines";
import HowItWorks from "./components/HowItWorks";
import InstallVideos from "./components/InstallVideos";
import Prices from "./components/Prices";
import ServiceArea from "./components/ServiceArea";
import FAQ from "./components/FAQ";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import FloatingCall from "./components/FloatingCall";

// Light theme only. Testimonials stay off the page until there are real customer reviews
// (src/content/testimonials.js); the dark-mode hook files are kept but unused.
export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Welcome />
        <Machines />
        <HowItWorks />
        <InstallVideos />
        <Prices />
        <ServiceArea />
        <FAQ />
        <BookingForm />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
