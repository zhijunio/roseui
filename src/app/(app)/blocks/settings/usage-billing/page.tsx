import type { Metadata } from "next";

import { UsageBillingExample } from "@/components/examples/blocks/settings/usage-billing/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Usage Billing",
  description: "Usage based billing with spend, meters, alerts, and invoices.",
};
export default function UsageBillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Usage Billing" description="Track usage, projected spend, alerts, and invoices." />
      <ComponentPreview title="Usage and billing" layout="fullStack">
        <UsageBillingExample />
      </ComponentPreview>
    </div>
  );
}
