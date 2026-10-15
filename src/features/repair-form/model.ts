// The repair request (/repair/) for a machine rented from us: its choices and the
// server-side checks. The page's action (pages/repair/action.ts) sends it through Web3Forms.
import { PHONE_PATTERN, field, type FieldErrorMap, type Validation } from "~/shared/lib/form-data";

export const MACHINE_OPTIONS = ["Washer", "Dryer", "Stackable pair", "One-piece laundry centre", "Not sure"];
export const TIME_OPTIONS = ["Any time", "Morning", "Afternoon", "Evening"];

export interface RepairValues {
  name: string;
  phone: string;
  address: string;
  machine: string;
  problem: string;
  bestTime: string;
}

export const EMPTY_VALUES: RepairValues = {
  name: "",
  phone: "",
  address: "",
  machine: "Not sure",
  problem: "",
  bestTime: "Any time",
};

export function readRepair(form: FormData): RepairValues {
  return {
    name: field(form, "name"),
    phone: field(form, "phone"),
    address: field(form, "address"),
    machine: field(form, "machine") || "Not sure",
    problem: field(form, "problem"),
    bestTime: field(form, "bestTime") || "Any time",
  };
}

export function validateRepair(values: RepairValues): Validation<RepairValues> {
  const errors: FieldErrorMap = {};
  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!values.phone) errors.phone = "Enter your phone number.";
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = "Enter a valid phone number, with area code.";
  if (!values.address) errors.address = "Enter your address or postal code.";
  if (!values.problem) errors.problem = "Tell us what the machine is doing.";
  else if (values.problem.length < 5) errors.problem = "Tell us a little more about the problem.";

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return {
    ok: true,
    values,
    fields: {
      subject: `Repair request — ${values.name}`,
      name: values.name,
      phone: values.phone,
      address_or_postal_code: values.address,
      machine: MACHINE_OPTIONS.includes(values.machine) ? values.machine : "Not sure",
      problem: values.problem,
      best_time: TIME_OPTIONS.includes(values.bestTime) ? values.bestTime : "Any time",
    },
  };
}
