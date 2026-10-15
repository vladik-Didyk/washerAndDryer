// The browser entry: the default React Router one, plus one step before hydrating. The page's
// language is read from <html lang> (the server chose it from the URL) and its dictionary is
// loaded first (one small chunk per language, shared/i18n), so the first render in the browser
// has the same words as the server HTML and the dictionary never has to be inlined in the page.
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { DEFAULT_LANG, isLang, loadDictionary } from "~/shared/i18n";

const lang = document.documentElement.lang;

loadDictionary(isLang(lang) ? lang : DEFAULT_LANG).then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
});
