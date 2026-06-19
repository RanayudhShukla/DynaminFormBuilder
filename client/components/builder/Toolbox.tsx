"use client";

import { FormField, FieldType } from "./types";

const fieldList: {
  type: FieldType;
  label: string;
  emoji: string;
}[] = [
  { type: "text", label: "Text", emoji: "📝" },
  { type: "email", label: "Email", emoji: "📧" },
  { type: "number", label: "Number", emoji: "🔢" },
  { type: "textarea", label: "Textarea", emoji: "📄" },
  { type: "dropdown", label: "Dropdown", emoji: "⬇️" },
  { type: "checkbox", label: "Checkbox", emoji: "☑️" },
  { type: "radio", label: "Radio", emoji: "🔘" },
  { type: "date", label: "Date", emoji: "📅" },
];

interface ToolboxProps {
  onAddField: (field: FormField) => void;
}

export default function Toolbox({ onAddField }: ToolboxProps) {
  const handleAdd = (type: FieldType, label: string) => {
    onAddField({
      id: crypto.randomUUID(),
      type,
      label,
      placeholder: `Enter ${label}`,
      required: false,
      options:
        type === "dropdown" || type === "radio"
          ? ["Option 1", "Option 2"]
          : [],
    });
  };

  return (
    <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-gray-900">
        Add Fields
      </h2>

      <div className="space-y-3">
        {fieldList.map((field) => (
          <button
            key={field.type}
            onClick={() => handleAdd(field.type, field.label)}
            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left font-medium text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50"
          >
            <span>{field.emoji}</span>
            <span>{field.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}