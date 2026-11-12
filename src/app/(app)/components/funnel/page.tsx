import { FunnelChartExamples } from "@/examples/components/funnel/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Funnel Charts" };

export default function FunnelPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Funnel Charts" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FunnelChartExamples />
      </div>
    </div>
  );
}
