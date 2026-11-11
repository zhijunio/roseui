import type { Metadata } from "next";

import { SecuritySettingsExample } from "@/components/examples/blocks/settings/security-settings/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage password, two-factor authentication, and active sessions.",
};

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Settings"
        description="Keep account access protected with focused security controls."
      />
      <ComponentPreview title="Account security" layout="fullStack">
        <SecuritySettingsExample />
      </ComponentPreview>
    </div>
  );
}
