import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import type { FieldErrorMap } from "~/shared/lib";
import { ArrowRight, ChoiceTiles } from "~/shared/ui";
import type { machineAction } from "../actions.server";
import type { machineLoader } from "../loaders.server";
import { machineChoices } from "../model";
import { StepShell } from "./StepShell";

// Step 1 of 3: the machine type.
export function MachineStep() {
  const { values: saved } = useLoaderData<typeof machineLoader>();
  const result = useActionData<typeof machineAction>();
  const busy = useNavigation().state !== "idle";
  const values = result?.values ?? saved;
  const errors: FieldErrorMap = result?.errors ?? {};
  const i18n = useI18n();
  const { d, rich } = i18n;
  const text = d.start.machine;

  return (
    <StepShell
      step="machine"
      title={text.title}
      intro={
        <p>
          {rich(text.intro, {
            link: (
              <a href="/machines/" className="text-link">
                {d.common.compareTypes}
              </a>
            ),
          })}
        </p>
      }
    >
      <Form method="post" noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-8">
        <ChoiceTiles
          id="machine"
          name="machine"
          legend={text.legend}
          choices={machineChoices(i18n)}
          defaultValue={values.machine}
          error={errors.machine}
          columns="sm:grid-cols-2"
          className=""
        />
        <button type="submit" disabled={busy} className="btn btn-primary mt-6 w-full disabled:opacity-70">
          {text.next}
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </Form>
    </StepShell>
  );
}
