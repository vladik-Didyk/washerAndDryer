import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TEST_KEY, mockWeb3Forms, post, testContext, unwrap } from "~/test/context";
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

const run = (fields: Record<string, string>, env = {}) =>
  action({ request: post("/landlords/quote/", fields), context: testContext(env), params: {} } as never);

describe("landlord quote action", () => {
  let web3: ReturnType<typeof mockWeb3Forms>;
  beforeEach(() => {
    web3 = mockWeb3Forms();
    vi.stubGlobal("fetch", vi.fn(web3.fetchMock));
  });
  afterEach(() => vi.unstubAllGlobals());

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
    expect(web3.calls).toHaveLength(0);
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

  it("posts the quote to Web3Forms with the key from the environment", async () => {
    const result = unwrap<{ status: string }>(await run(valid));
    expect(result.data.status).toBe("sent");
    expect(web3.calls).toHaveLength(1);
    expect(web3.calls[0].url).toBe("https://api.web3forms.com/submit");
    expect(web3.calls[0].body).toEqual({
      access_key: TEST_KEY,
      from_name: "GTA Washer & Dryer Rentals website",
      subject: "Landlord quote request — Pat Landlord",
      name: "Pat Landlord",
      phone: "(416) 555-0199",
      email: "Not given",
      building: "12 Example St, Toronto",
      units: "4",
      current_setup: "Hookups only",
      machine_type: "Stackable pair",
      option: "I rent the machines for my units",
      notes: "None",
    });
  });

  it("uses whatever key the environment holds (never one from the source)", async () => {
    await run(valid, { WEB3FORMS_KEY: "another-key" });
    expect(web3.calls[0].body.access_key).toBe("another-key");
  });

  it("reports a send error when Web3Forms refuses", async () => {
    vi.stubGlobal("fetch", vi.fn(mockWeb3Forms(false).fetchMock));
    const { data, status } = unwrap<{ status: string }>(await run(valid));
    expect(status).toBe(502);
    expect(data.status).toBe("error");
  });

  it("does not send without a key", async () => {
    const { data } = unwrap<{ status: string }>(await run(valid, { WEB3FORMS_KEY: "" }));
    expect(data.status).toBe("error");
    expect(web3.calls).toHaveLength(0);
  });

  it("logs instead of sending with FORMS_DRY_RUN=1", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const { data } = unwrap<{ status: string }>(await run(valid, { FORMS_DRY_RUN: "1" }));
    expect(data.status).toBe("sent");
    expect(web3.calls).toHaveLength(0);
    expect(log.mock.calls[0][1]).not.toContain(TEST_KEY);
    log.mockRestore();
  });

  it("drops a submission with the honeypot ticked", async () => {
    const { data } = unwrap<{ status: string }>(await run({ ...valid, botcheck: "on" }));
    expect(data.status).toBe("sent");
    expect(web3.calls).toHaveLength(0);
  });
});
