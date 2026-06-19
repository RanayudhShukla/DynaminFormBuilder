"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface Form {
  _id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export default function PublicFormPage() {
  const { id } = useParams();

  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const res = await fetch(`/api/forms/${id}?view=true`);
        if (!res.ok) throw new Error("Form not found");
        const data = await res.json();
        setForm(data);

        // Initialize checkbox answers as arrays
        const initialAnswers: Record<string, any> = {};
        data.fields.forEach((field: FormField) => {
          if (field.type === "checkbox") {
            initialAnswers[field.id] = [];
          } else {
            initialAnswers[field.id] = "";
          }
        });
        setAnswers(initialAnswers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [id]);

  const handleInputChange = (fieldId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    // Clear error
    if (errors[fieldId]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
    }
  };

  const handleCheckboxChange = (fieldId: string, option: string, checked: boolean) => {
    const currentOptions = answers[fieldId] || [];
    let updatedOptions;
    if (checked) {
      updatedOptions = [...currentOptions, option];
    } else {
      updatedOptions = currentOptions.filter((o: string) => o !== option);
    }
    handleInputChange(fieldId, updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    // Validate
    const newErrors: Record<string, string> = {};
    form.fields.forEach((field) => {
      if (field.required) {
        const val = answers[field.id];
        if (
          val === undefined ||
          val === null ||
          val === "" ||
          (Array.isArray(val) && val.length === 0)
        ) {
          newErrors[field.id] = `${field.label} is required`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorId = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-container-${firstErrorId}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/forms/${id}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit form");
      }

      setSubmitted(true);
    } catch (err: any) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center font-medium text-emerald-600">
          Loading form...
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Form Not Found</h2>
          <p className="mt-2 text-gray-600">The form you are looking for does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-5xl">
            ✓
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">Thank You!</h1>
          <p className="mt-4 text-lg text-gray-600">Your response has been successfully recorded.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              const resetAnswers: Record<string, any> = {};
              form.fields.forEach((field) => {
                if (field.type === "checkbox") {
                  resetAnswers[field.id] = [];
                } else {
                  resetAnswers[field.id] = "";
                }
              });
              setAnswers(resetAnswers);
              setErrors({});
            }}
            className="mt-8 rounded-xl bg-emerald-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700"
          >
            Submit Another Response
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F8FB] py-12 px-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Title Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm border-t-8 border-t-emerald-600">
          <h1 className="text-4xl font-extrabold text-gray-900">{form.title}</h1>
          {form.description && (
            <p className="mt-3 text-lg text-gray-600 whitespace-pre-line">{form.description}</p>
          )}
          <div className="mt-4 text-xs font-semibold text-red-500">* Required field</div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.fields.map((field) => {
            const hasError = !!errors[field.id];
            return (
              <div
                key={field.id}
                id={`field-container-${field.id}`}
                className={`rounded-3xl border bg-white p-8 shadow-sm transition-all ${
                  hasError ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"
                }`}
              >
                <label className="block text-xl font-bold text-gray-800 mb-4">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>

                {/* Text / Email / Number / Date */}
                {(field.type === "text" ||
                  field.type === "email" ||
                  field.type === "number" ||
                  field.type === "date") && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={answers[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                )}

                {/* Textarea */}
                {field.type === "textarea" && (
                  <textarea
                    rows={4}
                    placeholder={field.placeholder}
                    value={answers[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                )}

                {/* Dropdown */}
                {field.type === "dropdown" && (
                  <select
                    value={answers[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 bg-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="" disabled>Select an option</option>
                    {(field.options ?? []).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {/* Radio */}
                {field.type === "radio" && (
                  <div className="space-y-3">
                    {(field.options ?? []).map((option, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name={`radio-${field.id}`}
                          checked={answers[field.id] === option}
                          onChange={() => handleInputChange(field.id, option)}
                          className="h-5 w-5 accent-emerald-600 cursor-pointer"
                        />
                        <span className="text-gray-700 font-medium group-hover:text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Checkbox */}
                {field.type === "checkbox" && (
                  <div className="space-y-3">
                    {(field.options ?? ["Yes/Agree"]).map((option, index) => {
                      const checked = (answers[field.id] || []).includes(option);
                      return (
                        <label key={index} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                            className="h-5 w-5 accent-emerald-600 cursor-pointer"
                          />
                          <span className="text-gray-700 font-medium group-hover:text-gray-900">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {hasError && (
                  <p className="mt-3 text-sm font-semibold text-red-500">
                    ⚠ {errors[field.id]}
                  </p>
                )}
              </div>
            );
          })}

          {/* Submit button */}
          <div className="flex justify-end py-4">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-10 py-4 font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {submitting ? "Submitting Response..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
