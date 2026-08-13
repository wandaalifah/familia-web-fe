"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { COLOR_MAP } from "@/src/utils/common/color";
import { Button } from "@/components/ui/button";

type BaseButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  color?: "brown";
};

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, color = "brown", ...props }, ref) => {
    const activeColor = COLOR_MAP[color as keyof typeof COLOR_MAP];

    const bg = `bg-[${activeColor.main}]`;
    const hoverBg = `hover:bg-[${activeColor.secondary}]`;

    return (
      <Button
        ref={ref}
        className={cn(
          !props.variant ? bg : "",
          !props.variant ? hoverBg : "",
          "hover:cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);

BaseButton.displayName = "BaseButton";

export { BaseButton };
