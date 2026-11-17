"use client";
import { useState } from "react";

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartSeriesControls } from "@/components/examples/chart/chart-series-controls";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/roseui/chart";

function monthlyData(locale: string) {
  return [186, 305, 237, 173, 209, 214].map((desktop, index) => ({
    desktop,
    mobile: [80, 200, 120, 190, 130, 140][index],
    forecast: index >= 3 ? desktop + 60 : undefined,
    month: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)),
  }));
}
const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function ScatterVisitorChart() {
  const data = monthlyData("en-US").map((row) => ({ x: row.desktop, y: row.mobile, month: row.month }));
  const config: ChartConfig = { visitors: { label: "Monthly visitors", color: "var(--chart-1)" } };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Desktop and mobile visitors by month">
      <ScatterChart accessibilityLayer margin={{ top: 16, right: 16, bottom: 16, left: 8 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Desktop visitors" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis type="number" dataKey="y" name="Mobile visitors" tickLine={false} axisLine={false} width={40} />
        <ChartTooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent labelFormatter={(_, payload) => payload[0]?.payload?.month ?? ""} />}
        />
        <Scatter data={data} name="Monthly visitors" fill="var(--color-visitors)" />
      </ScatterChart>
    </ChartContainer>
  );
}

export function ScatterChartExamples() {
  return (
    <>
      <ComponentPreview title="Multiple Series" layout="panel" density="chart">
        <ScatterVisitorChart />
      </ComponentPreview>
      <ComponentPreview title="Controlled Series" layout="panel" density="chart">
        <InteractiveScatterChart />
      </ComponentPreview>
    </>
  );
}

function InteractiveScatterChart() {
  const data = [
    { month: "Jan", desktop: { x: 186, y: 34 }, mobile: { x: 80, y: 24 } },
    { month: "Feb", desktop: { x: 305, y: 42 }, mobile: { x: 200, y: 33 } },
    { month: "Mar", desktop: { x: 237, y: 38 }, mobile: { x: 120, y: 27 } },
    { month: "Apr", desktop: { x: 173, y: 29 }, mobile: { x: 190, y: 31 } },
    { month: "May", desktop: { x: 209, y: 32 }, mobile: { x: 130, y: 26 } },
    { month: "Jun", desktop: { x: 214, y: 36 }, mobile: { x: 140, y: 29 } },
  ];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  const series = [
    { key: "desktop", label: "Desktop", color: "var(--chart-1)" },
    { key: "mobile", label: "Mobile", color: "var(--chart-2)" },
  ] as const;
  const [visible, setVisible] = useState(new Set(series.map((item) => item.key)));
  const points: Record<"desktop" | "mobile", { x: number; y: number; month: string }[]> = {
    desktop: data.map((item) => ({ ...item.desktop, month: item.month })),
    mobile: data.map((item) => ({ ...item.mobile, month: item.month })),
  };
  const toggleSeries = (key: string) => {
    if (key !== "desktop" && key !== "mobile") return;
    setVisible((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="grid w-full gap-3">
      <ChartContainer config={config} className={chartClass} aria-label="Visitors and engagement by device">
        <ScatterChart accessibilityLayer margin={{ top: 16, right: 16, bottom: 16, left: 8 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Visitors" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis type="number" dataKey="y" name="Engagement" tickLine={false} axisLine={false} width={48} />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<ChartTooltipContent labelFormatter={(_, payload) => payload[0]?.payload?.month ?? ""} />}
          />
          {series.map((item) => (
            <Scatter
              key={item.key}
              data={points[item.key]}
              name={item.label}
              fill={item.color}
              hide={!visible.has(item.key)}
            />
          ))}
        </ScatterChart>
      </ChartContainer>
      <ChartSeriesControls label="Visible device series" series={series} selected={visible} onToggle={toggleSeries} />
    </div>
  );
}
