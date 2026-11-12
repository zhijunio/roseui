import type { Metadata } from "next";

import { SecuritySettingsExample } from "@/examples/blocks/settings/security-settings/security-settings";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage password, two-factor authentication, and active sessions.",
};

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Security Settings" />
      <ComponentPreview title="Account security" layout="fullStack">
        <SecuritySettingsExample />
      </ComponentPreview>
    </div>
  );
}
