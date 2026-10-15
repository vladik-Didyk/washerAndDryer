// All the site's text, in one place per language: ./locales/<code>.ts. This module is the
// only way in: the language registry, the dictionary loader (one code-split chunk per
// language, loaded with import() and cached), the formatters (money, numbers, dates, times)
// and the React provider.
//
// - English (./locales/en.ts) is the full dictionary and the type of every other language:
//   `Dictionary = typeof en`. A translation is a DeepPartial<Dictionary>, merged over English
//   when it loads, so a missing key shows the English text.
// - Text is plain data. `{name}` marks a value filled in later. Facts of the business (the
//   phone number, prices, the deposit, offer dates...) are "facts" (see Fact below): the server
//   decides them per request (entities/offer), they are formatted here for the language, and
//   every string of the dictionary gets them filled in (`i18n.d`). Values that belong to one
//   string only (a name, a count) are passed when it is used: i18n.format(text, { name }).
// - The server picks the language from the URL (langFromPath), the root loader loads it, and
//   the browser loads the same one before hydrating (src/app/entry.client.tsx), so the
//   dictionary itself is never sent inside the HTML.
//
// Adding a language: write ./locales/xx.ts (typed DeepPartial<Dictionary>), add one entry to
// LANGUAGES below, and give it pages (a route) if it has its own. README.md has the steps.
import { createContext, createElement, Fragment, useContext, type ReactNode } from "react";
import { englishOnlyPaths } from "../config/site";
import type en from "./locales/en";

export type Dictionary = typeof en;

// A translation: any part of the English dictionary. Lists are replaced whole.
export type DeepPartial<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? T
    : { [K in keyof T]?: DeepPartial<T[K]> };

type DictionaryModule = { default: DeepPartial<Dictionary> };

interface LanguageEntry {
  /** BCP 47 code: <html lang>, hreflang. */
  code: string;
  /** The language's own name, for language links. */
  name: string;
  /** Its name in English: the "Language:" line of the form emails. */
  englishName: string;
  /** Intl locale for dates. */
  locale: string;
  /** Intl locale for money and numbers. The Spanish and Russian pages write prices the
   *  Canadian way ("$12.50"), as before the move to this module. */
  numberLocale: string;
  /** Open Graph locale. */
  ogLocale: string;
  /** Home of the language: "/" for English, "/es/" for Spanish. */
  path: string;
  dir: "ltr" | "rtl";
  load: () => Promise<DictionaryModule>;
}

export const LANGUAGES = [
  {
    code: "en",
    name: "English",
    englishName: "English",
    locale: "en-CA",
    numberLocale: "en-CA",
    ogLocale: "en_CA",
    path: "/",
    dir: "ltr",
    load: () => import("./locales/en"),
  },
  {
    code: "es",
    name: "Español",
    englishName: "Spanish",
    locale: "es",
    numberLocale: "en-CA",
    ogLocale: "es_LA",
    path: "/es/",
    dir: "ltr",
    load: () => import("./locales/es"),
  },
  {
    code: "ru",
    name: "Русский",
    englishName: "Russian",
    locale: "ru",
    numberLocale: "en-CA",
    ogLocale: "ru_RU",
    path: "/ru/",
    dir: "ltr",
    load: () => import("./locales/ru"),
  },
  {
    code: "fr",
    name: "Français",
    englishName: "French",
    locale: "fr-CA",
    numberLocale: "en-CA",
    ogLocale: "fr_CA",
    path: "/fr/",
    dir: "ltr",
    load: () => import("./locales/fr"),
  },
] as const satisfies readonly LanguageEntry[];

export type Lang = (typeof LANGUAGES)[number]["code"];
export type Language = Omit<LanguageEntry, "code"> & { code: Lang };
export const DEFAULT_LANG: Lang = "en";

export const languageOf = (lang: Lang): Language =>
  (LANGUAGES as readonly Language[]).find((entry) => entry.code === lang) ?? LANGUAGES[0];
export const isLang = (value: unknown): value is Lang => LANGUAGES.some((entry) => entry.code === value);

// ---------------------------------------------------------------------------------------
// Paths: every page exists in every language, at the same slug under the language's prefix
// (/machines/stackable/, /es/machines/stackable/, /ru/machines/stackable/). English has no
// prefix. src/app/routes.ts registers each page once per language from this registry.

const PREFIX = /^\/([a-z]{2})(?=[/\\]|$)/;

