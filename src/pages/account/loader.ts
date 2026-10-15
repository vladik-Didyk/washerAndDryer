import { data, type LoaderFunctionArgs } from "react-router";
import { accountPage } from "~/shared/config";
import { flagsOf } from "~/shared/config";
import { pageHead } from "~/shared/seo";

// Exists only once the Stripe customer portal does (STRIPE_PORTAL_URL); otherwise a 404.
export function loader({ context }: LoaderFunctionArgs) {
  const { stripePortalUrl } = flagsOf(context);
  if (!stripePortalUrl) throw data("Not found", { status: 404 });
  return {
    stripePortalUrl,
    head: pageHead({
      path: accountPage.path,
      kind: "account",
      title: accountPage.metaTitle,
      description: accountPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Pay or manage", path: accountPage.path },
      ],
    }),
  };
}
