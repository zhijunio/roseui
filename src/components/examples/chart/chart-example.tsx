"use client";
import { type ComponentProps, useId, useState } from "react";

import { useReducedMotion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  Pie,
  PieChart,
  type PieSectorDataItem,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  Sector,
  XAxis,
  YAxis,
} from "recharts";

import { AreaChart as ConfigAreaChart } from "@/components/roseui/area-chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/roseui/chart";
import { Button } from "@/components/ui/button";

const chartClass = "h-[360px] w-full !aspect-auto";

export function monthlyData(locale: string) {
  return [186, 305, 237, 173, 209, 214].map((desktop, index) => ({
    desktop,
    mobile: [80, 200, 120, 190, 130, 140][index],
    forecast: index >= 3 ? desktop + 60 : undefined,
    month: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)),
  }));
}

function DepthBar({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x),
    top = Number(y),
    w = Number(width),
    h = Number(height);
  return (
    <g>
      <Rectangle {...props} x={left} y={top} width={w} height={h} fill={fill} />
      <path d={`M${left},${top} l8,-6 h${w} l-8,6 Z`} fill={fill} opacity={0.65} />
      <path d={`M${left + w},${top} l8,-6 v${h} l-8,6 Z`} fill={fill} opacity={0.45} />
    </g>
  );
}

type ChartExampleVariant =
  | "area-gradient"
  | "area-stacked"
  | "area-step"
  | "bar-grouped"
  | "bar-horizontal"
  | "bar-single"
  | "composed-forecast"
  | "pie-priority"
  | "radar-single"
  | "radial-scores";

const examples = {
  "area-gradient": 13,
  "area-stacked": 14,
  "area-step": 15,
  "bar-grouped": 2,
  "bar-horizontal": 12,
  "bar-single": 1,
  "composed-forecast": 17,
  "pie-priority": 21,
  "radar-single": 23,
  "radial-scores": 25,
} satisfies Record<ChartExampleVariant, number>;

