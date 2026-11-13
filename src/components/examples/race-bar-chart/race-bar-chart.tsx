import { RaceBarChart } from "@/components/ui/race-bar-chart";
import { ComponentPreview } from "@/examples/component-preview";
export function RaceBarChartExample() {
  return (
    <ComponentPreview
      title="Race Bar Chart"
      layout="fullStack"
      span={2}
      density="chart"
      className="[&>[data-slot=card-header]]:hidden"
    >
      <RaceBarChart />
    </ComponentPreview>
  );
}
