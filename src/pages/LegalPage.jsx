import { FileText } from "lucide-react";
import { siteConfig } from "../content/config";
import PageIntro from "../components/PageIntro";
import ArticleBody, { formatDate } from "../components/ArticleBody";

// The privacy policy or the rental terms (src/content/legal.js).
export default function LegalPage({ page }) {
  const { phone } = siteConfig;

  return (
    <>
      <PageIntro
        icon={FileText}
        eyebrow={page.kind === "terms" ? "Renting with us" : "Your information"}
        title={page.title}
      >
        <p className="lead mt-5">{page.summary}</p>
        <p className="mt-4 text-sm text-ink-muted">
          Last updated{" "}
          <time dateTime={page.updated} className="whitespace-nowrap">
            {formatDate(page.updated)}
          </time>
        </p>
      </PageIntro>

      <div className="border-t border-line bg-white">
        <div className="container-page py-12 sm:py-14 lg:py-16">
          <div className="max-w-3xl">
            <ArticleBody sections={page.sections} />
            <p className="mt-14 border-t border-line pt-8 text-ink-soft">
              Questions about this page? Call or text{" "}
              <a href={phone.tel} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
