"use client";

import type { ComponentProps } from "react";
import { Area, Bar, Line, ComposedChart as RechartsComposedChart, Scatter } from "recharts";

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

type SeriesProps = { dataKey: string; name?: string };

export type ComposedChartSeries =
  | ({ type: "area" } & SeriesProps & {
        props?: Omit<Partial<ComponentProps<typeof Area>>, "dataKey" | "name" | "type">;
      })
  | ({ type: "bar" } & SeriesProps & {
        props?: Omit<Partial<ComponentProps<typeof Bar>>, "dataKey" | "name">;
      })
  | ({ type: "line" } & SeriesProps & {
        props?: Omit<Partial<ComponentProps<typeof Line>>, "dataKey" | "name" | "type">;
      })
  | ({ type: "scatter" } & SeriesProps & {
        props?: Omit<Partial<ComponentProps<typeof Scatter>>, "dataKey" | "name">;
      });

export interface ComposedChartProps extends BaseChartProps {
  series: ComposedChartSeries[];
  chartProps?: Omit<ComponentProps<typeof RechartsComposedChart>, "children" | "data">;
}

export function ComposedChart({
  data = [],
  dataKey,
  colors = DEFAULT_COLORS,
  type = "default",
  config,
  series,
  children,
  layout = "horizontal",
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
  ...props
}: ComposedChartProps) {
  const stacked = type === "stacked" || type === "percent";

  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} layout={layout} {...props}>
      {() => (
        <RechartsComposedChart
          data={data}
          layout={layout === "radial" ? "horizontal" : layout}
          stackOffset={type === "percent" ? "expand" : stacked ? "sign" : undefined}
          margin={{ bottom: 0, left: 0, right: 0, top: 5 }}
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
          {series.map((item, index) => {
            const color = getSeriesColor(config, item.dataKey, index, colors);
            const name = item.name ?? String(config[item.dataKey]?.label ?? item.dataKey);
            const stackId = stacked && item.type !== "scatter" ? "stack" : undefined;

            switch (item.type) {
              case "area":
                return (
                  <Area
                    key={`${item.type}-${item.dataKey}`}
                    dataKey={item.dataKey}
                    name={name}
                    type="monotone"
                    stroke={color}
                    fill={color}
                    fillOpacity={0.18}
                    stackId={stackId}
                    {...item.props}
                  />
                );
              case "bar":
                return (
                  <Bar
                    key={`${item.type}-${item.dataKey}`}
                    dataKey={item.dataKey}
                    name={name}
                    fill={color}
                    radius={4}
                    stackId={stackId}
                    {...item.props}
                  />
                );
              case "line":
                return (
                  <Line
                    key={`${item.type}-${item.dataKey}`}
                    dataKey={item.dataKey}
                    name={name}
                    type="monotone"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    {...item.props}
                  />
                );
              case "scatter":
                return (
                  <Scatter
                    key={`${item.type}-${item.dataKey}`}
                    dataKey={item.dataKey}
                    name={name}
                    fill={color}
                    {...item.props}
                  />
                );
              default: {
                const exhaustive: never = item;
                return exhaustive;
              }
            }
          })}
          {children}
        </RechartsComposedChart>
      )}
    </ChartContainer>
  );
}
