"use client";

import { type ComponentProps, useState } from "react";

import { Cell, Label, Pie, PieChart as RechartsPieChart, Sector } from "recharts";

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

export interface PieChartProps extends BaseChartProps {
  variant?: "pie" | "donut";
  label?: string;
  showLabel?: boolean;
  nameKey?: string;
  activeIndex?: number | null;
  defaultActiveIndex?: number | null;
  onActiveIndexChange?: (activeIndex: number | null) => void;
  legendIndicator?: "line" | "dot" | "dashed";
  pieProps?: Partial<Omit<ComponentProps<typeof Pie>, "children" | "data" | "dataKey" | "nameKey">>;
  chartProps?: Omit<ComponentProps<typeof RechartsPieChart>, "children">;
}

type PieSectorClickHandler = NonNullable<ComponentProps<typeof Pie>["onClick"]>;

function sumNumericValues(data: Record<string, unknown>[], dataKey: string) {
  return data.reduce((total, item) => {
    const value = item[dataKey];
    return typeof value === "number" && Number.isFinite(value) ? total + value : total;
  }, 0);
}

export function PieChart({
  data = [],
  dataKey,
  nameKey = "name",
  variant = "pie",
  label,
  showLabel = false,
  activeIndex,
  defaultActiveIndex = null,
  onActiveIndexChange,
  colors = DEFAULT_COLORS,
  config,
  children,
  tooltip = true,
  tooltipProps,
  legend = true,
  legendProps,
  legendIndicator = "dot",
  pieProps,
  chartProps,
  valueFormatter = (value) => value.toString(),
  ...props
}: PieChartProps) {
  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] = useState<number | null>(defaultActiveIndex);
  const selectedIndex = activeIndex === undefined ? uncontrolledActiveIndex : activeIndex;
  const { onClick: onPieClick, ...remainingPieProps } = pieProps ?? {};
  const centerLabel = label ?? valueFormatter(sumNumericValues(data, dataKey));

  function handleSectorClick(...args: Parameters<PieSectorClickHandler>) {
    const [sector, index, event] = args;
    const nextIndex = selectedIndex === index ? null : index;
    if (activeIndex === undefined) setUncontrolledActiveIndex(nextIndex);
    onActiveIndexChange?.(nextIndex);
    onPieClick?.(sector, index, event);
  }

  return (
    <ChartContainer config={config} data={data} dataKey={dataKey} layout="radial" {...props}>
      {() => (
        <RechartsPieChart accessibilityLayer {...chartProps}>
          {legend && (
            <ChartLegend
              content={
                typeof legend === "boolean" ? (
                  <ChartLegendContent nameKey={nameKey} indicator={legendIndicator} />
                ) : (
                  legend
                )
              }
              {...legendProps}
            />
          )}
          {tooltip && (
            <ChartTooltip
              content={
                typeof tooltip === "boolean" ? (
                  <ChartTooltipContent nameKey={nameKey} hideLabel labelSeparator={false} />
                ) : (
                  tooltip
                )
              }
              {...tooltipProps}
            />
          )}
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={variant === "donut" ? "50%" : "0%"}
            strokeLinejoin="round"
            isAnimationActive
            shape={(sector) => (
              <Sector {...sector} outerRadius={sector.outerRadius + (sector.index === selectedIndex ? 8 : 0)} />
            )}
            onClick={handleSectorClick}
            {...remainingPieProps}
          >
            {data.map((item, index) => {
              const category = String(item[nameKey] ?? item.name ?? item.code ?? "");
              const configuredFill = typeof item.fill === "string" ? item.fill : undefined;
              const fill = configuredFill ?? getSeriesColor(config, category, index, colors);

              return (
                <Cell
                  key={`${category}-${index}`}
                  fill={fill}
                  fillOpacity={selectedIndex === null || selectedIndex === index ? 1 : 0.35}
                />
              );
            })}
            {children ? (
              <Label
                content={({ viewBox }) => {
                  if (
                    !viewBox ||
                    !("cx" in viewBox) ||
                    !("cy" in viewBox) ||
                    typeof viewBox.cx !== "number" ||
                    typeof viewBox.cy !== "number"
                  ) {
                    return null;
                  }
                  return (
                    <g transform={`translate(${viewBox.cx} ${viewBox.cy})`} data-slot="chart-center-label">
                      {children}
                    </g>
                  );
                }}
              />
            ) : (
              showLabel &&
              variant === "donut" && (
                <Label
                  content={({ viewBox }) => {
                    if (
                      !viewBox ||
                      !("cx" in viewBox) ||
                      !("cy" in viewBox) ||
                      typeof viewBox.cx !== "number" ||
                      typeof viewBox.cy !== "number"
                    ) {
                      return null;
                    }
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-lg font-semibold"
                        data-slot="chart-center-label"
                      >
                        {centerLabel}
                      </text>
                    );
                  }}
                />
              )
            )}
          </Pie>
        </RechartsPieChart>
      )}
    </ChartContainer>
  );
}
