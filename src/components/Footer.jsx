import { Clock, Facebook, MapPin, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { districts } from "../content/districts";
import { machineTypes } from "../content/machines";
import { cityPath, districtPath, hasRoute, machinePath } from "../content/routes";
import Logo from "./Logo";

const footerLink =
  "text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white";
const groupTitle = "font-display text-sm font-semibold text-gold";

// Company links; drafts and the account page appear only when they are part of the build.
function companyLinks() {
  return [
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
    { href: "/landlords/", label: "Landlords" },
    { href: "/repair/", label: "Request a repair" },
    { href: "/guides/", label: "Guides" },
    { href: "/account/", label: "Pay / manage" },
    { href: "/privacy/", label: "Privacy" },
    { href: "/terms/", label: "Rental terms" },
  ].filter((link) => hasRoute(link.href));
}

function LinkGroup({ id, title, links, className = "" }) {
  return (
    <nav aria-labelledby={id} className={className}>
      <h2 id={id} className={groupTitle}>
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} lang={link.lang} hrefLang={link.lang} className={footerLink}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, hours, facebook, companyName, tagline, location, languages, languageLinks } =
    siteConfig;
  const [toronto, ...otherCities] = cities;

  return (
    <footer lang="en" className="on-dark bg-brand-dark text-white/85">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="col-span-2 lg:col-span-4">
          <a href="/" className="inline-flex items-center gap-3 rounded-xl">
            {/* White tile keeps the green logo visible on the dark footer. */}
            <span className="rounded-xl bg-white p-1">
              <Logo className="h-11 w-11" />
            </span>
            <span
              aria-hidden="true"
              className="font-display text-lg font-bold leading-tight text-white"
            >
              {companyName}
            </span>
          </a>
          <p className="mt-5">{tagline}</p>
          <p className="mt-2 flex items-center gap-2 text-white/70">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {location}
          </p>

          <p className="mt-6 font-display text-xl font-bold text-white">{phone.display}</p>
          <ul className="mt-2 flex gap-5">
            <li>
              <a
                href={phone.tel}
                className="inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </li>
            <li>
              <a
                href={phone.sms}
                className="inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Text
              </a>
            </li>
          </ul>
          <ul className="mt-4 space-y-1">
            {hours.map((entry) => (
              <li key={entry.days} className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                {entry.days}: {entry.time.toLowerCase()}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-white/70">We speak {languages}.</p>

          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            <Facebook className="h-4 w-4" aria-hidden="true" />
            Facebook page
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <LinkGroup
          id="footer-machines"
          title="Machines"
          className="col-span-2 sm:col-span-1 lg:col-span-3"
          links={[
            { href: "/machines/", label: "All machine types" },
            ...machineTypes.map((machine) => ({ href: machinePath(machine), label: machine.title })),
          ]}
        />

        <nav aria-labelledby="footer-areas" className="lg:col-span-2">
          <h2 id="footer-areas" className={groupTitle}>
            Areas
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={cityPath(toronto)} className={footerLink}>
                {toronto.name}
              </a>
              <ul aria-label="Toronto districts" className="mt-2 space-y-2 border-l border-white/20 pl-3">
                {districts.map((district) => (
                  <li key={district.slug}>
                    <a href={districtPath(district)} className={footerLink}>
                      {district.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {otherCities.map((city) => (
              <li key={city.slug}>
                <a href={cityPath(city)} className={footerLink}>
                  {city.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/areas/" className={footerLink}>
                All areas
              </a>
            </li>
          </ul>
          <p className="mt-3 text-white/70">Farther away? Ask us.</p>
        </nav>

        <div className="space-y-10 lg:col-span-3">
          <LinkGroup id="footer-company" title="Company" links={companyLinks()} />
          <LinkGroup
            id="footer-languages"
            title="Languages"
            links={[
              { href: "/", label: "English", lang: "en" },
              ...languageLinks.map((link) => ({ href: link.href, label: link.label, lang: link.lang })),
            ]}
          />
        </div>
      </div>

      {/* On phones the bottom padding leaves room for the fixed Call bar (MobileActionBar.jsx),
          so it never covers the end of the page. */}
      <div className="border-t border-white/15 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        {/* The year comes from the build; the browser may disagree for a moment at New Year. */}
        <p suppressHydrationWarning className="container-page py-6 text-sm text-white/70">
          © {year} {companyName}
        </p>
      </div>
    </footer>
  );
}
