// The heading block of an inner page: eyebrow line, the page's one h1, then `children`
// (intro text, buttons). `aside` fills a right-hand column on wide screens; without it the
// text keeps to `textWidth`.
import type { ReactNode } from "react";
import { Container, Eyebrow, Heading, Nest, Section, type LucideIcon } from "~/shared/ui";

export function PageIntro({
  icon,
  eyebrow,
  title,
  aside,
  textWidth = "max-w-3xl",
  children,
}: {
  icon?: LucideIcon;
  eyebrow?: string;
  title: ReactNode;
  aside?: ReactNode;
  textWidth?: string;
  children?: ReactNode;
}) {
  const text = (
    <>
      {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
      <Heading id="hero-title" variant="page" className="mt-3">
        {title}
      </Heading>
      {children}
    </>
  );

  return (
    <Section
      id="top"
      aria-labelledby="hero-title"
      padded={false}
      nest={false}
      className="overflow-hidden pb-12 pt-8 sm:pt-10 lg:pb-14"
    >
      {aside ? (
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">{text}</div>
          <div className="lg:col-span-5">
            <Nest>{aside}</Nest>
          </div>
        </Container>
      ) : (
        <Container>
          <div className={textWidth}>{text}</div>
        </Container>
      )}
    </Section>
  );
}
