import { HeatmapChartExamples } from "@/components/examples/heatmap-chart/heatmap-chart";

export const metadata = { title: "Heatmap Chart" };

export default function HeatmapChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <HeatmapChartExamples />
      </div>
    </div>
  );
}
