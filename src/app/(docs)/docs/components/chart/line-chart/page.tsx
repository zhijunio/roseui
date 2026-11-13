import { LineChartExamples } from "@/components/examples/line-chart/line-chart";

export const metadata = { title: "Line Chart" };

export default function LineChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LineChartExamples />
      </div>
    </div>
  );
}
