"use client";

import * as React from "react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { RangeHistogramSlider } from "@/components/ui/range-histogram-slider";

const orderTotals = [
  18, 23, 27, 29, 31, 34, 36, 38, 41, 43, 45, 48, 49, 52, 54, 57, 60, 62, 65, 68, 72, 75, 78, 82, 85, 90, 96, 102, 110,
  118, 125, 132, 140, 155, 168, 180, 195, 210, 235, 260, 290, 325, 360, 410, 470, 540, 620, 710, 825, 960,
];

export function RangeHistogramSliderExamples() {
  const [amount, setAmount] = React.useState<[number, number]>([40, 260]);
  const [delivery, setDelivery] = React.useState<[number, number]>([2, 8]);
  return (
    <>
      <ComponentPreview title="Order totals" layout="fullStack">
        <RangeHistogramSlider
          label="Order amount"
          data={orderTotals}
          min={0}
          max={1000}
          step={10}
          bins={24}
          value={amount}
          onValueChange={setAmount}
          onValueCommit={setAmount}
          formatValue={(value) => `$${value}`}
        />
        <p className="text-xs text-muted-foreground">Adjust the amount range to narrow the order list.</p>
      </ComponentPreview>
      <ComponentPreview title="Fulfillment time" layout="fullStack">
        <RangeHistogramSlider
          label="Days to fulfill"
          data={[1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 6, 7, 7, 8, 9, 10, 12, 14, 16, 20]}
          min={0}
          max={24}
          step={1}
          bins={12}
          value={delivery}
          onValueChange={setDelivery}
          formatValue={(value) => `${value} days`}
        />
      </ComponentPreview>
    </>
  );
}
