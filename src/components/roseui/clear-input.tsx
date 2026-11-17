"use client";

import * as React from "react";

import { X } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

type ClearInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value"> & {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
  clearLabel?: string;
  containerClassName?: string;
};

const ClearInput = React.forwardRef<HTMLInputElement, ClearInputProps>(
  (
    { value, onValueChange, onClear, clearLabel = "Clear input", containerClassName, className, disabled, ...props },
    forwardedRef,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const setInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    return (
      <InputGroup data-disabled={disabled || undefined} className={containerClassName}>
        <InputGroupInput
          ref={setInputRef}
          value={value}
          disabled={disabled}
          onChange={(event) => onValueChange(event.currentTarget.value)}
          className={cn("pr-1", className)}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={clearLabel}
            disabled={disabled || value.length === 0}
            onClick={() => {
              onValueChange("");
              onClear?.();
              inputRef.current?.focus();
            }}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
);

ClearInput.displayName = "ClearInput";

export type { ClearInputProps };
export { ClearInput };
