"use client";

import * as React from "react";

import { ToggleButton } from "react-aria-components/ToggleButton";
import { ToggleButtonGroup } from "react-aria-components/ToggleButtonGroup";
import type { LegendPayload, TooltipValueType } from "recharts";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: '[data-theme="dark"]' } as const;
const chartKeyPattern = /^[a-zA-Z0-9_-]+$/;
// Chart config values enter generated style text, so accept only single CSS color tokens.
const chartColorPattern =
  /^(?:#[\da-f]{3}|#[\da-f]{4}|#[\da-f]{6}|#[\da-f]{8}|[a-z]+|var\(--[a-zA-Z_][a-zA-Z0-9_-]*\)|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([\da-z.%\s,+/-]+\))$/i;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;
type TooltipNameType = number | string;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })
>;

export const CHART_COLORS = {
  "chart-1": "var(--chart-1)",
  "chart-2": "var(--chart-2)",
  "chart-3": "var(--chart-3)",
  "chart-4": "var(--chart-4)",
  "chart-5": "var(--chart-5)",
} as const;

export type ChartColorKey = keyof typeof CHART_COLORS | (string & {});
export type ChartColorKeys = ChartColorKey;
export const DEFAULT_COLORS = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] as const;

export type ChartLayout = "horizontal" | "vertical" | "radial";

export type ChartContextProps = {
  config: ChartConfig;
  data?: Record<string, unknown>[];
  dataKey?: string;
  selectedLegend: string | null;
  onLegendSelect: (legendItem: string | null) => void;
  layout: ChartLayout;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  data,
  dataKey,
  layout: layoutProp,
  containerHeight,
  style,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  config: ChartConfig;
  data?: Record<string, unknown>[];
  dataKey?: string;
  layout?: ChartLayout;
  containerHeight?: number;
  children:
    | React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
    | ((context: ChartContextProps) => React.ReactNode);
  initialDimension?: {
    width: number;
    height: number;
  };
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${(id ?? uniqueId).replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const layout = layoutProp ?? inferChartLayout(typeof children === "function" ? null : children);
  const [selectedLegend, setSelectedLegend] = React.useState<string | null>(null);
  const onLegendSelect = React.useCallback((legendItem: string | null) => {
    setSelectedLegend((current) => (current === legendItem ? null : legendItem));
  }, []);
  const context = React.useMemo(
    () => ({ config, data, dataKey, selectedLegend, onLegendSelect, layout }),
    [config, data, dataKey, selectedLegend, onLegendSelect, layout],
  );
  const childrenWithInteractions = React.useMemo(() => {
    const resolvedChildren = typeof children === "function" ? children(context) : children;
    return withChartInteractions(resolvedChildren, selectedLegend, onLegendSelect, setSelectedLegend);
  }, [children, context, selectedLegend, onLegendSelect]);

  return (
    <ChartContext.Provider value={context}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-layer:focus]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden [&_.recharts-surface:focus]:outline-none [&_.recharts-wrapper_*:focus:not(:focus-visible)]:outline-none",
          containerHeight === undefined && "h-[370px] max-md:h-[200px]",
          className,
        )}
        style={containerHeight === undefined ? style : { ...style, height: containerHeight }}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension} height={containerHeight ?? "100%"}>
          {childrenWithInteractions}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function inferChartLayout(children: React.ReactNode): ChartLayout {
  let layout: ChartLayout = "horizontal";
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (
      child.type === RechartsPrimitive.PieChart ||
      child.type === RechartsPrimitive.RadarChart ||
      child.type === RechartsPrimitive.RadialBarChart
    ) {
      layout = "radial";
    } else if (
      child.type === RechartsPrimitive.BarChart ||
      child.type === RechartsPrimitive.AreaChart ||
      child.type === RechartsPrimitive.LineChart ||
      child.type === RechartsPrimitive.ComposedChart
    ) {
      const props = child.props as { layout?: string };
      if (props.layout === "vertical") layout = "vertical";
    }
  });
  return layout;
}

const seriesTypes = new Set([
  RechartsPrimitive.Area,
  RechartsPrimitive.Bar,
  RechartsPrimitive.Line,
  RechartsPrimitive.Pie,
  RechartsPrimitive.Radar,
  RechartsPrimitive.RadialBar,
  RechartsPrimitive.Scatter,
]);

