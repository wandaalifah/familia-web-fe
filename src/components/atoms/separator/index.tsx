"use client";

import * as React from "react";
import { Separator as ShadcnSeparator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// BaseSeparator Component
export type BaseSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSeparator
>;

const BaseSeparator = React.forwardRef<HTMLHRElement, BaseSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnSeparator ref={ref} className={cn("", className)} {...props} />
    );
  }
);

BaseSeparator.displayName = "BaseSeparator";

export { BaseSeparator };
