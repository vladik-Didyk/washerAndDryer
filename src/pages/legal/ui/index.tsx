import { useLoaderData } from "react-router";
import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { FileText } from "~/shared/ui";
import { ArticleBody } from "~/widgets/article-body";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// The privacy policy or the rental terms (../content.server.ts).
export default function LegalPage() {
  const { page } = useLoaderData<typeof loader>();
  const { phone } = siteConfig;
  const { d, rich, date } = useI18n();

  return (
    <>
      <PageIntro
        icon={FileText}
        eyebrow={page.kind === "terms" ? d.legal.termsEyebrow : d.legal.privacyEyebrow}
        title={page.title}
      >
        <p className="lead mt-5">{page.summary}</p>
        <p className="mt-4 text-sm text-ink-muted">
          {rich(d.legal.updated, {
            date: (
              <time dateTime={page.updated} className="whitespace-nowrap">
                {date(page.updated)}
              </time>
            ),
          })}
        </p>
      </PageIntro>

      <div className="border-t border-line bg-white">
        <div className="container-page py-12 sm:py-14 lg:py-16">
          <div className="max-w-3xl">
            <ArticleBody sections={page.sections} />
            <p className="mt-14 border-t border-line pt-8 text-ink-soft">
              {rich(d.legal.questions, {
                phoneLink: (
                  <a href={phone.tel} className="text-link whitespace-nowrap">
                    {phone.display}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
