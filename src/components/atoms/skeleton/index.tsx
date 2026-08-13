"use client";

import * as React from "react";
import { Skeleton as ShadcnSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// BaseSkeleton Component
export type BaseSkeletonProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSkeleton
>;

const BaseSkeleton = React.forwardRef<HTMLDivElement, BaseSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnSkeleton ref={ref} className={cn("", className)} {...props} />
    );
  }
);

BaseSkeleton.displayName = "BaseSkeleton";

export { BaseSkeleton };
