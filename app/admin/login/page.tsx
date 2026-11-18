"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import { useLoginUserMutation } from "@/src/services/mutation/login/user";
import { cn } from "@/lib/utils";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

const inputClass =
  "h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] transition-colors focus:outline-none focus:ring-2";

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

  const { mutate: loginUser, isPending: isLoading } = useLoginUserMutation();

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
      },
    );
  };

  return (
    <div className="grid min-h-dvh bg-[#F7F5F0] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-[#1A1A1A] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#d6c3a5]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[#d6c3a5]/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6c3a5] text-[#1A1A1A]">
            <PawPrint aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Familia Vet &amp; Care
          </span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight">
            Manage members, points, and rewards in one place.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            The admin panel for the Familia membership program.
          </p>
        </div>

        <p className="relative flex items-center gap-2 text-sm text-white/60">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
          Authorized staff access only
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] text-[#d6c3a5]">
              <PawPrint aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold tracking-tight text-[#1A1A1A]">
              Familia Admin
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#6B7280]">
            Sign in to your admin account to continue.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-3 text-sm text-[#B91C1C]"
              >
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#374151]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                placeholder="admin@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={cn(
                  inputClass,
                  errors.email
                    ? "border-[#DC2626] focus:ring-[#DC2626]/20"
                    : "border-[#D1D5DB] focus:border-[#1A1A1A] focus:ring-[#d6c3a5]/50",
                )}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-[#B91C1C]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  {...register("password")}
                  className={cn(
                    inputClass,
                    "pr-12",
                    errors.password
                      ? "border-[#DC2626] focus:ring-[#DC2626]/20"
                      : "border-[#D1D5DB] focus:border-[#1A1A1A] focus:ring-[#d6c3a5]/50",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-lg text-[#6B7280] transition-colors hover:text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Eye aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs text-[#B91C1C]"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1A1A1A] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 motion-safe:animate-spin"
                  />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
