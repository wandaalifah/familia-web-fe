"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import debounce from "lodash/debounce";
import { BaseInput } from "@/src/components/atoms/input";
import { BaseButton } from "@/src/components/atoms/button";
import { DataTable } from "../../global/table";
import TableFilter, { FilterConfig } from "../../global/table-filter";
import TableExport from "../../global/table-export";
import { exportData, dateStamp, ExportFormat } from "@/src/utils/export-data";
import { getColumnsCouponCatalog } from "./column-catalog";
import CouponFormModal, { CouponFormValues } from "./coupon-form-modal";
import RedeemForCustomerModal, { RedeemFormValues } from "./redeem-for-customer-modal";
import DeleteCouponModal from "./delete-coupon-modal";
import { useManageCouponQueryStore } from "@/src/store/admin/coupons/query";
import { useCouponListQuery } from "@/src/services/query/admin/coupons/list";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useRedeemCouponMutation,
  useUpdateCouponMutation,
} from "@/src/services/mutation/admin/coupons/list";

// The points-cost range filter below has no server-side query param in the
// API contract (GET /admin/reward/list only supports sort/search) — it is
// applied client-side to the rows already loaded for the current page.
const COUPON_FILTER_CONFIG: FilterConfig[] = [
  { key: "points_cost", label: "Points Cost Range (current page)", type: "number-range" },
];

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; id: string }
  | { type: "delete"; id: string }
  | { type: "redeem"; id: string };

const CLOSED: ModalState = { type: "closed" };

const CouponCatalogTab = () => {
  const { couponQuery, setCouponQuery } = useManageCouponQueryStore();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<ModalState>(CLOSED);

  const { data, isLoading } = useCouponListQuery(couponQuery);
  const rows = useMemo(() => data?.items ?? [], [data]);

  const createCoupon = useCreateCouponMutation();
  const updateCoupon = useUpdateCouponMutation();
  const deleteCoupon = useDeleteCouponMutation();
  const redeemCoupon = useRedeemCouponMutation();

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setCouponQuery({ search_by: "title", search: value, page: 1 }), 500),
    [setCouponQuery],
  );

  const selected =
    modal.type !== "closed" && modal.type !== "create"
      ? rows.find((row) => row.id === modal.id)
      : undefined;

  const filteredRows = useMemo(() => {
    const min = filters.minValue ? Number(filters.minValue) : undefined;
    const max = filters.maxValue ? Number(filters.maxValue) : undefined;
    return rows.filter((row) => {
      if (min !== undefined && row.points_cost < min) return false;
      if (max !== undefined && row.points_cost > max) return false;
      return true;
    });
  }, [rows, filters]);

  const handleCreate = async (values: CouponFormValues) => {
    try {
      await createCoupon.mutateAsync(values);
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleUpdate = async (values: CouponFormValues) => {
    if (!selected) return;
    try {
      await updateCoupon.mutateAsync({ id: selected.id, body: values });
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteCoupon.mutateAsync(selected.id);
      setModal(CLOSED);
    } catch {
      // The 409 "already redeemed" message is toasted globally; keep the
      // modal open in its blocked state instead of closing on failure.
    }
  };

  const handleRedeem = async (values: RedeemFormValues) => {
    if (!selected) return;
    try {
      await redeemCoupon.mutateAsync({ id: selected.id, userId: values.userId });
    } catch {
      // Error toast is shown by the global MutationCache handler (app/providers.tsx)
    }
  };

  const handleExport = (format: ExportFormat) => {
    exportData(
      filteredRows,
      [
        { header: "ID", accessor: (row) => row.id },
        { header: "Title", accessor: (row) => row.title },
        { header: "Description", accessor: (row) => row.description },
        { header: "Points Cost", accessor: (row) => row.points_cost },
        { header: "Total Redeemed", accessor: (row) => row._count.redemptions },
      ],
      `vet-clinic-coupons-${dateStamp()}`,
      format,
    );
  };

  const columns = useMemo(
    () =>
      getColumnsCouponCatalog({
        onRedeem: (id) => setModal({ type: "redeem", id }),
        onEdit: (id) => setModal({ type: "edit", id }),
        onDelete: (id) => setModal({ type: "delete", id }),
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xl">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
          />
          <BaseInput
            type="search"
            aria-label="Search coupons"
            placeholder="Search by coupon title…"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="h-12 rounded-lg border border-[#E5E7EB] bg-white pl-10 text-sm text-[#1A1A1A] shadow-sm placeholder:text-[#9CA3AF] focus-visible:border-[#1A1A1A] focus-visible:ring-[#d6c3a5]/50"
          />
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-2.5">
          <TableFilter
            configs={COUPON_FILTER_CONFIG}
            values={filters}
            onApply={setFilters}
            onReset={() => setFilters({})}
          />
          <TableExport onExport={handleExport} />
          <BaseButton
            type="button"
            className="h-12 cursor-pointer px-5 shadow-sm"
            onClick={() => setModal({ type: "create" })}
          >
            <div className="flex items-center gap-2">
              <Plus aria-hidden="true" className="h-4 w-4" />
              New Coupon
            </div>
          </BaseButton>
        </div>
      </div>

      <DataTable
        containerClassName="max-h-[calc(100vh-320px)] overflow-y-auto"
        columns={columns}
        data={filteredRows}
        rowId="id"
        isLoading={isLoading}
        pagination={data?.pagination ?? undefined}
        onPageChange={(page) => setCouponQuery({ page })}
      />

      <CouponFormModal
        open={modal.type === "create"}
        onSubmit={handleCreate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <CouponFormModal
        key={selected?.id ?? "edit"}
        open={modal.type === "edit" && Boolean(selected)}
        initialValues={
          selected && {
            title: selected.title,
            description: selected.description,
            points_cost: selected.points_cost,
          }
        }
        onSubmit={handleUpdate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <DeleteCouponModal
        open={modal.type === "delete" && Boolean(selected)}
        couponTitle={selected?.title ?? ""}
        totalRedeemed={selected?._count.redemptions ?? 0}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <RedeemForCustomerModal
        open={modal.type === "redeem" && Boolean(selected)}
        couponTitle={selected?.title ?? ""}
        pointsCost={selected?.points_cost ?? 0}
        onSubmit={handleRedeem}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
    </div>
  );
};

export default CouponCatalogTab;
