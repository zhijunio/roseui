"use client";

import type { ComponentProps } from "react";
import { Bar, BarChart as RechartsBarChart } from "recharts";

import {
  type BaseChartProps,
  CartesianGrid,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  DEFAULT_COLORS,
  getSeriesColor,
  valueToPercent,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

export interface BarChartProps extends BaseChartProps {
  barCategoryGap?: number | string;
  barRadius?: number;
  barGap?: number | string;
  barSize?: number;
  barProps?: Partial<ComponentProps<typeof Bar>>;
  chartProps?: Omit<ComponentProps<typeof RechartsBarChart>, "data" | "children">;
}

export function BarChart({
  data = [],
  dataKey,
  colors = DEFAULT_COLORS,
  type = "default",
  config,
  children,
  layout = "horizontal",
  tooltip = true,
  tooltipProps,
  legend = true,
  legendProps,
  legendIndicator = "dot",
  intervalType = "equidistantPreserveStart",
  barCategoryGap = 5,
  barGap,
  barSize,
  barRadius,
  barProps,
  valueFormatter = (value) => value.toString(),
  displayEdgeLabelsOnly = false,
  xAxisProps,
  hideXAxis = false,
  yAxisProps,
  hideYAxis = false,
  hideGridLines = false,
  cartesianGridProps,
  chartProps,
  ...props
}: BarChartProps) {
  const configEntries = Object.entries(config);
  const stacked = type === "stacked" || type === "percent";

  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} layout={layout} {...props}>
      {() => (
        <RechartsBarChart
          data={data}
          margin={{ bottom: 0, left: 5, right: 0, top: 5 }}
          layout={layout === "radial" ? "horizontal" : layout}
          barGap={barGap}
          barSize={barSize}
          barCategoryGap={barCategoryGap}
          stackOffset={type === "percent" ? "expand" : stacked ? "sign" : undefined}
          {...chartProps}
        >
          {!hideGridLines && <CartesianGrid strokeDasharray="4 4" {...cartesianGridProps} />}
          <XAxis
            hide={hideXAxis}
            displayEdgeLabelsOnly={displayEdgeLabelsOnly}
            intervalType={intervalType}
            {...xAxisProps}
          />
          <YAxis
            hide={hideYAxis}
            tickFormatter={type === "percent" ? valueToPercent : valueFormatter}
            {...yAxisProps}
          />
          {legend && (
            <ChartLegend
              content={typeof legend === "boolean" ? <ChartLegendContent indicator={legendIndicator} /> : legend}
              {...legendProps}
            />
          )}
          {tooltip && (
            <ChartTooltip
              content={typeof tooltip === "boolean" ? <ChartTooltipContent /> : tooltip}
              {...tooltipProps}
            />
          )}
          {children ??
            configEntries.map(([key]) => (
              <Bar
                key={key}
                name={config[key]?.label ? String(config[key].label) : key}
                dataKey={key}
                stackId={stacked ? "stack" : undefined}
                radius={barRadius ?? (stacked ? undefined : 4)}
                fill={getSeriesColor(
                  config,
                  key,
                  configEntries.findIndex(([entry]) => entry === key),
                  colors,
                )}
                {...barProps}
              />
            ))}
        </RechartsBarChart>
      )}
    </ChartContainer>
  );
}
