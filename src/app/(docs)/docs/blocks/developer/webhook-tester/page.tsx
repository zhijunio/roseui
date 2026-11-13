import type { Metadata } from "next";

import { WebhookTesterExample } from "@/examples/blocks/developer/webhook-tester/webhook-tester";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Webhook Tester",
  description: "Send signed test events and inspect webhook responses.",
};

export default function WebhookTesterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Webhook Tester" />
      <ComponentPreview title="Test endpoint" layout="fullBleed" span={2}>
        <WebhookTesterExample />
      </ComponentPreview>
    </div>
  );
}
