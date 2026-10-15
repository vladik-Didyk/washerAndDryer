import { useState } from "react";
import { useForm } from "react-hook-form";
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

// Repair request for a machine rented from us, sent through web3forms like the other forms.
const EMPTY_VALUES = {
  name: "",
  phone: "",
  address: "",
  machine: "Not sure",
  problem: "",
  bestTime: "Any time",
};

const MACHINE_OPTIONS = [
  "Washer",
  "Dryer",
  "Stackable pair",
  "One-piece laundry centre",
  "Not sure",
];
const TIME_OPTIONS = ["Any time", "Morning", "Afternoon", "Evening"];

export default function RepairForm() {
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
        subject: `Repair request — ${name}`,
        name,
        phone: data.phone.trim(),
        address_or_postal_code: data.address.trim(),
        machine: data.machine,
        problem: data.problem.trim(),
        best_time: data.bestTime,
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
    return (
      <SentPanel
        title="Repair request sent."
        note="We'll call or text you to arrange the repair."
        onReset={() => setStatus("idle")}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="repair-form-title"
      className="rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <h2 id="repair-form-title" className="font-display text-2xl font-bold text-ink">
        What's wrong?
      </h2>
      <div className="mt-2">
        <RequiredNote />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="repair-name" className="label">
            Name
            <Required />
          </label>
          <input
            id="repair-name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={describedBy(errors.name && "repair-name-error")}
            className="field mt-2"
            {...register("name", {
              required: "Enter your name.",
              minLength: { value: 2, message: "Name must be at least 2 characters." },
            })}
          />
          <FieldError id="repair-name-error" error={errors.name} />
        </div>

        <div>
          <label htmlFor="repair-phone" className="label">
            Phone
            <Required />
          </label>
          <input
            id="repair-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={describedBy(errors.phone && "repair-phone-error")}
            className="field mt-2"
            {...register("phone", {
              required: "Enter your phone number.",
              pattern: {
                value: /^[\d\s()+-]{10,}$/,
                message: "Enter a valid phone number, with area code.",
              },
            })}
          />
          <FieldError id="repair-phone-error" error={errors.phone} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="repair-address" className="label">
            Address or postal code
            <Required />
          </label>
          <input
            id="repair-address"
            type="text"
            autoComplete="street-address"
            required
            aria-invalid={errors.address ? "true" : "false"}
            aria-describedby={describedBy(errors.address && "repair-address-error")}
            className="field mt-2"
            {...register("address", { required: "Enter your address or postal code." })}
          />
          <FieldError id="repair-address-error" error={errors.address} />
        </div>

        <div>
          <label htmlFor="repair-machine" className="label">
            Machine
          </label>
          <div className="relative mt-2">
            <select id="repair-machine" className="field pr-11" {...register("machine")}>
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
          <label htmlFor="repair-time" className="label">
            Best time to reach you
          </label>
          <div className="relative mt-2">
            <select id="repair-time" className="field pr-11" {...register("bestTime")}>
              {TIME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="repair-problem" className="label">
            What's wrong
            <Required />
          </label>
          <textarea
            id="repair-problem"
            rows={5}
            required
            aria-invalid={errors.problem ? "true" : "false"}
            aria-describedby={describedBy("repair-problem-hint", errors.problem && "repair-problem-error")}
            className="field mt-2 resize-y"
            {...register("problem", {
              required: "Tell us what the machine is doing.",
              minLength: { value: 5, message: "Tell us a little more about the problem." },
            })}
          />
          <p id="repair-problem-hint" className="field-hint">
            For example: won't start, won't drain, leaks, doesn't heat, an error code on
            the display.
          </p>
          <FieldError id="repair-problem-error" error={errors.problem} />
        </div>
      </div>

      <Honeypot register={register} />
      {status === "error" && <SendError />}
      <SubmitButton sending={status === "sending"}>Send repair request</SubmitButton>
    </form>
  );
}
