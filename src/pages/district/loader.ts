import { data, type LoaderFunctionArgs } from "react-router";
import { cityPath, districtPath, findDistrict, type District } from "~/entities/area";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { pageHead, serviceNode, torontoPlace } from "~/shared/seo";

export const districtHead = (i18n: I18n, district: District) => {
  const { d, format } = i18n;
  const toronto = d.areas.cities.toronto;
  return pageHead({
    path: districtPath(district),
    kind: "district",
    title: district.metaTitle,
    description: district.metaDescription,
    breadcrumbs: [
      { name: d.pages.home.name, path: "/" },
      { name: d.pages.areas.name, path: pagePaths.areas },
      { name: toronto.name, path: cityPath({ slug: "toronto" }) },
      { name: district.name, path: districtPath(district) },
    ],
    jsonLd: [
      serviceNode(i18n, {
        name: format(d.jsonLd.serviceInDistrict, { place: district.name }),
        description: district.metaDescription,
        path: districtPath(district),
        areaServed: torontoPlace(i18n, district.name),
      }),
    ],
  });
};

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const district = findDistrict(i18n.d, args.params.district ?? "");
  if (!district) throw data("Not found", { status: 404 });
  return { head: districtHead(i18n, district), slug: district.slug };
}
