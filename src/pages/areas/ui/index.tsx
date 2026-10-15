import { AreaCard, cityPath, districtPath, getCities, getDistricts } from "~/entities/area";
import { PostalCodeChecker } from "~/features/postal-check";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Card, Container, Heading, MapPin, PhoneButton, Section, SectionHeader } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import { StartRental } from "~/widgets/start-rental";

// /areas/: every city and Toronto district we deliver to, with the postal-code checker.
export default function AreasPage() {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();
  const text = d.areas.index;
  const [toronto, ...otherCities] = getCities(d);

  return (
    <>
      <PageIntro
        icon={MapPin}
        eyebrow={text.eyebrow}
        title={text.title}
        aside={
          <Card tone="mint">
            <Heading variant="card">{text.checkTitle}</Heading>
            <PostalCodeChecker className="mt-5" />
          </Card>
        }
      >
        <p className="lead mt-5 max-w-2xl">{text.lead}</p>
        <p className="mt-4 font-display text-lg font-bold text-brand">{text.samePrice}</p>
        <p className="mt-1 text-sm text-ink-muted">{d.common.pricesNote}</p>
        <p className="mt-3 text-ink-soft">{text.fartherText}</p>
        <PhoneButton kind="text" label={d.common.textPhone} className="mt-6" />
      </PageIntro>

      <Section aria-labelledby="toronto-title" className="border-y border-line bg-white">
        <Container>
          <SectionHeader id="toronto-title" title={text.torontoTitle} lead={text.torontoLead} leadClassName="mt-4 max-w-3xl" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AreaCard href={cityPath(toronto)} name={toronto.name} label={text.wholeCity} teaser={toronto.teaser} />
            {getDistricts(d).map((district) => (
              <AreaCard
                key={district.slug}
                href={districtPath(district)}
                name={district.name}
                label={text.district}
                teaser={district.teaser}
              />
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="gta-title">
        <Container>
          <SectionHeader id="gta-title" title={text.aroundTitle} lead={text.aroundLead} leadClassName="mt-4 max-w-3xl" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCities.map((city) => (
              <AreaCard key={city.slug} href={cityPath(city)} name={city.name} teaser={city.teaser} />
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            {rich(d.common.fartherAwayCall, {
              phoneLink: (
                <a href={phone.tel} className="text-link whitespace-nowrap">
                  {phone.display}
                </a>
              ),
            })}
          </p>
        </Container>
      </Section>

      <StartRental />
    </>
  );
}
