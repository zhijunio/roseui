import { SankeyChartExamples } from "@/app/(app)/components/sankey/examples"
import { PageHeader } from "@/components/page-header"

export const metadata = { title: "Sankey Chart" }

export default function SankeyPage() {
  return <div className="space-y-6"><PageHeader title="Sankey Chart" description="Show how values flow between categories." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><SankeyChartExamples /></div></div>
}
