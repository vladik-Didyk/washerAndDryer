import type { LoaderFunctionArgs } from "react-router";
import { getMachineTypes, machinePath } from "~/entities/machine";
import { requestI18n } from "~/entities/offer";
import { pagePaths } from "~/shared/config";
import { itemList, pageHead, serviceNode } from "~/shared/seo";

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const { d } = i18n;
  return {
    head: pageHead({
      path: pagePaths.machines,
      kind: "machines",
      title: d.pages.machines.title,
      description: d.pages.machines.description,
      breadcrumbs: [
        { name: d.pages.home.name, path: "/" },
        { name: d.pages.machines.name, path: pagePaths.machines },
      ],
      // The five types as a list, and the two weekly prices.
      jsonLd: [
        itemList(
          d.jsonLd.machinesList,
          pagePaths.machines,
          getMachineTypes(d).map((machine) => ({ name: machine.title, path: machinePath(machine) })),
        ),
        serviceNode(i18n, {
          name: d.jsonLd.serviceType,
          description: d.pages.machines.description,
          path: pagePaths.machines,
        }),
      ],
    }),
  };
}
