export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 px-4 py-10">
      {/* Logo */}
      <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white">
        FormSmith
      </h1>

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Forgot Password?
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm font-semibold text-emerald-600 hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </main>
  );
}