import { ComponentPreview } from "@/examples/component-preview";
import { RidgelineExample } from "@/examples/components/ridgeline-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Ridgeline Chart" };

export default function RidgelineChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ridgeline Chart" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview
          title="Ridgeline"
          layout="fullStack"
          span={2}
          density="chart"
          className="[&>[data-slot=card-header]]:hidden"
        >
          <RidgelineExample />
        </ComponentPreview>
      </div>
    </div>
  );
}
