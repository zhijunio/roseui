"use client";
import { useState } from "react";

import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartExample, monthlyData } from "@/components/examples/chart/chart-example";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/roseui/chart";
import { ComposedChart as ConfigComposedChart } from "@/components/roseui/composed-chart";

const axisProps = { tickLine: false, axisLine: false, tickMargin: 8 } as const;
const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function ComboChart() {
  const data = monthlyData("en-US").map((row) => ({
    month: row.month,
    desktop: row.desktop,
    share: Math.round((row.mobile / (row.desktop + row.mobile)) * 100),
  }));
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    share: { label: "Mobile share", color: "var(--chart-2)" },
  };
  return (
    <ConfigComposedChart
      config={config}
      data={data}
      dataKey="month"
      className={chartClass}
      aria-label="Desktop visitors and mobile share"
      cartesianGridProps={{ vertical: false }}
      xAxisProps={axisProps}
      hideYAxis
      chartProps={{ accessibilityLayer: true, margin: { top: 12, right: 12 } }}
      series={[
        { type: "bar", dataKey: "desktop", props: { yAxisId: "count", radius: 4, isAnimationActive: false } },
        { type: "line", dataKey: "share", props: { yAxisId: "share", isAnimationActive: false } },
      ]}
    >
      <YAxis yAxisId="count" tickLine={false} axisLine={false} width={32} />
      <YAxis
        yAxisId="share"
        orientation="right"
        tickLine={false}
        axisLine={false}
        width={40}
        tickFormatter={(value) => `${value}%`}
      />
    </ConfigComposedChart>
  );
}

const lastYearVisitors = [160, 250, 220, 190, 175, 198];

export function YearComparisonChart() {
  const rows = monthlyData("en-US").map((row, index) => ({
    month: row.month,
    current: row.desktop,
    previous: lastYearVisitors[index],
  }));
  const [month, setMonth] = useState<string | null>(null);
  const point = rows.find((row) => row.month === month);
  const currentTotal = rows.reduce((sum, row) => sum + row.current, 0);
  const previousTotal = rows.reduce((sum, row) => sum + row.previous, 0);
  const heading = point
    ? `${point.month}: ${point.current.toLocaleString("en-US")} this year, ${point.previous.toLocaleString("en-US")} last year`
    : `${currentTotal.toLocaleString("en-US")} this year, ${previousTotal.toLocaleString("en-US")} last year`;
  const config: ChartConfig = {
    current: { label: "This year", color: "var(--chart-1)" },
    previous: { label: "Last year", color: "var(--chart-2)" },
  };
  return (
    <div className="grid w-full gap-3">
      <p className="text-sm font-medium" data-slot="year-heading">
        {heading}
      </p>
      <ChartContainer config={config} className={chartClass} aria-label="Visitors this year and last year">
        <ComposedChart
          accessibilityLayer
          data={rows}
          onMouseMove={(state) => {
            const label = state?.activeLabel;
            setMonth(typeof label === "string" || typeof label === "number" ? String(label) : null);
          }}
          onMouseLeave={() => setMonth(null)}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="current"
            type="monotone"
            fill="var(--color-current)"
            fillOpacity={0.2}
            stroke="var(--color-current)"
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Line
            dataKey="previous"
            type="monotone"
            stroke="var(--color-previous)"
            strokeDasharray="5 4"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}

export function AreaLineChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer
      config={config}
      className={chartClass}
      aria-label="Desktop visitors as an area with mobile visitors as a line"
    >
      <ComposedChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
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
          fillOpacity={0.2}
          isAnimationActive={false}
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

export function ComposedChartExamples() {
  return (
    <>
      <ComponentPreview title="Actual and forecast" layout="panel" density="chart">
        <ChartExample variant="composed-forecast" />
      </ComponentPreview>
      <ComponentPreview title="Bar with a second scale" layout="panel" density="chart">
        <ComboChart />
      </ComponentPreview>
      <ComponentPreview title="Area with a line" layout="panel" density="chart">
        <AreaLineChart />
      </ComponentPreview>
      <ComponentPreview title="Year-over-year comparison" layout="panel" density="chart">
        <YearComparisonChart />
      </ComponentPreview>
    </>
  );
}
