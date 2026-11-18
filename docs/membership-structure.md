# Struktur File Halaman Membership

```
app/admin/membership/page.tsx
src/components/organisms/admin/membership/index.tsx
src/components/molecules/admin/membership/
├── title.tsx
├── table-header.tsx
├── search.tsx
├── filter.tsx
├── column.tsx
├── table.tsx
├── member-form-modal.tsx
└── delete-member-modal.tsx
src/interfaces/admin/membership/list.ts
src/store/admin/membership/query.ts
```

## app/admin/membership/page.tsx

```tsx
import ManageMembership from "@/src/components/organisms/admin/membership";

export default function MembershipPage() {
  return <ManageMembership />;
}
```

## src/components/organisms/admin/membership/index.tsx

```tsx
import MembershipTable from "@/src/components/molecules/admin/membership/table";
import ManageMembershipTitle from "@/src/components/molecules/admin/membership/title";

const ManageMembership = () => {
  return (
    <div className="flex flex-col gap-6">
      <ManageMembershipTitle />
      <MembershipTable />
    </div>
  );
};

export default ManageMembership;
```

## src/components/molecules/admin/membership/title.tsx

```tsx
"use client";

const ManageMembershipTitle = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
        Manage Membership
      </h1>
      <p className="mt-1 text-sm text-[#6B7280]">
        View and manage members, their tiers, and point balances.
      </p>
    </div>
  );
};

export default ManageMembershipTitle;
```

## src/components/molecules/admin/membership/table-header.tsx

```tsx
import MembershipTableHeaderFilter from "./filter";
import MembershipTableHeaderSearch from "./search";

interface Props {
  onCreate: () => void;
}

const MembershipTableHeader = ({ onCreate }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <MembershipTableHeaderSearch />
      <MembershipTableHeaderFilter onCreate={onCreate} />
    </div>
  );
};

export default MembershipTableHeader;
```

## src/components/molecules/admin/membership/search.tsx

```tsx
"use client";

import { useManageMembershipQueryStore } from "@/src/store/admin/membership/query";
import { useState } from "react";
import SearchWithFilter from "../../SearchWithFilter";

const MembershipTableHeaderSearch = () => {
  const { membershipQuery, setMembershipQuery } =
    useManageMembershipQueryStore();

  const [searchBy, setSearchBy] = useState<string>(
    membershipQuery.search_by || "name"
  );

  const searchByOption = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
  ];

  const handleSearch = (value: string) => {
    if (!searchBy) return;

    setMembershipQuery({
      search_by: searchBy as any,
      search: value || undefined,
      page: 1,
    });
  };

  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setMembershipQuery({
        search_by: val as any,
        search: membershipQuery.search,
        page: 1,
      });
  };

  return (
    <SearchWithFilter
      searchByOptions={searchByOption}
      selectedSearchBy={searchBy}
      onSearchByChange={handleSearchBy}
      onSearchChange={handleSearch}
      searchPlaceholder="Search..."
      searchByPlaceholder="Search By"
      className="w-full border border-[#E5E7EB] rounded-lg shadow-sm sm:max-w-xl"
      debounceMs={500}
      selectWidth="w-44"
    />
  );
};

export default MembershipTableHeaderSearch;
```

## src/components/molecules/admin/membership/filter.tsx

```tsx
"use client";

import { BaseButton } from "@/src/components/atoms/button";
import { Plus } from "lucide-react";

interface Props {
  onCreate: () => void;
}

const MembershipTableHeaderFilter = ({ onCreate }: Props) => {
  return (
    <div className="flex shrink-0 justify-end gap-3">
      <BaseButton
        type="button"
        className="h-12 cursor-pointer px-5 shadow-sm"
        onClick={onCreate}
      >
        <div className="flex items-center gap-2">
          <Plus aria-hidden="true" className="h-4 w-4" />
          New Membership
        </div>
      </BaseButton>
    </div>
  );
};

export default MembershipTableHeaderFilter;
```

## src/components/molecules/admin/membership/column.tsx

