"use client";

import { type ReactNode, useId, useState, useSyncExternalStore } from "react";

import { Loader2 as IconLoader2, Search as IconSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SearchFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange" | "onSubmit" | "className"
> & {
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  clearLabel?: string;
  loadingLabel?: string;
  shape?: "pill" | "rounded";
  size?: "default" | "sm";
  loading?: boolean;
  inputClassName?: string;
  searchIcon?: ReactNode;
  clearIcon?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SearchField({
  id: providedId,
  label,
  value,
  defaultValue = "",
  onValueChange,
  onClear,
  onSubmit,
  clearLabel = "Clear search",
  loadingLabel = "Loading",
  shape = "pill",
  size = "default",
  loading = false,
  inputClassName,
  searchIcon,
  clearIcon,
  disabled,
  readOnly,
  required,
  className,
  onKeyDown,
  onChange,
  ...props
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const shouldReduceMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const isDisabledValue = disabled ?? false;
  const isReadOnlyValue = readOnly ?? false;
  function update(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }
  function handleClear() {
    update("");
    onClear?.();
  }
  return (
    <div data-slot="control" role="search" className={cn("grid w-full gap-1", className)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className="relative w-full">
        {loading ? (
          <span
            role="status"
            aria-label={loadingLabel}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <IconLoader2
              aria-hidden="true"
              className={cn("motion-safe:animate-spin", size === "sm" ? "size-4" : "size-5")}
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              size === "sm" ? "size-4" : "size-5",
            )}
          >
            {searchIcon ?? <IconSearch className="size-full" />}
          </span>
        )}
        <Input
          {...props}
          id={inputId}
          type="search"
          value={currentValue}
          disabled={isDisabledValue}
          readOnly={isReadOnlyValue}
          required={required}
          aria-busy={loading || undefined}
          onChange={(event) => {
            onChange?.(event);
            update(event.currentTarget.value);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (!isReadOnlyValue && event.key === "Escape" && currentValue) {
              event.preventDefault();
              handleClear();
            } else if (event.key === "Enter" && onSubmit) {
              event.preventDefault();
              onSubmit(currentValue);
            }
          }}
          className={cn(
            "border-transparent bg-muted/50 shadow-none focus-visible:bg-muted/30 [&::-webkit-search-cancel-button]:hidden",
            size === "sm"
              ? "min-h-11 ps-9 pe-11 text-sm md:min-h-8 md:pe-9 md:text-xs"
              : "min-h-11 ps-10 pe-12 text-sm md:min-h-9 md:pe-10",
            shape === "pill" ? "rounded-full" : "rounded-lg",
            inputClassName,
          )}
        />
        <AnimatePresence initial={false}>
          {currentValue && (
            <motion.span
              key="clear"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
              className="absolute end-1 top-1/2 -translate-y-1/2 md:end-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={clearLabel}
                disabled={isDisabledValue || isReadOnlyValue}
                onClick={handleClear}
                className="size-11 md:size-7"
              >
                <span aria-hidden="true">{clearIcon ?? <span className="text-base leading-none">×</span>}</span>
              </Button>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
