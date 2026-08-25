import CouponsTable from "@/src/components/molecules/admin/rewards/table";

export default function CouponsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Coupons</h1>
      <p className="mt-2 text-sm text-[#6B7280]">
        Manage available coupons that members can redeem using their points.
      </p>
      <div className="mt-6">
        <CouponsTable />
      </div>
    </div>
  );
}
