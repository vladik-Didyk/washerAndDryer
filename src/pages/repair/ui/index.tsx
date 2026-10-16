import { useActionData } from "react-router";
import { RepairForm } from "~/features/repair-form";
import { useI18n } from "~/shared/i18n";
import { siteConfig } from "~/shared/config";
import { CallCard, Camera, Card, Container, DotList, Droplets, Heading, Section, Wrench } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import type { action } from "../action";

// /repair/: repair request for customers renting from us. Repairs are included while they rent.
export default function RepairPage() {
  const result = useActionData<typeof action>();
  const { d } = useI18n();
  const text = d.repair;

  return (
    <>
      <PageIntro icon={Wrench} eyebrow={text.eyebrow} title={text.title}>
        <p className="lead mt-5">{text.lead}</p>
      </PageIntro>

      <Section aria-label={text.sectionLabel} padded={false} className="pb-16 sm:pb-20 lg:pb-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-5">
            {/* A photo says more than the form: one tap opens a text with the start typed in.
                "?&body=" is the form both iPhones and Android phones read. */}
            <div className="on-dark rounded-3xl bg-brand p-6 text-white sm:p-7">
              <Camera className="h-8 w-8 text-gold" aria-hidden="true" />
              <Heading variant="cardSmall" className="mt-3 text-white">
                {text.photoTitle}
              </Heading>
              <p className="mt-2 text-white/85">{text.photoText}</p>
              <a
                href={`${siteConfig.phone.sms}?&body=${encodeURIComponent(text.photoBody)}`}
                className="btn btn-gold mt-5 w-full"
              >
                <Camera className="h-[18px] w-[18px]" aria-hidden="true" />
                {text.photoButton}
              </a>
            </div>

            <CallCard tone="mintBordered" title={text.fastest} />

            <Card padding="sm" className="flex gap-3">
              <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-ink-soft">
                <span className="font-semibold text-ink">{text.leakTitle}</span> {text.leakText}
              </p>
            </Card>

            <div>
              <Heading variant="cardSmall">{text.helpsTitle}</Heading>
              <DotList items={text.helps} className="mt-4 space-y-3" />
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">{text.damageNote}</p>
            </div>
          </div>

          <div id="repair-request" className="lg:col-span-7">
            <RepairForm result={result} />
          </div>
        </Container>
      </Section>
    </>
  );
}
