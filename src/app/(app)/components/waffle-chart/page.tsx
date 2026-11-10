import { WaffleChartExample } from "@/app/(app)/components/waffle-chart/examples"
import { PageHeader } from "@/components/page-header"

export const metadata = { title: "Waffle Chart" }

export default function WaffleChartPage() {
  return <div className="space-y-6"><PageHeader title="Waffle Chart" description="Show a whole as countable units grouped by category." /><WaffleChartExample /></div>
}
