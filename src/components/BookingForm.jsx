import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "../content/config";
import { machineTypes } from "../content/machines";
import {
  FieldError,
  Honeypot,
  Required,
  RequiredNote,
  SelectChevron,
  SendError,
  SentPanel,
  SubmitButton,
  describedBy,
  sendForm,
} from "./FormParts";

// Rental request form, sent through web3forms (FormParts.jsx). A draft is kept in
// localStorage while typing.
const DRAFT_KEY = "rentalRequestDraft";

const EMPTY_VALUES = {
  name: "",
  phone: "",
  area: "",
  need: "",
  machineType: "Not sure",
  closetWidth: "",
  startDate: "",
  notes: "",
};

const AREA_OPTIONS = [
  ...siteConfig.serviceAreas.map((area) => area.name),
  "Other GTA area",
];
const NEED_OPTIONS = ["Washer + dryer set", "Washer only", "Dryer only"];
const MACHINE_OPTIONS = [
  "Not sure",
  ...machineTypes
    .filter((machine) => machine.slug !== "single-machine")
    .map((machine) => machine.title),
];

// Keep only known fields with string values, so an old or edited draft can't break the form.
function pickDraftFields(source) {
  const draft = { ...EMPTY_VALUES };
  for (const key of Object.keys(EMPTY_VALUES)) {
    if (typeof source?.[key] === "string") draft[key] = source[key];
  }
  return draft;
}

function readDraft() {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? pickDraftFields(JSON.parse(raw)) : EMPTY_VALUES;
  } catch {
    return EMPTY_VALUES;
  }
}

function writeDraft(values) {
  try {
    const draft = pickDraftFields(values);
    const isEmpty = Object.keys(EMPTY_VALUES).every(
      (key) => draft[key] === EMPTY_VALUES[key],
    );
    if (isEmpty) window.localStorage.removeItem(DRAFT_KEY);
    else window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage full or unavailable: the form still works without a draft.
  }
}

function removeDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Storage unavailable
  }
}

function todayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

