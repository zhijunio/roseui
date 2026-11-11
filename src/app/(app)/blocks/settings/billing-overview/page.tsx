import type { Metadata } from "next";

import { BillingOverview } from "@/components/examples/blocks/settings/billing-overview/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Billing Overview",
  description: "Manage plans, usage, payment methods, and invoices.",
};

export default function BillingOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Billing Overview" description="Manage plans, usage, payment methods, and invoices." />
      <ComponentPreview title="Billing overview" layout="fullStack">
        <BillingOverview />
      </ComponentPreview>
    </div>
  );
}
