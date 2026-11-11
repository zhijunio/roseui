import type { Metadata } from "next";

import { WebhooksExample } from "@/components/examples/blocks/developer/webhooks/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "Inspect webhook events, payloads, and delivery attempts.",
};

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Webhooks" description="Manage endpoints and inspect recent event deliveries." />
      <ComponentPreview title="Webhook console" layout="fullBleed" span={2}>
        <WebhooksExample />
      </ComponentPreview>
    </div>
  );
}
