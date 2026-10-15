import { MapPin } from "lucide-react";
import { siteConfig } from "../content/config";
import { cities } from "../content/cities";
import { machineTypes } from "../content/machines";
import { cityPath } from "../content/routes";
import PageHero from "../components/PageHero";
import Machines from "../components/Machines";
import HowItWorks from "../components/HowItWorks";
import Prices from "../components/Prices";
import LinkList from "../components/LinkList";
import BookingForm from "../components/BookingForm";

export default function CityPage({ city }) {
  const { prices, phone } = siteConfig;
  const machine = machineTypes.find((type) => type.slug === city.machine);
  const otherCities = cities
    .filter((other) => other.slug !== city.slug)
    .map((other) => ({ href: cityPath(other), label: other.name }));

  return (
    <>
      <PageHero
        eyebrow={`${city.name} · ${siteConfig.companyName}`}
        title={`Washer & dryer rental in ${city.name}`}
        intro={city.intro}
        machine={machine}
        price={prices.set}
        priceLabel="a month for a washer + dryer set"
        otherPrice={`or $${prices.single} a month for one machine`}
      />

      <section
        id="local"
        aria-labelledby="local-title"
        className="section border-y border-line bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="local-title" className="h2">
              Laundry in {city.name} homes
            </h2>
            {city.homes.map((paragraph) => (
              <p key={paragraph} className="lead mt-4">
                {paragraph}
              </p>
            ))}
            <h3 className="mt-8 font-display text-lg font-bold text-ink">
              Areas of {city.name} we deliver to
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
              {city.neighbourhoods.map((name) => (
                <li key={name} className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-5 lg:self-start">
            <h3 className="font-display text-xl font-bold text-ink">
              Before you call, check
            </h3>
            <ul className="mt-5 space-y-3">
              {city.checklist.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-soft">
              Not sure? Text a photo to{" "}
              <a href={phone.sms} className="text-link whitespace-nowrap">
                {phone.display}
              </a>{" "}
              and we'll tell you what fits.
            </p>
          </div>
        </div>
      </section>

      <Machines />
      <Prices />
      <HowItWorks />

      <section aria-label="Other areas" className="section">
        <div className="container-page">
          <LinkList
            id="other-areas-title"
            title="Other areas we serve"
            links={otherCities}
          />
          <p className="mt-4 text-ink-soft">Farther away? Ask us.</p>
        </div>
      </section>

      <BookingForm />
    </>
  );
}
