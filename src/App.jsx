import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileActionBar from "./components/MobileActionBar";
import Breadcrumbs from "./components/Breadcrumbs";
import DraftRibbon from "./components/DraftRibbon";
import OfferBar from "./components/OfferBar";
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
import { siteConfig } from "./content/config";
import { findRoute, requestFormHref } from "./content/routes";

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

// Pages that carry the request form (#request); the others send "Start your rental" to it.
const FORM_PAGES = new Set(["home", "machines", "machine", "areas", "city", "district", "contact"]);
const requestHrefFor = (route) => (FORM_PAGES.has(route.kind) ? "#request" : requestFormHref);

// The phone bar's second button, after Call: what this page is for.
function mobileAction(route) {
  switch (route.kind) {
    case "language":
      return { label: route.content.text, href: siteConfig.phone.sms, icon: "sms" };
    case "landlords":
      return { label: "Get a quote", href: "/landlords/quote/" };
    case "landlord-quote":
      return { label: "Get a quote", href: "#landlord-quote" };
    case "repair":
      return { label: "Repair form", href: "#repair-request" };
    default:
      return { label: "Start rental", href: requestHrefFor(route) };
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
      <OfferBar />
      <Header currentPath={route.path} requestHref={requestHrefFor(route)} />
      <main id="main">
        {route.breadcrumbs && <Breadcrumbs items={route.breadcrumbs} />}
        <Page route={route} />
      </main>
      <Footer />
      {route.kind === "language" ? (
        <MobileActionBar
          action={mobileAction(route)}
          callLabel={route.content.call}
          label={route.content.barLabel}
          lang={route.content.lang}
        />
      ) : (
        <MobileActionBar action={mobileAction(route)} />
      )}
    </>
  );
}
