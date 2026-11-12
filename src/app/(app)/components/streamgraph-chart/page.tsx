import { StreamgraphExample } from "@/examples/components/streamgraph-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Streamgraph" };

export default function StreamgraphChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Streamgraph" />
      <StreamgraphExample />
    </div>
  );
}
