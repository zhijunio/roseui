import { ComponentPreview } from "@/components/docs/component-preview";
import { SunburstExample } from "@/components/examples/sunburst-chart/sunburst-chart";
export const metadata = { title: "Sunburst Chart" };
export default function SunburstChartExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview
          title="Sunburst"
          layout="fullStack"
          span={2}
          density="chart"
          className="[&>[data-slot=card-header]]:hidden"
        >
          <SunburstExample />
        </ComponentPreview>
      </div>
    </div>
  );
}
