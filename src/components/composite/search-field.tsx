"use client";

import {
  useId,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconLoader2, IconSearch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NativeInputProps = Omit<
  ComponentProps<"input">,
  "type" | "size" | "value" | "defaultValue" | "onChange" | "onSubmit"
>;

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SearchField({
  id,
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
  className,
  onKeyDown,
  ...props
}: NativeInputProps & {
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
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const shouldReduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  function update(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function clear() {
    if (readOnly) return;
    update("");
    onClear?.();
  }

  return (
    <div className={cn("grid w-full gap-1", className)}>
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
              className={cn(
                "motion-safe:animate-spin",
                size === "sm" ? "size-4" : "size-5",
              )}
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
          disabled={disabled}
          readOnly={readOnly}
          aria-busy={loading || undefined}
          onChange={(event) => update(event.currentTarget.value)}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (!readOnly && event.key === "Escape" && currentValue) {
              event.preventDefault();
              clear();
            }
            if (event.key === "Enter" && onSubmit) {
              event.preventDefault();
              onSubmit(currentValue);
            }
          }}
          className={cn(
            "border-transparent bg-muted/50 shadow-none focus-visible:bg-muted/30 [&::-webkit-search-cancel-button]:hidden",
            size === "sm"
              ? "h-8 ps-9 pe-9 text-xs md:text-xs"
              : "h-9 ps-10 pe-10 text-sm",
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
              className="absolute end-2 top-1/2 -translate-y-1/2"
            >
              {clearIcon ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={clearLabel}
                  disabled={disabled || readOnly}
                  onClick={clear}
                >
                  <span aria-hidden="true">{clearIcon}</span>
                </Button>
              ) : (
                <CloseButton
                  aria-label={clearLabel}
                  size="xs"
                  disabled={disabled || readOnly}
                  onClick={clear}
                />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
