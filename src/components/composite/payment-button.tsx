"use client";

import { type ComponentProps, type ReactNode, useState } from "react";
import { IconCreditCard } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PaymentButton({
  label = "Credit card",
  description = "Pay securely with your card",
  icon = <IconCreditCard aria-hidden />,
  variant = "outline",
  className,
  onClick,
  ...buttonProps
}: {
  label?: string;
  description?: ReactNode;
  icon?: ReactNode;
} & Omit<ComponentProps<typeof Button>, "children">) {
  const [feedback, setFeedback] = useState("");

  return (
    <Button
      {...buttonProps}
      variant={variant}
      className={cn("h-auto max-w-full justify-start gap-3 px-4 py-3 text-left whitespace-normal", className)}
      onClick={(event) => {
        setFeedback(`${label} selected`);
        onClick?.(event);
      }}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span>{label}</span>
        <span className="text-xs font-normal text-muted-foreground">{feedback || description}</span>
      </span>
    </Button>
  );
}
