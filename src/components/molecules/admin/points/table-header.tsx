import PointsTableHeaderFilter from "./filter";
import PointsTableHeaderSearch from "./search";

const PointsTableHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <PointsTableHeaderSearch />
        <PointsTableHeaderFilter />
      </div>
    </div>
  );
};

export default PointsTableHeader;
