import type { LoaderFunctionArgs } from "react-router";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { heroPhoto } from "~/shared/lib";
import { localBusiness, pageHead, photoPreload } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  return {
    head: pageHead({
      path: pagePaths.home,
      kind: "home",
      title: i18n.d.pages.home.title,
      description: i18n.d.pages.home.description,
      jsonLd: [localBusiness(i18n)],
      preloads: [photoPreload(heroPhoto.narrow), photoPreload(heroPhoto.wide)],
    }),
  };
}
