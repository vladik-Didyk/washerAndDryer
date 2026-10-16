import { describe, expect, it } from "vitest";
import { post, testContext, unwrap } from "~/test/context";
import { action } from "./action";

const run = (fields: Record<string, string>) =>
  action({ request: post("/account/", fields), context: testContext({}), params: {} } as never);

describe("sign-in action", () => {
  it("answers a valid email with 'opening soon'", async () => {
    const { data, status } = unwrap<{ status: string }>(await run({ email: "sam@example.com" }));
    expect(status).toBe(200);
    expect(data).toEqual({ status: "soon" });
  });

  it("asks again for an invalid email, keeping what was typed", async () => {
    const { data, status } = unwrap<{ status: string; email: string }>(await run({ email: "sam@" }));
    expect(status).toBe(400);
    expect(data).toEqual({ status: "invalid", email: "sam@" });
  });
});
