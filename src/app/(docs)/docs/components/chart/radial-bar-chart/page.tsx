import { RadialBarChartExamples } from "@/components/examples/radial-bar-chart/radial-bar-chart";

export const metadata = { title: "Radial Bar Chart" };

export default function RadialBarChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RadialBarChartExamples />
      </div>
    </div>
  );
}
