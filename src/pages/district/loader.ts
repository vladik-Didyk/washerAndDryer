import { data, type LoaderFunctionArgs } from "react-router";
import { districtPath, findDistrict, type District } from "~/entities/area";
import { pageHead, serviceNode, torontoPlace } from "~/shared/seo";

export const districtHead = (district: District) =>
  pageHead({
    path: districtPath(district),
    kind: "district",
    title: district.metaTitle,
    description: district.metaDescription,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Areas", path: "/areas/" },
      { name: "Toronto", path: "/toronto/" },
      { name: district.name, path: districtPath(district) },
    ],
    jsonLd: [
      serviceNode({
        name: `Washer and dryer rental in ${district.name}, Toronto`,
        description: district.metaDescription,
        path: districtPath(district),
        areaServed: torontoPlace(district.name),
      }),
    ],
  });

export function loader({ params }: LoaderFunctionArgs) {
  const district = findDistrict(params.district ?? "");
  if (!district) throw data("Not found", { status: 404 });
  return { head: districtHead(district), district };
}
