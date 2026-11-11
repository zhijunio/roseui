import { ComponentPreview } from "@/components/examples/component-preview";
import { type WaffleCategory, WaffleChart } from "@/components/ui/waffle-chart";

const mix = [
  { key: "wind-solar", label: "Wind and solar", value: 218 },
  { key: "hydro", label: "Hydro", value: 20 },
  { key: "gas", label: "Gas", value: 76 },
  { key: "coal", label: "Coal", value: 132 },
  { key: "other", label: "Other", value: 61 },
] satisfies WaffleCategory[];

export function WaffleChartExample() {
  return (
    <ComponentPreview title="Electricity generation, 2023" layout="fullStack" span={2} density="chart">
      <WaffleChart data={mix} label="Electricity generation, 2023" unit="TWh" />
    </ComponentPreview>
  );
}
