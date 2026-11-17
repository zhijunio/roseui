"use client";
import { useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartExample, monthlyData } from "@/components/examples/chart/chart-example";
import { ChartSeriesControls } from "@/components/examples/chart/chart-series-controls";
import { AreaChart as ConfigAreaChart } from "@/components/roseui/area-chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/roseui/chart";

const axisProps = { tickLine: false, axisLine: false, tickMargin: 8 } as const;
const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function PercentStackedAreaChart() {
  const data = monthlyData("en-US").map((row) => {
    const desktop = Math.round((row.desktop / (row.desktop + row.mobile)) * 100);
    return { month: row.month, desktop, mobile: 100 - desktop };
  });
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Desktop and mobile share by month">
      <AreaChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis tickLine={false} axisLine={false} width={40} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="desktop"
          type="monotone"
          stackId="share"
          stroke="var(--color-desktop)"
          fill="var(--color-desktop)"
          fillOpacity={0.35}
          isAnimationActive={false}
        />
        <Area
          dataKey="mobile"
          type="monotone"
          stackId="share"
          stroke="var(--color-mobile)"
          fill="var(--color-mobile)"
          fillOpacity={0.35}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function MultiAreaChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer
      config={config}
      className={chartClass}
      aria-label="Desktop and mobile visitors as separate area series"
    >
      <AreaChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          fill="var(--color-desktop)"
          fillOpacity={0.18}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Area
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          fill="var(--color-mobile)"
          fillOpacity={0.18}
          strokeWidth={2}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function AreaChartExamples() {
  return (
    <>
      <ComponentPreview title="Controlled series and percentage tooltip" layout="panel" density="chart">
        <InteractiveAreaChart />
      </ComponentPreview>
      <ComponentPreview title="Gradient fill" layout="panel" density="chart">
        <ChartExample variant="area-gradient" />
      </ComponentPreview>
      <ComponentPreview title="Stacked series" layout="panel" density="chart">
        <ChartExample variant="area-stacked" />
      </ComponentPreview>
      <ComponentPreview title="Multiple area series" layout="panel" density="chart">
        <MultiAreaChart />
      </ComponentPreview>
      <ComponentPreview title="100% stacked share" layout="panel" density="chart">
        <PercentStackedAreaChart />
      </ComponentPreview>
      <ComponentPreview title="Step area" layout="panel" density="chart">
        <ChartExample variant="area-step" />
      </ComponentPreview>
    </>
  );
}

function InteractiveAreaChart() {
  const data = [
    { month: "Jan", organic: 0.22, paid: 0.14 },
    { month: "Feb", organic: 0.28, paid: 0.18 },
    { month: "Mar", organic: 0.25, paid: 0.21 },
    { month: "Apr", organic: 0.34, paid: 0.19 },
    { month: "May", organic: 0.31, paid: 0.24 },
    { month: "Jun", organic: 0.38, paid: 0.27 },
  ];
  const config: ChartConfig = {
    organic: { label: "Organic", color: "var(--chart-1)" },
    paid: { label: "Paid", color: "var(--chart-2)" },
  };
  const series = [
    { key: "organic", label: "Organic", color: "var(--chart-1)" },
    { key: "paid", label: "Paid", color: "var(--chart-2)" },
  ];
  const [visible, setVisible] = useState(new Set(series.map((item) => item.key)));
  const formatPercent = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 0 }).format(value);
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
      <ConfigAreaChart
        config={config}
        data={data}
        dataKey="month"
        legend={false}
        valueFormatter={formatPercent}
        tooltip={
          <ChartTooltipContent
            formatter={(value, name) => (
              <span className="font-mono tabular-nums">
                {String(name)}: {formatPercent(Number(value))}
              </span>
            )}
          />
        }
        className={chartClass}
        aria-label="Monthly conversion rate by channel"
      >
        {series.map((item) => (
          <Area
            key={item.key}
            dataKey={item.key}
            name={item.label}
            type="monotone"
            stroke={item.color}
            fill={item.color}
            fillOpacity={0.16}
            strokeWidth={2}
            hide={!visible.has(item.key)}
          />
        ))}
      </ConfigAreaChart>
      <ChartSeriesControls
        label="Visible conversion channels"
        series={series}
        selected={visible}
        onToggle={toggleSeries}
      />
    </div>
  );
}