export default function BookingForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [initialValues] = useState(readDraft);
  // Set after hydration, so the prerendered HTML doesn't carry the build date.
  const [minDate, setMinDate] = useState(undefined);
  const saveTimer = useRef(null);
  const { phone, hours } = siteConfig;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Autosave the draft 400 ms after the last change. A watch subscription runs on each
  // change without re-rendering the form, so nothing is written while the form is idle.
  useEffect(() => {
    const subscription = watch((values) => {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => writeDraft(values), 400);
    });
    return () => {
      subscription.unsubscribe();
      window.clearTimeout(saveTimer.current);
    };
  }, [watch]);

  useEffect(() => {
    setMinDate(todayISO());
  }, []);

  const onSubmit = async (data) => {
    setStatus("sending");
    const name = data.name.trim();
    const sent = await sendForm(
      {
        subject: `New rental request — ${name}`,
        name,
        phone: data.phone.trim(),
        area: data.area,
        need: data.need,
        machine_type: data.machineType || "Not sure",
        closet_width: data.closetWidth.trim() || "Not given",
        start_date: data.startDate || "Not given",
        notes: data.notes.trim() || "None",
      },
      data.botcheck,
    );
    if (sent) {
      reset(EMPTY_VALUES);
      window.clearTimeout(saveTimer.current);
      removeDraft();
      setStatus("sent");
    } else {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section
      id="request"
      aria-labelledby="request-title"
      className="section bg-brand-mint"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="request-title" className="h2">
            Check availability
          </h2>
          <p className="lead mt-4">
            Tell us what you need. We reply with the machine, the total and the
            start date.
          </p>

          <div className="mt-8 rounded-3xl border border-brand-mint-strong bg-white p-6">
            <p className="font-display font-semibold text-ink">
              Prefer to call or text?
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-brand">
              {phone.display}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {hours.map((entry) => `${entry.days} ${entry.time.toLowerCase()}`).join(". ")}.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={phone.tel} className="btn btn-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Call
              </a>
              <a href={phone.sms} className="btn btn-secondary">
                <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
                Text
              </a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              A photo of the closet helps. You can text it to us.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === "sent" ? (
            <SentPanel onReset={() => setStatus("idle")} />
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              aria-labelledby="request-title"
              className="rounded-3xl border border-line bg-white p-5 sm:p-8"
            >
              <RequiredNote />

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">
                    Name
                    <Required />
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={describedBy(errors.name && "name-error")}
                    className="field mt-2"
                    {...register("name", {
                      required: "Enter your name.",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters.",
                      },
                    })}
                  />
                  <FieldError id="name-error" error={errors.name} />
                </div>

                <div>
                  <label htmlFor="phone" className="label">
                    Phone
                    <Required />
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={describedBy(errors.phone && "phone-error")}
                    className="field mt-2"
                    {...register("phone", {
                      required: "Enter your phone number.",
                      pattern: {
                        value: /^[\d\s()+-]{10,}$/,
                        message: "Enter a valid phone number, with area code.",
                      },
                    })}
                  />
                  <FieldError id="phone-error" error={errors.phone} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="area" className="label">
                    Area
                    <Required />
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="area"
                      required
                      aria-invalid={errors.area ? "true" : "false"}
                      aria-describedby={describedBy(errors.area && "area-error")}
                      className="field pr-11"
                      {...register("area", { required: "Choose your area." })}
                    >
                      <option value="">Choose your area</option>
                      {AREA_OPTIONS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                  <FieldError id="area-error" error={errors.area} />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="label">
                    What you need
                    <Required />
                  </legend>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {NEED_OPTIONS.map((option) => (
                      <label key={option} className="relative block cursor-pointer">
                        <input
                          type="radio"
                          value={option}
                          required
                          aria-describedby={describedBy(errors.need && "need-error")}
                          className="peer sr-only"
                          {...register("need", {
                            required: "Choose what you need.",
                          })}
                        />
                        <span className="flex min-h-[3.125rem] items-center justify-center rounded-xl border border-line bg-white px-3 py-2 text-center font-medium text-ink transition-colors hover:border-brand peer-checked:border-brand peer-checked:bg-brand-mint peer-checked:font-semibold peer-checked:text-brand-dark peer-checked:ring-1 peer-checked:ring-brand peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                  <FieldError id="need-error" error={errors.need} />
                </fieldset>

                <div>
                  <label htmlFor="machineType" className="label">
                    Machine type
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="machineType"
                      className="field pr-11"
                      {...register("machineType")}
                    >
                      {MACHINE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                </div>

                <div>
                  <label htmlFor="closetWidth" className="label">
                    Closet width
                  </label>
                  <input
                    id="closetWidth"
                    type="text"
                    placeholder={'e.g. 24"'}
                    className="field mt-2"
                    {...register("closetWidth")}
                  />
                </div>

                <div>
                  <label htmlFor="startDate" className="label">
                    Preferred start date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    min={minDate}
                    aria-invalid={errors.startDate ? "true" : "false"}
                    aria-describedby={describedBy(
                      errors.startDate && "startDate-error",
                    )}
                    className="field mt-2 text-left [&::-webkit-date-and-time-value]:text-left"
                    {...register("startDate", {
                      validate: (value) =>
                        !value ||
                        !minDate ||
                        value >= minDate ||
                        "Choose today or a later date.",
                    })}
                  />
                  <FieldError id="startDate-error" error={errors.startDate} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="label">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    aria-describedby="notes-hint"
                    className="field mt-2 resize-y"
                    {...register("notes")}
                  />
                  <p id="notes-hint" className="field-hint">
                    For example: floor, elevator or stairs, outlet type (3- or
                    4-prong).
                  </p>
                </div>
              </div>

              <Honeypot register={register} />
              {status === "error" && <SendError />}
              <SubmitButton sending={sending}>Send request</SubmitButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
