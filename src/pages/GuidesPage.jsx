import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "../content/guides";
import { guidePath } from "../content/routes";
import PageIntro from "../components/PageIntro";

// /guides/: every guide in this build. Exists only while at least one guide is built.
export default function GuidesPage() {
  return (
    <>
      <PageIntro icon={BookOpen} eyebrow="Guides" title="Guides for renting a washer and dryer">
        <p className="lead mt-5">
          Short, practical guides for renting a washer and dryer in Toronto and the GTA.
        </p>
      </PageIntro>

      <section aria-label="All guides" className="border-t border-line bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {guides.map((guide) => (
              <li
                key={guide.slug}
                className="relative flex flex-col rounded-3xl border border-line bg-paper p-6 transition-colors hover:border-brand sm:p-8"
              >
                <h2 className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  <a
                    href={guidePath(guide)}
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
                  Read the guide
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
