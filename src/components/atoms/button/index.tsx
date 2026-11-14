"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { COLOR_MAP } from "@/src/utils/common/color";
import { Button } from "@/components/ui/button";

type BaseButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  color?: "brown";
};

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, color = "brown", variant, ...props }, ref) => {
    const activeColor = COLOR_MAP[color as keyof typeof COLOR_MAP];

    // Explicit contrast per variant: solid = black bg + white text,
    // outline = white bg + black border/text (never black on black).
    const colorClasses =
      !variant || variant === "default"
        ? activeColor.solid
        : variant === "outline"
          ? activeColor.outline
          : "";

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn("hover:cursor-pointer", colorClasses, className)}
        {...props}
      />
    );
  }
);

BaseButton.displayName = "BaseButton";

export { BaseButton };
