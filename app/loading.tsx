import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col items-center justify-center">
      <div className="text-center max-w-lg mx-auto space-y-8">

        {/* Spinner */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#d6c3a5]/20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-[#d6c3a5] animate-spin" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Memuat Halaman...
          </h2>
          <p className="text-sm text-slate-400">
            Mohon tunggu sebentar
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#d6c3a5] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#d6c3a5] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#d6c3a5] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
