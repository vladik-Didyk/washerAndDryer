import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { pageHead, serviceNode } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  const text = d.jsonLd.buildings;
  return {
    head: pageHead(i18n, {
      path: pagePaths.buildings,
      kind: "buildings",
      title: d.pages.buildings.title,
      description: d.pages.buildings.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.buildings.name, path: pagePaths.buildings },
      ],
      jsonLd: [
        serviceNode(i18n, {
          name: text.name,
          serviceType: text.serviceType,
          description: d.pages.buildings.description,
          path: pagePaths.buildings,
          extra: { audience: { "@type": "Audience", audienceType: text.audience } },
          // Quoted per building: no price.
          offers: null,
        }),
      ],
    }),
  };
}
