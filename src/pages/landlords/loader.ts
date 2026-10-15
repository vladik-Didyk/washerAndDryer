import type { LoaderFunctionArgs } from "react-router";
import { landlordsPage } from "~/shared/config";
import { siteConfig } from "~/shared/config";
import { pageHead, serviceNode, weeklyOffer } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: landlordsPage.path,
      kind: "landlords",
      title: landlordsPage.metaTitle,
      description: landlordsPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Landlords", path: landlordsPage.path },
      ],
      jsonLd: [
        serviceNode({
          name: "Washer and dryer rental for landlords",
          serviceType: "Washer and dryer rental for rental units",
          description: landlordsPage.metaDescription,
          path: landlordsPage.path,
          extra: { audience: { "@type": "Audience", audienceType: "Landlords" } },
          offers: weeklyOffer(
            "Washer and dryer set for a rental unit",
            siteConfig.prices.set,
            "List price per washer and dryer set, per week. For 3 or more units, quoted per building after seeing it. Repairs included.",
          ),
        }),
      ],
    }),
  };
}
