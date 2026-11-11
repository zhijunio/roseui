import type { Metadata } from "next";

import { WebhookTesterExample } from "@/components/examples/blocks/developer/webhook-tester/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Webhook Tester",
  description: "Send signed test events and inspect webhook responses.",
};

export default function WebhookTesterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Webhook Tester"
        description="Send a signed event and inspect the request timeline and response."
      />
      <ComponentPreview title="Test endpoint" layout="fullBleed" span={2}>
        <WebhookTesterExample />
      </ComponentPreview>
    </div>
  );
}
