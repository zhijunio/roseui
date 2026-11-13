import type { Metadata } from "next";

import { UsageBillingExample } from "@/examples/blocks/settings/usage-billing/usage-billing";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Usage Billing",
  description: "Usage based billing with spend, meters, alerts, and invoices.",
};
export default function UsageBillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Usage Billing" />
      <ComponentPreview title="Usage and billing" layout="fullStack">
        <UsageBillingExample />
      </ComponentPreview>
    </div>
  );
}
