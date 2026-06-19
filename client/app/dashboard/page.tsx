"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

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
  views: number;
  submissionsCount: number;
  createdAt: string;
}

interface Submission {
  _id: string;
  formId: string;
  answers: Record<string, any>;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();

  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [shareForm, setShareForm] = useState<Form | null>(null);
  const [viewResponsesForm, setViewResponsesForm] = useState<Form | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    const loadForms = async () => {
      try {
        const res = await fetch("/api/forms");
        const data = await res.json();
        setForms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadForms();
  }, [authLoading, user, router]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this form? All responses will be lost."
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/forms/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setForms((prev) => prev.filter((form) => form._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete form.");
    }
  };

  const loadSubmissions = async (form: Form) => {
    setViewResponsesForm(form);
    setLoadingSubmissions(true);
    try {
      const res = await fetch(`/api/forms/${form._id}/submissions`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToCSV = (form: Form, subs: Submission[]) => {
    if (subs.length === 0) {
      alert("No responses to export.");
      return;
    }

    // Headers
    const headers = ["Submission Date", ...form.fields.map((f) => f.label)];
    
    // Rows
    const rows = subs.map((sub) => {
      const date = new Date(sub.createdAt).toLocaleString();
      const answers = form.fields.map((field) => {
        const ans = sub.answers[field.id];
        if (ans === undefined || ans === null) return "";
        if (Array.isArray(ans)) return `"${ans.join(", ")}"`;
        return `"${String(ans).replace(/"/g, '""')}"`;
      });
      return [date, ...answers];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${form.title.replace(/\s+/g, "_")}_responses.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const totalForms = forms.length;
  const totalViews = forms.reduce((sum, form) => sum + (form.views || 0), 0);
  const totalSubmissions = forms.reduce(
    (sum, form) => sum + (form.submissionsCount || 0),
    0
  );

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center font-medium text-emerald-600">
          Loading session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-600">
              FormSmith
            </h1>
            <p className="text-sm text-gray-500">
              Manage your forms from one place
            </p>
          </div>
          <span className="hidden md:inline-block h-8 w-px bg-gray-200"></span>
          <div className="hidden md:block">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold text-gray-700">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/builder")}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white shadow hover:shadow-lg transition"
          >
            + Create Form
          </button>
          
          <button
            onClick={logout}
            className="rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-8 w-full flex-grow">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <p className="text-gray-500 font-medium">Total Forms</p>
            <h2 className="mt-2 text-5xl font-bold text-emerald-600">
              {totalForms}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <p className="text-gray-500 font-medium">Total Views</p>
            <h2 className="mt-2 text-5xl font-bold text-emerald-600">
              {totalViews}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <p className="text-gray-500 font-medium">Total Responses</p>
            <h2 className="mt-2 text-5xl font-bold text-emerald-600">
              {totalSubmissions}
            </h2>
          </div>
        </div>

        {/* My Forms */}
        <section className="mt-10 rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              My Forms
            </h2>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500 font-medium">
              Loading forms...
            </div>
          ) : forms.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
              <p className="text-xl font-bold text-gray-700">
                No forms yet
              </p>
              <p className="mt-2 text-gray-500">
                Click <strong>Create Form</strong> to build your first form.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form._id}
                  className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:border-emerald-300"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900">
                      {form.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                      <span>🛠 {form.fields.length} Field(s)</span>
                      <span>👁 {form.views || 0} View(s)</span>
                      <span>📥 {form.submissionsCount || 0} Response(s)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      onClick={() => router.push(`/builder/${form._id}`)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="rounded-xl border border-emerald-600 px-4 py-2.5 text-sm font-semibold text-emerald-600 bg-white transition hover:bg-emerald-50"
                      onClick={() => setShareForm(form)}
                    >
                      🔗 Share
                    </button>

                    <button
                      className="rounded-xl border border-emerald-600 px-4 py-2.5 text-sm font-semibold text-emerald-600 bg-white transition hover:bg-emerald-50"
                      onClick={() => loadSubmissions(form)}
                    >
                      📊 Responses
                    </button>

                    <button
                      className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                      onClick={() => handleDelete(form._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Share Modal */}
      {shareForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Form</h3>
            <p className="text-gray-500 text-sm mb-4">
              People can submit responses using this link or by scanning the QR code below.
            </p>

            {/* QR Code */}
            <div className="flex justify-center bg-gray-50 rounded-2xl p-4 mb-4 border">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.origin + `/form/${shareForm._id}`
                )}`}
                alt="Form QR Code"
                className="h-44 w-44 object-contain rounded-xl"
              />
            </div>

            {/* URL Input */}
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                readOnly
                value={window.location.origin + `/form/${shareForm._id}`}
                className="w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
              />
              <button
                onClick={() =>
                  copyToClipboard(window.location.origin + `/form/${shareForm._id}`)
                }
                className="rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 shrink-0"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <button
              onClick={() => setShareForm(null)}
              className="w-full rounded-xl bg-gray-100 py-3 font-semibold text-gray-700 hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Responses Modal */}
      {viewResponsesForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {viewResponsesForm.title} - Responses
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Total Submissions: {submissions.length}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => exportToCSV(viewResponsesForm, submissions)}
                  disabled={submissions.length === 0}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  📥 Export CSV
                </button>
                <button
                  onClick={() => {
                    setViewResponsesForm(null);
                    setSubmissions([]);
                  }}
                  className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-auto border rounded-2xl bg-gray-50">
              {loadingSubmissions ? (
                <div className="py-20 text-center text-gray-500 font-medium">
                  Loading responses...
                </div>
              ) : submissions.length === 0 ? (
                <div className="py-20 text-center text-gray-500 font-medium">
                  No responses recorded yet for this form.
                </div>
              ) : (
                <table className="w-full border-collapse text-left text-sm text-gray-700">
                  <thead className="sticky top-0 bg-white border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Submission Date</th>
                      {viewResponsesForm.fields.map((field) => (
                        <th key={field.id} className="px-6 py-4">
                          {field.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submissions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-gray-100 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                          {new Date(sub.createdAt).toLocaleString()}
                        </td>
                        {viewResponsesForm.fields.map((field) => {
                          const ans = sub.answers[field.id];
                          let displayVal = "";
                          if (ans !== undefined && ans !== null) {
                            if (Array.isArray(ans)) {
                              displayVal = ans.join(", ");
                            } else {
                              displayVal = String(ans);
                            }
                          }
                          return (
                            <td key={field.id} className="px-6 py-4 max-w-xs truncate">
                              {displayVal || "-"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}