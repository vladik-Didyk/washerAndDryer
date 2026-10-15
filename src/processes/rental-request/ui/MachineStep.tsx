import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import type { FieldErrorMap } from "~/shared/lib";
import { ArrowRight, ChoiceTiles } from "~/shared/ui";
import type { machineAction } from "../actions.server";
import type { machineLoader } from "../loaders.server";
import { MACHINE_CHOICES } from "../model";
import { StepShell } from "./StepShell";

// Step 1 of 3: the machine type.
export function MachineStep() {
  const { values: saved } = useLoaderData<typeof machineLoader>();
  const result = useActionData<typeof machineAction>();
  const busy = useNavigation().state !== "idle";
  const values = result?.values ?? saved;
  const errors: FieldErrorMap = result?.errors ?? {};

  return (
    <StepShell
      step="machine"
      title="Which machine do you need?"
      intro={
        <p>
          Not sure? Choose "Not sure yet": we help you pick from your closet size and hookups.{" "}
          <a href="/machines/" className="text-link">
            Compare the machine types
          </a>
        </p>
      }
    >
      <Form method="post" noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-8">
        <ChoiceTiles
          id="machine"
          name="machine"
          legend="Machine type"
          choices={MACHINE_CHOICES}
          defaultValue={values.machine}
          error={errors.machine}
          columns="sm:grid-cols-2"
          className=""
        />
        <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full disabled:opacity-70">
          Next: your space
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </Form>
    </StepShell>
  );
}
