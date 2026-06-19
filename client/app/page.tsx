import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-200 px-8 py-5">
        <h1 className="text-3xl font-extrabold text-emerald-600">
          FormSmith
        </h1>

        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
          >
            Features
          </a>

          <a
            href="/builder"
            className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
          >
            Form Builder
          </a>

          <a
            href="#analytics"
            className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
          >
            Analytics
          </a>

          <a
            href="#contact"
            className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
          >
            Contact
          </a>

          <a
            href="\login"
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          🚀 Create • Customize • Share • Analyze
        </span>

        <h2 className="text-6xl font-extrabold text-gray-900">
          Dynamic Form Builder
        </h2>

        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          Build powerful forms with drag-and-drop, collect responses in
          real-time, share them instantly, export data, track analytics,
          generate QR codes, and manage everything from one dashboard.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700">
            Get Started
          </button>

          <button className="rounded-xl border border-emerald-600 px-8 py-4 font-semibold text-emerald-600 transition hover:bg-emerald-50">
            Explore Features
          </button>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="bg-gray-50 px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-bold text-gray-900">
            Everything You Need to Build Forms
          </h2>

          <p className="mt-4 text-center text-gray-600">
            FormSmith provides all the essential tools to create, share and manage
            forms with ease.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600">
                🔐 User Authentication
              </h3>
              <p className="mt-2 text-gray-600">
                Secure sign up, login and account management.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600">
                🛠 Dynamic Form Builder
              </h3>
              <p className="mt-2 text-gray-600">
                Drag & drop fields and customize forms visually.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600">
                📤 Form Sharing
              </h3>
              <p className="mt-2 text-gray-600">
                Share forms using public links or QR codes.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600">
                📥 Response Collection
              </h3>
              <p className="mt-2 text-gray-600">
                Collect and store submissions in real time.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600">
                📊 Analytics Dashboard
              </h3>
              <p className="mt-2 text-gray-600">
                Track views, submissions and response statistics.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600">
                📄 Export Responses
              </h3>
              <p className="mt-2 text-gray-600">
                Download responses in CSV or Excel format.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
