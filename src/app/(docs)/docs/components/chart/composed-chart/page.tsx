import { ComposedChartExamples } from "@/components/examples/composed-chart/composed-chart";

export const metadata = { title: "Composed Chart" };

export default function ComposedChartPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComposedChartExamples />
      </div>
    </div>
  );
}
