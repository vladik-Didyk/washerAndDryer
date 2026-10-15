import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { DEFAULT_LANG, isEnglishOnly, useI18n } from "../i18n";

// Links that stay in the page's language. Every site link goes through LangLink (or Button):
// on a Spanish page "/faq/" becomes "/es/faq/"; tel:, sms:, https: and #anchors stay as they
// are. A page that exists in English only (the policies) keeps its English address and gets a
// short "Available in English" note, so nobody is surprised by the language change.
// Plain <a> elements: every page works without JavaScript.

export type LangLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

export function LangLink({ href, children, ...rest }: LangLinkProps) {
  const i18n = useI18n();
  const englishOnly = i18n.lang !== DEFAULT_LANG && isEnglishOnly(href);
  return (
    <a href={i18n.href(href)} {...(englishOnly ? { hrefLang: DEFAULT_LANG } : {})} {...rest}>
      {children}
      {englishOnly && (
        <span className="font-normal">
          {" ("}
          {i18n.d.common.availableInEnglish}
          {")"}
        </span>
      )}
    </a>
  );
}

// Button looks, as class names (defined in src/app/app.css), for <a> and <button> alike.
export const buttonClass = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  gold: "btn btn-gold",
  outlineLight: "btn btn-outline-light",
} as const;

export type ButtonVariant = keyof typeof buttonClass;

type ButtonOwnProps = { variant?: ButtonVariant; className?: string; children: ReactNode };

export type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">)
  );

// A button-looking control: a link with `href` (a site path stays in the page's language;
// tel:/sms: links as they are), otherwise a <button> (type="button" unless given).
export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = className ? `${buttonClass[variant]} ${className}` : buttonClass[variant];
  if (props.href !== undefined) {
    return (
      <LangLink {...props} href={props.href} className={classes}>
        {children}
      </LangLink>
    );
  }
  const { type = "button", ...rest } = props as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} {...rest} className={classes}>
      {children}
    </button>
  );
}