const chartTypes = new Set([
  RechartsPrimitive.AreaChart,
  RechartsPrimitive.BarChart,
  RechartsPrimitive.ComposedChart,
  RechartsPrimitive.LineChart,
  RechartsPrimitive.PieChart,
  RechartsPrimitive.RadarChart,
  RechartsPrimitive.RadialBarChart,
  RechartsPrimitive.ScatterChart,
]);

function withChartInteractions(
  node: React.ReactNode,
  selected: string | null,
  onLegendSelect: (key: string | null) => void,
  clearSelection: (key: string | null) => void,
): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement(child)) return child;

    const element = child as React.ReactElement<Record<string, unknown>>;
    const props = element.props;
    const key = typeof props.dataKey === "string" ? props.dataKey : null;
    const isSeries = seriesTypes.has(element.type as never);
    const isPie = element.type === RechartsPrimitive.Pie;
    const isBar = element.type === RechartsPrimitive.Bar;
    const isChart = chartTypes.has(element.type as never);
    const nextProps: Record<string, unknown> = {
      children: withChartInteractions(props.children as React.ReactNode, selected, onLegendSelect, clearSelection),
    };

    if (isPie && selected !== null) {
      nextProps.children = withPieCellSelection(props.children as React.ReactNode, props, selected);
    }

    if (isChart) {
      const originalClick = props.onClick as ((...args: unknown[]) => void) | undefined;
      nextProps.onClick = (...args: unknown[]) => {
        originalClick?.(...args);
        clearSelection(null);
      };
    }

    if (isSeries && key && !isPie) {
      const dimmed = selected !== null && selected !== key;
      if (dimmed) {
        if (element.type === RechartsPrimitive.Line) nextProps.strokeOpacity = 0.1;
        if (element.type === RechartsPrimitive.Area) {
          nextProps.strokeOpacity = 0.1;
          nextProps.fillOpacity = 0.1;
        }
        if (element.type === RechartsPrimitive.Bar) {
          nextProps.strokeOpacity = 0.2;
          nextProps.fillOpacity = 0.1;
        }
        if (element.type === RechartsPrimitive.Radar) {
          nextProps.strokeOpacity = 0.12;
          nextProps.fillOpacity = 0.03;
        }
        if (element.type === RechartsPrimitive.RadialBar || element.type === RechartsPrimitive.Scatter) {
          nextProps.fillOpacity = 0.12;
        }
      }

      if (isBar) {
        const originalClick = props.onClick as ((...args: unknown[]) => void) | undefined;
        nextProps.onClick = (...args: unknown[]) => {
          const event = args[2] as { stopPropagation?: () => void } | undefined;
          event?.stopPropagation?.();
          originalClick?.(...args);
          onLegendSelect(key);
        };
      }
    }

    return React.cloneElement(element, nextProps);
  });
}

function withPieCellSelection(children: React.ReactNode, pieProps: Record<string, unknown>, selected: string) {
  const data = Array.isArray(pieProps.data) ? (pieProps.data as Record<string, unknown>[]) : [];
  const nameKey = typeof pieProps.nameKey === "string" ? pieProps.nameKey : undefined;
  const childrenArray = React.Children.toArray(children);
  const hasCells = childrenArray.some((child) => React.isValidElement(child) && child.type === RechartsPrimitive.Cell);
  let cellIndex = 0;
  const mappedChildren = childrenArray.map((child) => {
    if (!React.isValidElement(child) || child.type !== RechartsPrimitive.Cell) return child;
    const item = data[cellIndex];
    const itemKey = item ? String((nameKey ? item[nameKey] : undefined) ?? item.name ?? item.code ?? "") : "";
    cellIndex += 1;
    const cell = child as React.ReactElement<Record<string, unknown>>;
    return itemKey && itemKey !== selected ? React.cloneElement(cell, { fillOpacity: 0.12 }) : cell;
  });

  if (hasCells || data.length === 0) return mappedChildren;

  return [
    ...mappedChildren,
    ...data.map((item, index) => {
      const itemKey = String((nameKey ? item[nameKey] : undefined) ?? item.name ?? item.code ?? "");
      return (
        <RechartsPrimitive.Cell
          key={`chart-selection-${index}`}
          fillOpacity={itemKey !== selected ? 0.12 : undefined}
        />
      );
    }),
  ];
}

export function getColorValue(color?: string): string {
  if (!color) return CHART_COLORS["chart-1"];
  const value = CHART_COLORS[color as keyof typeof CHART_COLORS] ?? color;
  return chartColorPattern.test(value) ? value : CHART_COLORS["chart-1"];
}

