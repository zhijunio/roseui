import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { SparklineExample } from "@/app/(app)/components/sparkline-chart/examples"

export const metadata = { title: "Sparkline" }

export default function SparklineExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sparkline" description="Pair a compact trend with a metric when the surrounding layout carries the context." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview previewId="sparkline-chart-01" title="Sparkline" layout="fullStack" span={2} density="chart" className="[&>[data-slot=card-header]]:hidden">
          <SparklineExample />
        </ComponentPreview>
      </div>
    </div>
  )
}

