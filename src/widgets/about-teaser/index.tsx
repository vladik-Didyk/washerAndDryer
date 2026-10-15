import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Phone } from "~/shared/ui";

// About the business: confirmed facts only, no names or photos of people.
// The full version is the /about/ page.

export function AboutTeaser() {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const { about } = d.home;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="about-title" className="h2">
            {about.title}
          </h2>
          <p className="lead mt-4">{about.lead}</p>
          <p className="mt-4 text-ink-soft">
            {rich(about.questions, {
              phoneLink: (
                <a href={phone.tel} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          </p>
          <p className="mt-4">
            <a href="/about/" className="text-link">
              {about.more}
            </a>
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 lg:col-span-7">
          <h3 className="font-display text-xl font-bold text-ink">
            {about.howWeWork}
          </h3>
          <ul className="mt-5 space-y-4">
            {d.common.howWeWork.map((item) => (
              <li key={item} className="flex gap-3 text-ink-soft">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                />
                {item}
              </li>
            ))}
          </ul>
          <a href={phone.tel} className="btn btn-secondary mt-7">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            {d.common.callPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
