import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { WebhooksExample } from "./examples";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "Inspect webhook events, payloads, and delivery attempts.",
};

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Webhooks"
        description="Manage endpoints and inspect recent event deliveries."
      />
      <ComponentPreview previewId="developer-webhooks-01" title="Webhook console" layout="fullBleed" span={2}>
        <WebhooksExample />
      </ComponentPreview>
    </div>
  );
}
