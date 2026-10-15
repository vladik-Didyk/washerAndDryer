// Helpers for server tests: a load context like the Worker's (workers/app.ts), and form posts.
import type { AppLoadContext } from "react-router";
import { i18nAt } from "~/entities/offer";
import type { SiteEnv } from "~/shared/config";
import type { Lang } from "~/shared/i18n";

// The request time of every test context: October 15, 2026, 11:00 in Toronto.
export const TEST_NOW = Date.parse("2026-10-15T15:00:00Z");

// The text of a request at `now` (prices and offers filled in), as the loaders get it.
export const testI18n = (lang: Lang = "en", now = TEST_NOW) => i18nAt(lang, now);

export const TEST_KEY = "test-web3forms-key-not-real";
export const TEST_SECRET = "test-session-secret";

export function testContext(env: SiteEnv = {}, requestTime = TEST_NOW): AppLoadContext {
  return {
    cloudflare: {
      env: { WEB3FORMS_KEY: TEST_KEY, SESSION_SECRET: TEST_SECRET, ...env },
      ctx: {} as ExecutionContext,
    },
    requestTime,
  };
}

export function post(url: string, fields: Record<string, string>, cookie?: string): Request {
  const body = new FormData();
  for (const [name, value] of Object.entries(fields)) body.set(name, value);
  return new Request(`http://localhost${url}`, {
    method: "POST",
    body,
    headers: cookie ? { Cookie: cookie } : undefined,
  });
}

export const get = (url: string, cookie?: string) =>
  new Request(`http://localhost${url}`, { headers: cookie ? { Cookie: cookie } : undefined });

// The cookie to send back, from a response's Set-Cookie header.
export const cookieFrom = (response: Response) => (response.headers.get("Set-Cookie") ?? "").split(";")[0];

// What a loader/action returned with data(...): its payload and status.
export function unwrap<T>(result: unknown): { data: T; status: number } {
  if (result && typeof result === "object" && "type" in result && (result as { type: string }).type === "DataWithResponseInit") {
    const value = result as unknown as { data: T; init: ResponseInit | null };
    return { data: value.data, status: value.init?.status ?? 200 };
  }
  return { data: result as T, status: 200 };
}

// A Web3Forms stand-in: records each request, answers "success".
export function mockWeb3Forms(success = true) {
  const calls: Array<{ url: string; body: Record<string, string> }> = [];
  const fetchMock = async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), body: JSON.parse(String(init?.body ?? "{}")) });
    return new Response(JSON.stringify({ success, message: success ? "ok" : "refused" }), {
      status: success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  };
  return { calls, fetchMock };
}
