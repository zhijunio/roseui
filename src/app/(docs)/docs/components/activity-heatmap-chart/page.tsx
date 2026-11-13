import { ComponentPreview } from "@/examples/component-preview";
import { ActivityHeatmapExample } from "@/examples/components/activity-heatmap-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Activity Heatmap" };

export default function ActivityHeatmapExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activity Heatmap" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview title="Contributions in 2026" layout="fullStack" span={2} density="chart">
          <ActivityHeatmapExample />
        </ComponentPreview>
      </div>
    </div>
  );
}
