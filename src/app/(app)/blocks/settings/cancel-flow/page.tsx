import type { Metadata } from "next";

import { CancelFlowExample } from "@/components/examples/blocks/settings/cancel-flow/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = { title: "Cancel Flow", description: "A guided subscription cancellation flow." };
export default function CancelFlowPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cancel Flow"
        description="Guide customers through cancellation with a clear final confirmation."
      />
      <ComponentPreview title="Cancellation" layout="fullStack">
        <CancelFlowExample />
      </ComponentPreview>
    </div>
  );
}
