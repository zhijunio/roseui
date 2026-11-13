"use client"

import { ChevronRight } from "lucide-react"
import { createContext, use, type ReactNode } from "react"
import type { BreadcrumbProps as BreadcrumbPrimitiveProps, BreadcrumbsProps } from "react-aria-components/Breadcrumbs"
import { Breadcrumb as BreadcrumbPrimitive, Breadcrumbs as BreadcrumbsPrimitive } from "react-aria-components/Breadcrumbs"
import type { LinkProps } from "react-aria-components/Link"
import { cn } from "@/lib/utils"
import { Link } from "./link"

export type BreadcrumbSeparatorType = "chevron" | "slash" | false
const BreadcrumbContext = createContext<BreadcrumbSeparatorType>("chevron")

export function Breadcrumbs<T extends object>({
  className,
  separator = "chevron",
  ...props
}: BreadcrumbsProps<T> & { separator?: BreadcrumbSeparatorType }) {
  return (
    <BreadcrumbContext.Provider value={separator}>
      <BreadcrumbsPrimitive {...props} className={cn("flex items-center gap-2", className)} />
    </BreadcrumbContext.Provider>
  )
}

export type BreadcrumbProps = Omit<BreadcrumbPrimitiveProps, "children" | "id" | "slot"> &
  Partial<Omit<LinkProps, "className" | "children" | "slot" | "id">> & {
    id?: string
    children: ReactNode
    separator?: BreadcrumbSeparatorType
    textValue?: string
  }

export function Breadcrumb({
  children,
  className,
  separator,
  ...props
}: BreadcrumbProps) {
  const { textValue: _textValue, href, ...breadcrumbProps } = props
  const inheritedSeparator = use(BreadcrumbContext)
  const currentSeparator = separator ?? inheritedSeparator

  return (
    <BreadcrumbPrimitive className={cn("flex items-center gap-2 text-sm", className)} {...breadcrumbProps}>
      {({ isCurrent }) => (
        <>
          {isCurrent || !href ? (
            <span aria-current={isCurrent ? "page" : undefined}>{children}</span>
          ) : (
            <Link
              href={href}
              className="has-data-[slot=icon]:inline-flex has-data-[slot=icon]:items-center has-data-[slot=icon]:gap-x-2 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4 *:data-[slot=icon]:text-muted-foreground hover:*:data-[slot=icon]:text-foreground"
            >
              {children}
            </Link>
          )}
          {!isCurrent && currentSeparator && <Separator separator={currentSeparator} />}
        </>
      )}
    </BreadcrumbPrimitive>
  )
}

function Separator({ separator }: { separator: Exclude<BreadcrumbSeparatorType, false> }) {
  return (
    <span aria-hidden="true" className="*:shrink-0 *:text-muted-foreground *:data-[slot=icon]:size-3.5">
      {separator === "chevron" ? <ChevronRight className="size-3.5" /> : <span>/</span>}
    </span>
  )
}

export type { BreadcrumbsProps }
