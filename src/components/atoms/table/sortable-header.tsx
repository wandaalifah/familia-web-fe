"use client";

import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOrder = "asc" | "desc" | null;

export type SortableField =
  | "id"
  | "name"
  | "filesize"
  | "created_at"
  | "created_by"
  | "last_updated"
  | "updated_by"
  | "title"
  | "topic_id"
  | "topic_name"
  | "forum_type"
  | "total_comment"
  | "total_reaction"
  | "total_report"
  | "is_trending"
  | "is_active"
  | "created_date";

interface SortableHeaderProps {
  label: string;
  field: SortableField;
  currentSortField?: SortableField | null;
  currentSortOrder?: SortOrder;
  onSort?: (field: SortableField, order: SortOrder) => void;
  className?: string;
  sortable?: boolean;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  field,
  currentSortField,
  currentSortOrder,
  onSort,
  className,
  sortable = true,
}) => {
  const isActive = currentSortField === field;

  const handleClick = () => {
    if (!sortable || !onSort) return;

    let newOrder: SortOrder;

    if (isActive) {
      // If clicking the same column, toggle through: desc -> asc -> null
      if (currentSortOrder === "desc") {
        newOrder = "asc";
      } else if (currentSortOrder === "asc") {
        newOrder = null;
      } else {
        newOrder = "desc";
      }
    } else {
      // If clicking a different column, start with desc
      newOrder = "desc";
    }

    onSort(field, newOrder);
  };

  const renderIcon = () => {
    if (!sortable) return null;

    if (!isActive || currentSortOrder === null) {
      return <ArrowUpDown className="h-4 w-4 ml-2 opacity-50" />;
    }

    if (currentSortOrder === "asc") {
      return <ArrowUp className="h-4 w-4 ml-2" />;
    }

    return <ArrowDown className="h-4 w-4 ml-2" />;
  };

  if (!sortable) {
    return <div className={cn("font-medium", className)}>{label}</div>;
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center font-medium hover:text-foreground transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground",
        className,
      )}
      type="button"
    >
      {label}
      {renderIcon()}
    </button>
  );
};