// A path that can only ever point at this site: any run of leading slashes and backslashes
// becomes one "/" ("//evil.com/" and "/\\evil.com" would otherwise be read by browsers as
// another host). Every path this module hands out goes through it.
export const sameOriginPath = (path: string) => path.replace(/^[/\\]+/, "/");

// "/es/faq/" -> { lang: "es", path: "/faq/" }; "/faq/" -> { lang: "en", path: "/faq/" }.
// Only a code of the registry counts as a prefix.
export function splitLangPath(pathname: string): { lang: Lang; path: string } {
  const safe = sameOriginPath(pathname.startsWith("/") || pathname.startsWith("\\") ? pathname : `/${pathname}`);
  const match = safe.match(PREFIX);
  if (match && match[1] !== DEFAULT_LANG && isLang(match[1])) {
    return { lang: match[1], path: sameOriginPath(`/${safe.slice(match[0].length)}`) };
  }
  return { lang: DEFAULT_LANG, path: safe };
}

// The language of a URL: /es/... is Spanish, /ru/... Russian, everything else English.
export const langFromPath = (pathname: string): Lang => splitLangPath(pathname).lang;

// A page that exists in English only (the policies, shared/config englishOnlyPaths).
export const isEnglishOnly = (href: string) => englishOnlyPaths.includes(href.split(/[?#]/)[0]);

// A site link in a language: "/faq/#deposit" -> "/es/faq/#deposit". Links that are not site
// paths (tel:, sms:, https:, #anchor) stay as they are; a site path always comes out as one
// same-origin path (sameOriginPath), English-only pages and paths that already carry a
// language without a new prefix.
export function localizePath(href: string, lang: Lang): string {
  if (!href.startsWith("/") && !href.startsWith("\\")) return href;
  const path = sameOriginPath(href);
  if (lang === DEFAULT_LANG || isEnglishOnly(path) || splitLangPath(path).lang !== DEFAULT_LANG) return path;
  return `/${lang}${path}`;
}

// The same page in another language (the language switcher). An English-only page has no
// other version: its link goes to that language's home page.
export function pathInLanguage(pathname: string, lang: Lang): string {
  const { path } = splitLangPath(pathname);
  if (lang !== DEFAULT_LANG && isEnglishOnly(path)) return languageOf(lang).path;
  return localizePath(path, lang);
}

// ---------------------------------------------------------------------------------------
// Loading

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// The translation over English: objects merge key by key; strings and lists replace.
export function mergeDictionary<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (over === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(over)) return over as T;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(over)) {
    out[key] = key in base ? mergeDictionary((base as Record<string, unknown>)[key], value as never) : value;
  }
  return out as T;
}

// What each language's own file holds (English: everything), once loaded.
const loaded = new Map<Lang, DeepPartial<Dictionary>>();

// Loads a language (and English under it), once; each language is its own chunk.
export async function loadDictionary(lang: Lang): Promise<void> {
  const needed = lang === DEFAULT_LANG ? [DEFAULT_LANG] : [DEFAULT_LANG, lang];
  await Promise.all(
    needed
      .filter((code) => !loaded.has(code))
      .map(async (code) => loaded.set(code, (await languageOf(code).load()).default)),
  );
}

// Every language at once (the server, for lists of all pages: sitemap, llms.txt, the catalog).
export const loadAllDictionaries = () => Promise.all(LANGUAGES.map((language) => loadDictionary(language.code)));

export const isDictionaryLoaded = (lang: Lang) => loaded.has(DEFAULT_LANG) && loaded.has(lang);

function loadedPart(lang: Lang): DeepPartial<Dictionary> {
  const part = loaded.get(lang);
  if (!part) throw new Error(`The "${lang}" dictionary is not loaded yet (call loadDictionary first).`);
  return part;
}

// ---------------------------------------------------------------------------------------
// Facts and formatting

export type DateFormat = "long" | "short";

// A value the text needs, before it is written out for a language.
export type Fact =
  | { money: number }
  | { number: number }
  | { date: string | number; format: DateFormat }
  | { time: string }
  | { text: string };

export type Facts = Record<string, Fact>;

type Vars = Record<string, string | number>;

const PLACEHOLDER = /\{(\w+)\}/g;

// "{price} a week" + { price: "$12.50" } -> "$12.50 a week". Unknown names stay as they are.
export const fill = (template: string, vars: Record<string, string>) =>
  template.replace(PLACEHOLDER, (whole, name: string) => (name in vars ? vars[name] : whole));

// The {names} in a string, in order.
export const placeholdersOf = (text: string) => [...text.matchAll(PLACEHOLDER)].map((match) => match[1]);

export function deepFill<T>(value: T, vars: Record<string, string>): T {
  if (typeof value === "string") return fill(value, vars) as T;
  if (Array.isArray(value)) return value.map((item) => deepFill(item, vars)) as T;
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepFill(item, vars)])) as T;
  }
  return value;
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const BUSINESS_TIME_ZONE = "America/Toronto";

