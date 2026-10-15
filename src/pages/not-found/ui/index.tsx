import { siteConfig } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { LangLink, Phone } from "~/shared/ui";

// The 404 page: rendered by the root error boundary for any unknown URL (and for drafts in a
// normal deployment), with the status 404.
export function NotFoundPage() {
  const { phone } = siteConfig;
  const { d } = useI18n();
  return (
    <section aria-labelledby="hero-title" className="section">
      <div className="container-page max-w-3xl">
        <h1 id="hero-title" className="h2">
          {d.notFound.title}
        </h1>
        <p className="lead mt-4">{d.notFound.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LangLink href="/" className="btn btn-primary">
            {d.notFound.home}
          </LangLink>
          <a href={phone.tel} className="btn btn-secondary">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            {d.common.callPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
