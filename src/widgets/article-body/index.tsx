import { activePromotions, promotionText } from "~/entities/offer";
import type { I18n } from "~/shared/i18n";
import { sectionId, useSite, type ArticleBlock, type ArticleSection, type RenderedBlock } from "~/shared/lib";
import { ArrowRight, Info, LangLink } from "~/shared/ui";

// The per-request blocks of an article's text (shared/i18n locales/en.server.ts), filled in by
// the page loader: { include: "hookups" } is the hookup checklist; { offer: "promotions" } one
// paragraph per running promotion (none once they end); { offer: "referral" } the referral
// offer; `includes` holds any other text a page includes (the privacy policy's statistics line).
export function prepareArticle(
  sections: ArticleSection[],
  i18n: I18n,
  now: number,
  paragraphs: { promotionParagraph: string; referralParagraph: string },
  includes: Record<string, string> = {},
): ArticleSection<RenderedBlock>[] {
  const { d, format } = i18n;
  const render = (block: ArticleBlock): RenderedBlock[] => {
    if (typeof block === "string") return [block];
    if ("include" in block) {
      if (block.include === "hookups") return [{ list: d.common.hookups }];
      return block.include in includes ? [includes[block.include]] : [];
    }
    if ("offer" in block) {
      if (block.offer === "referral") return [format(paragraphs.referralParagraph, d.offers.referral)];
      return activePromotions(now).map((promotion) =>
        format(paragraphs.promotionParagraph, promotionText(promotion, i18n)),
      );
    }
    return [block];
  };
  return sections.map((section) => ({ ...section, blocks: section.blocks.flatMap(render) }));
}

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
        <LangLink href={block.link.href} className="text-link inline-flex items-center gap-1.5">
          {block.link.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LangLink>
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
