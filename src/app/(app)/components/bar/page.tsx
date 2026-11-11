import { BarChartExamples } from "@/components/examples/components/bar/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Bar Charts" };

export default function BarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bar Charts"
        description="Compare categories with grouped, stacked, horizontal, diverging, and specialized bars."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BarChartExamples />
      </div>
    </div>
  );
}
