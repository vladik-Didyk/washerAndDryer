import { sectionId, useSite, type ArticleSection, type RenderedBlock } from "~/shared/lib";
import { ArrowRight, Info } from "~/shared/ui";

const text = "text-[17px] leading-relaxed text-ink-soft";

// One block of a section: a string is a paragraph; otherwise { list }, { steps }, { note } or
// { link }. A link is left out when its page doesn't exist in this deployment (a draft).
function Block({ block }: { block: RenderedBlock }) {
  const site = useSite();
  if (typeof block === "string") return <p className={`mt-4 ${text}`}>{block}</p>;

  if ("list" in block) {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.list.map((item) => (
          <li key={item} className={`flex gap-3 ${text}`}>
            <span aria-hidden="true" className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if ("steps" in block) {
    return (
      <ol className="mt-5 space-y-4">
        {block.steps.map((step, index) => (
          <li key={step} className={`flex gap-3 ${text}`}>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-ink"
            >
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    );
  }

  if ("note" in block) {
    return (
      <p className="mt-5 flex gap-3 rounded-2xl border border-brand-mint-strong bg-brand-mint p-5 text-[17px] leading-relaxed text-ink">
        <Info className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <span>{block.note}</span>
      </p>
    );
  }

  if ("link" in block) {
    if (!site.has(block.link.href)) return null;
    return (
      <p className="mt-4">
        <a href={block.link.href} className="text-link inline-flex items-center gap-1.5">
          {block.link.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </p>
    );
  }

  return null;
}

// The body of a guide, the privacy policy or the rental terms: sections with an h2 each.
export function ArticleBody({ sections }: { sections: ArticleSection<RenderedBlock>[] }) {
  return sections.map((section) => {
    const id = sectionId(section);
    return (
      <section key={id} id={id} aria-labelledby={`${id}-title`} className="mt-12 first:mt-0">
        <h2 id={`${id}-title`} className="font-display text-2xl font-bold leading-tight text-ink sm:text-[1.75rem]">
          {section.heading}
        </h2>
        {section.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </section>
    );
  });
}
