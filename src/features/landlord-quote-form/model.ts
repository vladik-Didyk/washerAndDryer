// The landlord quote request (/landlords/quote/): its choices and the server-side checks.
// The page's action (pages/landlord-quote/action.ts) sends the result through Web3Forms.
import { machineTypes } from "~/entities/machine";
import { EMAIL_PATTERN, PHONE_PATTERN, field, type FieldErrorMap, type Validation } from "~/shared/lib/form-data";

export const SETUP_OPTIONS = ["No machines", "Old machines to replace", "Hookups only"] as const;
export const OPTION_CHOICES = [
  "My tenants rent directly",
  "I rent the machines for my units",
  "Not sure yet",
] as const;
export const MACHINE_OPTIONS = [
  "Not sure",
  ...machineTypes.map((machine) => machine.title),
  "Different in each unit",
];

export interface LandlordQuoteValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  units: string;
  setup: string;
  machineType: string;
  option: string;
  notes: string;
}

export const EMPTY_VALUES: LandlordQuoteValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  units: "",
  setup: "",
  machineType: "Not sure",
  option: "",
  notes: "",
};

export function readLandlordQuote(form: FormData): LandlordQuoteValues {
  return {
    name: field(form, "name"),
    phone: field(form, "phone"),
    email: field(form, "email"),
    address: field(form, "address"),
    units: field(form, "units"),
    setup: field(form, "setup"),
    machineType: field(form, "machineType") || "Not sure",
    option: field(form, "option"),
    notes: field(form, "notes"),
  };
}

export function validateLandlordQuote(values: LandlordQuoteValues): Validation<LandlordQuoteValues> {
  const errors: FieldErrorMap = {};
  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!values.phone) errors.phone = "Enter your phone number.";
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = "Enter a valid phone number, with area code.";
  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address, or leave it empty.";
  }
  if (!values.address) errors.address = "Enter the address or the city.";
  if (!values.units) errors.units = "Enter the number of units.";
  else if (!/^\d+$/.test(values.units) || Number(values.units) < 1) {
    errors.units = "Enter a whole number, 1 or more.";
  }
  if (!(SETUP_OPTIONS as readonly string[]).includes(values.setup)) errors.setup = "Choose what's there now.";
  if (!(OPTION_CHOICES as readonly string[]).includes(values.option)) {
    errors.option = "Choose how you'd like to do it.";
  }
  const machineType = MACHINE_OPTIONS.includes(values.machineType) ? values.machineType : "Not sure";

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return {
    ok: true,
    values,
    fields: {
      subject: `Landlord quote request — ${values.name}`,
      name: values.name,
      phone: values.phone,
      email: values.email || "Not given",
      building: values.address,
      units: values.units,
      current_setup: values.setup,
      machine_type: machineType,
      option: values.option,
      notes: values.notes || "None",
    },
  };
}
