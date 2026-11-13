"use client";

import { X } from "lucide-react";
import type { TagGroupProps, TagListProps, TagProps } from "react-aria-components/TagGroup";
import {
  Tag as TagPrimitive,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
} from "react-aria-components/TagGroup";
import { Button } from "react-aria-components/Button";

import { cn } from "@/lib/utils";

export function TagGroup({ className, ...props }: TagGroupProps) {
  return (
    <TagGroupPrimitive
      data-slot="control"
      className={cn("flex flex-col gap-y-1 *:data-[slot=label]:font-medium", className)}
      {...props}
    />
  );
}

export function TagList<T extends object>({ className, ...props }: TagListProps<T>) {
  return <TagListPrimitive className={cn("flex flex-wrap gap-1", className)} {...props} />;
}

export function Tag({ children, className, ...props }: TagProps) {
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <TagPrimitive
      textValue={textValue}
      className={cn(
        "inset-ring inset-ring-input outline-hidden dark:bg-input/30",
        "inline-flex items-center gap-x-1.5 py-0.5 font-medium text-xs/5 forced-colors:outline",
        "*:data-[slot=icon]:size-3 *:data-[slot=icon]:shrink-0",
        "cursor-default rounded-full px-2",
        "selected:inset-ring-ring/70 selected:bg-primary-subtle selected:text-primary-subtle-foreground",
        "disabled:opacity-50 disabled:forced-colors:text-[GrayText]",
        props.href && "cursor-pointer hover:inset-ring-muted-foreground",
        className,
      )}
      {...props}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving ? (
            <Button slot="remove" className="-me-1 inline-flex size-4 items-center justify-center">
              <X aria-hidden="true" className="size-3.5" />
            </Button>
          ) : null}
        </>
      )}
    </TagPrimitive>
  );
}
