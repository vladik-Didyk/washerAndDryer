import { Check } from "lucide-react";
import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { hookupChecklist, machineTypes } from "../content/machines";
import { cityPath, machinePath } from "../content/routes";
import PageHero from "../components/PageHero";
import Prices from "../components/Prices";
import HowItWorks from "../components/HowItWorks";
import LinkList from "../components/LinkList";
import BookingForm from "../components/BookingForm";

function Bullets({ items }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-soft">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
            <Check className="h-3.5 w-3.5 text-brand-dark" strokeWidth={3} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function MachinePage({ machine }) {
  const { prices, phone } = siteConfig;
  const { page } = machine;
  const isSet = machine.price === prices.set;
  const otherTypes = machineTypes
    .filter((other) => other.slug !== machine.slug)
    .map((other) => ({ href: machinePath(other), label: other.title }));
  const cityLinks = cities.map((city) => ({
    href: cityPath(city),
    label: city.name,
  }));

  return (
    <>
      <PageHero
        eyebrow="Toronto & the GTA"
        title={page.h1}
        intro={page.intro}
        machine={machine}
        price={machine.price}
        priceLabel={isSet ? "a month for the set" : "a month for one machine"}
        otherPrice={
          isSet
            ? `Need only one machine? $${prices.single} a month.`
            : `Need both? A washer + dryer set is $${prices.set} a month.`
        }
      />

      <section
        id="details"
        aria-labelledby="details-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="details-title" className="h2">
              What it is
            </h2>
            {page.whatItIs.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-12 font-display text-2xl font-bold text-ink">
              Who it fits
            </h2>
            <Bullets items={page.fits} />

            <h2 className="mt-12 font-display text-2xl font-bold text-ink">
              Size
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{page.size}</p>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-xl font-bold text-ink">
              What your space needs
            </h2>
            <Bullets items={hookupChecklist} />
            <p className="mt-6 text-ink-soft">
              Not sure what you have? Text a photo to{" "}
              <a href={phone.sms} className="text-link whitespace-nowrap">
                {phone.display}
              </a>{" "}
              and we'll check.
            </p>
          </div>
        </div>
      </section>

      <Prices />
      <HowItWorks />

      <section aria-label="More machine types and areas" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <LinkList id="other-types-title" title="Other machine types" links={otherTypes} />
          <LinkList id="areas-links-title" title="Where we deliver" links={cityLinks} />
        </div>
      </section>

      <BookingForm />
    </>
  );
}
