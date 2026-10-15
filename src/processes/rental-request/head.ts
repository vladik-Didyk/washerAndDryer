import { pagePaths } from "~/shared/config";
import type { I18n } from "~/shared/i18n";
import { pageHead } from "~/shared/seo";
import { STEPS, STEP_PATHS } from "./model";

const crumbs = ({ d }: I18n) => [
  { name: d.pages.home.name, path: "/" },
  { name: d.pages.start.name, path: pagePaths.start },
];

// "Step 2 of 3" in a title or description.
const stepText = (i18n: I18n, text: string, step: number) => i18n.format(text, { step, steps: STEPS.length });

// Step 1 is the page to find and link to; the later steps and the confirmation are noindex.
export const stepHeads = {
  machine: (i18n: I18n) =>
    pageHead({
      path: STEP_PATHS.machine,
      kind: "start",
      title: i18n.d.pages.start.title,
      description: i18n.d.pages.start.description,
      breadcrumbs: crumbs(i18n),
    }),
  details: (i18n: I18n) =>
    pageHead({
      path: STEP_PATHS.details,
      kind: "start",
      noindex: true,
      title: stepText(i18n, i18n.d.start.heads.details.title, 2),
      description: stepText(i18n, i18n.d.start.heads.details.description, 2),
      breadcrumbs: crumbs(i18n),
    }),
  contact: (i18n: I18n) =>
    pageHead({
      path: STEP_PATHS.contact,
      kind: "start",
      noindex: true,
      title: stepText(i18n, i18n.d.start.heads.contact.title, 3),
      description: stepText(i18n, i18n.d.start.heads.contact.description, 3),
      breadcrumbs: crumbs(i18n),
    }),
  done: (i18n: I18n) =>
    pageHead({
      path: STEP_PATHS.done,
      kind: "start",
      noindex: true,
      title: i18n.d.start.heads.done.title,
      description: i18n.d.start.heads.done.description,
      breadcrumbs: crumbs(i18n),
    }),
};
