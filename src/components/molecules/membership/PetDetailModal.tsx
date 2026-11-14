"use client";

import { useState } from "react";
import Image from "next/image";
import { Stethoscope, Syringe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";
import { IPet } from "@/src/interfaces/member/membership";

interface PetDetailModalProps {
  pet: IPet | null;
  initialTab?: "medical" | "vaccines";
  onOpenChange: (open: boolean) => void;
}

const PetDetailModal = ({
  pet,
  initialTab = "medical",
  onOpenChange,
}: PetDetailModalProps) => {
  const [activeSubTab, setActiveSubTab] = useState<"medical" | "vaccines">(
    initialTab
  );

  return (
    <Dialog open={!!pet} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {pet && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#B88E39] shrink-0">
                  <Image
                    src={pet.avatar}
                    alt={pet.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl font-extrabold text-slate-900">
                      {pet.name}
                    </DialogTitle>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#8C6B28] text-[10px] font-bold border border-amber-200">
                      {pet.species}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ras: {pet.breed}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveSubTab("medical")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeSubTab === "medical"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600"
                }`}
              >
                <Stethoscope
                  className={`w-4 h-4 ${
                    activeSubTab === "medical"
                      ? "text-[#B88E39]"
                      : "text-slate-400"
                  }`}
                />
                <span>Riwayat Medis ({pet.medicalHistory?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab("vaccines")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeSubTab === "vaccines"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600"
                }`}
              >
                <Syringe
                  className={`w-4 h-4 ${
                    activeSubTab === "vaccines"
                      ? "text-[#B88E39]"
                      : "text-slate-400"
                  }`}
                />
                <span>Jadwal Vaksinasi ({pet.vaccines?.length || 0})</span>
              </button>
            </div>

            {/* Medical History Entries */}
            {activeSubTab === "medical" && (
              <div className="space-y-4">
                {pet.medicalHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] space-y-3"
                  >
                    <div className="flex items-start justify-between border-b border-stone-200/70 pb-2">
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-900 mt-1">
                          {item.type}
                        </h5>
                        <p className="text-[11px] text-slate-500">{item.date}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {!item.rawatInapRecap && (
                        <>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold">
                              Suhu Badan:
                            </span>
                            <p className="font-semibold text-slate-900">
                              {item.temp ?? ""}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold">
                              Berat Badan:
                            </span>
                            <p className="font-semibold text-slate-900">
                              {item.weight ?? ""}
                            </p>
                          </div>
                        </>
                      )}
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">
                          Keluhan:
                        </span>
                        <p className="font-semibold text-slate-900">
                          {item.diagnosis ?? ""}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">
                          Tindakan Medis:
                        </span>
                        <p className="text-slate-700">{item.treatment}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">
                          Note:
                        </span>
                        <p className="text-slate-700">{item.note ?? "-"}</p>
                      </div>
                    </div>

                    {item.rawatInapRecap && (
                      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
                        <div className="mb-2.5 flex items-center justify-between border-b border-slate-200/80 pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Update Rawat Inap
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Berat Badan
                            </span>
                            <span className="font-semibold text-slate-700">
                              {item.rawatInapRecap.beratBadan}
                            </span>
                          </div>
                          <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Suhu
                            </span>
                            <span className="font-semibold text-slate-700">
                              {item.rawatInapRecap.suhu}
                            </span>
                          </div>
                          <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Makan
                            </span>
                            <span className="font-semibold text-slate-700">
                              {item.rawatInapRecap.makan}
                            </span>
                          </div>
                          <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Pup
                            </span>
                            <span className="font-semibold text-slate-700">
                              {item.rawatInapRecap.pup}
                            </span>
                          </div>
                          <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Pip
                            </span>
                            <span className="font-semibold text-slate-700">
                              {item.rawatInapRecap.pip}
                            </span>
                          </div>
                          <div className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Muntah
                            </span>
                            <span className="font-semibold text-slate-700">
                              {item.rawatInapRecap.muntah}
                            </span>
                          </div>
                        </div>

                        {item.rawatInapRecap.catatan && (
                          <div className="mt-2.5 rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
                            <span className="block text-[10px] font-medium text-slate-400">
                              Catatan Dokter/Paramedis
                            </span>
                            <p className="mt-0.5 text-slate-600 leading-relaxed">
                              {item.rawatInapRecap.catatan}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Vaccines Entries */}
            {activeSubTab === "vaccines" && (
              <div className="space-y-4">
                {pet.vaccines.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-slate-900">{v.name}</h5>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {v.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Diberikan: {v.dateGiven} • Jadwal Berikutnya:{" "}
                      <strong className="text-[#B88E39]">{v.dueDate}</strong>
                    </p>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <BaseButton
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => onOpenChange(false)}
              >
                Tutup
              </BaseButton>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PetDetailModal;
