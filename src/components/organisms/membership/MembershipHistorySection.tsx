"use client";

import { useMemo, useState } from "react";
import { useMemberMembershipStore } from "@/src/store/member/membership";

type HistoryFilter = "all" | "earned" | "spent";

const FILTERS: { value: HistoryFilter; label: string; activeClass: string }[] = [
  { value: "all", label: "Semua", activeClass: "bg-slate-900 text-white" },
  {
    value: "earned",
    label: "Poin Masuk",
    activeClass: "bg-emerald-700 text-white",
  },
  {
    value: "spent",
    label: "Poin Terpakai",
    activeClass: "bg-amber-700 text-white",
  },
];

const MembershipHistorySection = () => {
  const historyLedger = useMemberMembershipStore(
    (state) => state.historyLedger
  );
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");

  const filteredHistory = useMemo(() => {
    if (historyFilter === "all") return historyLedger;
    return historyLedger.filter((item) => item.type === historyFilter);
  }, [historyLedger, historyFilter]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Riwayat Perubahan Poin
          </h3>
          <p className="text-xs text-slate-500">
            Catatan transaksi poin reward yang diperoleh dan ditukarkan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setHistoryFilter(filter.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                historyFilter === filter.value
                  ? filter.activeClass
                  : "bg-stone-100 text-slate-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    item.type === "earned"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {item.type === "earned" ? "Poin Masuk" : "Penukaran"}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {item.title}
                </h4>
              </div>
              <p className="text-slate-500 text-[11px]">
                {item.date} • {item.branch}
              </p>
            </div>

            <div className="self-end sm:self-auto text-right">
              <span
                className={`text-sm font-extrabold ${
                  item.type === "earned" ? "text-emerald-600" : "text-amber-700"
                }`}
              >
                {item.amount}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Ref: {item.reference}
              </span>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center text-xs text-slate-500">
            Belum ada transaksi poin pada kategori ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipHistorySection;
