// Server action of /account/ (and /es/, /fr/, /ru/): the sign-in form. Customer accounts
// don't exist yet (docs/customer-dashboard-plan.md), so a valid email gets the "opening soon"
// answer and nothing else: the address is not stored, logged or sent anywhere.
import { data, type ActionFunctionArgs } from "react-router";
import { EMAIL_PATTERN } from "~/shared/forms";

export type SignInResult = { status: "soon" } | { status: "invalid"; email: string };

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  if (!EMAIL_PATTERN.test(email)) return data<SignInResult>({ status: "invalid", email }, { status: 400 });
  return { status: "soon" } satisfies SignInResult;
}
