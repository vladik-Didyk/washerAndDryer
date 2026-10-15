import { data, type LoaderFunctionArgs } from "react-router";
import { findMachine, machinePath, machinePhotos, type MachineType } from "~/entities/machine";
import { getPrice, requestI18n } from "~/entities/offer";
import { pagePaths, requestTimeOf } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { galleryPhotoSizes } from "~/shared/lib";
import { pageHead, photoPreload, serviceNode, singleOffer, weeklyOffer } from "~/shared/seo";

export function machineHead(i18n: I18n, machine: MachineType, now: number) {
  const { d, format } = i18n;
  const [mainPhoto] = machinePhotos(machine);
  const offer =
    machine.item === "set"
      ? weeklyOffer(
          format(d.jsonLd.machineOffer.name, { title: machine.title }),
          getPrice("set", now).current,
          format(d.jsonLd.machineOffer.description, { title: machine.title }),
        )
      : singleOffer(i18n);
  return pageHead({
    path: machinePath(machine),
    kind: "machine",
    title: machine.page.metaTitle,
    description: machine.page.metaDescription,
    breadcrumbs: [
      { name: d.pages.home.name, path: "/" },
      { name: d.pages.machines.name, path: pagePaths.machines },
      { name: machine.title, path: machinePath(machine) },
    ],
    jsonLd: [
      serviceNode(i18n, {
        name: machine.page.h1,
        description: machine.page.metaDescription,
        path: machinePath(machine),
        offers: offer,
      }),
    ],
    preloads: mainPhoto ? [photoPreload({ src: mainPhoto.src, sizes: galleryPhotoSizes })] : [],
  });
}

export async function loader(args: LoaderFunctionArgs) {
  const i18n = await requestI18n(args);
  const machine = findMachine(i18n.d, args.params.slug ?? "");
  if (!machine) throw data("Not found", { status: 404 });
  return { head: machineHead(i18n, machine, requestTimeOf(args.context)), slug: machine.slug };
}
