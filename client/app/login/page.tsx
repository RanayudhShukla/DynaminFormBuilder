export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <h1 className="mb-8 text-5xl font-extrabold text-white tracking-tight">
        FormSmith
      </h1>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-center text-4xl font-bold text-gray-900">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Sign in to continue to your dashboard.
        </p>

        <form className="mt-8 space-y-5">
          {/* Email */}
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
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <a
                href="/forgotpass"
                className="text-sm text-emerald-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-emerald-600" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-3 text-lg font-semibold text-white transition hover:bg-emerald-700"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-emerald-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}