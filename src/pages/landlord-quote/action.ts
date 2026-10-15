// Server action of /landlords/quote/: checks the posted form and sends it through Web3Forms.
import { data, type ActionFunctionArgs } from "react-router";
import { readLandlordQuote, validateLandlordQuote, type LandlordQuoteValues } from "~/features/landlord-quote-form";
import { submitToWeb3Forms } from "~/shared/api/web3forms.server";
import { envOf } from "~/shared/config";
import { isBot, type FormActionData } from "~/shared/lib";

export async function action({ request, context }: ActionFunctionArgs) {
  const form = await request.formData();
  const values = readLandlordQuote(form);
  const checked = validateLandlordQuote(values);
  if (!checked.ok) {
    return data<FormActionData<LandlordQuoteValues>>(
      { status: "invalid", values, errors: checked.errors },
      { status: 400 },
    );
  }
  // A bot ticked the hidden box: answer as if sent, send nothing.
  if (isBot(form)) return { status: "sent" } satisfies FormActionData<LandlordQuoteValues>;

  const sent = await submitToWeb3Forms(envOf(context), checked.fields);
  if (!sent.ok) {
    return data<FormActionData<LandlordQuoteValues>>({ status: "error", values }, { status: 502 });
  }
  return { status: "sent" } satisfies FormActionData<LandlordQuoteValues>;
}
