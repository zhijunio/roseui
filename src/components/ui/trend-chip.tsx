import type { ComponentProps, ReactNode } from "react"
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react"
import { Chip, type ChipSize, type ChipVariant } from "@/components/ui/chip"

export type TrendDirection = "up" | "down" | "neutral"

export function TrendChip({
  trend,
  value,
  prefix,
  suffix,
  indicator,
  size = "sm",
  variant = "soft",
  tabularNums = true,
  className,
  ...props
}: Omit<ComponentProps<typeof Chip>, "children" | "color" | "size" | "variant" | "prefix"> & {
  trend: TrendDirection
  value: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  indicator?: ReactNode | null
  size?: ChipSize
  variant?: ChipVariant
  tabularNums?: boolean
}) {
  const DefaultIndicator = trend === "up" ? IconArrowUpRight : trend === "down" ? IconArrowDownRight : null
  const content = indicator === undefined ? (DefaultIndicator ? <DefaultIndicator aria-hidden="true" /> : null) : indicator
  const color = trend === "up" ? "success" : trend === "down" ? "danger" : "neutral"

  return (
    <Chip {...props} data-trend={trend} color={color} size={size} variant={variant} className={className}>
      <span className="sr-only">{trend} trend</span>
      {prefix != null && <span data-slot="trend-chip-prefix">{prefix}</span>}
      {content != null && <span data-slot="trend-chip-indicator" className="inline-flex items-center [&>svg]:size-3.5 [&>svg]:shrink-0">{content}</span>}
      <span data-slot="trend-chip-value" className={tabularNums ? "tabular-nums" : undefined}>{value}</span>
      {suffix != null && <span data-slot="trend-chip-suffix">{suffix}</span>}
    </Chip>
  )
}
