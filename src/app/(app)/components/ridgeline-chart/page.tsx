import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { RidgelineExample } from "@/app/(app)/components/ridgeline-chart/examples"

export const metadata = { title: "Ridgeline Chart" }

export default function RidgelineChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ridgeline Chart" description="Compare the shape of several distributions on a shared horizontal scale." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview previewId="ridgeline-chart-01" title="Ridgeline" layout="fullStack" span={2} density="chart" className="[&>[data-slot=card-header]]:hidden">
          <RidgelineExample />
        </ComponentPreview>
      </div>
    </div>
  )
}