```tsx
"use client";

import { IMembership } from "@/src/interfaces/admin/membership/list";
import { ColumnDef } from "@tanstack/react-table";
import { BaseButton } from "@/src/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getColumnsManageMembership = ({
  onEdit,
  onDelete,
}: Props): ColumnDef<IMembership>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return (
        <span className="text-xs text-[#6B7280]">{row.original.id}</span>
      );
    },
  },
  {
    id: "first_name",
    accessorKey: "users.first_name",
    header: "First Name",
    cell({ row }) {
      return <span>{row.original.users.first_name}</span>;
    },
  },
  {
    id: "last_name",
    accessorKey: "users.last_name",
    header: "Last Name",
    cell({ row }) {
      return <span>{row.original.users.last_name}</span>;
    },
  },
  {
    id: "email",
    accessorKey: "users.email",
    header: "Email",
    cell({ row }) {
      return <span>{row.original.users.email}</span>;
    },
  },
  {
    id: "phone",
    accessorKey: "users.phone",
    header: "Phone",
    cell({ row }) {
      return <span>{row.original.users.phone}</span>;
    },
  },
  {
    id: "tier",
    accessorKey: "tiers.name",
    header: "Tier",
    cell({ row }) {
      const tierName = row.original.tiers?.name;
      if (!tierName) return <span className="text-[#6B7280]">—</span>;
      return (
        <span className="inline-flex items-center rounded-full bg-[#d6c3a5]/30 px-2.5 py-0.5 text-xs font-medium text-[#5C4A2A]">
          {tierName}
        </span>
      );
    },
  },
  {
    id: "points",
    accessorKey: "points",
    header: "Current Points",
    cell({ row }) {
      return (
        <span className="font-medium tabular-nums">
          {row.original.points.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "lifetime_points",
    accessorKey: "lifetime_points",
    header: "Lifetime Points",
    cell({ row }) {
      return (
        <span className="tabular-nums">
          {row.original.lifetime_points.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: "Action",
    cell({ row }) {
      return (
        <div className="flex items-center justify-start gap-1">
          <BaseButton
            variant={"outline"}
            aria-label="Edit membership"
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
            onClick={() => onEdit(row.original.id)}
          >
            <Pencil aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
          <BaseButton
            variant={"outline"}
            aria-label="Delete membership"
            className="h-9 w-9 cursor-pointer border-none bg-transparent p-0 text-[#6B7280] shadow-none hover:bg-[#FEF2F2] hover:text-[#DC2626]"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
          </BaseButton>
        </div>
      );
    },
    meta: {
      className: "w-24",
    },
  },
];
```

## src/components/molecules/admin/membership/table.tsx

```tsx
"use client";

import { DataTable } from "../../global/table";
import MembershipTableHeader from "./table-header";
import { useManageMembershipQueryStore } from "@/src/store/admin/membership/query";
import { useShallow } from "zustand/shallow";
import { useMemo, useState } from "react";
import MemberFormModal, { MemberFormValues } from "./member-form-modal";
import DeleteMemberModal from "./delete-member-modal";
import { getColumnsManageMembership } from "./column";
import { IMembership } from "@/src/interfaces/admin/membership/list";

const dummyData: IMembership[] = [
  {
    id: "mbr-001",
    points: 1250,
    lifetime_points: 4800,
    created_at: new Date("2025-03-15"),
    updated_at: new Date("2026-08-01"),
    userId: "usr-001",
    tierId: "tier-002",
    users: {
      id: "usr-001",
      email: "budi.santoso@email.com",
      phone: "+6281234567890",
      first_name: "Budi",
      last_name: "Santoso",
      role: "member",
    },
    tiers: {
      id: "tier-002",
      name: "Silver",
      required_points: 1000,
    },
  },
];

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; id: string }
  | { type: "delete"; id: string };

const CLOSED: ModalState = { type: "closed" };

const MembershipTable = () => {
  // TODO: replace local state with API query/mutations once the endpoints exist.
  const [rows, setRows] = useState<IMembership[]>(dummyData);
  const [modal, setModal] = useState<ModalState>(CLOSED);

  const selected =
    modal.type === "edit" || modal.type === "delete"
      ? rows.find((row) => row.id === modal.id)
      : undefined;

  const handleCreate = (values: MemberFormValues) => {
    const now = new Date();
    const userId = `usr-${crypto.randomUUID().slice(0, 8)}`;
    const newMember: IMembership = {
      id: `mbr-${crypto.randomUUID().slice(0, 8)}`,
      points: 0,
      lifetime_points: 0,
      created_at: now,
      updated_at: now,
      userId,
      tierId: null,
      tiers: null,
      users: { id: userId, role: "member", ...values },
    };
    setRows((prev) => [newMember, ...prev]);
  };

  const handleUpdate = (values: MemberFormValues) => {
    if (!selected) return;
    setRows((prev) =>
      prev.map((row) =>
        row.id === selected.id
          ? {
              ...row,
              updated_at: new Date(),
              users: { ...row.users, ...values },
            }
          : row,
      ),
    );
  };

  const handleDelete = () => {
    if (!selected) return;
    setRows((prev) => prev.filter((row) => row.id !== selected.id));
  };

  const {
    membershipQuery,
    setMembershipQuery,
  } = useManageMembershipQueryStore(
    useShallow(
      ({
        membershipQuery,
        setMembershipQuery,
      }) => ({
        membershipQuery,
        setMembershipQuery,
      })
    )
  );

  const columns = useMemo(
    () =>
      getColumnsManageMembership({
        onEdit: (id) => setModal({ type: "edit", id }),
        onDelete: (id) => setModal({ type: "delete", id }),
      }),
    []
  );

  const onPageChange = (page: number) => {
    setMembershipQuery({
      ...membershipQuery,
      page,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <MembershipTableHeader onCreate={() => setModal({ type: "create" })} />
      <DataTable
        containerClassName="max-h-[calc(100vh-280px)] overflow-y-auto"
        columns={columns}
        data={rows}
        pagination={{
          current_page: 1,
          total_page: 1,
          total_data: rows.length,
          limit: 10,
          next: null,
          prev: null,
        }}
        onPageChange={onPageChange}
      />

      <MemberFormModal
        open={modal.type === "create"}
        onSubmit={handleCreate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <MemberFormModal
        key={selected?.id ?? "edit"}
        open={modal.type === "edit" && Boolean(selected)}
        initialValues={
          selected && {
            first_name: selected.users.first_name,
            last_name: selected.users.last_name,
            email: selected.users.email,
            phone: selected.users.phone,
          }
        }
        onSubmit={handleUpdate}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
      <DeleteMemberModal
        open={modal.type === "delete" && Boolean(selected)}
        memberName={
          selected
            ? `${selected.users.first_name} ${selected.users.last_name}`
            : ""
        }
        memberEmail={selected?.users.email ?? ""}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setModal(CLOSED)}
      />
    </div>
  );
};

export default MembershipTable;
```

