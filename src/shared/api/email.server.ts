// Emails a form to the business through Cloudflare's own email sending (the FORM_MAILER
// binding in wrangler.jsonc). Free on every plan, because the mail only ever goes to the
// business's own address, verified in Cloudflare Email Routing; the binding cannot send
// anywhere else. The sender is an address on nearbygta.com, a domain of the same account that
// already has Email Routing, so washerrent.com's mail records stay as they are. The customer's
// email, when given, is the Reply-To, so "Reply" answers the customer.
// (Web3Forms was used before; its free plan refuses submissions sent from a server.)
// With FORMS_DRY_RUN=1 nothing is sent; the message is logged instead (local checks).
import { isFormsDryRun, type SiteEnv } from "../config/env";

export const FORM_FROM = { email: "forms@nearbygta.com", name: "GTA Washer & Dryer Rentals website" };
export const FORM_TO = "vladik.didyk@gmail.com";

export type FormFields = Record<string, string>;

export type SubmitResult = { ok: true; dryRun: boolean } | { ok: false; reason: string };

// What the binding's send() takes, as much of it as the forms use.
export interface FormMessage {
  from: { email: string; name: string };
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

export interface FormMailer {
  send(message: FormMessage): Promise<unknown>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "current_setup" -> "Current setup".
const labelOf = (key: string) => {
  const words = key.replace(/_/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The form as an email: one "Label: value" line per field (the subject is the email's own).
export function formMessage(fields: FormFields): FormMessage {
  const { subject = "Website form", ...rest } = fields;
  const rows = Object.entries(rest);
  const email = (rest.email ?? "").trim();
  return {
    from: FORM_FROM,
    to: FORM_TO,
    ...(EMAIL_PATTERN.test(email) ? { replyTo: email } : {}),
    subject,
    text: rows.map(([key, value]) => `${labelOf(key)}: ${value}`).join("\n"),
    html: `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">${rows
      .map(
        ([key, value]) =>
          `<tr><th align="left" valign="top" style="color:#555">${escapeHtml(labelOf(key))}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}</table>`,
  };
}

export async function sendFormEmail(env: SiteEnv, fields: FormFields): Promise<SubmitResult> {
  const message = formMessage(fields);

  if (isFormsDryRun(env)) {
    console.log("[forms] FORMS_DRY_RUN: not sent", JSON.stringify(message));
    return { ok: true, dryRun: true };
  }
  if (!env.FORM_MAILER) {
    console.error("[forms] The FORM_MAILER binding is missing; the form was not sent.");
    return { ok: false, reason: "missing-binding" };
  }

  try {
    await env.FORM_MAILER.send(message);
    return { ok: true, dryRun: false };
  } catch (error) {
    const code = (error as { code?: string }).code ?? "unknown";
    console.error("[forms] Sending the form email failed:", code, (error as Error).message);
    return { ok: false, reason: code };
  }
}
