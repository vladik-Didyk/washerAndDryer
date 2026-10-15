import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { pageHead, serviceNode, weeklyOffer } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  const text = d.jsonLd.landlords;
  return {
    head: pageHead(i18n, {
      path: pagePaths.landlords,
      kind: "landlords",
      title: d.pages.landlords.title,
      description: d.pages.landlords.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.landlords.name, path: pagePaths.landlords },
      ],
      jsonLd: [
        serviceNode(i18n, {
          name: text.name,
          serviceType: text.serviceType,
          description: d.pages.landlords.description,
          path: pagePaths.landlords,
          extra: { audience: { "@type": "Audience", audienceType: text.audience } },
          offers: weeklyOffer(text.offerName, i18n.amount("setPrice"), text.offerDescription),
        }),
      ],
    }),
  };
}
