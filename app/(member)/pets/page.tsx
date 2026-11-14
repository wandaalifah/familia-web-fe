import { Metadata } from "next";
import MembershipPetsSection from "@/src/components/organisms/membership/MembershipPetsSection";

export const metadata: Metadata = {
  title: "Anabul Saya",
  description:
    "Kelola data hewan peliharaan (anabul) kesayangan Anda, lengkap dengan riwayat rekam medis, catatan rawat inap, dan jadwal vaksinasi di portal pelanggan Familia Vet & Care Solo.",
  openGraph: {
    title: "Anabul Saya | Familia Vet & Care Solo",
    description:
      "Kelola data hewan peliharaan (anabul) kesayangan Anda, lengkap dengan riwayat rekam medis, catatan rawat inap, dan jadwal vaksinasi di portal pelanggan Familia Vet & Care Solo.",
  },
};

export default function MemberPetsPage() {
  return <MembershipPetsSection />;
}
