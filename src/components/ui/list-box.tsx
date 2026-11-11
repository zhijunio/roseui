"use client"

import * as React from "react"
import {
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  type ListBoxItemProps as AriaListBoxItemProps,
  type ListBoxProps as AriaListBoxProps,
  type ListBoxSectionProps as AriaListBoxSectionProps,
} from "react-aria-components"
import { IconCheck } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type ListBoxProps<T extends object> = Omit<AriaListBoxProps<T>, "className"> & {
  className?: string
}

function ListBox<T extends object>({ className, ...props }: ListBoxProps<T>) {
  return (
    <AriaListBox<T>
      data-slot="list-box"
      className={cn(
        "flex max-h-80 w-full min-w-48 flex-col gap-0.5 overflow-auto rounded-lg border bg-card p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  )
}

type ListBoxItemProps<T extends object> = Omit<
  AriaListBoxItemProps<T>,
  "children" | "className"
> & {
  children: React.ReactNode
  className?: string
  indicator?: React.ReactNode
  variant?: "default" | "danger"
}

function ListBoxItem<T extends object>({
  children,
  className,
  indicator = <IconCheck aria-hidden="true" className="size-4" />,
  variant = "default",
  ...props
}: ListBoxItemProps<T>) {
  return (
    <AriaListBoxItem<T>
      data-slot="list-box-item"
      data-variant={variant}
      className={cn(
        "group/list-box-item relative flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm outline-none motion-safe:transition-colors hover:bg-accent hover:text-secondary-foreground focus-visible:bg-accent focus-visible:text-secondary-foreground data-[selected=true]:bg-accent data-[selected=true]:text-secondary-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        variant === "danger" && "text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive",
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        data-slot="list-box-item-indicator"
        className="ml-auto inline-flex shrink-0 opacity-0 group-data-[selected=true]/list-box-item:opacity-100"
      >
        {indicator}
      </span>
    </AriaListBoxItem>
  )
}

type ListBoxSectionProps<T extends object> = Omit<
  AriaListBoxSectionProps<T>,
  "className"
> & {
  className?: string
}

function ListBoxSection<T extends object>({ className, ...props }: ListBoxSectionProps<T>) {
  return (
    <AriaListBoxSection
      data-slot="list-box-section"
      className={cn("not-first:mt-1 not-first:border-t not-first:border-border", className)}
      {...props}
    />
  )
}

function ListBoxHeader({ className, ...props }: React.ComponentProps<typeof AriaHeader>) {
  return (
    <AriaHeader
      data-slot="list-box-header"
      className={cn("px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export { ListBox, ListBoxHeader, ListBoxItem, ListBoxSection }
