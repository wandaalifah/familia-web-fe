"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRegisterAdminMutation } from "@/src/services/mutation/register/user";

const registerSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .min(1, "First name is required")
    .required("First name is required"),
  last_name: yup
    .string()
    .trim()
    .min(1, "Last name is required")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .min(8, "Phone must be at least 8 characters")
    .required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function AdminRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  // Redirect to the admin login page shortly after a successful registration
  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => {
      router.push("/admin/login");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [success, router]);

  const { mutate: registerAdmin, isPending: loading } = useRegisterAdminMutation();

  const onSubmit = (values: RegisterFormValues) => {
    setError("");

    registerAdmin(
      {
        email: values.email,
        password: values.password,
        phone: values.phone,
        first_name: values.first_name,
        last_name: values.last_name,
      },
      {
        onSuccess: (response) => {
          if (response.status) {
            setSuccess(true);
          } else {
            setError(response.message || "Registration failed. Please try again.");
          }
        },
        onError: (err) => {
          setError(err.message || "Registration failed. Please try again.");
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
            Admin Registration
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Create a new admin account
          </p>
        </div>

        {/* Register Card */}
        {success ? (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5]">
              <Check aria-hidden="true" className="h-6 w-6 text-[#059669]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              Registration successful
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              The admin account has been created. Redirecting you to sign in…
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block w-full rounded-lg bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/30"
            >
              Go to Sign In
            </Link>
          </div>
        ) : (
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

            {/* First Name Field */}
            <div className="mb-4">
              <label
                htmlFor="first-name"
                className="mb-1.5 block text-sm font-medium text-[#374151]"
              >
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="John"
                {...register("first_name")}
                autoComplete="given-name"
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
              />
              {errors.first_name && (
                <p className="mt-1.5 text-xs text-[#DC2626]">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div className="mb-4">
              <label
                htmlFor="last-name"
                className="mb-1.5 block text-sm font-medium text-[#374151]"
              >
                Last Name
              </label>
              <input
                id="last-name"
                {...register("last_name")}
                autoComplete="family-name"
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
              />
              {errors.last_name && (
                <p className="mt-1.5 text-xs text-[#DC2626]">
                  {errors.last_name.message}
                </p>
              )}
            </div>

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

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-[#374151]"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="081234567890"
                {...register("phone")}
                autoComplete="tel"
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-[#DC2626]">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
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
                  autoComplete="new-password"
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

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="mb-1.5 block text-sm font-medium text-[#374151]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3.5 py-2.5 pr-11 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-[#9CA3AF] transition-colors hover:text-[#374151] focus:outline-none focus:text-[#374151]"
                >
                  {showConfirmPassword ? (
                    <EyeOff aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Eye aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-[#DC2626]">
                  {errors.confirmPassword.message}
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
                  Creating account…
                </span>
              ) : (
                "Register"
              )}
            </button>

            {/* Link to Login */}
            <p className="mt-4 text-center text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#6366F1] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
