import type { Metadata } from "next";

import { SettingsCommandExample } from "@/components/examples/blocks/settings/settings-command/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Settings Command",
  description: "Search, jump to, and save workspace settings with a keyboard-first palette.",
};

export default function SettingsCommandPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings Command" description="Find settings quickly with a searchable command surface." />
      <ComponentPreview title="Workspace preferences" layout="fullBleed" span={2}>
        <SettingsCommandExample />
      </ComponentPreview>
    </div>
  );
}
