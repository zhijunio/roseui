import { StreamgraphExample } from "@/components/examples/components/streamgraph-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Streamgraph" };

export default function StreamgraphChartPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Streamgraph" description="Compare how several sources contribute to a changing total." />
      <StreamgraphExample />
    </div>
  );
}
