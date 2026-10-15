// The rental request process. Its pages are the route modules in ./routes (wired up in
// src/app/routes.ts); this public API is for tests and documentation.
export {
  STEPS,
  STEP_PATHS,
  accessChoices,
  firstOpenStep,
  machineChoices,
  outletChoices,
  rentalRequestFields,
  validateContactStep,
  validateDetailsStep,
  validateMachineStep,
  type RentalDraft,
} from "./model";
