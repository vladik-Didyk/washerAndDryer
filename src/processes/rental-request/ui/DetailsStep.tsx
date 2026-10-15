import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import type { FieldErrorMap } from "~/shared/lib";
import { ArrowRight, ChoiceTiles, TextField } from "~/shared/ui";
import type { detailsAction } from "../actions.server";
import type { detailsLoader } from "../loaders.server";
import { ACCESS_CHOICES, OUTLET_CHOICES, STEP_PATHS } from "../model";
import { StepShell } from "./StepShell";

// Step 2 of 3: where the machine goes.
export function DetailsStep() {
  const { values: saved, machine } = useLoaderData<typeof detailsLoader>();
  const result = useActionData<typeof detailsAction>();
  const busy = useNavigation().state !== "idle";
  const values = result?.values ?? saved;
  const errors: FieldErrorMap = result?.errors ?? {};

  return (
    <StepShell
      step="details"
      title="Tell us about your space"
      intro={
        <p>
          You chose: <strong className="font-semibold text-ink">{machine}</strong>. Now the space, so
          we bring a machine that fits.
        </p>
      }
      backHref={STEP_PATHS.machine}
    >
      <Form method="post" noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="postal"
            name="postal"
            label="Postal code"
            required
            autoComplete="postal-code"
            autoCapitalize="characters"
            maxLength={8}
            placeholder="e.g. M5V 2T6"
            inputClassName="uppercase placeholder:normal-case"
            defaultValue={values.postal}
            error={errors.postal}
          />
          <TextField
            id="closetWidth"
            name="closetWidth"
            label="Closet or space width"
            required
            placeholder={'e.g. 24" or 61 cm'}
            defaultValue={values.closetWidth}
            error={errors.closetWidth}
            hint={'Not sure? Write "not sure".'}
          />
          <ChoiceTiles
            id="outlet"
            name="outlet"
            legend="Dryer outlet"
            choices={OUTLET_CHOICES}
            defaultValue={values.outlet}
            error={errors.outlet}
          />
          <ChoiceTiles
            id="access"
            name="access"
            legend="How do we get the machine in?"
            choices={ACCESS_CHOICES}
            defaultValue={values.access}
            error={errors.access}
          />
          <TextField
            id="floor"
            name="floor"
            label="Floor or unit"
            placeholder="e.g. 12th floor, basement"
            defaultValue={values.floor}
            error={errors.floor}
            hint="Optional. Tell us about tight stairs or turns in the notes on the next step."
            className="sm:col-span-2"
          />
        </div>
        <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full disabled:opacity-70">
          Next: how to reach you
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </Form>
    </StepShell>
  );
}
