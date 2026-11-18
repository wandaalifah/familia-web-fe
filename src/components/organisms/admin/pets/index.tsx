import PetTable from "@/src/components/molecules/admin/pets/table";
import ManagePetTitle from "@/src/components/molecules/admin/pets/title";

const ManagePets = () => {
  return (
    <div className="flex flex-col gap-6">
      <ManagePetTitle />
      <PetTable />
    </div>
  );
};

export default ManagePets;