## src/components/molecules/admin/membership/member-form-modal.tsx

```tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2, Mail, Phone, UserPlus, UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";
import { BaseInput } from "@/src/components/atoms/input";
import { cn } from "@/lib/utils";

const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{7,17}$/;

const memberFormSchema = yup.object({
  first_name: yup.string().trim().required("First name is required"),
  last_name: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .matches(PHONE_PATTERN, "Enter a valid phone number, e.g. +62 812-3456-7890")
    .required("Phone is required"),
});

export type MemberFormValues = yup.InferType<typeof memberFormSchema>;

const EMPTY_VALUES: MemberFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

interface MemberFormModalProps {
  open: boolean;
  /** Pass the member values to edit; omit (undefined) to create a new member. */
  initialValues?: MemberFormValues;
  onSubmit: (values: MemberFormValues) => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

interface FieldProps {
  id: keyof MemberFormValues;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ id, label, error, children }: FieldProps) => (
  <div className="grid gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-[#374151]">
      {label}
      <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">
        *
      </span>
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-xs text-[#B91C1C]">
        {error}
      </p>
    )}
  </div>
);

const inputClass = (hasError: boolean) =>
  cn(
    "h-11 rounded-lg border-[#D1D5DB] text-sm text-[#1A1A1A]",
    hasError && "border-[#DC2626] focus-visible:ring-[#DC2626]/20",
  );

const MemberFormModal = ({
  open,
  initialValues,
  onSubmit,
  onOpenChange,
}: MemberFormModalProps) => {
  const isEdit = Boolean(initialValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: yupResolver(memberFormSchema),
    mode: "onTouched",
    defaultValues: initialValues ?? EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) reset(initialValues ?? EMPTY_VALUES);
  }, [open, initialValues, reset]);

  const submit = async (values: MemberFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  const Icon = isEdit ? UserRoundPen : UserPlus;

  return (
    <Dialog open={open} onOpenChange={(next) => !isSubmitting && onOpenChange(next)}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <DialogHeader className="flex-row items-start gap-3 p-6 pb-4 pr-12">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d6c3a5]/30 text-[#5C4A2A]">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="grid gap-1">
              <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
                {isEdit ? "Edit Membership" : "New Membership"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Update the member's personal information."
                  : "Register a new member. Points and tier start from zero."}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-4 px-6 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="first_name"
                label="First name"
                error={errors.first_name?.message}
              >
                <BaseInput
                  id="first_name"
                  placeholder="Budi"
                  autoComplete="given-name"
                  aria-invalid={!!errors.first_name}
                  aria-describedby={
                    errors.first_name ? "first_name-error" : undefined
                  }
                  className={inputClass(!!errors.first_name)}
                  {...register("first_name")}
                />
              </Field>
              <Field
                id="last_name"
                label="Last name"
                error={errors.last_name?.message}
              >
                <BaseInput
                  id="last_name"
                  placeholder="Santoso"
                  autoComplete="family-name"
                  aria-invalid={!!errors.last_name}
                  aria-describedby={
                    errors.last_name ? "last_name-error" : undefined
                  }
                  className={inputClass(!!errors.last_name)}
                  {...register("last_name")}
                />
              </Field>
            </div>

            <Field id="email" label="Email" error={errors.email?.message}>
              <BaseInput
                id="email"
                type="email"
                inputMode="email"
                placeholder="name@example.com"
                autoComplete="email"
                leftIcon={<Mail className="h-4 w-4" />}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(!!errors.email)}
                {...register("email")}
              />
            </Field>

            <Field id="phone" label="Phone" error={errors.phone?.message}>
              <BaseInput
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="+62 812-3456-7890"
                autoComplete="tel"
                leftIcon={<Phone className="h-4 w-4" />}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass(!!errors.phone)}
                {...register("phone")}
              />
            </Field>
          </div>

          <DialogFooter className="mx-0 mb-0 mt-2 gap-2 rounded-b-xl px-6 py-4 sm:gap-2">
            <BaseButton
              type="button"
              variant="outline"
              className="h-10 px-5"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </BaseButton>
            <BaseButton
              type="submit"
              className="h-10 min-w-32 px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    aria-hidden="true"
                    className="h-4 w-4 motion-safe:animate-spin"
                  />
                  Saving…
                </>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Create member"
              )}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberFormModal;
```

