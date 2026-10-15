import type { LoaderFunctionArgs } from "react-router";
import { areasPage } from "~/shared/config";
import { districts } from "~/entities/area";
import { areaServed, pageHead, serviceNode, torontoPlace } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: areasPage.path,
      kind: "areas",
      title: areasPage.metaTitle,
      description: areasPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Areas", path: areasPage.path },
      ],
      // One service, every city and Toronto district.
      jsonLd: [
        serviceNode({
          name: "Washer and dryer rental in Toronto and the GTA",
          description: areasPage.metaDescription,
          path: areasPage.path,
          areaServed: [...areaServed(), ...districts.map((district) => torontoPlace(district.name))],
        }),
      ],
    }),
  };
}
