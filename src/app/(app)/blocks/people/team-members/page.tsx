import type { Metadata } from "next";

import { TeamMembersExample } from "@/components/examples/blocks/people/team-members/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Team Members",
  description: "Manage workspace members, roles, and invitations.",
};

export default function TeamMembersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Members"
        description="Invite teammates, manage roles, and keep workspace seats under control."
      />
      <ComponentPreview title="Workspace members" layout="fullStack">
        <TeamMembersExample />
      </ComponentPreview>
    </div>
  );
}
