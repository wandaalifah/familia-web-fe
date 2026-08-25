import TiersTable from "@/src/components/molecules/admin/tiers/table";
import AddTierModal from "@/src/components/molecules/admin/tiers/add-modal";

export default function TiersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Tiers</h1>
      <p className="mt-2 text-sm text-[#6B7280]">
        Manage membership tiers and their benefits.
      </p>
      <div className="mt-6">
        <TiersTable />
      </div>
      <AddTierModal />
    </div>
  );
}
