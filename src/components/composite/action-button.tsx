"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconLoader2,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

type ActionStatus = "idle" | "pending" | "success";

type ActionButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "onClick" | "aria-busy" | "aria-disabled"
> & {
  label: string;
  onAction: () => void | Promise<void>;
  pendingLabel?: string;
  successLabel?: string;
  resetAfterMs?: number;
  onActionError?: (error: unknown) => void;
};

export function ActionButton({
  label,
  onAction,
  pendingLabel = "Saving",
  successLabel = "Saved",
  resetAfterMs = 2400,
  onActionError,
  disabled,
  variant = "default",
  size = "sm",
  className,
  ...buttonProps
}: ActionButtonProps) {
  const [status, setStatus] = useState<ActionStatus>("idle");
  const actionInProgress = useRef(false);

  useEffect(() => {
    if (status !== "success" || resetAfterMs <= 0) return;

    const timer = window.setTimeout(() => setStatus("idle"), resetAfterMs);
    return () => window.clearTimeout(timer);
  }, [resetAfterMs, status]);

  const runAction = async () => {
    if (actionInProgress.current || disabled) return;

    actionInProgress.current = true;
    setStatus("pending");

    try {
      await onAction();
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      onActionError?.(error);
    } finally {
      actionInProgress.current = false;
    }
  };

  const currentLabel =
    status === "pending"
      ? pendingLabel
      : status === "success"
        ? successLabel
        : label;

  return (
    <>
      <Button
        {...buttonProps}
        variant={variant}
        size={size}
        disabled={disabled}
        aria-busy={status === "pending"}
        aria-disabled={status === "pending"}
        data-action-state={status}
        className={className}
        onClick={() => void runAction()}
      >
        {currentLabel}
        {status === "pending" ? (
          <IconLoader2 aria-hidden="true" className="motion-safe:animate-spin" />
        ) : status === "success" ? (
          <IconCheck aria-hidden="true" />
        ) : (
          <IconArrowRight aria-hidden="true" />
        )}
      </Button>
      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "pending" ? pendingLabel : status === "success" ? successLabel : ""}
      </span>
    </>
  );
}
