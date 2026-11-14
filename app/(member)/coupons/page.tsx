import { Metadata } from "next";
import MembershipCouponsSection from "@/src/components/organisms/membership/MembershipCouponsSection";

export const metadata: Metadata = {
  title: "Kupon Rewards",
  description:
    "Tukarkan poin reward member Anda dengan kupon grooming, vaksinasi, pet shop, pet hotel, dan promo menarik lainnya di portal pelanggan Familia Vet & Care Solo.",
  openGraph: {
    title: "Kupon Rewards | Familia Vet & Care Solo",
    description:
      "Tukarkan poin reward member Anda dengan kupon grooming, vaksinasi, pet shop, pet hotel, dan promo menarik lainnya di portal pelanggan Familia Vet & Care Solo.",
  },
};

export default function MemberCouponsPage() {
  return <MembershipCouponsSection />;
}
