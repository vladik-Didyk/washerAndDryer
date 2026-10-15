import { useState } from "react";
import { useForm } from "react-hook-form";
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

// Landlord quote request, sent through web3forms like the rental request form.
const EMPTY_VALUES = {
  name: "",
  phone: "",
  email: "",
  address: "",
  units: "",
  setup: "",
  machineType: "Not sure",
  option: "",
  notes: "",
};

const SETUP_OPTIONS = ["No machines", "Old machines to replace", "Hookups only"];
const OPTION_CHOICES = [
  "My tenants rent directly",
  "I rent the machines for my units",
  "Not sure yet",
];
const MACHINE_OPTIONS = [
  "Not sure",
  ...machineTypes.map((machine) => machine.title),
  "Different in each unit",
];

// A row of radio buttons styled as tiles, like "What you need" on the rental form.
function ChoiceTiles({ name, legend, options, register, error, requiredMessage }) {
  const errorId = `quote-${name}-error`;
  return (
    <fieldset className="sm:col-span-2">
      <legend className="label">
        {legend}
        <Required />
      </legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <label key={option} className="relative block cursor-pointer">
            <input
              type="radio"
              value={option}
              required
              aria-describedby={describedBy(error && errorId)}
              className="peer sr-only"
              {...register(name, { required: requiredMessage })}
            />
            <span className="flex min-h-[3.125rem] items-center justify-center rounded-xl border border-line bg-white px-3 py-2 text-center font-medium text-ink transition-colors hover:border-brand peer-checked:border-brand peer-checked:bg-brand-mint peer-checked:font-semibold peer-checked:text-brand-dark peer-checked:ring-1 peer-checked:ring-brand peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {option}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} error={error} />
    </fieldset>
  );
}

export default function LandlordQuoteForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: EMPTY_VALUES });

  const onSubmit = async (data) => {
    setStatus("sending");
    const name = data.name.trim();
    const sent = await sendForm(
      {
        subject: `Landlord quote request — ${name}`,
        name,
        phone: data.phone.trim(),
        email: data.email.trim() || "Not given",
        building: data.address.trim(),
        units: data.units,
        current_setup: data.setup,
        machine_type: data.machineType || "Not sure",
        option: data.option,
        notes: data.notes.trim() || "None",
      },
      data.botcheck,
    );
    if (sent) {
      reset(EMPTY_VALUES);
      setStatus("sent");
    } else {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <SentPanel title="Quote request sent." onReset={() => setStatus("idle")} />;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="quote-form-title"
      className="rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <h2 id="quote-form-title" className="font-display text-2xl font-bold text-ink">
        Your building
      </h2>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="label">
            Name
            <Required />
          </label>
          <input
            id="quote-name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={describedBy(errors.name && "quote-name-error")}
            className="field mt-2"
            {...register("name", {
              required: "Enter your name.",
              minLength: { value: 2, message: "Name must be at least 2 characters." },
            })}
          />
          <FieldError id="quote-name-error" error={errors.name} />
        </div>

        <div>
          <label htmlFor="quote-phone" className="label">
            Phone
            <Required />
          </label>
          <input
            id="quote-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={describedBy(errors.phone && "quote-phone-error")}
            className="field mt-2"
            {...register("phone", {
              required: "Enter your phone number.",
              pattern: {
                value: /^[\d\s()+-]{10,}$/,
                message: "Enter a valid phone number, with area code.",
              },
            })}
          />
          <FieldError id="quote-phone-error" error={errors.phone} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-email" className="label">
            Email
          </label>
          <input
            id="quote-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={describedBy(errors.email && "quote-email-error")}
            className="field mt-2"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address, or leave it empty.",
              },
            })}
          />
          <FieldError id="quote-email-error" error={errors.email} />
        </div>

        <div>
          <label htmlFor="quote-address" className="label">
            Building address or city
            <Required />
          </label>
          <input
            id="quote-address"
            type="text"
            autoComplete="street-address"
            required
            aria-invalid={errors.address ? "true" : "false"}
            aria-describedby={describedBy(errors.address && "quote-address-error")}
            className="field mt-2"
            {...register("address", { required: "Enter the address or the city." })}
          />
          <FieldError id="quote-address-error" error={errors.address} />
        </div>

        <div>
          <label htmlFor="quote-units" className="label">
            Number of units
            <Required />
          </label>
          <input
            id="quote-units"
            type="number"
            inputMode="numeric"
            min={1}
            required
            aria-invalid={errors.units ? "true" : "false"}
            aria-describedby={describedBy(errors.units && "quote-units-error")}
            className="field mt-2"
            {...register("units", {
              required: "Enter the number of units.",
              validate: (value) =>
                (Number.isInteger(Number(value)) && Number(value) >= 1) ||
                "Enter a whole number, 1 or more.",
            })}
          />
          <FieldError id="quote-units-error" error={errors.units} />
        </div>

        <ChoiceTiles
          name="setup"
          legend="What's there now"
          options={SETUP_OPTIONS}
          register={register}
          error={errors.setup}
          requiredMessage="Choose what's there now."
        />

        <div className="sm:col-span-2">
          <label htmlFor="quote-machine" className="label">
            Machine type
          </label>
          <div className="relative mt-2">
            <select id="quote-machine" className="field pr-11" {...register("machineType")}>
              {MACHINE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </div>

        <ChoiceTiles
          name="option"
          legend="How you'd like to do it"
          options={OPTION_CHOICES}
          register={register}
          error={errors.option}
          requiredMessage="Choose how you'd like to do it."
        />

        <div className="sm:col-span-2">
          <label htmlFor="quote-notes" className="label">
            Notes
          </label>
          <textarea
            id="quote-notes"
            rows={4}
            aria-describedby="quote-notes-hint"
            className="field mt-2 resize-y"
            {...register("notes")}
          />
          <p id="quote-notes-hint" className="field-hint">
            For example: where the laundry is in each unit, stairs or elevator, a good
            time to see the building.
          </p>
        </div>
      </div>

      <Honeypot register={register} />
      {status === "error" && <SendError />}
      <SubmitButton sending={status === "sending"}>Send quote request</SubmitButton>
    </form>
  );
}
