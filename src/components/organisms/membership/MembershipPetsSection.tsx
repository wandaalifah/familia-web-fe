"use client";

import { useState } from "react";
import { useMemberMembershipStore } from "@/src/store/member/membership";
import { IPet } from "@/src/interfaces/member/membership";
import PetCard from "@/src/components/molecules/membership/PetCard";
import PetDetailModal from "@/src/components/molecules/membership/PetDetailModal";

const MembershipPetsSection = () => {
  const pets = useMemberMembershipStore((state) => state.pets);
  const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
  const [petModalTab, setPetModalTab] = useState<"medical" | "vaccines">(
    "medical"
  );

  const handleOpenPetDetail = (
    pet: IPet,
    initialTab: "medical" | "vaccines" = "medical"
  ) => {
    setSelectedPet(pet);
    setPetModalTab(initialTab);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Anabul Kesayangan Anda
          </h3>
          <p className="text-xs text-slate-500">
            Daftar hewan terdaftar beserta catatan diagnosa klinis medis dan
            jadwal vaksinasi.
          </p>
        </div>
        {/* <button
          type="button"
          onClick={() =>
            toast(
              "Untuk menambah anabul baru, silakan konfirmasi saat kunjungan ke outlet atau WhatsApp Admin."
            )
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tambah Anabul via Admin</span>
        </button> */}
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onOpenDetail={handleOpenPetDetail} />
        ))}
      </div>

      <PetDetailModal
        pet={selectedPet}
        initialTab={petModalTab}
        onOpenChange={(open) => {
          if (!open) setSelectedPet(null);
        }}
      />
    </div>
  );
};

export default MembershipPetsSection;
