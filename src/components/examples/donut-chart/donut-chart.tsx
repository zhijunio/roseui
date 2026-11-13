"use client";

import { useState } from "react";

import { DonutChart, type DonutChartDatum } from "@/components/ui/donut-chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentPreview } from "@/examples/component-preview";

type Period = "week" | "month" | "year";

const dataByPeriod: Record<Period, [DonutChartDatum, ...DonutChartDatum[]]> = {
  week: [
    { key: "search", label: "Search", value: 4210 },
    { key: "direct", label: "Direct", value: 2380 },
    { key: "social", label: "Social", value: 1190 },
    { key: "email", label: "Email", value: 640 },
    { key: "ads", label: "Ads", value: 120 },
    { key: "referral", label: "Referral", value: 90 },
  ],
  month: [
    { key: "search", label: "Search", value: 18420 },
    { key: "direct", label: "Direct", value: 10280 },
    { key: "social", label: "Social", value: 6340 },
    { key: "email", label: "Email", value: 2980 },
    { key: "ads", label: "Ads", value: 920 },
    { key: "referral", label: "Referral", value: 610 },
  ],
  year: [
    { key: "search", label: "Search", value: 214800 },
    { key: "direct", label: "Direct", value: 126400 },
    { key: "social", label: "Social", value: 68400 },
    { key: "email", label: "Email", value: 32200 },
    { key: "ads", label: "Ads", value: 12400 },
    { key: "referral", label: "Referral", value: 8600 },
  ],
};

export function DonutChartExamples() {
  const [period, setPeriod] = useState<Period>("week");

  return (
    <ComponentPreview title="Traffic sources" layout="fullBleed" span={2} density="chart">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 py-2">
        <Tabs
          value={period}
          onValueChange={(value) => {
            if (value === "week" || value === "month" || value === "year") setPeriod(value);
          }}
          className="w-full items-center"
        >
          <TabsList aria-label="Traffic source period" className="mx-auto">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
        <DonutChart
          label={`Visits by source for ${period}`}
          unit="visits"
          totalLabel="Total visits"
          data={dataByPeriod[period]}
          className="w-full max-w-2xl justify-items-center"
        />
      </div>
    </ComponentPreview>
  );
}
