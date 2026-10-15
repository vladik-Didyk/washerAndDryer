import { data, type LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { flagsOf, pagePaths } from "~/shared/config";
import { pageHead } from "~/shared/seo";

// Exists only once the Stripe customer portal does (STRIPE_PORTAL_URL); otherwise a 404.
export async function loader(args: LoaderFunctionArgs) {
  const { stripePortalUrl } = flagsOf(args.context);
  if (!stripePortalUrl) throw data("Not found", { status: 404 });
  const i18n = await requestI18n(args);
  const { d } = i18n;
  return {
    stripePortalUrl,
    head: pageHead(i18n, {
      path: pagePaths.account,
      kind: "account",
      title: d.pages.account.title,
      description: d.pages.account.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.account.name, path: pagePaths.account },
      ],
    }),
  };
}
