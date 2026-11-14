"use client";

import Image from "next/image";
import { Stethoscope, Syringe } from "lucide-react";
import { IPet } from "@/src/interfaces/member/membership";
import { calculateAge } from "@/src/utils/common/date";

interface PetCardProps {
  pet: IPet;
  onOpenDetail: (pet: IPet, initialTab: "medical" | "vaccines") => void;
}

const PetCard = ({ pet, onOpenDetail }: PetCardProps) => {
  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative h-44 w-full bg-stone-100">
          <Image
            src={pet.avatar}
            alt={pet.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
              {pet.species}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-extrabold text-slate-900">{pet.name}</h4>
            <span className="text-xs font-semibold text-[#B88E39] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              {pet.breed}
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 mb-4">
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-slate-400 font-medium">Usia:</span>
              <span className="font-bold text-slate-800">
                {calculateAge(pet.birthdate)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-slate-400 font-medium">Berat Badan:</span>
              <span className="font-bold text-slate-800">{pet.weight}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 font-medium">Catatan Medis:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                {pet.medicalHistory.length} Record Medis
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 space-y-2">
        <button
          type="button"
          onClick={() => onOpenDetail(pet, "medical")}
          className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <Stethoscope className="w-4 h-4 text-amber-400" />
          <span>Lihat Riwayat Medis ({pet.medicalHistory.length})</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenDetail(pet, "vaccines")}
          className="w-full py-2.5 rounded-full bg-[#FAF4EB] hover:bg-[#F3E5D0] border border-[#E4D4B8] text-[#8C6B28] font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <Syringe className="w-4 h-4" />
          <span>Jadwal Vaksinasi ({pet.vaccines.length})</span>
        </button>
      </div>
    </div>
  );
};

export default PetCard;
