import { PageHeader } from "@/components/page-header"
import { RadioCardsExamples } from "@/app/(app)/components/radio-cards/examples"

export const metadata = { title: "Radio Cards" }

export default function RadioCardsPage() {
  return <div className="space-y-6"><PageHeader title="Radio Cards" description="Choose an option when its supporting details matter." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><RadioCardsExamples /></div></div>
}
