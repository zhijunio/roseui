import { MapChartExamples } from "@/app/(app)/components/map/examples"
import { PageHeader } from "@/components/page-header"

export const metadata = { title: "Maps" }

export default function MapPage() {
  return <div className="space-y-6"><PageHeader title="Maps" description="Compare values by geographic region." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><MapChartExamples /></div></div>
}
