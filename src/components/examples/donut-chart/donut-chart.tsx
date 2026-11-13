"use client";
import { useState } from "react";

import { Pie, PieChart } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart as ConfigPieChart } from "@/components/ui/pie-chart";

const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";

export function NestedDonutChart() {
  const outer = [
    { name: "desktop", value: 52, fill: "var(--color-desktop)" },
    { name: "mobile", value: 31, fill: "var(--color-mobile)" },
    { name: "tablet", value: 17, fill: "var(--color-tablet)" },
  ];
  const inner = [
    { name: "direct", value: 34, fill: "var(--chart-4)" },
    { name: "search", value: 29, fill: "var(--chart-5)" },
    { name: "referral", value: 22, fill: "var(--chart-3)" },
    { name: "social", value: 15, fill: "var(--chart-2)" },
  ];
  const config: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    tablet: { label: "Tablet", color: "var(--chart-3)" },
    direct: { label: "Direct", color: "var(--chart-4)" },
    search: { label: "Search", color: "var(--chart-5)" },
    referral: { label: "Referral", color: "var(--chart-3)" },
    social: { label: "Social", color: "var(--chart-2)" },
  };
  return (
    <ChartContainer config={config} className={chartClass} aria-label="Visitors by device and acquisition channel">
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
        <Pie
          data={outer}
          dataKey="value"
          nameKey="name"
          innerRadius={62}
          outerRadius={96}
          paddingAngle={2}
          isAnimationActive={false}
        />
        <Pie
          data={inner}
          dataKey="value"
          nameKey="name"
          innerRadius={36}
          outerRadius={56}
          paddingAngle={2}
          isAnimationActive={false}
        />
      </PieChart>
    </ChartContainer>
  );
}

export function DonutChartExamples() {
  return (
    <>
      <ComponentPreview title="Donut with total" layout="panel" density="chart">
        <DonutTotalExample />
      </ComponentPreview>
      <ComponentPreview title="Select a segment" layout="panel" density="chart">
        <InteractiveDonutExample />
      </ComponentPreview>
      <ComponentPreview title="Nested rings" layout="panel" density="chart">
        <NestedDonutChart />
      </ComponentPreview>
    </>
  );
}

function DonutTotalExample() {
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
      className="!aspect-auto h-[260px] w-full sm:h-[360px]"
      aria-label="Visitors by device"
    />
  );
}

function InteractiveDonutExample() {
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
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        legend={false}
        pieProps={{ innerRadius: 54, outerRadius: 94, paddingAngle: 3 }}
        className="!aspect-auto h-[260px] w-full sm:h-[360px]"
        aria-label="Visitors by device"
      >
        <text textAnchor="middle" dominantBaseline="middle">
          <tspan x={0} y={-8} className="fill-muted-foreground text-xs">
            {selectedItem ? config[selectedItem.name].label : "All visitors"}
          </tspan>
          <tspan x={0} y={16} className="fill-foreground text-lg font-semibold">
            {selectedItem ? selectedItem.value : data.reduce((total, item) => total + item.value, 0)}
          </tspan>
        </text>
      </ConfigPieChart>
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <Button
            key={item.name}
            size="sm"
            variant={activeIndex === index ? "default" : "outline"}
            aria-pressed={activeIndex === index}
            onPress={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {config[item.name].label}
          </Button>
        ))}
      </div>
    </div>
  );
}
