import { MapChartExamples } from "@/components/examples/map-chart/map-chart";

export const metadata = { title: "Map Chart" };

export default function MapChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MapChartExamples />
      </div>
    </div>
  );
}
