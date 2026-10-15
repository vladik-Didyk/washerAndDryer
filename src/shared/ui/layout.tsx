import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// The page's horizontal frame (the .container-page class in src/app/app.css).
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`container-page ${className}`}>{children}</Tag>;
}

// A full-width band with the standard vertical rhythm (.section).
export function Section({ className = "", children, ...rest }: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`section ${className}`} {...rest}>
      {children}
    </section>
  );
}

export const textLinkClass = "text-link";

// A small dot used as a bullet in lists (gold, like the logo's accent).
export function Bullet({ className = "mt-2 h-2 w-2" }: { className?: string }) {
  return <span aria-hidden="true" className={`${className} shrink-0 rounded-full bg-gold`} />;
}