export interface Formatters {
  /** 12.5 -> "$12.50", 200 -> "$200" (whole dollars without cents), in CAD. */
  money: (amount: number) => string;
  /** 12.5 -> { currency: "$", value: "12.50" }: a price tag that draws the sign apart. */
  moneyParts: (amount: number) => { currency: string; value: string };
  /** 2000 -> "2,000". */
  number: (value: number) => string;
  /** "2026-10-15" (a calendar date) or a timestamp (read in Toronto time). */
  date: (value: string | number, format?: DateFormat) => string;
  /** "09:00" -> "9 am". */
  time: (hhmm: string) => string;
}

export function formattersFor(lang: Lang, formats: Dictionary["formats"]): Formatters {
  const language = languageOf(lang);
  const moneyFormats = new Map<boolean, Intl.NumberFormat>();
  const moneyFormat = (whole: boolean) => {
    let format = moneyFormats.get(whole);
    if (!format) {
      format = new Intl.NumberFormat(language.numberLocale, {
        style: "currency",
        currency: "CAD",
        minimumFractionDigits: whole ? 0 : 2,
        maximumFractionDigits: 2,
      });
      moneyFormats.set(whole, format);
    }
    return format;
  };
  const numberFormat = new Intl.NumberFormat(language.numberLocale);

  const date = (value: string | number, format: DateFormat = "long") => {
    const calendarDay = typeof value === "string" && DATE_ONLY.test(value);
    const time = calendarDay ? Date.parse(`${value}T00:00:00Z`) : typeof value === "string" ? Date.parse(value) : value;
    const parts = new Intl.DateTimeFormat(language.locale, {
      timeZone: calendarDay ? "UTC" : BUSINESS_TIME_ZONE,
      year: "numeric",
      month: format === "long" ? "long" : "short",
      day: "numeric",
    }).formatToParts(new Date(time));
    const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? "";
    const template = format === "long" ? formats.dateLong : formats.dateShort;
    return fill(template, { day: part("day"), month: part("month").replace(/\.$/, ""), year: part("year") });
  };

  const time = (hhmm: string) => {
    const [hour24, minutes] = hhmm.split(":").map(Number);
    const hour12 = hour24 % 12 || 12;
    return fill(formats.time, {
      hour: String(hour12),
      hour24: String(hour24),
      minutes: String(minutes).padStart(2, "0"),
      min: minutes ? `:${String(minutes).padStart(2, "0")}` : "",
      period: hour24 < 12 ? formats.am : formats.pm,
    });
  };

  return {
    money: (amount) => moneyFormat(Number.isInteger(amount)).format(amount),
    moneyParts: (amount) => {
      const parts = moneyFormat(Number.isInteger(amount)).formatToParts(amount);
      return {
        currency: parts.find((part) => part.type === "currency")?.value ?? "",
        value: parts
          .filter((part) => part.type !== "currency" && part.type !== "literal")
          .map((part) => part.value)
          .join(""),
      };
    },
    number: (value) => numberFormat.format(value),
    date,
    time,
  };
}

function writeFact(fact: Fact, format: Formatters): string {
  if ("money" in fact) return format.money(fact.money);
  if ("number" in fact) return format.number(fact.number);
  if ("date" in fact) return format.date(fact.date, fact.format);
  if ("time" in fact) return format.time(fact.time);
  return fact.text;
}

// ---------------------------------------------------------------------------------------
// The text of one request

// Dotted keys of every string in the dictionary ("home.hero.title"); typos are type errors.
type Leaves<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends readonly unknown[]
      ? never
      : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TextKey = Leaves<Dictionary>;

