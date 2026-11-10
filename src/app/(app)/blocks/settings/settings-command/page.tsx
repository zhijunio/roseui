import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { SettingsCommandExample } from "./examples";

export const metadata: Metadata = {
  title: "Settings Command",
  description:
    "Search, jump to, and save workspace settings with a keyboard-first palette.",
};

export default function SettingsCommandPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings Command"
        description="Find settings quickly with a searchable command surface."
      />
      <ComponentPreview previewId="settings-settings-command-01"
        title="Workspace preferences"
        layout="fullBleed"
        span={2}
      >
        <SettingsCommandExample />
      </ComponentPreview>
    </div>
  );
}
