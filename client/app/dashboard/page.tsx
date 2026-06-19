"use client";

import { useRouter } from "next/navigation";



export default function DashboardPage() {
    const router = useRouter();
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-3xl font-extrabold text-emerald-600">
            FormSmith
          </h1>
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-4">
          <button className="rounded-xl bg-emerald-50 px-4 py-3 text-left font-semibold text-emerald-700">
            🏠 Dashboard
          </button>

          <button className="rounded-xl px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
            📝 My Forms
          </button>

          <button className="rounded-xl px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
            📥 Responses
          </button>

          <button className="rounded-xl px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
            📊 Analytics
          </button>

          <button className="rounded-xl px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500">
              Manage all your forms from one place.
            </p>
          </div>

          <button 
            onClick={() => router.push("/builder")}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg hover:opacity-90">
            + Create Form
          </button>
        </header>

        <main className="flex-1 p-8">
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Total Forms", "0"],
              ["Responses", "0"],
              ["Views", "0"],
            ].map(([title, value]) => (
              <div
                key={title}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="mt-3 text-5xl font-bold text-emerald-600">
                  {value}
                </h3>
              </div>
            ))}
          </div>

          {/* Templates */}
          <section className="mt-10">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Start a New Form
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="cursor-pointer rounded-3xl border-2 border-dashed border-emerald-300 bg-white p-8 text-center transition hover:border-emerald-500 hover:shadow-lg">
                <div className="text-6xl text-emerald-600">+</div>
                <p className="mt-4 text-lg font-semibold text-gray-800">
                  Blank Form
                </p>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h4 className="text-emerald-600 font-bold">Contact Form</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Collect user enquiries.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h4 className="text-emerald-600 font-bold">Feedback Form</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Gather customer feedback.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h4 className="text-emerald-600 font-bold">Survey Form</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Create surveys quickly.
                </p>
              </div>
            </div>
          </section>

          {/* Recent Forms */}
          <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Recent Forms
              </h3>

              <button className="text-emerald-600 hover:underline">
                View All
              </button>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center">
              <p className="text-xl font-semibold text-gray-700">
                No forms created yet
              </p>

              <p className="mt-2 text-gray-500">
                Click <strong>Create Form</strong> to build your first form.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}