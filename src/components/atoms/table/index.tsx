"use client";

import * as React from "react";
import {
  Table as ShadcnTable,
  TableCaption as ShadcnTableCaption,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableRow as ShadcnTableRow,
  TableHead as ShadcnTableHead,
  TableCell as ShadcnTableCell,
} from "@/src/components/ui/table";
import { cn } from "@/lib/utils";

const BaseTable = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTable>
>(({ className, ...props }, ref) => {
  return <ShadcnTable ref={ref} className={cn("", className)} {...props} />;
});
BaseTable.displayName = "BaseTable";

const BaseTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableCaption>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnTableCaption ref={ref} className={cn("", className)} {...props} />
  );
});
BaseTableCaption.displayName = "BaseTableCaption";

const BaseTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableHeader>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnTableHeader ref={ref} className={cn("", className)} {...props} />
  );
});
BaseTableHeader.displayName = "BaseTableHeader";

const BaseTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableBody>
>(({ className, ...props }, ref) => {
  return <ShadcnTableBody ref={ref} className={cn("", className)} {...props} />;
});
BaseTableBody.displayName = "BaseTableBody";

const BaseTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableFooter>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnTableFooter ref={ref} className={cn("", className)} {...props} />
  );
});
BaseTableFooter.displayName = "BaseTableFooter";

const BaseTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableRow>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnTableRow
      ref={ref}
      className={cn("border-none rounded-sm", className)}
      {...props}
    />
  );
});
BaseTableRow.displayName = "BaseTableRow";

const BaseTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableHead>
>(({ className, ...props }, ref) => {
  return <ShadcnTableHead ref={ref} className={cn("", className)} {...props} />;
});
BaseTableHead.displayName = "BaseTableHead";

const BaseTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<typeof ShadcnTableCell>
>(({ className, ...props }, ref) => {
  return <ShadcnTableCell ref={ref} className={cn("", className)} {...props} />;
});
BaseTableCell.displayName = "BaseTableCell";

export {
  BaseTable,
  BaseTableCaption,
  BaseTableHeader,
  BaseTableBody,
  BaseTableFooter,
  BaseTableRow,
  BaseTableHead,
  BaseTableCell,
};
