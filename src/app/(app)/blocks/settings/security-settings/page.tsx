import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { SecuritySettingsExample } from "./examples";

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
      <ComponentPreview previewId="settings-security-settings-01" title="Account security" layout="fullStack">
        <SecuritySettingsExample />
      </ComponentPreview>
    </div>
  );
}
