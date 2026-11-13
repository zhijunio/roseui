"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheck as CircleCheckIcon, Info as InfoIcon, AlertTriangle as TriangleAlertIcon, CircleX as OctagonXIcon, Loader2 as Loader2Icon } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      position="bottom-right"
      gap={12}
      visibleToasts={3}
      duration={5000}
      closeButton
      offset={24}
      mobileOffset={12}
      dir="auto"
      containerAriaLabel="Notifications"
      icons={{
        success: (
          <CircleCheckIcon className="size-5" />
        ),
        info: (
          <InfoIcon className="size-5" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5" />
        ),
        error: (
          <OctagonXIcon className="size-5" />
        ),
        loading: (
          <Loader2Icon className="size-5 motion-safe:animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--success-soft)",
          "--success-text": "var(--success-subtle-foreground)",
          "--success-border": "var(--border)",
          "--info-bg": "var(--info-soft)",
          "--info-text": "var(--info-subtle-foreground)",
          "--info-border": "var(--border)",
          "--warning-bg": "var(--warning-soft)",
          "--warning-text": "var(--warning-subtle-foreground)",
          "--warning-border": "var(--border)",
          "--error-bg": "var(--destructive-soft)",
          "--error-text": "var(--destructive-subtle-foreground)",
          "--error-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--width": "400px",
        } as React.CSSProperties
      }
      toastOptions={{
        closeButtonAriaLabel: "Dismiss notification",
        classNames: {
          toast: "cn-toast",
          title: "cn-toast-title",
          description: "cn-toast-description",
          success: "cn-toast-success",
          info: "cn-toast-info",
          warning: "cn-toast-warning",
          error: "cn-toast-error",
          loading: "cn-toast-loading",
          actionButton: "cn-toast-action",
          cancelButton: "cn-toast-cancel",
          closeButton: "cn-toast-close",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
export type { ToasterProps } from "sonner"
