// The forms registry: every form renders from its definition, and validateForm gives the
// same messages, values and ids the hand-written forms had.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider, loadAllDictionaries } from "~/shared/i18n";
import { testI18n } from "~/test/context";
import { emptyValues, fieldOptions, formField, formFields, forms, validateForm, type FormKey } from "./index";
import { FormFields } from "./ui";

await loadAllDictionaries();
const english = await testI18n();
const spanish = await testI18n("es");

const post = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
};

const html = (form: FormKey, i18n = english, errors = {}) =>
  renderToString(
    <I18nProvider value={i18n}>
      <FormFields form={form} values={emptyValues(form, i18n)} errors={errors} today="2026-10-15" />
    </I18nProvider>,
  );

describe("the registry", () => {
  it("renders every field of every form, with the form's ids", () => {
    for (const form of Object.keys(forms) as FormKey[]) {
      const out = html(form);
      for (const def of formFields(form)) {
        expect(out, `${form}.${def.name}`).toContain(`name="${def.name}"`);
        if (def.kind !== "choice") expect(out).toContain(`id="${forms[form].idPrefix}${def.id ?? def.name}"`);
      }
    }
    expect(html("landlordQuote")).toContain('id="quote-machine"');
    expect(html("repair")).toContain('id="repair-time"');
    expect(html("startContact")).toContain('min="2026-10-15"');
  });

  it("shows option labels in the page's language and posts English values", () => {
    const setup = formField("landlordQuote", "setup");
    expect(fieldOptions(setup, english).map((option) => option.value)).toEqual([
      "No machines",
      "Old machines to replace",
      "Hookups only",
    ]);
    expect(fieldOptions(setup, spanish).map((option) => option.value)).toEqual(
      fieldOptions(setup, english).map((option) => option.value),
    );
    const machine = fieldOptions(formField("landlordQuote", "machineType"), spanish);
    expect(machine[1]).toEqual({ value: "Stackable pair", label: "Lavadora y secadora apilables" });
    expect(html("landlordQuote", spanish)).toContain('value="Stackable pair">Lavadora y secadora apilables</option>');
  });

  it("puts every error under its field", () => {
    const out = html("repair", english, { phone: "Enter your phone number." });
    expect(out).toContain('id="repair-phone-error"');
    expect(out).toContain('aria-describedby="repair-phone-error"');
  });
});

describe("validateForm", () => {
  it("gives the landlord quote's messages", () => {
    const result = validateForm("landlordQuote", post({ units: "0", email: "x" }), english);
    expect(result).toEqual({
      ok: false,
      values: expect.objectContaining({ units: "0", machineType: "Not sure" }),
      errors: {
        name: "Enter your name.",
        phone: "Enter your phone number.",
        email: "Enter a valid email address, or leave it empty.",
        address: "Enter the address or the city.",
        units: "Enter a whole number, 1 or more.",
        setup: "Choose what's there now.",
        option: "Choose how you'd like to do it.",
      },
    });
    expect(validateForm("landlordQuote", post({ name: "A" }), english)).toMatchObject({
      errors: { name: "Name must be at least 2 characters.", units: "Enter the number of units." },
    });
  });

  it("gives the repair request's messages and defaults", () => {
    expect(validateForm("repair", post({ problem: "bad" }), english)).toMatchObject({
      values: { machine: "Not sure", bestTime: "Any time" },
      errors: {
        address: "Enter your address or postal code.",
        problem: "Tell us a little more about the problem.",
      },
    });
  });

  it("gives the rental steps' messages", () => {
    expect(validateForm("startMachine", post({ machine: "fridge" }), english)).toMatchObject({
      errors: { machine: 'Choose a machine type, or "Not sure yet".' },
    });
    expect(validateForm("startDetails", post({ postal: "X", closetWidth: "w".repeat(61), floor: "f".repeat(61) }), english)).toMatchObject({
      errors: {
        postal: "Enter a valid Canadian postal code, like M5V 2T6.",
        closetWidth: 'Keep it short, like 24" or 61 cm.',
        outlet: 'Choose the dryer outlet, or "Not sure".',
        access: "Choose how we get the machine in.",
        floor: 'Keep it short, like "3rd floor" or "basement".',
      },
    });
    const contact = (fields: Record<string, string>) => validateForm("startContact", post(fields), english, { today: "2026-10-15" });
    expect(contact({ name: "Al", phone: "4165550123", preferredDay: "soon", notes: "n".repeat(2001) })).toMatchObject({
      errors: { preferredDay: "Choose a date.", notes: "Keep the notes under 2,000 characters." },
    });
    expect(contact({ name: "Al", phone: "4165550123", preferredDay: "2026-10-14" })).toMatchObject({
      errors: { preferredDay: "Choose today or a later date." },
    });
    expect(contact({ name: "Al", phone: "4165550123", preferredDay: "2026-10-15" }).ok).toBe(true);
  });

  it("answers in the page's language", () => {
    const es = validateForm("startDetails", post({}), spanish);
    expect(es.ok).toBe(false);
    if (!es.ok) expect(Object.keys(es.errors).sort()).toEqual(["access", "closetWidth", "outlet", "postal"]);
  });
});
