// The rental request process. Its pages are the route modules in ./routes (wired up in
// src/app/routes.ts); this public API is for tests and documentation.
export {
  ACCESS_CHOICES,
  MACHINE_CHOICES,
  OUTLET_CHOICES,
  STEPS,
  STEP_PATHS,
  firstOpenStep,
  rentalRequestFields,
  validateContactStep,
  validateDetailsStep,
  validateMachineStep,
  type RentalDraft,
} from "./model";
