"use client";

import { type ComponentProps, useId } from "react";
import { Area, AreaChart as RechartsAreaChart } from "recharts";

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

export interface AreaChartProps extends BaseChartProps {
  areaProps?: Partial<ComponentProps<typeof Area>>;
  chartProps?: Omit<ComponentProps<typeof RechartsAreaChart>, "data" | "children">;
}

export function AreaChart({
  data = [],
  dataKey,
  colors = DEFAULT_COLORS,
  type = "default",
  config,
  children,
  tooltip = true,
  tooltipProps,
  legend = true,
  legendProps,
  legendIndicator = "dot",
  intervalType = "equidistantPreserveStart",
  valueFormatter = (value) => value.toString(),
  displayEdgeLabelsOnly = false,
  xAxisProps,
  hideXAxis = false,
  yAxisProps,
  hideYAxis = false,
  hideGridLines = false,
  cartesianGridProps,
  chartProps,
  areaProps,
  ...props
}: AreaChartProps) {
  const areaId = useId();
  const configEntries = Object.entries(config);
  const stacked = type === "stacked" || type === "percent";

  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} {...props}>
      {() => (
        <RechartsAreaChart
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 5 }}
          stackOffset={type === "percent" ? "expand" : undefined}
          {...chartProps}
        >
          <defs>
            {configEntries.map(([key], index) => {
              const color = getSeriesColor(config, key, index, colors);
              const gradientKey = key.replace(/[^a-zA-Z0-9_-]/g, "-");
              return (
                <linearGradient key={key} id={`${areaId}-${gradientKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              );
            })}
          </defs>
          {!hideGridLines && <CartesianGrid strokeDasharray="3 3" {...cartesianGridProps} />}
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
            configEntries.map(([key], index) => {
              const color = getSeriesColor(config, key, index, colors);
              return (
                <Area
                  key={key}
                  name={config[key]?.label ? String(config[key].label) : key}
                  dataKey={key}
                  type="monotone"
                  stroke={color}
                  fill={`url(#${areaId}-${key.replace(/[^a-zA-Z0-9_-]/g, "-")})`}
                  fillOpacity={1}
                  stackId={stacked ? "stack" : undefined}
                  connectNulls
                  {...areaProps}
                />
              );
            })}
        </RechartsAreaChart>
      )}
    </ChartContainer>
  );
}
