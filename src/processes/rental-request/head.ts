import { startPage } from "~/shared/config";
import { pageHead } from "~/shared/seo";
import { STEP_PATHS } from "./model";

const crumbs = [
  { name: "Home", path: "/" },
  { name: startPage.name, path: startPage.path },
];

// Step 1 is the page to find and link to; the later steps and the confirmation are noindex.
export const stepHeads = {
  machine: () =>
    pageHead({
      path: STEP_PATHS.machine,
      kind: "start",
      title: startPage.metaTitle,
      description: startPage.metaDescription,
      breadcrumbs: crumbs,
    }),
  details: () =>
    pageHead({
      path: STEP_PATHS.details,
      kind: "start",
      noindex: true,
      title: "Your Space: Step 2 of 3 | GTA Washer & Dryer Rentals",
      description: "Step 2 of the rental request: postal code, closet width, dryer outlet and the way in.",
      breadcrumbs: crumbs,
    }),
  contact: () =>
    pageHead({
      path: STEP_PATHS.contact,
      kind: "start",
      noindex: true,
      title: "How to Reach You: Step 3 of 3 | GTA Washer & Dryer Rentals",
      description: "Step 3 of the rental request: your name, phone number and a preferred day.",
      breadcrumbs: crumbs,
    }),
  done: () =>
    pageHead({
      path: STEP_PATHS.done,
      kind: "start",
      noindex: true,
      title: "Request Sent | GTA Washer & Dryer Rentals",
      description: "Your rental request is sent. We reply with the machine, the total and the start date.",
      breadcrumbs: crumbs,
    }),
};
