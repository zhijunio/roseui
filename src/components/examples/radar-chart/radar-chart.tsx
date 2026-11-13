"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartExample, monthlyData } from "@/components/examples/chart/chart-example";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RadarChart as ConfigRadarChart } from "@/components/ui/radar-chart";

const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

const lastYearVisitors = [160, 250, 220, 190, 175, 198];

export function MultiSeriesRadarChart() {
  const data = monthlyData("en-US").map((row, index) => ({
    month: row.month,
    current: row.desktop,
    previous: lastYearVisitors[index],
  }));
  const config: ChartConfig = {
    current: { label: "Current year", color: "var(--chart-1)" },
    previous: { label: "Previous year", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer
      config={config}
      className={chartClass}
      aria-label="Compare current and previous year visitor data across months"
    >
      <RadarChart accessibilityLayer data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 14 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Radar
          dataKey="current"
          stroke="var(--color-current)"
          fill="var(--color-current)"
          fillOpacity={0.22}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Radar
          dataKey="previous"
          stroke="var(--color-previous)"
          fill="var(--color-previous)"
          fillOpacity={0.12}
          strokeWidth={2}
          isAnimationActive={false}
        />
      </RadarChart>
    </ChartContainer>
  );
}

export function RadarChartExamples() {
  return (
    <>
      <ComponentPreview title="Series from configuration" layout="panel" density="chart">
        <ConfigRadarChartExample />
      </ComponentPreview>
      <ComponentPreview title="Circular grid and radial scale" layout="panel" density="chart">
        <CircularGridRadarChartExample />
      </ComponentPreview>
      <ComponentPreview title="Single metric" layout="panel" density="chart">
        <ChartExample variant="radar-single" />
      </ComponentPreview>
      <ComponentPreview title="Compare two years" layout="panel" density="chart">
        <MultiSeriesRadarChart />
      </ComponentPreview>
    </>
  );
}

function CircularGridRadarChartExample() {
  const data = [
    { metric: "Speed", current: 82 },
    { metric: "Reliability", current: 91 },
    { metric: "Comfort", current: 74 },
    { metric: "Safety", current: 88 },
    { metric: "Efficiency", current: 79 },
  ];
  const config: ChartConfig = {
    current: { label: "Current quarter", color: "var(--chart-1)" },
  };

  return (
    <ConfigRadarChart
      config={config}
      data={data}
      dataKey="metric"
      series={[{ dataKey: "current" }]}
      polarGridProps={{ gridType: "circle", radialLines: false }}
      radiusAxisProps={{ angle: 90, domain: [0, 100], tickCount: 5 }}
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Current metric scores with a circular scale"
    />
  );
}

function ConfigRadarChartExample() {
  const data = [
    { metric: "Speed", current: 82, previous: 70 },
    { metric: "Reliability", current: 91, previous: 84 },
    { metric: "Comfort", current: 74, previous: 80 },
    { metric: "Safety", current: 88, previous: 76 },
    { metric: "Efficiency", current: 79, previous: 68 },
  ];
  const config: ChartConfig = {
    current: { label: "Current", color: "var(--chart-1)" },
    previous: { label: "Previous", color: "var(--chart-2)" },
  };

  return (
    <ConfigRadarChart
      config={config}
      data={data}
      dataKey="metric"
      series={[{ dataKey: "current" }, { dataKey: "previous" }]}
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Current and previous metric scores"
    />
  );
}
