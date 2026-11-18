import TiersTable from "@/src/components/molecules/admin/tiers/table";
import ManageTiersTitle from "@/src/components/molecules/admin/tiers/title";

const ManageTiers = () => {
  return (
    <div className="flex flex-col gap-6">
      <ManageTiersTitle />
      <TiersTable />
    </div>
  );
};

export default ManageTiers;
