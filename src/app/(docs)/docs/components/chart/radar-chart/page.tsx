import { RadarChartExamples } from "@/components/examples/radar-chart/radar-chart";

export const metadata = { title: "Radar Chart" };

export default function RadarChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RadarChartExamples />
      </div>
    </div>
  );
}
