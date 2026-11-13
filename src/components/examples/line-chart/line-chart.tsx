"use client";
import { useState } from "react";

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartSeriesControls } from "@/components/examples/chart/chart-series-controls";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart as ConfigLineChart } from "@/components/ui/line-chart";

function monthlyData(locale: string) {
  return [186, 305, 237, 173, 209, 214].map((desktop, index) => ({
    desktop,
    mobile: [80, 200, 120, 190, 130, 140][index],
    forecast: index >= 3 ? desktop + 60 : undefined,
    month: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)),
  }));
}

function ConfigLineChartExample() {
  const data = monthlyData("en-US");
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };

  return (
    <ConfigLineChart
      config={config}
      data={data}
      dataKey="month"
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Monthly visitors by device"
    />
  );
}

const axisProps = { tickLine: false, axisLine: false, tickMargin: 8 } as const;
const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function VisitorLineChart({ curve }: { curve: "monotone" | "step" }) {
  const data = monthlyData("en-US");
  const config: ChartConfig = { desktop: { label: "Desktop", color: "var(--chart-1)" } };
  return (
    <ChartContainer
      config={config}
      className={chartClass}
      aria-label={curve === "monotone" ? "Smooth line chart" : "Step line chart"}
    >
      <LineChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Line
          dataKey="desktop"
          type={curve}
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

const monthlyGoal = 220;

export function GoalLineChart() {
  const data = monthlyData("en-US");
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    goal: { label: "Goal", color: "var(--chart-3)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Desktop visitors against a monthly goal">
      <LineChart accessibilityLayer data={data} margin={{ top: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ReferenceLine
          y={monthlyGoal}
          stroke="var(--color-goal)"
          strokeDasharray="4 4"
          label={{ value: "Goal", position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function VisitorSlopeChart() {
  const data = monthlyData("en-US");
  const points = [data[0], data[data.length - 1]].map((row) => ({
    month: row.month,
    desktop: row.desktop,
    mobile: row.mobile,
  }));
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Visitor change from the first month to the last">
      <LineChart accessibilityLayer data={points} margin={{ top: 12, right: 24, left: 12 }}>
        <XAxis dataKey="month" {...axisProps} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="desktop"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{ r: 4 }}
          isAnimationActive={false}
        />
        <Line dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={{ r: 4 }} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  );
}

function MissingDataLineChart() {
  const data = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: null, mobile: 120 },
    { month: "Apr", desktop: 173, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
  ];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="grid min-w-0 gap-2">
        <p className="text-sm font-medium">Show the gap</p>
        <ConfigLineChart
          config={config}
          data={data}
          dataKey="month"
          connectNulls={false}
          className="!aspect-auto h-[220px] w-full"
          aria-label="Monthly visitors with missing data shown as a gap"
        />
      </div>
      <div className="grid min-w-0 gap-2">
        <p className="text-sm font-medium">Connect across the gap</p>
        <ConfigLineChart
          config={config}
          data={data}
          dataKey="month"
          connectNulls
          className="!aspect-auto h-[220px] w-full"
          aria-label="Monthly visitors with missing data connected across the gap"
        />
      </div>
    </div>
  );
}

export function VisitorSparkline() {
  const data = monthlyData("en-US");
  const latest = data[data.length - 1];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <div className="grid w-full gap-2">
      <p className="text-sm text-muted-foreground">{`${latest.month}: ${latest.desktop.toLocaleString("en-US")} desktop, ${latest.mobile.toLocaleString("en-US")} mobile`}</p>
      <ChartContainer
        config={config}
        initialDimension={{ width: 320, height: 64 }}
        className="h-16 w-full aspect-auto"
        aria-label="Visitor sparkline"
      >
        <LineChart accessibilityLayer data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
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
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export function LineChartExamples() {
  return (
    <>
      <ComponentPreview title="Controlled series and percentage tooltip" layout="panel" density="chart">
        <InteractiveRetentionLineChart />
      </ComponentPreview>
      <ComponentPreview title="Series from configuration" layout="panel" density="chart">
        <ConfigLineChartExample />
      </ComponentPreview>
      <ComponentPreview title="Smooth line" layout="panel" density="chart">
        <VisitorLineChart curve="monotone" />
      </ComponentPreview>
      <ComponentPreview title="Step line" layout="panel" density="chart">
        <VisitorLineChart curve="step" />
      </ComponentPreview>
      <ComponentPreview title="Goal reference" layout="panel" density="chart">
        <GoalLineChart />
      </ComponentPreview>
      <ComponentPreview title="Missing data and connectNulls" layout="panel" density="chart">
        <MissingDataLineChart />
      </ComponentPreview>
      <ComponentPreview title="Compact sparkline" layout="panel" density="chart">
        <VisitorSparkline />
      </ComponentPreview>
      <ComponentPreview title="First and last period" layout="panel" density="chart">
        <VisitorSlopeChart />
      </ComponentPreview>
    </>
  );
}

function InteractiveRetentionLineChart() {
  const data = [
    { month: "Jan", newCustomers: 0.74, returningCustomers: 0.62 },
    { month: "Feb", newCustomers: 0.77, returningCustomers: 0.64 },
    { month: "Mar", newCustomers: 0.75, returningCustomers: 0.68 },
    { month: "Apr", newCustomers: 0.81, returningCustomers: 0.7 },
    { month: "May", newCustomers: 0.84, returningCustomers: 0.73 },
    { month: "Jun", newCustomers: 0.86, returningCustomers: 0.76 },
  ];
  const config: ChartConfig = {
    newCustomers: { label: "New customers", color: "var(--chart-1)" },
    returningCustomers: { label: "Returning customers", color: "var(--chart-2)" },
  };
  const series = [
    { key: "newCustomers", label: "New customers", color: "var(--chart-1)" },
    { key: "returningCustomers", label: "Returning customers", color: "var(--chart-2)" },
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
      <ConfigLineChart
        config={config}
        data={data}
        dataKey="month"
        legend={false}
        valueFormatter={formatPercent}
        tooltip={
          <ChartTooltipContent
            indicator="line"
            formatter={(value, name) => (
              <span className="font-mono tabular-nums">
                {String(name)}: {formatPercent(Number(value))}
              </span>
            )}
          />
        }
        className={chartClass}
        aria-label="Monthly customer retention by cohort"
      >
        {series.map((item) => (
          <Line
            key={item.key}
            dataKey={item.key}
            name={item.label}
            type="monotone"
            stroke={item.color}
            strokeWidth={2}
            dot={{ r: 3, fill: item.color }}
            hide={!visible.has(item.key)}
          />
        ))}
      </ConfigLineChart>
      <ChartSeriesControls
        label="Visible customer cohorts"
        series={series}
        selected={visible}
        onToggle={toggleSeries}
      />
    </div>
  );
}
