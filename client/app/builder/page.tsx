"use client";

import { useMemo, useState } from "react";
import Toolbox from "@/components/builder/Toolbox";
import FormCanvas from "@/components/builder/FormCanvas";
import PropertiesPanel from "@/components/builder/PropertiesPanel";
import { FormField } from "@/components/builder/types";

export default function BuilderPage() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Add new field
  const handleAddField = (field: FormField) => {
    setFields((prev) => [...prev, field]);
    setSelectedId(field.id);
  };

  // Delete field
  const handleDeleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));

    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  // Update field
  const handleUpdateField = (updated: FormField) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === updated.id ? updated : field
      )
    );
  };

  // Selected field object
  const selectedField = useMemo(() => {
    return fields.find((f) => f.id === selectedId) || null;
  }, [fields, selectedId]);

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-600">
            FormSmith
          </h1>

          <p className="text-sm text-gray-500">
            Dynamic Form Builder
          </p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl border border-emerald-500 px-5 py-2 font-medium text-emerald-600 hover:bg-emerald-50">
            Preview
          </button>

          <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-2 font-semibold text-white shadow">
            Save Form
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left */}
        <div className="col-span-3">
          <Toolbox onAddField={handleAddField} />
        </div>

        {/* Center */}
        <div className="col-span-6">
          <FormCanvas
            fields={fields}
            selectedFieldId={selectedId}
            onSelectField={setSelectedId}
            onDeleteField={handleDeleteField}
          />
        </div>

        {/* Right */}
        <div className="col-span-3">
          <PropertiesPanel
            selectedField={selectedField}
            onUpdateField={handleUpdateField}
          />
        </div>
      </div>
    </div>
  );
}