## src/components/molecules/admin/membership/delete-member-modal.tsx

```tsx
"use client";

import { useState } from "react";
import { Loader2, TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseButton } from "@/src/components/atoms/button";

interface DeleteMemberModalProps {
  open: boolean;
  memberName: string;
  memberEmail: string;
  onConfirm: () => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

const DeleteMemberModal = ({
  open,
  memberName,
  memberEmail,
  onConfirm,
  onOpenChange,
}: DeleteMemberModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !isDeleting && onOpenChange(next)}
    >
      <DialogContent
        role="alertdialog"
        showCloseButton={false}
        className="gap-0 p-0 sm:max-w-md"
      >
        <DialogHeader className="flex-row items-start gap-4 p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
            <TriangleAlert aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="grid gap-2">
            <DialogTitle className="text-lg font-semibold text-[#1A1A1A]">
              Delete this member?
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              You are about to permanently delete{" "}
              <strong className="font-semibold text-[#1A1A1A]">
                {memberName}
              </strong>{" "}
              <span className="break-all">({memberEmail})</span>. Their points,
              tier, and history will be removed.{" "}
              <strong className="font-semibold text-[#B91C1C]">
                This action cannot be undone.
              </strong>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mx-0 mb-0 gap-2 rounded-b-xl px-6 py-4 sm:gap-2">
          <BaseButton
            type="button"
            variant="outline"
            className="h-10 px-5"
            disabled={isDeleting}
            autoFocus
            onClick={() => onOpenChange(false)}
          >
            No, keep member
          </BaseButton>
          <BaseButton
            type="button"
            disabled={isDeleting}
            onClick={handleConfirm}
            className="h-10 border-transparent bg-[#DC2626] px-5 text-white hover:bg-[#B91C1C] hover:text-white"
          >
            {isDeleting ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="h-4 w-4 motion-safe:animate-spin"
                />
                Deleting…
              </>
            ) : (
              "Yes, delete"
            )}
          </BaseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMemberModal;
```

## src/interfaces/admin/membership/list.ts

```ts
export interface IGetListMembershipQuery {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search_by?: string;
  search?: string;
  tier_id?: string;
}

interface MembershipUser {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface MembershipTier {
  id: string;
  name: string;
  required_points: number;
}

export interface IMembership {
  id: string;
  points: number;
  lifetime_points: number;
  created_at: Date;
  updated_at: Date;
  userId: string;
  tierId: string | null;
  users: MembershipUser;
  tiers: MembershipTier | null;
}
```

## src/store/admin/membership/query.ts

```ts
import { IGetListMembershipQuery } from "@/src/interfaces/admin/membership/list";
import { create } from "zustand";

interface IManageMembershipQuery {
  membershipQuery: IGetListMembershipQuery;
  setMembershipQuery: (query: Partial<IGetListMembershipQuery>) => void;
}

export const useManageMembershipQueryStore = create<IManageMembershipQuery>()(
  (set, get) => ({
    membershipQuery: { page: 1, limit: 10 },
    setMembershipQuery: (query) =>
      set({ membershipQuery: { ...(get().membershipQuery as any), ...query } }),
  })
);
```
