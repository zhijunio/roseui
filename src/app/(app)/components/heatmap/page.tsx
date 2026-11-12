import { HeatmapChartExamples } from "@/examples/components/heatmap/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Heatmaps" };

export default function HeatmapPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Heatmaps" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <HeatmapChartExamples />
      </div>
    </div>
  );
}
