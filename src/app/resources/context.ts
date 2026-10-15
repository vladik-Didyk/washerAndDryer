import type { AppLoadContext } from "react-router";
import { i18nAt } from "~/entities/offer";
import { flagsOf, requestTimeOf } from "~/shared/config";
import { DEFAULT_LANG, loadAllDictionaries, type I18n } from "~/shared/i18n";
import type { CatalogOptions } from "../catalog";

// The catalog options for this request (environment and date).
export function catalogOptions(context: AppLoadContext): CatalogOptions {
  const flags = flagsOf(context);
  return {
    previewDrafts: flags.previewDrafts,
    stripePortalUrl: flags.stripePortalUrl,
    now: requestTimeOf(context),
    analyticsOn: Boolean(flags.analyticsToken),
  };
}

// The English text of this request, with every language loaded (the catalog lists the
// Spanish and Russian pages under their own titles).
export async function catalogI18n(context: AppLoadContext): Promise<I18n> {
  await loadAllDictionaries();
  return i18nAt(DEFAULT_LANG, requestTimeOf(context));
}
