import { ChevronRight } from "lucide-react";

// The trail at the top of inner pages. The same items (route.breadcrumbs in
// src/content/routes.js) feed the BreadcrumbList JSON-LD, so the two always match.
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-5 sm:pt-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
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
    </nav>
  );
}
