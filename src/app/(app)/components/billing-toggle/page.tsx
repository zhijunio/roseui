import { BillingToggleExamples } from "@/components/examples/components/billing-toggle/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Billing Toggle" };

export default function BillingTogglePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Billing Toggle" description="Compare subscription periods and keep plan prices in sync." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BillingToggleExamples />
      </div>
    </div>
  );
}
