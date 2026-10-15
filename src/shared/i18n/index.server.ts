// The server-only text (./locales/en.server.ts: guides, policies, llms.txt) with this
// request's facts filled in. Server only: it reaches a page only through its loader, so a
// draft's text never ships in the browser bundle. English only for now: a translation would
// be ./locales/xx.server.ts, merged the same way as the client dictionary.
import enServer from "./locales/en.server";
import type { I18n } from "./index";

export type ServerText = typeof enServer;

const resolved = new WeakMap<I18n, ServerText>();

export function serverText(i18n: I18n): ServerText {
  let text = resolved.get(i18n);
  if (!text) {
    text = i18n.resolve(enServer);
    resolved.set(i18n, text);
  }
  return text;
}
