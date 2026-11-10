import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { ActivityHeatmapExample } from "./examples"

export const metadata = { title: "Activity Heatmap" }

export default function ActivityHeatmapExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activity Heatmap" description="See a year of activity at a glance, one square per day." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview previewId="activity-heatmap-chart-01" title="Contributions in 2026" layout="fullStack" span={2} density="chart">
          <ActivityHeatmapExample />
        </ComponentPreview>
      </div>
    </div>
  )
}

