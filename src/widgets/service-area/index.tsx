import { AreaMap } from "~/entities/area";
import { PostalCodeChecker } from "~/features/postal-check";
import { pagePaths, siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { Container, LangLink, Section, SectionHeader } from "~/shared/ui";

// The service map (entities/area AreaMap) with the postal-code check beside it.
export function ServiceArea({ title }: { title?: string }) {
  const { phone } = siteConfig;
  const { d, rich } = useI18n();

  return (
    <Section id="areas" aria-labelledby="areas-title">
      <Container>
        <SectionHeader
          id="areas-title"
          title={title ?? d.home.serviceArea.title}
          lead={rich(d.common.fartherAwayCall, {
            phoneLink: (
              <a href={phone.tel} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
            ),
          })}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <figure className="lg:col-span-8">
            <AreaMap label={d.home.serviceArea.mapLabel} />
          </figure>

          <div className="lg:col-span-4">
            <PostalCodeChecker />
            <p className="mt-6">
              <LangLink href={pagePaths.areas} className="text-link">
                {d.home.serviceArea.allAreas}
              </LangLink>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
