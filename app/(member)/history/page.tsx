import { Metadata } from "next";
import MembershipHistorySection from "@/src/components/organisms/membership/MembershipHistorySection";

export const metadata: Metadata = {
  title: "Riwayat Poin",
  description:
    "Pantau riwayat transaksi poin reward yang diperoleh dan ditukarkan pada akun member Anda di portal pelanggan Familia Vet & Care Solo Surakarta.",
  openGraph: {
    title: "Riwayat Poin | Familia Vet & Care Solo",
    description:
      "Pantau riwayat transaksi poin reward yang diperoleh dan ditukarkan pada akun member Anda di portal pelanggan Familia Vet & Care Solo Surakarta.",
  },
};

export default function MemberHistoryPage() {
  return <MembershipHistorySection />;
}
