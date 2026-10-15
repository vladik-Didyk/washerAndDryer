import { BookOpen, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { guides } from "../content/guides";
import { guidePath, requestFormHref } from "../content/routes";
import PageIntro from "../components/PageIntro";
import ArticleBody, { formatDate, sectionId } from "../components/ArticleBody";
import LinkList from "../components/LinkList";

// One guide (src/content/guides/). The author is the business; there are no author bios.
export default function GuidePage({ guide }) {
  const { phone, prices, companyName } = siteConfig;
  const otherGuides = guides
    .filter((other) => other.slug !== guide.slug)
    .map((other) => ({ href: guidePath(other), label: other.title }));

  return (
    <>
      <PageIntro icon={BookOpen} eyebrow="Guide" title={guide.title}>
        <p className="lead mt-5">{guide.summary}</p>
        <p className="mt-4 text-sm text-ink-muted">
          By {companyName} · Updated{" "}
          <time dateTime={guide.updated} className="whitespace-nowrap">
            {formatDate(guide.updated)}
          </time>
        </p>
      </PageIntro>

      <div className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <nav aria-label="On this page" className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 rounded-3xl border border-line bg-paper p-6">
              <p className="font-display text-sm font-semibold text-ink-muted">On this page</p>
              <ol className="mt-3 space-y-2.5">
                {guide.sections.map((section) => (
                  <li key={sectionId(section)}>
                    <a
                      href={`#${sectionId(section)}`}
                      className="text-[15px] text-ink-soft underline decoration-transparent underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-8">
            <div className="max-w-[46rem]">
              <ArticleBody sections={guide.sections} />
            </div>

            <aside
              aria-labelledby="guide-cta-title"
              className="mt-14 max-w-[46rem] rounded-3xl bg-brand-mint p-6 sm:p-8"
            >
              <h2 id="guide-cta-title" className="font-display text-2xl font-bold text-ink">
                Ready to rent?
              </h2>
              <p className="mt-2 text-ink-soft">
                ${prices.setText} a week for a washer and dryer set, ${prices.singleText} for
                one machine. Repairs and old-machine haul-away included.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={requestFormHref} className="btn btn-primary">
                  Check availability
                </a>
                <a href={phone.tel} className="btn btn-secondary">
                  <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                  Call or text {phone.display}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {otherGuides.length > 0 && (
        <section aria-label="More guides" className="section">
          <div className="container-page">
            <LinkList id="more-guides-title" title="More guides" links={otherGuides} />
          </div>
        </section>
      )}
    </>
  );
}
