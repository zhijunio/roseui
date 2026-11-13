import type { Metadata } from "next";

import { BillingOverview } from "@/examples/blocks/settings/billing-overview/billing-overview";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Billing Overview",
  description: "Manage plans, usage, payment methods, and invoices.",
};

export default function BillingOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Billing Overview" />
      <ComponentPreview title="Billing overview" layout="fullStack">
        <BillingOverview />
      </ComponentPreview>
    </div>
  );
}
