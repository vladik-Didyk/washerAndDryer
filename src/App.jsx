import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCall from "./components/FloatingCall";
import Breadcrumbs from "./components/Breadcrumbs";
import DraftRibbon from "./components/DraftRibbon";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import DistrictPage from "./pages/DistrictPage";
import AreasPage from "./pages/AreasPage";
import FaqPage from "./pages/FaqPage";
import LandlordsPage from "./pages/LandlordsPage";
import LandlordQuotePage from "./pages/LandlordQuotePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RepairPage from "./pages/RepairPage";
import AccountPage from "./pages/AccountPage";
import GuidesPage from "./pages/GuidesPage";
import GuidePage from "./pages/GuidePage";
import LegalPage from "./pages/LegalPage";
import MachinePage from "./pages/MachinePage";
import MachinesPage from "./pages/MachinesPage";
import LanguagePage from "./pages/LanguagePage";
import NotFoundPage from "./pages/NotFoundPage";
import { findRoute } from "./content/routes";

// No router: the page comes from the path (the prerender passes each route's URL; the browser
// passes location.pathname). Links between pages are plain <a href> with trailing slashes.
// Light theme only; the dark-mode hook files are kept but unused.
function Page({ route }) {
  switch (route.kind) {
    case "home":
      return <HomePage />;
    case "areas":
      return <AreasPage />;
    case "city":
      return <CityPage city={route.city} />;
    case "district":
      return <DistrictPage district={route.district} />;
    case "machines":
      return <MachinesPage />;
    case "machine":
      return <MachinePage machine={route.machine} />;
    case "landlords":
      return <LandlordsPage />;
    case "landlord-quote":
      return <LandlordQuotePage />;
    case "faq":
      return <FaqPage />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "repair":
      return <RepairPage />;
    case "account":
      return <AccountPage />;
    case "guides":
      return <GuidesPage />;
    case "guide":
      return <GuidePage guide={route.guide} />;
    case "privacy":
    case "terms":
      return <LegalPage page={route.page} />;
    case "language":
      return <LanguagePage content={route.content} />;
    default:
      return <NotFoundPage />;
  }
}

export default function App({ path }) {
  const route = findRoute(path);
  const skipLabel = route.kind === "language" ? route.content.skipLink : "Skip to content";

  return (
    <>
      <a href="#main" className="skip-link">
        {skipLabel}
      </a>
      {route.draft && <DraftRibbon />}
      <Header />
      <main id="main">
        {route.breadcrumbs && <Breadcrumbs items={route.breadcrumbs} />}
        <Page route={route} />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
