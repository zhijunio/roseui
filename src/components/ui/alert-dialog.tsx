"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type AlertDialogSize = "xs" | "sm" | "default" | "lg"
type AlertDialogPlacement = "top" | "center" | "bottom"
type AlertDialogBackdrop = "opaque" | "blur" | "transparent"
export type AlertDialogStatus = "default" | "accent" | "success" | "warning" | "danger"

const sizeClasses: Record<AlertDialogSize, string> = {
  xs: "max-w-72",
  sm: "max-w-xs",
  default: "max-w-xs sm:max-w-sm",
  lg: "sm:max-w-lg",
}

const placementClasses: Record<AlertDialogPlacement, string> = {
  top: "top-8 translate-y-0",
  center: "top-1/2 -translate-y-1/2",
  bottom: "top-auto bottom-8 translate-y-0",
}

const backdropClasses: Record<AlertDialogBackdrop, string> = {
  opaque: "bg-overlay supports-backdrop-filter:backdrop-blur-xs",
  blur: "bg-overlay supports-backdrop-filter:backdrop-blur-sm",
  transparent: "bg-transparent",
}

const statusClasses: Record<AlertDialogStatus, string> = {
  default: "bg-muted",
  accent: "bg-primary/10 text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-destructive-soft text-destructive",
}

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  variant = "opaque",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & {
  variant?: AlertDialogBackdrop
}) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:!animate-none",
        backdropClasses[variant],
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  placement = "center",
  backdrop = "opaque",
  backdropClassName,
  disableEscapeClose = false,
  onEscapeKeyDown,
  portalContainer,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: AlertDialogSize
  placement?: AlertDialogPlacement
  backdrop?: AlertDialogBackdrop
  backdropClassName?: string
  disableEscapeClose?: boolean
  portalContainer?: React.ComponentProps<typeof AlertDialogPrimitive.Portal>["container"]
}) {
  const handleEscapeKeyDown: NonNullable<React.ComponentProps<typeof AlertDialogPrimitive.Content>["onEscapeKeyDown"]> = (event) => {
    onEscapeKeyDown?.(event)
    if (disableEscapeClose) event.preventDefault()
  }

  return (
    <AlertDialogPortal container={portalContainer}>
      <AlertDialogOverlay variant={backdrop} className={backdropClassName} />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        data-placement={placement}
        className={cn(
          "group/alert-dialog-content fixed left-1/2 z-50 grid w-full -translate-x-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-200 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:!animate-none",
          sizeClasses[size],
          placementClasses[placement],
          className
        )}
        onEscapeKeyDown={handleEscapeKeyDown}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr] sm:group-data-[size=lg]/alert-dialog-content:place-items-start sm:group-data-[size=lg]/alert-dialog-content:text-left sm:group-data-[size=lg]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  status = "default",
  ...props
}: React.ComponentProps<"div"> & {
  status?: AlertDialogStatus
}) {
  return (
    <div
      data-slot="alert-dialog-media"
      data-status={status}
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 sm:group-data-[size=lg]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        statusClasses[status],
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
