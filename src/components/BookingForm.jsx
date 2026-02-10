import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "../content/config";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FORM_STORAGE_KEY = "bookingFormData";

export default function BookingForm() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedFormData, setSavedFormData, removeSavedFormData] =
    useLocalStorage(FORM_STORAGE_KEY, null);
  const debounceRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: savedFormData || {
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    },
  });

  // Autosave form data to localStorage (debounced)
  const watchedFields = watch();
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSavedFormData(watchedFields);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [watchedFields, setSavedFormData]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: siteConfig.web3formsKey,
          subject: `New Installation Booking — ${data.name}`,
          from_name: siteConfig.companyName,
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postal_code: data.postalCode,
          notes: data.notes || "None",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        reset();
        removeSavedFormData();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <section id="booking" className="section-padding bg-neu-bg dark:bg-dark-bg">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <div className="neu-card-raised flex flex-col items-center gap-4 py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50 shadow-neu-subtle dark:bg-dark-elevated dark:shadow-neu-dark-subtle">
                <CheckCircle className="h-8 w-8 text-sage-400" />
              </div>
              <h2 className="font-display text-xl font-bold tracking-wide text-gray-800 uppercase dark:text-white">
                Booking Sent!
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Thank you! We&apos;ll get back to you within 24 hours to
                confirm your installation appointment.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="btn-primary mt-4"
              >
                Book Another
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-neu-bg dark:bg-dark-bg">
      <div className="container-main">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-wide text-gray-800 uppercase dark:text-white sm:text-3xl">
            Book Your Installation
          </h2>
          <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
            Fill out the form below and we&apos;ll get back to you within 24
            hours to schedule your installation.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="neu-card-raised space-y-6"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`input-field ${errors.name ? "ring-2 ring-red-300 dark:ring-red-500/40" : ""}`}
                placeholder="John Smith"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
              >
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={`input-field ${errors.phone ? "ring-2 ring-red-300 dark:ring-red-500/40" : ""}`}
                placeholder="(416) 555-0100"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[\d\s()+-]{10,}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
              >
                Street Address <span className="text-red-400">*</span>
              </label>
              <input
                id="address"
                type="text"
                className={`input-field ${errors.address ? "ring-2 ring-red-300 dark:ring-red-500/40" : ""}`}
                placeholder="123 Main Street, Unit 4"
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City + Postal Code */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
                >
                  City <span className="text-red-400">*</span>
                </label>
                <select
                  id="city"
                  className={`input-field ${errors.city ? "ring-2 ring-red-300 dark:ring-red-500/40" : ""}`}
                  {...register("city", { required: "City is required" })}
                >
                  <option value="">Select your city</option>
                  {siteConfig.serviceAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-2 block text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
                >
                  Postal Code <span className="text-red-400">*</span>
                </label>
                <input
                  id="postalCode"
                  type="text"
                  className={`input-field uppercase ${errors.postalCode ? "ring-2 ring-red-300 dark:ring-red-500/40" : ""}`}
                  placeholder="M5V 3L9"
                  {...register("postalCode", {
                    required: "Postal code is required",
                    pattern: {
                      value: /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,
                      message:
                        "Enter a valid Canadian postal code (e.g. M5V 3L9)",
                    },
                  })}
                />
                {errors.postalCode && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                className="input-field resize-none"
                placeholder="e.g. Need old units removed, building has elevator, preferred delivery date..."
                {...register("notes")}
              />
            </div>

            {/* Error banner */}
            {submitStatus === "error" && (
              <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600 shadow-neu-pressed dark:bg-red-900/10 dark:text-red-400 dark:shadow-neu-dark-pressed">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">
                  Something went wrong. Please try again or call us at{" "}
                  <a
                    href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                    className="font-semibold underline"
                  >
                    {siteConfig.phone}
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Booking Request
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
