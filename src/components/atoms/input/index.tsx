"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type BaseInputProps = React.ComponentPropsWithoutRef<typeof Input> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  passwordToggle?: boolean;
};

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as React.RefObject<T>).current = value;
      }
    });
  };
}

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { className, leftIcon, rightIcon, type, passwordToggle = true, ...props },
    ref
  ) => {
    const isPassword = (type ?? "text") === "password";
    const [show, setShow] = React.useState(false);

    const innerRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = React.useMemo(() => mergeRefs(innerRef, ref), [ref]);

    let finalType = type;
    if (isPassword && passwordToggle) {
      finalType = show ? "text" : "password";
    }

    const needToggle = isPassword && passwordToggle;
    const needRightSpace = (rightIcon ? 1 : 0) + (needToggle ? 1 : 0);
    let prClass: string | undefined;
    if (needRightSpace === 2) prClass = "pr-20";
    else if (needRightSpace === 1) prClass = "pr-10";

    const handleToggle = () => {
      const el = innerRef.current;
      if (!el) {
        setShow((s) => !s);
        return;
      }
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;

      setShow((s) => !s);

      requestAnimationFrame(() => {
        const node = innerRef.current;
        if (!node) return;
        try {
          node.focus();
          node.setSelectionRange(start, end);
        } catch {}
      });
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <Input
          ref={combinedRef}
          type={finalType}
          className={cn(
            "bg-white placeholder:text-[#B1B1B1] placeholder:font-normal disabled:bg-base-gray-20 disabled:border-[#DEDEDE]",
            className,
            leftIcon && "pl-10",
            prClass
          )}
          {...props}
        />

        {rightIcon && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400",
              needToggle ? "right-10" : "right-3"
            )}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}

        {needToggle && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleToggle}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            {show ? (
              <EyeOff size={16} color="#767676" />
            ) : (
              <Eye size={16} color="#767676" />
            )}
          </button>
        )}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export { BaseInput };
