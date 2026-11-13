import { LineChartExamples } from "@/examples/components/line-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Line Charts" };

export default function LineChartsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Line Charts" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LineChartExamples />
      </div>
    </div>
  );
}
