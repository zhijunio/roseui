import { LineChartExamples } from "@/components/examples/components/line/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Line Charts" };

export default function LinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Line Charts"
        description="Show trends, targets, compact summaries, and changes between periods."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LineChartExamples />
      </div>
    </div>
  );
}
