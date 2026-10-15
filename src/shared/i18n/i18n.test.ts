// The dictionaries stay in step with English, and no component types its own text.
import ts from "typescript";
import { describe, expect, it } from "vitest";
import en from "./locales/en";
import es from "./locales/es";
import ru from "./locales/ru";
import { LANGUAGES, createI18n, loadAllDictionaries, placeholdersOf } from "./index";

type Tree = Record<string, unknown>;

// Every string in a dictionary, by its dotted path ("home.hero.title", "landlords.faqs.0.answer").
function leaves(node: unknown, path = ""): Array<[string, string]> {
  if (typeof node === "string") return [[path, node]];
  if (Array.isArray(node)) return node.flatMap((item, index) => leaves(item, `${path}.${index}`));
  if (node && typeof node === "object") {
    return Object.entries(node as Tree).flatMap(([key, value]) => leaves(value, path ? `${path}.${key}` : key));
  }
  return [];
}

// The shape of a dictionary: every key path, lists counted as one node.
function keyPaths(node: unknown, path = ""): string[] {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    return Object.entries(node as Tree).flatMap(([key, value]) => [
      path ? `${path}.${key}` : key,
      ...keyPaths(value, path ? `${path}.${key}` : key),
    ]);
  }
  return [];
}

const translations = { es, ru };
const englishKeys = new Set(keyPaths(en));
const englishText = new Map(leaves(en));
const sameSet = (a: string[], b: string[]) => [...new Set(a)].sort().join(",") === [...new Set(b)].sort().join(",");

describe.each(Object.entries(translations))("the %s dictionary", (_code, dictionary) => {
  it("has no keys that English doesn't have", () => {
    expect(keyPaths(dictionary).filter((path) => !englishKeys.has(path))).toEqual([]);
  });

  it("uses the same {placeholders} as English", () => {
    // `formats` are patterns of their own (a 24-hour clock uses {hour24}, not {period}).
    const mismatched = leaves(dictionary)
      .filter(([path]) => !path.startsWith("formats."))
      .filter(([path, text]) => {
        const english = englishText.get(path);
        return english !== undefined && !sameSet(placeholdersOf(english), placeholdersOf(text));
      })
      .map(([path]) => path);
    expect(mismatched).toEqual([]);
  });

  it("gives lists the same length as English", () => {
    const englishLists = new Map(
      keyPaths(en).flatMap((path) => {
        const value = path.split(".").reduce<unknown>((node, key) => (node as Tree)[key], en);
        return Array.isArray(value) ? [[path, value.length] as const] : [];
      }),
    );
    for (const path of keyPaths(dictionary)) {
      const value = path.split(".").reduce<unknown>((node, key) => (node as Tree)[key], dictionary);
      if (Array.isArray(value) && englishLists.has(path)) expect(value.length, path).toBe(englishLists.get(path));
    }
  });
});

describe("every language", () => {
  it("is registered with a dictionary that loads, and fills in every fact", async () => {
    await loadAllDictionaries();
    const facts = { company: { text: "ACME" }, phone: { text: "000" }, setPrice: { money: 12.5 } } as const;
    for (const language of LANGUAGES) {
      const { d } = createI18n(language.code, { ...facts });
      expect(d.pages.home.title).toContain("$12.50");
    }
  });
});

// ---------------------------------------------------------------------------------------
// No hard-coded words in components: JSX text, string literals in JSX, and the text props
// (aria-label, alt, title, placeholder) must come from the dictionary.

// Every component's source, through Vite (src/**/*.tsx, the dictionaries and tests left out).
const SOURCES = import.meta.glob<string>(["../../**/*.tsx", "!../../**/*.test.tsx", "!./**"], {
  query: "?raw",
  import: "default",
  eager: true,
});
const TEXT_PROPS = new Set(["aria-label", "alt", "title", "placeholder", "label", "legend", "hint", "note", "eyebrow"]);
// Strings that are not words for people (allowed as they are).
const ALLOWED = [/^[^A-Za-zА-Яа-я]*$/]; // punctuation, symbols, spaces, digits only

const isAllowed = (text: string) => ALLOWED.some((pattern) => pattern.test(text.trim()));

function hardCodedText([file, code]: [string, string]): string[] {
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: string[] = [];
  const where = (node: ts.Node) =>
    `${file.replace(/^(\.\.\/)+/, "")}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node) && !isAllowed(node.text)) found.push(`${where(node)} text "${node.text.trim()}"`);
    if (ts.isJsxAttribute(node) && TEXT_PROPS.has(node.name.getText(source)) && node.initializer) {
      const value = node.initializer;
      const literal = ts.isStringLiteral(value)
        ? value.text
        : ts.isJsxExpression(value) && value.expression && ts.isStringLiteralLike(value.expression)
          ? value.expression.text
          : null;
      if (literal !== null && !isAllowed(literal)) found.push(`${where(node)} ${node.name.getText(source)}="${literal}"`);
    }
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      ts.isStringLiteralLike(node.expression) &&
      !ts.isJsxAttribute(node.parent) &&
      !isAllowed(node.expression.text)
    ) {
      found.push(`${where(node)} {"${node.expression.text}"}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

describe("components", () => {
  it("take every word from the dictionary", () => {
    const files = Object.entries(SOURCES);
    expect(files.length).toBeGreaterThan(50);
    expect(files.flatMap(hardCodedText)).toEqual([]);
  });
});
