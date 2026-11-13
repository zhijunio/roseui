import { BarChartExamples } from "@/components/examples/bar-chart/bar-chart";

export const metadata = { title: "Bar Chart" };

export default function BarChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BarChartExamples />
      </div>
    </div>
  );
}
