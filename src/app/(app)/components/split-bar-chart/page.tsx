import { SplitBarChartExample } from "@/app/(app)/components/split-bar-chart/examples"
import { PageHeader } from "@/components/page-header"

export const metadata = { title: "Split Bar Chart" }

export default function SplitBarChartPage() {
  return <div className="space-y-6"><PageHeader title="Split Bar Chart" description="Show how one total is divided between a small set of statuses." /><SplitBarChartExample /></div>
}
