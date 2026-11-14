"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginUserMutation } from "@/src/services/mutation/login/user";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const { mutate: loginUser, isPending: loading } = useLoginUserMutation();

  const onSubmit = (values: LoginFormValues) => {
    setError("");

    loginUser(
      { username: values.email, password: values.password },
      {
        onSuccess: (response) => {
          if (response.status) {
            router.push(redirectTo);
          } else {
            setError(response.message || "Login failed. Please try again.");
          }
        },
        onError: (err) => {
          setError(err.message || "Invalid email or password.");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
            Familia's Admin Panel
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Sign in to manage dashboard
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("email")}
              autoComplete="email"
              className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-[#DC2626]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-[#374151]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                autoComplete="current-password"
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 pr-11 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#9CA3AF] transition-colors hover:text-[#374151] focus:outline-none focus:text-[#374151]"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Eye aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-[#DC2626]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
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
};
