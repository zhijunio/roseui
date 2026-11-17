"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartExample } from "@/components/examples/chart/chart-example";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/roseui/chart";
import { RadialBarChart as ConfigRadialBarChart } from "@/components/roseui/radial-bar-chart";

const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function RadialGaugeChart() {
  const score = [{ name: "Completion", score: 74, fill: "var(--chart-1)" }];
  const config: ChartConfig = { score: { label: "Completion", color: "var(--chart-1)" } };
  return (
    <div className="relative w-full">
      <ChartContainer config={config} className={chartClass} aria-label="Project completion is 74 percent">
        <RadialBarChart
          accessibilityLayer
          data={score}
          startAngle={180}
          endAngle={0}
          innerRadius="68%"
          outerRadius="92%"
          cx="50%"
          cy="78%"
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="score" background cornerRadius={8} isAnimationActive={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        </RadialBarChart>
      </ChartContainer>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[78%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold tabular-nums"
      >
        74%
      </span>
    </div>
  );
}

export function RadialBarChartExamples() {
  return (
    <>
      <ComponentPreview title="Categories from configuration" layout="panel" density="chart">
        <ConfigRadialBarChartExample />
      </ComponentPreview>
      <ComponentPreview title="Compare current and target" layout="panel" density="chart">
        <MultiSeriesRadialBarChartExample />
      </ComponentPreview>
      <ComponentPreview title="Labeled radial scores" layout="panel" density="chart">
        <ChartExample variant="radial-scores" />
      </ComponentPreview>
      <ComponentPreview title="Semicircle completion gauge" layout="panel" density="chart">
        <RadialGaugeChart />
      </ComponentPreview>
    </>
  );
}

function MultiSeriesRadialBarChartExample() {
  const data = [
    { device: "Desktop", current: 78, target: 90 },
    { device: "Mobile", current: 64, target: 80 },
    { device: "Tablet", current: 52, target: 70 },
  ];
  const config: ChartConfig = {
    current: { label: "Current", color: "var(--chart-1)" },
    target: { label: "Target", color: "var(--chart-2)" },
  };

  return (
    <ConfigRadialBarChart
      config={config}
      data={data}
      dataKey="device"
      nameKey="device"
      series={[{ dataKey: "current" }, { dataKey: "target" }]}
      chartProps={{ innerRadius: "24%", outerRadius: "92%", startAngle: 90, endAngle: -270 }}
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Current and target performance by device"
    />
  );
}

function ConfigRadialBarChartExample() {
  const data = [
    { device: "Desktop", visitors: 186 },
    { device: "Mobile", visitors: 142 },
    { device: "Tablet", visitors: 73 },
  ];
  const config: ChartConfig = {
    Desktop: { label: "Desktop", color: "var(--chart-1)" },
    Mobile: { label: "Mobile", color: "var(--chart-2)" },
    Tablet: { label: "Tablet", color: "var(--chart-3)" },
  };

  return (
    <ConfigRadialBarChart
      config={config}
      data={data}
      dataKey="visitors"
      nameKey="device"
      series={[{ dataKey: "visitors", name: "Visitors" }]}
      chartProps={{ innerRadius: 24, outerRadius: 116, startAngle: 90, endAngle: -270 }}
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Visitors by device"
    />
  );
}
