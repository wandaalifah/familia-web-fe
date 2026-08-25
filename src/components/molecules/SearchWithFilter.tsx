import { BaseInput } from "../atoms/input";
import {
  BaseSelect,
  BaseSelectContent,
  BaseSelectItem,
  BaseSelectTrigger,
  BaseSelectValue,
} from "../atoms/select";
import lodash from "lodash";
import { cn } from "@/lib/utils";
import IconSearch from "@/src/assets/icons/IconSearch";
import { BaseSeparator } from "../atoms/separator";

export interface SearchOption {
  value: string;
  label: string;
}

export interface SearchWithFilterProps {
  searchByOptions: SearchOption[];
  selectedSearchBy?: string;
  onSearchByChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchByPlaceholder?: string;
  separatorClassName?: string;
  className?: string;
  debounceMs?: number;
  selectWidth?: string;
  showRedSeparator?: boolean;
}

const SearchWithFilter = ({
  searchByOptions,
  selectedSearchBy,
  onSearchByChange,
  onSearchChange,
  searchPlaceholder = "Search...",
  searchByPlaceholder = "Search By",
  separatorClassName = "",
  className,
  debounceMs = 800,
  selectWidth = "w-[120px]",
  showRedSeparator = false,
}: SearchWithFilterProps) => {
  const debouncedSearchChange = lodash.debounce((value: string) => {
    onSearchChange(value);
  }, debounceMs);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchChange(e.target.value);
  };

  return (
    <div
      className={cn(
        "text-[#3C3C3C] font-semibold rounded-md flex items-center gap-1 relative w-[480px] bg-white px-4",
        className,
      )}
    >
      <div>
        <BaseSelect value={selectedSearchBy} onValueChange={(value) => onSearchByChange(value as string)}>
          <BaseSelectTrigger
            className={`${selectWidth} border-none px-1 shadow-none`}
          >
            <BaseSelectValue placeholder={searchByPlaceholder}>
              {(value) =>
                value
                  ? (searchByOptions.find((opt) => opt.value === value)?.label ??
                    String(value))
                  : searchByPlaceholder
              }
            </BaseSelectValue>
          </BaseSelectTrigger>
          <BaseSelectContent>
            {searchByOptions
              .filter((option) => option.value !== "")
              .map((option) => (
                <BaseSelectItem
                  value={option.value}
                  key={`search-by-${option.value}`}
                >
                  {option.label}
                </BaseSelectItem>
              ))}
          </BaseSelectContent>
        </BaseSelect>
      </div>
      <BaseSeparator
        orientation="vertical"
        className={cn("min-h-6", separatorClassName)}
      />
      <BaseInput
        className="border-none h-12 focus-visible:border-none focus-visible:ring-0 placeholder:text-sm shadow-none"
        onChange={handleInputChange}
        placeholder={searchPlaceholder}
      />
      <IconSearch className="w-4 h-4 shrink-0" />
      {showRedSeparator && (
        <BaseSeparator orientation="vertical" className="bg-red-500 w-1" />
      )}
    </div>
  );
};

export default SearchWithFilter;
