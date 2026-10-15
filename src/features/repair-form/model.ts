// The repair request (/repair/) for a machine rented from us: its choices and the
// server-side checks. The page's action (pages/repair/action.ts) sends it through Web3Forms.
import type { I18n } from "~/shared/i18n";
import { PHONE_PATTERN, field, type FieldErrorMap, type Validation } from "~/shared/lib/form-data";

// The choices, in the language of the page (the posted value is the label). The last machine
// option ("Not sure") and the first time ("Any time") are the defaults.
export function repairChoices({ d }: I18n) {
  const machines = d.repair.machineOptions;
  const times = d.repair.timeOptions;
  return { machines, times, anyMachine: machines[machines.length - 1], anyTime: times[0] };
}

export interface RepairValues {
  name: string;
  phone: string;
  address: string;
  machine: string;
  problem: string;
  bestTime: string;
}

export const emptyRepair = (i18n: I18n): RepairValues => {
  const choices = repairChoices(i18n);
  return { name: "", phone: "", address: "", machine: choices.anyMachine, problem: "", bestTime: choices.anyTime };
};

export function readRepair(form: FormData, i18n: I18n): RepairValues {
  const choices = repairChoices(i18n);
  return {
    name: field(form, "name"),
    phone: field(form, "phone"),
    address: field(form, "address"),
    machine: field(form, "machine") || choices.anyMachine,
    problem: field(form, "problem"),
    bestTime: field(form, "bestTime") || choices.anyTime,
  };
}

export function validateRepair(values: RepairValues, i18n: I18n): Validation<RepairValues> {
  const { forms, repair } = i18n.d;
  const choices = repairChoices(i18n);
  const errors: FieldErrorMap = {};
  if (!values.name) errors.name = forms.errors.nameMissing;
  else if (values.name.length < 2) errors.name = forms.errors.nameShort;
  if (!values.phone) errors.phone = forms.errors.phoneMissing;
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = forms.errors.phoneInvalid;
  if (!values.address) errors.address = repair.errors.address;
  if (!values.problem) errors.problem = repair.errors.problemMissing;
  else if (values.problem.length < 5) errors.problem = repair.errors.problemShort;

  if (Object.keys(errors).length) return { ok: false, values, errors };
  return {
    ok: true,
    values,
    fields: {
      subject: i18n.format(repair.subject, { name: values.name }),
      name: values.name,
      phone: values.phone,
      address_or_postal_code: values.address,
      machine: choices.machines.includes(values.machine) ? values.machine : choices.anyMachine,
      problem: values.problem,
      best_time: choices.times.includes(values.bestTime) ? values.bestTime : choices.anyTime,
    },
  };
}
