"use client";

import { useState } from "react";

import { Funnel, FunnelChart, LabelList } from "recharts";

import { ComponentPreview } from "@/components/docs/component-preview";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/roseui/chart";
import { SegmentedControl, SegmentedControlItem } from "@/components/roseui/segmented-control";

type FunnelStage = {
  stage: string;
  value: number;
  fill: string;
};

type FunnelData = [FunnelStage, ...FunnelStage[]];
type FunnelPeriod = "current" | "previous";

const funnelData = {
  current: [
    { stage: "Visits", value: 1200, fill: "var(--chart-1)" },
    { stage: "Product views", value: 840, fill: "var(--chart-2)" },
    { stage: "Added to cart", value: 420, fill: "var(--chart-3)" },
    { stage: "Checkout", value: 260, fill: "var(--chart-4)" },
    { stage: "Orders", value: 180, fill: "var(--chart-5)" },
  ],
  previous: [
    { stage: "Visits", value: 980, fill: "var(--chart-1)" },
    { stage: "Product views", value: 640, fill: "var(--chart-2)" },
    { stage: "Added to cart", value: 298, fill: "var(--chart-3)" },
    { stage: "Checkout", value: 186, fill: "var(--chart-4)" },
    { stage: "Orders", value: 112, fill: "var(--chart-5)" },
  ],
} satisfies Record<FunnelPeriod, FunnelData>;

const funnelConfig: ChartConfig = {
  Visits: { label: "Visits", color: "var(--chart-1)" },
  "Product views": { label: "Product views", color: "var(--chart-2)" },
  "Added to cart": { label: "Added to cart", color: "var(--chart-3)" },
  Checkout: { label: "Checkout", color: "var(--chart-4)" },
  Orders: { label: "Orders", color: "var(--chart-5)" },
};

const chartClass = "!aspect-auto h-[260px] w-full sm:h-[360px]";
const numberFormat = new Intl.NumberFormat("en-US");
const percentFormat = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 0 });

function conversionRate(data: FunnelData) {
  const first = data[0].value;
  const last = data[data.length - 1].value;
  return first === 0 ? 0 : last / first;
}

function FunnelVisualization({ data, ariaLabel }: { data: FunnelData; ariaLabel: string }) {
  const rate = conversionRate(data);
  const largestDrop = data.slice(1).reduce(
    (largest, stage, index) => {
      const previous = data[index];
      const drop = previous.value - stage.value;
      return drop > largest.value ? { stage: previous.stage, value: drop } : largest;
    },
    { stage: data[0].stage, value: 0 },
  );

  return (
    <div className="grid w-full gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="border-border bg-muted/30 rounded-lg border p-3">
          <p className="text-muted-foreground text-xs">Visit-to-order conversion</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{percentFormat.format(rate)}</p>
        </div>
        <div className="border-border bg-muted/30 rounded-lg border p-3">
          <p className="text-muted-foreground text-xs">Largest drop-off</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{numberFormat.format(largestDrop.value)}</p>
          <p className="text-muted-foreground text-xs">after {largestDrop.stage.toLowerCase()}</p>
        </div>
      </div>
      <ChartContainer config={funnelConfig} className={chartClass} aria-label={ariaLabel}>
        <FunnelChart accessibilityLayer>
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey="stage"
                hideLabel
                formatter={(value, name) => {
                  const index = data.findIndex((item) => item.stage === String(name));
                  const previous = index > 0 ? data[index - 1].value : Number(value);
                  const stageRate = previous === 0 ? 0 : Number(value) / previous;
                  const stageLabel =
                    index > 0 ? `${percentFormat.format(stageRate)} of previous stage` : "starting stage";
                  return (
                    <span className="font-mono tabular-nums">
                      {numberFormat.format(Number(value))} · {stageLabel}
                    </span>
                  );
                }}
              />
            }
          />
          <Funnel data={data} dataKey="value" nameKey="stage" isAnimationActive={false}>
            <LabelList position="right" dataKey="stage" fill="var(--foreground)" stroke="none" />
          </Funnel>
        </FunnelChart>
      </ChartContainer>
    </div>
  );
}

function PeriodComparisonFunnel() {
  const [period, setPeriod] = useState<FunnelPeriod>("current");
  const data = funnelData[period];
  const currentRate = conversionRate(funnelData.current);
  const previousRate = conversionRate(funnelData.previous);
  const differencePoints = Math.round((currentRate - previousRate) * 100);

  return (
    <div className="grid w-full gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          aria-label="Funnel reporting period"
          value={period}
          onValueChange={(value) => {
            if (value === "current" || value === "previous") setPeriod(value);
          }}
        >
          <SegmentedControlItem value="current">This month</SegmentedControlItem>
          <SegmentedControlItem value="previous">Previous month</SegmentedControlItem>
        </SegmentedControl>
        <p className="text-muted-foreground text-sm">
          {differencePoints >= 0 ? "Up" : "Down"} {Math.abs(differencePoints)} pp vs previous month
        </p>
      </div>
      <FunnelVisualization
        data={data}
        ariaLabel={`${period === "current" ? "This month" : "Previous month"} conversion funnel`}
      />
    </div>
  );
}

export function VisitorFunnelChart() {
  return <FunnelVisualization data={funnelData.current} ariaLabel="Visitors through purchase stages" />;
}

export function FunnelChartExamples() {
  return (
    <>
      <ComponentPreview title="Stage conversion and drop-off" layout="panel" density="chart">
        <VisitorFunnelChart />
      </ComponentPreview>
      <ComponentPreview title="Compare conversion by period" layout="panel" density="chart">
        <PeriodComparisonFunnel />
      </ComponentPreview>
    </>
  );
}
