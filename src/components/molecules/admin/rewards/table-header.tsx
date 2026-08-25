import CouponsTableHeaderFilter from "./filter";
import CouponsTableHeaderSearch from "./search";

const CouponsTableHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <CouponsTableHeaderSearch />
        <CouponsTableHeaderFilter />
      </div>
    </div>
  );
};

export default CouponsTableHeader;
