"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const avatarSizeClasses = {
  xs: "size-6",
  sm: "size-8",
  default: "size-10",
  lg: "size-12",
  xl: "size-14",
} as const

function Avatar({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: keyof typeof avatarSizeClasses
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 rounded-full bg-background select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        avatarSizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

const avatarFallbackClasses = {
  default: {
    solid: "",
    soft: "",
  },
  primary: {
    solid: "bg-primary text-primary-foreground",
    soft: "bg-primary/10 text-primary",
  },
  success: {
    solid: "bg-success text-success-foreground",
    soft: "bg-success-soft text-success",
  },
  warning: {
    solid: "bg-warning text-warning-foreground",
    soft: "bg-warning-soft text-warning",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground",
    soft: "bg-destructive-soft text-destructive",
  },
} as const;

function AvatarFallback({
  className,
  color = "default",
  variant = "solid",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  color?: keyof typeof avatarFallbackClasses;
  variant?: "solid" | "soft";
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=xs]/avatar:text-xs",
        avatarFallbackClasses[color][variant],
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute top-0 right-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
        "group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge }
