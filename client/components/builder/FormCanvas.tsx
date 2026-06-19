"use client";

import FieldCard from "./FieldCard";
import { FormField } from "./types";

interface FormCanvasProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onDeleteField: (id: string) => void;
}

export default function FormCanvas({
  fields,
  selectedFieldId,
  onSelectField,
  onDeleteField,
}: FormCanvasProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Form Title */}
      <input
        defaultValue="Untitled Form"
        className="w-full bg-transparent text-4xl font-bold text-gray-900 outline-none"
      />

      {/* Description */}
      <textarea
        defaultValue="Add a description for your form..."
        rows={2}
        className="mt-3 w-full resize-none bg-transparent text-gray-500 outline-none"
      />

      <div className="my-8 h-px bg-gray-200" />

      {/* Dynamic Fields */}
      <div className="space-y-5">
        {fields.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No fields added yet
            </h3>

            <p className="mt-2 text-gray-500">
              Click a field from the left panel to start building your form.
            </p>
          </div>
        ) : (
          fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              selected={selectedFieldId === field.id}
              onSelect={() => onSelectField(field.id)}
              onDelete={() => onDeleteField(field.id)}
            />
          ))
        )}
      </div>

      {/* Submit Button Preview */}
      {fields.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 font-semibold text-white"
          >
            Submit
          </button>
        </div>
      )}
    </section>
  );
}