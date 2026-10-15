import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { useI18n } from "~/shared/i18n";
import { FormFields, SubmitButton, type FieldErrors } from "~/shared/forms";
import { ArrowRight, Card } from "~/shared/ui";
import type { detailsAction } from "../actions.server";
import type { detailsLoader } from "../loaders.server";
import { STEP_PATHS } from "../model";
import { StepShell } from "./StepShell";

// Step 2 of 3: where the machine goes.
export function DetailsStep() {
  const { values: saved, machine } = useLoaderData<typeof detailsLoader>();
  const result = useActionData<typeof detailsAction>();
  const busy = useNavigation().state !== "idle";
  const values = result?.values ?? saved;
  const errors: FieldErrors = result?.errors ?? {};
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
      <Card as={Form} method="post" noValidate padding="form">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormFields form="startDetails" values={values} errors={errors} />
        </div>
        <SubmitButton sending={busy} next icon={ArrowRight}>
          {text.next}
        </SubmitButton>
      </Card>
    </StepShell>
  );
}
