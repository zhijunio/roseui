import type { Metadata } from "next";

import { SpendAlertExample } from "@/components/examples/blocks/settings/spend-alert/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Spend Alert",
  description: "Configure spend alerts for a usage based workspace.",
};
export default function SpendAlertPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Spend Alert"
        description="Set a threshold and notify workspace admins before budget pressure grows."
      />
      <ComponentPreview title="Spend alerts" layout="fullStack">
        <SpendAlertExample />
      </ComponentPreview>
    </div>
  );
}
