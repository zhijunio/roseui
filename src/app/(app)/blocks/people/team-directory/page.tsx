import type { Metadata } from "next";

import { TeamDirectoryExample } from "@/components/examples/blocks/people/team-directory/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = { title: "Team Directory", description: "Browse and search people in a workspace." };

export default function TeamDirectoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Directory"
        description="Search the workspace, filter by team, and open a focused people profile."
      />
      <ComponentPreview title="Workspace directory" layout="fullStack">
        <TeamDirectoryExample />
      </ComponentPreview>
    </div>
  );
}
