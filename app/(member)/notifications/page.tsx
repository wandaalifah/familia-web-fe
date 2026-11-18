import { Metadata } from "next";
import MembershipNotificationsSection from "@/src/components/organisms/membership/MembershipNotificationsSection";

export const metadata: Metadata = {
  title: "Notifikasi",
  description:
    "Lihat pengingat jadwal vaksin dan obat cacing & kutu untuk anabul Anda di portal pelanggan Familia Vet & Care Solo Surakarta.",
  openGraph: {
    title: "Notifikasi | Familia Vet & Care Solo",
    description:
      "Lihat pengingat jadwal vaksin dan obat cacing & kutu untuk anabul Anda di portal pelanggan Familia Vet & Care Solo Surakarta.",
  },
};

export default function MemberNotificationsPage() {
  return <MembershipNotificationsSection />;
}
