import { RadarChartExamples } from "@/app/(app)/components/radar/examples"
import { PageHeader } from "@/components/page-header"

export const metadata = { title: "Radar Charts" }

export default function RadarPage() {
  return <div className="space-y-6"><PageHeader title="Radar Charts" description="Compare one or more series across shared categories." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><RadarChartExamples /></div></div>
}
