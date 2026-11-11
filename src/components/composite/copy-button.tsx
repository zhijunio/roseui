"use client";

import { type ComponentProps, useState } from "react";

import { IconCheck, IconCopy } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({
  value = "RoseUI",
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
}: {
  value?: string;
  iconOnly?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  errorMessage?: string;
  onCopied?: () => void;
} & Omit<ComponentProps<typeof Button>, "children">) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const copy = async (event: Parameters<NonNullable<ComponentProps<typeof Button>["onClick"]>>[0]) => {
    onClick?.(event);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("success");
      onCopied?.();
    } catch {
      setStatus("error");
    }
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
      <span role="status" className={cn("text-xs text-muted-foreground", status !== "error" && "sr-only")}>
        {status === "error" ? errorMessage : status === "success" ? copiedLabel : ""}
      </span>
    </span>
  );
}
