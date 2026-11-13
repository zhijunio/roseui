import type { Metadata } from "next";

import { ApiKeysExample } from "@/examples/blocks/developer/api-keys/api-keys";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "API Keys",
  description: "Manage API keys, scopes, environments, and one-time secrets.",
};

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="API Keys" />
      <ComponentPreview title="Developer keys" layout="fullBleed" span={2}>
        <ApiKeysExample />
      </ComponentPreview>
    </div>
  );
}
