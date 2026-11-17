"use client";

import { type ComponentProps, type ReactNode, useState } from "react";

import { Plus as IconPlus } from "lucide-react";

import { RoseButton } from "@/components/roseui/button";
import { cn } from "@/lib/utils";

export type ExpandableButtonProps = {
  label?: string;
  successLabel?: string;
  icon?: ReactNode;
} & Omit<ComponentProps<typeof RoseButton>, "children">;

export function ExpandableButton({
  label = "Create new",
  successLabel = "Created",
  icon = <IconPlus aria-hidden />,
  className,
  onClick,
  variant = "outline",
  "aria-label": ariaLabel,
  ...buttonProps
}: ExpandableButtonProps) {
  const [feedback, setFeedback] = useState("");

  return (
    <RoseButton
      {...buttonProps}
      variant={variant}
      aria-label={ariaLabel ?? label}
      className={cn(
        "group/expand w-9 justify-start overflow-hidden rounded-full p-0 hover:w-fit focus-visible:w-fit",
        className,
      )}
      onClick={(event) => {
        setFeedback(successLabel);
        onClick?.(event);
      }}
    >
      <span className="flex h-9 shrink-0 items-center">
        <span className="grid size-9 shrink-0 place-items-center">{icon}</span>
        <span className="max-w-0 overflow-hidden opacity-0 motion-safe:transition-[max-width,opacity] motion-safe:duration-200 motion-reduce:transition-none group-hover/expand:max-w-56 group-hover/expand:opacity-100 group-focus-visible/expand:max-w-56 group-focus-visible/expand:opacity-100">
          <span className="block truncate pr-3">{feedback || label}</span>
        </span>
      </span>
    </RoseButton>
  );
}
