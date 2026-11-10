import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { WebhookTesterExample } from "./examples";

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
      <ComponentPreview previewId="developer-webhook-tester-01" title="Test endpoint" layout="fullBleed" span={2}>
        <WebhookTesterExample />
      </ComponentPreview>
    </div>
  );
}
