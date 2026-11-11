"use client";

import * as React from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export type BillingToggleOption = {
  value: string;
  label: string;
  badge?: string;
  activeBadge?: string;
};

export type BillingToggleProps = {
  value: string;
  onValueChange: (value: string) => void;
  options?: BillingToggleOption[];
  label?: string;
  size?: "md" | "lg";
  className?: string;
};

const defaultOptions: BillingToggleOption[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly", badge: "Save 15%", activeBadge: "Save 15%" },
];

export function BillingToggle({
  value,
  onValueChange,
  options = defaultOptions,
  label = "Billing period",
  size = "md",
  className,
}: BillingToggleProps) {
  const instanceId = React.useId();
  const reducedMotion = useReducedMotion();
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      aria-label={label}
      orientation="horizontal"
      className={cn("inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-muted p-1", className)}
      data-slot="billing-toggle"
    >
      {options.map((option) => {
        const selected = value === option.value;
        const description = selected ? (option.activeBadge ?? option.badge) : option.badge;
        return (
          <span
            key={option.value}
            className={cn(
              "relative flex min-w-20 items-center justify-center gap-2 rounded-full px-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
              size === "md" ? "min-h-9" : "min-h-11 px-5",
            )}
          >
            {selected && (
              <motion.span
                aria-hidden="true"
                layoutId={`billing-toggle-${instanceId}`}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 36 }}
                className="absolute inset-0 rounded-[inherit] bg-background shadow-sm"
              />
            )}
            <RadioGroupItem
              value={option.value}
              aria-label={[option.label, description].filter(Boolean).join(", ")}
              className="absolute inset-0 z-20 aspect-auto h-full w-full rounded-[inherit] border-0 bg-transparent opacity-0 after:content-none aria-checked:bg-transparent focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 text-sm font-medium",
                selected ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {option.label}
            </span>
            {description && (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${option.value}-${selected ? "active" : "idle"}`}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: reducedMotion ? 0 : 0.16 }}
                  className={cn(
                    "relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none",
                    selected ? "bg-primary/10 text-primary" : "bg-background/70 text-muted-foreground",
                  )}
                >
                  {description}
                </motion.span>
              </AnimatePresence>
            )}
          </span>
        );
      })}
    </RadioGroup>
  );
}

export type BillingPriceProps = {
  amount: number;
  currency?: string;
  period?: string;
  was?: number;
  decimals?: number;
  locale?: string;
  className?: string;
};

export function BillingPrice({
  amount,
  currency = "USD",
  period,
  was,
  decimals = 0,
  locale = "en-US",
  className,
}: BillingPriceProps) {
  const reducedMotion = useReducedMotion();
  const format = React.useCallback(
    (value: number) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value),
    [currency, decimals, locale],
  );

  return (
    <span
      data-slot="billing-price"
      className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 tabular-nums", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={amount}
          initial={reducedMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          className="text-3xl font-semibold tracking-tight"
        >
          {format(amount)}
        </motion.span>
      </AnimatePresence>
      {was !== undefined && was > amount && <del className="text-sm text-muted-foreground">{format(was)}</del>}
      {period && <span className="text-xs text-muted-foreground">{period}</span>}
    </span>
  );
}
