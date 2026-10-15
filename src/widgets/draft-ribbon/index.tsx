import { useI18n } from "~/shared/i18n";
import { Container } from "~/shared/ui";

// Top of every draft page. Drafts exist only in preview deployments (PREVIEW_DRAFTS=1), so
// this never appears on the live site.
export function DraftRibbon() {
  const { draft } = useI18n().d.chrome;
  return (
    <div role="note" aria-label={draft.label} className="bg-red-700 text-white">
      <Container as="p" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2.5 text-center text-sm">
        <strong className="font-display text-base font-bold">{draft.title}</strong>
        <span className="text-white/90">{draft.text}</span>
      </Container>
    </div>
  );
}
