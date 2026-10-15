import { useLoaderData } from "react-router";
import { useI18n } from "~/shared/i18n";
import { ArrowRight, BookOpen } from "~/shared/ui";
import { PageIntro } from "~/widgets/page-intro";
import type { loader } from "../loader";

// /guides/: every guide this deployment shows. Exists only while at least one guide is shown.
export default function GuidesPage() {
  const { guides } = useLoaderData<typeof loader>();
  const { d } = useI18n();
  return (
    <>
      <PageIntro icon={BookOpen} eyebrow={d.guides.eyebrow} title={d.guides.title}>
        <p className="lead mt-5">{d.guides.lead}</p>
      </PageIntro>

      <section aria-label={d.guides.listLabel} className="border-t border-line bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {guides.map((guide) => (
              <li
                key={guide.slug}
                className="relative flex flex-col rounded-3xl border border-line bg-paper p-6 transition-colors hover:border-brand sm:p-8"
              >
                <h2 className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  <a
                    href={guide.path}
                    className="underline decoration-brand/30 decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-3xl hover:text-brand"
                  >
                    {guide.title}
                  </a>
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{guide.summary}</p>
                <p
                  aria-hidden="true"
                  className="mt-auto flex items-center gap-1.5 pt-5 font-display font-semibold text-brand"
                >
                  {d.guides.read}
                  <ArrowRight className="h-4 w-4" />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
