import { SankeyChartExamples } from "@/components/examples/sankey-chart/sankey-chart";

export const metadata = { title: "Sankey Chart" };

export default function SankeyChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SankeyChartExamples />
      </div>
    </div>
  );
}
