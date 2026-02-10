import { useEffect } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import BookingForm from "./components/BookingForm";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [visitCount, setVisitCount] = useLocalStorage("visitCount", 0);

  // Track visits
  useEffect(() => {
    setVisitCount((prev) => prev + 1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Welcome />
        <BookingForm />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
