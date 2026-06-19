"use client";

import { FormField } from "./types";

interface PropertiesPanelProps {
  selectedField: FormField | null;
  onUpdateField: (updated: FormField) => void;
}

export default function PropertiesPanel({
  selectedField,
  onUpdateField,
}: PropertiesPanelProps) {
  if (!selectedField) {
    return (
      <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Field Properties
        </h2>

        <div className="rounded-2xl bg-gray-50 p-5 text-center text-gray-500">
          Select a field from the canvas to edit its properties.
        </div>
      </aside>
    );
  }

  return (
    <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-gray-900">
        Field Properties
      </h2>

      {/* Label */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Label
        </label>

        <input
          type="text"
          value={selectedField.label}
          onChange={(e) =>
            onUpdateField({
              ...selectedField,
              label: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-emerald-500"
        />
      </div>

      {/* Placeholder */}
      {selectedField.type !== "checkbox" &&
        selectedField.type !== "radio" && (
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Placeholder
            </label>

            <input
              type="text"
              value={selectedField.placeholder || ""}
              onChange={(e) =>
                onUpdateField({
                  ...selectedField,
                  placeholder: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-emerald-500"
            />
          </div>
        )}

      {/* Required */}
      <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 p-4">
        <span className="font-medium text-gray-700">
          Required Field
        </span>

        <input
          type="checkbox"
          checked={selectedField.required}
          onChange={(e) =>
            onUpdateField({
              ...selectedField,
              required: e.target.checked,
            })
          }
          className="h-5 w-5 accent-emerald-600"
        />
      </div>

      {/* Dropdown / Radio Options */}
      {(selectedField.type === "dropdown" ||
        selectedField.type === "radio") && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Options (one per line)
          </label>

          <textarea
            rows={6}
            value={(selectedField.options || []).join("\n")}
            onChange={(e) =>
              onUpdateField({
                ...selectedField,
                options: e.target.value
                  .split("\n")
                  .filter((x) => x.trim() !== ""),
              })
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-emerald-500"
          />
        </div>
      )}
    </aside>
  );
}