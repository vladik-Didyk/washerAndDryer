// Top of every draft page. Drafts exist only in preview builds (pnpm build:preview), so this
// never appears on the live site.
export default function DraftRibbon() {
  return (
    <div role="note" aria-label="Draft notice" className="bg-red-700 text-white">
      <p className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2.5 text-center text-sm">
        <strong className="font-display text-base font-bold">Draft — not published</strong>
        <span className="text-white/90">
          Preview build only. The live site leaves this page out until it's approved.
        </span>
      </p>
    </div>
  );
}
