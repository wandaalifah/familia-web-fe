"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Clock,
  Edit3,
  Mail,
  PawPrint,
  Phone,
  Sparkles,
  Ticket,
} from "lucide-react";
import toast from "react-hot-toast";
import { useMemberMembershipStore } from "@/src/store/member/membership";
import { useUserProfileQuery } from "@/src/services/query/user/profile";
import { useUpdateUserProfileMutation } from "@/src/services/mutation/user/profile";
import EditProfileModal from "@/src/components/molecules/membership/EditProfileModal";

const MEMBER_PERKS = [
  "Cashback Poin 1.5x Lipat Setiap Kunjungan",
  "Prioritas Antrean Konsultasi Dokter",
  "Bonus +200 Poin Spesial Ulang Tahun",
  "Diskon 10% Kunjungan Dokter ke Rumah",
];

const MembershipOverviewSection = () => {
  const { user, pets, myVouchers, updateUserProfile } = useMemberMembershipStore();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { data: profile } = useUserProfileQuery();
  const { mutate: updateProfile } = useUpdateUserProfileMutation();

  return (
    <div className="space-y-8">
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B88E39] flex items-center justify-center shrink-0">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">
              Total Anabul
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {pets.length} Ekor
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B88E39] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">
              Total Transaksi
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {user.totalVisits} Kali
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B88E39] flex items-center justify-center shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">
              Kupon Aktif
            </span>
            <span className="text-lg font-extrabold text-[#B88E39]">
              {myVouchers.length} Kupon
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">
              Status Membership
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              {user.tier}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: User Profile Details + Tier Perks & Coupons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Complete User Account Details */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="md:flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Profil Pemilik Terdaftar
              </h3>
              <p className="text-xs text-slate-500">
                Informasi identitas akun member Familia Vet & Care
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowEditProfileModal(true)}
              className="mt-2 md:mt-0 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Ubah Profil</span>
            </button>
          </div>

          <div className="flex items-center gap-5 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-[#B88E39] flex items-center justify-center text-[#B88E39] shrink-0">
              <PawPrint className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                {profile?.first_name} {profile?.last_name}
              </h4>
              <span className="inline-block mt-1 -ml-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-[#8C6B28] text-[10px] font-bold">
                Member sejak {user.joinDate}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-slate-400 block font-medium mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> Alamat Email
              </span>
              <span className="text-sm font-bold text-slate-900">
                {profile?.email}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-slate-400 block font-medium mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" /> Nomor WhatsApp
              </span>
              <span className="text-sm font-bold text-slate-900">
                {profile?.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Right: VIP Gold Perks + Active Coupons Widget */}
        <div className="lg:col-span-5 space-y-6">
          {/* Keuntungan Gold Tier */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B88E39]" />
                <span>Keuntungan Member Gold</span>
              </h3>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {user.tier}
              </span>
            </div>

            <div className="space-y-2.5">
              {MEMBER_PERKS.map((perk) => (
                <div
                  key={perk}
                  className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-center gap-3 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B88E39] shrink-0" />
                  <span className="font-semibold text-slate-800">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Vouchers Side Widget */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#B88E39]" />
                <span>Kupon Saya Terklaim</span>
              </h3>
              <span className="text-xs font-bold text-[#B88E39] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {myVouchers.length} Kupon
              </span>
            </div>

            {myVouchers.map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-amber-200/80 hover:border-amber-400 transition-all space-y-1"
              >
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  {v.category}
                </span>
                <h4 className="text-xs font-extrabold text-slate-900">
                  {v.title}
                </h4>
                <p className="text-[11px] font-mono text-slate-500">
                  Kode: {v.code}
                </p>
              </div>
            ))}

            <Link
              href="/coupons"
              className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center"
            >
              Tukarkan Kupon Lainnya
            </Link>
          </div>
        </div>
      </div>

      <EditProfileModal
        open={showEditProfileModal}
        defaultValues={{
          firstName: profile?.first_name ?? "",
          lastName: profile?.last_name ?? "",
          phone: profile?.phone ?? "",
        }}
        onSubmit={(values) => {
          updateProfile(
            {
              first_name: values.firstName,
              last_name: values.lastName,
              phone: values.phone,
            },
            {
              onSuccess: () => {
                updateUserProfile(values);
                setShowEditProfileModal(false);
                toast.success("Data profil berhasil diperbarui!");
              },
              onError: (error) => {
                toast.error(error.message || "Gagal memperbarui profil.");
              },
            },
          );
        }}
        onOpenChange={setShowEditProfileModal}
      />
    </div>
  );
};

export default MembershipOverviewSection;
