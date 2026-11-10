import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { BrushChartExample } from "@/app/(app)/components/brush-chart/examples"

export const metadata = { title: "Brush Chart" }

export default function BrushChartExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Brush Chart" description="Inspect a smaller time window while keeping the full trend in view." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview previewId="brush-chart-01" title="Brush Chart" layout="fullStack" span={2} density="chart" className="[&>[data-slot=card-header]]:hidden">
          <BrushChartExample />
        </ComponentPreview>
      </div>
    </div>
  )
}

