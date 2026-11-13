"use client";

import type { ComponentProps, Ref } from "react";

import { Check as IconCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import {
  GridList as GridListPrimitive,
  GridListHeader as GridListHeaderPrimitive,
  GridListItem as GridListItemPrimitive,
  GridListLoadMoreItem as GridListLoadMoreItemPrimitive,
  GridListSection as GridListSectionPrimitive,
  Text,
  type GridListItemProps,
  type GridListProps,
  type TextProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

export function GridList<T extends object>({ className, ...props }: GridListProps<T>) {
  return (
    <GridListPrimitive
      data-slot="grid-list"
      className={cn(
        "relative divide-y overflow-hidden rounded-lg border bg-background *:drop-target:border-accent sm:text-sm/6 dark:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function GridListSection<T extends object>({
  className,
  ...props
}: ComponentProps<typeof GridListSectionPrimitive<T>>) {
  return (
    <GridListSectionPrimitive data-slot="grid-list-section" className={cn("divide-y", className)} {...props} />
  );
}

export function GridListHeader({ className, ...props }: ComponentProps<typeof GridListHeaderPrimitive>) {
  return (
    <GridListHeaderPrimitive
      data-slot="grid-list-header"
      className={cn("px-3 py-2.5 text-sm/6 font-semibold", className)}
      {...props}
    />
  );
}

export function GridListItem<T extends object>({ className, children, ...props }: GridListItemProps<T>) {
  const textValue = typeof children === "string" ? children : undefined;

  return (
    <GridListItemPrimitive
      textValue={textValue}
      {...props}
      data-slot="grid-list-item"
      className={cn(
        "group relative flex min-w-0 cursor-default items-center gap-2 px-3 py-2.5 outline-hidden [--me-icon:--spacing(2)] sm:gap-2.5",
        "dragging:cursor-grab dragging:opacity-70 dragging:**:[[slot=drag]]:text-foreground",
        "hover:bg-accent/50 **:[svg:not([data-slot='check-indicator'])]:size-5 **:[svg:not([data-slot='check-indicator'])]:shrink-0 **:[svg:not([data-slot='check-indicator'])]:text-muted-foreground sm:**:[svg:not([data-slot='check-indicator'])]:size-4",
        "selected:bg-accent/40 selected:text-foreground selected:hover:bg-accent/80 selected:**:[.text-muted-foreground]:text-accent-foreground/80",
        "href" in props && "cursor-pointer",
        className,
      )}
    >
      {(values) => (
        <>
          {values.allowsDragging ? (
            <Button slot="drag" variant="ghost" size="icon-xs" aria-label="Drag item" className="cursor-grab">
              <svg
                data-slot="drag-icon"
                className="size-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11 5.5C11 6.32843 10.3284 7 9.5 7C8.67157 7 8 6.32843 8 5.5C8 4.67157 8.67157 4 9.5 4C10.3284 4 11 4.67157 11 5.5Z"
                  fill="currentColor"
                />
                <path
                  d="M16 5.5C16 6.32843 15.3284 7 14.5 7C13.6716 7 13 6.32843 13 5.5C13 4.67157 13.6716 4 14.5 4C15.3284 4 16 4.67157 16 5.5Z"
                  fill="currentColor"
                />
                <path
                  d="M11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5Z"
                  fill="currentColor"
                />
                <path
                  d="M16 18.5C16 19.3284 15.3284 20 14.5 20C13.6716 20 13 19.3284 13 18.5C13 17.6716 13.6716 17 14.5 17C15.3284 17 16 17.6716 16 18.5Z"
                  fill="currentColor"
                />
                <path
                  d="M11 12C11 12.8284 10.3284 13.5 9.5 13.5C8.67157 13.5 8 12.8284 8 12C8 11.1716 8.67157 10.5 9.5 10.5C10.3284 10.5 11 11.1716 11 12Z"
                  fill="currentColor"
                />
                <path
                  d="M16 12C16 12.8284 15.3284 13.5 14.5 13.5C13.6716 13.5 13 12.8284 13 12C13 11.1716 13.6716 10.5 14.5 10.5C15.3284 10.5 16 11.1716 16 12Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          ) : null}
          {values.selectionMode === "multiple" && values.selectionBehavior === "toggle" ? (
            <CheckboxField className="gap-x-0" slot="selection">
              <Checkbox
                className="col-span-1"
                indicator={<IconCheck aria-hidden="true" style={{ color: "#ffffff" }} />}
              />
            </CheckboxField>
          ) : null}
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </GridListItemPrimitive>
  );
}

export function GridListEmptyState({ ref, className, ...props }: ComponentProps<"div"> & { ref?: Ref<HTMLDivElement> }) {
  return <div ref={ref} data-slot="grid-list-empty-state" className={cn("p-6", className)} {...props} />;
}

export function GridListLoadMoreItem({ className, ...props }: ComponentProps<typeof GridListLoadMoreItemPrimitive>) {
  return (
    <GridListLoadMoreItemPrimitive
      data-slot="grid-list-load-more-item"
      className={cn("flex justify-center p-3 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function GridListSpacer({ ref, className, ...props }: ComponentProps<"div"> & { ref?: Ref<HTMLDivElement> }) {
  return <div ref={ref} aria-hidden data-slot="grid-list-spacer" className={cn("-ms-4 flex-1", className)} {...props} />;
}

export function GridListStart({ ref, className, ...props }: ComponentProps<"div"> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="grid-list-start"
      className={cn("relative flex items-center gap-x-2.5 sm:gap-x-3", className)}
      {...props}
    />
  );
}

type GridListTextProps = TextProps & { ref?: Ref<HTMLDivElement> };

export function GridListLabel({ ref, className, ...props }: GridListTextProps) {
  return <Text ref={ref} data-slot="grid-list-label" className={cn("font-medium", className)} {...props} />;
}

export function GridListDescription({ ref, className, ...props }: GridListTextProps) {
  return (
    <Text
      slot="description"
      ref={ref}
      data-slot="grid-list-description"
      className={cn("text-muted-foreground text-sm font-normal", className)}
      {...props}
    />
  );
}

export type { GridListItemProps, GridListProps };