export function constructCategoryColors(categories: string[], colors: readonly ChartColorKey[]) {
  const categoryColors = new Map<string, ChartColorKey>();
  categories.forEach((category, index) => {
    const color = colors[index % colors.length];
    if (color !== undefined) categoryColors.set(category, color);
  });
  return categoryColors;
}

export function valueToPercent(value: number) {
  return `${(value * 100).toFixed(0)}%`;
}

export type ChartType = "default" | "stacked" | "percent";
export type IntervalType = "preserveStartEnd" | "equidistantPreserveStart";

export interface BaseChartProps extends Omit<React.ComponentProps<"div">, "children"> {
  config: ChartConfig;
  data: Record<string, unknown>[];
  dataKey: string;
  colors?: readonly ChartColorKey[];
  type?: ChartType;
  intervalType?: IntervalType;
  legendIndicator?: "line" | "dot" | "dashed";
  layout?: ChartLayout;
  containerHeight?: number;
  valueFormatter?: (value: number) => string;
  tooltip?: boolean | React.ReactElement;
  tooltipProps?: Omit<React.ComponentProps<typeof RechartsPrimitive.Tooltip>, "content">;
  legend?: boolean | React.ReactElement;
  legendProps?: Omit<React.ComponentProps<typeof RechartsPrimitive.Legend>, "content">;
  cartesianGridProps?: React.ComponentProps<typeof RechartsPrimitive.CartesianGrid>;
  xAxisProps?: React.ComponentProps<typeof RechartsPrimitive.XAxis>;
  yAxisProps?: React.ComponentProps<typeof RechartsPrimitive.YAxis>;
  displayEdgeLabelsOnly?: boolean;
  hideGridLines?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  children?: React.ReactNode;
}

export function getSeriesColor(
  config: ChartConfig,
  key: string,
  index: number,
  colors: readonly ChartColorKey[] = DEFAULT_COLORS,
) {
  const entry = config[key];
  const configuredColor = entry?.theme ? `var(--color-${key})` : entry?.color;
  const fallback = colors.length > 0 ? colors[index % colors.length] : undefined;
  return getColorValue(configuredColor ?? fallback);
}

