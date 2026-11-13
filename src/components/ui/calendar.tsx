"use client"

import {
  Calendar as CalendarPrimitive,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  CalendarMonthPicker,
  CalendarYearPicker,
  type CalendarProps as CalendarPrimitiveProps,
  type DateValue,
} from "react-aria-components/Calendar"
import { Heading } from "react-aria-components/Heading"
import { useLocale } from "react-aria-components/I18nProvider"
import { Button as AriaButton } from "react-aria-components/Button"
import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface CalendarProps<T extends DateValue> extends CalendarPrimitiveProps<T> {
  className?: string
}

export function Calendar<T extends DateValue>({ className, ...props }: CalendarProps<T>) {
  return (
    <CalendarPrimitive data-slot="calendar" {...props}>
      <CalendarHeader />
      <CalendarGrid>
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={({ isSelected, isToday, isDisabled }) =>
                cn(
                  "relative flex size-11 cursor-default items-center justify-center rounded-lg text-foreground tabular-nums outline-hidden hover:bg-accent sm:size-9 sm:text-sm",
                  isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                  isDisabled && "text-muted-foreground opacity-50",
                  isToday && "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary selected:after:bg-primary-foreground",
                  className,
                )
              }
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </CalendarPrimitive>
  )
}

export function CalendarHeader({ className, ...props }: React.ComponentProps<"header">) {
  const { direction } = useLocale()
  return (
    <header
      data-slot="calendar-header"
      className={cn("flex w-full items-center justify-between gap-2 px-1.5 pb-4 pt-1", className)}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <CalendarMonthPicker>
          {({ items, value, onChange, ...pickerProps }) => (
            <Select
              aria-label={pickerProps["aria-label"]}
              value={String(value)}
              onValueChange={(key) => onChange(Number(key))}
            >
              <SelectTrigger size="sm" className="h-8 border-0 bg-transparent px-2 font-medium shadow-none hover:bg-accent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)} textValue={item.formatted}>
                    {item.formatted}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CalendarMonthPicker>
        <CalendarYearPicker>
          {({ items, value, onChange, ...pickerProps }) => (
            <Select
              aria-label={pickerProps["aria-label"]}
              value={String(value)}
              onValueChange={(key) => onChange(Number(key))}
            >
              <SelectTrigger size="sm" className="h-8 border-0 bg-transparent px-2 font-medium shadow-none hover:bg-accent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)} textValue={item.formatted}>
                    {item.formatted}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CalendarYearPicker>
        <Heading className="sr-only" />
      </div>
      <div className="flex items-center gap-1">
        <AriaButton
          slot="previous"
          aria-label="Previous month"
          className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {direction === "rtl" ? <IconChevronRight className="size-4" /> : <IconChevronLeft className="size-4" />}
        </AriaButton>
        <AriaButton
          slot="next"
          aria-label="Next month"
          className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {direction === "rtl" ? <IconChevronLeft className="size-4" /> : <IconChevronRight className="size-4" />}
        </AriaButton>
      </div>
    </header>
  )
}

export function CalendarGridHeader() {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => (
        <CalendarHeaderCell className="pb-2 text-center text-xs font-medium text-muted-foreground">
          {day}
        </CalendarHeaderCell>
      )}
    </CalendarGridHeaderPrimitive>
  )
}

export { CalendarPrimitive }
