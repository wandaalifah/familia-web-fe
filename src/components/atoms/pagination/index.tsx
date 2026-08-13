"use client";

import * as React from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent as ShadcnPaginationContent,
  PaginationItem as ShadcnPaginationItem,
  PaginationLink as ShadcnPaginationLink,
  PaginationPrevious as ShadcnPaginationPrevious,
  PaginationNext as ShadcnPaginationNext,
  PaginationEllipsis as ShadcnPaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

// BasePagination Component
export type BasePaginationProps = React.ComponentPropsWithoutRef<"nav">;

const BasePagination = React.forwardRef<HTMLElement, BasePaginationProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnPagination ref={ref} className={cn("", className)} {...props} />
    );
  }
);
BasePagination.displayName = "BasePagination";

// BasePaginationContent Component
export type BasePaginationContentProps = React.ComponentPropsWithoutRef<"ul">;

const BasePaginationContent = React.forwardRef<
  HTMLUListElement,
  BasePaginationContentProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnPaginationContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
BasePaginationContent.displayName = "BasePaginationContent";

// BasePaginationItem Component
export type BasePaginationItemProps = React.ComponentPropsWithoutRef<"li">;

const BasePaginationItem = React.forwardRef<
  HTMLLIElement,
  BasePaginationItemProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnPaginationItem ref={ref} className={cn("", className)} {...props} />
  );
});
BasePaginationItem.displayName = "BasePaginationItem";

// BasePaginationLink Component
export type BasePaginationLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  isActive?: boolean;
};

const BasePaginationLink = React.forwardRef<
  HTMLAnchorElement,
  BasePaginationLinkProps
>(({ className, isActive, ...props }, ref) => {
  return (
    <ShadcnPaginationLink
      ref={ref}
      className={cn("", className)}
      isActive={isActive}
      {...props}
    />
  );
});
BasePaginationLink.displayName = "BasePaginationLink";

// BasePaginationPrevious Component
export type BasePaginationPreviousProps = React.ComponentPropsWithoutRef<
  typeof ShadcnPaginationPrevious
>;

const BasePaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  BasePaginationPreviousProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnPaginationPrevious
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
BasePaginationPrevious.displayName = "BasePaginationPrevious";

// BasePaginationNext Component
export type BasePaginationNextProps = React.ComponentPropsWithoutRef<
  typeof ShadcnPaginationNext
>;

const BasePaginationNext = React.forwardRef<
  HTMLAnchorElement,
  BasePaginationNextProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnPaginationNext ref={ref} className={cn("", className)} {...props} />
  );
});
BasePaginationNext.displayName = "BasePaginationNext";

// BasePaginationEllipsis Component
export type BasePaginationEllipsisProps =
  React.ComponentPropsWithoutRef<"span">;

const BasePaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  BasePaginationEllipsisProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnPaginationEllipsis
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
BasePaginationEllipsis.displayName = "BasePaginationEllipsis";

export {
  BasePagination,
  BasePaginationContent,
  BasePaginationItem,
  BasePaginationLink,
  BasePaginationPrevious,
  BasePaginationNext,
  BasePaginationEllipsis,
};