export function XAxis({
  displayEdgeLabelsOnly,
  intervalType = "preserveStartEnd",
  minTickGap = 5,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.XAxis> & {
  displayEdgeLabelsOnly?: boolean;
  intervalType?: IntervalType;
}) {
  const { data, dataKey, layout } = useChart();
  const edgeTicks =
    displayEdgeLabelsOnly && data?.length && dataKey
      ? [data[0]?.[dataKey], data[data.length - 1]?.[dataKey]]
      : undefined;
  const ticks = edgeTicks?.filter(
    (tick): tick is string | number => typeof tick === "string" || typeof tick === "number",
  );
  const tick = layout === "horizontal" ? { transform: "translate(0, 6)" } : undefined;

  return (
    <RechartsPrimitive.XAxis
      className="**:[text]:fill-muted-foreground"
      interval={displayEdgeLabelsOnly ? "preserveStartEnd" : intervalType}
      tick={tick}
      ticks={ticks}
      tickLine={false}
      axisLine={false}
      minTickGap={minTickGap}
      dataKey={layout === "horizontal" ? dataKey : undefined}
      {...props}
    />
  );
}

export function YAxis({
  width,
  domain = ["auto", "auto"],
  type,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.YAxis>) {
  const { dataKey, layout } = useChart();
  const horizontal = layout === "horizontal";

  return (
    <RechartsPrimitive.YAxis
      className="**:[text]:fill-muted-foreground"
      width={width ?? (horizontal ? 48 : 80)}
      domain={domain}
      tick={{ transform: horizontal ? "translate(-3, 0)" : "translate(0, 0)" }}
      dataKey={horizontal ? undefined : dataKey}
      type={type ?? (horizontal ? "number" : "category")}
      interval={horizontal ? undefined : "equidistantPreserveStart"}
      axisLine={false}
      tickLine={false}
      {...props}
    />
  );
}

export function CartesianGrid({ className, ...props }: React.ComponentProps<typeof RechartsPrimitive.CartesianGrid>) {
  const { layout } = useChart();
  return (
    <RechartsPrimitive.CartesianGrid
      className={cn("stroke-1 stroke-muted", className)}
      horizontal={layout !== "vertical"}
      vertical={layout === "vertical"}
      {...props}
    />
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const chartId = id.replace(/[^a-zA-Z0-9_-]/g, "");
  const colorConfig = Object.entries(config).filter(
    ([key, entry]) => chartKeyPattern.test(key) && (entry.theme ?? entry.color),
  );

  if (!colorConfig.length) {
    return null;
  }

  const styles = Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart="${chartId}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const configuredColor = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    const color = configuredColor ? getColorValue(configuredColor) : undefined;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
    )
    .join("\n");

  return <style>{styles}</style>;
};

const tooltipCursor = {
  stroke: "var(--muted)",
  strokeWidth: 1,
  fill: "var(--muted)",
  fillOpacity: 0.5,
} as const;

const radialTooltipCursor = {
  ...tooltipCursor,
  strokeWidth: 0.1,
} as const;

function ChartTooltip({ wrapperStyle, cursor, ...props }: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  const { layout } = useChart();
  return (
    <RechartsPrimitive.Tooltip
      wrapperStyle={{ outline: "none", ...wrapperStyle }}
      cursor={cursor ?? (layout === "radial" ? radialTooltipCursor : tooltipCursor)}
      {...props}
    />
  );
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  labelSeparator = true,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    labelSeparator?: boolean;
    nameKey?: string;
    labelKey?: string;
  } & Omit<RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>, "accessibilityLayer">) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? (config[label]?.label ?? label) : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
          {labelSeparator ? ":" : null}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return (
      <div className={cn("font-medium", labelClassName)}>
        {value}
        {labelSeparator ? ":" : null}
      </div>
    );
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey, labelSeparator]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const payloadName =
              nameKey && typeof item.payload === "object" && item.payload !== null ? item.payload[nameKey] : undefined;
            const key = String(
              (typeof payloadName === "string" || typeof payloadName === "number" ? payloadName : undefined) ??
                item.dataKey ??
                item.name ??
                "value",
            );
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color ?? item.payload?.fill ?? item.color;

            return (
              <div
                key={key}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between gap-4 leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>
                      </div>
                      {item.value != null && (
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  indicator = "dot",
  payload,
  align = "center",
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
} & Omit<RechartsPrimitive.DefaultLegendContentProps, "align" | "verticalAlign"> & {
    align?: "left" | "center" | "right";
    verticalAlign?: "top" | "middle" | "bottom";
  }) {
  const { config, selectedLegend, onLegendSelect } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <ToggleButtonGroup
      className={cn(
        "flex flex-wrap items-center gap-x-1 text-foreground",
        align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
      aria-label="Chart legend"
      selectionMode="single"
      selectedKeys={selectedLegend ? [selectedLegend] : []}
      onSelectionChange={(keys) => onLegendSelect(keys.size ? String(keys.values().next().value) : null)}
      onClick={(event) => event.stopPropagation()}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = getLegendItemKey(config, item, nameKey);
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <ToggleButton
              key={key}
              id={key}
              aria-label={String(itemConfig?.label ?? item.value ?? key)}
              className={cn(
                "flex items-center gap-1.5 rounded-sm px-2 py-1 text-muted-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-3 [&>svg]:text-muted-foreground",
                "hover:bg-secondary/70 hover:text-secondary-foreground selected:bg-secondary/70 selected:text-secondary-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className={cn("shrink-0 rounded-[2px]", {
                    "h-2 w-2": indicator === "dot",
                    "h-0.5 w-3": indicator === "line",
                    "h-0 w-3 border-t-2 border-dashed bg-transparent": indicator === "dashed",
                  })}
                  style={{
                    backgroundColor: indicator === "dashed" ? "transparent" : item.color,
                    borderColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label ?? item.value}
            </ToggleButton>
          );
        })}
    </ToggleButtonGroup>
  );
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

function getLegendItemKey(config: ChartConfig, item: LegendPayload, nameKey?: string) {
  const payload =
    item.payload && typeof item.payload === "object" ? (item.payload as Record<string, unknown>) : undefined;
  const candidates = [nameKey ? payload?.[nameKey] : undefined, item.value, item.dataKey];
  const configuredKey = candidates.find((candidate) => typeof candidate === "string" && candidate in config);
  return String(configuredKey ?? (nameKey ? payload?.[nameKey] : undefined) ?? item.dataKey ?? item.value ?? "value");
}

export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent };
