import { cityPath, getCities } from "~/entities/area";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import {
  Building2,
  CircleHelp,
  Clock,
  Container,
  Heading,
  LangLink,
  Languages,
  MapPin,
  Phone,
  PhoneButton,
  Section,
  Wrench,
  type LucideIcon,
} from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import { StartRental } from "~/widgets/start-rental";

// The other ways in; their words are contact.other in the dictionary, in this order.
const OTHER_REQUESTS: Array<{ icon: LucideIcon; href: string }> = [
  { icon: Wrench, href: pagePaths.repair },
  { icon: Building2, href: pagePaths.landlordQuote },
  { icon: CircleHelp, href: pagePaths.faq },
];

// /contact/: phone, hours, languages, service area, and the way into the rental request.
export default function ContactPage() {
  const { phone } = siteConfig;
  const { d, format } = useI18n();
  const text = d.contact;

  return (
    <>
      <PageIntro icon={Phone} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <Section aria-label={text.reachLabel} padded={false} className="border-y border-line bg-white py-14 sm:py-16">
        <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Heading variant="label">{text.phoneTitle}</Heading>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-brand">
              {phone.display}
            </p>
            <div className="mt-5 grid max-w-sm grid-cols-2 gap-3">
              <PhoneButton kind="call" />
              <PhoneButton kind="text" />
            </div>
            <dl className="mt-8 space-y-4 text-ink-soft">
              <div className="flex gap-3">
                <dt>
                  <Clock className="mt-0.5 h-5 w-5 text-brand" aria-hidden="true" />
                  <span className="sr-only">{text.hours}</span>
                </dt>
                <dd>
                  {d.common.hoursList.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt>
                  <Languages className="mt-0.5 h-5 w-5 text-brand" aria-hidden="true" />
                  <span className="sr-only">{text.languages}</span>
                </dt>
                <dd>{format(text.weSpeak, { languages: d.common.languages })}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-3">
            <Heading variant="label">{text.whereTitle}</Heading>
            <ul className="mt-3 space-y-2">
              {getCities(d).map((city) => (
                <li key={city.slug} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <LangLink href={cityPath(city)} className="text-link">
                    {city.name}
                  </LangLink>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-ink-soft">
              {d.common.fartherAwayAsk}{" "}
              <LangLink href={pagePaths.areas} className="text-link">
                {d.common.allAreas}
              </LangLink>
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <Heading variant="label">{text.somethingElse}</Heading>
            <ul className="mt-3 space-y-3">
              {OTHER_REQUESTS.map((request, index) => ({ ...request, ...text.other[index] })).map((item) => (
                <li key={item.href} className="relative flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-brand">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="text-ink-soft">{item.title}</p>
                    <LangLink
                      href={item.href}
                      className="font-semibold text-brand underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl"
                    >
                      {item.label}
                    </LangLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <StartRental />
    </>
  );
}
