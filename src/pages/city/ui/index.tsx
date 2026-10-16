import { useLoaderData } from "react-router";
import { AreaMap, cityPath, districtPath, findCity, getCities, getDistricts } from "~/entities/area";
import { usePrices } from "~/entities/offer";
import { useI18n } from "~/shared/i18n";
import { pagePaths } from "~/shared/config";
import { Container, LinkList, Section, WasPrice } from "~/shared/ui";
import { CtaBand } from "~/widgets/cta-band";
import { DeliveryCheck } from "~/widgets/delivery-check";
import { HowItWorks } from "~/widgets/how-it-works";
import { LocalLaundry } from "~/widgets/local-laundry";
import { MachineShowcase } from "~/widgets/machine-showcase";
import { PageHero } from "~/widgets/page-hero";
import { Prices } from "~/widgets/prices";
import { StartRental } from "~/widgets/start-rental";
import { TrustStrip } from "~/widgets/trust-strip";
import type { loader } from "../loader";

// /<city>/: one city we deliver to.
export default function CityPage() {
  const { slug } = useLoaderData<typeof loader>();
  const { d, format, money } = useI18n();
  const text = d.areas.page;
  const city = findCity(d, slug)!;
  const prices = usePrices();
  const districts = getDistricts(d);
  const isToronto = city.slug === "toronto";
  // Toronto's district names link to their own pages (entities/area).
  const districtLinks = Object.fromEntries(districts.map((district) => [district.name, districtPath(district)]));
  const otherCities = [
    ...getCities(d)
      .filter((other) => other.slug !== city.slug)
      .map((other) => ({ href: cityPath(other), label: other.name })),
    { href: pagePaths.areas, label: d.common.allAreas },
  ];

  return (
    <>
      <PageHero
        eyebrow={format(text.cityEyebrow, { place: city.name })}
        title={format(text.title, { place: city.name })}
        intro={city.intro}
        visual={<AreaMap label={format(text.mapLabel, { place: city.name })} highlight={city.slug} />}
        price={money(prices.set.current)}
        wasPrice={<WasPrice price={prices.set} className="font-display text-lg font-bold text-ink-muted" />}
        priceLabel={text.priceLabel}
        otherPrice={text.otherPrice}
      />
      <TrustStrip />

      <LocalLaundry area={city} neighbourhoodLinks={isToronto ? districtLinks : {}} />
      <DeliveryCheck />
      <MachineShowcase />
      <Prices />
      <HowItWorks />

      <Section aria-label={text.otherAreasLabel}>
        <Container className="grid gap-10 lg:grid-cols-2">
          {isToronto && (
            <LinkList
              id="districts-title"
              title={text.torontoDistricts}
              links={districts.map((district) => ({ href: districtPath(district), label: district.name }))}
            />
          )}
          <div>
            <LinkList id="other-areas-title" title={text.otherAreas} links={otherCities} />
            <p className="mt-4 text-ink-soft">{d.common.fartherAwayAsk}</p>
          </div>
        </Container>
      </Section>

      <CtaBand title={format(text.ctaTitle, { place: city.name })} />
      <StartRental />
    </>
  );
}
