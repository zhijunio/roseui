import { DonutChartExamples } from "@/components/examples/donut-chart/donut-chart";

export const metadata = { title: "Donut Chart" };

export default function DonutChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DonutChartExamples />
      </div>
    </div>
  );
}
