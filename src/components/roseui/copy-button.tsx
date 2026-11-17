"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";

import { Check as IconCheck, Copy as IconCopy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const feedbackDuration = 2000;

export type CopyButtonProps = {
  value: string;
  iconOnly?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  errorMessage?: string;
  onCopied?: () => void;
} & Omit<ComponentProps<typeof Button>, "children">;

export function CopyButton({
  value,
  iconOnly = false,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  errorMessage = "Unable to copy. Try again.",
  onCopied,
  onClick,
  variant = "outline",
  size = iconOnly ? "icon" : "default",
  "aria-label": ariaLabel,
  className,
  ...buttonProps
}: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (resetTimer.current !== undefined) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const showStatus = (nextStatus: "success" | "error") => {
    if (resetTimer.current !== undefined) window.clearTimeout(resetTimer.current);
    setStatus(nextStatus);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), feedbackDuration);
  };

  const copy = async (event: Parameters<NonNullable<ComponentProps<typeof Button>["onClick"]>>[0]) => {
    onClick?.(event);
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      showStatus("error");
      return;
    }

    showStatus("success");
    onCopied?.();
  };

  const label = status === "success" ? copiedLabel : copyLabel;

  return (
    <span className="inline-flex items-center gap-3">
      <Button
        {...buttonProps}
        variant={variant}
        size={size}
        className={className}
        aria-label={iconOnly ? (ariaLabel ?? label) : ariaLabel}
        onClick={copy}
      >
        {status === "success" ? <IconCheck aria-hidden /> : <IconCopy aria-hidden />}
        {iconOnly ? null : label}
      </Button>
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={cn("text-xs text-muted-foreground", status !== "error" && "sr-only")}
      >
        {status === "error" ? errorMessage : status === "success" ? copiedLabel : ""}
      </span>
    </span>
  );
}
