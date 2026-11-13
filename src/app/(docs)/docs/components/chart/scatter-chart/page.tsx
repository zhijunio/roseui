import { ScatterChartExamples } from "@/components/examples/scatter-chart/scatter-chart";

export const metadata = { title: "Scatter Chart" };

export default function ScatterChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ScatterChartExamples />
      </div>
    </div>
  );
}
