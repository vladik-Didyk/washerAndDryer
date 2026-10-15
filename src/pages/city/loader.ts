import { data, type LoaderFunctionArgs } from "react-router";
import { cityPath, findCity, type City } from "~/entities/area";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { pageHead, serviceNode } from "~/shared/seo";

export const cityHead = (i18n: I18n, city: City) => {
  const { d, format } = i18n;
  return pageHead({
    path: cityPath(city),
    kind: "city",
    title: city.metaTitle,
    description: city.metaDescription,
    breadcrumbs: [
      { name: d.pages.home.name, path: "/" },
      { name: d.pages.areas.name, path: pagePaths.areas },
      { name: city.name, path: cityPath(city) },
    ],
    jsonLd: [
      serviceNode(i18n, {
        name: format(d.jsonLd.serviceIn, { place: city.name }),
        description: city.metaDescription,
        path: cityPath(city),
        areaServed: { "@type": "City", name: city.name },
      }),
    ],
  });
};

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const city = findCity(i18n.d, args.params.city ?? "");
  if (!city) throw data("Not found", { status: 404 });
  return { head: cityHead(i18n, city), slug: city.slug };
}
