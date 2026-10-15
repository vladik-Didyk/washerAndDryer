// The rental request's answers between the steps, in a signed cookie (no database).
// The cookie is HttpOnly, sent only to /start/ pages, signed with SESSION_SECRET (so it can't
// be altered), and cleared when the request is sent.
import { createCookieSessionStorage, type AppLoadContext, type Session } from "react-router";
import { envOf } from "~/shared/config";
import type { ContactStepValues, RentalDraft } from "./model";

interface SessionData {
  draft: RentalDraft;
}

interface FlashData {
  sent: { name: string; phone: string };
}

export type RentalSession = Session<SessionData, FlashData>;

export const SESSION_COOKIE = "__rental_request";

function storageFor(request: Request, context: AppLoadContext) {
  const secret = (envOf(context).SESSION_SECRET ?? "").trim();
  if (!secret) throw new Error("SESSION_SECRET is not set (wrangler secret put SESSION_SECRET).");
  return createCookieSessionStorage<SessionData, FlashData>({
    cookie: {
      name: SESSION_COOKIE,
      path: "/start",
      httpOnly: true,
      sameSite: "lax",
      secure: new URL(request.url).protocol === "https:",
      maxAge: 60 * 60 * 24 * 2, // two days to come back and finish
      secrets: [secret],
    },
  });
}

export async function openRentalSession(request: Request, context: AppLoadContext) {
  const storage = storageFor(request, context);
  const session = await storage.getSession(request.headers.get("Cookie"));
  return {
    session,
    draft: (): RentalDraft => session.get("draft") ?? {},
    saveDraft: (draft: RentalDraft) => session.set("draft", draft),
    finish: (contact: Pick<ContactStepValues, "name" | "phone">) => {
      session.unset("draft");
      session.flash("sent", { name: contact.name, phone: contact.phone });
    },
    commit: () => storage.commitSession(session),
  };
}
