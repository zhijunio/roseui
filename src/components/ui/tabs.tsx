"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Tab as TabPrimitive,
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tabs as TabsPrimitive,
  type TabListProps as TabListPrimitiveProps,
} from "react-aria-components/Tabs"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { SelectionIndicator } from "react-aria-components/SelectionIndicator"

import { cn } from "@/lib/utils"

const TabsListContext = React.createContext<{ selectionIndicator: boolean }>({
  selectionIndicator: false,
})

function subscribeToHydration() {
  return () => {}
}

function Tabs({
  className,
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <TabsPrimitive
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      selectedKey={value ?? selectedKey}
      defaultSelectedKey={defaultValue ?? defaultSelectedKey}
      onSelectionChange={onSelectionChange ?? (onValueChange ? (key) => onValueChange(String(key)) : undefined)}
      className={cn(
        "group/tabs flex gap-2 orientation-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list no-scrollbar inline-flex w-fit max-w-full items-center justify-start rounded-lg p-[3px] text-muted-foreground group-orientation-horizontal/tabs:h-8 group-orientation-horizontal/tabs:overflow-x-auto group-orientation-horizontal/tabs:overflow-y-hidden group-orientation-vertical/tabs:h-fit group-orientation-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        pill: "rounded-full bg-muted/70",
      },
    },
    defaultVariants: { variant: "default" },
  }
)
export type TabsListVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>
export type TabsListProps<T extends object> = TabListPrimitiveProps<T> & VariantProps<typeof tabsListVariants>

export function TabsList<T extends object>({
  className,
  variant = "default",
  children,
  ...props
}: TabsListProps<T>) {
  return (
    <TabsListContext.Provider value={{ selectionIndicator: variant === "line" }}>
      <TabListPrimitive
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {children}
      </TabListPrimitive>
    </TabsListContext.Provider>
  )
}

function TabsTrigger({
  className,
  value,
  disabled,
  isDisabled,
  id,
  children,
  ...props
}: React.ComponentProps<typeof TabPrimitive> & {
  value?: string
  disabled?: boolean
}) {
  const { selectionIndicator } = React.useContext(TabsListContext)
  const isHydrated = React.useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  )

  return (
    <TabPrimitive
      id={id ?? value}
      isDisabled={disabled ?? isDisabled}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 motion-safe:transition-[color,background-color,border-color,box-shadow] group-orientation-vertical/tabs:w-full group-orientation-vertical/tabs:justify-start hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=line]/tabs-list:selected:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:selected:bg-transparent dark:group-data-[variant=line]/tabs-list:selected:bg-transparent",
        "selected:bg-background selected:text-foreground dark:selected:bg-input/30 dark:selected:text-foreground",
        "group-data-[variant=pill]/tabs-list:selected:bg-primary group-data-[variant=pill]/tabs-list:selected:text-primary-foreground",
        className
      )}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {selectionIndicator && isHydrated && (
            <SelectionIndicator
              data-slot="tabs-selection-indicator"
              className={cn(
                "pointer-events-none absolute bg-foreground will-change-transform motion-safe:transition-[translate,width,height] motion-safe:duration-200 motion-safe:ease-out",
                "group-orientation-horizontal/tabs:inset-x-0 group-orientation-horizontal/tabs:-bottom-[5px] group-orientation-horizontal/tabs:h-0.5",
                "group-orientation-vertical/tabs:inset-y-0 group-orientation-vertical/tabs:-right-1 group-orientation-vertical/tabs:w-0.5",
              )}
            />
          )}
        </>
      ))}
    </TabPrimitive>
  )
}

function TabsContent({
  className,
  value,
  id,
  ...props
}: React.ComponentProps<typeof TabPanelPrimitive> & { value?: string }) {
  return (
    <TabPanelPrimitive
      id={id ?? value}
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsTrigger, TabsContent, tabsListVariants }
