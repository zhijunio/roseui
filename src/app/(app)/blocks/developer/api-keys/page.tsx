import type { Metadata } from "next";

import { ApiKeysExample } from "@/components/examples/blocks/developer/api-keys/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "API Keys",
  description: "Manage API keys, scopes, environments, and one-time secrets.",
};

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="API Keys" description="Create and manage developer keys for your applications." />
      <ComponentPreview title="Developer keys" layout="fullBleed" span={2}>
        <ApiKeysExample />
      </ComponentPreview>
    </div>
  );
}
