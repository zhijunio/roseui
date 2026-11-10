import { PageHeader } from "@/components/page-header"
import { SwipeActionsExamples } from "@/app/(app)/components/swipe-actions/examples"

export const metadata = { title: "Swipe Actions" }

export default function ComponentExamplePage() {
  return <div className="space-y-6">
    <PageHeader title="Swipe Actions" description="Reveal common row actions with a horizontal swipe or the visible actions control." />
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><SwipeActionsExamples /></div>
  </div>
}
