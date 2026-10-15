import { howWeWork, siteConfig } from "~/shared/config";
import { LinkList, MapPin, MessageSquare, Phone } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";

// /about/: who we are and how we work. Confirmed facts only: no names, photos of people or history.
export default function AboutPage() {
  const { phone, prices, companyName, hours } = siteConfig;

  const whatWeDo = [
    `We rent washers and dryers in Toronto and the GTA: stackable pairs, one-piece laundry centres, side-by-side pairs, or a single washer or dryer.`,
    "We only rent. We don't sell machines, and we don't rent other appliances.",
    "The machines are pre-owned, checked, and in good working order. The brand and model depend on what's available.",
    `Rent is $${prices.setText} a week for a set or $${prices.singleText} a week for one machine, with repairs and old-machine haul-away included.`,
  ];

  return (
    <>
      <PageIntro icon={MapPin} eyebrow="About us" title={`About ${companyName}`}>
        <p className="lead mt-5">
          {companyName} is a local Toronto business. We bring more than 3 years of
          hands-on experience installing and fixing washers and dryers.
        </p>
      </PageIntro>

      <section aria-labelledby="how-title" className="section border-y border-line bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 id="how-title" className="font-display text-2xl font-bold text-ink">
              How we work
            </h2>
            <ul className="mt-5 space-y-4">
              {howWeWork.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="h2">What we do</h2>
            {whatWeDo.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}
            <LinkList
              id="about-links-title"
              title="Read more"
              className="mt-10"
              links={[
                { href: "/machines/", label: "Machine types" },
                { href: "/#prices", label: "Prices" },
                { href: "/areas/", label: "Where we deliver" },
                { href: "/landlords/", label: "For landlords" },
                { href: "/faq/", label: "FAQ" },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-contact-title" className="section">
        <div className="container-page">
          <div className="grid gap-6 rounded-3xl bg-brand-mint px-5 py-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6">
              <h2 id="about-contact-title" className="h2">
                Talk to us
              </h2>
              <p className="lead mt-3">
                {phone.display}.{" "}
                {hours.map((entry) => `${entry.days} ${entry.time.toLowerCase()}`).join(". ")}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text
              </a>
              <a href="/contact/" className="btn btn-secondary">
                Contact page
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
