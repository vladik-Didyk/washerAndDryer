// The server-only text (./locales/en.server.ts: guides, policies, llms.txt) with this
// request's facts filled in. Server only: it reaches a page only through its loader, so a
// draft's text never ships in the browser bundle. A language's own part
// (./locales/<code>.server.ts, typed DeepPartial) is merged over English the same way as the
// client dictionary; what it leaves out shows in English. The policies and llms.txt stay
// English (their pages are English-only); the guides are what a translation would add.
import enServer from "./locales/en.server";
import esServer from "./locales/es.server";
import ruServer from "./locales/ru.server";
import frServer from "./locales/fr.server";
import { deepFill, mergeDictionary, type DeepPartial, type I18n, type Lang } from "./index";

export type ServerText = typeof enServer;

const translations: Record<Lang, DeepPartial<ServerText> | undefined> = { en: undefined, es: esServer, ru: ruServer, fr: frServer };

const resolved = new WeakMap<I18n, ServerText>();

export function serverText(i18n: I18n): ServerText {
  let text = resolved.get(i18n);
  if (!text) {
    const own = translations[i18n.lang];
    // English with English formats; a translation's own strings with its language's.
    text = own ? mergeDictionary<ServerText>(i18n.resolve(enServer), deepFill(own, i18n.vars)) : i18n.resolve(enServer);
    resolved.set(i18n, text);
  }
  return text;
}
