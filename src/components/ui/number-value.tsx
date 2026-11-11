import * as React from "react"
import { cn } from "@/lib/utils"

type NumberValueFormat = "decimal" | "currency" | "percent" | "unit"

type NumberValueCommonProps = {
  value: number
  notation?: Intl.NumberFormatOptions["notation"]
  signDisplay?: Intl.NumberFormatOptions["signDisplay"]
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
  formatOptions?: Intl.NumberFormatOptions
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  children?: React.ReactNode | ((formatted: string) => React.ReactNode)
}
type NumberValueFormatProps =
  | { formatStyle?: "decimal"; currency?: never; unit?: never; unitDisplay?: never }
  | { formatStyle: "currency"; currency: string; unit?: never; unitDisplay?: never }
  | { formatStyle: "unit"; unit: NonNullable<Intl.NumberFormatOptions["unit"]>; unitDisplay?: Intl.NumberFormatOptions["unitDisplay"]; currency?: never }
  | { formatStyle: "percent"; currency?: never; unit?: never; unitDisplay?: never }
type NumberValueProps = Omit<React.ComponentProps<"span">, "children" | "style" | "prefix"> & NumberValueCommonProps & NumberValueFormatProps

function NumberValue({ value, formatStyle = "decimal", currency, unit, unitDisplay, notation, signDisplay, minimumFractionDigits, maximumFractionDigits, locale, formatOptions, prefix, suffix, children, className, ...props }: NumberValueProps) {
  const formatted = React.useMemo(() => {
    const options: Intl.NumberFormatOptions = {
      style: formatStyle,
      ...(formatStyle === "currency" && currency ? { currency } : {}),
      ...(formatStyle === "unit" && unit ? { unit, unitDisplay } : {}),
      ...(notation ? { notation } : {}),
      ...(signDisplay ? { signDisplay } : {}),
      ...(minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}),
      ...(maximumFractionDigits !== undefined ? { maximumFractionDigits } : {}),
      ...formatOptions,
    }
    return new Intl.NumberFormat(locale, options).format(value)
  }, [currency, formatOptions, formatStyle, locale, maximumFractionDigits, minimumFractionDigits, notation, signDisplay, unit, unitDisplay, value])
  const content = typeof children === "function" ? children(formatted) : children ?? formatted

  return <span data-slot="number-value" className={cn("inline-flex flex-nowrap items-baseline gap-1 tabular-nums", className)} {...props}>
    {prefix != null && <span data-slot="number-value-prefix">{prefix}</span>}
    <span data-slot="number-value-value">{content}</span>
    {suffix != null && <span data-slot="number-value-suffix">{suffix}</span>}
  </span>
}

export { NumberValue }
export type { NumberValueProps, NumberValueFormat }
