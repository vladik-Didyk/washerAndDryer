import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { LangLink, LinkList, MapPin, MessageSquare, Phone } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";

// /about/: who we are and how we work. Confirmed facts only: no names, photos of people or history.
export default function AboutPage() {
  const { phone } = siteConfig;
  const { d } = useI18n();
  const text = d.about;

  return (
    <>
      <PageIntro icon={MapPin} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <section aria-labelledby="how-title" className="section border-y border-line bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 id="how-title" className="font-display text-2xl font-bold text-ink">
              {text.howWeWork}
            </h2>
            <ul className="mt-5 space-y-4">
              {d.common.howWeWork.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="h2">{text.whatWeDo}</h2>
            {text.whatWeDoItems.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}
            <LinkList
              id="about-links-title"
              title={text.readMore}
              className="mt-10"
              links={[
                { href: "/machines/", label: text.links.machines },
                { href: "/#prices", label: text.links.prices },
                { href: "/areas/", label: text.links.areas },
                { href: "/landlords/", label: text.links.landlords },
                { href: "/faq/", label: text.links.faq },
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
                {text.talkTitle}
              </h2>
              <p className="lead mt-3">{text.talkText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.call}
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                {d.common.text}
              </a>
              <LangLink href="/contact/" className="btn btn-secondary">
                {text.contactPage}
              </LangLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
