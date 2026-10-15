import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TEST_KEY, mockWeb3Forms, post, testContext, unwrap } from "~/test/context";
import { action } from "./action";

const valid = {
  name: "Sam Renter",
  phone: "437 555 0100",
  address: "M5V 2T6",
  machine: "Dryer",
  bestTime: "Evening",
  problem: "Doesn't heat any more",
};

const run = (fields: Record<string, string>, env = {}) =>
  action({ request: post("/repair/", fields), context: testContext(env), params: {} } as never);

describe("repair action", () => {
  let web3: ReturnType<typeof mockWeb3Forms>;
  beforeEach(() => {
    web3 = mockWeb3Forms();
    vi.stubGlobal("fetch", vi.fn(web3.fetchMock));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("returns field errors for an empty form", async () => {
    const { data, status } = unwrap<{ status: string; errors: Record<string, string> }>(await run({}));
    expect(status).toBe(400);
    expect(data.errors).toEqual({
      name: "Enter your name.",
      phone: "Enter your phone number.",
      address: "Enter your address or postal code.",
      problem: "Tell us what the machine is doing.",
    });
    expect(web3.calls).toHaveLength(0);
  });

  it("asks for more than a word or two about the problem", async () => {
    const { data } = unwrap<{ errors: Record<string, string> }>(await run({ ...valid, problem: "bad" }));
    expect(data.errors).toEqual({ problem: "Tell us a little more about the problem." });
  });

  it("posts the repair request to Web3Forms with the key from the environment", async () => {
    const { data } = unwrap<{ status: string }>(await run(valid));
    expect(data.status).toBe("sent");
    expect(web3.calls).toHaveLength(1);
    expect(web3.calls[0].body).toEqual({
      access_key: TEST_KEY,
      from_name: "GTA Washer & Dryer Rentals website",
      subject: "Repair request — Sam Renter",
      name: "Sam Renter",
      phone: "437 555 0100",
      address_or_postal_code: "M5V 2T6",
      machine: "Dryer",
      problem: "Doesn't heat any more",
      best_time: "Evening",
    });
  });
});
