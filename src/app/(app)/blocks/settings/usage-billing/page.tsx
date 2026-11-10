import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { UsageBillingExample } from "./examples"

export const metadata: Metadata = { title: "Usage Billing", description: "Usage based billing with spend, meters, alerts, and invoices." }
export default function UsageBillingPage() { return <div className="space-y-6"><PageHeader title="Usage Billing" description="Track usage, projected spend, alerts, and invoices." /><ComponentPreview previewId="settings-usage-billing-01" title="Usage and billing" layout="fullStack"><UsageBillingExample /></ComponentPreview></div> }
