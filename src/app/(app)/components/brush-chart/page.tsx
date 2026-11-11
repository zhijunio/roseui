import { ComponentPreview } from "@/components/examples/component-preview";
import { BrushChartExample } from "@/components/examples/components/brush-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Brush Chart" };

export default function BrushChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Brush Chart"
        description="Inspect a smaller time window while keeping the full trend in view."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview
          title="Brush Chart"
          layout="fullStack"
          span={2}
          density="chart"
          className="[&>[data-slot=card-header]]:hidden"
        >
          <BrushChartExample />
        </ComponentPreview>
      </div>
    </div>
  );
}
