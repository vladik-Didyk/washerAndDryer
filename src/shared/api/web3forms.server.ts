// Sends a form to Web3Forms (https://web3forms.com), which emails it to the business.
// Server only: the access key comes from the WEB3FORMS_KEY secret and never reaches the
// browser. With FORMS_DRY_RUN=1 nothing is sent; the payload is logged instead (local checks).
import { isFormsDryRun, type SiteEnv } from "../config/env";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const FORM_FROM_NAME = "GTA Washer & Dryer Rentals website";

export type FormFields = Record<string, string>;

export type SubmitResult = { ok: true; dryRun: boolean } | { ok: false; reason: string };

export async function submitToWeb3Forms(
  env: SiteEnv,
  fields: FormFields,
  fetcher: typeof fetch = fetch,
): Promise<SubmitResult> {
  const accessKey = (env.WEB3FORMS_KEY ?? "").trim();
  const payload = { access_key: accessKey, from_name: FORM_FROM_NAME, ...fields };

  if (isFormsDryRun(env)) {
    console.log("[forms] FORMS_DRY_RUN: not sent", JSON.stringify({ ...payload, access_key: "***" }));
    return { ok: true, dryRun: true };
  }
  if (!accessKey) {
    console.error("[forms] WEB3FORMS_KEY is not set; the form was not sent.");
    return { ok: false, reason: "missing-key" };
  }

  try {
    const response = await fetcher(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (response.ok && result?.success) return { ok: true, dryRun: false };
    console.error("[forms] Web3Forms refused the form:", response.status, result?.message ?? "");
    return { ok: false, reason: `status-${response.status}` };
  } catch (error) {
    console.error("[forms] Web3Forms request failed:", error);
    return { ok: false, reason: "network" };
  }
}
