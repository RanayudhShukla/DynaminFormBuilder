"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import FieldCard from "./FieldCard";
import { FormField } from "./types";

interface FormCanvasProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onDeleteField: (id: string) => void;
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (desc: string) => void;
}

function SortableItem({
  field,
  selected,
  onSelect,
  onDelete,
}: {
  field: FormField;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag Handle */}
      <div
        className="mb-2 flex cursor-grab items-center text-sm font-medium text-gray-400"
        {...attributes}
        {...listeners}
      >
        ☰ Drag to reorder
      </div>

      <FieldCard
        field={field}
        selected={selected}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    </div>
  );
}

export default function FormCanvas({
  fields,
  selectedFieldId,
  onSelectField,
  onDeleteField,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: FormCanvasProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Form Title */}
      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full bg-transparent text-4xl font-bold text-gray-900 outline-none focus:border-b focus:border-gray-200"
        placeholder="Untitled Form"
      />

      {/* Form Description */}
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        rows={2}
        className="mt-3 w-full resize-none bg-transparent text-gray-500 outline-none focus:border-b focus:border-gray-200"
        placeholder="Add a description for your form..."
      />

      <div className="my-8 h-px bg-gray-200" />

      {fields.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            No fields added yet
          </h3>

          <p className="mt-2 text-gray-500">
            Click a field from the left panel to add it to your form.
          </p>
        </div>
      ) : (
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {fields.map((field) => (
              <SortableItem
                key={field.id}
                field={field}
                selected={selectedFieldId === field.id}
                onSelect={() => onSelectField(field.id)}
                onDelete={() => onDeleteField(field.id)}
              />
            ))}
          </div>
        </SortableContext>
      )}

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