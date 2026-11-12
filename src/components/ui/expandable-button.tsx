"use client";

import { type ComponentProps, type ReactNode, useState } from "react";

import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExpandableButton({
  label = "Create new",
  successLabel = "Created",
  icon = <IconPlus aria-hidden />,
  className,
  onClick,
  variant = "outline",
  "aria-label": ariaLabel,
  ...buttonProps
}: {
  label?: string;
  successLabel?: string;
  icon?: ReactNode;
} & Omit<ComponentProps<typeof Button>, "children">) {
  const [feedback, setFeedback] = useState("");

  return (
    <Button
      {...buttonProps}
      variant={variant}
      aria-label={ariaLabel ?? label}
      className={cn(
        "group/expand relative w-9 overflow-hidden rounded-full hover:w-36 focus-visible:w-36 motion-safe:transition-[width]",
        className,
      )}
      onClick={(event) => {
        setFeedback(successLabel);
        onClick?.(event);
      }}
    >
      <span className="absolute left-2.5">{icon}</span>
      <span className="ml-6 opacity-0 group-hover/expand:opacity-100 group-focus-visible/expand:opacity-100">
        {feedback || label}
      </span>
    </Button>
  );
}
