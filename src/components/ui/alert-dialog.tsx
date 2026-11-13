"use client"

import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

function AlertDialog(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />
}

function AlertDialogTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal(props: React.ComponentProps<typeof DialogPortal>) {
  return <DialogPortal {...props} />
}

function AlertDialogOverlay({
  className,
  variant = "opaque",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: AlertDialogBackdrop
}) {
  return (
    <div
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 duration-200 data-[entering]:animate-in data-[entering]:fade-in-0 data-[exiting]:animate-out data-[exiting]:fade-out-0 motion-reduce:!animate-none",
        backdropClasses[variant],
        className
      )}
      {...props}
    />
  )
}

type AlertDialogContentProps = Omit<React.ComponentProps<typeof DialogContent>, "size"> & {
  backdrop?: AlertDialogBackdrop
  backdropClassName?: string
  disableEscapeClose?: boolean
  placement?: AlertDialogPlacement
  portalContainer?: Element | DocumentFragment | null
  size?: AlertDialogSize
}

function AlertDialogContent({
  className,
  size = "default",
  placement = "center",
  backdrop = "opaque",
  backdropClassName,
  ...props
}: AlertDialogContentProps) {
  return (
    <DialogContent
      {...props}
      role="alertdialog"
      showCloseButton={false}
      dismissible={false}
      data-slot="alert-dialog-content"
      data-size={size}
      data-placement={placement}
      overlayClassName={cn(backdropClasses[backdrop], backdropClassName)}
      className={cn(
        "group/alert-dialog-content fixed left-1/2 z-50 grid w-full -translate-x-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-200 outline-none data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 motion-reduce:!animate-none",
        sizeClasses[size],
        placementClasses[placement],
        className
      )}
    />
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
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

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
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

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
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
}: React.ComponentProps<typeof DialogClose> & Pick<ButtonProps, "variant" | "size">) {
  return (
    <DialogClose
      {...props}
      data-slot="alert-dialog-action"
      className={cn(buttonVariants({ variant, size }), className)}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof DialogClose> & Pick<ButtonProps, "variant" | "size">) {
  return (
    <DialogClose
      {...props}
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant, size }), className)}
    />
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
