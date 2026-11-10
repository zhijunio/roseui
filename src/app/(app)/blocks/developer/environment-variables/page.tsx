import type { Metadata } from "next";
import { ComponentPreview } from "@/components/composite/component-preview";
import { PageHeader } from "@/components/page-header";
import { EnvironmentVariablesExample } from "./examples";

export const metadata: Metadata = {
  title: "Environment Variables",
  description:
    "Manage configuration and secrets across deployment environments.",
};

export default function EnvironmentVariablesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Environment Variables"
        description="Manage configuration and secrets across development, preview, and production."
      />
      <ComponentPreview previewId="developer-environment-variables-01"
        title="Deployment configuration"
        layout="fullBleed"
        span={2}
      >
        <EnvironmentVariablesExample />
      </ComponentPreview>
    </div>
  );
}
