import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { CancelFlowExample } from "./examples"

export const metadata: Metadata = { title: "Cancel Flow", description: "A guided subscription cancellation flow." }
export default function CancelFlowPage() { return <div className="space-y-6"><PageHeader title="Cancel Flow" description="Guide customers through cancellation with a clear final confirmation." /><ComponentPreview previewId="settings-cancel-flow-01" title="Cancellation" layout="fullStack"><CancelFlowExample /></ComponentPreview></div> }
