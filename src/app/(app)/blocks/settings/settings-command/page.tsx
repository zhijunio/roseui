import type { Metadata } from "next";

import { SettingsCommandExample } from "@/examples/blocks/settings/settings-command/settings-command";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Settings Command",
  description: "Search, jump to, and save workspace settings with a keyboard-first palette.",
};

export default function SettingsCommandPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings Command" />
      <ComponentPreview title="Workspace preferences" layout="fullBleed" span={2}>
        <SettingsCommandExample />
      </ComponentPreview>
    </div>
  );
}
