import { PageHeader } from "@/components/page-header"
import { SlopeChartExample } from "@/app/(app)/components/slope-chart/examples"

export const metadata = { title: "Slope Chart" }

export default function SlopeChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Slope Chart" description="Compare how several items changed between two moments." />
      <SlopeChartExample />
    </div>
  )
}

