"use client";

import type { ComponentProps } from "react";

import { Cell, PolarAngleAxis, RadialBar, RadialBarChart as RechartsRadialBarChart } from "recharts";

import {
  type BaseChartProps,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  DEFAULT_COLORS,
  getSeriesColor,
} from "@/components/roseui/chart";

export interface RadialBarChartSeries {
  dataKey: string;
  name?: string;
  radialBarProps?: Omit<Partial<ComponentProps<typeof RadialBar>>, "dataKey" | "name">;
}

export interface RadialBarChartProps extends BaseChartProps {
  series: RadialBarChartSeries[];
  nameKey?: string;
  angleAxisProps?: ComponentProps<typeof PolarAngleAxis>;
  chartProps?: Omit<ComponentProps<typeof RechartsRadialBarChart>, "children" | "data">;
}

export function RadialBarChart({
  data = [],
  dataKey,
  nameKey,
  colors = DEFAULT_COLORS,
  config,
  series,
  children,
  tooltip = true,
  tooltipProps,
  legend = series.length > 1,
  legendProps,
  legendIndicator = "dot",
  angleAxisProps,
  chartProps,
  ...props
}: RadialBarChartProps) {
  const categorySeries = nameKey !== undefined && series.length === 1;

  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} layout="radial" {...props}>
      {() => (
        <RechartsRadialBarChart data={data} {...chartProps}>
          {nameKey && <PolarAngleAxis dataKey={nameKey} type="category" {...angleAxisProps} />}
          {legend && (
            <ChartLegend
              content={
                typeof legend === "boolean" ? (
                  <ChartLegendContent nameKey={categorySeries ? nameKey : undefined} indicator={legendIndicator} />
                ) : (
                  legend
                )
              }
              {...legendProps}
            />
          )}
          {tooltip && (
            <ChartTooltip
              content={typeof tooltip === "boolean" ? <ChartTooltipContent nameKey={nameKey} /> : tooltip}
              {...tooltipProps}
            />
          )}
          {series.map((item, seriesIndex) => {
            const color = getSeriesColor(config, item.dataKey, seriesIndex, colors);
            const name = item.name ?? String(config[item.dataKey]?.label ?? item.dataKey);

            return (
              <RadialBar key={item.dataKey} dataKey={item.dataKey} name={name} fill={color} {...item.radialBarProps}>
                {categorySeries && nameKey
                  ? data.map((datum, index) => {
                      const category = String(datum[nameKey] ?? datum.name ?? datum.code ?? "");
                      const categoryColor = getSeriesColor(config, category, index, colors);
                      return <Cell key={`${category}-${index}`} fill={categoryColor} />;
                    })
                  : null}
              </RadialBar>
            );
          })}
          {children}
        </RechartsRadialBarChart>
      )}
    </ChartContainer>
  );
}
