import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMailer, post, testContext, unwrap } from "~/test/context";
import { action } from "./action";

const valid = {
  name: "Pat Landlord",
  phone: "(416) 555-0199",
  email: "",
  address: "12 Example St, Toronto",
  units: "4",
  setup: "Hookups only",
  machineType: "Stackable pair",
  option: "I rent the machines for my units",
  notes: "",
};

let mail = mockMailer();
const run = (fields: Record<string, string>, env = {}) =>
  action({ request: post("/landlords/quote/", fields), context: testContext({ FORM_MAILER: mail.mailer, ...env }), params: {} } as never);

describe("landlord quote action", () => {
  beforeEach(() => {
    mail = mockMailer();
  });

  it("returns field errors and sends nothing when the form is empty", async () => {
    const { data, status } = unwrap<{ status: string; errors: Record<string, string> }>(await run({}));
    expect(status).toBe(400);
    expect(data.status).toBe("invalid");
    expect(data.errors).toMatchObject({
      name: "Enter your name.",
      phone: "Enter your phone number.",
      address: "Enter the address or the city.",
      units: "Enter the number of units.",
      setup: "Choose what's there now.",
      option: "Choose how you'd like to do it.",
    });
    expect(mail.calls).toHaveLength(0);
  });

  it("checks the phone, email and units", async () => {
    const { data } = unwrap<{ errors: Record<string, string> }>(
      await run({ ...valid, phone: "123", email: "nope", units: "2.5" }),
    );
    expect(data.errors).toEqual({
      phone: "Enter a valid phone number, with area code.",
      email: "Enter a valid email address, or leave it empty.",
      units: "Enter a whole number, 1 or more.",
    });
  });

  it("emails the quote to the business, in English, one line per field", async () => {
    const result = unwrap<{ status: string }>(await run({ ...valid, email: "pat@example.com" }));
    expect(result.data.status).toBe("sent");
    expect(mail.calls).toHaveLength(1);
    const message = mail.calls[0];
    expect(message.to).toBe("vladik.didyk@gmail.com");
    expect(message.from).toEqual({ email: "forms@nearbygta.com", name: "GTA Washer & Dryer Rentals website" });
    expect(message.replyTo).toBe("pat@example.com");
    expect(message.subject).toBe("Landlord quote request — Pat Landlord");
    expect(message.text.split("\n")).toEqual([
      "Language: English",
      "Name: Pat Landlord",
      "Phone: (416) 555-0199",
      "Email: pat@example.com",
      "Building: 12 Example St, Toronto",
      "Units: 4",
      "Current setup: Hookups only",
      "Machine type: Stackable pair",
      "Option: I rent the machines for my units",
      "Notes: None",
    ]);
  });

  it("has no Reply-To when the customer gave no email", async () => {
    await run(valid);
    expect(mail.calls[0].replyTo).toBeUndefined();
  });

  it("reports a send error when the email can't be sent", async () => {
    const { data, status } = unwrap<{ status: string }>(await run(valid, { FORM_MAILER: mockMailer(true).mailer }));
    expect(status).toBe(502);
    expect(data.status).toBe("error");
  });

  it("does not send without the email binding", async () => {
    const { data } = unwrap<{ status: string }>(await run(valid, { FORM_MAILER: undefined }));
    expect(data.status).toBe("error");
    expect(mail.calls).toHaveLength(0);
  });

  it("logs instead of sending with FORMS_DRY_RUN=1", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const { data } = unwrap<{ status: string }>(await run(valid, { FORMS_DRY_RUN: "1" }));
    expect(data.status).toBe("sent");
    expect(mail.calls).toHaveLength(0);
    expect(log.mock.calls[0][1]).toContain("Landlord quote request");
    log.mockRestore();
  });

  it("drops a submission with the honeypot ticked", async () => {
    const { data } = unwrap<{ status: string }>(await run({ ...valid, botcheck: "on" }));
    expect(data.status).toBe("sent");
    expect(mail.calls).toHaveLength(0);
  });
});
