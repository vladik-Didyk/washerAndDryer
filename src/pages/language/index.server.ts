// The language pages' facts, for the sitemap and llms.txt (src/app): one per language other
// than English, with its title and description in its own language. Every language must be
// loaded first (shared/i18n loadAllDictionaries).
import { LANGUAGES, createI18n, type Facts } from "~/shared/i18n";

export const languagePages = (facts: Facts) =>
  LANGUAGES.filter((language) => language.code !== "en").map((language) => {
    const { d } = createI18n(language.code, facts);
    return {
      lang: language.code,
      path: language.path,
      name: language.name,
      title: d.language.metaTitle,
      description: d.language.metaDescription,
    };
  });
