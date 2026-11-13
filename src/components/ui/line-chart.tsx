"use client";

import type { ComponentProps } from "react";
import { Line, LineChart as RechartsLineChart } from "recharts";

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

export interface LineChartProps extends BaseChartProps {
  connectNulls?: boolean;
  lineProps?: Partial<ComponentProps<typeof Line>>;
  chartProps?: Omit<ComponentProps<typeof RechartsLineChart>, "data" | "children">;
}

export function LineChart({
  data = [],
  dataKey,
  colors = DEFAULT_COLORS,
  connectNulls = false,
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
  lineProps,
  ...props
}: LineChartProps) {
  const configEntries = Object.entries(config);

  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} {...props}>
      {() => (
        <RechartsLineChart
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 5 }}
          stackOffset={type === "percent" ? "expand" : undefined}
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
            configEntries.map(([key], index) => (
              <Line
                key={key}
                dot={false}
                name={config[key]?.label ? String(config[key].label) : key}
                type="linear"
                dataKey={key}
                stroke={getSeriesColor(config, key, index, colors)}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                connectNulls={connectNulls}
                {...lineProps}
              />
            ))}
        </RechartsLineChart>
      )}
    </ChartContainer>
  );
}
