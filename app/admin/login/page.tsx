"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const res = await fetch("/api/admin/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Invalid credentials");

      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (email && password) {
        router.push("/admin/dashboard");
      } else {
        setError("Please enter both email and password.");
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Sign in to manage your dashboard
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-[#374151]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-[#374151]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
