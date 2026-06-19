"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Toolbox from "@/components/builder/Toolbox";
import FormCanvas from "@/components/builder/FormCanvas";
import PropertiesPanel from "@/components/builder/PropertiesPanel";
import { FormField } from "@/components/builder/types";

interface BuilderPageProps {
  initialForm?: {
    _id: string;
    title: string;
    description: string;
    fields: FormField[];
  };
}

export default function BuilderPage({ initialForm }: BuilderPageProps) {
  const router = useRouter();

  const [formId, setFormId] = useState<string | null>(initialForm?._id || null);
  const [fields, setFields] = useState<FormField[]>(initialForm?.fields || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [title, setTitle] = useState(initialForm?.title || "Untitled Form");
  const [description, setDescription] = useState(initialForm?.description || "Add a description for your form...");
  const [saving, setSaving] = useState(false);

  // Add field
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

  // Drag reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setFields((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      );

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // Save form (POST if new, PUT if existing)
  const handleSaveForm = async () => {
    try {
      setSaving(true);

      const url = formId ? `/api/forms/${formId}` : "/api/forms";
      const method = formId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          fields,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save form");
      }

      const savedForm = await res.json();
      
      if (!formId) {
        setFormId(savedForm._id);
        // Replace URL in browser history without reloading to reflect editing state
        window.history.pushState(null, "", `/builder/${savedForm._id}`);
      }

      alert("✅ Form saved successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!formId) {
      alert("Please save the form before previewing.");
      return;
    }
    window.open(`/form/${formId}`, "_blank");
  };

  const selectedField = useMemo(() => {
    return fields.find((f) => f.id === selectedId) || null;
  }, [fields, selectedId]);

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push("/dashboard")}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            ← Back to Dashboard
          </button>
          <div>
            <h1 
              onClick={() => router.push("/dashboard")} 
              className="text-3xl font-extrabold text-emerald-600 cursor-pointer"
            >
              FormSmith
            </h1>
            <p className="text-sm text-gray-500">
              Dynamic Form Builder
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handlePreview}
            className="rounded-xl border border-emerald-500 px-5 py-2 font-medium text-emerald-600 hover:bg-emerald-50 transition"
          >
            Preview
          </button>

          <button
            onClick={handleSaveForm}
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-2 font-semibold text-white shadow disabled:opacity-50 transition"
          >
            {saving ? "Saving..." : "Save Form"}
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6 p-6">
        <div className="col-span-3">
          <Toolbox onAddField={handleAddField} />
        </div>

        <div className="col-span-6">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <FormCanvas
              fields={fields}
              selectedFieldId={selectedId}
              onSelectField={setSelectedId}
              onDeleteField={handleDeleteField}
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
            />
          </DndContext>
        </div>

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