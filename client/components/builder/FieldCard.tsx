"use client";

import { FormField } from "./types";

interface FieldCardProps {
  field: FormField;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function FieldCard({
  field,
  selected,
  onSelect,
  onDelete,
}: FieldCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl border bg-white p-5 transition-all ${
        selected
          ? "border-emerald-500 ring-2 ring-emerald-200"
          : "border-gray-200 hover:border-emerald-300"
      }`}
    >
      {/* Delete Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-4 top-4 rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
      >
        Delete
      </button>

      {/* Label */}
      <label className="mb-2 block font-semibold text-gray-800">
        {field.label}
        {field.required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {/* Preview */}
      {field.type === "textarea" ? (
        <textarea
          disabled
          placeholder={field.placeholder}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-500"
        />
      ) : field.type === "dropdown" ? (
        <select
          disabled
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-500"
        >
          {field.options?.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <div className="flex items-center gap-2">
          <input type="checkbox" disabled />
          <span className="text-gray-600">
            {field.options?.[0] || "Checkbox"}
          </span>
        </div>
      ) : field.type === "radio" ? (
        <div className="space-y-2">
          {field.options?.map((option, index) => (
            <label key={index} className="flex items-center gap-2">
              <input type="radio" disabled />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <input
          disabled
          type={field.type}
          placeholder={field.placeholder}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-500"
        />
      )}
    </div>
  );
}