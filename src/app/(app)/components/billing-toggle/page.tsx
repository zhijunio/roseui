import { PageHeader } from "@/components/page-header"
import { BillingToggleExamples } from "@/app/(app)/components/billing-toggle/examples"

export const metadata = { title: "Billing Toggle" }

export default function BillingTogglePage() {
  return <div className="space-y-6"><PageHeader title="Billing Toggle" description="Compare subscription periods and keep plan prices in sync." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><BillingToggleExamples /></div></div>
}
