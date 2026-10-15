import { data, type LoaderFunctionArgs } from "react-router";
import { cityPath, findCity, type City } from "~/entities/area";
import { pageHead, serviceNode } from "~/shared/seo";

export const cityHead = (city: City) =>
  pageHead({
    path: cityPath(city),
    kind: "city",
    title: city.metaTitle,
    description: city.metaDescription,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Areas", path: "/areas/" },
      { name: city.name, path: cityPath(city) },
    ],
    jsonLd: [
      serviceNode({
        name: `Washer and dryer rental in ${city.name}`,
        description: city.metaDescription,
        path: cityPath(city),
        areaServed: { "@type": "City", name: city.name },
      }),
    ],
  });

export function loader({ params }: LoaderFunctionArgs) {
  const city = findCity(params.city ?? "");
  if (!city) throw data("Not found", { status: 404 });
  return { head: cityHead(city), city };
}
