import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { SpendAlertExample } from "./examples"

export const metadata: Metadata = { title: "Spend Alert", description: "Configure spend alerts for a usage based workspace." }
export default function SpendAlertPage() { return <div className="space-y-6"><PageHeader title="Spend Alert" description="Set a threshold and notify workspace admins before budget pressure grows." /><ComponentPreview previewId="settings-spend-alert-01" title="Spend alerts" layout="fullStack"><SpendAlertExample /></ComponentPreview></div> }
