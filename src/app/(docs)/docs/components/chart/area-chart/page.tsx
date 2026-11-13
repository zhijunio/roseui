import { AreaChartExamples } from "@/components/examples/area-chart/area-chart";

export const metadata = { title: "Area Chart" };

export default function AreaChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AreaChartExamples />
      </div>
    </div>
  );
}
