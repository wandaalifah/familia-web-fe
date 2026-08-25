import PointsTable from "@/src/components/molecules/admin/points/table";

export default function PointsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Point History</h1>
      <p className="mt-2 text-sm text-[#6B7280]">
        View loyalty point transaction history here.
      </p>
      <div className="mt-6">
        <PointsTable />
      </div>
    </div>
  );
}
