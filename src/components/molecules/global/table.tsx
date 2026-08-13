"use client";

import {
  BasePagination,
  BasePaginationContent,
  BasePaginationEllipsis,
  BasePaginationItem,
  BasePaginationLink,
  BasePaginationNext,
  BasePaginationPrevious,
} from "@/src/components/atoms/pagination";
import {
  BaseTable,
  BaseTableBody,
  BaseTableCell,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from "@/src/components/atoms/table";
import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { IGlobalPaginationDto } from "@/src/interfaces/global/pagination/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: IGlobalPaginationDto;
  onPageChange?: (page: number) => void;
  containerClassName?: string;
  containerTableClassName?: string;
  tableClassName?: string;
  isLoading?: boolean;
  rowId?: keyof TData & string;
  enableColResize?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange = () => {},
  containerClassName,
  containerTableClassName,
  tableClassName,
  rowId,
  isLoading,
  enableColResize = true,
}: Readonly<DataTableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => {
      const r = row as any;
      const key = rowId ? r?.[rowId] : r?.id;

      return String(key);
    },
    enableColumnResizing: enableColResize,
    columnResizeMode: "onChange",
  });

  return (
    <div className={cn("w-full space-y-4", containerClassName)}>
      <div
        className={cn(
          "rounded-md w-full overflow-x-auto p-2 bg-white",
          containerTableClassName,
        )}
      >
        <BaseTable
          className={cn("w-full table-auto", tableClassName)}
          style={{ width: "max-content", minWidth: "100%" }}
        >
          <BaseTableHeader className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <BaseTableRow
                key={`${headerGroup.id}-${headerGroup.headers.length}`}
                className="hover:bg-white"
              >
                {headerGroup.headers.map((header) => (
                  <BaseTableHead
                    key={header.id}
                    className={cn(
                      header.column.columnDef.meta?.className,
                      "relative text-left text-xs font-semibold text-[#1A1A1A]",
                      ["action", "actions"].includes(header.id) &&
                        "sticky right-0 bg-white text-center",
                    )}
                    style={
                      ["action", "actions"].includes(header.id)
                        ? { width: "1%", whiteSpace: "nowrap" }
                        : {
                            width: header.getSize(),
                            maxWidth: header.getSize(),
                          }
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanResize() &&
                      !["action", "actions"].includes(header.id) && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-stone-200 hover:bg-stone-400 opacity-0 hover:opacity-100 transition-colors",
                            header.column.getIsResizing() &&
                              "bg-stone-400 opacity-100",
                          )}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                  </BaseTableHead>
                ))}
              </BaseTableRow>
            ))}
          </BaseTableHeader>
          <BaseTableBody>
            {isLoading ? (
              <BaseTableRow>
                <BaseTableCell colSpan={columns.length} className="h-64">
                  <Skeleton className="h-full flex flex-col gap-4 items-center justify-center text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                    <span className="text-sm text-[#6B7280]">
                      Loading...
                    </span>
                  </Skeleton>
                </BaseTableCell>
              </BaseTableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <BaseTableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    rowIndex % 2 === 0 ? "bg-[#FAFAFA]" : "bg-[#FFFFFF]",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <BaseTableCell
                      key={cell.id}
                      className={cn(
                        "text-xs text-[#1A1A1A]",
                        cell.column.columnDef.meta?.className,
                        !["action", "actions"].includes(cell.column.id) &&
                          "overflow-hidden text-ellipsis whitespace-nowrap",
                        ["action", "actions"].includes(cell.column.id) &&
                          "sticky right-0 bg-white",
                      )}
                      style={
                        ["action", "actions"].includes(cell.column.id)
                          ? {
                              width: "1%",
                              whiteSpace: "nowrap",
                            }
                          : {
                              width: cell.column.getSize(),
                              maxWidth: cell.column.getSize(),
                            }
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </BaseTableCell>
                  ))}
                </BaseTableRow>
              ))
            ) : (
              <BaseTableRow>
                <BaseTableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </BaseTableCell>
              </BaseTableRow>
            )}
          </BaseTableBody>
        </BaseTable>
      </div>
      {pagination && (
        <DataTablePagination pagination={pagination} setPage={onPageChange} />
      )}
    </div>
  );
}

type PageItem = number | "ellipsis";

function getDisplayPages(current: number, total: number): PageItem[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: PageItem[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("ellipsis");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export const DataTablePagination = ({
  pagination,
  setPage,
  showPaginationSummary = true,
}: {
  pagination?: IGlobalPaginationDto;
  setPage: (page: number) => void;
  showPaginationSummary?: boolean;
}) => {
  const current = Math.max(1, pagination?.current_page ?? 1);
  const total = Math.max(1, pagination?.total_page ?? 1);

  const pages = useMemo(
    () => getDisplayPages(current, total),
    [current, total],
  );
  const hasPrev = current > 1;
  const hasNext = current < total;
  const disabledCls = "pointer-events-none opacity-60";

  return (
    <div className="w-full flex justify-center gap-4 md:justify-between items-center flex-wrap md:flex-nowrap flex-col-reverse md:flex-row mt-4">
      {showPaginationSummary && (
        <span className="text-sm text-[#1A1A1A] whitespace-nowrap">
          {getPaginationSummary(pagination)}
        </span>
      )}

      <BasePagination className="flex justify-center md:justify-end">
        <BasePaginationContent>
          <BasePaginationItem>
            <BasePaginationPrevious
              className={cn(
                "cursor-pointer text-[#1A1A1A] hover:bg-stone-200",
                !hasPrev && disabledCls,
              )}
              onClick={() => hasPrev && setPage(current - 1)}
            />
          </BasePaginationItem>

          {pages.map((it, idx) =>
            it === "ellipsis" ? (
              <BasePaginationItem key={`page-${idx + 1}`}>
                <BasePaginationEllipsis />
              </BasePaginationItem>
            ) : (
              <BasePaginationItem key={it}>
                <BasePaginationLink
                  isActive={it === current}
                  className={cn(
                    "cursor-pointer hover:bg-stone-200",
                    it === current ? "text-white" : "text-[#1A1A1A]",
                  )}
                  onClick={() => it !== current && setPage(it)}
                  aria-current={it === current ? "page" : undefined}
                >
                  {it}
                </BasePaginationLink>
              </BasePaginationItem>
            ),
          )}

          <BasePaginationItem>
            <BasePaginationNext
              className={cn(
                "cursor-pointer text-[#1A1A1A] hover:bg-stone-200",
                !hasNext && disabledCls,
              )}
              onClick={() => hasNext && setPage(current + 1)}
            />
          </BasePaginationItem>
        </BasePaginationContent>
      </BasePagination>
    </div>
  );
};

const getPaginationSummary = (pagination?: IGlobalPaginationDto): string => {
  if (!pagination) return `Showing 0 to 0 of 0 entries`;

  const total = Math.max(0, pagination.total_data ?? 0);

  const pageSize =
    (pagination as any).limit ??
    (pagination as any).per_page ??
    (pagination as any).page_size ??
    10;

  const current = Math.max(1, pagination.current_page ?? 1);

  const from = total === 0 ? 0 : (current - 1) * pageSize + 1;

  const to = total === 0 ? 0 : Math.min(from + pageSize - 1, total);

  return `Showing ${from} to ${to} of ${total} entries`;
};
