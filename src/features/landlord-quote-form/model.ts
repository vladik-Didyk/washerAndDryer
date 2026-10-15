// The landlord quote request (/landlords/quote/): its choices and the server-side checks.
// The page's action (pages/landlord-quote/action.ts) sends the result through Web3Forms.
import { getMachineTypes } from "~/entities/machine";
import type { I18n } from "~/shared/i18n";
import { EMAIL_PATTERN, PHONE_PATTERN, field, type FieldErrorMap, type Validation } from "~/shared/lib/form-data";

// The choices, in the language of the page. The posted value is the label itself, so the
// email reads the same as the form.
export function quoteChoices({ d }: I18n) {
  const { quote } = d.landlords;
  return {
    setup: quote.setupOptions,
    option: quote.optionChoices,
    machine: [quote.notSure, ...getMachineTypes(d).map((machine) => machine.title), quote.differentEachUnit],
    notSure: quote.notSure,
  };
}

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

export const emptyLandlordQuote = (i18n: I18n): LandlordQuoteValues => ({
  name: "",
  phone: "",
  email: "",
  address: "",
  units: "",
  setup: "",
  machineType: quoteChoices(i18n).notSure,
  option: "",
  notes: "",
});

export function readLandlordQuote(form: FormData, i18n: I18n): LandlordQuoteValues {
  return {
    name: field(form, "name"),
    phone: field(form, "phone"),
    email: field(form, "email"),
    address: field(form, "address"),
    units: field(form, "units"),
    setup: field(form, "setup"),
    machineType: field(form, "machineType") || quoteChoices(i18n).notSure,
    option: field(form, "option"),
    notes: field(form, "notes"),
  };
}

export function validateLandlordQuote(values: LandlordQuoteValues, i18n: I18n): Validation<LandlordQuoteValues> {
  const { forms, landlords } = i18n.d;
  const choices = quoteChoices(i18n);
  const errors: FieldErrorMap = {};
  if (!values.name) errors.name = forms.errors.nameMissing;
  else if (values.name.length < 2) errors.name = forms.errors.nameShort;
  if (!values.phone) errors.phone = forms.errors.phoneMissing;
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = forms.errors.phoneInvalid;
  if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = forms.errors.emailInvalid;
  if (!values.address) errors.address = landlords.quote.errors.address;
  if (!values.units) errors.units = landlords.quote.errors.unitsMissing;
  else if (!/^\d+$/.test(values.units) || Number(values.units) < 1) errors.units = landlords.quote.errors.unitsInvalid;
  if (!choices.setup.includes(values.setup)) errors.setup = landlords.quote.errors.setup;
  if (!choices.option.includes(values.option)) errors.option = landlords.quote.errors.option;
  const machineType = choices.machine.includes(values.machineType) ? values.machineType : choices.notSure;

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return {
    ok: true,
    values,
    fields: {
      subject: i18n.format(landlords.quote.subject, { name: values.name }),
      name: values.name,
      phone: values.phone,
      email: values.email || forms.notGiven,
      building: values.address,
      units: values.units,
      current_setup: values.setup,
      machine_type: machineType,
      option: values.option,
      notes: values.notes || forms.none,
    },
  };
}
