import type { Metadata } from "next";

import { EnvironmentVariablesExample } from "@/components/examples/blocks/developer/environment-variables/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Environment Variables",
  description: "Manage configuration and secrets across deployment environments.",
};

export default function EnvironmentVariablesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Environment Variables"
        description="Manage configuration and secrets across development, preview, and production."
      />
      <ComponentPreview title="Deployment configuration" layout="fullBleed" span={2}>
        <EnvironmentVariablesExample />
      </ComponentPreview>
    </div>
  );
}
