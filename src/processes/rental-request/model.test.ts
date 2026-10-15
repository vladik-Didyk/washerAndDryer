import { describe, expect, it } from "vitest";
import { machineSlugs } from "~/entities/machine";
import { testI18n } from "~/test/context";
import { firstOpenStep, machineChoices, rentalRequestFields, validateContactStep, validateDetailsStep, validateMachineStep } from "./model";

const i18n = await testI18n();

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
};

describe("step 1: machine type", () => {
  it("requires one of the choices", () => {
    expect(validateMachineStep(form({}), i18n)).toMatchObject({ ok: false, errors: { machine: expect.any(String) } });
    expect(validateMachineStep(form({ machine: "fridge" }), i18n).ok).toBe(false);
    expect(validateMachineStep(form({ machine: "stackable" }), i18n)).toMatchObject({ ok: true, fields: { machine: "stackable" } });
    expect(validateMachineStep(form({ machine: "not-sure" }), i18n).ok).toBe(true);
  });
});

describe("step 2: your space", () => {
  const valid = { postal: "m5v2t6", closetWidth: '24"', outlet: "4-prong", access: "elevator", floor: "12th floor" };

  it("lists every missing field", () => {
    const result = validateDetailsStep(form({}), i18n);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["access", "closetWidth", "outlet", "postal"]);
      expect(result.errors.postal).toBe("Enter your postal code.");
    }
  });

  it("rejects a postal code that isn't Canadian, with the checker's message", () => {
    const result = validateDetailsStep(form({ ...valid, postal: "12345" }), i18n);
    expect(result).toMatchObject({ ok: false, errors: { postal: "Enter a valid Canadian postal code, like M5V 2T6." } });
  });

  it("formats the postal code and finds the city", () => {
    const result = validateDetailsStep(form(valid), i18n);
    expect(result).toMatchObject({ ok: true, fields: { postal: "M5V 2T6", postalStatus: "yes" } });
  });

  it("accepts a code outside our cities, to confirm by phone", () => {
    const result = validateDetailsStep(form({ ...valid, postal: "K1A 0B1" }), i18n);
    expect(result).toMatchObject({ ok: true, fields: { postalStatus: "outside" } });
    const rural = validateDetailsStep(form({ ...valid, postal: "L0J 1C0" }), i18n);
    expect(rural).toMatchObject({ ok: true, fields: { postalStatus: "unsure" } });
  });

  it("checks the outlet and the way in", () => {
    const result = validateDetailsStep(form({ ...valid, outlet: "5-prong", access: "crane" }), i18n);
    expect(result).toMatchObject({ ok: false, errors: { outlet: expect.any(String), access: expect.any(String) } });
  });
});

describe("step 3: how to reach you", () => {
  const today = "2026-10-15";
  const valid = { name: "Alex", phone: "416-555-0123", email: "", preferredDay: "", notes: "" };

  it("requires a name and a phone number", () => {
    const result = validateContactStep(form({}), today, i18n);
    expect(result).toMatchObject({
      ok: false,
      errors: { name: "Enter your name.", phone: "Enter your phone number." },
    });
  });

  it("checks the optional email and the preferred day", () => {
    const result = validateContactStep(form({ ...valid, email: "alex@", preferredDay: "2026-10-14" }), today, i18n);
    expect(result).toMatchObject({
      ok: false,
      errors: {
        email: "Enter a valid email address, or leave it empty.",
        preferredDay: "Choose today or a later date.",
      },
    });
    expect(validateContactStep(form({ ...valid, preferredDay: today }), today, i18n).ok).toBe(true);
  });
});

describe("progress and the email", () => {
  it("sends a visitor to the first step not done", () => {
    expect(firstOpenStep({})).toBe("machine");
    expect(firstOpenStep({ machine: { machine: "stackable" } })).toBe("details");
  });

  it("builds the Web3Forms fields from all three steps", () => {
    const fields = rentalRequestFields(
      {
        machine: { machine: "washer-only" },
        details: { postal: "L5B 1M2", closetWidth: "27 in", outlet: "not-sure", access: "stairs", floor: "", postalStatus: "yes" },
      },
      { name: "Alex", phone: "416-555-0123", email: "", preferredDay: "", notes: "" },
      i18n,
    );
    expect(fields).toEqual({
      language: "English",
      subject: "New rental request — Alex",
      name: "Alex",
      phone: "416-555-0123",
      email: "Not given",
      machine_type: "Washer only",
      postal_code: "L5B 1M2",
      area: "West Cooksville, Mississauga",
      closet_width: "27 in",
      dryer_outlet: "Not sure",
      access: "Stairs",
      floor: "Not given",
      preferred_day: "Not given",
      notes: "None",
    });
  });
});

describe("the forms registry and the machine types", () => {
  it("offers the four sets in the order of entities/machine, then one machine and not sure", () => {
    const sets = machineSlugs.filter((slug) => slug !== "single-machine");
    expect(machineChoices(i18n).map((choice) => choice.value)).toEqual([...sets, "washer-only", "dryer-only", "not-sure"]);
  });

  it("writes the email in English from a Spanish page, with the language first", async () => {
    const spanish = await testI18n("es");
    const fields = rentalRequestFields(
      {
        machine: { machine: "stackable" },
        details: { postal: "M5V 2T6", closetWidth: "61 cm", outlet: "4-prong", access: "elevator", floor: "", postalStatus: "yes" },
      },
      { name: "Ana", phone: "416-555-0123", email: "", preferredDay: "", notes: "" },
      spanish,
    );
    expect(Object.keys(fields)[0]).toBe("language");
    expect(fields).toMatchObject({
      language: "Spanish",
      subject: "New rental request — Ana",
      machine_type: "Stackable pair",
      area: "Downtown Toronto",
      access: "Elevator",
      email: "Not given",
    });
  });
});
