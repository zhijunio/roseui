"use client";

import type { ComponentProps } from "react";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart } from "recharts";

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

export interface RadarChartSeries {
  dataKey: string;
  name?: string;
  radarProps?: Omit<Partial<ComponentProps<typeof Radar>>, "dataKey" | "name">;
}

export interface RadarChartProps extends BaseChartProps {
  series: RadarChartSeries[];
  angleAxisProps?: Omit<ComponentProps<typeof PolarAngleAxis>, "dataKey">;
  polarGridProps?: ComponentProps<typeof PolarGrid>;
  radiusAxisProps?: ComponentProps<typeof PolarRadiusAxis>;
  chartProps?: Omit<ComponentProps<typeof RechartsRadarChart>, "children" | "data">;
}

export function RadarChart({
  data = [],
  dataKey,
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
  polarGridProps,
  radiusAxisProps,
  chartProps,
  ...props
}: RadarChartProps) {
  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} layout="radial" {...props}>
      {() => (
        <RechartsRadarChart data={data} {...chartProps}>
          <PolarGrid {...polarGridProps} />
          <PolarAngleAxis dataKey={dataKey} {...angleAxisProps} />
          {radiusAxisProps && <PolarRadiusAxis {...radiusAxisProps} />}
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
            return (
              <Radar
                key={item.dataKey}
                dataKey={item.dataKey}
                name={item.name ?? String(config[item.dataKey]?.label ?? item.dataKey)}
                stroke={color}
                fill={color}
                fillOpacity={0.16}
                {...item.radarProps}
              />
            );
          })}
          {children}
        </RechartsRadarChart>
      )}
    </ChartContainer>
  );
}
