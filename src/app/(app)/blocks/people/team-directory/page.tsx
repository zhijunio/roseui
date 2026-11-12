import type { Metadata } from "next";

import { TeamDirectoryExample } from "@/examples/blocks/people/team-directory/team-directory";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = { title: "Team Directory", description: "Browse and search people in a workspace." };

export default function TeamDirectoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Team Directory" />
      <ComponentPreview title="Workspace directory" layout="fullStack">
        <TeamDirectoryExample />
      </ComponentPreview>
    </div>
  );
}
