import { StreamgraphExample } from "@/app/(app)/components/streamgraph-chart/examples"
import { PageHeader } from "@/components/page-header"

export const metadata = { title: "Streamgraph" }

export default function StreamgraphChartPage() {
  return <div className="space-y-6"><PageHeader title="Streamgraph" description="Compare how several sources contribute to a changing total." /><StreamgraphExample /></div>
}
