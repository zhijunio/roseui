import { PageHeader } from "@/components/page-header"
import { CountdownExamples } from "@/app/(app)/components/countdown/examples"

export const metadata = { title: "Countdown" }

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Countdown"
        description="Show time remaining before a workspace deadline or scheduled event."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CountdownExamples />
      </div>
    </div>
  )
}
