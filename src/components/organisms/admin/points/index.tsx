import PointsTable from "@/src/components/molecules/admin/points/table";
import ManagePointsTitle from "@/src/components/molecules/admin/points/title";

const ManagePoints = () => {
  return (
    <div className="flex flex-col gap-6">
      <ManagePointsTitle />
      <PointsTable />
    </div>
  );
};

export default ManagePoints;
