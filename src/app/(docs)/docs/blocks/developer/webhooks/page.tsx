import type { Metadata } from "next";

import { WebhooksExample } from "@/examples/blocks/developer/webhooks/webhooks";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "Inspect webhook events, payloads, and delivery attempts.",
};

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Webhooks" />
      <ComponentPreview title="Webhook console" layout="fullBleed" span={2}>
        <WebhooksExample />
      </ComponentPreview>
    </div>
  );
}