export interface I18n extends Formatters {
  lang: Lang;
  language: Language;
  /** The dictionary with every fact filled in. Typed: d.home.hero.title. */
  d: Dictionary;
  /** The facts of this request (prices, dates...), as given. */
  facts: Facts;
  /** The same facts, written out for this language: { setPrice: "$12.50", ... }. */
  vars: Readonly<Record<string, string>>;
  /** A string by its dotted key, with extra values filled in. */
  t: (key: TextKey, vars?: Vars) => string;
  /** Fills the remaining {names} of a string; numbers go through `number`. */
  format: (template: string, vars?: Vars) => string;
  /** Like `format`, but a value may be markup (a link, <strong>): returns React nodes. */
  rich: (template: string, slots: Record<string, ReactNode>) => ReactNode;
  /** A site link in this language: href("/faq/") -> "/es/faq/" (localizePath). */
  href: (path: string) => string;
  /** Fills the facts into other (English) text: the server-only text, ./index.server.ts. */
  resolve: <T>(value: T) => T;
  /** A money or number fact as a number (JSON-LD). */
  amount: (name: string) => number;
}

// One I18n per language and set of facts (the facts change only when an offer starts or ends).
const cache = new Map<string, I18n>();

const writeFacts = (facts: Facts, format: Formatters) =>
  Object.fromEntries(Object.entries(facts).map(([name, fact]) => [name, writeFact(fact, format)]));

// The text of a language with the facts filled in. Each string is written out in its own
// language: a translation's strings with that language's formats, and the English strings it
// falls back to with English ones (the English header on the Spanish page says "Nov 30").
// The dictionary must be loaded first (loadDictionary).
export function createI18n(lang: Lang, facts: Facts): I18n {
  const key = `${lang}|${JSON.stringify(facts)}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const base = loadedPart(DEFAULT_LANG) as Dictionary;
  const own = lang === DEFAULT_LANG ? undefined : loadedPart(lang);
  const merged = mergeDictionary<Dictionary>(base, own);
  const formatters = formattersFor(lang, merged.formats);
  const baseVars = writeFacts(facts, lang === DEFAULT_LANG ? formatters : formattersFor(DEFAULT_LANG, base.formats));
  const vars = lang === DEFAULT_LANG ? baseVars : writeFacts(facts, formatters);
  const d = own ? mergeDictionary<Dictionary>(deepFill(base, baseVars), deepFill(own, vars)) : deepFill(base, vars);
  const writeVars = (extra: Vars = {}) =>
    Object.fromEntries(
      Object.entries(extra).map(([name, value]) => [name, typeof value === "number" ? formatters.number(value) : value]),
    );

  const i18n: I18n = {
    ...formatters,
    lang,
    language: languageOf(lang),
    d,
    facts,
    vars,
    t: (textKey, extra) => {
      const value = textKey.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], d);
      if (typeof value !== "string") throw new Error(`No text at "${textKey}".`);
      return extra ? fill(value, writeVars(extra)) : value;
    },
    format: (template, extra) => fill(template, writeVars(extra)),
    rich: (template, slots) => {
      const nodes: ReactNode[] = [];
      let last = 0;
      for (const match of template.matchAll(PLACEHOLDER)) {
        if (!(match[1] in slots)) continue;
        if (match.index > last) nodes.push(template.slice(last, match.index));
        nodes.push(slots[match[1]]);
        last = match.index + match[0].length;
      }
      if (last < template.length) nodes.push(template.slice(last));
      return nodes.map((node, index) => createElement(Fragment, { key: index }, node));
    },
    href: (path) => localizePath(path, lang),
    // The server-only text is English (./locales/en.server.ts): English formats.
    resolve: (value) => deepFill(value, baseVars),
    amount: (name) => {
      const fact = facts[name];
      if (fact && "money" in fact) return fact.money;
      if (fact && "number" in fact) return fact.number;
      throw new Error(`No amount named "${name}".`);
    },
  };
  if (cache.size > 50) cache.clear();
  cache.set(key, i18n);
  return i18n;
}

// Loads the language if needed, then createI18n (loaders, tests).
export async function loadI18n(lang: Lang, facts: Facts): Promise<I18n> {
  await loadDictionary(lang);
  return createI18n(lang, facts);
}

// ---------------------------------------------------------------------------------------
// React

const I18nContext = createContext<I18n | null>(null);

export const I18nProvider = I18nContext.Provider;

// The text of the page being shown (provided by the root, src/app/root.tsx).
export function useI18n(): I18n {
  const i18n = useContext(I18nContext);
  if (!i18n) throw new Error("useI18n() outside <I18nProvider>.");
  return i18n;
}
