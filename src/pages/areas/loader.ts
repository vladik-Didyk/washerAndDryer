import type { LoaderFunctionArgs } from "react-router";
import { getDistricts } from "~/entities/area";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { areaServed, pageHead, serviceNode, torontoPlace } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  return {
    head: pageHead({
      path: pagePaths.areas,
      kind: "areas",
      title: d.pages.areas.title,
      description: d.pages.areas.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.areas.name, path: pagePaths.areas },
      ],
      // One service, every city and Toronto district.
      jsonLd: [
        serviceNode(i18n, {
          name: d.jsonLd.serviceGta,
          description: d.pages.areas.description,
          path: pagePaths.areas,
          areaServed: [...areaServed(i18n), ...getDistricts(d).map((district) => torontoPlace(i18n, district.name))],
        }),
      ],
    }),
  };
}
