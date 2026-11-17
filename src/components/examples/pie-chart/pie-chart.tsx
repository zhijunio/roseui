"use client";
import { useState } from "react";

import { Pie, PieChart } from "recharts";

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
import { PieChart as ConfigPieChart } from "@/components/roseui/pie-chart";
import { Button } from "@/components/ui/button";

const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function VisitorPieChart() {
  const data = monthlyData("en-US");
  const slices = [
    { name: "desktop", value: data.reduce((sum, row) => sum + row.desktop, 0), fill: "var(--color-desktop)" },
    { name: "mobile", value: data.reduce((sum, row) => sum + row.mobile, 0), fill: "var(--color-mobile)" },
  ];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Desktop and mobile visitor pie">
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
        <Pie data={slices} dataKey="value" nameKey="name" innerRadius={0} outerRadius={95} isAnimationActive={false} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
}

export function PieChartExamples() {
  return (
    <>
      <ComponentPreview title="Series from configuration" layout="panel" density="chart">
        <ConfigPieChartExample />
      </ComponentPreview>
      <ComponentPreview title="Custom donut center content" layout="panel" density="chart">
        <ConfigPieChartCustomLabelExample />
      </ComponentPreview>
      <ComponentPreview title="Controlled slice selection" layout="panel" density="chart">
        <ConfigPieChartInteractiveExample />
      </ComponentPreview>
      <ComponentPreview title="Pie with legend" layout="panel" density="chart">
        <VisitorPieChart />
      </ComponentPreview>
      <ComponentPreview title="Categorical Series" layout="panel" density="chart">
        <ChartExample variant="pie-priority" />
      </ComponentPreview>
    </>
  );
}

function ConfigPieChartExample() {
  const data = [
    { name: "desktop", value: 68 },
    { name: "mobile", value: 24 },
    { name: "tablet", value: 8 },
  ];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    tablet: { label: "Tablet", color: "var(--chart-3)" },
  };

  return (
    <ConfigPieChart
      config={config}
      data={data}
      dataKey="value"
      nameKey="name"
      variant="donut"
      showLabel
      pieProps={{ innerRadius: 54, outerRadius: 94, paddingAngle: 3 }}
      legendIndicator="dot"
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Visitors by device"
    />
  );
}

function ConfigPieChartCustomLabelExample() {
  const data = [
    { name: "desktop", value: 68 },
    { name: "mobile", value: 24 },
    { name: "tablet", value: 8 },
  ];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    tablet: { label: "Tablet", color: "var(--chart-3)" },
  };

  return (
    <ConfigPieChart
      config={config}
      data={data}
      dataKey="value"
      nameKey="name"
      variant="donut"
      pieProps={{ innerRadius: 54, outerRadius: 94, paddingAngle: 3 }}
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Visitors by device"
    >
      <text textAnchor="middle" dominantBaseline="middle">
        <tspan x={0} y={-8} className="fill-muted-foreground text-xs">
          Visitors
        </tspan>
        <tspan x={0} dy={24} className="fill-foreground text-lg font-semibold">
          100
        </tspan>
      </text>
    </ConfigPieChart>
  );
}

function ConfigPieChartInteractiveExample() {
  const data = [
    { name: "uv", value: 44 },
    { name: "pv", value: 32 },
    { name: "br", value: 24 },
  ];
  const config: ChartConfig = {
    uv: { label: "Unique visitors", color: "var(--chart-1)" },
    pv: { label: "Page views", color: "var(--chart-2)" },
    br: { label: "Bounce rate", color: "var(--chart-3)" },
  };
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const selectedItem = activeIndex === null ? null : data[activeIndex];

  return (
    <div className="grid w-full gap-3">
      <ConfigPieChart
        config={config}
        data={data}
        dataKey="value"
        nameKey="name"
        variant="donut"
        showLabel
        label={selectedItem ? String(selectedItem.value) : "All"}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        legend={false}
        pieProps={{ innerRadius: 54, outerRadius: 94, paddingAngle: 3 }}
        className="!aspect-auto h-[260px] w-full sm:h-[360px]"
        aria-label="Engagement metrics"
      />
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <Button
            key={item.name}
            size="sm"
            variant={activeIndex === index ? "default" : "outline"}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {config[item.name].label}
          </Button>
        ))}
      </div>
    </div>
  );
}
