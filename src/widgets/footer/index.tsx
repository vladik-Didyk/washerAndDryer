import { cityPath, districtPath, getCities, getDistricts } from "~/entities/area";
import { getMachineTypes, machinePath } from "~/entities/machine";
import { pagePaths, siteConfig } from "~/shared/config";
import { LANGUAGES, useI18n, type Dictionary } from "~/shared/i18n";
import { useSite, type Site } from "~/shared/lib";
import { Clock, Container, Facebook, Heading, LangLink, Logo, MapPin, MessageSquare, Nest, Phone } from "~/shared/ui";

const footerLink =
  "text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white";
const groupTitle = "font-display text-sm font-semibold text-gold";

interface FooterLink {
  href: string;
  label: string;
  lang?: string;
}

// Company links; drafts and the account page appear only when this deployment has them.
function companyLinks(site: Site, footer: Dictionary["footer"]): FooterLink[] {
  return [
    { href: pagePaths.about, label: footer.about },
    { href: pagePaths.contact, label: footer.contact },
    { href: pagePaths.landlords, label: footer.landlords },
    { href: pagePaths.buildings, label: footer.buildings },
    { href: pagePaths.repair, label: footer.repair },
    { href: pagePaths.guides, label: footer.guides },
    { href: pagePaths.account, label: footer.account },
    { href: "/privacy/", label: footer.privacy },
    { href: "/terms/", label: footer.terms },
  ].filter((link) => site.has(link.href));
}

function LinkGroup({
  id,
  title,
  links,
  className = "",
}: {
  id: string;
  title: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <nav aria-labelledby={id} className={className}>
      <Heading id={id} variant="none" className={groupTitle}>
        {title}
      </Heading>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.lang ? (
              // A language's home page: its own address, not this page's language.
              <a href={link.href} lang={link.lang} hrefLang={link.lang} className={footerLink}>
                {link.label}
              </a>
            ) : (
              <LangLink href={link.href} className={footerLink}>
                {link.label}
              </LangLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const site = useSite();
  const { d, format } = useI18n();
  const { phone, facebook, companyName } = siteConfig;
  const { footer, common } = d;
  const [toronto, ...otherCities] = getCities(d);

  return (
    <footer className="on-dark bg-brand-dark text-white/85">
      {/* The footer's group titles are one level below the page's h1. */}
      <Nest>
        <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="col-span-2 lg:col-span-4">
            <LangLink href={pagePaths.home} className="inline-flex items-center gap-3 rounded-xl">
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
            </LangLink>
            <p className="mt-5">{common.tagline}</p>
            <p className="mt-2 flex items-center gap-2 text-white/70">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {common.location}
            </p>

            <p className="mt-6 font-display text-xl font-bold text-white">{phone.display}</p>
            <ul className="mt-2 flex gap-5">
              <li>
                <a
                  href={phone.tel}
                  className="inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {common.call}
                </a>
              </li>
              <li>
                <a
                  href={phone.sms}
                  className="inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  {common.text}
                </a>
              </li>
            </ul>
            <ul className="mt-4 space-y-1">
              {common.hoursList.map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-white/70">{format(footer.weSpeak, { languages: common.languages })}</p>

            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              {footer.facebook}
              <span className="sr-only">{common.opensInNewTab}</span>
            </a>
          </div>

          <LinkGroup
            id="footer-machines"
            title={footer.machines}
            className="col-span-2 sm:col-span-1 lg:col-span-3"
            links={[
              { href: pagePaths.machines, label: footer.allMachineTypes },
              ...getMachineTypes(d).map((machine) => ({ href: machinePath(machine), label: machine.title })),
            ]}
          />

          <nav aria-labelledby="footer-areas" className="lg:col-span-2">
            <Heading id="footer-areas" variant="none" className={groupTitle}>
              {footer.areas}
            </Heading>
            <ul className="mt-3 space-y-2">
              <li>
                <LangLink href={cityPath(toronto)} className={footerLink}>
                  {toronto.name}
                </LangLink>
                <ul aria-label={footer.torontoDistricts} className="mt-2 space-y-2 border-l border-white/20 pl-3">
                  {getDistricts(d).map((district) => (
                    <li key={district.slug}>
                      <LangLink href={districtPath(district)} className={footerLink}>
                        {district.name}
                      </LangLink>
                    </li>
                  ))}
                </ul>
              </li>
              {otherCities.map((city) => (
                <li key={city.slug}>
                  <LangLink href={cityPath(city)} className={footerLink}>
                    {city.name}
                  </LangLink>
                </li>
              ))}
              <li>
                <LangLink href={pagePaths.areas} className={footerLink}>
                  {common.allAreas}
                </LangLink>
              </li>
            </ul>
            <p className="mt-3 text-white/70">{common.fartherAwayAsk}</p>
          </nav>

          <div className="space-y-10 lg:col-span-3">
            <LinkGroup id="footer-company" title={footer.company} links={companyLinks(site, footer)} />
            <LinkGroup
              id="footer-languages"
              title={footer.languages}
              links={LANGUAGES.map((language) => ({ href: language.path, label: language.name, lang: language.code }))}
            />
          </div>
        </Container>
      </Nest>

      {/* On phones the bottom padding leaves room for the fixed Call bar (widgets/mobile-action-bar),
          so it never covers the end of the page. */}
      <div className="border-t border-white/15 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        {/* The year comes from the server (Toronto time), so the hydrated page always agrees. */}
        <Container as="p" className="py-6 text-sm text-white/70">
          {format(footer.copyright, { year: String(site.year) })}
        </Container>
      </div>
    </footer>
  );
}
