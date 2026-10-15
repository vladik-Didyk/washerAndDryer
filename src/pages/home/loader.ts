import type { LoaderFunctionArgs } from "react-router";
import { homePage } from "~/shared/config";
import { heroPhoto } from "~/shared/lib";
import { localBusiness, pageHead, photoPreload } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: homePage.path,
      kind: "home",
      title: homePage.metaTitle,
      description: homePage.metaDescription,
      jsonLd: [localBusiness()],
      preloads: [photoPreload(heroPhoto.narrow), photoPreload(heroPhoto.wide)],
    }),
  };
}
