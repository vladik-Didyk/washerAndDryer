import { cities, cityPath } from "~/entities/area";
import { siteConfig } from "~/shared/config";
import {
  Building2,
  CircleHelp,
  Clock,
  Languages,
  MapPin,
  MessageSquare,
  Phone,
  Wrench,
  type LucideIcon,
} from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import { StartRental } from "~/widgets/start-rental";

const OTHER_REQUESTS: Array<{ icon: LucideIcon; title: string; href: string; label: string }> = [
  {
    icon: Wrench,
    title: "A machine you rent needs a repair",
    href: "/repair/",
    label: "Request a repair",
  },
  {
    icon: Building2,
    title: "You're a landlord",
    href: "/landlords/quote/",
    label: "Landlord quote",
  },
  {
    icon: CircleHelp,
    title: "You have a question first",
    href: "/faq/",
    label: "Questions and answers",
  },
];

// /contact/: phone, hours, languages, service area, and the way into the rental request.
export default function ContactPage() {
  const { phone, hours, languages } = siteConfig;

  return (
    <>
      <PageIntro icon={Phone} eyebrow="Call or text" title="Contact us">
        <p className="lead mt-5">
          The fastest way is a call or a text. Or send the request form below and we
          reply with the machine, the total and the start date.
        </p>
      </PageIntro>

      <section aria-label="How to reach us" className="border-y border-line bg-white py-14 sm:py-16">
        <div className="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-sm font-semibold text-ink-muted">Phone and text</h2>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-brand">
              {phone.display}
            </p>
            <div className="mt-5 grid max-w-sm grid-cols-2 gap-3">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text
              </a>
            </div>
            <dl className="mt-8 space-y-4 text-ink-soft">
              <div className="flex gap-3">
                <dt>
                  <Clock className="mt-0.5 h-5 w-5 text-brand" aria-hidden="true" />
                  <span className="sr-only">Hours</span>
                </dt>
                <dd>
                  {hours.map((entry) => (
                    <span key={entry.days} className="block">
                      {entry.days}: {entry.time.toLowerCase()}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt>
                  <Languages className="mt-0.5 h-5 w-5 text-brand" aria-hidden="true" />
                  <span className="sr-only">Languages</span>
                </dt>
                <dd>We speak {languages}.</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold text-ink-muted">Where we deliver</h2>
            <ul className="mt-3 space-y-2">
              {cities.map((city) => (
                <li key={city.slug} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <a href={cityPath(city)} className="text-link">
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-ink-soft">
              Farther away? Ask us.{" "}
              <a href="/areas/" className="text-link">
                All areas
              </a>
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <h2 className="font-display text-sm font-semibold text-ink-muted">Something else?</h2>
            <ul className="mt-3 space-y-3">
              {OTHER_REQUESTS.map((item) => (
                <li key={item.href} className="relative flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-brand">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="text-ink-soft">{item.title}</p>
                    <a
                      href={item.href}
                      className="font-semibold text-brand underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl"
                    >
                      {item.label}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StartRental />
    </>
  );
}
