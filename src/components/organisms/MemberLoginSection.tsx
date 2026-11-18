"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  Info,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/src/services/mutation/login/user";

// Indonesian-friendly phone: optional +, digits with optional spaces/dashes (8-15 digits)
const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{6,18}[0-9]$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email atau nomor HP wajib diisi")
    .test(
      "email-or-phone",
      "Masukkan email atau nomor HP yang valid",
      (value) => EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value),
    ),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

export default function MemberLoginSection() {
  const router = useRouter();
  
  // Modal States
  const [activeModal, setActiveModal] = useState<
    "whatsapp" | "forgot"| null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");

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
    setFormError("");

    loginUser(
      { username: values.email, password: values.password },
      {
        onSuccess: (response) => {
          if (response.status) {
            toast.success("Login berhasil. Selamat datang kembali di Familia Vet & Care!");
            router.push("/profile");
          } else {
            const message =
              response.message || "Login gagal. Silakan coba lagi.";
            setFormError(message);
            toast.error(message);
          }
        },
        // The error toast itself comes from the global MutationCache handler
        onError: (err) => {
          setFormError(err.message || "Email atau kata sandi salah.");
        },
      }
    );
  };

  return (
    <>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto">
          {/* LEFT COLUMN: Login Card & Registration Notice */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Main Title Heading */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Treat Your Pets Like Your Own{" "}
                <span className="text-[#d6c3a5]">Familia</span>
              </h1>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Masuk ke akun Anda untuk mengakses riwayat rekam medis, jadwal
                vaksinasi, pemesanan pet hotel, serta konsultasi online anabul
                kesayangan.
              </p>
            </div>

            {/* LOGIN FORM CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xl shadow-stone-900/5 relative">
              {formError && (
                <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Email atau Nomor HP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      inputMode="email"
                      autoComplete="username"
                      {...register("email")}
                      placeholder="nama@email.com atau 08123456789"
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B88E39] focus:bg-white transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveModal("forgot")}
                      className="text-xs text-[#9E782F] hover:text-[#7A5B1F] font-semibold transition-colors"
                    >
                      Lupa Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Masukkan kata sandi Anda"
                      className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5] border border-stone-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B88E39] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-rose-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#B88E39] border-stone-300 focus:ring-[#B88E39] focus:ring-offset-0"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      Ingat saya di perangkat ini
                    </span>
                  </label>
                </div>

                {/* Primary Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-lg shadow-slate-900/15 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memverifikasi Akun...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Akun Pelanggan</span>
                      <ArrowRight className="w-4 h-4 text-[#D8B467]" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* REQUIRED FEATURE: Account Registration Instructions */}
            <div className="bg-[#FAF4EB] border border-[#E8DCC8] rounded-3xl p-5 sm:p-6 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EBDABF] flex items-center justify-center shrink-0 text-[#8C6B28] mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Belum Memiliki Akun Pelanggan?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pendaftaran akun pelanggan baru{" "}
                    <span className="font-semibold text-slate-900">
                      tidak dapat dilakukan secara manual via online
                    </span>{" "}
                    demi keamanan data rekam medis pasien. Silakan hubungi Admin
                    WhatsApp kami atau kunjungi langsung outlet/klinik Familia
                    Vet & Care terdekat.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => setActiveModal("whatsapp")}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-md shadow-emerald-600/10 transition-all active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Daftar via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sistem Rekam Medis Terenkripsi & Terlindungi SSL</span>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: WHATSAPP REGISTRATION ASSISTANT */}
      {activeModal === "whatsapp" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Pendaftaran Akun via WhatsApp
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Tim Layanan Pelanggan Familia Vet & Care siap membantu
              mendaftarkan profil Anda dan hewan peliharaan Anda secara langsung.
            </p>

            <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900">
                Persyaratan Pendaftaran Quick-Reg:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Nama Pemilik & Alamat Email Aktif</li>
                <li>Nomor Telepon / WhatsApp</li>
                <li>Nama Anabul, Jenis Hewan & Usia</li>
              </ul>
            </div>

            <div className="mt-6 space-y-2.5">
              <a
                href="https://wa.me/6281227662988?text=Halo%20Admin%20Familia%20Vet%20%26%20Care,%20saya%20ingin%20mendaftar%20akun%20membership%20baru."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Buka WhatsApp (0812-2766-2988)</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 px-4 rounded-full border border-stone-200 text-slate-600 font-semibold text-xs hover:bg-stone-50 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FORGOT PASSWORD */}
      {activeModal === "forgot" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#FAF4EB] text-[#B88E39] flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Reset Kata Sandi via WhatsApp
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Untuk menjaga keamanan data, pemulihan kata sandi dilakukan
              langsung oleh Admin kami melalui chat WhatsApp.
            </p>

            <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900">
                Proses Reset Kata Sandi:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Chat Admin WhatsApp kami</li>
                <li>Sebutkan email yang terdaftar pada akun Anda</li>
                <li>Admin akan memverifikasi dan mengirimkan kata sandi baru</li>
              </ul>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href="https://wa.me/6281227662988?text=Halo%20Admin%20Familia%20Vet%20%26%20Care%2C%20saya%20ingin%20mereset%20kata%20sandi%20akun%20saya."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat Admin (0812-2766-2988)</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