export function ChartExample({ variant }: { variant: ChartExampleVariant }) {
  const example = examples[variant];
  const locale = "en-US";
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const data = monthlyData(locale);
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    forecast: { label: "Forecast", color: "var(--chart-3)" },
    paid: { label: "Paid", color: "var(--chart-1)" },
    pending: { label: "Pending", color: "var(--chart-2)" },
    overdue: { label: "Overdue", color: "var(--chart-3)" },
    high: { label: "High", color: "var(--chart-1)" },
    medium: { label: "Medium", color: "var(--chart-2)" },
    low: { label: "Low", color: "var(--chart-3)" },
  };
  const patternId = `${id}-pattern`;
  const gradientId = `${id}-gradient`;
  const glowId = `${id}-glow`;
  const defs = (
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2={example === 10 ? "1" : "0"} y2="1">
        <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.95} />
        <stop
          offset="100%"
          stopColor={example === 10 ? "var(--color-mobile)" : "var(--color-desktop)"}
          stopOpacity={0.15}
        />
      </linearGradient>
      <pattern id={patternId} patternUnits="userSpaceOnUse" width={8} height={8}>
        <rect width={8} height={8} fill="var(--color-desktop)" opacity={0.1} />
        {[4, 9, 15].includes(example) ? (
          <circle cx={4} cy={4} r={1.3} fill="var(--color-desktop)" />
        ) : (
          <path
            d={example === 18 ? "M0,0 L8,8 M0,8 L8,0" : "M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6"}
            stroke="var(--color-desktop)"
            strokeWidth={1.5}
          />
        )}
      </pattern>
      <filter id={glowId}>
        <feGaussianBlur stdDeviation={2} result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
  const axis = <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />;
  const tooltip = <ChartTooltip cursor={false} content={<ChartTooltipContent />} />;
  const legend = <ChartLegend content={<ChartLegendContent />} />;
  if (example === 13) {
    return (
      <ConfigAreaChart
        config={{ desktop: { label: "Desktop", color: "var(--chart-1)" } }}
        data={data}
        dataKey="month"
        className={chartClass}
        aria-label="Monthly desktop visitors"
      />
    );
  }
  if (example <= 12) {
    const horizontal = example === 12;
    const pattern = [3, 4, 5, 9].includes(example);
    const fill = pattern
      ? `url(#${patternId})`
      : [6, 7, 10].includes(example)
        ? `url(#${gradientId})`
        : "var(--color-desktop)";
    return (
      <ChartContainer
        config={config}
        className={chartClass}
        aria-label={
          [
            "Basic bar chart",
            "Multi-dataset bar chart",
            "Diagonal stripe bar chart",
            "Dotted pattern bar chart",
            "Striped and solid bar chart",
            "3D gradient bar chart",
            "Gradient bar chart",
            "3D isometric bar chart",
            "Dotted and solid bar chart",
            "Duotone gradient bar chart",
            "Animated monochrome bar chart",
            "Vertical bar chart",
            "Gradient area chart with stripe overlay",
            "Stacked area chart with dashed strokes",
            "Step area chart with dotted pattern fill",
            "Area chart with glowing dot markers",
            "Forecast line chart with stripe pattern zone",
            "Stacked area chart with crosshatch pattern fill",
            "Donut chart with center total",
            "Donut chart with center stats",
            "Bug priority pie with stripe patterns",
            "Active segment donut with center label",
            "Radar chart with gradient fill",
            "Filled radar with glowing stroke",
            "Lighthouse scores radial with labels",
          ][example - 1]
        }
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 12, right: 12 }}
        >
          {defs}
          <CartesianGrid vertical={false} />
          {horizontal ? (
            <>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="month" axisLine={false} tickLine={false} width={36} />
            </>
          ) : (
            axis
          )}
          {tooltip}
          {legend}
          <Bar
            dataKey="desktop"
            fill={fill}
            radius={example === 8 ? 0 : 4}
            shape={[6, 8].includes(example) ? <DepthBar /> : undefined}
            isAnimationActive={example === 11 && reduced === false}
          />
          {[2, 5, 9].includes(example) && (
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />
          )}
        </BarChart>
      </ChartContainer>
    );
  }
  if (example <= 18) {
    if (example === 17)
      return (
        <ChartContainer config={config} className={chartClass} aria-label={"Monthly visitors by device"}>
          <ComposedChart accessibilityLayer data={data}>
            {defs}
            <CartesianGrid vertical={false} />
            {axis}
            {tooltip}
            {legend}
            <Area
              dataKey="forecast"
              stroke="none"
              fill={`url(#${patternId})`}
              legendType="none"
              tooltipType="none"
              isAnimationActive={false}
            />
            <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} isAnimationActive={false} />
            <Line
              dataKey="forecast"
              stroke="var(--color-forecast)"
              strokeDasharray="5 4"
              strokeWidth={2}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ChartContainer>
      );
    return (
      <ChartContainer config={config} className={chartClass} aria-label={"Monthly visitors by device"}>
        <AreaChart accessibilityLayer data={data}>
          {defs}
          <CartesianGrid vertical={false} />
          {axis}
          {tooltip}
          {legend}
          <Area
            dataKey="desktop"
            type={example === 15 ? "step" : "monotone"}
            stroke="var(--color-desktop)"
            strokeWidth={2}
            strokeDasharray={example === 14 ? "5 3" : undefined}
            stackId={[14, 18].includes(example) ? "visitors" : undefined}
            fill={[15, 18].includes(example) ? `url(#${patternId})` : `url(#${gradientId})`}
            dot={example === 16 ? { r: 4, fill: "var(--color-desktop)", filter: `url(#${glowId})` } : false}
            isAnimationActive={false}
          />
          {example === 13 && (
            <Area
              dataKey="desktop"
              type="monotone"
              stroke="none"
              fill={`url(#${patternId})`}
              legendType="none"
              tooltipType="none"
              isAnimationActive={false}
            />
          )}
          {[14, 18].includes(example) && (
            <Area
              dataKey="mobile"
              stackId="visitors"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeDasharray="5 3"
              fill="var(--color-mobile)"
              fillOpacity={0.2}
              isAnimationActive={false}
            />
          )}
        </AreaChart>
      </ChartContainer>
    );
  }
  if (example <= 22) {
    const totals =
      example === 21
        ? [
            { name: "high", value: 48, fill: `url(#${patternId})` },
            { name: "medium", value: 32, fill: "var(--color-medium)" },
            { name: "low", value: 20, fill: "var(--color-low)" },
          ]
        : [
            { name: "desktop", value: data.reduce((sum, row) => sum + row.desktop, 0), fill: "var(--color-desktop)" },
            { name: "mobile", value: data.reduce((sum, row) => sum + row.mobile, 0), fill: "var(--color-mobile)" },
          ];
    const total = totals.reduce((sum, item) => sum + item.value, 0);
    const center = example === 22 ? totals[active].value : total;
    return (
      <div className="w-full">
        <ChartContainer config={config} className={chartClass} aria-label={"Monthly visitors by device"}>
          <PieChart accessibilityLayer>
            {defs}
            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <Pie
              activeShape={
                example === 22
                  ? ({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )
                  : undefined
              }
              data={totals}
              dataKey="value"
              nameKey="name"
              innerRadius={example === 21 ? 0 : 65}
              outerRadius={95}
              paddingAngle={3}
              onClick={(_, index) => {
                if (example === 22) setActive(index);
              }}
              isAnimationActive={false}
            >
              {example !== 21 && (
                <Label
                  content={({ viewBox }) =>
                    viewBox && "cx" in viewBox ? (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan className="fill-foreground text-2xl font-semibold">
                          {center.toLocaleString(locale)}
                        </tspan>
                        <tspan x={viewBox.cx} dy={23} className="fill-muted-foreground text-xs">
                          {example === 22 ? config[totals[active].name].label : example === 20 ? "Visitors" : "Total"}
                        </tspan>
                      </text>
                    ) : null
                  }
                />
              )}
            </Pie>
            {legend}
          </PieChart>
        </ChartContainer>
        {example === 20 && (
          <p className="text-muted-foreground text-center text-xs">{`Desktop share: ${Math.round((totals[0].value / total) * 100)}%`}</p>
        )}
        {example === 22 && (
          <div className="flex justify-center gap-2">
            {totals.map((item, index) => (
              <Button
                key={item.name}
                size="sm"
                variant={active === index ? "default" : "outline"}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                {config[item.name].label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
  if (example === 25) {
    const scores = [
      { name: "Performance", score: 92, fill: "var(--chart-1)" },
      { name: "Accessibility", score: 98, fill: "var(--chart-2)" },
      { name: "Best practices", score: 88, fill: "var(--chart-3)" },
    ];
    return (
      <ChartContainer config={config} className={chartClass} aria-label={"Lighthouse scores radial with labels"}>
        <RadialBarChart
          accessibilityLayer
          data={scores}
          innerRadius="25%"
          outerRadius="95%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            background
            dataKey="score"
            label={{ position: "insideStart", fill: "var(--foreground)", fontSize: 14 }}
            isAnimationActive={false}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        </RadialBarChart>
      </ChartContainer>
    );
  }
  return (
    <ChartContainer config={config} className={chartClass} aria-label={"Monthly visitors by device"}>
      <RadarChart accessibilityLayer data={data}>
        {defs}
        <PolarGrid />
        <PolarAngleAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 14 }} />
        {tooltip}
        {legend}
        <Radar
          dataKey="desktop"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          filter={example === 24 ? `url(#${glowId})` : undefined}
          fillOpacity={0.5}
          isAnimationActive={false}
        />
      </RadarChart>
    </ChartContainer>
  );
}
