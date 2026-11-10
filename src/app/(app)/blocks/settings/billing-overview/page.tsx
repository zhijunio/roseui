import type { Metadata } from "next"
import { ComponentPreview } from "@/components/composite/component-preview"
import { PageHeader } from "@/components/page-header"
import { BillingOverview } from "./examples"

export const metadata: Metadata = {
  title: "Billing Overview",
  description: "Manage plans, usage, payment methods, and invoices.",
}

export default function BillingOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing Overview"
        description="Manage plans, usage, payment methods, and invoices."
      />
      <ComponentPreview
        previewId="settings-billing-overview-01"
        title="Billing overview"
        layout="fullStack"
      >
        <BillingOverview />
      </ComponentPreview>
    </div>
  )
}
