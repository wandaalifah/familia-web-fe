import MedicalRecordTable from "@/src/components/molecules/admin/medical-records/table";
import ManageMedicalRecordTitle from "@/src/components/molecules/admin/medical-records/title";

const ManageMedicalRecords = () => {
  return (
    <div className="flex flex-col gap-6">
      <ManageMedicalRecordTitle />
      <MedicalRecordTable />
    </div>
  );
};

export default ManageMedicalRecords;
