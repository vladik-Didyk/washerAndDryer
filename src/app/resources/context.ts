import type { AppLoadContext } from "react-router";
import { isFirstWeekFreeActive } from "~/entities/offer";
import { flagsOf, requestTimeOf } from "~/shared/config";
import type { CatalogOptions } from "../catalog";

// The catalog options for this request (environment and date).
export function catalogOptions(context: AppLoadContext): CatalogOptions {
  const flags = flagsOf(context);
  return {
    previewDrafts: flags.previewDrafts,
    stripePortalUrl: flags.stripePortalUrl,
    offerActive: isFirstWeekFreeActive(requestTimeOf(context)),
    analyticsOn: Boolean(flags.analyticsToken),
  };
}
