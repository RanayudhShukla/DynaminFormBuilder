"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BuilderPage from "../page";

export default function EditFormPage() {
  const { id } = useParams();

  const [form, setForm] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const res = await fetch(`/api/forms/${id}`);
        if (!res.ok) {
          throw new Error("Form not found");
        }
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    loadForm();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Form Not Found</h2>
          <p className="mt-2 text-gray-600">The form you are trying to edit does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center font-medium text-gray-500">
          Loading form editor...
        </div>
      </div>
    );
  }

  return <BuilderPage initialForm={form} />;
}