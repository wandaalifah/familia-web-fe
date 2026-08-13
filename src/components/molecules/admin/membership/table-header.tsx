import MembershipTableHeaderFilter from "./filter";
import MembershipTableHeaderSearch from "./search";

const MembershipTableHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <MembershipTableHeaderSearch />
        <MembershipTableHeaderFilter />
      </div>
    </div>
  );
};

export default MembershipTableHeader;