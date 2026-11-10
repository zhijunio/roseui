import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { ApiKeysExample } from "./examples";

export const metadata: Metadata = {
  title: "API Keys",
  description: "Manage API keys, scopes, environments, and one-time secrets.",
};

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="API Keys"
        description="Create and manage developer keys for your applications."
      />
      <ComponentPreview previewId="developer-api-keys-01" title="Developer keys" layout="fullBleed" span={2}>
        <ApiKeysExample />
      </ComponentPreview>
    </div>
  );
}
