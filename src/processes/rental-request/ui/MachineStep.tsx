import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import { FormFields, SubmitButton, type FieldErrors } from "~/shared/forms";
import { ArrowRight, LangLink } from "~/shared/ui";
import type { machineAction } from "../actions.server";
import type { machineLoader } from "../loaders.server";
import { StepShell } from "./StepShell";

// Step 1 of 3: the machine type.
export function MachineStep() {
  const { values: saved } = useLoaderData<typeof machineLoader>();
  const result = useActionData<typeof machineAction>();
  const busy = useNavigation().state !== "idle";
  const values = result?.values ?? saved;
  const errors: FieldErrors = result?.errors ?? {};
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
              <LangLink href="/machines/" className="text-link">
                {d.common.compareTypes}
              </LangLink>
            ),
          })}
        </p>
      }
    >
      <Form method="post" noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-8">
        <FormFields form="startMachine" values={values} errors={errors} />
        <SubmitButton sending={busy} next icon={ArrowRight}>
          {text.next}
        </SubmitButton>
      </Form>
    </StepShell>
  );
}
