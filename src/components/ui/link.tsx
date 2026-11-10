"use client"

import * as React from "react"
import NextLink from "next/link"

import { cn } from "@/lib/utils"

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "onClick"> & {
  icon?: React.ReactNode
  iconPlacement?: "start" | "end"
  isDisabled?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

function Link({
  className,
  children,
  icon,
  iconPlacement = "end",
  isDisabled = false,
  onClick,
  ...props
}: LinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    onClick?.(event)
  }

  const iconElement = icon ? (
    <span aria-hidden="true" data-slot="link-icon" className="inline-flex shrink-0 [&_svg]:size-4">
      {icon}
    </span>
  ) : null

  return (
    <NextLink
      data-slot="link"
      data-disabled={isDisabled || undefined}
      aria-disabled={isDisabled || undefined}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-primary underline-offset-4 outline-none motion-safe:transition-colors hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        isDisabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {iconPlacement === "start" && iconElement}
      {children}
      {iconPlacement === "end" && iconElement}
    </NextLink>
  )
}

export { Link }
