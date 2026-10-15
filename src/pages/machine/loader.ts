import { data, type LoaderFunctionArgs } from "react-router";
import { findMachine, machinePath, machinePhotos, type MachineType } from "~/entities/machine";
import { siteConfig } from "~/shared/config";
import { galleryPhotoSizes } from "~/shared/lib";
import { pageHead, photoPreload, serviceNode, singleOffer, weeklyOffer } from "~/shared/seo";

export function machineHead(machine: MachineType) {
  const [mainPhoto] = machinePhotos(machine);
  const offer =
    machine.price === siteConfig.prices.set
      ? weeklyOffer(
          `${machine.title} rental`,
          machine.price,
          `${machine.title}, per week. Repairs and old-machine haul-away included.`,
        )
      : singleOffer();
  return pageHead({
    path: machinePath(machine),
    kind: "machine",
    title: machine.page.metaTitle,
    description: machine.page.metaDescription,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Machines", path: "/machines/" },
      { name: machine.title, path: machinePath(machine) },
    ],
    jsonLd: [
      serviceNode({
        name: machine.page.h1,
        description: machine.page.metaDescription,
        path: machinePath(machine),
        offers: offer,
      }),
    ],
    preloads: mainPhoto ? [photoPreload({ src: mainPhoto.src, sizes: galleryPhotoSizes })] : [],
  });
}

export function loader({ params }: LoaderFunctionArgs) {
  const machine = findMachine(params.slug ?? "");
  if (!machine) throw data("Not found", { status: 404 });
  return { head: machineHead(machine), slug: machine.slug };
}
