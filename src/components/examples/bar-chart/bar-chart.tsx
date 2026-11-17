"use client";
import { type ComponentProps, useState } from "react";

import { Bar, BarChart, CartesianGrid, Cell, Rectangle, ReferenceLine, XAxis, YAxis } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartExample, monthlyData } from "@/components/examples/chart/chart-example";
import { ChartSeriesControls } from "@/components/examples/chart/chart-series-controls";
import { BarChart as ConfigBarChart } from "@/components/roseui/bar-chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/roseui/chart";
import { SegmentedControl, SegmentedControlItem } from "@/components/roseui/segmented-control";

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

const axisProps = { tickLine: false, axisLine: false, tickMargin: 8 } as const;
const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

const lastYearVisitors = [160, 250, 220, 190, 175, 198];

const weekVisitors = [
  { label: "Mon", desktop: 32, mobile: 20 },
  { label: "Tue", desktop: 41, mobile: 22 },
  { label: "Wed", desktop: 28, mobile: 15 },
  { label: "Thu", desktop: 36, mobile: 18 },
  { label: "Fri", desktop: 44, mobile: 25 },
  { label: "Sat", desktop: 18, mobile: 30 },
  { label: "Sun", desktop: 12, mobile: 16 },
];

export function PeriodChart() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const data =
    period === "week"
      ? weekVisitors
      : monthlyData("en-US").map((row) => ({ label: row.month, desktop: row.desktop, mobile: row.mobile }));
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <div className="grid w-full gap-3">
      <SegmentedControl
        aria-label="Chart period"
        value={period}
        onValueChange={(value) => setPeriod(value === "month" ? "month" : "week")}
        className="w-fit"
      >
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
      <ChartContainer
        config={config}
        className={chartClass}
        aria-label={period === "week" ? "Visitors this week" : "Visitors by month"}
      >
        <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => (typeof value === "number" ? `${value.toLocaleString("en-US")} visitors` : value)}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} isAnimationActive={false} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export function StackedBarChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Stacked desktop and mobile visitors">
      <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="desktop"
          stackId="visitors"
          fill="var(--color-desktop)"
          radius={[0, 0, 4, 4]}
          isAnimationActive={false}
        />
        <Bar
          dataKey="mobile"
          stackId="visitors"
          fill="var(--color-mobile)"
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartContainer>
  );
}

export function DivergingBarChart() {
  const data = monthlyData("en-US").map((row, index) => ({
    month: row.month,
    change: row.desktop - lastYearVisitors[index],
  }));
  const config: ChartConfig = {
    change: { label: "Change", color: "var(--chart-1)" },
    increase: { label: "Increase", color: "var(--chart-1)" },
    decrease: { label: "Decrease", color: "var(--chart-3)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Change in desktop visitors from last year">
      <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="change" radius={4} isAnimationActive={false}>
          {data.map((row) => (
            <Cell key={row.month} fill={row.change >= 0 ? "var(--color-increase)" : "var(--color-decrease)"} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

function LollipopBar({ x, y, width, height, fill, ...props }: ComponentProps<typeof Rectangle>) {
  const left = Number(x),
    top = Number(y),
    barWidth = Number(width),
    barHeight = Number(height);
  const stem = Math.max(2, barWidth * 0.16);
  return (
    <g>
      <Rectangle
        {...props}
        x={left + (barWidth - stem) / 2}
        y={top}
        width={stem}
        height={barHeight}
        fill={fill}
        radius={0}
      />
      <circle cx={left + barWidth / 2} cy={top} r={5} fill={fill} />
    </g>
  );
}

export function DepthBarChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" } };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors as depth bars">
      <BarChart accessibilityLayer data={data} margin={{ top: 16, right: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" shape={<DepthBar />} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  );
}

export function LollipopChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" } };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors as lollipop bars">
      <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" shape={<LollipopBar />} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  );
}

export function BarChartExamples() {
  return (
    <>
      <ComponentPreview title="Controlled series and currency tooltip" layout="panel" density="chart">
        <InteractiveRevenueBarChart />
      </ComponentPreview>
      <ComponentPreview title="Single series" layout="panel" density="chart">
        <ChartExample variant="bar-single" />
      </ComponentPreview>
      <ComponentPreview title="Grouped series" layout="panel" density="chart">
        <ChartExample variant="bar-grouped" />
      </ComponentPreview>
      <ComponentPreview title="Stacked bars" layout="panel" density="chart">
        <StackedBarChart />
      </ComponentPreview>
      <ComponentPreview title="Positive and negative values" layout="panel" density="chart">
        <DivergingBarChart />
      </ComponentPreview>
      <ComponentPreview title="Horizontal bars" layout="panel" density="chart">
        <ChartExample variant="bar-horizontal" />
      </ComponentPreview>
      <ComponentPreview title="Change the displayed period" layout="panel" density="chart">
        <PeriodChart />
      </ComponentPreview>
      <ComponentPreview title="Depth bars" layout="panel" density="chart">
        <DepthBarChart />
      </ComponentPreview>
      <ComponentPreview title="Lollipop bars" layout="panel" density="chart">
        <LollipopChart />
      </ComponentPreview>
    </>
  );
}

function InteractiveRevenueBarChart() {
  const data = [
    { quarter: "Q1", online: 48200, retail: 36100 },
    { quarter: "Q2", online: 53700, retail: 39800 },
    { quarter: "Q3", online: 61400, retail: 42700 },
    { quarter: "Q4", online: 72800, retail: 50300 },
  ];
  const config: ChartConfig = {
    online: { label: "Online", color: "var(--chart-1)" },
    retail: { label: "Retail", color: "var(--chart-2)" },
  };
  const series = [
    { key: "online", label: "Online", color: "var(--chart-1)" },
    { key: "retail", label: "Retail", color: "var(--chart-2)" },
  ];
  const [visible, setVisible] = useState(new Set(series.map((item) => item.key)));
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const axisFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  });
  const toggleSeries = (key: string) => {
    setVisible((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="grid w-full gap-3">
      <ConfigBarChart
        config={config}
        data={data}
        dataKey="quarter"
        legend={false}
        valueFormatter={axisFormat.format}
        tooltip={
          <ChartTooltipContent
            formatter={(value, name) => (
              <span className="font-mono tabular-nums">
                {String(name)}: {currencyFormat.format(Number(value))}
              </span>
            )}
          />
        }
        className={chartClass}
        aria-label="Quarterly revenue by channel"
      >
        {series.map((item) => (
          <Bar
            key={item.key}
            dataKey={item.key}
            name={item.label}
            fill={item.color}
            radius={4}
            hide={!visible.has(item.key)}
          />
        ))}
      </ConfigBarChart>
      <ChartSeriesControls
        label="Visible revenue channels"
        series={series}
        selected={visible}
        onToggle={toggleSeries}
      />
    </div>
  );
}
