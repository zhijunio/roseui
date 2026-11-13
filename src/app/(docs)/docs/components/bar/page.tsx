import { BarChartExamples } from "@/examples/components/bar/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Bar Charts" };

export default function BarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Bar Charts" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BarChartExamples />
      </div>
    </div>
  );
}
