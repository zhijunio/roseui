import { PieChartExamples } from "@/components/examples/pie-chart/pie-chart";

export const metadata = { title: "Pie Chart" };

export default function PieChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PieChartExamples />
      </div>
    </div>
  );
}
