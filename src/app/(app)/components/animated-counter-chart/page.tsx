import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { AnimatedCounterDemo } from "@/app/(app)/components/animated-counter-chart/examples"

export const metadata = { title: "Animated Counter" }

export default function AnimatedCounterExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Animated Counter" description="Give changing totals a clear sense of movement." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview previewId="animated-counter-chart-01" title="Response count" layout="fullStack" span={2}>
          <AnimatedCounterDemo />
        </ComponentPreview>
      </div>
    </div>
  )
}

