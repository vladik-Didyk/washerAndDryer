// The whole rental request, step by step, as a browser without JavaScript would do it:
// form posts, redirects and the session cookie.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TEST_KEY, cookieFrom, get, mockWeb3Forms, post, testContext, unwrap } from "~/test/context";
import { contactAction, detailsAction, machineAction } from "./actions.server";
import { contactLoader, detailsLoader, doneLoader } from "./loaders.server";

const context = testContext();
const args = (request: Request) => ({ request, context, params: {} }) as never;

async function expectRedirect(promise: Promise<unknown>, location: string) {
  let response: unknown;
  try {
    response = await promise;
  } catch (thrown) {
    response = thrown;
  }
  expect(response).toBeInstanceOf(Response);
  expect((response as Response).status).toBe(302);
  expect((response as Response).headers.get("Location")).toBe(location);
  return response as Response;
}

describe("rental request flow", () => {
  let web3: ReturnType<typeof mockWeb3Forms>;
  beforeEach(() => {
    web3 = mockWeb3Forms();
    vi.stubGlobal("fetch", vi.fn(web3.fetchMock));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("sends later steps back to the start without a session", async () => {
    await expectRedirect(detailsLoader(args(get("/start/details/"))), "/start/");
    await expectRedirect(contactLoader(args(get("/start/contact/"))), "/start/");
    await expectRedirect(doneLoader(args(get("/start/done/"))), "/start/");
  });

  it("goes from step 1 to the done page and sends one email", async () => {
    // Step 1: empty, then valid.
    const empty = unwrap<{ errors: Record<string, string> }>(await machineAction(args(post("/start/", {}))));
    expect(empty.status).toBe(400);
    expect(empty.data.errors.machine).toBeTruthy();
    let response = await expectRedirect(machineAction(args(post("/start/", { machine: "stackable" }))), "/start/details/");
    let cookie = cookieFrom(response);
    expect(response.headers.get("Set-Cookie")).toMatch(/__rental_request=.*Path=\/start; .*HttpOnly; SameSite=Lax/);

    // Step 2.
    const details = unwrap<{ machine: string }>(await detailsLoader(args(get("/start/details/", cookie))));
    expect(details.data.machine).toBe("Stackable pair");
    const bad = unwrap<{ errors: Record<string, string> }>(await detailsAction(args(post("/start/details/", {}, cookie))));
    expect(bad.status).toBe(400);
    response = await expectRedirect(
      detailsAction(args(post("/start/details/", { postal: "M2N 6K1", closetWidth: '24"', outlet: "3-prong", access: "elevator", floor: "" }, cookie))),
      "/start/contact/",
    );
    cookie = cookieFrom(response);

    // Step 3.
    const contact = unwrap<{ today: string }>(await contactLoader(args(get("/start/contact/", cookie))));
    expect(contact.data.today).toBe("2026-10-15");
    const invalid = unwrap<{ errors: Record<string, string> }>(await contactAction(args(post("/start/contact/", {}, cookie))));
    expect(invalid.status).toBe(400);
    expect(Object.keys(invalid.data.errors).sort()).toEqual(["name", "phone"]);
    expect(web3.calls).toHaveLength(0);

    response = await expectRedirect(
      contactAction(args(post("/start/contact/", { name: "Alex", phone: "416-555-0123", preferredDay: "2026-10-20" }, cookie))),
      "/start/done/",
    );
    cookie = cookieFrom(response);
    expect(web3.calls).toHaveLength(1);
    expect(web3.calls[0].body).toMatchObject({
      access_key: TEST_KEY,
      subject: "New rental request — Alex",
      machine_type: "Stackable pair",
      postal_code: "M2N 6K1",
      area: "North York, Toronto",
      dryer_outlet: "3-prong",
      access: "Elevator",
      preferred_day: "2026-10-20",
    });

    // Done: shown once, and the answers are gone.
    const done = unwrap<{ sent: { name: string } }>(await doneLoader(args(get("/start/done/", cookie))));
    expect(done.data.sent.name).toBe("Alex");
    await expectRedirect(contactLoader(args(get("/start/contact/", cookie))), "/start/");
  });

  it("keeps the answers and shows an error when Web3Forms fails", async () => {
    vi.stubGlobal("fetch", vi.fn(mockWeb3Forms(false).fetchMock));
    let response = await expectRedirect(machineAction(args(post("/start/", { machine: "not-sure" }))), "/start/details/");
    response = await expectRedirect(
      detailsAction(args(post("/start/details/", { postal: "L4K 2Z2", closetWidth: "not sure", outlet: "not-sure", access: "ground" }, cookieFrom(response)))),
      "/start/contact/",
    );
    const failed = unwrap<{ status: string }>(
      await contactAction(args(post("/start/contact/", { name: "Alex", phone: "416-555-0123" }, cookieFrom(response)))),
    );
    expect(failed.status).toBe(502);
    expect(failed.data.status).toBe("error");
  });

  it("refuses to run without SESSION_SECRET", async () => {
    const noSecret = testContext({ SESSION_SECRET: "" });
    await expect(machineAction({ request: post("/start/", { machine: "stackable" }), context: noSecret, params: {} } as never)).rejects.toThrow(
      /SESSION_SECRET/,
    );
  });
});
