import { Metadata } from "next";
import MembershipOverviewSection from "@/src/components/organisms/membership/MembershipOverviewSection";

export const metadata: Metadata = {
  title: "Profil & Ringkasan Member",
  description:
    "Lihat ringkasan profil, status membership, total poin rewards, dan keuntungan tier member Anda di portal pelanggan Familia Vet & Care Solo Surakarta.",
  openGraph: {
    title: "Profil & Ringkasan Member | Familia Vet & Care Solo",
    description:
      "Lihat ringkasan profil, status membership, total poin rewards, dan keuntungan tier member Anda di portal pelanggan Familia Vet & Care Solo Surakarta.",
  },
};

export default function MemberProfilePage() {
  return <MembershipOverviewSection />;
}
