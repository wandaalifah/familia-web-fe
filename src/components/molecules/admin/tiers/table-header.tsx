import TiersTableHeaderFilter from "./filter";
import TiersTableHeaderSearch from "./search";

const TiersTableHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <TiersTableHeaderSearch />
        <TiersTableHeaderFilter />
      </div>
    </div>
  );
};

export default TiersTableHeader;
