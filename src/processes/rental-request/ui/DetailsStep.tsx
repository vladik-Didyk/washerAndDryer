import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import type { FieldErrorMap } from "~/shared/lib";
import { ArrowRight, ChoiceTiles, TextField } from "~/shared/ui";
import type { detailsAction } from "../actions.server";
import type { detailsLoader } from "../loaders.server";
import { STEP_PATHS, accessChoices, outletChoices } from "../model";
import { StepShell } from "./StepShell";

// Step 2 of 3: where the machine goes.
export function DetailsStep() {
  const { values: saved, machine } = useLoaderData<typeof detailsLoader>();
  const result = useActionData<typeof detailsAction>();
  const busy = useNavigation().state !== "idle";
  const values = result?.values ?? saved;
  const errors: FieldErrorMap = result?.errors ?? {};
  const i18n = useI18n();
  const { rich } = i18n;
  const text = i18n.d.start.details;

  return (
    <StepShell
      step="details"
      title={text.title}
      intro={<p>{rich(text.intro, { machine: <strong className="font-semibold text-ink">{machine}</strong> })}</p>}
      backHref={STEP_PATHS.machine}
    >
      <Form method="post" noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="postal"
            name="postal"
            label={text.postal}
            required
            autoComplete="postal-code"
            autoCapitalize="characters"
            maxLength={8}
            placeholder={text.postalPlaceholder}
            inputClassName="uppercase placeholder:normal-case"
            defaultValue={values.postal}
            error={errors.postal}
          />
          <TextField
            id="closetWidth"
            name="closetWidth"
            label={text.width}
            required
            placeholder={text.widthPlaceholder}
            defaultValue={values.closetWidth}
            error={errors.closetWidth}
            hint={text.widthHint}
          />
          <ChoiceTiles
            id="outlet"
            name="outlet"
            legend={text.outlet}
            choices={outletChoices(i18n)}
            defaultValue={values.outlet}
            error={errors.outlet}
          />
          <ChoiceTiles
            id="access"
            name="access"
            legend={text.access}
            choices={accessChoices(i18n)}
            defaultValue={values.access}
            error={errors.access}
          />
          <TextField
            id="floor"
            name="floor"
            label={text.floor}
            placeholder={text.floorPlaceholder}
            defaultValue={values.floor}
            error={errors.floor}
            hint={text.floorHint}
            className="sm:col-span-2"
          />
        </div>
        <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full disabled:opacity-70">
          {text.next}
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </Form>
    </StepShell>
  );
}
