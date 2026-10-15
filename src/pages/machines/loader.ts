import type { LoaderFunctionArgs } from "react-router";
import { machinesPage } from "~/shared/config";
import { machinePath, machineTypes } from "~/entities/machine";
import { itemList, pageHead, serviceNode } from "~/shared/seo";

export function loader(_args: LoaderFunctionArgs) {
  return {
    head: pageHead({
      path: machinesPage.path,
      kind: "machines",
      title: machinesPage.metaTitle,
      description: machinesPage.metaDescription,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Machines", path: machinesPage.path },
      ],
      // The five types as a list, and the two weekly prices.
      jsonLd: [
        itemList(
          "Washer and dryer types for rent",
          machinesPage.path,
          machineTypes.map((machine) => ({ name: machine.title, path: machinePath(machine) })),
        ),
        serviceNode({
          name: "Washer and dryer rental",
          description: machinesPage.metaDescription,
          path: machinesPage.path,
        }),
      ],
    }),
  };
}
