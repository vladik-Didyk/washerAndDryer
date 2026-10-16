import { beforeEach, describe, expect, it } from "vitest";
import { mockMailer, post, testContext, unwrap } from "~/test/context";
import { action } from "./action";

const valid = {
  name: "Sam Renter",
  phone: "437 555 0100",
  address: "M5V 2T6",
  machine: "Dryer",
  bestTime: "Evening",
  problem: "Doesn't heat any more",
};

let mail = mockMailer();
const run = (fields: Record<string, string>, env = {}) =>
  action({ request: post("/repair/", fields), context: testContext({ FORM_MAILER: mail.mailer, ...env }), params: {} } as never);

describe("repair action", () => {
  beforeEach(() => {
    mail = mockMailer();
  });

  it("returns field errors for an empty form", async () => {
    const { data, status } = unwrap<{ status: string; errors: Record<string, string> }>(await run({}));
    expect(status).toBe(400);
    expect(data.errors).toEqual({
      name: "Enter your name.",
      phone: "Enter your phone number.",
      address: "Enter your address or postal code.",
      problem: "Tell us what the machine is doing.",
    });
    expect(mail.calls).toHaveLength(0);
  });

  it("asks for more than a word or two about the problem", async () => {
    const { data } = unwrap<{ errors: Record<string, string> }>(await run({ ...valid, problem: "bad" }));
    expect(data.errors).toEqual({ problem: "Tell us a little more about the problem." });
  });

  it("emails the repair request to the business, in English", async () => {
    const { data } = unwrap<{ status: string }>(await run(valid));
    expect(data.status).toBe("sent");
    expect(mail.calls).toHaveLength(1);
    expect(mail.calls[0].subject).toBe("Repair request — Sam Renter");
    expect(mail.calls[0].text.split("\n")).toEqual([
      "Language: English",
      "Name: Sam Renter",
      "Phone: 437 555 0100",
      "Address or postal code: M5V 2T6",
      "Machine: Dryer",
      "Problem: Doesn't heat any more",
      "Best time: Evening",
    ]);
  });
});
