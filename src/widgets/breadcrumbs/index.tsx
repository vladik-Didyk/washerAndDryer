import { useI18n } from "~/shared/i18n";
import type { Crumb } from "~/shared/seo";
import { ChevronRight, Container } from "~/shared/ui";

// The trail at the top of inner pages. The same items (the page loader's head.breadcrumbs)
// feed the BreadcrumbList JSON-LD, so the two always match.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { d } = useI18n();
  return (
    <Container as="nav" aria-label={d.chrome.breadcrumb} className="pt-5 sm:pt-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink-soft">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  className="underline decoration-ink-muted/40 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
