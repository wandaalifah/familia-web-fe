"use client";

import * as React from "react";
import {
  Select as ShadcnSelect,
  SelectGroup as ShadcnSelectGroup,
  SelectValue as ShadcnSelectValue,
  SelectTrigger as ShadcnSelectTrigger,
  SelectContent as ShadcnSelectContent,
  SelectLabel as ShadcnSelectLabel,
  SelectItem as ShadcnSelectItem,
  SelectSeparator as ShadcnSelectSeparator,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// BaseSelect Component
export type BaseSelectProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelect
>;
const BaseSelect = (props: BaseSelectProps) => {
  return <ShadcnSelect {...props} />;
};
BaseSelect.displayName = "BaseSelect";

// BaseSelectGroup Component
export type BaseSelectGroupProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectGroup
>;
const BaseSelectGroup = React.forwardRef<HTMLDivElement, BaseSelectGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnSelectGroup ref={ref} className={cn("", className)} {...props} />
    );
  }
);
BaseSelectGroup.displayName = "BaseSelectGroup";

// BaseSelectValue Component
export type BaseSelectValueProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectValue
>;
const BaseSelectValue = React.forwardRef<HTMLDivElement, BaseSelectValueProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnSelectValue ref={ref} className={cn("", className)} {...props} />
    );
  }
);
BaseSelectValue.displayName = "BaseSelectValue";

// BaseSelectTrigger Component
export type BaseSelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectTrigger
> & {
  size?: "sm" | "md" | "default";
  chevronClassName?: string;
};
const BaseSelectTrigger = React.forwardRef<
  HTMLButtonElement,
  BaseSelectTriggerProps
>(({ className, chevronClassName, ...props }, ref) => {
  return (
    <ShadcnSelectTrigger
      ref={ref}
      className={cn("font-normal text-sm", className)}
      {...props}
    />
  );
});
BaseSelectTrigger.displayName = "BaseSelectTrigger";

// BaseSelectContent Component
export type BaseSelectContentProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectContent
>;
const BaseSelectContent = React.forwardRef<
  HTMLDivElement,
  BaseSelectContentProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnSelectContent ref={ref} className={cn("", className)} {...props} />
  );
});
BaseSelectContent.displayName = "BaseSelectContent";

// BaseSelectLabel Component
export type BaseSelectLabelProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectLabel
>;
const BaseSelectLabel = React.forwardRef<HTMLDivElement, BaseSelectLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnSelectLabel ref={ref} className={cn("", className)} {...props} />
    );
  }
);
BaseSelectLabel.displayName = "BaseSelectLabel";

// BaseSelectItem Component
export type BaseSelectItemProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectItem
>;
const BaseSelectItem = React.forwardRef<HTMLDivElement, BaseSelectItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnSelectItem ref={ref} className={cn("", className)} {...props} />
    );
  }
);
BaseSelectItem.displayName = "BaseSelectItem";

// BaseSelectSeparator Component
export type BaseSelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectSeparator
>;
const BaseSelectSeparator = React.forwardRef<
  HTMLDivElement,
  BaseSelectSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnSelectSeparator ref={ref} className={cn("", className)} {...props} />
  );
});
BaseSelectSeparator.displayName = "BaseSelectSeparator";

// BaseSelectScrollUpButton Component
export type BaseSelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectScrollUpButton
>;
const BaseSelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  BaseSelectScrollUpButtonProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnSelectScrollUpButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
BaseSelectScrollUpButton.displayName = "BaseSelectScrollUpButton";

// BaseSelectScrollDownButton Component
export type BaseSelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof ShadcnSelectScrollDownButton
>;
const BaseSelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  BaseSelectScrollDownButtonProps
>(({ className, ...props }, ref) => {
  return (
    <ShadcnSelectScrollDownButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
BaseSelectScrollDownButton.displayName = "BaseSelectScrollDownButton";

export {
  BaseSelect,
  BaseSelectGroup,
  BaseSelectValue,
  BaseSelectTrigger,
  BaseSelectContent,
  BaseSelectLabel,
  BaseSelectItem,
  BaseSelectSeparator,
  BaseSelectScrollUpButton,
  BaseSelectScrollDownButton,
};
