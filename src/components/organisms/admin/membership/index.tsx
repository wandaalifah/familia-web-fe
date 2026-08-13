import MembershipTable from "@/src/components/molecules/admin/membership/table";
import ManageMembershipTitle from "@/src/components/molecules/admin/membership/title";

const ManageMembership = () => {
  return (
    <div className="flex flex-col gap-7">
      <ManageMembershipTitle />
      <MembershipTable />
    </div>
  );
};

export default ManageMembership;